// Mechanical Analytical — Chapter data. Requires engine-geometry.js loaded first
// (window.ConstructionGeometry). Grade 10-12: this is a READING/INTERPRETATION chapter, not a
// construction chapter — each "sheet" reveals a complete worked drawing in step 1, then each
// later step adds one numbered balloon (reusing the engine's built-in calloutAt marker) that
// explains what that specific feature or symbol on the drawing means. Symbols are drawn to
// SANS/ISO convention but simplified for teaching clarity, matching the thread convention
// already established in mechanical-assemblies.data.js.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  function hatchRect(x0, y0, w, h, spacing, angleDeg) {
    angleDeg = angleDeg == null ? 45 : angleDeg;
    const a = angleDeg * Math.PI / 180;
    const tx = Math.cos(a), ty = Math.sin(a);
    const diag = Math.hypot(w, h) + spacing;
    const n = Math.ceil(diag / spacing);
    const lines = [];
    for (let i = -n; i <= n; i++) {
      const ox = i * spacing * -ty, oy = i * spacing * tx;
      const cx = x0 + w / 2 + ox, cy = y0 + h / 2 + oy;
      const p1 = [cx - tx * diag, cy - ty * diag];
      const p2 = [cx + tx * diag, cy + ty * diag];
      const clipped = clipToRect(p1, p2, x0, y0, w, h);
      if (clipped) lines.push({ kind: 'line', p1: clipped[0], p2: clipped[1], lineType: 'B' });
    }
    return lines;
  }
  function clipToRect(p1, p2, x0, y0, w, h) {
    const x1v = x0, x2v = x0 + w, y1v = y0, y2v = y0 + h;
    let t0 = 0, t1 = 1;
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    const checks = [[-dx, p1[0] - x1v], [dx, x2v - p1[0]], [-dy, p1[1] - y1v], [dy, y2v - p1[1]]];
    for (const [p, q] of checks) {
      if (p === 0) { if (q < 0) return null; continue; }
      const r = q / p;
      if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r; }
      else { if (r < t0) return null; if (r < t1) t1 = r; }
    }
    return [[p1[0] + t0 * dx, p1[1] + t0 * dy], [p1[0] + t1 * dx, p1[1] + t1 * dy]];
  }

  // ── 1. Reading Size & Tolerance Dimensions ──
  (function () {
    const y0 = 60, y1 = 90, x0 = 20, x1 = 70, x2 = 130, x3 = 140;
    CONSTRUCTIONS['dimensioning-tolerancing'] = {
      id: 'dimensioning-tolerancing', title: 'Reading Size & Tolerance Dimensions',
      summary: 'A stepped shaft, fully dimensioned and toleranced — click through the balloons to read what each dimension actually tells a machinist.',
      bounds: { w: 175, h: 130 },
      workbookPrompt: 'Given this dimensioned shaft, list the largest and smallest permitted diameter at each step, and the shortest and longest permitted overall length.',
      steps: [
        {
          id: 1,
          instruction: 'This shaft has been fully dimensioned and toleranced, ready for manufacture. Balloon 1: the overall length dimension runs from extension line to extension line — it measures only between the two features it touches, nothing more.',
          calloutAt: [x3 + 20, 40],
          reveals: [
            { kind: 'line', p1: [x0, y0], p2: [x1, y0], lineType: 'A' }, { kind: 'line', p1: [x0, y1], p2: [x1, y1], lineType: 'A' },
            { kind: 'line', p1: [x0, y0], p2: [x0, y1], lineType: 'A' },
            { kind: 'line', p1: [x1, y0 + 8], p2: [x2, y0 + 8], lineType: 'A' }, { kind: 'line', p1: [x1, y1 - 8], p2: [x2, y1 - 8], lineType: 'A' },
            { kind: 'line', p1: [x1, y0], p2: [x1, y0 + 8], lineType: 'A' }, { kind: 'line', p1: [x1, y1], p2: [x1, y1 - 8], lineType: 'A' },
            { kind: 'line', p1: [x2, y0 + 8], p2: [x2, y1 - 8], lineType: 'A' },
            { kind: 'arc-construction', center: [x1, y0 + 8], r: 4, startDeg: 180, endDeg: 270, lineType: 'B' },
            { kind: 'arc-construction', center: [x1, y1 - 8], r: 4, startDeg: 90, endDeg: 180, lineType: 'B' },
            { kind: 'line', p1: [10, 75], p2: [x3, 75], lineType: 'centre' },
            { kind: 'dimension', p1: [x0, 45], p2: [x2, 45], offset: 0, text: '110 ±0.20' },
            { kind: 'label', at: [x3 + 12, 39], text: '← 1', size: 4, anchor: 'start', color: '#eab308' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: this dimension reads "⌀ 30 h7". The ⌀ symbol means the number that follows is a DIAMETER, not a radius — critical, since a diameter and a radius on the same drawing look identical without it.',
          calloutAt: [x0 - 12, 75],
          reveals: [{ kind: 'dimension', p1: [x0 - 8, y0], p2: [x0 - 8, y1], offset: 0, text: '⌀ 30 h7' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: "h7" is a tolerance-grade symbol (an ISO limits-and-fits code) — it tells a machinist the exact permitted upper and lower size limits from a standard reference table, without having to write both numbers out by hand.',
          calloutAt: [x1 + 15, 60],
          reveals: [{ kind: 'dimension', p1: [x1 + 4, y0 + 8], p2: [x1 + 4, y1 - 8], offset: 0, text: '⌀ 15 ±0.05' }],
        },
        {
          id: 4,
          instruction: 'Balloon 4: "±0.05" is a plus/minus (bilateral) tolerance — the finished part may measure anywhere from 14.95 mm to 15.05 mm and still be accepted. Written-out tolerances like this are common where a matching ISO grade doesn\'t apply.',
          calloutAt: [x1 + 4, y0 - 4],
          reveals: [],
        },
        {
          id: 5,
          instruction: 'Balloon 5: "R3" at the step always uses a leader that touches the arc itself, and always starts with R — this instantly distinguishes a radius (measured from the centre to the edge) from a diameter (measured straight across).',
          calloutAt: [x1 + 10, y1 + 10],
          reveals: [{ kind: 'label', at: [x1 + 6, y1 + 16], text: 'R3', size: 4.2, anchor: 'start', color: '#fde047' }],
        },
        {
          id: 6,
          instruction: 'Balloon 6: the long chain-dashed line through the shaft\'s axis is the CENTRE LINE — a thin B-weight line, never used for construction. It marks the axis of symmetry and lets every diameter be dimensioned from a single reference.',
          calloutAt: [30, 75],
          reveals: [],
        },
      ],
    };
  })();

  // ── 2. Reading Screw Thread Callouts ──
  (function () {
    CONSTRUCTIONS['thread-callouts'] = {
      id: 'thread-callouts', title: 'Reading Screw Thread Callouts',
      summary: 'The simplified thread symbol tells you WHERE a thread is; the callout text tells you exactly WHAT thread it is — both are needed to manufacture the part.',
      bounds: { w: 185, h: 140 },
      workbookPrompt: 'Given an external thread callout "M12 × 1.75 – 6g" and an internal callout "M10 × 1.5 – 6H", identify the major diameter, pitch, and tolerance class of each, and state which one is external.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: the external (bolt) thread — the OUTER pair of lines is the crest (major diameter), drawn thick (A). The inner pair, set slightly in, is the root (minor diameter), drawn thin (B). This is the simplified thread convention.',
          calloutAt: [55, 45],
          reveals: [
            { kind: 'line', p1: [20, 50], p2: [90, 50], lineType: 'A' }, { kind: 'line', p1: [20, 90], p2: [90, 90], lineType: 'A' },
            { kind: 'line', p1: [20, 53], p2: [90, 53], lineType: 'B' }, { kind: 'line', p1: [20, 87], p2: [90, 87], lineType: 'B' },
            { kind: 'line', p1: [20, 50], p2: [20, 90], lineType: 'A' }, { kind: 'line', p1: [90, 50], p2: [90, 90], lineType: 'A' },
            { kind: 'line', p1: [55, 65], p2: [55, 75], lineType: 'centre' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: "M12 × 1.75 – 6g" — M = ISO metric thread form, 12 = nominal major diameter in mm, 1.75 = pitch in mm (the distance between adjacent thread crests), 6g = tolerance class (lower-case letter = EXTERNAL thread).',
          calloutAt: [20, 40],
          reveals: [{ kind: 'label', at: [20, 40], text: 'M12 × 1.75 – 6g', size: 4.4, anchor: 'start', color: '#fde047' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the internal (tapped hole) thread, end view. The convention REVERSES here: the root circle (the actual drilled/tapped edge) is thick (A) and full; the crest circle (where the thread cuts into the material) is thin (B), broken into a 3/4 arc.',
          calloutAt: [140, 78],
          reveals: [
            { kind: 'circle', center: [140, 100], r: 10, lineType: 'A' },
            { kind: 'arc-construction', center: [140, 100], r: 13, startDeg: 0, endDeg: 270, lineType: 'B' },
            { kind: 'line', p1: [140, 90], p2: [140, 110], lineType: 'centre' }, { kind: 'line', p1: [130, 100], p2: [150, 100], lineType: 'centre' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: "M10 × 1.5 – 6H" — same reading as before, but the UPPER-case H confirms this is the INTERNAL thread\'s tolerance class. A 6g bolt is designed to mate correctly with a 6H hole or nut.',
          calloutAt: [120, 65],
          reveals: [{ kind: 'label', at: [110, 60], text: 'M10 × 1.5 – 6H', size: 4.4, anchor: 'start', color: '#fde047' }],
        },
        {
          id: 5,
          instruction: 'Balloon 5: if a callout ends in "LH" (e.g. "M8 × 1.25 – LH"), the thread is LEFT-HAND — it tightens anticlockwise. No LH/RH flag at all means the industry-standard default: right-hand.',
          calloutAt: [55, 110],
          reveals: [{ kind: 'label', at: [40, 118], text: 'M8 × 1.25 – LH  (no flag = right-hand)', size: 3.8, anchor: 'start', color: '#94a3b8' }],
        },
      ],
    };
  })();

  // ── 3. Reading Surface Texture (Roughness) Symbols ──
  (function () {
    CONSTRUCTIONS['surface-finish-symbols'] = {
      id: 'surface-finish-symbols', title: 'Reading Surface Texture (Roughness) Symbols',
      summary: 'A small check-mark symbol on a surface line controls exactly how smooth that surface must be machined — and whether machining is required, optional, or forbidden.',
      bounds: { w: 190, h: 130 },
      workbookPrompt: 'Given a part with three surfaces marked Ra 1.6, Ra 3.2 (bar variant) and a "no material removal" symbol, state which surface must be smoothest and which must be left as-cast.',
      steps: [
        {
          id: 1,
          instruction: 'A block with three different surface-texture requirements. Balloon 1: the bare tick symbol — its apex touches the surface line, and it means "this surface\'s texture is controlled" without specifying HOW it must be produced.',
          calloutAt: [55, 40],
          reveals: [
            { kind: 'polygon', points: [[20, 50], [170, 50], [170, 100], [20, 100]], lineType: 'A' },
            { kind: 'polyline', points: [[50, 50], [53, 44], [59, 56]], lineType: 'B' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: "Ra 1.6" is the roughness value in micrometres (µm) — the arithmetic mean deviation of the surface profile. The SMALLER the Ra number, the SMOOTHER (more finely finished) the surface.',
          calloutAt: [50, 32],
          reveals: [{ kind: 'label', at: [42, 32], text: 'Ra 1.6', size: 4, anchor: 'start', color: '#fde047' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: adding a horizontal bar across the top of the tall leg means "material removal by machining IS required" — this surface must be cut, not left in its as-cast or as-forged state.',
          calloutAt: [100, 50],
          reveals: [
            { kind: 'polyline', points: [[95, 50], [98, 44], [104, 56]], lineType: 'B' },
            { kind: 'line', p1: [98, 44], p2: [107, 44], lineType: 'B' },
            { kind: 'label', at: [92, 32], text: 'Ra 3.2', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: a small circle at the tick\'s vertex means the OPPOSITE — material removal is PROHIBITED on this surface. It must be left exactly as produced by the initial process (e.g. an as-cast surface that mates with nothing).',
          calloutAt: [145, 50],
          reveals: [
            { kind: 'polyline', points: [[140, 50], [143, 44], [149, 56]], lineType: 'B' },
            { kind: 'circle', center: [143, 44], r: 1.6, lineType: 'B' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5: a designer chooses a LOW Ra (smooth, expensive to machine) only where it matters — sealing faces, bearing surfaces, sliding fits. Non-critical faces are left at a coarser, cheaper Ra to avoid wasting machining time.',
          calloutAt: [95, 95],
          reveals: [],
        },
      ],
    };
  })();

  // ── 4. Reading Welding Symbols ──
  (function () {
    CONSTRUCTIONS['welding-symbols'] = {
      id: 'welding-symbols', title: 'Reading Welding Symbols',
      summary: 'A welding symbol packs the joint type, weld size and extent into a single reference line and arrow — read left to right, symbol first, numbers second.',
      bounds: { w: 195, h: 145 },
      workbookPrompt: 'Given a fillet-weld symbol with leg length 5 mm and an all-around circle, and a separate square-groove butt-weld symbol, sketch the resulting welded joints in cross-section.',
      steps: [
        {
          id: 1,
          instruction: 'A T-joint (fillet weld) on the left, a butt joint on the right. Balloon 1: the arrow and reference line — the arrow physically points to the joint; the horizontal reference line carries the actual weld-type symbol.',
          calloutAt: [55, 35],
          reveals: [
            { kind: 'line', p1: [20, 90], p2: [80, 90], lineType: 'A' }, { kind: 'line', p1: [50, 60], p2: [50, 90], lineType: 'A' },
            { kind: 'line', p1: [40, 75], p2: [65, 45], lineType: 'B' }, { kind: 'line', p1: [65, 45], p2: [110, 45], lineType: 'B' },
            { kind: 'polygon', points: [[40, 90], [48, 90], [48, 82]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the filled triangle sitting BELOW the reference line is the fillet-weld symbol. Its position (below vs above the line) tells you which side of the joint the weld goes on — below the line means the arrow side.',
          calloutAt: [90, 45],
          reveals: [
            { kind: 'polygon', points: [[85, 45], [93, 45], [85, 51]], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the number "5" to the left of the triangle is the fillet weld\'s LEG LENGTH in mm — the size of each of the two equal legs of the triangular weld bead.',
          calloutAt: [80, 40],
          reveals: [{ kind: 'label', at: [75, 40], text: '5', size: 4.4, anchor: 'start', color: '#fde047' }],
        },
        {
          id: 4,
          instruction: 'Balloon 4: a small circle drawn at the bend of the arrow/reference line means "weld ALL AROUND" the joint — without it, the weld is understood to run only along the length shown, not around the full perimeter.',
          calloutAt: [65, 45],
          reveals: [{ kind: 'circle', center: [65, 45], r: 3, lineType: 'B' }],
        },
        {
          id: 5,
          instruction: 'Balloon 5: on the right, two plates meet edge-to-edge. This symbol — a flat bar sitting on the reference line — is the square-groove (butt) weld symbol: a full-penetration weld straight across the joined edges.',
          calloutAt: [150, 65],
          reveals: [
            { kind: 'line', p1: [130, 90], p2: [130, 50], lineType: 'A' }, { kind: 'line', p1: [134, 90], p2: [134, 50], lineType: 'A' },
            { kind: 'line', p1: [140, 70], p2: [165, 45], lineType: 'B' }, { kind: 'line', p1: [165, 45], p2: [195, 45], lineType: 'B' },
            { kind: 'line', p1: [185, 42], p2: [185, 48], lineType: 'A' },
            { kind: 'label', at: [178, 40], text: '4', size: 4.4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 6,
          instruction: 'Balloon 6: fillet welds join plates that meet at an angle (T-joints, lap joints) and are quick and cheap; butt welds join plates edge-to-edge and, done correctly, restore close to the full strength of the original material.',
          calloutAt: [110, 100],
          reveals: [],
        },
      ],
    };
  })();

  // ── 5. Reading a Geometric Tolerance (Feature Control Frame) ──
  (function () {
    const fx = 60, fy = 35, cw = 22, ch = 12;
    CONSTRUCTIONS['gdt-basics'] = {
      id: 'gdt-basics', title: 'Reading a Geometric Tolerance (Feature Control Frame)',
      summary: 'A feature control frame replaces a vague ± dimension with an exact, unambiguous tolerance ZONE — read it left to right: characteristic, then tolerance, then datum.',
      bounds: { w: 190, h: 135 },
      workbookPrompt: 'Given a feature control frame reading "flatness | 0.05 | –" applied to the top face of a block, and a datum symbol "A" on its base, explain in your own words what the top face is required to do.',
      steps: [
        {
          id: 1,
          instruction: 'A rectangular block with its top face controlled by a feature control frame. Balloon 1: the FIRST compartment holds the geometric characteristic symbol — here, flatness. It states WHAT property is being controlled.',
          calloutAt: [fx + cw / 2, fy - 8],
          reveals: [
            { kind: 'polygon', points: [[20, 60], [140, 60], [140, 100], [20, 100]], lineType: 'A' },
            { kind: 'polygon', points: [[fx, fy], [fx + cw, fy], [fx + cw, fy + ch], [fx, fy + ch]], lineType: 'A' },
            { kind: 'line', p1: [fx + cw, fy], p2: [fx + cw, fy + ch], lineType: 'A' },
            { kind: 'label', at: [fx + cw / 2, fy + ch / 2 + 1.5], text: '▱', size: 6, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'line', p1: [fx + 3, fy + ch], p2: [65, 60], lineType: 'B' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the SECOND compartment, "0.05", is the tolerance value in mm — the entire top face must lie between two parallel planes exactly 0.05 mm apart, no matter how the part is measured or oriented.',
          calloutAt: [fx + cw + cw / 2, fy - 8],
          reveals: [
            { kind: 'polygon', points: [[fx + cw, fy], [fx + 2 * cw, fy], [fx + 2 * cw, fy + ch], [fx + cw, fy + ch]], lineType: 'A' },
            { kind: 'line', p1: [fx + 2 * cw, fy], p2: [fx + 2 * cw, fy + ch], lineType: 'A' },
            { kind: 'label', at: [fx + cw + cw / 2, fy + ch / 2 + 1.5], text: '0.05', size: 4, anchor: 'middle', color: '#fde047' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the THIRD compartment holds a DATUM reference letter — used when the tolerance needs to relate to another reference surface (e.g. perpendicularity to datum A). Flatness is a pure FORM tolerance, so this compartment is left blank here.',
          calloutAt: [fx + 2.5 * cw, fy - 8],
          reveals: [
            { kind: 'polygon', points: [[fx + 2 * cw, fy], [fx + 3 * cw, fy], [fx + 3 * cw, fy + ch], [fx + 2 * cw, fy + ch]], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: the triangle-and-box symbol on the base is the DATUM FEATURE symbol — it labels this physical surface "A" so that OTHER feature control frames elsewhere on the drawing can reference it as a fixed measuring origin.',
          calloutAt: [80, 108],
          reveals: [
            { kind: 'polygon', points: [[76, 100], [84, 100], [80, 106]], lineType: 'A' },
            { kind: 'polygon', points: [[74, 110], [86, 110], [86, 118], [74, 118]], lineType: 'A' },
            { kind: 'line', p1: [80, 106], p2: [80, 110], lineType: 'A' },
            { kind: 'label', at: [80, 115.5], text: 'A', size: 4.4, anchor: 'middle', color: '#fde047' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5: a plain ± dimension only controls SIZE at individual measured points. A geometric tolerance controls the whole SHAPE at once (flatness, straightness, perpendicularity...) inside one clearly defined zone — far less open to interpretation on the shop floor.',
          calloutAt: [80, 75],
          reveals: [],
        },
      ],
    };
  })();

  // ── 6. Reading Hole, Counterbore & Countersink Callouts ──
  (function () {
    CONSTRUCTIONS['hole-callouts'] = {
      id: 'hole-callouts', title: 'Reading Hole, Counterbore & Countersink Callouts',
      summary: 'Three sections through three very differently machined holes — the callout text is the only way to tell them apart from a single view.',
      bounds: { w: 195, h: 135 },
      workbookPrompt: 'Given the callouts "⌀8 THRU", "⌀14 CBORE ⌀8 DEEP 5", and "⌀12 X 90° CSK", sketch a cross-section of each resulting hole.',
      steps: [
        {
          id: 1,
          instruction: 'Three cross-sections through a plate, each machined differently. Balloon 1: a plain straight-sided hole with the callout "⌀8 THRU" — THRU means the hole passes completely through the material, so no depth value is ever given.',
          calloutAt: [45, 40],
          reveals: [
            { kind: 'polygon', points: [[20, 50], [70, 50], [70, 100], [20, 100]], lineType: 'A' },
            { kind: 'line', p1: [40, 50], p2: [40, 100], lineType: 'hidden' }, { kind: 'line', p1: [50, 50], p2: [50, 100], lineType: 'hidden' },
            { kind: 'label', at: [20, 40], text: '⌀8 THRU', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: a stepped hole — "⌀14 CBORE ⌀8 DEEP 5". CBORE (counterbore) is a wider, flat-bottomed recess machined at the entrance, usually so a bolt head can sit flush with or below the surface.',
          calloutAt: [95, 40],
          reveals: [
            { kind: 'polygon', points: [[80, 50], [130, 50], [130, 100], [80, 100]], lineType: 'A' },
            { kind: 'line', p1: [95, 50], p2: [95, 62], lineType: 'hidden' }, { kind: 'line', p1: [115, 50], p2: [115, 62], lineType: 'hidden' },
            { kind: 'line', p1: [95, 62], p2: [100, 62], lineType: 'hidden' }, { kind: 'line', p1: [115, 62], p2: [110, 62], lineType: 'hidden' },
            { kind: 'line', p1: [100, 62], p2: [100, 100], lineType: 'hidden' }, { kind: 'line', p1: [110, 62], p2: [110, 100], lineType: 'hidden' },
            { kind: 'label', at: [80, 40], text: '⌀14 CBORE ⌀8 DEEP 5', size: 3.6, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: "DEEP 5" is the counterbore\'s own depth, measured from the top surface — read as a stack: outer diameter first, then CBORE, then the through-hole diameter, then how deep the wide recess itself goes.',
          calloutAt: [95, 65],
          reveals: [],
        },
        {
          id: 4,
          instruction: 'Balloon 4: a conical recess — "⌀12 X 90° CSK". CSK (countersink) is a cone-shaped recess, sized by its included ANGLE (here 90°), used to seat a flat-headed screw so its top sits flush with the surface.',
          calloutAt: [160, 40],
          reveals: [
            { kind: 'polygon', points: [[140, 50], [190, 50], [190, 100], [140, 100]], lineType: 'A' },
            { kind: 'line', p1: [155, 50], p2: [160, 60], lineType: 'hidden' }, { kind: 'line', p1: [175, 50], p2: [170, 60], lineType: 'hidden' },
            { kind: 'line', p1: [160, 60], p2: [160, 100], lineType: 'hidden' }, { kind: 'line', p1: [170, 60], p2: [170, 100], lineType: 'hidden' },
            { kind: 'label', at: [140, 40], text: '⌀12 X 90° CSK', size: 3.8, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5: a designer picks CBORE for a socket-head cap screw (flat-bottomed head) and CSK for a countersunk/flat-head screw (angled head) — the recess shape must always match the fastener head it is hiding.',
          calloutAt: [95, 108],
          reveals: [],
        },
      ],
    };
  })();

  // ── 7. Reading Section Views & Hatching Conventions ──
  (function () {
    const p1x = 30, p1y = 55, p1w = 55, p1h = 40;
    const p2x = 95, p2y = 55, p2w = 40, p2h = 40;
    CONSTRUCTIONS['section-hatching'] = {
      id: 'section-hatching', title: 'Reading Section Views & Hatching Conventions',
      summary: 'Hatching shows exactly which material a cutting plane sliced through — and its angle and spacing are the only clue separating two touching parts.',
      bounds: { w: 190, h: 140 },
      workbookPrompt: 'Given a section view of two adjacent parts hatched at different angles, and a cutting-plane line "A-A" on the companion view, identify which hatching belongs to which part and state what the arrows on the cutting-plane line mean.',
      steps: [
        {
          id: 1,
          instruction: 'A sectioned assembly of two adjacent parts. Balloon 1: this hatched region represents SOLID material the cutting plane actually sliced through — an open hole or gap in the same view is left completely blank, never hatched.',
          calloutAt: [p1x + p1w / 2, p1y - 8],
          reveals: [
            { kind: 'polygon', points: [[p1x, p1y], [p1x + p1w, p1y], [p1x + p1w, p1y + p1h], [p1x, p1y + p1h]], lineType: 'A' },
            ...hatchRect(p1x, p1y, p1w, p1h, 5, 45),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: this second region is hatched at a different angle to the first — the SANS/ISO convention for adjacent parts in the same section: different hatching (angle or spacing) always means a DIFFERENT component, even though the parts are touching.',
          calloutAt: [p2x + p2w / 2, p2y - 8],
          reveals: [
            { kind: 'polygon', points: [[p2x, p2y], [p2x + p2w, p2y], [p2x + p2w, p2y + p2h], [p2x, p2y + p2h]], lineType: 'A' },
            ...hatchRect(p2x, p2y, p2w, p2h, 5, -45),
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the heavy chain-dashed CUTTING-PLANE line, drawn on a companion (uncut) view, marks exactly where this imaginary slice was made. The arrows at each end point in the direction the section is viewed FROM.',
          calloutAt: [95, 20],
          reveals: [
            { kind: 'line', p1: [40, 15], p2: [150, 15], lineType: 'centre' },
            { kind: 'polygon', points: [[40, 15], [46, 12], [46, 18]], lineType: 'A' },
            { kind: 'polygon', points: [[150, 15], [144, 12], [144, 18]], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: the letters "A" at each end of the cutting-plane line match the title below the resulting hatched view, "SECTION A-A" — on a drawing with several sections, this is how a reader matches each cut to its own view.',
          calloutAt: [95, 108],
          reveals: [
            { kind: 'label', at: [95, 108], text: 'SECTION A-A', size: 4.4, anchor: 'middle', color: '#fde047' },
            { kind: 'label', at: [37, 10], text: 'A', size: 4, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [153, 10], text: 'A', size: 4, anchor: 'middle', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 8. Reading a Complete Assembly Drawing & Parts List ──
  (function () {
    const tblX = 130, tblY = 30, rowH = 12, colW = [12, 38, 14];
    CONSTRUCTIONS['reading-assembly-bom'] = {
      id: 'reading-assembly-bom', title: 'Reading a Complete Assembly Drawing & Parts List',
      summary: 'Numbered balloons on the assembly view cross-reference the item numbers in the parts list — together they tell you exactly what to build and how many of each part you need.',
      bounds: { w: 195, h: 130 },
      workbookPrompt: 'Given an assembly drawing with four balloons and a matching four-row parts list, write out the full bill of materials (item, description, quantity) in order.',
      steps: [
        {
          id: 1,
          instruction: 'A simple bolted-bracket assembly. Balloon 1 points to the bracket itself — find "1" again in the parts-list table on the right: it reads "Bracket, QTY 1". This is how a drawing feature is matched to its row in the table.',
          calloutAt: [40, 60],
          reveals: [
            { kind: 'polygon', points: [[20, 50], [60, 50], [60, 60], [30, 60], [30, 100], [20, 100]], lineType: 'A' },
            { kind: 'line', p1: [tblX, tblY], p2: [tblX + colW[0] + colW[1] + colW[2], tblY], lineType: 'A' },
            { kind: 'line', p1: [tblX, tblY], p2: [tblX, tblY + rowH * 5], lineType: 'A' },
            { kind: 'line', p1: [tblX + colW[0], tblY], p2: [tblX + colW[0], tblY + rowH * 5], lineType: 'A' },
            { kind: 'line', p1: [tblX + colW[0] + colW[1], tblY], p2: [tblX + colW[0] + colW[1], tblY + rowH * 5], lineType: 'A' },
            { kind: 'line', p1: [tblX + colW[0] + colW[1] + colW[2], tblY], p2: [tblX + colW[0] + colW[1] + colW[2], tblY + rowH * 5], lineType: 'A' },
            ...[0, 1, 2, 3, 4, 5].map(i => ({ kind: 'line', p1: [tblX, tblY + i * rowH], p2: [tblX + colW[0] + colW[1] + colW[2], tblY + i * rowH], lineType: 'A' })),
            { kind: 'label', at: [tblX + colW[0] / 2, tblY + 8], text: 'ITEM', size: 3.2, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] / 2, tblY + 8], text: 'DESCRIPTION', size: 3.2, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] + colW[2] / 2, tblY + 8], text: 'QTY', size: 3.2, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [tblX + colW[0] / 2, tblY + rowH + 8], text: '1', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] / 2, tblY + rowH + 8], text: 'Bracket', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] + colW[2] / 2, tblY + rowH + 8], text: '1', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2 points to the bolt passing through the bracket. Row 2 of the table: "M10 Bolt, QTY 1" — the QTY column tells you exactly how many of that part this one assembly needs.',
          calloutAt: [45, 75],
          reveals: [
            { kind: 'line', p1: [45, 40], p2: [45, 90], lineType: 'A' }, { kind: 'polygon', points: [[40, 35], [50, 35], [50, 40], [40, 40]], lineType: 'A' },
            { kind: 'label', at: [tblX + colW[0] / 2, tblY + 2 * rowH + 8], text: '2', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] / 2, tblY + 2 * rowH + 8], text: 'M10 Bolt', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] + colW[2] / 2, tblY + 2 * rowH + 8], text: '1', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3 points to the washer under the nut. Even a small standard part like a washer gets its own item number and its own table row — nothing in an assembly is left unlisted.',
          calloutAt: [45, 93],
          reveals: [
            { kind: 'line', p1: [40, 90], p2: [50, 90], lineType: 'A' }, { kind: 'line', p1: [40, 92], p2: [50, 92], lineType: 'A' },
            { kind: 'label', at: [tblX + colW[0] / 2, tblY + 3 * rowH + 8], text: '3', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] / 2, tblY + 3 * rowH + 8], text: 'Washer', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] + colW[2] / 2, tblY + 3 * rowH + 8], text: '1', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4 points to the hex nut at the bottom. Row 4: "M10 Nut, QTY 1" — with all four rows read, this table is now the complete bill of materials for the assembly: exactly what to order and how many of each.',
          calloutAt: [45, 98],
          reveals: [
            { kind: 'polygon', points: [[38, 96], [52, 96], [52, 100], [38, 100]], lineType: 'A' },
            { kind: 'label', at: [tblX + colW[0] / 2, tblY + 4 * rowH + 8], text: '4', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] / 2, tblY + 4 * rowH + 8], text: 'M10 Nut', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [tblX + colW[0] + colW[1] + colW[2] / 2, tblY + 4 * rowH + 8], text: '1', size: 3.4, anchor: 'middle', color: '#e8eaf2' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5: item numbers are usually assigned in a logical build order (often largest/main part first, then in assembly sequence) — not alphabetically. Always check the table itself rather than assuming an order.',
          calloutAt: [22, 75],
          reveals: [],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'On a dimensioned drawing, what does the ⌀ symbol immediately before a number mean?',
      options: ['The number is a DIAMETER measurement, not a radius', 'The number is a radius measurement', 'The dimension is only approximate', 'The feature is threaded'],
      answer: 0,
      explanation: 'The ⌀ symbol always signals a diametrical dimension — without it, a reader cannot tell a diameter from a radius from the number alone.',
    },
    {
      text: 'In the thread callout "M12 × 1.75 – 6g", what does the "1.75" represent?',
      options: ['The pitch — the distance in mm between adjacent thread crests', 'The thread\'s tolerance class', 'The length of the bolt', 'The number of threads engaged'],
      answer: 0,
      explanation: 'After the M (metric form) and the nominal major diameter (12), the next number in a metric thread callout is always the pitch in mm.',
    },
    {
      text: 'Why does the simplified thread symbol reverse which line is thick and which is thin between an external (bolt) thread and an internal (tapped hole) thread?',
      options: [
        'Because for an internal thread the root (the actual drilled/tapped edge) is the solid boundary and reads as thick, while the crest (where the thread cuts in) is thin — exactly the reverse of an external thread',
        'It is not actually reversed; both use the same convention',
        'Internal threads are always drawn dashed instead',
        'The reversal only applies to left-hand threads',
      ],
      answer: 0,
      explanation: 'External: crest (outer, solid boundary) is thick, root is thin. Internal: root (the tapped hole\'s actual edge) is thick, crest is thin — the material boundary is always what reads thick.',
    },
    {
      text: 'A surface texture symbol shows "Ra 0.8" on one face and "Ra 6.3" on another. Which face is smoother?',
      options: ['The Ra 0.8 face — a smaller Ra value means a smoother, more finely finished surface', 'The Ra 6.3 face, since it is a bigger number', 'They are equally smooth', 'Ra values do not describe smoothness at all'],
      answer: 0,
      explanation: 'Ra is the arithmetic mean roughness — lower values mean a finer, smoother finish, and are typically reserved for critical mating or sealing surfaces.',
    },
    {
      text: 'On a welding symbol, what does a small circle drawn at the bend of the arrow/reference line indicate?',
      options: ['The weld continues ALL AROUND the joint\'s full perimeter, not just where the arrow points', 'The weld is optional', 'The joint should not be welded at all', 'The weld must be inspected by X-ray'],
      answer: 0,
      explanation: 'Without the circle, a weld is understood to run only along the specific length shown. The circle explicitly extends it around the entire joint.',
    },
    {
      text: 'In a feature control frame reading "▱ | 0.05 | –", what does the middle compartment tell you?',
      options: ['The tolerance value — the feature must lie within a zone 0.05 mm wide', 'The datum reference letter', 'The geometric characteristic being controlled', 'The part\'s material specification'],
      answer: 0,
      explanation: 'A feature control frame reads left to right: characteristic symbol, then tolerance value/zone, then (if needed) datum reference letters.',
    },
    {
      text: 'A hole is callled out as "⌀10 CBORE ⌀6 DEEP 4". What does CBORE tell a machinist to do?',
      options: [
        'Machine a wider, flat-bottomed recess at the hole\'s entrance — typically so a bolt head can sit flush with or below the surface',
        'Cut a conical recess sized by an included angle',
        'The hole must be drilled completely through the material',
        'The hole must be internally threaded'],
      answer: 0,
      explanation: 'CBORE (counterbore) is a flat-bottomed step machined at the hole\'s entrance, usually to recess a socket-head bolt — different from a CSK (countersink), which is conical for flat-head screws.',
    },
    {
      text: 'On a section view, two adjacent (touching) parts are hatched at different angles. What does this indicate?',
      options: [
        'They are two DIFFERENT components, even though they are touching in the drawing',
        'They are the same single part, just drawn inconsistently',
        'One of the two parts is not actually solid material',
        'The hatching angle has no real meaning and is purely decorative'],
      answer: 0,
      explanation: 'Per SANS/ISO convention, adjacent parts in the same section are always hatched at different angles or spacing precisely so a reader can tell them apart, even where they touch.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'dimensioning-tolerancing', 'thread-callouts', 'surface-finish-symbols', 'welding-symbols',
    'gdt-basics', 'hole-callouts', 'section-hatching', 'reading-assembly-bom',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
