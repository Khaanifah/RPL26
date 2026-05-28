const pool = require('../config/db');

const createRating = async (id_booking, nilai, ulasan) => {
    const result = await pool.query(
        `INSERT INTO RATING (id_booking, nilai, ulasan)
     VALUES ($1, $2, $3)
     RETURNING *`,
        [id_booking, nilai, ulasan]
    );

    await pool.query(
        `UPDATE TUTOR SET rating_rata2 = (
      SELECT AVG(r.nilai)
      FROM RATING r
      JOIN BOOKING b ON r.id_booking = b.id_booking
      WHERE b.id_tutor = (
        SELECT id_tutor FROM BOOKING WHERE id_booking = $1
      )
    )
    WHERE id_tutor = (
      SELECT id_tutor FROM BOOKING WHERE id_booking = $1
    )`,
        [id_booking]
    );

    return result.rows[0];
};

const getRatingByTutor = async (id_tutor) => {
    const result = await pool.query(
        `SELECT 
      r.id_rating,
      r.nilai,
      r.ulasan,
      r.created_at,
      u.nama AS nama_siswa
    FROM RATING r
    JOIN BOOKING b ON r.id_booking = b.id_booking
    JOIN SISWA s ON b.id_siswa = s.id_siswa
    JOIN USERS u ON s.id_user = u.id_user
    WHERE b.id_tutor = $1
    ORDER BY r.created_at DESC`,
        [id_tutor]
    );
    return result.rows;
};

module.exports = { createRating, getRatingByTutor };