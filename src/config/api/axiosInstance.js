import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // Remove default Content-Type header to allow dynamic setting for file uploads
});

// add token then axios Interceptor

export default axiosInstance;