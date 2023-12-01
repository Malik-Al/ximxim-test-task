const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { uploadfile, findFiles, findOne, downloadFile, updateFile, removeFile } = require('../controllers/file.controller');

router.get('/:id', authMiddleware, findOne);
router.get('/download/:id', authMiddleware, downloadFile);
router.put('/update/:id', authMiddleware, updateFile);
router.delete('/:id', authMiddleware, removeFile);
router.get('/list', authMiddleware, findFiles);
router.post('/upload', authMiddleware, uploadfile);



module.exports = router;
