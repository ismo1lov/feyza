const { Router } = require('express');
const { getContact, updateContact } = require('../controllers/contactController');
const router = Router();
router.get('/', getContact);
router.post('/update', updateContact);
module.exports = router;
