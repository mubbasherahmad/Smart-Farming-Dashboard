import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SensorPage = () => {
  const { user } = useAuth();
  const [readings, setReadings] = useState([]);
  const [formData, setFormData] = useState({
    sensorId: '',
    type: 'temperature',
    value: '',
    location: ''
  });
  const [error, setError] = useState(null);

  // Fetch existing sensor readings
  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const response = await fetch('/api/sensors', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setReadings(data);
      } catch (err) {
        setError('Failed to fetch sensor readings');
      }
    };

    if (user) {
      fetchReadings();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sensors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.errors?.[0]?.msg || 'Failed to create reading');
      }

      const newReading = await response.json();
      setReadings([newReading, ...readings]);
      setFormData({
        sensorId: '',
        type: 'temperature',
        value: '',
        location: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sensor Readings</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Sensor Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Reading</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sensor ID</label>
              <input
                type="text"
                name="sensorId"
                value={formData.sensorId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="soil_moisture">Soil Moisture</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Value</label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Location (optional)</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Reading
            </button>
          </form>
        </div>

        {/* Readings List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Readings</h2>
          {readings.length === 0 ? (
            <p className="text-gray-500">No readings available</p>
          ) : (
            <div className="space-y-4">
              {readings.map((reading) => (
                <div key={reading._id} className="border-b pb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{reading.sensorId}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(reading.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="capitalize">{reading.type}</span>
                    <span className="font-bold">{reading.value}</span>
                  </div>
                  {reading.location && (
                    <div className="text-sm text-gray-600 mt-1">
                      Location: {reading.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorPage;