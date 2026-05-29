const pool = require('../config/db');

const createPayment = async (id_booking, jumlah, metode) => {
    const result = await pool.query(
        `INSERT INTO pembayaran (id_booking, jumlah, metode, status_pembayaran)
        VALUES ($1, $2, $3, 'pending')
        RETURNING *`,
        [id_booking, jumlah, metode]
    );

    return result.rows[0];
};

const getPaymentByBooking = async (id_booking) => {
    const result = await pool.query(
        `SELECT * FROM pembayaran
        WHERE id_booking = $1`,
        [id_booking]
    );

    return result.rows[0];
};

const updatePaymentStatus = async (id_booking, status_pembayaran) => {
    const result = await pool.query(
        `UPDATE pembayaran 
        SET status_pembayaran = $1
        WHERE id_booking = $2
        RETURNING *`,
        [status_pembayaran, id_booking]
    );

    return result.rows[0];
};

module.exports = { createPayment, getPaymentByBooking, updatePaymentStatus };