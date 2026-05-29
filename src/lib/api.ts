import axios from "axios";

const api = axios.create({
    baseURL: (import.meta.env as any).VITE_PUBLIC_API_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;