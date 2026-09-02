/* =========================================================================
   URBAN DOG'S — Panel de configuración
   -------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITÁS TOCAR PARA PONER EL SITIO EN MARCHA.
   Todo lo que está marcado con  ⚠️  son datos de ejemplo: reemplazalos por
   los datos reales del local antes de publicar.
   ========================================================================= */

const UD_CONFIG = {

  /* ---------------------------------------------------------------
     1) MARCA
     --------------------------------------------------------------- */
  marca: {
    nombre: "Urban Dog's",
    slogan: 'Panchos artesanales de verdad',
    bajada: 'Pan brioche horneado en casa, salchicha artesanal ahumada 12 h y salsas hechas el mismo día.',
    ciudad: 'Buenos Aires',            // ⚠️
    anioFundacion: 2019                // ⚠️
  },

  /* ---------------------------------------------------------------
     2) CONTACTO  ⚠️  CAMBIAR TODO ESTE BLOQUE
     --------------------------------------------------------------- */
  contacto: {
    // Número de WhatsApp en formato internacional, SOLO números.
    // Argentina: 54 + 9 + código de área sin 0 + número sin 15.
    // Ejemplo real: 5491123456789
    whatsapp: '5491100000000',         // ⚠️
    telefonoVisible: '+54 9 11 0000-0000', // ⚠️
    email: 'hola@urbandogs.com.ar',    // ⚠️
    direccion: 'Av. Corrientes 1234',  // ⚠️
    barrio: 'Balvanera, CABA',         // ⚠️
    codigoPostal: 'C1043',             // ⚠️
    mapsQuery: 'Av. Corrientes 1234, CABA', // se usa para el botón "Cómo llegar"
    instagram: 'https://instagram.com/urbandogs', // ⚠️
    tiktok: 'https://tiktok.com/@urbandogs',      // ⚠️
    facebook: ''                                  // dejalo vacío si no usás
  },

  /* ---------------------------------------------------------------
     3) HORARIOS — se muestran en el sitio y se usan para el cartel
        "Abierto ahora / Cerrado". 0 = domingo … 6 = sábado.
        abre / cierra en formato 24 h. Si cierra pasada la medianoche,
        poné el horario igual (ej. 19:00 a 01:00) y el sistema lo entiende.
     --------------------------------------------------------------- */
  horarios: [
    { dia: 0, nombre: 'Domingo',   abre: '19:00', cierra: '00:30' },
    { dia: 1, nombre: 'Lunes',     cerrado: true },
    { dia: 2, nombre: 'Martes',    abre: '19:00', cierra: '00:30' },
    { dia: 3, nombre: 'Miércoles', abre: '19:00', cierra: '00:30' },
    { dia: 4, nombre: 'Jueves',    abre: '19:00', cierra: '01:00' },
    { dia: 5, nombre: 'Viernes',   abre: '19:00', cierra: '02:00' },
    { dia: 6, nombre: 'Sábado',    abre: '12:00', cierra: '02:00' }
  ],

  /* ---------------------------------------------------------------
     4) VENTAS — todo lo que impacta en la plata
     --------------------------------------------------------------- */
  ventas: {
    moneda: '$',
    // Costo de envío. Poné 0 si el envío siempre es gratis.
    costoEnvio: 1500,                          // ⚠️
    // A partir de este monto el envío es gratis (sube el ticket promedio).
    envioGratisDesde: 18000,                   // ⚠️
    // Pedido mínimo para delivery. 0 = sin mínimo.
    pedidoMinimo: 8000,                        // ⚠️
    // Demora estimada que se muestra al cliente.
    demoraDelivery: '35 a 50 min',
    demoraRetiro: '15 min',
    // Zonas de envío (solo informativo, se listan en la sección Local).
    zonas: ['Balvanera', 'Almagro', 'Once', 'Congreso', 'San Nicolás', 'Abasto'], // ⚠️
    // Medios de pago que aceptás.
    pagos: ['Efectivo', 'Transferencia', 'Mercado Pago', 'Débito', 'Crédito'],
    // Alias para transferencias (aparece en el mensaje de WhatsApp).
    aliasTransferencia: 'URBAN.DOGS.MP',       // ⚠️
    // Cupones activos. Editá, agregá o borrá los que quieras.
    cupones: [
      { codigo: 'URBAN10',  tipo: 'porcentaje', valor: 10,   min: 0,     texto: '10% OFF en tu primer pedido' },
      { codigo: 'ENVIOFREE', tipo: 'envio',     valor: 100,  min: 12000, texto: 'Envío gratis desde $12.000' },
      { codigo: 'FINDE15',  tipo: 'porcentaje', valor: 15,   min: 20000, texto: '15% OFF en pedidos +$20.000' }
    ]
  },

  /* ---------------------------------------------------------------
     5) PROMO DE LA BARRA SUPERIOR
        Poné activa:false para ocultarla.
     --------------------------------------------------------------- */
  promo: {
    activa: true,
    texto: '2x1 en El Clásico Urbano todos los martes',
    // Hora local a la que "vence" la promo del día (para el contador).
    venceHoy: '23:59'
  },

  /* ---------------------------------------------------------------
     6) MEDICIÓN (opcional)
        Pegá tus IDs cuando los tengas. Si quedan vacíos no se carga nada.
     --------------------------------------------------------------- */
  medicion: {
    googleAnalytics: '',   // Ej: 'G-XXXXXXXXXX'
    metaPixel: ''          // Ej: '123456789012345'
  },

  /* ---------------------------------------------------------------
     7) TEXTOS DE PRUEBA SOCIAL
        Reemplazá por reseñas reales de tus clientes.  ⚠️
     --------------------------------------------------------------- */
  resenas: [
    { nombre: 'Martina G.',  zona: 'Almagro',   estrellas: 5, texto: 'El pan brioche es otro nivel. Pedí el Doble Ahumado y llegó caliente, crocante y en 30 minutos. Ya es fijo los viernes.' },
    { nombre: 'Nacho R.',    zona: 'Congreso',  estrellas: 5, texto: 'Probé los tres combos y no falla ninguno. La salsa de cheddar la hacen ellos, se nota un montón la diferencia.' },
    { nombre: 'Sol V.',      zona: 'Once',      estrellas: 5, texto: 'Pedí para el cumple de mi hermano, 30 panchos. Llegaron impecables y con todo separado para armar. Diez puntos la atención.' },
    { nombre: 'Damián P.',   zona: 'Abasto',    estrellas: 4, texto: 'El Picante Urbano tiene fuego de verdad, no es puro marketing. Las papas rústicas también son un golazo.' },
    { nombre: 'Caro M.',     zona: 'Balvanera', estrellas: 5, texto: 'Que tengan opción veggie hecha en serio me ganó. Textura y sabor reales, no un relleno cualquiera.' },
    { nombre: 'Fede L.',     zona: 'San Nicolás', estrellas: 5, texto: 'Armé el mío desde la web con el armador y me llegó exactamente como lo pedí. La experiencia de compra es rapidísima.' }
  ]
};

/* No toques nada de acá para abajo salvo que sepas lo que hacés. */
window.UD_CONFIG = UD_CONFIG;
