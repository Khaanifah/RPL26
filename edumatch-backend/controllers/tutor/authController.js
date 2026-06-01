const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createTutorUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { nama, email, password } = req.body;

        if (!nama || !email || !password) {
            return res.status(400).json({ message: 'Semua kolom wajib diisi' });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password minimal 6 karakter' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createTutorUser(nama, email, hashedPassword);

        res.status(201).json({
            message: 'Registrasi tutor berhasil',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Registrasi gagal', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password wajib diisi' });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Email belum terdaftar' });
        }

        if (user.role !== 'tutor') {
            return res.status(403).json({ message: 'Akun ini bukan akun tutor' });
        }

        const isHashed = user.password.startsWith('$2');
        const isMatch = isHashed
            ? await bcrypt.compare(password, user.password)
            : password === user.password;

        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau password salah' });
        }

        const token = jwt.sign(
            { id: user.id_user, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            message: 'Login berhasil',
            token,
            user: {
                id: user.id_user,
                nama: user.nama,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { register, login };
