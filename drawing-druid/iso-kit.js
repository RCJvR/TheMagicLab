// IsoKit — exact 3D → isometric projection for Drawing Druid pictorials.
// x = length (the right-hand 30° axis), y = depth (the left-hand 30° axis), z = height.
// Parts are defined in 3D and projected, so lengths along the axes are true and ellipses
// are projected true circles. Only edges of faces that face the viewer are drawn.
(function (global) {
  'use strict';
  const C30 = Math.cos(Math.PI / 6);
  function P(o, x, y, z) { return [o[0] + (x - y) * C30, o[1] - (x + y) * 0.5 - z]; }
  const VIEW = [-1, -1, 1];

  // Unit screen directions of the three axes (for dimension extension lines).
  const DIR = { x: [C30, -0.5], y: [-C30, -0.5], z: [0, -1], negX: [-C30, 0.5], negY: [C30, 0.5], negZ: [0, 1] };

  //   'xz': profile (x, z), extruded along y from t0 to t1
  //   'yz': profile (y, z), extruded along x
  //   'xy': profile (x, y), extruded along z
  function extrude(profile, plane, t0, t1) {
    const to3 = (a, b, t) => plane === 'xz' ? [a, t, b] : plane === 'yz' ? [t, a, b] : [a, b, t];
    const n3 = (na, nb) => plane === 'xz' ? [na, 0, nb] : plane === 'yz' ? [0, na, nb] : [na, nb, 0];
    const axis = plane === 'xz' ? [0, 1, 0] : plane === 'yz' ? [1, 0, 0] : [0, 0, 1];
    const faces = [];
    faces.push({ pts: profile.map(([a, b]) => to3(a, b, t0)), n: axis.map(v => -v) });
    faces.push({ pts: profile.map(([a, b]) => to3(a, b, t1)), n: axis });
    profile.forEach((p, i) => {
      const q = profile[(i + 1) % profile.length];
      faces.push({ pts: [to3(p[0], p[1], t0), to3(q[0], q[1], t0), to3(q[0], q[1], t1), to3(p[0], p[1], t1)], n: n3(q[1] - p[1], -(q[0] - p[0])) });
    });
    return faces;
  }

  function visibleEdges(faces) {
    const seen = new Set(), edges = [];
    const key = p => p.map(v => (+v).toFixed(3)).join(',');
    faces.forEach(f => {
      if (f.n[0] * VIEW[0] + f.n[1] * VIEW[1] + f.n[2] * VIEW[2] <= 1e-9) return;
      f.pts.forEach((p, i) => {
        const q = f.pts[(i + 1) % f.pts.length];
        const k = [key(p), key(q)].sort().join('|');
        if (seen.has(k)) return;
        seen.add(k);
        edges.push([p, q]);
      });
    });
    return edges;
  }

  function lines3(o, edges, lineType) {
    return edges.map(([p, q]) => ({ kind: 'line', p1: P(o, ...p), p2: P(o, ...q), lineType }));
  }

  // A true circle on one of the three planes, as projected points (angles in degrees).
  function circle(o, c, r, plane, a0, a1, n) {
    a0 = a0 == null ? 0 : a0; a1 = a1 == null ? 360 : a1; n = n || 48;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      const u = r * Math.cos(t), v = r * Math.sin(t);
      const p3 = plane === 'xy' ? [c[0] + u, c[1] + v, c[2]] : plane === 'xz' ? [c[0] + u, c[1], c[2] + v] : [c[0], c[1] + u, c[2] + v];
      pts.push(P(o, ...p3));
    }
    return pts;
  }

  // An aligned isometric dimension between two 3D points, its extension lines running along
  // the given axis direction (a DIR entry).
  function dim(o, a, b, dir, offset, text) {
    return { kind: 'dimension', p1: P(o, ...a), p2: P(o, ...b), dir, offset, text: String(text) };
  }

  global.IsoKit = { P, DIR, extrude, visibleEdges, lines3, circle, dim };
})(window);
