/* ============================================================
   INFINIT ACADEMY — Fuente única de datos
   Todo el sitio (landing, páginas de venta y campus) lee de acá.
   Para agregar un video: poné el ID de YouTube/Vimeo en `video`.
   ============================================================ */

const ACADEMY = {
  marca: {
    nombre: 'Infinit Academy',
    claim: 'Oficio real, ingresos reales',
    whatsapp: '5492613372398',
    email: 'infinitstock001@gmail.com',
    instagram: 'infinit.academy',
    ciudad: 'Mendoza, Argentina',
  },

  /* --- Configuración comercial --------------------------------- */
  config: {
    moneda: 'ARS',
    cuotasSinInteres: 6,
    diasGarantia: 15,
    // Fin de la promo: se recalcula solo cada 7 días para que nunca quede vencida.
    promoDias: 7,
    cuposPromo: 30,
    /* Los testimonios de abajo son EJEMPLOS para que veas cómo queda la sección.
       Mientras esto esté en true, la web avisa que son de muestra.
       Cuando cargues testimonios reales de tus alumnos, poné false. */
    testimoniosDemo: true,
  },

  /* --- Medios de cobro -----------------------------------------
     IMPORTANTE: estos datos son de ejemplo. Reemplazalos por los
     tuyos reales antes de publicar. Los links de Mercado Pago se
     generan desde tu cuenta en: mercadopago.com.ar → Cobros → Link
     de pago. Uno por producto.
     ------------------------------------------------------------ */
  pagos: {
    mercadopago: {
      activo: false, // poné true cuando cargues los links
      links: {
        masterclass: '',
        barberia: '',
        tatuaje: '',
        combo: '',
        mentoria: '',
      },
    },
    transferencia: {
      activo: true,
      alias: 'INFINIT.ACADEMY',
      cbu: '0000000000000000000000',
      titular: 'A completar con el titular real de la cuenta',
      banco: 'A completar',
    },
    efectivo: {
      activo: true,
      texto: 'Rapipago y Pago Fácil disponibles a través de Mercado Pago.',
    },
  },

  /* --- Precios (ARS) -------------------------------------------
     Referencia de mercado (may/2026): cursos PRESENCIALES de barbería
     en Argentina van de $120.000 (Academia Scissors, nivel 2) a
     $150.000/mes x 4 meses (CMP Academia). Un online autogestionado
     se posiciona entre el 25% y el 45% de ese valor.
     ------------------------------------------------------------ */
  productos: {
    masterclass: {
      id: 'masterclass',
      tipo: 'entrada',
      nombre: 'Masterclass Fade Perfecto',
      para: 'Probá el método por menos de lo que sale un corte.',
      precio: 9900,
      precioAnterior: 24900,
      cuotas: 1,
      destacado: false,
      incluye: [
        '3 clases en video (1h 40min)',
        'PDF: las 7 guardas y cuándo usar cada una',
        'Grupo de WhatsApp de alumnos',
        'Acceso por 6 meses',
      ],
      noIncluye: ['Certificado', 'Corrección de trabajos', 'Módulo de negocio'],
    },
    barberia: {
      id: 'barberia',
      tipo: 'core',
      nombre: 'Barbería Profesional',
      para: 'De cero a cobrar tus primeros cortes en 60 días.',
      precio: 49900,
      precioAnterior: 99900,
      cuotas: 6,
      destacado: false,
      incluye: [
        '8 módulos · 51 clases en video HD',
        'Fades: low, mid, high, taper y skin',
        'Barba, navaja y perfilado',
        'Módulo de negocio: precios, agenda y redes',
        'Certificado digital de finalización',
        'Acceso de por vida + actualizaciones',
        'Corrección de trabajos por WhatsApp',
      ],
      noIncluye: ['Mentoría 1 a 1 en vivo'],
    },
    tatuaje: {
      id: 'tatuaje',
      tipo: 'core',
      nombre: 'Tatuaje desde Cero',
      para: 'Línea limpia, sombra pareja y tu primer cliente real.',
      precio: 54900,
      precioAnterior: 109900,
      cuotas: 6,
      destacado: false,
      incluye: [
        '9 módulos · 63 clases en video HD',
        'Bioseguridad y normativa argentina',
        'Línea, sombreado, relleno y color',
        'Estilos: fineline, tradicional y lettering',
        'Plantillas y flash para practicar',
        'Certificado digital de finalización',
        'Acceso de por vida + actualizaciones',
      ],
      noIncluye: ['Mentoría 1 a 1 en vivo'],
    },
    combo: {
      id: 'combo',
      tipo: 'combo',
      nombre: 'Doble Oficio',
      para: 'Los dos oficios completos, por menos que los dos por separado.',
      precio: 79900,
      precioAnterior: 164800,
      cuotas: 6,
      destacado: true,
      incluye: [
        'Barbería Profesional completo',
        'Tatuaje desde Cero completo',
        'Masterclass Fade Perfecto de regalo',
        'Bonus: Kit de precios y catálogo editable',
        'Bonus: 30 plantillas de contenido para Instagram',
        'Certificado de ambos cursos',
        'Acceso de por vida + actualizaciones',
        'Corrección de trabajos por WhatsApp',
      ],
      noIncluye: [],
    },
    mentoria: {
      id: 'mentoria',
      tipo: 'alto-ticket',
      nombre: 'Mentoría Élite',
      para: 'Para el que ya tatúa o corta y quiere vivir de esto.',
      precio: 189900,
      precioAnterior: 0,
      cuotas: 6,
      destacado: false,
      incluye: [
        'Todo lo del pack Doble Oficio',
        '4 sesiones 1 a 1 por videollamada (60 min c/u)',
        'Auditoría de tu Instagram y tus precios',
        'Plan de captación de clientes a 90 días',
        'Revisión personalizada de tus trabajos',
        'Acceso directo por WhatsApp durante 3 meses',
      ],
      noIncluye: [],
      cupos: 8,
    },
  },

  /* --- Cursos y temario ----------------------------------------
     `video`: ID de YouTube (ej: 'dQw4w9WgXcQ') o de Vimeo con
     prefijo 'vimeo:'. Vacío = clase todavía sin grabar.
     ------------------------------------------------------------ */
  cursos: {
    barberia: {
      id: 'barberia',
      vertical: 'barberia',
      titulo: 'Barbería Profesional',
      subtitulo: 'El oficio completo: de la primera guarda al local lleno',
      promesa: 'Aprendé a hacer un fade limpio, una barba prolija y a cobrar lo que vale tu trabajo. Sin escuela cara y sin esperar dos años.',
      nivel: 'De cero a profesional',
      duracion: '18 h 09 min',
      clases: 51,
      icono: '✂',
      color: 'gold',
      trailer: '',
      paraQuien: [
        'Nunca agarraste una máquina y querés un oficio que se paga rápido',
        'Ya cortás a amigos pero el fade te queda marcado',
        'Trabajás en una barbería y querés independizarte',
        'Querés un ingreso extra los fines de semana',
      ],
      resultados: [
        'Fade limpio y sin escalones en menos de 35 minutos',
        'Barba perfilada con navaja sin lastimar la piel',
        'Un precio propio y un argumento para sostenerlo',
        'Tu primer cliente que paga, no que te hace la gauchada',
      ],
      requisitos: [
        'Una máquina con guardas (te muestro cuáles comprar y a qué precio)',
        'Ganas de practicar 3 horas por semana',
        'Un celular para ver las clases. Nada más.',
      ],
      modulos: [
        {
          n: 1,
          titulo: 'Arranque: herramientas, higiene y mentalidad',
          desc: 'Qué comprar, qué NO comprar todavía, y cómo montar tu puesto con lo mínimo.',
          clases: [
            { t: 'Bienvenida y cómo aprovechar el curso', d: '8:12', video: '', libre: true },
            { t: 'Las 6 herramientas que sí necesitás (y las 9 que no)', d: '17:40', video: '', libre: true },
            { t: 'Máquinas: cortadora, patillera y trimmer explicadas', d: '21:05', video: '' },
            { t: 'Higiene, desinfección y cuidado del filo', d: '14:22', video: '' },
            { t: 'Armá tu puesto en casa con poco presupuesto', d: '12:50', video: '' },
            { t: 'Postura, agarre y ergonomía: la base de todo', d: '15:30', video: '' },
          ],
        },
        {
          n: 2,
          titulo: 'Cabeza, pelo y rostro: leer al cliente',
          desc: 'Antes de cortar hay que mirar. Acá aprendés a decidir qué corte va.',
          clases: [
            { t: 'Anatomía del cráneo: los 5 puntos que definen el corte', d: '19:14', video: '' },
            { t: 'Tipos de pelo: lacio, ondulado, rizado y afro', d: '22:38', video: '' },
            { t: 'Morfología del rostro y qué corte favorece a cada uno', d: '18:02', video: '' },
            { t: 'Remolinos, entradas y coronilla: cómo resolverlos', d: '16:45', video: '' },
            { t: 'La consulta de 2 minutos que evita reclamos', d: '11:20', video: '' },
          ],
        },
        {
          n: 3,
          titulo: 'Máquina: control total',
          desc: 'El 80% del resultado sale de acá. Guardas, ángulos y presión.',
          clases: [
            { t: 'Guardas: milímetros reales y equivalencias', d: '13:55', video: '' },
            { t: 'Movimiento de scoop: la técnica madre', d: '24:10', video: '' },
            { t: 'Trabajar a máquina abierta (lever play)', d: '20:33', video: '' },
            { t: 'Contornos, nuca y patillas al ras', d: '18:47', video: '' },
            { t: 'Errores típicos del principiante y cómo salvarlos', d: '16:12', video: '' },
          ],
        },
        {
          n: 4,
          titulo: 'Fades: el corte que más se pide',
          desc: 'Módulo estrella. Cada tipo de degradé, filmado desde 3 ángulos.',
          clases: [
            { t: 'Qué es un degradé y por qué se marca la línea', d: '15:08', video: '' },
            { t: 'Taper fade paso a paso', d: '28:41', video: '' },
            { t: 'Low fade completo', d: '31:15', video: '' },
            { t: 'Mid fade completo', d: '29:50', video: '' },
            { t: 'High fade completo', d: '27:33', video: '' },
            { t: 'Skin fade / bald fade sin irritar la piel', d: '34:20', video: '' },
            { t: 'Difuminar: el secreto está en la transición', d: '22:19', video: '' },
            { t: 'Fade en pelo rizado y afro', d: '26:44', video: '' },
            { t: 'Corrección: qué hacer cuando quedó marcado', d: '19:36', video: '' },
          ],
        },
        {
          n: 5,
          titulo: 'Tijera y peine',
          desc: 'Lo que separa al que corta al ras del que hace un corte completo.',
          clases: [
            { t: 'Tipos de tijera y cuál conviene comprar', d: '12:44', video: '' },
            { t: 'Tijera sobre peine: técnica base', d: '25:30', video: '' },
            { t: 'Capas, largos y conexión con el degradé', d: '23:18', video: '' },
            { t: 'Texturizado y desmechado', d: '20:06', video: '' },
            { t: 'Corte clásico ejecutivo completo', d: '32:12', video: '' },
            { t: 'Corte moderno con flequillo y textura', d: '29:47', video: '' },
          ],
        },
        {
          n: 6,
          titulo: 'Barba y navaja',
          desc: 'La barba es el servicio con mejor margen. Acá lo aprendés bien.',
          clases: [
            { t: 'Diseño de barba según el rostro', d: '18:29', video: '' },
            { t: 'Perfilado y líneas de cuello y pómulo', d: '24:55', video: '' },
            { t: 'Degradé en barba', d: '21:40', video: '' },
            { t: 'Navaja: técnica, ángulo y seguridad', d: '27:12', video: '' },
            { t: 'Ritual de toalla caliente y aceites', d: '15:33', video: '' },
            { t: 'Afeitado clásico completo', d: '30:18', video: '' },
            { t: 'Piel sensible, foliculitis y pelo encarnado', d: '17:05', video: '' },
          ],
        },
        {
          n: 7,
          titulo: 'Terminaciones y estilo',
          desc: 'Los detalles por los que el cliente vuelve y te recomienda.',
          clases: [
            { t: 'Diseños y freestyle con trimmer', d: '26:22', video: '' },
            { t: 'Peinado y productos: cera, polvo, pomada', d: '19:44', video: '' },
            { t: 'Color básico: platinado y mechas para hombre', d: '28:36', video: '' },
            { t: 'Cortes de tendencia 2026 explicados', d: '22:11', video: '' },
            { t: 'Cómo fotografiar tu trabajo con el celular', d: '17:52', video: '' },
          ],
        },
        {
          n: 8,
          titulo: 'Negocio: vivir de la barbería',
          desc: 'El módulo que ninguna escuela te da. Cómo cobrar, llenar la agenda y crecer.',
          clases: [
            { t: 'Cómo poner tu precio (fórmula real, no copiar al de al lado)', d: '23:40', video: '' },
            { t: 'Agenda, turnos y política de cancelación', d: '18:15', video: '' },
            { t: 'Instagram para barberos: qué postear todos los días', d: '26:50', video: '' },
            { t: 'Tu primer cliente: dónde salen y cómo se piden', d: '20:33', video: '' },
            { t: 'Fidelización: el cliente que vuelve cada 15 días', d: '19:12', video: '' },
            { t: 'De cortar en casa a alquilar sillón o abrir local', d: '24:28', video: '' },
            { t: 'Monotributo, facturación y números básicos', d: '21:07', video: '' },
            { t: 'Cierre: tu plan de los próximos 90 días', d: '14:36', video: '' },
          ],
        },
      ],
    },

    tatuaje: {
      id: 'tatuaje',
      vertical: 'tatuaje',
      titulo: 'Tatuaje desde Cero',
      subtitulo: 'Línea limpia, sombra pareja y piel que cicatriza bien',
      promesa: 'El camino completo del tatuador: bioseguridad, máquina, dibujo, línea, sombra y tu primer cliente real. Sin apurar la piel.',
      nivel: 'De cero a primer cliente',
      duracion: '24 h 50 min',
      clases: 63,
      icono: '⚡',
      color: 'ink',
      trailer: '',
      paraQuien: [
        'Dibujás y querés pasar el arte a la piel',
        'Compraste una máquina y no sabés por dónde empezar',
        'Tatuás pero la línea te tiembla o la sombra queda manchada',
        'Querés un oficio que se puede ejercer desde tu propio espacio',
      ],
      resultados: [
        'Línea firme y pareja, sin saltos ni doble pasada',
        'Sombreado suave y sin manchas en black & grey',
        'Un setup 100% bioseguro que no te pone en riesgo legal',
        'Tus primeros 5 tatuajes reales con cicatrización correcta',
      ],
      requisitos: [
        'Una máquina rotativa (te digo cuál y a qué precio conviene)',
        'Piel sintética para practicar (te paso dónde comprarla)',
        'Saber dibujar ayuda, pero el módulo 3 te lleva de cero',
      ],
      modulos: [
        {
          n: 1,
          titulo: 'Bioseguridad: lo que no es negociable',
          desc: 'Antes de tocar una aguja. Este módulo te evita un problema serio.',
          clases: [
            { t: 'Bienvenida y mapa del curso', d: '9:30', video: '', libre: true },
            { t: 'Patógenos de transmisión sanguínea explicados simple', d: '18:44', video: '', libre: true },
            { t: 'Barrera: guantes, film, fundas y campo estéril', d: '22:10', video: '' },
            { t: 'Esterilización, autoclave y descartables', d: '19:55', video: '' },
            { t: 'Residuos patogénicos: qué dice la ley argentina', d: '16:20', video: '' },
            { t: 'Consentimiento informado y ficha del cliente', d: '14:38', video: '' },
            { t: 'A quién NO tatuar (y cómo decir que no)', d: '13:12', video: '' },
          ],
        },
        {
          n: 2,
          titulo: 'El equipo por dentro',
          desc: 'Máquinas, agujas, tintas y fuente. Qué comprar sin fundirte.',
          clases: [
            { t: 'Rotativa vs bobina: diferencias reales', d: '21:33', video: '' },
            { t: 'Anatomía de la máquina y el módulo pen', d: '19:47', video: '' },
            { t: 'Agujas: RL, RS, RM, M1 y cuándo usar cada una', d: '26:15', video: '' },
            { t: 'Voltaje, golpe y velocidad: cómo calibrar', d: '24:02', video: '' },
            { t: 'Tintas: marcas, pigmento, vencimiento y alergias', d: '20:18', video: '' },
            { t: 'Armado completo de la estación paso a paso', d: '23:44', video: '' },
            { t: 'Mantenimiento y qué hacer cuando falla', d: '15:26', video: '' },
          ],
        },
        {
          n: 3,
          titulo: 'Dibujo aplicado al tatuaje',
          desc: 'No es dibujar lindo. Es dibujar para que aguante 20 años en la piel.',
          clases: [
            { t: 'Línea a mano alzada: ejercicios diarios', d: '25:10', video: '' },
            { t: 'Peso de línea y jerarquía visual', d: '22:36', video: '' },
            { t: 'Valores, luz y sombra sobre papel', d: '27:14', video: '' },
            { t: 'Composición y adaptación al cuerpo', d: '24:50', video: '' },
            { t: 'Legibilidad: por qué un diseño se cierra con los años', d: '18:22', video: '' },
            { t: 'Digitalizar: Procreate y alternativas gratis', d: '29:05', video: '' },
            { t: 'Armá tu primer set de flash para vender', d: '21:40', video: '' },
          ],
        },
        {
          n: 4,
          titulo: 'Stencil y transferencia',
          desc: 'Un stencil mal puesto arruina el mejor diseño.',
          clases: [
            { t: 'Papel hectográfico y termocopiadora', d: '17:28', video: '' },
            { t: 'Stencil a mano: cuándo y cómo', d: '19:15', video: '' },
            { t: 'Preparación de la piel y productos fijadores', d: '16:44', video: '' },
            { t: 'Ubicación, simetría y aprobación del cliente', d: '20:33', video: '' },
            { t: 'Stencil que se borra: causas y solución', d: '13:50', video: '' },
          ],
        },
        {
          n: 5,
          titulo: 'Línea: la base de todo',
          desc: 'El módulo más importante. Acá se define si sos tatuador o no.',
          clases: [
            { t: 'Profundidad correcta: la capa que buscamos', d: '23:18', video: '' },
            { t: 'Estirado de piel: la mano que no tatúa', d: '21:44', video: '' },
            { t: 'Velocidad de recorrido y consistencia', d: '25:36', video: '' },
            { t: 'Línea recta larga sin cortes', d: '28:12', video: '' },
            { t: 'Curvas, círculos y ovalos', d: '26:40', video: '' },
            { t: 'Uniones y cierres invisibles', d: '22:05', video: '' },
            { t: 'Línea fina (fineline) y sus riesgos', d: '24:33', video: '' },
            { t: 'Blowout: por qué pasa y cómo evitarlo', d: '19:50', video: '' },
            { t: 'Práctica guiada completa en piel sintética', d: '35:22', video: '' },
          ],
        },
        {
          n: 6,
          titulo: 'Sombreado y black & grey',
          desc: 'Del negro sólido al degradé suave. Whip, pendulum y magnum.',
          clases: [
            { t: 'Diluciones de negro: la escala de grises', d: '22:44', video: '' },
            { t: 'Whip shading', d: '26:18', video: '' },
            { t: 'Pendulum y movimiento circular', d: '24:55', video: '' },
            { t: 'Magnum: cubrir superficie sin manchar', d: '27:30', video: '' },
            { t: 'Black pack: negro sólido parejo', d: '23:12', video: '' },
            { t: 'Texturas: piedra, humo, agua', d: '28:47', video: '' },
            { t: 'Práctica guiada: rosa en black & grey', d: '38:15', video: '' },
          ],
        },
        {
          n: 7,
          titulo: 'Color y saturación',
          desc: 'Cómo entra el color, cómo se mezcla y cómo cicatriza.',
          clases: [
            { t: 'Teoría del color aplicada a la piel', d: '21:36', video: '' },
            { t: 'Saturación: la trampa del principiante', d: '24:10', video: '' },
            { t: 'Degradés y mezclas en piel', d: '26:44', video: '' },
            { t: 'Color sobre piel oscura', d: '22:28', video: '' },
            { t: 'Práctica guiada: pieza a color completa', d: '36:50', video: '' },
          ],
        },
        {
          n: 8,
          titulo: 'Estilos',
          desc: 'Elegí uno y hacete conocido por eso. Es la clave para diferenciarte.',
          clases: [
            { t: 'Tradicional americano: reglas del estilo', d: '29:22', video: '' },
            { t: 'Fineline y microtattoo', d: '26:15', video: '' },
            { t: 'Lettering y caligrafía', d: '31:40', video: '' },
            { t: 'Blackwork y ornamental', d: '27:33', video: '' },
            { t: 'Introducción al realismo', d: '33:18', video: '' },
            { t: 'Cover up: tapar un tatuaje viejo', d: '30:05', video: '' },
            { t: 'Cómo elegir tu estilo y construir tu marca', d: '23:47', video: '' },
          ],
        },
        {
          n: 9,
          titulo: 'Piel real y negocio',
          desc: 'El salto de la piel sintética al cliente que paga.',
          clases: [
            { t: 'Tu primer tatuaje en piel real: protocolo completo', d: '32:15', video: '' },
            { t: 'Manejo del cliente: dolor, pausas y nervios', d: '20:44', video: '' },
            { t: 'Cicatrización y cuidados posteriores', d: '24:30', video: '' },
            { t: 'Retoques: cuándo sí y cuándo se cobra', d: '17:22', video: '' },
            { t: 'Cómo presupuestar: por sesión, por hora o por pieza', d: '26:18', video: '' },
            { t: 'Instagram para tatuadores: portfolio que vende', d: '29:40', video: '' },
            { t: 'Conseguir tus primeros 10 clientes', d: '25:12', video: '' },
            { t: 'Estudio propio vs invitado: números reales', d: '23:55', video: '' },
            { t: 'Cierre: tu plan de los próximos 90 días', d: '15:20', video: '' },
          ],
        },
      ],
    },
  },

  /* --- Prueba social ------------------------------------------- */
  testimonios: [
    {
      texto: 'Arranqué sin saber ni agarrar la máquina. A los dos meses ya cobraba $8.000 el corte en casa. El módulo de fades lo vi como diez veces, está filmado desde arriba y se entiende todo.',
      nombre: 'Lucas M.',
      rol: 'Barbería · Godoy Cruz, Mendoza',
      curso: 'barberia',
      ini: 'LM',
    },
    {
      texto: 'Lo que más me sirvió fue el módulo de bioseguridad. Yo ya tatuaba y estaba haciendo tres cosas mal que ni sabía. Y la parte de línea me destrabó el pulso.',
      nombre: 'Aylén R.',
      rol: 'Tatuadora · San Rafael',
      curso: 'tatuaje',
      ini: 'AR',
    },
    {
      texto: 'Compré el pack de los dos. Hoy tatúo martes y jueves, y corto el resto de la semana. Dejé el laburo en relación de dependencia en marzo.',
      nombre: 'Nicolás P.',
      rol: 'Barbero y tatuador · Maipú',
      curso: 'combo',
      ini: 'NP',
    },
    {
      texto: 'El módulo de negocio vale el curso entero. Yo cobraba $4.000 porque era lo que cobraba el de la esquina. Ahora cobro $10.000 y tengo más clientes que antes.',
      nombre: 'Brian S.',
      rol: 'Barbero · Las Heras',
      curso: 'barberia',
      ini: 'BS',
    },
    {
      texto: 'Las plantillas de flash me salvaron. Salí a vender diseños ya hechos en vez de esperar que me pidan algo, y ahí empezaron a caer los turnos.',
      nombre: 'Camila V.',
      rol: 'Tatuadora · Ciudad de Mendoza',
      curso: 'tatuaje',
      ini: 'CV',
    },
    {
      texto: 'Tengo 41 y pensé que era tarde. Hice el curso mirando de noche después del laburo. Hoy atiendo sábados en el garage arreglado y me saco un sueldo extra.',
      nombre: 'Diego A.',
      rol: 'Barbería · Guaymallén',
      curso: 'barberia',
      ini: 'DA',
    },
  ],

  /* --- Preguntas frecuentes ------------------------------------ */
  faq: [
    {
      q: '¿Sirve si nunca agarré una máquina o una aguja en mi vida?',
      a: 'Sí. Los dos cursos arrancan desde cero absoluto: qué comprar, cómo se sostiene, cómo se prende. El módulo 1 de cada curso asume que no sabés nada. Si ya tenés experiencia, podés saltearlo y arrancar por el módulo que te falta.',
    },
    {
      q: '¿Cuánto tiempo tengo para verlo?',
      a: 'El acceso es de por vida en los cursos completos y en el pack. Lo ves cuando querés, las veces que quieras, desde el celular, la tablet o la compu. Si más adelante agrego clases nuevas, te llegan sin pagar de nuevo.',
    },
    {
      q: '¿Cómo pago? ¿Hay cuotas?',
      a: 'Mercado Pago con tarjeta de crédito o débito, transferencia bancaria, efectivo por Rapipago/Pago Fácil, o directo por WhatsApp si preferís hablar antes. Con tarjeta de crédito hay hasta 6 cuotas sin interés.',
    },
    {
      q: '¿Y si lo compro y no me gusta?',
      a: 'Tenés 15 días de garantía. Escribís al WhatsApp, decís "quiero la devolución" y te devuelvo el 100%. No hay letra chica ni te pido explicación. Prefiero devolverte la plata antes que tener un alumno que no quiere estar.',
    },
    {
      q: '¿Me dan certificado?',
      a: 'Sí. Al terminar todos los módulos se te habilita el certificado digital de finalización con tu nombre, la carga horaria y el detalle del temario. Es un certificado de la academia, no un título oficial del Ministerio: en barbería y tatuaje lo que te consigue clientes es el portfolio, no el papel. Igual el papel queda lindo en la pared.',
    },
    {
      q: '¿Necesito comprar herramientas caras para arrancar?',
      a: 'No. En el módulo 1 de cada curso te muestro exactamente qué comprar, en qué rango de precio y qué NO comprar todavía. Se puede arrancar con un kit básico y ese kit se paga solo con los primeros trabajos.',
    },
    {
      q: '¿Las clases son en vivo o grabadas?',
      a: 'Grabadas, en HD y filmadas desde varios ángulos para que veas la mano de cerca. Las clases en vivo te obligan a estar a una hora fija; las grabadas las ves a tu ritmo y las repetís cuantas veces necesites. En la Mentoría Élite sí hay sesiones en vivo 1 a 1.',
    },
    {
      q: '¿Puedo consultar dudas?',
      a: 'Sí. Los alumnos de los cursos completos entran al grupo de WhatsApp y pueden mandar fotos o videos de sus trabajos para que se los corrija. En la Mentoría es corrección personalizada con videollamada.',
    },
    {
      q: '¿Se puede vivir de esto en Argentina hoy?',
      a: 'Un barbero con agenda llena hace entre 8 y 14 cortes por día. Un tatuador con estilo definido cobra por sesión. Es un oficio que se cobra en efectivo, todos los días, y que no depende de que te contraten. No te voy a prometer que te hacés rico: te voy a mostrar los números reales en el módulo de negocio para que decidas vos.',
    },
    {
      q: '¿Dónde veo las clases después de pagar?',
      a: 'Te llega el acceso al Campus por mail y WhatsApp dentro de las 12 horas. Ahí tenés todos los módulos, tu progreso guardado, los PDF descargables y el certificado cuando termines.',
    },
  ],

  /* --- Bonus del pack ------------------------------------------ */
  bonus: [
    { ico: '📋', t: 'Kit de precios editable', d: 'Planilla con la fórmula para calcular cuánto cobrar según tus costos reales.', v: '$14.900' },
    { ico: '📱', t: '30 plantillas para Instagram', d: 'Posts y stories listos para editar en Canva. Solo cambiás la foto.', v: '$19.900' },
    { ico: '🖤', t: '80 diseños flash listos', d: 'Set de diseños para ofrecer y vender desde tu primera semana.', v: '$24.900' },
    { ico: '💬', t: 'Guiones de WhatsApp que venden', d: 'Qué responder cuando preguntan "cuánto sale" sin espantar al cliente.', v: '$9.900' },
    { ico: '🎓', t: 'Certificado digital', d: 'Con tu nombre, carga horaria y temario. Descargable en PDF.', v: 'Incluido' },
    { ico: '👥', t: 'Comunidad de alumnos', d: 'Grupo privado donde se comparten trabajos, dudas y oportunidades.', v: 'Incluido' },
  ],
};

