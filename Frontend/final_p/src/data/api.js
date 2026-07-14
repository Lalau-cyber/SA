// src/data/api.js
import axios from 'axios';

const api = axios.create({
  // Endereço da API local (o json-server sobe nesta porta).
  baseURL: "http://127.0.0.1:3000/api",
});

export default api;