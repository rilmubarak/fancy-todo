const router = require('express').Router()
const userRoute = require('./userRoute')
const todosRoute = require('./todosRoute')

router.use('/', userRoute)
router.use('/todos', todosRoute)

module.exports = router