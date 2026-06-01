const pool = require('../../config/tutor/db');

const getJadwalTutor = async (id_tutor) => {
    const result = await pool.query(
        `SELECT 
      j.id_jadwal,
      j.hari,
      j.jam_mulai,
      j.jam_selesai
    FROM JADWAL j
    WHERE j.id_tutor = $1
    ORDER BY id_jadwal`,
        [id_tutor]
    );
    return result.rows;
};

const getJadwalTersedia = async (id_tutor, tanggal) => {

    const semuaJadwal = await pool.query(
        `SELECT id_jadwal, hari, jam_mulai, jam_selesai
     FROM JADWAL WHERE id_tutor = $1`,
        [id_tutor]
    );

    const sudahDibook = await pool.query(
        `SELECT id_jadwal FROM BOOKING
     WHERE id_tutor = $1
     AND tanggal = $2
     AND status_booking = 'pending'`,
        [id_tutor, tanggal]
    );

    const idSudahDibook = sudahDibook.rows.map(b => b.id_jadwal);

    const tersedia = semuaJadwal.rows.map(j => ({
        ...j,
        tersedia: !idSudahDibook.includes(j.id_jadwal)
    }));

    return tersedia;
};

module.exports = { getJadwalTutor, getJadwalTersedia };