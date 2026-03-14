// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle smooth scrolling for anchor links (fixes first-click issue)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // For contact section, scroll to the very bottom of the page
            if (targetId === '#contact') {
                setTimeout(() => {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 50);
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 50);
                }
            }
        });
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        let current = '';

        // Check if we're at the bottom of the page - if so, highlight Contact
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            current = 'contact';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Intersection Observer for scroll animations - optimized for faster loading
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };


    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements with local staggered delay
    const sections_to_animate = document.querySelectorAll('section');
    sections_to_animate.forEach(section => {
        const items = section.querySelectorAll('.section-header, .about-text, .skills-grid, .timeline-item, .experience-card, .project-card, .publication-card, .achievement-card, .certificate-card');
        items.forEach((item, index) => {
            item.classList.add('fade-in');
            // Stagger only within the same section
            item.style.transitionDelay = `${index * 0.08}s`;
            observer.observe(item);
        });
    });

    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation after a delay
    setTimeout(() => {
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            typeWriter(nameElement, 'Ayush Patel', 150);
        }
    }, 1000);

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');

        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.icon-item');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
        icon.style.animationDuration = `${3 + index * 0.5}s`;
    });

    // Progress bar animation for skills (if you want to add progress bars later)
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // Card hover effects - removed to prevent blur issues

    // Stagger animation for grid items
    function staggerAnimation(selector, delay = 100) {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * delay}ms`;
        });
    }

    // Loading animation
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll-to-top button
    scrollToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(37, 99, 235, 0.4)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.3)';
    });

    // Lazy loading for images (if you add images later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Cursor trail effect removed for cleaner experience

    // Contact form animation (if you add a form later)
    const contactInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    contactInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Initialize AOS (Animate On Scroll) alternative
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');

        elements.forEach(el => {
            const animationType = el.getAttribute('data-animate');
            el.classList.add('animate-element', animationType);
        });
    }

    initScrollAnimations();

    // Performance optimization: Throttle scroll events
    let ticking = false;

    function updateOnScroll() {
        highlightNavLink();
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Add loading states for dynamic content
    function showLoading(element) {
        element.innerHTML = '<div class="loading-spinner"></div>';
        element.classList.add('loading');
    }

    function hideLoading(element, content) {
        element.classList.remove('loading');
        element.innerHTML = content;
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    // Scroll Progress Logic
    const scrollProgressBar = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = scrollPercentage + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);
    // Initialize once
    updateScrollProgress();

    // Add CSS for loading spinner
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .animate-element {
            opacity: 0;
            transition: all 0.6s ease;
        }
        
        .animate-element.visible {
            opacity: 1;
        }
        
        .fade-up.visible {
            transform: translateY(0);
        }
        
        .fade-up {
            transform: translateY(30px);
        }
        
        .fade-left.visible {
            transform: translateX(0);
        }
        
        .fade-left {
            transform: translateX(-30px);
        }
        
        .fade-right.visible {
            transform: translateX(0);
        }
        
        .fade-right {
            transform: translateX(30px);
        }
        
        .nav-link.active {
            color: #2563eb;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for potential use in other scripts
window.portfolioUtils = {
    debounce,
    throttle,
    typeWriter: function (element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
};

// --- Journey Globe Initialization ---
function initJourneyGlobe() {
    const globeContainer = document.getElementById('globeViz');
    // Ensure globeContainer exists and Globe.gl is loaded
    if (!globeContainer || typeof Globe === 'undefined') return;

    // Location data
    const journeyData = {
        'india': { lat: 8.8932, lng: 76.6340, id: 'india', logo: 'assets/img/tkmce_logo.jpeg', title: 'B.Tech Mechanical Engineering', team: 'TKM College of Engineering', time: 'Aug 2015 - Jul 2019' },
        'mrf': { lat: 13.0827, lng: 80.2707, id: 'mrf', logo: 'assets/img/mrf_logo.png', title: 'Structural Simulation and AutomationEngineer', team: 'MRF Tyres, Chennai', time: 'Sep 2019 - Mar 2023' },
        'thd': { lat: 48.8407, lng: 12.9554, id: 'thd', logo: 'assets/img/thd_logo.png', title: 'M.Eng Mechatronic and Cyber-Physical Systems', team: 'TH Deggendorf', time: 'Mar 2023 - Jan 2026' },
        'cariad': { lat: 48.7665, lng: 11.4257, id: 'cariad', logo: 'assets/img/cariad_logo.svg', title: 'ADAS/AD Development Engineer', team: 'CARIAD SE', time: 'Jun 2023 - May 2024' },
        'bmw': { lat: 48.2489, lng: 11.6465, id: 'bmw', logo: 'assets/img/bmw_logo.png', title: 'XR Development Engineer', team: 'BMW Group', time: 'Oct 2024 - Nov 2025' }
    };

    const locationsArray = Object.values(journeyData);

    // Path arcs connecting locations step by step
    const arcsData = [
        { startLat: 8.8932, startLng: 76.6340, endLat: 13.0827, endLng: 80.2707 }, // TKMCE to MRF
        { startLat: 13.0827, startLng: 80.2707, endLat: 48.8407, endLng: 12.9554 }, // MRF to THD
        { startLat: 48.8407, startLng: 12.9554, endLat: 48.7665, endLng: 11.4257 }, // THD to CARIAD
        { startLat: 48.7665, startLng: 11.4257, endLat: 48.2489, endLng: 11.6465 }  // CARIAD to BMW
    ];

    // Initialize Globe
    const world = Globe()
        (globeContainer)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundColor('rgba(0,0,0,0)') // Transparent background
        .showAtmosphere(true)
        .atmosphereColor('lightskyblue')
        .atmosphereAltitude(0.15)
        .width(globeContainer.clientWidth)
        .height(globeContainer.clientHeight);

    // Resize map on window resize
    window.addEventListener('resize', () => {
        world.width(globeContainer.clientWidth).height(globeContainer.clientHeight);
    });

    // Add arc data
    world.arcsData(arcsData)
        .arcColor(() => '#0db486') // Primary green theme
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(1500)
        .arcStroke(1);

    // Add custom HTML elements for markers at each location
    world.htmlElementsData(locationsArray)
        .htmlElement(d => {
            const el = document.createElement('div');
            el.innerHTML = `
                <div class="marker-pin">
                    <img src="${d.logo}" class="marker-logo" alt="Logo">
                </div>
            `;
            el.style.pointerEvents = 'auto'; // allow clicking through globe
            el.style.cursor = 'pointer';
            el.onclick = () => activateLocation(d.id);
            return el;
        });

    // Configure globe controls
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;
    world.controls().enableZoom = true;

    // Logic for Interactions
    const infoOverlay = document.getElementById('globe-info');
    const infoLogo = document.getElementById('globe-info-logo');
    const infoTitle = document.getElementById('globe-info-title');
    const infoTeam = document.getElementById('globe-info-team');
    const infoTime = document.getElementById('globe-info-time');
    const timelineSteps = document.querySelectorAll('.timeline-step');

    function activateLocation(locKey) {
        const data = journeyData[locKey];
        if (!data) return;

        // Stop auto rotation temporarily
        world.controls().autoRotate = false;

        // Update info overlay details
        infoLogo.src = data.logo;
        infoTitle.innerText = data.title;
        infoTeam.innerText = data.team;
        infoTime.innerText = data.time;

        // Show overlay with animation
        infoOverlay.classList.add('show');

        // Fly camera to location
        world.pointOfView({ lat: data.lat, lng: data.lng, altitude: 0.8 }, 1000);

        // Update active state in top timeline CSS
        timelineSteps.forEach(step => step.classList.remove('active'));
        const activeStep = Array.from(timelineSteps).find(s => s.getAttribute('data-location') === locKey);
        if (activeStep) activeStep.classList.add('active');
    }

    // Bind timeline clicks to the associated location logic
    timelineSteps.forEach(step => {
        step.addEventListener('click', () => {
            const locKey = step.getAttribute('data-location');
            activateLocation(locKey);
        });
    });

    // Set initial view without animation immediately, then let it rotate
    setTimeout(() => {
        activateLocation('india');
        setTimeout(() => world.controls().autoRotate = true, 500);
    }, 1000);

    // Hide overlay and resume rotation when clicking off
    globeContainer.addEventListener('mousedown', () => {
        infoOverlay.classList.remove('show');
        setTimeout(() => {
            world.controls().autoRotate = true;
        }, 3000);
    });
}

// Ensure globe initializes correctly after other scripts load
document.addEventListener('DOMContentLoaded', () => {
    // Adding slight delay so container bounds resolve first
    setTimeout(initJourneyGlobe, 500);
});
