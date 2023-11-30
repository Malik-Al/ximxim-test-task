const { User } = require('../db/connection');
const logger = require('../../logger');
const bcrypt = require('bcrypt');
const Token = require('./token.service');
const apiError = require('../error/api.error');

class UserService {
    async registrationService(id, password) {
        logger.info(
            '[START] registrationService Метода для записи пользователя в базу',
        );
        try {
            const hashPassword = await bcrypt.hash(password, 5);
            const body = {
                id,
                password: hashPassword,
                refresh_token: null,
                created_at: new Date(),
            };

            const newUser = await User.create(body);

            const user = {
                user_id: newUser.dataValues.user_id,
                id: newUser.dataValues.id,
                password: newUser.dataValues.password,
                created_at: newUser.dataValues.created_at,
            };

            const tokens = Token.generateTokens(user);

            await this.updateFieldRefreshToken(
                newUser.dataValues.user_id,
                tokens.refreshToken,
            );

            return tokens;
        } catch (error) {
            console.log('Error registrationService:', error);
            throw error;
        }
    }

    async authorizationsService(data) {
        try {
            const { id, password } = data;

            const user = await this.findOneService(id);
            if (!user) throw apiError.badRequest(`Пользователь не найден`);

            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) throw apiError.badRequest(`Неверный пароль`);

            const userData = {
                user_id: user.user_id,
                id: user.id,
                password: user.password,
                created_at: user.created_at,
            };

            const tokens = Token.generateTokens(userData);

            await this.updateFieldRefreshToken(
                user.user_id,
                tokens.refreshToken,
            );

            return tokens;
        } catch (error) {
            console.log('Error authorizationsService:', error);
            throw error;
        }
    }

    async updateFieldRefreshToken(userId, refreshToken) {
        logger.info(
            '[START] Метода updateFieldRefreshToken для обновление поле refresh_token у User',
        );
        try {
            const result = await User.update(
                { refresh_token: refreshToken },
                {
                    where: { user_id: userId },
                },
            );
            result[0]
                ? logger.info('[SUCCESS] Успешно обновилась поле refresh_token')
                : logger.warn(
                      '[ERROR] Произошла ошибка при обновление поле refresh_token',
                  );
        } catch (error) {
            console.log('Error updateFieldRefreshToken:', error);
            throw error;
        }
    }

    async issueNewRefreshToken(refreshToken) {
        logger.info(
            '[START] Метода issueNewRefreshToken для обновления accessToken по refreshToken',
        );
        try {
            const isValidRefreshToken =
                Token.validateRefreshToken(refreshToken);
            if (!isValidRefreshToken)
                throw apiError.UnauthorizedError(
                    `Refresh token has expired`,
                    'Unauthorized',
                );

            const accessToken = Token.generateAccessToken(isValidRefreshToken);
            return accessToken;
        } catch (error) {
            console.log('Error issueNewRefreshToken:', error);
            throw error;
        }
    }

    async findOneService(id) {
        logger.info(
            '[START] Метода findOneService для поиска пользователя по полю id в базе',
        );
        try {
            const result = await User.findAll({
                where: { id: id },
            });
            return result.map((el) => el.dataValues)[0];
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }

    userInfoService(token) {
        logger.info(
            '[START] Метода userInfoService для получения пользователя id',
        );
        try {
            const result = Token.validateAccessTokenToken(token);
            return result.id;
        } catch (error) {
            console.error('Error userInfoService error', error);
            throw error;
        }
    }
}

module.exports = new UserService();
