import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getAll = async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  return response.data;
};
