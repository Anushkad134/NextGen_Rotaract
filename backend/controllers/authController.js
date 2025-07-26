// backend/controllers/authController.js

/**
 * This file contains the controller logic for user authentication (signup and login).
 * It interacts with authService to perform user creation and token generation.
 */

const authService = require('../services/auth/authService'); // Import the authentication service
const admin = require('firebase-admin'); // Import Firebase Admin for getUserByEmail
const db = require('../services/auth/firebase'); // Import Firestore for additional user data checks

/**
 * Handles user registration (signup).
 * Creates a new user in Firebase Auth and stores additional profile data in Firestore.
 * @param {object} req - The Express request object (should contain email, password, name, role in body).
 * @param {object} res - The Express response object.
 */
exports.signup = async (req, res) => {
    const { email, password, name, role } = req.body;

    // Basic validation
    if (!email || !password || !name || !role) {
        return res.status(400).json({ message: 'All fields (email, password, name, role) are required for signup.' });
    }

    try {
        // Register the user using the auth service
        const newUser = await authService.registerUser(email, password, name, role);

        // Generate an authentication token for the newly registered user
        const token = authService.generateAuthToken(newUser.uid, newUser.role);

        res.status(201).json({
            message: 'User registered successfully!',
            uid: newUser.uid,
            role: newUser.role,
            token: token // Send the token back to the client
        });

    } catch (error) {

        console.error('Signup error in controller:', error.message, error.stack);
        // Handle specific Firebase Auth errors
        if (error.message.includes('auth/email-already-in-use')) {
            return res.status(409).json({ message: 'Email is already in use. Please use a different email or login.' });
        }
        res.status(500).json({ message: 'Failed to register user. Please try again.', error: error.message });
    }
};

/**
 * Handles user login.
 * Authenticates the user and generates an authentication token.
 * @param {object} req - The Express request object (should contain email, password in body).
 * @param {object} res - The Express response object.
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required for login.' });
    }

    try {
        // Authenticate user with Firebase Authentication
        // For a server-side login using Firebase Admin SDK, you typically don't directly
        // verify a plain password. The common flow is:
        // 1. Frontend signs in with Firebase Client SDK, gets an ID token.
        // 2. Frontend sends ID token to backend.
        // 3. Backend verifies the ID token using admin.auth().verifyIdToken().
        //
        // However, for a hackathon demo and to simplify, we'll use `getUserByEmail`
        // to check if the user exists, and then issue a custom token.
        // This is a simplification and not a full production-grade password verification.
        const userRecord = await admin.auth().getUserByEmail(email);

        // Fetch user's role from Firestore
        const userDoc = await db.collection('users').doc(userRecord.uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User profile not found in database.' });
        }
        const userData = userDoc.data();
        const role = userData.role;

        // Generate an authentication token
        const token = authService.generateAuthToken(userRecord.uid, role);

        res.status(200).json({
            message: 'Login successful!',
            uid: userRecord.uid,
            role: role,
            token: token // Send the token back
        });

    } catch (error) {
        console.error('Login error in controller:', error.message);
        // Firebase Auth errors for login attempts
        if (error.message.includes('auth/user-not-found') || error.message.includes('auth/wrong-password')) {
            return res.status(401).json({ message: 'Invalid credentials. Please check your email and password.' });
        }
        res.status(500).json({ message: 'Login failed. Please try again later.', error: error.message });
    }
};
