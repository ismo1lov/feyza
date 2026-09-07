const { Router } = require('express');
const { getBookings, createBooking, deleteBooking } = require('../controllers/bookingsController');
const router = Router();
router.get('/', getBookings);
router.post('/', createBooking);
router.delete('/:id', deleteBooking);
module.exports = router;
