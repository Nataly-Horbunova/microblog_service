const ERROR = require('../constants/errors');
const STATUS  = require('../constants/statusCodes');
const { issueAccessJwt, issueRefreshJwt, tokenOptions } = require('../utils/auth');
const userServices = require('../services/users');
const adminServices = require('../services/admins');
const { isTokenExpired, veryfyJwt } = require('../utils/auth');

//  Token session
const tokenSession = async (req, res, next) =>{
    const { role, userId } = req._auth || {};

    if( !['user', 'admin'].includes(role) || !userId ) {
        next( {status: STATUS.Unauthorized, message: 'ERROR.authorizarionError'} );
    }

    const accessToken = issueAccessJwt({ role, userId });
    const refreshToken = issueRefreshJwt({ userId });

    //! let's simplify a bit
    try {
        const service = {
            admin: adminServices,
            user: userServices
        }

        await service[role].findAndUpdate({ _id: userId }, { refreshToken });
    } catch (error) {
        return next(error);
    }

    res.cookie('accessToken', accessToken, tokenOptions);
    res.cookie('refreshToken', refreshToken, tokenOptions);

    const redirectTo = role === 'admin' ? '/admin' : '/';
    return res.redirect(redirectTo);
}

//  JWT parser
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
            res.cookie('accessToken', newAccessToken, tokenOptions);

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

// Protecting route
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