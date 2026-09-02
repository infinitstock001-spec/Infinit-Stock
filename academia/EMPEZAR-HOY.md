# Empezar a cobrar hoy

Guía corta y en orden. Lo de arriba es lo que más plata mueve; lo de abajo puede esperar
a mañana. Todo se hace en un solo archivo: **`js/config.js`**.

---

## Los 5 pasos que sí o sí van hoy

### 1. Poné tus datos de cobro (15 minutos)

Abrí `js/config.js` y completá:

```js
transferencia: {
  alias: 'TU.ALIAS.REAL',
  cbu: '0000003100010000000001',
  titular: 'Nombre como figura en el banco',
  banco: 'Tu banco',
},
```

Mientras el alias esté vacío, **la web no ofrece transferencia**. Es a propósito: mejor no
ofrecer un medio de pago que no podés cobrar.

### 2. Creá los links de Mercado Pago (20 minutos, se hace una sola vez)

1. Entrá a mercadopago.com.ar
2. **Cobros → Link de pago → Crear link**
3. Nombre del curso y precio
4. En **Cuotas**, activá hasta 6 sin interés
5. Copiá el link

Pegalos en `config.js` y poné `activo: true`:

```js
mercadopago: {
  activo: true,
  links: {
    barberia: 'https://mpago.la/xxxxx',
    tatuaje:  'https://mpago.la/yyyyy',
    combo:    'https://mpago.la/zzzzz',
  },
},
```

Los que dejes vacíos siguen yendo por WhatsApp. No se rompe nada.

> **Por qué importa:** con link de pago, el que decide comprar a las 2 de la mañana compra.
> Sin link, tiene que esperar a que le contestes, y ahí se enfría la mitad.

### 3. Decidí qué vendés hoy

Tenés 114 clases en el temario y **ninguna grabada todavía**. Dos caminos honestos:

**A · Vender la masterclass ($9.900) y nada más.** Grabás 3 clases este fin de semana y
las vendés completas. Precio bajo, entrega inmediata, cero riesgo de quedar mal.

**B · Preventa de fundador** (es lo que está activo ahora). Vendés el curso completo al
precio de lanzamiento y entregás por módulos. La web le avisa al comprador, con fecha, que
está comprando un acceso anticipado.

En `config.js`, ajustá la fecha a algo que puedas cumplir:

```js
preventa: {
  activo: true,
  entregaHoy: 'Los módulos 1 y 2 de cada curso, ya grabados',
  ritmo: 'Un módulo nuevo por semana',
  completo: 'Primera semana de noviembre',
},
```

**No pongas una fecha que no vas a cumplir.** Un alumno enojado en el grupo de WhatsApp te
cuesta más que las tres ventas que ganaste apurando.

Cuando esté todo grabado: `activo: false` y el aviso desaparece solo.

### 4. Activá el píxel de Meta (10 minutos)

Sin esto no podés hacer publicidad en Instagram que funcione. Y es gratis.

1. business.facebook.com → **Administrador de eventos**
2. **Conectar orígenes de datos → Web → Pixel**
3. Copiá el ID (15 números)

```js
metaPixel: '123456789012345',
```

Aunque no hagas publicidad todavía, **ponelo hoy igual**: empieza a juntar gente que visitó
tu página, y dentro de un mes le podés mostrar anuncios a esa gente. Si lo ponés recién
cuando quieras hacer ads, arrancás de cero.

### 5. Cambiá la clave del panel

```js
clavePanel: 'la-que-vos-quieras',
```

---

## Cuando esté publicado

### Que te lleguen los pedidos por mail

En Netlify: **Forms → Settings → Form notifications → Add notification → Email**.
Poné tu mail. Desde ahí, cada inscripción y cada pedido de clase gratis te llega al mail,
aunque la persona no llegue a escribirte por WhatsApp.

### Los links cortos para la bio de Instagram

Ya andan solos:

| Link | A dónde va |
|---|---|
| `tusitio.com/gratis` | Clase gratis (el mejor para la bio) |
| `tusitio.com/barberia` | Curso de barbería |
| `tusitio.com/tatuaje` | Curso de tatuaje |
| `tusitio.com/combo` | Checkout del pack directo |
| `tusitio.com/campus` | Campus de alumnos |

### Los cupones

Ya hay tres cargados y funcionan:

- `ARRANQUE15` — 15% en todo. Para cerrar por WhatsApp cuando alguien duda.
- `FUNDADOR` — 20% en el pack combinado.
- `INSTA10` — 10%. Este es para las historias.

Se pueden mandar en el link y se aplican solos:
`tusitio.com/combo?cupon=INSTA10`

Editás, agregás o borrás cupones en `config.js`.

---

## El orden real de las cosas

Lo que más cuesta no es la web: es que la primera persona te crea. Por eso:

1. **Grabá 3 clases**, aunque sea con el celular y luz de ventana. Sin video no hay venta.
2. **Subilas a YouTube como "no listado"** y cargá los IDs en `/admin/`.
3. **Poné una en la clase gratis.** Que la gente vea cómo enseñás antes de que le pidas plata.
4. **Vendé la masterclass primero.** Diez ventas de $9.900 valen más que cero de $49.900:
   te dan testimonios reales, que es lo único que te falta para vender el curso caro.
5. **Recién ahí** apagás `testimoniosDemo` en `js/data.js` y ponés los de verdad.

---

## Lo que la web todavía no hace

Para que no te agarre de sorpresa:

- **No cobra sola.** Manda a Mercado Pago o a WhatsApp; el acceso lo habilitás vos a mano
  (le mandás el código `IA-BARB-0001` por WhatsApp).
- **Los códigos de acceso no son seguridad real.** Un alumno le puede pasar el código a otro.
  Para las primeras decenas de alumnos no es un problema; cuando lo sea, hace falta un
  backend con login de verdad.
- **El progreso del alumno vive en su navegador.** Si cambia de teléfono, arranca de cero.

Nada de esto frena las primeras ventas. Se resuelve cuando el volumen lo justifique.
