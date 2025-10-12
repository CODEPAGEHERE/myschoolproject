
  const counters = document.querySelectorAll('.count');
  const speed = 100; // Lower = faster

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Trigger animation when in view
  const section = document.querySelector('.about-stats');
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.unobserve(section);
    }
  }, { threshold: 0.5 });
  
  observer.observe(section)


  

document.getElementById('waitlist-submit').addEventListener('click', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const role = document.getElementById('role').value;
  const school = document.getElementById('school').value.trim();

  if (name && email && role) {
    document.getElementById('waitlist-form').reset();

    // Show popup
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';

    // Hide popup automatically after 3 seconds
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);

    console.log({ name, email, role, school });
  } else {
    alert("⚠️ Please fill in all required fields before joining the waitlist.");
  }
});



