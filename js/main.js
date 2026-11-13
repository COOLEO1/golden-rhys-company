const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    menuToggle.setAttribute('aria-label', nav.classList.contains('open') ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.textContent = '☰';
    });
  });
}

// English / Chichewa language switch
const languageBtn = document.getElementById('languageBtn');
let language = localStorage.getItem('gr-language') || 'en';

function applyLanguage() {
  document.documentElement.lang = language === 'ny' ? 'ny' : 'en';
  document.querySelectorAll('[data-en][data-ny]').forEach(element => {
    element.innerHTML = element.dataset[language];
  });
  if (languageBtn) {
    languageBtn.textContent = language === 'en' ? '🇲🇼 NY' : '🇬🇧 EN';
  }
}

applyLanguage();

if (languageBtn) {
  languageBtn.addEventListener('click', () => {
    language = language === 'en' ? 'ny' : 'en';
    localStorage.setItem('gr-language', language);
    applyLanguage();
  });
}

// Reveal sections as they enter the screen
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}

// Subtle pointer glow on devices with a mouse
const glow = document.querySelector('.cursor-glow');
if (glow) {
  window.addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse') {
      glow.style.left = event.clientX + 'px';
      glow.style.top = event.clientY + 'px';
    }
  });
}

// Header background on scroll
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}
