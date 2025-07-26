// backend/services/firebase.js

/**
 * This file is temporarily modified to bypass Firebase Admin SDK initialization
 * due to persistent service account key errors.
 *
 * IMPORTANT: This is a TEMPORARY workaround for hackathon progress.
 * Core features like user authentication and Firestore database operations
 * (e.g., contact form submissions, user registration/login) will NOT work
 * correctly until the Firebase Admin SDK is properly initialized.
 *
 * To re-enable Firebase Admin SDK, revert to a previous version of this file
 * that includes `admin.initializeApp` and ensure your .env key is correct.
 */

// const admin = require('firebase-admin'); // Commented out for bypass

// Placeholder for db object to prevent errors in other files that import it
// In a real scenario, this would be your actual Firestore instance.
const db = {
    collection: (collectionName) => {
        console.warn(`Firestore operation called on '${collectionName}' collection, but Firebase Admin SDK is bypassed. This operation will not be performed.`);
        return {
            add: async (data) => {
                console.log(`(Simulated) Adding data to '${collectionName}':`, data);
                return { id: 'simulated-doc-id' };
            },
            doc: (docId) => {
                console.warn(`(Simulated) Accessing document '${docId}' in '${collectionName}'.`);
                return {
                    get: async () => ({ exists: false, data: () => ({}) }),
                    set: async (data) => console.log(`(Simulated) Setting data for '${docId}' in '${collectionName}':`, data),
                };
            }
        };
    }
};

// Placeholder for admin.auth() to prevent errors in authController.js
// This will make admin.auth().createUser() and admin.auth().getUserByEmail()
// throw errors, which is expected since Firebase Auth is not initialized.
const admin = {
    auth: () => {
        console.warn('Firebase Admin Auth is bypassed. Authentication operations will fail.');
        return {
            createUser: async (userData) => {
                throw new Error('Firebase Admin Auth is bypassed. Cannot create user.');
            },
            getUserByEmail: async (email) => {
                throw new Error('Firebase Admin Auth is bypassed. Cannot get user by email.');
            }
        };
    },
    firestore: () => db, // Provide a simulated firestore instance
    credential: {
        cert: () => {
            console.warn('Firebase Admin Credential is bypassed.');
            return {};
        }
    }
};

console.warn('WARNING: Firebase Admin SDK initialization is currently BYPASSED due to .env key issues. Authentication and actual Firestore operations will NOT work.');

module.exports = db; // Export the (simulated) db object
