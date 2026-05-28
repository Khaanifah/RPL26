const pool = require('../config/db');

const createUser = async (nama, email, hashedPassword, role) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const userResult = await client.query(
            'INSERT INTO users (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id_user, nama, email, role',
            [nama, email, hashedPassword, role]
        );
        const newUser = userResult.rows[0];
        if (role === 'siswa') {
            await client.query(
                'INSERT INTO siswa (id_user) VALUES ($1)',
                [newUser.id_user]
            );
        }
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

module.exports = { createUser, findUserByEmail };
