// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    document.body.classList.toggle('no-scroll');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to current page link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage === linkPage) {
      link.classList.add('active');
    }
  });
});

// Form validation for contact page
if (document.getElementById('feedbackForm')) {
  const feedbackForm = document.getElementById('feedbackForm');
  
  feedbackForm.addEventListener('submit', function(e) {
    let isValid = true;
    const requiredFields = this.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = 'red';
        isValid = false;
      } else {
        field.style.borderColor = '#ddd';
      }
    });
    
    if (!isValid) {
      e.preventDefault();
      alert('Please fill out all required fields.');
    }
  });
}

// Star rating functionality for feedback page
if (document.querySelector('.rating-stars')) {
  const stars = document.querySelectorAll('.rating-stars label');
  
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      // Highlight all stars up to the clicked one
      stars.forEach((s, i) => {
        if (i <= index) {
          s.style.color = '#FFD700';
        } else {
          s.style.color = '#ddd';
        }
      });
      
      // Update hidden input value
      document.querySelector('.rating-stars input[type="radio"]:checked')?.removeAttribute('checked');
      document.getElementById(`star${index + 1}`).checked = true;
    });
  });
}

// Contact page form validation
if (document.getElementById('contactForm')) {
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent default form submission
    let isValid = true;
    const requiredFields = this.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = 'red';
        isValid = false;
      } else {
        field.style.borderColor = '#ddd';
      }
    });

    if (!isValid) {
      alert('Please fill out all required fields.');
    } else {
      alert('Message sent! We will get back to you shortly.');
      this.reset(); // Clear form fields after successful validation
    }
  });
}

