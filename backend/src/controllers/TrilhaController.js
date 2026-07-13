// src/controllers/trilhaController.js
const pool = require('../config/db');
const { perguntarAoGemini } = require('./AiController');

// 1. Recebe o teste inicial do Diagnostico.jsx e cria a Trilha com 3 tópicos via Gemini
exports.processarDiagnostico = async (req, res) => {
  const { estudante_id, respostas } = req.body;

  try {
    const prompt = `
      Atue como tutor pedagógico. O estudante respondeu a estas questões de JavaScript: ${JSON.stringify(respostas)}.
      Gere um resumo sobre o nível dele e defina 3 tópicos sequenciais para ele estudar.
      Responda APENAS neste formato JSON:
      {
        "resumo": "Texto da tua análise para o aluno ler.",
        "topicos": [
          { "titulo": "Nome do Tópico 1", "descricao": "O que aprender", "ordem": 1 },
          { "titulo": "Nome do Tópico 2", "descricao": "O que aprender", "ordem": 2 },
          { "titulo": "Nome do Tópico 3", "descricao": "O que aprender", "ordem": 3 }
        ]
      }
    `;

    const resultadoIA = await perguntarAoGemini(prompt);

    // Salva a trilha principal ligada ao aluno
    const novaTrilha = await pool.query(
      'INSERT INTO trilhas (estudante_id, objetivo_estudo) VALUES ($1, $2) RETURNING id',
      [estudante_id, 'Trilha Adaptativa de JavaScript']
    );
    const trilhaId = novaTrilha.rows[0].id;

    // Guarda cada um dos tópicos criados pela IA no banco de dados
    for (const t of resultadoIA.topicos) {
      await pool.query(
        'INSERT INTO topicos (trilha_id, titulo, descricao, ordem) VALUES ($1, $2, $3, $4)',
        [trilhaId, t.titulo, t.descricao, t.ordem]
      );
    }

    // Retorna a chave "resumo" exata que o teu Diagnostico.jsx espera (resultado.resumo)
    res.json({ resumo: resultadoIA.resumo });

  } catch (error) {
    res.status(500).json({ error: "Erro no diagnóstico: " + error.message });
  }
};

// 2. Lista os tópicos da trilha atual para a página Trilhas.jsx
exports.obterTrilhaEstudante = async (req, res) => {
  const { estudante_id } = req.params;
  try {
    const dados = await pool.query(
      `SELECT id, titulo, descricao FROM topicos 
       WHERE trilha_id = (SELECT id FROM trilhas WHERE estudante_id = $1 ORDER BY criado_em DESC LIMIT 1)
       ORDER BY ordem`,
      [estudante_id]
    );
    // Retorna o objeto envelopado em "topicos" que o teu resposta.data.topicos lê no React
    res.json({ topicos: dados.rows });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar trilha: " + error.message });
  }
};

// 3. Carrega o tópico e gera as perguntas de escolha múltipla para o Topico.jsx
exports.obterTopicoComQuestoes = async (req, res) => {
  const { id } = req.params;
  try {
    const topicoFato = await pool.query('SELECT id, titulo, descricao FROM topicos WHERE id = $1', [id]);
    if (topicoFato.rows.length === 0) return res.status(404).json({ error: "Tópico não encontrado" });

    const topico = topicoFato.rows[0];

    // Se já existirem questões criadas no banco, reutiliza para não gastar chamadas da IA
    let questoesExistentes = await pool.query('SELECT id, enunciado, opcoes FROM questoes WHERE topico_id = $1', [id]);

    if (questoesExistentes.rows.length === 0) {
      const promptQuestoes = `
        Crie 2 perguntas de escolha múltipla sobre o tema "${topico.titulo}".
        Responda apenas em formato JSON:
        {
          "questoes": [
            {
              "enunciado": "Pergunta técnica?",
              "opcoes": ["Opção 0", "Opção 1", "Opção 2", "Opção 3"],
              "resposta_correta_indice": 1
            }
          ]
        }
      `;
      const respostaIA = await perguntarAoGemini(promptQuestoes);

      for (const q of respostaIA.questoes) {
        const novaQ = await pool.query(
          'INSERT INTO questoes (topico_id, enunciado, opcoes, resposta_correta_indice) VALUES ($1, $2, $3, $4) RETURNING id, enunciado, opcoes',
          [id, q.enunciado, q.opcoes, q.resposta_correta_indice]
        );
        questoesExistentes.rows.push(novaQ.rows[0]);
      }
    }

    // Monta o retorno idêntico ao contrato do teu front-end (topico.questoes.map)
    res.json({
      id: topico.id,
      titulo: topico.titulo,
      descricao: topico.descricao,
      questoes: questoesExistentes.rows
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao carregar o tópico: " + error.message });
  }
};

// 4. Valida os botões radio selecionados no Topico.jsx e guarda o feedback
exports.avaliarRespostasTopico = async (req, res) => {
  const { topico_id, estudante_id, respostas } = req.body;

  try {
    const questoesSalvas = await pool.query('SELECT id, resposta_correta_indice FROM questoes WHERE topico_id = $1', [topico_id]);
    
    let acertos = 0;
    questoesSalvas.rows.forEach(q => {
      if (respostas[q.id] === q.resposta_correta_indice) {
        acertos++;
      }
    });

    const aprovado = acertos === questoesSalvas.rows.length;

    const promptFeedback = `
      O aluno terminou o tópico ID ${topico_id} e acertou ${acertos} de ${questoesSalvas.rows.length} questões.
      Escreva uma mensagem de feedback curta direcionada a ele explicando ou motivando o resultado.
      Responda apenas em JSON: { "feedback": "Mensagem aqui." }
    `;
    const resultadoIA = await perguntarAoGemini(promptFeedback);

    await pool.query(
      `INSERT INTO respostas_avaliacoes (estudante_id, topico_id, aprovado, feedback) 
       VALUES ($1, $2, $3, $4)`,
      [estudante_id, topico_id, aprovado, resultadoIA.feedback]
    );

    // Alimenta o teu const resposta = await enviarAvaliacaoTopico(...) -> avaliacao.aprovado e avaliacao.feedback
    res.json({
      aprovado: aprovado,
      feedback: resultadoIA.feedback
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao avaliar respostas: " + error.message });
  }
};