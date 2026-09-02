# Infinit Academy

Plataforma de venta de cursos online de barbería y tatuaje. HTML, CSS y JavaScript puro:
no necesita compilar nada, se sube tal cual a Netlify y funciona.

**Para empezar a cobrar, leé [EMPEZAR-HOY.md](EMPEZAR-HOY.md).** Son 5 pasos en un solo archivo.

La estrategia comercial (precios, competencia, embudo, plan de contenido) está en
**[ESTRATEGIA.md](ESTRATEGIA.md)**. Este archivo es solo la parte técnica.

---

## Mapa del sitio

| Archivo | Qué es |
|---|---|
| `index.html` | Landing del embudo: promesa, dolor, método, precios, testimonios, garantía, captura de leads y FAQ |
| `cursos/barberia.html` | Página de venta del curso de barbería (tema dorado) |
| `cursos/tatuaje.html` | Página de venta del curso de tatuaje (tema violeta) |
| `clase-gratis.html` | Imán de contactos: clase gratis a cambio del WhatsApp |
| `checkout.html` | Inscripción: datos, order bump, cupones, medios de pago |
| `gracias.html` | Post-compra con los próximos pasos y el upsell a la mentoría |
| `campus/index.html` | Acceso de alumnos y panel con sus cursos |
| `campus/curso.html` | Aula: video, lista de clases, progreso, notas y certificado |
| `admin/index.html` | Panel interno: carga de videos, embudo y pedidos |
| `forms.html` | Página oculta que le declara los formularios a Netlify. No se toca |

---

## Los dos archivos que vas a tocar

### `js/config.js` — lo comercial

Cobro, WhatsApp, preventa, píxel de Meta, cupones y la clave del panel.
**Es el único que hace falta editar para empezar a vender.** Está todo numerado y explicado
adentro. Lo que pongas acá le gana a lo que diga `data.js`.

### `js/data.js` — el contenido

Precios, cursos, temario, testimonios, FAQ y bonus. Si cambiás un precio ahí, cambia en
todas las páginas a la vez.

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

Todo se configura en `js/config.js`. El paso a paso está en
**[EMPEZAR-HOY.md](EMPEZAR-HOY.md)**.

En resumen: mientras Mercado Pago esté en `activo: false` y no haya alias cargado, el
checkout arma un mensaje con el pedido completo y lo manda a tu WhatsApp. Sirve perfecto
para las primeras ventas.

**Los medios de pago que se le muestran al cliente son solo los que están configurados.**
Si no cargaste el alias, no aparece la opción de transferencia. Es a propósito.

---

## A dónde te llegan los contactos

Los formularios hacen dos cosas a la vez:

1. **Abren WhatsApp** con el mensaje escrito. Ese es el canal rápido.
2. **Mandan una copia a Netlify Forms**, así el contacto te queda guardado aunque la
   persona no llegue a mandar el mensaje.

Los ves en **app.netlify.com → tu sitio → Forms**. Para que te lleguen por mail:
Forms → Settings → Form notifications.

Los tres formularios (`inscripcion`, `clase-gratis`, `consulta`) están declarados en
`forms.html`. Ese archivo no se toca ni se borra: sin él Netlify no los reconoce.

---

## Medir qué funciona

`js/track.js` registra cada paso del embudo: quién vio los precios, quién tocó "lo quiero",
quién abrió el checkout, quién confirmó. Lo ves en `/admin/` → pestaña **Ventas y consultas**.

Si cargás el `metaPixel` en `config.js`, los mismos eventos van a Meta y podés hacer
publicidad en Instagram optimizada por conversión. Sin píxel cargado, no manda nada afuera.

---

## Limitaciones que conviene tener claras

Esto es un sitio estático, así que:

- **Los códigos de acceso no son seguridad real.** Un alumno podría pasarle el código a otro.
  Para bloquear eso de verdad hace falta un backend con login.
- **El progreso y las notas viven en el navegador del alumno.** Si cambia de dispositivo o borra
  los datos del sitio, arranca de cero.
- **La traba de `/admin/` es simple**, no criptográfica: alguien que sepa mirar el código
  encuentra la clave. Como el panel no cobra ni guarda datos de tarjeta, el riesgo es bajo.
  Para protección real, Netlify → Access control → Password protection.

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
