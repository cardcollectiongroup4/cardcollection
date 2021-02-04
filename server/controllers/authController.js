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
    static async loginOauth(req, res, next) {
        try {
            const client = new OAuth2Client('20457665399-i3k3o3u655s3pgao3m3v7bahj1hkhsdl.apps.googleusercontent.com');
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: '20457665399-i3k3o3u655s3pgao3m3v7bahj1hkhsdl.apps.googleusercontent.com'
            });
            const payload = ticket.getPayload();
            const email = payload.email;
            let user = await User.findOne({
                where: {
                    email
                }
            });

            if (!user) {
                const newUser = {
                    email,
                    password: payload.sub
                }
                user = await User.create(newUser);
            }

            // Generate token
            const userHasLogin = {
                id: user.id,
                email: user.email
            }
            const token = generateToken(userHasLogin);
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