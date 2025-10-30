
import axios from 'axios';

// Base URL API Laravel Anda - sesuaikan dengan URL backend Laravel
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Buat instance Axios dengan konfigurasi default
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor - untuk menambahkan token authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - untuk handle error global
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle error berdasarkan status code
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect ke login
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: Anda tidak memiliki akses');
          break;
        case 404:
          console.error('Not Found: Data tidak ditemukan');
          break;
        case 500:
          console.error('Server Error: Terjadi kesalahan pada server');
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
