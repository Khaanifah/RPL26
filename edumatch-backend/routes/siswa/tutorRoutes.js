const express = require('express');
const router = express.Router();
const { getDaftarTutor, getDetailTutor } = require('../controllers/tutorController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getDaftarTutor);
router.get('/:id', verifyToken, getDetailTutor);

module.exports = router;