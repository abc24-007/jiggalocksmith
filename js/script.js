document.addEventListener('DOMContentLoaded', function () {
    // --------------------------
    // Mobile Navigation Handling
    // --------------------------
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // --------------------------
    // Smooth Scrolling
    // --------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --------------------------
    // Active Page Highlighting
    // --------------------------
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.pathname === currentPath) {
            link.classList.add('active');
        }
    });

    // --------------------------
    // Feedback Form Handling
    // --------------------------
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        // Star Rating Interaction
        const stars = feedbackForm.querySelectorAll('.rating-stars label');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                stars.forEach((s, i) => {
                    s.style.color = i <= index ? '#FFD700' : '#ccc';
                });
            });
        });

        // Form Validation
        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            // Validate required fields
            this.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                // Submit form data
                const formData = new FormData(this);
                console.log('Feedback submitted:', Object.fromEntries(formData));
                this.reset();
                stars.forEach(star => star.style.color = '#ccc');
                showToast('Thank you for your feedback!');
            } else {
                showToast('Please fill all required fields', 'error');
            }
        });
    }

    // --------------------------
    // Contact Form Handling
    // --------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            this.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                const formData = new FormData(this);
                console.log('Contact form submitted:', Object.fromEntries(formData));
                this.reset();
                showToast('Message sent successfully!');
            } else {
                showToast('Please fill all required fields', 'error');
            }
        });
    }

    // --------------------------
    // Contact Bar Behavior
    // --------------------------
    const contactBar = document.querySelector('.contact-bar');
    if (contactBar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const isScrollingDown = currentScroll > lastScroll;
            
            if (window.innerWidth > 868) {
                contactBar.style.top = isScrollingDown && currentScroll > 100 
                    ? '-60px' 
                    : '0';
            }
            
            lastScroll = currentScroll;
        });

        // Mobile tap-to-call
        if (window.innerWidth <= 768) {
            contactBar.querySelectorAll('[data-phone]').forEach(btn => {
                btn.addEventListener('click', () => {
                    window.location.href = 'tel:26774754661';
                });
            });
        }
    }

    // --------------------------
    // Toast Notification
    // --------------------------
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});
