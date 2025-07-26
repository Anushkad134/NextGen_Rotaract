// backend/server.js

/**
 * This is the main server file for your Node.js Express application.
 * It sets up the Express server, configures middleware, serves static frontend files,
 * and connects to your API routes.
 */

// 1. Import necessary modules
const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Import the Firestore database instance (this is still needed by controllers)
// CORRECTED PATH: firebase.js is inside the 'auth' subfolder within 'services'
const db = require('./services/auth/firebase'); // <--- CORRECTED LINE

// Import the contact routes module
const geminiRoutes = require('./routes/geminiRoutes'); // CHANGED FROM contactRoutes

// Import the authentication routes module
const authRoutes = require('./routes/authRoutes'); // ENSURE THIS LINE IS PRESENT

// 2. Initialize the Express application
const app = express();

// 3. Define the port the server will listen on
const PORT = process.env.PORT || 5000;

// --- Middleware Setup ---
const cors = require('cors'); // For handling Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

// --- Serve Static Frontend Files ---
const publicPath = path.join(__dirname, '../public');
console.log(`Serving static files from: ${publicPath}`);
app.use(express.static(publicPath));

// --- API Routes ---
// Mount the contact routes under the /api/contact path
app.use('/api/contact', geminiRoutes); // CHANGED FROM contactRoutes

// Mount the authentication routes under the /api/auth path
app.use('/api/auth', authRoutes); // ENSURE THIS LINE IS PRESENT

// --- Basic Frontend Route ---
// Define a simple root route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server.');
});
