import axios from 'axios';
import { apiurl } from '.';

const API = axios.create({ baseURL: apiurl + '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
