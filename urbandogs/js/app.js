/* =========================================================================
   URBAN DOG'S — Aplicación
   Renderizado de la carta, armador, carrito, efectos y medición.
   ========================================================================= */
(() => {
'use strict';

const CFG  = window.UD_CONFIG;
const CART = window.UD_CART;
const ART  = window.UD_ART;

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const money = CART.money;
const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (m) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]
));

/* ===================================================================
   0. Defs de los gradientes SVG
   =================================================================== */
document.body.insertAdjacentHTML('afterbegin', ART.defs());

/* ===================================================================
   1. Medición (solo si hay IDs cargados en config.js)
   =================================================================== */
const track = (evento, datos = {}) => {
  if (window.gtag) window.gtag('event', evento, datos);
  if (window.fbq)  window.fbq('trackCustom', evento, datos);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: evento }, datos));
};

(function medicion() {
  const ga = (CFG.medicion.googleAnalytics || '').trim();
  if (ga) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ga);
  }
  const px = (CFG.medicion.metaPixel || '').trim();
  if (px) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', px);
    window.fbq('track', 'PageView');
  }
})();

/* ===================================================================
   2. Datos de contacto en el DOM
   =================================================================== */
const waLink = (texto) => {
  const num = String(CFG.contacto.whatsapp || '').replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(texto || `¡Hola ${CFG.marca.nombre}! Quería hacer una consulta.`)}`;
};
const mapsLink = () => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CFG.contacto.mapsQuery || CFG.contacto.direccion);

(function contacto() {
  const c = CFG.contacto;
  const dirTxt = `${c.direccion} — ${c.barrio}`;

  const set = (sel, fn) => { const el = $(sel); if (el) fn(el); };

  set('#dato-direccion', (el) => { el.textContent = dirTxt; });
  set('#dato-tel', (el) => { el.textContent = c.telefonoVisible; el.href = waLink(); el.target = '_blank'; el.rel = 'noopener'; });
  set('#dato-mail', (el) => { el.textContent = c.email; el.href = 'mailto:' + c.email; });
  set('#btn-maps', (el) => { el.href = mapsLink(); });
  set('#btn-llamar', (el) => { el.href = 'tel:' + c.telefonoVisible.replace(/[^\d+]/g, ''); });
  set('#fab-wa', (el) => { el.href = waLink(); });
  set('#faq-wa', (el) => { el.href = waLink(); });
  set('#foot-wa', (el) => { el.href = waLink(); el.textContent = c.telefonoVisible; });
  set('#foot-mail', (el) => { el.href = 'mailto:' + c.email; el.textContent = c.email; });
  set('#foot-dir', (el) => { el.href = mapsLink(); el.textContent = dirTxt; });
  set('#anio', (el) => { el.textContent = new Date().getFullYear(); });

  // Zonas de reparto
  const zonas = $('#zonas');
  if (zonas) zonas.innerHTML = (CFG.ventas.zonas || []).map((z) => `<span class="chip">${esc(z)}</span>`).join('');

  // Medios de pago
  const pagos = $('#footer-pagos');
  if (pagos) pagos.innerHTML = (CFG.ventas.pagos || []).map((p) => `<span class="chip">${esc(p)}</span>`).join('');

  // Redes
  const redes = $('#footer-redes');
  if (redes) {
    const ico = {
      instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
      tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2.3 1.8 3.8 4 4v3c-1.5.1-2.9-.3-4.1-1.1v6.4a5.9 5.9 0 1 1-5-5.8v3.1a2.8 2.8 0 1 0 2 2.7V3h3.1z"/></svg>',
      facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.7 3 10.7 4.6 10.7 7v2H8.6v3h2.1v9h3.3v-9h2.3l.4-3H14z"/></svg>',
      whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>'
    };
    const links = [];
    if (c.instagram) links.push(['instagram', c.instagram, 'Instagram']);
    if (c.tiktok)    links.push(['tiktok', c.tiktok, 'TikTok']);
    if (c.facebook)  links.push(['facebook', c.facebook, 'Facebook']);
    links.push(['whatsapp', waLink(), 'WhatsApp']);
    redes.innerHTML = links.map(([k, href, label]) =>
      `<a class="footer__red" href="${href}" target="_blank" rel="noopener" aria-label="${label}">${ico[k]}</a>`
    ).join('');
  }
})();

/* ===================================================================
   3. Horarios y estado abierto / cerrado
   =================================================================== */
const Horario = (() => {
  const min = (hhmm) => {
    const [h, m] = String(hhmm).split(':').map(Number);
    return h * 60 + (m || 0);
  };
  const delDia = (d) => (CFG.horarios || []).find((x) => x.dia === d);

  function abiertoAhora(now = new Date()) {
    const mins = now.getHours() * 60 + now.getMinutes();
    for (const off of [0, 1]) {                       // hoy y el turno que arrancó ayer
      const d = (now.getDay() - off + 7) % 7;
      const h = delDia(d);
      if (!h || h.cerrado) continue;
      const a = min(h.abre), c0 = min(h.cierra);
      const cruzaMedianoche = c0 <= a;
      if (off === 0) {
        if (!cruzaMedianoche && mins >= a && mins < c0) return { abierto: true, cierra: h.cierra };
        if (cruzaMedianoche && mins >= a) return { abierto: true, cierra: h.cierra };
      } else if (cruzaMedianoche && mins < c0) {
        return { abierto: true, cierra: h.cierra };
      }
    }
    // Próxima apertura
    for (let i = 0; i < 8; i++) {
      const d = (now.getDay() + i) % 7;
      const h = delDia(d);
      if (!h || h.cerrado) continue;
      if (i === 0 && mins >= min(h.abre)) continue;
      return { abierto: false, proximo: (i === 0 ? 'hoy' : i === 1 ? 'mañana' : h.nombre.toLowerCase()), abre: h.abre };
    }
    return { abierto: false };
  }

  function pintar() {
    const ul = $('#horarios');
    const hoy = new Date().getDay();
    if (ul) {
      ul.innerHTML = (CFG.horarios || [])
        .slice()
        .sort((a, b) => ((a.dia + 6) % 7) - ((b.dia + 6) % 7))
        .map((h) => `<li class="${h.dia === hoy ? 'is-hoy' : ''} ${h.cerrado ? 'is-cerrado' : ''}">
            <span>${esc(h.nombre)}${h.dia === hoy ? ' · hoy' : ''}</span>
            <span>${h.cerrado ? 'Cerrado' : esc(h.abre) + ' a ' + esc(h.cierra)}</span>
          </li>`).join('');
    }

    const est = $('#nav-estado');
    if (est) {
      const e = abiertoAhora();
      est.className = 'nav__state ' + (e.abierto ? 'nav__state--open' : 'nav__state--close');
      est.querySelector('span').textContent = e.abierto
        ? `Abierto hasta las ${e.cierra}`
        : (e.abre ? `Cerrado · abre ${e.proximo} ${e.abre}` : 'Cerrado');
    }
  }

  return { pintar, abiertoAhora };
})();
Horario.pintar();
setInterval(Horario.pintar, 60000);

/* ===================================================================
   4. Barra de promo con cuenta regresiva
   =================================================================== */
(function promo() {
  const bar = $('#promobar');
  if (!bar || !CFG.promo.activa) return;
  if (sessionStorage.getItem('ud.promo.cerrada') === '1') return;

  bar.hidden = false;
  $('#promo-texto').textContent = CFG.promo.texto;

  const cuenta = $('#promo-count');
  const tick = () => {
    const now = new Date();
    const [h, m] = String(CFG.promo.venceHoy || '23:59').split(':').map(Number);
    const fin = new Date(now);
    fin.setHours(h, m || 0, 0, 0);
    if (fin <= now) fin.setDate(fin.getDate() + 1);
    let s = Math.floor((fin - now) / 1000);
    const hh = String(Math.floor(s / 3600)).padStart(2, '0');
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    cuenta.textContent = `${hh}:${mm}:${ss}`;
  };
  tick();
  setInterval(tick, 1000);

  $('#promo-close').addEventListener('click', () => {
    bar.classList.add('is-hidden');
    try { sessionStorage.setItem('ud.promo.cerrada', '1'); } catch (e) {}
  });
})();

/* ===================================================================
   5. Preloader + arte del hero
   =================================================================== */
$('#pre-dog').innerHTML = ART.pancho({ pan: 'brioche', salchicha: 'clasica', toppings: [], salsas: ['ketchup', 'mostaza'] }, { vapor: false });
$('#hero-dog').innerHTML = ART.pancho(
  { pan: 'brioche', salchicha: 'doble', toppings: ['bacon', 'cebolla'], salsas: ['cheddar', 'ketchup'] },
  { alt: 'Pancho artesanal Urban Dog\'s con doble salchicha ahumada, bacon y cheddar', seed: 'hero' }
);
const heroArtEl = $('#historia-art');
if (heroArtEl) heroArtEl.innerHTML = ART.pancho({ pan: 'rustico', salchicha: 'parrillera', toppings: ['criolla', 'provoleta'], salsas: ['chimi'] }, { seed: 'historia', alt: 'Pancho criollo con chimichurri y provoleta' });

window.addEventListener('load', () => {
  setTimeout(() => $('#pre').classList.add('is-off'), 380);
});
// Salvavidas: si algo tarda demasiado, sacamos el preloader igual.
setTimeout(() => $('#pre').classList.add('is-off'), 3800);

/* ===================================================================
   6. Tickers
   =================================================================== */
(function tickers() {
  const frases1 = ['Salchicha ahumada 12 h', 'Pan brioche del día', 'Salsas caseras', 'Envío en 35 min', 'Producción propia', 'Sin conservantes'];
  const frases2 = ['Combos con hasta 22% off', 'Retirá y ahorrate el envío', 'Opción veggie real', 'Eventos desde 25 personas', 'Pedí por WhatsApp', '2x1 los martes'];
  const armar = (id, frases) => {
    const el = $(id);
    if (!el) return;
    const grupo = `<div class="ticker__group">${frases.map((f) => `<span class="ticker__item">${esc(f)}</span>`).join('')}</div>`;
    el.innerHTML = grupo + grupo;
  };
  armar('#ticker-1', frases1);
  armar('#ticker-2', frases2);
})();

/* ===================================================================
   6b. El titular del hero nunca se corta
   Si la tipografía tarda en cargar o la pantalla es angosta, bajamos el
   cuerpo hasta que cada línea entre completa.
   =================================================================== */
(function ajustarTitular() {
  const t = document.querySelector('.hero__title');
  if (!t) return;
  const lineas = () => Array.from(t.querySelectorAll('.line > span'));

  function ajustar() {
    t.style.fontSize = '';
    const base = parseFloat(getComputedStyle(t).fontSize);
    let px = base;
    const entra = () => lineas().every((l) => l.scrollWidth <= t.clientWidth + 1);
    let guardia = 60;
    while (!entra() && px > 22 && guardia--) {
      px -= Math.max(1, px * .04);
      t.style.fontSize = px.toFixed(1) + 'px';
    }
  }

  ajustar();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustar);
  let tid;
  window.addEventListener('resize', () => { clearTimeout(tid); tid = setTimeout(ajustar, 160); });
})();

/* ===================================================================
   7. Navegación
   =================================================================== */
(function nav() {
  const bar = $('#nav');
  const burger = $('#burger');
  const links = $('#nav-links');

  const onScroll = () => {
    bar.classList.toggle('is-stuck', window.scrollY > 24);
    const doc = document.documentElement;
    const p = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
    $('#progreso').style.width = (p * 100) + '%';
    $('#fab-top').classList.toggle('is-on', window.scrollY > 620);
    $('#mobar').classList.toggle('is-on', window.scrollY > 520);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', () => {
    const abierto = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', abierto);
    burger.setAttribute('aria-expanded', String(abierto));
  });
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Marcado de la sección activa
  const secciones = $$('[data-nav]').map((a) => ({ a, sec: $(a.getAttribute('href')) })).filter((x) => x.sec);
  if ('IntersectionObserver' in window && secciones.length) {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (!en.isIntersecting) return;
        secciones.forEach(({ a, sec }) => a.classList.toggle('is-active', sec === en.target));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secciones.forEach(({ sec }) => io.observe(sec));
  }

  $('#fab-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: noMotion ? 'auto' : 'smooth' }));
})();

/* ===================================================================
   8. Revelado al hacer scroll + contadores + tilt
   =================================================================== */
let ioReveal = null;
function revelar(scope) {
  const revs = $$('.rv', scope || document).filter((r) => !r.classList.contains('is-in'));
  if (!revs.length) return;
  if (!('IntersectionObserver' in window) || noMotion) {
    revs.forEach((r) => r.classList.add('is-in'));
    return;
  }
  if (!ioReveal) {
    ioReveal = new IntersectionObserver((en, obs) => {
      en.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -60px' });
  }
  revs.forEach((r) => ioReveal.observe(r));
}

(function efectos() {
  revelar();

  // Contadores
  const contar = (el) => {
    const fin = parseFloat(el.dataset.count);
    const pre = el.dataset.pre || '';
    const suf = el.dataset.suf || '';
    const dec = el.dataset.fmt === 'dec';
    if (noMotion) { el.textContent = pre + (dec ? (fin / 10).toLocaleString('es-AR', { minimumFractionDigits: 1 }) : fin.toLocaleString('es-AR')) + suf; return; }
    const t0 = performance.now(), dur = 1500;
    const paso = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const v = fin * (1 - Math.pow(1 - p, 3));
      el.textContent = pre + (dec ? (v / 10).toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : Math.round(v).toLocaleString('es-AR')) + suf;
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };
  const nums = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((en, obs) => {
      en.forEach((e) => { if (e.isIntersecting) { contar(e.target); obs.unobserve(e.target); } });
    }, { threshold: .5 });
    nums.forEach((n) => io2.observe(n));
  } else { nums.forEach(contar); }

  // Reflejo que sigue al puntero
  if (finePointer && !noMotion) {
    document.addEventListener('pointermove', (e) => {
      const t = e.target.closest('.pilar, .card');
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      t.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    }, { passive: true });
  }

  // Cursor personalizado
  if (finePointer && !noMotion) {
    const cur = $('#cursor');
    cur.style.display = 'block';
    let x = 0, y = 0, cx = 0, cy = 0;
    document.addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (x - cx) * .22; cy += (y - cy) * .22;
      cur.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('pointerover', (e) => {
      cur.classList.toggle('is-hover', !!e.target.closest('a, button, .op, .card, .filtro, input, select, textarea'));
    });
  }
})();

/* Inclinación 3D de las tarjetas */
function tilt(el, fuerza = 7) {
  if (!finePointer || noMotion) return;
  let raf = null;
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5;
    const py = (e.clientY - r.top) / r.height - .5;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${(-py * fuerza).toFixed(2)}deg) rotateY(${(px * fuerza).toFixed(2)}deg) translateY(-6px)`;
    });
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
}

