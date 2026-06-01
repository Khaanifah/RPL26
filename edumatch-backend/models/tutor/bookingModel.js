const pool = require('../../config/tutor/db');

const getBookingByTutor = async (id_tutor, status) => {
    let query = `
        SELECT
            b.id_booking,
            b.tanggal,
            b.status_booking,
            b.created_at,
            u.nama AS nama_siswa,
            j.hari,
            j.jam_mulai,
            j.jam_selesai
        FROM booking b
        JOIN siswa s ON b.id_siswa = s.id_siswa
        JOIN users u ON s.id_user = u.id_user
        JOIN jadwal j ON b.id_jadwal = j.id_jadwal
        WHERE b.id_tutor = $1
    `;

    const params = [id_tutor];

    if (status) {
        params.push(status);
        query += ` AND LOWER(b.status_booking) = LOWER($${params.length})`;
    }

    query += ` ORDER BY b.created_at DESC`;

    const result = await pool.query(query, params);
    return result.rows;
};

const getDetailBooking = async (id_booking, id_tutor) => {
    const result = await pool.query(
        `SELECT
            b.id_booking,
            b.tanggal,
            b.status_booking,
            b.created_at,
            u.nama AS nama_siswa,
            u.email AS email_siswa,
            j.hari,
            j.jam_mulai,
            j.jam_selesai
        FROM booking b
        JOIN siswa s ON b.id_siswa = s.id_siswa
        JOIN users u ON s.id_user = u.id_user
        JOIN jadwal j ON b.id_jadwal = j.id_jadwal
        WHERE b.id_booking = $1 AND b.id_tutor = $2`,
        [id_booking, id_tutor]
    );
    return result.rows[0];
};

const updateStatusBooking = async (id_booking, id_tutor, status_baru) => {
    const result = await pool.query(
        `UPDATE booking SET status_booking = $1
         WHERE id_booking = $2 AND id_tutor = $3
         RETURNING *`,
        [status_baru, id_booking, id_tutor]
    );
    return result.rows[0];
};

module.exports = { getBookingByTutor, getDetailBooking, updateStatusBooking };
