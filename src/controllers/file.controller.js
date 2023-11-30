const { validationResult } = require('express-validator');
const apiError = require('../error/api.error');
const logger = require('../../logger');

class FileController {
    async uploadfile(req, res, next) {
        try {
            res.status(200).json({
                message: 'uploadfile',
            });
        } catch (error) {}
    }
}

module.exports = new FileController();
