import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,});

export const getUser = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};