/* ===================================================================
   9. Carta
   =================================================================== */
const Menu = (() => {
  const grid = $('#menu-grid');
  const filtros = $('#filtros');
  const buscador = $('#buscador');
  let cat = 'todos';
  let q = '';

  function tarjeta(p) {
    const chips = (p.tags || []).map((t) => {
      const txt = { picante: '🌶️ Picante', veggie: '🌱 Veggie', nuevo: '✨ Nuevo', top: '🔥 Más pedido' }[t] || t;
      return `<span class="chip chip--${t}">${txt}</span>`;
    }).join('');

    const badge = p.badge
      ? `<span class="badge-sticker ${p.antes ? 'badge-sticker--red' : ''}">${esc(p.badge)}</span>`
      : '';

    const ing = (p.ingredientes || []).length
      ? `<div class="card__flip">
           <h4>Qué lleva</h4>
           <ul>${p.ingredientes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
           <button class="btn btn--sm btn--ghost card__flip-close" type="button" data-cerrar>Volver</button>
         </div>`
      : '';

    const info = ing
      ? `<button class="card__info" type="button" data-info aria-label="Ver ingredientes de ${esc(p.nombre)}">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.1"/></svg>
         </button>`
      : '';

    return `<article class="card" data-cat="${p.cat}" data-id="${p.id}" data-buscar="${esc((p.nombre + ' ' + p.desc + ' ' + (p.ingredientes || []).join(' ')).toLowerCase())}">
      ${badge}
      <div class="card__media">
        <span class="card__glow" aria-hidden="true"></span>
        ${ART.paraProducto(p)}
      </div>
      <div class="card__body">
        <div class="card__top">
          <h3 class="card__name">${esc(p.nombre)}</h3>
          <div class="card__price">
            ${p.antes ? `<s>${money(p.antes)}</s>` : ''}
            <b>${money(p.precio)}</b>
          </div>
        </div>
        <p class="card__desc">${esc(p.desc)}</p>
        ${chips ? `<div class="card__chips">${chips}</div>` : ''}
        <div class="card__foot">
          <button class="btn btn--sm" type="button" data-add>Agregar</button>
          ${info}
        </div>
      </div>
      ${ing}
    </article>`;
  }

  function pintar() {
    const lista = UD_MENU.filter((p) => {
      if (p.activo === false) return false;
      if (cat !== 'todos' && p.cat !== cat) return false;
      if (q && !(p.nombre + ' ' + p.desc + ' ' + (p.ingredientes || []).join(' ')).toLowerCase().includes(q)) return false;
      return true;
    });

    grid.innerHTML = lista.length
      ? lista.map(tarjeta).join('')
      : `<div class="menu__vacio"><b>No encontramos nada con eso</b>
           <p>Probá con otra palabra o mirá toda la carta.</p>
           <button class="btn btn--sm" type="button" data-reset>Ver todo</button></div>`;

    $$('.card', grid).forEach((c) => tilt(c, 6));
  }

  function pintarFiltros() {
    filtros.innerHTML = UD_CATEGORIAS.map((c) =>
      `<button class="filtro ${c.id === cat ? 'is-active' : ''}" type="button" role="tab"
        aria-selected="${c.id === cat}" data-cat="${c.id}">
        <span aria-hidden="true">${c.icono}</span> ${esc(c.nombre)}
      </button>`).join('');
  }

  filtros.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    cat = b.dataset.cat;
    pintarFiltros();
    pintar();
    track('filtro_carta', { categoria: cat });
  });

  let tBusq;
  buscador.addEventListener('input', () => {
    clearTimeout(tBusq);
    tBusq = setTimeout(() => { q = buscador.value.trim().toLowerCase(); pintar(); }, 180);
  });

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');

    if (e.target.closest('[data-reset]')) {
      cat = 'todos'; q = ''; buscador.value = '';
      pintarFiltros(); pintar();
      return;
    }
    if (!card) return;
    const p = UD_MENU.find((x) => x.id === card.dataset.id);
    if (!p) return;

    if (e.target.closest('[data-info]')) { card.classList.add('is-flipped'); return; }
    if (e.target.closest('[data-cerrar]')) { card.classList.remove('is-flipped'); return; }

    if (e.target.closest('[data-add]')) {
      CART.add(p);
      volar(card.querySelector('.card__media'));
      card.classList.add('is-added');
      setTimeout(() => card.classList.remove('is-added'), 600);
      toast(`${p.nombre} va al pedido 🌭`);
      track('add_to_cart', { item: p.id, valor: p.precio });
    }
  });

  pintarFiltros();
  pintar();
  return { pintar };
})();

