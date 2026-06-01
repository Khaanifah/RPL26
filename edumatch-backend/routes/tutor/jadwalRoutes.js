const express = require('express');
const router = express.Router();
const { lihatJadwal, buatJadwal, editJadwal, deleteJadwal } = require('../controllers/jadwalController');
const { verifyTutor } = require('../middlewares/authMiddleware');

router.get('/', verifyTutor, lihatJadwal);
router.post('/', verifyTutor, buatJadwal);
router.put('/:id', verifyTutor, editJadwal);
router.delete('/:id', verifyTutor, deleteJadwal);

module.exports = router;
