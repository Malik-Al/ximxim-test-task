const { User } = require('../db/connection');
const logger = require('../../logger');
const bcrypt = require('bcrypt');
const Token = require('./token.service');

class UserService {
    async findOneService(id) {
        logger.info(
            '[START] findOneService Метода для поиска пользователя по полю id в базе',
        );
        try {
            const result = await User.findAll({
                where: { id: id },
            });
            return result.map((el) => el.dataValues.id)[0] ? true : false;
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }

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
                created_at: newUser.dataValues.created_at
            }

            const tokens = Token.generate(user);
            return tokens
            
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }
}

module.exports = new UserService();
