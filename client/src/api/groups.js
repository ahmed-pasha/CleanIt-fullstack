import axios from 'axios';
import { apiurl } from '.';

const API = axios.create({ baseURL:  apiurl +'/api/groups' });

export const createGroup = async (groupData) => {
  const { data } = await API.post('/', groupData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

export const addMember = async (groupId, memberData) => {
  const { data } = await API.post('/add-member', { groupId, ...memberData }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

