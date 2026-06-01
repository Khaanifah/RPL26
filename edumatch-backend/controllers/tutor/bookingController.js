const pool = require('../../config/tutor/db');
const { getBookingByTutor, getDetailBooking, updateStatusBooking } = require('../../models/tutor/bookingModel');

const STATUS_VALID = ['Pending', 'Aktif', 'Selesai', 'Ditolak', 'Dibatalkan'];

const getIdTutor = async (id_user) => {
    const result = await pool.query(
        'SELECT id_tutor FROM tutor WHERE id_user = $1',
        [id_user]
    );
    return result.rows[0]?.id_tutor;
};

const lihatBooking = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { status } = req.query;

        const id_tutor = await getIdTutor(id_user);
        if (!id_tutor) {
            return res.status(404).json({ message: 'Data tutor tidak ditemukan' });
        }

        const booking = await getBookingByTutor(id_tutor, status);
        res.json({ data: booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const detailBooking = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { id } = req.params;

        const id_tutor = await getIdTutor(id_user);
        if (!id_tutor) {
            return res.status(404).json({ message: 'Data tutor tidak ditemukan' });
        }

        const booking = await getDetailBooking(id, id_tutor);
        if (!booking) {
            return res.status(404).json({ message: 'Booking tidak ditemukan' });
        }

        res.json({ data: booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateStatusBookingController = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { id } = req.params;
        const { status_booking } = req.body;

        if (!status_booking) {
            return res.status(400).json({ message: 'Status booking wajib diisi' });
        }

        // Kapitalisasi awal untuk konsistensi dengan DB
        const statusFormatted = status_booking.charAt(0).toUpperCase() + status_booking.slice(1).toLowerCase();

        if (!STATUS_VALID.includes(statusFormatted)) {
            return res.status(400).json({
                message: `Status tidak valid. Pilih: ${STATUS_VALID.join(', ')}`
            });
        }

        const id_tutor = await getIdTutor(id_user);
        if (!id_tutor) {
            return res.status(404).json({ message: 'Data tutor tidak ditemukan' });
        }

        // Validasi transisi status
        const current = await getDetailBooking(id, id_tutor);
        if (!current) {
            return res.status(404).json({ message: 'Booking tidak ditemukan' });
        }

        const transisiValid = {
            'Pending': ['Aktif', 'Ditolak'],
            'Aktif': ['Selesai', 'Dibatalkan'],
        };

        if (transisiValid[current.status_booking] && !transisiValid[current.status_booking].includes(statusFormatted)) {
            return res.status(400).json({
                message: `Status ${current.status_booking} hanya bisa diubah ke: ${transisiValid[current.status_booking].join(' atau ')}`
            });
        }

        if (['Selesai', 'Ditolak', 'Dibatalkan'].includes(current.status_booking)) {
            return res.status(400).json({ message: 'Booking sudah final, tidak bisa diubah' });
        }

        const booking = await updateStatusBooking(id, id_tutor, statusFormatted);

        res.json({
            message: `Status booking berhasil diubah menjadi ${statusFormatted}`,
            data: booking
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { lihatBooking, detailBooking, updateStatusBookingController };
