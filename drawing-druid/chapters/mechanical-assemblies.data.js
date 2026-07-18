// Mechanical Assemblies — Chapter 11 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // 45°-hatching line segments clipped to a rectangle [x0,x0+w] x [y0,y0+h]. Hatching is
  // B-weight (medium) per the CAPS/SANS line-type spec, not C — it must read clearly on a
  // printed A3 sheet, unlike genuinely light construction/guide lines.
  function hatchRect(x0, y0, w, h, spacing) {
    const lines = [];
    for (let k = -h; k <= w + 0.01; k += spacing) {
      const vLo = Math.max(0, -k), vHi = Math.min(h, w - k);
      if (vHi <= vLo) continue;
      const u1 = vLo + k, v1 = vLo, u2 = vHi + k, v2 = vHi;
      lines.push({ kind: 'line', p1: [x0 + u1, y0 + v1], p2: [x0 + u2, y0 + v2], lineType: 'B' });
    }
    return lines;
  }
  // Mirror image of hatchRect (135° instead of 45°) — used so two adjacent sectioned parts
  // are instantly distinguishable, per convention.
  function hatchRectMirror(x0, y0, w, h, spacing) {
    return hatchRect(x0, y0, w, h, spacing).map(ln => ({
      kind: 'line', lineType: 'B',
      p1: [x0 + (w - (ln.p1[0] - x0)), ln.p1[1]],
      p2: [x0 + (w - (ln.p2[0] - x0)), ln.p2[1]],
    }));
  }

  // ── 1. Hexagonal Bolt — Conventional Representation ──
  (function () {
    const FV_CX = 100;
    const AF = 30, R = AF / Math.sqrt(3); // across-flats, circumradius
    const HEAD_TOP = 55, HEAD_H = 12, HEAD_BOTTOM = HEAD_TOP + HEAD_H;
    const HEAD_LEFT = FV_CX - AF / 2, HEAD_RIGHT = FV_CX + AF / 2;
    const SHANK_TOP = HEAD_BOTTOM, SHANK_LEN = 46, SHANK_BOTTOM = SHANK_TOP + SHANK_LEN;
    const CREST_R = 10, ROOT_R = 8.5; // shank major/minor thread radii
    const crestL = FV_CX - CREST_R, crestR = FV_CX + CREST_R;
    const rootL = FV_CX - ROOT_R, rootR = FV_CX + ROOT_R;

    const GAP = 15;
    const TOP_CY = HEAD_TOP - GAP - R;
    const hexTop = G.regularPolygonInCircle([FV_CX, TOP_CY], R, 6, -90);

    const END_CX = 160, END_CY = (SHANK_TOP + SHANK_BOTTOM) / 2;

    CONSTRUCTIONS['hex-bolt-representation'] = {
      id: 'hex-bolt-representation', title: 'Hexagonal Bolt — Conventional Representation',
      summary: 'Draw a hex-head bolt using the correct simplified thread convention: thick (A) crest lines, thin (B) root lines — and the reverse for an internal thread.',
      bounds: { w: 195, h: 145 },
      workbookPrompt: 'Draw the front view (hex head + shank) and the end view of the bolt shown. Project the hex head\'s true shape as a top view, and use the correct simplified thread convention in both the front and end views: crest thick (A), root thin (B).',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view of the hexagonal head as a simple rectangle, width equal to the across-flats (spanner) measurement.',
          calloutAt: [FV_CX, (HEAD_TOP + HEAD_BOTTOM) / 2],
          reveals: [
            { kind: 'polygon', points: [[HEAD_LEFT, HEAD_TOP], [HEAD_RIGHT, HEAD_TOP], [HEAD_RIGHT, HEAD_BOTTOM], [HEAD_LEFT, HEAD_BOTTOM]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Project the true shape of the hex head upward as a top view (3rd-angle projection places it ABOVE the front view). This regular hexagon is what a spanner actually grips.',
          calloutAt: [FV_CX, TOP_CY],
          reveals: [
            { kind: 'polygon', points: hexTop, lineType: 'A' },
            { kind: 'line', p1: [HEAD_LEFT, HEAD_TOP], p2: [FV_CX - AF / 2, TOP_CY + R], lineType: 'construction' },
            { kind: 'line', p1: [HEAD_RIGHT, HEAD_TOP], p2: [FV_CX + AF / 2, TOP_CY + R], lineType: 'construction' },
            { kind: 'dimension', p1: [HEAD_LEFT, TOP_CY - R - 8], p2: [HEAD_RIGHT, TOP_CY - R - 8], offset: -4, text: 'AF ' + AF.toFixed(0) },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the shank below the head as a plain cylinder outline (the crest/major-diameter lines) — this is the OUTSIDE edge of the thread, so it is drawn thick (A), continuous. Add a B-weight centre line down the axis.',
          calloutAt: [FV_CX, (SHANK_TOP + SHANK_BOTTOM) / 2],
          reveals: [
            { kind: 'line', p1: [crestL, SHANK_TOP], p2: [crestL, SHANK_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [crestR, SHANK_TOP], p2: [crestR, SHANK_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [FV_CX, HEAD_TOP - 6], p2: [FV_CX, SHANK_BOTTOM + 6], lineType: 'centre' },
          ],
        },
        {
          id: 4,
          instruction: 'Add the root (minor-diameter) lines just inside the crest lines — this is the base of the thread groove, so for an EXTERNAL thread it is drawn thin (B), continuous. Never dash a thread line.',
          calloutAt: [rootL, (SHANK_TOP + SHANK_BOTTOM) / 2],
          reveals: [
            { kind: 'line', p1: [rootL, SHANK_TOP + 3], p2: [rootL, SHANK_BOTTOM], lineType: 'B' },
            { kind: 'line', p1: [rootR, SHANK_TOP + 3], p2: [rootR, SHANK_BOTTOM], lineType: 'B' },
            { kind: 'dimension', p1: [crestL, SHANK_TOP - 6], p2: [crestR, SHANK_TOP - 6], offset: -4, text: '⌀' + (CREST_R * 2).toFixed(0) },
          ],
        },
        {
          id: 5,
          instruction: 'Finish with the end view, looking along the shank axis: the crest circle is drawn as a FULL thick (A) circle, but the root circle is drawn as a THIN (B) circle broken into a 3/4 arc — this gap is the standard simplified-thread symbol, not a mistake.',
          calloutAt: [END_CX, END_CY],
          reveals: [
            { kind: 'circle', center: [END_CX, END_CY], r: CREST_R, lineType: 'A' },
            { kind: 'arc-construction', center: [END_CX, END_CY], r: ROOT_R, startDeg: 35, endDeg: 305, lineType: 'B' },
            { kind: 'label', at: [END_CX, END_CY - CREST_R - 6], text: 'END VIEW', size: 4, anchor: 'middle', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. Bolted Joint — Sectional Assembly with Parts List ──
  (function () {
    const CX = 100;
    const PLATE_L = 65, PLATE_R = 135;
    const P1_TOP = 20, P1_BOT = 30;   // top plate
    const P2_TOP = 30, P2_BOT = 44;   // bottom plate
    const HOLE_R = 5;                  // clearance-hole half-width left in the hatching

    const HEAD_AF = 16, HEAD_R = HEAD_AF / Math.sqrt(3);
    const HEAD_TOP = 8, HEAD_BOT = 18;
    const SHANK_R = 4;
    const SHANK_BOT = 54;
    const WASHER_TOP = P2_BOT, WASHER_BOT = WASHER_TOP + 3, WASHER_R = 7;
    const NUT_AF = 14, NUT_R = NUT_AF / Math.sqrt(3);
    const NUT_TOP = WASHER_BOT, NUT_BOT = NUT_TOP + 12;

    const headHex = G.regularPolygonInCircle([CX, (HEAD_TOP + HEAD_BOT) / 2], HEAD_R, 6, 0);
    const nutHex = G.regularPolygonInCircle([CX, (NUT_TOP + NUT_BOT) / 2], NUT_R, 6, 0);

    function balloon(num, at, from) {
      return [
        { kind: 'line', p1: from, p2: at, lineType: 'B' },
        { kind: 'circle', center: at, r: 4.2, lineType: 'B' },
        { kind: 'label', at: [at[0], at[1] + 1.4], text: String(num), size: 4.4, anchor: 'middle', color: '#fde047' },
      ];
    }

    const BX = 165;
    const PARTS = [
      { n: 1, desc: 'Hex bolt M8', qty: 1 },
      { n: 2, desc: 'Top plate', qty: 1 },
      { n: 3, desc: 'Bottom plate', qty: 1 },
      { n: 4, desc: 'Washer', qty: 1 },
      { n: 5, desc: 'Hex nut M8', qty: 1 },
    ];
    const TBL_X = 20, TBL_Y = 95, ROW_H = 7;
    function partsListReveals() {
      const reveals = [
        { kind: 'label', at: [TBL_X, TBL_Y], text: 'ITEM   DESCRIPTION       QTY', size: 4, anchor: 'start', color: '#fde047' },
        { kind: 'line', p1: [TBL_X, TBL_Y + 2.5], p2: [TBL_X + 150, TBL_Y + 2.5], lineType: 'B' },
      ];
      PARTS.forEach((p, i) => {
        const y = TBL_Y + ROW_H * (i + 1.4);
        reveals.push({ kind: 'label', at: [TBL_X, y], text: p.n + '      ' + p.desc.padEnd(16, ' ') + p.qty, size: 4, anchor: 'start', color: '#cbd5e1' });
      });
      return reveals;
    }

    CONSTRUCTIONS['bolted-joint-assembly'] = {
      id: 'bolted-joint-assembly', title: 'Bolted Joint — Sectional Assembly',
      summary: 'A part-sectional assembly of two plates, a bolt, washer and nut — showing why fasteners are never hatched, how adjacent parts get different hatching, and how a parts list ties it together.',
      bounds: { w: 195, h: 205 },
      workbookPrompt: 'Draw the sectional front view of the bolted joint. Hatch both plates — using a DIFFERENT hatch angle for each so they read as separate parts — but leave the bolt, washer and nut unsectioned. Add item-number balloons and complete the parts list.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the two plates as rectangles, one on top of the other, with a clearance gap left in the middle for the bolt hole.',
          calloutAt: [CX, (P1_TOP + P2_BOT) / 2],
          reveals: [
            { kind: 'polygon', points: [[PLATE_L, P1_TOP], [PLATE_R, P1_TOP], [PLATE_R, P1_BOT], [PLATE_L, P1_BOT]], lineType: 'A' },
            { kind: 'polygon', points: [[PLATE_L, P2_TOP], [PLATE_R, P2_TOP], [PLATE_R, P2_BOT], [PLATE_L, P2_BOT]], lineType: 'A' },
            { kind: 'line', p1: [CX, P1_TOP - 2], p2: [CX, P2_BOT + 2], lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Hatch both plates, since the cutting plane passes through solid material in each — but use a DIFFERENT hatch angle for the two plates. This is the convention that tells the reader "these are two separate parts", not one.',
          calloutAt: [PLATE_L + 15, (P1_TOP + P1_BOT) / 2],
          reveals: [
            ...hatchRect(PLATE_L, P1_TOP, (CX - HOLE_R) - PLATE_L, P1_BOT - P1_TOP, 4),
            ...hatchRect(CX + HOLE_R, P1_TOP, PLATE_R - (CX + HOLE_R), P1_BOT - P1_TOP, 4),
            ...hatchRectMirror(PLATE_L, P2_TOP, (CX - HOLE_R) - PLATE_L, P2_BOT - P2_TOP, 4),
            ...hatchRectMirror(CX + HOLE_R, P2_TOP, PLATE_R - (CX + HOLE_R), P2_BOT - P2_TOP, 4),
          ],
        },
        {
          id: 3,
          instruction: 'Draw the bolt (hex head, shank), washer and nut passing through the hole. Even though the cutting plane runs straight through their centres, standard fasteners are NEVER hatched — sectioning them would add no useful information, so by convention they are drawn as a plain outline only.',
          calloutAt: [CX, HEAD_TOP + 4],
          reveals: [
            { kind: 'polygon', points: headHex, lineType: 'A' },
            { kind: 'line', p1: [CX - SHANK_R, HEAD_BOT], p2: [CX - SHANK_R, SHANK_BOT], lineType: 'A' },
            { kind: 'line', p1: [CX + SHANK_R, HEAD_BOT], p2: [CX + SHANK_R, SHANK_BOT], lineType: 'A' },
            { kind: 'polygon', points: [[CX - WASHER_R, WASHER_TOP], [CX + WASHER_R, WASHER_TOP], [CX + WASHER_R, WASHER_BOT], [CX - WASHER_R, WASHER_BOT]], lineType: 'A' },
            { kind: 'polygon', points: nutHex, lineType: 'A' },
            { kind: 'line', p1: [CX, HEAD_TOP - 4], p2: [CX, NUT_BOT + 4], lineType: 'centre' },
          ],
        },
        {
          id: 4,
          instruction: 'Add an item-number balloon (a numbered circle on a leader line) to every unique part, then list each item, its description and quantity in a parts list below the drawing — exactly like a real assembly drawing\'s bill of materials.',
          calloutAt: [BX, 40],
          reveals: [
            ...balloon(1, [BX, 12], [CX, HEAD_TOP + 5]),
            ...balloon(2, [BX, 25], [PLATE_R, (P1_TOP + P1_BOT) / 2]),
            ...balloon(3, [BX, 40], [PLATE_R, (P2_TOP + P2_BOT) / 2]),
            ...balloon(4, [BX, 55], [CX + WASHER_R, (WASHER_TOP + WASHER_BOT) / 2]),
            ...balloon(5, [BX, 70], [CX + NUT_R, (NUT_TOP + NUT_BOT) / 2]),
            ...partsListReveals(),
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'In a sectional assembly drawing, a cutting plane passes lengthwise through a bolt, nut, washer or shaft. What convention is followed?',
      options: [
        'These standard fasteners/shafts are conventionally shown UN-sectioned (not hatched), even though the cutting plane passes through them',
        'They are always hatched, exactly like any other solid material',
        'They are always shown as hidden (dashed) detail instead',
        'They are simply omitted from the drawing entirely',
      ],
      answer: 0,
      explanation: 'Sectioning a fastener or shaft along its length adds no useful information, so by long-standing convention bolts, nuts, screws, rivets, keys and shafts are always drawn un-hatched even when the cutting plane runs through them.',
    },
    {
      text: 'Two adjacent parts are both cut by the same section plane. How does the drawing make clear they are two separate parts, not one?',
      options: [
        'The hatching is drawn at a different angle (or spacing) in each part',
        'They are drawn in two different colours',
        'Only one of the two parts is ever hatched',
        'A double-thick border line always separates them',
      ],
      answer: 0,
      explanation: 'Varying the hatch angle (typically 45° vs 135°) or spacing between touching parts is the standard way to show they are distinct components, even though both are cut by the same plane.',
    },
    {
      text: 'In the simplified representation of an EXTERNAL thread (e.g. a bolt), which line type is used for the crest (major diameter) and which for the root (minor diameter)?',
      options: [
        'Crest = thick (A) continuous line; root = thin (B) continuous line, shown as a broken (3/4) circle in the end view',
        'Crest = thin (B) line; root = thick (A) line',
        'Both crest and root are drawn with the same thick (A) line',
        'Both are drawn dashed, since a thread is technically hidden detail',
      ],
      answer: 0,
      explanation: 'The visible outer edge of an external thread (crest) is thick/A; the root sits just inside it and is drawn thin/B, conventionally broken into a 3/4 circle in the end view — never dashed.',
    },
    {
      text: 'For an INTERNAL thread (inside a nut or a tapped hole), which diameter is drawn with the thick line?',
      options: [
        'The root (minor) diameter is thick (A); the crest (major) diameter is thin (B) — the reverse of an external thread',
        'The same as an external thread: crest thick, root thin',
        'Internal threads are never shown on assembly drawings',
        'Both diameters are shown thin (B)',
      ],
      answer: 0,
      explanation: 'The convention reverses for an internal thread: the root (the actual drilled/tapped hole edge) reads as the solid boundary and is thick/A, while the crest (where the thread cuts into the material) is thin/B.',
    },
    {
      text: 'What is the purpose of an item number ("balloon") on an assembly drawing?',
      options: [
        'It identifies each unique part, cross-referenced to a parts list (bill of materials) giving its description and quantity',
        'It shows the exact mass of that part in kilograms',
        'It indicates which part was drawn most recently',
        'It replaces the need for any hatching on that part',
      ],
      answer: 0,
      explanation: 'A numbered balloon on a leader line links a part in the drawing to its row in the parts list, where its description, material and quantity are recorded.',
    },
    {
      text: 'Which of these is NOT one of the four sectional view types used for mechanical assembly drawings?',
      options: [
        'Isometric-sectional',
        'Non-sectional',
        'Half-sectional',
        'Part-sectional',
      ],
      answer: 0,
      explanation: 'Mechanical assemblies are drawn non-sectional, full-sectional, half-sectional or part-sectional (a local "broken-out" section) — "isometric-sectional" is not a recognised drawing type.',
    },
    {
      text: 'What is a key and keyway used for in a mechanical assembly?',
      options: [
        'A key fits into matching keyways cut into a shaft and a hub (e.g. a gear or pulley) so the two rotate together, transmitting torque without slipping',
        'A key locks a drawing file so it cannot be edited',
        'A keyway is another name for a bolt hole',
        'Keys are used only to hold two plates apart, never to transmit rotation',
      ],
      answer: 0,
      explanation: 'A key sits in aligned keyway slots machined into both the shaft and the component mounted on it, preventing relative rotation while torque is transmitted.',
    },
    {
      text: 'What accuracy tolerance is permitted on all aspects of a CAPS Engineering Graphics and Design drawing, including assemblies?',
      options: ['A deviation of only 1 mm or 1°', 'A deviation of up to 5 mm or 5°', 'No tolerance is permitted at all', 'A deviation of up to 10%'],
      answer: 0,
      explanation: 'Because accuracy is fundamental to EGD, the DBE exam guidelines allow a deviation of only 1 mm or 1° on any aspect of any drawing.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['hex-bolt-representation', 'bolted-joint-assembly'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
