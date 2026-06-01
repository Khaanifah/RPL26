const { createRating, getRatingByTutor } = require('../../models/siswa/ratingModel');
const pool = require('../../config/siswa/db');

const buatRating = async (req, res) => {
    try {
        const { id_booking, nilai, ulasan } = req.body;
        const id_user = req.user.id;

        if (!id_booking || !nilai) {
            return res.status(400).json({ message: 'Rating wajib diisi' });
        }

        if (nilai < 1 || nilai > 5) {
            return res.status(400).json({ message: 'Nilai harus antara 1 dan 5' });
        }

        const siswaHasil = await pool.query(
            `SELECT id_siswa FROM SISWA WHERE id_user = $1`,
            [id_user]
        );

        if (siswaHasil.rows.length === 0) {
            return res.status(403).json({ message: 'Akses ditolak' });
        }

        const id_siswa = siswaHasil.rows[0].id_siswa;

        const bookingResult = await pool.query(
            `SELECT id_siswa FROM BOOKING WHERE id_booking = $1 AND id_siswa = $2`,
            [id_booking, id_siswa]
        );

        if (bookingResult.rows.length === 0) {
            return res.status(404).json({ message: 'Booking tidak ditemukan' });
        }

        if (bookingResult.rows[0].status_booking !== 'Selesai') {
            return res.status(400).json({ message: 'Sesi ini belum bisa dinilai' });
        }

        const cekRating = await pool.query(
            `SELECT id_rating FROM RATING WHERE id_booking = $1`,
            [id_booking]
        );

        if (cekRating.rows.length > 0) {
            return res.status(400).json({ message: 'Booking ini sudah dinali' });
        }

        const rating = await createRating(id_booking, nilai, ulasan);

        res.status(201).json({
            message: 'Kelas berhasil dinilai',
            data: rating
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const lihatRatingTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await getRatingByTutor(id);
        res.json({ data: rating });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { buatRating, lihatRatingTutor };