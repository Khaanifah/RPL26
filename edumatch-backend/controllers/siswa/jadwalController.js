const { getJadwalTutor, getJadwalTersedia } = require('../../models/siswa/jadwalModel');

const jadwalTutor = async (req, res) => {
    try {
        const { id_tutor } = req.params;
        const jadwal = await getJadwalTutor(id_tutor);

        if (jadwal.length === 0) {
            return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
        }

        res.json({ data: jadwal });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const jadwalTersedia = async (req, res) => {
    try {
        const { id_tutor } = req.params;
        const { tanggal } = req.query;

        if (!tanggal) {
            return res.status(400).json({ message: 'Tanggal wajib diisi' });
        }

        const jadwal = await getJadwalTersedia(id_tutor, tanggal);
        res.json({ data: jadwal });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { jadwalTutor, jadwalTersedia };