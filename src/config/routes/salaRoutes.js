const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

router.get('/', salaController.getSalas);
router.get('/:id', salaController.getSalaById);
router.post('/', salaController.createSala);
router.put('/:id', salaController.updateSala);
router.delete('/:id', salaController.deleteSala);

module.exports = router;
