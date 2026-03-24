/* ============================================
   Pullely Consulting — Main JavaScript
   Hamburger menu, FAQ accordion, scroll effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      // Animate hamburger
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq__question').forEach(function (question) {
    question.addEventListener('click', function () {
      const item = this.closest('.faq__item');
      const wasActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq__item').forEach(function (i) {
        i.classList.remove('active');
      });

      // Toggle clicked
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  // --- Scroll: Nav shadow ---
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

  // --- Fade-in on scroll ---
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }
});
