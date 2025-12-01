// ============================================
// PREMIUM REAL ESTATE DEVELOPER WEBSITE
// JavaScript for animations and interactivity
// ============================================

// Sample project data
const projects = [
    {
        name: "Marina Towers",
        location: "Dubai Marina",
        description: "Ultra-luxury residential towers with panoramic views of the Arabian Gulf and world-class amenities.",
        price: "From AED 3.5M",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80"
    },
    {
        name: "Downtown Residences",
        location: "Downtown Dubai",
        description: "Sophisticated living spaces in the heart of Dubai, steps away from the Burj Khalifa and Dubai Mall.",
        price: "From AED 5.2M",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80"
    },
    {
        name: "Palm Villas",
        location: "Palm Jumeirah",
        description: "Exclusive beachfront villas with private pools and direct access to pristine beaches.",
        price: "From AED 15M",
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
];

// Language management
let currentLang = localStorage.getItem('language') || 'en';

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeNavigation();
    initializeProjects();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeNewsletter();
    initializeNavbarScroll();
    initializeContactForm();
});

// ============================================
// LANGUAGE MANAGEMENT
// ============================================

function initializeLanguage() {
    // Set initial language
    setLanguage(currentLang);
    
    // Language switcher select
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        // Set initial value
        languageSelect.value = currentLang;
        
        // Add change event listener
        languageSelect.addEventListener('change', function() {
            const lang = this.value;
            setLanguage(lang);
        });
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update language select
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                const placeholderAttr = element.getAttribute(`data-placeholder-${lang}`);
                if (placeholderAttr) {
                    element.placeholder = placeholderAttr;
                } else {
                    element.placeholder = text;
                }
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update projects data
    if (lang === 'ar') {
        updateProjectsToArabic();
    } else if (lang === 'fr') {
        updateProjectsToFrench();
    } else {
        updateProjectsToEnglish();
    }
}

// French translations for projects
const projectsFr = [
    {
        name: "Marina Towers",
        location: "Dubai Marina",
        description: "Tours résidentielles ultra-luxueuses avec vues panoramiques sur le golfe Arabique et équipements de classe mondiale.",
        price: "À partir de 3,5 M AED",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80"
    },
    {
        name: "Downtown Residences",
        location: "Downtown Dubai",
        description: "Espaces de vie sophistiqués au cœur de Dubaï, à quelques pas du Burj Khalifa et du Dubai Mall.",
        price: "À partir de 5,2 M AED",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80"
    },
    {
        name: "Palm Villas",
        location: "Palm Jumeirah",
        description: "Villas exclusives en bord de mer avec piscines privées et accès direct aux plages immaculées.",
        price: "À partir de 15 M AED",
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
];

// Arabic translations for projects
const projectsAr = [
    {
        name: "أبراج مارينا",
        location: "دبي مارينا",
        description: "أبراج سكنية فاخرة للغاية بإطلالات بانورامية على الخليج العربي ومرافق عالمية المستوى.",
        price: "من 3.5 مليون درهم",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80"
    },
    {
        name: "سكنيات وسط المدينة",
        location: "وسط دبي",
        description: "مساحات معيشة راقية في قلب دبي، على بعد خطوات من برج خليفة ودبي مول.",
        price: "من 5.2 مليون درهم",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80"
    },
    {
        name: "فلل النخلة",
        location: "نخلة جميرا",
        description: "فلل حصرية على الواجهة البحرية مع مسابح خاصة ووصول مباشر للشواطئ البكر.",
        price: "من 15 مليون درهم",
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
];

function updateProjectsToArabic() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid && projectsGrid.children.length > 0) {
        projectsGrid.innerHTML = '';
        projectsAr.forEach((project, index) => {
            const projectCard = createProjectCard(project, index, 'ar');
            projectsGrid.appendChild(projectCard);
        });
    }
}

function updateProjectsToEnglish() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid && projectsGrid.children.length > 0) {
        projectsGrid.innerHTML = '';
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index, 'en');
            projectsGrid.appendChild(projectCard);
        });
    }
}

function updateProjectsToFrench() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid && projectsGrid.children.length > 0) {
        projectsGrid.innerHTML = '';
        projectsFr.forEach((project, index) => {
            const projectCard = createProjectCard(project, index, 'fr');
            projectsGrid.appendChild(projectCard);
        });
    }
}

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.querySelector('.logo');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Refresh page when clicking on logo or brand text
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.location.reload();
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// PROJECTS GRID
// ============================================

function initializeProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;

    // Use current language to initialize projects
    if (currentLang === 'ar') {
        projectsAr.forEach((project, index) => {
            const projectCard = createProjectCard(project, index, 'ar');
            projectsGrid.appendChild(projectCard);
        });
    } else if (currentLang === 'fr') {
        projectsFr.forEach((project, index) => {
            const projectCard = createProjectCard(project, index, 'fr');
            projectsGrid.appendChild(projectCard);
        });
    } else {
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index, 'en');
            projectsGrid.appendChild(projectCard);
        });
    }
}

function createProjectCard(project, index, lang = 'en') {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    // Add delay for staggered animation
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);

    // Create image element separately for better error handling
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.name;
    img.className = 'project-image';
    img.loading = 'lazy';
    img.onerror = function() {
        this.onerror = null;
        this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'600\'%3E%3Crect fill=\'%231a1a1a\' width=\'400\' height=\'600\'/%3E%3Ctext fill=\'%23fff\' font-family=\'Inter\' font-size=\'16\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3E' + encodeURIComponent(project.name) + '%3C/text%3E%3C/svg%3E';
    };

    card.innerHTML = `
        <div class="project-overlay">
            <h3 class="project-name">${project.name}</h3>
            <p class="project-location">${project.location}</p>
            <p class="project-description">${project.description}</p>
            <div class="project-price">${project.price}</div>
        </div>
    `;
    
    // Insert image at the beginning
    card.insertBefore(img, card.firstChild);

    return card;
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-header, .about-text, .about-image, .off-plan-card, .feature-item, .visual-item, .achievement-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============================================
// NEWSLETTER FORM
// ============================================

function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.backgroundColor = '';
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }
}

// ============================================
// PARALLAX EFFECT (Optional Enhancement)
// ============================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// CURSOR EFFECT (Premium Enhancement)
// ============================================

// Create custom cursor effect for premium feel
let cursor = null;

function createCustomCursor() {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #D4AF37;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
}

// Only enable custom cursor on desktop
if (window.innerWidth > 768) {
    createCustomCursor();
    
    document.addEventListener('mousemove', function(e) {
        if (cursor) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.display = 'block';
        }
    });
    
    // Hide default cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .off-plan-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            if (cursor) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#D4AF37';
            }
        });
        
        el.addEventListener('mouseleave', function() {
            if (cursor) {
                cursor.style.transform = 'scale(1)';
            }
        });
    });
}

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll handlers
const throttledScroll = throttle(function() {
    // Scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', throttledScroll);

// ============================================
// CONTACT FORM
// ============================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                phoneCode: document.getElementById('phoneCode').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                email: document.getElementById('email').value,
                language: document.getElementById('language').value
            };
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = currentLang === 'ar' ? 'جاري الإرسال...' : currentLang === 'fr' ? 'Envoi en cours...' : 'Submitting...';
            submitBtn.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.querySelector('span').textContent = currentLang === 'ar' ? 'تم الإرسال!' : currentLang === 'fr' ? 'Envoyé!' : 'Submitted!';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
        
        // Add floating label effect
        const inputs = contactForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

