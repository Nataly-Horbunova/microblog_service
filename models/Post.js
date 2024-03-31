const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
}, 
{
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});


postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

module.exports = mongoose.model('Post', postSchema);