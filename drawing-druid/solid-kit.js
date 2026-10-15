// SolidKit — 3D solids with true hidden-line removal for Drawing Druid.
//
// A part or building is defined ONCE as solids made of planar faces (outward normals,
// optional holes). From that one definition we can draw it in perspective, in isometric,
// and in any orthographic view, with hidden edges either left out (pictorials) or drawn
// dashed (orthographic views). Every edge is tested against every face, so parts that hide
// other parts (a house behind its garage, a reveal behind a wall face) come out right.
(function (global) {
  'use strict';

  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const len = a => Math.hypot(a[0], a[1], a[2]);
  const unit = a => { const l = len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

  // Newell normal of a polygon (anticlockwise seen from outside → outward).
  function newell(pts) {
    let n = [0, 0, 0];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i], q = pts[(i + 1) % pts.length];
      n = add(n, [(p[1] - q[1]) * (p[2] + q[2]), (p[2] - q[2]) * (p[0] + q[0]), (p[0] - q[0]) * (p[1] + q[1])]);
    }
    return unit(n);
  }

  function face(pts, opts) {
    opts = opts || {};
    const n = opts.n ? unit(opts.n) : newell(pts);
    return { pts, holes: opts.holes || [], n, smooth: opts.smooth || null };
  }

  // ── Builders ──

  function box(x0, y0, z0, x1, y1, z1) {
    const P = (x, y, z) => [x, y, z];
    return [
      face([P(x0, y0, z0), P(x0, y1, z0), P(x1, y1, z0), P(x1, y0, z0)]),   // bottom (-z)
      face([P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)]),   // top (+z)
      face([P(x0, y0, z0), P(x1, y0, z0), P(x1, y0, z1), P(x0, y0, z1)]),   // front (-y)
      face([P(x1, y1, z0), P(x0, y1, z0), P(x0, y1, z1), P(x1, y1, z1)]),   // back (+y)
      face([P(x0, y1, z0), P(x0, y0, z0), P(x0, y0, z1), P(x0, y1, z1)]),   // left (-x)
      face([P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)]),   // right (+x)
    ];
  }

  // Extrude an anticlockwise 2D profile.
  //   'xz': profile (x, z) along y   'yz': profile (y, z) along x   'xy': profile (x, y) along z
  //   smooth: optional Set of profile vertex indices on a curve (no edge drawn there except
  //   as an outline).
  function extrude(profile, plane, t0, t1, smooth) {
    const to3 = (a, b, t) => plane === 'xz' ? [a, t, b] : plane === 'yz' ? [t, a, b] : [a, b, t];
    const faces = [];
    // caps: build so their Newell normal points along -axis at t0, +axis at t1
    const capA = profile.map(([a, b]) => to3(a, b, t0)), capB = profile.map(([a, b]) => to3(a, b, t1));
    const axis = plane === 'xz' ? [0, 1, 0] : plane === 'yz' ? [1, 0, 0] : [0, 0, 1];
    faces.push(face(capA, { n: mul(axis, -1) }));
    faces.push(face(capB, { n: axis }));
    profile.forEach((p, i) => {
      const j = (i + 1) % profile.length, q = profile[j];
      const pts = [to3(p[0], p[1], t0), to3(q[0], q[1], t0), to3(q[0], q[1], t1), to3(p[0], p[1], t1)];
      const na = q[1] - p[1], nb = -(q[0] - p[0]);
      const n = plane === 'xz' ? [na, 0, nb] : plane === 'yz' ? [0, na, nb] : [na, nb, 0];
      faces.push(face(pts, { n, smooth: smooth ? { a: smooth.has(i), b: smooth.has(j) } : null }));
    });
    return faces;
  }

  // A general convex polyhedron from vertex loops (each loop anticlockwise from outside).
  function poly(loops) { return loops.map(l => face(l)); }

  // Hipped roof over the rectangle x0..x1, y0..y1 at eaves height z, ridge height zr,
  // ridge running along x (inset by the hip on each end).
  function hipRoof(x0, y0, x1, y1, z, zr) {
    const hy = (y1 - y0) / 2, ym = y0 + hy;
    const r0 = [x0 + hy, ym, zr], r1 = [x1 - hy, ym, zr];
    const A = [x0, y0, z], B = [x1, y0, z], C = [x1, y1, z], D = [x0, y1, z];
    return [
      face([A, B, r1, r0]), face([C, D, r0, r1]), face([B, C, r1]), face([D, A, r0]),
      face([A, D, C, B], { n: [0, 0, -1] }),
    ];
  }

  // Cut a rectangular opening (window or door) of depth t into a face of a solid.
  //   faces: the solid's face list; fi: index of the face; rect: [u0, v0, u1, v1] measured
  //   along the face's first edge (u) and up its second direction (v); t: wall thickness.
  // The face gets a hole; four reveal faces and a back face (glass / door leaf) are added.
  function opening(faces, fi, rect, t) {
    const f = faces[fi];
    const o = f.pts[0], u = unit(sub(f.pts[1], f.pts[0]));
    const v = unit(cross(f.n, u));
    const at = (a, b, d) => add(add(add(o, mul(u, a)), mul(v, b)), mul(f.n, -d));
    const [u0, v0, u1, v1] = rect;
    const front = [at(u0, v0, 0), at(u1, v0, 0), at(u1, v1, 0), at(u0, v1, 0)];
    const back = [at(u0, v0, t), at(u1, v0, t), at(u1, v1, t), at(u0, v1, t)];
    f.holes = f.holes.concat([front]);
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      // reveal faces point into the opening
      faces.push(face([front[i], back[i], back[j], front[j]].reverse()));
    }
    faces.push(face(back.slice(), { n: f.n }));
    return faces;
  }

  // The same, with the opening given by two opposite 3D corners on the face. With
  // opts.through the opening runs right through the solid: the opposite parallel face gets
  // the matching hole and no back face is added.
  function openingAt(faces, fi, cornerA, cornerB, t, opts) {
    const f = faces[fi], b = basis(f);
    const a2 = b.to2(cornerA), c2 = b.to2(cornerB);
    const rect = [Math.min(a2[0], c2[0]), Math.min(a2[1], c2[1]), Math.max(a2[0], c2[0]), Math.max(a2[1], c2[1])];
    opening(faces, fi, rect, t);
    if (opts && opts.through) {
      faces.pop();                                   // no back face
      const at = (u, v) => add(add(add(b.o, mul(b.u, u)), mul(b.v, v)), mul(f.n, -t));
      const ring = [at(rect[0], rect[1]), at(rect[2], rect[1]), at(rect[2], rect[3]), at(rect[0], rect[3])];
      const opp = faces.find(g => dot(g.n, f.n) < -0.9999 && Math.abs(dot(g.n, g.pts[0]) - dot(g.n, ring[0])) < 1e-6);
      if (opp) opp.holes = opp.holes.concat([ring]);
    }
    return faces;
  }

  function translate(faces, d) {
    return faces.map(f => ({ pts: f.pts.map(p => add(p, d)), holes: f.holes.map(h => h.map(p => add(p, d))), n: f.n, smooth: f.smooth }));
  }

  // ── Hidden-line removal ──

  function basis(f) {
    const o = f.pts[0];
    let u = sub(f.pts[1], o);
    if (len(u) < 1e-9) u = sub(f.pts[2], o);
    u = unit(u);
    const v = unit(cross(f.n, u));
    return { o, u, v, to2: p => { const d = sub(p, o); return [dot(d, u), dot(d, v)]; } };
  }

  function inPoly2(pt, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  function prepare(solids) {
    const faces = [];
    solids.forEach(s => s.forEach(f => {
      const b = basis(f);
      faces.push({ f, b, d: dot(f.n, f.pts[0]), outer2: f.pts.map(b.to2), holes2: f.holes.map(h => h.map(b.to2)) });
    }));
    // edges with their adjacent faces
    const key = p => p.map(v => (Math.round(v * 1000) / 1000).toFixed(3)).join(',');
    const edges = new Map();
    faces.forEach((F, fi) => {
      const loops = [F.f.pts].concat(F.f.holes);
      loops.forEach((loop, li) => loop.forEach((p, i) => {
        const q = loop[(i + 1) % loop.length];
        const k = [key(p), key(q)].sort().join('|');
        if (!edges.has(k)) edges.set(k, { p, q, faces: [], smooth: false });
        const e = edges.get(k);
        e.faces.push(fi);
        // a side face of a smooth extrusion: its edges along the extrusion are smooth
        if (li === 0 && F.f.smooth && (i === 1 && F.f.smooth.b || i === 3 && F.f.smooth.a)) e.smooth = true;
      }));
    });
    return { faces, edges: [...edges.values()] };
  }

  // view: { toViewer(p) → unit vector from p towards the eye, distance(p) → distance to eye (Infinity
  //         for parallel views), project(p) → [x, y] }
  function occluded(scene, p, view) {
    const dir = view.toViewer(p);
    const maxT = view.distance(p);
    for (const F of scene.faces) {
      const denom = dot(F.f.n, dir);
      if (Math.abs(denom) < 1e-9) continue;
      const t = (F.d - dot(F.f.n, p)) / denom;
      if (t <= 1e-4 || t >= maxT) continue;
      const hit = add(p, mul(dir, t));
      const h2 = F.b.to2(hit);
      if (!inPoly2(h2, F.outer2)) continue;
      if (F.holes2.some(h => inPoly2(h2, h))) continue;
      return true;
    }
    return false;
  }

  function faceFront(F, view, p) { return dot(F.f.n, view.toViewer(p)) > 1e-9; }

  // Returns { visible: [[p, q]...], hidden: [[p, q]...] } as 3D segments.
  function hlr(solids, view) {
    const scene = prepare(solids);
    const visible = [], hidden = [];
    scene.edges.forEach(e => {
      const fs = e.faces.map(i => scene.faces[i]);
      const mid = mul(add(e.p, e.q), 0.5);
      // skip seams between coplanar faces
      if (fs.length >= 2 && fs.every(F => dot(F.f.n, fs[0].f.n) > 0.9999) && !e.smooth) return;
      const fronts = fs.map(F => faceFront(F, view, mid));
      if (e.smooth && fs.length >= 2 && fronts.every(x => x === fronts[0])) return;   // not on the outline
      const L = len(sub(e.q, e.p));
      const n = Math.max(6, Math.ceil(L / 1.2));
      // a point slightly in front of its faces, so it does not hide itself
      const nudge = p => {
        let d = [0, 0, 0];
        fs.forEach(F => { d = add(d, F.f.n); });
        return add(p, mul(unit(d), 1e-3));
      };
      const vis = t => !occluded(scene, nudge(add(e.p, mul(sub(e.q, e.p), t))), view);
      let t0 = 0, state = vis(0.5 / n);
      const bound = (a, b) => { let lo = a, hi = b; const sa = vis(a); for (let k = 0; k < 10; k++) { const m = (lo + hi) / 2; if (vis(m) === sa) lo = m; else hi = m; } return (lo + hi) / 2; };
      for (let i = 1; i <= n; i++) {
        const t = (i - 0.5) / n;
        const s = i === n ? !state : vis(t);
        if (i === n || s !== state) {
          const tb = i === n ? 1 : bound((i - 1.5) / n, t);
          const seg = [add(e.p, mul(sub(e.q, e.p), t0)), add(e.p, mul(sub(e.q, e.p), tb))];
          if (tb - t0 > 1e-3) (state ? visible : hidden).push(seg);
          t0 = tb; state = s;
        }
      }
    });
    return { visible, hidden };
  }

  // ── Views ──

  // Parallel isometric view: x along the right-hand 30° axis, y the left, z up.
  function isoView(o) {
    const C30 = Math.cos(Math.PI / 6);
    const dir = unit([-1, -1, 1]);
    return { toViewer: () => dir, distance: () => Infinity, project: p => [o[0] + (p[0] - p[1]) * C30, o[1] - (p[0] + p[1]) * 0.5 - p[2]] };
  }

  // Orthographic views. kind: 'front' (looking along +y), 'top' (looking down), 'right'
  // (looking along -x, from the right), 'left' (looking along +x).
  //   o: screen position of the view's origin; for 'top' the FRONT edge (y = 0) is at o[1]
  //   and depth goes up the sheet (3rd angle, top view above the front view).
  function orthoView(kind, o, flipDepth) {
    const k = flipDepth ? -1 : 1;
    if (kind === 'front') return { toViewer: () => [0, -1, 0], distance: () => Infinity, project: p => [o[0] + p[0], o[1] - p[2]] };
    if (kind === 'top') return { toViewer: () => [0, 0, 1], distance: () => Infinity, project: p => [o[0] + p[0], o[1] - k * p[1]] };
    if (kind === 'right') return { toViewer: () => [1, 0, 0], distance: () => Infinity, project: p => [o[0] + k * p[1], o[1] - p[2]] };
    if (kind === 'left') return { toViewer: () => [-1, 0, 0], distance: () => Infinity, project: p => [o[0] - k * p[1], o[1] - p[2]] };
    throw new Error('view ' + kind);
  }

  // Perspective view from a PerspectiveKit set-up (object coordinates u, v, z).
  function perspView(P) {
    // the eye in object coordinates
    const ex = P.eye[0] - P.cx, ey = P.eye[1];
    const eye = [ex * P.cs + ey * P.sn, -ex * P.sn + ey * P.cs, P.eye[2]];
    return {
      eye,
      toViewer: p => unit(sub(eye, p)),
      distance: p => len(sub(eye, p)),
      project: p => P.persp(p[0], p[1], p[2]),
    };
  }

  // Draw a set of solids in a view: visible edges as Type A lines; hidden edges dashed
  // (opts.hidden) or left out.
  function draw(solids, view, opts) {
    opts = opts || {};
    const r = hlr(solids, view);
    const out = r.visible.map(([p, q]) => ({ kind: 'line', p1: view.project(p), p2: view.project(q), lineType: opts.lineType || 'A' }));
    if (opts.hidden) r.hidden.forEach(([p, q]) => out.push({ kind: 'line', p1: view.project(p), p2: view.project(q), lineType: 'hidden' }));
    return out;
  }

  global.SolidKit = { face, box, extrude, poly, hipRoof, opening, openingAt, translate, hlr, draw, isoView, orthoView, perspView, newell };
})(window);
