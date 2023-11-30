const apiError = require('../error/api.error');
const Token = require('../service/token.service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader)
            return next(apiError.UnauthorizedError('Unauthorized'));

        const accessToken = authorizationHeader.split(' ')[1];

        const user = Token.validateAccessTokenToken(accessToken);

        if (!user) return next(apiError.UnauthorizedError('Unauthorized'));
        next();
    } catch (error) {
        console.error('Error authMiddleware:', error);
        return next(apiError.UnauthorizedError('Unauthorized'));
    }
};
