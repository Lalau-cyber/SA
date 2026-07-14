import { useState } from 'react';
import { useEstudante } from '../context/EstudanteContext';
import { useNavigate } from 'react-router-dom';
import Botao from '../components/Botao';
import { Card } from '../components/Card';

export default function Diagnostico() {
  // Estados para guardar as respostas abertas do aluno
  const [duvidas, setDuvidas] = useState('');
  const [melhorias, setMelhorias] = useState('');
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState(null);

  const { estudante, setDiagnostico, enviarDiagnostico } = useEstudante();
  const navegar = useNavigate();

  async function aoEnviar(evento) {
    evento.preventDefault();
    
    if (!duvidas.trim() || !melhorias.trim()) {
      setErro("Por favor, preencha ambos os campos para podermos criar a sua trilha!");
      return;
    }

    setCarregando(true);
    setErro("");

    // Agrupa as respostas num objeto para enviar ao back-end
    const dadosDiagnostico = {
      assunto_duvida: duvidas.trim(),
      deseja_melhorar: melhorias.trim()
    };

    try {
      const resposta = await enviarDiagnostico(estudante.id, dadosDiagnostico);
      setResultado(resposta.data);
      setDiagnostico(resposta.data);
    } catch (e) {
      setErro(e.response?.data?.error || "Erro ao gerar a sua trilha customizada.");
    } finally {
      setCarregando(false);
    }
  }

  return resultado ? (
    <div className="diagnostico__resultado" style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
      <Card titulo="✨ Trilha Gerada com Sucesso!">
        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>{resultado.resumo}</p>
        <Botao onClick={() => navegar("/trilha")}>Ver minha trilha →</Botao>
      </Card>
    </div>
  ) : (
    <div className="max-width-wrapper" style={{ maxWidth: '500px', margin: '40px auto' }}>
      <Card titulo="Diagnóstico de Perfil Individual">
        <form onSubmit={aoEnviar}>
          
          <div className="campo-form" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              Qual o assunto ou conceito de programação que você tem mais dúvidas atualmente?
            </label>
            <textarea
              value={duvidas}
              onChange={(e) => setDuvidas(e.target.value)}
              className="textarea-controle"
              placeholder="Ex: Tenho muita dificuldade em entender como funcionam loops assíncronos e Promises no JavaScript..."
              style={{ width: '100%', minHeight: '100px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
              required
            />
          </div>

          <div className="campo-form" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              No que você deseja melhorar ou focar mais durante esta jornada?
            </label>
            <textarea
              value={melhorias}
              onChange={(e) => setMelhorias(e.target.value)}
              className="textarea-controle"
              placeholder="Ex: Quero melhorar a escrita do meu código lógico e conseguir criar funções mais limpas..."
              style={{ width: '100%', minHeight: '100px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
              required
            />
          </div>

          {erro && <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>{erro}</p>}

          <Botao tipo="submit" disabilitado={carregando}>
            {carregando ? "IA construindo sua trilha..." : "Gerar Trilha Personalizada"}
          </Botao>
        </form>
      </Card>
    </div>
  );
}