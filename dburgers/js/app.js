/* ==========================================================================
   D BURGERS — lógica del sitio
   Vanilla JS, sin dependencias. Los datos salen de js/datos.js
   ========================================================================== */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const pesos = new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0
  });
  const precio = (v) => CONFIG.MOSTRAR_PRECIOS && v ? pesos.format(v) : 'Consultar';

  /* ---------- Local elegido (se recuerda entre visitas) ---------- */
  const CLAVE_LOCAL = 'dburgers:local';
  let localElegido = CONFIG.locales[0].id;
  try {
    const guardado = localStorage.getItem(CLAVE_LOCAL);
    if (guardado && CONFIG.locales.some(l => l.id === guardado)) localElegido = guardado;
  } catch (e) { /* navegación privada: seguimos con el valor por defecto */ }

  const buscarLocal = (id) => CONFIG.locales.find(l => l.id === id) || CONFIG.locales[0];


  /* Animar números */
  function animar(num) {
    if (!!window.animado_nums) return;
    window.animado_nums = true;
    $$('[data-target]').forEach(el => {
      const fin = parseInt(el.dataset.target);
      const prefijo = el.dataset.prefix || '';
      let actual = 0;
      const paso = Math.ceil(fin / 50);
      const i = setInterval(() => {
        actual += paso;
        if (actual >= fin) { actual = fin; clearInterval(i); }
        el.textContent = prefijo + actual.toLocaleString('es-AR');
      }, 30);
    });
  }
  
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { animar(); obs.disconnect(); }
    });
    const hero = $('#hero-stats');
    if (hero) obs.observe(hero);
  }

  /* Arma el link de WhatsApp. Si todavía no hay número cargado,
     devuelve el ancla a la sección de locales para no dejar un botón muerto. */
  function linkWhatsapp(idLocal, mensaje) {
    const local = buscarLocal(idLocal);
    const numero = (local.whatsapp || '').replace(/\D/g, '');
    if (!numero) return '#locales';
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  }
  const saludo = (extra) =>
    `¡Hola ${CONFIG.marca.nombre}! ${extra}`;

  /* ==========================================================================
     Aviso de borrador
     ========================================================================== */
  function avisoBorrador() {
    if (!CONFIG.MODO_BORRADOR) return;
    const faltan = [];
    if (CONFIG.locales.some(l => !l.whatsapp)) faltan.push('números de WhatsApp');
    if (CONFIG.locales.some(l => !l.telefono)) faltan.push('teléfonos');
    if (CONFIG.locales.some(l => /a confirmar/i.test(l.direccion))) faltan.push('direcciones');
    if (!CONFIG.MOSTRAR_PRECIOS) faltan.push('precios');
    if (CONFIG.TESTIMONIOS_DE_EJEMPLO) faltan.push('reseñas reales');
    if (!faltan.length) return;

    const barra = document.createElement('div');
    barra.className = 'aviso';
    barra.innerHTML =
      `<div class="contenedor aviso__inner">
         <span><strong>Sitio en modo borrador.</strong> Faltan cargar: ${esc(faltan.join(', '))}.
         Se editan en <code>js/datos.js</code>.</span>
         <button type="button" class="aviso__cerrar" aria-label="Cerrar aviso">✕</button>
       </div>`;
    document.body.prepend(barra);
    document.body.classList.add('con-aviso');
    $('.aviso__cerrar', barra).addEventListener('click', () => {
      barra.remove();
      document.body.classList.remove('con-aviso');
    });
  }

  /* ==========================================================================
     Navegación
     ========================================================================== */
  function nav() {
    const barra = $('#nav');
    const menu = $('#nav-menu');
    const burger = $('#nav-burger');

    const alScrollear = () => {
      barra.classList.toggle('nav--fijo', window.scrollY > 24);
      $('#wa-flotante').classList.toggle('visible', window.scrollY > 520);
    };
    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });

    burger.addEventListener('click', () => {
      const abierto = menu.classList.toggle('abierto');
      burger.setAttribute('aria-expanded', String(abierto));
    });
    $$('a', menu).forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('abierto');
      burger.setAttribute('aria-expanded', 'false');
    }));

    /* Marca en el menú la sección que se está mirando */
    const secciones = $$('main section[id]');
    const links = $$('[data-nav]');
    if ('IntersectionObserver' in window && secciones.length) {
      const obs = new IntersectionObserver((entradas) => {
        entradas.forEach(e => {
          if (!e.isIntersecting) return;
          links.forEach(l => l.classList.toggle('activo', l.getAttribute('href') === '#' + e.target.id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      secciones.forEach(s => obs.observe(s));
    }
  }

  /* ==========================================================================
     Revelado progresivo al hacer scroll
     ========================================================================== */
  function revelar() {
    const objetivos = $$('[data-revelar]');
    if (!('IntersectionObserver' in window)) {
      objetivos.forEach(o => o.classList.add('revelado'));
      return;
    }
    const obs = new IntersectionObserver((entradas, o) => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('revelado');
        o.unobserve(e.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -60px 0px' });
    objetivos.forEach(t => obs.observe(t));
  }

  /* ==========================================================================
     Catálogo
     ========================================================================== */
  function catalogo() {
    const contFiltros = $('#filtros');
    const grilla = $('#grilla-burgers');

    contFiltros.innerHTML = CATEGORIAS.map((c, i) =>
      `<button type="button" class="filtro${i === 0 ? ' activo' : ''}" data-filtro="${c.id}">${esc(c.nombre)}</button>`
    ).join('');

    function pintar(categoria) {
      const lista = categoria === 'todas' ? BURGERS : BURGERS.filter(b => b.categoria === categoria);
      grilla.innerHTML = lista.map((b, i) => `
        <article class="tarjeta" style="animation-delay:${i * 70}ms">
          <button type="button" class="tarjeta__foto" data-abrir="${b.id}" aria-label="Ver ingredientes de la ${esc(b.nombre)}">
            <img src="${b.foto}" alt="Hamburguesa ${esc(b.nombre)} con sus ingredientes señalados" loading="lazy" width="828" height="1253">
            <span class="tarjeta__velo"></span>
            ${b.destacada ? `<span class="tarjeta__fuego">${esc(b.destacada)}</span>` : ''}
            <span class="tarjeta__lupa">Ver despiece</span>
          </button>
          <div class="tarjeta__cuerpo">
            <h3 class="tarjeta__nombre">${esc(b.nombre)}</h3>
            <p class="tarjeta__desc">${esc(b.descripcion)}</p>
            <div class="tarjeta__chips">
              ${b.ingredientes.map(i => `<span class="chip">${esc(i.nombre)}</span>`).join('')}
            </div>
            <div class="tarjeta__pie">
              <span class="precio">${precio(b.precio)}<small>${CONFIG.MOSTRAR_PRECIOS ? 'Precio unitario' : 'Precio actualizado'}</small></span>
              <button type="button" class="btn btn--sm btn--oro" data-abrir="${b.id}">Pedir</button>
            </div>
          </div>
        </article>`).join('');
    }

    pintar('todas');

    contFiltros.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filtro]');
      if (!btn) return;
      $$('.filtro', contFiltros).forEach(f => f.classList.toggle('activo', f === btn));
      pintar(btn.dataset.filtro);
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-abrir]');
      if (btn) abrirFicha(btn.dataset.abrir);
    });
  }

  /* ==========================================================================
     Ficha / despiece de ingredientes
     ========================================================================== */
  const modal = () => $('#modal');
  let ultimoFoco = null;

  function abrirFicha(id) {
    const b = BURGERS.find(x => x.id === id);
    if (!b) return;
    ultimoFoco = document.activeElement;

    const caja = $('#modal-caja');
    caja.innerHTML = `
      <button type="button" class="modal__cerrar" data-cerrar aria-label="Cerrar">✕</button>
      <div class="despiece" id="despiece">
        <img src="${b.foto}" alt="Hamburguesa ${esc(b.nombre)} con sus ingredientes señalados por flechas">
        ${b.ingredientes.map((i, n) =>
          `<span class="despiece__punto" data-punto="${n}" style="left:${i.x}%; top:${i.y}%"></span>`).join('')}
      </div>
      <div class="modal__info">
        <div>
          <p class="modal__sub">${esc(CONFIG.marca.claim)}</p>
          <h3 class="modal__nombre" id="modal-titulo">${esc(b.nombre)}</h3>
        </div>
        <p class="modal__desc">${esc(b.descripcion)}</p>

        <p class="modal__sub">Qué lleva adentro <span class="modal__pista">— pasá el mouse para verlo señalado en la foto</span></p>
        <div class="ingredientes">
          ${b.ingredientes.map((i, n) => `
            <div class="ingrediente" data-ing="${n}">
              <span class="ingrediente__n">${n + 1}</span>
              <span class="ingrediente__t">${esc(i.nombre)}</span>
            </div>`).join('')}
        </div>

        <div class="modal__precio">
          <span class="precio">${precio(b.precio)}</span>
          <span class="modal__nota">${CONFIG.MOSTRAR_PRECIOS ? 'Sin bebida ni papas' : 'Consultanos el precio del día'}</span>
        </div>

        <div>
          <p class="modal__sub">¿A qué local le pedís?</p>
          <div class="selector-local" id="selector-local">
            ${CONFIG.locales.map(l => `
              <button type="button" class="selector-local__op${l.id === localElegido ? ' activo' : ''}" data-local="${l.id}">
                ${esc(l.nombre)}
              </button>`).join('')}
          </div>
        </div>

        <div class="modal__acciones">
          <a class="btn btn--wa" id="modal-wa" href="#" target="_blank" rel="noopener">
            <svg class="btn__ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.4 3.7 5.8 5 2.2.8 3 .9 4.1.7.7-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2"/></svg>
            Pedir por WhatsApp
          </a>
          <a class="btn btn--fantasma" href="#combos" data-cerrar>Ver combos</a>
        </div>
      </div>`;

    /* Ilumina el cartel del ingrediente al pasar por la lista */
    const puntos = $$('.despiece__punto', caja);
    $$('.ingrediente', caja).forEach(el => {
      const n = Number(el.dataset.ing);
      const on  = () => puntos[n] && puntos[n].classList.add('visible');
      const off = () => puntos[n] && puntos[n].classList.remove('visible');
      el.addEventListener('mouseenter', on);
      el.addEventListener('mouseleave', off);
      el.addEventListener('focus', on);
      el.addEventListener('blur', off);
      el.tabIndex = 0;
    });

    /* Selector de local + link de WhatsApp */
    const actualizarWa = () => {
      const local = buscarLocal(localElegido);
      const texto = saludo(`Quiero pedir una ${b.nombre} en el local de ${local.nombre}.`);
      $('#modal-wa', caja).href = linkWhatsapp(localElegido, texto);
    };
    $('#selector-local', caja).addEventListener('click', (e) => {
      const op = e.target.closest('[data-local]');
      if (!op) return;
      localElegido = op.dataset.local;
      try { localStorage.setItem(CLAVE_LOCAL, localElegido); } catch (err) { /* ignorar */ }
      $$('.selector-local__op', caja).forEach(o => o.classList.toggle('activo', o === op));
      actualizarWa();
    });
    actualizarWa();

    const m = modal();
    m.classList.add('abierto');
    document.body.style.overflow = 'hidden';
    $('.modal__cerrar', caja).focus();
  }

  function cerrarFicha() {
    const m = modal();
    if (!m.classList.contains('abierto')) return;
    m.classList.remove('abierto');
    document.body.style.overflow = '';
    $('#modal-caja').innerHTML = '';
    if (ultimoFoco) ultimoFoco.focus();
  }

  function iniciarModal() {
    const m = modal();
    m.addEventListener('click', (e) => {
      if (e.target.closest('[data-cerrar]') || e.target === $('#modal-fondo')) cerrarFicha();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarFicha(); });
  }

  /* ==========================================================================
     Combos
     ========================================================================== */
  function combos() {
    $('#grilla-combos').innerHTML = COMBOS.map(c => {
      const texto = saludo(`Quiero el ${c.nombre}.`);
      return `
      <article class="combo${c.destacado ? ' combo--destacado' : ''}">
        ${c.cinta ? `<span class="combo__cinta">${esc(c.cinta)}</span>` : ''}
        <h3 class="combo__nombre">${esc(c.nombre)}</h3>
        <p class="tarjeta__desc">${esc(c.descripcion)}</p>
        <div class="combo__precio">
          <strong>${precio(c.precio)}</strong>
          ${CONFIG.MOSTRAR_PRECIOS && c.precioTachado ? `<span class="combo__tachado">${pesos.format(c.precioTachado)}</span>` : ''}
        </div>
        <ul class="combo__lista">${c.incluye.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <a class="btn btn--full ${c.destacado ? 'btn--oro' : 'btn--fantasma'}"
           href="${linkWhatsapp(localElegido, texto)}" target="_blank" rel="noopener">Pedir este combo</a>
      </article>`;
    }).join('');
  }

  /* ==========================================================================
     Testimonios
     ========================================================================== */
  function testimonios() {
    $('#grilla-testimonios').innerHTML = TESTIMONIOS.map(t => `
      <article class="testimonio">
        <div class="testimonio__estrellas" aria-label="${t.estrellas} de 5 estrellas">${'★'.repeat(t.estrellas)}${'☆'.repeat(5 - t.estrellas)}</div>
        <p class="testimonio__texto">“${esc(t.texto)}”</p>
        <div class="testimonio__autor">
          <span class="testimonio__avatar" aria-hidden="true">${esc(t.nombre.trim().charAt(0).toUpperCase())}</span>
          <div><strong>${esc(t.nombre)}</strong><span>${esc(t.detalle)}</span></div>
        </div>
      </article>`).join('');

    if (CONFIG.TESTIMONIOS_DE_EJEMPLO) {
      const nota = document.createElement('p');
      nota.className = 'nota-datos';
      nota.textContent = 'Reseñas de ejemplo: reemplazalas por comentarios reales en js/datos.js y poné TESTIMONIOS_DE_EJEMPLO en false.';
      $('#grilla-testimonios').after(nota);
    }
  }

  /* ==========================================================================
     Locales
     ========================================================================== */
  function locales() {
    $('#grilla-locales').innerHTML = CONFIG.locales.map(l => {
      const texto = saludo(`Quiero hacer un pedido en el local de ${l.nombre}.`);
      const wa = linkWhatsapp(l.id, texto);
      const hayWa = wa !== '#locales';
      return `
      <article class="local" id="local-${l.id}">
        <header class="local__cabecera">
          <div>
            <p class="modal__sub">${esc(l.subtitulo)}</p>
            <h3 class="local__nombre">${esc(l.nombre)}</h3>
          </div>
          <span class="local__estado"><i></i>Con delivery</span>
        </header>
        <div class="local__cuerpo">
          <p class="local__fila"><i>📍</i><span><strong>Dirección</strong>${esc(l.direccion)}</span></p>
          <p class="local__fila"><i>🕗</i><span><strong>Horarios</strong>${esc(l.horarios)}</span></p>
          <p class="local__fila"><i>📞</i><span><strong>Teléfono</strong>${l.telefono ? esc(l.telefono) : 'A confirmar'}</span></p>
          <div class="local__acciones">
            <a class="btn btn--wa${hayWa ? '' : ' btn--desactivado'}" href="${wa}"${hayWa ? ' target="_blank" rel="noopener"' : ''}>
              ${hayWa ? 'Pedir por WhatsApp' : 'WhatsApp a confirmar'}
            </a>
            <a class="btn btn--fantasma" href="${l.mapa || 'https://www.google.com/maps/search/' + encodeURIComponent('D Burgers ' + l.nombre)}" target="_blank" rel="noopener">Cómo llegar</a>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  /* ==========================================================================
     Botón flotante + links sueltos de WhatsApp
     ========================================================================== */
  function whatsappGlobal() {
    const texto = saludo('Quiero hacer un pedido.');
    $$('[data-wa]').forEach(a => { a.href = linkWhatsapp(localElegido, texto); });
  }

  /* ==========================================================================
     Arranque
     ========================================================================== */

  /* Efecto parallax suave en brasas */
  function parallax() {
    if (!('IntersectionObserver' in window)) return;
    const brasas = $$('.hero__brasa');
    if (!brasas.length) return;
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      brasas.forEach((b, i) => {
        const vel = .3 + i * .1;
        b.style.transform = `translate3d(0, ${scroll * vel}px, 0)`;
      });
    }, { passive: true });
  }
  parallax();

  document.addEventListener('DOMContentLoaded', () => {
    avisoBorrador();
    nav();
    catalogo();
    iniciarModal();
    combos();
    testimonios();
    locales();
    whatsappGlobal();
    revelar();
    $('#anio').textContent = new Date().getFullYear();
  });
})();
