gsap.registerPlugin(ScrollTrigger);

// Scroll-triggered fade-in + slide-up animation
gsap.from(".central-image-stack .rectangle", {
  scrollTrigger: {
    trigger: ".central-image-stack",
    start: "top 80%", // when top hits 80% of viewport
    toggleActions: "play none none none",
  },
  duration: 0.8,
  opacity: 0,
  y: 30,
  ease: "power3.out",
  stagger: 0.15,
});

// Hover scale animation for each rectangle
gsap.utils.toArray(".central-image-stack .rectangle").forEach(rect => {
  rect.addEventListener("mouseenter", () => {
    gsap.to(rect, { scale: 1.05, duration: 0.3, ease: "power1.out" });
  });
  rect.addEventListener("mouseleave", () => {
    gsap.to(rect, { scale: 1, duration: 0.3, ease: "power1.out" });
  });
});




  // MyExamSpace Text
gsap.from("#myexamspace .col-md-6:first-child", {
  scrollTrigger: {
    trigger: "#myexamspace",
    start: "top 96%"
  },
  opacity: 0.9,
  y: 15,
  duration: 0.3,
  ease: "power2.out"
});

// MyExamSpace Image
gsap.from("#myexamspace img", {
  scrollTrigger: {
    trigger: "#myexamspace",
    start: "top 96%"
  },
  opacity: 0.9,
  scale: 0.98,
  duration: 0.3,
  ease: "power2.out"
});


//feature cards animate 
gsap.from(".feature-card", {
    scrollTrigger: {
      trigger: ".features-section",
      start: "top 85%",
    },
    opacity: 0,
    y: 30,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  });

  // Hover animation using GSAP
  document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.04, duration: 0.25, ease: 'power1.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.25, ease: 'power1.out' });
    });
  });
  
  
  
  
document.addEventListener('DOMContentLoaded', function () {
  const marquee = document.querySelector('.marquee-content');
  const container = document.querySelector('.marquee-container');

  const fullWidth = marquee.scrollWidth;
  const containerWidth = container.offsetWidth;

  // GSAP Timeline
  const tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: 'none' }
  });

  tl.to(marquee, {
    x: `-${fullWidth - containerWidth}px`,
    duration: 40,
  });

  // Reverse on hover
  container.addEventListener('mouseenter', () => tl.timeScale(-1));
  container.addEventListener('mouseleave', () => tl.timeScale(1));

  // Mobile drag support
  let dragStartX = 0;
  let dragOffsetX = 0;
  let isDragging = false;

  container.addEventListener('touchstart', function (e) {
    isDragging = true;
    dragStartX = e.touches[0].clientX;
    tl.pause();
  });

  container.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    dragOffsetX = deltaX;
    gsap.set(marquee, { x: `+=${deltaX}` });
    dragStartX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', function () {
    isDragging = false;
    tl.resume();
  });
});
