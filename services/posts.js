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

const deletePost = async () => {}

module.exports = {
    getAllPosts,
    addNewPost,
    deletePost
}