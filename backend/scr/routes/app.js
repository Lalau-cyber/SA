// src/app.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api');

const app = express();

app.use(cors());
app.use(express.json());

// Injeta o prefixo universal /api em todas as rotas
app.use('/api', apiRoutes);

module.exports = app;