const errorHandling = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const msg = {
            message: err.errors[0].message,
            response: false
        }
        res.status(400).json(msg);
    } else if (err === 'Invalid email or password') {
        const msg = {
            message: err,
            response: false
        }
        res.status(401).json(msg);
    } else if (err === 'Invalid token') {
        const msg = {
            message: err,
            response: false
        }
        res.status(401).json(msg);
    }
}

module.exports = errorHandling;