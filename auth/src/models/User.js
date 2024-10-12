// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  bio: { type: String },
  profilePic: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
}, {
  timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
