const userService = require('../service/user.service');
const { validationResult } = require('express-validator');
const apiError = require('../error/api.error');
const logger = require('../../logger');


class UserController {
    async registration(req, res, next) {
        logger.info(
            `[START] Запуск метода registration для Регистрации пользователя`,
        );
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    apiError.badRequest('Ошибка при валидаций', errors.array()),
                );
            }

            const { id, password } = req.body;

            const isUser = await userService.findOneService(id);

            if (isUser) return next(apiError.UserAlreadyExists());

            const result = await userService.registrationService(id, password);

            if (!result) next(apiError.badRequest('Что-то пошло не так'));

            if (result) {
                logger.info('[SUCCES] Регистрация прошла успешно');
                res.status(201).json({
                    message: 'Регистрация прошла успешно',
                    data: result,
                });
            }
        } catch (error) {
            console.log('error', error);
            next(error);
        }
    }

    async authorizations(req, res, next) {
        logger.info(
            `[START] Запуск метода authorizations для Авторизация пользователя`,
        );
        try {
            const { id, password } = req.body;

            const result = await userService.authorizationsService({
                id,
                password,
            });

            if (result) {
                logger.info('[SUCCES] Авторизация прошла успешно');
                res.status(200).json({
                    message: 'Авторизация прошла успешно',
                    data: result,
                });
            }
        } catch (error) {
            console.error('Error authorizations', error);
            next(error);
        }
    }

    async generateNewAccessToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await userService.issueNewRefreshToken(refreshToken);

            logger.info('[SUCCES] Получение нового accessToken прошла успешно');
            res.status(200).json({
                message: 'Access token successfully refreshed',
                data: result,
            });
        } catch (error) {
            console.error('Error generateNewAccessToken', error);
            next(error);
        }
    }

    async userInfo(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            const result = userService.userInfoService(accessToken);
            res.status(200).json({
                message: 'success',
                data: {
                    id: result,
                },
            });
        } catch (error) {
            console.error('Error generateNewAccessToken', error);
            next(error);
        }
    }


      async logout(req, res, next){
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];
            const result = await userService.logoutService(accessToken)
            res.status(200).json({
                message: 'successful logout',
            });            
        } catch (error) {
            console.error('Error logout', error);
            next(error);
        }

    }

}

module.exports = new UserController();
