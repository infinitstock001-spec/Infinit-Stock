/* ==========================================================================
   D BURGERS — DATOS DEL NEGOCIO Y DEL SISTEMA DE VENTAS
   --------------------------------------------------------------------------
   Todo lo editable del sitio vive acá. No hace falta tocar el HTML ni el CSS.

   ⚠️ DATOS DE DEMOSTRACIÓN: direcciones, teléfonos, precios y reseñas son
   inventados para mostrar el sitio funcionando. Antes de publicarlo de verdad
   hay que reemplazarlos por los reales.
   ========================================================================== */

const CONFIG = {
  MOSTRAR_PRECIOS: true,

  /* Muestra los avisos de "fulano acaba de pedir".
     ⚠️ Ponelo en false hasta tener pedidos reales: mostrar actividad
     inventada como si fuera real es engañar al cliente. */
  PRUEBA_SOCIAL: true,

  marca: {
    nombre: 'D Burgers',
    claim: 'Smash de verdad',
    instagram: 'https://instagram.com/dburgers.rosario',
    email: 'contacto@dburgers.com.ar'
  },

  /* Horario de cocina en hora local (formato 24h).
     Con esto el sitio calcula solo si está abierto y cuánto falta para cerrar. */
  cocina: { abre: 20, cierra: 24.5 },   // 20:00 a 00:30

  /* Costo y mínimo de envío, para responder la objeción antes de que aparezca */
  envio: { costo: 1200, gratisDesde: 20000, demora: '30 a 45 minutos' },

  locales: [
    {
      id: 'beltran',
      nombre: 'Beltrán',
      subtitulo: 'Casa central',
      direccion: 'Fray Luis Beltrán 1247, Rosario',
      telefono: '341 512-3456',
      whatsapp: '5493415123456',
      horarios: 'Lunes a domingo de 20:00 a 00:30',
      mapa: 'https://maps.google.com/?q=Fray+Luis+Beltran+1247+Rosario'
    },
    {
      id: 'villa-nueva',
      nombre: 'Villa Nueva',
      subtitulo: 'Sucursal',
      direccion: 'Entre Ríos 782, Rosario',
      telefono: '341 487-9012',
      whatsapp: '5493414879012',
      horarios: 'Lunes a domingo de 20:00 a 00:30',
      mapa: 'https://maps.google.com/?q=Entre+Rios+782+Rosario'
    }
  ]
};

/* ==========================================================================
   CUPÓN DE PRIMERA COMPRA
   Baja la barrera de la primera vez, que es donde se pierde la mayoría.
   ========================================================================== */
const CUPON = {
  activo: true,
  codigo: 'PRIMERA10',
  descuento: 0.10,                    // 10%
  titulo: '10% OFF en tu primer pedido',
  detalle: 'Usá el código al hacer el pedido. Válido una vez por cliente.'
};

/* ==========================================================================
   CARTA
   ========================================================================== */
const BURGERS = [
  {
    id: 'americana',
    nombre: 'Americana',
    categoria: 'clasicas',
    destacada: 'La más pedida',
    foto: 'img/americana.jpg',
    descripcion: 'La clásica que nunca falla: doble smash sellado a la plancha, cheddar derretido y todo el frescor de la verdura con nuestra salsa de la casa.',
    precio: 8500,
    ingredientes: [
      { nombre: 'Salsa D\'',  x: 14, y: 43 },
      { nombre: 'Cebolla',    x: 52, y: 34 },
      { nombre: 'Cheddar',    x: 88, y: 42 },
      { nombre: 'Tomate',     x: 19, y: 84 },
      { nombre: 'Lechuga',    x: 60, y: 88 },
      { nombre: 'Medallón',   x: 85, y: 84 }
    ]
  },
  {
    id: 'molotov',
    nombre: 'Molotov',
    categoria: 'especiales',
    destacada: 'Explosiva',
    foto: 'img/molotov.jpg',
    descripcion: 'Doble medallón smash, doble cheddar y guacamole fresco arriba de todo. Cremosa, intensa y con una vuelta de rosca que no tiene ninguna otra.',
    precio: 9800,
    ingredientes: [
      { nombre: 'Guacamole',  x: 19, y: 34 },
      { nombre: 'Cheddar',    x: 88, y: 41 },
      { nombre: 'Mayonesa',   x: 17, y: 87 },
      { nombre: 'Medallón',   x: 86, y: 85 }
    ]
  },
  {
    id: 'argenta',
    nombre: 'Argenta',
    categoria: 'especiales',
    destacada: 'Bien nuestra',
    foto: 'img/argenta.jpg',
    descripcion: 'Smash con provolone fundido, salsa criolla recién hecha y mayochimi. Sabor de parrilla argentina metido adentro de un pan.',
    precio: 9800,
    ingredientes: [
      { nombre: 'Medallón',   x: 13, y: 33 },
      { nombre: 'Criolla',    x: 78, y: 30 },
      { nombre: 'Provolone',  x: 19, y: 85 },
      { nombre: 'Mayochimi',  x: 86, y: 87 }
    ]
  },
  {
    id: 'bacon',
    nombre: 'Bacon',
    categoria: 'clasicas',
    destacada: 'Crocante',
    foto: 'img/bacon.jpg',
    descripcion: 'Doble smash, cheddar, bacon crocante, cebolla morada, ketchup y mayonesa. Simple, contundente y con ese golpe ahumado que engancha.',
    precio: 9200,
    ingredientes: [
      { nombre: 'Bacon',      x: 14, y: 33 },
      { nombre: 'Cebolla',    x: 52, y: 34 },
      { nombre: 'Cheddar',    x: 88, y: 41 },
      { nombre: 'Ketchup',    x: 18, y: 84 },
      { nombre: 'Mayonesa',   x: 52, y: 88 },
      { nombre: 'Medallón',   x: 85, y: 84 }
    ]
  },
  {
    id: 'bluecheese',
    nombre: 'Bluecheese',
    categoria: 'especiales',
    destacada: 'Para paladares',
    foto: 'img/bluecheese.jpg',
    descripcion: 'Roquefort cremoso, cebolla caramelizada, bacon y tomate con salsa de la casa. La más audaz de la carta, para el que busca algo distinto.',
    precio: 10400,
    ingredientes: [
      { nombre: 'Tomate',               x: 18, y: 33 },
      { nombre: 'Salsa D\'',            x: 78, y: 33 },
      { nombre: 'Bacon',                x: 13, y: 89 },
      { nombre: 'Roquefort',            x: 44, y: 89 },
      { nombre: 'Cebolla caramelizada', x: 80, y: 89 }
    ]
  }
];

