// backend/controllers/contactController.js

/**
 * This file contains the controller logic for handling contact form submissions.
 * It interacts with the Firestore database to save the incoming data.
 */

// Import the Firestore database instance
const db = require('../services/auth/firebase');

/**
 * Handles the submission of the contact form.
 * Validates the incoming data and saves it to the 'contactSubmissions' collection in Firestore.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
exports.submitContactForm = async (req, res) => {
    console.log('Received contact form submission:', req.body);
    const { firstName, lastName, email, subject, message } = req.body;

    // Basic server-side validation
    if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Save the contact form data to Firestore
        const docRef = await db.collection('contactSubmissions').add({
            firstName,
            lastName,
            email,
            subject,
            message,
            timestamp: new Date() // Add a timestamp for when the submission was received
        });

        console.log('Document written with ID:', docRef.id);
        res.status(200).json({ message: 'Message sent successfully! We will get back to you soon.', id: docRef.id });

    } catch (error) {
        console.error('Error saving contact form submission to Firestore:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
};

