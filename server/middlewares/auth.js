const { decode } = require('../helpers/jwt')
const { User, Todo } = require('../models')

async function authentication (req, res, next) {
    let { access_token } = req.headers

    try {
        const decoded = decode(access_token)
        const { id } = decoded
        const user = await User.findByPk(id)

        if (user) {
            req.UserId = user.id
            next()
        } else {
            throw {status: 400, name: 'ErrorValidation', message: "Authentication User Failed"}
        }
    } catch (err) {
        next(err)
    }
}

async function authorization (req, res, next) {
    try {
        const todoId = req.params.id
        const todo = await Todo.findByPk(todoId)

        if (todo) {
            if (todo.UserId === req.UserId) { next() }
            else { throw {status: 403, name: 'ErrorValidation', message: "Forbidden Access"} }
        } else {
            throw {status: 404, name: 'ErrorValidation', message: "Todo not found"}
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, authorization }