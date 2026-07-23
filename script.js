// Sticky header on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Active nav link highlight based on scroll position
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', highlightNav);

// 3D tilt: hero portrait follows the cursor within the hero section
const heroSection = document.getElementById('home');
const heroTilt = document.getElementById('heroTilt');

if (heroSection && heroTilt && window.matchMedia('(pointer: fine)').matches) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroTilt.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const max = 10; // degrees
    heroTilt.style.setProperty('--ry', `${(dx * max).toFixed(2)}deg`);
    heroTilt.style.setProperty('--rx', `${(-dy * max).toFixed(2)}deg`);
  });

  heroSection.addEventListener('mouseleave', () => {
    heroTilt.style.setProperty('--rx', '0deg');
    heroTilt.style.setProperty('--ry', '0deg');
  });
}

// 3D tilt: About illustration, gentler range
const aboutSection = document.getElementById('about');
const aboutTilt = document.getElementById('aboutTilt');

if (aboutSection && aboutTilt && window.matchMedia('(pointer: fine)').matches) {
  aboutSection.addEventListener('mousemove', (e) => {
    const rect = aboutTilt.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const max = 6;
    aboutTilt.style.setProperty('--ry', `${(dx * max).toFixed(2)}deg`);
    aboutTilt.style.setProperty('--rx', `${(-dy * max).toFixed(2)}deg`);
  });

  aboutSection.addEventListener('mouseleave', () => {
    aboutTilt.style.setProperty('--rx', '0deg');
    aboutTilt.style.setProperty('--ry', '0deg');
  });
}

// 3D tilt + glare: project cards
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.project-card.tilt-card').forEach((card) => {
    const max = 5;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty('--ry', `${((px - 0.5) * max * 2).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${(-(py - 0.5) * max * 2).toFixed(2)}deg`);
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));
