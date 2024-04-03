const postsServices = require('../services/posts');
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');

const addNewPost = async (req, res, next) => {
    const { userId="" } = req._auth || {};

    //! this would be MUCH BETTER as a middleware
    //! also, you have protectedRoute middleware before this handler, so - do you really need to check a userId here? ))
    if(!userId) {
        console.log('The user is posssibly not logged in');
        return next( {status: STATUS.Forbidden, message: ERROR.forbiddenError} );
    }

    const { title, content } = req.body;
    const post = {
        title,
        content,
        author: userId
    }

    try {
        const newPost = await postsServices.addNewPost(post);

        if (!newPost){
            return next ({ status: STATUS.BadRequest, message: ERROR.postAddingError });
        }

        return res.status(STATUS.Created).redirect(req.get('referer'));
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next ) => {
    const { postId } = req.params || {};

    try {
        const deletedPost = await postsServices.deletePostAndComments(postId);
        if (!deletedPost){
            return next ({ status: STATUS.BadRequest, message: ERROR.postDeletingError });
        }

        res.status(STATUS.NoContent).json(deletedPost);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addNewPost,
    deletePost
};