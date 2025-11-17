const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

router.get('/', disciplinaController.getDisciplinas);
router.get('/:id', disciplinaController.getDisciplinaById);
router.post('/', disciplinaController.createDisciplina);
router.put('/:id', disciplinaController.updateDisciplina);
router.delete('/:id', disciplinaController.deleteDisciplina);

module.exports = router;
