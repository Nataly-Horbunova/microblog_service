const commentsServices = require('../services/comments');
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');

const addNewComment = async (req, res, next) => {
    const { userId="" } = req._auth || {};

    if(!userId) {  
        console.log('The user is posssibly not logged in');
        return next( {status: STATUS.Forbidden, message: ERROR.forbiddenError} );
    }

    const { content } = req.body;
    const { postId } = req.query;

    const comment = {
        content,
        author: userId,
        post: postId
    }

    try {
        const newComment = await commentsServices.addNewComment(comment);

        if (!newComment){
            return next ({ status: STATUS.BadRequest, message: ERROR.postAddingError });
        }

        return res.status(STATUS.Created).redirect(req.get('referer'));
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {

}

module.exports = {
    addNewComment,
    deleteComment
}