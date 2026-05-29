const midtransClient = require('midtrans-client');
const { createPayment, getPaymentByBooking, updatePaymentStatus } = require('../models/paymentModel');
const pool = require('../config/db');

const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

const buatPayment = async (req, res) => {
    try {
        const { id_booking, metode } = req.body;
        const id_user = req.user.id;

        if (!id_booking || !metode) {
            return res.status(400).json({ message: 'Semua kolom wajib diisi' });
        }

        const bookingResult = await pool.query(
            `SELECT b.*, t.tarif, u.nama, u.email
            FROM BOOKING b
            JOIN SISWA s ON b.id_siswa = s.id_siswa
            JOIN USERS u ON s.id_user = u.id_user
            JOIN TUTOR t ON b.id_tutor = t.id_tutor
            WHERE b.id_booking = $1 AND s.id_user = $2`,
            [id_booking, id_user]
        )

        if (bookingResult.rows.length === 0) {
            return res.status(404).json({ message: 'Booking tidak ditemukan' });
        }

        const booking = bookingResult.rows[0];

        if (booking.status_booking !== 'pending') {
            return res.status(400).json({ message: 'Booking tidak dapat dibayar' });
        }

        const existingPembayaran = await getPaymentByBooking(id_booking);
        if (existingPembayaran) {
            return res.status(400).json({ message: 'Pembayaran sudah dilakukan untuk booking ini' });
        }

        const parameter = {
            transaction_details: {
                order_id: `EDUMATCH-${id_booking}-${Date.now()}`,
                gross_amount: booking.tarif
            },
            customer_details: {
                first_name: booking.nama,
                email: booking.email
            },
            enabled_payments: ['mandiri_va', 'bca_va', 'bri_va', 'bni_va'],
        };

        const transaction = await snap.createTransaction(parameter);

        await createPayment(id_booking, booking.tarif, metode);

        res.status(201).json({
            message: 'Pembayaran berhasil dibuat',
            token: transaction.token,
            redirect_url: transaction.redirect_url
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const handleNotifikasi = async (req, res) => {
    try {
        const notification = req.body;

        const statusResponse = await snap.transaction.notification(notification);

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        const id_booking = orderId.split('-')[1];

        let statusPembayaran = 'pending';
        let statusBooking = 'pending';

        if (transactionStatus === 'capture' && fraudStatus === 'accept') {
            statusPembayaran = 'lunas';
            statusBooking = 'aktif';
        } else if (transactionStatus === 'settlement') {
            statusPembayaran = 'lunas';
            statusBooking = 'aktif';
        } else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
            statusPembayaran = 'gagal';
            statusBooking = 'dibatalkan';
        }

        await updateStatusPembayaran(id_booking, statusPembayaran);

        await pool.query(
            `UPDATE BOOKING SET status_booking = $1 WHERE id_booking = $2`,
            [statusBooking, id_booking]
        );

        res.status(200).json({ message: 'Notifikasi diterima' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const cekStatusPembayaran = async (req, res) => {
    try {
        const { id_booking } = req.params;
        const pembayaran = await getPembayaranByBooking(id_booking);

        if (!pembayaran) {
            return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
        }

        res.json({ data: pembayaran });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { buatPayment, handleNotifikasi, cekStatusPembayaran };