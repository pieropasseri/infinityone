/* ==========================================================================
   InfinityOne Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect & Scroll Progress ---
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Progress bar width
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        
        // Header class toggle
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on click of nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 3. Scroll spy - Active Nav Link ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    });

    // --- 4. Animation on Scroll (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }

    // --- 5. Lightbox Gallery ---
    const galleryImages = [
        'images/hero_pool.png',
        'images/lounge_night.png',
        'images/villa_architecture.png'
    ];
    let currentImageIndex = 0;
    
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    window.openLightbox = function(index) {
        if (!lightbox || !lightboxImg) return;
        currentImageIndex = index;
        lightboxImg.src = galleryImages[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.closeLightbox = function() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    window.nextLightboxImage = function() {
        if (!lightboxImg) return;
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentImageIndex];
            lightboxImg.style.opacity = '1';
        }, 150);
    };
    
    window.prevLightboxImage = function() {
        if (!lightboxImg) return;
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentImageIndex];
            lightboxImg.style.opacity = '1';
        }, 150);
    };
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextLightboxImage();
            } else if (e.key === 'ArrowLeft') {
                prevLightboxImage();
            }
        }
    });

    // --- 6. Contact Form Submission Simulation ---
    const inquiryForm = document.getElementById('inquiry-form');
    const formCard = document.querySelector('.form-card');
    const submitBtn = document.getElementById('btn-submit-inquiry');
    
    if (inquiryForm && formCard && submitBtn) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Invio in corso...';
            
            // Simulate API Request delay
            setTimeout(() => {
                formCard.classList.add('form-success-active');
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                inquiryForm.reset();
            }, 1800);
        });
    }

    // Set minimum date for checkin/checkout inputs to today
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        
        checkinInput.addEventListener('change', () => {
            checkoutInput.min = checkinInput.value;
        });
    }
});
