require('dotenv').config()
const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class UserController {
    static register (req, res, next) {
        const newData = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(newData)
        .then((data) => {
            return res.status(201).json(data)
        })
        .catch((err) => {
            next(err)
        })
    }

    static login (req, res, next) {
        const email = req.body.email
        const password = req.body.password

        User.findOne({where: { email }})
        .then((data) => {
            if (!data) {
                throw {status: 400, name: "ErrorValidation", message:"email or password incorrect"}
            } else {
                if (checkPassword(password, data.password)) {
                    const token = encode({
                        id: data.id,
                        email: data.email
                    })
                    return res.status(200).json({ access_token: token })
                } else {
                    throw {status: 400, name: "ErrorValidation", message:"email or password incorrect" }
                }
            }
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = UserController