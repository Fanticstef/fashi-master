import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://fashi-master-backend.vercel.app',
    timeout: 10000,
});

// add token then axios Interceptor

export default axiosInstance;