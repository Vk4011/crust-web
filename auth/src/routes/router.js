// routes/router.js

const express = require('express');
const router = express.Router();
const verifyOtp = require('../controllers/verifyOtp');
const changePassword = require('../controllers/changePassword');
const authMiddleware = require("../middleware/authMiddleware");

// Import the controller
const { registerUser } = require('../controllers/register');

// Import controllers
const loginUser = require('../controllers/login');
const sendOtp = require('../controllers/sendOtp');

// Register Route
router.post('/register', registerUser);
router.get('/register', (req, res) => {
  res.json({ msg: 'Register Route you are hitting. Use POST for register' });
});

// Login Route
router.post('/login', loginUser);
router.get('/login', (req, res) => {
  res.json({ msg: 'Login Route you are hitting. Use POST for login' });
});

// Forget Password (Send OTP) Route
router.post('/forgot-password', sendOtp);
router.get('/forgot-password', (req, res) => {
  res.json({ msg: 'Forget Password Route you are hitting. Use POST for forgot-password' });
});

// Route to verify OTP
router.post('/verify-otp', verifyOtp);

// Change Password
router.post('/change-password', authMiddleware, changePassword); // Auth required to change password

module.exports = router;
