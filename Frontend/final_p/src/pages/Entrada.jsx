<<<<<<< HEAD
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEstudante} from '../context/EstudanteContext';
import Botao from '../components/Botao';
import Card from '../components/Card';
import api from '../data/api.js'

export default function Login(){

    const [email, setEmail] = usestate('');
    const [senha, setSenha] = usestate('');

    const {setEstudante} = useEstudante();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{

            const resposta = await api.post('/login', {email, senha})
            
            setEstudante(resposta.data);
            navigate('/diagnostico');
        }catch (erro){
            alert('Falha no login: verificar credenciais.')
        }
};

return(

    <div className='container-central'>
        <div style={{width: '100%', maxWidth:'400px'}}>
            <Card titulo="Acesso á plataforma Adaptativa">

                <form onSubmit={handleLogin}>
                    <div className='campo-form'>
                        <label >Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-controle"
                        />
                    </div>

                    <div className='campo-form'>
                        <label >Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            className="input-controle"
                        />
                    </div>

                    <Botao type="submit">sair</Botao>
                </form>
    
            </Card>
        </div>
    </div>
)
}
=======
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
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2
