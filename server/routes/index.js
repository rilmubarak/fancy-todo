const router = require('express').Router()
const userRoute = require('./userRoute')
const todosRoute = require('./todosRoute')
const googleAuth = require('../controllers/oauthController')

router.post('/googleSignin', googleAuth.googleSignin)

router.use('/', userRoute)
router.use('/todos', todosRoute)

module.exports = router