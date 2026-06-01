const pool = require('../../config/tutor/db');
const { getRatingTutor } = require('../../models/tutor/ratingModel');

const getIdTutor = async (id_user) => {
    const result = await pool.query(
        'SELECT id_tutor FROM tutor WHERE id_user = $1',
        [id_user]
    );
    return result.rows[0]?.id_tutor;
};

const lihatRating = async (req, res) => {
    try {
        const id_user = req.user.id;

        const id_tutor = await getIdTutor(id_user);
        if (!id_tutor) {
            return res.status(404).json({ message: 'Data tutor tidak ditemukan' });
        }

        const rating = await getRatingTutor(id_tutor);
        res.json({ data: rating });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { lihatRating };
