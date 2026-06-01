const pool = require('../config/db');
const { getJadwalByTutor, tambahJadwal, updateJadwal, hapusJadwal } = require('../models/jadwalModel');

const HARI_VALID = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const getIdTutor = async (id_user) => {
    const result = await pool.query(
        'SELECT id_tutor FROM tutor WHERE id_user = $1',
        [id_user]
    );
    return result.rows[0]?.id_tutor;
};

const lihatJadwal = async (req, res) => {
    try {
        const id_user = req.user.id;
        const id_tutor = await getIdTutor(id_user);

        if (!id_tutor) {
            return res.status(404).json({ message: 'Data tutor tidak ditemukan' });
        }

        const jadwal = await getJadwalByTutor(id_tutor);
        res.json({ data: jadwal });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const buatJadwal = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { hari, jam_mulai, jam_selesai } = req.body;

        if (!hari || !jam_mulai || !jam_selesai) {
            return res.status(400).json({ message: 'Hari, jam mulai, dan jam selesai wajib diisi' });
        }

        if (!HARI_VALID.includes(hari)) {
            return res.status(400).json({ message: `Hari tidak valid. Pilih: ${HARI_VALID.join(', ')}` });
        }

        if (jam_mulai >= jam_selesai) {
            return res.status(400).json({ message: 'Jam mulai harus sebelum jam selesai' });
        }

        const id_tutor = await getIdTutor(id_user);
        if (!id_tutor) {
            return res.status(404).json({ message: 'Data tutor tidak ditemukan' });
        }

        const jadwal = await tambahJadwal(id_tutor, hari, jam_mulai, jam_selesai);

        res.status(201).json({
            message: 'Jadwal berhasil ditambahkan',
            data: jadwal
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editJadwal = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { id } = req.params;
        const { hari, jam_mulai, jam_selesai } = req.body;

        if (!hari || !jam_mulai || !jam_selesai) {
            return res.status(400).json({ message: 'Hari, jam mulai, dan jam selesai wajib diisi' });
        }

        if (!HARI_VALID.includes(hari)) {
            return res.status(400).json({ message: `Hari tidak valid. Pilih: ${HARI_VALID.join(', ')}` });
        }

        if (jam_mulai >= jam_selesai) {
            return res.status(400).json({ message: 'Jam mulai harus sebelum jam selesai' });
        }

        const id_tutor = await getIdTutor(id_user);
        if (!id_tutor) {
            return res.status(404).json({ message: 'Data tutor tidak ditemukan' });
        }

        const jadwal = await updateJadwal(id, id_tutor, hari, jam_mulai, jam_selesai);

        if (!jadwal) {
            return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
        }

        res.json({
            message: 'Jadwal berhasil diupdate',
            data: jadwal
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJadwal = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { id } = req.params;

        const id_tutor = await getIdTutor(id_user);
        if (!id_tutor) {
            return res.status(404).json({ message: 'Data tutor tidak ditemukan' });
        }

        const jadwal = await hapusJadwal(id, id_tutor);

        if (!jadwal) {
            return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
        }

        res.json({ message: 'Jadwal berhasil dihapus' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { lihatJadwal, buatJadwal, editJadwal, deleteJadwal };
