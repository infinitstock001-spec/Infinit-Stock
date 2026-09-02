/* ============================================================
   INFINIT ACADEMY — Checkout
   ============================================================ */
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

  /* ---------- Pintar resumen ---------- */
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
    const total = conBump ? combo.precio : plan.precio;
    const ahorro = Math.max(0, listaBase - total);

    $('#sumDesc').textContent = ahorro ? '− ' + fmtARS(ahorro) : '—';
    $('#sumTotal').textContent = fmtARS(total);

    $('#sumCuotas').textContent =
      actual.cuotas > 1
        ? `o ${actual.cuotas} cuotas sin interés de ${cuotaDe(total, actual.cuotas)} con tarjeta de crédito`
        : 'Pago único';

    $('#coBtn').textContent = `Confirmar por ${fmtARS(total)}`;
    return { actual, total, conBump };
  };

  /* ---------- Order bump ---------- */
  if (bumpAplica) {
    $('#bumpBox').classList.remove('hide');
    $('#bumpPrecio').textContent = fmtARS(bumpExtra);
    bump.addEventListener('change', pintar);
  }

  pintar();

  /* ---------- Selección de medio de pago ---------- */
  const t = ACADEMY.pagos.transferencia;
  $('#tAlias').textContent = t.alias;
  $('#tCbu').textContent = t.cbu;
  $('#tTitular').textContent = t.titular;

  $$('#pagos .paybox').forEach((box) => {
    box.addEventListener('click', () => {
      $$('#pagos .paybox').forEach((b) => b.classList.remove('is-sel'));
      box.classList.add('is-sel');
      const val = box.querySelector('input').value;
      $('#datosTransfer').classList.toggle('hide', val !== 'transferencia');
    });
  });

  /* ---------- Envío ---------- */
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

    const { actual, total } = pintar();
    const fd = Object.fromEntries(new FormData(form));
    const medio = form.elements.pago.value;

    const orden = {
      id: 'IA-' + Date.now().toString(36).toUpperCase(),
      producto: actual.id,
      productoNombre: actual.nombre,
      total,
      medio,
      cliente: {
        nombre: fd.nombre,
        email: fd.email,
        tel: fd.tel,
        dni: fd.dni || '',
        ciudad: fd.ciudad || '',
      },
      fecha: new Date().toISOString(),
    };

    // Se guarda localmente para que puedas recuperar el pedido y para la página de gracias.
    const ordenes = JSON.parse(localStorage.getItem('ia_ordenes') || '[]');
    ordenes.push(orden);
    localStorage.setItem('ia_ordenes', JSON.stringify(ordenes));
    localStorage.setItem('ia_ultima_orden', JSON.stringify(orden));

    const medioTxt = {
      mercadopago: 'Mercado Pago (tarjeta o efectivo)',
      transferencia: 'Transferencia bancaria',
      whatsapp: 'Coordinar por WhatsApp',
    }[medio];

    const msg =
      `INSCRIPCIÓN ${orden.id}\n\n` +
      `Curso: ${actual.nombre}\n` +
      `Total: ${fmtARS(total)}\n` +
      `Forma de pago: ${medioTxt}\n\n` +
      `Nombre: ${fd.nombre}\n` +
      `Email: ${fd.email}\n` +
      `WhatsApp: ${fd.tel}\n` +
      (fd.dni ? `DNI: ${fd.dni}\n` : '') +
      (fd.ciudad ? `Ciudad: ${fd.ciudad}\n` : '') +
      `\nQuedo a la espera de los datos para completar el pago.`;

    // Si hay link de Mercado Pago cargado, se abre el checkout real.
    const mpLink = ACADEMY.pagos.mercadopago.links[actual.id];
    if (medio === 'mercadopago' && ACADEMY.pagos.mercadopago.activo && mpLink) {
      window.open(mpLink, '_blank', 'noopener');
    } else {
      window.open(waLink(msg), '_blank', 'noopener');
    }

    location.href = 'gracias.html?orden=' + orden.id;
  });
})();
