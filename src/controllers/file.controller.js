const { validationResult } = require('express-validator');
const apiError = require('../error/api.error');
const logger = require('../../logger');
const FileService = require('../service/files.service');

class FileController {
    async uploadfile(req, res, next) {
        logger.info(`[START] Запуск метода uploadfile для загрузки файла`);
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];

            const { file } = req.files;
            await FileService.uploader(file, accessToken);

            res.status(202).json({
                message: 'File was successfully written',
            });
        } catch (error) {
            console.error('Error uploadfile', error);
            next(error);
        }
    }
}

module.exports = new FileController();
