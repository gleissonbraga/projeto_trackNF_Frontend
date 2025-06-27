import axios from 'axios';
import type { AxiosInstance} from 'axios';

// const baseURL = 
// console.log(baseURL)
const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {'content-type': 'application/json'},
    timeout: 10000,
})

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if(token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export default apiClient