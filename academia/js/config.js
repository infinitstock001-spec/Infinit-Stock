/* ==============================================================
   INFINIT ACADEMY — CONFIGURACIÓN

   ⚠️ ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE TOCAR PARA EMPEZAR
   A COBRAR. Son 6 bloques. Están numerados y explicados.

   Después de editar: guardás, subís y listo. No hay que compilar
   nada ni tocar ningún otro archivo.
   ============================================================== */

const IA_CONFIG = {

  /* ------------------------------------------------------------
     1) POR DÓNDE TE CONTACTAN
     El WhatsApp va sin +, sin espacios y sin guiones.
     Formato: 54 + 9 + código de área sin el 0 + número sin el 15.
     Ejemplo Mendoza 261 337-2398 → 5492613372398
     ------------------------------------------------------------ */
  whatsapp: '5492613372398',
  email: 'infinitstock001@gmail.com',
  instagram: 'infinit.academy',
  ciudad: 'Mendoza, Argentina',

  /* ------------------------------------------------------------
     2) COBRAR CON MERCADO PAGO  ← lo más importante

     Cómo sacar los links (5 minutos, una sola vez):
       1. Entrá a mercadopago.com.ar con tu cuenta.
       2. Menú "Cobros" → "Link de pago" → "Crear link".
       3. Poné el nombre del curso y el precio.
       4. En "Cuotas" activá hasta 6 sin interés.
       5. Copiá el link que te da y pegalo acá abajo.
       6. Repetí para cada curso.

     Cuando tengas aunque sea UNO, poné activo: true.
     Los que queden vacíos siguen yendo por WhatsApp: no se rompe nada.
     ------------------------------------------------------------ */
  mercadopago: {
    activo: false,
    links: {
      masterclass: '',
      barberia: '',
      tatuaje: '',
      combo: '',
      mentoria: '',
    },
  },

  /* ------------------------------------------------------------
     3) COBRAR POR TRANSFERENCIA
     Completá con tus datos reales. Mientras el alias esté vacío,
     la opción de transferencia no se le muestra al cliente
     (mejor no ofrecerla que ofrecerla con datos falsos).
     ------------------------------------------------------------ */
  transferencia: {
    alias: '',
    cbu: '',
    titular: '',
    banco: '',
  },

  /* ------------------------------------------------------------
     4) MODO PREVENTA

     Mientras estés grabando los videos, esto le avisa al alumno
     que compra un acceso anticipado y cuándo recibe cada módulo.
     Es la forma honesta de vender antes de tener todo filmado:
     cobrás hoy y entregás por partes.

     Cuando tengas todas las clases subidas → activo: false
     ------------------------------------------------------------ */
  preventa: {
    activo: true,
    // Qué recibe HOY el que compra hoy.
    entregaHoy: 'Los módulos 1 y 2 de cada curso, ya grabados',
    // Cada cuánto sube el resto.
    ritmo: 'Un módulo nuevo por semana',
    // Cuándo está el curso completo. Poné una fecha que puedas cumplir.
    completo: 'Primera semana de noviembre',
    // Qué gana por comprar antes.
    beneficio: 'Precio de fundador (no vuelve a estar), acceso de por vida y todas las actualizaciones',
  },

  /* ------------------------------------------------------------
     5) MEDIR QUÉ FUNCIONA

     Meta Pixel: business.facebook.com → Administrador de eventos
       → Conectar orígenes → Web → Pixel. Copiás el ID (15 números).
       Sin esto NO podés hacer publicidad en Instagram que funcione.

     Google Analytics: analytics.google.com → Admin → Flujos de datos.
       El ID empieza con G-
     ------------------------------------------------------------ */
  metaPixel: '',
  googleAnalytics: '',

  /* ------------------------------------------------------------
     6) CUPONES DE DESCUENTO

     Sirven para cerrar ventas por chat ("te hago 15%"), para
     promos con otros barberos o tatuadores, y para saber de dónde
     viene cada venta.

     tipo: 'porcentaje' descuenta ese % — 'monto' descuenta pesos.
     productos: [] = sirve para todos. O poné ['combo','barberia'].
     vence: 'AAAA-MM-DD' o null si no vence.
     ------------------------------------------------------------ */
  cupones: [
    { codigo: 'ARRANQUE15', tipo: 'porcentaje', valor: 15, productos: [], vence: null,
      nota: 'General, para cerrar ventas por WhatsApp' },
    { codigo: 'FUNDADOR', tipo: 'porcentaje', valor: 20, productos: ['combo'], vence: null,
      nota: 'Solo para el pack Doble Oficio' },
    { codigo: 'INSTA10', tipo: 'porcentaje', valor: 10, productos: [], vence: null,
      nota: 'El que ponés en las historias de Instagram' },
  ],
  /* ------------------------------------------------------------
     7) CLAVE DEL PANEL INTERNO (/admin/)

     Cambiala por una tuya. Es una traba simple: alcanza para que
     nadie entre de casualidad, pero no es seguridad de verdad
     (alguien que sepa mirar el código la encuentra). Como el panel
     no cobra ni guarda datos de tarjeta, el riesgo es bajo.

     Si querés protección real, en Netlify:
     Site settings → Access control → Password protection.
     ------------------------------------------------------------ */
  clavePanel: 'infinit2026',
};

/* --- No hace falta que toques nada de acá para abajo --------- */
window.IA_CONFIG = IA_CONFIG;
