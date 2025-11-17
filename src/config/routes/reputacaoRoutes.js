const express = require('express');
const router = express.Router();
const reputacaoController = require('../controllers/reputacaoController');

router.get('/', reputacaoController.getReputacoes);
router.get('/:id', reputacaoController.getReputacaoByUsuario);
router.put('/:id', reputacaoController.updateReputacao);

module.exports = router;
