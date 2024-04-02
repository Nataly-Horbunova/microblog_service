const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

const getAllPosts = async(filter) => {
    const posts = await Post.find(filter)
    .populate({
        path: 'author',
        select: 'name'
    })
    .populate({
        path: 'comments',
        populate: {
        path: 'author',
        select: 'name'
        }
    })
    .sort({date: -1});
    return posts;
}

const addNewPost = async (newPost) => {
    return await Post.create(newPost);
}

const deletePostAndComments = async (postId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        await Comment.deleteMany({ post: postId }, { session });
        const post = await Post.findByIdAndDelete(postId, { session });
        await session.commitTransaction();
        session.endSession();
        return post;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

module.exports = {
    getAllPosts,
    addNewPost,
    deletePostAndComments
}