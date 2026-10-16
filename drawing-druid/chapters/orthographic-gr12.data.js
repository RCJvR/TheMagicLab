// Orthographic projection, Grade 12: sections on a STEPPED (offset) cutting plane. The holes of a
// plate are not in one line, so the cutting plane steps from hole to hole; the sectional front view
// is drawn as if the plane were flat (the steps are never shown in the section).
// 3rd angle: top view above the front view. Needs assembly-kit.js (hatching).
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER, AK = global.AssemblyKit;
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const pl = (points, lineType) => ({ kind: 'polyline', points, lineType: lineType || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 2.8, anchor: 'middle', color: '#fde047' }, opts || {});
  const GREY = { color: '#94a3b8', size: 2.8 };

  // cfg: id, title, summary, prompt, L, D, H (the plate), holes [{ x, y, d, cb: { d, depth } }]
  function stepped(cfg) {
    const { L: Lx, D, H } = cfg, holes = cfg.holes.slice().sort((a, b) => a.x - b.x);
    const gap = 22, FX = 30, GY = 40 + D + gap + H, TY = GY - H - gap;            // TY: the front edge of the top view
    const F = (x, z) => [FX + x, GY - z], T = (x, y) => [FX + x, TY - y];
    const steps = [];
    // top view
    steps.push({ instruction: 'TOP VIEW (3rd angle: above the front view): the plate, ' + Lx + ' × ' + D + '.',
      calloutAt: T(Lx / 2, D / 2), reveals: [pl([T(0, 0), T(Lx, 0), T(Lx, D), T(0, D), T(0, 0)])] });
    steps.push({ instruction: 'Add the holes with their centre lines' + (holes.some(h => h.cb) ? '; a counterbored hole shows two circles.' : '.'),
      calloutAt: T(holes[0].x, holes[0].y),
      reveals: holes.flatMap(h => [{ kind: 'circle', center: T(h.x, h.y), r: h.d / 2, lineType: 'A' }, ...(h.cb ? [{ kind: 'circle', center: T(h.x, h.y), r: h.cb.d / 2, lineType: 'A' }] : []),
        L(T(h.x - (h.cb ? h.cb.d : h.d) / 2 - 4, h.y), T(h.x + (h.cb ? h.cb.d : h.d) / 2 + 4, h.y), 'centre'), L(T(h.x, h.y - (h.cb ? h.cb.d : h.d) / 2 - 4), T(h.x, h.y + (h.cb ? h.cb.d : h.d) / 2 + 4), 'centre')]) });
    // the stepped cutting plane: through each hole centre, stepping halfway between holes
    const path = [[-8, holes[0].y]];
    holes.forEach((h, i) => { if (i) { const xm = (holes[i - 1].x + h.x) / 2; path.push([xm, holes[i - 1].y], [xm, h.y]); } });
    path.push([Lx + 8, holes[holes.length - 1].y]);
    const bends = path.slice(1, -1), k = 7;
    const a = path[0], b = path[path.length - 1];
    steps.push({ instruction: 'Draw the cutting plane A-A as a chain line through the centre of every hole. It STEPS between the holes: draw it thick at the ends and at each bend, with arrows pointing the way you look to see the section: away from the front view.',
      calloutAt: T(bends[0][0], bends[0][1]),
      reveals: [pl(path.map(p => T(p[0], p[1])), 'centre'),
        L(T(a[0], a[1]), T(a[0] + 5, a[1])), L(T(b[0] - 5, b[1]), T(b[0], b[1])),
        ...bends.flatMap((p, i) => { const q = path[i], r = path[i + 2], dir = (u, v) => { const l = Math.hypot(v[0] - u[0], v[1] - u[1]) || 1; return [(v[0] - u[0]) / l, (v[1] - u[1]) / l]; };
          const d1 = dir(p, q), d2 = dir(p, r); return [L(T(p[0], p[1]), T(p[0] + 3 * d1[0], p[1] + 3 * d1[1])), L(T(p[0], p[1]), T(p[0] + 3 * d2[0], p[1] + 3 * d2[1]))]; }),
        // arrows: the way you look to see the section, from the front towards the back (away from the front view)
        L(T(a[0], a[1]), T(a[0], a[1] + k), 'B'), pl([T(a[0] - 1.4, a[1] + k - 1.8), T(a[0], a[1] + k), T(a[0] + 1.4, a[1] + k - 1.8)], 'B'),
        L(T(b[0], b[1]), T(b[0], b[1] + k), 'B'), pl([T(b[0] - 1.4, b[1] + k - 1.8), T(b[0], b[1] + k), T(b[0] + 1.4, b[1] + k - 1.8)], 'B'),
        lbl([T(a[0], a[1])[0] - 3, T(a[0], a[1])[1] + 1], 'A', { anchor: 'end', size: 3.6 }), lbl([T(b[0], b[1])[0] + 3, T(b[0], b[1])[1] + 1], 'A', { anchor: 'start', size: 3.6 })] });
    // projectors and the section
    const xs = [0, Lx, ...holes.flatMap(h => [h.x - h.d / 2, h.x + h.d / 2, ...(h.cb ? [h.x - h.cb.d / 2, h.x + h.cb.d / 2] : [])])];
    steps.push({ instruction: 'Project the ends of the plate and the sides of every hole (and counterbore) straight down into the front view. Draw the base line and the top of the plate, ' + H + ' mm apart.',
      calloutAt: F(Lx / 2, H + 6), reveals: [...xs.map(x => L(T(x, 0), F(x, -3), 'construction')), L(F(-6, 0), F(Lx + 6, 0), 'construction'), L(F(-6, H), F(Lx + 6, H), 'construction')] });
    // section profile pieces: material between the holes, as one outline with the holes cut out
    const holePoly = h => { const r = h.d / 2; if (!h.cb) return [[h.x - r, 0], [h.x + r, 0], [h.x + r, H], [h.x - r, H]];
      const R = h.cb.d / 2, zc = H - h.cb.depth; return [[h.x - r, 0], [h.x + r, 0], [h.x + r, zc], [h.x + R, zc], [h.x + R, H], [h.x - R, H], [h.x - R, zc], [h.x - r, zc]]; };
    steps.push({ instruction: 'SECTION A-A: line in the outline of the plate and the sides of each hole, as if the cutting plane were one flat plane. The STEPS in the cutting plane are NOT shown in the section.',
      calloutAt: F(holes[0].x, H / 2),
      reveals: [L(F(0, 0), F(0, H)), L(F(Lx, 0), F(Lx, H)),
        // top and bottom edges, broken at the holes
        ...(() => { const out = []; const cuts = z => holes.map(h => { const w = (z === H && h.cb ? h.cb.d : h.d) / 2; return [h.x - w, h.x + w]; });
          [0, H].forEach(z => { let x = 0; cuts(z).forEach(([u, v]) => { out.push(L(F(x, z), F(u, z))); x = v; }); out.push(L(F(x, z), F(Lx, z))); }); return out; })(),
        ...holes.flatMap(h => { const r = h.d / 2; if (!h.cb) return [L(F(h.x - r, 0), F(h.x - r, H)), L(F(h.x + r, 0), F(h.x + r, H))];
          const R = h.cb.d / 2, zc = H - h.cb.depth; return [L(F(h.x - r, 0), F(h.x - r, zc)), L(F(h.x + r, 0), F(h.x + r, zc)), L(F(h.x - r, zc), F(h.x - R, zc)), L(F(h.x + r, zc), F(h.x + R, zc)), L(F(h.x - R, zc), F(h.x - R, H)), L(F(h.x + R, zc), F(h.x + R, H))]; })] });
    const regions = [[[0, 0], [Lx, 0], [Lx, H], [0, H]], ...holes.map(holePoly)].map(poly => poly.map(([x, z]) => F(x, z)));
    steps.push({ instruction: 'Hatch the cut material at 45°, evenly spaced. It is ONE part, so the hatching runs the same way on both sides of every hole, even across a step in the plane. The holes stay clear.',
      calloutAt: F(holes[0].x / 2, H / 2), reveals: AK.hatch(regions, 45, 2.6) });
    steps.push({ instruction: 'Add the centre lines of the holes, label SECTION A-A, and the views.',
      calloutAt: F(Lx / 2, -10),
      reveals: [...holes.map(h => L(F(h.x, -3), F(h.x, H + 3), 'centre')), lbl([FX + Lx / 2, GY + 9], 'SECTION A-A / SNIT A-A', { color: '#fde047', size: 3.2 }),
        lbl([FX + Lx / 2, TY - D - 6], 'TOP VIEW / BOAANSIG', GREY)] });
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'third', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full', _stepped: cfg,
      steps: steps.filter(st => st.reveals.length).map((st, i) => Object.assign({ id: i + 1 }, st)) };
    ORDER.push(cfg.id);
  }

  stepped({ id: 'sect12-stepped-plate', title: 'Stepped Section: Plate with Three Holes (Gr 12)', L: 120, D: 60, H: 20,
    holes: [{ x: 20, y: 20, d: 12 }, { x: 60, y: 40, d: 14, cb: { d: 24, depth: 8 } }, { x: 100, y: 20, d: 12 }],
    summary: 'The three holes are not in one line, so the cutting plane steps from one to the next. The section shows every hole cut through its centre, and no line where the plane steps.',
    prompt: 'A plate 120 × 60 × 20 has two Ø12 holes 20 mm from the front and a Ø14 hole counterbored Ø24 × 8 deep, 40 mm from the front, centred. Draw, in 3rd angle, the top view with the stepped cutting plane A-A through the three hole centres, and the sectional front view A-A.' });
  stepped({ id: 'sect12-stepped-block', title: 'Stepped Section: Block with Counterbores (Gr 12)', L: 110, D: 70, H: 30,
    holes: [{ x: 22, y: 50, d: 16, cb: { d: 28, depth: 10 } }, { x: 55, y: 20, d: 12 }, { x: 88, y: 48, d: 16, cb: { d: 26, depth: 8 } }],
    summary: 'Two counterbored holes at the back and a plain hole at the front: the cutting plane steps forward and back again. Hatch it as one part.',
    prompt: 'A block 110 × 70 × 30 has a Ø16 hole counterbored Ø28 × 10 deep (22 from the left, 50 from the front), a Ø12 hole (55 from the left, 20 from the front) and a Ø16 hole counterbored Ø26 × 8 deep (88 from the left, 48 from the front). Draw the top view with the stepped cutting plane A-A through all three, and the sectional front view A-A (3rd angle).' });
})(window);
