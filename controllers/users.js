const userServices = require('../services/users');
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');

const deleteUser = async (req, res, next) => {
    const { userId } = req.params || {};

    try {
        const deletedUser = await userServices.deleteUser(userId);
        if (!deletedUser){
            return next ({ status: STATUS.BadRequest, message: ERROR.userDeletingError });
        }

        res.status(STATUS.NoContent).json(deletedUser);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    deleteUser
}