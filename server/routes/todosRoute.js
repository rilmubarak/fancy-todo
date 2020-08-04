const router = require('express').Router()
const todosController = require('../controllers/todosController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', todosController.add)
router.get('/', todosController.show)
router.get('/:id', todosController.showById)
router.put('/:id', authorization, todosController.update)
router.delete('/:id', authorization, todosController.destroy)

module.exports = router