const { validationResult } = require('express-validator');
const apiError = require('../error/api.error');
const logger = require('../../logger');
const FileService = require('../service/files.service');

class FileController {
    async uploadfile(req, res, next) {
        logger.info(
            `[START] Запуск метода uploadfile для загрузки файла`,
        );
        try {
            const {file} = req.files
            await FileService.uploader(file)
            res.json({
                message: "success"
            });
        } catch (error) {
            console.error('Error uploadfile', error);
            next(error);
        }
    }
}

module.exports = new FileController();
