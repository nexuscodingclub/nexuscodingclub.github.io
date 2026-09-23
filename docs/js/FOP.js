document.addEventListener('DOMContentLoaded', () => {
  // 1. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a staggered delay for cards inside grids so they animate in one by one
          if (entry.target.classList.contains('detail-card') || 
              entry.target.classList.contains('schedule-card') || 
              entry.target.classList.contains('feature-card')) {
             const staggerIndex = Array.from(entry.target.parentNode.children).indexOf(entry.target);
             entry.target.style.transitionDelay = `${staggerIndex * 100}ms`;
          }
          
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );
  
  revealElements.forEach((element) => {
    observer.observe(element);
  });

  // 2. HERO ORB PARALLAX EFFECT
  // Gives the glowing orbs a subtle floating effect that follows the mouse
  const orbs = document.querySelectorAll('.hero-orb');
  const heroSection = document.querySelector('.hero');
  
  if (heroSection && window.matchMedia("(min-width: 768px)").matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      orbs.forEach((orb, index) => {
        const speed = (index === 0) ? 40 : -30;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
    
    heroSection.addEventListener('mouseleave', () => {
      orbs.forEach(orb => {
        orb.style.transform = `translate(0, 0)`;
        orb.style.transition = 'transform 0.5s ease-out';
      });
    });
    
    heroSection.addEventListener('mouseenter', () => {
      orbs.forEach(orb => {
        orb.style.transition = 'transform 0.1s ease-out';
      });
    });
  }

  // 3. SMOOTH SCROLLING FOR ANCHOR LINKS
  // Ensures links like "View Schedule" scroll down beautifully instead of snapping instantly
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});