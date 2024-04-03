const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/auth');
const postsController = require('../controllers/posts');
const { validateId } = require('../middleware/validators');

router.post('/', protectedRoute(['user']), postsController.addNewPost);
router.delete('/:postId', protectedRoute(['user']), validateId, postsController.deletePost);

module.exports = router;