const CATEGORIAS = [
  { id: 'todas',      nombre: 'Toda la carta' },
  { id: 'clasicas',   nombre: 'Clásicas' },
  { id: 'especiales', nombre: 'Especiales' }
];

/* ==========================================================================
   EXTRAS — lo que se ofrece al agregar una hamburguesa al pedido.
   El ticket promedio sube acá, no en la carta.
   ========================================================================== */
const EXTRAS = [
  { id: 'papas-clasicas', nombre: 'Papas rústicas',            precio: 3900, icono: '🍟', sugerido: true },
  { id: 'papas-cheddar',  nombre: 'Papas con cheddar y bacon', precio: 5900, icono: '🧀', sugerido: true },
  { id: 'bebida',         nombre: 'Bebida en lata 354 ml',     precio: 2200, icono: '🥤', sugerido: true },
  { id: 'aros',           nombre: 'Aros de cebolla',           precio: 4200, icono: '🧅' },
  { id: 'salsas',         nombre: 'Pack de salsas de la casa', precio: 1500, icono: '🥫' }
];

/* ==========================================================================
   COMBOS
   `sueltos` son los ids que hay que sumar para calcular cuánto se ahorra.
   ========================================================================== */
const COMBOS = [
  {
    id: 'combo-simple',
    nombre: 'Combo Clásico',
    cinta: '',
    descripcion: 'La fórmula de siempre para uno.',
    precio: 12500,
    valorSuelto: 14600,          // burger 8500 + papas 3900 + bebida 2200
    incluye: [
      'Una hamburguesa a elección de la carta',
      'Papas rústicas medianas',
      'Bebida en lata 354 ml'
    ]
  },
  {
    id: 'combo-doble',
    nombre: 'Combo Doble',
    cinta: 'El más elegido',
    destacado: true,
    descripcion: 'Para compartir sin pelearse.',
    precio: 23900,
    valorSuelto: 28800,
    incluye: [
      'Dos hamburguesas a elección',
      'Papas rústicas grandes con cheddar',
      'Dos bebidas en lata 354 ml',
      'Salsas extra de la casa'
    ]
  },
  {
    id: 'combo-banda',
    nombre: 'Combo Banda',
    cinta: 'Rinde más',
    descripcion: 'Cuatro personas, un solo pedido.',
    precio: 45900,
    valorSuelto: 56200,
    incluye: [
      'Cuatro hamburguesas a elección',
      'Dos papas grandes con cheddar y bacon',
      'Bebida de 1,5 L',
      'Salsas extra de la casa'
    ]
  }
];

/* ==========================================================================
   RESEÑAS
   ⚠️ De demostración. Reemplazar por reseñas textuales reales de Google,
   Instagram o WhatsApp, con el nombre de quien las escribió.
   ========================================================================== */
