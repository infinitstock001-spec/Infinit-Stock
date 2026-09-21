/* ==============================================================
   MÁSTER EN BARBERÍA PROFESIONAL — Comportamiento de la página

   No hace falta tocar este archivo: todo lo que se edita está
   en js/config.js. Vanilla JS, sin librerías, sin dependencias.
   ============================================================== */
(() => {
  'use strict';

  const CFG = window.CONFIG || {};
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ============================================================
     1) NAV: sombra al hacer scroll + barra fija del celular
     ============================================================ */
  const nav = $('#nav');
  const barra = $('#barraMovil');
  const hero = $('.hero');

  const alScrollear = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('nav--pegado', y > 40);
    // La barra de compra aparece recién cuando pasaste el hero
    if (barra && hero) {
      const pasoElHero = y > hero.offsetHeight * 0.8;
      const estaEnPrecios = estaVisible($('#precios'));
      barra.classList.toggle('visible', pasoElHero && !estaEnPrecios);
    }
  };

  const estaVisible = (el) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  };

  window.addEventListener('scroll', alScrollear, { passive: true });
  alScrollear();

  /* ============================================================
     2) Scroll suave en los links internos
     ============================================================ */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const destino = document.querySelector(id);
      if (!destino) return;
      e.preventDefault();
      const alto = nav ? nav.offsetHeight : 0;
      const y = destino.getBoundingClientRect().top + window.scrollY - alto - 10;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ============================================================
     3) Acordeones (temario y FAQ)
     ============================================================ */
  $$('[data-acordeon]').forEach((grupo) => {
    $$('.modulo__cab', grupo).forEach((cab) => {
      cab.addEventListener('click', () => {
        const item = cab.closest('.modulo');
        const abierto = item.classList.contains('abierto');
        // Se cierra el resto del grupo: más ordenado en el celular
        $$('.modulo', grupo).forEach((o) => {
          o.classList.remove('abierto');
          $('.modulo__cab', o).setAttribute('aria-expanded', 'false');
        });
        if (!abierto) {
          item.classList.add('abierto');
          cab.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ============================================================
     4) Aparición suave al hacer scroll
     ============================================================ */
  const revelables = $$('[data-reveal]');
  if ('IntersectionObserver' in window && revelables.length) {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('visto');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revelables.forEach((el) => obs.observe(el));
  } else {
    revelables.forEach((el) => el.classList.add('visto'));
  }

  /* ============================================================
     5) Contador de urgencia
     Si no cargaste fecha en config.js, se esconde la barra entera.
     ============================================================ */
  const relojes = $$('[data-countdown]');
  const barraUrgencia = $('#urgencia');
  const fechaFin = CFG.cierraEl ? new Date(CFG.cierraEl) : null;

  if (!fechaFin || isNaN(fechaFin.getTime())) {
    if (barraUrgencia) barraUrgencia.remove();
    document.body.classList.add('sin-urgencia');
    $$('.cierre__urgencia').forEach((p) => p.remove());
  } else {
    const tic = () => {
      const falta = fechaFin - new Date();
      if (falta <= 0) {
        if (barraUrgencia) barraUrgencia.remove();
        relojes.forEach((r) => (r.textContent = 'cerrado'));
        return;
      }
      const d = Math.floor(falta / 86400000);
      const h = Math.floor((falta % 86400000) / 3600000);
      const m = Math.floor((falta % 3600000) / 60000);
      const s = Math.floor((falta % 60000) / 1000);
      const txt = d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m ${s}s`;
      relojes.forEach((r) => (r.textContent = txt));
    };
    tic();
    setInterval(tic, 1000);
  }

  /* ============================================================
     6) WhatsApp
     ============================================================ */
  const linkWhatsApp = (texto) =>
    `https://wa.me/${CFG.whatsapp || ''}?text=${encodeURIComponent(texto)}`;

  $$('[data-whatsapp]').forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
    a.href = linkWhatsApp('Hola Facundo, tengo una consulta sobre el Máster en Barbería Profesional.');
  });

  /* ============================================================
     7) CHECKOUT — acá entra Mercado Pago
     ============================================================ */
  const modal = $('#modal');
  let planActual = 'pro';

  function abrirCheckout(planId) {
    const plan = (CFG.planes || {})[planId];
    if (!plan || !modal) return;
    planActual = planId;

    $('[data-modal-plan]', modal).textContent = plan.nombre;
    $('[data-modal-precio]', modal).textContent = plan.precio;
    $('[data-modal-detalle]', modal).innerHTML = (plan.incluye || [])
      .map((i) => `<li>${i}</li>`)
      .join('');

    const link = ((CFG.mercadopago || {}).links || {})[planId] || '';
    const activo = !!(CFG.mercadopago || {}).activo && !!link;
    const btnPagar = $('[data-modal-pagar]', modal);
    const aviso = $('[data-mp-aviso]', modal);

    if (activo) {
      /* Mercado Pago cargado: el botón lleva al link de pago. */
      btnPagar.href = link;
      btnPagar.target = '_blank';
      btnPagar.rel = 'noopener';
      btnPagar.textContent = 'Pagar con Mercado Pago';
      btnPagar.hidden = false;
      if (aviso) aviso.hidden = true;

      /* --------------------------------------------------------
         OPCIÓN B — Checkout Pro con SDK.
         Si en vez del link usás el SDK, borrá las 5 líneas de
         arriba y pegá acá:

           const mp = new MercadoPago('TU_PUBLIC_KEY', { locale: 'es-AR' });
           mp.checkout({ preference: { id: 'PREFERENCE_ID' }, autoOpen: true });

         (el PREFERENCE_ID lo tiene que crear tu backend)
         -------------------------------------------------------- */
    } else {
      /* Todavía no hay link: no perdemos la venta, va por WhatsApp. */
      btnPagar.hidden = true;
      if (aviso) aviso.hidden = false;
    }

    modal.hidden = false;
    document.body.classList.add('modal-abierto');
    guardarEvento('checkout_abierto', planId);
  }

  function cerrarCheckout() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-abierto');
  }

  $$('[data-comprar]').forEach((b) => {
    b.addEventListener('click', () => abrirCheckout(b.dataset.comprar));
  });
  $$('[data-cerrar-modal]').forEach((b) => b.addEventListener('click', cerrarCheckout));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarCheckout();
  });

  const btnWhats = $('[data-modal-whatsapp]');
  if (btnWhats) {
    btnWhats.addEventListener('click', () => {
      const plan = (CFG.planes || {})[planActual] || {};
      const msg = `Hola Facundo! Quiero anotarme en el Máster en Barbería Profesional — ${plan.nombre || ''} (${plan.precio || ''}). ¿Cómo sigo?`;
      window.open(linkWhatsApp(msg), '_blank', 'noopener');
      guardarEvento('checkout_whatsapp', planActual);
    });
  }

  /* ============================================================
     8) Formulario de captura (mail + WhatsApp)
     ============================================================ */
  const form = $('[data-form="lead"]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      const datos = new FormData(form);
      const ok = $('[data-form-ok]', form);
      const boton = $('button[type="submit"]', form);

      /* Modo WhatsApp: no hay backend, se abre el chat con los datos. */
      if (CFG.leads === 'whatsapp') {
        e.preventDefault();
        const msg = `Hola Facundo! Quiero la clase gratis del módulo de fade.
Nombre: ${datos.get('nombre')}
Email: ${datos.get('email')}
WhatsApp: ${datos.get('whatsapp')}
Momento: ${datos.get('momento')}`;
        window.open(linkWhatsApp(msg), '_blank', 'noopener');
        if (ok) ok.hidden = false;
        form.reset();
        guardarEvento('lead_whatsapp', 'form');
        return;
      }

      /* Modo Netlify: se manda por fetch para no cambiar de página. */
      e.preventDefault();
      if (boton) { boton.disabled = true; boton.textContent = 'Enviando...'; }
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(datos).toString(),
        });
        if (ok) ok.hidden = false;
        form.reset();
        guardarEvento('lead_enviado', 'form');
      } catch (err) {
        /* Si falla la red, no dejamos al cliente colgado. */
        if (ok) {
          ok.hidden = false;
          ok.textContent = 'No se pudo enviar. Escribime por WhatsApp y lo resolvemos.';
        }
      } finally {
        if (boton) { boton.disabled = false; boton.textContent = 'Mandame la clase gratis'; }
      }
    });
  }

  /* ============================================================
     9) Medición simple (queda en el navegador)
     Si después conectás Meta Pixel o Google Analytics, los
     eventos se disparan solos desde acá.
     ============================================================ */
  function guardarEvento(nombre, detalle) {
    try {
      const k = 'mbp_eventos';
      const lista = JSON.parse(localStorage.getItem(k) || '[]');
      lista.push({ e: nombre, d: detalle, t: Date.now() });
      localStorage.setItem(k, JSON.stringify(lista.slice(-50)));
    } catch (_) { /* modo incógnito: no pasa nada */ }

    if (typeof window.fbq === 'function') window.fbq('trackCustom', nombre, { plan: detalle });
    if (typeof window.gtag === 'function') window.gtag('event', nombre, { plan: detalle });
  }

  $$('[data-cta]').forEach((a) => {
    a.addEventListener('click', () => guardarEvento('cta_click', a.dataset.cta));
  });

  /* ============================================================
     10) Detalles finales
     ============================================================ */
  const anio = $('[data-anio]');
  if (anio) anio.textContent = new Date().getFullYear();

  /* Datos de contacto del footer tomados de config.js */
  $$('a[href^="mailto:"]').forEach((a) => {
    if (CFG.email && CFG.email.indexOf('ejemplo.com') === -1) {
      a.href = `mailto:${CFG.email}`;
      if (a.textContent.includes('@')) a.textContent = CFG.email;
    }
  });
})();
