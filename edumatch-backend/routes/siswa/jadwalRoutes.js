const express = require('express');
const router = express.Router();
const { jadwalTutor, jadwalTersedia } = require('../../controllers/siswa/jadwalController');
const { verifyToken } = require('../../middlewares/siswa/authMiddleware');

router.get('/:id_tutor', verifyToken, jadwalTutor);
router.get('/:id_tutor/tersedia', verifyToken, jadwalTersedia);

module.exports = router;