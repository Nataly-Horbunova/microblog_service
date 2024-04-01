const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { registerErrorHandler, loginErrorHandler } = require('../middleware/errorHandlers');
const { tokenSession } = require('../middleware/auth');
const { validateRegisterData, validateLoginData } = require('../middleware/validators');

router.get('/register', authController.renderRegister );
router.post('/register', validateRegisterData, authController.handleRegister, tokenSession, registerErrorHandler );

router.get('/login', authController.renderLogin);
router.post('/login', validateLoginData, authController.handleLogin, tokenSession, loginErrorHandler);

router.get('/logout', authController.handleLogout); 

module.exports = router;
