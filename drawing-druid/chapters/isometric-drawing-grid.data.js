// Isometric Drawing (Gr 10), JPEGD-volume pass:
//   - four starter exercises on ISOMETRIC GRID PAPER (10 mm grid): copy a given isometric, or build
//     one from given views, counting squares;
//   - seven more instrument-drawn isometrics from given 3rd-angle views (IsoFromViews);
//   - a cube with an isometric circle on each visible face (four-centre method).
// Runs after isometric-drawing-more.data.js (needs SolidKit, ViewLines, IsoPartOf, IsoFromViews).
(function (global) {
  'use strict';
  const SK = global.SolidKit, VL = global.ViewLines, partOf = global.IsoPartOf, IFV = global.IsoFromViews;
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  if (!C['isometric-wedge'] || !VL || !partOf || !IFV) return;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#94a3b8' }, opts || {});
  const YEL = { color: '#fde047' };
  const U = 10, C30 = Math.cos(Math.PI / 6);
  const ubox = (x0, y0, z0, x1, y1, z1) => SK.box(x0 * U, y0 * U, z0 * U, x1 * U, y1 * U, z1 * U);
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], addv = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];

  // the part of the line p + t·d inside rectangle [x0, y0, x1, y1]
  function clip(p, d, R) {
    let t0 = -1e9, t1 = 1e9;
    for (const [pi, di, lo, hi] of [[p[0], d[0], R[0], R[2]], [p[1], d[1], R[1], R[3]]]) {
      if (Math.abs(di) < 1e-12) { if (pi < lo || pi > hi) return null; continue; }
      let a = (lo - pi) / di, b = (hi - pi) / di; if (a > b) [a, b] = [b, a];
      t0 = Math.max(t0, a); t1 = Math.min(t1, b);
    }
    return t1 - t0 > 0.5 ? [addv(p, mul(d, t0)), addv(p, mul(d, t1))] : null;
  }
  // isometric grid through S (10 mm along each axis), clipped to R
  function isoGridLines(S, R) {
    const a = [U * C30, -U / 2], b = [-U * C30, -U / 2], out = [];
    for (let k = -60; k <= 60; k++) {
      [[addv(S, mul(b, k)), a], [addv(S, mul(a, k)), b], [[S[0] + k * U * C30, S[1]], [0, 1]]].forEach(([p, d]) => {
        const s = clip(p, d, R); if (s) out.push(L(s[0], s[1], 'C'));
      });
    }
    return out;
  }
  function squareGrid(R, s) {
    const out = [];
    for (let x = R[0]; x <= R[2] + 1e-6; x += s) out.push(L([x, R[1]], [x, R[3]], 'C'));
    for (let y = R[1]; y <= R[3] + 1e-6; y += s) out.push(L([R[0], y], [R[2], y], 'C'));
    return out;
  }
  const scaled = (o, k) => q => [o[0] + (q[0] - o[0]) * k, o[1] + (q[1] - o[1]) * k];

  // cfg: id, title, summary, prompt, given: 'iso' | 'views', parts [{ solid (from ubox), text, at }]
  const gridIds = [];
  function isoGrid(cfg) {
    const solids = cfg.parts.map(p => p.solid);
    const pts3 = []; solids.forEach(s => s.forEach(f => f.pts.forEach(p => pts3.push(p))));
    const e = i => [Math.min(...pts3.map(p => p[i])), Math.max(...pts3.map(p => p[i]))];
    const [, x1] = e(0), [, y1] = e(1), [, z1] = e(2);
    const R = [15, 15, 175, 165];
    const iso0 = SK.isoView([0, 0]), pr = pts3.map(p => iso0.project(p));
    const mnx = Math.min(...pr.map(q => q[0])), mxx = Math.max(...pr.map(q => q[0])), mny = Math.min(...pr.map(q => q[1])), mxy = Math.max(...pr.map(q => q[1]));
    // S on a grid node with the object centred in the grid area
    const S = [Math.round(((R[0] + R[2]) / 2 - (mnx + mxx) / 2) / (U * C30)) * U * C30 + 0, Math.round(((R[1] + R[3]) / 2 - (mny + mxy) / 2) / 5) * 5];
    const grid = isoGridLines(S, R);
    const iso = SK.isoView(S), I = VL(solids, iso, false);
    const AS = (q, lt) => L(q[0], q[1], lt || 'A');
    // the given
    const given = [];
    let givenText;
    if (cfg.given === 'iso') {
      const g0 = [235, 120], k = 0.5, f = scaled(g0, k), G = VL(solids, SK.isoView(g0), false);
      given.push(...G.vis.map(q => L(f(q[0]), f(q[1]))), { kind: 'point', at: g0, label: 'S' }, lbl([g0[0] + 5, g0[1] + 22], 'GIVEN (HALF SIZE)', YEL));
      givenText = 'the isometric drawing of the object (half size, so every grid square on your sheet is twice the size of one in the picture)';
    } else {
      const k = 0.5, W = x1 * k, D = y1 * k, H = z1 * k, gx = 200, gy = 140, gap = 8;
      const fo = [gx, gy], to = [gx, gy - H - gap], ro = [gx + W + gap, gy];
      const view = (kind, o) => { const v = SK.orthoView(kind, [0, 0]), r = VL(solids, v, true); const m = q => [o[0] + q[0] * k, o[1] + q[1] * k]; return [...r.vis.map(s => L(m(s[0]), m(s[1]))), ...r.hid.map(s => L(m(s[0]), m(s[1]), 'hidden'))]; };
      given.push(...squareGrid([gx - 5, to[1] - D - 5, ro[0] + D + 5, gy + 5], 5), ...view('front', fo), ...view('top', to), ...view('right', ro),
        lbl([gx + W / 2, gy + 10], 'FRONT', { size: 2.4 }), lbl([gx + W / 2, to[1] - D - 8], 'TOP', { size: 2.4 }), lbl([ro[0] + D / 2, gy + 10], 'RIGHT', { size: 2.4 }),
        lbl([gx, gy + 18], 'GIVEN: 3RD ANGLE, ONE SQUARE = 10 mm', Object.assign({ size: 2.6, anchor: 'start' }, YEL)), lbl([gx - 3, gy + 3], 'S', { size: 3, color: '#fde047' }));
      givenText = 'the front, top and right views on a square grid (3rd angle; one square = 10 mm = one isometric grid space)';
    }
    const steps = [
      { instruction: 'GIVEN: ' + givenText + '. On the ISOMETRIC GRID (10 mm), draw the object full size, starting at S. Count the grid spaces: every edge along an axis follows a grid line.', calloutAt: S,
        reveals: [...grid, ...given, { kind: 'point', at: S, label: 'S' }] },
      { instruction: 'From S, follow the three grid lines: 30° to the right for the LENGTH (' + x1 / U + ' squares), 30° to the left for the DEPTH (' + y1 / U + ' squares) and straight up for the HEIGHT (' + z1 / U + ' squares). Mark the far corners lightly.', calloutAt: S,
        reveals: [L(S, iso.project([x1, 0, 0]), 'construction'), L(S, iso.project([0, y1, 0]), 'construction'), L(S, iso.project([0, 0, z1]), 'construction')] },
      ...cfg.parts.map((p, i) => ({ instruction: p.text, calloutAt: iso.project(p.at || [0, 0, 0]), reveals: I.vis.filter(q => partOf(solids, q.s) === i).map(q => AS(q)) })),
      { instruction: 'Check every edge against the given ' + (cfg.given === 'iso' ? 'picture' : 'views') + ' and line it in. No hidden detail on an isometric drawing.', calloutAt: [S[0], S[1] + 8], reveals: [lbl([S[0], S[1] + 12], 'ISOMETRIC ON GRID PAPER', YEL)] },
    ];
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: cfg.given === 'views' ? 'third' : 'none', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full',
      steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    gridIds.push(cfg.id);
  }

  isoGrid({ id: 'iso-grid-l-block', title: 'Isometric Grid 1: Copy an L-Block', given: 'iso',
    summary: 'A first isometric on grid paper: copy an L-shaped block from a half-size picture by counting grid spaces along the three axes.',
    prompt: 'Copy the L-block onto isometric grid paper, full size (one grid space = 10 mm), starting at S.',
    parts: [
      { solid: ubox(0, 0, 0, 5, 3, 1), text: 'The base: 5 squares long, 3 deep and 1 high. Draw its visible edges.', at: [25, 0, 5] },
      { solid: ubox(0, 0, 1, 1, 3, 4), text: 'The upright on the left-hand end: 1 square long, 3 deep and 3 more squares high.', at: [5, 0, 25] },
    ] });
  isoGrid({ id: 'iso-grid-u-block', title: 'Isometric Grid 2: Copy a U-Block', given: 'iso',
    summary: 'Copy a U-shaped block from its picture: two uprights on a base, with the gap between them counted on the grid.',
    prompt: 'Copy the U-block onto isometric grid paper, full size, starting at S.',
    parts: [
      { solid: ubox(0, 0, 0, 6, 3, 1), text: 'The base: 6 × 3 × 1 squares.', at: [30, 0, 5] },
      { solid: ubox(0, 0, 1, 1, 3, 3), text: 'The left upright: 1 square long, 2 squares high, the full depth.', at: [5, 0, 20] },
      { solid: ubox(5, 0, 1, 6, 3, 3), text: 'The right upright: the same size, 4 squares further along. The gap between them is 4 squares.', at: [55, 0, 20] },
    ] });
  isoGrid({ id: 'iso-grid-t-block', title: 'Isometric Grid 3: T-Block from Views', given: 'views',
    summary: 'Build an isometric on grid paper from three views drawn on a square grid: every square in the views is one grid space.',
    prompt: 'From the given views on the square grid, draw the T-block on isometric grid paper, full size, starting at S.',
    parts: [
      { solid: ubox(0, 0, 0, 6, 3, 1), text: 'The base from the front and top views: 6 squares long, 3 deep, 1 high.', at: [30, 0, 5] },
      { solid: ubox(2, 0, 1, 4, 3, 4), text: 'The stem: 2 squares long (2 in from each end), full depth, 3 squares higher than the base.', at: [30, 0, 25] },
    ] });
  isoGrid({ id: 'iso-grid-steps', title: 'Isometric Grid 4: Corner Steps from Views', given: 'views',
    summary: 'Steps that rise towards the back left corner: read each level from the right view and count it on the grid.',
    prompt: 'From the given views on the square grid, draw the corner steps on isometric grid paper, full size, starting at S.',
    parts: [
      { solid: ubox(0, 0, 0, 5, 4, 1), text: 'The bottom slab: 5 × 4 × 1 squares.', at: [25, 0, 5] },
      { solid: ubox(0, 2, 1, 5, 4, 2), text: 'The second step: the back 2 squares of the depth, the full length, 1 square high.', at: [25, 20, 15] },
      { solid: ubox(0, 3, 2, 2, 4, 4), text: 'The top block: 2 squares long at the left-hand end, the back square of the depth, 2 squares high.', at: [10, 30, 30] },
    ] });
  // the grid exercises come straight after the introductory wedge
  const at = ORDER.indexOf('isometric-wedge');
  gridIds.forEach((id, i) => ORDER.splice(at + 1 + i, 0, id));

  // ═══ Instrument-drawn isometrics from given views ═══
  const box = SK.box, ext = (prof, plane, a, b) => SK.extrude(prof, plane, a, b);
  IFV({ id: 'iso-dovetail-slide', title: 'Isometric from Views: Dovetail Slide',
    summary: 'A slide with a dovetail along its top: the dovetail sides lean outwards, so their corners are plotted on the front face and carried back.',
    prompt: 'Draw an isometric view of the dovetail slide from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [{ solid: ext([[0, 0], [84, 0], [84, 14], [64, 14], [70, 32], [14, 32], [20, 14], [0, 14]], 'xz', 0, 50), text: 'Draw the front face first: the base 84 × 14, and the dovetail 44 wide at the bottom and 56 at the top, 18 high (plot the ends of its sloping sides). Carry every visible corner 50 back and join the ends.', at: [42, 0, 16] }] });
  IFV({ id: 'iso-shaft-support', title: 'Isometric from Views: Shaft Support',
    summary: 'A base, a central column and an overhanging cap, each located from the centre lines of the views.',
    prompt: 'Draw an isometric view of the shaft support from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: box(0, 0, 0, 90, 50, 12), text: 'The base: 90 × 50 × 12.', at: [45, 0, 6] },
      { solid: box(30, 15, 12, 60, 35, 56), text: 'The column: 30 × 20, 44 high, centred on the base (30 in from the ends, 15 from the front).', at: [45, 15, 34] },
      { solid: box(24, 10, 56, 66, 40, 68), text: 'The cap: 42 × 30 × 12, overhanging the column by 6 at the ends and 5 at the front and back.', at: [45, 10, 62] },
    ] });
  IFV({ id: 'iso-roof-block', title: 'Isometric from Views: Roof Block with Chimney',
    summary: 'A block with two sloping roof faces along its length and a small chimney: the slopes are plotted on the front face.',
    prompt: 'Draw an isometric view of the roof block from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: ext([[0, 0], [90, 0], [90, 18], [70, 38], [20, 38], [0, 18]], 'xz', 0, 46), text: 'Draw the front face: 90 long and 18 high at the ends, rising to 38 with sloping faces 20 long in plan. Carry the corners 46 back and join them.', at: [45, 0, 20] },
      { solid: box(34, 14, 38, 52, 32, 54), text: 'The chimney: 18 × 18 × 16, standing on the flat top, 34 from the left-hand end and 14 from the front.', at: [43, 14, 46] },
    ] });
  IFV({ id: 'iso-grooved-guide', title: 'Isometric from Views: Grooved Guide',
    summary: 'A guide with a groove along its full length: the groove is drawn by carrying its front-face corners right along the length axis.',
    prompt: 'Draw an isometric view of the grooved guide from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: box(0, 0, 0, 80, 50, 18), text: 'The base under the groove: 80 × 50 × 18.', at: [40, 0, 9] },
      { solid: box(0, 0, 18, 80, 16, 34), text: 'The front rail: the full length, 16 deep and 16 high.', at: [40, 0, 26] },
      { solid: box(0, 34, 18, 80, 50, 34), text: 'The back rail: the same size. The groove between the rails is 18 wide and 16 deep and runs the full length.', at: [40, 34, 26] },
    ] });
  IFV({ id: 'iso-stepped-column', title: 'Isometric from Views: Stepped Column',
    summary: 'Three square blocks stacked on a common centre, each smaller than the one below: locate every block by its offsets.',
    prompt: 'Draw an isometric view of the stepped column from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [
      { solid: box(0, 0, 0, 70, 70, 12), text: 'The base: 70 × 70 × 12.', at: [35, 0, 6] },
      { solid: box(10, 10, 12, 60, 60, 30), text: 'The middle block: 50 × 50 × 18, set in 10 from every side.', at: [35, 10, 21] },
      { solid: box(20, 20, 30, 50, 50, 62), text: 'The column: 30 × 30 × 32, set in 20 from every side of the base.', at: [35, 20, 46] },
    ] });
  IFV({ id: 'iso-locating-block', title: 'Isometric from Views: Locating Block with a V-Groove',
    summary: 'A V-groove runs along the top of the block: its sloping faces are plotted on the end face (from the right view) and carried along the length.',
    prompt: 'Draw an isometric view of the locating block from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [{ solid: ext([[0, 0], [50, 0], [50, 40], [36, 40], [25, 26], [14, 40], [0, 40]], 'yz', 0, 76), text: 'Draw the end profile on the left-hand end of the box (from the right view): 50 deep and 40 high, with a V 22 wide and 14 deep in the middle of the top. Carry every corner 76 along the length axis and join them.', at: [0, 25, 20] }] });
  IFV({ id: 'iso-clamp-jaw', title: 'Isometric from Views: Clamp Jaw',
    summary: 'A jaw with a stepped front and a sloping face: the profile is drawn on the front face, then carried back.',
    prompt: 'Draw an isometric view of the clamp jaw from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
    parts: [{ solid: ext([[0, 0], [86, 0], [86, 20], [62, 44], [40, 44], [40, 26], [0, 26]], 'xz', 0, 40), text: 'Draw the front face: 86 long, 26 high on the left, a step up to 44 at 40 along, a flat to 62 and a slope down to 20 high at the right-hand end. Carry the corners 40 back and join them.', at: [43, 0, 20] }] });

  // ═══ Cube with an isometric circle on each visible face (four-centre method) ═══
  (function () {
    const a = 60, S = [100, 150], iso = SK.isoView(S), P = p => iso.project(p);
    const faces = [
      { name: 'TOP', q: [[0, 0, a], [a, 0, a], [a, a, a], [0, a, a]] },
      { name: 'FRONT (RIGHT-HAND)', q: [[0, 0, 0], [a, 0, 0], [a, 0, a], [0, 0, a]] },
      { name: 'LEFT-HAND END', q: [[0, 0, 0], [0, a, 0], [0, a, a], [0, 0, a]] },
    ];
    const lineX = (p, q, r, s) => { const d = (p[0] - q[0]) * (r[1] - s[1]) - (p[1] - q[1]) * (r[0] - s[0]), t = ((p[0] - r[0]) * (r[1] - s[1]) - (p[1] - r[1]) * (r[0] - s[0])) / d; return addv(p, mul(sub(q, p), t)); };
    const ang = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]) * 180 / Math.PI, mod = v => ((v % 360) + 360) % 360;
    const arcVia = (c, r, p, q, m, lt) => { const ap = ang(c, p), aq = ang(c, q), am = ang(c, m);
      return mod(am - ap) < mod(aq - ap) ? { kind: 'arc-construction', center: c, r, startDeg: ap, endDeg: ap + mod(aq - ap), lineType: lt || 'A' } : { kind: 'arc-construction', center: c, r, startDeg: aq, endDeg: aq + mod(ap - aq), lineType: lt || 'A' }; };
    const fourCentre = f => {
      const V = f.q.map(P), M = V.map((v, i) => mul(addv(v, V[(i + 1) % 4]), 0.5));      // M[i] = midpoint of V[i]V[i+1]
      const angAt = i => { const u = sub(V[(i + 3) % 4], V[i]), w = sub(V[(i + 1) % 4], V[i]); return Math.acos((u[0] * w[0] + u[1] * w[1]) / Math.hypot(...u) / Math.hypot(...w)); };
      const o = angAt(0) > Math.PI / 2 ? 0 : 1, A = V[o], B = V[o + 2];             // the two obtuse corners
      const Ma = [M[(o + 1) % 4], M[(o + 2) % 4]], Mb = [M[(o + 3) % 4], M[o]];      // sides away from A / away from B
      const X1 = lineX(A, Ma[0], B, Mb[1]), X2 = lineX(A, Ma[1], B, Mb[0]);
      const RA = Math.hypot(...sub(Ma[0], A)), r1 = Math.hypot(...sub(Mb[1], X1)), r2 = Math.hypot(...sub(Ma[1], X2));
      return { V, M, A, B, X1, X2,
        lines: [L(A, Ma[0], 'construction'), L(A, Ma[1], 'construction'), L(B, Mb[0], 'construction'), L(B, Mb[1], 'construction')],
        big: [arcVia(A, RA, Ma[0], Ma[1], addv(A, mul(sub(B, A), RA / Math.hypot(...sub(B, A))))), arcVia(B, RA, Mb[0], Mb[1], addv(B, mul(sub(A, B), RA / Math.hypot(...sub(A, B)))))],
        small: [arcVia(X1, r1, Mb[1], Ma[0], V[(o + 1) % 4]), arcVia(X2, r2, Ma[1], Mb[0], V[(o + 3) % 4])] };
    };
    const F = faces.map(fourCentre);
    const cube = VL([SK.box(0, 0, 0, a, a, a)], iso, false).vis.map(q => L(q[0], q[1]));
    const steps = [
      { instruction: 'Draw the 60 mm cube in isometric from S: three edges along the axes from S, then the rest of the cube. Each visible face is a rhombus.', calloutAt: S, reveals: [{ kind: 'point', at: S, label: 'S' }, ...cube] },
    ];
    F.forEach((g, i) => {
      steps.push({ instruction: faces[i].name + ' FACE: mark the midpoint of each side of the rhombus. The circle will touch the rhombus at these four points.', calloutAt: g.M[0], reveals: g.M.map(m => ({ kind: 'point', at: m })) });
      steps.push({ instruction: 'From each OBTUSE corner (the 120° corners) draw lines to the midpoints of the two opposite sides. Where the lines cross are the two small-arc centres.', calloutAt: g.X1, reveals: [...g.lines, { kind: 'point', at: g.X1 }, { kind: 'point', at: g.X2 }] });
      steps.push({ instruction: 'With the obtuse corners as centres, draw the two LARGE arcs between the midpoints.', calloutAt: g.A, reveals: g.big });
      steps.push({ instruction: 'With the crossing points as centres, draw the two SMALL arcs to close the ellipse. It touches all four sides at their midpoints.', calloutAt: g.X1, reveals: g.small });
    });
    C['iso-cube-circles'] = { id: 'iso-cube-circles', title: 'Isometric Circles on Three Faces of a Cube', projection: 'none', printLayout: 'full',
      summary: 'The four-centre method on all three visible faces of a cube: the same construction gives the top ellipse and the two upright ones, each touching its rhombus at the midpoints.',
      workbookPrompt: 'Draw a 60 mm cube in isometric and, using the four-centre method, draw a 60 mm diameter isometric circle on each of its three visible faces. Show all construction.',
      steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    const ci = ORDER.indexOf('isometric-circle-vertical');
    ORDER.splice(ci >= 0 ? ci + 1 : ORDER.length, 0, 'iso-cube-circles');
  })();
})(window);
