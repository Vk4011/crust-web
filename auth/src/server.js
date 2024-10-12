// app.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Define the server port
const PORT = process.env.PORT || 5000;

// Import routers
const router = require('./routes/router');
const profileRouter = require('./routes/profile');

// Connect to the database
connectDB();

// Middleware to enable CORS (for cross-origin requests)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.json({ msg: 'Authentication Backend Running' });
});

// Use the main router
app.use('/api/v0', router);

// Use profile router for profile-related routes
app.use('/api/v1', profileRouter);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files if needed
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the 'test' view
app.get('/test', (req, res) => {
  res.render('test'); // Renders 'test.ejs' from the views folder
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`\n\t Server running on port ${PORT} 🔧`);
});

// Uncomment and configure CORS if needed
// app.use(cors({
//     origin: "http://localhost:5173" // Allow requests from the frontend
// }));
