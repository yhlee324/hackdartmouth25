import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/species'
});

export const fetchSpecies = params =>
    API.get('/', { params }).then(res => res.data);

export const fetchSpeciesById = id =>
    API.get(`/${id}`).then(res => res.data);

export const createSpecies = payload =>
    API.post('/', payload).then(res => res.data);
  
export const updateSpecies = (id, payload) =>
    API.put(`/${id}`, payload).then(res => res.data);
  
export const deleteSpecies = id =>
    API.delete(`/${id}`).then(res => res.data);