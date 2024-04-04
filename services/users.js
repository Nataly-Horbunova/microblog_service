const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

const getAllUsers = async () => {
    return await User.find();
}

const findUser = async (filter) => {
    return await User.findOne(filter).exec();
}

const updateUser = async (user, updateKey, updateValue) => {
    user[updateKey] = updateValue;
    await user.save();
}

const createUser = async (newUser) => {
    return await User.create(newUser);
}

const findAndUpdate = async (filter, update) => {
    return await User.findOneAndUpdate(filter, update, { new: true });
}

const deleteUser = async(id) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await Comment.deleteMany({ author: id }, { session });
        await Post.deleteMany({ author: id }, { session });
        const user = await User.findByIdAndDelete(id, { session });
        await session.commitTransaction();
        session.endSession();
        return user;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

module.exports = {
    getAllUsers,
    findUser,
    updateUser,
    createUser,
    findAndUpdate,
    deleteUser
}