const pool = require('../config/db');

const getRatingTutor = async (id_tutor) => {
    const result = await pool.query(
        `SELECT
            r.id_rating,
            r.nilai,
            r.ulasan,
            r.created_at,
            u.nama AS nama_siswa,
            b.tanggal
        FROM rating r
        JOIN booking b ON r.id_booking = b.id_booking
        JOIN siswa s ON b.id_siswa = s.id_siswa
        JOIN users u ON s.id_user = u.id_user
        WHERE b.id_tutor = $1
        ORDER BY r.created_at DESC`,
        [id_tutor]
    );
    return result.rows;
};

module.exports = { getRatingTutor };
