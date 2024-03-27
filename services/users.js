const User = require('../models/User');

const findUser = async (option) => {
    return await User.findOne(option).exec();
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