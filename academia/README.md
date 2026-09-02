# Infinit Academy

Plataforma de venta de cursos online de barbería y tatuaje. HTML, CSS y JavaScript puro:
no necesita compilar nada, se sube tal cual a Netlify y funciona.

La estrategia comercial (precios, competencia, embudo, plan de contenido) está en
**[ESTRATEGIA.md](ESTRATEGIA.md)**. Este archivo es solo la parte técnica.

---

## Mapa del sitio

| Archivo | Qué es |
|---|---|
| `index.html` | Landing del embudo: promesa, dolor, método, precios, testimonios, garantía, captura de leads y FAQ |
| `cursos/barberia.html` | Página de venta del curso de barbería (tema dorado) |
| `cursos/tatuaje.html` | Página de venta del curso de tatuaje (tema violeta) |
| `checkout.html` | Inscripción: datos, order bump, medios de pago |
| `gracias.html` | Post-compra con los próximos pasos y el upsell a la mentoría |
| `campus/index.html` | Acceso de alumnos y panel con sus cursos |
| `campus/curso.html` | Aula: video, lista de clases, progreso, notas y certificado |
| `admin/index.html` | Panel interno para cargar los IDs de video |

---

## El archivo que vas a tocar: `js/data.js`

**Todo el contenido del sitio sale de ahí.** Precios, cursos, temario, testimonios, FAQ,
datos de cobro y WhatsApp. Si cambiás un precio ahí, cambia en las cinco páginas a la vez.

```js
barberia: {
  precio: 49900,          // el precio que se muestra
  precioAnterior: 99900,  // el tachado en rojo (poné 0 para que no aparezca)
  cuotas: 6,              // cuotas sin interés
}
```

Para agregar una clase nueva, sumá un objeto al array `clases` del módulo:

```js
{ t: 'Título de la clase', d: '18:30', video: 'ID_DE_YOUTUBE' }
```

`libre: true` marca la clase como gratuita y le pone el cartel verde en el temario.

---

## Cargar los videos

1. Subí el video a YouTube como **no listado** (o a Vimeo).
2. Copiá el ID: en `youtube.com/watch?v=**dQw4w9WgXcQ**` el ID es lo que va después de `v=`.
3. Entrá a `/admin/`, buscá la clase y pegalo. Se guarda al instante en tu navegador y ya lo
   podés ver en el campus.
4. Cuando termines, andá a la pestaña **Exportar**, copiá el bloque y pegalo al final de
   `js/data.js`. Recién ahí queda publicado para todos los alumnos.

Para Vimeo el formato es `vimeo:123456789`.

**Antes de publicar el sitio, protegé o borrá `/admin/`.** No tiene contraseña.

---

## Códigos de acceso al campus

Los generás vos al confirmar cada pago y se los mandás al alumno por WhatsApp. El prefijo
define a qué cursos entra:

| Prefijo | Habilita |
|---|---|
| `IA-BARB-…` | Solo barbería |
| `IA-TAT-…` | Solo tatuaje |
| `IA-COMBO-…` / `IA-FULL-…` / `IA-MENTORIA-…` | Los dos cursos |
| `IA-DEMO` | Los dos (para mostrar la plataforma) |

Ejemplo: al alumno que compró barbería le mandás `IA-BARB-0147`.

La lógica está en `js/campus.js` → `Alumno.cursosDe()`.

---

## Cobrar de verdad

En `js/data.js`, sección `pagos`:

```js
mercadopago: {
  activo: true,                        // ponelo en true
  links: { barberia: 'https://…' },    // un link de pago por producto
},
transferencia: {
  alias: 'TU.ALIAS.REAL',
  cbu: '…',
  titular: '…',
},
```

Los links se crean en Mercado Pago → **Cobros → Link de pago**.

Mientras `activo` esté en `false`, el checkout arma un mensaje con el pedido completo y lo
manda a tu WhatsApp. Sirve perfecto para arrancar.

---

## Limitaciones que conviene tener claras

Esto es un sitio estático, así que:

- **Los códigos de acceso no son seguridad real.** Un alumno podría pasarle el código a otro.
  Para bloquear eso de verdad hace falta un backend con login.
- **El progreso y las notas viven en el navegador del alumno.** Si cambia de dispositivo o borra
  los datos del sitio, arranca de cero.
- **Los leads también quedan en el navegador de cada visitante**, por eso los formularios
  abren WhatsApp: ese es el canal que sí te llega. Para juntarlos automáticamente, conectá
  [Netlify Forms](https://docs.netlify.com/manage/forms/setup/).

Para las primeras decenas de alumnos esto alcanza y sobra. Cuando el volumen lo justifique,
el paso siguiente es un backend (Supabase o Firebase) reemplazando `Alumno` y `Progreso`
en `js/campus.js` por llamadas a la API. El resto del sitio no hay que tocarlo.

---

## Probar en local

```bash
python3 -m http.server 8000
```

Y abrir `http://localhost:8000/academia/`. En el campus, entrá con cualquier email y el
código `IA-DEMO`.
