const commentsServices = require('../services/comments');
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');

const addNewComment = async (req, res, next) => {
    const { userId="" } = req._auth || {};

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
            return next ({ status: STATUS.BadRequest, message: ERROR.commentAddingError });
        }

        return res.status(STATUS.Created).redirect(req.get('referer'));
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {
    const { commentId } = req.params || {};

    try {
        const deletedComment = await commentsServices.deleteComment(commentId);
        if (!deletedComment){
            return next ({ status: STATUS.BadRequest, message: ERROR.commentDeletingError });
        }

        res.status(STATUS.NoContent).json(deletedComment);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addNewComment,
    deleteComment
}