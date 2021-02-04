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
    } else if (err === 404) {
        const msg = {
            message: 'Data not found',
            response: false
        }
        res.status(404).json(msg);
    } else {
        res.status(500).json(err);
    }
}

module.exports = errorHandling;