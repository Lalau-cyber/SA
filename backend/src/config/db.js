const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao ligar o PostgreSQL:', err.stack);
    return;
  }
  console.log('✅ Conexão com PostgreSQL realizada com sucesso!');
  if (release) release();
});

module.exports = pool;