/* --- Helpers globales ----------------------------------------- */
const fmtARS = (n) => '$' + Number(n).toLocaleString('es-AR', { maximumFractionDigits: 0 });

const cuotaDe = (precio, cuotas) => fmtARS(Math.round(precio / cuotas / 100) * 100);

const waLink = (msg) =>
  `https://wa.me/${ACADEMY.marca.whatsapp}?text=${encodeURIComponent(msg)}`;

/* Fecha de cierre de promo: se renueva sola cada N días, nunca queda vencida
   y nunca muestra menos de 2 días para no parecer un contador trucho. */
const finPromo = () => {
  const ciclo = ACADEMY.config.promoDias * 864e5;
  const minimo = 2 * 864e5;
  let fin = Math.ceil(Date.now() / ciclo) * ciclo;
  if (fin - Date.now() < minimo) fin += ciclo;
  return new Date(fin);
};

const totalClases = (curso) =>
  curso.modulos.reduce((a, m) => a + m.clases.length, 0);

/* --- Overrides del panel de carga -----------------------------
   El panel /admin/ guarda los IDs de video en el navegador para que
   puedas probar sin tocar código. Lo definitivo es exportar desde el
   panel y pegar el resultado en este archivo.
   -------------------------------------------------------------- */
(() => {
  if (typeof localStorage === 'undefined') return;
  let ov;
  try { ov = JSON.parse(localStorage.getItem('ia_videos') || '{}'); } catch { return; }
  Object.entries(ov).forEach(([clave, video]) => {
    const [cursoId, m, c] = clave.split('.');
    const curso = ACADEMY.cursos[cursoId];
    if (!curso) return;
    const mod = curso.modulos.find((x) => x.n === +m);
    if (mod && mod.clases[+c]) mod.clases[+c].video = video;
  });
})();

if (typeof module !== 'undefined') module.exports = { ACADEMY };
