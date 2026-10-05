const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('a[href^="#"]');
const animatedItems = document.querySelectorAll('[data-animate="fade"]');

/* Mobile menu toggle */
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* Smooth scroll for anchor links */
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (targetId && targetId.startsWith('#') && targetId.length > 1) {
      event.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (siteNav && siteNav.classList.contains('active')) {
      siteNav.classList.remove('active');
    }

    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* Fade-in animation observer */
if ('IntersectionObserver' in window && animatedItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add('is-visible'));
}
