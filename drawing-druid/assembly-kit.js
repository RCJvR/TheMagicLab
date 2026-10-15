// AssemblyKit — 2D helpers for mechanical assembly drawings in Drawing Druid.
//
// Turned parts (pulleys, bushes, shafts, washers) are defined by a profile in (x, r): x along
// the axis, r the radius, as a closed polygon with r >= 0. From that one profile we draw the
// part cut through its axis (hatched), as a plain outside view (for parts that are never
// sectioned: shafts, bolts, nuts, washers, keys), and as an end view.
// Nuts and bolt heads follow the usual proportions of the bolt diameter D:
//   across flats 1.5D, head height 0.7D, nut height 0.8D, washer 2D x 0.2D.
(function (global) {
  'use strict';

  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });

  // ── Hatching clipped to polygons (even-odd, so inner loops become holes) ──
  //   polys: array of closed polygons [[x, y], ...]; angle in degrees; spacing in mm.
  function hatch(polys, angle, spacing) {
    const a = angle * Math.PI / 180, d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]];
    let lo = Infinity, hi = -Infinity;
    polys.forEach(pl => pl.forEach(p => { const s = p[0] * n[0] + p[1] * n[1]; lo = Math.min(lo, s); hi = Math.max(hi, s); }));
    const out = [];
    for (let s = Math.ceil(lo / spacing) * spacing + spacing / 2; s < hi; s += spacing) {
      const ts = [];
      polys.forEach(pl => pl.forEach((p, i) => {
        const q = pl[(i + 1) % pl.length];
        const sp = p[0] * n[0] + p[1] * n[1], sq = q[0] * n[0] + q[1] * n[1];
        if ((sp - s) * (sq - s) >= 0 && !(sp === s && sq !== s)) return;
        const t = (s - sp) / (sq - sp);
        const x = p[0] + (q[0] - p[0]) * t, y = p[1] + (q[1] - p[1]) * t;
        ts.push(x * d[0] + y * d[1]);
      }));
      ts.sort((u, v) => u - v);
      for (let i = 0; i + 1 < ts.length; i += 2) {
        const p = [n[0] * s + d[0] * ts[i], n[1] * s + d[1] * ts[i]];
        const q = [n[0] * s + d[0] * ts[i + 1], n[1] * s + d[1] * ts[i + 1]];
        out.push(L(p, q, 'B'));
      }
    }
    return out;
  }

  // ── Turned parts on a horizontal axis ──
  //   profile: closed polygon in (x, r); placed with x0 at the part's x = 0, axis at height ay.
  //   flip: mirror the part end-for-end.
  function place(profile, x0, ay, flip, len) {
    return profile.map(([x, r]) => [x0 + (flip ? len - x : x), ay - r]);
  }
  function profLen(profile) { return Math.max(...profile.map(p => p[0])); }

  // Cut through the axis: the upper and lower halves of the profile, outlined and hatched.
  function sectioned(profile, x0, ay, hatchAngle, opts) {
    opts = opts || {};
    const len = profLen(profile);
    const up = place(profile, x0, ay, opts.flip, len);
    const dn = up.map(([x, y]) => [x, 2 * ay - y]);
    return [
      ...hatch([up], hatchAngle, opts.spacing || 2.2), ...hatch([dn], hatchAngle, opts.spacing || 2.2),
      { kind: 'polygon', points: up, lineType: 'A' }, { kind: 'polygon', points: dn, lineType: 'A' },
    ];
  }

  // A part that is never sectioned, seen from outside: its outline, and a line across at every
  // change of diameter. Bores are hidden and left out.
  function outside(profile, x0, ay, opts) {
    opts = opts || {};
    const len = profLen(profile);
    // outer silhouette: the largest radius at each x along the part
    const xs = [...new Set(profile.map(p => p[0]))].sort((a, b) => a - b);
    const outerAt = x => {
      let best = 0;
      profile.forEach((p, i) => {
        const q = profile[(i + 1) % profile.length];
        if (Math.min(p[0], q[0]) <= x + 1e-9 && Math.max(p[0], q[0]) >= x - 1e-9) {
          if (Math.abs(q[0] - p[0]) < 1e-9) best = Math.max(best, p[1], q[1]);
          else best = Math.max(best, p[1] + (q[1] - p[1]) * (x - p[0]) / (q[0] - p[0]));
        }
      });
      return best;
    };
    const X = x => x0 + (opts.flip ? len - x : x);
    const out = [];
    for (let i = 0; i + 1 < xs.length; i++) {
      const xa = xs[i], xb = xs[i + 1];
      const ra = outerAt(xa + 1e-6), rb = outerAt(xb - 1e-6);
      out.push(L([X(xa), ay - ra], [X(xb), ay - rb]), L([X(xa), ay + ra], [X(xb), ay + rb]));
    }
    xs.forEach(x => {
      const r1 = outerAt(x - 1e-6), r2 = outerAt(x + 1e-6), r = Math.max(r1, r2);
      if (r > 0) out.push(L([X(x), ay - r], [X(x), ay + r]));
    });
    return out;
  }

  // Thread on an unsectioned shaft or bolt: thin lines at the root diameter (0.85D) along
  // the threaded length.
  function threadLines(x0, x1, ay, D) {
    const rr = 0.425 * D;
    return [L([x0, ay - rr], [x1, ay - rr], 'B'), L([x0, ay + rr], [x1, ay + rr], 'B')];
  }

  // A hexagon nut (or bolt head) seen from the side, across its corners: three faces showing,
  // with the conventional chamfer arcs. Axis horizontal: the nut spans x0..x0+h.
  //   D: bolt diameter; h: thickness (0.8D for a nut, 0.7D for a head).
  function nutSide(x0, ay, D, h, opts) {
    opts = opts || {};
    const AC = 1.5 * D * 2 / Math.sqrt(3);           // across corners
    const ys = [-AC / 2, -AC / 4, AC / 4, AC / 2].map(v => ay + v);
    const x1 = x0 + h;
    const out = [
      L([x0, ys[0]], [x1, ys[0]]), L([x0, ys[3]], [x1, ys[3]]),
      L([x0, ys[1]], [x1, ys[1]]), L([x0, ys[2]], [x1, ys[2]]),
    ];
    // chamfer arcs on the chamfered end(s): a shallow arc on each face, cutting its corners
    const ends = opts.bothEnds === false ? [opts.chamferAt === 'left' ? x0 : x1] : [x0, x1];
    ends.forEach(xe => {
      const s = xe === x0 ? 1 : -1;                  // arc bulges into the nut
      const c = 0.12 * D;
      [[ys[0], ys[1]], [ys[1], ys[2]], [ys[2], ys[3]]].forEach(([a, b]) => {
        const pts = [];
        for (let i = 0; i <= 10; i++) {
          const t = i / 10, y = a + (b - a) * t;
          pts.push([xe + s * c * 4 * t * (1 - t) * (b - a > AC / 3 ? 1 : 0.6), y]);
        }
        out.push({ kind: 'polyline', points: pts, lineType: 'A' });
      });
      out.push(L([xe, ys[0]], [xe, ys[3]]));
    });
    return out;
  }

  // Hexagon end view (across flats 1.5D) with the chamfer circle and the bolt's thread circles.
  function nutEnd(cx, cy, D, opts) {
    opts = opts || {};
    const R = 1.5 * D / Math.sqrt(3), rot = opts.cornersUp ? 90 : 0;
    const hex = Array.from({ length: 6 }, (_, i) => { const a = (rot + i * 60) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
    const out = [{ kind: 'polygon', points: hex, lineType: 'A' }, { kind: 'circle', center: [cx, cy], r: 0.75 * D, lineType: 'B' }];
    if (opts.bolt !== false) {
      out.push({ kind: 'circle', center: [cx, cy], r: D / 2, lineType: 'A' });
      out.push({ kind: 'arc-construction', center: [cx, cy], r: 0.425 * D, startDeg: 0, endDeg: 270, lineType: 'B' });
    }
    out.push(L([cx - R - 3, cy], [cx + R + 3, cy], 'centre'), L([cx, cy - R - 3], [cx, cy + R + 3], 'centre'));
    return out;
  }

  // End view of a turned part: concentric circles at its radii (outer visible, bore visible
  // when it can be seen through, the rest from the profile's radial steps).
  function endCircles(profile, cx, cy, opts) {
    opts = opts || {};
    const radii = [...new Set(profile.map(p => +p[1].toFixed(3)))].filter(r => r > 0);
    const out = radii.map(r => ({ kind: 'circle', center: [cx, cy], r, lineType: 'A' }));
    const R = Math.max(...radii);
    out.push(L([cx - R - 4, cy], [cx + R + 4, cy], 'centre'), L([cx, cy - R - 4], [cx, cy + R + 4], 'centre'));
    return out;
  }

  // Balloon with a leader to the part.
  function balloon(n, at, to) {
    return [
      L(to, at, 'B'),
      { kind: 'circle', center: at, r: 3.2, lineType: 'B' },
      { kind: 'label', at: [at[0], at[1] + 1.3], text: String(n), size: 3.4, anchor: 'middle', color: '#e8eaf2' },
    ];
  }

  // Parts list / lys van onderdele.
  function partsList(x, y, rows) {
    const w = [10, 40, 20, 50], H = 5.4;
    const X = [x, x + w[0], x + w[0] + w[1], x + w[0] + w[1] + w[2], x + w[0] + w[1] + w[2] + w[3]];
    const out = [];
    const head = ['No', 'PART / ONDERDEEL', 'QTY / HVHD', 'MATERIAL / MATERIAAL'];
    const all = [head].concat(rows.map((r, i) => [String(i + 1), r[0], String(r[1]), r[2]]));
    all.forEach((r, i) => {
      const yy = y + i * H;
      r.forEach((t, j) => out.push({ kind: 'label', at: [X[j] + 1.2, yy + 3.9], text: t, size: i ? 2.6 : 2.4, anchor: 'start', color: i ? '#e8eaf2' : '#fde047' }));
      out.push(L([X[0], yy], [X[4], yy], 'B'));
    });
    out.push(L([X[0], y + all.length * H], [X[4], y + all.length * H], 'B'));
    X.forEach(xx => out.push(L([xx, y], [xx, y + all.length * H], 'B')));
    out.push({ kind: 'label', at: [x, y - 2], text: 'PARTS LIST / LYS VAN ONDERDELE', size: 3, anchor: 'start', color: '#fde047' });
    return out;
  }

  global.AssemblyKit = { hatch, sectioned, outside, threadLines, nutSide, nutEnd, endCircles, balloon, partsList, profLen };
})(window);
