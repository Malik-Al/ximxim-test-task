const path = require('path');
const fs = require('fs');
const { File } = require('../db/connection');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const logger = require('../../logger');
const Token = require('./token.service');

class FileService {
    pathGenerateUrl(fileName) {
        try {
            if (fileName)
                return path.resolve(
                    __dirname,
                    '../../msdata',
                    'static',
                    fileName,
                );
            return path.resolve(__dirname, '../../msdata', 'static');
        } catch (error) {
            console.error('Error pathGenerateUrl', error);
            throw error;
        }
    }

    async uploader(file, accessToken) {
        logger.info('[START] Метода uploader для загрузки файла в папку');
        try {
            const isFile = await this.searchFile(file);
            if (!isFile) {
                await file.mv(path.resolve(this.pathGenerateUrl(file.name)));
                return await this.createFileDB(file, accessToken);
            }
            return false
        } catch (error) {
            console.error('Error generateAccessToken', error);
            throw error;
        }
    }

    async searchFile(file) {
        logger.info('[START] Метода searchFile для поика файла в папке');
        try {
            const pathUrl = this.pathGenerateUrl();
            if (!fs.existsSync(pathUrl)) {
                fs.mkdirSync(pathUrl);
                await file.mv(path.resolve(this.pathGenerateUrl(file.name)));
                return false;
            }
            const listFile = await readdir(pathUrl);
            return listFile.includes(file.name);
        } catch (error) {
            console.error('Error searchFile', error);
            throw error;
        }
    }

    async createFileDB(file, accessToken) {
        logger.info('[START] Метода createFileDB для записи файла в базу');
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
            console.error('Error createFileDB', error);
            throw error;
        }
    }
}

module.exports = new FileService();
