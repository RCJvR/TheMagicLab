// PerspectiveKit — measured (plan-method) perspective for Drawing Druid.
//
// The sheet is laid out the way South African EGD workbooks set it up:
//   - the TOP VIEW (plan) sits above the picture-plane line PP, touching it at one corner
//     (two-point) or along its front face (one-point);
//   - the station point SP is below, at the viewing distance d from PP;
//   - the ground line GL and horizon line HL (eye height h above GL) carry the perspective;
//   - visual rays from SP to the plan's corners cross PP, and those crossings drop vertically
//     into the perspective; heights come from the true-height line where the object touches PP.
//
// Every point is also computed exactly by central projection, so the construction and the
// answer always agree.
(function (global) {
  'use strict';

  // opts: { sx, d, yPP, yGL, h, theta (deg; 0 = one-point), cx (where the object touches PP) }
  function setup(opts) {
    const th = (opts.theta || 0) * Math.PI / 180;
    const cs = Math.cos(th), sn = Math.sin(th);
    const { sx, d, yPP, yGL, h } = opts;
    const cx = opts.cx != null ? opts.cx : sx;

    // object (u along the right-receding edge, v along the left-receding edge, z up)
    // → world plan coordinates (X along PP, Y depth behind PP)
    function world(u, v) { return [cx + u * cs - v * sn, u * sn + v * cs]; }
    // plan drawn above PP at full size
    function plan(u, v) { const [X, Y] = world(u, v); return [X, yPP - Y]; }
    // where the visual ray from SP to a plan point crosses PP
    function onPP(u, v) { const [X, Y] = world(u, v); return [sx + (X - sx) * d / (d + Y), yPP]; }
    // the perspective of a 3D point
    function persp(u, v, z) {
      const [X, Y] = world(u, v);
      const k = d / (d + Y);
      return [sx + (X - sx) * k, yGL - (h + (z - h) * k)];
    }
    const SP = [sx, yPP + d];
    const yHL = yGL - h;
    // vanishing points: lines from SP parallel to the plan edges, to PP, then down to HL
    const vps = {};
    if (opts.theta) {
      vps.RVP = [sx + d * cs / sn, yHL];   // direction of u
      vps.LVP = [sx - d * sn / cs, yHL];   // direction of v
      vps.RPP = [vps.RVP[0], yPP];
      vps.LPP = [vps.LVP[0], yPP];
    } else {
      vps.VP = [sx, yHL];
    }
    // eye position in world coordinates (for visibility)
    const eye = [sx, -d, h];
    return { world, plan, onPP, persp, SP, yHL, yPP, yGL, sx, d, h, cx, vps, eye, cs, sn };
  }

  // ── Solids: extruded profiles with outward normals (same convention as the isometric chapter)
  //   'uz': profile (u, z) extruded along v from t0 to t1
  //   'vz': profile (v, z) extruded along u
  //   'uv': profile (u, v) extruded along z
  //   smooth: optional set of profile vertex indices where the surface is curved (no real
  //   edge); the line along the extrusion there is drawn only where it forms the outline.
  function extrude(profile, plane, t0, t1, smooth) {
    const to3 = (a, b, t) => plane === 'uz' ? [a, t, b] : plane === 'vz' ? [t, a, b] : [a, b, t];
    const n3 = (na, nb) => plane === 'uz' ? [na, 0, nb] : plane === 'vz' ? [0, na, nb] : [na, nb, 0];
    const axis = plane === 'uz' ? [0, 1, 0] : plane === 'vz' ? [1, 0, 0] : [0, 0, 1];
    const faces = [];
    faces.push({ pts: profile.map(([a, b]) => to3(a, b, t0)), n: axis.map(x => -x) });
    faces.push({ pts: profile.map(([a, b]) => to3(a, b, t1)), n: axis });
    profile.forEach((p, i) => {
      const q = profile[(i + 1) % profile.length];
      const j = (i + 1) % profile.length;
      faces.push({
        pts: [to3(p[0], p[1], t0), to3(q[0], q[1], t0), to3(q[0], q[1], t1), to3(p[0], p[1], t1)],
        n: n3(q[1] - p[1], -(q[0] - p[0])),
        smoothEdges: smooth ? [smooth.has(j) ? 1 : -1, smooth.has(i) ? 3 : -1] : null,
      });
    });
    return faces;
  }

  // A face is visible when the eye is on the side its outward normal points to.
  function faceVisible(P, f) {
    const [u, v, z] = f.pts[0];
    const [X, Y] = P.world(u, v);
    // rotate the object normal into world axes
    const nw = [f.n[0] * P.cs - f.n[1] * P.sn, f.n[0] * P.sn + f.n[1] * P.cs, f.n[2]];
    const toEye = [P.eye[0] - X, P.eye[1] - Y, P.eye[2] - z];
    return nw[0] * toEye[0] + nw[1] * toEye[1] + nw[2] * toEye[2] > 1e-9;
  }

  function visibleEdges(P, faces) {
    const key = p => p.map(v => (+v).toFixed(3)).join(',');
    const count = new Map(), smoothKeys = new Set(), order = [];
    faces.forEach(f => {
      const vis = faceVisible(P, f);
      f.pts.forEach((p, i) => {
        const q = f.pts[(i + 1) % f.pts.length];
        const k = [key(p), key(q)].sort().join('|');
        if (f.smoothEdges && f.smoothEdges.includes(i)) smoothKeys.add(k);
        if (!count.has(k)) { count.set(k, 0); order.push([k, p, q]); }
        if (vis) count.set(k, count.get(k) + 1);
      });
    });
    // an edge shows if a visible face has it — except a smooth edge between two visible faces
    return order.filter(([k]) => count.get(k) > 0 && !(smoothKeys.has(k) && count.get(k) > 1)).map(([, p, q]) => [p, q]);
  }

  function perspLines(P, edges, lineType) {
    return edges.map(([p, q]) => ({ kind: 'line', p1: P.persp(...p), p2: P.persp(...q), lineType }));
  }

  // ── Standard construction pieces as reveals ──

  // PP / GL / HL lines with their bilingual labels, and the SP mark.
  function frame(P, x0, x1, opts) {
    opts = opts || {};
    const r = [
      { kind: 'line', p1: [x0, P.yPP], p2: [x1, P.yPP], lineType: 'B' },
      { kind: 'label', at: [x0 - 2, P.yPP - 1], text: 'PP', size: 3.6, anchor: 'end', color: '#e8eaf2' },
      { kind: 'label', at: [x0 - 2, P.yPP + 5.5], text: 'PV', size: 3.6, anchor: 'end', color: '#e8eaf2' },
      { kind: 'line', p1: [x0, P.yGL], p2: [x1, P.yGL], lineType: 'B' },
      { kind: 'label', at: [x0 - 2, P.yGL + 1.3], text: 'GL', size: 3.6, anchor: 'end', color: '#e8eaf2' },
    ];
    if (!opts.noHL) {
      r.push(
        { kind: 'line', p1: [x0, P.yHL], p2: [x1, P.yHL], lineType: 'B' },
        { kind: 'label', at: [x0 - 2, P.yHL + 1.3], text: 'HL', size: 3.6, anchor: 'end', color: '#e8eaf2' }
      );
    }
    return r;
  }

  function spMark(P) {
    const [x, y] = P.SP;
    return [
      { kind: 'line', p1: [x - 4, y], p2: [x + 4, y], lineType: 'B' },
      { kind: 'line', p1: [x, y - 4], p2: [x, y + 4], lineType: 'B' },
      { kind: 'label', at: [x + 3, y + 6], text: 'SP', size: 3.6, anchor: 'start', color: '#e8eaf2' },
    ];
  }

  // Visual rays from SP to each plan point (stopping at the point), and the drop lines from
  // their PP crossings down to the perspective.
  function rays(P, pts2) {
    return pts2.map(([u, v]) => ({ kind: 'line', p1: P.SP, p2: P.plan(u, v), lineType: 'construction' }));
  }
  function drops(P, pts3) {
    return pts3.map(([u, v, z]) => ({ kind: 'line', p1: P.onPP(u, v), p2: P.persp(u, v, z), lineType: 'construction' }));
  }

  // Returns seg => true when the edge belongs to a door or window opening (an edge of a reveal
  // face or of an opening's outline in a wall), so builders can draw openings last.
  function openingTest(solids) {
    const loops = [];
    solids.forEach(s => s.forEach(f => { if (f.opening) loops.push(f.pts); (f.openingHoles || []).forEach(h => loops.push(h)); }));
    const onSeg = (m, a, b) => {
      const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], l2 = ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2];
      const t = l2 ? ((m[0] - a[0]) * ab[0] + (m[1] - a[1]) * ab[1] + (m[2] - a[2]) * ab[2]) / l2 : 0;
      if (t < -1e-6 || t > 1 + 1e-6) return false;
      return Math.hypot(m[0] - a[0] - ab[0] * t, m[1] - a[1] - ab[1] * t, m[2] - a[2] - ab[2] * t) < 1e-3;
    };
    return ([p, q]) => { const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2]; return loops.some(l => l.some((a, i) => onSeg(m, a, l[(i + 1) % l.length]))); };
  }

  // The horizon is usually given above the object, so the drawing looks down on it: raise
  // the eye height to clear the tallest part when a set-up has it lower.
  function eyeAbove(setupOpts, solids) {
    let zMax = 0;
    solids.forEach(s => s.forEach(f => f.pts.forEach(p => { zMax = Math.max(zMax, p[2]); })));
    const o = Object.assign({}, setupOpts);
    const want = zMax + Math.max(10, zMax * 0.3);
    if (o.h < zMax + 6) o.h = Math.min(want, o.yGL - o.yPP - 10);
    return o;
  }

  global.PerspectiveKit = { setup, extrude, visibleEdges, perspLines, frame, spMark, rays, drops, openingTest, eyeAbove };
})(window);
