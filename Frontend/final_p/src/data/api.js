// src/data/api.js (ou onde gerenciar suas requisições)
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Note o prefixo /api
});

export async function identificarEstudanteNoBanco(nome) {
  return await api.post("/estudantes", { nome });
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

export default api;