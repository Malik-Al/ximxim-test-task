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
            const result = await FileService.uploaderService(file, accessToken);
            if (!result)
                return next(
                    apiError.badRequest(
                        'File with this name is already in the database',
                    ),
                );
            res.status(200).json({
                message: 'File was successfully written',
            });
        } catch (error) {
            console.error('Error uploadfile', error);
            next(error);
        }
    }

    async findOne(req, res, next) {
        logger.info(`[START] Запуск метода findOne для получения файла`);
        try {
            const { id } = req.params;
            const file = await FileService.findOneFileService(id);
            if (!file) return next(apiError.badRequest('Not found file'));
            res.status(200).json({
                message: 'success',
                data: file,
            });
        } catch (error) {
            console.error('Error findOne', error);
            next(error);
        }
    }

    async findFiles(req, res, next) {
        logger.info(
            `[START] Запуск метода findFiles для получения всех файлов`,
        );
        try {
            const page = parseInt(req.query.page) || 1;
            const listSize = parseInt(req.query.list_size) || 10;

            const result = await FileService.findFilesFromDBService(
                page,
                listSize,
            );
            res.status(200).json({
                message: 'success',
                total: result[1],
                data: result[0],
            });
        } catch (error) {
            console.error('Error findFiles', error);
            next(error);
        }
    }
}

module.exports = new FileController();
