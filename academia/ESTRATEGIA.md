# Estrategia de venta — Infinit Academy

Documento de trabajo. Acá está el análisis del mercado, la lógica de precios, el embudo
y el plan de acción. La página web es la herramienta; esto es el plan.

---

## 1. Qué encontré del mercado argentino (datos reales, mayo–septiembre 2026)

Estos son los únicos números de precio que pude verificar en fuentes públicas. Todo lo demás
en este documento es criterio y estimación, y lo marco como tal.

| Academia | Modalidad | Precio verificado |
|---|---|---|
| CMP Academia — Barbería inicial 2026 | Presencial, 4 meses | $150.000 ARS por mes |
| Academia Scissors — Barbería nivel 2 | Presencial | $120.000 ARS total |
| Escuela de tatuaje (referencia española) | Online | €600 |

**No pude verificar precios de cursos online de tatuaje en pesos argentinos.** Las academias
argentinas que encontré (Born Free Tattoo, Escuela de Tatuaje Liniers, PiquiTattoo, La Tatuadora)
no publican precios: piden que escribas por WhatsApp.

**Eso último es un dato en sí mismo.** Casi nadie del rubro publica el precio. Publicarlo
te diferencia y te filtra las consultas: el que llega al WhatsApp ya sabe cuánto sale y viene
a comprar, no a preguntar.

