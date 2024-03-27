
const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');
const { encryptPassword } = require('../utils/auth');
const userServices = require('../services/users');


const renderRegister = (_req, res, next) => {
    res.render('register', { tittle: "Registration" });
}

const handleRegister = async (req, res, next) => {
    const { username, password, confirmPassword } = req.body;
    
    if( password !== confirmPassword) { 
        return next( {status: STATUS.BadRequest, message: ERROR.passwordError });  //! handle on client?
    }

    try {
        const duplicate = await userServices.findUser({ username });
        if (duplicate) {
            return next( {status: STATUS.Conflict, message: ERROR.userNameError } ); 
        }

        const ecryptedPassword = await encryptPassword(password);
        const newUser = await userServices.createUser({
            username,
            password: ecryptedPassword
        });

        req._auth = { role: 'user', userId: newUser._id };
        next();

    } catch (error) { 
        next(error);
    }
}

const renderLogin = (req, res) => {
        res.render('login');
    }

const handleLogin = (req, res) => {
}

    module.exports = {
        renderRegister,
        handleRegister,
        renderLogin,
        handleLogin,
    }
