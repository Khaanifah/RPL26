const bcrypt = require('bcryptjs');
const pool = require('../../config/tutor/db');
const { getProfilTutor, updateProfilTutor, updatePassword } = require('../../models/tutor/profilModel');
const { findUserByEmail } = require('../../models/tutor/userModel');

const lihatProfil = async (req, res) => {
    try {
        const id_user = req.user.id;
        const profil = await getProfilTutor(id_user);

        if (!profil) {
            return res.status(404).json({ message: 'Profil tidak ditemukan' });
        }

        res.json({ data: profil });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateProfil = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { nama, email, deskripsi, tarif } = req.body;

        if (!nama || !email) {
            return res.status(400).json({ message: 'Nama dan email wajib diisi' });
        }

        if (tarif !== undefined && tarif < 0) {
            return res.status(400).json({ message: 'Tarif tidak boleh negatif' });
        }

        const userExisting = await findUserByEmail(email);
        if (userExisting && userExisting.id_user !== id_user) {
            return res.status(400).json({ message: 'Email sudah digunakan oleh user lain' });
        }

        const profil = await updateProfilTutor(id_user, nama, email, deskripsi || '', tarif || 0);

        res.json({
            message: 'Profil berhasil diupdate',
            data: profil
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const gantiPassword = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { password_lama, password_baru } = req.body;

        if (!password_lama || !password_baru) {
            return res.status(400).json({ message: 'Password lama dan baru wajib diisi' });
        }

        if (password_baru.length < 6) {
            return res.status(400).json({ message: 'Password baru minimal 6 karakter' });
        }

        const userResult = await pool.query(
            `SELECT * FROM users WHERE id_user = $1`,
            [id_user]
        );
        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password_lama, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password lama salah' });
        }

        const hashedPassword = await bcrypt.hash(password_baru, 10);
        await updatePassword(id_user, hashedPassword);

        res.json({ message: 'Password berhasil diubah' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { lihatProfil, updateProfil, gantiPassword };
