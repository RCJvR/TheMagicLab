// ═══════════════════════════════════════════════════════════════
// Math Magician — lesson figures.
//
// A lesson places <div class="mf-fig" data-fig='{…}'></div> and this
// script draws it as an SVG when it appears in the page. Colours come
// from classes in figs.css (so the light theme can recolour them).
//
// Figure types (field "t"):
//   geo    points, segments, polygons, circles, arcs, angle marks, right
//          angles, equal-length ticks, parallel arrows, text; optional
//          axes, grid and function graphs (a coordinate plane)
//   nl     number line with open/closed endpoints and shaded intervals
//   hist   histogram from class intervals and frequencies
//   bar    bar graph;  line  broken-line graph
//   box    box-and-whisker plot from a five-number summary
//   tree   probability tree;  venn  two- or three-set Venn diagram
//   solid  prism, cuboid, cylinder, cone, pyramid, sphere, hemisphere
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const R2D = 180 / Math.PI;

  function el(name, attrs, text) {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  let uid = 0;
  const fmt = v => String(Math.round(v * 100) / 100).replace('.', document.documentElement.lang === 'af' ? ',' : '.');

  function svgRoot(w, h, label) {
    return el('svg', { class: 'mf', viewBox: `0 0 ${w} ${h}`, width: w, height: h, role: 'img', 'aria-label': label || 'diagram' });
  }

  // ── geo: plane geometry and coordinate planes ──────────────────────
  function geo(s) {
    const W = s.w || 280, H = s.h || 220, pad = s.pad == null ? 22 : s.pad;
    const pts = Object.assign({}, s.pts || {});
    const all = Object.values(pts);
    let [x0, y0, x1, y1] = s.view || [
      Math.min(...all.map(p => p[0])), Math.min(...all.map(p => p[1])),
      Math.max(...all.map(p => p[0])), Math.max(...all.map(p => p[1]))];
    if (!s.view && s.circ) s.circ.forEach(c => { const o = pts[c[0]] || c[0]; x0 = Math.min(x0, o[0] - c[1]); x1 = Math.max(x1, o[0] + c[1]); y0 = Math.min(y0, o[1] - c[1]); y1 = Math.max(y1, o[1] + c[1]); });
    // free: stretch each axis to fill the figure (graphs whose axes have different units)
    const k = Math.min((W - 2 * pad) / (x1 - x0 || 1), (H - 2 * pad) / (y1 - y0 || 1));
    const kx = s.free ? (W - 2 * pad) / (x1 - x0 || 1) : k, ky = s.free ? (H - 2 * pad) / (y1 - y0 || 1) : k;
    const ox = (W - kx * (x1 - x0)) / 2, oy = (H - ky * (y1 - y0)) / 2;
    const X = x => ox + (x - x0) * kx, Y = y => H - oy - (y - y0) * ky;
    const P = p => (typeof p === 'string' ? pts[p] : p);
    const XY = p => { p = P(p); return [X(p[0]), Y(p[1])]; };
    const svg = svgRoot(W, H, s.alt);
    const g = el('g', {}); svg.appendChild(g);
    // a class list like "ac dash"; a dashed line with no colour of its own is drawn in the line colour
    const cls = (c, d) => {
      if (!c) return d;
      const out = c.split(' ').map(x => x === 'dash' ? 'mf-dash' : 'mf-' + x);
      return out.every(x => x === 'mf-dash') ? 'mf-ln ' + out.join(' ') : out.join(' ');
    };

    if (s.grid) {
      const st = s.grid === true ? 1 : s.grid;
      for (let x = Math.ceil(x0 / st) * st; x <= x1 + 1e-9; x += st) g.appendChild(el('line', { x1: X(x), y1: Y(y0), x2: X(x), y2: Y(y1), class: 'mf-grid' }));
      for (let y = Math.ceil(y0 / st) * st; y <= y1 + 1e-9; y += st) g.appendChild(el('line', { x1: X(x0), y1: Y(y), x2: X(x1), y2: Y(y), class: 'mf-grid' }));
    }
    if (s.axes) {
      const ax = s.axes === true ? {} : s.axes;
      if (y0 <= 0 && y1 >= 0) g.appendChild(el('line', { x1: X(x0), y1: Y(0), x2: X(x1), y2: Y(0), class: 'mf-axis', 'marker-end': 'url(#mfArrow)' }));
      if (x0 <= 0 && x1 >= 0) g.appendChild(el('line', { x1: X(0), y1: Y(y0), x2: X(0), y2: Y(y1), class: 'mf-axis', 'marker-end': 'url(#mfArrow)' }));
      g.appendChild(el('text', { x: X(x1) - 2, y: Y(0) - 6, class: 'mf-tx mf-it', 'text-anchor': 'end' }, ax.x || 'x'));
      g.appendChild(el('text', { x: X(0) + 7, y: Y(y1) + 10, class: 'mf-tx mf-it' }, ax.y || 'y'));
      if (ax.ticks || ax.tx || ax.ty) {
        const st = ax.ticks === true ? 1 : ax.ticks, sx = ax.tx || st, sy = ax.ty || st;
        if (sx) for (let x = Math.ceil(x0 / sx) * sx; x <= x1 - sx / 2; x += sx) if (Math.abs(x) > 1e-9) { g.appendChild(el('line', { x1: X(x), y1: Y(0) - 3, x2: X(x), y2: Y(0) + 3, class: 'mf-axis' })); g.appendChild(el('text', { x: X(x), y: Y(0) + 14, class: 'mf-tx mf-sm', 'text-anchor': 'middle' }, fmt(x))); }
        if (sy) for (let y = Math.ceil(y0 / sy) * sy; y <= y1 - sy / 2; y += sy) if (Math.abs(y) > 1e-9) { g.appendChild(el('line', { x1: X(0) - 3, y1: Y(y), x2: X(0) + 3, y2: Y(y), class: 'mf-axis' })); g.appendChild(el('text', { x: X(0) - 6, y: Y(y) + 4, class: 'mf-tx mf-sm', 'text-anchor': 'end' }, fmt(y))); }
      }
      if (ax.o !== false) g.appendChild(el('text', { x: X(0) - 6, y: Y(0) + 13, class: 'mf-tx mf-sm', 'text-anchor': 'end' }, 'O'));
    }
    (s.asym || []).forEach(a => {
      const [axis, v] = a;
      if (axis === 'x') g.appendChild(el('line', { x1: X(v), y1: Y(y0), x2: X(v), y2: Y(y1), class: 'mf-mu mf-dash' }));
      else g.appendChild(el('line', { x1: X(x0), y1: Y(v), x2: X(x1), y2: Y(v), class: 'mf-mu mf-dash' }));
    });
    // graphs are clipped to the viewing window
    const clipId = 'mfclip' + (++uid);
    if (s.fn) {
      const cp = el('clipPath', { id: clipId });
      cp.appendChild(el('rect', { x: X(x0), y: Y(y1), width: X(x1) - X(x0), height: Y(y0) - Y(y1) }));
      g.appendChild(cp);
    }
    (s.fn || []).forEach(f => {
      const fx = new Function('x', 'const {sin,cos,tan,sqrt,abs,log,log10,PI,pow,exp}=Math;const sind=a=>sin(a*PI/180),cosd=a=>cos(a*PI/180),tand=a=>tan(a*PI/180);return ' + f.f + ';');
      const [a, b] = f.dom || [x0, x1];
      let d = '', pen = false;
      const N = 400;
      for (let i = 0; i <= N; i++) {
        const x = a + (b - a) * i / N, y = fx(x);
        if (!isFinite(y) || y < y0 - (y1 - y0) || y > y1 + (y1 - y0) || (f.breaks || []).some(bk => Math.abs(x - bk) < (b - a) / N)) { pen = false; continue; }
        d += (pen ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(y).toFixed(1);
        pen = true;
      }
      g.appendChild(el('path', { d, class: cls(f.c, 'mf-ac') + ' mf-curve', 'clip-path': `url(#${clipId})` }));
      if (f.lab) g.appendChild(el('text', { x: X(f.lab[0]), y: Y(f.lab[1]), class: 'mf-tx ' + (f.c ? 'mf-tx-' + f.c.split(' ')[0] : 'mf-tx-ac') }, f.lab[2]));
    });
    (s.poly || []).forEach(p => {
      const c = typeof p[p.length - 1] === 'string' && !pts[p[p.length - 1]] ? p[p.length - 1] : null;
      const vs = c ? p.slice(0, -1) : p;
      g.appendChild(el('polygon', { points: vs.map(v => XY(v).join(',')).join(' '), class: cls(c, 'mf-fl') }));
    });
    (s.circ || []).forEach(c => { const [cx, cy] = XY(c[0]); g.appendChild(el('circle', { cx, cy, r: c[1] * k, class: cls(c[2], 'mf-ln') })); });
    (s.arc || []).forEach(a => { // [centre, r, fromDeg, toDeg, cls]
      const [cx, cy] = XY(a[0]), r = a[1] * k, f = a[2] / R2D, t = a[3] / R2D;
      const large = ((a[3] - a[2]) % 360 + 360) % 360 > 180 ? 1 : 0;
      g.appendChild(el('path', { d: `M${cx + r * Math.cos(f)},${cy - r * Math.sin(f)} A${r},${r} 0 ${large} 0 ${cx + r * Math.cos(t)},${cy - r * Math.sin(t)}`, class: cls(a[4], 'mf-ln') }));
    });
    (s.seg || []).forEach(sg => {
      const [a, b] = [XY(sg[0]), XY(sg[1])];
      g.appendChild(el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: cls(sg[2], 'mf-ln'), 'marker-end': sg[3] === '>' ? 'url(#mfArrow)' : null }));
      if (sg[4] != null) { // length label beside the segment
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
        let nx = -dy / L, ny = dx / L;
        // push the label away from the shape the segment belongs to (or from all the points)
        const owner = (s.poly || []).find(p => p.includes(sg[0]) && p.includes(sg[1]));
        const cen = owner ? (() => { const v = owner.filter(x => typeof x !== 'string' || pts[x]).map(XY); return [v.reduce((a, p) => a + p[0], 0) / v.length, v.reduce((a, p) => a + p[1], 0) / v.length]; })() : centroid();
        if ((mx - cen[0]) * nx + (my - cen[1]) * ny < 0) { nx = -nx; ny = -ny; }
        const anchor = nx > 0.6 ? 'start' : nx < -0.6 ? 'end' : 'middle';
        g.appendChild(el('text', { x: mx + nx * (anchor === 'middle' ? 12 : 7), y: my + ny * 12 + 4, class: 'mf-tx mf-tx-len', 'text-anchor': anchor }, sg[4]));
      }
    });
    function centroid() { const v = Object.values(pts).map(p => [X(p[0]), Y(p[1])]); return v.length ? [v.reduce((a, p) => a + p[0], 0) / v.length, v.reduce((a, p) => a + p[1], 0) / v.length] : [W / 2, H / 2]; }
    (s.tick || []).forEach(t => { // equal-length marks
      const [a, b] = [XY(t[0]), XY(t[1])], n = t[2] || 1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
      const ux = dx / L, uy = dy / L, nx = -uy * 5, ny = ux * 5, mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 4; g.appendChild(el('line', { x1: mx + ux * o - nx, y1: my + uy * o - ny, x2: mx + ux * o + nx, y2: my + uy * o + ny, class: 'mf-ln' })); }
    });
    (s.par || []).forEach(t => { // parallel arrows
      const [a, b] = [XY(t[0]), XY(t[1])], n = t[2] || 1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
      const ux = dx / L, uy = dy / L, mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 6; const tx = mx + ux * (o + 4), ty = my + uy * (o + 4);
        g.appendChild(el('polyline', { points: `${tx - ux * 6 - uy * 4},${ty - uy * 6 + ux * 4} ${tx},${ty} ${tx - ux * 6 + uy * 4},${ty - uy * 6 - ux * 4}`, class: 'mf-ln' })); }
    });
    (s.ra || []).forEach(r => { // right angle at vertex r[1] between r[0] and r[2]
      const v = XY(r[1]), a = XY(r[0]), b = XY(r[2]), sz = 9;
      const u = unit(v, a), w = unit(v, b);
      g.appendChild(el('polyline', { points: `${v[0] + u[0] * sz},${v[1] + u[1] * sz} ${v[0] + (u[0] + w[0]) * sz},${v[1] + (u[1] + w[1]) * sz} ${v[0] + w[0] * sz},${v[1] + w[1] * sz}`, class: 'mf-ln' }));
    });
    (s.ang || []).forEach(an => { // angle at an[1] from ray to an[0] to ray to an[2]; label an[3]; class an[4]; radius an[5]
      const v = XY(an[1]), a = XY(an[0]), b = XY(an[2]), r = an[5] || 16;
      let t1 = Math.atan2(-(a[1] - v[1]), a[0] - v[0]), t2 = Math.atan2(-(b[1] - v[1]), b[0] - v[0]);
      let d = t2 - t1; while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
      const sweep = d > 0 ? 0 : 1;
      g.appendChild(el('path', { d: `M${v[0] + r * Math.cos(t1)},${v[1] - r * Math.sin(t1)} A${r},${r} 0 0 ${sweep} ${v[0] + r * Math.cos(t1 + d)},${v[1] - r * Math.sin(t1 + d)}`, class: cls(an[4], 'mf-hl') }));
      if (an[3]) { const m = t1 + d / 2, lr = r + 12; g.appendChild(el('text', { x: v[0] + lr * Math.cos(m), y: v[1] - lr * Math.sin(m) + 4, class: 'mf-tx mf-sm ' + (an[4] ? 'mf-tx-' + an[4] : 'mf-tx-hl'), 'text-anchor': 'middle' }, an[3])); }
    });
    function unit(v, a) { const dx = a[0] - v[0], dy = a[1] - v[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; }
    const cen = centroid();
    const hide = new Set(s.nolab || []);
    for (const name in pts) {
      const [x, y] = XY(name);
      if (s.dots === true || (s.dots || []).includes(name)) g.appendChild(el('circle', { cx: x, cy: y, r: 2.6, class: 'mf-dot' }));
      if (hide.has(name)) continue;
      let dx = x - cen[0], dy = y - cen[1];
      const dir = (s.lab || {})[name];
      if (dir) { const m = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0], ne: [1, -1], nw: [-1, -1], se: [1, 1], sw: [-1, 1] }[dir]; dx = m[0]; dy = m[1]; }
      const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
      const anchor = ux > 0.5 ? 'start' : ux < -0.5 ? 'end' : 'middle';
      g.appendChild(el('text', { x: x + ux * (anchor === 'middle' ? 11 : 7), y: y + uy * 11 + 4 + (uy > 0.5 ? 3 : 0), class: 'mf-tx mf-pt', 'text-anchor': anchor }, (s.names || {})[name] || name));
    }
    (s.txt || []).forEach(t => g.appendChild(el('text', { x: X(t[0]), y: Y(t[1]), class: 'mf-tx ' + (t[3] ? t[3].split(' ').map(c => 'mf-tx-' + c).join(' ') : ''), 'text-anchor': t[4] || 'middle' }, t[2])));
    addDefs(svg);
    return svg;
  }

  function addDefs(svg) {
    const defs = el('defs', {});
    const m = el('marker', { id: 'mfArrow', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
    m.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', class: 'mf-arrowhead' }));
    defs.appendChild(m);
    svg.insertBefore(defs, svg.firstChild);
  }

  // ── number line ─────────────────────────────────────────────────────
  function nl(s) {
    const W = s.w || 320, H = 50, pad = 22, lo = s.min, hi = s.max;
    const X = v => pad + (v - lo) / (hi - lo) * (W - 2 * pad), y = 22;
    const svg = svgRoot(W, H, s.alt);
    svg.appendChild(el('line', { x1: 6, y1: y, x2: W - 6, y2: y, class: 'mf-axis', 'marker-end': 'url(#mfArrow)', 'marker-start': 'url(#mfArrow)' }));
    for (let v = lo; v <= hi + 1e-9; v += s.step || 1) {
      svg.appendChild(el('line', { x1: X(v), y1: y - 4, x2: X(v), y2: y + 4, class: 'mf-axis' }));
      svg.appendChild(el('text', { x: X(v), y: y + 18, class: 'mf-tx mf-sm', 'text-anchor': 'middle' }, fmt(v)));
    }
    (s.seg || []).forEach(sg => { // [from, to] — use null for ±∞
      const a = sg[0] == null ? 6 : X(sg[0]), b = sg[1] == null ? W - 6 : X(sg[1]);
      svg.appendChild(el('line', { x1: a, y1: y, x2: b, y2: y, class: 'mf-band', 'marker-end': sg[1] == null ? 'url(#mfArrowAc)' : null, 'marker-start': sg[0] == null ? 'url(#mfArrowAc)' : null }));
    });
    (s.pts || []).forEach(p => svg.appendChild(el('circle', { cx: X(p[0]), cy: y, r: 5, class: p[1] === 'c' ? 'mf-closed' : 'mf-open' })));
    addDefs(svg);
    const m = el('marker', { id: 'mfArrowAc', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 11, markerHeight: 11, markerUnits: 'userSpaceOnUse', orient: 'auto-start-reverse' });
    m.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', class: 'mf-arrowhead-ac' }));
    svg.querySelector('defs').appendChild(m);
    return svg;
  }

  // ── charts: shared frame ────────────────────────────────────────────
  function frame(s, W, H, xlab, ylab, ymax, ystep) {
    const L = 44, B = 40, T = 14, Rr = 14;
    const svg = svgRoot(W, H, s.alt);
    const Y = v => H - B - v / ymax * (H - B - T);
    for (let v = 0; v <= ymax + 1e-9; v += ystep) {
      svg.appendChild(el('line', { x1: L, y1: Y(v), x2: W - Rr, y2: Y(v), class: 'mf-grid' }));
      svg.appendChild(el('text', { x: L - 6, y: Y(v) + 4, class: 'mf-tx mf-sm', 'text-anchor': 'end' }, fmt(v)));
    }
    svg.appendChild(el('line', { x1: L, y1: H - B, x2: W - Rr, y2: H - B, class: 'mf-axis' }));
    svg.appendChild(el('line', { x1: L, y1: H - B, x2: L, y2: T - 4, class: 'mf-axis' }));
    if (xlab) svg.appendChild(el('text', { x: (L + W - Rr) / 2, y: H - 6, class: 'mf-tx mf-sm', 'text-anchor': 'middle' }, xlab));
    if (ylab) svg.appendChild(el('text', { x: 12, y: (H - B + T) / 2, class: 'mf-tx mf-sm', 'text-anchor': 'middle', transform: `rotate(-90 12 ${(H - B + T) / 2})` }, ylab));
    return { svg, Y, L, B, T, Rr };
  }
  const niceMax = (m, st) => Math.ceil(m / st) * st;
  // a 1-2-5 step that gives about five gridlines
  const niceStep = m => { const raw = m / 5, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p; };

  function hist(s) {
    const W = s.w || 320, H = s.h || 210;
    const fmax = Math.max(...s.classes.map(c => c[2])), st = s.ystep || Math.max(1, niceStep(fmax));
    const f = frame(s, W, H, s.xlab, s.ylab, niceMax(fmax, st), st);
    const lo = s.classes[0][0], hi = s.classes[s.classes.length - 1][1];
    const X = v => f.L + (v - lo) / (hi - lo) * (W - f.L - f.Rr);
    s.classes.forEach((c, i) => {
      f.svg.appendChild(el('rect', { x: X(c[0]), y: f.Y(c[2]), width: X(c[1]) - X(c[0]), height: f.Y(0) - f.Y(c[2]), class: (s.hi === i ? 'mf-bar2' : 'mf-bar') }));
    });
    s.classes.forEach(c => f.svg.appendChild(el('text', { x: X(c[0]), y: H - f.B + 14, class: 'mf-tx mf-sm', 'text-anchor': 'middle' }, fmt(c[0]))));
    f.svg.appendChild(el('text', { x: X(hi), y: H - f.B + 14, class: 'mf-tx mf-sm', 'text-anchor': 'middle' }, fmt(hi)));
    if (s.poly) { // frequency polygon through the midpoints
      f.svg.appendChild(el('polyline', { points: s.classes.map(c => `${X((c[0] + c[1]) / 2)},${f.Y(c[2])}`).join(' '), class: 'mf-hl mf-curve' }));
    }
    return f.svg;
  }

  function bar(s, asLine) {
    const W = s.w || 320, H = s.h || 210, n = s.xs.length;
    if (s.series) return bars2(s, W, H, n, asLine);
    const vmax = Math.max(...s.ys), st = s.ystep || niceStep(vmax);
    const f = frame(s, W, H, s.xlab, s.ylab, niceMax(vmax, st), st);
    const slot = (W - f.L - f.Rr) / n, X = i => f.L + slot * (i + 0.5);
    s.xs.forEach((x, i) => f.svg.appendChild(el('text', { x: X(i), y: H - f.B + 14, class: 'mf-tx mf-sm', 'text-anchor': 'middle' }, x)));
    if (asLine) {
      f.svg.appendChild(el('polyline', { points: s.ys.map((v, i) => `${X(i)},${f.Y(v)}`).join(' '), class: 'mf-ac mf-curve' }));
      s.ys.forEach((v, i) => f.svg.appendChild(el('circle', { cx: X(i), cy: f.Y(v), r: 3, class: 'mf-dot' })));
    } else s.ys.forEach((v, i) => f.svg.appendChild(el('rect', { x: X(i) - slot * 0.32, y: f.Y(v), width: slot * 0.64, height: f.Y(0) - f.Y(v), class: 'mf-bar' })));
    return f.svg;
  }

  // two or more series side by side (double bar graph) or as several broken lines
  function bars2(s, W, H, n, asLine) {
    const all = s.series.flatMap(x => x[1]), vmax = Math.max(...all), st = s.ystep || niceStep(vmax);
    const f = frame(s, W, H, s.xlab, s.ylab, niceMax(vmax, st), st);
    const slot = (W - f.L - f.Rr) / n, X = i => f.L + slot * (i + 0.5), k = s.series.length, bw = slot * 0.7 / k;
    const cl = ['mf-bar', 'mf-bar3', 'mf-bar2'], lc = ['mf-ac', 'mf-gn', 'mf-hl'];
    s.xs.forEach((x, i) => f.svg.appendChild(el('text', { x: X(i), y: H - f.B + 14, class: 'mf-tx mf-sm', 'text-anchor': 'middle' }, x)));
    s.series.forEach(([name, ys], j) => {
      if (asLine) {
        f.svg.appendChild(el('polyline', { points: ys.map((v, i) => `${X(i)},${f.Y(v)}`).join(' '), class: lc[j % 3] + ' mf-curve' }));
        ys.forEach((v, i) => f.svg.appendChild(el('circle', { cx: X(i), cy: f.Y(v), r: 3, class: 'mf-dot' })));
      } else ys.forEach((v, i) => f.svg.appendChild(el('rect', { x: X(i) - slot * 0.35 + j * bw, y: f.Y(v), width: bw - 1, height: f.Y(0) - f.Y(v), class: cl[j % 3] })));
      f.svg.appendChild(el('rect', { x: W - 96, y: 6 + j * 16, width: 10, height: 10, rx: 2, class: asLine ? cl[j % 3] : cl[j % 3] }));
      f.svg.appendChild(el('text', { x: W - 82, y: 15 + j * 16, class: 'mf-tx mf-sm' }, name));
    });
    return f.svg;
  }

  function box(s) {
    const W = s.w || 320, H = s.h || 90, pad = 24, lo = s.min, hi = s.max;
    const X = v => pad + (v - lo) / (hi - lo) * (W - 2 * pad);
    const svg = svgRoot(W, H, s.alt), y = 32, bh = 26;
    const [mn, q1, md, q3, mx] = s.five;
    svg.appendChild(el('line', { x1: X(mn), y1: y, x2: X(q1), y2: y, class: 'mf-ln' }));
    svg.appendChild(el('line', { x1: X(q3), y1: y, x2: X(mx), y2: y, class: 'mf-ln' }));
    [mn, mx].forEach(v => svg.appendChild(el('line', { x1: X(v), y1: y - 8, x2: X(v), y2: y + 8, class: 'mf-ln' })));
    svg.appendChild(el('rect', { x: X(q1), y: y - bh / 2, width: X(q3) - X(q1), height: bh, class: 'mf-fl mf-ln' }));
    svg.appendChild(el('line', { x1: X(md), y1: y - bh / 2, x2: X(md), y2: y + bh / 2, class: 'mf-hl' }));
    svg.appendChild(el('line', { x1: pad, y1: 62, x2: W - pad, y2: 62, class: 'mf-axis' }));
    for (let v = lo; v <= hi + 1e-9; v += s.step || 5) {
      svg.appendChild(el('line', { x1: X(v), y1: 59, x2: X(v), y2: 65, class: 'mf-axis' }));
      svg.appendChild(el('text', { x: X(v), y: 79, class: 'mf-tx mf-sm', 'text-anchor': 'middle' }, fmt(v)));
    }
    return svg;
  }

  // ── probability tree ────────────────────────────────────────────────
  function tree(s) {
    const levels = s.levels; // each level: [[label, prob], …] — same branches from every node
    const leaves = levels.reduce((a, l) => a * l.length, 1);
    const W = s.w || 340, colW = (W - (s.outcomes ? 110 : 20)) / levels.length, H = s.h || Math.max(120, leaves * 26 + 20);
    const svg = svgRoot(W, H, s.alt);
    let nodes = [{ x: 14, y: H / 2, path: [] }];
    levels.forEach((lev, li) => {
      const next = [], span = H / (nodes.length * lev.length);
      nodes.forEach((nd, ni) => lev.forEach((br, bi) => {
        const probs = Array.isArray(br[1]) ? br[1][ni] : br[1];
        const nx = 14 + colW * (li + 1), ny = span * (ni * lev.length + bi + 0.5);
        svg.appendChild(el('line', { x1: nd.x + 4, y1: nd.y, x2: nx - 14, y2: ny, class: 'mf-ln' }));
        const up = ny < nd.y - 1, flat = Math.abs(ny - nd.y) <= 1;
        svg.appendChild(el('text', { x: (nd.x + nx) / 2 - 4, y: (nd.y + ny) / 2 + (up || flat ? -7 : 15), class: 'mf-tx mf-tx-hl', 'text-anchor': 'middle' }, probs));
        svg.appendChild(el('text', { x: nx - 6, y: ny + 4, class: 'mf-tx mf-pt', 'text-anchor': 'middle' }, br[0]));
        next.push({ x: nx, y: ny, path: nd.path.concat(br[0]) });
      }));
      nodes = next;
    });
    if (s.outcomes) nodes.forEach((nd, i) => svg.appendChild(el('text', { x: nd.x + 14, y: nd.y + 4, class: 'mf-tx mf-sm' }, (s.outcomes === true ? nd.path.join('') : s.outcomes[i]))));
    return svg;
  }

  // ── Venn diagram ────────────────────────────────────────────────────
  function venn(s) {
    const W = s.w || 300, H = s.h || (s.sets.length === 3 ? 230 : 180);
    const svg = svgRoot(W, H, s.alt), v = s.vals || {};
    svg.appendChild(el('rect', { x: 6, y: 6, width: W - 12, height: H - 12, rx: 8, class: 'mf-ln' }));
    svg.appendChild(el('text', { x: 16, y: H - 16, class: 'mf-tx mf-pt' }, s.S || 'S'));
    const r = s.sets.length === 3 ? 62 : 66;
    const C = s.sets.length === 3 ? [[W / 2 - 38, 92], [W / 2 + 38, 92], [W / 2, 150]] : [[W / 2 - 40, H / 2], [W / 2 + 40, H / 2]];
    C.forEach((c, i) => {
      svg.appendChild(el('circle', { cx: c[0], cy: c[1], r, class: (s.shade || []).includes(s.sets[i]) ? 'mf-fl mf-ln' : 'mf-ln' }));
      const lx = s.sets.length === 3 ? [c[0] - 48, c[0] + 48, c[0]][i] : c[0] + (i ? 40 : -40), ly = s.sets.length === 3 ? [c[1] - 56, c[1] - 56, c[1] + 76][i] : c[1] - r - 4;
      svg.appendChild(el('text', { x: lx, y: ly, class: 'mf-tx mf-pt', 'text-anchor': 'middle' }, s.sets[i]));
    });
    const pos = s.sets.length === 3
      ? { A: [W / 2 - 70, 80], B: [W / 2 + 70, 80], C: [W / 2, 182], AB: [W / 2, 66], AC: [W / 2 - 38, 140], BC: [W / 2 + 38, 140], ABC: [W / 2, 112], out: [W - 26, H - 16] }
      : { A: [W / 2 - 62, H / 2 + 5], B: [W / 2 + 62, H / 2 + 5], AB: [W / 2, H / 2 + 5], out: [W - 26, H - 16] };
    for (const key in v) if (pos[key]) svg.appendChild(el('text', { x: pos[key][0], y: pos[key][1], class: 'mf-tx', 'text-anchor': 'middle' }, v[key]));
    return svg;
  }

  // ── solids (oblique drawing) ────────────────────────────────────────
  function solid(s) {
    const W = s.w || 220, H = s.h || 200, svg = svgRoot(W, H, s.alt), lab = s.labels || {};
    const L = (x1, y1, x2, y2, c) => svg.appendChild(el('line', { x1, y1, x2, y2, class: c || 'mf-ln' }));
    const T = (x, y, t, a) => svg.appendChild(el('text', { x, y, class: 'mf-tx mf-tx-len', 'text-anchor': a || 'middle' }, t));
    const E = (cx, cy, rx, ry, half, c) => svg.appendChild(half
      ? el('path', { d: `M${cx - rx},${cy} A${rx},${ry} 0 0 ${half === 'front' ? 0 : 1} ${cx + rx},${cy}`, class: c || 'mf-ln' })
      : el('ellipse', { cx, cy, rx, ry, class: c || 'mf-ln' }));
    const cx = W / 2, k = s.kind;
    if (k === 'cylinder' || k === 'cone' || k === 'hemisphere' || k === 'sphere') {
      const rx = 60, ry = 16, top = 40, bot = H - 40;
      if (k === 'cylinder') {
        E(cx, top, rx, ry); E(cx, bot, rx, ry, 'front'); E(cx, bot, rx, ry, 'back', 'mf-mu mf-dash');
        L(cx - rx, top, cx - rx, bot); L(cx + rx, top, cx + rx, bot);
        L(cx, bot, cx + rx, bot, 'mf-ac'); L(cx, top, cx, bot, 'mf-mu mf-dash');
        if (lab.r) T(cx + rx / 2, bot - 6, lab.r); if (lab.h) T(cx + rx + 8, (top + bot) / 2, lab.h, 'start');
      } else if (k === 'cone') {
        E(cx, bot, rx, ry, 'front'); E(cx, bot, rx, ry, 'back', 'mf-mu mf-dash');
        L(cx - rx, bot, cx, top - 16); L(cx + rx, bot, cx, top - 16);
        L(cx, top - 16, cx, bot, 'mf-mu mf-dash'); L(cx, bot, cx + rx, bot, 'mf-ac');
        if (lab.r) T(cx + rx / 2, bot - 6, lab.r); if (lab.h) T(cx - 6, (top + bot) / 2, lab.h, 'end'); if (lab.s) T(cx + rx / 2 + 14, (top + bot) / 2 - 8, lab.s, 'start');
      } else {
        const R = 64, cy = k === 'sphere' ? H / 2 : H / 2 + 26;
        if (k === 'sphere') svg.appendChild(el('circle', { cx, cy, r: R, class: 'mf-ln' }));
        else svg.appendChild(el('path', { d: `M${cx - R},${cy} A${R},${R} 0 0 1 ${cx + R},${cy}`, class: 'mf-ln' }));
        E(cx, cy, R, 14, 'front'); E(cx, cy, R, 14, 'back', 'mf-mu mf-dash');
        L(cx, cy, cx + R, cy, 'mf-ac'); if (lab.r) T(cx + R / 2, cy - 6, lab.r);
      }
    } else { // cuboid, triangular prism, square pyramid: front face, back face pushed up and to the right
      const w = s.bw || 100, h = s.hh || 80, ox = s.ox || 38, oy = s.oy || 28;
      const x0 = cx - (w + ox) / 2, yb = H - 30;
      const P = (x, y) => [x0 + x, yb - y];
      const seg = (a, b, hidden) => L(a[0], a[1], b[0], b[1], hidden ? 'mf-mu mf-dash' : 'mf-ln');
      if (k === 'cuboid') {
        const f = [P(0, 0), P(w, 0), P(w, h), P(0, h)], bk = f.map(p => [p[0] + ox, p[1] - oy]);
        seg(f[0], f[1]); seg(f[1], f[2]); seg(f[2], f[3]); seg(f[3], f[0]);
        seg(bk[1], bk[2]); seg(bk[2], bk[3]); seg(bk[0], bk[1], true); seg(bk[3], bk[0], true);
        seg(f[1], bk[1]); seg(f[2], bk[2]); seg(f[3], bk[3]); seg(f[0], bk[0], true);
        if (lab.l) T((f[0][0] + f[1][0]) / 2, f[0][1] + 16, lab.l);
        if (lab.b) T((f[1][0] + bk[1][0]) / 2 + 8, (f[1][1] + bk[1][1]) / 2 + 10, lab.b, 'start');
        if (lab.h) T(f[0][0] - 6, (f[0][1] + f[3][1]) / 2, lab.h, 'end');
      } else if (k === 'triprism') {
        const f = [P(0, 0), P(w, 0), P(s.apex == null ? w / 2 : s.apex, h)], bk = f.map(p => [p[0] + ox, p[1] - oy]);
        seg(f[0], f[1]); seg(f[1], f[2]); seg(f[2], f[0]);
        seg(bk[1], bk[2]); seg(bk[0], bk[1], true); seg(bk[0], bk[2], true);
        seg(f[1], bk[1]); seg(f[2], bk[2]); seg(f[0], bk[0], true);
        if (lab.l) T((f[0][0] + f[1][0]) / 2, f[0][1] + 16, lab.l);
        if (lab.b) T((f[1][0] + bk[1][0]) / 2 + 8, (f[1][1] + bk[1][1]) / 2 + 10, lab.b, 'start');
        if (lab.h) { L(f[2][0], f[2][1], f[2][0], f[0][1], 'mf-mu mf-dash'); T(f[2][0] - 6, (f[0][1] + f[2][1]) / 2, lab.h, 'end'); }
      } else { // square pyramid
        const f = [P(0, 0), P(w, 0)], bk = f.map(p => [p[0] + ox, p[1] - oy]);
        const apex = [(f[0][0] + bk[1][0]) / 2, (f[0][1] + bk[1][1]) / 2 - h];
        seg(f[0], f[1]); seg(f[1], bk[1]); seg(bk[1], bk[0], true); seg(bk[0], f[0], true);
        seg(f[0], apex); seg(f[1], apex); seg(bk[1], apex); seg(bk[0], apex, true);
        const foot = [apex[0], (f[0][1] + bk[1][1]) / 2];
        L(apex[0], apex[1], foot[0], foot[1], 'mf-mu mf-dash');
        if (lab.l) T((f[0][0] + f[1][0]) / 2, f[0][1] + 16, lab.l);
        if (lab.h) T(apex[0] - 6, (apex[1] + foot[1]) / 2, lab.h, 'end');
        if (lab.s) T((f[1][0] + bk[1][0]) / 2 / 2 + apex[0] / 2 + 10, (f[1][1] + apex[1]) / 2, lab.s, 'start');
      }
    }
    return svg;
  }

  // ── factor tree: n split step by step into a prime and the rest ──────
  function ftree(s) {
    const steps = s.split, W = s.w || 230, dy = 40, H = 30 + dy * steps.length + 16;
    const svg = svgRoot(W, H, s.alt);
    let x = W * 0.38, y = 22;
    const node = (x, y, t, prime) => {
      if (prime) svg.appendChild(el('circle', { cx: x, cy: y - 4, r: 12, class: 'mf-gn' }));
      svg.appendChild(el('text', { x, y, class: 'mf-tx' + (prime ? ' mf-tx-gn' : ''), 'text-anchor': 'middle' }, t));
    };
    node(x, y, String(s.n), false);
    steps.forEach((st, i) => {
      const last = i === steps.length - 1;
      const lx = x - 26, rx = x + 26, ny = y + dy;
      svg.appendChild(el('line', { x1: x - 6, y1: y + 6, x2: lx + 4, y2: ny - 16, class: 'mf-mu' }));
      svg.appendChild(el('line', { x1: x + 6, y1: y + 6, x2: rx - 4, y2: ny - 16, class: 'mf-mu' }));
      node(lx, ny, String(st[0]), true);
      node(rx, ny, String(st[1]), last);
      x = rx; y = ny;
    });
    if (s.result) svg.appendChild(el('text', { x: W / 2, y: H - 4, class: 'mf-tx mf-tx-or', 'text-anchor': 'middle' }, s.result));
    return svg;
  }

  // ── flow diagram: input → [operation] → … → output ─────────────────
  function flow(s) {
    const items = s.items, H = 56, bw = 64, gap = 34, inW = 30;
    const W = s.w || inW * 2 + (items.length - 2) * bw + (items.length - 1) * gap + 8;
    const svg = svgRoot(W, H, s.alt), y = H / 2;
    let x = 4;
    items.forEach((it, i) => {
      const last = i === items.length - 1, first = i === 0, w = first || last ? inW : bw;
      if (!first && !last) svg.appendChild(el('rect', { x, y: y - 16, width: w, height: 32, rx: 6, class: 'mf-fl mf-ln' }));
      svg.appendChild(el('text', { x: x + w / 2, y: y + 5, class: 'mf-tx' + (first || last ? ' mf-it' : ''), 'text-anchor': 'middle' }, it));
      if (!last) svg.appendChild(el('line', { x1: x + w + 3, y1: y, x2: x + w + gap - 3, y2: y, class: 'mf-ac', 'marker-end': 'url(#mfArrow)' }));
      x += w + gap;
    });
    addDefs(svg);
    return svg;
  }

  // ── pie chart: parts = [[label, value], …] ─────────────────────────
  function pie(s) {
    const W = s.w || 300, H = s.h || 190, R = Math.min(H / 2 - 14, 80), cx = R + 20, cy = H / 2;
    const svg = svgRoot(W, H, s.alt), total = s.parts.reduce((a, p) => a + p[1], 0);
    let a0 = -Math.PI / 2;
    s.parts.forEach((p, i) => {
      const a1 = a0 + 2 * Math.PI * p[1] / total, large = a1 - a0 > Math.PI ? 1 : 0;
      const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      svg.appendChild(el('path', { d: `M${cx},${cy} L${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} Z`, class: 'mf-pie' + (i % 5 + 1) }));
      const deg = Math.round(360 * p[1] / total);
      if (s.angles) { const m = (a0 + a1) / 2; svg.appendChild(el('text', { x: cx + R * 0.62 * Math.cos(m), y: cy + R * 0.62 * Math.sin(m) + 4, class: 'mf-tx mf-sm mf-tx-pie', 'text-anchor': 'middle' }, deg + '°')); }
      svg.appendChild(el('rect', { x: 2 * R + 40, y: 20 + i * 22, width: 12, height: 12, rx: 2, class: 'mf-pie' + (i % 5 + 1) }));
      svg.appendChild(el('text', { x: 2 * R + 58, y: 30 + i * 22, class: 'mf-tx mf-sm' }, p[0] + (s.values === false ? '' : ' (' + fmt(p[1]) + ')')));
      a0 = a1;
    });
    return svg;
  }

  const KINDS = { pie, flow, ftree, geo, nl, hist, bar, line: s => bar(s, true), box, tree, venn, solid };

  function render(host) {
    if (host.dataset.mfDone) return;
    host.dataset.mfDone = '1';
    try {
      const spec = JSON.parse(host.getAttribute('data-fig'));
      const svg = KINDS[spec.t](spec);
      host.appendChild(svg);
      if (spec.cap) host.appendChild(Object.assign(document.createElement('div'), { className: 'mf-cap', textContent: spec.cap }));
    } catch (e) { if (window.console) console.warn('figure', e, host.getAttribute('data-fig')); }
  }
  function scan(root) { (root.querySelectorAll ? root.querySelectorAll('.mf-fig') : []).forEach(render); }
  window.MMFigs = { render, scan, kinds: KINDS };
  function start() {
    scan(document);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) { if (n.classList.contains('mf-fig')) render(n); scan(n); } })))
      .observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
