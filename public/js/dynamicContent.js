// public/js/dynamicContent.js

/**
 * This file manages dynamic content updates and interactions on the frontend,
 * particularly for the hero section's auto-rotating showcase and the announcements ticker.
 * It will eventually integrate with backend APIs to fetch real-time data.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Section Auto-Rotating Showcase ---
    const showcaseItems = [
        "Fostering Leadership, Building Community",
        "Celebrating 10 Years of Impact!",
        "Join Our Next Big Event!",
        "Empowering Youth Through Service",
        "500+ Lives Touched Through Community Service", // Example milestone
        "Our Members, Our Strength - Join Us Today!" // Example testimonial
    ];
    let currentShowcaseIndex = 0;
    const heroTaglineElement = document.getElementById('heroSubtitle'); // Assuming your tagline is in an element with this ID

    /**
     * Updates the hero section's tagline with the next item in the showcase.
     */
    function updateHeroShowcase() {
        if (heroTaglineElement) {
            heroTaglineElement.style.opacity = 0; // Fade out
            setTimeout(() => {
                heroTaglineElement.textContent = showcaseItems[currentShowcaseIndex];
                heroTaglineElement.style.opacity = 1; // Fade in
                currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseItems.length; // Move to next item
            }, 500); // Wait for fade out to complete before changing text
        }
    }

    // Start the auto-rotating showcase if the element exists
    if (heroTaglineElement) {
        // Set initial text
        heroTaglineElement.textContent = showcaseItems[currentShowcaseIndex];
        currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseItems.length;
        // Set interval for rotation (e.g., every 5 seconds)
        setInterval(updateHeroShowcase, 5000);
    }


    // --- Announcements Live Scrolling Ticker ---
    const announcementsTicker = document.getElementById('announcementsTicker');
    // Dummy announcements for now. These would eventually come from your backend.
    let announcements = [
        "Registrations for the Annual Blood Donation Camp are now open! Click here to volunteer.",
        "Important: General Body Meeting on October 15th at 5 PM in Auditorium A. All members must attend.",
        "New mentorship program launched for first-year students. Apply now to get a mentor!",
        "Volunteer call for the upcoming Clean-Up Drive this Saturday. Meet at the main gate at 9 AM.",
        "Rotaract Club featured in University Times for recent community initiatives. Read the article!",
        "Don't miss our upcoming workshop on 'Public Speaking for Leaders' - limited seats available!"
    ];

    /**
     * Populates and starts the scrolling animation for the announcements ticker.
     * This function would ideally fetch data from the backend.
     */
    async function initAnnouncementsTicker() {
        if (!announcementsTicker) return;

        // --- Placeholder for Backend Fetch ---
        // In a real scenario, you would uncomment and implement this:
        /*
        try {
            const response = await fetch('/api/announcements'); // Endpoint to fetch announcements
            if (response.ok) {
                const data = await response.json();
                announcements = data.announcements || []; // Update with fetched data
            } else {
                console.error('Failed to fetch announcements:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
        */

        if (announcements.length === 0) {
            announcementsTicker.innerHTML = '<p class="text-gray-400 text-sm">No new announcements at the moment.</p>';
            return;
        }

        // Create a container for the scrolling text
        const tickerContent = document.createElement('div');
        tickerContent.className = 'ticker-content inline-block whitespace-nowrap'; // Tailwind classes for inline, no wrap

        // Add each announcement as a span with some spacing
        announcements.forEach(announcement => {
            const span = document.createElement('span');
            span.className = 'mr-12 text-white text-sm'; // Margin-right for spacing between announcements
            span.textContent = announcement;
            tickerContent.appendChild(span);
        });

        // Duplicate content to ensure seamless looping
        tickerContent.innerHTML += tickerContent.innerHTML;

        announcementsTicker.appendChild(tickerContent);

        // Apply CSS animation for scrolling.
        // The animation itself will be defined in your CSS (e.g., style.css).
        // Example CSS (you'd add this to your style.css):
        /*
        @keyframes scroll-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); } // Scrolls half of the duplicated content
        }
        .ticker-content {
            animation: scroll-left linear infinite;
            animation-duration: 60s; // Adjust speed as needed
        }
        */
        // Calculate dynamic duration based on content width for smoother loop
        const contentWidth = tickerContent.scrollWidth / 2; // Half because we duplicated
        const tickerWidth = announcementsTicker.offsetWidth;
        const duration = contentWidth / 50; // 50px/second, adjust speed as desired

        tickerContent.style.animationDuration = `${duration}s`;
        tickerContent.style.animationName = 'scroll-left'; // Reference the CSS keyframe
        tickerContent.style.animationTimingFunction = 'linear';
        tickerContent.style.animationIterationCount = 'infinite';
    }

    // Initialize the announcements ticker
    initAnnouncementsTicker();


    // --- Event Filters (Placeholder for future backend integration) ---
    // This section would contain logic for filtering events based on categories, dates, etc.
    // For a static site, filters would simply hide/show HTML elements.
    // With a backend, they would trigger API calls to fetch filtered events.
    const eventFilterButtons = document.querySelectorAll('.event-filter-btn'); // Example selector
    eventFilterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log(`Filtering events by: ${e.target.dataset.category}`);
            // Future: Call a backend API to get filtered events
            // Example: fetch(`/api/events?category=${e.target.dataset.category}`)
            // Then update the #eventsListContainer with the new data.
        });
    });


    // --- Media Gallery Filters (Placeholder for future backend integration) ---
    // Similar to event filters, this would manage filtering media (photos, videos, posters).
    const mediaFilterButtons = document.querySelectorAll('.media-filter-btn'); // Example selector
    mediaFilterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log(`Filtering media by: ${e.target.dataset.type}`);
            // Future: Call a backend API to get filtered media
            // Example: fetch(`/api/media?type=${e.target.dataset.type}`)
            // Then update the #mediaGalleryContainer with the new data.
        });
    });

    // --- Placeholder for "Read More" Toggle on Initiatives (if not already in forms.js/main.js) ---
    // This logic might be simple enough to be inline or in main.js, but
    // if initiatives content is dynamic, this would be here.
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.initiative-card');
            const fullContent = card.querySelector('.full-content');
            if (fullContent) {
                fullContent.classList.toggle('hidden');
                button.textContent = fullContent.classList.contains('hidden') ? 'Read More' : 'Read Less';
            }
        });
    });

});
