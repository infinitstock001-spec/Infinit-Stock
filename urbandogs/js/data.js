/* =========================================================================
   URBAN DOG'S — Carta
   -------------------------------------------------------------------------
   Para agregar un producto: copiá un bloque entero { ... }, pegalo debajo
   y cambiale el id (tiene que ser único), el nombre, la descripción y el
   precio. Para sacar un producto de la web, borrá su bloque o poné
   activo: false.

   badge     -> cartelito de color arriba de la tarjeta ('' = sin cartel)
   tags      -> 'picante' | 'veggie' | 'nuevo' | 'top'  (se muestran como chips)
   antes     -> precio tachado, para mostrar oferta (0 = no mostrar)
   art       -> receta del dibujo de la tarjeta (ver más abajo la paleta)
   ========================================================================= */

const UD_CATEGORIAS = [
  { id: 'todos',   nombre: 'Todo',      icono: '✦' },
  { id: 'panchos', nombre: 'Panchos',   icono: '🌭' },
  { id: 'combos',  nombre: 'Combos',    icono: '🔥' },
  { id: 'papas',   nombre: 'Papas',     icono: '🍟' },
  { id: 'bebidas', nombre: 'Bebidas',   icono: '🥤' },
  { id: 'dulce',   nombre: 'Postres',   icono: '🍪' }
];

