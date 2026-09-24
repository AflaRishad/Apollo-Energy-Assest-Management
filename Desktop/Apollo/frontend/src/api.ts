import axios from 'axios';

const baseURL =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  (window.location.hostname === 'localhost' ? 'http://localhost:8000/api' : '/api');

const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
  }
}

export default api;
