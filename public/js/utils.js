// public/js/utils.js

/**
 * This file contains general utility functions that can be reused across
 * different frontend JavaScript files (e.g., forms.js, dynamicContent.js).
 * This promotes code reusability and organization.
 */

/**
 * A generic function to make API fetch requests to the backend.
 * This can be used for GET, POST, PUT, DELETE requests.
 *
 * @param {string} url - The URL of the backend API endpoint.
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object} [body=null] - The data to send in the request body (for POST/PUT).
 * @returns {Promise<object>} - A promise that resolves with the JSON response from the server.
 * @throws {Error} - Throws an error if the network request fails or the server responds with an error status.
 */
async function apiFetch(url, method = 'GET', body = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // Add other headers like authorization tokens here if needed in the future
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        // Check if the response status is OK (2xx range)
        if (!response.ok) {
            // If not OK, try to parse the error message from the server
            const errorData = await response.json().catch(() => ({ message: 'Something went wrong on the server.' }));
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        // Parse and return the JSON response
        return await response.json();
    } catch (error) {
        console.error(`API Fetch Error (${method} ${url}):`, error);
        throw error; // Re-throw the error so the calling function can handle it
    }
}

// You can add more utility functions here as needed, for example:
// - Function to validate email format
// - Function to sanitize input strings
// - Functions for local storage management

// Example: Function to get URL parameters (already in forms.js, but could be here)
/*
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
*/

// Export functions if using modules (not strictly necessary for simple script tags but good practice)
// This part is commented out because you're using simple script tags, not ES Modules.
/*
export {
    apiFetch,
    // getUrlParam,
};
*/
