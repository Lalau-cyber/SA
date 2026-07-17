
const express = require('express');
const router = express.Router();

const estudanteController = require('../controllers/EstudanteController');
const trilhaController = require('../controllers/TrilhaController');

router.post('/estudantes', estudanteController.identificarEstudante);
router.get('/estudante/historico', estudanteController.obterHistoricoEstudante);

router.post('/trilhas/diagnostico', trilhaController.processarDiagnostico);
router.get('/trilhas/estudante/:estudante_id', trilhaController.obterTrilhaEstudante);
router.get('/topicos/:id', trilhaController.obterTopicoComQuestoes);
router.post('/avaliacoes/responder', trilhaController.avaliarRespostasTopico);

module.exports = router;