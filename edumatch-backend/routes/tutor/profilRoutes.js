const express = require('express');
const router = express.Router();
const { lihatProfil, updateProfil, gantiPassword } = require('../../controllers/tutor/profilController');
const { verifyTutor } = require('../../middlewares/tutor/authMiddleware');

router.get('/', verifyTutor, lihatProfil);
router.put('/', verifyTutor, updateProfil);
router.put('/password', verifyTutor, gantiPassword);

module.exports = router;
