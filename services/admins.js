const Admin = require('../models/Admin');

const findAdmin = async (filter) => {
    return await Admin.findOne(filter).exec();
}

const findAdminAndUpdate = async (filter, update) => {
    return await Admin.findOneAndUpdate(filter, update, { new: true });
}

module.exports = {
    findAdminAndUpdate,
    findAdmin
}