const path = require('path');
const { File } = require('../db/connection');
const logger = require('../../logger');
const Token = require('./token.service');
const FolderService = require('./folder.service');

class FileService {
    async uploaderService(file, accessToken) {
        logger.info('[START] Метода uploaderService для загрузки файла в папку');
        try {
            const isFile = await FolderService.searchFile(file);
            if (!isFile) {
                await file.mv(
                    path.resolve(FolderService.pathGenerateUrl(file.name)),
                );
                return await this.createFileDB(file, accessToken);
            }
            return false;
        } catch (error) {
            console.error('Error uploaderService', error);
            throw error;
        }
    }

    async createFileDBService(file, accessToken) {
        logger.info('[START] Метода createFileDBService для записи файла в базу');
        try {
            const user = Token.validateAccessTokenToken(accessToken);
            const data = {
                file_name: file.name,
                mime_type: file.mimetype,
                size: file.size,
                user_id: user.user_id,
                created_at: new Date(),
                updated_at: new Date(),
            };

            const craeteFile = await File.create(data);
            craeteFile.dataValues.file_id
                ? logger.info('[SUCCESS] Успешно записано в базу')
                : logger.error('[ERROR] Произошла ошибка при записи в базу');
            return craeteFile.dataValues.file_id;
        } catch (error) {
            console.error('Error createFileDBService', error);
            throw error;
        }
    }

    async findOneFileService(id) {
        logger.info('[START] Метода findOneFileService для получения одного файла');
        try {
            const res = await File.findByPk(id);
            if(!res) return  logger.info('[ERROR] Нет такого файла') && null 
            logger.info('[SUCCESS] Успешно нашел файл');
            return res.dataValues
        } catch (error) {
            console.error('Error findOneFileService', error);
            throw error;
        }
    }

    async findFilesFromDBService(page, listSize) {
        logger.info(
            '[START] Метода findFilesFromDBService для получения данных из базы по опциональным параметрам',
        );
        try {
            const offset = (page - 1) * listSize;

            const files = await File.findAll({
                limit: listSize,
                offset: offset,
                order: [['created_at', 'DESC']],
            });

            const totalCount = await File.count();

            return [files.map((el) => el.dataValues), totalCount];
        } catch (error) {
            console.error('Error findFilesFromDBService', error);
            throw error;
        }
    }
}

module.exports = new FileService();
