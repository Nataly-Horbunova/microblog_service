const Comment = require('../models/Comment');

const addNewComment = async (newComment) => {
    return await Comment.create(newComment);
}

const deleteComment = async(commentId) => {
    return await Comment.findByIdAndDelete(commentId);
}

module.exports = {
    addNewComment,
    deleteComment
}