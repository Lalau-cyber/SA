// src/controllers/EstudanteController.js
const pool = require('../config/db');

// Registrar ou identificar um estudante
exports.identificarEstudante = async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Informe nome e email do estudante." });
  }

  try {
    // Verifica se o estudante já existe
    const estudanteExistente = await pool.query(
      'SELECT id, nome, email FROM estudantes WHERE email = $1',
      [email]
    );

    let estudante;
    if (estudanteExistente.rows.length > 0) {
      estudante = estudanteExistente.rows[0];
    } else {
      // Cria novo estudante
      const novoEstudante = await pool.query(
        'INSERT INTO estudantes (nome, email) VALUES ($1, $2) RETURNING id, nome, email',
        [nome, email]
      );
      estudante = novoEstudante.rows[0];
    }

    res.json({ estudante_id: estudante.id, nome: estudante.nome, email: estudante.email });
  } catch (error) {
    res.status(500).json({ error: "Erro ao identificar estudante: " + error.message });
  }
};

// Obter o histórico de aprendizado de um estudante
// BUG CORRIGIDO: fazia JOIN com "avaliacoes", mas quem grava é avaliarRespostasTopico(),
// que insere em "respostas_avaliacoes". Alinhado com o nome real da tabela.
exports.obterHistoricoEstudante = async (req, res) => {
  const { estudante_id } = req.params;

  try {
    const historico = await pool.query(
      `SELECT t.id AS trilha_id, t.objetivo_estudo, tp.id AS topico_id, tp.titulo, tp.descricao, tp.ordem,
              ra.aprovado, ra.feedback, ra.respondido_em
       FROM trilhas t
       LEFT JOIN topicos tp ON t.id = tp.trilha_id
       LEFT JOIN respostas_avaliacoes ra ON tp.id = ra.topico_id AND ra.estudante_id = t.estudante_id
       WHERE t.estudante_id = $1
       ORDER BY t.id DESC, tp.ordem ASC`,
      [estudante_id]
    );

    res.json(historico.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter histórico: " + error.message });
  }
};