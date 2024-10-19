
const express = require('express');
const { sendEmail } = require('../controllers/emailController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/send-email',authenticateToken,sendEmail);

module.exports = router;
