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
        out.push(Object.assign(L(p, q, 'B'), { hatch: true }));
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

  // Thread on an unsectioned shaft or bolt (axis horizontal) from x0 to x1: thin lines at the
  // root, the thread depth 0.1D in from each side (root Ø0.8D).
  //   opts.limit 'left' | 'right': the end where the thread stops — a thick line straight across
  //   the full D there, and the run-out: thin lines at 60° to it (60° set square) from the root
  //   out to the sides, on the unthreaded side.
  function threadLines(x0, x1, ay, D, opts) {
    opts = opts || {};
    const rr = 0.4 * D, R = D / 2;
    const out = [L([x0, ay - rr], [x1, ay - rr], 'B'), L([x0, ay + rr], [x1, ay + rr], 'B')];
    if (opts.limit) {
      const xl = opts.limit === 'left' ? x0 : x1, run = (opts.limit === 'left' ? -1 : 1) * (R - rr) * Math.sqrt(3);
      out.push(L([xl, ay - R], [xl, ay + R]), L([xl, ay - rr], [xl + run, ay - R], 'B'), L([xl, ay + rr], [xl + run, ay + R], 'B'));
    }
    return out;
  }

  // Hidden lines in an outside view: drop the parts of these line segments that lie behind a part
  // in front, e.g. a shaft or bolt where a washer or nut sits round it.
  //   fronts: [{ x0, x1, r }] — the axis-symmetric region x0..x1, ay - r..ay + r that covers them.
  function hideBehind(reveals, fronts, ay) {
    const eps = 1e-6;
    return reveals.flatMap(rv => {
      if (rv.kind !== 'line') return [rv];
      let pieces = [[rv.p1, rv.p2]];
      fronts.forEach(f => {
        pieces = pieces.flatMap(([p, q]) => {
          // Liang–Barsky: the parameter range of p→q strictly inside the box
          const d = [q[0] - p[0], q[1] - p[1]];
          let t0 = 0, t1 = 1;
          const ok = [[-d[0], p[0] - f.x0], [d[0], f.x1 - p[0]], [-d[1], p[1] - (ay - f.r)], [d[1], ay + f.r - p[1]]].every(([pp, qq]) => {
            if (Math.abs(pp) < eps) return qq > eps;
            const t = qq / pp;
            if (pp < 0) t0 = Math.max(t0, t); else t1 = Math.min(t1, t);
            return t0 < t1;
          });
          if (!ok || t1 - t0 < eps) return [[p, q]];
          const at = t => [p[0] + d[0] * t, p[1] + d[1] * t];
          return [t0 > eps ? [p, at(t0)] : null, t1 < 1 - eps ? [at(t1), q] : null].filter(Boolean);
        });
      });
      return pieces.map(([p, q]) => Object.assign({}, rv, { p1: p, p2: q }));
    });
  }

  // A hexagon nut (or bolt head) seen from the side, across its corners: three faces showing —
  // a plain rectangle (across flats/corners) split by two straight divider lines into the near
  // face and the two faces receding away, with a washer-face chamfer at the end(s) that have one.
  // Axis horizontal: the nut spans x0..x0+h.
  //   D: bolt diameter; h: thickness (0.8D for a nut, 0.7D for a head, 0.5D for a locknut).
  //
  // The chamfer, per face, is the standard set-square construction: two 60° lines from that
  // face's own corners on the tip line (the middle face instead uses the head's two OUTER
  // corners — a much larger, flatter arc) form an equilateral triangle; its apex is the centre,
  // and the arc is swung from there just touching the tip line at the middle of the face (so
  // R = the apex's depth: w·√3/2, or 1.5D for the middle face). The arcs cut the face edges a
  // little short of the tip, so the straight sides are shortened, and the middle-face arc only
  // "kind of" meets the narrow-face arcs at the dividers — the workbook's does too (JPEGD Gr 10,
  // "SHOWS THREE FACES OF THE BOLT HEAD").
  function nutSide(x0, ay, D, h, opts) {
    opts = opts || {};
    const AF = 1.5 * D;                              // across flats
    const AC = AF * 2 / Math.sqrt(3);                 // across corners
    const s = AF / Math.sqrt(3);                      // true hex side length (the middle face's width)
    const ys = [-AC / 2, -s / 2, s / 2, AC / 2].map(v => ay + v);   // bottom-outer, bottom-divider, top-divider, top-outer
    const x1 = x0 + h;
    const ends = opts.bothEnds === false ? [opts.chamferAt === 'left' ? x0 : x1] : [x0, x1];
    // the three faces, as [y1, y2, R]: R = (half the 60° triangle's base)·√3 — R1 on the two
    // narrow faces from their own corners, R2 on the middle face from the outer corners (= A/F),
    // drawn only across its own box
    const tri = base => base / 2 * Math.sqrt(3);
    const boxes = [[ys[0], ys[1], tri(ys[1] - ys[0])], [ys[1], ys[2], tri(AC)], [ys[2], ys[3], tri(ys[3] - ys[2])]];

    const out = [];
    const touch = {};               // touch[xe][i] = x reached at ys[i] by xe's chamfer arc(s)
    ends.forEach(xe => {
      const inward = xe === x1 ? 1 : -1;              // which way the solid lies from this tip
      touch[xe] = ys.map(() => []);
      boxes.forEach(([y1, y2, R]) => {
        const i1 = ys.indexOf(y1), i2 = ys.indexOf(y2);
        const cy = (y1 + y2) / 2;
        const cx = xe - inward * R;                   // peak (cx + inward*R) lands exactly on xe
        const angleOf = y => {
          const sinA = Math.max(-1, Math.min(1, (y - cy) / R));
          const a = Math.asin(sinA) * 180 / Math.PI, alt = 180 - a;
          const xOf = deg => cx + R * Math.cos(deg * Math.PI / 180);
          return Math.abs(xOf(alt) - xe) < Math.abs(xOf(a) - xe) ? alt : a;
        };
        let a1 = angleOf(y1), a2 = angleOf(y2);
        while (a2 - a1 > 180) a2 -= 360;
        while (a2 - a1 < -180) a2 += 360;
        out.push({ kind: 'arc-construction', center: [cx, cy], r: R, startDeg: Math.min(a1, a2), endDeg: Math.max(a1, a2), lineType: 'A' });
        touch[xe][i1].push(cx + R * Math.cos(a1 * Math.PI / 180));
        touch[xe][i2].push(cx + R * Math.cos(a2 * Math.PI / 180));
      });
    });
    const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const xAt = (xe, i) => touch[xe] && touch[xe][i].length ? avg(touch[xe][i]) : xe;

    // the two dividers and the two outer lines: straight, each running between its two ends'
    // (shortened, where chamfered) touchdown points
    ys.forEach((y, i) => out.push(L([xAt(x0, i), y], [xAt(x1, i), y])));
    // the flat base at any end with no chamfer
    if (!ends.includes(x0)) out.push(L([x0, ys[0]], [x0, ys[3]]));
    if (!ends.includes(x1)) out.push(L([x1, ys[0]], [x1, ys[3]]));
    // the tangent line across each chamfered tip, flush with both narrow-face arcs' crests
    const cyB = (ys[0] + ys[1]) / 2, cyT = (ys[2] + ys[3]) / 2;
    ends.forEach(xe => out.push(L([xe, cyB], [xe, cyT])));
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
      out.push({ kind: 'arc-construction', center: [cx, cy], r: 0.4 * D, startDeg: 0, endDeg: 270, lineType: 'B' });
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

  global.AssemblyKit = { hatch, sectioned, outside, threadLines, hideBehind, nutSide, nutEnd, endCircles, balloon, partsList, profLen };
})(window);
