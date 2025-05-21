
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';

    // After transition ends, remove loader from DOM to improve performance
    loader.addEventListener('transitionend', () => {
      loader.style.display = 'none';
    });
  });
