# D Burgers — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación). Se publica tal cual
junto al resto del proyecto en Netlify.

- URL: `/dburgers/` (también responden los atajos `/dburgers` y `/burgers`)

## Archivos

```
dburgers/
├── index.html            estructura de la página
├── css/dburgers.css      estilos (negro + dorado, estilo smash)
├── js/datos.js           👈 TODO lo editable está acá
├── js/app.js             lógica: catálogo, filtros, ficha, WhatsApp
└── img/                  fotos de las hamburguesas
```

## Qué falta cargar antes de publicar

Todo se edita en **`js/datos.js`**. Mientras falten datos, el sitio muestra arriba
un aviso amarillo que enumera lo pendiente.

| Dato | Dónde | Cómo se apaga el aviso |
|---|---|---|
| Direcciones de los dos locales | `CONFIG.locales[].direccion` | — |
| Teléfonos | `CONFIG.locales[].telefono` | — |
| WhatsApp (formato `549XXXXXXXXXX`) | `CONFIG.locales[].whatsapp` | — |
| Link de Google Maps | `CONFIG.locales[].mapa` | — |
| Horarios reales | `CONFIG.locales[].horarios` | — |
| Instagram y email | `CONFIG.marca` | — |
| Precios de hamburguesas y combos | `BURGERS[].precio` y `COMBOS[]` | `CONFIG.MOSTRAR_PRECIOS = true` |
| Reseñas reales de clientes | `TESTIMONIOS` | `CONFIG.TESTIMONIOS_DE_EJEMPLO = false` |

Cuando esté todo cargado, poné `CONFIG.MODO_BORRADOR = false` y el aviso desaparece.

**Importante:** los precios y las reseñas que vienen cargados son de relleno para que se
vea el diseño. Hay que reemplazarlos por los reales.

## Cómo agregar una hamburguesa nueva

1. Poné la foto en `img/` (vertical, tipo poster, con los ingredientes señalados).
2. Agregá un objeto al array `BURGERS` en `js/datos.js`.
3. En `ingredientes`, `x` e `y` son la posición **en porcentaje de la foto** donde está
   escrito el nombre de ese ingrediente. Eso hace que, al pasar el mouse por el
   ingrediente en la ficha, se ilumine el cartel correspondiente en la imagen.
   `x: 0` es el borde izquierdo, `x: 100` el derecho; `y: 0` arriba, `y: 100` abajo.

## Probar en local

Con abrir `index.html` en el navegador alcanza. Si preferís servidor:

```bash
python3 -m http.server 8000
# después: http://localhost:8000/dburgers/
```
