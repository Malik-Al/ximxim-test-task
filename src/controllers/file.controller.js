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
            const result = await FileService.uploader(file, accessToken);
            if(!result) return next(apiError.badRequest('File with this name is already in the database'));
            res.status(200).json({
                message: 'File was successfully written',
            });
        } catch (error) {
            console.error('Error uploadfile', error);
            next(error);
        }
    }
}

module.exports = new FileController();
