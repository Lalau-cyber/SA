import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestaoCard } from "../components/Card.jsx";
import FeedbackBox from "../components/FeedBack.jsx";
import { EstudanteProvider } from "../context/EstudanteContext.jsx";

export default function Topico() {
  const { id } = useParams();
  const [topico, setTopico] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [avaliacao, setAvaliacao] = useState(null);

  useEffect(() => {
    async function carregarTopico() {
      setRespostas({});
      setAvaliacao(null);
      const resposta = await buscarTopico(id);
      setTopico(resposta.data);
    }
    carregarTopico();
  }, [id]); // refaz a busca quando o id da rota muda

  async function aoEnviarAvaliacao(evento) {
    evento.preventDefault();
    const resposta = await enviarAvaliacaoTopico(id, estudante.id, respostas);
    setAvaliacao(resposta.data);
    if (resposta.data.aprovado) marcarTopicoConcluido(id);
  }

  return (
    <form onSubmit={aoEnviarAvaliacao}>
      {topico?.questoes.map((q, i) => (
        <QuestaoCard key={q.id} numero={i + 1} questao={q}
          respostaSelecionada={respostas[q.id]} onSelecionar={selecionarResposta} />
      ))}
      {avaliacao && <FeedbackBox correto={avaliacao.aprovado} texto={avaliacao.feedback} />}
    </form>
  );
}