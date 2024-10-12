// controllers/sendOtp.js

const User = require('../models/User');
const transporter = require('../config/nodeMailer');
const crypto = require('crypto');

// Send OTP Controller
const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Generate a random OTP (6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set OTP and expiry (valid for 1 hour)
    user.otp = otp;
    user.otpExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It is valid for 1 hour.`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ msg: 'OTP sent to email' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = sendOtp;
