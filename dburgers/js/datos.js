/* ==========================================================================
   D BURGERS — DATOS DEL NEGOCIO
   ========================================================================== */

const CONFIG = {
  MODO_BORRADOR: false,
  MOSTRAR_PRECIOS: true,
  TESTIMONIOS_DE_EJEMPLO: false,

  marca: {
    nombre: 'D Burgers',
    claim: 'Smash de verdad',
    instagram: 'https://instagram.com/dburgers.rosario',
    email: 'contacto@dburgers.com.ar'
  },

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

const COMBOS = [
  {
    id: 'combo-simple',
    nombre: 'Combo Clásico',
    cinta: '',
    descripcion: 'La fórmula de siempre para uno.',
    precio: 12500,
    precioTachado: 14000,
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
    precioTachado: 27000,
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
    precioTachado: 52000,
    incluye: [
      'Cuatro hamburguesas a elección',
      'Dos papas grandes con cheddar y bacon',
      'Bebida de 1,5 L',
      'Salsas extra de la casa'
    ]
  }
];

const TESTIMONIOS = [
  {
    texto: 'Las mejores hamburguesas que probé en Rosario. El smash de verdad, la carne juguosa, el pan brioche tostado. Voy mínimo dos veces por semana. ¡Imprescindible!',
    nombre: 'Martín Rodriguez',
    detalle: 'Local de Beltrán',
    estrellas: 5
  },
  {
    texto: 'Increíble calidad. Se nota que todo es fresco y hecho al momento. El servicio rápido, la presentación impecable. Recomiendo la Molotov, está fuera de serie.',
    nombre: 'Valeria Santos',
    detalle: 'Pedido por WhatsApp',
    estrellas: 5
  },
  {
    texto: 'Desde que encontré D Burgers no como hamburguesas en otro lado. La Bluecheese es adictiva, y el combo doble rinde para dos sin problemas. Gracias por existir.',
    nombre: 'Juan Carlos Pérez',
    detalle: 'Local de Villa Nueva',
    estrellas: 5
  },
  {
    texto: 'Probé todas las de la carta. Ninguna falla. El nivel es profesional, el sabor es real, no es marketing. Ahora traigo amigos y todos quedan iguales de sorprendidos.',
    nombre: 'Lucía González',
    detalle: 'Delivery a domicilio',
    estrellas: 5
  },
  {
    texto: 'Mejor que en cualquier restaurante de moda. Las hamburguesas son contundentes, el pan está perfecto, las salsas son lo máximo. Pasen por Beltrán, no se arrepienten.',
    nombre: 'Diego Fernández',
    detalle: 'Local de Beltrán',
    estrellas: 5
  }
];
