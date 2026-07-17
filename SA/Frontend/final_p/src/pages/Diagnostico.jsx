<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Botao from "../components/Botao";
import Loading from "../components/Loading";
import { useEstudante } from "../context/EstudanteContext";
import { enviarDiagnostico } from "../data/api";

export default function Diagnostico() {
  const [tema, setTema] = useState("");
  const [duvidas, setDuvidas] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [resultado, setResultado] = useState(null);

  const { estudante, setDiagnostico } = useEstudante();
  const navigate = useNavigate();

  async function aoEnviar(evento) {
    evento.preventDefault();
    setErro(null);

    if (!estudante) {
      setErro("Identifique-se antes de fazer o diagnóstico.");
      return;
    }

    if (!tema.trim()) {
      setErro("Conte o que você quer aprender antes de enviar.");
      return;
    }

    setCarregando(true);
    try {
      const resposta = await enviarDiagnostico(estudante.id, {
        tema: tema.trim(),
        duvidas: duvidas.trim(),
      });
      setResultado(resposta.data);
      setDiagnostico(resposta.data);
    } catch (e) {
      setErro(
        e.response?.data?.error || "Não foi possível gerar o diagnóstico. Tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <span className="eyebrow">Passo 1 de 3</span>
      <h1>O que você quer aprender?</h1>
      <p style={{ color: "var(--cor-texto-suave)", marginBottom: "1.75rem" }}>
        Pode ser qualquer assunto — programação, idiomas, matemática, história,
        música, o que fizer sentido pra você. Conte também suas dúvidas, se tiver.
      </p>

      <Card>
        {carregando && <Loading texto="A IA está montando sua trilha..." />}

        {!carregando && !resultado && (
          <form onSubmit={aoEnviar}>
            {erro && <div className="erro-formulario">{erro}</div>}

            <div className="campo">
              <label htmlFor="tema">O que você quer aprender?</label>
              <input
                id="tema"
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ex.: violão do zero, inglês para viagem, estatística básica..."
              />
            </div>

            <div className="campo">
              <label htmlFor="duvidas">
                Quais dúvidas você tem, ou o que já sabe sobre esse assunto? (opcional)
              </label>
              <textarea
                id="duvidas"
                rows={4}
                value={duvidas}
                onChange={(e) => setDuvidas(e.target.value)}
                placeholder="Escreva com suas palavras — não existe resposta errada aqui."
              />
            </div>

            <Botao type="submit">Gerar minha trilha</Botao>
          </form>
        )}

        {!carregando && resultado && (
          <div>
            <h3>Sua análise</h3>
            <p>{resultado.resumo}</p>
            <Botao onClick={() => navigate("/trilha")}>Ver minha trilha</Botao>
          </div>
        )}
=======
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
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
      </Card>
    </div>
  );
}