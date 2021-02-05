const router = require('express').Router();
const AuthController = require('../controllers/authController');

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.post('/loginOauth', AuthController.loginOauth);

module.exports = router;