# D Burgers — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación). Se publica tal cual
junto al resto del proyecto en Netlify.

- URL: `/dburgers/` (también responden los atajos `/dburgers` y `/burgers`)

## Archivos

```
dburgers/
├── index.html            estructura de la página y datos estructurados (SEO)
├── css/dburgers.css      estilos
├── js/datos.js           👈 TODO lo editable está acá
├── js/app.js             lógica: catálogo, pedido, upsell, WhatsApp
└── img/                  fotos de las hamburguesas
```

## ⚠️ Los datos son de demostración

Direcciones, teléfonos, WhatsApp, precios, reseñas y avisos de "pedidos recientes"
son **inventados** para mostrar el sitio funcionando. Antes de publicarlo de verdad
hay que reemplazarlos en `js/datos.js`:

| Qué | Dónde |
|---|---|
| Direcciones, teléfonos, WhatsApp, horarios, mapas | `CONFIG.locales` |
| Horario de cocina (calcula el "abierto/cerrado") | `CONFIG.cocina` |
| Costo y mínimo de envío | `CONFIG.envio` |
| Instagram y email | `CONFIG.marca` |
| Precios de hamburguesas | `BURGERS[].precio` |
| Precios de papas, bebidas y extras | `EXTRAS` |
| Precios de combos y su valor suelto | `COMBOS` |
| Cupón de primera compra | `CUPON` |
| Reseñas y puntaje | `TESTIMONIOS` y `REPUTACION` |
| Preguntas frecuentes | `FAQ` |
| Texto de la garantía | `GARANTIA` |

Además, en `index.html` hay un bloque `application/ld+json` con los mismos datos
para Google (dirección, teléfono, horarios, precios). **Hay que actualizarlo a mano
cuando cambien los datos reales**, sobre todo direcciones, teléfonos y horarios.

### Prueba social: apagala hasta tener pedidos reales

`PEDIDOS_RECIENTES` alimenta los avisos de "Fulano acaba de pedir". Mostrar
actividad inventada como si fuera real es engañar al cliente. Poné
`CONFIG.PRUEBA_SOCIAL = false` hasta poder cargar pedidos que hayan ocurrido
de verdad.

## Cómo funciona el sistema de pedidos

1. El cliente agrega hamburguesas, combos o extras desde la carta.
2. Al agregar una hamburguesa se abre el **upsell** ofreciendo papas y bebida.
3. Todo se acumula en el **panel del pedido** (se guarda en el navegador, así que
   sobrevive si el cliente cierra la pestaña).
4. Puede aplicar el cupón de primera compra.
5. El botón de WhatsApp arma **un solo mensaje** con el detalle completo, los
   totales, el descuento y el local elegido.

## Cómo agregar una hamburguesa nueva

1. Poné la foto en `img/` (vertical, tipo poster, con los ingredientes señalados).
2. Agregá un objeto al array `BURGERS` en `js/datos.js`.
3. En `ingredientes`, `x` e `y` son la posición **en porcentaje de la foto** donde está
   escrito el nombre de ese ingrediente. Eso hace que, al pasar el mouse por el
   ingrediente en la ficha, se ilumine el cartel correspondiente en la imagen.
   `x: 0` es el borde izquierdo, `x: 100` el derecho; `y: 0` arriba, `y: 100` abajo.
4. Si querés que aparezca en el menú de Google, sumala también al bloque
   `application/ld+json` de `index.html`.

## Probar en local

Con abrir `index.html` en el navegador alcanza. Si preferís servidor:

```bash
python3 -m http.server 8000
# después: http://localhost:8000/dburgers/
```
