import axios from 'axios';
import { apiurl } from '.';

const API = axios.create({ baseURL: apiurl + '/api/payments' });

export const createPayment = async (paymentData) => {
  const { data } = await API.post('/', paymentData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

export const getPayments = async () => {
  const { data } = await API.get('/', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

export const completePayment = async (paymentId) => {
  const { data } = await API.patch(`/${paymentId}`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