/* Combos destacados en su propia sección */
(function combos() {
  const grid = $('#combos-grid');
  if (!grid) return;
  const lista = UD_MENU.filter((p) => p.cat === 'combos' && p.activo !== false);

  grid.innerHTML = lista.map((p, i) => `
    <article class="combo ${i === 1 ? 'combo--destacado' : ''} rv" data-d="${i + 1}" data-id="${p.id}">
      <div class="combo__media">${ART.paraProducto(p)}</div>
      <div class="combo__body">
        <h3 class="combo__name">${esc(p.nombre)}</h3>
        <p class="combo__desc">${esc(p.desc)}</p>
        <ul class="combo__list">
          ${(p.ingredientes || []).map((x) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${esc(x)}</li>`).join('')}
        </ul>
        ${p.badge ? `<span class="combo__ahorro">${esc(p.badge)}</span>` : ''}
        <div class="combo__precio">
          <b>${money(p.precio)}</b>
          ${p.antes ? `<s>${money(p.antes)}</s>` : ''}
        </div>
        <button class="btn ${i === 1 ? 'btn--red' : ''} btn--block" type="button" data-add-combo>Agregar el combo</button>
      </div>
    </article>`).join('');

  revelar(grid);

  grid.addEventListener('click', (e) => {
    if (!e.target.closest('[data-add-combo]')) return;
    const art = e.target.closest('.combo');
    const p = UD_MENU.find((x) => x.id === art.dataset.id);
    if (!p) return;
    CART.add(p);
    volar(art.querySelector('.combo__media'));
    toast(`${p.nombre} va al pedido 🔥`);
    track('add_to_cart', { item: p.id, valor: p.precio });
  });
})();

/* ===================================================================
   10. Armá tu pancho
   =================================================================== */
const Builder = (() => {
  const cont = $('#builder-pasos');
  if (!cont) return {};
  const B = UD_BUILDER;
  const sel = { pan: 'brioche', salchicha: 'clasica', toppings: [], salsas: ['ketchup', 'mostaza'] };

  cont.innerHTML = B.pasos.map((paso, i) => `
    <section class="paso">
      <div class="paso__head">
        <span class="paso__n">${i + 1}</span>
        <h3>${esc(paso.titulo)}</h3>
      </div>
      <p class="paso__ayuda">${esc(paso.ayuda)}</p>
      <div class="paso__ops" data-paso="${paso.id}" data-tipo="${paso.tipo}">
        ${paso.opciones.map((o) => `
          <label class="op">
            <input type="${paso.tipo === 'unico' ? 'radio' : 'checkbox'}"
                   name="ud-${paso.id}" value="${o.id}"
                   ${estaElegida(paso.id, o.id) ? 'checked' : ''}>
            <span class="op__tick" aria-hidden="true"></span>
            <span class="op__txt">${esc(o.nombre)}</span>
            <span class="op__mas ${o.precio === 0 ? 'op__mas--free' : ''}" data-precio="${o.precio}">${o.precio === 0 ? 'incluido' : '+' + money(o.precio)}</span>
          </label>`).join('')}
      </div>
    </section>`).join('');

  function estaElegida(pasoId, opId) {
    const v = sel[pasoId];
    return Array.isArray(v) ? v.includes(opId) : v === opId;
  }

  function precio() {
    let total = B.base;
    const detalle = [];

    B.pasos.forEach((paso) => {
      if (paso.tipo === 'unico') {
        const o = paso.opciones.find((x) => x.id === sel[paso.id]);
        if (o) { total += o.precio; if (o.precio) detalle.push(o.nombre); }
      } else {
        const elegidas = paso.opciones.filter((x) => (sel[paso.id] || []).includes(x.id));
        // Las primeras "gratis" no se cobran: descontamos las más baratas.
        const ordenadas = elegidas.slice().sort((a, b) => a.precio - b.precio);
        const libres = paso.gratis || 0;
        ordenadas.forEach((o, i) => { if (i >= libres) total += o.precio; });
      }
    });
    return total;
  }

  function textoPedido() {
    const partes = [];
    B.pasos.forEach((paso) => {
      const v = sel[paso.id];
      if (paso.tipo === 'unico') {
        const o = paso.opciones.find((x) => x.id === v);
        if (o) partes.push(`${paso.id === 'pan' ? 'Pan' : 'Salchicha'}: ${o.nombre}`);
      } else if ((v || []).length) {
        const nombres = paso.opciones.filter((x) => v.includes(x.id)).map((x) => x.nombre);
        partes.push(`${paso.id === 'toppings' ? 'Toppings' : 'Salsas'}: ${nombres.join(', ')}`);
      }
    });
    return partes.join(' · ');
  }

  function refrescar() {
    const p = precio();
    $('#builder-art').innerHTML = ART.pancho(sel, { seed: 'builder-' + JSON.stringify(sel), alt: 'Vista previa de tu pancho' });
    $('#builder-precio').textContent = money(p);
    $('#builder-detalle').textContent = textoPedido() || 'Elegí las opciones para armarlo.';
    const extras = p - B.base;
    $('#builder-extras').textContent = extras > 0 ? `incluye ${money(extras)} en extras` : 'precio base';

    // Marca cuáles toppings/salsas quedan sin cargo en este momento
    B.pasos.filter((x) => x.tipo === 'multiple').forEach((paso) => {
      const elegidas = paso.opciones.filter((x) => (sel[paso.id] || []).includes(x.id))
        .slice().sort((a, b) => a.precio - b.precio).slice(0, paso.gratis || 0).map((x) => x.id);
      $$(`[data-paso="${paso.id}"] .op`).forEach((label) => {
        const id = label.querySelector('input').value;
        const et = label.querySelector('.op__mas');
        const base = paso.opciones.find((x) => x.id === id);
        if (elegidas.includes(id)) { et.textContent = 'sin cargo'; et.classList.add('op__mas--free'); }
        else { et.textContent = base.precio === 0 ? 'incluido' : '+' + money(base.precio); et.classList.toggle('op__mas--free', base.precio === 0); }
      });
    });
  }

  cont.addEventListener('change', (e) => {
    const input = e.target;
    if (!input.name || !input.name.startsWith('ud-')) return;
    const pasoId = input.name.slice(3);
    const paso = B.pasos.find((x) => x.id === pasoId);
    if (!paso) return;

    if (paso.tipo === 'unico') {
      sel[pasoId] = input.value;
    } else {
      sel[pasoId] = sel[pasoId] || [];
      if (input.checked) { if (!sel[pasoId].includes(input.value)) sel[pasoId].push(input.value); }
      else sel[pasoId] = sel[pasoId].filter((v) => v !== input.value);
    }
    refrescar();
  });

  $('#builder-add').addEventListener('click', () => {
    const p = precio();
    CART.add({ id: 'custom', nombre: 'Tu Urban Dog (armado)', precio: p, art: JSON.parse(JSON.stringify(sel)) },
      { extra: textoPedido(), art: JSON.parse(JSON.stringify(sel)) });
    volar($('#builder-art'));
    toast('Tu pancho armado va al pedido 🎉');
    track('add_to_cart', { item: 'custom', valor: p });
  });

  refrescar();
  return { refrescar };
})();

/* ===================================================================
   11. Reseñas (carrusel con arrastre)
   =================================================================== */
(function resenas() {
  const track_ = $('#resenas-track');
  const vp = $('#resenas-vp');
  const dots = $('#res-dots');
  if (!track_) return;

  const lista = CFG.resenas || [];
  track_.innerHTML = lista.map((r) => `
    <article class="resena">
      <div class="resena__stars" aria-label="${r.estrellas} de 5 estrellas">${'★'.repeat(r.estrellas)}${'☆'.repeat(5 - r.estrellas)}</div>
      <p class="resena__txt">${esc(r.texto)}</p>
      <div class="resena__pie">
        <span class="resena__av" aria-hidden="true">${esc(r.nombre.charAt(0))}</span>
        <span><b>${esc(r.nombre)}</b><span>${esc(r.zona)}</span></span>
        <span class="resena__verif" title="Pedido verificado">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
        </span>
      </div>
    </article>`).join('');

  let i = 0;
  const porVista = () => {
    const w = vp.clientWidth;
    return w > 1000 ? 3 : w > 640 ? 2 : 1;
  };
  const maxIndex = () => Math.max(0, lista.length - porVista());

  function ir(n) {
    i = Math.max(0, Math.min(maxIndex(), n));
    const card = track_.querySelector('.resena');
    if (!card) return;
    const paso = card.getBoundingClientRect().width + 18;
    track_.style.transform = `translateX(${-i * paso}px)`;
    pintarDots();
  }

  function pintarDots() {
    dots.innerHTML = Array.from({ length: maxIndex() + 1 })
      .map((_, n) => `<button class="resenas__dot ${n === i ? 'is-on' : ''}" type="button" data-i="${n}" aria-label="Ir a la reseña ${n + 1}"></button>`).join('');
  }
  dots.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (b) ir(+b.dataset.i);
  });

  $('#res-prev').addEventListener('click', () => ir(i - 1));
  $('#res-next').addEventListener('click', () => ir(i >= maxIndex() ? 0 : i + 1));

  // Arrastre con mouse o dedo
  let x0 = null;
  vp.addEventListener('pointerdown', (e) => { x0 = e.clientX; vp.classList.add('is-drag'); });
  vp.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const d = e.clientX - x0;
    if (Math.abs(d) > 45) ir(i + (d < 0 ? 1 : -1));
    x0 = null; vp.classList.remove('is-drag');
  });
  vp.addEventListener('pointerleave', () => { x0 = null; vp.classList.remove('is-drag'); });

  window.addEventListener('resize', () => ir(i));
  ir(0);

  if (!noMotion) {
    let auto = setInterval(() => ir(i >= maxIndex() ? 0 : i + 1), 5200);
    vp.addEventListener('pointerenter', () => clearInterval(auto));
    vp.addEventListener('pointerleave', () => { auto = setInterval(() => ir(i >= maxIndex() ? 0 : i + 1), 5200); });
  }
})();

/* ===================================================================
   12. Preguntas frecuentes
   =================================================================== */
(function faq() {
  const cont = $('#faq-list');
  if (!cont) return;
  cont.innerHTML = UD_FAQ.map((f, i) => `
    <div class="faq__item">
      <button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-${i}">
        ${esc(f.q)}
        <span class="faq__ico" aria-hidden="true"></span>
      </button>
      <div class="faq__a" id="faq-a-${i}"><div><p>${esc(f.a)}</p></div></div>
    </div>`).join('');

  cont.addEventListener('click', (e) => {
    const b = e.target.closest('.faq__q');
    if (!b) return;
    const item = b.parentElement;
    const abierto = item.classList.contains('is-open');
    $$('.faq__item', cont).forEach((x) => {
      x.classList.remove('is-open');
      x.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
    });
    if (!abierto) {
      item.classList.add('is-open');
      b.setAttribute('aria-expanded', 'true');
    }
  });
})();

/* ===================================================================
   13. Avisos y animación de "agregar al carrito"
   =================================================================== */
let toastT;
function toast(txt, err = false) {
  const t = $('#toast');
  $('#toast-txt').textContent = txt;
  t.classList.toggle('toast--err', !!err);
  t.classList.add('is-on');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('is-on'), 3200);
}

function volar(origen) {
  if (!origen || noMotion) return;
  const destino = $('#cart-btn');
  const r0 = origen.getBoundingClientRect();
  const r1 = destino.getBoundingClientRect();
  const clon = origen.cloneNode(true);

  clon.classList.add('fly');
  clon.style.left = r0.left + 'px';
  clon.style.top = r0.top + 'px';
  clon.style.width = r0.width + 'px';
  clon.style.height = r0.height + 'px';
  clon.style.position = 'fixed';
  document.body.appendChild(clon);

  requestAnimationFrame(() => {
    const dx = (r1.left + r1.width / 2) - (r0.left + r0.width / 2);
    const dy = (r1.top + r1.height / 2) - (r0.top + r0.height / 2);
    clon.style.transform = `translate(${dx}px, ${dy}px) scale(.08) rotate(22deg)`;
    clon.style.opacity = '0';
  });
  setTimeout(() => clon.remove(), 900);

  destino.classList.add('is-bump');
  setTimeout(() => destino.classList.remove('is-bump'), 520);
}

/* ===================================================================
   14. Carrito: interfaz
   =================================================================== */
const CartUI = (() => {
  const drawer = $('#cart');
  const overlay = $('#overlay');
  const lista = $('#cart-lista');

  function abrir(paso) {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-on');
    document.body.classList.add('ud-no-scroll');
    if (paso === 'checkout') drawer.classList.add('is-checkout');
    track('view_cart', { unidades: CART.unidades() });
  }
  function cerrar() {
    drawer.classList.remove('is-open', 'is-checkout');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-on');
    document.body.classList.remove('ud-no-scroll');
  }

  $('#cart-btn').addEventListener('click', () => abrir());
  $('#mobar-cart').addEventListener('click', () => abrir());
  $('#cart-close').addEventListener('click', cerrar);
  overlay.addEventListener('click', cerrar);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) cerrar();
  });

  function miniArte(item) {
    if (item.foto) return `<img class="ud-art" src="${item.foto}" alt="">`;
    const p = UD_MENU.find((x) => x.id === item.id);
    if (p) return ART.paraProducto(p);
    if (item.art) return ART.pancho(item.art, { seed: item.uid, vapor: false });
    return '';
  }

  function pintarItems() {
    const st = CART.state;
    if (!st.items.length) {
      lista.innerHTML = `<div class="cart__vacio">
        <div>${ART.pancho({ pan: 'brioche', salchicha: 'clasica', toppings: [], salsas: [] }, { vapor: false })}</div>
        <b>Tu pedido está vacío</b>
        <p>Elegí algo de la carta y volvé por acá.</p>
        <button class="btn btn--sm" type="button" data-ir-carta>Ver la carta</button>
      </div>`;
      return;
    }
    lista.innerHTML = st.items.map((i) => `
      <div class="item" data-uid="${i.uid}">
        <div class="item__media">${miniArte(i)}</div>
        <div>
          <div class="item__name">${esc(i.nombre)}</div>
          ${i.extra ? `<div class="item__extra">${esc(i.extra)}</div>` : ''}
          <div class="item__precio">${money(i.precio * i.qty)}</div>
        </div>
        <div class="item__side">
          <div class="qty">
            <button type="button" data-menos aria-label="Quitar uno">−</button>
            <span>${i.qty}</span>
            <button type="button" data-mas aria-label="Sumar uno">+</button>
          </div>
          <button class="item__del" type="button" data-del>Quitar</button>
        </div>
      </div>`).join('');
  }

  function pintarBumps() {
    const cont = $('#bumps');
    const box = $('#bumps-lista');
    const enCarrito = CART.state.items.map((i) => i.id);
    const ofrecer = (UD_BUMPS || [])
      .map((id) => UD_MENU.find((p) => p.id === id))
      .filter((p) => p && !enCarrito.includes(p.id));

    if (!CART.state.items.length || !ofrecer.length) { cont.hidden = true; return; }
    cont.hidden = false;
    box.innerHTML = ofrecer.map((p) => `
      <div class="bump" data-id="${p.id}">
        <div class="bump__media">${ART.paraProducto(p)}</div>
        <div class="bump__txt">${esc(p.nombre)}<span>${money(p.precio)}</span></div>
        <button class="bump__add" type="button" aria-label="Agregar ${esc(p.nombre)}">+</button>
      </div>`).join('');
  }

  function pintarTotales() {
    const t = CART.totales();
    const st = CART.state;
    const v = CFG.ventas;

    $('#cart-n').textContent = `${CART.unidades()} ${CART.unidades() === 1 ? 'producto' : 'productos'}`;
    const cuenta = $('#cart-count');
    cuenta.textContent = CART.unidades();
    cuenta.classList.toggle('is-on', CART.unidades() > 0);
    $('#mobar-total').textContent = money(t.total);

    // Barra de envío gratis
    const envioBox = $('#cart-envio');
    if (st.modo === 'delivery' && v.envioGratisDesde > 0 && st.items.length) {
      envioBox.hidden = false;
      const pct = Math.min(100, (t.sub / v.envioGratisDesde) * 100);
      $('#cart-envio-barra').style.width = pct + '%';
      $('#cart-envio-txt').innerHTML = t.faltaEnvioGratis > 0
        ? `Te faltan <b>${money(t.faltaEnvioGratis)}</b> para el envío gratis 🛵`
        : '¡Listo! Tenés <b>envío gratis</b> 🎉';
    } else {
      envioBox.hidden = true;
    }

    const filas = [`<div><span>Subtotal</span><span>${money(t.sub)}</span></div>`];
    if (t.desc > 0) filas.push(`<div class="t-desc"><span>Descuento ${st.cupon ? '(' + esc(st.cupon.codigo) + ')' : ''}</span><span>−${money(t.desc)}</span></div>`);
    if (st.modo === 'delivery') filas.push(`<div><span>Envío</span><span>${t.envio === 0 ? 'Gratis' : money(t.envio)}</span></div>`);
    else filas.push(`<div><span>Retiro por el local</span><span>Sin cargo</span></div>`);
    filas.push(`<div class="t-total"><span>Total</span><span>${money(t.total)}</span></div>`);
    $('#totales').innerHTML = filas.join('');

    const min = $('#cart-min');
    if (!t.cumpleMinimo && st.items.length) {
      min.hidden = false;
      min.textContent = `Pedido mínimo para delivery: ${money(v.pedidoMinimo)}. Te faltan ${money(t.faltaMinimo)}.`;
    } else { min.hidden = true; }

    const cta = $('#cart-cta');
    cta.disabled = !st.items.length || !t.cumpleMinimo;

    // Demora estimada
    $('#cart-aviso').textContent = st.items.length
      ? `Demora estimada: ${st.modo === 'delivery' ? v.demoraDelivery : v.demoraRetiro}. Se abre WhatsApp con el pedido escrito.`
      : 'Se abre WhatsApp con el pedido escrito. Vos solo apretás enviar.';

    if ($('#checkout-resumen')) {
      $('#checkout-resumen').innerHTML =
        `${CART.unidades()} productos · <b>${money(t.total)}</b><br>
         ${st.modo === 'delivery' ? '🛵 Delivery · ' + v.demoraDelivery : '🏠 Retiro por el local · ' + v.demoraRetiro}`;
    }
  }

  function pintar() { pintarItems(); pintarBumps(); pintarTotales(); }

  // Interacciones dentro del carrito
  lista.addEventListener('click', (e) => {
    if (e.target.closest('[data-ir-carta]')) { cerrar(); $('#menu').scrollIntoView({ behavior: noMotion ? 'auto' : 'smooth' }); return; }
    const row = e.target.closest('.item');
    if (!row) return;
    const u = row.dataset.uid;
    const it = CART.state.items.find((x) => x.uid === u);
    if (!it) return;
    if (e.target.closest('[data-mas]'))   CART.setQty(u, it.qty + 1);
    if (e.target.closest('[data-menos]')) CART.setQty(u, it.qty - 1);
    if (e.target.closest('[data-del]'))   { CART.quitar(u); toast('Lo sacamos del pedido.'); }
  });

  $('#bumps-lista').addEventListener('click', (e) => {
    const b = e.target.closest('.bump');
    if (!b || !e.target.closest('.bump__add')) return;
    const p = UD_MENU.find((x) => x.id === b.dataset.id);
    if (!p) return;
    CART.add(p);
    toast(`${p.nombre} sumado 🙌`);
    track('add_to_cart', { item: p.id, valor: p.precio, origen: 'bump' });
  });

  $$('input[name="ud-modo"]').forEach((r) => {
    r.addEventListener('change', () => {
      CART.setModo(r.value);
      const esDelivery = r.value === 'delivery';
      $('#ck-dir-wrap').hidden = !esDelivery;
      $('#ck-ref-wrap').hidden = !esDelivery;
    });
  });

  // Cupones
  $('#cupon-btn').addEventListener('click', () => {
    const res = CART.aplicarCupon($('#cupon-input').value);
    const msg = $('#cupon-msg');
    msg.textContent = res.msg;
    msg.className = 'cupon__msg ' + (res.ok ? 'ok' : 'err');
    if (res.ok) { $('#cupon-input').value = ''; track('cupon_ok', { codigo: res.msg }); }
  });
  $('#cupon-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); $('#cupon-btn').click(); }
  });

  CART.onChange(pintar);
  pintar();

  return { abrir, cerrar, pintar };
})();

/* ===================================================================
   15. Checkout
   =================================================================== */
(function checkout() {
  const drawer = $('#cart');
  const cta = $('#cart-cta');
  const pago = $('#ck-pago');

  pago.innerHTML = (CFG.ventas.pagos || []).map((p) => `<option>${esc(p)}</option>`).join('');
  const verCambio = () => { $('#ck-cambio-wrap').hidden = !/efectivo/i.test(pago.value); };
  pago.addEventListener('change', verCambio);
  verCambio();

  // Recordamos los datos del cliente para la próxima compra
  const CK_KEY = 'urbandogs.cliente.v1';
  const campos = ['ck-nombre', 'ck-tel', 'ck-dir', 'ck-ref'];
  try {
    const guardado = JSON.parse(localStorage.getItem(CK_KEY) || '{}');
    campos.forEach((id) => { if (guardado[id]) $('#' + id).value = guardado[id]; });
  } catch (e) {}

  function guardarCliente() {
    const d = {};
    campos.forEach((id) => { d[id] = $('#' + id).value; });
    try { localStorage.setItem(CK_KEY, JSON.stringify(d)); } catch (e) {}
  }

  $('#checkout-volver').addEventListener('click', () => {
    drawer.classList.remove('is-checkout');
    $('#cart-cta-txt').textContent = 'Finalizar pedido';
  });

  cta.addEventListener('click', () => {
    // Paso 1 → mostramos el formulario de datos
    if (!drawer.classList.contains('is-checkout')) {
      if (!CART.state.items.length) { toast('Todavía no agregaste nada.', true); return; }
      drawer.classList.add('is-checkout');
      $('#cart-cta-txt').textContent = 'Enviar pedido por WhatsApp';
      $('#cart').querySelector('.cart__body').scrollTop = 0;
      $('#ck-nombre').focus();
      track('begin_checkout', { valor: CART.totales().total });
      return;
    }

    // Paso 2 → validamos y abrimos WhatsApp
    const datos = {
      nombre: $('#ck-nombre').value.trim(),
      tel:    $('#ck-tel').value.trim(),
      dir:    $('#ck-dir').value.trim(),
      ref:    $('#ck-ref').value.trim(),
      pago:   pago.value,
      cambio: $('#ck-cambio').value.trim(),
      nota:   $('#ck-nota').value.trim()
    };

    const errores = CART.validar(datos);
    if (errores.length) { toast(errores[0], true); return; }

    guardarCliente();
    const total = CART.totales().total;
    const texto = CART.mensaje(datos);
    const url = CART.enlaceWhatsApp(texto);

    track('purchase', { valor: total, unidades: CART.unidades(), modo: CART.state.modo });
    if (window.fbq) window.fbq('track', 'Purchase', { value: total, currency: 'ARS' });

    // Guardamos el pedido por si el cliente vuelve
    try {
      localStorage.setItem('urbandogs.ultimoPedido', JSON.stringify({
        fecha: new Date().toISOString(), total, items: CART.state.items
      }));
    } catch (e) {}

    window.open(url, '_blank', 'noopener');
    confeti();
    toast('¡Pedido listo! Se abrió WhatsApp: solo apretá enviar.');

    setTimeout(() => {
      CART.vaciar();
      CartUI.cerrar();
      $('#cart-cta-txt').textContent = 'Finalizar pedido';
      $('#cupon-msg').textContent = '';
    }, 1400);
  });
})();

/* ===================================================================
   16. Confeti al cerrar el pedido
   =================================================================== */
function confeti() {
  if (noMotion) return;
  const colores = ['#F7B32B', '#E23E33', '#8FBF4D', '#FFCB5C', '#FBF4E6'];
  const cont = document.createElement('div');
  cont.style.cssText = 'position:fixed;inset:0;z-index:140;pointer-events:none;overflow:hidden';
  document.body.appendChild(cont);

  for (let i = 0; i < 90; i++) {
    const p = document.createElement('i');
    const size = 6 + Math.random() * 9;
    p.style.cssText = `position:absolute;top:-24px;left:${Math.random() * 100}%;
      width:${size}px;height:${size * .6}px;border-radius:2px;
      background:${colores[i % colores.length]};opacity:.95;
      transform:rotate(${Math.random() * 360}deg)`;
    cont.appendChild(p);
    const dur = 2200 + Math.random() * 1800;
    p.animate([
      { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate3d(${(Math.random() - .5) * 260}px, 110vh, 0) rotate(${720 * (Math.random() > .5 ? 1 : -1)}deg)`, opacity: .1 }
    ], { duration: dur, easing: 'cubic-bezier(.2,.6,.4,1)', delay: Math.random() * 420, fill: 'forwards' });
  }
  setTimeout(() => cont.remove(), 4800);
}

