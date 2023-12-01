const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const logger = require('../../logger');
const conf = require('../../msdata/config/main.json');

class FolderService {
    pathGenerateUrl(fileName) {
        try {
            if (fileName)
                return path.resolve(
                    __dirname,
                    conf.folder.path,
                    conf.folder.name,
                    fileName,
                );
            return path.resolve(__dirname, conf.folder.path, conf.folder.name);
        } catch (error) {
            console.error('Error pathGenerateUrl', error);
            throw error;
        }
    }

    async createFile(file) {
        try {
            await file.mv(path.resolve(this.pathGenerateUrl(file.name)));
        } catch (error) {
            console.error('Error createFile', error);
            throw error;
        }
    }

    async isFileMethod(file) {
        try {
            const isFile = await this.searchFile(file);
            if (!isFile) {
                await this.createFile(file);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error isFileMethod', error);
            throw error;
        }
    }

    async removeFile(fileName) {
        try {
            const pathUrl = this.pathGenerateUrl();
            const listFile = await readdir(pathUrl);
            const img = listFile.filter((file) => file.includes(fileName));
            const fileDelete = path.resolve(pathUrl, img[0]);
            fs.unlink(fileDelete, function (err) {
                if (err) throw err;
            });
        } catch (error) {
            console.error('Error removeFile', error);
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
