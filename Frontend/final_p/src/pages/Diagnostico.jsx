import { useState } from 'react';
import { useEstudante } from '../context/EstudanteContext';
import { useNavigate } from 'react-router-dom';
import Botao from '../components/Botao';
import { QuestaoCard } from '../components/Card'; // Seus componentes importados

const questoes_diagnostico = [
    { id: "q1", enunciado: "Em JavaScript, qual estrutura você usaria para repetir uma ação um número definido de vezes?", opcoes: ["if / else", "for", "try / catch", "import"] },
];

export default function Diagnostico() {
     const [respostas, setRespostas] = useState({}); // Plural corrigido
     const [carregando, setCarregando] = useState(false); // Corrigido 'flase'
     const [erro, setErro] = useState("");
     const [resultado, setResultado] = useState(null);
     
     // useEstudante deve retornar o objeto do contexto, não um array de estado
     const { estudante, setDiagnostico, enviarDiagnostico } = useEstudante(); 
     const navegar = useNavigate(); 

    function selecionarResposta(idQuestao, indiceOpcao) {
        setRespostas((atual) => ({ ...atual, [idQuestao]: indiceOpcao }));
    }

    const todasRespondidas = questoes_diagnostico.every((q) => respostas[q.id] !== undefined);

    async function aoEnviar(evento) {
        evento.preventDefault();
        if (!todasRespondidas) return;
        setCarregando(true);
        try {
            // Supondo que sua API/Contexto trate essa chamada:
            const resposta = await enviarDiagnostico(estudante.id, respostas);
            setResultado(resposta.data);
            setDiagnostico(resposta.data);
        } catch (e) {
            setErro(e.message || "Erro ao enviar");
        } finally {
            setCarregando(false);
        }
    }
        
    return resultado ? (
       <div className="diagnostico__resultado">
          <p>{resultado.resumo}</p>
          <Botao onClick={() => navegar("/trilha")}>Ver minha trilha →</Botao>
       </div>
    ) : (
        <form onSubmit={aoEnviar}>
          {questoes_diagnostico.map((questao, i) => ( // Corrigido para minúsculo
            <QuestaoCard
              key={questao.id}
              numero={i + 1}
              questao={questao}
              respostaSelecionada={respostas[questao.id]}
              onSelecionar={selecionarResposta}
            />
          ))}
          {erro && <p className="erro">{erro}</p>}
          <Botao tipo="submit" desabilitado={!todasRespondidas || carregando}>
            {carregando ? "Analisando..." : "Enviar diagnóstico"}
          </Botao>
        </form>
    );
}