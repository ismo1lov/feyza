const { Router } = require('express');
const { getReviews, createReview, updateReview, deleteReview } = require('../controllers/reviewsController');
const router = Router();
router.get('/', getReviews);
router.post('/', createReview);
router.put('/update', updateReview);
router.delete('/:id', deleteReview);
module.exports = router;
