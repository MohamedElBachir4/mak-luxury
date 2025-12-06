// ============================================
// PREMIUM REAL ESTATE DEVELOPER WEBSITE
// JavaScript for animations and interactivity
// ============================================

// Firebase CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDw5Kh7o7VOL6N_AwQ0NYYkBuhZZr44VTc",
    authDomain: "mak-luxury-1f1a5.firebaseapp.com",
    projectId: "mak-luxury-1f1a5",
    storageBucket: "mak-luxury-1f1a5.firebasestorage.app",
    messagingSenderId: "89094290310",
    appId: "1:89094290310:web:c44ea5243211474f944a07"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تصدير db للاستخدام في dashboard
window.firestoreDB = db;

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
    initializeOffPlanProjects();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeNewsletter();
    initializeNavbarScroll();
    initializeContactForm();
    initializeHeroVideo();
});

// ============================================
// LANGUAGE MANAGEMENT
// ============================================

function initializeLanguage() {
    setLanguage(currentLang);
    
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLang;
        languageSelect.addEventListener('change', function() {
            const lang = this.value;
            setLanguage(lang);
        });
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
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
    
    initializeProjects();
}

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.querySelector('.logo');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.location.reload();
        });
    }

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

    projectsGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">Loading developments...</div>';

    const defaultImages = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
        'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];
    
    projectsGrid.innerHTML = '';
    
    defaultImages.forEach((imageUrl, index) => {
        const project = {
            name: '',
            location: '',
            description: '',
            price: '',
            image: imageUrl
        };
        const projectCard = createProjectCard(project, index, currentLang);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project, index, lang = 'en') {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);

    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.name;
    img.className = 'project-image';
    img.loading = 'lazy';
    img.onerror = function() {
        this.onerror = null;
        this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'600\'%3E%3Crect fill=\'%231a1a1a\' width=\'400\' height=\'600\'/%3E%3Ctext fill=\'%23fff\' font-family=\'Inter\' font-size=\'16\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3E' + encodeURIComponent(project.name) + '%3C/text%3E%3C/svg%3E';
    };

    const hasInfo = project.name || project.location || project.description || project.price;
    
    if (hasInfo) {
        card.innerHTML = `
            <div class="project-overlay">
                ${project.name ? `<h3 class="project-name">${project.name}</h3>` : ''}
                ${project.location ? `<p class="project-location">${project.location}</p>` : ''}
                ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                ${project.price ? `<div class="project-price">${project.price}</div>` : ''}
            </div>
        `;
    } else {
        card.innerHTML = '';
    }
    
    card.insertBefore(img, card.firstChild);

    return card;
}

// ============================================
// OFF-PLAN PROJECTS GRID
// ============================================

function initializeOffPlanProjects() {
    const offPlanGrid = document.getElementById('offPlanGrid');
    
    if (!offPlanGrid) return;

    const defaultOffPlanImages = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];
    
    offPlanGrid.innerHTML = '';
    
    defaultOffPlanImages.forEach((imageUrl, index) => {
        const project = {
            title: '',
            location: '',
            description: '',
            price: '',
            image: imageUrl,
            badge: 'New Launch'
        };
        const projectCard = createOffPlanCard(project, index);
        offPlanGrid.appendChild(projectCard);
    });
}

function createOffPlanCard(project, index) {
    const card = document.createElement('div');
    card.className = 'off-plan-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);

    const img = document.createElement('img');
    img.src = project.image;
    img.alt = 'Off-plan Project';
    img.className = 'offplan-img';
    img.loading = 'lazy';
    img.onerror = function() {
        this.onerror = null;
        this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'500\'%3E%3Crect fill=\'%231a1a1a\' width=\'400\' height=\'500\'/%3E%3C/svg%3E';
    };
    
    card.appendChild(img);

    return card;
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                
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
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// CURSOR EFFECT
// ============================================

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

if (window.innerWidth > 768) {
    createCustomCursor();
    
    document.addEventListener('mousemove', function(e) {
        if (cursor) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.display = 'block';
        }
    });
    
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

const throttledScroll = throttle(function() {
    // Scroll-based animations
}, 16);

window.addEventListener('scroll', throttledScroll);

// ============================================
// CONTACT FORM - حفظ في Firebase فقط
// ============================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                phoneCode: document.getElementById('phoneCode').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                email: document.getElementById('email').value,
                language: document.getElementById('language').value,
                createdAt: new Date()
            };
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = currentLang === 'ar' ? 'جاري الإرسال...' : currentLang === 'fr' ? 'Envoi en cours...' : 'Submitting...';
            submitBtn.style.opacity = '0.7';
            
            try {
                // حفظ في Firebase
                await addDoc(collection(db, "contacts"), formData);
                
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.querySelector('span').textContent = currentLang === 'ar' ? 'تم الإرسال!' : currentLang === 'fr' ? 'Envoyé!' : 'Submitted!';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
                
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                }, 2000);
            } catch (error) {
                console.error("Error adding document: ", error);
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.querySelector('span').textContent = 'Error! Try again';
                submitBtn.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
        
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

// ============================================
// HERO VIDEO QUALITY OPTIMIZATION
// ============================================

function initializeHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        const videoSources = ['./vv.mp4', 'vv.mp4', '/vv.mp4'];
        let currentSourceIndex = 0;
        
        function tryLoadVideo() {
            if (currentSourceIndex < videoSources.length) {
                heroVideo.src = videoSources[currentSourceIndex];
                heroVideo.load();
            }
        }
        
        heroVideo.addEventListener('loadedmetadata', function() {
            if (heroVideo.videoWidth > 0 && heroVideo.videoHeight > 0) {
                heroVideo.play().catch(function(error) {
                    console.log('Video autoplay prevented:', error);
                    currentSourceIndex++;
                    tryLoadVideo();
                });
            }
        });
        
        heroVideo.addEventListener('error', function() {
            console.log('Video load error, trying next source...');
            currentSourceIndex++;
            if (currentSourceIndex < videoSources.length) {
                tryLoadVideo();
            }
        });
        
        heroVideo.addEventListener('canplay', function() {
            heroVideo.style.imageRendering = 'high-quality';
        });
        
        heroVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
        
        tryLoadVideo();
    }
}