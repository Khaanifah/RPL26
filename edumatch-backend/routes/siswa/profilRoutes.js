const express = require('express');
const router = express.Router();
const { lihatProfil, updateProfil, gantiPassword } = require('../controllers/profilController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, lihatProfil);
router.put('/', verifyToken, updateProfil);
router.put('/password', verifyToken, gantiPassword);

module.exports = router;