// global.js — shared scripts

// set footer year
(function setYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
})();


 window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 600); // matches CSS transition time
  });

// BEGIN NAVBAR //

(function () {
  // Elements
  const header = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const NAV_SCROLL_THRESHOLD = 50; // px - when to add scrolled state
  let lastScrollY = window.scrollY;

  // Ensure header never vanishes: only toggle the 'scrolled' class
  function onScroll() {
    if (window.scrollY > NAV_SCROLL_THRESHOLD) {
      if (!header.classList.contains('scrolled')) header.classList.add('scrolled');
      // ensure fixed top when scrolled
      header.style.position = 'fixed';
    } else {
      header.classList.remove('scrolled');
      // return header to overlay mode (floating)
      header.style.position = 'absolute';
    }
    lastScrollY = window.scrollY;
  }

  // Initialize check
  onScroll();

  // Debounced scroll handler for performance
  let scrollTimeout = null;
  window.addEventListener('scroll', function () {
    if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    scrollTimeout = window.requestAnimationFrame(onScroll);
  }, { passive: true });

  // Mobile menu toggle (MB-1A)
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open'); // opens dropdown
    hamburger.classList.toggle('active', isOpen);
    // ARIA
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  }

  // Click event
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Handle ESC to close menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Ensure focus trap-like fallback: if menu opens, focus first link
  hamburger.addEventListener('click', function () {
    if (mobileMenu.classList.contains('open')) {
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

})();

// END NAVBAR //
