const { BlacklistTokens } = require('../db/connection');
const logger = require('../../logger');

class BlacklistToken {
    async appendBlacklist(accessToken, refreshToken) {
        logger.info(
            '[START] Метода appendBlacklist для записи токенов в черный список',
        );
        try {
            const result = await BlacklistTokens.create({
                access_token: accessToken,
                refresh_token: refreshToken,
            });
            result.dataValues
                ? logger.info(
                      '[SUCCESS] Токены успешно добавлены в black list tokens',
                  )
                : logger.info(
                      '[ERROR] что пошло не тек при добавление токенов в базу',
                  );
             return result.dataValues    
        } catch (error) {
            console.error('Error appendBlacklist error', error);
            throw error;
        }
    }

    async checkBlacklist(token) {
        logger.info(
            '[START] Метода checkBlacklist для проверки токена в black list tokens',
        );
        try {
            const result = await BlacklistTokens.findAll({
                where: token,
            });
            return result.map((el) => el.dataValues)[0];
        } catch (error) {
            console.error('Error checkBlacklist error', error);
            throw error;
        }
    }
}

module.exports = new BlacklistToken();
