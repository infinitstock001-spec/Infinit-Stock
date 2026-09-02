/* ============================================================
   INFINIT ACADEMY — Interacciones y render dinámico
   ============================================================ */
(() => {
  'use strict';

  // Prefijo de rutas: las páginas dentro de subcarpetas definen window.IA_BASE = '../'
  const BASE = window.IA_BASE || '';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const on = (el, ev, fn, o) => el && el.addEventListener(ev, fn, o);

  /* ---------- Navbar sticky ---------- */
  const nav = $('.nav');
  const bar = $('.progressbar');
  const buybar = $('.buybar');

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('is-stuck', y > 30);
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    if (buybar) buybar.classList.toggle('is-on', y > window.innerHeight * 0.85);
  };
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú mobile ---------- */
  const burger = $('.burger');
  const drawer = $('.drawer');
  on(burger, 'click', () => {
    // La nav puede estar debajo de la barra de anuncio: el drawer arranca donde termina la nav.
    if (nav) {
      document.documentElement.style.setProperty(
        '--drawer-top',
        nav.getBoundingClientRect().bottom + 'px'
      );
    }
    burger.classList.toggle('is-open');
    drawer.classList.toggle('is-open');
  });
  $$('.drawer a').forEach((a) =>
    on(a, 'click', () => {
      burger.classList.remove('is-open');
      drawer.classList.remove('is-open');
    })
  );

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), (e.target.dataset.delay || i * 60) * 1);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px' }
  );
  $$('.rv').forEach((el) => io.observe(el));

  /* ---------- Contadores ---------- */
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const end = parseFloat(el.dataset.count);
        const suf = el.dataset.suffix || '';
        const dur = 1600;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = end * eased;
          el.textContent =
            (end % 1 !== 0 ? val.toFixed(1) : Math.floor(val).toLocaleString('es-AR')) + suf;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  $$('[data-count]').forEach((el) => cio.observe(el));

  /* ---------- Acordeón (temario y FAQ) ---------- */
  document.addEventListener('click', (e) => {
    const head = e.target.closest('.acc__head, .faq__q');
    if (!head) return;
    const item = head.closest('.acc__item, .faq__item');
    const group = item.parentElement;
    const wasOpen = item.classList.contains('is-open');
    if (group.dataset.single !== 'false') {
      $$('.acc__item.is-open, .faq__item.is-open', group).forEach((i) =>
        i.classList.remove('is-open')
      );
    }
    item.classList.toggle('is-open', !wasOpen);
  });

  /* ---------- Countdown ---------- */
  const cd = $('.cd');
  if (cd) {
    const end = finPromo().getTime();
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      let d = end - Date.now();
      if (d < 0) d = 0;
      const dd = Math.floor(d / 864e5);
      const hh = Math.floor((d % 864e5) / 36e5);
      const mm = Math.floor((d % 36e5) / 6e4);
      const ss = Math.floor((d % 6e4) / 1e3);
      const set = (k, v) => {
        const el = $(`[data-cd="${k}"]`);
        if (el) el.textContent = pad(v);
      };
      set('d', dd); set('h', hh); set('m', mm); set('s', ss);
      $$('[data-cd-inline]').forEach((el) => {
        el.textContent = `${dd}d ${pad(hh)}h ${pad(mm)}m ${pad(ss)}s`;
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Cupos que bajan (escasez honesta y estable) ---------- */
  $$('[data-cupos]').forEach((el) => {
    const base = ACADEMY.config.cuposPromo;
    // Baja de forma determinística según el día del ciclo, no al azar.
    const diaCiclo = Math.floor(Date.now() / 864e5) % ACADEMY.config.promoDias;
    el.textContent = Math.max(4, base - diaCiclo * 3);
  });

  /* ---------- Tilt 3D suave ---------- */
  $$('[data-tilt]').forEach((el) => {
    const max = 7;
    on(el, 'mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-4px)`;
    });
    on(el, 'mouseleave', () => (el.style.transform = ''));
  });

  /* ---------- Render: planes de precio ---------- */
  const planHTML = (p) => {
    const desc = p.precioAnterior
      ? Math.round((1 - p.precio / p.precioAnterior) * 100)
      : 0;
    return `
    <article class="plan ${p.destacado ? 'plan--star' : ''} rv">
      ${p.destacado ? '<span class="plan__tag">Más elegido</span>' : ''}
      <h3 class="plan__name">${p.nombre}</h3>
      <p class="plan__for">${p.para}</p>
      <div class="plan__price">
        <span class="cur">ARS</span>
        <span class="amt">${fmtARS(p.precio)}</span>
        ${p.precioAnterior ? `<span class="old">${fmtARS(p.precioAnterior)}</span>` : ''}
      </div>
      <p class="plan__cuota">
        ${p.cuotas > 1 ? `o <b>${p.cuotas} cuotas sin interés de ${cuotaDe(p.precio, p.cuotas)}</b><br>` : ''}
        ${desc ? `<span class="save-badge">Ahorrás ${desc}%</span>` : ''}
        ${p.cupos ? `<span class="save-badge" style="background:rgba(255,77,94,.13);border-color:rgba(255,77,94,.35);color:var(--danger)">Solo ${p.cupos} cupos</span>` : ''}
      </p>
      <ul>
        ${p.incluye.map((i) => `<li>${i}</li>`).join('')}
        ${p.noIncluye.map((i) => `<li class="no">${i}</li>`).join('')}
      </ul>
      <a class="btn ${p.destacado ? 'btn--primary' : ''} btn--block" href="${BASE}checkout.html?plan=${p.id}">
        Lo quiero
      </a>
    </article>`;
  };

  const planesBox = $('[data-planes]');
  if (planesBox) {
    const ids = (planesBox.dataset.planes || '').split(',').map((s) => s.trim()).filter(Boolean);
    planesBox.innerHTML = ids.map((id) => planHTML(ACADEMY.productos[id])).join('');
    $$('.rv', planesBox).forEach((el) => io.observe(el));
  }

  /* ---------- Render: testimonios ---------- */
  const tBox = $('[data-testimonios]');
  if (tBox) {
    const filtro = tBox.dataset.testimonios;
    const lista =
      filtro && filtro !== 'todos'
        ? ACADEMY.testimonios.filter((t) => t.curso === filtro || t.curso === 'combo')
        : ACADEMY.testimonios;
    tBox.innerHTML = lista
      .map(
        (t) => `
      <figure class="quote rv">
        <div class="stars">★★★★★</div>
        <p>${t.texto}</p>
        <figcaption class="quote__who">
          <div class="quote__ava">${t.ini}</div>
          <div><b>${t.nombre}</b><span>${t.rol}</span></div>
        </figcaption>
      </figure>`
      )
      .join('');

    if (ACADEMY.config.testimoniosDemo) {
      const aviso = document.createElement('p');
      aviso.className = 'tiny muted center';
      aviso.style.cssText = 'grid-column:1/-1;margin-top:1rem';
      aviso.textContent =
        'Testimonios de ejemplo. Se reemplazan por los de alumnos reales antes del lanzamiento ' +
        '(se apaga con config.testimoniosDemo en js/data.js).';
      tBox.appendChild(aviso);
    }

    $$('.rv', tBox).forEach((el) => io.observe(el));
  }

  /* ---------- Render: FAQ ---------- */
  const fBox = $('[data-faq]');
  if (fBox) {
    fBox.innerHTML = ACADEMY.faq
      .map(
        (f) => `
      <div class="faq__item rv">
        <button class="faq__q" type="button"><span>${f.q}</span><i>+</i></button>
        <div class="faq__a"><div><p>${f.a}</p></div></div>
      </div>`
      )
      .join('');
    $$('.rv', fBox).forEach((el) => io.observe(el));
  }

  /* ---------- Render: bonus ---------- */
  const bBox = $('[data-bonus]');
  if (bBox) {
    bBox.innerHTML = ACADEMY.bonus
      .map(
        (b) => `
      <div class="bonus rv">
        <div class="bonus__ico">${b.ico}</div>
        <div><b>${b.t}</b><p>${b.d}</p></div>
        <div class="bonus__val">${b.v}</div>
      </div>`
      )
      .join('');
    $$('.rv', bBox).forEach((el) => io.observe(el));
  }

  /* ---------- Render: temario ---------- */
  const tmBox = $('[data-temario]');
  if (tmBox) {
    const curso = ACADEMY.cursos[tmBox.dataset.temario];
    if (curso) {
      tmBox.innerHTML = curso.modulos
        .map(
          (m, i) => `
        <div class="acc__item ${i === 0 ? 'is-open' : ''}">
          <button class="acc__head" type="button">
            <span class="acc__num">M${String(m.n).padStart(2, '0')}</span>
            <span class="acc__title">${m.titulo}</span>
            <span class="acc__meta">${m.clases.length} clases</span>
            <span class="acc__ico">+</span>
          </button>
          <div class="acc__body"><div>
            <ul>
              <li style="color:var(--tx-soft)">${m.desc}</li>
              ${m.clases
                .map(
                  (c) =>
                    `<li>${c.t}${c.libre ? ' <span class="tag tag--ok" style="margin-left:.4rem">Gratis</span>' : ''}<span class="dur">${c.d}</span></li>`
                )
                .join('')}
            </ul>
          </div></div>
        </div>`
        )
        .join('');
    }
  }

  /* ---------- Guardado de leads (local, exportable) ---------- */
  window.guardarLead = (data) => {
    const leads = JSON.parse(localStorage.getItem('ia_leads') || '[]');
    leads.push({ ...data, fecha: new Date().toISOString(), origen: location.pathname + location.search });
    localStorage.setItem('ia_leads', JSON.stringify(leads));
  };

  /* ---------- Formularios de captura → WhatsApp ---------- */
  $$('form[data-lead]').forEach((form) => {
    on(form, 'submit', (e) => {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(form));
      guardarLead(fd);
      const tipo = form.dataset.lead;
      const msg =
        tipo === 'clase-gratis'
          ? `Hola! Soy ${fd.nombre}. Quiero la clase gratis de ${fd.interes || 'los cursos'}. Mi mail: ${fd.email}`
          : `Hola! Soy ${fd.nombre}. ${fd.mensaje || 'Quiero información sobre los cursos.'} Mail: ${fd.email || '-'}`;
      const ok = form.querySelector('[data-ok]');
      if (ok) {
        ok.classList.remove('hide');
        form.querySelectorAll('input, select, textarea, button').forEach((i) => (i.disabled = true));
      }
      window.open(waLink(msg), '_blank', 'noopener');
    });
  });

  /* ---------- Exit intent (una vez por sesión) ---------- */
  const exitModal = $('#exitModal');
  if (exitModal && !sessionStorage.getItem('ia_exit')) {
    let armado = false;
    setTimeout(() => (armado = true), 12000);
    on(document, 'mouseleave', (e) => {
      if (!armado || e.clientY > 0 || sessionStorage.getItem('ia_exit')) return;
      sessionStorage.setItem('ia_exit', '1');
      exitModal.classList.add('is-open');
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-modal-close]') || e.target.classList.contains('modal')) {
      $$('.modal.is-open').forEach((m) => m.classList.remove('is-open'));
    }
    const opener = e.target.closest('[data-modal-open]');
    if (opener) {
      e.preventDefault();
      const m = $('#' + opener.dataset.modalOpen);
      if (m) m.classList.add('is-open');
    }
  });

  on(document, 'keydown', (e) => {
    if (e.key === 'Escape') $$('.modal.is-open').forEach((m) => m.classList.remove('is-open'));
  });

  /* ---------- Enlaces de WhatsApp con contexto ---------- */
  $$('[data-wa]').forEach((a) => {
    a.href = waLink(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- Año en el footer ---------- */
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Precios inyectados en el HTML ---------- */
  $$('[data-precio]').forEach((el) => {
    const p = ACADEMY.productos[el.dataset.precio];
    if (p) el.textContent = fmtARS(p.precio);
  });
  $$('[data-precio-old]').forEach((el) => {
    const p = ACADEMY.productos[el.dataset.precioOld];
    if (p && p.precioAnterior) el.textContent = fmtARS(p.precioAnterior);
  });
  $$('[data-cuota]').forEach((el) => {
    const p = ACADEMY.productos[el.dataset.cuota];
    if (p) el.textContent = `${p.cuotas} cuotas sin interés de ${cuotaDe(p.precio, p.cuotas)}`;
  });
})();
