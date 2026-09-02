/* ==============================================================
   INFINIT ACADEMY — Checkout
   Resumen del pedido, cupones, medios de pago y envío.
   ============================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const params = new URLSearchParams(location.search);
  const planId = ACADEMY.productos[params.get('plan')] ? params.get('plan') : 'combo';
  const plan = ACADEMY.productos[planId];

  // El order bump solo aplica a los cursos individuales: los lleva al combo.
  const bumpAplica = planId === 'barberia' || planId === 'tatuaje';
  const combo = ACADEMY.productos.combo;
  const bumpExtra = combo.precio - plan.precio;

  const form = $('#coForm');
  const bump = $('#bump');

  let cupon = null; // cupón aplicado, si hay

  /* ---------- Aviso de preventa ------------------------------- */
  const pv = ACADEMY.config.preventa;
  if (pv && pv.activo) {
    const box = $('#preventaBox');
    box.innerHTML = `
      <b>📅 Estás comprando un acceso de fundador</b>
      <p class="small muted" style="margin:.5rem 0 0">
        El curso se está publicando por partes. Hoy recibís <b>${pv.entregaHoy}</b>.
        Después sube <b>${pv.ritmo.toLowerCase()}</b> hasta quedar completo en <b>${pv.completo.toLowerCase()}</b>.
        A cambio de esperar te llevás: ${pv.beneficio.toLowerCase()}.
      </p>
      <p class="tiny muted" style="margin:.5rem 0 0">
        La garantía de ${ACADEMY.config.diasGarantia} días corre igual desde hoy: si no te convence, te devuelvo todo.
      </p>`;
    box.classList.remove('hide');
  }

  /* ---------- Pintar el resumen ------------------------------- */
  const pintar = () => {
    const conBump = bumpAplica && bump && bump.checked;
    const actual = conBump ? combo : plan;

    $('#sumNombre').textContent = actual.nombre;
    $('#sumPara').textContent = actual.para;
    $('#sumTag').textContent = conBump ? 'Pack combinado' : 'Tu pedido';

    $('#sumIncluye').innerHTML = actual.incluye
      .map((i) => `<li class="small" style="color:var(--tx-soft)">✓ ${i}</li>`)
      .join('');

    $('#sumLabel1').textContent = plan.nombre;
    $('#sumP1').textContent = fmtARS(plan.precioAnterior || plan.precio);

    const rowBump = $('#sumRowBump');
    rowBump.classList.toggle('hide', !conBump);
    if (conBump) $('#sumP2').textContent = fmtARS(bumpExtra);

    const listaBase = conBump ? combo.precioAnterior : plan.precioAnterior || plan.precio;
    const subtotal = conBump ? combo.precio : plan.precio;
    const ahorro = Math.max(0, listaBase - subtotal);

    $('#sumDesc').textContent = ahorro ? '− ' + fmtARS(ahorro) : '—';

    // Cupón encima del precio ya rebajado
    const descCupon = Cupones.descuento(cupon, subtotal);
    const filaCupon = $('#sumRowCupon');
    filaCupon.classList.toggle('hide', !descCupon);
    if (descCupon) {
      $('#sumCuponLabel').textContent = Cupones.etiqueta(cupon);
      $('#sumCuponVal').textContent = '− ' + fmtARS(descCupon);
    }

    const total = subtotal - descCupon;
    $('#sumTotal').textContent = fmtARS(total);

    $('#sumCuotas').textContent =
      actual.cuotas > 1
        ? `o ${actual.cuotas} cuotas sin interés de ${cuotaDe(total, actual.cuotas)} con tarjeta de crédito`
        : 'Pago único';

    $('#coBtn').textContent = `Confirmar por ${fmtARS(total)}`;
    return { actual, total, subtotal, descCupon, conBump };
  };

  /* ---------- Order bump -------------------------------------- */
  if (bumpAplica) {
    $('#bumpBox').classList.remove('hide');
    $('#bumpPrecio').textContent = fmtARS(bumpExtra);
    bump.addEventListener('change', () => {
      pintar();
      if (bump.checked) track('bump_aceptado', { producto: 'combo', valor: combo.precio });
    });
  }

  /* ---------- Cupones ----------------------------------------- */
  const cuponMsg = $('#cuponMsg');

  const aplicarCupon = (codigo, silencioso) => {
    const prodId = bumpAplica && bump && bump.checked ? 'combo' : planId;
    const r = Cupones.buscar(codigo, prodId);
    cuponMsg.classList.remove('hide', 'ok', 'err');

    if (!r || r.error) {
      cupon = null;
      if (silencioso) { cuponMsg.classList.add('hide'); }
      else { cuponMsg.textContent = r ? r.error : 'Ese código no existe.'; cuponMsg.classList.add('err'); }
    } else {
      cupon = r;
      cuponMsg.textContent = `✓ Cupón aplicado: ${Cupones.etiqueta(r)}`;
      cuponMsg.classList.add('ok');
      sessionStorage.setItem('ia_cupon', r.codigo);
      track('cupon_aplicado', { producto: prodId, cupon: r.codigo });
    }
    pintar();
  };

  $('#cuponAbrir').addEventListener('click', () => {
    $('#cuponBox').classList.toggle('hide');
    $('#cuponInput').focus();
  });
  $('#cuponBtn').addEventListener('click', () => aplicarCupon($('#cuponInput').value));
  $('#cuponInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); aplicarCupon($('#cuponInput').value); }
  });

  // Cupón que viene en el link (?cupon=INSTA10) o de una visita anterior
  const cuponPrevio = Cupones.deURL();
  if (cuponPrevio) {
    $('#cuponBox').classList.remove('hide');
    $('#cuponInput').value = cuponPrevio;
    aplicarCupon(cuponPrevio, true);
  }

  pintar();

  /* ---------- Medios de pago (solo los configurados) ---------- */
  const medios = Pagos.disponibles(planId);
  $('#pagos').innerHTML = medios
    .map(
      (m, i) => `
      <label class="paybox ${i === 0 ? 'is-sel' : ''}">
        <input type="radio" name="pago" value="${m.id}" ${i === 0 ? 'checked' : ''}>
        <div><b>${m.titulo}</b><p>${m.detalle}</p></div>
      </label>`
    )
    .join('');

  const t = ACADEMY.pagos.transferencia;
  if (t.activo) {
    $('#tAlias').textContent = t.alias;
    $('#tCbu').textContent = t.cbu;
    $('#tTitular').textContent = t.titular;
  }

  const sinMercadoPago = !medios.some((m) => m.id === 'mercadopago');
  if (sinMercadoPago) {
    // Sin link de Mercado Pago cargado, el botón no promete pago online.
    $('#coBtn').dataset.modo = 'whatsapp';
  }

  $$('#pagos .paybox').forEach((box) => {
    box.addEventListener('click', () => {
      $$('#pagos .paybox').forEach((b) => b.classList.remove('is-sel'));
      box.classList.add('is-sel');
      const val = box.querySelector('input').value;
      $('#datosTransfer').classList.toggle('hide', val !== 'transferencia');
    });
  });

  /* ---------- Guardar lo que va escribiendo ------------------- */
  const BORRADOR = 'ia_checkout_borrador';

  const guardarBorrador = () => {
    const fd = Object.fromEntries(new FormData(form));
    if (!fd.nombre && !fd.email && !fd.tel) return;
    localStorage.setItem(
      BORRADOR,
      JSON.stringify({ plan: planId, datos: fd, fecha: Date.now() })
    );
  };
  form.addEventListener('input', guardarBorrador);

  /* ---------- Retomar un pedido a medio hacer ----------------- */
  (() => {
    let b;
    try { b = JSON.parse(localStorage.getItem(BORRADOR) || 'null'); } catch { return; }
    if (!b || !b.datos || !b.datos.nombre) return;
    // Solo tiene sentido ofrecerlo dentro de los 7 días.
    if (Date.now() - b.fecha > 7 * 864e5) { localStorage.removeItem(BORRADOR); return; }

    const box = $('#retomarBox');
    box.innerHTML = `
      <b>👋 Hola de nuevo, ${b.datos.nombre.split(' ')[0]}</b>
      <p class="small muted" style="margin:.5rem 0 .8rem">
        Habías empezado tu inscripción y no la terminaste. ¿Seguimos desde ahí?
      </p>
      <div class="row" style="gap:.6rem">
        <button type="button" class="btn btn--sm btn--primary" id="retomarSi">Sí, completar mis datos</button>
        <button type="button" class="btn btn--sm btn--ghost" id="retomarNo">Empezar de cero</button>
      </div>`;
    box.classList.remove('hide');
    track('retomar_ofrecido', { producto: b.plan });

    $('#retomarSi').addEventListener('click', () => {
      Object.entries(b.datos).forEach(([k, v]) => {
        const el = form.elements[k];
        if (el && el.type !== 'radio' && el.type !== 'checkbox') el.value = v;
      });
      box.classList.add('hide');
      track('retomar_aceptado', { producto: b.plan });
    });
    $('#retomarNo').addEventListener('click', () => {
      localStorage.removeItem(BORRADOR);
      box.classList.add('hide');
    });
  })();

  track('checkout_iniciado', { producto: planId, valor: plan.precio });

  /* ---------- Mandar el pedido a Netlify (te llega por mail) -- */
  const avisarNetlify = (orden) => {
    const cuerpo = new URLSearchParams({
      'form-name': 'inscripcion',
      pedido: orden.id,
      curso: orden.productoNombre,
      total: String(orden.total),
      cupon: orden.cupon || '',
      medio: orden.medioTexto,
      nombre: orden.cliente.nombre,
      email: orden.cliente.email,
      whatsapp: orden.cliente.tel,
      dni: orden.cliente.dni,
      ciudad: orden.cliente.ciudad,
    });
    // Si falla (sitio local o Forms apagado) no se interrumpe la compra.
    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: cuerpo.toString(),
    }).catch(() => {});
  };

  /* ---------- Envío ------------------------------------------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const requeridos = ['nombre', 'email', 'tel'];
    for (const name of requeridos) {
      const input = form.elements[name];
      if (!input.value.trim()) {
        input.focus();
        input.style.borderColor = 'var(--danger)';
        return;
      }
      input.style.borderColor = '';
    }

    const { actual, total, descCupon } = pintar();
    const fd = Object.fromEntries(new FormData(form));
    const medio = form.elements.pago.value;

    const medioTxt = {
      mercadopago: 'Mercado Pago (tarjeta o efectivo)',
      transferencia: 'Transferencia bancaria',
      whatsapp: 'Coordinar por WhatsApp',
    }[medio];

    const orden = {
      id: 'IA-' + Date.now().toString(36).toUpperCase(),
      producto: actual.id,
      productoNombre: actual.nombre,
      total,
      descuento: descCupon,
      cupon: cupon ? cupon.codigo : '',
      medio,
      medioTexto: medioTxt,
      cliente: {
        nombre: fd.nombre,
        email: fd.email,
        tel: fd.tel,
        dni: fd.dni || '',
        ciudad: fd.ciudad || '',
      },
      fecha: new Date().toISOString(),
    };

    const ordenes = JSON.parse(localStorage.getItem('ia_ordenes') || '[]');
    ordenes.push(orden);
    localStorage.setItem('ia_ordenes', JSON.stringify(ordenes));
    localStorage.setItem('ia_ultima_orden', JSON.stringify(orden));
    localStorage.removeItem(BORRADOR);

    track('compra_confirmada', {
      producto: actual.id,
      valor: total,
      medio,
      cupon: orden.cupon,
    });

    avisarNetlify(orden);

    const mpLink = Pagos.linkMP(actual.id);
    if (medio === 'mercadopago' && mpLink) {
      window.open(mpLink, '_blank', 'noopener');
    } else {
      window.open(waLink(Pagos.mensajePedido(orden)), '_blank', 'noopener');
    }

    location.href = 'gracias.html?orden=' + orden.id;
  });
})();
