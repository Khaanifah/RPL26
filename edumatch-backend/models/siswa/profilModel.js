const pool = require('../../config/tutor/db');

const getProfilSiswa = async (id_user) => {
    const result = await pool.query(
        `SELECT 
      u.id_user,
      u.nama,
      u.email,
      u.role,
      u.created_at,
      s.id_siswa
    FROM USERS u
    JOIN SISWA s ON u.id_user = s.id_user
    WHERE u.id_user = $1`,
        [id_user]
    );
    return result.rows[0];
};

const updateProfilSiswa = async (id_user, nama, email) => {
    const result = await pool.query(
        `UPDATE USERS SET nama = $1, email = $2
     WHERE id_user = $3
     RETURNING id_user, nama, email, role`,
        [nama, email, id_user]
    );
    return result.rows[0];
};

const updatePassword = async (id_user, hashedPassword) => {
    await pool.query(
        `UPDATE USERS SET password = $1 WHERE id_user = $2`,
        [hashedPassword, id_user]
    );
};

module.exports = { getProfilSiswa, updateProfilSiswa, updatePassword };