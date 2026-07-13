const axios = require('axios');
require('dotenv').config();

// Define a URL oficial do modelo Gemini 1.5 Flash usando a chave do seu arquivo .env
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

async function perguntarAoGemini(prompt) {
  try {
    // Faz a requisição POST para os servidores do Google carregando as instruções do prompt
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json" // Obriga o Gemini a responder em JSON estruturado
      }
    }, {
      timeout: 15000 // evita a requisição ficar pendurada indefinidamente
    });

    // Extrai o texto limpo retornado pela IA
    const textoResposta = response.data.candidates[0].content.parts[0].text;

    // Converte o texto JSON em um objeto que o JavaScript entende
    return JSON.parse(textoResposta);

  } catch (error) {
    // Timeout (nosso limite de 15s estourou)
    if (error.code === 'ECONNABORTED') {
      console.error("Timeout ao chamar o Gemini:", error.message);
      throw new Error("O tutor inteligente demorou demais para responder. Tente novamente.");
    }

    // Erro retornado pela própria API do Gemini (com status HTTP)
    if (error.response) {
      const status = error.response.status;

      if (status === 429) {
        console.error("Limite de requisições do Gemini atingido:", error.response.data);
        throw new Error("Limite de requisições ao tutor inteligente atingido. Aguarde um instante e tente novamente.");
      }

      console.error(`Erro ${status} retornado pelo Gemini:`, error.response.data);
      throw new Error("O tutor inteligente não conseguiu processar a solicitação.");
    }

    // Erro ao converter o JSON de resposta, ou falha de rede sem resposta
    console.error("Erro ao chamar o Gemini via Axios:", error.message);
    throw new Error("Não foi possível obter resposta do tutor inteligente.");
  }
}