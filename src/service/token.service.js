const jwt = require('jsonwebtoken');
const conf = require('../../msdata/config/main.json');
const logger = require('../../logger');

class Token {
    generate(user) {
        logger.info(
            '[START] Метода generate для генераций accessToken и refreshToken',
        );
        try {
            const accessToken = jwt.sign({ user }, conf.secretToken, {
                expiresIn: '1m',
            });
            const refreshToken = jwt.sign({ user }, conf.secretToken, {
                expiresIn: '10m',
            });
            return { accessToken, refreshToken };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = new Token();
