/* ==============================================================
   MÁSTER EN BARBERÍA PROFESIONAL — CONFIGURACIÓN

   ⚠️ ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE TOCAR PARA EMPEZAR
   A COBRAR Y PARA PONER TUS DATOS REALES.

   Son 5 bloques numerados. Editás, guardás, subís y listo.
   No hay que compilar nada.
   ============================================================== */

window.CONFIG = {

  /* ------------------------------------------------------------
     1) TUS DATOS DE CONTACTO

     El WhatsApp va sin +, sin espacios y sin guiones:
     54 + 9 + código de área sin el 0 + número sin el 15.
     Ejemplo Mendoza 261 337-2398  →  5492613372398
     ------------------------------------------------------------ */
  whatsapp: '5492613372398',            // ← PLACEHOLDER: poné tu número real
  email: 'TU-MAIL@ejemplo.com',         // ← PLACEHOLDER
  instagram: 'TU_USUARIO',              // ← PLACEHOLDER (sin @)
  tiktok: 'TU_USUARIO',                 // ← PLACEHOLDER (sin @)
  ciudad: 'Mendoza, Argentina',

  /* ------------------------------------------------------------
     2) COBRAR CON MERCADO PAGO  ← lo más importante

     Cómo sacar los links (5 minutos, una sola vez):
       1. Entrá a mercadopago.com.ar con tu cuenta.
       2. Menú "Cobros" → "Link de pago" → "Crear link".
       3. Poné el nombre del plan y el precio en pesos.
       4. En "Cuotas" activá las que quieras ofrecer.
       5. Copiá el link que te da y pegalo acá abajo.
       6. Repetí para los tres planes.

     Cuando tengas aunque sea uno, poné activo: true.
     Los que queden vacíos siguen cerrando la venta por WhatsApp,
     así no perdés al cliente.
     ------------------------------------------------------------ */
  mercadopago: {
    activo: false,                      // ← poné true cuando pegues los links
    links: {
      starter: '',                      // ← PLACEHOLDER: link de pago Starter
      pro: '',                          // ← PLACEHOLDER: link de pago Pro
      master: '',                       // ← PLACEHOLDER: link de pago Máster
    },
  },

  /* ------------------------------------------------------------
     3) LOS PLANES
     Si cambiás un precio, cambialo también en el HTML (sección
     "8. PLANES Y PRECIOS") para que coincida lo que se ve.
     ------------------------------------------------------------ */
  planes: {
    starter: {
      nombre: 'Plan Starter',
      precio: 'USD 47',
      incluye: [
        'Módulos 0 a 5 (incluye el fade)',
        'Acceso de por vida',
        'Fichas de práctica descargables',
        'Garantía de 7 días',
      ],
    },
    pro: {
      nombre: 'Plan Pro',
      precio: 'USD 127',
      incluye: [
        'Los 13 módulos completos',
        'Corrección personalizada de tus trabajos',
        'Certificado verificable',
        'Comunidad privada + todos los bonos',
        'Acceso de por vida y actualizaciones',
      ],
    },
    master: {
      nombre: 'Plan Máster',
      precio: 'USD 297',
      incluye: [
        'Todo lo del plan Pro',
        '2 mentorías 1 a 1 por videollamada',
        'Revisión de tus redes con plan de contenido',
        'Prioridad en las correcciones',
        'Certificado nivel Máster',
      ],
    },
  },

  /* ------------------------------------------------------------
     4) CONTADOR DE URGENCIA (la barra de arriba y el cierre)

     Poné la fecha REAL en que cerrás el bono o la cohorte.
     Formato: 'AAAA-MM-DDTHH:MM:SS-03:00'  (-03:00 es Argentina)

     Si lo dejás vacío ('') el contador no se muestra y la barra
     de urgencia se oculta sola. Mejor sin contador que con una
     fecha falsa que se reinicia: eso se nota y quema la confianza.
     ------------------------------------------------------------ */
  cierraEl: '',                         // ← ej: '2026-10-15T23:59:00-03:00'

  /* ------------------------------------------------------------
     5) A DÓNDE VAN LOS DATOS DEL FORMULARIO

     'netlify'  → si publicás en Netlify. No hay que hacer nada más:
                  las respuestas te quedan en app.netlify.com →
                  tu sitio → Forms. Para que te lleguen por mail:
                  Forms → Settings → Form notifications.

     'whatsapp' → si publicás en otro lado (Hostinger, Vercel, etc.).
                  El formulario abre WhatsApp con los datos cargados.
     ------------------------------------------------------------ */
  leads: 'netlify',

};
