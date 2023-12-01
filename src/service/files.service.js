const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const logger = require('../../logger');

class FileService {
    pathGenerateUrl(fileName) {
        try {
            return path.resolve(__dirname, '../../msdata', 'static', fileName);
        } catch (error) {
            console.error('Error pathGenerateUrl', error);
            throw error;
        }
    }

    async uploader(file) {
        logger.info('[START] Метода uploader для загрузки файла в папку');
        try {
            await file.mv(path.resolve(this.pathGenerateUrl(file.name)));
        } catch (error) {
            console.error('Error generateAccessToken', error);
            throw error;
        }
    }

    async createFilesDB(file) {
        try {
        } catch (error) {}
    }
}

module.exports = new FileService();
