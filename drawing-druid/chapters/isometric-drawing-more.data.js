// Isometric Drawing: generated "isometric from given views" exercises. Needs solid-kit.js and
// runs after isometric-drawing.data.js. The given views are in 3rd angle (top view above the
// front view, right view to its right); the isometric starts at S, the front-bottom corner.
(function (global) {
  'use strict';
  const SK = global.SolidKit;
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#94a3b8' }, opts || {});
  const d2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const C30 = Math.cos(Math.PI / 6);
  const two = (at, en, af) => [lbl(at, en), lbl([at[0], at[1] + 4.4], af, { size: 2.5 })];

  const box = SK.box;

  // ── seams: a line where two solids are joined flush is not a real edge ──
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  function onSeg3(p, a, b) {
    const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], l2 = dot(ab, ab);
    const t = l2 ? dot([p[0] - a[0], p[1] - a[1], p[2] - a[2]], ab) / l2 : 0;
    if (t < -1e-6 || t > 1 + 1e-6) return false;
    const q = [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t];
    return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < 1e-3;
  }
  function inFace(p, f) {
    const n = f.n, ax = Math.abs(n[0]) > Math.abs(n[1]) ? (Math.abs(n[0]) > Math.abs(n[2]) ? 0 : 2) : (Math.abs(n[1]) > Math.abs(n[2]) ? 1 : 2);
    const i = (ax + 1) % 3, j = (ax + 2) % 3, P = [p[i], p[j]], poly = f.pts.map(q => [q[i], q[j]]);
    let inside = false;
    for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
      const A = poly[a], B = poly[b];
      // on the boundary?
      const AB = [B[0] - A[0], B[1] - A[1]], l2 = AB[0] * AB[0] + AB[1] * AB[1];
      const t = l2 ? Math.max(0, Math.min(1, ((P[0] - A[0]) * AB[0] + (P[1] - A[1]) * AB[1]) / l2)) : 0;
      if (Math.hypot(P[0] - A[0] - AB[0] * t, P[1] - A[1] - AB[1] * t) < 1e-3) return true;
      if ((A[1] > P[1]) !== (B[1] > P[1]) && P[0] < (B[0] - A[0]) * (P[1] - A[1]) / (B[1] - A[1]) + A[0]) inside = !inside;
    }
    return inside;
  }
  // the faces (with their solid index) that own the edge through the segment's midpoint
  function owners(solids, seg) {
    const m = [(seg[0][0] + seg[1][0]) / 2, (seg[0][1] + seg[1][1]) / 2, (seg[0][2] + seg[1][2]) / 2], out = [];
    solids.forEach((s, si) => s.forEach(f => f.pts.forEach((p, k) => { if (onSeg3(m, p, f.pts[(k + 1) % f.pts.length])) out.push({ si, f }); })));
    return { m, out };
  }
  function isSeam(solids, seg) {
    const { m, out } = owners(solids, seg);
    return out.some(({ si, f }) => solids.some((s, sj) => sj !== si && s.some(g => dot(g.n, f.n) > 0.9999 && Math.abs(dot(g.n, g.pts[0]) - dot(f.n, f.pts[0])) < 1e-6 && inFace(m, g))));
  }
  const partOf = (solids, seg) => { const o = owners(solids, seg).out; return o.length ? Math.min(...o.map(x => x.si)) : 0; };

  // 2D lines of a view: visible (no seams), hidden (not under a visible line)
  function onSeg2(p, a, b) {
    const ab = [b[0] - a[0], b[1] - a[1]], l2 = ab[0] * ab[0] + ab[1] * ab[1];
    if (l2 < 1e-9) return d2(p, a) < 0.05;
    const t = ((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1]) / l2;
    if (t < -1e-3 || t > 1 + 1e-3) return false;
    return d2(p, [a[0] + ab[0] * t, a[1] + ab[1] * t]) < 0.05;
  }
  const covered = (s, set) => [0, 0.25, 0.5, 0.75, 1].every(t => { const p = [s[0][0] + (s[1][0] - s[0][0]) * t, s[0][1] + (s[1][1] - s[0][1]) * t]; return set.some(v => onSeg2(p, v[0], v[1])); });
  function viewLines(solids, view, hidden) {
    const r = SK.hlr(solids, view);
    const keep = r.visible.filter(s => !isSeam(solids, s)), hid = hidden ? r.hidden.filter(s => !isSeam(solids, s)) : [];
    const vis2 = [], hid2 = [];
    keep.forEach(s => { const q = [view.project(s[0]), view.project(s[1])]; if (d2(q[0], q[1]) > 0.05 && !covered(q, vis2)) vis2.push(Object.assign(q, { s })); });
    hid.forEach(s => { const q = [view.project(s[0]), view.project(s[1])]; if (d2(q[0], q[1]) > 0.05 && !covered(q, vis2) && !covered(q, hid2)) hid2.push(q); });
    return { vis: vis2, hid: hid2 };
  }

  // cfg: id, title, summary, prompt, parts [{ solid, text }], note
  function isoFromViews(cfg) {
    const solids = cfg.parts.map(p => p.solid);
    const pts = []; solids.forEach(s => s.forEach(f => f.pts.forEach(p => pts.push(p))));
    const ext = i => [Math.min(...pts.map(p => p[i])), Math.max(...pts.map(p => p[i]))];
    const [x0, x1] = ext(0), [y0, y1] = ext(1), [z0, z1] = ext(2);
    const W = x1 - x0, D = y1 - y0, H = z1 - z0;
    // isometric: S = (x0, y0, z0) at screen O
    const O = [20 + D * C30, 20 + H + (W + D) / 2];
    const iso = SK.isoView([O[0] - (x0 - y0) * C30, O[1] + (x0 + y0) * 0.5 + z0]);
    const S = iso.project([x0, y0, z0]);
    // given views, full size, to the right
    const GX = O[0] + W * C30 + 30 - x0, gap = 14;
    const GY = 20 + D + gap + H + z0;                         // z = z0 line of the front view... baseline
    const fv = SK.orthoView('front', [GX, GY + z0]);
    const tv = SK.orthoView('top', [GX, GY - H - gap + y0]);  // front edge (y0) at the bottom
    const rv = SK.orthoView('right', [GX + x1 + gap - y0, GY + z0]);
    const F = viewLines(solids, fv, true), T = viewLines(solids, tv, true), R = viewLines(solids, rv, true);
    const I = viewLines(solids, iso, false);
    const AS = (q, lt) => L(q[0], q[1], lt || 'A');
    const steps = [];
    steps.push({ instruction: 'Study the GIVEN views (3rd-angle projection, full size): the top view is above the front view and the right view is to its right. Overall sizes: ' + W + ' long, ' + D + ' deep and ' + H + ' high. S is the front, bottom, left-hand corner.' + (cfg.note ? ' ' + cfg.note : ''),
      calloutAt: fv.project([x0 + W / 2, y0, z0 + H / 2]),
      reveals: [...F.vis.map(q => AS(q)), ...F.hid.map(q => AS(q, 'hidden')), ...T.vis.map(q => AS(q)), ...T.hid.map(q => AS(q, 'hidden')), ...R.vis.map(q => AS(q)), ...R.hid.map(q => AS(q, 'hidden')),
        lbl([fv.project([x0, y0, z0])[0] - 3, fv.project([x0, y0, z0])[1] + 3], 'S', { size: 3.6, color: '#fde047' }),
        ...two([fv.project([x0 + W / 2, 0, z0])[0], fv.project([0, 0, z0])[1] + 6], 'FRONT VIEW', 'VOORAANSIG'),
        ...two([tv.project([x0 + W / 2, y1, 0])[0], tv.project([0, y1, 0])[1] - 8], 'TOP VIEW', 'BOAANSIG'),
        ...two([rv.project([0, (y0 + y1) / 2, 0])[0], fv.project([0, 0, z0])[1] + 6], 'RIGHT VIEW', 'REGTERAANSIG')] });
    steps.push({ instruction: 'Mark the start point S. From S draw the three isometric axes in thin lines: one at 30° to the right (length), one at 30° to the left (depth) and one straight up (height).',
      calloutAt: S, reveals: [{ kind: 'point', at: S, label: 'S' }, L(S, iso.project([x1 + 8, y0, z0]), 'construction'), L(S, iso.project([x0, y1 + 8, z0]), 'construction'), L(S, iso.project([x0, y0, z1 + 8]), 'construction')] });
    const crate = viewLines([box(x0, y0, z0, x1, y1, z1)], iso, false).vis.map(q => AS(q, 'construction'));
    steps.push({ instruction: 'Measure the overall sizes along the axes (' + W + ', ' + D + ' and ' + H + ') and draw the enclosing box in thin lines. Every part of the object fits inside it.',
      calloutAt: iso.project([x1, y0, z1]), reveals: crate });
    cfg.parts.forEach((p, i) => {
      const mine = I.vis.filter(q => partOf(solids, q.s) === i);
      steps.push({ instruction: p.text, calloutAt: iso.project(p.at || [x0, y0, z0]), reveals: mine.map(q => AS(q)) });
    });
    steps.push({ instruction: 'Check every line against the given views, then line in the isometric with thick lines. No hidden detail is shown in an isometric drawing.',
      calloutAt: [O[0], O[1] + 8], reveals: two([O[0] + (W - D) * C30 / 2, O[1] + 15], 'ISOMETRIC VIEW', 'ISOMETRIESE AANSIG') });
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'third', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full',
      steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(cfg.id);
  }

  global.IsoFromViews = isoFromViews;
  global.ViewLines = viewLines;      // hidden-line views with the seams between joined parts removed
  if (!C['isometric-wedge']) return;          // the exercises below belong to Isometric I

  // ═══ Exercises (original parts) ═══
  isoFromViews({
    id: 'iso-stepped-block', title: 'Isometric from Views: Stepped Block',
    summary: 'Three steps of equal depth: build each one up from the base, measuring every step along the isometric axes.',
    prompt: 'The given views show a stepped block in 3rd-angle projection. Draw an isometric view of the block, full size, with S as the lowest corner. Show no hidden detail.',
    parts: [
      { solid: box(0, 0, 0, 72, 40, 15), text: 'Draw the base: 72 × 40 × 15. Only its visible edges.', at: [36, 0, 7] },
      { solid: box(0, 0, 15, 48, 40, 30), text: 'Draw the middle step on top of it: 48 long and 15 high, flush with the front, back and left-hand end. Where faces are flush, there is no line between them.', at: [24, 0, 22] },
      { solid: box(0, 0, 30, 22, 40, 45), text: 'Draw the top step: 22 long and 15 high.', at: [11, 0, 37] },
    ],
  });
  isoFromViews({
    id: 'iso-slotted-block', title: 'Isometric from Views: Slotted Block',
    summary: 'A block with a rectangular slot along its top: the slot is drawn by measuring its position on the front face and carrying it back along the depth axis.',
    prompt: 'Draw an isometric view of the slotted block from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: box(0, 0, 0, 70, 45, 16), text: 'Draw the base under the slot: 70 × 45 × 16.', at: [35, 0, 8] },
      { solid: box(0, 0, 16, 25, 45, 32), text: 'Draw the left-hand side of the slot: 25 long, rising 16 above the base.', at: [12, 0, 24] },
      { solid: box(45, 0, 16, 70, 45, 32), text: 'Draw the right-hand side: also 25 long. The slot between them is 20 wide and 16 deep, and runs right through from front to back.', at: [57, 0, 24] },
    ],
  });
  isoFromViews({
    id: 'iso-angle-bracket', title: 'Isometric from Views: Angle Bracket with Rib',
    summary: 'An L-shaped bracket with a triangular stiffening rib: the rib\'s sloping edge is a non-isometric line, found by plotting its two ends.',
    prompt: 'The given views show an angle bracket with a central rib. Draw an isometric view of the bracket, full size, with S as the lowest corner. Show no hidden detail.',
    parts: [
      { solid: SK.extrude([[0, 0], [72, 0], [72, 12], [12, 12], [12, 52], [0, 52]], 'xz', 0, 44), text: 'Draw the L-shaped bracket: the profile from the front view, carried 44 back along the depth axis.', at: [40, 0, 6] },
      { solid: SK.extrude([[12, 12], [46, 12], [12, 44]], 'xz', 16, 28), text: 'Draw the rib, 12 thick, centred in the depth. Its sloping edge is not parallel to an axis: plot its ends (34 along the base, 32 up the upright) and join them.', at: [26, 16, 24] },
    ],
  });
  isoFromViews({
    id: 'iso-v-block', title: 'Isometric from Views: V-Block',
    summary: 'A V-block: the sloping faces of the V are drawn by locating their corners on the front face and carrying them back.',
    prompt: 'Draw an isometric view of the V-block from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: SK.extrude([[0, 0], [80, 0], [80, 40], [62, 40], [40, 18], [18, 40], [0, 40]], 'xz', 0, 46), text: 'Draw the front face first: the outline with the 90° V, 22 deep. Its sloping edges are plotted from their end points. Then carry every visible corner 46 back and join the ends.', at: [40, 0, 18] },
    ],
  });
  isoFromViews({
    id: 'iso-sloped-block', title: 'Isometric from Views: Block with a Sloping Face',
    summary: 'A block whose right view has a sloping top: the slope is seen in its true shape only in the right view, so its corners are measured from there.',
    prompt: 'Draw an isometric view of the block from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: SK.extrude([[0, 0], [50, 0], [50, 18], [22, 44], [0, 44]], 'yz', 0, 64), text: 'The right view gives the profile: 50 deep, 44 high at the front and 18 at the back, with a sloping face between. Draw that profile on the left-hand end of the box, then carry each corner 64 along the length axis and join the ends.', at: [0, 30, 30] },
      { solid: box(20, 0, 44, 44, 22, 56), text: 'Draw the block on top: 24 long, 22 deep and 12 high, 20 in from the left-hand end, flush with the front.', at: [32, 0, 50] },
    ],
  });
  isoFromViews({
    id: 'iso-t-guide', title: 'Isometric from Views: T-Guide',
    summary: 'An inverted T with a notched stem: two profiles in different directions, stacked.',
    prompt: 'Draw an isometric view of the T-guide from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: box(0, 0, 0, 80, 44, 14), text: 'Draw the base plate: 80 × 44 × 14.', at: [40, 0, 7] },
      { solid: SK.extrude([[0, 14], [44, 14], [44, 40], [26, 40], [26, 52], [0, 52]], 'yz', 28, 52), text: 'Draw the stem, 24 long and centred on the length: its right-view profile is stepped down at the back (26 deep at full height, 44 deep up to 40).', at: [40, 10, 40] },
    ],
  });
  isoFromViews({
    id: 'iso-pedestal', title: 'Isometric from Views: Pedestal',
    summary: 'Three blocks stacked on a common centre: each one is located by measuring its offset in from the box before it is drawn.',
    prompt: 'Draw an isometric view of the pedestal from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: box(0, 0, 0, 80, 60, 12), text: 'Draw the base: 80 × 60 × 12.', at: [40, 0, 6] },
      { solid: box(22, 16, 12, 58, 44, 46), text: 'Draw the column: 36 × 28 × 34, set 22 in from each end and 16 in from the front and back. Locate its front corner on the top of the base first.', at: [40, 16, 30] },
      { solid: box(12, 8, 46, 68, 52, 56), text: 'Draw the cap: 56 × 44 × 10, overhanging the column by 10 at the ends and 8 at the front and back.', at: [40, 8, 51] },
    ],
  });
  isoFromViews({
    id: 'iso-stepped-ramp', title: 'Isometric from Views: Ramp and Step',
    summary: 'A ramp leading up to a step: the ramp\'s sloping face runs along the length, so its corners are plotted on the front face and carried back.',
    prompt: 'Draw an isometric view of the ramp and step from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: SK.extrude([[0, 0], [84, 0], [84, 36], [60, 36], [60, 20], [36, 20], [0, 8]], 'xz', 0, 40), text: 'Draw the front-view profile on the front face of the box: a ramp rising from 8 high to 20 high over 36 (plot its two ends), a flat to 60, then a step up to 36. Carry every corner 40 back and join the ends.', at: [42, 0, 14] },
      { solid: box(66, 0, 36, 84, 18, 48), text: 'Draw the small block on top of the step: 18 × 18 × 12, flush with the front and the right-hand end.', at: [75, 0, 42] },
    ],
  });
})(window);
