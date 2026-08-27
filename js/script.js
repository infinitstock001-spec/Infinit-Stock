// Menú móvil (navbar)
const navToggle = document.getElementById('navbar-toggle');
const navMenu = document.getElementById('navbar-nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al hacer clic en un enlace (útil en mobile)
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Año dinámico en el footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsHoverTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Animación de aparición al hacer scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }
}

// Tilt 3D en las tarjetas de producto
if (supportsHoverTilt && !prefersReducedMotion) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    const maxTilt = 10;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - y) * maxTilt * 2;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Paralaje sutil del brillo del hero
const hero = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero__glow');
if (hero && heroGlow && supportsHoverTilt && !prefersReducedMotion) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroGlow.style.setProperty('--glow-x', `${x * 40}px`);
    heroGlow.style.setProperty('--glow-y', `${y * 40}px`);
  });
}

// Navbar: achicarse al hacer scroll + resaltar sección activa
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScrollNavbar = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  onScrollNavbar();
  window.addEventListener('scroll', onScrollNavbar, { passive: true });
}

const navLinks = document.querySelectorAll('[data-nav-link]');
const sectionsWithNav = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (navLinks.length && sectionsWithNav.length && 'IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  sectionsWithNav.forEach((section) => navObserver.observe(section));
}

// Contadores animados (estadísticas del hero)
const counters = document.querySelectorAll('.counter');
function animateCounter(el) {
  const target = parseFloat(el.dataset.target || '0');
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function formatNumber(value) {
    const fixed = value.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return decPart ? `${withThousands},${decPart}` : withThousands;
  }

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = `${prefix}${formatNumber(value)}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  if (prefersReducedMotion) {
    el.textContent = `${prefix}${formatNumber(target)}${suffix}`;
  } else {
    requestAnimationFrame(step);
  }
}

if (counters.length) {
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach(animateCounter);
  }
}

// Fade-in de imágenes de producto al cargar
document.querySelectorAll('.card__image').forEach((img) => {
  if (img.complete) {
    img.classList.add('is-loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('is-loaded'));
  }
});

// FAQ acordeón
document.querySelectorAll('.faq__item').forEach((item) => {
  const question = item.querySelector('.faq__question');
  const answer = item.querySelector('.faq__answer');
  if (!question || !answer) return;

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('.faq__item.is-open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq__answer').style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove('is-open');
      question.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('is-open');
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

// Cuenta regresiva de la oferta (se reinicia todos los días a medianoche)
const cdHours = document.getElementById('cd-hours');
const cdMinutes = document.getElementById('cd-minutes');
const cdSeconds = document.getElementById('cd-seconds');

if (cdHours && cdMinutes && cdSeconds) {
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    cdHours.textContent = pad(hours);
    cdMinutes.textContent = pad(minutes);
    cdSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Botón volver arriba
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}
