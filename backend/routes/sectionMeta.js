const { Router } = require('express');
const { getAll, getBySection, update } = require('../controllers/sectionMetaController');
const router = Router();
router.get('/', getAll);
router.get('/:section', getBySection);
router.put('/:section', update);
module.exports = router;
