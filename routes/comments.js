const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/auth');
const commentsController = require('../controllers/comments');
const { validateUserId } = require('../middleware/validators');

router.post('/', protectedRoute(['user']), commentsController.addNewComment);
router.delete('/:commentId', protectedRoute(['user']), validateUserId, commentsController.deleteComment);

module.exports = router;