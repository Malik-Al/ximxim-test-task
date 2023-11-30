const Router = require('express')
const router = new Router()
const {registration} = require('../controllers/user.controller')


router.post('/signup', registration)

module.exports = router