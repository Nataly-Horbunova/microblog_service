const User = require('../models/User');

const findUser = async (filter) => {
    return await User.findOne(filter).exec();
}

const createUser = async (newUser) => {
    return await User.create(newUser); 
}

const findUserAndUpdate = async (filter, update) => {
    return await User.findOneAndUpdate(filter, update, { new: true });
}

module.exports = {
    findUser,
    createUser,
    findUserAndUpdate
}