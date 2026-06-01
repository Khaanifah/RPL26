const pool = require('../config/db');

const getJadwalByTutor = async (id_tutor) => {
    const result = await pool.query(
        `SELECT id_jadwal, hari, jam_mulai, jam_selesai
         FROM jadwal
         WHERE id_tutor = $1
         ORDER BY id_jadwal`,
        [id_tutor]
    );
    return result.rows;
};

const tambahJadwal = async (id_tutor, hari, jam_mulai, jam_selesai) => {
    const cek = await pool.query(
        `SELECT id_jadwal FROM jadwal
         WHERE id_tutor = $1 AND hari = $2
         AND NOT (jam_selesai <= $3 OR jam_mulai >= $4)`,
        [id_tutor, hari, jam_mulai, jam_selesai]
    );

    if (cek.rows.length > 0) {
        throw new Error('Jadwal bentrok dengan jadwal yang sudah ada');
    }

    const result = await pool.query(
        `INSERT INTO jadwal (id_tutor, hari, jam_mulai, jam_selesai)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [id_tutor, hari, jam_mulai, jam_selesai]
    );
    return result.rows[0];
};

const updateJadwal = async (id_jadwal, id_tutor, hari, jam_mulai, jam_selesai) => {
    const cek = await pool.query(
        `SELECT id_jadwal FROM jadwal
         WHERE id_tutor = $1 AND hari = $2
         AND id_jadwal != $3
         AND NOT (jam_selesai <= $4 OR jam_mulai >= $5)`,
        [id_tutor, hari, id_jadwal, jam_mulai, jam_selesai]
    );

    if (cek.rows.length > 0) {
        throw new Error('Jadwal bentrok dengan jadwal yang sudah ada');
    }

    const result = await pool.query(
        `UPDATE jadwal SET hari = $1, jam_mulai = $2, jam_selesai = $3
         WHERE id_jadwal = $4 AND id_tutor = $5
         RETURNING *`,
        [hari, jam_mulai, jam_selesai, id_jadwal, id_tutor]
    );
    return result.rows[0];
};

const hapusJadwal = async (id_jadwal, id_tutor) => {
    const cekBooking = await pool.query(
        `SELECT id_booking FROM booking
         WHERE id_jadwal = $1 AND status_booking NOT IN ('Ditolak', 'Selesai', 'Dibatalkan')`,
        [id_jadwal]
    );

    if (cekBooking.rows.length > 0) {
        throw new Error('Jadwal tidak dapat dihapus karena masih ada booking aktif');
    }

    const result = await pool.query(
        `DELETE FROM jadwal WHERE id_jadwal = $1 AND id_tutor = $2 RETURNING *`,
        [id_jadwal, id_tutor]
    );
    return result.rows[0];
};

module.exports = { getJadwalByTutor, tambahJadwal, updateJadwal, hapusJadwal };
