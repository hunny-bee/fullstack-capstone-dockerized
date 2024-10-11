import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (username, email, password) => api.post('/auth/register', { username, email, password });
export const getListings = () => api.get('/listings');
export const createListing = (listingData) => api.post('/listings', listingData);
export const getListing = (id) => api.get(`/listings/${id}`);
export const updateListing = (id, listingData) => api.put(`/listings/${id}`, listingData);
export const deleteListing = (id) => api.delete(`/listings/${id}`);
export const sendAIMessage = (message) => api.post('/ai/chat', { message });

export default api;
