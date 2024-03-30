const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');
const { protectedRoute } = require('../middleware/auth');

router.get('/', protectedRoute(['user', 'unsigned'], './admin'), pagesController.renderRoot);

router.get('/user-posts', protectedRoute(['user']), pagesController.renderUserPosts);

router.get('/admin', protectedRoute(['admin']), pagesController.renderAdmin);

router.get('/error', pagesController.renderError);

module.exports = router;