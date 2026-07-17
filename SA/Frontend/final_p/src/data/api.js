// src/data/api.js
import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:3000/api",
});

export async function identificarEstudanteNoBanco(nome, email) {
  return await api.post("/estudantes", { nome, email });
}

export async function enviarDiagnostico(estudante_id, respostas) {
  return await api.post("/trilhas/diagnostico", { estudante_id, respostas });
}

export async function buscarTrilha(estudante_id) {
  return await api.get(`/trilhas/estudante/${estudante_id}`);
}

export async function buscarTopico(id) {
  return await api.get(`/topicos/${id}`);
}

export async function enviarAvaliacaoTopico(topico_id, estudante_id, respostas) {
  return await api.post("/avaliacoes/responder", { topico_id, estudante_id, respostas });
}

export async function buscarHistoricoEstudante(estudante_id) {
  return await api.get(`/estudante/historico/${estudante_id}`);
}

=======
  // Endereço da API local (o json-server sobe nesta porta).
  baseURL: "http://127.0.0.1:3000/api",
});

>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
export default api;