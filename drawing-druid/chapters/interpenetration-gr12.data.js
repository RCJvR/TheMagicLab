// Interpenetration & development, Grade 12: a cylindrical branch meets a vertical cylinder. The
// branch may be inclined (its axis at angle α to the horizontal, parallel to the VP) and offset
// (its axis e in front of or behind the main axis). Method: 12 generators. The auxiliary circle on
// the branch end in the front view gives each generator; the top view gives where it meets the
// main cylinder; projecting up gives the curve. The development of the branch follows.
// 1st-angle layout: front view, top view below it, development to the right. Needs solid-kit.js.
(function (global) {
  'use strict';
  const SK = global.SolidKit, C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 2.4, anchor: 'middle', color: '#fde047' }, opts || {});
  const GREY = { color: '#94a3b8', size: 2.8 };
  const rad = d => d * Math.PI / 180;
  const d2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

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

  // cfg: id, title, summary, prompt, R1, Hm (main cylinder), R2, e (offset, + = behind), alpha (deg,
  //      branch rises towards its free end on the left), zc (where the branch axis meets the main
  //      axis line), Lb (axis length from the main axis to the free end)
  function cylBranch(cfg) {
    const { R1, Hm, R2, e, zc, Lb } = cfg, al = rad(cfg.alpha || 0);
    const ca = Math.cos(al), sa = Math.sin(al);
    const d = [ca, 0, -sa], u = [sa, 0, ca], w = [0, 1, 0];            // towards the main; up in the end; depth
    const endC = [-Lb * ca, e, zc + Lb * sa];
    const NM = 72, ring = Array.from({ length: NM }, (_, i) => { const a = 2 * Math.PI * i / NM; return [R1 * Math.cos(a), R1 * Math.sin(a)]; });
    // left-hand boundary of the (faceted) main cylinder at depth y; the true circle for the construction
    const xb = y => { let best = Infinity; ring.forEach((p, i) => { const q = ring[(i + 1) % NM]; if ((p[1] - y) * (q[1] - y) <= 1e-9 && Math.abs(q[1] - p[1]) > 1e-9) best = Math.min(best, p[0] + (q[0] - p[0]) * (y - p[1]) / (q[1] - p[1])); }); return best; };
    const xTrue = y => -Math.sqrt(Math.max(0, R1 * R1 - y * y));
    // a generator: θ from the top of the branch (θ = 0) towards the back (θ = 90°)
    const gen = (th, xs) => {
      const E = [0, 1, 2].map(k => endC[k] + R2 * (Math.cos(th) * u[k] + Math.sin(th) * w[k]));
      const s = (xs(E[1]) - E[0]) / ca, I = [0, 1, 2].map(k => E[k] + s * d[k]);
      return { th, E, I, s };
    };
    // solids: the main cylinder, and the branch as smooth facets from its end to the curve
    const main = SK.extrude(ring, 'xy', 0, Hm, new Set(ring.map((p, i) => i)));
    const NB = 48, G = Array.from({ length: NB }, (_, i) => gen(2 * Math.PI * i / NB, xb));
    const branch = [SK.face(G.map(g => g.E).reverse(), { n: d.map(v => -v) })];
    G.forEach((g, i) => {
      const h = G[(i + 1) % NB], m = (g.th + h.th + (i === NB - 1 ? 2 * Math.PI : 0)) / 2;
      branch.push(SK.face([g.E, h.E, h.I, g.I], { n: [0, 1, 2].map(k => Math.cos(m) * u[k] + Math.sin(m) * w[k]), smooth: { a: true, b: true } }));
    });
    const solids = [main, branch];
    // the 12 construction generators (true circle)
    const P = Array.from({ length: 12 }, (_, k) => gen(2 * Math.PI * k / 12, xTrue));
    P.forEach(g => { if (g.I[2] < 0 || g.I[2] > Hm) console.warn('[gr12]', cfg.id, 'generator leaves the main cylinder'); });
    const num = k => String(k + 1);
    // layout
    // auxiliary circle: the end folded flat, drawn just beyond the end; each division projects along
    // the axis onto the end line, where its generator starts
    const auxC3 = [0, 1, 2].map(k => endC[k] - (R2 + 3) * d[k]);
    const dirOf = th => [0, 1, 2].map(k => Math.cos(th) * u[k] - Math.sin(th) * d[k]);
    const aux = P.map(g => { const r = dirOf(g.th); return [auxC3[0] + R2 * r[0], auxC3[2] + R2 * r[2]]; });
    const allX = [-R1, R1, ...G.map(g => g.E[0]), ...aux.map(p => p[0])], allZ = [0, Hm, ...G.map(g => g.E[2]), ...aux.map(p => p[1])];
    const x0 = Math.min(...allX) - 6, x1 = R1, zTop = Math.max(...allZ) + 4;
    const y0 = Math.min(-R1, e - R2), y1 = Math.max(R1, e + R2);
    const FX = 30 - x0, GY = 22 + zTop, gap = 20, TY = GY + gap + y1;
    const F = ([x, , z]) => [FX + x, GY - z], T = ([x, y]) => [FX + x, TY - y];
    const fv = SK.orthoView('front', [FX, GY]), tv = SK.orthoView('top', [FX, TY]);
    const FVL = viewLines(solids, fv), TVL = viewLines(solids, tv);
    const onMain = p => Math.hypot(p[0], p[1]) <= R1 + 1e-3;
    const isCurve = seg => seg.every(p => onMain(p)) && G.some(g => d2([g.I[0], g.I[2]], [seg[0][0], seg[0][2]]) < 1e-3 && Math.abs(g.I[1] - seg[0][1]) < 1e-3);
    const kindOf = q => { const s = q.s; if (isCurve(s)) return 'curve'; const m = [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2]; return Math.hypot(m[0], m[1]) <= R1 + 1e-3 ? 'main' : 'branch'; };
    const pick = (set, k, lt) => set.filter(q => kindOf(q) === k).map(q => L(q[0], q[1], lt));
    const tAuxC = [endC[0] - R2 - 6, e];                                  // a half-circle in the top view gives the depths
    const steps = [];
    steps.push({ instruction: 'Draw the XY line. In 1st-angle projection the top view goes below the front view.',
      calloutAt: [FX + x0 + 10, GY], reveals: [L([FX + x0 - 4, GY], [FX + x1 + 10, GY], 'B')] });
    steps.push({ instruction: 'TOP VIEW of the main cylinder: a circle of Ø' + 2 * R1 + '. Draw the centre lines and the branch axis ' + (e ? Math.abs(e) + ' mm ' + (e > 0 ? 'behind' : 'in front of') + ' the main axis (an OFFSET branch).' : 'through the centre.'),
      calloutAt: [FX, TY], reveals: [{ kind: 'circle', center: [FX, TY], r: R1, lineType: 'A' }, L([FX - R1 - 4, TY], [FX + R1 + 4, TY], 'centre'), L([FX, TY - R1 - 4], [FX, TY + R1 + 4], 'centre'),
        L(T([endC[0] - 4, e]), T([0, e]), 'centre')] });
    steps.push({ instruction: 'FRONT VIEW of the main cylinder (' + Hm + ' high) and the branch axis ' + (cfg.alpha ? 'at ' + cfg.alpha + '° to the horizontal, meeting the main axis ' + zc + ' mm up.' : 'level, ' + zc + ' mm up.') + ' Draw the end of the branch square to its axis.',
      calloutAt: F([0, 0, Hm / 2]),
      reveals: [{ kind: 'polygon', points: [F([-R1, 0, 0]), F([R1, 0, 0]), F([R1, 0, Hm]), F([-R1, 0, Hm])], lineType: 'construction' }, L(F([0, 0, -4]), F([0, 0, Hm + 4]), 'centre'),
        L(F([endC[0] - 6 * ca, 0, endC[2] + 6 * sa]), F([0, 0, zc]), 'centre'), L(F(P[0].E), F(P[6].E), 'construction')] });
    steps.push({ instruction: 'AUXILIARY CIRCLE: on the end of the branch draw a circle of Ø' + 2 * R2 + ' (the true shape of the end, folded flat) and divide it into 12 equal parts. Number them, starting at the top.',
      calloutAt: F(auxC3),
      reveals: [{ kind: 'circle', center: F(auxC3), r: R2, lineType: 'construction' },
        ...aux.map(p => ({ kind: 'point', at: F([p[0], 0, p[1]]) })),
        ...aux.map((p, k) => { const r = dirOf(P[k].th); return lbl(F([p[0] + 3.4 * r[0], 0, p[1] + 3.4 * r[2] - 1]), num(k)); })] });
    steps.push({ instruction: 'From each division drop a line square to the end, then draw the 12 GENERATORS parallel to the branch axis towards the main cylinder (thin lines).',
      calloutAt: F(P[3].E),
      reveals: P.flatMap((g, k) => [L(F([aux[k][0], 0, aux[k][1]]), F(g.E), 'construction'), L(F(g.E), F([0, 0, g.E[2] + (0 - g.E[0]) / ca * d[2]]), 'construction')]) });
    steps.push({ instruction: 'In the TOP VIEW draw a circle the size of the branch beside its end to find the depth of each generator. Carry each depth across to the main circle: where generator ' + num(0) + ', ' + num(1) + ', ' + num(2) + ' … meets the circle is its point on the curve.',
      calloutAt: T(tAuxC),
      reveals: [{ kind: 'circle', center: T(tAuxC), r: R2, lineType: 'construction' }, L(T([tAuxC[0], e - R2]), T([tAuxC[0], e + R2]), 'construction'),
        ...P.flatMap(g => { const yk = g.I[1], ax = tAuxC[0] - Math.sqrt(Math.max(0, R2 * R2 - (yk - e) * (yk - e))); return [{ kind: 'point', at: T([ax, yk]) }, L(T([ax, yk]), T([g.I[0], yk]), 'construction'), { kind: 'point', at: T([g.I[0], yk]) }]; }),
        // generators at the same depth meet the circle at the same point: one label for both (e.g. 1, 7)
        ...(() => { const groups = []; P.forEach((g, k) => { const gr = groups.find(x => Math.abs(x.y - g.I[1]) < 0.05); if (gr) gr.k.push(k); else groups.push({ y: g.I[1], x: g.I[0], k: [k] }); });
          return groups.map(gr => lbl(T([gr.x - 3, gr.y + 1]), gr.k.map(num).join(', '), { anchor: 'end' })); })()] });
    steps.push({ instruction: 'Project each point straight up from the top view to ITS generator in the front view. Mark the crossing: these are the points on the CURVE OF INTERPENETRATION.',
      calloutAt: F(P[3].I),
      reveals: [...P.map(g => L(T([g.I[0], g.I[1]]), F([g.I[0], 0, g.I[2]]), 'construction')), ...P.map(g => ({ kind: 'point', at: F(g.I) }))] });
    steps.push({ instruction: 'Join the points with a smooth curve. Where the curve is on the back half of the branch it is hidden.',
      calloutAt: F(P[0].I), reveals: [...pick(FVL.vis, 'curve', 'A'), ...pick(FVL.hid, 'curve', 'hidden')] });
    steps.push({ instruction: 'Complete the branch in the front view: its end and its outline generators (1 and 7) from the end to the curve.',
      calloutAt: F(P[0].E), reveals: [...pick(FVL.vis, 'branch', 'A'), ...pick(FVL.hid, 'branch', 'hidden')] });
    steps.push({ instruction: 'Complete the main cylinder in the front view, and the branch in the top view.',
      calloutAt: F([R1, 0, Hm / 2]), reveals: [...pick(FVL.vis, 'main', 'A'), ...pick(FVL.hid, 'main', 'hidden'), ...TVL.vis.filter(q => kindOf(q) !== 'main').map(q => L(q[0], q[1])), ...TVL.hid.filter(q => kindOf(q) !== 'main').map(q => L(q[0], q[1], 'hidden'))] });
    // development of the branch, to the right of the front view
    const per = 2 * Math.PI * R2, DX = FX + R1 + 26, DY = GY - 4, step = per / 12;
    const sMax = Math.max(...G.map(g => g.s));
    const dev = (s, th) => [DX + per * th / (2 * Math.PI), DY - s];
    steps.push({ instruction: 'DEVELOPMENT of the branch: draw the stretch-out line ' + per.toFixed(1) + ' mm long (π × ' + 2 * R2 + ') and divide it into 12 equal parts, numbered 1 to 12 and back to 1 (the seam is on generator 1).',
      calloutAt: [DX + per / 2, DY + 4], reveals: [L([DX, DY], [DX + per, DY]), ...Array.from({ length: 13 }, (_, k) => lbl([DX + k * step, DY + 4.5], num(k % 12)))] });
    steps.push({ instruction: 'On each division draw a line square to the stretch-out line, as long as that generator in the front view (the generators are true length there, because the branch axis is parallel to the VP).',
      calloutAt: [DX + per / 2, DY - sMax / 2], reveals: Array.from({ length: 13 }, (_, k) => L([DX + k * step, DY], dev(P[k % 12].s, 2 * Math.PI * k / 12), 'construction')) });
    const devCurve = [...G, G[0]].map((g, i) => dev(g.s, 2 * Math.PI * i / NB));
    steps.push({ instruction: 'Join the ends with a smooth curve and line in the outline of the development.',
      calloutAt: dev(P[6].s, Math.PI), reveals: [{ kind: 'polyline', points: devCurve, lineType: 'A' }, L([DX, DY], devCurve[0]), L([DX + per, DY], devCurve[devCurve.length - 1]),
        lbl([DX + per / 2, DY + 11], 'DEVELOPMENT OF THE BRANCH / ONTWIKKELING VAN DIE TAK', GREY)] });
    steps.push({ instruction: 'Label the views.', calloutAt: [FX, GY + 6],
      reveals: [lbl([FX - R1, GY + 6], 'FRONT VIEW / VOORAANSIG', GREY), lbl([FX, TY + R1 + 8], 'TOP VIEW / BOAANSIG', GREY)] });
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'first', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full', _solids: solids,
      steps: steps.filter(st => st.reveals.length).map((st, k) => Object.assign({ id: k + 1 }, st)) };
    ORDER.push(cfg.id);
  }

  cylBranch({ id: 'ip12-cyl-45', title: 'Cylinder Branch at 45° (Gr 12)', R1: 30, Hm: 96, R2: 15, e: 0, alpha: 45, zc: 34, Lb: 80,
    summary: 'A Ø30 pipe joins a Ø60 pipe at 45°. The generators are found on the auxiliary circle at the branch end; the top view gives where each meets the main pipe.',
    prompt: 'A cylindrical branch Ø30 joins a vertical cylinder Ø60 × 96 high. The branch axis is parallel to the VP, at 45° to the horizontal, and meets the main axis 34 mm above the base; the free end is 80 mm from the main axis. Draw, in 1st angle, the front view with the curve of interpenetration, the top view, and the development of the branch. Use 12 generators.' });
  cylBranch({ id: 'ip12-cyl-offset', title: 'Offset Cylinder Branch (Gr 12)', R1: 32, Hm: 90, R2: 14, e: 14, alpha: 0, zc: 45, Lb: 78,
    summary: 'The branch axis is 14 mm behind the main axis, so the curve is not symmetrical: generators on the back of the branch meet the main pipe further round.',
    prompt: 'A horizontal cylindrical branch Ø28 meets a vertical cylinder Ø64 × 90 high. The branch axis is 45 mm above the base, parallel to the VP and 14 mm behind the main axis (offset). Its free end is 78 mm from the main axis. Draw the front view with the curve of interpenetration, the top view and the development of the branch (1st angle, 12 generators).' });
  cylBranch({ id: 'ip12-cyl-30-offset', title: 'Inclined, Offset Cylinder Branch (Gr 12)', R1: 30, Hm: 96, R2: 12, e: -12, alpha: 30, zc: 38, Lb: 80,
    summary: 'Both at once: a branch at 30° whose axis is 12 mm in front of the main axis. The method does not change: auxiliary circle, generators, depths from the top view, project up.',
    prompt: 'A cylindrical branch Ø24 joins a vertical cylinder Ø60 × 96 high. The branch axis is parallel to the VP, rises at 30° to the horizontal away from the main cylinder, is 12 mm in front of the main axis, and its projection meets the main axis 38 mm above the base. The free end is 80 mm from the main axis. Draw the front view with the curve of interpenetration, the top view and the development of the branch.' });
  cylBranch({ id: 'ip12-equal-45', title: 'Equal Cylinders at 45° (Gr 12)', R1: 22, Hm: 100, R2: 22, e: 0, alpha: 45, zc: 40, Lb: 78,
    summary: 'When the two pipes are the same diameter and their axes meet, the curve of interpenetration shows as straight lines in the front view, at any angle.',
    prompt: 'Two cylinders of Ø44 meet with their axes intersecting at 45°: the main cylinder is vertical (100 high), the branch axis meets it 40 mm above the base and its free end is 78 mm away. Draw the front view with the curve of interpenetration, the top view and the development of the branch. Explain why the curve is straight.' });
})(window);
