/* ==========================================================================
   D BURGERS — lógica del sitio y del sistema de pedidos
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

  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const leer    = (k)    => { try { return localStorage.getItem(k); } catch (e) { return null; } };

  /* ==========================================================================
     ESTADO
     ========================================================================== */
  const K_LOCAL   = 'dburgers:local';
  const K_PEDIDO  = 'dburgers:pedido';
  const K_CUPON   = 'dburgers:cupon';

  let localElegido = CONFIG.locales[0].id;
  const localGuardado = leer(K_LOCAL);
  if (localGuardado && CONFIG.locales.some(l => l.id === localGuardado)) localElegido = localGuardado;

  let pedido = [];
  try { pedido = JSON.parse(leer(K_PEDIDO)) || []; } catch (e) { pedido = []; }
  if (!Array.isArray(pedido)) pedido = [];

  let cuponAplicado = leer(K_CUPON) === CUPON.codigo;

  const buscarLocal = (id) => CONFIG.locales.find(l => l.id === id) || CONFIG.locales[0];

  /* ==========================================================================
     CARRITO
     ========================================================================== */
  function persistir() {
    guardar(K_PEDIDO, JSON.stringify(pedido));
    guardar(K_CUPON, cuponAplicado ? CUPON.codigo : '');
  }

  function agregar(item, cantidad = 1) {
    const ya = pedido.find(p => p.id === item.id);
    if (ya) ya.cant += cantidad;
    else pedido.push({ id: item.id, nombre: item.nombre, precio: item.precio, tipo: item.tipo, cant: cantidad });
    persistir();
    pintarPedido();
    return ya || pedido[pedido.length - 1];
  }

  function cambiarCantidad(id, delta) {
    const it = pedido.find(p => p.id === id);
    if (!it) return;
    it.cant += delta;
    if (it.cant <= 0) pedido = pedido.filter(p => p.id !== id);
    persistir();
    pintarPedido();
  }

  function vaciar() {
    pedido = [];
    cuponAplicado = false;
    persistir();
    pintarPedido();
  }

  const unidades  = () => pedido.reduce((a, p) => a + p.cant, 0);
  const subtotal  = () => pedido.reduce((a, p) => a + p.precio * p.cant, 0);
  const descuento = () => (cuponAplicado && CUPON.activo ? Math.round(subtotal() * CUPON.descuento) : 0);
  const costoEnvio = () => {
    const s = subtotal() - descuento();
    return s >= CONFIG.envio.gratisDesde ? 0 : CONFIG.envio.costo;
  };
  const total = () => subtotal() - descuento();

  /* Mensaje de WhatsApp con TODO el pedido armado en un solo texto */
  function mensajePedido() {
    const l = buscarLocal(localElegido);
    if (!pedido.length) return `¡Hola ${CONFIG.marca.nombre}! Quiero hacer un pedido en el local de ${l.nombre}.`;

    const lineas = pedido.map(p => `• ${p.cant}× ${p.nombre} — ${pesos.format(p.precio * p.cant)}`);
    let txt = `¡Hola ${CONFIG.marca.nombre}! Quiero hacer este pedido:\n\n${lineas.join('\n')}\n\n`;
    txt += `Subtotal: ${pesos.format(subtotal())}\n`;
    if (descuento()) txt += `Cupón ${CUPON.codigo} (-${CUPON.descuento * 100}%): -${pesos.format(descuento())}\n`;
    txt += `Total: ${pesos.format(total())}\n\n`;
    txt += `Local: ${l.nombre}\n`;
    txt += `Me falta decirles: si es delivery o retiro, la dirección y cómo pago.`;
    return txt;
  }

  function linkWhatsapp(idLocal, mensaje) {
    const l = buscarLocal(idLocal);
    const numero = (l.whatsapp || '').replace(/\D/g, '');
    if (!numero) return '#locales';
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  }
  const saludo = (extra) => `¡Hola ${CONFIG.marca.nombre}! ${extra}`;

  /* ==========================================================================
     PANEL DEL PEDIDO + BARRA FIJA
     ========================================================================== */
  function pintarPedido() {
    const n = unidades();

    /* Contador del botón del nav */
    $$('[data-contador]').forEach(el => {
      el.textContent = n;
      el.hidden = n === 0;
    });

    /* Barra fija inferior */
    const barra = $('#barra-pedido');
    document.body.classList.toggle('con-barra', n > 0);
    if (barra) {
      barra.classList.toggle('visible', n > 0);
      $('#barra-cant').textContent = n === 1 ? '1 producto' : `${n} productos`;
      $('#barra-total').textContent = pesos.format(total());
    }

    /* Contenido del panel */
    const cuerpo = $('#panel-cuerpo');
    if (!cuerpo) return;

    if (!n) {
      cuerpo.innerHTML = `
        <div class="panel__vacio">
          <span aria-hidden="true">🍔</span>
          <p>Todavía no elegiste nada.</p>
          <a class="btn btn--oro" href="#carta" data-cerrar-panel>Ver la carta</a>
        </div>`;
      $('#panel-pie').hidden = true;
      return;
    }

    $('#panel-pie').hidden = false;
    cuerpo.innerHTML = `
      <ul class="panel__lista">
        ${pedido.map(p => `
          <li class="panel__item">
            <div>
              <strong>${esc(p.nombre)}</strong>
              <span>${pesos.format(p.precio)} c/u</span>
            </div>
            <div class="contador">
              <button type="button" data-menos="${p.id}" aria-label="Quitar uno de ${esc(p.nombre)}">−</button>
              <span>${p.cant}</span>
              <button type="button" data-mas="${p.id}" aria-label="Agregar uno de ${esc(p.nombre)}">+</button>
            </div>
            <b>${pesos.format(p.precio * p.cant)}</b>
          </li>`).join('')}
      </ul>

      ${sugerenciasHTML()}

      <div class="panel__cuenta">
        <p><span>Subtotal</span><span>${pesos.format(subtotal())}</span></p>
        ${descuento() ? `<p class="panel__ahorro"><span>Cupón ${CUPON.codigo}</span><span>−${pesos.format(descuento())}</span></p>` : ''}
        <p class="panel__envio"><span>Envío</span><span>${costoEnvio() ? pesos.format(costoEnvio()) + ' (o gratis desde ' + pesos.format(CONFIG.envio.gratisDesde) + ')' : '¡Gratis!'}</span></p>
        <p class="panel__total"><span>Total</span><span>${pesos.format(total())}</span></p>
      </div>

      ${CUPON.activo && !cuponAplicado ? `
        <button type="button" class="panel__cupon" id="aplicar-cupon">
          🎟️ Aplicar <strong>${esc(CUPON.codigo)}</strong> — ${esc(CUPON.titulo)}
        </button>` : ''}

      <div class="panel__local">
        <p class="modal__sub">¿A qué local le pedís?</p>
        <div class="selector-local" data-selector-local>
          ${CONFIG.locales.map(l => `
            <button type="button" class="selector-local__op${l.id === localElegido ? ' activo' : ''}" data-local="${l.id}">${esc(l.nombre)}</button>`).join('')}
        </div>
      </div>`;

    const waBtn = $('#panel-wa');
    if (waBtn) waBtn.href = linkWhatsapp(localElegido, mensajePedido());
  }

  /* Sugerencias: lo que falta para redondear el pedido */
  function sugerenciasHTML() {
    const faltan = EXTRAS.filter(e => e.sugerido && !pedido.some(p => p.id === e.id));
    if (!faltan.length) return '';
    return `
      <div class="panel__sugeridos">
        <p class="modal__sub">¿Le sumás algo?</p>
        <div class="sugeridos">
          ${faltan.slice(0, 3).map(e => `
            <button type="button" class="sugerido" data-extra="${e.id}">
              <span class="sugerido__ico" aria-hidden="true">${e.icono}</span>
              <span class="sugerido__t">${esc(e.nombre)}</span>
              <span class="sugerido__p">+${pesos.format(e.precio)}</span>
            </button>`).join('')}
        </div>
      </div>`;
  }

  function abrirPanel() {
    $('#panel').classList.add('abierto');
    document.body.style.overflow = 'hidden';
    pintarPedido();
    const c = $('#panel-cerrar');
    if (c) c.focus();
  }
  function cerrarPanel() {
    $('#panel').classList.remove('abierto');
    if (!$('#modal').classList.contains('abierto')) document.body.style.overflow = '';
  }

  function iniciarPanel() {
    $('#panel').addEventListener('click', (e) => {
      if (e.target.id === 'panel-fondo' || e.target.closest('[data-cerrar-panel]')) { cerrarPanel(); return; }

      const mas   = e.target.closest('[data-mas]');
      const menos = e.target.closest('[data-menos]');
      const extra = e.target.closest('[data-extra]');
      const loc   = e.target.closest('[data-local]');

      if (mas)   cambiarCantidad(mas.dataset.mas, 1);
      if (menos) cambiarCantidad(menos.dataset.menos, -1);
      if (extra) {
        const ex = EXTRAS.find(x => x.id === extra.dataset.extra);
        if (ex) { agregar({ ...ex, tipo: 'extra' }); aviso(`${ex.nombre} agregado`); }
      }
      if (loc) {
        localElegido = loc.dataset.local;
        guardar(K_LOCAL, localElegido);
        pintarPedido();
        refrescarLinks();
      }
      if (e.target.closest('#aplicar-cupon')) {
        cuponAplicado = true; persistir(); pintarPedido();
        aviso(`Cupón ${CUPON.codigo} aplicado`);
      }
      if (e.target.closest('#vaciar-pedido')) vaciar();
    });

    $$('[data-abrir-panel]').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); abrirPanel(); }));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarPanel(); });
  }

  /* Avisos cortos de confirmación */
  let avisoTimer;
  function aviso(texto) {
    let el = $('#aviso-flash');
    if (!el) {
      el = document.createElement('div');
      el.id = 'aviso-flash';
      el.className = 'flash';
      document.body.appendChild(el);
    }
    el.textContent = '✓ ' + texto;
    el.classList.add('visible');
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => el.classList.remove('visible'), 2200);
  }

  /* ==========================================================================
     ESTADO DE LA COCINA — urgencia real, calculada del horario
     ========================================================================== */
  function estadoCocina() {
    const ahora = new Date();
    const h = ahora.getHours() + ahora.getMinutes() / 60;
    const { abre, cierra } = CONFIG.cocina;
    const cierraReal = cierra > 24 ? cierra - 24 : cierra;   // 24.5 → 0.5 (00:30)
    const abierto = cierra > 24 ? (h >= abre || h < cierraReal) : (h >= abre && h < cierra);

    if (!abierto) {
      const faltan = h < abre ? abre - h : 24 - h + abre;
      return { abierto: false, texto: `Cocina cerrada · abrimos a las ${String(abre).padStart(2, '0')}:00`, faltan };
    }
    const restante = h >= abre ? (cierra - h) : (cierraReal - h);
    const hh = Math.floor(restante);
    const mm = Math.round((restante - hh) * 60);
    return {
      abierto: true,
      texto: hh > 0 ? `Cocina abierta · cierra en ${hh}h ${mm}m` : `Últimos ${mm} minutos para pedir`,
      restante
    };
  }

  function pintarEstadoCocina() {
    const e = estadoCocina();
    const corto = e.abierto ? 'Abierto ahora' : 'Cerrado';
    $$('[data-cocina]').forEach(el => {
      el.textContent = el.dataset.cocina === 'corto' ? corto : e.texto;
      el.classList.toggle('cerrado', !e.abierto);
    });
    const cinta = $('#cinta-promo');
    if (cinta) cinta.classList.toggle('cinta-promo--cerrado', !e.abierto);
  }

  /* ==========================================================================
     PRUEBA SOCIAL EN VIVO
     ⚠️ Con datos de demostración mientras no haya pedidos reales.
     ========================================================================== */
  function pruebaSocial() {
    if (!CONFIG.PRUEBA_SOCIAL || !PEDIDOS_RECIENTES.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const caja = document.createElement('div');
    caja.className = 'social';
    caja.setAttribute('aria-live', 'polite');
    document.body.appendChild(caja);

    let i = 0;
    const mostrar = () => {
      const p = PEDIDOS_RECIENTES[i % PEDIDOS_RECIENTES.length];
      i++;
      const min = 2 + Math.floor(Math.random() * 25);
      caja.innerHTML = `
        <span class="social__ico" aria-hidden="true">🔥</span>
        <span><strong>${esc(p.nombre)}</strong> pidió <strong>${esc(p.producto)}</strong><br>
        <small>en ${esc(p.local)} · hace ${min} min</small></span>`;
      caja.classList.add('visible');
      setTimeout(() => caja.classList.remove('visible'), 5200);
    };

    setTimeout(() => { mostrar(); setInterval(mostrar, 16000); }, 9000);
  }

  /* ==========================================================================
     NAVEGACIÓN
     ========================================================================== */
  function nav() {
    const barra = $('#nav');
    const menu = $('#nav-menu');
    const burger = $('#nav-burger');

    const alScrollear = () => {
      barra.classList.toggle('nav--fijo', window.scrollY > 24);
      const wa = $('#wa-flotante');
      if (wa) wa.classList.toggle('visible', window.scrollY > 520 && unidades() === 0);
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

  function revelar() {
    const objetivos = $$('[data-revelar]');
    if (!('IntersectionObserver' in window)) { objetivos.forEach(o => o.classList.add('revelado')); return; }
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
     CATÁLOGO
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
            <img src="${b.foto}" alt="Hamburguesa ${esc(b.nombre)} con sus ingredientes señalados" loading="lazy" width="828" height="1262">
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
              <span class="precio">${precio(b.precio)}<small>Precio unitario</small></span>
              <button type="button" class="btn btn--sm btn--oro" data-sumar="${b.id}">Agregar</button>
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
      const ver = e.target.closest('[data-abrir]');
      if (ver) { abrirFicha(ver.dataset.abrir); return; }

      const sumar = e.target.closest('[data-sumar]');
      if (sumar) {
        const b = BURGERS.find(x => x.id === sumar.dataset.sumar);
        if (b) { agregar({ ...b, tipo: 'burger' }); upsell(b); }
        return;
      }

      const combo = e.target.closest('[data-combo]');
      if (combo) {
        const c = COMBOS.find(x => x.id === combo.dataset.combo);
        if (c) { agregar({ ...c, tipo: 'combo' }); aviso(`${c.nombre} agregado`); abrirPanel(); }
      }
    });
  }

  /* ==========================================================================
     UPSELL — el momento en que sube el ticket
     ========================================================================== */
  function upsell(burger) {
    const sugeridos = EXTRAS.filter(e => e.sugerido && !pedido.some(p => p.id === e.id));
    if (!sugeridos.length) { aviso(`${burger.nombre} agregada`); abrirPanel(); return; }

    const caja = $('#upsell');
    caja.innerHTML = `
      <div class="upsell__caja" role="dialog" aria-label="Sumar acompañamiento">
        <p class="upsell__ok">✓ ${esc(burger.nombre)} agregada</p>
        <h3 class="upsell__t">¿Le sumás papas y bebida?</h3>
        <p class="upsell__sub">La mayoría lo pide junto. Lo agregás con un toque.</p>
        <div class="upsell__ops">
          ${sugeridos.map(e => `
            <button type="button" class="sugerido" data-up="${e.id}">
              <span class="sugerido__ico" aria-hidden="true">${e.icono}</span>
              <span class="sugerido__t">${esc(e.nombre)}</span>
              <span class="sugerido__p">+${pesos.format(e.precio)}</span>
            </button>`).join('')}
        </div>
        <div class="upsell__acciones">
          <button type="button" class="btn btn--oro btn--full" data-up-listo>Listo, ver mi pedido</button>
          <button type="button" class="btn btn--fantasma btn--full" data-up-no>Seguir mirando la carta</button>
        </div>
      </div>`;
    caja.classList.add('abierto');
    document.body.style.overflow = 'hidden';
  }

  function iniciarUpsell() {
    const caja = $('#upsell');
    caja.addEventListener('click', (e) => {
      const op = e.target.closest('[data-up]');
      if (op) {
        const ex = EXTRAS.find(x => x.id === op.dataset.up);
        if (ex) { agregar({ ...ex, tipo: 'extra' }); op.classList.add('elegido'); op.disabled = true; }
        return;
      }
      if (e.target.closest('[data-up-listo]')) { caja.classList.remove('abierto'); abrirPanel(); return; }
      if (e.target.closest('[data-up-no]') || e.target === caja) {
        caja.classList.remove('abierto');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     FICHA / DESPIECE
     ========================================================================== */
  let ultimoFoco = null;

  function abrirFicha(id) {
    const b = BURGERS.find(x => x.id === id);
    if (!b) return;
    ultimoFoco = document.activeElement;

    const caja = $('#modal-caja');
    caja.innerHTML = `
      <button type="button" class="modal__cerrar" data-cerrar aria-label="Cerrar">✕</button>
      <div class="despiece">
        <img src="${b.foto}" alt="Hamburguesa ${esc(b.nombre)} con sus ingredientes señalados por flechas">
        ${b.ingredientes.map((i, n) => `<span class="despiece__punto" data-punto="${n}" style="left:${i.x}%; top:${i.y}%"></span>`).join('')}
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
          <span class="modal__nota">Sin bebida ni papas</span>
        </div>

        <div class="modal__acciones">
          <button type="button" class="btn btn--oro" data-sumar="${b.id}" data-cerrar>Agregar al pedido</button>
          <a class="btn btn--fantasma" href="#combos" data-cerrar>Verla en combo</a>
        </div>
        <p class="modal__nota">🔒 ${esc(GARANTIA.titulo)}</p>
      </div>`;

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

    $('#modal').classList.add('abierto');
    document.body.style.overflow = 'hidden';
    $('.modal__cerrar', caja).focus();
  }

  function cerrarFicha() {
    const m = $('#modal');
    if (!m.classList.contains('abierto')) return;
    m.classList.remove('abierto');
    $('#modal-caja').innerHTML = '';
    if (!$('#panel').classList.contains('abierto') && !$('#upsell').classList.contains('abierto')) {
      document.body.style.overflow = '';
    }
    if (ultimoFoco) ultimoFoco.focus();
  }

  function iniciarModal() {
    $('#modal').addEventListener('click', (e) => {
      if (e.target.closest('[data-cerrar]') || e.target.id === 'modal-fondo') cerrarFicha();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarFicha(); });
  }

  /* ==========================================================================
     COMBOS — con el ahorro a la vista
     ========================================================================== */
  function combos() {
    $('#grilla-combos').innerHTML = COMBOS.map(c => {
      const ahorro = c.valorSuelto ? c.valorSuelto - c.precio : 0;
      return `
      <article class="combo${c.destacado ? ' combo--destacado' : ''}">
        ${c.cinta ? `<span class="combo__cinta">${esc(c.cinta)}</span>` : ''}
        <h3 class="combo__nombre">${esc(c.nombre)}</h3>
        <p class="tarjeta__desc">${esc(c.descripcion)}</p>
        <div class="combo__precio">
          <strong>${precio(c.precio)}</strong>
          ${CONFIG.MOSTRAR_PRECIOS && c.valorSuelto ? `<span class="combo__tachado">${pesos.format(c.valorSuelto)}</span>` : ''}
        </div>
        ${CONFIG.MOSTRAR_PRECIOS && ahorro ? `<span class="combo__ahorro">Ahorrás ${pesos.format(ahorro)}</span>` : ''}
        <ul class="combo__lista">${c.incluye.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <button type="button" class="btn btn--full ${c.destacado ? 'btn--oro' : 'btn--fantasma'}" data-combo="${c.id}">
          Agregar al pedido
        </button>
      </article>`;
    }).join('');
  }

  /* ==========================================================================
     SELLOS, REPUTACIÓN, TESTIMONIOS, FAQ, LOCALES
     ========================================================================== */
  function sellos() {
    const c = $('#sellos');
    if (c) c.innerHTML = SELLOS.map(s => `
      <div class="sello">
        <span class="sello__ico" aria-hidden="true">${s.icono}</span>
        <div><strong>${esc(s.titulo)}</strong><span>${esc(s.texto)}</span></div>
      </div>`).join('');
  }

  function testimonios() {
    const rep = $('#reputacion');
    if (rep) rep.innerHTML = `
      <span class="reputacion__nota">${REPUTACION.puntaje.toFixed(1)}</span>
      <span class="reputacion__estrellas" aria-hidden="true">★★★★★</span>
      <span class="reputacion__txt">sobre ${REPUTACION.cantidad} opiniones en ${esc(REPUTACION.fuente)}</span>`;

    $('#grilla-testimonios').innerHTML = TESTIMONIOS.map(t => `
      <article class="testimonio">
        <div class="testimonio__estrellas" aria-label="${t.estrellas} de 5 estrellas">${'★'.repeat(t.estrellas)}${'☆'.repeat(5 - t.estrellas)}</div>
        <p class="testimonio__texto">“${esc(t.texto)}”</p>
        <div class="testimonio__autor">
          <span class="testimonio__avatar" aria-hidden="true">${esc(t.nombre.trim().charAt(0).toUpperCase())}</span>
          <div><strong>${esc(t.nombre)}</strong><span>${esc(t.detalle)}</span></div>
        </div>
      </article>`).join('');
  }

  function garantia() {
    const g = $('#garantia');
    if (g) g.innerHTML = `
      <span class="garantia__sello" aria-hidden="true">🛡️</span>
      <div>
        <h3 class="garantia__t">${esc(GARANTIA.titulo)}</h3>
        <p class="garantia__p">${esc(GARANTIA.texto)}</p>
      </div>`;
  }

  function faq() {
    const c = $('#faq');
    if (!c) return;
    c.innerHTML = FAQ.map((f, i) => `
      <div class="faq__item">
        <button type="button" class="faq__p" aria-expanded="false" aria-controls="faq-r-${i}">
          <span>${esc(f.p)}</span><i aria-hidden="true">+</i>
        </button>
        <div class="faq__r" id="faq-r-${i}" hidden><p>${esc(f.r)}</p></div>
      </div>`).join('');

    c.addEventListener('click', (e) => {
      const b = e.target.closest('.faq__p');
      if (!b) return;
      const abierto = b.getAttribute('aria-expanded') === 'true';
      $$('.faq__p', c).forEach(o => {
        o.setAttribute('aria-expanded', 'false');
        o.nextElementSibling.hidden = true;
      });
      if (!abierto) {
        b.setAttribute('aria-expanded', 'true');
        b.nextElementSibling.hidden = false;
      }
    });
  }

  function locales() {
    $('#grilla-locales').innerHTML = CONFIG.locales.map(l => {
      const wa = linkWhatsapp(l.id, saludo(`Quiero hacer un pedido en el local de ${l.nombre}.`));
      const hayWa = wa !== '#locales';
      return `
      <article class="local" id="local-${l.id}">
        <header class="local__cabecera">
          <div>
            <p class="modal__sub">${esc(l.subtitulo)}</p>
            <h3 class="local__nombre">${esc(l.nombre)}</h3>
          </div>
          <span class="local__estado"><i></i><span data-cocina="corto">Cocina</span></span>
        </header>
        <div class="local__cuerpo">
          <p class="local__fila"><i>📍</i><span><strong>Dirección</strong>${esc(l.direccion)}</span></p>
          <p class="local__fila"><i>🕗</i><span><strong>Horarios</strong>${esc(l.horarios)}</span></p>
          <p class="local__fila"><i>📞</i><span><strong>Teléfono</strong>${esc(l.telefono || 'A confirmar')}</span></p>
          <p class="local__fila"><i>🛵</i><span><strong>Delivery</strong>${esc(CONFIG.envio.demora)} · envío ${pesos.format(CONFIG.envio.costo)} (gratis desde ${pesos.format(CONFIG.envio.gratisDesde)})</span></p>
          <div class="local__acciones">
            <a class="btn btn--wa${hayWa ? '' : ' btn--desactivado'}" href="${wa}"${hayWa ? ' target="_blank" rel="noopener"' : ''} data-wa-local="${l.id}">
              ${hayWa ? 'Pedir por WhatsApp' : 'WhatsApp a confirmar'}
            </a>
            <a class="btn btn--fantasma" href="${l.mapa || 'https://www.google.com/maps/search/' + encodeURIComponent('D Burgers ' + l.nombre)}" target="_blank" rel="noopener">Cómo llegar</a>
          </div>
        </div>
      </article>`;
    }).join('');
    pintarEstadoCocina();
  }

  /* Links de WhatsApp sueltos: siempre llevan el pedido armado si hay algo */
  function refrescarLinks() {
    $$('[data-wa]').forEach(a => { a.href = linkWhatsapp(localElegido, mensajePedido()); });
    $$('[data-wa-local]').forEach(a => {
      const id = a.dataset.waLocal;
      const l = buscarLocal(id);
      const msg = pedido.length ? mensajePedido().replace(/Local: .*/, `Local: ${l.nombre}`)
                                : saludo(`Quiero hacer un pedido en el local de ${l.nombre}.`);
      const link = linkWhatsapp(id, msg);
      if (link !== '#locales') a.href = link;
    });
    const p = $('#panel-wa');
    if (p) p.href = linkWhatsapp(localElegido, mensajePedido());
  }

  /* ==========================================================================
     CUPÓN EN LA CINTA SUPERIOR
     ========================================================================== */
  function cintaPromo() {
    if (!CUPON.activo) return;
    const c = $('#cinta-promo');
    if (!c) return;
    c.innerHTML = `
      <div class="contenedor cinta-promo__inner">
        <span class="cinta-promo__tag">🎟️ ${esc(CUPON.titulo)}</span>
        <button type="button" class="cinta-promo__cod" id="copiar-cupon" title="Copiar código">
          ${esc(CUPON.codigo)} <small>copiar</small>
        </button>
        <span class="cinta-promo__estado" data-cocina></span>
      </div>`;
    $('#copiar-cupon').addEventListener('click', () => {
      cuponAplicado = true; persistir(); pintarPedido(); refrescarLinks();
      if (navigator.clipboard) navigator.clipboard.writeText(CUPON.codigo).catch(() => {});
      aviso(`Código ${CUPON.codigo} copiado y aplicado`);
    });
    pintarEstadoCocina();
  }

  /* ==========================================================================
     ARRANQUE
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    cintaPromo();
    nav();
    catalogo();
    iniciarModal();
    iniciarUpsell();
    iniciarPanel();
    combos();
    sellos();
    testimonios();
    garantia();
    faq();
    locales();
    pintarPedido();
    refrescarLinks();
    revelar();
    pruebaSocial();
    pintarEstadoCocina();
    setInterval(pintarEstadoCocina, 60000);
    document.addEventListener('click', refrescarLinks);
    $('#anio').textContent = new Date().getFullYear();
  });
})();
