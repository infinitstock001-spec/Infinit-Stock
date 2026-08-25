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
