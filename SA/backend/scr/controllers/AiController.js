// src/controllers/AiController.js
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

// Cliente oficial do Gemini. Usa a mesma variável de ambiente de antes,
// só que agora via SDK em vez de chamada HTTP crua com axios.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { timeout: 30000 }, // evita a requisição ficar pendurada indefinidamente
});

const MODELO = 'gemini-3.5-flash';

async function perguntarAoGemini(prompt, tentativas = 3) {
  for (let tentativa = 1; tentativa <= tentativas; tentativa++) {
    try {
      const response = await ai.models.generateContent({
        model: MODELO,
        contents: prompt,
        config: {
          responseMimeType: 'application/json', // obriga o Gemini a responder em JSON estruturado
        },
      });

      // response.text já vem com o texto puro gerado pelo modelo
      const textoResposta = response.text;

      // Converte o texto JSON em um objeto que o JavaScript entende
      return JSON.parse(textoResposta);

    } catch (error) {
      const status = error?.status ?? error?.code ?? error?.response?.status;

      // Timeout (nosso limite de 15s estourou)
      if (error?.name === 'AbortError' || error?.code === 'ECONNABORTED') {
        console.error('Timeout ao chamar o Gemini:', error.message);
        throw new Error('O tutor inteligente demorou demais para responder. Tente novamente.');
      }

      // Chave inválida, ausente, ou sem permissão para o modelo
      if (status === 401 || status === 403) {
        console.error('Erro de autenticação com o Gemini:', error.message);
        throw new Error(
          'A chave da API do Gemini está inválida ou sem permissão. Verifique a GEMINI_API_KEY no .env.'
        );
      }

      // Limite de requisições atingido
      if (status === 429) {
        console.error('Limite de requisições do Gemini atingido:', error.message);
        throw new Error('Limite de requisições ao tutor inteligente atingido. Aguarde um instante e tente novamente.');
      }

      // Modelo sobrecarregado (503) ou operação estourou o prazo do lado do Google (504)
      // — em ambos os casos vale tentar de novo com espera crescente
      if (status === 503 || status === 504) {
        if (tentativa < tentativas) {
          const espera = 1000 * 2 ** (tentativa - 1); // 1s, 2s, 4s...
          console.warn(
            `Gemini indisponível (${status}). Tentativa ${tentativa}/${tentativas}, ` +
            `nova tentativa em ${espera}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, espera));
          continue; // tenta de novo
        }
        console.error(`Gemini indisponível (${status}) após todas as tentativas:`, error.message);
        throw new Error('O tutor inteligente está demorando ou indisponível no momento. Tente novamente em instantes.');
      }

      // Qualquer outro erro retornado pela API do Gemini (com status HTTP)
      if (status) {
        console.error(`Erro ${status} retornado pelo Gemini:`, error.message);
        throw new Error('O tutor inteligente não conseguiu processar a solicitação.');
      }

      // Erro ao converter o JSON de resposta, ou falha de rede sem resposta
      console.error('Erro ao chamar o Gemini via SDK:', error.message);
      throw new Error('Não foi possível obter resposta do tutor inteligente.');
    }
  }
}

module.exports = { perguntarAoGemini };