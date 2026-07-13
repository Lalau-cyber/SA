import { Link, useNavigate } from 'react-router-dom';
import { useEstudante } from '../context/EstudanteContext';
import { useEffect, useState } from 'react';
import {Card, QuestaoCard} from '../components/Card.jsx';
 
export default function Trilhas() {
  const {estudante, trilha, setTrilha, topicosConcluidos} = useEstudante();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const navegar = useNavigate();
  
  useEffect(() => {
    let ativo = true;
    async function carregarTrilha(){
        setCarregando(true);
        try{
            const resposta = await buscarTrilha(estudante.id);
            if(ativo) setTrilha(resposta.data.topicos || [])
        }catch (e) {
        if (ativo) setErro(e.mensagemAmigavel);
        } finally {
            if (ativo) setCarregando(false);
        }
    }
        carregarTrilha();
            return () => { ativo = false; };
        }, [estudante, navegar, setTrilha]);

        return carregando ? (
            <Loading />
        ) : trilha.length === 0 ? (
            <div className="estado-vazio"><p>Nenhum tópico ainda.</p></div>
        ) : (
            <div className="trilha__lista">
            {trilha.map((topico, i) => (
                <Card key={topico.id} aoClicar={() => navegar(`/topico/${topico.id}`)}>
                <h3>{topico.titulo}</h3>
                <p>{topico.descricao}</p>
                </Card>
            ))}
    </div>
  );
}
