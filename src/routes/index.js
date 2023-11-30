const Router = require('express')
const router = new Router()
const userRouter = require('./user.router')

router.use('/auth', userRouter)

module.exports = router
