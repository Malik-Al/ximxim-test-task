const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const logger = require('../../logger');

class FolderService {
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
}

module.exports = new FolderService();
