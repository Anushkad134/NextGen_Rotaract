// backend/routes/authRoutes.js

/**
 * This file defines the API routes for user authentication (signup and login).
 * It uses Express Router to create modular, mountable route handlers.
 */

const express = require('express');
const router = express.Router(); // Create a new router instance
const authController = require('../controllers/authController'); // Import the authentication controller

// Define the POST route for user signup
// This route will be accessible at /api/auth/signup
router.post('/signup', authController.signup);

// Define the POST route for user login
// This route will be accessible at /api/auth/login
router.post('/login', authController.login);

// Export the router to be used in server.js
module.exports = router;
