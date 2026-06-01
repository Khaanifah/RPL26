const pool = require('../../config/tutor/db');

const getProfilTutor = async (id_user) => {
    const result = await pool.query(
        `SELECT 
            u.id_user,
            u.nama,
            u.email,
            u.role,
            u.created_at,
            t.id_tutor,
            t.deskripsi,
            t.tarif,
            t.rating_rata2,
            t.status,
            ARRAY_AGG(DISTINCT m.nama_mapel) FILTER (WHERE m.nama_mapel IS NOT NULL) AS mapel
        FROM users u
        JOIN tutor t ON u.id_user = t.id_user
        LEFT JOIN tutor_mapel tm ON t.id_tutor = tm.id_tutor
        LEFT JOIN mapel m ON tm.id_mapel = m.id_mapel
        WHERE u.id_user = $1
        GROUP BY u.id_user, u.nama, u.email, u.role, u.created_at,
                 t.id_tutor, t.deskripsi, t.tarif, t.rating_rata2, t.status`,
        [id_user]
    );
    return result.rows[0];
};

const updateProfilTutor = async (id_user, nama, email, deskripsi, tarif) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const userResult = await client.query(
            `UPDATE users SET nama = $1, email = $2 WHERE id_user = $3
             RETURNING id_user, nama, email, role`,
            [nama, email, id_user]
        );

        await client.query(
            `UPDATE tutor SET deskripsi = $1, tarif = $2 WHERE id_user = $3`,
            [deskripsi, tarif, id_user]
        );

        await client.query('COMMIT');
        return userResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const updatePassword = async (id_user, hashedPassword) => {
    await pool.query(
        `UPDATE users SET password = $1 WHERE id_user = $2`,
        [hashedPassword, id_user]
    );
};

module.exports = { getProfilTutor, updateProfilTutor, updatePassword };
