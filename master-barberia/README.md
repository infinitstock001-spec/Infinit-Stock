# Máster en Barbería Profesional — landing de ventas

Página única de venta, estática (HTML + CSS + JS vanilla). No usa librerías,
no hay que compilar nada: se sube tal cual y funciona.

```
master-barberia/
├── index.html          → toda la estructura y los textos
├── css/master.css      → estilos (mobile-first, oscuro + dorado)
├── js/config.js        → ⚠️ EL ÚNICO ARCHIVO QUE TENÉS QUE EDITAR
├── js/master.js        → comportamiento (acordeones, checkout, formulario)
└── img/                → acá van tus fotos
```

---

## 1. Qué tenés que reemplazar antes de publicar

Todo lo que dice `[PLACEHOLDER]` o `[COMPLETAR]` en la página, más esto:

| Dónde | Qué |
|---|---|
| `js/config.js` → bloque 1 | Tu WhatsApp, mail, Instagram y TikTok reales |
| `js/config.js` → bloque 2 | Los links de pago de Mercado Pago |
| `js/config.js` → bloque 4 | La fecha real en que cierra el bono (si la dejás vacía, el contador no se muestra) |
| `index.html` → sección 1 (HERO) | Tu video de presentación o la foto del fade |
| `index.html` → sección 6 | Tu foto y tu historia |
| `index.html` → sección 7 | Los testimonios reales (hoy son todos de ejemplo) |
| `index.html` → sección 8 | Los precios en pesos |
| `index.html` → footer | Links de redes y tu mail |
| `index.html` → `<head>` | El dominio real en las etiquetas `canonical` y `og:` |

**Fotos:** guardalas en `img/` en `.webp` o `.jpg` comprimido, menos de 250 KB
cada una. Podés comprimirlas gratis en squoosh.app. En cada lugar donde va una
foto dejé comentado el `<img>` listo para copiar.

---

## 2. Conectar Mercado Pago (5 minutos, sin programar)

1. Entrá a **mercadopago.com.ar** con tu cuenta.
2. Menú **Cobros → Link de pago → Crear link**.
3. Creá un link por plan (Starter, Pro, Máster) con el precio en pesos.
   Activá las cuotas que quieras ofrecer.
4. Copiá cada link y pegalo en `js/config.js`:

```js
mercadopago: {
  activo: true,                         // ← poné true
  links: {
    starter: 'https://mpago.la/xxxxx',
    pro:     'https://mpago.la/yyyyy',
    master:  'https://mpago.la/zzzzz',
  },
},
```

Listo: el botón de cada plan lleva al checkout de Mercado Pago.

Mientras `activo` esté en `false` o falte un link, el botón cierra la venta
por WhatsApp con los datos del plan cargados. No se rompe nada y no perdés
al cliente.

**Si querés el checkout embebido (Checkout Pro con SDK)** necesitás un backend
que cree la preferencia de pago. El lugar exacto donde va ese código está
comentado en `js/master.js`, dentro de la función `abrirCheckout()`.

---

## 3. Dónde publicarlo

### Opción A — Netlify (gratis, la más simple)

1. Entrá a **netlify.com** y creá una cuenta.
2. **Add new site → Deploy manually** y arrastrá la carpeta `master-barberia`.
   (O conectá el repo de GitHub y se publica solo con cada cambio.)
3. Te queda online en `algo-random.netlify.app` en menos de un minuto.
4. El formulario de captura funciona solo: las respuestas te quedan en
   **tu sitio → Forms**. Para que te lleguen por mail:
   *Forms → Settings → Form notifications → Add notification*.

En este repo ya está el redirect: `tu-sitio/master` lleva a esta landing.

### Opción B — Vercel / Cloudflare Pages / Hostinger

Mismo procedimiento: subís la carpeta y listo. Ojo: el formulario de Netlify
**no funciona fuera de Netlify**. Si publicás en otro lado, abrí `js/config.js`
y poné `leads: 'whatsapp'`. El formulario pasa a abrir WhatsApp con los datos
cargados.

---

## 4. Conectar tu dominio

1. Comprá el dominio (nic.ar para `.com.ar`, o Namecheap / Google Domains
   para `.com`).
2. En Netlify: **Domain settings → Add custom domain** y escribí tu dominio.
3. Netlify te da los DNS a cargar. En el panel de tu proveedor de dominio:
   - Registro `A` de `@` → la IP que te indica Netlify (`75.2.60.5`).
   - Registro `CNAME` de `www` → `tu-sitio.netlify.app`.
4. Esperá entre 10 minutos y 24 horas a que propague.
5. El certificado HTTPS lo emite Netlify solo (**Domain settings → HTTPS →
   Verify DNS configuration**).

---

## 5. Antes de mandar tráfico

- [ ] Abrila en el celular y revisá que se vea bien el hero.
- [ ] Probá los botones de compra: tienen que abrir Mercado Pago.
- [ ] Mandate el formulario a vos mismo y fijate que te llegue.
- [ ] Probá el botón de WhatsApp: tiene que abrir tu chat.
- [ ] Sacá los `[PLACEHOLDER]` que queden dando vueltas.
- [ ] Si vas a hacer publicidad, pegá el Meta Pixel o Google Analytics antes
      de `</head>`. Los eventos (`cta_click`, `checkout_abierto`,
      `lead_enviado`) ya se disparan solos desde `js/master.js`.

---

## Nota legal

El texto del footer y de la sección de certificación aclara que es una
**formación privada** y que el certificado **no es un título oficial**.
No saques esas aclaraciones: te cubren y además ordenan la expectativa del
alumno antes de que compre.

Los testimonios publicados son de ejemplo y están marcados como tales.
Reemplazalos solo por testimonios reales y con autorización del alumno.
