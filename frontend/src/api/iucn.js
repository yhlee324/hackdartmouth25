import axios from 'axios';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_BASE_URL = 'https://apiv3.iucnredlist.org/api/v3';
const API_KEY = 'DEkiKmAhNDK2skk1VzV73TXqUw8WPGRpXMn2';

export async function searchSpecies(searchText) {
  const response = await axios.get(`${CORS_PROXY}${API_BASE_URL}/species/search/${encodeURIComponent(searchText)}`, {
    params: { token: API_KEY }
  });
  return response.data.result || [];
}

export async function getDetails(taxonId) {
  const response = await axios.get(`${CORS_PROXY}${API_BASE_URL}/species/id/${taxonId}`, {
    params: { token: API_KEY }
  });
  return response.data.result[0] || {};
}

export async function getCountries(taxonId) {
  const response = await axios.get(`${CORS_PROXY}${API_BASE_URL}/species/countries/id/${taxonId}`, {
    params: { token: API_KEY }
  });
  return (response.data.result || []).map(c => c.iso_code);
}
