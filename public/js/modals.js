// public/js/modals.js

/**
 * This file contains JavaScript logic for handling modal pop-ups,
 * specifically for the "Login / Register" modal.
 * It manages showing, hiding, and basic interactions within the modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get references to the elements
    const loginRegisterBtn = document.querySelector('.login-btn'); // The "Login / Register" button in the header
    const loginSignupModal = document.getElementById('loginSignupModal'); // The modal container itself
    const closeModalBtn = document.querySelector('.close-modal-btn'); // The 'X' button inside the modal
    const overlay = document.querySelector('.modal-overlay'); // The semi-transparent background behind the modal

    // --- Function to Open the Modal ---
    /**
     * Opens the login/signup modal.
     */
    function openModal() {
        if (loginSignupModal) {
            loginSignupModal.classList.add('active'); // Add 'active' class to show the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling on the body when modal is open
        }
    }

    // --- Function to Close the Modal ---
    /**
     * Closes the login/signup modal.
     */
    function closeModal() {
        if (loginSignupModal) {
            loginSignupModal.classList.remove('active'); // Remove 'active' class to hide the modal
            document.body.style.overflow = 'auto'; // Re-enable scrolling on the body
        }
    }

    // --- Event Listeners ---

    // 1. Open modal when "Login / Register" button is clicked
    if (loginRegisterBtn) {
        // Your index.html currently uses onclick="window.location.href = 'login_signup.html'".
        // To use this modal, you'll need to change that to call openModal() or remove the onclick
        // and add an event listener here.
        // For now, let's assume you'll update your HTML or use this event listener:
        loginRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation if it's an <a> tag
            // Since login_signup.html is a separate page, we'll redirect to it.
            // If you wanted a true modal *popup* on the current page, login_signup.html
            // would need to be integrated as a hidden div in each page.
            // For now, let's stick to the current page redirection as per your HTML:
            window.location.href = 'login_signup.html';
        });
    }

    // 2. Close modal when the 'X' button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // 3. Close modal when clicking outside the modal content (on the overlay)
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) { // Check if the click was directly on the overlay
                closeModal();
            }
        });
    }

    // 4. Close modal when the Escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginSignupModal && loginSignupModal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Initial State Check (if modal should be open on page load, e.g., from a URL parameter) ---
    // This is less common for a login modal, but useful for other types of modals.
    // Example: If URL was ?modal=open, you could open it.
    // const urlParams = new URLSearchParams(window.location.search);
    // if (urlParams.get('modal') === 'login') {
    //     openModal();
    // }
});
