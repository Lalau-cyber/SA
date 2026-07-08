import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useEstudante } from '../context/EstudanteContext';
import Botao from '../components/Botao.jsx'

export default function Home() {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');
  const {identificarEstudante} = useEstudante();
  const navigate = useNavigate();

  function handleEnviar(evento) {
    evento.preventDefault();
    const nomeLimpo = nome.trim();
    if (nomeLimpo.length < 2) {
      setErro('O nome deve ter pelo menos 2 caracteres.');
      return;
    }
    identificarEstudante(nomeLimpo);
    navigate('/diagnostico');
  }
  return (
    <form onSubmit = {handleEnviar}>
      <input 
      value={nome} 
      onChange={(e) => setNome(e.target.value)}
      placeholder="Ex: Maria da Silva"
      />
      {erro && <p className="mensagem-erro">{erro}</p>}
       <Botao type="submit"> Começar diagnóstico</Botao>
    </form>
  )
}
