const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');
const { issueAccessJwt, issueRefreshJwt } = require('../utils/auth');
const userServices = require('../services/users');
const adminServices = require('../services/admins');
const { isTokenExpired, veryfyJwt } = require('../utils/auth');

const tokenSession = async (req, res, next) =>{
    const { role, userId } = req._auth || {};

    if( !role || !userId ) {
        next( {status: STATUS.Unauthorized, message: 'ERROR.authorizarionError'} ); 
    }

    const accessToken = issueAccessJwt({ role, userId });
    const refreshToken = issueRefreshJwt({ userId });

    try {
        if(role === 'admin') {
            await adminServices.findAdminAndUpdate({ _id: userId }, { refreshToken });
        } else if(role === 'user') {
            await userServices.findUserAndUpdate({ _id: userId }, { refreshToken });
        } else {
            next( {status: STATUS.Unauthorized, message: ERROR.authorizarionError } ); 
        }
    } catch (error) {
        return next(error);
    }

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    
    const redirectTo = role === 'admin' ? '/admin' : '/';
    return res.redirect(redirectTo);
}

const jwtParser = async (req, res, next) => {
    const { refreshToken = '', accessToken ='' } = req.cookies;

    if (!refreshToken || !accessToken) {
        req._auth = {};
        return next();
    }

    const isRefrTokenExpired = isTokenExpired(refreshToken);

    if (isRefrTokenExpired) {
        req._auth = {};
        return next();
    }

    const isAccessTokenExpired = isTokenExpired(accessToken);

    if(isAccessTokenExpired) {
        try {
            const user = await userServices.findUser({ refreshToken });
            const admin = await adminServices.findAdmin({ refreshToken });
    
            if (!user && !admin) {
                req._auth = {};
                return next();
            }
    
            const foundUser = user || admin;
            const role = user ? 'user' : 'admin';
            const decoded = veryfyJwt(refreshToken); 
    
            if(decoded.userId !== foundUser._id.toString())  {
                req._auth = {};
                return next();
            }
    
            const payload = { role, userId: decoded.userId };
            const newAccessToken = issueAccessJwt(payload);
            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    
            req._auth = payload;
            return next();
        } catch (error) {
            return next(error);
        }
    }

    const payload = veryfyJwt(accessToken);
    req._auth = payload;
    next();
}

const protectedRoute = (allowedRoles = [], redirectTo = '/auth/login') => function (req, resp, next) {
    const { role = 'unsigned' } = req._auth || {};

    if (!allowedRoles.includes(role)) {
        console.log(`Role [${role}] is not allowed for [${req.url}]`);
        return resp.redirect(redirectTo);
    }

    next();
}

module.exports = {
    tokenSession,
    jwtParser,
    protectedRoute,
}