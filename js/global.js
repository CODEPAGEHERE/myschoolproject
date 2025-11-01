// global.js — shared scripts

// set footer year
(function setYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
})();

// header scroll behavior: add .scrolled to header when page is scrolled
(function headerScroll(){
  const header = document.getElementById('siteHeader');
  if(!header) return;

  const SCROLL_THRESHOLD = 60; // px

  function check() {
    if(window.scrollY > SCROLL_THRESHOLD) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }

  // initial check + event
  check();
  window.addEventListener('scroll', check, { passive: true });
})();
