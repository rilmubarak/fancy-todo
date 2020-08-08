const { Todo } = require('../models')

class TodosController {
    static add (req, res, next) {
        console.log('ini kampr', req.UserId);
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.UserId,
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: ${req.body.title}. descripsi: ${req.body.description}`
        }

        Todo.create(newTodo)
        .then((todo) => {
            return res.status(201).json(todo)
        })
        .catch((err) => {
            console.log('ini dia >>>', err);
            next(err)
        })
    }

    static show (req, res, next) {
        const id = req.UserId

        Todo.findAll({where: {UserId: id}, order: [[`createdAt`, `ASC`]]})
        .then((todo) => {
            return res.status(200).json(todo)
        })
        .catch((err) => {
            next(err)
        })
    }

    static showById (req, res, next) {
        const id = req.params.id

        Todo.findByPk(id)
        .then((todo) => {
            if (!todo) {
                throw {status: 404, name: "ErrorValidation", message: "Todo Not Found"}
            } else {
                return res.status(200).json(todo)
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static update (req, res, next) {
        const id = req.params.id
        const updateTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: ${req.body.title}. descripsi: ${req.body.description}`
        }

        Todo.findByPk(id)
        .then((todo) => {
            if (todo) {
                return todo.update(updateTodo)
            } else {
                throw {status: 404, name: "ErrorValidation", message: "Todo Not Found"}
            }
        })
        .then((todo) => {
            return res.status(200).json(todo)
        })
        .catch((err) => {
            console.log('ni dia>>>', err);
            next(err)
        })
    }

    static destroy (req, res, next) {
        const id = req.params.id
        let deleted

        Todo.findByPk(id)
        .then((todo) => {
            deleted = todo
            if (!todo) {
                throw {status: 404, name: "ErrorValidation", message: "Todo Not Found"}
            } else {
                return todo.destroy()
            }
        })
        .then((todo) => {
            return res.status(200).json(deleted)
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = TodosController