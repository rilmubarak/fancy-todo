require('dotenv').config()
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const { encode } = require('../helpers/jwt')

class googleAuth {
    static googleSignin (req, res, next) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload();
            const userid = payload['sub']
            return User.findOne({ where: { email: payload["email"] } })
        })
        .then(user => {
            if (user) {
            return user;
            } else {
            let dataUser = {
                email: payload['email'],
                password: 'admin',
            }
            return User.create(dataUser)
            }
        })
        .then(data => {
            let access_token = encode({ id: data.id, email: data.email })
            return res.status(200).json({ access_token })
        })
        .catch(err => {
            res.status(400).send(err, "INI ERROR GUYS")
        })
    }
}

module.exports = googleAuth