let jwt = require('jsonwebtoken');

const generateToken = payload => {
    let token = jwt.sign(payload, 'secret');
    return token;
}

const decodedToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'secret');
        return decoded;
    } catch (err) {
        return false;
    }
}

module.exports = { generateToken, decodedToken }