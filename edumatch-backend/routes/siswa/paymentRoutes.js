const express = require('express');
const router = express.Router();
const { buatPayment, handleNotifikasi, cekStatusPembayaran } = require('../../controllers/siswa/paymentController');
const { verifyToken } = require('../../middlewares/siswa/authMiddleware');

router.post('/', verifyToken, buatPayment);
router.post('/notifikasi', handleNotifikasi);
router.get('/:id_booking', verifyToken, cekStatusPembayaran);

module.exports = router;