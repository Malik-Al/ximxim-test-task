const { User } = require('../db/connection');
const logger = require('../../logger');

class UserService {
    async findOneService(id) {
        logger.info('[START] findOneService Метода для поиска пользователя по полю id в базе')
        try {
            const result = await User.findAll({
                where: { id: id },
            });
            return result.map((el) => el.dataValues.id)[0] ? true : false;
        } catch (error) {
            console.log('error', error);
            throw error
        }
    }


    async registrationService(id, password) {
        logger.info('[START] registrationService Метода для записи пользователя в базу')
        try {
            const body = {
                id,
                password,
                refresh_token: "refresh_token",
                created_at: new Date()
            }
            const result = await User.create(body)
            return result.dataValues.user_id

        } catch (error) {
            console.log('error', error);
            throw error
        }
    }


}

module.exports = new UserService();
