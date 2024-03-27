const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { registerErrorHandler, loginErrorHandler } = require('../middleware/errorHandlers');
const { tokenSession } = require('../middleware/auth');

router.get('/register', authController.renderRegister );
router.post('/register', authController.handleRegister, registerErrorHandler, tokenSession);

router.get('/login', authController.renderLogin);
router.post('/login', authController.handleLogin, loginErrorHandler, tokenSession);

module.exports = router;