const UD_MENU = [

  /* ============================ PANCHOS ============================ */
  {
    id: 'clasico',
    cat: 'panchos',
    nombre: 'El Clásico Urbano',
    desc: 'Salchicha artesanal ahumada, pan brioche tostado en manteca, ketchup y mostaza de la casa, papas pay.',
    precio: 5900,
    antes: 0,
    badge: 'Más vendido',
    tags: ['top'],
    ingredientes: ['Salchicha ahumada 120 g', 'Pan brioche', 'Ketchup casero', 'Mostaza dijon', 'Papas pay'],
    art: { pan: 'brioche', salchicha: 'clasica', toppings: ['papaspay'], salsas: ['ketchup', 'mostaza'] }
  },
  {
    id: 'doble-ahumado',
    cat: 'panchos',
    nombre: 'Doble Ahumado',
    desc: 'Dos salchichas ahumadas 12 horas, cheddar fundido de verdad, bacon crocante y cebolla caramelizada.',
    precio: 8400,
    antes: 9600,
    badge: 'Favorito',
    tags: ['top'],
    ingredientes: ['2 salchichas ahumadas', 'Cheddar fundido', 'Bacon crocante', 'Cebolla caramelizada', 'Pan brioche'],
    art: { pan: 'brioche', salchicha: 'doble', toppings: ['bacon', 'cebolla'], salsas: ['cheddar'] }
  },
  {
    id: 'picante',
    cat: 'panchos',
    nombre: 'Picante Urbano',
    desc: 'Salchicha chorizo picante, jalapeños encurtidos en casa, cheddar, cebolla morada y mayo chipotle.',
    precio: 7300,
    antes: 0,
    badge: '',
    tags: ['picante'],
    ingredientes: ['Salchicha chorizo picante', 'Jalapeños encurtidos', 'Cheddar', 'Cebolla morada', 'Mayo chipotle'],
    art: { pan: 'brioche', salchicha: 'picante', toppings: ['jalapeno', 'cebollamorada'], salsas: ['chipotle', 'cheddar'] }
  },
  {
    id: 'newyork',
    cat: 'panchos',
    nombre: 'New York Street',
    desc: 'La receta del carrito de Manhattan: salchicha de ternera, cebolla en salsa de tomate, mostaza amarilla y pepinos.',
    precio: 6800,
    antes: 0,
    badge: '',
    tags: [],
    ingredientes: ['Salchicha de ternera', 'Cebolla a la sartén', 'Mostaza amarilla', 'Pepinos agridulces'],
    art: { pan: 'clasico', salchicha: 'ternera', toppings: ['cebolla', 'pepino'], salsas: ['mostaza'] }
  },
  {
    id: 'criollo',
    cat: 'panchos',
    nombre: 'Criollo del Barrio',
    desc: 'Salchicha parrillera, chimichurri fresco, salsa criolla y provoleta gratinada. Bien de acá.',
    precio: 7900,
    antes: 0,
    badge: 'Nuestro orgullo',
    tags: ['nuevo'],
    ingredientes: ['Salchicha parrillera', 'Chimichurri fresco', 'Salsa criolla', 'Provoleta gratinada'],
    art: { pan: 'rustico', salchicha: 'parrillera', toppings: ['criolla', 'provoleta'], salsas: ['chimi'] }
  },
  {
    id: 'veggie',
    cat: 'panchos',
    nombre: 'Green Dog (veggie)',
    desc: 'Salchicha de porotos negros y remolacha hecha por nosotros, palta, rúcula, tomate confitado y mayo de ajo.',
    precio: 7100,
    antes: 0,
    badge: '100% vegetal',
    tags: ['veggie'],
    ingredientes: ['Salchicha vegetal casera', 'Palta', 'Rúcula', 'Tomate confitado', 'Mayo de ajo vegana'],
    art: { pan: 'integral', salchicha: 'veggie', toppings: ['rucula', 'tomate'], salsas: ['mayoajo'] }
  },
  {
    id: 'trufa',
    cat: 'panchos',
    nombre: 'Black Truffle Dog',
    desc: 'Salchicha de cerdo trufada, crema de hongos, parmesano en escamas y cebolla crocante. El más pedido para regalarse algo.',
    precio: 9700,
    antes: 0,
    badge: 'Edición limitada',
    tags: ['nuevo', 'top'],
    ingredientes: ['Salchicha trufada', 'Crema de hongos', 'Parmesano', 'Cebolla crocante'],
    art: { pan: 'negro', salchicha: 'trufa', toppings: ['parmesano', 'crocante'], salsas: ['hongos'] }
  },
  {
    id: 'kids',
    cat: 'panchos',
    nombre: 'Mini Dog (x2)',
    desc: 'Dos panchitos del tamaño ideal para los más chicos. Salchicha suave, pan de leche y las salsas que elijan.',
    precio: 5200,
    antes: 0,
    badge: '',
    tags: [],
    ingredientes: ['2 mini salchichas', 'Pan de leche', 'Salsas a elección'],
    art: { pan: 'leche', salchicha: 'mini', toppings: [], salsas: ['ketchup'] }
  },

  /* ============================= COMBOS ============================= */
  {
    id: 'combo-solo',
    cat: 'combos',
    nombre: 'Combo Solo Yo',
    desc: 'Un pancho a elección + papas rústicas + bebida en lata. La cena resuelta en un clic.',
    precio: 10900,
    antes: 13200,
    badge: 'Ahorrás $2.300',
    tags: ['top'],
    ingredientes: ['1 pancho a elección', 'Papas rústicas', 'Bebida en lata 354 ml'],
    art: { combo: 1 }
  },
  {
    id: 'combo-duo',
    cat: 'combos',
    nombre: 'Combo Dúo',
    desc: 'Dos panchos a elección + papas grandes con cheddar + dos bebidas. Para compartir sin pelear.',
    precio: 19400,
    antes: 24100,
    badge: 'Ahorrás $4.700',
    tags: ['top'],
    ingredientes: ['2 panchos a elección', 'Papas grandes con cheddar', '2 bebidas'],
    art: { combo: 2 }
  },
  {
    id: 'combo-banda',
    cat: 'combos',
    nombre: 'Combo La Banda',
    desc: 'Cuatro panchos + dos papas grandes + cuatro bebidas + salsas extra. El plan de la previa.',
    precio: 36900,
    antes: 47600,
    badge: 'Ahorrás $10.700',
    tags: [],
    ingredientes: ['4 panchos a elección', '2 papas grandes', '4 bebidas', 'Salsas extra'],
    art: { combo: 4 }
  },

  /* ============================== PAPAS ============================== */
  {
    id: 'papas-rusticas',
    cat: 'papas',
    nombre: 'Papas Rústicas',
    desc: 'Papas con cáscara, romero y sal marina. Crocantes por fuera, cremosas adentro.',
    precio: 4200, antes: 0, badge: '', tags: [],
    ingredientes: ['Papa con cáscara', 'Romero', 'Sal marina'],
    art: { papas: 'simple' }
  },
  {
    id: 'papas-cheddar',
    cat: 'papas',
    nombre: 'Papas Cheddar & Bacon',
    desc: 'Bañadas en cheddar fundido, bacon crocante y verdeo. Pedilas grandes, siempre faltan.',
    precio: 6300, antes: 0, badge: 'Más pedidas', tags: ['top'],
    ingredientes: ['Papas', 'Cheddar fundido', 'Bacon', 'Verdeo'],
    art: { papas: 'cheddar' }
  },
  {
    id: 'aros',
    cat: 'papas',
    nombre: 'Aros de Cebolla',
    desc: 'Seis aros rebozados en cerveza negra con mayo de ajo asado.',
    precio: 4900, antes: 0, badge: '', tags: [],
    ingredientes: ['Cebolla', 'Rebozado de cerveza negra', 'Mayo de ajo asado'],
    art: { papas: 'aros' }
  },

  /* ============================= BEBIDAS ============================= */
  {
    id: 'gaseosa',
    cat: 'bebidas',
    nombre: 'Gaseosa en lata 354 ml',
    desc: 'Línea Coca-Cola bien fría. Elegí el sabor al confirmar el pedido.',
    precio: 2200, antes: 0, badge: '', tags: [],
    ingredientes: [], art: { bebida: 'lata' }
  },
  {
    id: 'limonada',
    cat: 'bebidas',
    nombre: 'Limonada de la casa',
    desc: 'Limón, menta y jengibre. Exprimida el mismo día, sin jarabes.',
    precio: 3100, antes: 0, badge: '', tags: ['top'],
    ingredientes: [], art: { bebida: 'limonada' }
  },
  {
    id: 'cerveza',
    cat: 'bebidas',
    nombre: 'Cerveza artesanal 473 ml',
    desc: 'IPA o Golden de productor local. Solo mayores de 18.',
    precio: 4800, antes: 0, badge: '', tags: [],
    ingredientes: [], art: { bebida: 'cerveza' }
  },

  /* ============================= POSTRES ============================= */
  {
    id: 'brownie',
    cat: 'dulce',
    nombre: 'Brownie con dulce de leche',
    desc: 'Tibio, con nuez y una cucharada generosa de dulce de leche repostero.',
    precio: 4600, antes: 0, badge: '', tags: ['top'],
    ingredientes: [], art: { dulce: 'brownie' }
  },
  {
    id: 'cookie',
    cat: 'dulce',
    nombre: 'Cookie XL de chocolate',
    desc: 'Recién horneada, con chips de chocolate semiamargo y sal marina arriba.',
    precio: 3400, antes: 0, badge: '', tags: [],
    ingredientes: [], art: { dulce: 'cookie' }
  }
];

