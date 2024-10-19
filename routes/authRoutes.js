const express = require('express');
const { register,verifyEmail,verifyPhone, verifyOtp, loginWithMagicLink,getUserInfo } = require('../controllers/authController');
const authenticateToken =require('../middlewares/authMiddleware.js')
const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/magic-link', loginWithMagicLink);
router.post('/verify-email',verifyEmail)
router.post('/verify-phone',verifyPhone)
router.get('/profile', authenticateToken, getUserInfo);

module.exports = router;
