const STATUS = require("../constants/statusCodes");
const postsServices = require('../services/posts');
const { formatDate } = require('../utils/helpers');


// Home page
const renderRoot = async(req, res, next) => {
    const { role = 'unsigned', userId="" } = req._auth || {};
    console.log (`Vsiting with [${role}] role`);
    let posts={};

    try {
        posts = await postsServices.getAllPosts();
    } catch (error) {
        return next(error);
    }
    return res.render('index', { role, userId, posts, formatDate });
}

// User page
const renderUserPosts = async(req, res) => {
    const { role = 'unsigned', userId="" } = req._auth || {};
    const { userId: id } = req.params;

    if (userId !== id) {
        console.log (`Vsiting with [${role}] role`);
        return res.send(STATUS.Forbidden).redirect('/');
    }

    console.log (`Vsiting with [${role}] role`);

    try {
        posts = await postsServices.getAllPosts({ author: userId });
    } catch (error) {
        return next(error);
    }

    res.render('user_posts', { role, userId, formatDate });
}

// Admin page
const renderAdmin = (req, res) => {
    const { role = 'unsigned' } = req._auth || {};
    console.log (`Vsiting with [${role}] role`);
    res.render('admin', { role });
}

// Error page
const renderError = (req, res )=> {
    res.render('error');
}

module.exports = {
    renderRoot,
    renderUserPosts,
    renderAdmin,
    renderError
}