// ===== NAVIGASI =====
const nav = document.getElementById('nav');
const navToggle = document.querySelector('.navtoggle');
const navLinks = document.querySelector('.navlinks');

// Scroll: navbar background
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Toggle mobile menu
navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('active');
  navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Tutup menu saat klik link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.textContent = '☰';
  });
});

// Tutup menu saat klik di luar
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    navLinks.classList.remove('active');
    navToggle.textContent = '☰';
  }
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id], header[class]');
const navItems = navLinks.querySelectorAll('a');

function highlightNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id') || '';
    }
  });
  navItems.forEach(a => {
    a.classList.remove('active-link');
    const href = a.getAttribute('href');
    if (href === '#' + current || (current === '' && href === '#')) {
      a.classList.add('active-link');
    }
  });
}
window.addEventListener('scroll', highlightNav);
highlightNav();

// ===== REVEAL ON SCROLL =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH YEAR UPDATE =====
const yearEl = document.querySelector('.foot-bottom span');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace(/© \d{4}/, `© ${new Date().getFullYear()}`);
}
