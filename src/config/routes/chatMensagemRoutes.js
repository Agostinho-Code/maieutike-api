const express = require('express');
const router = express.Router();
const chatMensagemController = require('../controllers/chatMensagemController');

router.get('/', chatMensagemController.getMensagens);
router.get('/:id', chatMensagemController.getMensagemById);
router.post('/', chatMensagemController.createMensagem);
router.put('/:id', chatMensagemController.updateMensagem);
router.delete('/:id', chatMensagemController.deleteMensagem);

module.exports = router;