/* ===================================================================
   17. Formularios (Netlify Forms con envío sin recargar)
   =================================================================== */
(function forms() {
  const enviar = (form) => {
    const datos = new FormData(form);
    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(datos).toString()
    });
  };

  const evento = $('#form-evento');
  if (evento) {
    evento.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = evento.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Enviando…';
      enviar(evento)
        .then(() => {
          evento.classList.add('is-sent');
          evento.reset();
          btn.textContent = 'Consulta enviada ✓';
          toast('Recibimos tu consulta. Te escribimos en menos de 24 h.');
          track('lead', { tipo: 'evento' });
          if (window.fbq) window.fbq('track', 'Lead');
        })
        .catch(() => {
          btn.disabled = false;
          btn.textContent = 'Quiero mi presupuesto';
          toast('No pudimos enviarlo. Escribinos por WhatsApp así no perdés el turno.', true);
        });
    });
  }

  const news = $('#form-news');
  if (news) {
    news.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = news.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Enviando…';
      enviar(news)
        .then(() => {
          const cupon = (CFG.ventas.cupones[0] || {}).codigo || 'URBAN10';
          news.reset();
          btn.textContent = '¡Listo! ✓';
          $('#news-cupon-vista').textContent = `Tu cupón: ${cupon}`;
          toast(`Tu cupón es ${cupon}. Ya lo podés usar en el carrito.`);
          try { localStorage.setItem('urbandogs.cuponRegalo', cupon); } catch (err) {}
          track('lead', { tipo: 'newsletter' });
          if (window.fbq) window.fbq('track', 'Lead');
          setTimeout(() => { btn.disabled = false; btn.textContent = 'Quiero el cupón'; }, 4000);
        })
        .catch(() => {
          btn.disabled = false;
          btn.textContent = 'Quiero el cupón';
          toast('No pudimos guardar tu mail. Probá de nuevo en un rato.', true);
        });
    });
  }
})();

