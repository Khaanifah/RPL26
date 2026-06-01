const express = require('express');
const router = express.Router();
const { getDaftarTutor, getDetailTutor } = require('../../controllers/siswa/tutorController');
const { verifyToken } = require('../../middlewares/siswa/authMiddleware');

router.get('/', verifyToken, getDaftarTutor);
router.get('/:id', verifyToken, getDetailTutor);

module.exports = router;