const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.getMensagens);
router.get('/:id', chatController.getMensagemById);
router.post('/', chatController.createMensagem);
router.put('/:id', chatController.updateMensagem);
router.delete('/:id', chatController.deleteMensagem);

module.exports = router;
