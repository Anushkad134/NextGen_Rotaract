// backend/services/auth/authService.js

/**
 * This file provides core authentication services, including:
 * - Creating new users in Firebase Authentication.
 * - Hashing and comparing passwords using bcryptjs.
 * - Generating and verifying JWT tokens for session management.
 */

const admin = require('firebase-admin'); // Firebase Admin SDK (already initialized in firebase.js)
const bcrypt = require('bcryptjs');     // For password hashing
const jwt = require('jsonwebtoken');    // For creating JSON Web Tokens

// Ensure Firebase Admin SDK is initialized (it should be via firebase.js)
// If you were to use this file independently, you'd need admin.initializeApp() here.
// For this setup, we assume firebase.js has already initialized it.

// Load JWT Secret from environment variables
// IMPORTANT: You will need to add JWT_SECRET to your .env file!
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('FATAL ERROR: JWT_SECRET environment variable is not set.');
    console.error('Please add JWT_SECRET=<YOUR_STRONG_SECRET_KEY> to your .env file.');
    process.exit(1);
}

/**
 * Hashes a plain-text password using bcrypt.
 * @param {string} password - The plain-text password to hash.
 * @returns {Promise<string>} - A promise that resolves with the hashed password.
 */
exports.hashPassword = async (password) => {
    // Generate a salt and hash the password
    // 10 is a good default for salt rounds, balancing security and performance
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

/**
 * Compares a plain-text password with a hashed password.
 * @param {string} plainPassword - The plain-text password provided by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if passwords match, false otherwise.
 */
exports.comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Creates a new user in Firebase Authentication and stores additional user data in Firestore.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's plain-text password.
 * @param {string} name - The user's name.
 * @param {string} role - The user's role (e.g., 'member', 'admin').
 * @returns {Promise<object>} - A promise that resolves with the new user's Firebase UID and role.
 */
exports.registerUser = async (email, password, name, role) => {
    try {
        // 1. Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: name,
            // You can add more user properties here if needed
        });

        // 2. Store additional user data (like name and role) in Firestore
        // We'll use the Firebase UID as the document ID for easy lookup
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            name: name,
            email: email,
            role: role,
            createdAt: admin.firestore.FieldValue.serverTimestamp() // Timestamp for creation
        });

        console.log('Successfully created new user:', userRecord.uid);
        return { uid: userRecord.uid, role: role };

    } catch (error) {
        console.error('Error registering user:', error);
        // Firebase Auth errors have specific codes, e.g., 'auth/email-already-in-use'
        throw new Error(error.message); // Re-throw the error for the controller to handle
    }
};

/**
 * Generates a JSON Web Token (JWT) for a user.
 * @param {string} uid - The Firebase User ID.
 * @param {string} role - The user's role.
 * @returns {string} - The generated JWT.
 */
exports.generateAuthToken = (uid, role) => {
    // The token payload contains user information that can be securely transmitted
    const payload = {
        uid: uid,
        role: role
    };
    // Sign the token with your secret key and set an expiration time (e.g., 1 hour)
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    return token;
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {object | null} - The decoded payload if valid, null otherwise.
 */
exports.verifyAuthToken = (token) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return null;
    }
};
