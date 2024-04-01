const yup = require('yup');
const  ERROR  = require('../constants/errors');
const  STATUS  = require('../constants/statusCodes');

const validateRegisterData = async (req, resp, next) => {
    let { body } = req;

    const registerDataSchema = yup.object({
        login: yup
            .string()
            .trim()
            .matches(/[a-zA-Z0-9]/, ERROR.loginValidError)
            .min(1)
            .required(),
        password: yup
            .string()
            .trim()
            .matches(/[a-zA-Z0-9]/, ERROR.passwordValidError)
            .required(),
        confirmPassword: yup
            .string()
            .trim()
            .oneOf([yup.ref('password')], ERROR.passwordError)
            .required()
    })

    try {
        const registerData = await registerDataSchema.validate(body);
        body = registerData;
        next();
    } catch (error) {
        return next( {status: STATUS.BadRequest, message: error });
    }
}

const validateLoginData =  async (req, resp, next) => {
    let { body } = req;

    const loginDataSchema = yup.object({
        login: yup
        .string()
        .trim()
        .matches(/[a-zA-Z0-9]/, ERROR.loginValidError)
        .min(1)
        .required(),
    password: yup
        .string()
        .trim()
        .matches(/[a-zA-Z0-9]/, ERROR.passwordValidError)
        .required(),
    });

    try {
        const loginData = await loginDataSchema.validate(body);
        body = loginData;
        next();
    } catch (error) {
        return next( {status: STATUS.BadRequest, message: error });
    }
}

const validateUserId = async(req, resp, next) => {
    let { userId } = req.params;
    const userSchema = yup
        .string()
        .trim()
        .matches(/^[0-9a-fA-F]{24}$/, ERROR.userIdError);

    try {
        await userSchema.validate(userId);
        next();
    } catch (error) {
        return next( {status: STATUS.BadRequest, message: error });
    }
}

module.exports = {
    validateRegisterData,
    validateLoginData,
    validateUserId
}