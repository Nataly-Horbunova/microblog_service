const postsServices = require('../services/posts');
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');

const addNewPost = async (req, res, next) => {
    const { userId="" } = req._auth || {};

    if(!userId) {
        console.log('The user is posssibly not logged in');
        return res.status(STATUS.Forbidden).redirect('/'); //? status?
    }

    const { title, content } = req.body;
    const newPost = {
        title, 
        content,
        author: userId
    }

    try {
        await postsServices.addNewPost(newPost);
        res.status(STATUS.Created).redirect('/');
    } catch (error) {
        next(error);
    }
}

const deletePost = (req, res, next ) => {

}

module.exports = {
    addNewPost,
    deletePost
};