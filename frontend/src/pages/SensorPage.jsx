// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import axiosInstance from "../axiosInstance";

// const SensorPage = () => {
//   const { user } = useAuth();
//   const [readings, setReadings] = useState([]);
//   const [formData, setFormData] = useState({
//     sensorId: "",
//     type: "temperature",
//     value: "",
//     location: "",
//   });
//   const [error, setError] = useState(null);

//   // Fetch existing sensor readings
//   useEffect(() => {
//     const fetchReadings = async () => {
//       try {
//         const { data } = await axiosInstance.get("/sensors");
//         setReadings(data);
//       } catch (err) {
//         setError("Failed to fetch sensor readings");
//       }
//     };

//     if (user) fetchReadings();
//   }, [user]);

//   // Submit new sensor reading
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axiosInstance.post("/sensors", formData);
//       setReadings([data, ...readings]);
//       setFormData({ sensorId: "", type: "temperature", value: "", location: "" });
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         err.response?.data?.errors?.[0]?.msg ||
//         err.message
//       );
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Sensor Readings</h1>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Form */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Add New Reading</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="sensorId"
//               value={formData.sensorId}
//               onChange={handleChange}
//               placeholder="Sensor ID"
//               required
//               className="w-full px-3 py-2 border rounded mb-4"
//             />
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded mb-4"
//             >
//               <option value="temperature">Temperature</option>
//               <option value="humidity">Humidity</option>
//               <option value="soil_moisture">Soil Moisture</option>
//               <option value="light">Light</option>
//             </select>
//             <input
//               type="number"
//               name="value"
//               value={formData.value}
//               onChange={handleChange}
//               placeholder="Value"
//               required
//               className="w-full px-3 py-2 border rounded mb-4"
//             />
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="Location (optional)"
//               className="w-full px-3 py-2 border rounded mb-4"
//             />
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Submit Reading
//             </button>
//           </form>
//         </div>

//         {/* List */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Recent Readings</h2>
//           {readings.length === 0 ? (
//             <p className="text-gray-500">No readings available</p>
//           ) : (
//             <div className="space-y-4">
//               {readings.map((reading) => (
//                 <div key={reading._id} className="border-b pb-4">
//                   <div className="flex justify-between">
//                     <span className="font-medium">{reading.sensorId}</span>
//                     <span className="text-sm text-gray-500">
//                       {new Date(reading.timestamp).toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between mt-1">
//                     <span className="capitalize">{reading.type}</span>
//                     <span className="font-bold">{reading.value}</span>
//                   </div>
//                   {reading.location && (
//                     <div className="text-sm text-gray-600 mt-1">
//                       Location: {reading.location}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SensorPage;
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosInstance";

const SensorPage = () => {
  const { user } = useAuth();
  const [readings, setReadings] = useState([]);
  const [formData, setFormData] = useState({
    sensorId: "",
    type: "temperature",
    value: "",
    location: "",
  });
  const [editId, setEditId] = useState(null); // track which sensor is being edited
  const [error, setError] = useState(null);

  // Fetch existing sensor readings
  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const { data } = await axiosInstance.get("/sensors");
        setReadings(data);
      } catch (err) {
        setError("Failed to fetch sensor readings");
      }
    };

    if (user) fetchReadings();
  }, [user]);

  // Submit new sensor reading
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // update existing sensor metadata
        const { data } = await axiosInstance.put(`/sensors/${editId}`, formData);
        setReadings(
          readings.map((r) => (r._id === editId ? data : r))
        );
        setEditId(null);
      } else {
        // create new reading
        const { data } = await axiosInstance.post("/sensors", formData);
        setReadings([data, ...readings]);
      }

      // reset form
      setFormData({
        sensorId: "",
        type: "temperature",
        value: "",
        location: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          err.message
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (sensor) => {
    setFormData({
      sensorId: sensor.sensorId || "",
      type: sensor.type || "temperature",
      value: sensor.value || "",
      location: sensor.location || "",
    });
    setEditId(sensor._id);
  };
  const handleDelete = async (reading) => {
  try {
    await axiosInstance.delete(`/sensors/${reading._id}`);
    setReadings(readings.filter(r => r._id !== reading._id));
    setError(null);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to delete sensor");
  }
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
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Edit Sensor Metadata" : "Add New Reading"}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="sensorId"
              value={formData.sensorId}
              onChange={handleChange}
              placeholder="Sensor ID"
              required
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded mb-4"
            >
              <option value="temperature">Temperature</option>
              <option value="humidity">Humidity</option>
              <option value="soil_moisture">Soil Moisture</option>
              <option value="light">Light</option>
            </select>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Value"
              required
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location (optional)"
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId ? "Update Sensor" : "Submit Reading"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    sensorId: "",
                    type: "temperature",
                    value: "",
                    location: "",
                  });
                }}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* List */}
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
                  <button
                    onClick={() => handleEdit(reading)}
                    className="mt-2 text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(reading)}  // Passing the whole reading object like edit does
                    className="mt-2 ml-2 text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>

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
