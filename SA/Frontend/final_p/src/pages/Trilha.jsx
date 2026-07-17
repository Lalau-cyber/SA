<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";
import BarraProgresso from "../components/BarraProgresso";
import { useEstudante } from "../context/EstudanteContext";
import { buscarTrilha } from "../data/api";

export default function Trilha() {
  const { estudante, trilha, setTrilha, topicosConcluidos } = useEstudante();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!estudante) {
      navigate("/");
      return;
    }

    let cancelado = false;

    async function carregarTrilha() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await buscarTrilha(estudante.id);
        if (!cancelado) setTrilha(resposta.data.topicos);
      } catch (e) {
        if (!cancelado) {
          setErro(
            e.response?.data?.error || "Não foi possível carregar sua trilha."
          );
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregarTrilha();
    return () => { cancelado = true; };
  }, [estudante, navigate, setTrilha]);

  if (carregando) return <Loading texto="Carregando sua trilha..." />;

  return (
    <div>
      <span className="eyebrow">Passo 2 de 3</span>
      <h1>Sua trilha de estudo</h1>

      {erro && <div className="erro-formulario">{erro}</div>}

      {!erro && trilha.length === 0 && (
        <div className="estado-vazio">
          <p>Você ainda não tem uma trilha gerada.</p>
          <Link to="/diagnostico">Fazer o diagnóstico</Link>
        </div>
      )}

      {trilha.length > 0 && (
        <>
          <BarraProgresso concluidos={topicosConcluidos.length} total={trilha.length} />

          <div className="trilha-caminho">
            {trilha.map((topico) => {
              const concluido = topicosConcluidos.includes(topico.id);
              return (
                <div
                  key={topico.id}
                  className={`trilha-marco ${concluido ? "trilha-marco--concluido" : ""}`}
                  data-ordem={topico.ordem ?? "•"}
                >
                  <Link to={`/topico/${topico.id}`} className="trilha-marco__link">
                    <Card>
                      <div className="trilha-marco__card">
                        <div>
                          <h3 className="card-titulo">{topico.titulo}</h3>
                          <p style={{ color: "var(--cor-texto-suave)", margin: 0 }}>
                            {topico.descricao}
                          </p>
                        </div>
                        <span
                          className={`trilha-marco__selo ${
                            concluido ? "trilha-marco__selo--ok" : "trilha-marco__selo--pendente"
                          }`}
                        >
                          {concluido ? "concluído" : "pendente"}
                        </span>
                      </div>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
=======
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
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
