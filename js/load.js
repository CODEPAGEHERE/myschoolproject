window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader-wrapper');
    if (loader) loader.style.display = 'none';
  }, 2000);
});
