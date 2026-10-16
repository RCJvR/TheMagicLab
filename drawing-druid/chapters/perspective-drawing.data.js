// Perspective Drawing — Grade 10: one-point perspective by the plan (measured) method.
// Requires engine-geometry.js, perspective-kit.js and solid-kit.js loaded first.
(function (global) {
  'use strict';
  const K = global.PerspectiveKit;
  const SK = global.SolidKit;
  const CONSTRUCTIONS = {};

  const lbl = (at, text, anchor, size, color) => ({ kind: 'label', at, text, size: size || 3.4, anchor: anchor || 'middle', color: color || '#94a3b8' });
  const near0 = x => Math.abs(x) < 1e-6;
  const keyUV = (u, v) => u.toFixed(2) + ',' + v.toFixed(2);

  // One exercise, built from a 3D model the way the workbooks set it out: the top view on
  // PP, SP, GL, HL and the VP above SP, the front view standing on GL, the front face drawn
  // true size on PP, visual rays and drops for depth, lines to the VP, and the finished
  // drawing with hidden edges left out.
  function onePoint(cfg) {
    const P = K.setup(Object.assign({ theta: 0 }, /interior/.test(cfg.id) ? cfg.setup : K.eyeAbove(cfg.setup, cfg.solids)));
    const VP = P.vps.VP;
    const view = SK.perspView(P);
    const fin = SK.hlr(cfg.solids, view);
    const planView = { toViewer: () => [0, 0, 1], distance: () => Infinity, project: p => P.plan(p[0], p[1]) };
    const plan = SK.draw(cfg.planSolids || cfg.solids, planView, { hidden: true });
    let uMin = Infinity, uMax = -Infinity, zMax = 0, vTop = 0;
    (cfg.planSolids || cfg.solids).forEach(s => s.forEach(f => f.pts.forEach(p => { vTop = Math.max(vTop, p[1]); })));
    cfg.solids.forEach(s => s.forEach(f => f.pts.forEach(p => { uMin = Math.min(uMin, p[0]); uMax = Math.max(uMax, p[0]); zMax = Math.max(zMax, p[2]); })));
    const side = cfg.elevSide || 'left';
    const ex = side === 'left' ? P.cx + uMin - (uMax - uMin) - (cfg.elevGap || 22) : P.cx + uMax + (cfg.elevGap || 22) - uMin;
    const elevView = { toViewer: () => [0, -1, 0], distance: () => Infinity, project: p => [ex + p[0] - uMin, P.yGL - p[2]] };
    const elev = SK.draw(cfg.solids, elevView, { hidden: true });
    const x0 = Math.min(ex, P.cx + uMin) - 16, x1 = Math.max(ex + uMax - uMin, P.sx, P.cx + uMax) + 16;

    const isOp = K.openingTest(cfg.solids);
    const frontAll = fin.visible.filter(([p, q]) => near0(p[1]) && near0(q[1]));
    const restAll = fin.visible.filter(([p, q]) => !(near0(p[1]) && near0(q[1])));
    // doors and windows are drawn last, after the building itself
    const front = frontAll.filter(s => !isOp(s)), frontOps = frontAll.filter(isOp);
    const rest = restAll.filter(s => !isOp(s)), restOps = restAll.filter(isOp);
    // depth points: every visible corner behind PP, one ray per plan position. Corners that
    // stand on the ground (a base corner exists below them) come first; roof points,
    // openings and other details second.
    // "ground" = the lowest level any visible corner behind PP is at (usually GL)
    let zLow = Infinity;
    rest.forEach(seg => seg.forEach(p => { if (p[1] > 1e-6 || Math.abs(p[0]) + Math.abs(p[1]) > 1e-6) zLow = Math.min(zLow, p[2]); }));
    const depth = new Map();
    rest.forEach(seg => seg.forEach(p => {
      if (p[1] <= 1e-6) return;
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
    restOps.forEach(seg => seg.forEach(p => {
      if (p[1] <= 1e-6) return;
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
    const recFront = new Map();
    rest.forEach(([p, q]) => {
      const recedes = Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[2] - q[2]) < 1e-6 && Math.abs(p[1] - q[1]) > 1e-6;
      if (!recedes) return;
      const f = p[1] < q[1] ? p : q;
      if (near0(f[1])) recFront.set(keyUV(f[0], f[2]), f);
    });
    const frontZ = [...new Set(front.flatMap(s => s.map(p => +p[2].toFixed(3))))].filter(z => z > 1e-6);
    const frontU = [...new Set(front.flatMap(s => s.map(p => +p[0].toFixed(3))))];
    const line = (a, b, t) => ({ kind: 'line', p1: a, p2: b, lineType: t || 'construction' });
    const isVert = ([p, q]) => Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;
    const isLevel = ([p, q]) => Math.abs(p[2] - q[2]) < 1e-6;
    const notes = cfg.notes || [];
    const n = s => (s ? ' ' + s : '');
    const ray = d => line(P.SP, P.plan(d.u, d.v));
    const drop = d => line(P.onPP(d.u, d.v), P.persp(d.u, d.v, d.zTop));
    const A = segs => segs.map(([p, q]) => line(view.project(p), view.project(q), 'A'));
    const mid = (u, v, z) => P.persp(u, v, z);

    const steps = [
      { t: 'GIVEN (these are on the question sheet, you do not draw them): the picture plane PP with the TOP VIEW, its front edge ON the PP; the station point SP; the ground line GL with the FRONT VIEW; and the horizon line HL at eye height' + (/interior/.test(cfg.id) ? '.' : ', above the object, so the drawing looks down onto it.') + n(notes[0]),
        at: P.plan((uMin + uMax) / 2, 0),
        r: [
          { kind: 'line', p1: [x0, P.yPP], p2: [x1, P.yPP], lineType: 'B' },
          { kind: 'label', at: [x0 - 2, P.yPP - 1], text: 'PP', size: 3.6, anchor: 'end', color: '#e8eaf2' },
          { kind: 'label', at: [x0 - 2, P.yPP + 5.5], text: 'PV', size: 3.6, anchor: 'end', color: '#e8eaf2' },
          ...plan,
          lbl([P.plan((uMin + uMax) / 2, 0)[0], P.yPP - Math.max(cfg.planDepth || 0, vTop) - 6], 'TOP VIEW / BO-AANSIG'),
          ...K.spMark(P),
          { kind: 'line', p1: [x0, P.yGL], p2: [x1, P.yGL], lineType: 'B' },
          { kind: 'label', at: [x0 - 2, P.yGL + 1.3], text: 'GL', size: 3.6, anchor: 'end', color: '#e8eaf2' },
          ...elev, lbl([ex + (uMax - uMin) / 2, P.yGL + 7], 'FRONT VIEW / VOORAANSIG'),
          { kind: 'line', p1: [x0, P.yHL], p2: [x1, P.yHL], lineType: 'B' },
          { kind: 'label', at: [x0 - 2, P.yHL + 1.3], text: 'HL', size: 3.6, anchor: 'end', color: '#e8eaf2' },
        ] },
      { t: 'Find the vanishing point: draw a line straight up from SP. Where it meets HL is the vanishing point VP.',
        at: VP,
        r: [line(P.SP, VP), { kind: 'point', at: VP, label: 'VP', size: 1.3 }] },
      { t: 'The front face lies on the PP, so it is true size. Drop its widths straight down from the top view.',
        at: P.persp((uMin + uMax) / 2, 0, 0),
        r: frontU.map(u => line(P.plan(u, 0), P.persp(u, 0, 0))) },
      { t: 'Project its heights across from the front view, and draw the front face with Type A lines.' + n(notes[1]),
        at: P.persp((uMin + uMax) / 2, 0, zMax / 2),
        r: [
          ...frontZ.map(z => line(side === 'left' ? [ex + uMax - uMin, P.yGL - z] : [ex, P.yGL - z], P.persp(side === 'left' ? uMin : uMax, 0, z))),
          ...A(front),
        ] },
      { t: 'Draw visual rays from SP to the corners of the OUTLINE of the top view that stand on the ground behind the PP. Mark where each ray crosses the PP.' + n(notes[2]),
        at: dOuter.length ? P.onPP(dOuter[0].u, dOuter[0].v) : VP,
        r: [...dOuter.map(ray), ...dOuter.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 }))] },
      { t: 'From each crossing, drop a vertical line down into the drawing.',
        at: dOuter.length ? P.onPP(dOuter[0].u, dOuter[0].v) : VP,
        r: dOuter.map(drop) },
      { t: 'Now the other points on the ground INSIDE the outline (for example the foot of a doorway, a column, a braai or a counter): rays to them, with the PP crossings marked.',
        at: dInner.length ? P.onPP(dInner[0].u, dInner[0].v) : VP,
        r: [...dInner.map(ray), ...dInner.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 }))] },
      { t: 'Drop verticals from these crossings.',
        at: dInner.length ? P.onPP(dInner[0].u, dInner[0].v) : VP,
        r: dInner.map(drop) },
      ...clusters.map((cl, i) => ({
        t: cfg.pointsText || ((i === 0 ? 'Openings one at a time. ' : 'The next opening. ') + 'Send rays from SP to the corners of this opening (its sides and the inside corners of the reveal), mark the PP crossings and drop verticals from them.'),
        at: P.onPP(cl[0].u, cl[0].v),
        r: [...cl.map(ray), ...cl.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 })), ...cl.map(drop)],
      })),
      { t: 'Rays from SP to the points above the walls: ridge ends, hips, the chimney, raised parts. Mark their PP crossings.',
        at: dUp.length ? P.onPP(dUp[0].u, dUp[0].v) : VP,
        r: [...dUp.map(ray), ...dUp.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 }))] },
      { t: 'Drop verticals from these crossings too.',
        at: dUp.length ? P.onPP(dUp[0].u, dUp[0].v) : VP,
        r: dUp.map(drop) },
      { t: 'Join the corners of the front face to the VP. Every edge that runs straight back lies on one of these lines.',
        at: VP,
        r: [...recFront.values()].map(p => line(view.project(p), VP)) },
      { t: 'Where the VP lines cut the dropped verticals are the corners further back. Draw the visible vertical edges there.',
        at: mid((uMin + uMax) / 2, 10, zMax / 2),
        r: A(rest.filter(isVert)) },
      { t: 'Draw the edges that run straight back, along the VP lines, between the corners you have found. Hidden edges are left out.' + n(notes[3]),
        at: mid((uMin + uMax) / 2, 10, zMax),
        r: A(rest.filter(s => !isVert(s) && isLevel(s) && Math.abs(s[0][0] - s[1][0]) < 1e-6)) },
      { t: 'Draw the horizontal edges further back: they stay parallel to the PP, so they are drawn level.',
        at: mid((uMin + uMax) / 2, 20, zMax),
        r: A(rest.filter(s => !isVert(s) && isLevel(s) && Math.abs(s[0][0] - s[1][0]) >= 1e-6 && Math.abs(s[0][1] - s[1][1]) < 1e-6)) },
      { t: 'Any other level edges (curves, slanting walls in plan): plot them by their end points.',
        at: mid((uMin + uMax) / 2, 20, zMax),
        r: A(rest.filter(s => !isVert(s) && isLevel(s) && Math.abs(s[0][0] - s[1][0]) >= 1e-6 && Math.abs(s[0][1] - s[1][1]) >= 1e-6)) },
      { t: 'Then the sloping edges (roof slopes, hips, the spire): they do not go to the VP, so join their end points.',
        at: mid((uMin + uMax) / 2, 10, zMax),
        r: A(rest.filter(s => !isVert(s) && !isLevel(s))) },
      { t: 'DOORS AND WINDOWS LAST. Those in the front face lie on the PP, so they are true size: drop their widths from the top view and project their heights across from the front view.',
        at: frontOps.length ? view.project(frontOps[0][0]) : VP,
        r: A(frontOps) },
      ...opClusters.map((cl, i) => ({
        t: (i === 0 ? 'Doors and windows further back, one at a time: ' : 'The next opening: ') + 'rays from SP to its corners (its sides and the inside corners of the reveal), the PP crossings, and verticals dropped from them.',
        at: P.onPP(cl[0].u, cl[0].v),
        r: [...cl.map(ray), ...cl.map(d => ({ kind: 'point', at: P.onPP(d.u, d.v), size: 0.8 })), ...cl.map(drop)],
      })),
      { t: 'Draw these openings: their vertical edges, and the edges of the reveals that run back to the VP.',
        at: restOps.length ? view.project(restOps[0][0]) : VP,
        r: A(restOps.filter(s => isVert(s) || (isLevel(s) && Math.abs(s[0][0] - s[1][0]) < 1e-6))) },
      { t: 'Finish the openings with their level edges: the sills and the heads.',
        at: restOps.length ? view.project(restOps[0][1]) : VP,
        r: A(restOps.filter(s => !isVert(s) && !(isLevel(s) && Math.abs(s[0][0] - s[1][0]) < 1e-6))) },
    ].filter(s => s.r.length);

    CONSTRUCTIONS[cfg.id] = {
      id: cfg.id, title: cfg.title, summary: cfg.summary, workbookPrompt: cfg.prompt,
      printLayout: 'full', bounds: { w: x1 - x0, h: 200 },
      steps: steps.map((s, i) => ({ id: i + 1, instruction: s.t, calloutAt: s.at, reveals: s.r })),
    };
  }

  const S = SK;

  // Course Drawings page: export the builder and stop before this chapter's own exercises.
  global.DDBuild = Object.assign(global.DDBuild || {}, { onePoint: cfg => { onePoint(cfg); return CONSTRUCTIONS[cfg.id]; } });
  if (global.DD_BUILDERS_ONLY) return;

  // 1. Block
  onePoint({
    id: 'one-point-block', title: 'One-Point: Rectangular Block',
    summary: 'The basic one-point set-up with a plain block: front face true size on PP, depth by visual rays, receding edges to the single VP.',
    prompt: 'Draw the block (40 x 30 x 30) in one-point perspective. Its front face lies on PP; SP and HL are as shown.',
    setup: { sx: 115, d: 110, yPP: 62, yGL: 150, h: 48, cx: 50 },
    solids: [S.box(0, 0, 0, 40, 30, 30)],
    notes: ['', '', 'For a block, the two back corners are enough.', ''],
  });

  // 2. Notched block (a channel)
  onePoint({
    id: 'one-point-notched-block', title: 'One-Point: Block with a Notch',
    summary: 'A block with a rectangular notch cut into its top: the notch\'s inner edges recede to the same VP and stop at the depth given by their rays.',
    prompt: 'Draw the notched block in one-point perspective from the top view and front view given.',
    setup: { sx: 122, d: 112, yPP: 62, yGL: 150, h: 52, cx: 50 },
    solids: [S.extrude([[0, 0], [50, 0], [50, 30], [35, 30], [35, 16], [15, 16], [15, 30], [0, 30]], 'xz', 0, 30)],
    notes: ['', 'The notch is part of the front face, so it is true size too.', '', 'Look carefully at which inner edges of the notch you can see from SP.'],
  });

  // 3. Stepped block
  onePoint({
    id: 'one-point-stepped-block', title: 'One-Point: Stepped Block',
    summary: 'A block with a step: the tread and the top of the upright both run back to the one VP.',
    prompt: 'Draw the stepped block in one-point perspective from the top view and front view given.',
    setup: { sx: 128, d: 115, yPP: 62, yGL: 152, h: 55, cx: 48 },
    solids: [S.extrude([[0, 0], [56, 0], [56, 16], [28, 16], [28, 36], [0, 36]], 'xz', 0, 34)],
  });

  // 4. Block with an opening right through it
  (function () {
    const b = S.box(0, 0, 0, 50, 24, 40);
    S.openingAt(b, 2, [15, 0, 10], [35, 0, 30], 24, { through: true });
    onePoint({
      id: 'one-point-frame', title: 'One-Point: Frame with an Opening',
      summary: 'A square opening runs right through the block. Its inside faces show the thickness: the back edges of the opening are found with rays like any other corner.',
      prompt: 'Draw the frame (50 x 24 x 40, with a 20 x 20 opening right through it) in one-point perspective.',
      setup: { sx: 120, d: 110, yPP: 60, yGL: 152, h: 30, cx: 46 },
      solids: [b],
      notes: ['', '', 'The opening\'s back corners need rays too.', 'Through the opening you see some of its inside faces: this is how wall thickness shows at doors and windows.'],
    });
  })();

  // 5. Stacked blocks
  onePoint({
    id: 'one-point-stacked-blocks', title: 'One-Point: Stacked Blocks',
    summary: 'A smaller block set back on top of a larger one. The top block does not touch PP, so its heights are carried back from the front face along lines to the VP.',
    prompt: 'Draw the two stacked blocks in one-point perspective from the top view and front view given.',
    setup: { sx: 122, d: 112, yPP: 62, yGL: 152, h: 60, cx: 46 },
    solids: [S.box(0, 0, 0, 52, 36, 16), S.box(12, 8, 16, 36, 28, 34)],
    notes: ['', 'Only the lower block touches the PP. Mark the top block\'s height (34) on the front face anyway: from there it runs back to the VP.', '', ''],
  });

  // 6. Gable-ended house with a door and a window (scale 1:100)
  (function () {
    const house = S.extrude([[0, 0], [60, 0], [60, 26], [30, 40], [0, 26]], 'xz', 0, 46);
    S.openingAt(house, 0, [12, 0, 0], [21, 0, 21], 2.5);                 // door, front gable
    S.openingAt(house, 0, [36, 0, 9], [50, 0, 19], 2.5);                 // window, front gable
    S.openingAt(house, 3, [60, 16, 9], [60, 32, 19], 2.5);               // window, right wall
    onePoint({
      id: 'one-point-gable-house', title: 'One-Point: House with a Gable End',
      summary: 'A gable-ended house on PP with a door and windows. The wall thickness (250 mm at 1:100) shows as a narrow reveal inside each opening.',
      prompt: 'Draw the house in one-point perspective at 1:100. Show the wall thickness at the door and the windows.',
      setup: { sx: 128, d: 125, yPP: 70, yGL: 172, h: 18, cx: 50 },
      planDepth: 46,
      solids: [house],
      notes: ['The top view shows the walls and the ridge line.', 'The door and the gable window lie on the PP: draw them true size.', 'Include rays to the ends of the side window.', 'Inside each opening, the reveal (the wall thickness) recedes to the VP as well.'],
    });
  })();

  // 7. Hipped-roof house
  (function () {
    const walls = S.box(0, 0, 0, 64, 40, 26);
    S.openingAt(walls, 2, [10, 0, 0], [19, 0, 21], 2.5);
    S.openingAt(walls, 2, [30, 0, 9], [54, 0, 19], 2.5);
    S.openingAt(walls, 5, [64, 12, 9], [64, 28, 19], 2.5);
    const roof = S.hipRoof(-4, -4, 68, 44, 26, 42);
    onePoint({
      id: 'one-point-hip-house', title: 'One-Point: House with a Hipped Roof',
      summary: 'A hipped roof overhangs the walls on all four sides, so the roof\'s front eaves sit IN FRONT of the PP and the walls behind it are partly hidden in the top view.',
      prompt: 'Draw the house with the hipped roof in one-point perspective at 1:100. The front wall lies on PP; the roof overhangs 400 mm all round.',
      setup: { sx: 130, d: 128, yPP: 74, yGL: 176, h: 14, cx: 50 },
      planDepth: 48,
      solids: [walls, roof],
      notes: ['In the top view the walls under the roof overhang are hidden: broken lines.', 'The front wall and its door and window lie on PP. The eaves overhang in front of PP, so they come out slightly larger.', 'Send rays to the hip and ridge ends as well as to the wall corners.', 'The hips run from the corners of the eaves up to the ends of the ridge.'],
    });
  })();

  // 8. House with an attached garage
  (function () {
    const house = S.extrude([[0, 0], [44, 0], [44, 26], [22, 38], [0, 26]], 'xz', 0, 50);
    S.openingAt(house, 0, [8, 0, 9], [20, 0, 19], 2.5);
    S.openingAt(house, 0, [26, 0, 0], [35, 0, 21], 2.5);
    const garage = S.box(44, 0, 0, 74, 34, 24);
    S.openingAt(garage, 2, [48, 0, 0], [70, 0, 20], 2.5);
    onePoint({
      id: 'one-point-house-garage', title: 'One-Point: House and Garage',
      summary: 'A gable-ended house with a flat-roofed garage against it. The garage hides part of the house; work out which edges you can and cannot see from SP.',
      prompt: 'Draw the house and garage in one-point perspective at 1:100. Show the wall thickness at all openings.',
      setup: { sx: 128, d: 130, yPP: 74, yGL: 176, h: 20, cx: 30 },
      planDepth: 50,
      solids: [house, garage],
      notes: ['', 'The house gable and the garage door are both on PP.', '', 'The garage roof hides the bottom of the house\'s side wall.'],
    });
  })();

  // 9. Entertainment area: roof slab on columns, back wall and a braai with chimney
  (function () {
    const slab = S.box(0, 0, 0, 70, 40, 2);
    const back = S.box(0, 36, 2, 70, 40, 28);
    const colL = S.box(0, 0, 2, 3, 3, 28), colR = S.box(67, 0, 2, 70, 3, 28);
    const roof = S.box(-2, -2, 28, 72, 40, 31);
    const braai = S.box(44, 26, 2, 64, 36, 14);
    S.openingAt(braai, 2, [48, 26, 4], [60, 26, 11], 6);
    const chimney = S.box(49, 30, 14, 59, 36, 40);
    onePoint({
      id: 'one-point-entertainment-area', title: 'One-Point: Entertainment Area with a Braai',
      summary: 'A covered patio: floor slab, two columns, a back wall, a braai with its chimney through the roof, and a flat roof slab. The eye is below the roof, so you see its underside.',
      prompt: 'Draw the entertainment area in one-point perspective at 1:100. The front of the roof slab lies on PP.',
      setup: { sx: 105, d: 130, yPP: 70, yGL: 172, h: 16, cx: 40 },
      planDepth: 42,
      solids: [slab, back, colL, colR, roof, braai, chimney],
      notes: ['The top view shows only the roof and the chimney; everything under the roof is hidden.', 'The roof edge and the two columns are on PP.', 'Rays go to the back wall, the braai and the chimney corners.', 'The HL is above the roof, so you look down onto the roof slab, with the chimney standing on it.'],
    });
  })();

  // 10. Church with a tower
  (function () {
    const tower = S.box(16, 0, 0, 34, 16, 46);
    S.openingAt(tower, 2, [21, 0, 0], [29, 0, 18], 2.5);
    const spire = S.poly([
      [[16, 0, 46], [34, 0, 46], [25, 8, 62]], [[34, 0, 46], [34, 16, 46], [25, 8, 62]],
      [[34, 16, 46], [16, 16, 46], [25, 8, 62]], [[16, 16, 46], [16, 0, 46], [25, 8, 62]],
      [[16, 0, 46], [16, 16, 46], [34, 16, 46], [34, 0, 46]],
    ]);
    const nave = S.extrude([[0, 0], [50, 0], [50, 24], [25, 38], [0, 24]], 'xz', 16, 66);
    onePoint({
      id: 'one-point-church', title: 'One-Point: Chapel with a Tower',
      summary: 'A square tower with a pyramid roof stands in front of a gable-ended nave. The tower front is on PP; the nave starts further back, so all its heights are carried back to it.',
      prompt: 'Draw the chapel in one-point perspective at 1:100. The front of the tower lies on PP.',
      setup: { sx: 70, d: 140, yPP: 82, yGL: 186, h: 22, cx: 20 },
      planDepth: 66,
      solids: [tower, spire, nave],
      notes: ['', 'Only the tower front is on PP. Mark the nave\'s wall and ridge heights on the tower front too: they run back along lines to the VP until the rays to the nave\'s corners cut them.', 'The pyramid\'s apex sits over the centre of the tower: it needs its own ray.', ''],
    });
  })();

  // 11. Interior: a kitchen with an island, seen through the front of the room
  (function () {
    const W = 70, D = 50, H = 28;
    const F = SK.face;
    const room = [
      F([[0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0]], { n: [0, 0, 1] }),            // floor
      F([[0, 0, H], [0, D, H], [W, D, H], [W, 0, H]], { n: [0, 0, -1] }),           // ceiling
      F([[0, 0, 0], [0, D, 0], [0, D, H], [0, 0, H]], { n: [1, 0, 0] }),            // left wall
      F([[W, D, 0], [W, 0, 0], [W, 0, H], [W, D, H]], { n: [-1, 0, 0] }),           // right wall
      F([[0, D, 0], [W, D, 0], [W, D, H], [0, D, H]], { n: [0, -1, 0] }),           // back wall
    ];
    SK.openingAt(room, 4, [24, D, 12], [46, D, 22], 2.5);                            // window over the counter
    const counter = S.box(0, D - 6, 0, W, D, 9);
    const island = S.box(24, 20, 0, 46, 30, 9);
    const shelf = S.box(0, 10, 0, 6, D - 6, 9);
    onePoint({
      id: 'one-point-kitchen-interior', title: 'One-Point: Kitchen Interior',
      summary: 'An interior view: the PP is the open front of the room, so you look into it. The floor, ceiling, side walls and back wall all run to the one VP, with the counters and island found the same way.',
      prompt: 'Draw the kitchen interior in one-point perspective at 1:100: the room, the counter along the back wall with the window above it, the side counter on the left and the island.',
      setup: { sx: 35 + 40, d: 105, yPP: 72, yGL: 165, h: 16, cx: 40 },
      planDepth: 50,
      solids: [room, counter, island, shelf],
      planSolids: [room.filter(f => f.n[2] > -0.5), counter, island, shelf],      // no ceiling in the top view
      notes: ['For an interior, the room\'s open front lies on the PP and SP is in front of it, roughly in the middle.', 'The front edges of the floor, walls and ceiling are on PP: the front of the room is a true-size rectangle.', '', 'You are looking INTO the room: you see the inside of the walls, floor and ceiling. The back wall is drawn true shape but smaller, because it is further away.'],
    });
  })();

  // ── 4. Bird's-eye, natural and worm's-eye: the eye height decides the view ──
  (function () {
    const W = 30, D = 30, H = 24;
    const views = [
      { name: 'BIRD\'S-EYE', h: 60, cx: 0 },
      { name: 'NATURAL', h: 12, cx: 75 },
      { name: 'WORM\'S-EYE', h: -14, cx: 150 },
    ];
    const yPP = 40, yGL = 135, d = 90;
    const steps = views.map((vw, i) => {
      const P = K.setup({ sx: vw.cx + W + 12, d, yPP, yGL, h: vw.h, theta: 0, cx: vw.cx });
      const faces = K.extrude([[0, 0], [W, 0], [W, H], [0, H]], 'uz', 0, D);
      const edges = K.visibleEdges(P, faces);
      const VP = P.vps.VP;
      const reveals = [
        { kind: 'polygon', points: [P.plan(0, 0), P.plan(W, 0), P.plan(W, D), P.plan(0, D)], lineType: 'A' },
        { kind: 'line', p1: [vw.cx - 6, P.yHL], p2: [vw.cx + W + 22, P.yHL], lineType: 'B' },
        { kind: 'point', at: VP, label: 'VP', size: 1.1 },
        ...[[0, 0], [W, 0], [W, H], [0, H]].map(([u, z]) => ({ kind: 'line', p1: P.persp(u, 0, z), p2: VP, lineType: 'construction' })),
        ...K.perspLines(P, edges, 'A'),
        { kind: 'label', at: [vw.cx + W / 2, yPP - D - 9], text: vw.name, size: 3.6, anchor: 'middle', color: '#fde047' },
        { kind: 'label', at: [vw.cx + W / 2, yPP - D - 4], text: 'eye ' + (vw.h >= 0 ? vw.h + ' mm above GL' : (-vw.h) + ' mm below GL'), size: 3, anchor: 'middle', color: '#94a3b8' },
      ];
      const instr = [
        'BIRD\'S-EYE VIEW: the eye (and so the HL) is well ABOVE the block. Every receding edge runs UP to the VP, and you see the top of the block.',
        'NATURAL VIEW: the HL passes through the block, at a person\'s eye height. Edges above the HL run down to the VP, edges below it run up; you see neither the top nor the bottom.',
        'WORM\'S-EYE VIEW: the HL is BELOW the ground line, as if looking up from below. Receding edges run DOWN to the VP and you see the underside.',
      ][i];
      return { id: i + 1, instruction: instr, calloutAt: P.persp(W, D, H), reveals };
    });
    CONSTRUCTIONS['viewpoint-comparison'] = {
      id: 'viewpoint-comparison', title: 'Bird’s-Eye, Natural & Worm’s-Eye',
      summary: 'The same block, the same station point distance, three eye heights: only the height of the horizon line changes the view.',
      bounds: { w: 230, h: 160 },
      workbookPrompt: 'Draw the same 30 x 30 x 24 block three times in one-point perspective, changing only the eye height: 60 mm above GL, 12 mm above GL and 14 mm below GL.',
      steps: [
        {
          id: 1, instruction: 'Draw the PP and GL across the sheet, and the three top views on PP, spaced apart. Each block gets its own SP and VP, at the same distance in front of PP.',
          calloutAt: [100, yPP],
          reveals: [
            { kind: 'line', p1: [-10, yPP], p2: [215, yPP], lineType: 'B' }, { kind: 'label', at: [-12, yPP + 1.3], text: 'PP', size: 3.6, anchor: 'end', color: '#e8eaf2' },
            { kind: 'line', p1: [-10, yGL], p2: [215, yGL], lineType: 'B' }, { kind: 'label', at: [-12, yGL + 1.3], text: 'GL', size: 3.6, anchor: 'end', color: '#e8eaf2' },
          ],
        },
        ...steps.map((s, i) => Object.assign(s, { id: i + 2 })),
      ],
    };
  })();

  // ── Practice questions ──

  // ═══ More one-point exercises (JPEGD-volume pass, 2026-10-16) ═══
  onePoint({
    id: 'one-point-l-block', title: 'One-Point: L-Block',
    summary: 'An L-shaped block with its L-shaped face on the PP: the face is true size and every corner recedes to the one VP.',
    prompt: 'Draw the L-block (56 x 30 x 40) in one-point perspective. Its L-shaped face lies on PP.',
    setup: { sx: 122, d: 112, yPP: 62, yGL: 152, h: 54, cx: 48 },
    solids: [S.extrude([[0, 0], [56, 0], [56, 14], [18, 14], [18, 40], [0, 40]], 'xz', 0, 30)],
  });
  onePoint({
    id: 'one-point-back-step', title: 'One-Point: Block Stepped Up at the Back',
    summary: 'The step rises towards the back, so the front face is low and the high part is found by carrying its height back along the side.',
    prompt: 'Draw the block (50 x 40, 14 high at the front and 32 high at the back half) in one-point perspective. Its front face lies on PP.',
    setup: { sx: 120, d: 112, yPP: 62, yGL: 152, h: 54, cx: 46 },
    solids: [S.extrude([[0, 0], [40, 0], [40, 32], [20, 32], [20, 14], [0, 14]], 'yz', 0, 50)],
  });
  onePoint({
    id: 'one-point-bench', title: 'One-Point: Bench',
    summary: 'A bench: two legs and a seat. The space under the seat shows the inside faces of the legs receding to the VP.',
    prompt: 'Draw the bench (60 long, 26 deep, 26 high, legs 10 thick, seat 8 thick) in one-point perspective with its front on PP.',
    setup: { sx: 124, d: 112, yPP: 62, yGL: 152, h: 48, cx: 44 },
    solids: [S.extrude([[0, 0], [10, 0], [10, 18], [50, 18], [50, 0], [60, 0], [60, 26], [0, 26]], 'xz', 0, 26)],
    notes: ['', 'The opening under the seat is part of the front face: draw it true size.', '', 'Under the seat you see the inside face of the left-hand leg.'],
  });
  onePoint({
    id: 'one-point-steps', title: 'One-Point: Three Steps',
    summary: 'Three steps seen from the side, the profile on the PP: each tread and riser recedes to the VP.',
    prompt: 'Draw the three steps (each 14 high and 14 deep, 44 wide) in one-point perspective. The stepped side lies on PP.',
    setup: { sx: 118, d: 112, yPP: 62, yGL: 152, h: 52, cx: 46 },
    solids: [S.extrude([[0, 0], [42, 0], [42, 42], [28, 42], [28, 28], [14, 28], [14, 14], [0, 14]], 'xz', 0, 44)],
  });
  onePoint({
    id: 'one-point-pedestal', title: 'One-Point: Pedestal',
    summary: 'A base, a column and a cap, the column set back from the front: its height is marked on the front face and carried back to where it stands.',
    prompt: 'Draw the pedestal (base 50 x 40 x 10, column 22 x 16 x 26 set 12 back, cap 32 x 24 x 8) in one-point perspective.',
    setup: { sx: 120, d: 112, yPP: 62, yGL: 152, h: 62, cx: 46 },
    solids: [S.box(0, 0, 0, 50, 40, 10), S.box(14, 12, 10, 36, 28, 36), S.box(9, 8, 36, 41, 32, 44)],
  });
  onePoint({
    id: 'one-point-cross', title: 'One-Point: Cross-Shaped Block',
    summary: 'A block that is cross-shaped in plan: only the front arm touches the PP, the side arms are set back.',
    prompt: 'Draw the cross-shaped block (arms 18 wide, overall 54 x 54, 20 high) in one-point perspective. The front arm touches PP.',
    setup: { sx: 122, d: 112, yPP: 60, yGL: 152, h: 50, cx: 44 },
    solids: [S.extrude([[18, 0], [36, 0], [36, 18], [54, 18], [54, 36], [36, 36], [36, 54], [18, 54], [18, 36], [0, 36], [0, 18], [18, 18]], 'xy', 0, 20)],
  });
  (function () {
    const shed = S.extrude([[0, 0], [44, 0], [44, 24], [0, 32]], 'xz', 0, 36);
    S.openingAt(shed, 0, [8, 0, 0], [17, 0, 21], 2.5);
    S.openingAt(shed, 0, [26, 0, 10], [38, 0, 18], 2.5);
    onePoint({
      id: 'one-point-shed', title: 'One-Point: Garden Shed with a Mono-Pitch Roof',
      summary: 'A shed whose roof slopes one way: the front gable is true size on PP, and the roof edges recede to the VP.',
      prompt: 'Draw the shed at 1:100 in one-point perspective: 4.4 m wide, 3.6 m deep, walls 2.4 m high at the right and 3.2 m at the left, with a door and a window in the front.',
      setup: { sx: 118, d: 120, yPP: 66, yGL: 166, h: 18, cx: 46 },
      planDepth: 36,
      solids: [shed],
      notes: ['', 'The door and window lie on PP: true size.', '', 'Inside the openings the wall thickness recedes to the VP.'],
    });
  })();
  (function () {
    const kennel = S.extrude([[0, 0], [36, 0], [36, 20], [18, 32], [0, 20]], 'xz', 0, 40);
    S.openingAt(kennel, 0, [12, 0, 0], [24, 0, 16], 2.5);
    onePoint({
      id: 'one-point-kennel', title: 'One-Point: Gable-Ended Kennel',
      summary: 'A small gable building with an arched-free square doorway: the ridge runs straight back to the VP.',
      prompt: 'Draw the kennel at 1:20 in one-point perspective: front gable on PP, 720 wide, 800 deep, eaves 400 and ridge 640 high, with a doorway in the gable.',
      setup: { sx: 118, d: 115, yPP: 64, yGL: 160, h: 46, cx: 50 },
      solids: [kennel],
    });
  })();

  const PRACTICE_QUESTIONS = [
    {
      text: 'In one-point perspective, why is the front face of a building drawn at its true shape and size?',
      options: [
        'Because it touches the picture plane, so it is not distorted by the perspective projection',
        'Because true shape is always easier to draw',
        'It is not really true shape — it just looks that way',
        'Only the roof is ever drawn true shape',
      ],
      answer: 0,
      explanation: 'Any surface lying directly on the picture plane is projected onto it without any distortion, so it is drawn at its true, undistorted shape and size.',
    },
    {
      text: 'What is the Vanishing Point (VP) in one-point perspective?',
      options: [
        'The single point on the horizon line where all lines receding into the distance appear to converge',
        'The exact centre of the front face',
        'A point used only for hidden detail',
        'The position of the observer\'s feet',
      ],
      answer: 0,
      explanation: 'In one-point perspective, every edge that recedes away from the viewer (in the depth direction) is drawn converging towards a single vanishing point placed on the horizon line.',
    },
    {
      text: 'Which lines do NOT converge towards the vanishing point in one-point perspective?',
      options: [
        'Horizontal and vertical lines that lie in the picture plane (the front face)',
        'Every single line in the drawing converges to the VP',
        'Only curved lines avoid converging',
        'Lines converge randomly with no rule',
      ],
      answer: 0,
      explanation: 'Only lines receding in depth converge to the VP. Lines running horizontally or vertically within the picture-plane face stay parallel to themselves, exactly as in the true-shape front view.',
    },
    {
      text: 'The Horizon Line (HL) represents:',
      options: ['The observer\'s eye level', 'The ground line only', 'The back edge of the object', 'The picture plane'],
      answer: 0,
      explanation: 'The horizon line represents the height of the observer\'s eye — it is where the vanishing point(s) for a perspective drawing are placed.',
    },
    {
      text: 'To produce a "bird\'s-eye view" of a building, where should the horizon line (and VP) be placed?',
      options: [
        'Well above the object, as if looking down from a height',
        'Well below the object, as if looking up from ground level',
        'Exactly through the middle of the object',
        'The horizon line has no effect on the type of view produced',
      ],
      answer: 0,
      explanation: 'A bird’s-eye view simulates looking down on the object from above, which is achieved by placing the horizon line (and vanishing point) well above the object.',
    },
    {
      text: 'To produce a "worm\'s-eye view" of a building, where should the horizon line (and VP) be placed?',
      options: [
        'Well below the object, as if looking up from ground level',
        'Well above the object',
        'It is identical to a natural view',
        'On the roof ridge line',
      ],
      answer: 0,
      explanation: 'A worm’s-eye view simulates looking up at the object from ground level, achieved by placing the horizon line (and vanishing point) well below the object.',
    },
    {
      text: 'What do the abbreviations HL, PP and SP stand for in perspective drawing?',
      options: [
        'Horizon Line, Picture Plane, Station Point',
        'Height Line, Plan Position, Section Point',
        'Horizontal Layout, Projection Plane, Scale Point',
        'Hidden Line, Perspective Plane, Symmetry Point',
      ],
      answer: 0,
      explanation: 'HL is the Horizon Line (eye level), PP is the Picture Plane (the imaginary glass surface the image is projected onto), and SP is the Station Point (the observer\'s eye position).',
    },
    {
      text: 'A door is cut into the receding side wall of a building in one-point perspective. Why do the door\'s vertical edges stay perfectly vertical, while its top and bottom reveal edges converge toward the VP?',
      options: [
        'Only lines running in the DEPTH direction converge to the VP — the door\'s verticals run in the height direction, which never converges in one-point perspective',
        'All lines on a receding wall must converge, without exception',
        'The door\'s vertical edges are a common exception with no real explanation',
        'Vertical edges only stay vertical if the door is exactly at the vanishing point',
      ],
      answer: 0,
      explanation: 'In one-point perspective, only edges receding in depth converge to the VP. True verticals (height) and the horizontals within the picture-plane face never converge — the door\'s reveal edges converge because they run in the depth direction, but its jambs stay vertical.',
    },
    {
      text: 'Why does constructing a window opening require TWO separate height-projection lines to the VP, while a door only needs one?',
      options: [
        'A door\'s bottom is at ground level (already established by the wall\'s own bottom edge), but a window\'s sill AND head both sit above the ground, so both need their own true height projected',
        'Windows are simply more complicated shapes than doors in every respect',
        'It is a mistake — a window only ever needs one projection line too',
        'The number of projection lines depends only on the window\'s width, not its position',
      ],
      answer: 0,
      explanation: 'A door bottom coincides with the ground line, which is already established. A window\'s sill height and head height are both new heights above the ground, so each needs its own true-height point projected to the VP before the reveal can be constructed.',
    },
    {
      text: 'How is a circular feature (e.g. a porthole window) on a receding wall constructed in one-point perspective?',
      options: [
        'Plot the true circle at the picture-plane depth, then project each of its points individually toward the VP, stopping all of them at the same required depth',
        'Draw a normal true circle directly on the receding wall — circles are never distorted by perspective',
        'It cannot be done; circular features are impossible to show accurately in perspective',
        'Simply squash a true circle vertically by an arbitrary amount',
      ],
      answer: 0,
      explanation: 'Because the receding wall is foreshortened, a circle drawn on it is never a true circle. Plotting the true circle at the picture plane and projecting every point to the correct depth (exactly like an isometric circle\'s coordinate method) produces the correct foreshortened result.',
    },
    {
      text: 'Two identical, true-size boxes are drawn in one-point perspective from the same VP, one closer to the picture plane and one set further back along the same projectors. What is true of their drawn sizes?',
      options: [
        'The farther box is drawn smaller, purely as a result of being farther from the picture plane — no separate scaling step is applied',
        'Both boxes must always be drawn exactly the same size, since they are the same true size',
        'The farther box must be drawn LARGER to compensate for the distance',
        'Size in perspective drawing has nothing to do with distance from the picture plane',
      ],
      answer: 0,
      explanation: 'Perspective foreshortening naturally makes objects appear smaller with distance — the SAME construction technique (projecting toward the VP and stopping at the required depth) automatically produces the correct, smaller size for the farther object.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'one-point-block', 'one-point-notched-block', 'one-point-stepped-block', 'one-point-frame',
    'one-point-stacked-blocks', 'one-point-l-block', 'one-point-back-step', 'one-point-bench', 'one-point-steps', 'one-point-pedestal', 'one-point-cross', 'viewpoint-comparison', 'one-point-gable-house', 'one-point-hip-house', 'one-point-shed', 'one-point-kennel',
    'one-point-house-garage', 'one-point-entertainment-area', 'one-point-church', 'one-point-kitchen-interior',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
