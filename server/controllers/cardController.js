const { Card, User, UserCard } = require('../models');
const axios = require("axios")
const { decodedToken } = require('../helpers/jwt');


class cardController {
    static generate(req, res, next) {
        let random = Math.floor(Math.random() * 3) + 1;
        // let random = 1;
        if (random === 1) {
            axios({
                url: 'https://api.thecatapi.com/v1/images/search',
                method: 'GET',
                headers: {
                    "x-api-key": 'bf8a8053-2679-498b-9b3c-116f37e77d6b'
                }
            })
                .then(response => {
                    // console.log(response);
                    res.status(200).json(response.data[0].url)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
        else if (random === 2) {
            axios.get("https://random.dog/woof.json")
                .then(response => {
                    // console.log(response.data.url);
                    res.status(200).json(response.data.url)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
        else {
            axios.get("https://randomfox.ca/floof/")
                .then(response => {
                    // console.log(response.data.image);
                    res.status(200).json(response.data.image)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
    }

    static async getAllCards(req, res, next) {
        try {
            const token = req.headers.token;
            const decoded = decodedToken(token);
            const userId = decoded.id;
            if (!userId) throw 'Invalid token';

            const opt = {
                where: {
                    id: userId
                },
                include: Card
            }

            const user = await User.findOne(opt);
            if (!user) throw 'Invalid token';
            const cards = user.Cards;
            if (cards.length === 0) throw 404;
            res.status(200).json(cards);
        } catch (err) {
            next(err);
        }
    }

    static async saveCard(req, res, next) {
        try {
            const token = req.headers.token;
            const decoded = decodedToken(token);
            const userId = decoded.id;
            if (!userId) throw 'Invalid token';
            const imgUrl = req.body.imgUrl;

            let card = await Card.findOne({
                where: {
                    url: imgUrl
                }
            });

            if (!card) {
                card = await Card.create({ url: imgUrl })
            }
            const newUserCard = {
                userId,
                cardId: card.id
            }
            await UserCard.create(newUserCard);
            res.status(201).json('Created success');
        } catch (err) {
            next(err);
        }
    }

    static async deleteCard(req, res, next) {
        try {
            const token = req.headers.token;
            const decoded = decodedToken(token);
            const userId = decoded.id;
            const cardId = req.body.cardId;
            if (!userId) throw 'Invalid token';

            const opt = {
                where: {
                    userId,
                    cardId
                }
            }
            const card = await UserCard.destroy(opt);
            if (card === 0) throw 404;
            const msg = {
                message: 'Success deleted',
                data: card
            }

            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = cardController