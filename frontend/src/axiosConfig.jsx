import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.206.54.119:5001', // local
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor to attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // saved after login
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

