const express = require('express');
const router = express.Router();
const reputacaoController = require('../controllers/reputacaoController');

// Buscar todas as reputações
router.get('/', reputacaoController.getReputacoes);

// Buscar reputação de um usuário
router.get('/:id_usuario', reputacaoController.getReputacaoByUsuario);

// Criar reputação
router.post('/', reputacaoController.createReputacao);

// Atualizar reputação
router.put('/:id_usuario', reputacaoController.updateReputacao);

router.delete('/:id_usuario', reputacaoController.deleteReputacao);

module.exports = router;
