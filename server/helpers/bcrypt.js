let bcrypt = require('bcryptjs');

const hashing = password => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkPassword = (password, hash) => {
    const isValid = bcrypt.compareSync(password, hash);
    return isValid;
}

module.exports = { hashing, checkPassword }