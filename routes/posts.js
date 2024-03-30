const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/auth');
const postsController = require('../controllers/posts');

router.route('/')
    .post( protectedRoute(['user']), postsController.addNewPost)
    .delete(protectedRoute(['user']), postsController.deletePost);

module.exports = router;