const TESTIMONIOS = [
  {
    texto: 'Las mejores hamburguesas que probé en Rosario. El smash de verdad, la carne jugosa, el pan brioche tostado. Voy mínimo dos veces por semana.',
    nombre: 'Martín Rodríguez', detalle: 'Local de Beltrán', estrellas: 5
  },
  {
    texto: 'Increíble calidad. Se nota que todo es fresco y hecho al momento. El servicio rápido y la presentación impecable. Recomiendo la Molotov.',
    nombre: 'Valeria Santos', detalle: 'Pedido por WhatsApp', estrellas: 5
  },
  {
    texto: 'Desde que encontré D Burgers no como hamburguesas en otro lado. La Bluecheese es adictiva y el combo doble rinde para dos sin problemas.',
    nombre: 'Juan Carlos Pérez', detalle: 'Local de Villa Nueva', estrellas: 5
  },
  {
    texto: 'Probé todas las de la carta y ninguna falla. El nivel es profesional, el sabor es real. Ahora traigo amigos y quedan igual de sorprendidos.',
    nombre: 'Lucía González', detalle: 'Delivery a domicilio', estrellas: 5
  },
  {
    texto: 'Pedí a las 23 y llegó en media hora, caliente y bien armada. Las papas con cheddar son otro nivel. Atención de diez por WhatsApp.',
    nombre: 'Diego Fernández', detalle: 'Local de Beltrán', estrellas: 5
  },
  {
    texto: 'La Argenta con el provolone y la criolla es una locura. Se nota el laburo en las salsas. Ya es el lugar fijo de los viernes.',
    nombre: 'Sofía Ibarra', detalle: 'Local de Villa Nueva', estrellas: 5
  }
];

/* Resumen de reputación que se muestra arriba de las reseñas.
   ⚠️ Reemplazar por los números reales de Google/Instagram. */
const REPUTACION = { puntaje: 4.9, cantidad: 312, fuente: 'Google y redes' };

/* ==========================================================================
   PRUEBA SOCIAL EN VIVO
   ⚠️ DEMOSTRACIÓN. Estos avisos simulan pedidos recientes. No los dejes
   activos con datos inventados en un sitio real: poné CONFIG.PRUEBA_SOCIAL
   en false, o alimentá esta lista con pedidos que hayan ocurrido de verdad.
   ========================================================================== */
const PEDIDOS_RECIENTES = [
  { nombre: 'Martín',  producto: 'Combo Doble',  local: 'Beltrán' },
  { nombre: 'Carla',   producto: 'Molotov',      local: 'Villa Nueva' },
  { nombre: 'Nicolás', producto: 'Combo Banda',  local: 'Beltrán' },
  { nombre: 'Rocío',   producto: 'Bluecheese',   local: 'Villa Nueva' },
  { nombre: 'Emiliano',producto: 'Americana',    local: 'Beltrán' },
  { nombre: 'Julieta', producto: 'Combo Clásico',local: 'Villa Nueva' },
  { nombre: 'Facundo', producto: 'Bacon',        local: 'Beltrán' }
];

/* ==========================================================================
   GARANTÍA Y SELLOS DE CONFIANZA
   ========================================================================== */
const GARANTIA = {
  titulo: 'Si no te gusta, te la hacemos de nuevo',
  texto: 'Si tu hamburguesa no salió como esperabas, avisanos por WhatsApp el mismo día y te la reponemos o te devolvemos lo que pagaste. Sin vueltas y sin discutir.'
};

const SELLOS = [
  { icono: '🥩', titulo: 'Carne fresca',      texto: 'Molida el mismo día, nunca congelada' },
  { icono: '⏱️', titulo: '30 a 45 min',        texto: 'Delivery promedio en la zona' },
  { icono: '💳', titulo: 'Todos los medios',  texto: 'Efectivo, débito, crédito y transferencia' },
  { icono: '🛵', titulo: 'Envío gratis',      texto: 'En pedidos desde $20.000' }
];

/* ==========================================================================
   PREGUNTAS FRECUENTES
   Cada pregunta acá es una objeción que, sin responder, cuesta un pedido.
   ========================================================================== */
const FAQ = [
  {
    p: '¿Cuánto tarda el pedido?',
    r: 'Entre 30 y 45 minutos para delivery dentro de la zona de cobertura, y unos 15 minutos si lo pasás a retirar. En horarios pico de viernes y sábado puede estirarse un poco: siempre te avisamos por WhatsApp cuando sale de cocina.'
  },
  {
    p: '¿Hasta dónde hacen delivery?',
    r: 'Cubrimos la zona de cada local y los barrios linderos. El envío cuesta $1.200 y es gratis en pedidos desde $20.000. Si no estás seguro de si llegamos, mandanos tu dirección por WhatsApp y te confirmamos en el momento.'
  },
  {
    p: '¿Qué medios de pago aceptan?',
    r: 'Efectivo, débito, crédito y transferencia. Si pagás en efectivo, avisanos con cuánto abonás así el repartidor sale con el cambio justo.'
  },
  {
    p: '¿Puedo sacarle o cambiarle ingredientes?',
    r: 'Sí, sin costo. Cuando armes el pedido por WhatsApp escribí qué querés sacar o agregar (sin cebolla, sin tomate, doble cheddar) y lo preparamos así.'
  },
  {
    p: '¿Tienen opciones sin gluten o vegetarianas?',
    r: 'Trabajamos con pan común, así que no podemos garantizar un producto libre de gluten. Si tenés celiaquía u otra alergia, consultanos antes de pedir y te contamos con qué contamos ese día.'
  },
  {
    p: '¿Se puede reservar mesa en el local?',
    r: 'No tomamos reservas: es por orden de llegada. Si venís en grupo grande, escribinos antes y vemos cómo acomodarte.'
  }
];
