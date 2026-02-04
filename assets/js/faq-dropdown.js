// FAQ Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqToggles = document.querySelectorAll('.faq-toggle');
  
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      faqToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute('aria-expanded', 'false');
          otherToggle.parentElement.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current FAQ item
      this.setAttribute('aria-expanded', !isExpanded);
      faqItem.setAttribute('aria-expanded', !isExpanded);
    });
  });
});

// Blog Card Hover Effects (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
  const blogCards = document.querySelectorAll('.blog-card');
  
  blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});
