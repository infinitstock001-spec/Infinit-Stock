const sharp = require('sharp');
const fs = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#141110"/><stop offset=".55" stop-color="#0C0A09"/><stop offset="1" stop-color="#1B1512"/>
    </linearGradient>
    <radialGradient id="glow1" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#F7B32B" stop-opacity=".42"/><stop offset="1" stop-color="#F7B32B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#E23E33" stop-opacity=".36"/><stop offset="1" stop-color="#E23E33" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="pan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F5BE6B"/><stop offset=".62" stop-color="#D8913F"/><stop offset="1" stop-color="#B8722C"/>
    </linearGradient>
    <linearGradient id="panb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#D8913F"/><stop offset="1" stop-color="#B8722C"/>
    </linearGradient>
    <linearGradient id="sal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#D46A46"/><stop offset=".55" stop-color="#A93E24"/><stop offset="1" stop-color="#7E2916"/>
    </linearGradient>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FFCB5C"/><stop offset=".55" stop-color="#F7B32B"/><stop offset="1" stop-color="#FF5E4D"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <ellipse cx="960" cy="150" rx="480" ry="360" fill="url(#glow1)"/>
  <ellipse cx="120" cy="560" rx="420" ry="320" fill="url(#glow2)"/>

  <g stroke="#ffffff" stroke-opacity=".05" stroke-width="1">
    ${Array.from({length:18},(_,i)=>`<path d="M${i*70} 0V630"/>`).join('')}
    ${Array.from({length:10},(_,i)=>`<path d="M0 ${i*70}H1200"/>`).join('')}
  </g>

  <!-- barra superior -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#grad)"/>

  <!-- logo -->
  <g transform="translate(76 74)">
    <rect width="62" height="62" rx="17" fill="#F7B32B"/>
    <g transform="translate(9 12) scale(1.45)">
      <rect x="0" y="8" width="30" height="7" rx="3.5" fill="#8C5A20"/>
      <rect x="1" y="5" width="28" height="7" rx="3.5" fill="#B03A22"/>
      <path d="M4 7.6c2-1.5 4 1.5 6 0s4 1.5 6 0 4 1.5 6 0 2.6.7 3.6.4" stroke="#FFF0C4" stroke-width="1.7" stroke-linecap="round" fill="none"/>
      <rect x="0" y="13" width="30" height="6" rx="3" fill="#C98A3C"/>
    </g>
    <text x="82" y="30" font-family="Anton, Impact, 'Arial Black', sans-serif" font-size="34" fill="#FBF4E6" letter-spacing="1">URBAN DOG'S</text>
    <text x="82" y="52" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#8E8377" letter-spacing="5">PANCHOS ARTESANALES</text>
  </g>

  <!-- titular -->
  <text x="76" y="272" font-family="Anton, Impact, 'Arial Black', sans-serif" font-size="92" fill="#FBF4E6" letter-spacing="-1">PANCHOS</text>
  <text x="76" y="364" font-family="Anton, Impact, 'Arial Black', sans-serif" font-size="92" fill="url(#grad)" letter-spacing="-1">ARTESANALES</text>
  <text x="76" y="456" font-family="Anton, Impact, 'Arial Black', sans-serif" font-size="92" fill="#FBF4E6" letter-spacing="-1">DE VERDAD</text>

  <text x="78" y="516" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="25" fill="#C9BCA9">Salchicha ahumada 12 h · Pan brioche del día · Salsas caseras</text>

  <!-- chips -->
  <g font-family="Outfit, Helvetica, Arial, sans-serif" font-size="19" font-weight="700">
    <rect x="76" y="546" width="212" height="46" rx="23" fill="#E23E33"/>
    <text x="182" y="576" fill="#ffffff" text-anchor="middle">ENVÍO EN 35 MIN</text>
    <rect x="302" y="546" width="248" height="46" rx="23" fill="none" stroke="#F7B32B" stroke-width="2"/>
    <text x="426" y="576" fill="#F7B32B" text-anchor="middle">PEDÍ POR WHATSAPP</text>
  </g>

  <!-- pancho grande -->
  <g transform="translate(720 190) rotate(-8) scale(1.15)">
    <ellipse cx="210" cy="212" rx="176" ry="22" fill="#000000" fill-opacity=".45"/>
    <path d="M 36 152 q 0 -58 58 -60 l 232 0 q 58 2 58 60 q 0 26 -22 30 l -304 0 q -22 -4 -22 -30 z" fill="url(#pan)"/>
    <rect x="24" y="70" width="372" height="46" rx="23" fill="url(#sal)"/>
    <rect x="24" y="100" width="372" height="46" rx="23" fill="url(#sal)"/>
    <rect x="46" y="76" width="328" height="9" rx="4.5" fill="#ffffff" fill-opacity=".28"/>
    <g>
      ${Array.from({length:7},(_,i)=>`<rect x="${70+i*42}" y="${88+(i%2)*10}" width="34" height="8" rx="4" fill="#D08F3E" transform="rotate(${(i%3-1)*16} ${87+i*42} ${92+(i%2)*10})"/>`).join('')}
    </g>
    <path d="M 56 100 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0" fill="none" stroke="#DA3324" stroke-width="10" stroke-linecap="round"/>
    <path d="M 56 112 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0 q 22 13 44 0 q 22 -13 44 0" fill="none" stroke="#F5B31F" stroke-width="10" stroke-linecap="round"/>
    <path d="M 36 140 q 0 -8 10 -8 l 328 0 q 10 0 10 8 l 0 20 q 0 38 -46 42 l -256 0 q -46 -4 -46 -42 z" fill="url(#panb)"/>
    <path d="M 46 140 q 168 -12 328 0" stroke="#ffffff" stroke-opacity=".24" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>

  <!-- sello -->
  <g transform="translate(1058 512)">
    <circle r="72" fill="#E23E33"/>
    <text y="-8" font-family="Anton, Impact, 'Arial Black', sans-serif" font-size="30" fill="#ffffff" text-anchor="middle">100%</text>
    <text y="24" font-family="Anton, Impact, 'Arial Black', sans-serif" font-size="26" fill="#ffffff" text-anchor="middle">REAL</text>
  </g>
</svg>`;

fs.writeFileSync('urbandogs/img/og.svg', svg);
sharp(Buffer.from(svg)).png({ quality: 90, compressionLevel: 9 }).toFile('urbandogs/img/og.png')
  .then(i => console.log('og.png', i.width + 'x' + i.height, Math.round(fs.statSync('urbandogs/img/og.png').size/1024) + ' KB'))
  .catch(e => { console.error(e); process.exit(1); });

/* --------------------------------------------------------------------
   Cómo usarlo:
     npm install sharp          (una sola vez)
     node urbandogs/tools/generar-og.js
   Regenera urbandogs/img/og.png, la imagen que se ve cuando compartís
   el link por WhatsApp, Instagram o Facebook.
   -------------------------------------------------------------------- */
