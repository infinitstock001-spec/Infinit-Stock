/* =========================================================================
   URBAN DOG'S — Motor de ilustraciones
   -------------------------------------------------------------------------
   Todo el arte del sitio es SVG generado acá: no depende de fotos externas,
   pesa poco y se ve nítido en cualquier pantalla.

   Cuando tengas fotos reales del local, agregale a un producto de data.js
   el campo  foto: 'img/mi-foto.jpg'  y la tarjeta usa la foto en lugar del
   dibujo, sin tocar nada más.
   ========================================================================= */

const UD_ART = (() => {

  /* ---------- paletas ---------- */
  const PAN = {
    brioche:  ['#F5BE6B', '#D8913F', '#B8722C'],
    clasico:  ['#F7CE86', '#DDA255', '#BE8138'],
    rustico:  ['#E0AC72', '#B98047', '#91602F'],
    integral: ['#CFA36A', '#A2743F', '#7C5629'],
    negro:    ['#45444B', '#24242A', '#141418'],
    leche:    ['#FADFB1', '#E5BB7C', '#C79A58']
  };

  const SALCHICHA = {
    clasica:    ['#D46A46', '#A93E24', '#7E2916'],
    ternera:    ['#C55639', '#93321D', '#6B2214'],
    picante:    ['#E24F2F', '#A82418', '#7C1811'],
    parrillera: ['#B75536', '#82301B', '#5C2012'],
    trufa:      ['#7A5645', '#4A3227', '#2E1E17'],
    veggie:     ['#8E5A5F', '#5E3540', '#40232B'],
    doble:      ['#D46A46', '#A93E24', '#7E2916'],
    mini:       ['#DA7A55', '#B04A2C', '#84301A']
  };

  const TOPPING = {
    cebolla:       { c: '#D08F3E', c2: '#A96C25', forma: 'tira' },
    cebollamorada: { c: '#A566B4', c2: '#7B4589', forma: 'aro'  },
    crocante:      { c: '#E3AC55', c2: '#BE8531', forma: 'chip' },
    bacon:         { c: '#C04B3B', c2: '#E8B0A2', forma: 'bacon' },
    jalapeno:      { c: '#57A83F', c2: '#3B7A28', forma: 'aro'  },
    pepino:        { c: '#7DB851', c2: '#568234', forma: 'aro'  },
    papaspay:      { c: '#EDBB63', c2: '#CE9736', forma: 'palito' },
    provoleta:     { c: '#F6DFA4', c2: '#DFC079', forma: 'manta' },
    parmesano:     { c: '#F7EAC2', c2: '#E0CE9A', forma: 'escama' },
    criolla:       { c: '#D24C36', c2: '#5C9A3B', forma: 'picado' },
    rucula:        { c: '#4A8C3B', c2: '#2F6526', forma: 'hoja' },
    tomate:        { c: '#CE4030', c2: '#9C2A1E', forma: 'gajo' }
  };

  const SALSA = {
    ketchup:  '#DA3324',
    mostaza:  '#F5B31F',
    cheddar:  '#F49B1C',
    chipotle: '#E08E62',
    chimi:    '#54933A',
    mayoajo:  '#FBF4DE',
    hongos:   '#B0906F',
    barbacoa: '#77401F'
  };

  /* ---------- azar determinista (mismo dibujo siempre) ---------- */
  function rng(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => (s = (s * 16807) % 2147483647) / 2147483647;
  }
  function hash(str) {
    let h = 0;
    for (let i = 0; i < String(str).length; i++) h = (h * 31 + String(str).charCodeAt(i)) | 0;
    return Math.abs(h) || 7;
  }

  /* ---------- gradientes globales (se inyectan una sola vez) ---------- */
  function defs() {
    let g = '';
    Object.entries(PAN).forEach(([k, [a, b, c]]) => {
      g += `<linearGradient id="ud-pan-${k}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${a}"/><stop offset=".62" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
            </linearGradient>`;
      g += `<linearGradient id="ud-pan-${k}-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
            </linearGradient>`;
    });
    Object.entries(SALCHICHA).forEach(([k, [a, b, c]]) => {
      g += `<linearGradient id="ud-sal-${k}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
            </linearGradient>`;
    });
    g += `
      <linearGradient id="ud-papa" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F7CE72"/><stop offset="1" stop-color="#D19A34"/>
      </linearGradient>
      <linearGradient id="ud-cheddar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFC24D"/><stop offset="1" stop-color="#E5851A"/>
      </linearGradient>
      <linearGradient id="ud-lata" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8E9096"/><stop offset=".35" stop-color="#E6E8EC"/>
        <stop offset=".62" stop-color="#B9BCC3"/><stop offset="1" stop-color="#75777D"/>
      </linearGradient>
      <linearGradient id="ud-vaso" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#FFE59A" stop-opacity=".95"/>
        <stop offset=".5" stop-color="#FFF3CE" stop-opacity=".9"/>
        <stop offset="1" stop-color="#F2C96A" stop-opacity=".9"/>
      </linearGradient>
      <linearGradient id="ud-brownie" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6B4128"/><stop offset="1" stop-color="#38200F"/>
      </linearGradient>
      <radialGradient id="ud-plato" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#000" stop-opacity=".45"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="ud-brillo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".5"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>`;
    return `<svg class="ud-defs" aria-hidden="true" focusable="false" width="0" height="0"><defs>${g}</defs></svg>`;
  }

  /* ---------- piezas ---------- */

  function semillas(seed) {
    const r = rng(seed);
    let s = '';
    for (let i = 0; i < 16; i++) {
      const x = 70 + r() * 280, y = 140 + r() * 34, rot = r() * 180;
      s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="4.2" ry="2.1"
             fill="#FBE7BE" opacity=".75" transform="rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    return s;
  }

  function salchichaShape(tipo) {
    const t = SALCHICHA[tipo] ? tipo : 'clasica';
    const grad = `url(#ud-sal-${t})`;
    const marcas = (y) => {
      let m = '';
      for (let i = 0; i < 5; i++) {
        const x = 96 + i * 58;
        m += `<path d="M ${x} ${y - 16} q 8 16 0 32" stroke="#000" stroke-opacity=".18" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      }
      return m;
    };
    if (t === 'doble') {
      return `<g>
        <rect x="26" y="70" width="368" height="46" rx="23" fill="${grad}"/>
        ${marcas(93)}
        <rect x="26" y="100" width="368" height="46" rx="23" fill="${grad}"/>
        ${marcas(123)}
        <rect x="44" y="76" width="330" height="9" rx="4.5" fill="url(#ud-brillo)"/>
      </g>`;
    }
    if (t === 'mini') {
      return `<g>
        <rect x="70" y="86" width="128" height="50" rx="25" fill="${grad}"/>
        <rect x="222" y="86" width="128" height="50" rx="25" fill="${grad}"/>
        <rect x="86" y="93" width="96" height="9" rx="4.5" fill="url(#ud-brillo)"/>
        <rect x="238" y="93" width="96" height="9" rx="4.5" fill="url(#ud-brillo)"/>
      </g>`;
    }
    return `<g>
      <rect x="24" y="78" width="372" height="62" rx="31" fill="${grad}"/>
      ${marcas(109)}
      <rect x="48" y="86" width="324" height="11" rx="5.5" fill="url(#ud-brillo)"/>
    </g>`;
  }

  function toppingShape(id, seed) {
    const t = TOPPING[id];
    if (!t) return '';
    const r = rng(seed + hash(id));
    let s = '';
    const n = { tira: 9, aro: 7, chip: 11, bacon: 4, palito: 12, manta: 1, escama: 7, picado: 16, hoja: 6, gajo: 5 }[t.forma] || 8;

    for (let i = 0; i < n; i++) {
      const x = 62 + (i / n) * 296 + (r() - .5) * 22;
      const y = 84 + r() * 26;
      const rot = (r() - .5) * 70;
      const g = `transform="rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"`;
      switch (t.forma) {
        case 'tira':
          s += `<rect x="${(x - 16).toFixed(1)}" y="${(y - 3).toFixed(1)}" width="32" height="7" rx="3.5" fill="${i % 2 ? t.c : t.c2}" ${g}/>`; break;
        case 'aro':
          s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${t.c}"/>
                <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${t.c2}"/>`; break;
        case 'chip':
          s += `<path d="M ${(x - 9).toFixed(1)} ${y.toFixed(1)} q 9 -8 18 0 q -9 7 -18 0 z" fill="${i % 2 ? t.c : t.c2}" ${g}/>`; break;
        case 'bacon':
          s += `<path d="M ${(x - 40).toFixed(1)} ${y.toFixed(1)} q 20 -11 40 0 q 20 11 40 0 l 0 11 q -20 11 -40 0 q -20 -11 -40 0 z"
                 fill="${t.c}" ${g}/>
                <path d="M ${(x - 40).toFixed(1)} ${(y + 4).toFixed(1)} q 20 -11 40 0 q 20 11 40 0" stroke="${t.c2}" stroke-width="3.5" fill="none" ${g}/>`; break;
        case 'palito':
          s += `<rect x="${(x - 13).toFixed(1)}" y="${(y - 2.5).toFixed(1)}" width="26" height="5" rx="2.5" fill="${i % 3 ? t.c : t.c2}" ${g}/>`; break;
        case 'manta':
          s += `<path d="M 58 96 q 60 -16 130 -4 q 70 12 152 -4 l 0 26 q -80 18 -152 4 q -70 -14 -130 4 z" fill="${t.c}" opacity=".92"/>
                <path d="M 58 96 q 60 -16 130 -4 q 70 12 152 -4" stroke="${t.c2}" stroke-width="4" fill="none"/>`; break;
        case 'escama':
          s += `<path d="M ${(x - 10).toFixed(1)} ${y.toFixed(1)} l 10 -6 l 10 6 l -10 5 z" fill="${i % 2 ? t.c : t.c2}" ${g}/>`; break;
        case 'picado':
          s += `<rect x="${(x - 4).toFixed(1)}" y="${(y - 3).toFixed(1)}" width="8" height="6" rx="2" fill="${i % 3 === 0 ? t.c2 : t.c}" ${g}/>`; break;
        case 'hoja':
          s += `<path d="M ${x.toFixed(1)} ${(y - 11).toFixed(1)} q 13 8 0 22 q -13 -14 0 -22 z" fill="${i % 2 ? t.c : t.c2}" ${g}/>`; break;
        case 'gajo':
          s += `<path d="M ${(x - 11).toFixed(1)} ${y.toFixed(1)} a 11 8 0 0 1 22 0 z" fill="${t.c}" ${g}/>
                <path d="M ${(x - 6).toFixed(1)} ${(y - 2).toFixed(1)} a 6 4 0 0 1 12 0 z" fill="${t.c2}" ${g}/>`; break;
      }
    }
    return `<g class="ud-art-top" data-top="${id}">${s}</g>`;
  }

  function salsaShape(id, index) {
    const c = SALSA[id];
    if (!c) return '';
    const y = 96 + index * 9;
    const d = `M 56 ${y} q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0`;
    return `<g class="ud-art-salsa" data-salsa="${id}">
      <path d="${d}" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="10" stroke-linecap="round" transform="translate(0 3)"/>
      <path d="${d}" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".33" stroke-width="3" stroke-linecap="round" transform="translate(0 -2)"/>
    </g>`;
  }

  function vapor() {
    return `<g class="ud-steam" aria-hidden="true">
      <path class="ud-steam__w ud-steam__w--1" d="M138 66 c -14 -20 12 -28 -2 -48 c -10 -14 4 -24 4 -24" />
      <path class="ud-steam__w ud-steam__w--2" d="M212 60 c -16 -22 14 -30 -2 -52 c -11 -15 5 -26 5 -26" />
      <path class="ud-steam__w ud-steam__w--3" d="M286 66 c -14 -20 12 -28 -2 -48 c -10 -14 4 -24 4 -24" />
    </g>`;
  }

  /* ---------- pancho completo ---------- */
  function pancho(art = {}, opt = {}) {
    const seed = hash(opt.seed || JSON.stringify(art));
    const pan = PAN[art.pan] ? art.pan : 'brioche';
    const sal = art.salchicha || 'clasica';
    const tops = art.toppings || [];
    const salsas = art.salsas || [];
    const conVapor = opt.vapor !== false;

    return `<svg class="ud-art ud-art--pancho" viewBox="0 0 420 240" width="420" height="240" role="img"
      aria-label="${opt.alt || 'Ilustración de pancho artesanal'}" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="210" cy="206" rx="168" ry="20" fill="url(#ud-plato)"/>
      ${conVapor ? vapor() : ''}
      <!-- pan de atrás -->
      <path d="M 36 152 q 0 -58 58 -60 l 232 0 q 58 2 58 60 q 0 26 -22 30 l -304 0 q -22 -4 -22 -30 z"
            fill="url(#ud-pan-${pan})"/>
      <!-- salchicha -->
      <g class="ud-art__sal" data-sal="${sal}">${salchichaShape(sal)}</g>
      <!-- toppings -->
      <g class="ud-art__tops">${tops.map((t) => toppingShape(t, seed)).join('')}</g>
      <!-- salsas -->
      <g class="ud-art__salsas">${salsas.slice(0, 3).map((s, i) => salsaShape(s, i)).join('')}</g>
      <!-- pan de adelante -->
      <path d="M 36 140 q 0 -8 10 -8 l 328 0 q 10 0 10 8 l 0 20 q 0 38 -46 42 l -256 0 q -46 -4 -46 -42 z"
            fill="url(#ud-pan-${pan}-b)"/>
      <path d="M 46 140 q 168 -12 328 0" stroke="#fff" stroke-opacity=".22" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${pan === 'integral' || pan === 'rustico' ? semillas(seed) : ''}
      ${pan === 'negro' ? '' : `<ellipse cx="120" cy="176" rx="52" ry="9" fill="#fff" opacity=".12"/>`}
    </svg>`;
  }

  /* ---------- papas ---------- */
  function papas(kind = 'simple') {
    const conos = `
      <path d="M 128 90 l 164 0 l -26 122 q -3 14 -18 14 l -76 0 q -15 0 -18 -14 z" fill="#C0392B"/>
      <path d="M 128 90 l 164 0 l -6 28 l -152 0 z" fill="#E05242"/>
      <text x="210" y="176" text-anchor="middle" font-family="Anton, Impact, sans-serif"
            font-size="30" fill="#fff" fill-opacity=".85" letter-spacing="1">UD</text>`;
    let fritas = '';
    const r = rng(hash(kind));
    for (let i = 0; i < 13; i++) {
      const x = 138 + i * 11 + (r() - .5) * 8;
      const h = 66 + r() * 46;
      const rot = (r() - .5) * 34;
      fritas += `<rect x="${x.toFixed(1)}" y="${(96 - h).toFixed(1)}" width="15" height="${h.toFixed(1)}" rx="6"
                  fill="url(#ud-papa)" stroke="#B8832A" stroke-width="1.5"
                  transform="rotate(${rot.toFixed(0)} ${(x + 7).toFixed(1)} 96)"/>`;
    }
    if (kind === 'aros') {
      let aros = '';
      for (let i = 0; i < 6; i++) {
        const x = 150 + (i % 3) * 62, y = 60 + Math.floor(i / 3) * 58;
        aros += `<circle cx="${x}" cy="${y}" r="30" fill="url(#ud-papa)" stroke="#B8832A" stroke-width="3"/>
                 <circle cx="${x}" cy="${y}" r="13" fill="#1A1614"/>`;
      }
      return `<svg class="ud-art ud-art--papas" viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Aros de cebolla">
        <ellipse cx="210" cy="212" rx="140" ry="18" fill="url(#ud-plato)"/>${aros}</svg>`;
    }
    const cheddar = kind === 'cheddar'
      ? `<path d="M 132 96 q 40 26 78 6 q 36 -18 76 8 l -8 34 q -38 -22 -72 -4 q -38 20 -80 -8 z" fill="url(#ud-cheddar)"/>
         <g>${[0, 1, 2, 3, 4].map((i) => `<rect x="${146 + i * 28}" y="${70 + (i % 2) * 14}" width="26" height="10" rx="4" fill="#C0483A"/>`).join('')}</g>
         <g>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${150 + i * 24}" y="${112 + (i % 3) * 9}" width="12" height="5" rx="2.5" fill="#6FA84B"/>`).join('')}</g>`
      : '';
    return `<svg class="ud-art ud-art--papas" viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Papas fritas">
      <ellipse cx="210" cy="216" rx="130" ry="16" fill="url(#ud-plato)"/>
      ${fritas}${conos}${cheddar}</svg>`;
  }

  /* ---------- bebidas ---------- */
  function bebida(kind = 'lata') {
    if (kind === 'lata') {
      return `<svg class="ud-art ud-art--bebida" viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Bebida en lata">
        <ellipse cx="210" cy="216" rx="86" ry="14" fill="url(#ud-plato)"/>
        <rect x="162" y="44" width="96" height="164" rx="16" fill="url(#ud-lata)"/>
        <rect x="162" y="96" width="96" height="58" fill="#D9342A"/>
        <ellipse cx="210" cy="46" rx="48" ry="10" fill="#C9CCD2"/>
        <ellipse cx="210" cy="44" rx="40" ry="7" fill="#9EA2A9"/>
        <text x="210" y="134" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="26" fill="#fff">COLA</text>
        <rect x="176" y="52" width="10" height="148" rx="5" fill="#fff" opacity=".35"/>
      </svg>`;
    }
    if (kind === 'cerveza') {
      return `<svg class="ud-art ud-art--bebida" viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Cerveza artesanal">
        <ellipse cx="210" cy="216" rx="80" ry="14" fill="url(#ud-plato)"/>
        <path d="M 168 44 l 84 0 l -8 164 q -1 10 -12 10 l -44 0 q -11 0 -12 -10 z" fill="#B5731F"/>
        <path d="M 172 78 l 76 0 l -7 126 l -62 0 z" fill="#E8A233"/>
        <path d="M 168 44 l 84 0 l -2 26 q -40 -12 -80 0 z" fill="#F6E7C8"/>
        <rect x="182" y="86" width="9" height="108" rx="4.5" fill="#fff" opacity=".4"/>
        ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${192 + (i % 3) * 20}" cy="${112 + i * 14}" r="4" fill="#fff" opacity=".45"/>`).join('')}
      </svg>`;
    }
    return `<svg class="ud-art ud-art--bebida" viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Limonada de la casa">
      <ellipse cx="210" cy="216" rx="84" ry="14" fill="url(#ud-plato)"/>
      <path d="M 160 52 l 100 0 l -12 156 q -1 10 -12 10 l -52 0 q -11 0 -12 -10 z" fill="#FFF3CE" opacity=".28"/>
      <path d="M 166 84 l 88 0 l -10 120 l -68 0 z" fill="#F5E06A" opacity=".85"/>
      <rect x="236" y="20" width="9" height="70" rx="4.5" fill="#E0483C" transform="rotate(12 240 55)"/>
      <path d="M 194 62 a 22 22 0 0 1 44 0 z" fill="#8FC34A"/>
      <circle cx="216" cy="62" r="7" fill="#EFF6D8"/>
      ${[0, 1, 2, 3].map((i) => `<rect x="${180 + i * 18}" y="${100 + (i % 2) * 26}" width="20" height="20" rx="4" fill="#fff" opacity=".5" transform="rotate(${i * 18} ${190 + i * 18} ${110 + (i % 2) * 26})"/>`).join('')}
    </svg>`;
  }

  /* ---------- postres ---------- */
  function dulce(kind = 'brownie') {
    if (kind === 'cookie') {
      const r = rng(99);
      let chips = '';
      for (let i = 0; i < 12; i++) {
        chips += `<circle cx="${(140 + r() * 140).toFixed(1)}" cy="${(70 + r() * 100).toFixed(1)}" r="${(6 + r() * 5).toFixed(1)}" fill="#40251A"/>`;
      }
      return `<svg class="ud-art ud-art--dulce" viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Cookie de chocolate">
        <ellipse cx="210" cy="212" rx="104" ry="16" fill="url(#ud-plato)"/>
        <circle cx="210" cy="122" r="86" fill="#D9A45E"/>
        <circle cx="210" cy="118" r="82" fill="#E8BA74"/>
        ${chips}
        <ellipse cx="176" cy="82" rx="30" ry="14" fill="#fff" opacity=".18"/>
      </svg>`;
    }
    return `<svg class="ud-art ud-art--dulce" viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Brownie con dulce de leche">
      <ellipse cx="210" cy="210" rx="112" ry="16" fill="url(#ud-plato)"/>
      <path d="M 124 96 l 172 0 l 0 84 q 0 12 -14 12 l -144 0 q -14 0 -14 -12 z" fill="url(#ud-brownie)"/>
      <path d="M 124 96 l 172 0 l 0 16 l -172 0 z" fill="#7C4C2E"/>
      <path d="M 128 92 q 42 -26 84 -6 q 44 20 84 4 l 0 22 q -40 18 -84 -2 q -42 -18 -84 4 z" fill="#C98A3E"/>
      <path d="M 128 92 q 42 -26 84 -6 q 44 20 84 4" stroke="#E5B268" stroke-width="6" fill="none"/>
      ${[0, 1, 2].map((i) => `<circle cx="${164 + i * 46}" cy="${140 + (i % 2) * 22}" r="7" fill="#4A2A16"/>`).join('')}
    </svg>`;
  }

  /* ---------- combos ---------- */
  function combo(n = 1) {
    // Un pancho grande al frente + la guarnición al lado, con la cantidad marcada.
    const cans = Math.min(n, 4);
    const papas = n >= 4 ? 2 : 1;

    let guarni = '';
    for (let i = 0; i < papas; i++) {
      guarni += `<g transform="translate(${300 + i * 66} 128) scale(.46) translate(-210 -150)">
        ${[0, 1, 2, 3, 4, 5, 6, 7].map((j) => `<rect x="${142 + j * 17}" y="${28 + (j % 3) * 15}" width="15" height="${88 - (j % 3) * 12}" rx="7" fill="url(#ud-papa)" stroke="#B8832A" stroke-width="1.6"/>`).join('')}
        <path d="M 128 108 l 164 0 l -26 122 q -3 14 -18 14 l -76 0 q -15 0 -18 -14 z" fill="#C0392B"/>
        <path d="M 128 108 l 164 0 l -6 26 l -152 0 z" fill="#E05242"/>
      </g>`;
    }
    for (let i = 0; i < cans; i++) {
      guarni += `<g transform="translate(${262 + i * 38} 190) scale(.3) translate(-210 -130)">
        <rect x="162" y="44" width="96" height="168" rx="16" fill="url(#ud-lata)"/>
        <rect x="162" y="100" width="96" height="58" fill="#D9342A"/>
        <ellipse cx="210" cy="46" rx="48" ry="10" fill="#C9CCD2"/>
      </g>`;
    }

    const pancho1 = `<g transform="translate(150 108) scale(.74) translate(-210 -122)">
      <path d="M 36 152 q 0 -58 58 -60 l 232 0 q 58 2 58 60 q 0 26 -22 30 l -304 0 q -22 -4 -22 -30 z" fill="url(#ud-pan-brioche)"/>
      <rect x="24" y="78" width="372" height="62" rx="31" fill="url(#ud-sal-clasica)"/>
      <rect x="48" y="86" width="324" height="11" rx="5.5" fill="url(#ud-brillo)"/>
      <path d="M 56 100 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0"
            fill="none" stroke="#DA3324" stroke-width="10" stroke-linecap="round"/>
      <path d="M 56 112 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0"
            fill="none" stroke="#F5B31F" stroke-width="10" stroke-linecap="round"/>
      <path d="M 36 140 q 0 -8 10 -8 l 328 0 q 10 0 10 8 l 0 20 q 0 38 -46 42 l -256 0 q -46 -4 -46 -42 z" fill="url(#ud-pan-brioche-b)"/>
    </g>`;

    // Los panchos de atrás sugieren la cantidad sin ensuciar el dibujo
    let atras = '';
    for (let i = 1; i < Math.min(n, 3); i++) {
      atras += `<g opacity="${.5 - (i - 1) * .16}" transform="translate(${150 + i * 26} ${76 - i * 22}) scale(.7) translate(-210 -122)">
        <path d="M 36 152 q 0 -58 58 -60 l 232 0 q 58 2 58 60 q 0 26 -22 30 l -304 0 q -22 -4 -22 -30 z" fill="url(#ud-pan-brioche)"/>
        <rect x="24" y="78" width="372" height="62" rx="31" fill="url(#ud-sal-ternera)"/>
        <path d="M 36 140 q 0 -8 10 -8 l 328 0 q 10 0 10 8 l 0 20 q 0 38 -46 42 l -256 0 q -46 -4 -46 -42 z" fill="url(#ud-pan-brioche-b)"/>
      </g>`;
    }

    const cantidad = n > 1
      ? `<g transform="translate(58 52)">
           <circle r="30" fill="#E23E33"/>
           <text y="10" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="30" fill="#fff">x${n}</text>
         </g>`
      : '';

    return `<svg class="ud-art ud-art--combo" viewBox="0 0 420 240" width="420" height="240" role="img" aria-label="Combo Urban Dog's de ${n} pancho${n > 1 ? 's' : ''}">
      <ellipse cx="196" cy="212" rx="164" ry="16" fill="url(#ud-plato)"/>
      ${atras}${pancho1}${guarni}${cantidad}</svg>`;
  }

  /* ---------- selector según el producto ---------- */
  function paraProducto(p) {
    if (p.foto) {
      return `<img class="ud-art ud-art--foto" src="${p.foto}" alt="${p.nombre}" loading="lazy" decoding="async" width="420" height="240">`;
    }
    const a = p.art || {};
    if (a.combo) return combo(a.combo);
    if (a.papas) return papas(a.papas);
    if (a.bebida) return bebida(a.bebida);
    if (a.dulce) return dulce(a.dulce);
    return pancho(a, { seed: p.id, alt: p.nombre, vapor: false });
  }

  return { defs, pancho, papas, bebida, dulce, combo, paraProducto, PAN, SALCHICHA, TOPPING, SALSA };
})();

window.UD_ART = UD_ART;
