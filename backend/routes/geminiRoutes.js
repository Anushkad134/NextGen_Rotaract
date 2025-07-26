// backend/routes/contactRoutes.js

/**
 * This file defines the API routes for contact form submissions.
 * It uses Express Router to create modular route handlers.
 */

const express = require('express');
const router = express.Router(); // Create a new router instance
const db = require('../services/auth/firebase'); // Import the Firestore db instance

/**
 * POST /api/contact
 * Handles contact form submissions.
 * Expects a JSON body with firstName, lastName, email, subject, and message.
 */
router.post('/', async (req, res) => {
    console.log('Received contact form submission:', req.body);
    const { firstName, lastName, email, subject, message } = req.body;

    // Basic server-side validation
    if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Save the contact form data to Firestore (Note: Firestore is currently bypassed in firebase.js)
        const docRef = await db.collection('contactSubmissions').add({
            firstName,
            lastName,
            email,
            subject,
            message,
            timestamp: new Date()
        });

        console.log('Document written with ID:', docRef.id);
        res.status(200).json({ message: 'Message sent successfully! We will get back to you soon.', id: docRef.id });

    } catch (error) {
        console.error('Error saving contact form submission to Firestore:', error);
        // Provide a more user-friendly error message, especially since Firestore is bypassed
        res.status(500).json({ message: 'Failed to send message. (Database currently bypassed). Please try again later.', error: error.message });
    }
});

// Export the router to be used in server.js
module.exports = router;
