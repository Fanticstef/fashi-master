import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://fashi-master-backend.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// add token then axios Interceptor

export default axiosInstance;