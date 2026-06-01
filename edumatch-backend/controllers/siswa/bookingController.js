const { createBooking, getBookingBySiswa, getBookingById } = require('../../models/siswa/bookingModel');
const pool = require('../../config/siswa/db');


const buatBooking = async (req, res) => {
    try {
        const { id_tutor, id_jadwal, tanggal } = req.body;
        const id_user = req.user.id;

        if (!id_tutor || !id_jadwal || !tanggal) {
            return res.status(400).json({ message: 'Semua data wajib diisi' });
        }

        const siswaHasil = await pool.query(
            'SELECT id_siswa FROM siswa WHERE id_user = $1',
            [id_user]
        );

        if (siswaHasil.rows.length === 0) {
            return res.status(404).json({ message: 'User bukan siswa' });
        }
        const id_siswa = siswaHasil.rows[0].id_siswa;

        const booking = await createBooking(id_siswa, id_tutor, id_jadwal, tanggal);

        res.status(201).json({
            message: 'Booking berhasil dibuat',
            data: booking
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const riwayatBooking = async (req, res) => {
    try {
        const id_user = req.user.id;

        const siswaHasil = await pool.query(
            'SELECT id_siswa FROM siswa WHERE id_user = $1',
            [id_user]
        );

        if (siswaHasil.rows.length === 0) {
            return res.status(404).json({ message: 'User bukan siswa' });
        }

        const id_siswa = siswaHasil.rows[0].id_siswa;
        const booking = await getBookingBySiswa(id_siswa);

        res.json({ data: booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const detailBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const id_user = req.user.id;

        const siswaHasil = await pool.query(
            `SELECT id_siswa FROM SISWA WHERE id_user = $1`,
            [id_user]
        );

        if (siswaHasil.rows.length === 0) {
            return res.status(403).json({ message: 'Akses ditolak' });
        }

        const id_siswa = siswaHasil.rows[0].id_siswa;
        const booking = await getBookingById(id, id_siswa);

        if (!booking) {
            return res.status(404).json({ message: 'Booking tidak ditemukan' });
        }

        res.json({ data: booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { buatBooking, riwayatBooking, detailBooking };