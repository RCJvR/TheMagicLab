// Isometric Drawing II — Deeper Sectioning. Chapter data. Requires engine-geometry.js loaded
// first (window.ConstructionGeometry). Grade 12 tier escalation of isometric-drawing.data.js
// (Ch4, which already introduced a basic quarter-sectioned isometric block) — this chapter goes
// further: half-sections, ribs-not-hatched, isometric dimensioning, sectioned holes, exploded
// views and sectioned assemblies.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // Same isometric axes and helpers as isometric-drawing.data.js (each chapter file is
  // self-contained, matching the pattern already used throughout Drawing Druid).
  const U = [Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6)];
  const V = [Math.cos(7 * Math.PI / 6), Math.sin(7 * Math.PI / 6)];
  function iso(origin, a, b) { return [origin[0] + a * U[0] + b * V[0], origin[1] + a * U[1] + b * V[1]]; }
  function raise(p, h) { return [p[0], p[1] - h]; }
  function lerp(p1, p2, t) { return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t]; }
  function isoHatch(p1, p2, h, n) {
    const lines = [];
    for (let i = 1; i < n; i++) {
      const p = lerp(p1, p2, i / n);
      lines.push({ kind: 'line', p1: p, p2: raise(p, h), lineType: 'B' });
    }
    return lines;
  }

  // ── Shared: real solids (solid-kit.js), hidden-line removal and in-plane hatching ──
  // x = length (right-hand 30° axis), y = depth (left-hand 30° axis), z = height. The viewer looks
  // from the front-left corner, so only edges that are actually seen are drawn: an isometric
  // drawing never shows hidden detail. A cut face is hatched at 45° IN ITS OWN PLANE.
  const SK = global.SolidKit;
  const C30 = Math.cos(Math.PI / 6);
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const d2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  function onSeg2(p, a, b) {
    const ab = [b[0] - a[0], b[1] - a[1]], l2 = ab[0] * ab[0] + ab[1] * ab[1];
    if (l2 < 1e-9) return d2(p, a) < 0.05;
    const t = ((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1]) / l2;
    return t > -1e-3 && t < 1 + 1e-3 && d2(p, [a[0] + ab[0] * t, a[1] + ab[1] * t]) < 0.05;
  }
  const covered = (s, set) => [0, 0.25, 0.5, 0.75, 1].every(t => { const p = [s[0][0] + (s[1][0] - s[0][0]) * t, s[0][1] + (s[1][1] - s[0][1]) * t]; return set.some(v => onSeg2(p, v[0], v[1])); });
  // the edges of the solids that are seen in the isometric view, as Type A (or other) lines
  function seen(solids, view, lineType) {
    const out = [];
    SK.hlr(solids, view, { crease: true }).visible.forEach(s => {
      const q = [view.project(s[0]), view.project(s[1])];
      if (d2(q[0], q[1]) > 0.05 && !covered(q, out)) out.push(q);
    });
    return out.map(q => L(q[0], q[1], lineType));
  }
  // 45° hatching of a flat cut face. poly: the face outline in its own (u, v) coordinates, with
  // u along uDir and v along vDir from origin (3D). mirror: the other 45° (for a second part).
  function hatch(view, origin, uDir, vDir, poly, spacing, mirror) {
    const s = mirror ? -1 : 1, out = [];
    const at = (u, v) => view.project([0, 1, 2].map(k => origin[k] + uDir[k] * u + vDir[k] * v));
    // the lines u − s·v = c, from the smallest to the largest c over the outline
    const cs = poly.map(([u, v]) => u - s * v), c0 = Math.min(...cs), c1 = Math.max(...cs);
    for (let c = c0 + spacing / 2; c < c1; c += spacing) {
      // where the line u = c + s·v crosses each edge of the outline, as v values
      const vs = [];
      poly.forEach((p, i) => {
        const q = poly[(i + 1) % poly.length];
        const fp = p[0] - s * p[1] - c, fq = q[0] - s * q[1] - c;
        if ((fp < 0) !== (fq < 0)) { const t = fp / (fp - fq); vs.push(p[1] + (q[1] - p[1]) * t); }
      });
      vs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < vs.length; k += 2) out.push(L(at(c + s * vs[k], vs[k]), at(c + s * vs[k + 1], vs[k + 1]), 'B'));
    }
    return out;
  }
  // a closed outline in a face, as lines (to draw a boundary the hidden-line pass drops, e.g. between
  // two flush cut faces of different parts)
  const outline = (view, origin, uDir, vDir, pts, lineType) => pts.map((p, i) => {
    const q = pts[(i + 1) % pts.length], at = ([u, v]) => view.project([0, 1, 2].map(k => origin[k] + uDir[k] * u + vDir[k] * v));
    return L(at(p), at(q), lineType);
  });
  const arcXY = (c, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
  // a slab, extruded up z, whose front edge (y = yc) is notched by a half circle about (cx, yc):
  // the back half of a block that has a round hole through its centre, cut on that centre line
  function notchedSlab(x0, x1, yc, y1, cx, r, z0, z1) {
    const arc = arcXY([cx, yc], r, 180, 0, 16);
    const prof = [[x0, yc], ...arc, [x1, yc], [x1, y1], [x0, y1]];
    return SK.extrude(prof, 'xy', z0, z1, new Set(arc.map((_, i) => i + 1)));
  }
  // isometric dimension: extension lines along the isometric axis `axis` (3D), text along the edge
  function isoDim(view, a, b, axis, off, text) {
    const pa = view.project(a), pe = view.project([a[0] + axis[0], a[1] + axis[1], a[2] + axis[2]]);
    const d = [pe[0] - pa[0], pe[1] - pa[1]], l = Math.hypot(d[0], d[1]);
    return { kind: 'dimension', p1: pa, p2: view.project(b), offset: off, dir: [d[0] / l, d[1] / l], text };
  }
  const label = (at, text, size, color) => ({ kind: 'label', at, text, size: size || 4.4, anchor: 'middle', color: color || '#fde047' });
  const X = [1, 0, 0], Y = [0, 1, 0], Z = [0, 0, 1];

  // ── 1. Isometric Half-Section ──
  // A 60 × 60 × 40 block with a Ø24 hole straight down its centre, cut in half by one vertical plane
  // through the hole: the back half is drawn, the cut face hatched, the hole left clear.
  (function () {
    const W = 60, D = 60, H = 40, R = 12, yc = D / 2, view = SK.isoView([95, 140]);
    const solids = [notchedSlab(0, W, yc, D, W / 2, R, 0, H)];
    const cut = [[0, 0], [W / 2 - R, 0], [W / 2 - R, H], [0, H]], cut2 = [[W / 2 + R, 0], [W, 0], [W, H], [W / 2 + R, H]];
    CONSTRUCTIONS['isometric-half-section'] = {
      id: 'isometric-half-section', title: 'Isometric Half-Section', _solids: solids,
      summary: 'A half-section removes exactly HALF the object along a single cutting plane — simpler than the quarter-section already covered, and just as common on real components.',
      bounds: { w: 150, h: 150 },
      workbookPrompt: 'Draw the block (60 × 60 × 40, with a Ø24 hole straight down its centre) in isometric, with the front half removed by one vertical cutting plane through the centre of the hole. Hatch the cut face in its own plane.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the whole block in thin lines: its enclosing box, 60 x 60 x 40.',
          calloutAt: view.project([W, 0, H / 2]),
          reveals: seen([SK.box(0, 0, 0, W, D, H)], view, 'construction'),
        },
        {
          id: 2,
          instruction: 'Imagine ONE vertical cutting plane through the centre of the hole, from end to end. Mark where it crosses the top and the left-hand end with a chain line.',
          calloutAt: view.project([0, yc, H]),
          reveals: [L(view.project([0, yc, H]), view.project([W, yc, H]), 'centre'), L(view.project([0, yc, 0]), view.project([0, yc, H]), 'centre')],
        },
        {
          id: 3,
          instruction: 'Remove the front half and draw what is left with Type A lines: the cut face, half of the hole (a half isometric circle in the top, and its curved inside surface) and the outline behind.',
          calloutAt: view.project([W / 2, yc, H]),
          reveals: seen(solids, view),
        },
        {
          id: 4,
          instruction: 'Hatch the cut face at 45° in its own plane. The hole is not material, so it stays clear. Nothing hidden is shown.',
          calloutAt: view.project([W / 4, yc, H / 2]),
          reveals: [...hatch(view, [0, yc, 0], X, Z, cut, 4), ...hatch(view, [0, yc, 0], X, Z, cut2, 4)],
        },
      ],
    };
  })();

  // ── 2. Sectioned Isometric — Rib Not Hatched ──
  // An angle bracket (base, upright at the back, a thin rib between them). One vertical plane cuts it
  // from front to back through the middle of the rib; the left half is removed.
  (function () {
    const W = 80, D = 60, T = 12, Hu = 60, ut = 12, xc = 40, rt = 4, view = SK.isoView([75, 150]);
    const solids = [SK.box(xc, 0, 0, W, D, T), SK.box(xc, D - ut, T, W, D, Hu), SK.extrude([[12, T], [D - ut, T], [D - ut, Hu - 4]], 'yz', xc, xc + rt)];
    // the cut face at x = xc, in (y, z): base and upright together (one part), and the rib
    const lFace = [[0, 0], [D, 0], [D, Hu], [D - ut, Hu], [D - ut, T], [0, T]];
    const rib = [[12, T], [D - ut, T], [D - ut, Hu - 4]];
    CONSTRUCTIONS['isometric-rib-not-hatched'] = {
      id: 'isometric-rib-not-hatched', title: 'Sectioned Isometric — Rib Not Hatched', _solids: solids,
      summary: 'A rib or web is a THIN strengthening wall, not solid bulk material — even when the cutting plane slices straight through it, convention says leave it unhatched.',
      bounds: { w: 160, h: 160 },
      workbookPrompt: 'Draw a half-sectioned base plate with a vertical rib rising from it, positioned exactly on the cutting plane. Hatch the base but leave the rib\'s own cut face unhatched.',
      steps: [
        {
          id: 1,
          instruction: 'The bracket: a base plate, an upright at the back and a thin rib between them, in the middle. Draw its enclosing box in thin lines (80 x 60 x 60).',
          calloutAt: view.project([W, 0, Hu / 2]),
          reveals: seen([SK.box(0, 0, 0, W, D, Hu)], view, 'construction'),
        },
        {
          id: 2,
          instruction: 'A vertical cutting plane runs from front to back through the middle of the rib. Remove the left half and draw what is left with Type A lines: the base, the upright and half of the rib.',
          calloutAt: view.project([xc, D / 2, T]),
          reveals: [...seen(solids, view), ...outline(view, [xc, 0, 0], Y, Z, rib)],
        },
        {
          id: 3,
          instruction: 'Notice the rib\'s exposed face is OUTLINED but deliberately left unhatched — if it were hatched like solid material, the drawing would falsely suggest the rib is far bulkier than it really is, misleading anyone reading wall thicknesses off the drawing.',
          calloutAt: view.project([xc, 30, 24]),
          reveals: hatch(view, [xc, 0, 0], Y, Z, lFace, 4),
        },
        {
          id: 4,
          instruction: 'This is the exact same rule already used throughout orthographic sectioning — ribs, webs and similar thin strengthening features are never hatched in section, on any type of drawing, isometric or orthographic.',
          calloutAt: view.project([W / 2, 0, 0]),
          reveals: [],
        },
      ],
    };
  })();

  // ── 3. Isometric Dimensioning ──
  (function () {
    const W = 50, D = 35, H = 40, view = SK.isoView([80, 140]);
    const solids = [SK.box(0, 0, 0, W, D, H)];
    CONSTRUCTIONS['isometric-dimensioning'] = {
      id: 'isometric-dimensioning', title: 'Isometric Dimensioning', _solids: solids,
      summary: 'Unlike an orthographic drawing, an isometric dimension line is never simply horizontal or vertical — it runs parallel to whichever isometric axis it is measuring.',
      bounds: { w: 150, h: 140 },
      workbookPrompt: 'Draw a 50 x 35 x 40 mm isometric block, fully dimensioned — width, depth and height — with each dimension line correctly parallel to its own axis.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the plain isometric block first, exactly as in earlier chapters.',
          calloutAt: view.project([0, 0, H]),
          reveals: seen(solids, view),
        },
        {
          id: 2,
          instruction: 'Balloon 1: the WIDTH dimension line runs parallel to the width (U) axis — the same direction as the edge it measures, never a flat horizontal line as it would be on an orthographic view.',
          calloutAt: view.project([W / 2, -12, 0]),
          reveals: [isoDim(view, [0, 0, 0], [W, 0, 0], [0, -1, 0], 10, String(W))],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the DEPTH dimension line runs parallel to the depth (V) axis, at its own distinct angle — different from both the width and height dimension lines.',
          calloutAt: view.project([-12, D / 2, 0]),
          reveals: [isoDim(view, [0, 0, 0], [0, D, 0], [-1, 0, 0], 10, String(D))],
        },
        {
          id: 4,
          instruction: 'Balloon 3: the HEIGHT dimension is the one case that still looks familiar — the vertical axis is genuinely vertical in isometric, so its dimension line is a plain vertical line, exactly like an orthographic height dimension.',
          calloutAt: view.project([W + 12, 0, H / 2]),
          reveals: [isoDim(view, [W, 0, 0], [W, 0, H], [1, 0, 0], 10, String(H))],
        },
      ],
    };
  })();

  // ── 4. Isometric Half-Section Through a Blind Hole ──
  // A 60 × 60 × 40 block with a Ø20 hole 20 deep from the top, cut in half through the hole.
  (function () {
    const W = 60, D = 60, H = 40, R = 10, depth = 20, yc = D / 2, view = SK.isoView([95, 140]);
    const floor = H - depth;
    const solids = [SK.box(0, yc, 0, W, D, floor), notchedSlab(0, W, yc, D, W / 2, R, floor, H)];
    const cut = [[0, 0], [W, 0], [W, H], [W / 2 + R, H], [W / 2 + R, floor], [W / 2 - R, floor], [W / 2 - R, H], [0, H]];
    CONSTRUCTIONS['isometric-half-section-blind-hole'] = {
      id: 'isometric-half-section-blind-hole', title: 'Isometric Half-Section Through a Blind Hole', _solids: solids,
      summary: 'Where a blind (not-through) hole crosses the cutting plane, the hatching simply stops at the hole\'s floor — leaving the hole itself as a clean, unhatched gap in the section.',
      bounds: { w: 150, h: 150 },
      workbookPrompt: 'Draw a half-sectioned 60 mm block containing a 20 mm deep blind hole, 20 mm wide, centred on the cutting plane. Hatch the section, stopping the hatching at the hole\'s floor.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the half-sectioned block in thin lines, as in the first sheet of this chapter: the back half of the 60 x 60 x 40 block.',
          calloutAt: view.project([W, yc, H / 2]),
          reveals: seen([SK.box(0, yc, 0, W, D, H)], view, 'construction'),
        },
        {
          id: 2,
          instruction: 'Mark the hole\'s floor (its blind bottom) and its two side walls — the hole is centred exactly on the cutting plane, so both its walls and its floor are now directly visible.',
          calloutAt: view.project([W / 2, yc, floor]),
          reveals: seen(solids, view),
        },
        {
          id: 3,
          instruction: 'Hatch the section — everywhere the hole is present, the hatching simply stops at the floor line instead of continuing to the full top surface; everywhere else, hatching runs the full height as usual.',
          calloutAt: view.project([W / 4, yc, H / 2]),
          reveals: hatch(view, [0, yc, 0], X, Z, cut, 4),
        },
        {
          id: 4,
          instruction: 'The result reads unambiguously as a blind hole in section: solid material hatched right up to the surface everywhere except directly above the hole, where the hatching correctly stops at its floor.',
          calloutAt: view.project([W / 2, 0, 0]),
          reveals: [],
        },
      ],
    };
  })();

  // ── 5. Exploded Isometric Assembly ──
  // A base, a spacer and a cap, each with a Ø12 hole on the common axis, pulled apart up that axis.
  (function () {
    const view = SK.isoView([95, 200]), cx = 30, cy = 30, Rh = 6, N = 36;
    const ring = (r) => Array.from({ length: N }, (_, i) => { const a = 2 * Math.PI * i / N; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    const holed = (x0, y0, x1, y1, z0, z1) => {
      const f = SK.extrude([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], 'xy', z0, z1);
      // cut the hole: a cylinder's inside surface plus holes in the top and bottom faces
      f[0] = SK.face(f[0].pts, { n: f[0].n, holes: [ring(Rh).reverse().map(([x, y]) => [x, y, z0])] });
      f[1] = SK.face(f[1].pts, { n: f[1].n, holes: [ring(Rh).map(([x, y]) => [x, y, z1])] });
      ring(Rh).forEach((p, i) => { const q = ring(Rh)[(i + 1) % N], m = (i + 0.5) / N * 2 * Math.PI;
        f.push(SK.face([[p[0], p[1], z0], [q[0], q[1], z0], [q[0], q[1], z1], [p[0], p[1], z1]], { n: [-Math.cos(m), -Math.sin(m), 0], smooth: { a: true, b: true } })); });
      return f;
    };
    const base = holed(0, 0, 60, 60, 0, 15), spacer = holed(10, 10, 50, 50, 37, 49), cap = holed(5, 5, 55, 55, 71, 81);
    const steps = [[base, 'Balloon 1: the BASE part, drawn first in its normal isometric form.', [0, 0, 15]],
      [spacer, 'Balloon 2: the MIDDLE part, drawn exactly the same way but shifted up along the vertical axis, leaving a clear gap — the exploded distance is simply a drawing convention, not a real gap in the assembled part.', [10, 10, 49]],
      [cap, 'Balloon 3: the CAP part, exploded further still — every part now fully visible, none hidden behind another.', [5, 5, 81]]];
    CONSTRUCTIONS['exploded-isometric-assembly'] = {
      id: 'exploded-isometric-assembly', title: 'Exploded Isometric Assembly', _solids: [base, spacer, cap],
      summary: 'Pulling every part apart along one shared axis, connected by a single centre line, shows exactly how an assembly goes together — without any part hiding another.',
      bounds: { w: 150, h: 200 },
      workbookPrompt: 'Draw three stacked blocks (a base, a middle spacer, and a cap) exploded apart along the vertical axis, connected by a single common centre line through all three.',
      steps: [
        ...steps.map(([s, text, at], i) => ({ id: i + 1, instruction: text, calloutAt: view.project(at),
          // each part is drawn as it is seen, with the parts above it in place
          reveals: seen(steps.slice(i).map(x => x[0]), view).filter(l => !seen(steps.slice(i + 1).map(x => x[0]), view).some(m => d2(m.p1, l.p1) < 0.05 && d2(m.p2, l.p2) < 0.05)) })),
        {
          id: 4,
          instruction: 'Balloon 4: a single centre line threads through every part\'s true assembled position — this is what proves to the reader exactly how, and in what order, the parts go back together.',
          calloutAt: view.project([cx, cy, 92]),
          reveals: [L(view.project([cx, cy, -6]), view.project([cx, cy, 90]), 'centre')],
        },
      ],
    };
  })();

  // ── 6. Sectioned Isometric Assembly — Housing & Insert ──
  // A housing (60 × 60 × 40, a 30 × 30 pocket 25 deep) with an insert (26 × 26 × 20) seated in the
  // pocket, 2 mm clear all round; both cut by the same plane through the middle.
  (function () {
    const W = 60, D = 60, H = 40, yc = 30, fl = 15, view = SK.isoView([95, 140]);
    const housing = [SK.box(0, yc, 0, W, D, fl), SK.box(0, 45, fl, W, D, H), SK.box(0, yc, fl, 15, 45, H), SK.box(45, yc, fl, W, 45, H)];
    const insert = SK.box(17, yc, fl, 43, 43, fl + 20);
    const hFace = [[0, 0], [W, 0], [W, H], [45, H], [45, fl], [15, fl], [15, H], [0, H]];
    const iFace = [[17, fl], [43, fl], [43, fl + 20], [17, fl + 20]];
    CONSTRUCTIONS['sectioned-isometric-assembly'] = {
      id: 'sectioned-isometric-assembly', title: 'Sectioned Isometric Assembly — Housing & Insert', _solids: [...housing, insert],
      summary: 'Two separate mating parts, both sectioned by the same cutting plane at once — a small clearance line between them is all that separates "one solid part" from "two parts that fit together".',
      bounds: { w: 150, h: 150 },
      workbookPrompt: 'Draw a half-sectioned housing block with a 25 mm deep pocket, containing a 20 mm tall insert seated in the pocket with a small clearance gap all round.',
      steps: [
        {
          id: 1,
          instruction: 'The housing block, half-sectioned exactly as earlier in this chapter, with a pocket recessed from the top.',
          calloutAt: view.project([W / 2, yc, H]),
          reveals: [...seen(housing, view), ...hatch(view, [0, yc, 0], X, Z, hFace, 4)],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the housing\'s pocket floor and walls, exactly like the blind hole from the earlier sheet — but this time, something else is going to sit inside it.',
          calloutAt: view.project([W / 2, 40, fl]),
          reveals: [],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the INSERT, seated on the pocket floor, is drawn slightly smaller than the pocket itself — the small gap on each side is the clearance that lets the two parts actually be assembled and separated again.',
          calloutAt: view.project([30, yc, fl + 20]),
          // the insert's edges as seen with the housing round it; its bottom edge on the cut face is drawn
          // too, because it divides two different parts
          reveals: [...seen([...housing, insert], view).filter(l => !seen(housing, view).some(m => d2(m.p1, l.p1) < 0.05 && d2(m.p2, l.p2) < 0.05)),
            L(view.project([17, yc, fl]), view.project([43, yc, fl]))],
        },
        {
          id: 4,
          instruction: 'Balloon 3: hatch the insert\'s own cut face too, since the SAME cutting plane slices through it as well — but as two separate parts, this hatching is its own independent pattern, not a continuation of the housing\'s.',
          calloutAt: view.project([30, yc, fl + 10]),
          reveals: hatch(view, [0, yc, 0], X, Z, iFace, 3, true),
        },
      ],
    };
  })();

  // ── 7 & 8. The bracket: base plate, upright at the left-hand end, a rib between them and a blind
  // Ø16 hole in the base, cut from end to end through the rib and the hole (the front half removed) ──
  const bracket = (() => {
    const W = 70, D = 50, T = 12, Hu = 50, ut = 12, yc = 25, rt = 4, hx = 56, R = 8, hf = 4;
    const solids = [
      SK.box(0, yc, 0, W, D, hf),                                     // the base below the hole's floor
      notchedSlab(0, W, yc, D, hx, R, hf, T),                         // the rest of the base, round the hole
      SK.box(0, yc, T, ut, D, Hu),                                    // the upright
      SK.extrude([[ut, T], [44, T], [ut, 44]], 'xz', yc, yc + rt),    // the rib (its back half), in the plane of the cut
    ];
    // the cut face (y = yc), in (x, z): base and upright together; and the rib, which is not hatched
    const face = [[0, 0], [W, 0], [W, T], [hx + R, T], [hx + R, hf], [hx - R, hf], [hx - R, T], [ut, T], [ut, Hu], [0, Hu]];
    const rib = [[ut, T], [44, T], [ut, 44]];
    return { W, D, T, Hu, yc, hx, R, hf, solids, face, rib };
  })();
  function bracketSheet(view) {
    const b = bracket;
    return {
      lines: [...seen(b.solids, view), ...outline(view, [0, b.yc, 0], X, Z, b.rib)],
      hatch: hatch(view, [0, b.yc, 0], X, Z, b.face, 4),
    };
  }

  // ── 7. Sectioned Bracket — Rib and Hole Together ──
  (function () {
    const b = bracket, view = SK.isoView([70, 135]), sh = bracketSheet(view);
    CONSTRUCTIONS['sectioned-bracket-rib-and-hole'] = {
      id: 'sectioned-bracket-rib-and-hole', title: 'Sectioned Bracket — Rib and Hole Together', _solids: b.solids,
      summary: 'A single realistic component, both conventions applied at once: the rib stays unhatched, the blind hole\'s hatching stops at its floor, and the surrounding solid material is hatched throughout.',
      bounds: { w: 150, h: 140 },
      workbookPrompt: 'Draw a half-sectioned bracket combining a rib (left) and a blind hole (right) in the same section, applying the correct convention to each.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the half-sectioned bracket with Type A lines: the base plate, the upright at the left-hand end, the rib between them and the blind hole in the base, all cut through the middle by one vertical plane.',
          calloutAt: view.project([b.W / 2, b.yc, b.T]),
          reveals: sh.lines,
        },
        {
          id: 2,
          instruction: 'Balloon 1: the rib on the left — outlined, but left unhatched, exactly per the rib convention.',
          calloutAt: view.project([20, b.yc, 22]),
          reveals: [],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the blind hole on the right — its hatching correctly stops at the hole\'s own floor, exactly per the blind-hole convention.',
          calloutAt: view.project([b.hx, b.yc, b.hf]),
          reveals: [],
        },
        {
          id: 4,
          instruction: 'Hatch the cut faces of the base and the upright at 45° in their own plane. Leave the rib and the hole clear: the hatching stops at the rib\'s outline and at the hole\'s floor.',
          calloutAt: view.project([30, b.yc, 6]),
          reveals: sh.hatch,
        },
      ],
    };
  })();

  // ── 8. Capstone — Fully Sectioned & Dimensioned Isometric Bracket ──
  (function () {
    const b = bracket, view = SK.isoView([70, 140]), sh = bracketSheet(view);
    CONSTRUCTIONS['isometric-section-capstone'] = {
      id: 'isometric-section-capstone', title: 'Capstone — Fully Sectioned & Dimensioned Isometric Bracket', _solids: b.solids,
      summary: 'Every technique from this chapter, applied together on one finished, fully dimensioned working drawing: half-section, rib convention, blind-hole convention, and correctly-angled isometric dimensioning.',
      bounds: { w: 160, h: 150 },
      workbookPrompt: 'Draw the complete bracket: half-sectioned, showing a correctly-unhatched rib and a correctly-terminated blind hole, fully dimensioned with width, depth and height.',
      steps: [
        {
          id: 1,
          instruction: 'The full sectioned bracket: half-section outline, rib left unhatched, hole hatching stopped at its floor.',
          calloutAt: view.project([b.W / 2, b.yc, b.T]),
          reveals: [...sh.lines, ...sh.hatch],
        },
        {
          id: 2,
          instruction: 'Add the WIDTH dimension, parallel to the U axis.',
          calloutAt: view.project([b.W / 2, b.yc - 12, 0]),
          reveals: [isoDim(view, [0, b.yc, 0], [b.W, b.yc, 0], [0, -1, 0], 10, String(b.W))],
        },
        {
          id: 3,
          instruction: 'Add the HEIGHT dimension, plainly vertical since the height axis is the one axis that stays true-vertical in isometric.',
          calloutAt: view.project([-12, b.yc, b.Hu / 2]),
          reveals: [isoDim(view, [0, b.yc, 0], [0, b.yc, b.Hu], [-1, 0, 0], 10, String(b.Hu))],
        },
        {
          id: 4,
          instruction: 'The finished working drawing: a real, buildable component, fully described by a single sectioned isometric view — this is exactly the standard this whole chapter has been building toward.',
          calloutAt: view.project([b.W + 12, 37, 0]),
          reveals: [isoDim(view, [b.W, b.yc, 0], [b.W, b.D, 0], [1, 0, 0], 10, String(b.D - b.yc))],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'What is the key difference between a half-section and the quarter-section covered earlier in this course?',
      options: [
        'A half-section uses only ONE cutting plane and removes an entire half; a quarter-section uses TWO cutting planes and removes only a quarter',
        'A half-section is only used on cylindrical parts, never on blocks',
        'They are exactly the same technique with different names',
        'A half-section always shows less internal detail than a quarter-section'],
      answer: 0,
      explanation: 'A half-section is a single straight cut removing half the object, producing one exposed face and a simple 4-point outline — simpler than the quarter-section\'s two cuts and 6-point L-shaped outline.',
    },
    {
      text: 'Why is a rib (a thin strengthening web) left unhatched, even when the cutting plane passes directly through it?',
      options: [
        'Hatching it like solid material would falsely suggest it is far bulkier than it actually is',
        'Ribs are never actually cut by a cutting plane in real components',
        'Hatching a rib is optional and purely a matter of personal drawing style',
        'Ribs are always shown as hidden (dashed) detail instead of solid outline'],
      answer: 0,
      explanation: 'A rib is thin, not solid bulk. Hatching it exactly like the surrounding solid material would misrepresent its true (thin) cross-section to anyone reading the drawing.',
    },
    {
      text: 'How does an isometric dimension line differ from an ordinary orthographic dimension line?',
      options: [
        'It runs parallel to whichever isometric axis it is measuring, rather than always being flat horizontal or vertical',
        'Isometric drawings are never dimensioned at all',
        'It is always drawn as a dashed line instead of a solid one',
        'It always uses a different unit of measurement (inches instead of mm)'],
      answer: 0,
      explanation: 'Because isometric edges run along three different axis directions (two receding, one true-vertical), each dimension line must be drawn parallel to the specific edge it measures.',
    },
    {
      text: 'In a sectioned isometric view showing a blind hole, what happens to the hatching directly above the hole?',
      options: [
        'The hatching stops exactly at the hole\'s floor, leaving the hole itself as a clean, unhatched gap',
        'The hatching continues straight through the hole as if it were solid material',
        'The entire section is left completely unhatched wherever any hole exists anywhere on the part',
        'Blind holes are never shown in an isometric section, only through-holes are'],
      answer: 0,
      explanation: 'A blind hole is empty space down to its floor. The hatching correctly terminates at that floor line, showing solid material everywhere else and leaving the hole itself blank.',
    },
    {
      text: 'What is the purpose of the single centre line running through every part of an exploded isometric assembly?',
      options: [
        'It shows the shared assembly axis, proving exactly how and in what order the parts fit back together',
        'It marks the position of the cutting plane for a section view',
        'It is purely decorative, with no real technical meaning',
        'It indicates which part is the heaviest in the assembly'],
      answer: 0,
      explanation: 'The exploded gaps are only a drawing convention — the centre line threading through every part\'s true assembled position is what tells the reader how they actually align and reassemble.',
    },
    {
      text: 'When two separate mating parts (e.g. a housing and an insert) are both sliced by the same cutting plane in a sectioned assembly, how are their two hatched areas kept visually distinct?',
      options: [
        'Each part gets its own independent hatching, distinguishing it as a separate component from its neighbour',
        'Only one of the two parts is ever hatched; the other is always left blank',
        'The two parts must always be drawn in completely different colours',
        'Sectioned assemblies never show two different parts on the same cutting plane'],
      answer: 0,
      explanation: 'Exactly like an orthographic sectioned assembly, each individual part gets its own separate hatching pattern, so touching parts still read clearly as distinct components.',
    },
    {
      text: 'In the "rib and hole together" bracket, why are the rib and the hole positioned in different regions of the block\'s width?',
      options: [
        'So each convention (rib unhatched, hole hatching terminated at its floor) can be applied cleanly without the two features overlapping',
        'Because a rib and a hole can never legally exist on the same real component',
        'It has no technical reason, purely an arbitrary drawing layout choice',
        'Because ribs must always be positioned to the left of any hole on every drawing'],
      answer: 0,
      explanation: 'Separating the two features keeps each convention clean and unambiguous to read — in a real component they could be positioned however the design requires, as long as each is still handled with its own correct convention.',
    },
    {
      text: 'On the capstone bracket, which single dimension line is the ONE that still looks like an ordinary orthographic dimension?',
      options: [
        'The height dimension, since the true-vertical isometric axis is genuinely vertical on the page',
        'The width dimension, since it is always drawn horizontally',
        'The depth dimension, since it always matches the height dimension exactly',
        'None of the three dimensions ever resemble an orthographic dimension'],
      answer: 0,
      explanation: 'Both the width and depth axes recede at an angle in isometric, so their dimension lines are angled too. Only the vertical (height) axis stays genuinely vertical, so only that dimension line looks like a normal orthographic one.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'isometric-half-section', 'isometric-rib-not-hatched', 'isometric-dimensioning', 'isometric-half-section-blind-hole',
    'exploded-isometric-assembly', 'sectioned-isometric-assembly', 'sectioned-bracket-rib-and-hole', 'isometric-section-capstone',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
