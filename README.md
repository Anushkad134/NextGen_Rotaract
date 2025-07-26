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

Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Node.js (LTS version recommended)

npm (Node Package Manager)

Git

1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/NextGen_Rotaract.git
cd NextGen_Rotaract

(Replace YOUR_USERNAME with your actual GitHub username and NextGen_Rotaract with your repository name if different.)

2. Install Dependencies
Install both frontend and backend dependencies:

npm install

3. Environment Variables Setup
Create a .env file in the root of your project directory (NextGen_Rotaract/). This file will store your sensitive API keys and configurations.

PORT=5000
FIREBASE_SERVICE_ACCOUNT_KEY='YOUR_FIREBASE_SERVICE_ACCOUNT_JSON_STRING_HERE'
JWT_SECRET='A_VERY_LONG_AND_RANDOM_STRING_FOR_JWT_SIGNING'

PORT: The port your server will run on (e.g., 5000).

FIREBASE_SERVICE_ACCOUNT_KEY: This is a critical credential.

Go to your Firebase Project Console > Project settings (gear icon) > Service accounts.

Click "Generate new private key" to download a JSON file.

Open this JSON file in a plain text editor.

Copy the entire content of the JSON file.

Paste it as the value for FIREBASE_SERVICE_ACCOUNT_KEY in your .env file, ensuring the entire JSON string is enclosed in SINGLE QUOTES ('). Make sure there are no newlines in the .env file itself for this variable, except for the \n characters that are part of the private_key value within the JSON string (these are correctly escaped).

Note: If you encounter Invalid PEM formatted message errors, you might need to manually replace \n within the private_key value in your .env string with \\n (double backslash n).

JWT_SECRET: Generate a strong, random string (e.g., using an online JWT secret generator or a tool like node -e "console.log(require('crypto').randomBytes(32).toString('hex'))").

4. Run the Backend Server
node backend/server.js

The server will start on http://localhost:5000. You should see a message in your terminal indicating that the server is running.

5. Access the Frontend
Open your web browser and navigate to:

http://localhost:5000/index.html

Usage
Homepage (index.html): Explore the club's overview, initiatives, and announcements.

Login/Register (login_signup.html): Use the login and signup forms to simulate user authentication.

Note: Due to a temporary bypass for hackathon demo purposes, Firebase Authentication and Firestore database operations for signup/login/contact forms are currently simulated and not persisting data. The backend logic is in place, but the Firebase Admin SDK initialization is temporarily disabled.

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

Future Enhancements
Full integration and debugging of Firebase Admin SDK for persistent user authentication and data storage.

Dashboard features for authenticated users (e.g., event registration, member profiles).

Admin panel for content management.

Integration with other APIs (e.g., event calendars, social media feeds).

License
This project is open-sourced under the MIT License.
=======
# NextGen_Rotaract
NextGen Rotaract: A modern web platform designed to empower Rotaract clubs. Features secure member authentication, streamlined communication, and dynamic content to foster leadership and community service.
>>>>>>> 71838bf38d7ac2b27458cad2e4e7d351873e63e7
