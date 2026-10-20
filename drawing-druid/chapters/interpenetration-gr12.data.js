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
  // Join collinear segments that touch into one line (a faceted rim seen edge-on comes out as dozens of
  // tiny pieces, which render as a dotted line).
  function mergeLines(lines) {
    const out = lines.map(l => [l.p1.slice(), l.p2.slice(), l]);
    for (let changed = true; changed;) {
      changed = false;
      for (let i = 0; i < out.length && !changed; i++) for (let j = i + 1; j < out.length && !changed; j++) {
        const a = out[i], b = out[j];
        if (a[2].lineType !== b[2].lineType) continue;
        const da = [a[1][0] - a[0][0], a[1][1] - a[0][1]], la = Math.hypot(da[0], da[1]);
        if (la < 1e-9) continue;
        const off = p => Math.abs((p[0] - a[0][0]) * da[1] - (p[1] - a[0][1]) * da[0]) / la;
        if (off(b[0]) > 0.02 || off(b[1]) > 0.02) continue;
        const t = p => ((p[0] - a[0][0]) * da[0] + (p[1] - a[0][1]) * da[1]) / la;
        const ts = [0, la, t(b[0]), t(b[1])], lo = Math.min(...ts), hi = Math.max(...ts);
        if (Math.max(Math.min(t(b[0]), t(b[1])) - la, -Math.max(t(b[0]), t(b[1]))) > 0.02) continue;   // a gap between them
        const at = s => [a[0][0] + da[0] * s / la, a[0][1] + da[1] * s / la];
        out[i] = [at(lo), at(hi), a[2]]; out.splice(j, 1); changed = true;
      }
    }
    return out.map(o => Object.assign({}, o[2], { p1: o[0], p2: o[1] }));
  }
  function viewLines(solids, view) {
    const r = SK.hlr(solids, view), vis = [], hid = [];
    r.visible.forEach(s => { const q = [view.project(s[0]), view.project(s[1])]; if (d2(q[0], q[1]) > 0.05 && !covered(q, vis)) vis.push(Object.assign(q, { s })); });
    r.hidden.forEach(s => { const q = [view.project(s[0]), view.project(s[1])]; if (d2(q[0], q[1]) > 0.05 && !covered(q, vis) && !covered(q, hid)) hid.push(Object.assign(q, { s })); });
    return { vis, hid };
  }

  // cfg: id, title, summary, prompt, R1, Hm (main cylinder), R2, e (offset, + = behind), alpha (deg,
  //      branch rises towards its free end on the left), zc (where the branch axis meets the main
  //      axis line), Lb (axis length from the main axis to the free end)
  //      sq: a SQUARE pipe of half-side sq (sides level and upright) instead of a round one; R2 is ignored
  function cylBranch(cfg) {
    const { R1, Hm, e, zc, Lb } = cfg, sq = cfg.sq || 0, R2 = sq || cfg.R2, al = rad(cfg.alpha || 0);
    const ca = Math.cos(al), sa = Math.sin(al);
    const d = [ca, 0, -sa], u = [sa, 0, ca], w = [0, 1, 0];            // towards the main; up in the end; depth
    const endC = [-Lb * ca, e, zc + Lb * sa];
    const NM = 72, ring = Array.from({ length: NM }, (_, i) => { const a = 2 * Math.PI * i / NM; return [R1 * Math.cos(a), R1 * Math.sin(a)]; });
    // left-hand boundary of the (faceted) main cylinder at depth y; the true circle for the construction
    const xb = y => { let best = Infinity; ring.forEach((p, i) => { const q = ring[(i + 1) % NM]; if ((p[1] - y) * (q[1] - y) <= 1e-9 && Math.abs(q[1] - p[1]) > 1e-9) best = Math.min(best, p[0] + (q[0] - p[0]) * (y - p[1]) / (q[1] - p[1])); }); return best; };
    const xTrue = y => -Math.sqrt(Math.max(0, R1 * R1 - y * y));
    // the branch section: a point at fraction f (0..1) round it, from the top towards the back, as
    // [a, b] = [up in the end, depth]. A circle, or a square whose corners are at f = 1/8, 3/8, 5/8, 7/8
    const SQ = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    const sec = f => {
      if (!sq) return [R2 * Math.cos(2 * Math.PI * f), R2 * Math.sin(2 * Math.PI * f)];
      const t = (f * 8) % 8, i = Math.floor(t + 1e-9) % 8, r = t - Math.floor(t + 1e-9), p = SQ[i], q = SQ[(i + 1) % 8];
      return [sq * (p[0] + (q[0] - p[0]) * r), sq * (p[1] + (q[1] - p[1]) * r)];
    };
    // a generator (a line on the branch, parallel to its axis) at fraction f
    const gen = (f, xs) => {
      const ab = sec(f), E = [0, 1, 2].map(k => endC[k] + ab[0] * u[k] + ab[1] * w[k]);
      const s = (xs(E[1]) - E[0]) / ca, I = [0, 1, 2].map(k => E[k] + s * d[k]);
      return { f, ab, E, I, s };
    };
    // solids: the main cylinder, and the branch as facets from its end to the curve (smooth for a
    // round pipe; a square pipe's strips on one face are coplanar, so only its corners show)
    const main = SK.extrude(ring, 'xy', 0, Hm, new Set(ring.map((p, i) => i)));
    const NB = 48, G = Array.from({ length: NB }, (_, i) => gen(i / NB, xb));
    const branch = [SK.face(G.map(g => g.E).reverse(), { n: d.map(v => -v) })];
    G.forEach((g, i) => {
      const h = G[(i + 1) % NB], m = sec((i + 0.5) / NB);
      const nab = sq ? (Math.abs(Math.abs(m[0]) - sq) < 1e-6 ? [Math.sign(m[0]), 0] : [0, Math.sign(m[1])]) : [m[0] / R2, m[1] / R2];
      branch.push(SK.face([g.E, h.E, h.I, g.I], Object.assign({ n: [0, 1, 2].map(k => nab[0] * u[k] + nab[1] * w[k]) }, sq ? {} : { smooth: { a: true, b: true } })));
    });
    const solids = [main, branch];
    // the construction generators (true circle): 12 round a circle; a square's 4 corners and 4 side middles
    const NP = sq ? 8 : 12;
    const P = Array.from({ length: NP }, (_, k) => gen(k / NP, xTrue));
    P.forEach(g => { if (g.I[2] < 0 || g.I[2] > Hm) console.warn('[gr12]', cfg.id, 'generator leaves the main cylinder'); });
    const num = k => String(k + 1);
    // layout
    // auxiliary circle (or square): the end folded flat, drawn just beyond the end; each division
    // projects along the axis onto the end line, where its generator starts
    const auxC3 = [0, 1, 2].map(k => endC[k] - (R2 + 3) * d[k]);
    const dirOf = ab => [0, 1, 2].map(k => ab[0] * u[k] - ab[1] * d[k]);
    const aux = P.map(g => { const r = dirOf(g.ab); return [auxC3[0] + r[0], auxC3[2] + r[2]]; });
    const allX = [-R1, R1, ...G.map(g => g.E[0]), ...aux.map(p => p[0]), auxC3[0] - R2], allZ = [0, Hm, ...G.map(g => g.E[2]), ...aux.map(p => p[1])];
    const x0 = Math.min(...allX) - 6, x1 = R1, zTop = Math.max(...allZ) + 4;
    const y0 = Math.min(-R1, e - R2), y1 = Math.max(R1, e + R2);
    const FX = 30 - x0, GY = 22 + zTop, gap = 20, TY = GY + gap + y1;
    const F = ([x, , z]) => [FX + x, GY - z], T = ([x, y]) => [FX + x, TY - y];
    const fv = SK.orthoView('front', [FX, GY]), tv = SK.orthoView('top', [FX, TY]);
    const FVL = viewLines(solids, fv), TVL = viewLines(solids, tv);
    const onMain = p => Math.hypot(p[0], p[1]) <= R1 + 1e-3;
    const isCurve = seg => seg.every(p => onMain(p)) && G.some(g => d2([g.I[0], g.I[2]], [seg[0][0], seg[0][2]]) < 1e-3 && Math.abs(g.I[1] - seg[0][1]) < 1e-3);
    const kindOf = q => { const s = q.s; if (isCurve(s)) return 'curve'; const m = [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2]; return Math.hypot(m[0], m[1]) <= R1 + 1e-3 ? 'main' : 'branch'; };
    const pick = (set, k, lt) => mergeLines(set.filter(q => kindOf(q) === k).map(q => L(q[0], q[1], lt)));
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
        L(F([endC[0] - 6 * ca, 0, endC[2] + 6 * sa]), F([0, 0, zc]), 'centre'), L(F(P[0].E), F(P[NP / 2].E), 'construction')] });
    const auxShape = sq ? { kind: 'polygon', points: [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(ab => { const r = dirOf([ab[0] * sq, ab[1] * sq]); return F([auxC3[0] + r[0], 0, auxC3[2] + r[2]]); }), lineType: 'construction' }
      : { kind: 'circle', center: F(auxC3), r: R2, lineType: 'construction' };
    steps.push({ instruction: sq ? 'END VIEW: beside the end of the branch draw the ' + 2 * sq + ' mm square (the true shape of the end, folded flat). Number the corners and the middle of each side, 1 to 8, starting at the top.'
        : 'AUXILIARY CIRCLE: on the end of the branch draw a circle of Ø' + 2 * R2 + ' (the true shape of the end, folded flat) and divide it into 12 equal parts. Number them, starting at the top.',
      calloutAt: F(auxC3),
      reveals: [auxShape,
        ...aux.map(p => ({ kind: 'point', at: F([p[0], 0, p[1]]) })),
        ...aux.map((p, k) => { const r = dirOf(P[k].ab), l = Math.hypot(r[0], r[2]) || 1; return lbl(F([p[0] + 3.4 * r[0] / l, 0, p[1] + 3.4 * r[2] / l - 1]), num(k)); })] });
    steps.push({ instruction: sq ? 'From each point draw a line parallel to the branch axis towards the main cylinder (thin lines): the edges of the pipe, and a line along the middle of each face.'
        : 'From each division drop a line square to the end, then draw the 12 GENERATORS parallel to the branch axis towards the main cylinder (thin lines).',
      calloutAt: F(P[NP / 4].E),
      reveals: P.flatMap((g, k) => [L(F([aux[k][0], 0, aux[k][1]]), F(g.E), 'construction'), L(F(g.E), F([0, 0, g.E[2] + (0 - g.E[0]) / ca * d[2]]), 'construction')]) });
    // the branch end folded flat beside it in the top view gives each generator's depth
    const tAuxX = ab => tAuxC[0] - Math.abs(ab[0]);
    steps.push({ instruction: sq ? 'In the TOP VIEW draw the square beside the end of the branch to find the depth of each point. Carry each depth across to the main circle: where line 1, 2, 3 … meets the circle is its point on the curve.'
        : 'In the TOP VIEW draw a circle the size of the branch beside its end to find the depth of each generator. Carry each depth across to the main circle: where generator ' + num(0) + ', ' + num(1) + ', ' + num(2) + ' … meets the circle is its point on the curve.',
      calloutAt: T(tAuxC),
      reveals: [sq ? { kind: 'polygon', points: [T([tAuxC[0] - sq, e - sq]), T([tAuxC[0] + sq, e - sq]), T([tAuxC[0] + sq, e + sq]), T([tAuxC[0] - sq, e + sq])], lineType: 'construction' }
          : { kind: 'circle', center: T(tAuxC), r: R2, lineType: 'construction' }, L(T([tAuxC[0], e - R2]), T([tAuxC[0], e + R2]), 'construction'),
        ...P.flatMap(g => { const yk = g.I[1], ax = tAuxX(g.ab); return [{ kind: 'point', at: T([ax, yk]) }, L(T([ax, yk]), T([g.I[0], yk]), 'construction'), { kind: 'point', at: T([g.I[0], yk]) }]; }),
        // generators at the same depth meet the circle at the same point: one label for both (e.g. 1, 7)
        ...(() => { const groups = []; P.forEach((g, k) => { const gr = groups.find(x => Math.abs(x.y - g.I[1]) < 0.05); if (gr) gr.k.push(k); else groups.push({ y: g.I[1], x: g.I[0], k: [k] }); });
          return groups.map(gr => lbl(T([gr.x - 3, gr.y + 1]), gr.k.map(num).join(', '), { anchor: 'end' })); })()] });
    steps.push({ instruction: 'Project each point straight up from the top view to ITS generator in the front view. Mark the crossing: these are the points on the CURVE OF INTERPENETRATION.',
      calloutAt: F(P[NP / 4].I),
      reveals: [...P.map(g => L(T([g.I[0], g.I[1]]), F([g.I[0], 0, g.I[2]]), 'construction')), ...P.map(g => ({ kind: 'point', at: F(g.I) }))] });
    // The curve in the front view, straight from the generators: a point is seen when it is on the front
    // of the main cylinder (y ≤ 0) and on the front of the branch (y ≤ e). Hidden pieces that lie under
    // seen ones are left out. (The hidden-line pass is unreliable where the two surfaces graze.)
    const front = Math.min(0, e) + 1e-6, cv = [], ch = [];
    G.forEach((g, i) => { const h = G[(i + 1) % NB], q = [F(g.I), F(h.I)]; if (d2(q[0], q[1]) < 0.02) return; ((g.I[1] + h.I[1]) / 2 <= front ? cv : ch).push(q); });
    steps.push({ instruction: sq ? 'Join the points. In the front view the top and bottom faces of the pipe meet the cylinder in level lines, and the side faces in upright lines.'
        : 'Join the points with a smooth curve. Where the curve is on the back half of the branch it is hidden.',
      calloutAt: F(P[0].I), reveals: [...cv.map(q => L(q[0], q[1], 'A')), ...ch.filter(q => !covered(q, cv)).map(q => L(q[0], q[1], 'hidden'))] });
    steps.push({ instruction: sq ? 'Complete the branch in the front view: its end and its edges, from the end to the curve.'
        : 'Complete the branch in the front view: its end and its outline generators (1 and 7) from the end to the curve.',
      calloutAt: F(P[0].E), reveals: [...pick(FVL.vis, 'branch', 'A'), ...pick(FVL.hid, 'branch', 'hidden')] });
    steps.push({ instruction: 'Complete the main cylinder in the front view, and the branch in the top view.',
      // hidden lines of the main cylinder that lie on its own outline (the back rim of the top and base,
      // and the left side where the branch covers it) are not real hidden edges: leave them out
      calloutAt: F([R1, 0, Hm / 2]), reveals: [...pick(FVL.vis, 'main', 'A'),
        ...FVL.hid.filter(q => kindOf(q) === 'main' && !q.s.every(p => Math.abs(Math.abs(p[0]) - R1) < 0.6 || p[2] < 0.05 || p[2] > Hm - 0.05)).map(q => L(q[0], q[1], 'hidden')), ...TVL.vis.filter(q => kindOf(q) !== 'main').map(q => L(q[0], q[1])), ...TVL.hid.filter(q => kindOf(q) !== 'main').map(q => L(q[0], q[1], 'hidden'))] });
    // development of the branch, to the right of the front view; f = fraction round the section
    const per = sq ? 8 * sq : 2 * Math.PI * R2, DX = FX + R1 + 26, DY = GY - 4, step = per / NP;
    const sMax = Math.max(...G.map(g => g.s));
    const dev = (s, f) => [DX + per * f, DY - s];
    steps.push({ instruction: sq ? 'DEVELOPMENT of the square pipe: draw the stretch-out line ' + per + ' mm long (4 × ' + 2 * sq + ') and divide it into 8 equal parts, numbered 1 to 8 and back to 1 (the seam is on line 1). The corners are fold lines.'
        : 'DEVELOPMENT of the branch: draw the stretch-out line ' + per.toFixed(1) + ' mm long (π × ' + 2 * R2 + ') and divide it into 12 equal parts, numbered 1 to 12 and back to 1 (the seam is on generator 1).',
      calloutAt: [DX + per / 2, DY + 4], reveals: [L([DX, DY], [DX + per, DY]), ...Array.from({ length: NP + 1 }, (_, k) => lbl([DX + k * step, DY + 4.5], num(k % NP)))] });
    steps.push({ instruction: sq ? 'On each division draw a line square to the stretch-out line, as long as that line on the pipe in the front view (true length: the pipe\'s axis is parallel to the VP).'
        : 'On each division draw a line square to the stretch-out line, as long as that generator in the front view (the generators are true length there, because the branch axis is parallel to the VP).',
      calloutAt: [DX + per / 2, DY - sMax / 2], reveals: Array.from({ length: NP + 1 }, (_, k) => L([DX + k * step, DY], dev(P[k % NP].s, k / NP), 'construction')) });
    const devCurve = [...G, G[0]].map((g, i) => dev(g.s, i / NB));
    const folds = sq ? [1, 3, 5, 7].map(k => L([DX + k * step, DY], dev(P[k].s, k / NP), 'B')) : [];
    steps.push({ instruction: sq ? 'Join the ends: on each face the edge is a curve, because the face meets a round cylinder. Line in the outline; the fold lines at the corners stay thin.'
        : 'Join the ends with a smooth curve and line in the outline of the development.',
      calloutAt: dev(P[NP / 2].s, 0.5), reveals: [{ kind: 'polyline', points: devCurve, lineType: 'A' }, L([DX, DY], devCurve[0]), L([DX + per, DY], devCurve[devCurve.length - 1]), ...folds,
        lbl([DX + per / 2, DY + 11], 'DEVELOPMENT OF THE BRANCH / ONTWIKKELING VAN DIE TAK', GREY)] });
    steps.push({ instruction: 'Label the views.', calloutAt: [FX, GY + 6],
      reveals: [lbl([FX - R1, GY + 6], 'FRONT VIEW / VOORAANSIG', GREY), lbl([FX, TY + R1 + 8], 'TOP VIEW / BOAANSIG', GREY)] });
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'first', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full', _solids: solids,
      steps: steps.filter(st => st.reveals.length).map((st, k) => Object.assign({ id: k + 1 }, st)) };
    if (!ORDER.includes(cfg.id)) ORDER.push(cfg.id);                     // the chapter's first three keep their place
  }

  // ── A horizontal cylinder meeting a vertical cone: the HORIZONTAL CUTTING PLANE method ──
  // cfg: id, title, summary, prompt, R (cone base radius), H (cone height), R2 (branch radius),
  //      e (offset, + = behind), zc (branch axis height), Lb (free end, from the cone axis)
  function coneBranch(cfg) {
    const { R, H, R2, e, zc, Lb } = cfg;
    const rAt = z => R * (1 - z / H);                                   // the cone's radius at height z
    const NM = 96, eps = 0.05;
    // the cone as four-sided facets (a tiny flat top), so its sides read as one smooth surface
    const ang = i => 2 * Math.PI * i / NM, rr = rAt(H - eps);
    const cone = [SK.face(Array.from({ length: NM }, (_, i) => [R * Math.cos(ang(i)), R * Math.sin(ang(i)), 0]).reverse(), { n: [0, 0, -1] }),
      SK.face(Array.from({ length: NM }, (_, i) => [rr * Math.cos(ang(i)), rr * Math.sin(ang(i)), H - eps]), { n: [0, 0, 1] })];
    for (let i = 0; i < NM; i++) {
      const a = ang(i), b = ang(i + 1), m = (a + b) / 2;
      cone.push(SK.face([[R * Math.cos(a), R * Math.sin(a), 0], [R * Math.cos(b), R * Math.sin(b), 0], [rr * Math.cos(b), rr * Math.sin(b), H - eps], [rr * Math.cos(a), rr * Math.sin(a), H - eps]],
        { n: [H * Math.cos(m), H * Math.sin(m), R], smooth: { a: true, b: true } }));
    }
    // a generator of the branch: horizontal, at depth y and height z; it meets the cone where the
    // horizontal plane at z cuts the cone in a circle of radius rAt(z)
    const gen = th => { const y = e + R2 * Math.sin(th), z = zc + R2 * Math.cos(th), x = -Math.sqrt(Math.max(0, rAt(z) * rAt(z) - y * y));
      return { th, y, z, E: [-Lb, y, z], I: [x, y, z], s: x + Lb }; };
    const NB = 48, G = Array.from({ length: NB }, (_, i) => gen(2 * Math.PI * i / NB));
    const branch = [SK.face(G.map(g => g.E).reverse(), { n: [-1, 0, 0] })];
    G.forEach((g, i) => { const h = G[(i + 1) % NB], m = (g.th + h.th + (i === NB - 1 ? 2 * Math.PI : 0)) / 2;
      branch.push(SK.face([g.E, h.E, h.I, g.I], { n: [0, Math.sin(m), Math.cos(m)], smooth: { a: true, b: true } })); });
    const solids = [cone, branch];
    const P = Array.from({ length: 12 }, (_, k) => gen(2 * Math.PI * k / 12));
    const num = k => String(k + 1);
    // layout
    const auxC = [-Lb - R2 - 3, zc];
    const x0 = Math.min(-R, auxC[0] - R2) - 6, x1 = R, y0 = Math.min(-R, e - R2), y1 = Math.max(R, e + R2);
    const FX = 30 - x0, GY = 22 + H + 4, gap = 20, TY = GY + gap + y1;
    const F = ([x, , z]) => [FX + x, GY - z], T = ([x, y]) => [FX + x, TY - y];
    const fv = SK.orthoView('front', [FX, GY]), tv = SK.orthoView('top', [FX, TY]);
    const FVL = viewLines(solids, fv), TVL = viewLines(solids, tv);
    const onCone = p => Math.abs(Math.hypot(p[0], p[1]) - rAt(p[2])) < 0.6;
    const isCurve = s => s.every(p => G.some(g => d2([g.I[0], g.I[2]], [p[0], p[2]]) < 1e-3 && Math.abs(g.I[1] - p[1]) < 1e-3));
    const kindOf = q => { const s = q.s; if (isCurve(s)) return 'curve'; const m = [0, 1, 2].map(k => (s[0][k] + s[1][k]) / 2); return onCone(m) || m[2] < 1e-3 || m[2] > H - 0.2 ? 'main' : 'branch'; };
    const pick = (set, k, lt) => set.filter(q => kindOf(q) === k).map(q => L(q[0], q[1], lt));
    const heights = []; P.forEach(g => { if (!heights.some(z => Math.abs(z - g.z) < 0.05)) heights.push(g.z); });
    const tAuxC = [-Lb - R2 - 6, e];
    const steps = [];
    steps.push({ instruction: 'Draw the XY line. In 1st-angle projection the top view goes below the front view.',
      calloutAt: [FX + x0 + 10, GY], reveals: [L([FX + x0 - 4, GY], [FX + x1 + 10, GY], 'B')] });
    steps.push({ instruction: 'FRONT VIEW of the cone (base Ø' + 2 * R + ', ' + H + ' high) and TOP VIEW (a circle with its centre point). Draw the axes, and the branch axis ' + zc + ' mm up' + (e ? ', ' + Math.abs(e) + ' mm ' + (e > 0 ? 'behind' : 'in front of') + ' the cone axis (offset)' : '') + '.',
      calloutAt: F([0, 0, H / 2]),
      reveals: [L(F([-R, 0, 0]), F([0, 0, H]), 'construction'), L(F([R, 0, 0]), F([0, 0, H]), 'construction'), L(F([-R, 0, 0]), F([R, 0, 0]), 'construction'), L(F([0, 0, -4]), F([0, 0, H + 4]), 'centre'),
        { kind: 'circle', center: [FX, TY], r: R, lineType: 'A' }, L([FX - R - 4, TY], [FX + R + 4, TY], 'centre'), L([FX, TY - R - 4], [FX, TY + R + 4], 'centre'),
        L(F([-Lb - 6, 0, zc]), F([0, 0, zc]), 'centre'), L(T([-Lb - 6, e]), T([0, e]), 'centre')] });
    steps.push({ instruction: 'AUXILIARY CIRCLE: beside the end of the branch draw a circle of Ø' + 2 * R2 + ' and divide it into 12; number the points from the top. Draw the end of the branch.',
      calloutAt: F([auxC[0], 0, auxC[1]]),
      reveals: [{ kind: 'circle', center: F([auxC[0], 0, auxC[1]]), r: R2, lineType: 'construction' }, L(F([-Lb, 0, zc - R2]), F([-Lb, 0, zc + R2]), 'construction'),
        ...P.map(g => ({ kind: 'point', at: F([auxC[0] - R2 * Math.sin(g.th), 0, g.z]) })),
        ...P.map((g, k) => lbl(F([auxC[0] - (R2 + 3.4) * Math.sin(g.th), 0, zc + (R2 + 3.4) * Math.cos(g.th) - 1]), num(k)))] });
    steps.push({ instruction: 'Draw the GENERATORS: level lines from the divisions, through the end of the branch, right across the cone. Each one is also a HORIZONTAL CUTTING PLANE: mark where it cuts the outline of the cone.',
      calloutAt: F([0, 0, zc]),
      reveals: [...heights.map(z => L(F([auxC[0], 0, z]), F([rAt(z) + 4, 0, z]), 'construction')), ...heights.map(z => ({ kind: 'point', at: F([-rAt(z), 0, z]) }))] });
    steps.push({ instruction: 'A horizontal plane cuts a cone in a CIRCLE. Project each outline point down to the top view and draw that plane\'s circle about the centre.',
      calloutAt: T([-rAt(heights[0]), 0]),
      reveals: [...heights.map(z => L(F([-rAt(z), 0, z]), T([-rAt(z), 0]), 'construction')), ...heights.map(z => ({ kind: 'circle', center: [FX, TY], r: rAt(z), lineType: 'construction' }))] });
    steps.push({ instruction: 'In the top view draw a circle the size of the branch beside its end, and find the depth of each generator. Carry each depth across to the circle of ITS plane: generator 1 to the circle of plane 1, and so on. The crossing is a point on the curve.',
      calloutAt: T(tAuxC),
      reveals: [{ kind: 'circle', center: T(tAuxC), r: R2, lineType: 'construction' },
        ...P.flatMap(g => { const ax = tAuxC[0] - Math.sqrt(Math.max(0, R2 * R2 - (g.y - e) * (g.y - e))); return [{ kind: 'point', at: T([ax, g.y]) }, L(T([ax, g.y]), T([g.I[0], g.y]), 'construction'), { kind: 'point', at: T([g.I[0], g.y]) }]; }),
        ...(() => { const gs = []; P.forEach((g, k) => { const q = gs.find(x => Math.abs(x.y - g.y) < 0.05 && Math.abs(x.x - g.I[0]) < 0.05); if (q) q.k.push(k); else gs.push({ x: g.I[0], y: g.y, k: [k] }); });
          return gs.map(q => lbl(T([q.x - 2, q.y + 1.2]), q.k.map(num).join(', '), { anchor: 'end' })); })()] });
    steps.push({ instruction: 'Project each point up to its own generator in the front view. These are the points on the CURVE OF INTERPENETRATION.',
      calloutAt: F(P[3].I), reveals: [...P.map(g => L(T([g.I[0], g.y]), F(g.I), 'construction')), ...P.map(g => ({ kind: 'point', at: F(g.I) }))] });
    steps.push({ instruction: 'Join the points with a smooth curve, in both views. Parts behind the branch or the cone are hidden.',
      calloutAt: F(P[0].I), reveals: [...pick(FVL.vis, 'curve', 'A'), ...pick(FVL.hid, 'curve', 'hidden'), ...pick(TVL.vis, 'curve', 'A'), ...pick(TVL.hid, 'curve', 'hidden')] });
    steps.push({ instruction: 'Line in the branch and the cone in both views.',
      calloutAt: F([R, 0, 0]), reveals: [...pick(FVL.vis, 'branch', 'A'), ...pick(FVL.hid, 'branch', 'hidden'), ...pick(FVL.vis, 'main', 'A'), ...pick(FVL.hid, 'main', 'hidden'),
        ...pick(TVL.vis, 'branch', 'A'), ...pick(TVL.hid, 'branch', 'hidden')] });
    // development of the branch
    const per = 2 * Math.PI * R2, DX = FX + R + 26, DY = GY - 4, step = per / 12, sMax = Math.max(...G.map(g => g.s));
    const dev = (s, th) => [DX + per * th / (2 * Math.PI), DY - s];
    steps.push({ instruction: 'DEVELOPMENT of the branch: a stretch-out line ' + per.toFixed(1) + ' mm long (π × ' + 2 * R2 + '), divided into 12 and numbered (seam on 1).',
      calloutAt: [DX + per / 2, DY + 4], reveals: [L([DX, DY], [DX + per, DY]), ...Array.from({ length: 13 }, (_, k) => lbl([DX + k * step, DY + 4.5], num(k % 12)))] });
    steps.push({ instruction: 'On each division mark the length of that generator from the front view (true length: the generators are level and parallel to the VP).',
      calloutAt: [DX + per / 2, DY - sMax / 2], reveals: Array.from({ length: 13 }, (_, k) => L([DX + k * step, DY], dev(P[k % 12].s, 2 * Math.PI * k / 12), 'construction')) });
    const devCurve = [...G, G[0]].map((g, i) => dev(g.s, 2 * Math.PI * i / NB));
    steps.push({ instruction: 'Join the ends with a smooth curve and line in the development. Label the views.',
      calloutAt: dev(P[6].s, Math.PI), reveals: [{ kind: 'polyline', points: devCurve, lineType: 'A' }, L([DX, DY], devCurve[0]), L([DX + per, DY], devCurve[devCurve.length - 1]),
        lbl([DX + per / 2, DY + 11], 'DEVELOPMENT OF THE BRANCH / ONTWIKKELING VAN DIE TAK', GREY), lbl([FX, GY + 6], 'FRONT VIEW / VOORAANSIG', GREY), lbl([FX, TY + R + 8], 'TOP VIEW / BOAANSIG', GREY)] });
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'first', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full', _solids: solids,
      steps: steps.filter(st => st.reveals.length).map((st, k) => Object.assign({ id: k + 1 }, st)) };
    ORDER.push(cfg.id);
  }

  // The chapter's first three exercises (right-angled branches, listed first in CONSTRUCTION_ORDER)
  cylBranch({ id: 'interpenetration-equal-cylinders', title: 'Interpenetration of Two Equal-Diameter Cylinders', R1: 25, Hm: 100, R2: 25, e: 0, alpha: 0, zc: 50, Lb: 80,
    summary: 'Two pipes of the SAME diameter meeting at right angles — a special case where the curve of interpenetration turns out to be two straight lines, not a curve at all.',
    prompt: 'A horizontal cylinder Ø50 meets a vertical cylinder Ø50 × 100 high at right angles; the axes meet 50 mm above the base and the free end is 80 mm from the main axis. Draw, in 1st angle, the front view with the curve of interpenetration, the top view and the development of the branch. Use 12 generators.' });
  cylBranch({ id: 'interpenetration-unequal-cylinders', title: 'Interpenetration of Two Different-Diameter Cylinders', R1: 32, Hm: 100, R2: 16, e: 0, alpha: 0, zc: 50, Lb: 80,
    summary: 'The general method: when the two pipes are different sizes, the curve of interpenetration is a genuine curve, found point by point.',
    prompt: 'A horizontal cylinder Ø32 meets a vertical cylinder Ø64 × 100 high at right angles; the axes meet 50 mm above the base and the free end is 80 mm from the main axis. Draw, in 1st angle, the front view with the curve of interpenetration, the top view and the development of the branch. Use 12 generators.' });
  cylBranch({ id: 'interpenetration-square-prism', title: 'Interpenetration — Square Prism Through a Cylinder', R1: 28, Hm: 100, sq: 16, e: 0, alpha: 0, zc: 50, Lb: 80,
    summary: 'A square pipe meeting a cylinder: take the corners and the middle of each side. The flat faces meet the round cylinder in curves, so the development has curved edges between the folds.',
    prompt: 'A horizontal square pipe (32 mm sides, level and upright) meets a vertical cylinder Ø56 × 100 high at right angles; the axes meet 50 mm above the base and the free end is 80 mm from the main axis. Draw, in 1st angle, the front view with the line of interpenetration, the top view and the development of the pipe.' });
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
  coneBranch({ id: 'ip12-cone-cyl', title: 'Cylinder Meeting a Cone (Gr 12)', R: 40, H: 90, R2: 12, e: 0, zc: 30, Lb: 76,
    summary: 'A horizontal pipe meets a cone. Each generator of the pipe is a horizontal cutting plane, which cuts the cone in a circle: where the generator meets its circle in the top view is a point on the curve.',
    prompt: 'A horizontal cylinder Ø24 meets a right cone (base Ø80, 90 high) standing on the HP. The cylinder axis is 30 mm above the base, parallel to the VP and in the same vertical plane as the cone axis; its free end is 76 mm from the cone axis. Draw, in 1st angle, the front and top views with the curve of interpenetration, and the development of the cylinder. Use 12 generators and the horizontal cutting plane method.' });
  coneBranch({ id: 'ip12-cone-cyl-offset', title: 'Offset Cylinder Meeting a Cone (Gr 12)', R: 42, H: 96, R2: 11, e: 8, zc: 32, Lb: 78,
    summary: 'The same method with the pipe 8 mm behind the cone axis: the circles of the cutting planes do not change, but each generator now meets its circle further round.',
    prompt: 'A horizontal cylinder Ø22 meets a right cone (base Ø84, 96 high). The cylinder axis is 32 mm above the base, parallel to the VP and 8 mm behind the cone axis; its free end is 78 mm from the cone axis. Draw the front and top views with the curve of interpenetration, and the development of the cylinder (1st angle, horizontal cutting planes).' });
})(window);
