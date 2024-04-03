const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/auth');
const commentsController = require('../controllers/comments');
const { validateId } = require('../middleware/validators');

router.post('/', protectedRoute(['user']), commentsController.addNewComment);
router.delete('/:commentId', protectedRoute(['user']), validateId, commentsController.deleteComment);

module.exports = router;