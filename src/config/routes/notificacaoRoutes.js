const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');

router.get('/', notificacaoController.getNotificacoes);
router.post('/', notificacaoController.createNotificacao);
router.put('/:id', notificacaoController.updateNotificacao);
router.delete('/:id', notificacaoController.deleteNotificacao);

module.exports = router;
