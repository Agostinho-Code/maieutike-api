const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


// Rotas públicas
router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);

// Rota de login (agora só valida usuário/senha, sem token)
router.post('/login', usuarioController.login);

// Rotas que antes eram protegidas agora ficam abertas
router.get('/perfil/:id', usuarioController.getUsuarioById);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
