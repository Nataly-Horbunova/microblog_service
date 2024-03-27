const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');
const { issueAccessJwt, issueRefreshJwt } = require('../utils/auth');
const userServices = require('../services/users');

const tokenSession = (req, res, next) =>{
    const { role, userId } = req._auth || {};

    if( !role || !userId ) {
        next( {status: STATUS.Unauthorized, message: ERROR.authorizarionError} );
    }

    const accessToken = issueAccessJwt({ role, userId });
    const refreshToken = issueRefreshJwt({ userId });

    if(role === 'admin') {
        userServices.findAdminAndUpdate({ _id: userId }, { refreshToken });
    } else if(role === 'user') {
        userServices.findUserAndUpdate({ _id: userId }, { refreshToken });
    } else {
        next( {status: STATUS.Unauthorized, message: ERROR.authorizarionError} );
    }

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    
    const redirectTo = role === 'admin' ? '/admin' : '/';
    return res.redirect(redirectTo);
}

module.exports = {
    tokenSession
}