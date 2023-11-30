const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const {
    registration,
    authorizations,
    generateNewAccessToken,
} = require('../controllers/user.controller');

router.post(
    '/signup',
    body('id'),
    body('password').isLength({ min: 6, max: 30 }),
    registration,
);

router.post(
    '/signin',
    body('id'),
    body('password').isLength({ min: 6, max: 30 }),
    authorizations,
);

router.post(
    '/signin/new_token',
    body('refreshToken').isLength({ min: 320, max: 400 }),
    generateNewAccessToken,
);
module.exports = router;
