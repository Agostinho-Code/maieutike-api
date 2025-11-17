const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');

router.get('/', badgeController.getBadges);
router.post('/', badgeController.createBadge);
router.delete('/:id', badgeController.deleteBadge);

module.exports = router;
