const apiError = require('../error/api.error');
const Token = require('../service/token.service');
const BlackListTokens = require('../service/black.list.tokens.service');

module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader)
            return next(apiError.UnauthorizedError('Unauthorized'));

        const accessToken = authorizationHeader.split(' ')[1];

        const resultBlackListTokens = await BlackListTokens.checkBlacklist({access_token: accessToken})
        if (resultBlackListTokens) return next(apiError.UnauthorizedError('Unauthorized'));

        const user = Token.validateAccessTokenToken(accessToken);

        if (!user) return next(apiError.UnauthorizedError('Unauthorized'));
        next();
    } catch (error) {
        console.error('Error authMiddleware:', error);
        return next(apiError.UnauthorizedError('Unauthorized'));
    }
};
