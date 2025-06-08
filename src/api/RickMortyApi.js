import axios from "axios";

const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    headers: {
        'Content-Type': 'application/json'
    },
});

api.interceptors.response.use(
    res => res,
    err => {
        console.error('API error', err);
        return Promise.reject(err);
    }
);

export default api;