const express = require('express');
const router = express.Router();
const { lihatProfil, updateProfil, gantiPassword } = require('../controllers/profilController');
const { verifyTutor } = require('../middlewares/authMiddleware');

router.get('/', verifyTutor, lihatProfil);
router.put('/', verifyTutor, updateProfil);
router.put('/password', verifyTutor, gantiPassword);

module.exports = router;
