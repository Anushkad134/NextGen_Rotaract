<<<<<<< HEAD
NextGen Rotaract: Empowering Community & Leadership
Project Overview
NextGen Rotaract is a modern, dynamic web platform designed to empower Rotaract clubs by streamlining operations, enhancing member engagement, and showcasing impactful community initiatives. Built with a focus on user experience and robust functionality, this website serves as a central hub for club activities, member management, and public outreach.

Perfect for a hackathon, this project demonstrates a full-stack application capable of handling user interactions, managing content, and providing a seamless experience for both club members and the public.

Key Features
✨ Secure User Authentication:
* Member & Admin Roles: Differentiated access for club members and administrators (currently simulated due to Firebase setup issues, but backend logic is in place).
* Login & Registration: Intuitive forms for new users to sign up and existing members to log in.

✉️ Interactive Contact Form:
* Allows visitors to easily send inquiries to the club, with backend integration ready to capture submissions (currently simulated due to Firebase setup issues).

🌐 Dynamic & Responsive Design:
* A visually stunning and fully responsive interface, ensuring optimal viewing across all devices (desktop, tablet, mobile).
* Engaging 3D background animation powered by Three.js on the homepage.
* Smooth scrolling and interactive elements for a premium user experience.

📢 Announcements Ticker:
* A real-time, scrolling ticker to display important club announcements and updates.

Technologies Used
Frontend:

HTML5: Structure and content.

CSS3: Modern styling and responsive design.

JavaScript (ES6+): Interactive elements, form handling, and API integration.

Three.js: For captivating 3D background animations.

Font Awesome: For scalable vector icons.

Backend:

Node.js: JavaScript runtime environment.

Express.js: Fast, unopinionated, minimalist web framework.

Firebase Admin SDK: (Intended for) User Authentication & Firestore Database interactions.

Bcrypt.js: For secure password hashing.

JSON Web Tokens (JWT): For secure session management.

Dotenv: For managing environment variables securely.

Usage
Homepage (index.html): Explore the club's overview, initiatives, and announcements.

Login/Register (login_signup.html): Use the login and signup forms to simulate user authentication.


Project Structure
NextGen_Rotaract/
├── backend/
│   ├── controllers/      # Logic for handling routes (e.g., auth, contact)
│   ├── routes/           # Defines API endpoints (e.g., authRoutes.js, contactRoutes.js)
│   ├── services/         # External integrations (e.g., firebase.js)
│   └── server.js         # Main Express server setup
├── public/
│   ├── assets/           # Images, fonts, etc.
│   ├── css/              # Stylesheets (if external)
│   ├── js/               # Frontend JavaScript (main.js, forms.js, utils.js, modals.js, dynamicContent.js)
│   ├── contact.html
│   ├── dashboard.html    # (Currently redirects to index.html)
│   ├── events.html
│   ├── index.html        # Main landing page
│   ├── initiatives.html
│   ├── login_signup.html # Login and registration page
│   ├── media.html
│   └── members.html
├── .env                  # Environment variables (sensitive info - IGNORED by Git)
├── .gitignore            # Specifies files/folders to ignore in Git
├── package.json          # Project metadata and dependencies
└── README.md             # This file



License
This project is open-sourced under the MIT License.
=======
# NextGen_Rotaract
NextGen Rotaract: A modern web platform designed to empower Rotaract clubs. Features secure member authentication, streamlined communication, and dynamic content to foster leadership and community service.
>>>>>>> 71838bf38d7ac2b27458cad2e4e7d351873e63e7
