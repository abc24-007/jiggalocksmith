document.addEventListener('DOMContentLoaded', function () {
  // --------------------------
  // Handle Mobile Navigation
  // --------------------------
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
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
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --------------------------
  // Highlight Active Page Link
  // --------------------------
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage === linkPage) {
      link.classList.add('active');
    }
  });

  // --------------------------
  // Feedback Form Logic
  // --------------------------
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const requiredFields = feedbackForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'red';
          isValid = false;
        } else {
          field.style.borderColor = '#ccc';
        }
      });

      if (!isValid) {
        alert('Please fill out all required fields.');
        return;
      }

      const formData = new FormData(feedbackForm);
      const feedbackData = Object.fromEntries(formData.entries());
      console.log("Feedback submitted:", feedbackData);
      alert("Thank you for your feedback!");
      feedbackForm.reset();
    });

    // Star rating highlight logic
    const stars = document.querySelectorAll('.rating-stars label');
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        stars.forEach((s, i) => {
          s.style.color = i <= index ? '#FFD700' : '#ccc';
        });
        document.querySelector(`#star${index + 1}`).checked = true;
      });
    });
  }

  // --------------------------
  // Contact Form Logic
  // --------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'red';
          isValid = false;
        } else {
          field.style.borderColor = '#ccc';
        }
      });

      if (!isValid) {
        alert('Please complete all required fields.');
        return;
      }

      const formData = new FormData(contactForm);
      const contactData = Object.fromEntries(formData.entries());
      console.log("Contact form submitted:", contactData);
      alert("Thank you! Your message has been received.");
      contactForm.reset();
    });
  }

  // --------------------------
  // Contact Bar Responsive Behavior
  // --------------------------
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    function handleContactBarResize() {
      const contactItems = contactInfo.querySelectorAll('p');
      const contactCta = document.querySelector('.contact-cta');

      const show = window.innerWidth > 576;
      contactItems.forEach(item => {
        const span = item.querySelector('span');
        if (span) span.style.display = show ? 'inline' : 'none';
      });

      if (contactCta) {
        const ctaSpan = contactCta.querySelector('span');
        if (ctaSpan) ctaSpan.style.display = show ? 'inline' : 'none';
      }
    }

    handleContactBarResize();
    window.addEventListener('resize', handleContactBarResize);

    // Mobile click-to-call
    if (window.innerWidth <= 576) {
      document.querySelectorAll('.contact-info p').forEach(item => {
        item.addEventListener('click', function () {
          if (this.querySelector('i')?.classList.contains('fa-phone')) {
            window.location.href = 'tel:26774754661';
          }
        });
      });
    }
  }
});
