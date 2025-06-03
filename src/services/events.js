import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getAll = async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  return response.data;
};

export const create = async (newEvent) => {
  const response = await axios.post(`http://localhost:3000/api/events`, newEvent,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  return response.data;
};
