
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');
const { encryptPassword, checkPassword, tokenOptions } = require('../utils/auth');
const userServices = require('../services/users');
const adminServices = require('../services/admins');

// Registartion

const renderRegister = (_req, res, next) => {
    return res.render('register');
}

const handleRegister = async (req, _res, next) => {
    const { login, password } = req.body;

    try {
        const duplicate = await userServices.findUser({ name: login });
        if (duplicate) {
            return next( {status: STATUS.Conflict, message: ERROR.userNameError } );
        }

        const ecryptedPassword = await encryptPassword(password);
        const newUser = await userServices.createUser({
            name: login,
            password: ecryptedPassword
        });

        req._auth = { role: 'user', userId: newUser._id };
        next();

    } catch (error) {
        next(error);
    }
}

// Login
const renderLogin = (req, res) => {
    return res.render('login');
}

const handleLogin = async(req, _res, next) => {
    const { login, password } = req.body;

    try {
        const admin = await adminServices.findAdmin({ name: login });
        if (admin) {
            isPassValid = await checkPassword(password, admin.password);

            if (!isPassValid) {
                return next({ message: ERROR.loginError });
            }

            req._auth = { role: 'admin', userId: admin._id };
            return next();
        }

        const user = await userServices.findUser({ name: login });
        if (!user) {
            return next({ status: STATUS.Unauthorized , message: ERROR.loginError });
        }

        isPassValid = await checkPassword(password, user.password);
        if (!isPassValid) {
            return next({ message: ERROR.loginError });
        }

        req._auth = { role: 'user', userId: user._id };
        return next();

    } catch (error) {
        next(error);
    }
}

// Logout
const handleLogout = async (req, res, next) => {
    const { accessToken = "", refreshToken = "" } = req.cookies || {};

    if (accessToken) {
        res.clearCookie('accessToken', accessToken, tokenOptions);
    }

    if (!refreshToken) {
        return res.redirect('/');
    }

    res.clearCookie('refreshToken', refreshToken, tokenOptions);

    try {
        const user = await userServices.findUser({ refreshToken });
        const admin = await adminServices.findAdmin({ refreshToken });

        if (user) {

            await userServices.updateUser(user, 'refreshToken', '');
        }

        if (admin) {
            await adminServices.updateAdmin(admin, 'refreshToken', '');
        }

        return res.redirect('/');

    } catch (error) {
        next(error)
    }
}

    module.exports = {
        renderRegister,
        handleRegister,
        renderLogin,
        handleLogin,
        handleLogout
    }
