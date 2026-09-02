# Urban Dog's — Manual del sitio

Sitio web completo para una marca de panchos artesanales. Está hecho en HTML, CSS y
JavaScript puro: **no necesita servidor, ni base de datos, ni pagar mensualidades**.
Se publica en Netlify (gratis) y funciona.

---

## 1. Lo primero: poner tus datos (10 minutos)

Abrí **`js/config.js`** y cambiá todo lo que tenga el símbolo ⚠️. Es el único archivo
que hace falta tocar para dejar el sitio funcionando.

| Qué | Dónde | Detalle |
|---|---|---|
| Número de WhatsApp | `contacto.whatsapp` | Solo números, con código de país. Argentina: `54` + `9` + área sin el 0 + número sin el 15. Ejemplo: `5491123456789` |
| Dirección y barrio | `contacto.direccion`, `contacto.barrio` | Se muestra en la sección Local y en el botón "Cómo llegar" |
| Mail | `contacto.email` | |
| Redes | `contacto.instagram`, `tiktok`, `facebook` | Dejá el texto vacío (`''`) en la red que no uses y desaparece del footer |
| Horarios | `horarios` | `0` = domingo … `6` = sábado. Con esto el sitio muestra solo el cartel **Abierto ahora / Cerrado** |
| Costo de envío | `ventas.costoEnvio` | Poné `0` si siempre es gratis |
| Envío gratis desde | `ventas.envioGratisDesde` | Aparece la barrita "te faltan $X para el envío gratis". **Es lo que más sube el ticket promedio** |
| Pedido mínimo | `ventas.pedidoMinimo` | `0` para sacarlo |
| Zonas de reparto | `ventas.zonas` | |
| Medios de pago | `ventas.pagos` | Se listan en el footer y en el checkout |
| Alias de transferencia | `ventas.aliasTransferencia` | Se agrega solo al mensaje de WhatsApp cuando el cliente elige transferencia |
| Cupones | `ventas.cupones` | Ver más abajo |
| Promo de la barra roja | `promo` | Poné `activa: false` para ocultarla |
| Reseñas | `resenas` | ⚠️ Reemplazá los textos de ejemplo por reseñas reales de tus clientes |

> **Importante:** los precios, la dirección, el teléfono y las reseñas que vienen cargados
> son de ejemplo. Cambialos por los reales antes de publicar.

---

## 2. Cambiar la carta

Todo está en **`js/data.js`**.

**Agregar un producto:** copiá un bloque `{ ... }` entero, pegalo abajo y cambiale:

```js
{
  id: 'mi-pancho',            // único, sin espacios ni acentos
  cat: 'panchos',             // panchos | combos | papas | bebidas | dulce
  nombre: 'Nombre que se ve',
  desc: 'Una o dos líneas describiendo el producto.',
  precio: 6500,
  antes: 0,                   // precio tachado; 0 = sin oferta
  badge: 'Nuevo',             // cartelito arriba de la foto; '' = sin cartel
  tags: ['nuevo'],            // picante | veggie | nuevo | top
  ingredientes: ['Lo que lleva', 'Uno por línea'],
  art: { pan: 'brioche', salchicha: 'clasica', toppings: ['bacon'], salsas: ['ketchup'] }
}
```

**Sacar un producto de la web:** borrá su bloque, o agregale `activo: false,`.

**Cambiar un precio:** cambiá el número en `precio`. Se actualiza en la carta, en el
carrito, en la carta imprimible y en los datos que lee Google. Todo de una.

### Los dibujos de los productos
El sitio dibuja cada pancho solo, con SVG. Las piezas disponibles están en `js/art.js`:

- **pan:** `brioche`, `clasico`, `rustico`, `integral`, `negro`, `leche`
- **salchicha:** `clasica`, `ternera`, `picante`, `parrillera`, `trufa`, `veggie`, `doble`, `mini`
- **toppings:** `cebolla`, `cebollamorada`, `crocante`, `bacon`, `jalapeno`, `pepino`, `papaspay`, `provoleta`, `parmesano`, `criolla`, `rucula`, `tomate`
- **salsas:** `ketchup`, `mostaza`, `cheddar`, `chipotle`, `chimi`, `mayoajo`, `hongos`, `barbacoa`

### Cuando tengas fotos reales
Poné la foto en `urbandogs/img/` y agregale al producto:

```js
foto: 'img/mi-pancho.jpg',
```

La tarjeta usa la foto en vez del dibujo. Ideal: **840 × 480 px**, JPG, menos de 200 KB.

---

## 3. Cupones

En `js/config.js`, dentro de `ventas.cupones`:

```js
{ codigo: 'URBAN10', tipo: 'porcentaje', valor: 10, min: 0, texto: '10% OFF en tu primer pedido' }
```

- `tipo: 'porcentaje'` → descuenta ese % del subtotal
- `tipo: 'monto'` → descuenta esa cantidad de pesos
- `tipo: 'envio'` → regala el envío
- `min` → monto mínimo de compra para que el cupón funcione (`0` = sin mínimo)

También podés mandar un link con el cupón ya puesto:
`tusitio.com/urbandogs/?cupon=URBAN10`

