const pool = require('../../config/siswa/db');

const createBooking = async (id_siswa, id_tutor, id_jadwal, tanggal) => {
    const cekKetersediaan = await pool.query(
        `SELECT id_booking FROM booking WHERE id_jadwal = $1 AND tanggal = $2 AND status_booking NOT IN ('Ditolak', 'Selesai')`,
        [id_jadwal, tanggal]
    );

    if (cekKetersediaan.rows.length > 0) {
        throw new Error('Jadwal ini sudah terisi');
    }

    const result = await pool.query(
        `INSERT INTO BOOKING (id_siswa, id_tutor, id_jadwal, tanggal, status_booking)
     VALUES ($1, $2, $3, $4, 'Pending')
     RETURNING *`,
        [id_siswa, id_tutor, id_jadwal, tanggal]
    );

    return result.rows[0];
};

const getBookingBySiswa = async (id_siswa) => {
    const result = await pool.query(
        `SELECT 
      b.id_booking,
      b.tanggal,
      b.status_booking,
      b.created_at,
      u.nama AS nama_tutor,
      t.tarif,
      j.hari,
      j.jam_mulai,
      j.jam_selesai
    FROM BOOKING b
    JOIN TUTOR t ON b.id_tutor = t.id_tutor
    JOIN USERS u ON t.id_user = u.id_user
    JOIN JADWAL j ON b.id_jadwal = j.id_jadwal
    WHERE b.id_siswa = $1
    ORDER BY b.created_at DESC`,
        [id_siswa]
    );
    return result.rows;
};

const getBookingById = async (id_booking, id_siswa) => {
    const result = await pool.query(
        `SELECT 
      b.id_booking,
      b.tanggal,
      b.status_booking,
      b.created_at,
      u.nama AS nama_tutor,
      t.id_tutor,
      t.tarif,
      t.deskripsi,
      j.hari,
      j.jam_mulai,
      j.jam_selesai
    FROM BOOKING b
    JOIN TUTOR t ON b.id_tutor = t.id_tutor
    JOIN USERS u ON t.id_user = u.id_user
    JOIN JADWAL j ON b.id_jadwal = j.id_jadwal
    WHERE b.id_booking = $1 AND b.id_siswa = $2`,
        [id_booking, id_siswa]
    );
    return result.rows[0];
};

module.exports = { createBooking, getBookingBySiswa, getBookingById };