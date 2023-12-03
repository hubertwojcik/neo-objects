import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1',
});
