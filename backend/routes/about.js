const { Router } = require('express');
const { getAbout, updateAbout } = require('../controllers/aboutController');
const router = Router();
router.get('/', getAbout);
router.post('/update', updateAbout);
module.exports = router;
