import axios from 'axios';

const API_BASE_URL = "https://localhost:5001/api";

export const getPubs = () => {
  return axios.get(`${API_BASE_URL}/pubs`);
};
