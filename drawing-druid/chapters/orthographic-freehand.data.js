// Orthographic Projection (Gr 10): FREEHAND orthographic sketches from a given isometric, as in the
// workbooks. The isometric is given at half size on isometric grid paper; learners sketch the front,
// top and right views (3rd angle) freehand on square grid paper, one square = 10 mm, by counting.
// Every part is built from whole 10 mm units, so every corner falls on a grid line.
// Needs solid-kit.js and isometric-drawing-more.data.js (window.ViewLines). Runs after orthographic-castings.
(function (global) {
  'use strict';
  const SK = global.SolidKit, VL = global.ViewLines;
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  if (!SK || !VL || global.DD_BUILDERS_ONLY) return;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#94a3b8' }, opts || {});
  const YEL = { color: '#fde047' };
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const U = 10, C30 = Math.cos(Math.PI / 6);
  const ubox = (x0, y0, z0, x1, y1, z1) => SK.box(x0 * U, y0 * U, z0 * U, x1 * U, y1 * U, z1 * U);
  const uext = (prof, plane, a, b) => SK.extrude(prof.map(([p, q]) => [p * U, q * U]), plane, a * U, b * U);
  const addv = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];

  function clip(p, d, R) {
    let t0 = -1e9, t1 = 1e9;
    for (const [pi, di, lo, hi] of [[p[0], d[0], R[0], R[2]], [p[1], d[1], R[1], R[3]]]) {
      if (Math.abs(di) < 1e-12) { if (pi < lo || pi > hi) return null; continue; }
      let a = (lo - pi) / di, b = (hi - pi) / di; if (a > b) [a, b] = [b, a];
      t0 = Math.max(t0, a); t1 = Math.min(t1, b);
    }
    return t1 - t0 > 0.5 ? [addv(p, mul(d, t0)), addv(p, mul(d, t1))] : null;
  }
  function isoGrid(S, R, u) {
    const a = [u * C30, -u / 2], b = [-u * C30, -u / 2], out = [];
    for (let k = -80; k <= 80; k++) {
      [[addv(S, mul(b, k)), a], [addv(S, mul(a, k)), b], [[S[0] + k * u * C30, S[1]], [0, 1]]].forEach(([p, d]) => {
        const s = clip(p, d, R); if (s) out.push(L(s[0], s[1], 'C'));
      });
    }
    return out;
  }
  function squareGrid(R) {
    const out = [];
    for (let x = R[0]; x <= R[2] + 1e-6; x += U) out.push(L([x, R[1]], [x, R[3]], 'C'));
    for (let y = R[1]; y <= R[3] + 1e-6; y += U) out.push(L([R[0], y], [R[2], y], 'C'));
    return out;
  }

  // cfg: id, title, name, solids, summary, prompt
  const ids = [];
  function sketch(cfg) {
    const solids = cfg.solids;
    const pts = solids.flatMap(s => s.flatMap(f => f.pts));
    const ext = i => [Math.min(...pts.map(p => p[i])), Math.max(...pts.map(p => p[i]))];
    const [, x1] = ext(0), [, y1] = ext(1), [, z1] = ext(2);
    const gap = 2 * U;
    // the answer on square grid paper: top view above the front view, right view beside it (3rd angle)
    const FX = 30, TYf = 20 + y1, GY = TYf + gap + z1, RX = FX + x1 + gap;
    const fv = SK.orthoView('front', [FX, GY]), tv = SK.orthoView('top', [FX, TYf]), rv = SK.orthoView('right', [RX, GY]);
    const F = VL(solids, fv, true), T = VL(solids, tv, true), R = VL(solids, rv, true);
    const AS = (q, lt) => L(q[0], q[1], lt || 'A');
    const G = [FX - U, 10, RX + y1 + U, GY + 2 * U];
    // the given: the isometric at half size on its own isometric grid (one grid space = 10 mm)
    const k = 0.5, iso0 = SK.isoView([0, 0]), pr = pts.map(p => iso0.project(p));
    const mnx = Math.min(...pr.map(q => q[0])), mxx = Math.max(...pr.map(q => q[0])), mny = Math.min(...pr.map(q => q[1])), mxy = Math.max(...pr.map(q => q[1]));
    const gL = G[2] + 22, gT = 30;
    const g0 = [gL - mnx * k, gT - mny * k];
    const gRect = [gL - 6, gT - 6, gL + (mxx - mnx) * k + 6, gT + (mxy - mny) * k + 6];
    const isoG = SK.isoView([0, 0]), I = VL(solids, isoG, false);
    const f = q => [g0[0] + q[0] * k, g0[1] + q[1] * k];
    const arrowA = f(isoG.project([x1 * 0.3, -34, z1 * 0.5])), arrowB = f(isoG.project([x1 * 0.3, -6, z1 * 0.5]));
    const given = [...isoGrid(g0, gRect, U * k), ...I.vis.map(q => L(f(q[0]), f(q[1]))), { kind: 'point', at: g0, label: 'S' },
      L(arrowA, arrowB, 'B'), pl([[arrowB[0] - 1.6, arrowB[1] + 1.8], arrowB, [arrowB[0] + 2.2, arrowB[1] + 0.4]], 'B'),
      lbl([arrowA[0] + 2, arrowA[1] + 1], 'FRONT / VOOR', Object.assign({ size: 2.4, anchor: 'start' }, YEL)),
      lbl([(gRect[0] + gRect[2]) / 2, gRect[3] + 6], 'GIVEN (HALF SIZE) / GEGEE (HALWE GROOTTE)', Object.assign({ size: 2.4 }, YEL))];
    const rect = (x, y, w, h) => [L([x, y], [x + w, y], 'construction'), L([x + w, y], [x + w, y + h], 'construction'), L([x + w, y + h], [x, y + h], 'construction'), L([x, y + h], [x, y], 'construction')];
    const uniq = a => { const o = []; a.forEach(v => { if (!o.some(w => Math.abs(w - v) < 0.05)) o.push(v); }); return o; };
    const xs = uniq(pts.map(p => p[0])), zs = uniq(pts.map(p => p[2]));
    const sq = v => Math.round(v / U);
    const steps = [
      { instruction: 'GIVEN: the isometric drawing of the ' + cfg.name + ' at half size on isometric grid paper (one grid space = 10 mm), with an arrow for the FRONT view. Sketch FREEHAND on the square grid (one square = 10 mm) the front view, the top view and the right view in 3rd-angle projection. Start at S.',
        calloutAt: f(isoG.project([0, 0, z1])), reveals: [...squareGrid(G), ...given, { kind: 'point', at: [FX, GY], label: 'S' }] },
      { instruction: 'Count the squares on the isometric: the object is ' + sq(x1) + ' long, ' + sq(y1) + ' deep and ' + sq(z1) + ' high. Block in three light boxes, 2 squares apart: the front view ' + sq(x1) + ' × ' + sq(z1) + ' from S, the top view ' + sq(x1) + ' × ' + sq(y1) + ' above it and the right view ' + sq(y1) + ' × ' + sq(z1) + ' to its right.',
        calloutAt: [FX + x1 / 2, GY - z1 / 2], reveals: [...rect(FX, GY - z1, x1, z1), ...rect(FX, TYf - y1, x1, y1), ...rect(RX, GY - z1, y1, z1)] },
      { instruction: 'FRONT VIEW (looking in the direction of the arrow): sketch the visible outline and edges with firm, dark freehand lines. Count the squares for every corner.', calloutAt: [FX + x1 / 2, GY - z1 / 2], reveals: F.vis.map(q => AS(q)) },
      { instruction: 'Sketch the hidden edges of the front view as short, even dashes.', calloutAt: [FX + x1 / 2, GY - z1 / 3], reveals: F.hid.map(q => AS(q, 'hidden')) },
      { instruction: 'Carry the widths of the corners lightly straight up from the front view into the top view.', calloutAt: [FX, (GY - z1 + TYf) / 2], reveals: xs.map(x => L([FX + x, GY - z1], [FX + x, TYf - y1 - 4], 'construction')) },
      { instruction: 'TOP VIEW: sketch the visible edges. The front of the object is at the BOTTOM of the top view, nearest the front view.', calloutAt: [FX + x1 / 2, TYf - y1 / 2], reveals: T.vis.map(q => AS(q)) },
      { instruction: 'Sketch the hidden edges of the top view.', calloutAt: [FX + x1 / 2, TYf - y1 / 2], reveals: T.hid.map(q => AS(q, 'hidden')) },
      { instruction: 'Carry the heights lightly straight across from the front view into the right view.', calloutAt: [(FX + x1 + RX) / 2, GY - z1 / 2], reveals: zs.map(z => L([FX + x1, GY - z], [RX + y1 + 4, GY - z], 'construction')) },
      { instruction: 'RIGHT VIEW: count the depths from the isometric. The front of the object is on the LEFT of the right view, nearest the front view. Sketch the visible edges.', calloutAt: [RX + y1 / 2, GY - z1 / 2], reveals: R.vis.map(q => AS(q)) },
      { instruction: 'Sketch the hidden edges of the right view.', calloutAt: [RX + y1 / 2, GY - z1 / 3], reveals: R.hid.map(q => AS(q, 'hidden')) },
      { instruction: 'Check every view against the isometric, darken the outlines and label the views.', calloutAt: [FX + x1 / 2, GY + 8],
        reveals: [lbl([FX + x1 / 2, GY + 8], 'FRONT VIEW / VOORAANSIG'), lbl([FX + x1 / 2, TYf - y1 - 4], 'TOP VIEW / BOAANSIG'), lbl([RX + y1 / 2, GY + 8], 'RIGHT VIEW / REGTERAANSIG')] },
    ];
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'third', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full', _solids: solids,
      steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ids.push(cfg.id);
    ORDER.push(cfg.id);
  }

  // ═══ Exercises (original parts; sizes in 10 mm squares) ═══
  sketch({ id: 'fh-stepped-block', title: 'Freehand Views 1: Stepped Block', name: 'stepped block',
    solids: [ubox(0, 0, 0, 6, 4, 2), ubox(0, 0, 2, 3, 4, 4)],
    summary: 'A first freehand sketch: a block with one step. Count the squares on the isometric and sketch three views on square grid paper.',
    prompt: 'The isometric drawing of a stepped block is given on isometric grid paper. Sketch, freehand on square grid paper (one square = 10 mm), the front view, top view and right view in 3rd-angle projection.' });
  sketch({ id: 'fh-slotted-block', title: 'Freehand Views 2: Block with a Slot', name: 'slotted block',
    solids: [ubox(0, 0, 0, 6, 4, 1), ubox(0, 0, 1, 2, 4, 3), ubox(4, 0, 1, 6, 4, 3)],
    summary: 'A slot runs from front to back: it is seen in the front view, and the bottom of the slot is a hidden line in the right view.',
    prompt: 'The isometric drawing of a block with a slot is given on isometric grid paper. Sketch, freehand on square grid paper, the front view, top view and right view in 3rd-angle projection. Show hidden detail.' });
  sketch({ id: 'fh-sloped-block', title: 'Freehand Views 3: Block with a Sloping Face', name: 'block with a sloping face',
    solids: [uext([[0, 0], [6, 0], [6, 2], [4, 4], [0, 4]], 'xz', 0, 3)],
    summary: 'A sloping face at the right-hand end: it shows its true slope in the front view, and only as a line across the top and right views.',
    prompt: 'The isometric drawing of a block with a sloping face is given on isometric grid paper. Sketch, freehand on square grid paper, the front view, top view and right view in 3rd-angle projection.' });
  sketch({ id: 'fh-corner-steps', title: 'Freehand Views 4: Corner Steps', name: 'corner steps',
    solids: [ubox(0, 0, 0, 5, 5, 1), ubox(0, 2, 1, 3, 5, 2), ubox(0, 3, 2, 2, 5, 3)],
    summary: 'Three steps rising towards the back left-hand corner: each step shows as a new line in every view.',
    prompt: 'The isometric drawing of corner steps is given on isometric grid paper. Sketch, freehand on square grid paper, the front view, top view and right view in 3rd-angle projection.' });
  sketch({ id: 'fh-wedge-stop', title: 'Freehand Views 5: Wedge Stop', name: 'wedge stop',
    solids: [uext([[0, 0], [4, 0], [4, 3], [2, 3], [0, 1]], 'yz', 0, 6)],
    summary: 'The slope runs from front to back, so its true shape appears in the right view; the front view shows only a line where the slope starts.',
    prompt: 'The isometric drawing of a wedge stop is given on isometric grid paper. Sketch, freehand on square grid paper, the front view, top view and right view in 3rd-angle projection.' });
  sketch({ id: 'fh-notched-block', title: 'Freehand Views 6: Notched Block', name: 'notched block',
    solids: [ubox(0, 0, 0, 6, 4, 1), ubox(0, 2, 1, 6, 4, 3), ubox(0, 0, 1, 2, 2, 3)],
    summary: 'A block with a raised back half and a block at the front left: read each level from the isometric and find it in all three views.',
    prompt: 'The isometric drawing of a notched block is given on isometric grid paper. Sketch, freehand on square grid paper, the front view, top view and right view in 3rd-angle projection.' });
  sketch({ id: 'fh-angle-bracket', title: 'Freehand Views 7: Angle Bracket with a Sloping Top', name: 'angle bracket',
    solids: [ubox(2, 0, 0, 6, 4, 1), uext([[0, 0], [4, 0], [4, 3], [2, 5], [0, 5]], 'yz', 0, 2)],
    summary: 'The upright slopes down towards the back: the slope shows its true shape in the right view and a hidden edge in the front view.',
    prompt: 'The isometric drawing of an angle bracket is given on isometric grid paper. Sketch, freehand on square grid paper, the front view, top view and right view in 3rd-angle projection. Show hidden detail.' });
  sketch({ id: 'fh-cross-block', title: 'Freehand Views 8: Cross Block', name: 'cross block',
    solids: [ubox(0, 1, 0, 2, 3, 2), ubox(2, 0, 0, 4, 4, 2), ubox(4, 1, 0, 6, 3, 2), ubox(2, 1, 2, 4, 3, 3)],
    summary: 'A cross-shaped block with a small block on top in the middle: the cross shape is seen in the top view.',
    prompt: 'The isometric drawing of a cross block is given on isometric grid paper. Sketch, freehand on square grid paper, the front view, top view and right view in 3rd-angle projection.' });

  // in the workbooks the freehand sketches come before the instrument drawings from an isometric
  ids.forEach(id => ORDER.splice(ORDER.indexOf(id), 1));
  const at = ORDER.indexOf('ortho-from-iso-guide-block');
  ORDER.splice(at >= 0 ? at : ORDER.length, 0, ...ids);
})(window);
