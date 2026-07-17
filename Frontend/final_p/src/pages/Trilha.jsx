import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../data/api.js';
import { Card } from '../components/Card';
import Loading from '../components/Loading.jsx';

export default function Trilha() {
  const [topicos, setTopicos] = useState([]);
  const [carregando, setCarregando] = useState(trues);

// Substitui o useEffect da tua página Trilha.jsx por este:

useEffect(() => {
  if (estudante?.id) {
    api.get(`/trilhas/estudante/${estudante.id}`)
      .then(resposta => setTopicos(resposta.data))
      .catch(() => alert('Erro ao buscar trilha adaptativa.'))
      .finally(() => setCarregando(false));
  }
}, [estudante]);

  if (carregando) return <Loading texto="Carregando sua trilha pedagógica..." />;

  return (
    <div className="max-width-wrapper">
      <div className="flex-between">
        <h2>Sua Trilha Customizada</h2>
        <Link to="/painel" className="texto-link">Ver Meu Desempenho</Link>
      </div>

      {topicos.length === 0 ? (
        <p>Nenhum tópico gerado. Faça o diagnóstico inicial.</p>
      ) : (
        topicos.map((topico) => (
          <Card key={topico.id} titulo={topico.titulo}>
            <p className="descricao">{topico.objetivo}</p>
            <Link to={`/topico/${topico.id}`} className="btn btn-primary" style={{ fontSize: '14px' }}>
              Iniciar Estudo
            </Link>
          </Card>
        ))
      )}
    </div>
  );
}
