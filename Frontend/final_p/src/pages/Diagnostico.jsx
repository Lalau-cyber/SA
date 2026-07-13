
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
