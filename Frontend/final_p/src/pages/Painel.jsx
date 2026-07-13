import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import api from '../data/api.js';
import Card from '../components/Card';
import BarraProgresso from '../components/BarraProgresso.jsx';

export default function Painel() {
    const [historico, setHistorico] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        api.get('/painel-estudante')
            .then(res => setHistorico(res.data))
            .finally(() => setCarregando(false));
    }, []);

    const totalTopicos = historico.length;
const concluidos = historico.filter(item => item.status === 'Aprovado').length;

    return (
        <div className="max-width-wrapper">
            <div className="flex-between">
                <h2>Painel de Evolução</h2>
                <BarraProgresso concluidos={concluidos} total={totalTopicos} />

                <Link to="/trilha" className="texto-link">Retornar à Trilha</Link>
            </div>

            {/* TRATAMENTO DE ESTADO COMPLETO (CARREGANDO / VAZIO / CONTEÚDO) */}
            {carregando ? (
                <p>Buscando histórico persistido no PostgreSQL...</p>
            ) : historico.length === 0 ? (
                <p>Nenhuma avaliação registrada no histórico do banco relacional.</p>
            ) : (
                historico.map(item => (
                    <Card key={item.id} titulo={item.titulo_modulo}>
                        <p style={{fontSize: '14px', marginBottom: '8px'}}><strong>Sua Resposta:</strong> {item.resposta_enviada}</p>
                        <div className={`feedback-box ${item.status === 'Aprovado' ? 'feedback-correto' : 'feedback-atencao'}`}>
                            <strong>Parecer Pedagógico da IA:</strong> {item.feedback_ia}
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
=======
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
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2
}