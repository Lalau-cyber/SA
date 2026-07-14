import { createContext, useContext, useState } from "react";
import api from "../data/api.js";

const EstudanteContext = createContext(null);

export function EstudanteProvider({ children }) {
  const [estudante, setEstudante] = useState(null);
  const [diagnostico, setDiagnostico] = useState(null);
  const [trilha, setTrilha] = useState([]);
  const [topicosConcluidos, setTopicosConcluidos] = useState([]);

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
  }
}

  // CORRIGIDO: Envia para a rota exata do teu TrilhaController
  async function enviarDiagnostico(estudante_id, respostas) {
    return api.post('/trilhas/diagnostico', { estudante_id, respostas });
  }

  const valor = {
    estudante, setEstudante, identificarEstudante,
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