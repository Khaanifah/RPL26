const express = require('express');
const router = express.Router();
const { lihatRating } = require('../controllers/ratingController');
const { verifyTutor } = require('../middlewares/authMiddleware');

router.get('/', verifyTutor, lihatRating);

module.exports = router;
