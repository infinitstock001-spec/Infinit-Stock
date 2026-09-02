/* ==============================================================
   INFINIT ACADEMY — Motor de cobro
   Cupones, cálculo del total y elección del medio de pago.
   Lee todo de js/config.js. No hace falta tocar este archivo.
   ============================================================== */
(() => {
  'use strict';

  const CFG = window.IA_CONFIG || {};

  /* ---------- Cupones ---------------------------------------- */
  const Cupones = {
    /* Busca un código y devuelve el cupón si sirve para ese producto. */
    buscar(codigo, productoId) {
      if (!codigo) return null;
      const c = (CFG.cupones || []).find(
        (x) => x.codigo.toUpperCase() === String(codigo).trim().toUpperCase()
      );
      if (!c) return { error: 'Ese código no existe.' };
      if (c.vence && new Date(c.vence) < new Date()) {
        return { error: 'Ese cupón ya venció.' };
      }
      if (c.productos && c.productos.length && !c.productos.includes(productoId)) {
        return { error: 'Ese cupón no aplica a este curso.' };
      }
      return c;
    },

    /* Cuántos pesos descuenta sobre un total. */
    descuento(cupon, total) {
      if (!cupon || cupon.error) return 0;
      const d = cupon.tipo === 'porcentaje'
        ? Math.round((total * cupon.valor) / 100)
        : cupon.valor;
      return Math.min(d, total - 1); // nunca deja el total en cero
    },

    /* Texto para mostrar en el resumen. */
    etiqueta(cupon) {
      if (!cupon || cupon.error) return '';
      return cupon.tipo === 'porcentaje'
        ? `${cupon.codigo} · −${cupon.valor}%`
        : `${cupon.codigo} · −${fmtARS(cupon.valor)}`;
    },

    /* Lee un cupón de la URL: ?cupon=INSTA10 — sirve para los links
       que pegás en la bio de Instagram o mandás por WhatsApp. */
    deURL() {
      const v = new URLSearchParams(location.search).get('cupon');
      if (v) sessionStorage.setItem('ia_cupon', v.toUpperCase());
      return sessionStorage.getItem('ia_cupon') || '';
    },
  };

  /* ---------- Medios de pago disponibles ---------------------- */
  const Pagos = {
    /* Devuelve solo los medios que están realmente configurados,
       para no ofrecerle al cliente algo que no vas a poder cobrar. */
    disponibles(productoId) {
      const lista = [];
      const mp = CFG.mercadopago || {};
      const linkMP = (mp.links || {})[productoId] || '';

      if (mp.activo && linkMP) {
        lista.push({
          id: 'mercadopago',
          titulo: 'Mercado Pago · Tarjeta de crédito o débito',
          detalle: 'Hasta 6 cuotas sin interés. También Rapipago y Pago Fácil en efectivo. El acceso se habilita apenas se acredita.',
          link: linkMP,
        });
      }

      const t = CFG.transferencia || {};
      if (t.alias && t.cbu) {
        lista.push({
          id: 'transferencia',
          titulo: 'Transferencia bancaria',
          detalle: 'Transferís, mandás el comprobante por WhatsApp y te habilito el acceso el mismo día.',
        });
      }

      lista.push({
        id: 'whatsapp',
        titulo: lista.length ? 'Coordinar por WhatsApp' : 'Reservar tu lugar por WhatsApp',
        detalle: lista.length
          ? 'Si preferís hablar antes de pagar, arreglamos por chat. Contesto yo, no un bot.'
          : 'Te paso los datos de pago y coordinamos. Contesto yo, no un bot.',
      });

      return lista;
    },

    /* El link de Mercado Pago de un producto, si existe. */
    linkMP(productoId) {
      const mp = CFG.mercadopago || {};
      return mp.activo ? (mp.links || {})[productoId] || '' : '';
    },

    /* Arma el mensaje de WhatsApp con el pedido completo. */
    mensajePedido(orden) {
      const l = [];
      l.push(`INSCRIPCIÓN ${orden.id}`);
      l.push('');
      l.push(`Curso: ${orden.productoNombre}`);
      if (orden.cupon) l.push(`Cupón aplicado: ${orden.cupon}`);
      if (orden.descuento) l.push(`Descuento: −${fmtARS(orden.descuento)}`);
      l.push(`Total: ${fmtARS(orden.total)}`);
      l.push(`Forma de pago: ${orden.medioTexto}`);
      l.push('');
      l.push(`Nombre: ${orden.cliente.nombre}`);
      l.push(`Email: ${orden.cliente.email}`);
      l.push(`WhatsApp: ${orden.cliente.tel}`);
      if (orden.cliente.dni) l.push(`DNI: ${orden.cliente.dni}`);
      if (orden.cliente.ciudad) l.push(`Ciudad: ${orden.cliente.ciudad}`);
      l.push('');
      l.push('Quedo a la espera para completar el pago.');
      return l.join('\n');
    },
  };

  window.Cupones = Cupones;
  window.Pagos = Pagos;
})();
