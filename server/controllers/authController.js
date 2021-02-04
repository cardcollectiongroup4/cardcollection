const { User } = require('../models');
const { hashing, checkPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class AuthController {
    static async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = { email, password }

            const user = await User.create(newUser);
            const msg = {
                message: 'Success create',
                data: user,
                response: true
            }
            res.status(201).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const opt = {
                where: {
                    email
                }
            }
            const user = await User.findOne(opt);
            if (!user) throw 'Invalid email or password';
            const validPassword = checkPassword(password, user.password);
            console.log(validPassword);
            if (!validPassword) throw 'Invalid email or password';

            // Generate token
            const payload = {
                id: user.id,
                email: user.email
            }
            const token = generateToken(payload);
            const msg = {
                message: 'Success',
                token
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
}
module.exports = AuthController;