const express = require('express');
const router = express.Router();
const interacaoController = require('../controllers/interacaoController');

router.get('/', interacaoController.getInteracoes);
router.get('/:id', interacaoController.getInteracaoById);
router.post('/', interacaoController.createInteracao);
router.put('/:id', interacaoController.updateInteracao);
router.delete('/:id', interacaoController.deleteInteracao);

module.exports = router;
