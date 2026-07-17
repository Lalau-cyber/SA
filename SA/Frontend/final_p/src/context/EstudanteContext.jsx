import { createContext, useContext, useState } from "react";
<<<<<<< HEAD
import { identificarEstudanteNoBanco } from "../data/api";
=======
import api from "../data/api.js";
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e

const EstudanteContext = createContext(null);

export function EstudanteProvider({ children }) {
  const [estudante, setEstudante] = useState(null);
  const [diagnostico, setDiagnostico] = useState(null);
  const [trilha, setTrilha] = useState([]);
  const [topicosConcluidos, setTopicosConcluidos] = useState([]);

<<<<<<< HEAD
  // BUG CORRIGIDO: antes gerava um id aleatório só no navegador (crypto.randomUUID()),
  // sem nenhuma ligação com o banco. Como trilhas, tópicos e avaliações são todos
  // amarrados ao estudante_id do PostgreSQL, o estudante precisa ser criado/identificado
  // de fato no back-end.
  async function identificarEstudante(nome, email) {
    const resposta = await identificarEstudanteNoBanco(nome, email);
    const novoEstudante = {
      id: resposta.data.estudante_id,
      nome: resposta.data.nome,
      email: resposta.data.email,
    };
    setEstudante(novoEstudante);
    return novoEstudante;
  }

  function sairComoEstudante() {
    setEstudante(null);
    setDiagnostico(null);
    setTrilha([]);
    setTopicosConcluidos([]);
=======
  // CORRIGIDO: Agora envia ao Node.js e guarda o ID gerado pelo PostgreSQL
async function identificarEstudante(nome, email) {
  try {
    const resposta = await api.post('/estudantes', { nome, email });
    
    // ATENÇÃO AQUI: pegando o "estudante_id" que vem do Node.js
    setEstudante({ id: resposta.data.estudante_id, nome }); 
    return resposta.data;
  } catch (erro) {
    console.error("Erro no context do estudante:", erro);
    throw erro;
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
  }
}

  // CORRIGIDO: Envia para a rota exata do teu TrilhaController
  async function enviarDiagnostico(estudante_id, respostas) {
    return api.post('/trilhas/diagnostico', { estudante_id, respostas });
  }

  const valor = {
<<<<<<< HEAD
    estudante, identificarEstudante, sairComoEstudante,
=======
    estudante, setEstudante, identificarEstudante,
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
    diagnostico, setDiagnostico,
    trilha, setTrilha,
    topicosConcluidos, setTopicosConcluidos,
    enviarDiagnostico,
  };

  return (
    <EstudanteContext.Provider value={valor}>
      {children}
    </EstudanteContext.Provider>
  );
}

export function useEstudante() {
  return useContext(EstudanteContext);
}