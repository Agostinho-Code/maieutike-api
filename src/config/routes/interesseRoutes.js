const express = require('express');
const router = express.Router();
const interesseController = require('../controllers/interesseController');

router.get('/', interesseController.getInteresses);
router.post('/', interesseController.createInteresse);
router.delete('/:id', interesseController.deleteInteresse);

module.exports = router;
