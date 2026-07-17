// src/controllers/TrilhaController.js
const pool = require('../config/db');
const { perguntarAoGemini } = require('./AiController');

// 1. Recebe o teste inicial do Diagnostico.jsx e cria a Trilha com 3 tópicos via Gemini
exports.processarDiagnostico = async (req, res) => {
<<<<<<< HEAD
  const { estudante_id, respostas } = req.body;
  const { tema, duvidas } = respostas || {};

  if (!estudante_id || !tema) {
    return res.status(400).json({ error: "estudante_id e o tema de estudo são obrigatórios." });
  }

  try {
    // Prompt genérico: o estudante define livremente o assunto e suas dúvidas,
    // não fica preso a nenhuma área específica (pode ser programação, idiomas,
    // história, matemática, música, o que for).
    const prompt = `
      Atue como um tutor pedagógico especialista em qualquer área do conhecimento.
      O estudante quer aprender sobre: "${tema}".
      Ele descreveu o que já sabe e/ou suas dúvidas assim: "${duvidas || "não informou dúvidas específicas"}".

      Com base nisso, gere um resumo curto sobre o nível de conhecimento dele nesse assunto
      e defina 3 tópicos sequenciais e coerentes para ele estudar, do mais básico ao mais avançado,
      relacionados ao tema informado.

      Responda APENAS neste formato JSON:
=======
  const { estudante_id, respostas } = req.body; // respostas agora contém { assunto_duvida, deseja_melhorar }

  try {
    // Novo prompt interpretando as dores e objetivos reais do estudante
    const prompt = `
      Atue como um tutor pedagógico de programação especialista e compassivo.
      O estudante se identificou e relatou o seguinte diagnóstico sobre seus estudos:
      - Principais dúvidas/dificuldades: "${respostas.assunto_duvida}"
      - O que deseja focar/melhorar: "${respostas.deseja_melhorar}"

      Com base nessas informações, crie um plano de estudo personalizado contendo exatamente 3 tópicos sequenciais para sanar essas dores.
      Para cada tópico, você deve gerar uma explicação teórica robusta e uma questão aberta instigante para avaliar o aprendizado.

      Responda APENAS no formato JSON estruturado abaixo:
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
      {
        "resumo": "Uma mensagem acolhedora analisando as dificuldades que o aluno citou e explicando como esta trilha vai ajudá-lo.",
        "topicos": [
          {
            "titulo": "Nome direto do Tópico 1",
            "descricao": "Resumo curto do objetivo deste tópico",
            "conteudo_estudo": "Texto completo contendo a aula teórica explicativa focada em resolver a dúvida que ele citou.",
            "questao_gerada": "Uma pergunta aberta ou desafio conceitual prático para o aluno responder/digitar a dúvida dele de volta.",
            "ordem": 1
          },
          {
            "titulo": "Nome direto do Tópico 2",
            "descricao": "Resumo curto do objetivo deste tópico",
            "conteudo_estudo": "Texto completo contendo a aula teórica explicativa avançando no conceito.",
            "questao_gerada": "Uma pergunta aberta ou desafio conceitual prático sobre este tópico.",
            "ordem": 2
          },
          {
            "titulo": "Nome direto do Tópico 3",
            "descricao": "Resumo curto do objetivo deste tópico",
            "conteudo_estudo": "Texto completo contendo a aula teórica explicativa concluindo a trilha.",
            "questao_gerada": "Uma pergunta aberta final para consolidação do conhecimento.",
            "ordem": 3
          }
        ]
      }
    `;

    const resultadoIA = await perguntarAoGemini(prompt);

<<<<<<< HEAD
    // Salva a trilha principal ligada ao aluno, usando o tema que o próprio estudante definiu
    const novaTrilha = await pool.query(
      'INSERT INTO trilhas (estudante_id, objetivo_estudo) VALUES ($1, $2) RETURNING id',
      [estudante_id, tema]
=======
    // 1. Salva a trilha ligada ao estudante
    const novaTrilha = await pool.query(
      'INSERT INTO trilhas (estudante_id, objetivo_estudo) VALUES ($1, $2) RETURNING id',
      [estudante_id, respostas.assunto_duvida]
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
    );
    const trilhaId = novaTrilha.rows[0].id;

    // 2. Salva os tópicos enriquecidos gerados pelo Gemini
    for (const topico of resultadoIA.topicos) {
      await pool.query(
        `INSERT INTO topicos (trilha_id, titulo, descricao, conteudo_estudo, questao_gerada, ordem) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [trilhaId, topico.titulo, topico.descricao, topico.conteudo_estudo, topico.questao_gerada, topico.ordem]
      );
    }

<<<<<<< HEAD
    // Retorna a chave "resumo" exata que o teu Diagnostico.jsx espera (resultado.resumo)
    res.json({ resumo: resultadoIA.resumo, trilha_id: trilhaId });
=======
    // Retorna o resumo para a tela de diagnóstico do front-end
    res.json({ resumo: resultadoIA.resumo });
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e

  } catch (error) {
    console.error("Erro no processarDiagnostico:", error);
    res.status(500).json({ error: "Erro interno ao processar o diagnóstico com a inteligência artificial." });
  }
};

// 2. Lista os tópicos da trilha atual para a página Trilhas.jsx
exports.obterTrilhaEstudante = async (req, res) => {
  const { estudante_id } = req.params;
  try {
    const dados = await pool.query(
      `SELECT id, titulo, descricao, ordem FROM topicos 
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

    // Evita duplicar registro se o aluno responder o mesmo tópico mais de uma vez
    await pool.query(
      `INSERT INTO respostas_avaliacoes (estudante_id, topico_id, aprovado, feedback)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (estudante_id, topico_id)
       DO UPDATE SET aprovado = EXCLUDED.aprovado, feedback = EXCLUDED.feedback, respondido_em = NOW()`,
      [estudante_id, topico_id, aprovado, resultadoIA.feedback]
    );

    // Alimenta o teu const resposta = await enviarAvaliacaoTopico(...) -> avaliacao.aprovado e avaliacao.feedback
    res.json({
      aprovado: aprovado,
      acertos,
      total: questoesSalvas.rows.length,
      feedback: resultadoIA.feedback
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao avaliar respostas: " + error.message });
  }
};