
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');
const { encryptPassword, checkPassword } = require('../utils/auth');
const userServices = require('../services/users');
const adminServices = require('../services/admins');

const renderRegister = (_req, res, next) => {
    return res.render('register');
}

const handleRegister = async (req, _res, next) => {
    const { login, password, confirmPassword } = req.body;
    
    if( password !== confirmPassword) { 
        return next( {status: STATUS.BadRequest, message: ERROR.passwordError });  //! handle on client?
    }

    try {
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
            next();
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
        next();

    } catch (error) { 
        next(error);
    }
}

const handleLogout = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (accessToken) {
        res.clearCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    }

    if (refreshToken) {
        res.clearCookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    }

    try {
        const user = await userServices.findUser({ refreshToken });
        const admin = await adminServices.findAdmin({ refreshToken });
    
        if (user) {
            userServices.updateUser(user, 'refreshToken', '');
        }
    
        if (admin) {
            adminServices.updateAdmin(admin, 'refreshToken', '');
        } 

        return res.status(STATUS.NoContent).redirect('/');

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
