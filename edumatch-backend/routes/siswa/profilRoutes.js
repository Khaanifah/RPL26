const express = require('express');
const router = express.Router();
const { lihatProfil, updateProfil, gantiPassword } = require('../../controllers/siswa/profilController');
const { verifyToken } = require('../../middlewares/siswa/authMiddleware');

router.get('/', verifyToken, lihatProfil);
router.put('/', verifyToken, updateProfil);
router.put('/password', verifyToken, gantiPassword);

module.exports = router;