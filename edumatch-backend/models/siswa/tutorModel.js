const pool = require('../config/db');

const getAllTutors = async (mapel, hari) => {
    let query = `
    SELECT 
      t.id_tutor,
      u.nama,
      u.email,
      t.deskripsi,
      t.tarif,
      t.rating_rata2,
      t.status,
      ARRAY_AGG(DISTINCT m.nama_mapel) AS mapel
    FROM TUTOR t
    JOIN USERS u ON t.id_user = u.id_user
    LEFT JOIN TUTOR_MAPEL tm ON t.id_tutor = tm.id_tutor
    LEFT JOIN MAPEL m ON tm.id_mapel = m.id_mapel
    WHERE t.status = 'Aktif'
  `;

    const params = [];

    if (mapel) {
        params.push(`%${mapel}%`);
        query += ` AND EXISTS (
      SELECT 1 FROM TUTOR_MAPEL tm2
      JOIN MAPEL m2 ON tm2.id_mapel = m2.id_mapel
      WHERE tm2.id_tutor = t.id_tutor
      AND m2.nama_mapel ILIKE $${params.length}
    )`;
    }

    if (hari) {
        params.push(hari);
        query += ` AND EXISTS (
      SELECT 1 FROM JADWAL j
      WHERE j.id_tutor = t.id_tutor
      AND LOWER(j.hari) = LOWER($${params.length})
    )`;
    }

    query += ` GROUP BY t.id_tutor, u.nama, u.email, t.deskripsi, t.tarif, t.rating_rata2, t.status`;
    query += ` ORDER BY t.rating_rata2 DESC`;

    const result = await pool.query(query, params);
    return result.rows;
};

const getTutorById = async (id_tutor) => {
    const tutorResult = await pool.query(
        `SELECT 
      t.id_tutor,
      u.nama,
      u.email,
      t.deskripsi,
      t.tarif,
      t.rating_rata2,
      t.status,
      ARRAY_AGG(DISTINCT m.nama_mapel) AS mapel
    FROM TUTOR t
    JOIN USERS u ON t.id_user = u.id_user
    LEFT JOIN TUTOR_MAPEL tm ON t.id_tutor = tm.id_tutor
    LEFT JOIN MAPEL m ON tm.id_mapel = m.id_mapel
    WHERE t.id_tutor = $1
    GROUP BY t.id_tutor, u.nama, u.email, t.deskripsi, t.tarif, t.rating_rata2, t.status`,
        [id_tutor]
    );

    if (tutorResult.rows.length === 0) return null;

    const jadwalResult = await pool.query(
        `SELECT id_jadwal, hari, jam_mulai, jam_selesai
     FROM JADWAL WHERE id_tutor = $1
     ORDER BY id_jadwal`,
        [id_tutor]
    );

    return {
        ...tutorResult.rows[0],
        jadwal: jadwalResult.rows
    };
};

module.exports = { getAllTutors, getTutorById };