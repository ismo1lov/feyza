const { Router } = require('express');
const { getFaq, createFaq, updateFaq, deleteFaq } = require('../controllers/faqController');
const router = Router();
router.get('/', getFaq);
router.post('/', createFaq);
router.put('/update', updateFaq);
router.delete('/:id', deleteFaq);
module.exports = router;
