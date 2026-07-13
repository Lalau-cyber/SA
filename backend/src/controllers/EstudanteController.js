// src/controllers/EstudanteController.js
const pool = require('../config/db');

// Registrar ou identificar um estudante
exports.identificarEstudante = async (req, res) => {
  const { nome, email } = req.body;

  try {
    // Verifica se o estudante já existe
    const estudanteExistente = await pool.query(
      'SELECT id FROM estudantes WHERE email = $1',
      [email]
    );

    let estudante;
    if (estudanteExistente.rows.length > 0) {
      estudante = estudanteExistente.rows[0];
    } else {
      // Cria novo estudante
      const novoEstudante = await pool.query(
        'INSERT INTO estudantes (nome, email) VALUES ($1, $2) RETURNING id',
        [nome, email]
      );
      estudante = novoEstudante.rows[0];
    }

    res.json({ estudante_id: estudante.id });
  } catch (error) {
    res.status(500).json({ error: "Erro ao identificar estudante: " + error.message });
  }
};

// Obter o histórico de aprendizado de um estudante
exports.obterHistoricoEstudante = async (req, res) => {
  const { estudante_id } = req.params;

  try {
    const historico = await pool.query(
      `SELECT t.id, t.objetivo_estudo, tp.titulo, tp.descricao, tp.ordem, a.respondeu_em
       FROM trilhas t
       LEFT JOIN topicos tp ON t.id = tp.trilha_id
       LEFT JOIN avaliacoes a ON tp.id = a.topico_id
       WHERE t.estudante_id = $1
       ORDER BY t.id DESC, tp.ordem ASC`,
      [estudante_id]
    );

    res.json(historico.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter histórico: " + error.message });
  }
};