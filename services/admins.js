const Admin = require('../models/Admin');

const findAdmin = async (filter) => {
    return await Admin.findOne(filter).exec();
}

const updateAdmin = async (admin, updateKey, updateValue) => {
    admin[updateKey] = updateValue;
    await admin.save();
}

const findAndUpdate = async (filter, update) => {
    return await Admin.findOneAndUpdate(filter, update, { new: true });
}

module.exports = {
    findAndUpdate,
    updateAdmin,
    findAdmin
}