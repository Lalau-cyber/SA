-- schema.sql
-- Modelagem relacional da Plataforma de Aprendizagem Adaptativa com IA

CREATE TABLE IF NOT EXISTS estudantes (
  id          SERIAL PRIMARY KEY,
  nome        VARCHAR(150) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  criado_em   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trilhas (
  id               SERIAL PRIMARY KEY,
  estudante_id     INTEGER NOT NULL REFERENCES estudantes(id) ON DELETE CASCADE,
  objetivo_estudo  VARCHAR(200) NOT NULL,
  criado_em        TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topicos (
  id          SERIAL PRIMARY KEY,
  trilha_id   INTEGER NOT NULL REFERENCES trilhas(id) ON DELETE CASCADE,
  titulo      VARCHAR(200) NOT NULL,
  descricao   TEXT,
  ordem       INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS questoes (
  id                       SERIAL PRIMARY KEY,
  topico_id                INTEGER NOT NULL REFERENCES topicos(id) ON DELETE CASCADE,
  enunciado                TEXT NOT NULL,
  opcoes                   TEXT[] NOT NULL,
  resposta_correta_indice  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS respostas_avaliacoes (
  id             SERIAL PRIMARY KEY,
  estudante_id   INTEGER NOT NULL REFERENCES estudantes(id) ON DELETE CASCADE,
  topico_id      INTEGER NOT NULL REFERENCES topicos(id) ON DELETE CASCADE,
  aprovado       BOOLEAN NOT NULL,
  feedback       TEXT,
  respondido_em  TIMESTAMP NOT NULL DEFAULT NOW(),
  -- garante no máximo um registro de avaliação por (aluno, tópico); reenvios atualizam a linha
  UNIQUE (estudante_id, topico_id)
);

-- Índices que aceleram as consultas mais comuns do painel/histórico
CREATE INDEX IF NOT EXISTS idx_trilhas_estudante ON trilhas(estudante_id);
CREATE INDEX IF NOT EXISTS idx_topicos_trilha ON topicos(trilha_id);
CREATE INDEX IF NOT EXISTS idx_questoes_topico ON questoes(topico_id);
CREATE INDEX IF NOT EXISTS idx_respostas_estudante ON respostas_avaliacoes(estudante_id);