// ═══════════════════════════════════════════════════════════════
// Math Magician — "Open in Graph Plotter" for the lesson graphers
//
// Loaded by the five grade pages. Each lesson grapher is a canvas or
// SVG with a fixed id (the English and Afrikaans lessons share ids).
// When one appears in a rendered lesson, a button is added under it;
// clicking reads that widget's current inputs, translates them into
// Graph Plotter state (minding each widget's own sign convention, e.g.
// y = a(x − p)² + q in the lessons vs a(x + p)² + q in the plotter) and
// opens ../grapher.html with the graph carried in the link.
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';
  const el = (id) => document.getElementById(id);
  const has = (id) => !!el(id);
  const num = (id, dflt) => { const v = parseFloat(el(id) && el(id).value); return Number.isFinite(v) ? v : dflt; };
  const s = (v) => String(Math.round(v * 1e6) / 1e6);

  // Plane that shows every given point with some room, in whole numbers.
  function fit(xs, ys, extra) {
    const X = xs.concat([0]).filter(Number.isFinite), Y = ys.concat([0]).filter(Number.isFinite);
    let x0 = Math.floor(Math.min(...X) - 2), x1 = Math.ceil(Math.max(...X) + 2);
    let y0 = Math.floor(Math.min(...Y) - 2), y1 = Math.ceil(Math.max(...Y) + 2);
    if (x1 - x0 < 10) { const m = (x0 + x1) / 2; x0 = Math.floor(m - 5); x1 = Math.ceil(m + 5); }
    if (y1 - y0 < 10) { const m = (y0 + y1) / 2; y0 = Math.floor(m - 5); y1 = Math.ceil(m + 5); }
    const step = (r) => r > 40 ? 5 : r > 24 ? 2 : 1;
    return Object.assign({ xmin: s(x0), xmax: s(x1), ymin: s(y0), ymax: s(y1), xstep: s(step(x1 - x0)), ystep: s(step(y1 - y0)) }, extra || {});
  }
  const std = (extra) => Object.assign({ xmin: '-10', xmax: '10', ymin: '-10', ymax: '10', xstep: '1', ystep: '1' }, extra || {});
  const trigPlane = (extra) => Object.assign({ xmin: '0', xmax: '360', ymin: '-4', ymax: '4', xstep: '90', ystep: '1', degrees: true }, extra || {});
  const G = (type, params, o) => Object.assign({ type, params }, o || {});
  const P = (name, x, y) => ({ name, x: s(x), y: s(y) });
  // A straight line through two points, as a line (or a segment when `seg`).
  function through(x1, y1, x2, y2, seg, o) {
    if (x1 === x2) return G('vertical', { k: s(x1) }, o);
    const m = (y2 - y1) / (x2 - x1), c = y1 - m * x1;
    const g = G('linear', { m: s(m), c: s(c) }, o);
    if (seg) Object.assign(g, { from: s(Math.min(x1, x2)), to: s(Math.max(x1, x2)), keyPts: false });
    return g;
  }

  const BUILDERS = {
    // Gr 9 · Parabola Explorer — y = a(x − p)² + q
    parCanvas2() {
      const a = num('pra2', 1) || 1, p = num('prp2', 0), q = num('prq2', 0);
      return { plane: fit([p - 5, p + 5], [q]), graphs: [G('quadVertex', { a: s(a), p: s(-p), q: s(q) })] };
    },
    // Gr 10 · Function Grapher — parabola y = a(x − p)² + q, hyperbola y = a/(x + p) + q, line y = mx + c
    g10c6gcv() {
      if (has('g10c6ga2')) {
        const a = num('g10c6ga2', 1), p = num('g10c6gp2', 0), q = num('g10c6gq2', 0);
        return { plane: fit([p - 5, p + 5], [q]), graphs: [G('quadVertex', { a: s(a), p: s(-p), q: s(q) })] };
      }
      if (has('g10c6gha2')) {
        const a = num('g10c6gha2', 1), p = num('g10c6ghp2', 0), q = num('g10c6ghq2', 0);
        return { plane: fit([-p - 6, -p + 6], [q - 6, q + 6]), graphs: [G('hyperbola', { a: s(a), p: s(p), q: s(q) })] };
      }
      return { plane: std(), graphs: [G('linear', { m: s(num('g10c6glm', 1)), c: s(num('g10c6glc', 0)) })] };
    },
    // Gr 10 · Function Grapher — y = a·bˣ + q, or y = a·trig(x) + q in degrees
    g10c6gcv2() {
      if (has('g10c6gea')) {
        const a = num('g10c6gea', 1), b = num('g10c6geb', 2), q = num('g10c6geq', 0);
        return { plane: fit([-5, 5], [q]), graphs: [G('exponential', { a: s(a), b: s(b), p: '0', q: s(q) })] };
      }
      const fn = (el('g10c6gtfn3') && el('g10c6gtfn3').value) || 'sin';
      const a = num('g10c6gta3', 1), q = num('g10c6gtq3', 0);
      return { plane: trigPlane(fn === 'tan' ? { ymin: '-6', ymax: '6' } : {}), graphs: [G(fn, { a: s(a), k: '1', p: '0', q: s(q) })] };
    },
    // Gr 10 · Distance & midpoint
    g10c8gcv() {
      const x1 = num('g10c8vx1', 0), y1 = num('g10c8vy1', 0), x2 = num('g10c8vx2', 0), y2 = num('g10c8vy2', 0);
      return {
        plane: fit([x1, x2], [y1, y2], { shape: 'equal' }),
        graphs: [through(x1, y1, x2, y2, true, { name: 'AB' })],
        points: [P('A', x1, y1), P('B', x2, y2), P('M', (x1 + x2) / 2, (y1 + y2) / 2)],
      };
    },
    // Gr 10 · Line grapher — gradient, parallel, perpendicular
    g10c8gcv2() {
      const x1 = num('g10c8gvx1', 0), y1 = num('g10c8gvy1', 0), x2 = num('g10c8gvx2', 0), y2 = num('g10c8gvy2', 0);
      const graphs = [through(x1, y1, x2, y2, false, { name: 'AB' })];
      if (x1 !== x2) {
        const m = (y2 - y1) / (x2 - x1);
        if (el('g10c8gvParallel') && el('g10c8gvParallel').checked) graphs.push(G('linear', { m: s(m), c: '0' }, { name: '∥' }));
        if (el('g10c8gvPerp') && el('g10c8gvPerp').checked) {
          graphs.push(m === 0 ? G('vertical', { k: s(x1) }, { name: '⊥' }) : G('linear', { m: s(-1 / m), c: s(y1 + x1 / m) }, { name: '⊥' }));
        }
      }
      return { plane: fit([x1, x2], [y1, y2], { shape: 'equal' }), graphs, points: [P('A', x1, y1), P('B', x2, y2)] };
    },
    // Gr 11 · Function Grapher — quadratic, hyperbola y = a/(x − p) + q, exponential; chord between x₁ and x₂
    g11c5gcv() {
      const t = (el('g11c5ftype') && el('g11c5ftype').value) || 'quad';
      let g, f;
      if (t === 'quad') {
        const a = num('g11c5qa', 1), b = num('g11c5qb', 0), c = num('g11c5qc', 0);
        g = G('quadStd', { a: s(a), b: s(b), c: s(c) }); f = (x) => a * x * x + b * x + c;
      } else if (t === 'hyp') {
        const a = num('g11c5ha', 1), p = num('g11c5hp', 0), q = num('g11c5hq', 0);
        g = G('hyperbola', { a: s(a), p: s(-p), q: s(q) }); f = (x) => a / (x - p) + q;
      } else {
        const a = num('g11c5ea', 1), b = num('g11c5eb', 2), q = num('g11c5eq', 0);
        g = G('exponential', { a: s(a), b: s(b), p: '0', q: s(q) }); f = (x) => a * Math.pow(b, x) + q;
      }
      const graphs = [g], points = [];
      const x1 = num('g11c5x1', NaN), x2 = num('g11c5x2', NaN);
      if (Number.isFinite(x1) && Number.isFinite(x2) && x1 !== x2 && Number.isFinite(f(x1)) && Number.isFinite(f(x2))) {
        graphs.push(through(x1, f(x1), x2, f(x2), false, { name: 'chord', keyPts: false }));
        points.push(P('A', x1, f(x1)), P('B', x2, f(x2)));
      }
      return { plane: std(), graphs, points };
    },
    // Gr 11 · Trig grapher — y = a·trig(bx + p) + q, with p in degrees inside the bracket
    g11c5t2gcv() {
      const fn = (el('g11c5t2trig') && el('g11c5t2trig').value) || 'sin';
      const a = num('g11c5t2a', 1), b = num('g11c5t2b', 1) || 1, p = num('g11c5t2p', 0), q = num('g11c5t2q', 0);
      const amp = Math.abs(a);
      return {
        plane: trigPlane({ xmin: '-180', xmax: '360', xstep: '45', ymin: s(Math.min(-3, q - amp - 1)), ymax: s(Math.max(3, q + amp + 1)) }),
        graphs: [G(fn, { a: s(a), k: s(b), p: s(p / b), q: s(q) })],
      };
    },
    // Gr 12 · Exponential and its inverse, reflected in y = x
    g12c2gSvg() {
      const b = num('g12c2gB', 2);
      return {
        plane: { xmin: '-4', xmax: '8', ymin: '-4', ymax: '8', xstep: '1', ystep: '1', shape: 'equal' },
        graphs: [
          G('exponential', { a: '1', b: s(b), p: '0', q: '0' }),
          G('log', { a: '1', b: s(b), p: '0', q: '0' }),
          G('linear', { m: '1', c: '0' }, { name: 'y = x', keyPts: false, color: '#94a3b8' }),
        ],
      };
    },
    // Gr 12 · Cubic
    g12c5pSvg() {
      return { plane: std(), graphs: [G('cubic', { a: s(num('g12c5pa', 1)), b: s(num('g12c5pb', 0)), c: s(num('g12c5pc', 0)), d: s(num('g12c5pd', 0)) })] };
    },
  };

  function toB64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  const PALETTE = ['#2563eb', '#dc2626', '#16a34a', '#9333ea'];
  const NAMES = ['f', 'g', 'h', 'k'];
  function open(id) {
    const st = BUILDERS[id]();
    st.graphs.forEach((g, i) => { if (!g.color) g.color = PALETTE[i % PALETTE.length]; if (!g.name) g.name = NAMES[i % NAMES.length]; });
    const state = {
      plane: Object.assign({ grid: true, numbers: true, intersections: st.graphs.length > 1 }, st.plane),
      graphs: st.graphs,
      points: (st.points || []).map(p => Object.assign({ color: '#111827' }, p)),
    };
    window.open('../grapher.html#g=' + toB64(JSON.stringify(state)), '_blank', 'noopener');
  }

  const LABEL = { en: 'Open in Graph Plotter', af: 'Maak oop in Grafiekplotter' };
  const HINT = { en: 'Print it, add it to a test, or keep editing', af: 'Druk dit, sit dit in ’n toets, of redigeer verder' };
  function lang() { return (window.MLLang && MLLang.getLang && MLLang.getLang()) === 'af' ? 'af' : 'en'; }
  function addButtons() {
    Object.keys(BUILDERS).forEach(id => {
      const anchor = el(id);
      if (!anchor || anchor.dataset.mmPlotter) return;
      anchor.dataset.mmPlotter = '1';
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mm-open-plotter';
      b.title = HINT[lang()];
      b.textContent = '↗ ' + LABEL[lang()];
      b.style.cssText = 'display:inline-flex;align-items:center;gap:6px;margin:10px 0 4px;padding:7px 14px;border-radius:7px;' +
        'border:1px solid rgba(158,212,60,0.45);background:rgba(158,212,60,0.10);color:#c3e56f;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit';
      b.addEventListener('click', () => open(id));
      anchor.insertAdjacentElement('afterend', b);
    });
  }
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; addButtons(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', addButtons);
  window.MMPlotterLink = { builders: BUILDERS, open };
})();
