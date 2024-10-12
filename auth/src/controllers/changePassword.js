// controllers/changePassword.js

const User = require("../models/User");
const bcrypt = require("bcryptjs"); // For hashing passwords

// Change Password Controller
const changePassword = async (req, res) => {
  const { password } = req.body;

  try {
    // Verify token and get user from middleware (req.user should be populated)
    const user = await User.findById(req.user.id); // Using req.user.id
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = changePassword;
