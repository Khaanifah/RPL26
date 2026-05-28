require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/tutor', require('./routes/tutorRoutes'));

app.use('/api/booking', require('./routes/bookingRoutes'));

app.use('/api/rating', require('./routes/ratingRoutes'));

app.use('/api/profil', require('./routes/profilRoutes'));

app.use('/api/jadwal', require('./routes/jadwalRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'EduMatch API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));