import axios from 'axios';

const GOMAPS_API_KEY = import.meta.env.VITE_GOMAPS_API_KEY;

const BASE_URL = 'https://gomaps.pro/api/';

export const getAddress = (address) => {
  return axios.get(`${BASE_URL}geocode?address=${address}&key=${GOMAPS_API_KEY}`);
};

export const getDirections = (origin, destination) => {
  return axios.get(`${BASE_URL}directions?origin=${origin}&destination=${destination}&key=${GOMAPS_API_KEY}`);
};
