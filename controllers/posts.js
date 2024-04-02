const postsServices = require('../services/posts');
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');

const addNewPost = async (req, res, next) => {
    const { userId="" } = req._auth || {};

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
            return next ({ status: STATUS.BadRequest, message: ERROR.postError });
        }

        return res.status(STATUS.Created).redirect(req.get('referer'));
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next ) => {
    const { postId } = req.params || {};

    const deletedPost = await postsServices.deletePost(postId);
    

}

module.exports = {
    addNewPost,
    deletePost
};