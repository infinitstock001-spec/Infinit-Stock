/* ==============================================================
   INFINIT ACADEMY — Medición del embudo

   Registra los pasos de la venta para que sepas dónde se te cae
   la gente. Funciona en tres capas:
     1. Siempre: guarda un resumen en el navegador (lo ves en /admin/).
     2. Si cargaste el Meta Pixel en config.js: manda los eventos a
        Facebook/Instagram, que es lo que necesitás para hacer ads.
     3. Si cargaste Google Analytics: manda los eventos ahí también.
   ============================================================== */
(() => {
  'use strict';

  const CFG = window.IA_CONFIG || {};

  /* ---------- Meta Pixel (Instagram / Facebook Ads) ----------- */
  if (CFG.metaPixel) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    fbq('init', CFG.metaPixel);
    fbq('track', 'PageView');
  }

  /* ---------- Google Analytics -------------------------------- */
  if (CFG.googleAnalytics) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.googleAnalytics;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', CFG.googleAnalytics);
  }

  /* ---------- Registro propio (siempre activo) ---------------- */
  const LIMITE = 400; // no guardamos más que esto para no llenar el navegador

  const guardar = (evento, datos) => {
    try {
      const log = JSON.parse(localStorage.getItem('ia_eventos') || '[]');
      log.push({ e: evento, d: datos || {}, p: location.pathname, t: Date.now() });
      localStorage.setItem('ia_eventos', JSON.stringify(log.slice(-LIMITE)));
    } catch (_) { /* modo incógnito o storage lleno: seguimos igual */ }
  };

  /* Equivalencias con los eventos estándar de Meta, para que la
     publicidad pueda optimizar por conversión. */
  const META = {
    ver_curso: 'ViewContent',
    lead: 'Lead',
    checkout_iniciado: 'InitiateCheckout',
    compra_confirmada: 'Purchase',
  };

  const track = (evento, datos = {}) => {
    guardar(evento, datos);

    if (window.fbq && META[evento]) {
      const p = {};
      if (datos.producto) p.content_name = datos.producto;
      if (datos.valor) { p.value = datos.valor; p.currency = 'ARS'; }
      fbq('track', META[evento], p);
    }

    if (window.gtag) {
      gtag('event', evento, { ...datos, currency: 'ARS' });
    }
  };

  /* ---------- Enganches automáticos --------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Click en cualquier botón que lleve al checkout
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href*="checkout"]');
      if (!a) return;
      const plan = new URLSearchParams(a.search || '').get('plan') || 'sin-plan';
      const prod = (window.ACADEMY && ACADEMY.productos[plan]) || null;
      track('click_comprar', { producto: plan, valor: prod ? prod.precio : 0 });
    });

    // Click en cualquier link de WhatsApp
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href*="wa.me"]');
      if (a) track('click_whatsapp', {});
    });

    // Cuánto de la página llegó a ver (25 / 50 / 75 / 100 %)
    const hitos = [25, 50, 75, 100];
    const vistos = new Set();
    window.addEventListener('scroll', () => {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      if (alto <= 0) return;
      const pct = Math.round((window.scrollY / alto) * 100);
      hitos.forEach((h) => {
        if (pct >= h && !vistos.has(h)) { vistos.add(h); track('scroll', { pct: h }); }
      });
    }, { passive: true });

    // Vio la sección de precios
    const precios = document.querySelector('[data-planes]');
    if (precios) {
      new IntersectionObserver((ents, obs) => {
        ents.forEach((en) => {
          if (en.isIntersecting) { track('ver_precios', {}); obs.disconnect(); }
        });
      }, { threshold: 0.3 }).observe(precios);
    }
  });

  window.track = track;
})();
