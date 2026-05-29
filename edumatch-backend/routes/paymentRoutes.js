const express = require('express');
const router = express.Router();
const { buatPayment, handleNotifikasi, cekStatusPembayaran } = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, buatPayment);
router.post('/notifikasi', handleNotifikasi);
router.get('/:id_booking', verifyToken, cekStatusPembayaran);

module.exports = router;