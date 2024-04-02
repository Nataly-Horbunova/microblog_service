const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/auth');
const postsController = require('../controllers/posts');
const { validateUserId } = require('../middleware/validators');

router.post('/', protectedRoute(['user']), postsController.addNewPost);
router.delete('/:postId', protectedRoute(['user']), validateUserId, postsController.deletePost);

module.exports = router;