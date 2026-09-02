/* ============================================================
   INFINIT ACADEMY — Lógica del campus
   Sesión y progreso guardados en el navegador del alumno.
   Cuando conectes un backend, reemplazá `Alumno` por llamadas a la API.
   ============================================================ */

const Alumno = {
  KEY: 'ia_alumno',

  actual() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || 'null'); } catch { return null; }
  },

  entrar(datos) {
    localStorage.setItem(this.KEY, JSON.stringify({ ...datos, desde: new Date().toISOString() }));
  },

  salir() {
    localStorage.removeItem(this.KEY);
    location.href = 'index.html';
  },

  /* Cursos habilitados según el código de acceso.
     Los códigos los generás vos al confirmar cada pago. */
  cursosDe(codigo) {
    const c = (codigo || '').toUpperCase().trim();
    if (c.startsWith('IA-FULL') || c.startsWith('IA-COMBO') || c.startsWith('IA-MENTORIA')) {
      return ['barberia', 'tatuaje'];
    }
    if (c.startsWith('IA-BARB')) return ['barberia'];
    if (c.startsWith('IA-TAT')) return ['tatuaje'];
    if (c.startsWith('IA-DEMO')) return ['barberia', 'tatuaje'];
    return null;
  },
};

const Progreso = {
  KEY: 'ia_progreso',

  todo() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '{}'); } catch { return {}; }
  },

  de(cursoId) {
    return this.todo()[cursoId] || { vistas: [], ultima: null };
  },

  marcar(cursoId, claseKey, vista) {
    const t = this.todo();
    const p = t[cursoId] || { vistas: [], ultima: null };
    const set = new Set(p.vistas);
    vista ? set.add(claseKey) : set.delete(claseKey);
    p.vistas = [...set];
    t[cursoId] = p;
    localStorage.setItem(this.KEY, JSON.stringify(t));
  },

  ultima(cursoId, claseKey) {
    const t = this.todo();
    const p = t[cursoId] || { vistas: [], ultima: null };
    p.ultima = claseKey;
    t[cursoId] = p;
    localStorage.setItem(this.KEY, JSON.stringify(t));
  },

  porcentaje(cursoId) {
    const curso = ACADEMY.cursos[cursoId];
    if (!curso) return 0;
    const total = totalClases(curso);
    const vistas = this.de(cursoId).vistas.length;
    return total ? Math.round((vistas / total) * 100) : 0;
  },
};

/* Convierte el valor `video` de una clase en una URL embebible. */
function urlVideo(v) {
  if (!v) return null;
  if (v.startsWith('vimeo:')) return `https://player.vimeo.com/video/${v.slice(6)}`;
  if (v.startsWith('http')) return v;
  return `https://www.youtube-nocookie.com/embed/${v}?rel=0&modestbranding=1`;
}
