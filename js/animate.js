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
