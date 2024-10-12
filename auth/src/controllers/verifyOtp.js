// controllers/verifyOtp.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify OTP Controller
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Check if the OTP matches and if it hasn't expired
    if (user.otp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: 'OTP has expired' });
    }

    // Clear the OTP fields
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' }); // Shorter expiry

    // OTP is verified
    res.json({ msg: 'OTP verified successfully', token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = verifyOtp;
