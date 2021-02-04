const router = require('express').Router();
const cardController = require('../controllers/cardController');

router.post('/generate', cardController.generate);

module.exports = router;