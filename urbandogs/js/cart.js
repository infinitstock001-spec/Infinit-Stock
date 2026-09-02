/* =========================================================================
   URBAN DOG'S — Carrito y checkout
   -------------------------------------------------------------------------
   El pedido se guarda en el navegador del cliente (no se pierde si recarga)
   y se cierra por WhatsApp con el detalle ya escrito.
   ========================================================================= */

const UD_CART = (() => {
  const CFG = window.UD_CONFIG;
  const LS_KEY = 'urbandogs.pedido.v1';

  let state = { items: [], cupon: null, modo: 'delivery' };
  const listeners = [];

  /* ------------------------- utilidades ------------------------- */
  const money = (n) => CFG.ventas.moneda + Math.round(n).toLocaleString('es-AR');
  const uid = () => 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function guardar() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { /* modo privado */ }
  }
  function cargar() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d && Array.isArray(d.items)) state = Object.assign(state, d);
    } catch (e) { /* dato corrupto: arrancamos limpio */ }
  }

  function emitir() {
    guardar();
    listeners.forEach((fn) => fn(state));
  }
  const onChange = (fn) => { listeners.push(fn); return fn; };

  /* ------------------------- operaciones ------------------------- */
  function add(producto, opts = {}) {
    const clave = producto.id + '|' + (opts.extra || '');
    const existente = state.items.find((i) => i.clave === clave);
    const cant = opts.cant || 1;

    if (existente) {
      existente.qty += cant;
    } else {
      state.items.push({
        uid: uid(),
        clave,
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        qty: cant,
        extra: opts.extra || '',
        art: opts.art || producto.art || null,
        foto: producto.foto || ''
      });
    }
    emitir();
    return true;
  }

  function quitar(u) {
    state.items = state.items.filter((i) => i.uid !== u);
    emitir();
  }

  function setQty(u, n) {
    const it = state.items.find((i) => i.uid === u);
    if (!it) return;
    it.qty = Math.max(0, n);
    if (it.qty === 0) return quitar(u);
    emitir();
  }

  function vaciar() {
    state.items = [];
    state.cupon = null;
    emitir();
  }

  function setModo(m) {
    state.modo = m === 'retiro' ? 'retiro' : 'delivery';
    emitir();
  }

  /* ------------------------- cupones ------------------------- */
  function aplicarCupon(codigo) {
    const cod = String(codigo || '').trim().toUpperCase();
    if (!cod) return { ok: false, msg: 'Escribí un código.' };

    const c = (CFG.ventas.cupones || []).find((x) => x.codigo.toUpperCase() === cod);
    if (!c) return { ok: false, msg: 'Ese cupón no existe o ya venció.' };

    const sub = subtotal();
    if (sub < (c.min || 0)) {
      return { ok: false, msg: `El cupón ${c.codigo} se activa desde ${money(c.min)}. Te faltan ${money(c.min - sub)}.` };
    }

    state.cupon = c;
    emitir();
    return { ok: true, msg: `Cupón ${c.codigo} aplicado: ${c.texto}.` };
  }

  function sacarCupon() { state.cupon = null; emitir(); }

  /* ------------------------- totales ------------------------- */
  const subtotal = () => state.items.reduce((a, i) => a + i.precio * i.qty, 0);
  const unidades = () => state.items.reduce((a, i) => a + i.qty, 0);

  function totales() {
    const sub = subtotal();
    const v = CFG.ventas;
    let desc = 0;
    let envio = 0;

    if (state.modo === 'delivery' && sub > 0) {
      envio = (v.envioGratisDesde > 0 && sub >= v.envioGratisDesde) ? 0 : (v.costoEnvio || 0);
    }

    const c = state.cupon;
    if (c && sub >= (c.min || 0)) {
      if (c.tipo === 'porcentaje') desc = Math.round(sub * (c.valor / 100));
      else if (c.tipo === 'monto')  desc = Math.min(c.valor, sub);
      else if (c.tipo === 'envio')  { desc = 0; envio = 0; }
    } else if (c) {
      state.cupon = null; // el carrito bajó del mínimo
    }

    return {
      sub,
      desc,
      envio,
      total: Math.max(0, sub - desc + envio),
      faltaEnvioGratis: Math.max(0, (v.envioGratisDesde || 0) - sub),
      cumpleMinimo: state.modo === 'retiro' || sub >= (v.pedidoMinimo || 0),
      faltaMinimo: Math.max(0, (v.pedidoMinimo || 0) - sub)
    };
  }

  /* ------------------------- mensaje de WhatsApp ------------------------- */
  function mensaje(datos) {
    const t = totales();
    const L = [];
    const linea = '━━━━━━━━━━━━━━━━━━━━';

    L.push(`*NUEVO PEDIDO — ${CFG.marca.nombre}*`);
    L.push(linea);
    L.push('');

    state.items.forEach((i) => {
      L.push(`*${i.qty}x* ${i.nombre} — ${money(i.precio * i.qty)}`);
      if (i.extra) L.push(`     _${i.extra}_`);
    });

    L.push('');
    L.push(linea);
    L.push(`Subtotal: ${money(t.sub)}`);
    if (t.desc > 0) L.push(`Descuento (${state.cupon.codigo}): -${money(t.desc)}`);
    if (state.modo === 'delivery') {
      L.push(`Envío: ${t.envio === 0 ? '¡GRATIS! 🎉' : money(t.envio)}`);
    }
    L.push(`*TOTAL: ${money(t.total)}*`);
    L.push(linea);
    L.push('');

    L.push(`*Entrega:* ${state.modo === 'delivery' ? 'Delivery 🛵' : 'Retiro por el local 🏠'}`);
    L.push(`*Nombre:* ${datos.nombre}`);
    L.push(`*Teléfono:* ${datos.tel}`);

    if (state.modo === 'delivery') {
      L.push(`*Dirección:* ${datos.dir}`);
      if (datos.ref) L.push(`*Referencia:* ${datos.ref}`);
    }

    L.push(`*Pago:* ${datos.pago}`);
    if (datos.cambio) L.push(`*Abona con:* ${datos.cambio}`);
    if (/transferencia|mercado/i.test(datos.pago) && CFG.ventas.aliasTransferencia) {
      L.push(`_(Alias para transferir: ${CFG.ventas.aliasTransferencia})_`);
    }
    if (datos.nota) {
      L.push('');
      L.push(`*Aclaraciones:* ${datos.nota}`);
    }

    L.push('');
    L.push(`_Pedido armado desde la web · ${new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}_`);

    return L.join('\n');
  }

  function enlaceWhatsApp(texto) {
    const num = String(CFG.contacto.whatsapp || '').replace(/\D/g, '');
    return `https://wa.me/${num}?text=${encodeURIComponent(texto)}`;
  }

  /* ------------------------- validación del checkout ------------------------- */
  function validar(datos) {
    const errores = [];
    if (!datos.nombre || datos.nombre.trim().length < 2) errores.push('Necesitamos tu nombre.');
    const tel = String(datos.tel || '').replace(/\D/g, '');
    if (tel.length < 8) errores.push('Escribí un teléfono válido para poder avisarte.');
    if (state.modo === 'delivery' && (!datos.dir || datos.dir.trim().length < 6)) {
      errores.push('Poné la dirección completa con altura.');
    }
    if (!state.items.length) errores.push('Tu pedido está vacío.');
    const t = totales();
    if (!t.cumpleMinimo) errores.push(`El pedido mínimo para delivery es ${money(CFG.ventas.pedidoMinimo)}.`);
    return errores;
  }

  cargar();

  return {
    get state() { return state; },
    money, add, quitar, setQty, vaciar, setModo,
    aplicarCupon, sacarCupon,
    subtotal, unidades, totales,
    mensaje, enlaceWhatsApp, validar, onChange, emitir
  };
})();

window.UD_CART = UD_CART;
