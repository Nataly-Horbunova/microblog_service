const STATUS  = require('../constants/statusCodes');
const ERROR = require('../constants/errors');

const errorHandler = (err, _req, res, _next) => {
    return res.status(err.status || STATUS.ServerError).render('error', { 
        statusCode: err.status || STATUS.ServerError, 
        errMessage: err.message || ERROR.serverError
    });
}

const notFoundHandler = (_req, res, _next) => {
    return res.status(STATUS.NotFound).render('error', { statusCode: STATUS.NotFound, errMessage: ERROR.notFoundError });
}

const registerErrorHandler = (err, _req, res, next) => {
    if(err instanceof Error) return next(err);
    return res.status(err.status).render('register', { tittle: "Registration", err: err.message });
}

const loginErrorHandler = (err, _req, res, next) => {
    if(err instanceof Error) return next(err);
    return res.status(err.status || STATUS.BadRequest).render('login', { tittle: "Login", err: err.message });
}

module.exports = {
    errorHandler,
    registerErrorHandler,
    notFoundHandler,
    loginErrorHandler
};