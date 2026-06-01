const express = require('express');
const router = express.Router();
const { buatRating, lihatRatingTutor } = require('../controllers/ratingController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, buatRating);
router.get('/tutor/:id_tutor', lihatRatingTutor);

module.exports = router;