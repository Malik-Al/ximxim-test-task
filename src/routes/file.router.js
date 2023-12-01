const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { uploadfile, findFiles, findOne, downloadFile } = require('../controllers/file.controller');

router.get('/:id', authMiddleware, findOne);
router.get('/download/:id', authMiddleware, downloadFile);
router.get('/list', authMiddleware, findFiles);
router.post('/upload', authMiddleware, uploadfile);



module.exports = router;
