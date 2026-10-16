// Perspective Drawing II — Grade 11-12: two-point perspective by the plan (measured) method,
// with curved work for Grade 12. Requires engine-geometry.js, perspective-kit.js and solid-kit.js.
(function (global) {
  'use strict';
  const K = global.PerspectiveKit;
  const SK = global.SolidKit;
  const CONSTRUCTIONS = {};

  const lbl = (at, text, anchor, size, color) => ({ kind: 'label', at, text, size: size || 3.4, anchor: anchor || 'middle', color: color || '#94a3b8' });
  const line = (a, b, t) => ({ kind: 'line', p1: a, p2: b, lineType: t || 'construction' });
  const keyUV = (u, v) => u.toFixed(2) + ',' + v.toFixed(2);

  // One two-point exercise from a 3D model (object axes: u along the right-receding side,
  // v along the left-receding side, z up; the corner u = v = 0 touches PP).
  function twoPoint(cfg) {
    const P = K.setup(Object.assign({ cx: cfg.setup.sx }, /interior/.test(cfg.id) ? cfg.setup : K.eyeAbove(cfg.setup, cfg.solids)));
    const { LVP, RVP, LPP, RPP } = P.vps;
    const view = SK.perspView(P);
    const fin = SK.hlr(cfg.solids, view);
    const planView = { toViewer: () => [0, 0, 1], distance: () => Infinity, project: p => P.plan(p[0], p[1]) };
    const plan = SK.draw(cfg.planSolids || cfg.solids, planView, { hidden: true });
    let uMax = 0, vMax = 0, zMax = 0;
    cfg.solids.forEach(s => s.forEach(f => f.pts.forEach(p => { uMax = Math.max(uMax, p[0]); vMax = Math.max(vMax, p[1]); zMax = Math.max(zMax, p[2]); })));
    let px0 = Infinity, px1 = -Infinity;
    fin.visible.forEach(s => s.forEach(p => { const x = view.project(p)[0]; px0 = Math.min(px0, x); px1 = Math.max(px1, x); }));
    const gap = cfg.viewGap || 10;
    const lvRight = px0 - gap, fvLeft = px1 + gap;
    const leftView = { toViewer: () => [-1, 0, 0], distance: () => Infinity, project: p => [lvRight - p[1], P.yGL - p[2]] };
    const frontView = { toViewer: () => [0, -1, 0], distance: () => Infinity, project: p => [fvLeft + p[0], P.yGL - p[2]] };
    const lv = SK.draw(cfg.solids, leftView, { hidden: true });
    const fv = SK.draw(cfg.solids, frontView, { hidden: true });
    const x0 = Math.min(lvRight - vMax, LVP[0]) - 14, x1 = Math.max(fvLeft + uMax, RVP[0]) + 8;

    const heights = [...new Set(fin.visible.flatMap(s => s.map(p => +p[2].toFixed(3))))].filter(z => z > 1e-6).sort((a, b) => a - b);
    const C0 = P.persp(0, 0, 0);
    // "ground" = the lowest level any visible corner behind PP is at (usually GL)
    let zLow = Infinity;
    fin.visible.forEach(seg => seg.forEach(p => { if (p[1] > 1e-6 || Math.abs(p[0]) + Math.abs(p[1]) > 1e-6) zLow = Math.min(zLow, p[2]); }));
    const isOp = K.openingTest(cfg.solids);
    const main = fin.visible.filter(s => !isOp(s)), ops = fin.visible.filter(isOp);
    const depth = new Map();
    main.forEach(seg => seg.forEach(p => {
      if (Math.abs(p[0]) < 1e-6 && Math.abs(p[1]) < 1e-6) return;
      const k = keyUV(p[0], p[1]);
      const d = depth.get(k) || { u: p[0], v: p[1], zTop: -Infinity, ground: false };
      d.zTop = Math.max(d.zTop, p[2]);
      if (Math.abs(p[2] - zLow) < 1e-6) d.ground = true;
      depth.set(k, d);
    }));
    const dAll = [...depth.values()];
    const dBase = dAll.filter(d => d.ground), dRest = dAll.filter(d => !d.ground);
    // the rest in two groups: points on the walls (openings, sills, heads) and points above
    // the walls (roof, ridge, chimney, raised parts)
    const wallTop = dBase.length ? Math.max(...dBase.map(d => d.zTop)) : 0;
    const dWall = dRest.filter(d => d.zTop <= wallTop + 1e-6), dUp = dRest.filter(d => d.zTop > wallTop + 1e-6);
    // Base corners on the outline of the top view first, the parts standing inside it second.
    const hull = (pts) => {
      const p = pts.map(d => [d.u, d.v]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      if (p.length < 3) return p;
      const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      const lo = [], up = [];
      p.forEach(q => { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); });
      p.slice().reverse().forEach(q => { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); });
      return lo.slice(0, -1).concat(up.slice(0, -1));
    };
    const H = hull(dBase);
    const onHull = d => H.some((a, i) => { const b = H[(i + 1) % H.length]; const L2 = (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2 || 1; const t = Math.max(0, Math.min(1, ((d.u - a[0]) * (b[0] - a[0]) + (d.v - a[1]) * (b[1] - a[1])) / L2)); return Math.hypot(d.u - a[0] - t * (b[0] - a[0]), d.v - a[1] - t * (b[1] - a[1])) < 0.6; });
    const dOuter = dBase.filter(onHull), dInner = dBase.filter(d => !onHull(d));
    // points on the walls grouped per opening (points close together in the top view)
    const clusters = [];
    dWall.forEach(d => {
      const c = clusters.find(cl => cl.some(e => Math.hypot(e.u - d.u, e.v - d.v) < 8));
      if (c) c.push(d); else clusters.push([d]);
    });
    // doors and windows: their depth points, grouped per opening, are done last
    const opDepth = new Map();
    ops.forEach(seg => seg.forEach(p => {
      if (Math.abs(p[0]) < 1e-6 && Math.abs(p[1]) < 1e-6) return;
      const k = keyUV(p[0], p[1]);
      if (depth.has(k)) return;
      const d = opDepth.get(k) || { u: p[0], v: p[1], zTop: -Infinity };
      d.zTop = Math.max(d.zTop, p[2]);
      opDepth.set(k, d);
    }));
    const opClusters = [];
    [...opDepth.values()].forEach(d => {
      const c = opClusters.find(cl => cl.some(e => Math.hypot(e.u - d.u, e.v - d.v) < 8));
      if (c) c.push(d); else opClusters.push([d]);
    });
    const isVert = ([p, q]) => Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;
    const isLevel = ([p, q]) => Math.abs(p[2] - q[2]) < 1e-6;
    const notes = cfg.notes || [];
    const n = s => (s ? ' ' + s : '');
    const ray = d => line(P.SP, P.plan(d.u, d.v));
    const drop = d => line(P.onPP(d.u, d.v), P.persp(d.u, d.v, d.zTop));
    const A = segs => segs.map(([p, q]) => line(view.project(p), view.project(q), 'A'));
    const th = cfg.setup.theta;

    const steps = [
      { t: 'GIVEN (these are on the question sheet, you do not draw them): the picture plane PP with the TOP VIEW, turned ' + th + '° on the right and ' + (90 - th) + '° on the left with only its nearest corner on the PP; the station point SP; the ground line GL with the LEFT VIEW and FRONT VIEW; and the horizon line HL at eye height' + (/interior/.test(cfg.id) ? '.' : ', above the object, so the drawing looks down onto it.') + n(notes[0]),
        at: P.plan(uMax / 2, vMax / 2),
        r: [
          { kind: 'line', p1: [x0, P.yPP], p2: [x1, P.yPP], lineType: 'B' },
          { kind: 'label', at: [x0 - 2, P.yPP - 1], text: 'PP', size: 3.6, anchor: 'end', color: '#e8eaf2' },
          { kind: 'label', at: [x0 - 2, P.yPP + 5.5], text: 'PV', size: 3.6, anchor: 'end', color: '#e8eaf2' },
          ...plan,
          lbl([P.plan(uMax / 2, vMax / 2)[0], P.plan(uMax / 2, vMax / 2)[1] - Math.max(uMax, vMax) * 0.55 - 6], 'TOP VIEW / BO-AANSIG'),
          ...K.spMark(P),
          { kind: 'line', p1: [x0, P.yGL], p2: [x1, P.yGL], lineType: 'B' },
          { kind: 'label', at: [x0 - 2, P.yGL + 1.3], text: 'GL', size: 3.6, anchor: 'end', color: '#e8eaf2' },
          ...lv, lbl([lvRight - vMax / 2, P.yGL + 7], 'LEFT VIEW / LINKERAANSIG'),
          ...fv, lbl([fvLeft + uMax / 2, P.yGL + 7], 'FRONT VIEW / VOORAANSIG'),
          { kind: 'line', p1: [x0, P.yHL], p2: [x1, P.yHL], lineType: 'B' },
          { kind: 'label', at: [x0 - 2, P.yHL + 1.3], text: 'HL', size: 3.6, anchor: 'end', color: '#e8eaf2' },
        ] },
      { t: 'From SP draw a line at ' + th + '° to the RIGHT and one at ' + (90 - th) + '° to the LEFT (parallel to the edges of the top view; the two angles add up to 90°), up to the PP.',
        at: RPP, r: [line(P.SP, LPP), line(P.SP, RPP)] },
      { t: 'Drop verticals from the two PP points to the HL: they are the left and right vanishing points, LVP and RVP.',
        at: RVP,
        r: [line(LPP, LVP), line(RPP, RVP), { kind: 'point', at: LVP, label: 'LVP', size: 1.3 }, { kind: 'point', at: RVP, label: 'RVP', size: 1.3 }] },
      { t: 'The corner of the top view touching PP is the TRUE-HEIGHT LINE: drop it straight down to GL. It is the only line drawn at true scale.',
        at: C0, r: [line(P.plan(0, 0), C0), line(C0, P.persp(0, 0, zMax))] },
      { t: 'Mark every height on the true-height line, projected across from the given views.' + n(notes[1]),
        at: [C0[0], C0[1] - zMax / 2],
        r: heights.map(z => line([lvRight, P.yGL - z], P.persp(0, 0, z))) },
      { t: 'Join the ground point and every height mark to LVP.',
        at: [(C0[0] + LVP[0]) / 2, (C0[1] + LVP[1]) / 2],
        r: [0].concat(heights).map(z => line(P.persp(0, 0, z), LVP)) },
      { t: 'Join them to RVP as well.',
        at: [(C0[0] + RVP[0]) / 2, (C0[1] + RVP[1]) / 2],
        r: [0].concat(heights).map(z => line(P.persp(0, 0, z), RVP)) },
      { t: 'Draw visual rays from SP to the corners of the OUTLINE of the top view that stand on the ground behind the PP. Mark where each ray crosses the PP.' + n(notes[2]),
        at: dOuter.length ? P.onPP(dOuter[0].u, dOuter[0].v) : RVP,
        r: [...dOuter.map(ray), ...dOuter.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 }))] },
      { t: 'From each crossing, drop a vertical line down into the drawing.',
        at: dOuter.length ? P.onPP(dOuter[0].u, dOuter[0].v) : RVP,
        r: dOuter.map(drop) },
      { t: 'Now the other points on the ground INSIDE the outline (for example the foot of a doorway, a column, a braai or a counter): rays to them, with the PP crossings marked.',
        at: dInner.length ? P.onPP(dInner[0].u, dInner[0].v) : RVP,
        r: [...dInner.map(ray), ...dInner.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 }))] },
      { t: 'Drop verticals from these crossings.',
        at: dInner.length ? P.onPP(dInner[0].u, dInner[0].v) : RVP,
        r: dInner.map(drop) },
      ...clusters.map((cl, i) => ({
        t: cfg.pointsText || ((i === 0 ? 'Openings one at a time. ' : 'The next opening. ') + 'Send rays from SP to the corners of this opening (its sides and the inside corners of the reveal), mark the PP crossings and drop verticals from them.'),
        at: P.onPP(cl[0].u, cl[0].v),
        r: [...cl.map(ray), ...cl.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 })), ...cl.map(drop)],
      })),
      { t: 'Rays from SP to the points above the walls: ridge ends, hips, the chimney, raised parts. Mark their PP crossings.',
        at: dUp.length ? P.onPP(dUp[0].u, dUp[0].v) : RVP,
        r: [...dUp.map(ray), ...dUp.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 }))] },
      { t: 'Drop verticals from these crossings too.',
        at: dUp.length ? P.onPP(dUp[0].u, dUp[0].v) : RVP,
        r: dUp.map(drop) },
      { t: 'Each corner is where its dropped vertical meets the right VP line. Draw the visible VERTICAL edges first.',
        at: P.persp(uMax / 2, 0, zMax / 2),
        r: A(main.filter(isVert)) },
      { t: 'Then the level edges that run to RVP (parallel to the right-hand side of the top view). Heights of parts not on the corner come along the VP lines from their true-height mark. Hidden edges are left out.',
        at: P.persp(uMax / 2, 0, zMax),
        r: A(main.filter(s => !isVert(s) && isLevel(s) && Math.abs(s[0][1] - s[1][1]) < 1e-6)) },
      { t: 'Then the level edges that run to LVP (parallel to the left-hand side of the top view).' + n(notes[3]),
        at: P.persp(0, vMax / 2, zMax),
        r: A(main.filter(s => !isVert(s) && isLevel(s) && Math.abs(s[0][0] - s[1][0]) < 1e-6 && Math.abs(s[0][1] - s[1][1]) >= 1e-6)) },
      { t: 'Level edges that go to neither VP (curves, edges at other angles in the top view): join their plotted points.',
        at: P.persp(uMax / 2, vMax / 2, zMax),
        r: A(main.filter(s => !isVert(s) && isLevel(s) && Math.abs(s[0][0] - s[1][0]) >= 1e-6 && Math.abs(s[0][1] - s[1][1]) >= 1e-6)) },
      { t: 'Then the sloping edges (roof slopes, hips, chamfers): they do not go to a VP, so join their end points.',
        at: P.persp(uMax / 2, vMax / 2, zMax),
        r: A(main.filter(s => !isVert(s) && !isLevel(s))) },
      ...opClusters.map((cl, i) => ({
        t: (i === 0 ? 'DOORS AND WINDOWS LAST, one at a time: ' : 'The next opening: ') + 'rays from SP to its corners (its sides and the inside corners of the reveal), the PP crossings, and verticals dropped from them. Their heights come from the true-height line along the VP lines.',
        at: P.onPP(cl[0].u, cl[0].v),
        r: [...cl.map(ray), ...cl.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 })), ...cl.map(drop)],
      })),
      { t: 'Draw the openings: their vertical edges first.',
        at: ops.length ? view.project(ops[0][0]) : RVP,
        r: A(ops.filter(isVert)) },
      { t: 'Then the heads, sills and reveals: level edges that run to RVP or LVP.',
        at: ops.length ? view.project(ops[0][1]) : RVP,
        r: A(ops.filter(s => !isVert(s))) },
    ].filter(s => s.r.length);

    CONSTRUCTIONS[cfg.id] = {
      id: cfg.id, title: cfg.title, summary: cfg.summary, workbookPrompt: cfg.prompt,
      printLayout: 'full', bounds: { w: x1 - x0, h: 200 },
      steps: steps.map((s, i) => ({ id: i + 1, instruction: s.t, calloutAt: s.at, reveals: s.r })),
    };
  }

  const S = SK;

  // 1. Block at 45° / 45°
  twoPoint({
    id: 'two-point-block', title: 'Two-Point: Block at 45° / 45°',
    summary: 'The two-point set-up with a plain block turned 45° each way: both VPs the same distance either side of SP.',
    prompt: 'Draw the block (40 x 40 x 30) in two-point perspective. The top view is at 45° / 45° touching PP at its nearest corner; SP and HL are as given.',
    setup: { sx: 190, d: 105, yPP: 72, yGL: 168, h: 58, theta: 45 },
    solids: [S.box(0, 0, 0, 40, 40, 30)],
  });

  // 2. L-block at 30° / 60°
  twoPoint({
    id: 'two-point-l-block', title: 'Two-Point: L-Block at 30° / 60°',
    summary: 'An L-shaped block: the step\'s height is marked on the true-height line and carried along a VP line to where the step is.',
    prompt: 'Draw the L-block in two-point perspective. The top view is at 30° (right) / 60° (left), touching PP at its nearest corner.',
    setup: { sx: 150, d: 110, yPP: 70, yGL: 168, h: 60, theta: 30 },
    solids: [S.extrude([[0, 0], [50, 0], [50, 16], [22, 16], [22, 36], [0, 36]], 'xz', 0, 32)],
  });

  // 3. Block with a sloping face at 45° / 45°
  twoPoint({
    id: 'two-point-sloped-block', title: 'Two-Point: Block with a Sloping Face',
    summary: 'A block with one sloping face: the sloping edges are not drawn to a VP, they are found by joining their two end points.',
    prompt: 'Draw the block with the sloping face in two-point perspective at 45° / 45°.',
    setup: { sx: 186, d: 108, yPP: 72, yGL: 168, h: 62, theta: 45 },
    solids: [S.extrude([[0, 0], [48, 0], [48, 14], [24, 36], [0, 36]], 'xz', 0, 34)],
    notes: ['', '', '', 'The sloping edges do not go to a VP: join their two ends.'],
  });

  // 4. Hexagonal prism on a square base at 30° / 60°
  (function () {
    const R = 16, cx = 25, cy = 25;
    const hex = Array.from({ length: 6 }, (_, i) => { const a = (i * 60) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
    twoPoint({
      id: 'two-point-hex-prism', title: 'Two-Point: Hexagonal Prism on a Base',
      summary: 'A hexagonal prism on a square base. The hexagon\'s corners are not on the base edges, so every corner needs its own ray and its height carried along VP lines.',
      prompt: 'Draw the hexagonal prism (across corners 32, 36 high) standing on the square base (50 x 50 x 10) in two-point perspective at 30° / 60°.',
      setup: { sx: 150, d: 112, yPP: 72, yGL: 170, h: 70, theta: 30 },
      solids: [S.box(0, 0, 0, 50, 50, 10), S.extrude(hex, 'xy', 10, 46)],
      notes: ['', '', 'Send a ray to every corner of the hexagon.', 'Each hexagon corner\'s vertical edge stands where its ray drops; its top and bottom heights come along VP lines from the true-height line.'],
    });
  })();

  // 5. T-shaped base with a block on top at 45° / 45°
  twoPoint({
    id: 'two-point-t-model', title: 'Two-Point: T-Base with an Upright Block',
    summary: 'A T-shaped base with an upright block standing on it: a model with corners at several depths and heights.',
    prompt: 'Draw the model in two-point perspective at 45° / 45° from the given views.',
    setup: { sx: 196, d: 110, yPP: 74, yGL: 172, h: 66, theta: 45 },
    solids: [S.extrude([[0, 0], [60, 0], [60, 18], [40, 18], [40, 40], [20, 40], [20, 18], [0, 18]], 'xy', 0, 10), S.box(22, 2, 10, 38, 16, 38)],
  });

  // 6. Gable-roof house with door and windows at 30° / 60°  (1:100)
  (function () {
    const house = S.extrude([[0, 0], [40, 0], [40, 24], [20, 36], [0, 24]], 'yz', 0, 62);
    S.openingAt(house, 0, [0, 10, 9], [0, 30, 19], 2.5);          // window in the gable end (u = 0 face)
    const longWall = house.findIndex(f => f.n[1] < -0.9);
    S.openingAt(house, longWall, [12, 0, 0], [21, 0, 21], 2.5);   // door
    S.openingAt(house, longWall, [34, 0, 9], [52, 0, 19], 2.5);   // window
    twoPoint({
      id: 'two-point-gable-house', title: 'Two-Point: Gable-Roof House',
      summary: 'A house seen from its corner: the ridge height is marked on the true-height line and carried back to the middle of the gable; doors and windows show the wall thickness.',
      prompt: 'Draw the house in two-point perspective at 1:100, 30° / 60°. Show the wall thickness at the openings.',
      setup: { sx: 160, d: 125, yPP: 80, yGL: 180, h: 18, theta: 30 },
      solids: [house],
      notes: ['The gable end faces left.', 'Mark the ridge height on the true-height line too, even though the ridge is not on this corner.', 'Rays also go to both ends of the ridge.', ''],
    });
  })();

  // 7. Hipped-roof house with a veranda at 45° / 45°  (1:100)
  (function () {
    const walls = S.box(0, 12, 0, 56, 52, 26);
    S.openingAt(walls, 2, [10, 12, 0], [19, 12, 21], 2.5);
    S.openingAt(walls, 2, [30, 12, 9], [48, 12, 19], 2.5);
    const roof = S.hipRoof(-3, 9, 59, 55, 26, 42);
    const veranda = S.box(0, 0, 26, 56, 12, 28);
    const posts = [0, 26, 53].map(x => S.box(x, 0, 0, x + 3, 3, 26));
    const floor = S.box(0, 0, 0, 56, 12, 2);
    twoPoint({
      id: 'two-point-hip-veranda', title: 'Two-Point: Hipped Roof with a Veranda',
      summary: 'A hipped-roof house with a flat-roofed veranda on posts in front. The veranda roof hides part of the front wall; the hips run from the eave corners to the ridge ends.',
      prompt: 'Draw the house with its veranda in two-point perspective at 1:100, 45° / 45°.',
      setup: { sx: 196, d: 130, yPP: 82, yGL: 184, h: 16, theta: 45 },
      solids: [walls, roof, veranda, floor, ...posts],
      notes: ['', 'Mark the eaves, ridge, veranda roof and opening heights on the true-height line.', 'Include the posts and the hip and ridge ends.', 'Look at what the veranda roof hides.'],
    });
  })();

  // 8. House with a chimney and a garage at 30° / 60°  (1:100)
  (function () {
    const house = S.extrude([[0, 0], [36, 0], [36, 24], [18, 36], [0, 24]], 'yz', 0, 48);
    const chimney = S.box(30, 4, 28, 37, 11, 44);
    const garage = S.box(48, 0, 0, 74, 30, 22);
    const gFront = garage.findIndex(f => f.n[1] < -0.9);
    S.openingAt(garage, gFront, [51, 0, 0], [71, 0, 18], 2.5);
    const hFront = house.findIndex(f => f.n[1] < -0.9);
    S.openingAt(house, hFront, [8, 0, 0], [17, 0, 21], 2.5);
    S.openingAt(house, hFront, [24, 0, 9], [40, 0, 19], 2.5);
    twoPoint({
      id: 'two-point-house-garage', title: 'Two-Point: House with Chimney and Garage',
      summary: 'A gable-roof house with a chimney through the roof and a flat-roofed garage at one end.',
      prompt: 'Draw the house, chimney and garage in two-point perspective at 1:100, 30° / 60°.',
      setup: { sx: 150, d: 128, yPP: 84, yGL: 184, h: 20, theta: 30 },
      solids: [house, chimney, garage],
      notes: ['', '', 'The chimney needs rays to its corners; its base is where it comes through the roof slope.', ''],
    });
  })();

  // 9. Two-storey house at 60° / 30°  (1:100)
  (function () {
    const lower = S.box(0, 0, 0, 40, 50, 26);
    const upper = S.extrude([[0, 26], [40, 26], [40, 48], [20, 60], [0, 48]], 'xz', 0, 34);
    const lf = lower.findIndex(f => f.n[1] < -0.9);
    S.openingAt(lower, lf, [6, 0, 0], [15, 0, 21], 2.5);
    S.openingAt(lower, lf, [22, 0, 9], [36, 0, 19], 2.5);
    const uf = upper.findIndex(f => f.n[1] < -0.9);
    S.openingAt(upper, uf, [12, 0, 32], [28, 0, 42], 2.5);
    const flat = S.box(0, 34, 26, 40, 50, 28);
    twoPoint({
      id: 'two-point-double-storey', title: 'Two-Point: Double-Storey House',
      summary: 'A double-storey house: the upper floor with its gable stands on part of the lower floor, the rest has a flat roof.',
      prompt: 'Draw the double-storey house in two-point perspective at 1:100, 60° (right) / 30° (left).',
      setup: { sx: 196, d: 120, yPP: 82, yGL: 186, h: 20, theta: 60 },
      solids: [lower, upper, flat],
    });
  })();

  // 10. Braai area at 45° / 45°  (1:100)
  (function () {
    const slab = S.box(0, 0, 0, 60, 44, 2);
    const wallL = S.box(0, 0, 2, 4, 44, 12);
    const braai = S.box(30, 32, 2, 52, 44, 16);
    S.openingAt(braai, braai.findIndex(f => f.n[1] < -0.9), [34, 32, 5], [48, 32, 12], 6);
    const chimney = S.box(36, 38, 16, 46, 44, 44);
    const bench = S.box(12, 8, 2, 30, 14, 7);
    twoPoint({
      id: 'two-point-braai-area', title: 'Two-Point: Braai Area',
      summary: 'An outdoor braai area: a paved slab, a low side wall, a bench and a braai with its chimney.',
      prompt: 'Draw the braai area in two-point perspective at 1:100, 45° / 45°.',
      setup: { sx: 196, d: 120, yPP: 76, yGL: 176, h: 40, theta: 45 },
      solids: [slab, wallL, braai, chimney, bench],
    });
  })();

  // 11. Bathroom interior at 45° / 45°  (1:100)
  (function () {
    const U = 56, V = 56, H = 28, F = SK.face;
    const room = [
      F([[0, 0, 0], [U, 0, 0], [U, V, 0], [0, V, 0]], { n: [0, 0, 1] }),     // floor
      F([[U, 0, 0], [U, V, 0], [U, V, H], [U, 0, H]], { n: [-1, 0, 0] }),    // right back wall
      F([[0, V, 0], [U, V, 0], [U, V, H], [0, V, H]], { n: [0, -1, 0] }),    // left back wall
    ];
    SK.openingAt(room, 2, [16, V, 14], [32, V, 22], 2.5);
    const bath = S.box(U - 14, 8, 0, U, 44, 8);
    const basin = S.box(6, V - 9, 0, 20, V, 12);
    const wc = S.box(28, V - 12, 0, 36, V, 6);
    const cistern = S.box(27, V - 4, 6, 37, V, 12);
    twoPoint({
      id: 'two-point-bathroom-interior', title: 'Two-Point: Bathroom Interior',
      summary: 'An interior in two-point: you look into the corner of a bathroom. The two back walls run to the two VPs; the bath, basin cabinet and WC are boxes found with rays and VP lines.',
      prompt: 'Draw the bathroom interior in two-point perspective at 1:100: the floor, the two back walls with the window, the bath, the basin cabinet and the WC.',
      setup: { sx: 196, d: 110, yPP: 74, yGL: 172, h: 20, theta: 45 },
      solids: [room, bath, basin, wc, cistern],
      notes: ['For an interior the near walls are left away, so you can see in: the corner of the floor nearest you touches PP.', '', '', 'You see the inside faces of the back walls.'],
    });
  })();

  // 12. Grade 12: a block with a semicircular end (curves in perspective)
  (function () {
    const L = 40, R = 16, N = 12;
    const arc = Array.from({ length: N + 1 }, (_, i) => { const t = (-90 + 180 * i / N) * Math.PI / 180; return [L + R * Math.cos(t), R + R * Math.sin(t)]; });
    const prof = [[0, 0], ...arc, [0, 2 * R]];
    const smooth = new Set(arc.map((_, i) => i + 1));
    twoPoint({
      id: 'two-point-curved-end', title: 'Curves in Perspective: Rounded-End Block (Gr 12)',
      summary: 'A curve is plotted point by point: divide the arc in the top view, send a visual ray to every point, and carry each point\'s heights along VP lines. The outline of the curved side is where the rays just touch the arc.',
      prompt: 'Draw the block with the semicircular end (straight part 40, R16, 24 high) in two-point perspective at 30° / 60°. Plot at least 7 points on the arc.',
      setup: { sx: 150, d: 112, yPP: 72, yGL: 168, h: 62, theta: 30 },
      solids: [S.extrude(prof, 'xy', 0, 24, smooth)],
      pointsText: 'Send a ray from SP to every division point on the arc, mark the PP crossings and drop a vertical from each.',
      notes: ['Divide the semicircle in the top view into equal parts.', '', 'Every arc point gets its own ray.', 'Join the points with smooth curves; the two outline lines of the curved side are where the rays touch the arc.'],
    });
  })();

  // ── Practice questions ──

  // ═══ More two-point exercises (JPEGD-volume pass, 2026-10-16) ═══
  twoPoint({
    id: 'two-point-stepped-block', title: 'Two-Point: Stepped Block at 30° / 60°',
    summary: 'A block with one step: the tread height is marked on the true-height line and carried round to the step along a VP line.',
    prompt: 'Draw the stepped block (54 x 34, 16 and 36 high) in two-point perspective at 30° / 60°.',
    setup: { sx: 150, d: 110, yPP: 70, yGL: 168, h: 62, theta: 30 },
    solids: [S.extrude([[0, 0], [54, 0], [54, 16], [26, 16], [26, 36], [0, 36]], 'xz', 0, 34)],
  });
  twoPoint({
    id: 'two-point-pedestal', title: 'Two-Point: Pedestal at 45° / 45°',
    summary: 'A base, a column and a cap on the same centre: none of the upper corners stand on the PP, so their heights come along VP lines.',
    prompt: 'Draw the pedestal (base 44 x 44 x 10, column 20 x 20 x 26, cap 30 x 30 x 8) in two-point perspective at 45° / 45°.',
    setup: { sx: 186, d: 108, yPP: 72, yGL: 170, h: 66, theta: 45 },
    solids: [S.box(0, 0, 0, 44, 44, 10), S.box(12, 12, 10, 32, 32, 36), S.box(7, 7, 36, 37, 37, 44)],
  });
  twoPoint({
    id: 'two-point-steps', title: 'Two-Point: Three Steps at 30° / 60°',
    summary: 'Three steps turned to the PP: each riser and tread recedes to its own VP.',
    prompt: 'Draw the three steps (each 12 high and 14 deep, 40 wide) in two-point perspective at 30° / 60°.',
    setup: { sx: 152, d: 110, yPP: 70, yGL: 168, h: 60, theta: 30 },
    solids: [S.extrude([[0, 0], [42, 0], [42, 36], [28, 36], [28, 24], [14, 24], [14, 12], [0, 12]], 'yz', 0, 40)],
  });
  twoPoint({
    id: 'two-point-cross', title: 'Two-Point: Cross-Shaped Block at 45° / 45°',
    summary: 'A cross-shaped block: many corners at different depths, each found with its own ray.',
    prompt: 'Draw the cross-shaped block (arms 16 wide, overall 48 x 48, 22 high) in two-point perspective at 45° / 45°.',
    setup: { sx: 186, d: 110, yPP: 72, yGL: 170, h: 60, theta: 45 },
    solids: [S.extrude([[16, 0], [32, 0], [32, 16], [48, 16], [48, 32], [32, 32], [32, 48], [16, 48], [16, 32], [0, 32], [0, 16], [16, 16]], 'xy', 0, 22)],
  });
  (function () {
    const shed = S.extrude([[0, 0], [40, 0], [40, 22], [0, 30]], 'xz', 0, 34);
    S.openingAt(shed, 0, [8, 0, 0], [17, 0, 21], 2.5);
    twoPoint({
      id: 'two-point-shed', title: 'Two-Point: Mono-Pitch Shed at 30° / 60°',
      summary: 'A shed with a roof sloping one way: the sloping roof edges are found by joining their two ends.',
      prompt: 'Draw the shed at 1:100 in two-point perspective at 30° / 60°: 4 m x 3.4 m, walls 2.2 m and 3 m high, with a door.',
      setup: { sx: 152, d: 118, yPP: 74, yGL: 176, h: 16, theta: 30 },
      solids: [shed],
    });
  })();

  const PRACTICE_QUESTIONS = [
    {
      text: 'How many vanishing points does two-point perspective use, and where must they sit?',
      options: ['Two, both on the horizon (eye-level) line', 'Two, one above and one below the horizon', 'Three, forming a triangle around the object', 'One, exactly like one-point perspective'],
      answer: 0,
      explanation: 'Two-point perspective uses exactly two vanishing points, VPL and VPR, and both always lie on the horizon line, since the horizon represents the viewer\'s own eye level.',
    },
    {
      text: 'Which single line in a two-point perspective drawing can be measured true-to-scale directly?',
      options: ['The corner vertical, at the object\'s nearest point to the viewer', 'Any horizontal line receding to either VP', 'The horizon line itself', 'Every vertical line in the drawing, regardless of position'],
      answer: 0,
      explanation: 'Only the corner vertical sits at the picture plane, where distances are still true to scale. Every other vertical is still vertical in direction, but must have its height transferred from the corner.',
    },
    {
      text: 'Why does erecting a vertical between two projectors that both go to the SAME vanishing point automatically give the correct box height at that depth?',
      options: [
        'Because both the top and bottom projector are foreshortened by exactly the same amount at any given depth along that VP',
        'It does not — a separate height-transfer step is always required',
        'Because vanishing points only affect horizontal measurements, never vertical ones',
        'Because the vertical is always drawn at true, unforeshortened height'],
      answer: 0,
      explanation: 'Since top and bottom projectors both converge toward the same VP, they are foreshortened identically at any chosen depth — so the vertical distance between them at that depth is automatically correct.',
    },
    {
      text: 'A chimney is taller than the rest of the box. What is the correct way to find its true perspective height at a point partway along a receding base edge?',
      options: [
        'Mark the new true height on the corner vertical, draw a new line from there to the same VP, then erect a vertical at the point up to that new line',
        'Simply estimate the extra height by eye and extend the vertical upward',
        'Use the OTHER vanishing point instead of the one the base edge converges to',
        'True heights can only ever be found at the corner vertical itself, nowhere else'],
      answer: 0,
      explanation: 'The corner vertical is the only true-height measuring line. A new height is marked there, receded to the same VP as the target point\'s base edge, and the crossing point gives the correct foreshortened height.',
    },
    {
      text: 'How is the exact centre of a receding face found in perspective, when a simple eye-measured midpoint would be wrong?',
      options: [
        'By drawing both diagonals of the face and marking where they cross',
        'By measuring the face with a ruler directly on the finished drawing',
        'By using the horizon line as a reference for the centre',
        'The centre of a receding face cannot be found accurately at all'],
      answer: 0,
      explanation: 'The two diagonals of any quadrilateral cross exactly at its centre — this holds true even for a foreshortened, receding face in perspective, unlike a naive eye-measured halfway point.',
    },
    {
      text: 'In a "worm\'s-eye" two-point perspective view, where does the horizon sit relative to the object, and what happens to the top face?',
      options: [
        'The horizon sits BELOW the whole object, and the top face disappears from view entirely',
        'The horizon sits ABOVE the object, revealing more of the top face',
        'The horizon passes through the object\'s exact centre',
        'Worm\'s-eye views do not use a horizon line at all'],
      answer: 0,
      explanation: 'A worm\'s-eye view means looking steeply upward at the object, which happens when the horizon is placed below it — from that angle, the top face is hidden and both top edges slope upward toward their vanishing points.',
    },
    {
      text: 'What is the purpose of the "true-height" line drawn from a marked point on the corner vertical toward a vanishing point?',
      options: [
        'It shows the correctly foreshortened version of that exact height at every depth along that line',
        'It marks the position of the horizon for that particular feature',
        'It is only a construction aid with no meaning in the final drawing',
        'It represents the true WIDTH of the object, not its height'],
      answer: 0,
      explanation: 'Once a true height is marked on the corner (the only true-scale reference), receding that point to a VP produces a line showing that same height, correctly foreshortened, at any depth position along it.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'two-point-block', 'two-point-l-block', 'two-point-sloped-block', 'two-point-hex-prism',
    'two-point-t-model', 'two-point-stepped-block', 'two-point-pedestal', 'two-point-steps', 'two-point-cross', 'two-point-shed', 'two-point-gable-house', 'two-point-hip-veranda', 'two-point-house-garage',
    'two-point-double-storey', 'two-point-braai-area', 'two-point-bathroom-interior', 'two-point-curved-end',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
