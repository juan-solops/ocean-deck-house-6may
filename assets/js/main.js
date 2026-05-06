// ═══════════════════════════════════════════════
// Ocean Deck House — Main JS
// Nav toggle + scroll effects
// ═══════════════════════════════════════════════

(function () {
  'use strict';

  // ── MOBILE NAV TOGGLE ────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        navToggle.textContent = '☰';
      });
    });
  }

  // ── STICKY NAV SCROLL EFFECT ─────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }, { passive: true });
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ───────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── LAZY IMAGE FADE-IN ────────────────────────
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('img-loaded');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => observer.observe(img));
  }

  // ── SUCCESS MESSAGE ON CONTACT PAGE ──────────
  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') === 'true') {
    const success = document.getElementById('formSuccess');
    const form    = document.getElementById('contactForm');
    if (success && form) {
      form.style.display = 'none';
      success.style.display = 'block';
    }
  }

})();
