const pool = require('../../config/tutor/db');

const createTutorUser = async (nama, email, hashedPassword) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const userResult = await client.query(
            'INSERT INTO users (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id_user, nama, email, role',
            [nama, email, hashedPassword, 'tutor']
        );
        const newUser = userResult.rows[0];

        await client.query(
            'INSERT INTO tutor (id_user, deskripsi, tarif, rating_rata2, status) VALUES ($1, $2, $3, $4, $5)',
            [newUser.id_user, '', 0, 0, 'Aktif']
        );

        await client.query('COMMIT');
        return newUser;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const findUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

module.exports = { createTutorUser, findUserByEmail };
