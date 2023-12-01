const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { uploadfile, findFiles, findOne, downloadFile, updateFile, removeFile } = require('../controllers/file.controller');

router.get('/list', authMiddleware, findFiles);
router.post('/upload', authMiddleware, uploadfile);
router.get('/download/:id', authMiddleware, downloadFile);
router.put('/update/:id', authMiddleware, updateFile);
router.delete('/:id', authMiddleware, removeFile);
router.get('/:id', authMiddleware, findOne);




module.exports = router;
