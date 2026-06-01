const express = require('express');
const router = express.Router();
const { lihatBooking, detailBooking, updateStatusBookingController } = require('../controllers/bookingController');
const { verifyTutor } = require('../middlewares/authMiddleware');

router.get('/', verifyTutor, lihatBooking);
router.get('/:id', verifyTutor, detailBooking);
router.patch('/:id/status', verifyTutor, updateStatusBookingController);

module.exports = router;
