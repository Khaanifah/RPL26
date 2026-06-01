const bcrypt = require('bcryptjs');
const { getProfilSiswa, updateProfilSiswa, updatePassword } = require('../../models/siswa/profilModel');
const { findUserByEmail } = require('../../models/siswa/userModel');

const lihatProfil = async (req, res) => {
    try {
        const id_user = req.user.id;
        const profil = await getProfilSiswa(id_user);

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
        const { nama, email } = req.body;

        if (!nama || !email) {
            return res.status(400).json({ message: 'Semua data wajib diisi' });
        }

        const userExisting = await findUserByEmail(email);
        if (userExisting && userExisting.id_user !== id_user) {
            return res.status(400).json({ message: 'Email sudah digunakan oleh user lain' });
        }

        const profil = await updateProfilSiswa(id_user, nama, email);

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

        const { findUserByEmail } = require('../models/userModel');
        const pool = require('../../config/siswa/db');
        const userResult = await pool.query(
            `SELECT * FROM USERS WHERE id_user = $1`,
            [id_user]
        );
        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password_lama, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password lama salah' });
        }

        if (password_baru.length < 6) {
            return res.status(400).json({ message: 'Password baru minimal 6 karakter' });
        }

        const hashedPassword = await bcrypt.hash(password_baru, 10);
        await updatePassword(id_user, hashedPassword);

        res.json({ message: 'Password berhasil diubah' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { lihatProfil, updateProfil, gantiPassword };