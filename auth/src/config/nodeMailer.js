const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('\n\t Nodemailer configuration error:', error);
  } else {
    console.log('\n\t  Nodemailer is ready to send emails 📩');
  }
});

module.exports = transporter;
