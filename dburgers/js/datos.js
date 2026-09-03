/* ==========================================================================
   D BURGERS — DATOS DEL NEGOCIO
   --------------------------------------------------------------------------
   TODO lo que hay que editar del sitio está en este archivo.
   No hace falta tocar el HTML ni el CSS para cambiar textos, precios,
   direcciones, teléfonos, combos ni reseñas.

   ⚠️ Los campos marcados con  // ⚠️ COMPLETAR  son datos que todavía no
   tenemos confirmados. Mientras `MODO_BORRADOR` esté en true, el sitio
   muestra un aviso arriba recordando qué falta cargar.
   ========================================================================== */

const CONFIG = {

  /* Poné en false cuando ya hayas cargado los datos reales.
     Eso oculta el aviso amarillo de la parte superior. */
  MODO_BORRADOR: true,

  /* Poné en true cuando confirmes la lista de precios.
     En false el sitio muestra "Consultar" en vez de un número. */
  MOSTRAR_PRECIOS: false,

  /* Poné en false cuando cargues reseñas reales de clientes
     (Google, Instagram o las que tengas por escrito). */
  TESTIMONIOS_DE_EJEMPLO: true,

  marca: {
    nombre: 'D Burgers',
    claim: 'Smash de verdad',
    instagram: 'https://instagram.com/',          // ⚠️ COMPLETAR usuario real
    email: 'hola@dburgers.com.ar'                 // ⚠️ COMPLETAR
  },

  /* Los dos locales. El número de WhatsApp va en formato internacional,
     sin +, sin 0 y sin 15.  Ej: Rosario 341 5123456 → 5493415123456 */
  locales: [
    {
      id: 'beltran',
      nombre: 'Beltrán',
      subtitulo: 'Casa central',
      direccion: 'Dirección a confirmar, Fray Luis Beltrán',   // ⚠️ COMPLETAR
      telefono: '',                                            // ⚠️ COMPLETAR ej: '341 512-3456'
      whatsapp: '',                                            // ⚠️ COMPLETAR ej: '5493415123456'
      horarios: 'Todos los días de 20:00 a 00:30',             // ⚠️ CONFIRMAR
      mapa: ''                                                 // ⚠️ COMPLETAR link de Google Maps
    },
    {
      id: 'villa-nueva',
      nombre: 'Villa Nueva',
      subtitulo: 'Sucursal',
      direccion: 'Dirección a confirmar, Villa Nueva',         // ⚠️ COMPLETAR
      telefono: '',                                            // ⚠️ COMPLETAR
      whatsapp: '',                                            // ⚠️ COMPLETAR
      horarios: 'Todos los días de 20:00 a 00:30',             // ⚠️ CONFIRMAR
      mapa: ''                                                 // ⚠️ COMPLETAR link de Google Maps
    }
  ]
};

/* ==========================================================================
   CARTA DE HAMBURGUESAS
   --------------------------------------------------------------------------
   `ingredientes[].x` / `.y` son la posición (en % de la foto) donde está
   escrito ese ingrediente en la imagen. Sirven para que, al pasar el mouse
   por un ingrediente en la ficha, se ilumine el cartel correspondiente.
   ========================================================================== */
const BURGERS = [
  {
    id: 'americana',
    nombre: 'Americana',
    categoria: 'clasicas',
    destacada: 'La más pedida',
    foto: 'img/americana.jpg',
    descripcion: 'La clásica que nunca falla: doble smash sellado a la plancha, cheddar derretido y todo el frescor de la verdura con nuestra salsa de la casa.',
    precio: 8500,                                   // ⚠️ COMPLETAR precio real
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
    precio: 9800,                                   // ⚠️ COMPLETAR precio real
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
    precio: 9800,                                   // ⚠️ COMPLETAR precio real
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
    precio: 9200,                                   // ⚠️ COMPLETAR precio real
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
    precio: 10400,                                  // ⚠️ COMPLETAR precio real
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
   COMBOS Y PROMOS
   ========================================================================== */
const COMBOS = [
  {
    id: 'combo-simple',
    nombre: 'Combo Clásico',
    cinta: '',
    descripcion: 'La fórmula de siempre para uno.',
    precio: 12500,          // ⚠️ COMPLETAR
    precioTachado: 14000,   // ⚠️ COMPLETAR (dejar en null si no hay precio anterior)
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
    precio: 23900,          // ⚠️ COMPLETAR
    precioTachado: 27000,   // ⚠️ COMPLETAR
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
    precio: 45900,          // ⚠️ COMPLETAR
    precioTachado: 52000,   // ⚠️ COMPLETAR
    incluye: [
      'Cuatro hamburguesas a elección',
      'Dos papas grandes con cheddar y bacon',
      'Bebida de 1,5 L',
      'Salsas extra de la casa'
    ]
  }
];

/* ==========================================================================
   RESEÑAS DE CLIENTES
   --------------------------------------------------------------------------
   ⚠️ Estas son de EJEMPLO para mostrar cómo se ve la sección.
   Reemplazalas por reseñas reales (Google, Instagram, WhatsApp) y después
   poné CONFIG.TESTIMONIOS_DE_EJEMPLO = false.
   ========================================================================== */
const TESTIMONIOS = [
  {
    texto: 'Texto de la reseña real del cliente. Reemplazar por un comentario textual de Google o Instagram.',
    nombre: 'Nombre del cliente',
    detalle: 'Local de Beltrán',
    estrellas: 5
  },
  {
    texto: 'Texto de la reseña real del cliente. Reemplazar por un comentario textual de Google o Instagram.',
    nombre: 'Nombre del cliente',
    detalle: 'Local de Villa Nueva',
    estrellas: 5
  },
  {
    texto: 'Texto de la reseña real del cliente. Reemplazar por un comentario textual de Google o Instagram.',
    nombre: 'Nombre del cliente',
    detalle: 'Pedido por WhatsApp',
    estrellas: 5
  }
];
