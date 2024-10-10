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

export const login = (email: string, password: string) => api.post('/auth/login', { email, password });
export const register = (username: string, email: string, password: string) => api.post('/auth/register', { username, email, password });
export const getListings = () => api.get('/listings');
export const createListing = (listingData: any) => api.post('/listings', listingData);
export const getListing = (id: string) => api.get(`/listings/${id}`);
export const updateListing = (id: string, listingData: any) => api.put(`/listings/${id}`, listingData);
export const deleteListing = (id: string) => api.delete(`/listings/${id}`);
export const sendAIMessage = (message: string) => api.post('/ai/chat', { message });

export default api;