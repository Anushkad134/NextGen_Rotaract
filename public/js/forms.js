// public/js/forms.js

/**
 * This file contains JavaScript logic for handling form submissions
 * from various frontend pages (e.g., contact.html, login_signup.html).
 * It will send data to the backend API endpoints.
 *
 * IMPORTANT: In a real application, you would typically use a more robust
 * way to handle messages (e.g., custom modal, toast notifications) instead of alert().
 * For hackathon simplicity, alert() is used here as a placeholder.
 */

// --- Helper Functions for UI Messages ---

/**
 * Displays a message in a specified HTML element.
 * @param {HTMLElement} element - The HTML element to display the message in (e.g., successMessage, errorMessage).
 * @param {string} message - The message text to display.
 */
function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block'; // Make the message visible
    // Automatically hide the message after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
        element.textContent = ''; // Clear content when hidden
    }, 5000);
}

/**
 * Hides all message elements.
 */
function hideMessages() {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
}


// --- Contact Form Submission Logic ---

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent the default form submission behavior (page reload)
            hideMessages(); // Clear any previous messages

            // Get form data using FormData API
            const formData = new FormData(this);
            // Convert FormData to a plain JavaScript object
            const data = Object.fromEntries(formData.entries());

            // Get references to message elements
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');

            // Simple client-side validation (basic check for required fields)
            if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
                showMessage(errorMessage, 'Please fill in all required fields.');
                return; // Stop the function if validation fails
            }

            // Reference to the submit button for UI feedback
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent; // Store original button text

            // Show loading state on the button
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true; // Disable button to prevent multiple submissions
            document.body.classList.add('loading'); // Add a loading class to body for global loading indicator (if styled)

            try {
                // --- Backend API Call for Contact Form ---
                // This is where your frontend talks to your Node.js backend.
                // The URL '/api/contact' is an endpoint we will create in your backend/routes/contactRoutes.js
                const response = await fetch('/api/contact', {
                    method: 'POST', // Use POST for submitting new data
                    headers: {
                        'Content-Type': 'application/json', // Tell the server we're sending JSON
                    },
                    body: JSON.stringify(data), // Convert the JS object to a JSON string
                });

                // Check if the response was successful (status code 2xx)
                if (response.ok) {
                    const result = await response.json(); // Parse the JSON response from the backend
                    showMessage(successMessage, result.message || 'Message sent successfully! We will get back to you soon.');
                    this.reset(); // Clear the form fields on success
                } else {
                    // Handle server errors or bad responses
                    const errorResult = await response.json(); // Attempt to parse error message from server
                    showMessage(errorMessage, errorResult.message || 'Failed to send message. Please try again.');
                }
            } catch (error) {
                // Handle network errors (e.g., server is down, no internet)
                console.error('Network or submission error:', error);
                showMessage(errorMessage, 'An error occurred. Please check your internet connection and try again.');
            } finally {
                // Always reset button state after the request is complete (success or failure)
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                document.body.classList.remove('loading'); // Remove loading state
            }
        });
    }
});


