const Admin = require('../models/Admin');

const findAdminAndUpdate = async (filter, update) => {
    return await Admin.findOneAndUpdate(filter, update, { new: true });
}

module.exports = {
    findAdminAndUpdate
}