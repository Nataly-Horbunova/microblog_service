const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/auth');
const usersController = require('../controllers/users');
const { validateId } = require('../middleware/validators');

router.delete('/:userId', protectedRoute(['admin']), validateId, usersController.deleteUser);

module.exports = router;