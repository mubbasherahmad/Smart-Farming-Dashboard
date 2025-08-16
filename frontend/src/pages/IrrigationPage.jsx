
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import axiosInstance from "../axiosInstance";

// const IrrigationPage = () => {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     zone: "zone1",
//     startTime: "",
//     duration: "",
//   });
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Fetch schedules on component mount
//   useEffect(() => {
//     if (user) {
//       fetchSchedules();
//     }
//   }, [user]);

//   const fetchSchedules = async () => {
//   setLoading(true);
//   try {
//     const response = await axiosInstance.get("/irrigation/schedules");
//     setSchedules(response.data);
//     setError(null);
//   } catch (err) {
//     console.error("Error fetching schedules:", err);
//     setError(
//       err.response?.data?.message ||
//       err.message ||
//       "Failed to fetch schedules. Please try again later."
//     );
//     setSchedules([]); // Clear existing schedules on error
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post("/irrigation/schedules", formData);
//       setSuccess("Irrigation schedule created successfully!");
//       setFormData({
//         zone: "zone1",
//         startTime: "",
//         duration: "",
//       });
//       setError(null);
//       fetchSchedules(); // Refresh the list after creation
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         err.response?.data?.errors?.[0]?.msg ||
//         err.message
//       );
//       setSuccess(null);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const formatDateTime = (dateTimeString) => {
//     const options = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     };
//     return new Date(dateTimeString).toLocaleString(undefined, options);
//   };
  

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Irrigation Control</h1>
//           <p className="text-gray-600">Schedule and manage your farm's irrigation system</p>
//         </div>

//         {/* Status Messages */}
//         <div className="mb-6 space-y-3">
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-green-700">{success}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Create Schedule Card */}
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-800">Create New Schedule</h2>
//             </div>
            
//             <div className="p-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">
//                     Zone
//                   </label>
//                   <select
//                     id="zone"
//                     name="zone"
//                     value={formData.zone}
//                     onChange={handleChange}
//                     required
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="zone1">Zone 1 - North Field</option>
//                     <option value="zone2">Zone 2 - South Field</option>
//                     <option value="zone3">Zone 3 - East Field</option>
//                     <option value="zone4">Zone 4 - West Field</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Date & Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     id="startTime"
//                     name="startTime"
//                     value={formData.startTime}
//                     onChange={handleChange}
//                     required
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
//                     Duration (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     id="duration"
//                     name="duration"
//                     value={formData.duration}
//                     onChange={handleChange}
//                     placeholder="e.g. 30"
//                     min="1"
//                     max="120"
//                     required
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   <p className="mt-1 text-xs text-gray-500">Duration must be between 1-120 minutes</p>
//                 </div>

//                 <div className="pt-2">
//                   <button
//                     type="submit"
//                     className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!user ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
//                     disabled={!user}
//                   >
//                     {user ? 'Create Irrigation Schedule' : 'Please log in to create schedule'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* View Schedules Card */}
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-800">Current Schedules</h2>
//               <button 
//                 onClick={fetchSchedules}
//                 className="text-sm text-blue-600 hover:text-blue-800"
//                 disabled={loading}
//               >
//                 {loading ? 'Refreshing...' : 'Refresh'}
//               </button>
//             </div>
            
//             <div className="p-6">
//               {loading && schedules.length === 0 ? (
//                 <div className="flex justify-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                 </div>
//               ) : schedules.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   No irrigation schedules found
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {schedules.map((schedule) => (
//                     <div key={schedule._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-medium text-gray-800">
//                             {schedule.zone === 'zone1' && 'Zone 1 - North Field'}
//                             {schedule.zone === 'zone2' && 'Zone 2 - South Field'}
//                             {schedule.zone === 'zone3' && 'Zone 3 - East Field'}
//                             {schedule.zone === 'zone4' && 'Zone 4 - West Field'}
//                           </h3>
//                           <p className="text-sm text-gray-600 mt-1">
//                             <span className="font-medium">Start:</span> {formatDateTime(schedule.startTime)}
//                           </p>
//                         </div>
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                           {schedule.duration} min
//                         </span>
//                       </div>
//                       <div className="mt-2 text-xs text-gray-500">
//                         Created: {new Date(schedule.createdAt).toLocaleString()}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IrrigationPage;
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosInstance";

const IrrigationPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    zone: "zone1",
    startTime: "",
    duration: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch schedules on component mount
  useEffect(() => {
    if (user) {
      fetchSchedules();
    }
  }, [user]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/irrigation/schedules");
      setSchedules(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch schedules. Please try again later."
      );
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (schedule) => {
    setFormData({
      zone: schedule.zone,
      startTime: schedule.startTime,
      duration: schedule.duration.toString()
    });
    setEditId(schedule._id);
    setSuccess(null);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({
      zone: "zone1",
      startTime: "",
      duration: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editId) {
        // Update existing schedule
        const { data } = await axiosInstance.put(`/irrigation/schedules/${editId}`, formData);
        setSchedules(schedules.map(s => s._id === editId ? data : s));
        setSuccess("Schedule updated successfully!");
      } else {
        // Create new schedule
        const { data } = await axiosInstance.post("/irrigation/schedules", formData);
        setSchedules([data, ...schedules]);
        setSuccess("Schedule created successfully!");
      }
      
      setFormData({
        zone: "zone1",
        startTime: "",
        duration: ""
      });
      setEditId(null);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message
      );
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Irrigation Control</h1>
          <p className="text-gray-600">Schedule and manage your farm's irrigation system</p>
        </div>

        {/* Status Messages */}
        <div className="mb-6 space-y-3">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editId ? "Edit Schedule" : "Create New Schedule"}
              </h2>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">
                    Zone
                  </label>
                  <select
                    id="zone"
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="zone1">Zone 1 - North Field</option>
                    <option value="zone2">Zone 2 - South Field</option>
                    <option value="zone3">Zone 3 - East Field</option>
                    <option value="zone4">Zone 4 - West Field</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                    min="1"
                    max="120"
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Duration must be between 1-120 minutes</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={!user || isSubmitting}
                    className={`flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!user || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isSubmitting ? 'Processing...' : (editId ? 'Update Schedule' : 'Create Schedule')}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Schedules List Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Current Schedules</h2>
              <button 
                onClick={fetchSchedules}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            
            <div className="p-6">
              {loading && schedules.length === 0 ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : schedules.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No irrigation schedules found
                </div>
              ) : (
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {schedule.zone === 'zone1' && 'Zone 1 - North Field'}
                            {schedule.zone === 'zone2' && 'Zone 2 - South Field'}
                            {schedule.zone === 'zone3' && 'Zone 3 - East Field'}
                            {schedule.zone === 'zone4' && 'Zone 4 - West Field'}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Start:</span> {formatDateTime(schedule.startTime)}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {schedule.duration} min
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Created: {new Date(schedule.createdAt).toLocaleString()}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleEdit(schedule)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                       
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationPage;