import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../data/api.js';
import { QuestaoCard } from '../components/Card';
import Botao from '../components/Botao';
import FeedbackBox from '../components/FeedBack';

export default function Topicos() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dadosTopico, setDadosTopico] = useState(null);
  const [respostaEstudante, setRespostaEstudante] = useState('');
  const [feedbackIa, setFeedbackIa] = useState(null);
  const [respopsta, setResposta] = useState({})

  useEffect(() => {
    api.get(`/topico/${id}`)
      .then(res => {
        setDadosTopico(res.data);
        setFeedbackIa(null);
        setRespostaEstudante('');
      });
  }, [id]);

  const submeterAvaliacao = async () => {
  if (!respostaEstudante.trim()) {
    alert("Por favor, digite a sua resposta ou dúvida antes de enviar!");
    return;
  }

  try {
    // Aponta exatamente para a rota configurada no seu Node.js (api.js)
    const res = await api.post(`/avaliacoes/responder`, { 
      topico_id: id,
      estudante_id: estudante.id, // Garanta que 'estudante' vem do useEstudante()
      respostas: { duvida: respostaEstudante } // Envia a dúvida/resposta estruturada
    });

    // Armazena o JSON devolvido pelo Gemini no estado para exibir no ecrã
    setFeedbackIa(res.data); 
  } catch (erro) {
    console.error(erro);
    alert('Falha ao processar a resposta em tempo real com o Gemini.');
  }
};

  if (!dadosTopico) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Buscando dados do módulo...</p>;

  return (
    <div className="max-width-wrapper">
      <Card titulo={dadosTopico.titulo}>
        <p className="descricao" style={{ fontSize: '16px' }}>{dadosTopico.conteudo_estudo}</p>
      </Card>

      <Card titulo="Avaliação de Progresso (Agente IA)">
        <p style={{ fontWeight: '600', marginBottom: '12px' }}>{dadosTopico.questao_gerada}</p>
        <textarea
          value={respostaEstudante}
          onChange={e => setRespostaEstudante(e.target.value)}
          className="textarea-controle"
          placeholder="Redija sua resposta técnica detalhada..."
        />

        <div className="btn-grupo">
          <Botao onClick={submeterAvaliacao}>Submeter ao Avaliador</Botao>
          <Botao variante="secondary" onClick={() => navigate('/trilha')}>Voltar para Trilha</Botao>
        </div>

        {feedbackIa && (
          <FeedbackBox
            resultado={feedbackIa.status}
            texto={feedbackIa.analise}
          />
        )}
      </Card>
    </div>
  );
}
