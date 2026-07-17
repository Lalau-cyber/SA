<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useEstudante } from "../context/EstudanteContext";
import { buscarHistoricoEstudante } from "../data/api";
=======
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../data/api.js';
import { Card } from '../components/Card';
import BarraProgresso from '../components/BarraProgresso.jsx';
import { useEstudante } from '../context/EstudanteContext.jsx';
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e

export default function Painel() {
  const { estudante, topicosConcluidos } = useEstudante();
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
<<<<<<< HEAD
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!estudante) {
      navigate("/");
      return;
    }

    let cancelado = false;

    async function carregarHistorico() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await buscarHistoricoEstudante(estudante.id);
        if (!cancelado) setHistorico(resposta.data);
      } catch (e) {
        if (!cancelado) {
          setErro(e.response?.data?.error || "Não foi possível carregar seu histórico.");
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregarHistorico();
    return () => { cancelado = true; };
  }, [estudante, navigate]);

  const topicosComResposta = historico.filter((h) => h.topico_id && h.respondido_em);
  const aprovados = topicosComResposta.filter((h) => h.aprovado).length;

  if (carregando) return <Loading texto="Carregando seu painel..." />;

  return (
    <div>
      <span className="eyebrow">Passo 3 de 3</span>
      <h1>Painel do estudante</h1>
      <p style={{ color: "var(--cor-texto-suave)" }}>
        Olá, {estudante?.nome}. Aqui está o resumo da sua jornada até agora.
      </p>

      {erro && <div className="erro-formulario">{erro}</div>}

      <div className="painel-resumo">
        <div className="painel-metrica">
          <div className="painel-metrica__valor">{topicosConcluidos.length}</div>
          <div className="painel-metrica__rotulo">tópicos concluídos nesta sessão</div>
        </div>
        <div className="painel-metrica">
          <div className="painel-metrica__valor">{topicosComResposta.length}</div>
          <div className="painel-metrica__rotulo">avaliações respondidas</div>
        </div>
        <div className="painel-metrica">
          <div className="painel-metrica__valor">{aprovados}</div>
          <div className="painel-metrica__rotulo">aprovações</div>
        </div>
      </div>

      <Card titulo="Histórico">
        {historico.length === 0 ? (
          <div className="estado-vazio">
            <p>Ainda não há histórico. Comece pela sua trilha!</p>
          </div>
        ) : (
          historico
            .filter((h) => h.topico_id)
            .map((item) => (
              <div className="historico-linha" key={item.topico_id}>
                <div>
                  <div className="historico-linha__titulo">{item.titulo}</div>
                  <div className="historico-linha__data">
                    {item.respondido_em
                      ? `respondido em ${new Date(item.respondido_em).toLocaleDateString("pt-BR")}`
                      : "ainda não respondido"}
                  </div>
                </div>
                {item.respondido_em && (
                  <span
                    className={`trilha-marco__selo ${
                      item.aprovado ? "trilha-marco__selo--ok" : "trilha-marco__selo--pendente"
                    }`}
                  >
                    {item.aprovado ? "aprovado" : "revisar"}
                  </span>
                )}
              </div>
            ))
        )}
      </Card>
    </div>
  );
}
=======
  const { estudante } = useEstudante();

useEffect(() => {
  if (!estudante?.id) return;
  api.get(`/estudante/historico/${estudante.id}`)
    .then(res => setHistorico(res.data))
    .finally(() => setCarregando(false));
}, [estudante]);

  const totalTopicos = historico.length;
  const concluidos = historico.filter(item => item.status === 'Aprovado').length;

  return (
    <div className="max-width-wrapper">
      <div className="flex-between">
        <h2>Painel de Evolução</h2>
        <BarraProgresso concluidos={concluidos} total={totalTopicos} />
        <Link to="/trilha" className="texto-link">Retornar à Trilha</Link>
      </div>

      {carregando ? (
        <p>Buscando histórico...</p>
      ) : historico.length === 0 ? (
        <p>Nenhuma avaliação registrada ainda.</p>
      ) : (
        historico.map(item => (
          <Card key={item.id} titulo={item.titulo_modulo}>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Sua Resposta:</strong> {item.resposta_enviada}</p>
            <div className={`feedback-box ${item.status === 'Aprovado' ? 'feedback-correto' : 'feedback-atencao'}`}>
              <strong>Parecer Pedagógico da IA:</strong> {item.feedback_ia}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
