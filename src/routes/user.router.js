const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
    registration,
    authorizations,
    generateNewAccessToken,
    userInfo,
    logout,
} = require('../controllers/user.controller');

router.post(
    '/signup',
    body('id').isEmail(),
    body('password').isLength({ min: 6, max: 30 }),
    registration,
);

router.post(
    '/signin',
    body('id').isEmail(),
    body('password').isLength({ min: 6, max: 30 }),
    authorizations,
);

router.post(
    '/signin/new_token',
    body('refreshToken').isLength({ min: 320, max: 400 }),
    generateNewAccessToken,
);

router.get('/info', authMiddleware, userInfo);
router.get('/logout', authMiddleware, logout);

module.exports = router;
