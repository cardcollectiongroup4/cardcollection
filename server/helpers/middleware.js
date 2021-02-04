const { User } = require('../models');
const { decodedToken } = require('./jwt');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = decodedToken(token);
        const email = decoded.email;
        if (!email) throw 'Invalid token';
        const user = User.findOne({
            where: {
                email
            }
        });
        if (!user) throw 'Invalid token';
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = { authentication }