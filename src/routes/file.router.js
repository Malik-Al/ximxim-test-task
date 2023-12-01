const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { uploadfile, findFiles } = require('../controllers/file.controller');

router.post('/file/upload', authMiddleware, uploadfile);
router.get('/file/list', authMiddleware, findFiles);

module.exports = router;
