const express = require('express');
const profileRouter = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // Ensure the path is correct

// Route to fetch user profile
profileRouter.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // req.user is set by the middleware
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = profileRouter;
