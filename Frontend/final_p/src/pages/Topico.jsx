import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../data/api.js'
import Card from '../components/Card';
import Botao from '../components/Botao';
import FeedbackBox from '../components/FeedbackBox';

export default function Topico() {
    const { id } = useParams(); // Lê o parâmetro ":id" diretamente da URL do navegador
    const navigate = useNavigate();
    
    const [dadosTopico, setDadosTopico] = useState(null);
    const [respostaEstudante, setRespostaEstudante] = useState('');
    const [feedbackIa, setFeedbackIa] = useState(null);

    // O useEffect fica vigiando o parâmetro 'id'
    useEffect(() => {
        api.get(`/topico/${id}`)
            .then(res => {
                setDadosTopico(res.data);
                setFeedbackIa(null); // Reseta a caixa de acertos/erros ao mudar de módulo
                setRespostaEstudante(''); // Limpa a resposta anterior
            });
    }, [id]); // DECLARAÇÃO CORRETA DA DEPENDÊNCIA: refaz o fetch se o aluno pular de ID

    const submeterAvaliacao = async () => {
        try {
            // Envia a resposta de texto aberta para o Gemini julgar no backend
            const res = await api.post(`/topico/${id}/avaliar`, { resposta: respostaEstudante });
            setFeedbackIa(res.data); // Espera { status: 'correto' | 'incorreto', analise: '...' }
        } catch {
            alert('Falha ao processar avaliação contínua.');
        }
    };

    if (!dadosTopico) return <p style={{textAlign: 'center', marginTop: '40px'}}>Buscando dados do módulo...</p>;

    return (
        <div className="max-width-wrapper">
            <Card titulo={dadosTopico.titulo}>
                <p className="descricao" style={{fontSize: '16px'}}>{dadosTopico.conteudo_estudo}</p>
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

                {/* RENDERIZAÇÃO CONDICIONAL COM OPERADOR CURTO-CIRCUITO (&&) */}
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