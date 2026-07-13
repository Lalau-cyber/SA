import { createContext, useContext, useState } from "react";

const EstudanteContext = createContext(null);

export function EstudanteProvider({ children }) {
  const [estudante, setEstudante] = useState(null);
  const [diagnostico, setDiagnostico] = useState(null);
  const [trilha, setTrilha] = useState([]);
  const [topicosConcluidos, setTopicosConcluidos] = useState([]);

  function identificarEstudante(nome) {
    setEstudante({ id: crypto.randomUUID(), nome });
  }

  function marcarTopicoConcluido(idTopico) {
    setTopicosConcluidos((atual) =>
      atual.includes(idTopico) ? atual : [...atual, idTopico]
    );
  }

  const valor = {
    estudante, identificarEstudante,
    diagnostico, setDiagnostico,
    trilha, setTrilha,
    topicosConcluidos, marcarTopicoConcluido,
  };

  return (
    <EstudanteContext.Provider value={valor}>
      {children}
    </EstudanteContext.Provider>
  );
}

export function useEstudante() {
  const contexto = useContext(EstudanteContext);
  if (!contexto) throw new Error("useEstudante deve ser usado dentro de EstudanteProvider");
  return contexto;
}