// --- Login/Signup Form Submission Logic ---

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Get references to message elements specific to login_signup.html
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Helper functions for messages (re-used from above, but scoped to this context)
    function showAuthMessage(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
            element.textContent = '';
        }, 5000);
    }

    function hideAuthMessages() {
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
    }

    // Login Form Handler
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideAuthMessages();

            const formData = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value,
                role: document.getElementById('loginRole').value
            };

            if (!formData.email || !formData.password || !formData.role) {
                showAuthMessage(errorMessage, 'Please fill in all fields.');
                return;
            }

            document.body.classList.add('loading'); // Show global loading indicator
            const submitBtn = loginForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;

            try {
                // Call the backend /api/auth/login endpoint (ACTUAL FETCH CALL)
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const result = await response.json();
                    // Store the token and user info in localStorage
                    localStorage.setItem('authToken', result.token);
                    localStorage.setItem('userRole', result.role);
                    localStorage.setItem('userUID', result.uid);

                    showAuthMessage(successMessage, result.message || 'Login successful! Redirecting...');

                    setTimeout(() => {
                        window.location.href = 'index.html'; // <--- CHANGED FROM dashboard.html TO index.html
                    }, 1500);

                } else {
                    const errorResult = await response.json();
                    showAuthMessage(errorMessage, errorResult.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                showAuthMessage(errorMessage, 'An error occurred during login. Please check your internet connection and try again.');
            } finally {
                submitBtn.textContent = originalText; // Reset button text
                submitBtn.disabled = false; // Re-enable button
                document.body.classList.remove('loading');
            }
        });
    }

    // Signup Form Handler
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideAuthMessages();

            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showAuthMessage(errorMessage, 'Passwords do not match!');
                return;
            }
            if (password.length < 6) {
                showAuthMessage(errorMessage, 'Password must be at least 6 characters long.');
                return;
            }

            const formData = {
                name: document.getElementById('signupName').value,
                email: document.getElementById('signupEmail').value,
                password: password,
                role: document.getElementById('signupRole').value
            };

            if (!formData.name || !formData.email || !formData.password || !formData.role) {
                showAuthMessage(errorMessage, 'Please fill in all fields.');
                return;
            }

            document.body.classList.add('loading');
            const submitBtn = signupForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating account...';
            submitBtn.disabled = true;

            try {
                // Call the backend /api/auth/signup endpoint (ACTUAL FETCH CALL)
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const result = await response.json();
                    // Store the token and user info in localStorage
                    localStorage.setItem('authToken', result.token);
                    localStorage.setItem('userRole', result.role);
                    localStorage.setItem('userUID', result.uid);

                    showAuthMessage(successMessage, result.message || 'Account created successfully! Redirecting to homepage...'); // Changed message
                    signupForm.reset(); // Clear form fields

                    setTimeout(() => {
                        window.location.href = 'index.html'; // <--- CHANGED FROM dashboard.html TO index.html
                    }, 1500);

                } else {
                    const errorResult = await response.json();
                    showAuthMessage(errorMessage, errorResult.message || 'Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Signup error:', error);
                showAuthMessage(errorMessage, 'An error occurred during registration. Please check your internet connection and try again.');
            } finally {
                submitBtn.textContent = originalText; // Reset button text
                submitBtn.disabled = false; // Re-enable button
                document.body.classList.remove('loading');
            }
        });
    }
});

// --- Tab Switching Logic for login_signup.html (if applicable) ---
document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const cardTitle = document.querySelector('.card-title');
    const cardSubtitle = document.querySelector('.card-subtitle');
    const switchText = document.getElementById('switchText'); // This ID is not in your login_signup.html, but keeping the reference
    const switchLink = document.getElementById('switchLink'); // This ID is not in your login_signup.html, but keeping the reference


    if (loginTab && signupTab && loginForm && signupForm) {
        // Function to activate a tab (kept from your original code)
        function activateTab(tabToActivate, formToShow, newTitle, newSubtitle) { // Removed linkText, linkHref as they are not used in your HTML
            loginTab.classList.remove('active');
            signupTab.classList.remove('active');
            tabToActivate.classList.add('active');

            loginForm.classList.remove('active');
            signupForm.classList.remove('active');
            formToShow.classList.add('active');

            cardTitle.textContent = newTitle;
            cardSubtitle.textContent = newSubtitle;
            // switchText.textContent = linkText; // Removed as switchText is not in your HTML
            // switchLink.textContent = linkHref; // Removed as switchLink is not in your HTML
            hideMessages(); // Hide messages when switching tabs
        }

        loginTab.addEventListener('click', () => {
            activateTab(loginTab, loginForm, 'Welcome Back', 'Access your Rotaract dashboard');
        });

        signupTab.addEventListener('click', () => {
            activateTab(signupTab, signupForm, 'Join Our Community', 'Create your Rotaract account');
        });

        // Handle switch link clicks (adjusted to your existing HTML structure)
        // Your HTML doesn't have a 'switchLink' element, so this part needs to be adjusted
        // based on how you intend to switch forms using a link.
        // For now, I'll keep the logic that was in your provided HTML's inline script.
        // If you want a "Don't have an account? Register here" link functionality,
        // you need to add an ID to that <a> tag in login_signup.html (e.g., id="switchAuthForm").
        // For now, I've commented out the original switchLink logic and will rely on tab clicks.

        // Original logic from your provided login_signup.html for tab switching:
        // No direct switch link in your provided HTML, so this part is based on tab clicks.
        // If you add a link like <a href="#" id="switchAuthForm">Register here</a>,
        // then you can uncomment and adjust this:
        /*
        const switchAuthFormLink = document.getElementById('switchAuthForm');
        if (switchAuthFormLink) {
            switchAuthFormLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (loginForm.classList.contains('active')) {
                    signupTab.click(); // Simulate click on signup tab
                } else {
                    loginTab.click(); // Simulate click on login tab
                }
            });
        }
        */

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('tab') === 'signup') {
            signupTab.click();
        }
    }
});

// --- General Smooth Scrolling (can be in main.js if preferred) ---
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
