const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('config'); 

const secret = auth.jwtSecret;

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

const issueAccessJwt = (data) => {
    return jwt.sign( data, secret, {expiresIn: '15s'});
}

const issueRefreshJwt = (data) => {
    return jwt.sign( data, secret, {expiresIn: '1d'});
}

const isTokenExpired = (token) => {
    const decodedToken = jwt.decode(token);
    
    if (!decodedToken || !decodedToken.exp) {
        return true; 
    }

    const currentTime = Date.now() / 1000; 
    return decodedToken.exp < currentTime;
}

const veryfyJwt = (token) => { 
    let data = {};

    if (!token) {
        console.log('Missing JWT, unauth client');
        return data;
    }

    try {
        data = jwt.verify(token, secret);
    } catch (err) {
        console.log('Invalid JWT!');
    }

    return data;
}

module.exports = {
    encryptPassword,
    checkPassword,
    issueAccessJwt,
    issueRefreshJwt,
    isTokenExpired,
    veryfyJwt
}