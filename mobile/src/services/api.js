import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.44:3333',
});

api.interceptors.response.use(
    response => response,
    error => {
      console.error("API Error:", error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

export default api;