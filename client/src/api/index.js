import axios from 'axios';

const API = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', 
  // baseURL: 'http://localhost:5000', 
  baseURL: 'https://clean-it-backend.vercel.app', 
});

export default API;

export const apiurl = 'https://clean-it-backend.vercel.app'

export const token = JSON.stringify(localStorage.getItem('token'))

export const userdetails = JSON.parse(localStorage.getItem('user'));
export const role = userdetails ? userdetails.role : null;