/* =========================================================================
   ARMÁ TU PANCHO — opciones del armador interactivo
   Los precios son el ADICIONAL sobre la base.
   ========================================================================= */
const UD_BUILDER = {
  base: 5400, // precio de arranque del pancho armado
  pasos: [
    {
      id: 'pan',
      titulo: 'Elegí el pan',
      ayuda: 'Todos se hornean cada mañana en el local.',
      tipo: 'unico',
      opciones: [
        { id: 'brioche',  nombre: 'Brioche de manteca', precio: 0,   art: 'brioche' },
        { id: 'clasico',  nombre: 'Clásico de viena',   precio: 0,   art: 'clasico' },
        { id: 'rustico',  nombre: 'Rústico de masa madre', precio: 600, art: 'rustico' },
        { id: 'integral', nombre: 'Integral con semillas', precio: 600, art: 'integral' },
        { id: 'negro',    nombre: 'Pan negro con carbón activado', precio: 900, art: 'negro' }
      ]
    },
    {
      id: 'salchicha',
      titulo: 'Elegí la salchicha',
      ayuda: 'Producción propia, sin harinas ni rellenos.',
      tipo: 'unico',
      opciones: [
        { id: 'clasica',    nombre: 'Ahumada clásica 120 g', precio: 0,    art: 'clasica' },
        { id: 'ternera',    nombre: 'De ternera',            precio: 700,  art: 'ternera' },
        { id: 'picante',    nombre: 'Chorizo picante',       precio: 700,  art: 'picante' },
        { id: 'parrillera', nombre: 'Parrillera a la brasa', precio: 900,  art: 'parrillera' },
        { id: 'trufa',      nombre: 'Cerdo trufado',         precio: 1800, art: 'trufa' },
        { id: 'veggie',     nombre: 'Vegetal de porotos negros', precio: 800, art: 'veggie' },
        { id: 'doble',      nombre: 'Doble salchicha ahumada', precio: 2300, art: 'doble' }
      ]
    },
    {
      id: 'toppings',
      titulo: 'Sumá toppings',
      ayuda: 'Elegí todos los que quieras. Los dos primeros van sin cargo.',
      tipo: 'multiple',
      gratis: 2,
      opciones: [
        { id: 'cebolla',       nombre: 'Cebolla caramelizada', precio: 500, art: 'cebolla' },
        { id: 'cebollamorada', nombre: 'Cebolla morada fresca', precio: 400, art: 'cebollamorada' },
        { id: 'crocante',      nombre: 'Cebolla crocante',      precio: 500, art: 'crocante' },
        { id: 'bacon',         nombre: 'Bacon crocante',        precio: 900, art: 'bacon' },
        { id: 'jalapeno',      nombre: 'Jalapeños encurtidos',  precio: 500, art: 'jalapeno' },
        { id: 'pepino',        nombre: 'Pepinos agridulces',    precio: 400, art: 'pepino' },
        { id: 'papaspay',      nombre: 'Papas pay',             precio: 400, art: 'papaspay' },
        { id: 'provoleta',     nombre: 'Provoleta gratinada',   precio: 1100, art: 'provoleta' },
        { id: 'parmesano',     nombre: 'Parmesano en escamas',  precio: 800, art: 'parmesano' },
        { id: 'criolla',       nombre: 'Salsa criolla',         precio: 500, art: 'criolla' },
        { id: 'rucula',        nombre: 'Rúcula fresca',         precio: 400, art: 'rucula' },
        { id: 'tomate',        nombre: 'Tomate confitado',      precio: 600, art: 'tomate' }
      ]
    },
    {
      id: 'salsas',
      titulo: 'Terminá con las salsas',
      ayuda: 'Todas hechas el mismo día. Hasta 2 sin cargo.',
      tipo: 'multiple',
      gratis: 2,
      opciones: [
        { id: 'ketchup',  nombre: 'Ketchup casero',      precio: 300, art: 'ketchup' },
        { id: 'mostaza',  nombre: 'Mostaza dijon',       precio: 300, art: 'mostaza' },
        { id: 'cheddar',  nombre: 'Cheddar fundido',     precio: 800, art: 'cheddar' },
        { id: 'chipotle', nombre: 'Mayo chipotle',       precio: 500, art: 'chipotle' },
        { id: 'chimi',    nombre: 'Chimichurri fresco',  precio: 400, art: 'chimi' },
        { id: 'mayoajo',  nombre: 'Mayo de ajo asado',   precio: 400, art: 'mayoajo' },
        { id: 'hongos',   nombre: 'Crema de hongos',     precio: 900, art: 'hongos' },
        { id: 'barbacoa', nombre: 'Barbacoa ahumada',    precio: 400, art: 'barbacoa' }
      ]
    }
  ]
};

