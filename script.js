// ===== PARTICLES.JS CONFIG =====
particlesJS('particles-js', {
    "particles": {
        "number": { 
            "value": 60,
            "density": { 
                "enable": true,
                "value_area": 800 
            }
        },
        "color": { "value": "#00ccff" },
        "shape": { "type": "circle" },
        "opacity": {
            "value": 0.3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 0.5,
                "opacity_min": 0.1
            }
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00ccff",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse",
                "parallax": { "enable": false }
            }
        },
        "modes": {
            "repulse": {
                "distance": 100,
                "duration": 0.4
            }
        }
    },
    "retina_detect": true
});

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    try {
        // 1. Page load animations
        document.body.style.opacity = '1';
        document.body.classList.add('loaded');
        
        // 2. Navigation animation
        const navItems = document.querySelectorAll('nav li');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + index * 100);
        });
        
        // 3. Hero animation
        setTimeout(() => {
            document.querySelector('.hero-content').classList.add('animated');
        }, 800);
        
        // 4. Initialize email popup
        initEmailPopup();
        
        // 5. Initial visibility check
        checkVisibility();
        
        // 6. Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });
        
        // 7. Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
                localStorage.setItem('theme', 
                    document.body.classList.contains('light-mode') ? 'light' : 'dark');
            });
            
            // Load saved theme
            if (localStorage.getItem('theme') === 'light') {
                document.body.classList.add('light-mode');
            }
        }
        
        // 8. Project image loading states
        document.querySelectorAll('.project-thumbnail').forEach(img => {
            img.style.background = 'linear-gradient(90deg, #2a2a2a 25%, #333 50%, #2a2a2a 75%)';
            img.style.backgroundSize = '200% 100%';
            img.style.animation = 'loading 1.5s infinite';
            
            img.onload = function() {
                this.style.background = 'none';
                this.style.animation = 'none';
            };
        });
        
    } catch (error) {
        console.error('Initialization error:', error);
        emergencyFallback();
    }
});

// ===== EMAIL POPUP FUNCTION =====
function initEmailPopup() {
    document.querySelector('.clickable-name').addEventListener('click', function() {
        Swal.fire({
            title: 'Contact Me',
            html: `
                <div class="email-popup">
                    <a href="mailto:sakshambhardwaj216@gmail.com" 
                       class="glow-email" 
                       style="color: #ff6600; font-size: 1.2rem;">
                       sakshambhardwaj216@gmail.com
                    </a>
                    <button id="copyEmail" class="glow-btn" 
                            style="margin-top: 15px; padding: 8px 15px;">
                        Copy Email
                    </button>
                </div>
            `,
            showConfirmButton: false,
            background: '#2a2a2a',
            color: '#f0f0f0',
            customClass: {
                popup: 'glow-section'
            }
        });

        // Copy functionality
        document.getElementById('copyEmail')?.addEventListener('click', function() {
            navigator.clipboard.writeText('sakshambhardwaj216@gmail.com');
            Swal.fire({
                title: 'Copied!',
                text: 'Email address copied to clipboard',
                timer: 2000,
                background: '#2a2a2a',
                color: '#f0f0f0'
            });
        });
    });
}

// ===== EXISTING FUNCTIONS =====
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

function checkVisibility() {
    const sections = document.querySelectorAll('section:not(.visible)');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

function emergencyFallback() {
    document.body.style.opacity = '1';
    const hiddenElements = document.querySelectorAll('[style*="opacity: 0"]');
    hiddenElements.forEach(el => el.style.opacity = '1');
}

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', checkVisibility);

// Loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;
document.head.appendChild(style);