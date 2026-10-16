// Drawing Druid — 3D models for the hand-written exercises (those not built from solids).
// Each entry returns the object as faces { pts, holes, n, smooth?, twoSided? } in mm, with x to
// the right, y to the back and z up; model3d.js draws them. Builders that already know their
// solids attach them as model._solids instead. Loaded on demand by lesson-ui.js.
// For a sectioned exercise the model is the whole object: the drawing shows the section.
(function (global) {
  'use strict';
  const TAU = 2 * Math.PI;
  const F = (pts, n, extra) => Object.assign({ pts, holes: [], n }, extra || {});
  const circle = (c, r, n) => Array.from({ length: n || 40 }, (_, i) => { const a = TAU * i / (n || 40); return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
  const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const area = P => P.reduce((s, p, i) => { const q = P[(i + 1) % P.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
  const ccw = P => area(P) < 0 ? P.slice().reverse() : P;

  // extrude a 2D profile (with optional hole loops) along an axis.
  //   plane 'xy': (a, b) = (x, y), along z    'xz': (x, z), along y    'yz': (y, z), along x
  //   curved: true when the profile is a circle-like curve (no seams drawn), or a test (p, q) → true
  //   for the sides that lie on a curve; holes are always round
  function extr(profile, plane, t0, t1, opts) {
    opts = opts || {};
    const P = ccw(profile), holes = (opts.holes || []).map(ccw);
    const to3 = (a, b, t) => plane === 'xy' ? [a, b, t] : plane === 'xz' ? [a, t, b] : [t, a, b];
    const nrm = (a, b) => plane === 'xy' ? [a, b, 0] : plane === 'xz' ? [a, 0, b] : [0, a, b];
    const ax = plane === 'xy' ? [0, 0, 1] : plane === 'xz' ? [0, 1, 0] : [1, 0, 0];
    const faces = [
      F(P.map(([a, b]) => to3(a, b, t0)), ax.map(v => -v), { holes: holes.map(h => h.map(([a, b]) => to3(a, b, t0))) }),
      F(P.map(([a, b]) => to3(a, b, t1)), ax, { holes: holes.map(h => h.map(([a, b]) => to3(a, b, t1))) }),
    ];
    const sides = (loop, inward, curved) => loop.forEach((p, i) => {
      const q = loop[(i + 1) % loop.length], na = q[1] - p[1], nb = -(q[0] - p[0]);
      faces.push(F([to3(p[0], p[1], t0), to3(q[0], q[1], t0), to3(q[0], q[1], t1), to3(p[0], p[1], t1)],
        inward ? nrm(-na, -nb) : nrm(na, nb), (typeof curved === 'function' ? curved(p, q) : curved) ? { smooth: { a: true, b: true, all: true } } : null));
    });
    sides(P, false, opts.curved);
    holes.forEach(h => sides(h, true, true));
    return faces;
  }
  const box = (x0, y0, z0, x1, y1, z1, holes) => extr(rect(x0, y0, x1, y1), 'xy', z0, z1, { holes });
  const cylZ = (c, r, z0, z1) => extr(circle(c, r), 'xy', z0, z1, { curved: true });
  const cylX = (c, r, x0, x1) => extr(circle(c, r), 'yz', x0, x1, { curved: true });
  // a cone or pyramid: base polygon (2D, at z0) to an apex
  function pyramid(base, z0, apex, curved) {
    const B = ccw(base), faces = [F(B.slice().reverse().map(([x, y]) => [x, y, z0]), [0, 0, -1])];
    B.forEach((p, i) => {
      const q = B[(i + 1) % B.length], a = [p[0], p[1], z0], b = [q[0], q[1], z0];
      const u = b.map((v, k) => v - a[k]), w = apex.map((v, k) => v - a[k]);
      faces.push(F([a, b, apex], [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]], curved ? { smooth: { a: true, b: true, all: true } } : null));
    });
    return faces;
  }
  // sheet metal joining two loops (bottom at z0, top at z1), zipped round by angle; open ends
  //   curved: true = the whole sheet is one smooth surface; 'top' = only the triangles with an edge
  //   on the top loop (a round top: the fans from each corner are conical)
  function loft(bottom, z0, top, z1, curved) {
    const B = ccw(bottom), T = ccw(top), c = B.reduce((s, p) => [s[0] + p[0] / B.length, s[1] + p[1] / B.length], [0, 0]);
    const ang = p => { const a = Math.atan2(p[1] - c[1], p[0] - c[0]); return a < 0 ? a + TAU : a; };
    const sortFrom = L => { let k = 0; L.forEach((p, i) => { if (ang(p) < ang(L[k])) k = i; }); return L.slice(k).concat(L.slice(0, k)); };
    const b = sortFrom(B), t = sortFrom(T), out = [];
    const angAt = (L, i) => i >= L.length ? ang(L[0]) + TAU : ang(L[i]);
    const tri = (p, q, r, sm) => { const u = q.map((v, k) => v - p[k]), w = r.map((v, k) => v - p[k]); return F([p, q, r], [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]], Object.assign({ twoSided: true }, sm ? { smooth: { a: true, b: true, all: true } } : {})); };
    const P3 = (L, i, z) => { const p = L[i % L.length]; return [p[0], p[1], z]; };
    let i = 0, j = 0;
    while (i < b.length || j < t.length) {
      if (j >= t.length || (i < b.length && angAt(b, i + 1) <= angAt(t, j + 1))) { out.push(tri(P3(b, i, z0), P3(b, i + 1, z0), P3(t, j, z1), curved === true)); i++; }
      else { out.push(tri(P3(b, i, z0), P3(t, j + 1, z1), P3(t, j, z1), !!curved)); j++; }
    }
    return out;
  }
  const sq = s => rect(-s / 2, -s / 2, s / 2, s / 2);
  // a lug: rectangle from z0 up to the centre height c[1], with a round top of radius r (in x, z)
  const lugProfile = (x0, x1, z0, cz, r) => [[x0, z0], [x1, z0], ...Array.from({ length: 21 }, (_, i) => { const a = Math.PI * i / 20; return [(x0 + x1) / 2 + r * Math.cos(a), cz + r * Math.sin(a)]; })].filter((p, i, A) => i < 2 || Math.hypot(p[0] - A[i - 1][0], p[1] - A[i - 1][1]) > 1e-6);
  const onArc = (c, r) => (p, q) => [p, q].every(v => Math.abs(Math.hypot(v[0] - c[0], v[1] - c[1]) - r) < 1e-6);
  const cutSolid = (faces, n, d) => { const SK = global.SolidKit; if (!SK) return faces; const r = SK.cut(faces, n, d); if (r.cap) r.cap.cutFace = true; return r.faces; };

  // a turned part: profile [[x along the axis, r], ...] (a closed loop, the bore included) turned about
  // the y axis (front to back), so the front view shows the circles
  function revolve(profile, n) {
    n = n || 48;
    const P = ccw(profile), faces = [];
    P.forEach((p, i) => {
      const q = P[(i + 1) % P.length], dx = q[0] - p[0], dr = q[1] - p[1];
      if (Math.abs(dx) < 1e-9 && Math.abs(dr) < 1e-9) return;
      const flat = Math.abs(dx) < 1e-9;                         // a face square to the axis: an annulus
      for (let k = 0; k < n; k++) {
        const a0 = TAU * k / n, a1 = TAU * (k + 1) / n, am = (a0 + a1) / 2;
        const at = (v, a) => [v[1] * Math.cos(a), v[0], v[1] * Math.sin(a)];
        const pts = [at(p, a0), at(q, a0), at(q, a1), at(p, a1)].filter((v, j, A) => A.findIndex(w => Math.hypot(w[0] - v[0], w[1] - v[1], w[2] - v[2]) < 1e-9) === j);
        if (pts.length < 3) continue;
        faces.push(F(pts, [-dx * Math.cos(am), dr, -dx * Math.sin(am)], flat ? null : { smooth: { a: true, b: true, all: true } }));
      }
    });
    return faces;
  }
  // a regular polygon in plan, the first corner at the back (as the top views draw it)
  const regPlan = (n, R) => Array.from({ length: n }, (_, i) => { const a = Math.PI / 2 + TAU * i / n; return [R * Math.cos(a), R * Math.sin(a)]; });
  const planeCut = (x0, z0, x1, z1) => { const T = (z0 - z1) / (x1 - x0), k = Math.hypot(T, 1); return [[T / k, 0, 1 / k], (z0 + T * x0) / k]; };

  const hopper = (b, t, h) => () => [loft(sq(b), 0, sq(t), h)];
  const roundToSquare = () => [loft(sq(70), 0, circle([0, 0], 24, 24), 45, 'top')];

  const DEFS = {
    // ── Transition pieces ──
    'hopper-views': hopper(60, 28, 45),
    'hopper-true-length': hopper(60, 28, 45),
    'hopper-development': hopper(60, 28, 45),
    'hopper-chute-worked-example': hopper(70, 24, 50),
    'triangulation-principle': roundToSquare,
    'corner-triangle-true-length': roundToSquare,
    'two-triangles-development': roundToSquare,
    'seam-allowance': () => [loft(circle([0, 0], 18, 40), 0, circle([0, 0], 18, 40), 55, true)],

    // ── Interpenetration and development ──
    'interpenetration-equal-cylinders': () => [cylZ([0, 0], 25, 0, 120), cylX([0, 45], 25, 0, 90)],
    'interpenetration-unequal-cylinders': () => [cylZ([0, 0], 32, 0, 130), cylX([0, 55], 16, 0, 85)],
    'interpenetration-square-prism': () => [cylZ([0, 0], 28, 0, 120), extr(rect(-16, 55 - 16, 16, 55 + 16), 'yz', 0, 85)],
    'development-cylinder': () => [cylZ([0, 0], 20, 0, 60)],
    'development-oblique-cylinder': () => [cutSolid(cylZ([0, 0], 20, 0, 60), (() => { const T = 26 / 40, k = Math.hypot(T, 1); return [T / k, 0, 1 / k]; })(), 47 / Math.hypot(26 / 40, 1))],
    'development-cone': () => [pyramid(circle([0, 0], 20, 48), 0, [0, 0, 45], true)],
    'development-square-prism': () => [box(0, 0, 0, 25, 25, 50)],
    'development-square-pyramid': () => [pyramid(sq(30), 0, [0, 0, 40])],

    // ── Solid geometry (the first worked drawings) ──
    'hex-prism-first-angle': () => [extr(regPlan(6, 25), 'xy', 0, 55)],
    'square-pyramid-views': () => [pyramid(sq(50), 0, [0, 0, 45])],
    'pentagonal-prism-views': () => [extr(regPlan(5, 28), 'xy', 0, 55)],
    'inclined-cut-true-shape': () => [cutSolid(box(0, 0, 0, 45, 45, 70), ...planeCut(0, 70, 45, 40))],
    'cylinder-oblique-true-shape': () => [cutSolid(cylZ([0, 0], 22, 0, 70), ...planeCut(-22, 70, 22, 35))],
    'cone-frustum': () => [cutSolid(pyramid(circle([0, 0], 25, 48), 0, [0, 0, 60], true), [0, 0, 1], 25)],
    'pyramidal-hole-block': () => {
      // the block, its top face with the square opening, and the four faces tapering to a point 25 below
      const o = rect(25, 5, 55, 35).map(([x, y]) => [x, y, 45]), apex = [40, 20, 20];
      const faces = box(0, 0, 0, 80, 40, 45).map(f => (f.n[2] > 0 ? Object.assign({}, f, { holes: [o] }) : f));
      o.forEach((p, i) => { const q = o[(i + 1) % 4], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; faces.push(F([p, q, apex], [(40 - m[0]) * 25 / 15, (20 - m[1]) * 25 / 15, 15])); });
      return [faces];
    },

    // ── Orthographic projection ──
    'l-bracket-views': () => [box(0, 0, 0, 15, 15, 40), box(15, 0, 0, 60, 15, 15, [circle([40, 7.5], 4, 32)])],
    'sectional-view': () => [box(0, 0, 0, 80, 14, 20), box(0, 0, 20, 80, 14, 40, [rect(25, 3, 55, 11)])],
    'half-sectional-view': () => [extr(rect(0, 0, 120, 50), 'xz', 0, 15, { holes: [circle([30, 25], 6, 32), circle([90, 25], 6, 32)] })],
    'auxiliary-view': () => [extr([[0, 0], [80, 0], [80, 50], [25, 50], [0, 20]], 'xz', 0, 30)],
    'ortho-from-iso-guide-block': () => [box(0, 0, 0, 50, 40, 15, [circle([20, 20], 6, 32)]), box(50, 0, 0, 70, 40, 45)],
    'ortho-from-iso-lug-base': () => [box(0, 0, 0, 80, 50, 12), extr(lugProfile(50, 80, 12, 37, 15), 'xz', 38, 50, { holes: [circle([65, 37], 7, 32)], curved: onArc([65, 37], 15) })],

    'break-line-shaft': () => [cylX([0, 10], 10, 0, 450)],
    'basic-bolted-joint': () => {
      const hex = af => regPlan(6, af / Math.sqrt(3)).map(([x, y]) => [y, x]);          // flats front and back
      return Object.assign([box(-40, -20, 22, 40, 20, 38, [circle([0, 0], 6, 32)]), box(-40, -20, 38, 40, 20, 50, [circle([0, 0], 6, 32)]),
        cylZ([0, 0], 5, -3, 50), extr(hex(18), 'xy', 50, 62), extr(hex(16), 'xy', 0, 12, { holes: [circle([0, 0], 5, 32)] })], { parts: true });   // an assembly: each part keeps its outline
    },
    'removed-section-flat': () => {
      // the flat: the shaft's own 40 facets below a chord through two of its corners (36° and 144°,
      // about 5 mm down), so the flat part joins the round parts without a seam
      const ring = circle([0, 0], 12, 40), prof = ring.filter((p, i) => { const a = i * 9; return a >= 144 || a <= 36; });
      const k = prof.findIndex((p, i) => i > 0 && Math.abs(Math.atan2(p[1], p[0]) * 180 / Math.PI - 144) < 0.01);
      const loop = prof.slice(k).concat(prof.slice(0, k));            // 144° … round the bottom … 36°, then the chord
      return ([cylX([0, 0], 12, 0, 50), extr(loop, 'yz', 50, 75, { curved: onArc([0, 0], 12) }), cylX([0, 0], 12, 75, 120)]);
    },
    'assembling-given-parts': () => Object.assign([extr(rect(0, 0, 40, 30), 'yz', 0, 55, { holes: [circle([20, 15], 7.3, 36)] }), cylX([20, 15], 7, 0.4, 54.6)], { parts: true }),

    // ── Isometric drawing ──
    'isometric-wedge': () => [extr([[0, 0], [40, 0], [40, 35]], 'yz', 0, 60)],
    'isometric-circle': () => [cylZ([25, 25], 25, 0, 4)],
    'isometric-hexagon': () => [extr([[12.5, 0], [37.5, 0], [50, 21.65], [37.5, 43.3], [12.5, 43.3], [0, 21.65]], 'xy', 0, 30)],
    'isometric-angle': () => [box(0, 0, 0, 50, 30, 35)],
    'isometric-from-views': () => [extr([[0, 0], [60, 0], [60, 45], [50, 45], [45, 40], [45, 15], [0, 15]], 'xz', 0, 35)],
    'sectioned-isometric': () => [extr([[30, 0], [60, 0], [60, 60], [0, 60], [0, 30], [30, 30]], 'xy', 0, 45)],
    'isometric-cylinder': () => [cylZ([20, 20], 20, 0, 45)],
    'isometric-circle-vertical': () => [box(0, 0, 0, 50, 50, 50)],

    // ── Isometric sections and assemblies (the whole object) ──
    'isometric-half-section': () => [box(0, 0, 0, 60, 60, 40)],
    'isometric-rib-not-hatched': () => [box(0, 0, 0, 60, 60, 20), box(26, 0, 20, 34, 60, 50)],
    'isometric-dimensioning': () => [box(0, 0, 0, 50, 35, 40)],
    'isometric-half-section-blind-hole': () => [box(0, 0, 0, 60, 60, 20), box(0, 0, 20, 60, 60, 40, [circle([30, 30], 10, 36)])],
    'exploded-isometric-assembly': () => [box(0, 0, 0, 50, 50, 15), box(0, 0, 37, 50, 50, 52), box(0, 0, 74, 50, 50, 84)],
    'sectioned-isometric-assembly': () => [box(0, 0, 0, 60, 60, 15), box(0, 0, 15, 60, 60, 40, [rect(15, 15, 45, 45)]), box(17, 17, 15, 43, 43, 35)],
    'sectioned-bracket-rib-and-hole': () => [box(0, 0, 0, 60, 60, 10), box(0, 0, 10, 60, 60, 24, [circle([42, 30], 8, 36)]), box(8, 0, 24, 16, 60, 50)],
    'isometric-section-capstone': () => [box(0, 0, 0, 60, 60, 10), box(0, 0, 10, 60, 60, 24, [circle([42, 30], 8, 36)]), box(8, 0, 24, 16, 60, 50)],
  };

  const cache = {};
  global.DruidModelDefs = {
    has: id => !!DEFS[id],
    // md: the exercise; a turned part carries its profile as md._turned
    get(id, md) {
      if (!cache[id]) {
        if (DEFS[id]) cache[id] = DEFS[id]();
        else if (md && md._turned) cache[id] = [revolve(md._turned)];
      }
      return cache[id] || null;
    },
  };
})(window);
