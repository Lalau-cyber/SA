// src/routes/api.js
const express = require('express');
const router = express.Router();

// Importa os dois controladores separados
const estudanteController = require('../controllers/EstudanteController');
const trilhaController = require('../controllers/TrilhaController');

// --- ROTAS DO ESTUDANTE ---
router.post('/estudantes', estudanteController.identificarEstudante);
router.get('/estudante/historico', estudanteController.obterHistoricoEstudante);

// --- ROTAS DA TRILHA PEDAGÓGICA ---
router.post('/trilhas/diagnostico', trilhaController.processarDiagnostico);
router.get('/trilhas/estudante/:estudante_id', trilhaController.obterTrilhaEstudante);
router.get('/topicos/:id', trilhaController.obterTopicoComQuestoes);
router.post('/avaliacoes/responder', trilhaController.avaliarRespostasTopico);

module.exports = router;