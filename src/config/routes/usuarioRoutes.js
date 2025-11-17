const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);

// Rota de login (gera token JWT)
router.post('/login', usuarioController.login);

// Rotas protegidas
router.get('/perfil/:id', auth, usuarioController.getUsuarioById);
router.put('/:id', auth, usuarioController.updateUsuario);
router.delete('/:id', auth, usuarioController.deleteUsuario);

module.exports = router;
