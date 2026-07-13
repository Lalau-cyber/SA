// src/server.js
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ativo e sincronizado com o PostgreSQL na porta ${PORT}`);
});