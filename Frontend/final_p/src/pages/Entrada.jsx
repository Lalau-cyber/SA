import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEstudante } from '../context/EstudanteContext';
import Botao from '../components/Botao.jsx';
import { Card } from '../components/Card.jsx';
import api from '../data/api.js';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { setEstudante } = useEstudante();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resposta = await api.post('/login', { email, senha });
      setEstudante(resposta.data);
      navigate('/diagnostico');
    } catch (erro) {
      alert('Falha no login: verificar credenciais.');
    }
  };

  return (
    <div className='container-central'>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Card titulo="Acesso à plataforma Adaptativa">
          <form onSubmit={handleLogin}>
            <div className='campo-form'>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-controle"
              />
            </div>

            <div className='campo-form' style={{ marginTop: '10px' }}>
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="input-controle"
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <Botao tipo="submit">Entrar</Botao>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export function Home() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState(''); 
  const [erro, setErro] = useState('');
  
  const { identificarEstudante } = useEstudante();
  const navigate = useNavigate();

  async function handleEnviar(evento) {
    evento.preventDefault();
    
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();
  
    if (nomeLimpo.length < 3 ) {
      setErro('O nome deve ter pelo menos 3 caracteres.');
      return;
    }
    if (!emailLimpo) {
      setErro('O e-mail é obrigatório.');
      return;
    }

    try {
      await identificarEstudante(nome, email);
      navigate('/diagnostico');
    } catch (e) {
      setErro('Falha ao conectar com o servidor Node.js.');
    }
  }

  return (
    <div className='container-central'>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Card titulo="Acesso à plataforma Adaptativa">
          <form onSubmit={handleEnviar}>
            
            <div className='campo-form'>
              <label>Nome do Estudante</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="input-controle"
                placeholder="Insira seu nome"
              />
            </div>
            
            <div className='campo-form' style={{ marginTop: '15px' }}>
              <label>E-mail do Estudante</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-controle"
                placeholder="Insira seu e-mail"
              />
            </div>

            {erro && <p style={{ color: 'red', fontSize: '13px', marginTop: '10px' }}>{erro}</p>}

            <div style={{ marginTop: '20px' }}>
              <Botao tipo="submit">Iniciar Jornada</Botao>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}