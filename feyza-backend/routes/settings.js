const { Router } = require('express');
const { getAll, update } = require('../controllers/settingsController');
const router = Router();
router.get('/', getAll);
router.put('/', update);
module.exports = router;
