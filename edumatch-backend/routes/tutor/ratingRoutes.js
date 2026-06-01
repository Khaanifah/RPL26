const express = require('express');
const router = express.Router();
const { lihatRating } = require('../../controllers/tutor/ratingController');
const { verifyTutor } = require('../../middlewares/tutor/authMiddleware');

router.get('/', verifyTutor, lihatRating);

module.exports = router;
