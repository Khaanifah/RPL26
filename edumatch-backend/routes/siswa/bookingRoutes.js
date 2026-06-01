const express = require('express');
const router = express.Router();
const { buatBooking, riwayatBooking, detailBooking } = require('../../controllers/siswa/bookingController');
const { verifyToken } = require('../../middlewares/siswa/authMiddleware');

router.post('/', verifyToken, buatBooking);
router.get('/', verifyToken, riwayatBooking);
router.get('/:id', verifyToken, detailBooking);

module.exports = router;