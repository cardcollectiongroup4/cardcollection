const router = require('express').Router();
const cardController = require('../controllers/cardController');

router.post('/', cardController.saveCard);
router.get('/generate', cardController.generate);

module.exports = router;