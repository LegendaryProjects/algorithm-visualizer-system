import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5555/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      // Only handle session expiry if not a direct sign-in or registration attempt
      if (!url.includes('/auth/login') && !url.includes('/auth/register')) {
        localStorage.removeItem('token');
        const reason = error.response?.data?.error || 'Your session has expired. Please sign in again.';
        window.dispatchEvent(new CustomEvent('auth:expired', { detail: reason }));
      }
    }
    return Promise.reject(error);
  }
);

export default api;