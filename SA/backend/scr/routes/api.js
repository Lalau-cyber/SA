
const express = require('express');
const router = express.Router();

const estudanteController = require('../controllers/EstudanteController');
const trilhaController = require('../controllers/TrilhaController');

router.post('/estudantes', estudanteController.identificarEstudante);

// BUG CORRIGIDO: faltava o parâmetro :estudante_id (o controller lê req.params.estudante_id)
router.get('/estudante/historico/:estudante_id', estudanteController.obterHistoricoEstudante);

router.post('/trilhas/diagnostico', trilhaController.processarDiagnostico);
router.get('/trilhas/estudante/:estudante_id', trilhaController.obterTrilhaEstudante);
router.get('/topicos/:id', trilhaController.obterTopicoComQuestoes);
router.post('/avaliacoes/responder', trilhaController.avaliarRespostasTopico);

module.exports = router;