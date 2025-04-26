// src/api/wildlife.js

import axios from 'axios';

const BASE_URL = 'https://wildlife-api.vercel.app/api/species';

// Search species by common name
export async function searchSpecies(commonName) {
  const response = await axios.get(`${BASE_URL}/${encodeURIComponent(commonName)}`);
  return response.data;
}