Y un link que agrega un producto directo al carrito (sirve para la bio de Instagram):
`tusitio.com/urbandogs/?pedir=doble-ahumado`

---

## 4. Cómo entra la plata (lo que hace vender)

| Recurso | Qué hace |
|---|---|
| **Checkout por WhatsApp** | El pedido llega escrito y ordenado. Cero comisiones de apps de delivery |
| **Barra de envío gratis** | "Te faltan $3.700 para el envío gratis" — el cliente suma un producto más |
| **Order bump en el carrito** | Ofrece papas, bebida y postre justo antes de cerrar. Editable en `UD_BUMPS` (`js/data.js`) |
| **Combos con precio tachado** | Ticket más alto de entrada |
| **Cupón por mail** | Captura el contacto del cliente y lo trae de vuelta |
| **Armá tu pancho** | Cada topping suma. Sube el ticket y entretiene |
| **Formulario de eventos** | El catering es el pedido más grande y rentable del negocio |
| **Pedido mínimo** | Evita viajes que no cierran |
| **Datos del cliente guardados** | La segunda compra es de un solo clic |

---

## 5. Los formularios (dónde llegan los datos)

Los dos formularios (Eventos y Cupón por mail) usan **Netlify Forms**, que viene incluido
en el plan gratuito (100 envíos por mes).

Una vez publicado el sitio en Netlify:
1. Entrá al panel de Netlify → tu sitio → pestaña **Forms**.
2. Vas a ver `urbandogs-eventos` y `urbandogs-newsletter`.
3. En **Forms → Settings → Form notifications** agregá tu mail para que te avise cada vez
   que alguien completa el formulario. Sin esto los mensajes quedan solo en el panel.

---

## 6. Medición (opcional pero recomendado)

En `js/config.js`, en `medicion`:

- `googleAnalytics: 'G-XXXXXXXXXX'` → tu ID de Google Analytics 4
- `metaPixel: '123456789012345'` → tu ID del píxel de Meta (para publicidad en Instagram)

Si los dejás vacíos no se carga ningún script y el sitio anda igual de rápido.

El sitio ya manda solo estos eventos: `add_to_cart`, `view_cart`, `begin_checkout`,
`purchase` y `lead`. Con eso podés medir cuánto vendés desde la web y hacer campañas
de remarketing.

---

## 7. Publicar el sitio

**Opción A — Netlify (recomendada, gratis)**
1. Subí el repositorio a GitHub.
2. Entrá a [netlify.com](https://netlify.com) → *Add new site* → *Import an existing project*.
3. Elegí el repositorio. La configuración ya está en `netlify.toml`, no toques nada.
4. Deploy. Listo.

El sitio queda en `tusitio.netlify.app/urbandogs/`. Los atajos ya configurados:

| Link corto | Va a |
|---|---|
| `/panchos` | la home de Urban Dog's |
| `/urbandogs` | la home de Urban Dog's |
| `/pedir` | directo a la carta |
| `/carta` | la carta imprimible (ideal para el código QR de las mesas) |

**Dominio propio:** en Netlify → *Domain settings* → *Add custom domain*. El certificado
HTTPS lo pone Netlify solo y gratis.

---

## 8. Los archivos

```
urbandogs/
├── index.html          La página principal (todo el sitio)
├── carta.html          Carta completa para imprimir o para el QR de las mesas
├── gracias.html        Página de agradecimiento después de un formulario
├── legales.html        Términos y condiciones + privacidad
├── manifest.webmanifest
├── css/urban.css       Todos los estilos
├── js/
│   ├── config.js       ⚙️  TUS DATOS — es lo único que tenés que tocar
│   ├── data.js         🍽️  LA CARTA — productos, precios y armador
│   ├── art.js          Motor de ilustraciones SVG
│   ├── cart.js         Carrito, cupones, totales y armado del mensaje de WhatsApp
│   └── app.js          Renderizado, efectos y medición
├── img/
│   ├── favicon.svg
│   ├── og.png          Imagen que se ve al compartir el link
│   └── og.svg
└── tools/generar-og.js Regenera og.png si cambiás la marca
```

---

## 9. Preguntas rápidas

**¿Puedo cambiar los colores?**
Sí. En `css/urban.css`, arriba de todo, en `:root`. `--mustard` es el amarillo,
`--ketchup` el rojo, `--ink` el fondo oscuro.

**¿Anda sin internet del lado del cliente?**
El carrito y los precios sí (se guardan en el navegador). Las tipografías se bajan de
Google Fonts; si no cargan, el sitio se ve igual con tipografías del sistema.

**¿Los precios se actualizan solos?**
No. Los cambiás vos en `data.js` y se actualizan en todas las pantallas a la vez.

**¿Cómo cambio la imagen que se ve al compartir el link por WhatsApp?**
Editá `tools/generar-og.js` y corré `npm install sharp` y después
`node urbandogs/tools/generar-og.js`. O reemplazá `img/og.png` por tu propia imagen
de 1200 × 630 px.

**¿Funciona en celular?**
Sí, está pensado primero para celular: barra de pedido fija abajo, menú desplegable,
botón de WhatsApp siempre a mano.
