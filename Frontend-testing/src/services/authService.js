
import api from './api';

export const authService = {
  // Login
  login(credentials) {
    return api.post('/login', credentials);
  },

  // Register
  register(userData) {
    return api.post('/register', userData);
  },

  // Logout
  logout() {
    return api.post('/logout');
  },

  // Get user profile
  getProfile() {
    return api.get('/profile');
  },

  // Set token ke localStorage
  setToken(token) {
    localStorage.setItem('auth_token', token);
  },

  // Remove token dari localStorage
  removeToken() {
    localStorage.removeItem('auth_token');
  },

  // Get token dari localStorage
  getToken() {
    return localStorage.getItem('auth_token');
  }
};
