const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('config'); 


const encryptPassword = async (plainTextPass) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(plainTextPass, salt);

    return hashedPass;
}

const checkPassword = async (plainTextPass, encryptedPass) => {
    try {
        return !!(await bcrypt.compare(plainTextPass, encryptedPass));
    } catch (err) {
        return false;
    }
}

const secret = auth.jwtSecret;

const issueAccessJwt = (data) => {
    return jwt.sign( data, secret, {expiresIn: '15min'});
}

const issueRefreshJwt = (data) => {
    return jwt.sign( data, secret, {expiresIn: '1d'});
}

module.exports = {
    encryptPassword,
    checkPassword,
    issueAccessJwt,
    issueRefreshJwt
}