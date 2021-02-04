const router = require('express').Router();
const cardController = require('../controllers/cardController');
const { authentication } = require('../helpers/middleware');

router.use(authentication);
router.post('/', cardController.saveCard);
router.get('/', cardController.getAllCards);
router.get('/generate', cardController.generate);

module.exports = router;