const Router = require('express');
const router = new Router();
const userRouter = require('./user.router');
const fileRouter = require('./file.router');

router.use('/auth', userRouter);
router.use('/file', fileRouter);

module.exports = router;
