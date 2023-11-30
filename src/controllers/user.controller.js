const userService = require('../service/user.service');
const { validationResult } = require('express-validator');
const apiError = require('../error/api.error');
const logger = require('../../logger');

class UserController {
    async registration(req, res, next) {
        logger.info(`[START] Запуск метода для Регистрации пользователя`);
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
                res.status(201).json({ message: 'Успешно прошла регистрация' });
            }
        } catch (error) {
            console.log('error', error);
            next(error);
        }
    }
}

module.exports = new UserController();
