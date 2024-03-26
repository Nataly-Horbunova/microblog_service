const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/register', authController.renderRegister );
router.post('/register', authController.handleRegister );

router.get('/login', authController.renderLogin);
router.post('/login', authController.handleLogin);

module.exports = router;
