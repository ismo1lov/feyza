const { Router } = require('express');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');
const router = Router();
router.post('/', uploadMiddleware, uploadFile);
module.exports = router;
