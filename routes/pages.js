const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.render('index');
});

router.get('/user-posts', (req, res)=> {
    res.render('user_posts');
});

router.get('/admin', (req, res) => {
    res.render('admin');
});

router.get('/error', (req, res )=> {
    res.render('error');
});

module.exports = router;