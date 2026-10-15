// Interpenetration & development: generated prism-on-prism exercises (Gr 11-12). A horizontal
// branch prism is shaped to fit around a vertical prism; the axes are in one vertical plane.
// 1st-angle layout as in the workbooks: front view, top view below it, left view to its right
// with a 45° mitre line, and the development of the branch beside the top view.
// Needs solid-kit.js; runs after interpenetration-development.data.js.
(function (global) {
  'use strict';
  const SK = global.SolidKit, C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 2.6, anchor: 'middle', color: '#fde047' }, opts || {});
  const GREY = { color: '#94a3b8', size: 2.8 };
  const d2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const reg = (n, R, a0, c) => Array.from({ length: n }, (_, i) => { const a = (a0 + i * 360 / n) * Math.PI / 180; return [(c ? c[0] : 0) + R * Math.cos(a), (c ? c[1] : 0) + R * Math.sin(a)]; });

  // 2D view lines with hidden lines under visible ones removed
  function onSeg2(p, a, b) {
    const ab = [b[0] - a[0], b[1] - a[1]], l2 = ab[0] * ab[0] + ab[1] * ab[1];
    if (l2 < 1e-9) return d2(p, a) < 0.05;
    const t = ((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1]) / l2;
    return t > -1e-3 && t < 1 + 1e-3 && d2(p, [a[0] + ab[0] * t, a[1] + ab[1] * t]) < 0.05;
  }
  const covered = (s, set) => [0, 0.25, 0.5, 0.75, 1].every(t => { const p = [s[0][0] + (s[1][0] - s[0][0]) * t, s[0][1] + (s[1][1] - s[0][1]) * t]; return set.some(v => onSeg2(p, v[0], v[1])); });
  function viewLines(solids, view) {
    const r = SK.hlr(solids, view), vis = [], hid = [];
    r.visible.forEach(s => { const q = [view.project(s[0]), view.project(s[1])]; if (d2(q[0], q[1]) > 0.05 && !covered(q, vis)) vis.push(Object.assign(q, { s })); });
    r.hidden.forEach(s => { const q = [view.project(s[0]), view.project(s[1])]; if (d2(q[0], q[1]) > 0.05 && !covered(q, vis) && !covered(q, hid)) hid.push(Object.assign(q, { s })); });
    return { vis, hid };
  }

  // cfg: id, title, summary, prompt, main (polygon in x-y, anticlockwise), Hm, sec (branch section
  //      in y-z, anticlockwise), xe (free end of the branch)
  function prismBranch(cfg) {
    const M = cfg.main, S = cfg.sec, Hm = cfg.Hm, xe = cfg.xe;
    // left-hand boundary of the main prism at depth y
    const xb = y => { let best = Infinity; M.forEach((p, i) => { const q = M[(i + 1) % M.length]; if ((p[1] - y) * (q[1] - y) <= 1e-9 && Math.abs(q[1] - p[1]) > 1e-9) { const x = p[0] + (q[0] - p[0]) * (y - p[1]) / (q[1] - p[1]); best = Math.min(best, x); } }); return best; };
    const leftCorners = M.filter(p => Math.abs(xb(p[1]) - p[0]) < 1e-6).map(p => p[1]);
    // perimeter points of the branch: section corners plus where it crosses a main corner
    const per = [];
    S.forEach((p, i) => {
      const q = S[(i + 1) % S.length];
      per.push({ y: p[0], z: p[1], corner: true, i });
      const ins = leftCorners.filter(y => (y - p[0]) * (y - q[0]) < -1e-9).map(y => ({ t: (y - p[0]) / (q[0] - p[0]), y })).sort((a, b) => a.t - b.t);
      ins.forEach(({ t, y }) => per.push({ y, z: p[1] + (q[1] - p[1]) * t, corner: false, i }));
    });
    per.forEach(P => { P.x = xb(P.y); P.L = P.x - xe; });
    // perimeter positions
    let s = 0; per.forEach((P, k) => { P.s = s; const Q = per[(k + 1) % per.length]; s += Math.hypot(Q.y - P.y, Q.z - P.z); });
    const perim = s;
    // solids
    const main = SK.extrude(M, 'xy', 0, Hm);
    const branch = [SK.face(S.map(([y, z]) => [xe, y, z]), { n: [-1, 0, 0] })];
    S.forEach((p, i) => {
      const q = S[(i + 1) % S.length], mids = per.filter(P => P.i === i && !P.corner);
      const P0 = per.find(P => P.corner && P.i === i), Q0 = per.find(P => P.corner && P.i === (i + 1) % S.length);
      const pts = [[xe, p[0], p[1]], [xe, q[0], q[1]], [Q0.x, q[0], q[1]], ...mids.slice().reverse().map(P => [P.x, P.y, P.z]), [P0.x, p[0], p[1]]];
      branch.push(SK.face(pts, { n: [0, q[1] - p[1], -(q[0] - p[0])] }));
    });
    const solids = [main, branch];
    // layout
    const xs = M.map(p => p[0]).concat([xe]), ys = M.map(p => p[1]).concat(S.map(p => p[0]));
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const FX = 30 - x0, GY = 26 + Hm, gap = 22, TY = GY + gap + y1, LX = FX + x1 + gap + y1;
    const fv = SK.orthoView('front', [FX, GY]), tv = SK.orthoView('top', [FX, TY]), lv = SK.orthoView('left', [LX, GY]);
    const mitre = y => [LX - y, TY - y];
    const F = viewLines(solids, fv), T = viewLines(solids, tv), V = viewLines(solids, lv);
    const curveSeg = seg => per.some((P, k) => { const Q = per[(k + 1) % per.length]; return onSeg2([seg[0][1], seg[0][2]], [P.y, P.z], [Q.y, Q.z]) && onSeg2([seg[1][1], seg[1][2]], [P.y, P.z], [Q.y, Q.z]); }) && seg.every(p => Math.abs(p[0] - xb(p[1])) < 1e-3);
    const kindOf = q => { const seg = q.s; if (curveSeg(seg)) return 'curve'; const m = [(seg[0][0] + seg[1][0]) / 2, (seg[0][1] + seg[1][1]) / 2]; return m[0] < xb(m[1]) - 1e-3 ? 'branch' : 'main'; };
    const AS = (q, lt) => L(q[0], q[1], lt);
    const pick = (set, k, lt) => set.filter(q => kindOf(q) === k).map(q => AS(q, lt));
    const num = per.map((P, k) => String(k + 1));
    const steps = [];
    steps.push({ instruction: 'Draw the XY line and the 45° mitre line. In 1st-angle projection the top view goes below the front view and the left view to its right.',
      calloutAt: [LX - y0, GY], reveals: [L([FX + x0 - 8, GY], [LX - y0 + 10, GY], 'B'), L(mitre(y0 - 6), mitre(y1 + 6), 'construction')] });
    steps.push({ instruction: 'Draw the given TOP VIEW: the ' + cfg.mainName + ' in its true shape, and the ' + cfg.branchName + ' coming in from the left.',
      calloutAt: [FX + (x0 + x1) / 2, TY - (y0 + y1) / 2], reveals: [...T.vis.map(q => AS(q, 'A')), ...T.hid.map(q => AS(q, 'hidden'))] });
    steps.push({ instruction: 'Draw the LEFT VIEW: here the end of the ' + cfg.branchName + ' is seen in its true shape, in front of the ' + cfg.mainName + '. Number the corners of the branch, and also the points where its sides cross a corner of the ' + cfg.mainName + '.',
      calloutAt: [LX - (y0 + y1) / 2, GY - Hm / 2],
      reveals: [...V.vis.map(q => AS(q, 'A')), ...V.hid.map(q => AS(q, 'hidden')), ...per.map((P, k) => lbl([LX - P.y + (P.corner ? 3.5 : 2.5), GY - P.z - 2], num[k], { color: P.corner ? '#fde047' : '#f472b6' }))] });
    steps.push({ instruction: 'Number the same points in the top view: each lies on the outline of the ' + cfg.mainName + ' at the depth of that point (carry the depths across with the mitre line).',
      calloutAt: [FX + per[0].x, TY - per[0].y],
      reveals: [...uniq(per.map(P => P.y)).flatMap(y => { const m = mitre(y); return [L([LX - y, GY], m, 'construction'), L(m, [FX + xb(y), TY - y], 'construction')]; }),
        ...per.map((P, k) => ({ kind: 'point', at: [FX + P.x, TY - P.y] }))] });
    steps.push({ instruction: 'Project the points straight up from the top view into the front view.',
      calloutAt: [FX + per[0].x, (GY + TY - y1) / 2], reveals: uniq(per.map(P => P.x)).map(x => L([FX + x, TY - y1], [FX + x, GY - Hm], 'construction')) });
    steps.push({ instruction: 'Project the heights across from the left view.', calloutAt: [(FX + x1 + LX - y1) / 2, GY - per[0].z],
      reveals: uniq(per.map(P => P.z)).map(z => L([LX - y1, GY - z], [FX + xe - 4, GY - z], 'construction')) });
    steps.push({ instruction: 'Where each projector meets its height line is a point on the CURVE OF INTERPENETRATION. Mark the points and number them.',
      calloutAt: [FX + per[0].x, GY - per[0].z], reveals: per.map((P, k) => ({ kind: 'point', at: [FX + P.x, GY - P.z] })) });
    steps.push({ instruction: 'Join the points in order with straight lines (the faces are flat). Parts on the back of the branch are hidden.',
      calloutAt: [FX + per[0].x, GY - per[0].z], reveals: [...pick(F.vis, 'curve', 'A'), ...pick(F.hid, 'curve', 'hidden')] });
    steps.push({ instruction: 'Complete the front view of the ' + cfg.branchName + ': its free end and its edges, from the end up to the curve.',
      calloutAt: [FX + xe, GY - per[0].z], reveals: [...pick(F.vis, 'branch', 'A'), ...pick(F.hid, 'branch', 'hidden')] });
    steps.push({ instruction: 'Complete the front view of the ' + cfg.mainName + '. Its corners that are inside the branch are hidden.',
      calloutAt: [FX + x1, GY - Hm / 2], reveals: [...pick(F.vis, 'main', 'A'), ...pick(F.hid, 'main', 'hidden')] });
    // development of the branch beside the top view
    const DX = LX - y0 + 22, DY = GY + gap, Lmax = Math.max(...per.map(P => P.L));
    const rowY = k => DY + (k < per.length ? per[k].s : perim);
    const order = [...per, per[0]];
    steps.push({ instruction: 'DEVELOPMENT of the ' + cfg.branchName + ': draw the free end as a straight line (the stretch-out line), ' + perim.toFixed(0) + ' mm long, and step off the distances between the numbered points (true lengths from the left view). The seam is at point 1.',
      calloutAt: [DX, DY + perim / 2], reveals: [L([DX, DY], [DX, DY + perim]), ...order.map((P, k) => lbl([DX - 4, rowY(k) + 1], k === per.length ? num[0] : num[k], { color: P.corner ? '#fde047' : '#f472b6' }))] });
    steps.push({ instruction: 'Draw a thin line square to the stretch-out line through each point, and mark off its length from the free end to the curve (measure it in the top or front view).',
      calloutAt: [DX + Lmax / 2, DY + perim / 2], reveals: order.map((P, k) => L([DX, rowY(k)], [DX + P.L, rowY(k)], P.corner ? 'C' : 'construction')) });
    steps.push({ instruction: 'Join the ends in order: this edge wraps round the ' + cfg.mainName + '. Line in the outline; the fold lines at the corners stay thin.',
      calloutAt: [DX + Lmax, DY + perim / 2], reveals: [{ kind: 'polyline', points: order.map((P, k) => [DX + P.L, rowY(k)]), lineType: 'A' }, L([DX + order[0].L, DY], [DX, DY]), L([DX + order[0].L, DY + perim], [DX, DY + perim]),
        lbl([DX + Lmax / 2, DY + perim + 7], 'DEVELOPMENT / ONTWIKKELING', GREY)] });
    steps.push({ instruction: 'Label the views.', calloutAt: [FX + (x0 + x1) / 2, GY + 6],
      reveals: [lbl([FX + (x0 + x1) / 2, GY + 6], 'FRONT VIEW / VOORAANSIG', GREY), lbl([FX + (x0 + x1) / 2, TY - y0 + 7], 'TOP VIEW / BOAANSIG', GREY), lbl([LX - (y0 + y1) / 2, GY + 6], 'LEFT VIEW / LINKERAANSIG', GREY)] });
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'first', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full',
      steps: steps.filter(st => st.reveals.length).map((st, k) => Object.assign({ id: k + 1 }, st)) };
    ORDER.push(cfg.id);
  }
  function uniq(a) { const out = []; a.forEach(v => { if (!out.some(w => Math.abs(w - v) < 0.05)) out.push(v); }); return out; }

  prismBranch({ id: 'ip-square-on-hexagon', title: 'Square Pipe Fitted to a Hexagonal Prism', mainName: 'hexagonal prism', branchName: 'square pipe',
    main: reg(6, 34, 0), Hm: 72, sec: reg(4, 21, 0, [0, 36]), xe: -72,
    summary: 'A square pipe, turned on its corner, fitted round a corner of a hexagonal prism: the curve of interpenetration bends where the pipe crosses the prism\'s corner.',
    prompt: 'A square pipe (30 mm sides, turned at 45°) on a horizontal axis 36 mm above the base is shaped to fit around a regular hexagonal prism (68 mm across corners, 72 mm high, one corner facing the pipe). The axes are in one vertical plane. Draw the front view with the curve of interpenetration, the top view, the left view and the development of the pipe.' });
  prismBranch({ id: 'ip-triangle-on-square', title: 'Triangular Pipe Fitted to a Square Prism', mainName: 'square prism', branchName: 'triangular pipe',
    main: reg(4, 32, 0), Hm: 74, sec: reg(3, 22, 90, [0, 36]), xe: -74,
    summary: 'A triangular pipe fitted round the corner of a square prism set at 45°: each face of the pipe meets two faces of the prism.',
    prompt: 'An equilateral triangular pipe (circumradius 22 mm, one corner up) on an axis 36 mm above the base fits around a square prism (diagonal 64 mm, 74 high) turned at 45° so a corner faces the pipe. Draw the front view with the curve of interpenetration, the top view, the left view and the development of the pipe.' });
  prismBranch({ id: 'ip-hexagon-on-octagon', title: 'Hexagonal Pipe Fitted to an Octagonal Prism', mainName: 'octagonal prism', branchName: 'hexagonal pipe',
    main: reg(8, 34, 22.5), Hm: 76, sec: reg(6, 18, 0, [0, 36]), xe: -76,
    summary: 'A hexagonal pipe meeting an octagonal prism: the pipe is wider than one face of the prism, so its curve wraps round two corners.',
    prompt: 'A regular hexagonal pipe (36 mm across corners, two corners on the horizontal centre line) on an axis 36 mm above the base fits around a regular octagonal prism (68 mm across corners, 76 high, a face towards the pipe). Draw the front view with the curve of interpenetration, the top view, the left view and the development of the pipe.' });
  prismBranch({ id: 'ip-square-on-triangle', title: 'Square Pipe Fitted to a Triangular Prism', mainName: 'triangular prism', branchName: 'square pipe',
    main: reg(3, 36, 180), Hm: 78, sec: [[-14, 24], [14, 24], [14, 52], [-14, 52]], xe: -86,
    summary: 'A square pipe with level sides fitted against the corner of a triangular prism: its top and bottom meet the prism in V-shapes, its sides in straight lines.',
    prompt: 'A square pipe (28 mm, sides level and upright) on an axis 38 mm above the base fits around a triangular prism (circumradius 36 mm, 78 high) with one corner facing the pipe. Draw the front view with the curve of interpenetration, the top view, the left view and the development of the pipe.' });
})(window);
