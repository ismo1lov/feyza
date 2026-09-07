const { Router } = require('express');
const { getContent, updateContent } = require('../controllers/contentController');

const router = Router();

router.get('/', getContent);
router.post('/update', updateContent);

module.exports = router;
