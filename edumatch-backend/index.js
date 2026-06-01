require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/siswa/auth', require('./routes/siswa/authRoutes'));
app.use('/api/siswa/tutor', require('./routes/siswa/tutorRoutes'));
app.use('/api/siswa/booking', require('./routes/siswa/bookingRoutes'));
app.use('/api/siswa/rating', require('./routes/siswa/ratingRoutes'));
app.use('/api/siswa/profil', require('./routes/siswa/profilRoutes'));
app.use('/api/siswa/jadwal', require('./routes/siswa/jadwalRoutes'));
app.use('/api/siswa/pembayaran', require('./routes/siswa/paymentRoutes'));

app.use('/api/tutor/auth', require('./routes/tutor/authRoutes'));
app.use('/api/tutor/profil', require('./routes/tutor/profilRoutes'));
app.use('/api/tutor/jadwal', require('./routes/tutor/jadwalRoutes'));
app.use('/api/tutor/booking', require('./routes/tutor/bookingRoutes'));
app.use('/api/tutor/rating', require('./routes/tutor/ratingRoutes'));

app.get('/', (req, res) => {
    res.json({ message: 'EduMatch Combined API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));