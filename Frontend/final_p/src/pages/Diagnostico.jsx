<<<<<<< HEAD

   import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../data/api.js';
import Botao from '../components/Botao';
import Card from '../components/Card';

export default function Diagnostico() {
    const [meta, setMeta] = useState('');
    const [nivel, setNivel] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const processarDiagnostico = async (e) => {
        e.preventDefault();
        setCarregando(true); // Ativa estado de carregamento visual
        
        try {
            // Envia os dados para a APIREST processar com a API do Gemini
            await api.post('/diagnostico', { meta, nivel });
            navigate('/trilha');
        } catch (erro) {
            alert('Ocorreu um erro ao gerar sua trilha com o Gemini.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="max-width-wrapper">
            <Card titulo="Avaliação Diagnóstica Inicial">
                {/* RENDERIZAÇÃO CONDICIONAL TERNÁRIA: Mostra o aviso de IA ou o formulário */}
                {carregando ? (
                    <p className="descricao animate-pulse">O Gemini está analisando suas respostas e montando sua trilha...</p>
                ) : (
                    <form onSubmit={processarDiagnostico}>
                        <div className="form-grupo">
                            <label>O que você deseja aprender ou aprimorar?</label>
                            <input 
                                type="text" 
                                value={meta} 
                                onChange={e => setMeta(e.target.value)} 
                                placeholder="Ex: Banco de dados estruturado" 
                                className="input-controle" 
                                required 
                            />
                        </div>
                        <div className="form-grupo">
                            <label>Como você avalia seu nível atual neste assunto?</label>
                            <select value={nivel} onChange={e => setNivel(e.target.value)} className="select-controle" required>
                                <option value="">Selecione...</option>
                                <option value="iniciante">Nunca vi / Iniciante</option>
                                <option value="intermediario">Conheço o básico / Intermediário</option>
                            </select>
                        </div>
                        <Botao type="submit">Iniciar Análise Pedagógica</Botao>
                    </form>
                )}
            </Card>
        </div>
    );
}
=======
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
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2
