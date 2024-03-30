const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = {
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
}

module.exports = mongoose.model('Comment', commentSchema);