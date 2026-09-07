const { Router } = require('express');
const { login, me, changePassword } = require('../controllers/authController');
const router = Router();
router.post('/login', login);
router.get('/me', me);
router.put('/change-password', changePassword);
module.exports = router;
