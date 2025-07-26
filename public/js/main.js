// public/js/main.js

/**
 * This file contains the main client-side JavaScript for global UI interactions,
 * animations, and effects that are primarily used on the index.html page.
 * It extracts inline scripts from index.html for better organization.
 */

// --- Custom Cursor ---
// Only initialize cursor logic if it hasn't been initialized before
if (!window.cursorInitialized) {
    const cursor = document.getElementById('cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    if (cursor) { // Ensure cursor element exists before adding listeners
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.1; // Smoothly move cursor towards mouse position
            cursorY += dy * 0.1;

            cursor.style.left = cursorX - 10 + 'px'; // Adjust for cursor size (20px width/height)
            cursor.style.top = cursorY - 10 + 'px';

            requestAnimationFrame(animateCursor); // Loop animation
        }
        animateCursor(); // Start the custom cursor animation
    }
    window.cursorInitialized = true; // Mark cursor as initialized globally
}


// --- Three.js 3D Scene Setup ---
// Declare these variables at a higher scope if they are truly global and used by other functions,
// or ensure init3D is only called once.
let scene, camera, renderer, solarSystem, particles = [];

/**
 * Initializes the Three.js 3D scene, camera, renderer, and adds objects.
 * This function should be called once the DOM is loaded.
 */
function init3D() {
    const container = document.getElementById('canvasContainer');
    if (!container) {
        console.warn('Canvas container not found. 3D scene will not initialize.');
        return;
    }

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement); // Add canvas to the container

    // Create 3D elements
    createSolarSystem();
    createParticleField();
    createFloatingShapes();

    // Position camera
    camera.position.z = 15;
    camera.position.y = 2;

    // Start animation loop
    animate3D();
}

/**
 * Creates a simplified solar system (sun and orbiting planets).
 */
function createSolarSystem() {
    solarSystem = new THREE.Group();

    const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0x4169E1,
        transparent: true,
        opacity: 0.8
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4169E1,
        transparent: true,
        opacity: 0.2
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    sun.add(glow);

    solarSystem.add(sun);

    const planetData = [
        { size: 0.3, distance: 4, speed: 0.02, color: 0x6495ED },
        { size: 0.4, distance: 6, speed: 0.015, color: 0x87CEEB },
        { size: 0.25, distance: 8, speed: 0.01, color: 0x4682B4 },
        { size: 0.35, distance: 10, speed: 0.008, color: 0x5F9EA0 }
    ];

    planetData.forEach((data) => {
        const orbitGroup = new THREE.Group();

        const planetGeometry = new THREE.SphereGeometry(data.size, 16, 16);
        const planetMaterial = new THREE.MeshBasicMaterial({
            color: data.color,
            transparent: true,
            opacity: 0.7
        });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.x = data.distance;

        const ringGeometry = new THREE.RingGeometry(data.distance - 0.05, data.distance + 0.05, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x4169E1,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        solarSystem.add(ring);

        orbitGroup.add(planet);
        orbitGroup.userData = { speed: data.speed };
        solarSystem.add(orbitGroup);
    });

    solarSystem.position.x = -5;
    solarSystem.position.y = 2;
    scene.add(solarSystem);
}

/**
 * Creates a field of randomly positioned particles.
 */
function createParticleField() {
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        const color = new THREE.Color(0x4169E1);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });

    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);
    particles.push(particleField);
}

/**
 * Creates floating geometric shapes in the scene.
 */
function createFloatingShapes() {
    const shapes = [];
    const geometries = [
        new THREE.TetrahedronGeometry(0.5),
        new THREE.OctahedronGeometry(0.4),
        new THREE.IcosahedronGeometry(0.3)
    ];

    for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0x4169E1 : 0x6495ED,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });

        const shape = new THREE.Mesh(geometry, material);
        shape.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );

        shape.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.01 + 0.005
        };

        shapes.push(shape);
        scene.add(shape);
    }

    return shapes;
}

let time = 0;
/**
 * The main animation loop for the Three.js scene.
 */
function animate3D() {
    requestAnimationFrame(animate3D);
    time += 0.01;

    if (solarSystem) {
        solarSystem.rotation.y += 0.005;

        solarSystem.children.forEach(child => {
            if (child.userData && child.userData.speed) {
                child.rotation.y += child.userData.speed;
            }
        });
    }

    particles.forEach(particle => {
        particle.rotation.y += 0.002;
        particle.rotation.x += 0.001;
    });

    scene.children.forEach(child => {
        if (child.userData && child.userData.rotationSpeed) {
            child.rotation.x += child.userData.rotationSpeed.x;
            child.rotation.y += child.userData.rotationSpeed.y;
            child.rotation.z += child.userData.rotationSpeed.z;

            child.position.y += Math.sin(time + child.position.x) * child.userData.floatSpeed;
        }
    });

    camera.position.x = Math.sin(time * 0.1) * 2;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

/**
 * Handles window resizing to keep the 3D scene responsive.
 */
function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
window.addEventListener('resize', onWindowResize);


// --- Create Floating DOM Particles (separate from Three.js particles) ---
/**
 * Creates and adds animated particle elements directly to the DOM.
 */
function createDOMParticles() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 15000);
        }, i * 200);
    }
}


// --- Animated Counter Function (for About Section stats) ---
/**
 * Animates numerical counters when they come into view.
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}


// --- Parallax Effect for About Section ---
/**
 * Applies a parallax scrolling effect to the about section.
 */
function handleParallax() {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        aboutSection.style.transform = `translateY(${rate}px)`;
    }
}
window.addEventListener('scroll', handleParallax);


// --- Interactive Hover Effects for Buttons ---
/**
 * Adds hover effects to specified buttons and links by scaling the custom cursor.
 */
// Only add event listeners if cursor is initialized
document.addEventListener('DOMContentLoaded', () => {
    if (window.cursorInitialized) { // Check if cursor logic was initialized
        const cursorElement = document.getElementById('cursor'); // Get the cursor element again
        document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (cursorElement) cursorElement.style.transform = 'scale(2)';
            });

            btn.addEventListener('mouseleave', () => {
                if (cursorElement) cursorElement.style.transform = 'scale(1)';
            });
        });
    }
});


// --- Initialization on Window Load ---
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 1000);
        }, 2000);
    }

    init3D();
    animateCounters();
    createDOMParticles();
    setInterval(createDOMParticles, 15000);
});
