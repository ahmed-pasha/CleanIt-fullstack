import axios from 'axios';
import { apiurl } from '.';

const API = axios.create({ baseURL : apiurl + '/api/auth' });

export const login = async (credentials) => {
  const { data } = await API.post('/login', credentials);
  return data;
};

export const register = async (userData) => {
  const { data } = await API.post('/register', userData);
  return data;
};

