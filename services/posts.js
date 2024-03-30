const Post = require('../models/Post');

const getAllPosts = () => {

}

const addNewPost = async (newPost) => {
    return await Post.create(newPost);
}

const deletePost = () => {}

module.exports = {
    getAllPosts,
    addNewPost,
    deletePost
}