const express = require('express');
const router = express.Router();
const { lihatJadwal, buatJadwal, editJadwal, deleteJadwal } = require('../../controllers/tutor/jadwalController');
const { verifyTutor } = require('../../middlewares/tutor/authMiddleware');

router.get('/', verifyTutor, lihatJadwal);
router.post('/', verifyTutor, buatJadwal);
router.put('/:id', verifyTutor, editJadwal);
router.delete('/:id', verifyTutor, deleteJadwal);

module.exports = router;
