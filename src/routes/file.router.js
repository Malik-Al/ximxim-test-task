const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { uploadfile } = require('../controllers/file.controller');

router.post('/file/upload', authMiddleware, uploadfile);

module.exports = router;
