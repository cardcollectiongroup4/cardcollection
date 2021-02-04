let jwt = require('jsonwebtoken');

const generateToken = payload => {
    let token = jwt.sign(payload, 'secret');
    return token;
}

const decodedToken = (token) => {
    let decoded = jwt.verify(token, 'secret');
    return decoded;
}

module.exports = { generateToken, decodedToken }