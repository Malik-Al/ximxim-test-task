const jwt = require('jsonwebtoken');
const conf = require('../../msdata/config/main.json');
const logger = require('../../logger');

class Token {
    generateTokens(user) {
        logger.info(
            '[START] Метода generate для генераций accessToken и refreshToken',
        );
        try {
            const accessToken = jwt.sign(
                { user },
                conf.secretToken.accessToken.secret,
                {
                    expiresIn: conf.secretToken.accessToken.time,
                },
            );
            const refreshToken = jwt.sign(
                { user },
                conf.secretToken.refreshToken.secret,
                {
                    expiresIn: conf.secretToken.refreshToken.time,
                },
            );
            return { accessToken, refreshToken };
        } catch (error) {
            console.error('Error generate', error);
            throw error;
        }
    }

    generateAccessToken(user) {
        logger.info(
            '[START] Метода generateAccessToken для генераций accessToken',
        );
        try {
            const accessToken = jwt.sign(
                { user },
                conf.secretToken.accessToken.secret,
                {
                    expiresIn: conf.secretToken.accessToken.time,
                },
            );

            return { accessToken };
        } catch (error) {
            console.error('Error generateAccessToken', error);
            throw error;
        }
    }

    validateAccessTokenToken(token) {
        logger.info(
            '[START] Метода validateAccessTokenToken для проверки accessToken',
        );
        try {
            const accessData = jwt.verify(
                token,
                conf.secretToken.accessToken.secret,
            );
            if (accessData.user) return accessData.user;
        } catch (error) {
            console.error('Error validateAccessTokenToken', error);
            if (error.message === 'jwt expired') return false;
            throw error;
        }
    }

    validateRefreshToken(token) {
        logger.info(
            '[START] Метода validateAccessTokenToken для проверки refreshToken',
        );
        try {
            const refreshData = jwt.verify(
                token,
                conf.secretToken.refreshToken.secret,
            );
            if (refreshData.user) return refreshData.user;
        } catch (error) {
            console.error('Error validateRefreshToken', error);
            if (error.message === 'jwt expired') return false;
            throw error;
        }
    }
}

module.exports = new Token();
