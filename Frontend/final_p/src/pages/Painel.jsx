import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/Card';

export default function Painel() {
    const [historico, setHistorico] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        api.get('/painel-estudante')
            .then(res => setHistorico(res.data))
            .finally(() => setCarregando(false));
    }, []);

    return (
        <div className="max-width-wrapper">
            <div className="flex-between">
                <h2>Painel de Evolução</h2>
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
}