/* =========================================================================
   ORDER BUMP — lo que se ofrece dentro del carrito para subir el ticket.
   Sacá o agregá ids de UD_MENU.
   ========================================================================= */
const UD_BUMPS = ['papas-cheddar', 'limonada', 'brownie'];

/* =========================================================================
   PREGUNTAS FRECUENTES
   ========================================================================= */
const UD_FAQ = [
  {
    q: '¿Qué tienen de artesanal los panchos?',
    a: 'Hacemos las salchichas nosotros: carne fresca, condimentos naturales y ahumado lento de 12 horas en chips de quebracho. El pan brioche se hornea cada mañana en el local y las salsas se preparan el mismo día que se sirven. Nada llega congelado ni viene en sobre.'
  },
  {
    q: '¿Cuánto tarda el delivery?',
    a: 'Entre 35 y 50 minutos dentro de nuestra zona de cobertura. En horarios pico de viernes y sábado puede estirarse un poco: cuando eso pasa te avisamos por WhatsApp antes de arrancar el pedido, nunca después.'
  },
  {
    q: '¿Cómo hago el pedido?',
    a: 'Armás tu pedido en la web, tocás "Finalizar pedido" y se abre WhatsApp con todo el detalle escrito: productos, dirección, forma de pago y total. Vos solo apretás enviar. Nosotros confirmamos y salimos.'
  },
  {
    q: '¿Qué medios de pago aceptan?',
    a: 'Efectivo, transferencia, Mercado Pago, débito y crédito. Si pagás en efectivo avisanos con cuánto abonás así el repartidor lleva el cambio justo.'
  },
  {
    q: '¿Tienen opciones sin TACC o veganas?',
    a: 'Tenemos el Green Dog, con salchicha vegetal de porotos negros hecha por nosotros y mayonesa vegana. Pan sin TACC bajo pedido con 24 horas de anticipación. Importante: cocinamos en una cocina donde se manipula gluten, así que no podemos garantizar cero contaminación cruzada.'
  },
  {
    q: '¿Hacen eventos, cumpleaños o catering para empresas?',
    a: 'Sí, es una parte grande de lo que hacemos. Vamos con el carrito o entregamos todo listo para armar. Trabajamos desde 25 personas y armamos el presupuesto en menos de 24 horas: dejanos los datos en el formulario de la sección Eventos.'
  },
  {
    q: '¿Puedo retirar por el local?',
    a: 'Claro, y te ahorrás el envío. El pedido está listo en unos 15 minutos. Elegí "Retiro por el local" al finalizar y te avisamos por WhatsApp cuando esté en el mostrador.'
  },
  {
    q: '¿Los precios de la web están actualizados?',
    a: 'Sí. Actualizamos la carta cada vez que cambia un precio, y lo que ves en el carrito es exactamente lo que vas a pagar. El costo de envío se calcula aparte y también te lo mostramos antes de confirmar.'
  }
];

window.UD_CATEGORIAS = UD_CATEGORIAS;
window.UD_MENU = UD_MENU;
window.UD_BUILDER = UD_BUILDER;
window.UD_BUMPS = UD_BUMPS;
window.UD_FAQ = UD_FAQ;
