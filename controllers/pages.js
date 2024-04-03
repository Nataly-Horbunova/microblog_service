const ERROR = require("../constants/errors");
const STATUS = require("../constants/statusCodes");
const postsServices = require('../services/posts');
const usersServices = require('../services/users');
const { formatDate } = require('../utils/helpers');


// Home page
const renderRoot = async(req, res, next) => {
    const { role = 'unsigned', userId="" } = req._auth || {};
    console.log (`Vsiting homepage with [${role}] role`);

    try {
        const posts = await postsServices.getAllPosts();
        if (posts.length > 0 ) {
            return res.status(STATUS.Ok).render('index', { role, userId, posts, formatDate });
        } else{
            return res.status(STATUS.NotFound).render('index', { role, userId, posts, formatDate });
        }
    } catch (error) {
        return next(error);
    }
}

// User page
const renderUserPosts = async(req, res, next) => {
    const { role, userId } = req._auth || {};
    const { userId: id } = req.params; 

    if (userId !== id) {
        return next( {status: STATUS.Forbidden, message: ERROR.forbiddenError} );
    }

    try {
        const posts = await postsServices.getAllPosts({ author: userId });
        if (posts.length > 0 ) {
            return res.status(STATUS.Ok).render('user_posts', { role, userId, posts, formatDate });
        } else{
            return res.status(STATUS.NotFound).render('user_posts', { role, userId, posts, formatDate });
        }
    } catch (error) {
        return next(error);
    }
}

// Admin page
const renderAdmin = async (req, res, next) => {
    const { role = 'unsigned' } = req._auth || {};
    
    try {
        const users = await usersServices.getAllUsers();
        if (users.length > 0 ) {
            return res.status(STATUS.Ok).render('admin', { role, users });
        } else {
            return res.status(STATUS.NotFound).render('admin', { role, users });
        }
    } catch (error) {
        return next(error);
    }
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