/* ===================================================================
   18. Datos estructurados para Google (se arman con la carta real)
   =================================================================== */
(function seo() {
  const c = CFG.contacto;
  const dias = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };

  const horario = (CFG.horarios || []).filter((h) => !h.cerrado).map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'https://schema.org/' + dias[h.dia],
    opens: h.abre,
    closes: h.cierra
  }));

  const secciones = UD_CATEGORIAS.filter((x) => x.id !== 'todos').map((cat) => ({
    '@type': 'MenuSection',
    name: cat.nombre,
    hasMenuItem: UD_MENU.filter((p) => p.cat === cat.id && p.activo !== false).map((p) => ({
      '@type': 'MenuItem',
      name: p.nombre,
      description: p.desc,
      offers: { '@type': 'Offer', price: p.precio, priceCurrency: 'ARS' }
    }))
  })).filter((s) => s.hasMenuItem.length);

  const negocio = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: CFG.marca.nombre,
    description: CFG.marca.bajada,
    servesCuisine: ['Comida rápida', 'Panchos artesanales', 'Street food'],
    priceRange: '$$',
    image: location.origin + '/urbandogs/img/og.png',
    url: location.origin + '/urbandogs/',
    telephone: '+' + String(c.whatsapp).replace(/\D/g, ''),
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.direccion,
      addressLocality: c.barrio,
      postalCode: c.codigoPostal,
      addressCountry: 'AR'
    },
    openingHoursSpecification: horario,
    acceptsReservations: 'False',
    hasMenu: { '@type': 'Menu', name: 'Carta Urban Dog\'s', hasMenuSection: secciones },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: String((CFG.resenas || []).length * 400) },
    sameAs: [c.instagram, c.tiktok, c.facebook].filter(Boolean)
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: UD_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  [negocio, faq].forEach((obj) => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
})();

/* ===================================================================
   19. Cupón de regalo guardado + atajos
   =================================================================== */
(function extras() {
  // Si el cliente ya pidió el cupón, se lo dejamos escrito en el carrito
  try {
    const cup = localStorage.getItem('urbandogs.cuponRegalo');
    if (cup) $('#cupon-input').placeholder = `TENÉS: ${cup}`;
  } catch (e) {}

  // ?pedir=idProducto en la URL agrega directo (sirve para links de Instagram)
  const params = new URLSearchParams(location.search);
  const pedir = params.get('pedir');
  if (pedir) {
    const p = UD_MENU.find((x) => x.id === pedir);
    if (p) { CART.add(p); setTimeout(() => CartUI.abrir(), 700); }
  }
  if (params.get('cupon')) {
    const r = CART.aplicarCupon(params.get('cupon'));
    if (r.ok) toast(r.msg);
  }
})();

})();
