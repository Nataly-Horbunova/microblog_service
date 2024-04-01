const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/auth');
const postsController = require('../controllers/posts');
const pagesController = require('../controllers/pages');

router.post('/', protectedRoute(['user']), postsController.addNewPost);
router.delete('/:postId', protectedRoute(['user']), postsController.deletePost);

module.exports = router;