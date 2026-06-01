const express = require('express');
const router = express.Router();
const { buatRating, lihatRatingTutor } = require('../../controllers/siswa/ratingController');
const { verifyToken } = require('../../middlewares/siswa/authMiddleware');

router.post('/', verifyToken, buatRating);
router.get('/tutor/:id_tutor', verifyToken, lihatRatingTutor);

module.exports = router;