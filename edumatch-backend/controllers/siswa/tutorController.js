const { getAllTutors, getTutorById } = require('../../models/siswa/tutorModel');

const getDaftarTutor = async (req, res) => {
    try {
        const { mapel, hari } = req.query;
        const tutors = await getAllTutors(mapel, hari);
        res.json({ data: tutors });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getDetailTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const tutor = await getTutorById(id);

        if (!tutor) {
            return res.status(404).json({ message: 'Tutor tidak ditemukan' });
        }

        res.json({ data: tutor });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getDaftarTutor, getDetailTutor };