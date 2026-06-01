const express = require('express');
const router = express.Router();
const { buatBooking, riwayatBooking, detailBooking } = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, buatBooking);
router.get('/', verifyToken, riwayatBooking);
router.get('/:id', verifyToken, detailBooking);

module.exports = router;