import axios from 'axios';
import { apiurl } from '.';

const API = axios.create({ baseURL: apiurl + '/api/gigs' });

export const fetchGigs = async (lat, lon) => {
  const { data } = await API.get('/', {
    params: { lat, lon },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};
export const fetchGigsById = async (gigId) => {
  const { data } = await API.get('/'+gigId, {
   
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

export const fetchGigsbyUser = async () => {
  const { data } = await API.get('/user', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

export const createGig = async (gigData) => {
  const { data } = await API.post('/', gigData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

export const bidOnGig = async (id, bidAmount) => {
  const { data } = await API.post(`/${id}/bid`, {bidAmount}, 
    {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  console.log(data);
  
  return data;
};


export const assignGigToUser = async (gigId, userId, bidAmount) => {
  try {
    const response = await axios.post(
      `${apiurl}/api/gigs/${gigId}/addgigtouser`,
      { userId, bidAmount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for authentication
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error assigning gig to user:', error);
    throw error.response?.data?.message || error.message;
  }
};


export const getAssignedGigs = async (userId) => {
  try {
    const response = await axios.get(
      `${apiurl}/api/gigs/${userId}/getUserGigs`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for authentication
        },
      }
    );
    return response.data.assignedGigs;
  } catch (error) {
    console.error('Error fetching assigned gigs:', error);
    throw error.response?.data?.message || error.message;
  }
};