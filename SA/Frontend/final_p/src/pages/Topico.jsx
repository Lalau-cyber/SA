<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import Botao from "../components/Botao";
import Loading from "../components/Loading";
import QuestaoCard from "../components/QuestaoCard";
import FeedbackBox from "../components/Feedback.jsx";
import { useEstudante } from "../context/EstudanteContext";
import { buscarTopico, enviarAvaliacaoTopico } from "../data/api";

export default function Topico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { estudante, marcarTopicoConcluido } = useEstudante();

  const [topico, setTopico] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const [avaliacao, setAvaliacao] = useState(null);
=======
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
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e

  // useEffect refaz a busca sempre que o :id da rota muda
  useEffect(() => {
<<<<<<< HEAD
    if (!estudante) {
      navigate("/");
      return;
    }

    let cancelado = false;

    async function carregarTopico() {
      setCarregando(true);
      setErro(null);
      setAvaliacao(null);
      setRespostas({});
      try {
        const resposta = await buscarTopico(id);
        if (!cancelado) setTopico(resposta.data);
      } catch (e) {
        if (!cancelado) {
          setErro(e.response?.data?.error || "Não foi possível carregar o tópico.");
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregarTopico();
    return () => { cancelado = true; };
  }, [id, estudante, navigate]);

  function aoSelecionarResposta(questaoId, indiceOpcao) {
    setRespostas((atual) => ({ ...atual, [questaoId]: indiceOpcao }));
  }

  async function aoEnviarRespostas() {
    setErro(null);

    const todasRespondidas = topico.questoes.every((q) => respostas[q.id] !== undefined);
    if (!todasRespondidas) {
      setErro("Responda todas as questões antes de enviar.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await enviarAvaliacaoTopico(topico.id, estudante.id, respostas);
      setAvaliacao(resposta.data);
      if (resposta.data.aprovado) {
        marcarTopicoConcluido(topico.id);
      }
    } catch (e) {
      setErro(e.response?.data?.error || "Não foi possível avaliar suas respostas.");
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) return <Loading texto="Carregando tópico..." />;
  if (erro && !topico) return <div className="erro-formulario">{erro}</div>;
  if (!topico) return null;

  return (
    <div>
      <span className="eyebrow">Tópico</span>
      <h1>{topico.titulo}</h1>
      <p style={{ color: "var(--cor-texto-suave)" }}>{topico.descricao}</p>

      <Card>
        {erro && <div className="erro-formulario">{erro}</div>}

        {topico.questoes.map((questao, indice) => (
          <QuestaoCard
            key={questao.id}
            questao={questao}
            indice={indice}
            respostaSelecionada={respostas[questao.id]}
            onSelecionar={aoSelecionarResposta}
          />
        ))}

        {/* renderização condicional: só mostra o feedback depois de responder */}
        {avaliacao && (
          <FeedbackBox correto={avaliacao.aprovado} texto={avaliacao.feedback} />
        )}

        <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
          {!avaliacao ? (
            <Botao onClick={aoEnviarRespostas} disabled={enviando}>
              {enviando ? "Avaliando..." : "Enviar respostas"}
            </Botao>
          ) : (
            <Botao onClick={() => navigate("/trilha")}>Voltar para a trilha</Botao>
          )}
        </div>
      </Card>
    </div>
  );
}
=======
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
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
