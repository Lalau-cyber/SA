import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Painel() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/estudante/historico')
      .then(res => setHistorico(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <h2>Seu Desempenho</h2>
      {loading ? (
        <p>Carregando histórico...</p>
      ) : historico.length === 0 ? (
        <p>Você ainda não realizou nenhuma atividade.</p>
      ) : (
        <ul>
          {historico.map(item => (
            <li key={item.id}>{item.topicoNome} - Nota: {item.nota}</li>
          ))}
        </ul>
      )}
    </div>
  );
}