Fuentes:
- [CMP Academia — Barbería inicial 2026](https://cmpacademia.com/producto/curso-barberia-inicial-2026/)
- [Academia Scissors — Barbería nivel 2](https://academiascissors.com.ar/product/curso-de-barberia-profesional-nivel-2-perfeccionamiento/)
- [Born Free Tattoo — Escuela](https://www.escuelabornfreetattoo.com/)
- [La Tatuadora — Academia online](https://cursos.latatuadora.academy/)
- [LearnBase — Cómo cobrar cursos online desde Argentina](https://uselearnbase.com/blog/es/como-cobrar-cursos-online-argentina)
- [Bit4Learn — Plataformas para vender cursos 2026](https://bit4learn.com/plataformas-para-vender-cursos-online/)

---

## 2. Cómo venden los que ya lo hacen

Analizando cómo se posicionan las academias del rubro (presenciales y online), el patrón se repite:

**Lo que hacen bien:**
- Venden el **resultado**, no el contenido. "Aprendé a tatuar en 12 clases prácticas", no "curso de 40 horas".
- Muestran **trabajo terminado** todo el tiempo. En este rubro la prueba social es visual: antes y después, el fade filmado, la línea cicatrizada a los 15 días.
- Usan WhatsApp como cierre. Nadie compra con tarjeta a la primera; el chat cierra la venta.
- Cursada por niveles: inicial → perfeccionamiento. Te venden dos veces al mismo alumno.

**Lo que hacen mal (tu oportunidad):**
- **No publican precios.** Genera fricción y consultas que no compran.
- **No enseñan la parte del negocio.** Te enseñan a cortar, no a cobrar. Es el hueco más grande del mercado y el que más se agradece.
- **No tienen plataforma propia.** Mandan un Drive o un grupo de Telegram. Un campus con progreso y certificado se percibe como algo mucho más serio, y el costo de hacerlo es cero.
- **Precio presencial impagable** ($120.000 a $600.000). Tu online a $49.900 no compite: juega en otra categoría.

---

## 3. La escalera de precios

La lógica no es "vender un curso": es tener una escalera donde el que entra abajo suba solo.

| Escalón | Producto | Precio | Para qué sirve |
|---|---|---|---|
| 0 | Clase gratis (por WhatsApp) | $0 | Capturar contacto y demostrar que enseñás bien |
| 1 | Masterclass Fade Perfecto | **$9.900** | Convertir curioso en cliente. Cuesta menos que un corte |
| 2 | Barbería Profesional | **$49.900** | Producto principal |
| 2 | Tatuaje desde Cero | **$54.900** | Producto principal |
| 3 | Pack Doble Oficio | **$79.900** | El más rentable. Sube el ticket promedio un 55% |
| 4 | Mentoría Élite | **$189.900** | Pocos lo compran, pero un solo cupo paga 4 cursos |

**Por qué estos números:**
- $49.900 es el 33% de un mes de academia presencial. Barato sin ser sospechoso.
- Nada arriba de $200.000: en Argentina eso ya obliga a "pensarlo".
- El pack ($79.900) sale menos que los dos sueltos ($104.800). El descuento se ve, y es el que más se elige.
- Todo con 6 cuotas sin interés: en pesos, la cuota de $8.300 es lo que decide la compra.

**Ojo con la inflación:** revisá los precios cada 2 o 3 meses. Un precio quieto seis meses en Argentina es un precio que se regaló. En `js/data.js` se cambian todos en un solo lugar.

---

## 4. El embudo, paso a paso

```
INSTAGRAM / TIKTOK  ──►  LANDING  ──►  CLASE GRATIS  ──►  WHATSAPP  ──►  VENTA
   (contenido)          (promesa)      (email + tel)     (cierre)      (curso)
                             │                                            │
                             └────► COMPRA DIRECTA ────────────────────────┤
                                    (checkout)                            │
                                                                          ▼
                                                            ORDER BUMP → PACK DOBLE
                                                            UPSELL → MENTORÍA
```

**Etapa 1 — Atención (Instagram/TikTok).** Es tu fuente de tráfico principal, y es gratis.
Todo lo demás depende de esto.

**Etapa 2 — Landing.** La página captura al que está tibio con la clase gratis, y vende
directo al que ya está caliente.

**Etapa 3 — Clase gratis.** Es la pieza clave. El que la pide te dio el teléfono. Ahí ya
no le vendés a un desconocido.

**Etapa 4 — WhatsApp.** Acá se cierra el 70% de las ventas en este rubro. La página no
reemplaza el chat: lo alimenta.

**Etapa 5 — Order bump y upsell.** Ya están armados en el checkout y en la página de gracias.
Es plata que entra sin tráfico nuevo.

---

## 5. Plan de contenido para Instagram (lo que mueve la aguja)

El error clásico es postear el trabajo terminado y nada más. Eso te consigue clientes de
corte, no alumnos. Para vender cursos hay que **mostrar el proceso y el error**.

**Los 4 formatos que funcionan en este rubro:**

1. **El error corregido** (el que más vende). "Así queda un fade cuando no difuminás" → misma cabeza corregida. La gente que corta mal se ve reflejada y quiere aprender.
2. **Timelapse con voz en off.** El trabajo entero en 30 segundos explicando las 3 decisiones clave.
3. **Antes / después de un alumno.** La prueba social más potente que existe. Pediles el permiso y publicá con nombre.
4. **El número.** "Un barbero con agenda llena hace 12 cortes por día". Contenido de negocio, no de técnica. Atrae al que quiere el oficio por la plata, que es la mayoría.

**Ritmo mínimo sostenible:** 4 posteos por semana + stories diarias. Una vez por semana,
un posteo que termine en "te mando la clase gratis, comentá CLASE".

**El truco del comentario:** pedir que comenten una palabra en vez de mandar al link.
Instagram premia el comentario, y vos les respondés por privado con el link. Duplica el alcance.

---

## 6. Cómo cobrar (lo operativo)

**Mercado Pago es el camino.** Es lo que la gente ya tiene instalado, permite cuotas sin
interés y acepta efectivo por Rapipago y Pago Fácil.

Pasos:
1. Entrá a tu cuenta de Mercado Pago → **Cobros → Link de pago**.
2. Creá un link por cada producto (5 en total).
3. Pegá esos links en `js/data.js`, en `pagos.mercadopago.links`.
4. Poné `activo: true`.

Con eso el checkout deja de mandar a WhatsApp y cobra directo.

**Transferencia:** cargá tu alias y CBU reales en `pagos.transferencia`. Los datos que hay
ahora son de ejemplo y **hay que reemplazarlos antes de publicar**.

**Sobre plataformas tipo Hotmart:** no las necesitás todavía. Cobran comisión por venta
(alrededor del 10%) a cambio de resolverte el pago y el hosting del video, cosas que ya
tenés resueltas acá. Tiene sentido solo si más adelante querés vender con afiliados.

**Sobre impuestos:** tanto Mercado Pago como Hotmart informan tus cobros a ARCA (ex AFIP).
Si esto empieza a facturar en serio, hablalo con un contador y sacá el monotributo. No es
un detalle menor y no te lo puedo resolver yo.

---

## 7. Dónde subir los videos

**Recomendación: YouTube como "no listado".**

- Gratis, sin límite de espacio.
- Se adapta solo a la conexión del alumno (clave si te ven desde el celular con datos).
- "No listado" significa que no aparece en búsquedas ni en tu canal: solo entra el que tiene el link, y en tu campus el link está dentro del aula.

La alternativa paga es **Vimeo** (desde USD 12/mes), que permite restringir el video a tu
dominio para que no se pueda compartir. Vale la pena cuando el curso ya te esté dando plata.

**El campus ya soporta las dos.** Cargás el ID desde `/admin/` y listo.

**Cómo grabar sin equipo caro:**
- Celular en trípode, dos ángulos: uno general y uno cerrado sobre la mano.
- Luz: una ventana de día o un aro de luz barato. Es lo que más cambia la percepción de calidad.
- Audio: es más importante que la imagen. Un micrófono de solapa de $15.000 alcanza.
- Clases de 10 a 25 minutos. Una técnica por video.
- Grabá el módulo 1 completo antes de vender. El resto lo podés ir subiendo mientras los primeros alumnos avanzan.

---

## 8. Los primeros 30 días

**Semana 1 — Poner la casa en orden**
- Reemplazar los datos de transferencia de ejemplo por los reales.
- Crear los 5 links de Mercado Pago y cargarlos.
- Abrir la cuenta de Instagram de la academia (o usar la que ya tenés).
- Grabar la clase gratis. Una sola, buena. Es la que más va a trabajar.

**Semana 2 — Grabar el módulo 1 de los dos cursos**
- 6 clases de barbería, 7 de tatuaje. Es una semana de laburo.
- Cargarlas desde `/admin/`.

**Semana 3 — Preventa**
- Publicar la landing y avisar en Instagram: precio de fundador, cupos limitados, y sos honesto con que el curso se sube módulo a módulo.
- Los primeros 10 alumnos entran más barato a cambio de que te dejen un testimonio.

**Semana 4 — Cerrar el círculo**
- Seguir grabando mientras los primeros avanzan.
- Pedir testimonio y foto de trabajos a cada alumno que termine un módulo.
- Reemplazar los testimonios de ejemplo de `js/data.js` por los reales.

---

## 9. Lo que falta completar

El paso a paso operativo está en **[EMPEZAR-HOY.md](EMPEZAR-HOY.md)**. Acá va la lista corta.

**En `js/config.js`** (el archivo de configuración):

- [ ] `transferencia` — alias, CBU y titular reales. Mientras esté vacío, la web **no ofrece**
      transferencia: prefiere no mostrar un medio de pago antes que mostrar datos falsos.
- [ ] `mercadopago.links` — los links de pago, y `activo: true`
- [ ] `metaPixel` — ponelo aunque todavía no hagas publicidad: desde el día uno empieza a
      juntar la audiencia a la que después le vas a poder mostrar anuncios
- [ ] `preventa.completo` — una fecha que puedas cumplir de verdad
- [ ] `clavePanel` — cambiá la que viene por defecto

**En `js/data.js`** (el contenido):

- [ ] `testimonios` — **son de ejemplo.** Cambialos por los de alumnos reales apenas los
      tengas, y poné `config.testimoniosDemo: false`. Mientras siga en `true`, la web avisa
      abajo de la sección que son de muestra. Publicar testimonios inventados como si fueran
      reales es publicidad engañosa y, si alguien lo descubre, te quema la marca.
- [ ] `marca.instagram` — tu usuario real

**Lo demás:**

- [ ] Grabar y cargar los videos desde `/admin/`
- [ ] En Netlify: **Forms → Settings → Form notifications** para que los pedidos y las
      consultas te lleguen al mail

**Ya resuelto:** los números de la landing son reales (clases, horas, módulos, días de
garantía); `/admin/` tiene traba con clave; los medios de pago se muestran solo si están
configurados; y la web avisa que el curso está en preventa mientras `preventa.activo` esté
en `true`.
