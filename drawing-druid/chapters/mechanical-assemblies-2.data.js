// Mechanical Assemblies II — Permanent Fasteners. Chapter data. Requires engine-geometry.js
// loaded first (window.ConstructionGeometry). Grade 12 tier escalation of mechanical-assemblies.
// data.js (Ch11, temporary fasteners: bolts/nuts/washers) — this chapter covers PERMANENT
// fasteners: riveted joints and welded joints, drawn in section using the same conventions
// already taught for reading them in mechanical-analytical.data.js.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // 45°-hatching, B-weight per the CAPS/SANS spec (see mechanical-assemblies.data.js).
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
  function hatchRectMirror(x0, y0, w, h, spacing) {
    return hatchRect(x0, y0, w, h, spacing).map(ln => ({
      kind: 'line', lineType: 'B',
      p1: [x0 + (w - (ln.p1[0] - x0)), ln.p1[1]],
      p2: [x0 + (w - (ln.p2[0] - x0)), ln.p2[1]],
    }));
  }

  // ── 1. Rivet — Conventional Representation (Before & After Driving) ──
  (function () {
    const plateA_x0 = 40, plateA_x1 = 90, plateY0 = 60, plateY1 = 74;
    const plateB_x0 = 115, plateB_x1 = 165;
    CONSTRUCTIONS['rivet-representation'] = {
      id: 'rivet-representation', title: 'Rivet — Conventional Representation',
      summary: 'A rivet arrives with one head already formed — the second (shop) head is formed on site by hammering or pressing the protruding shank, permanently locking the joint.',
      bounds: { w: 205, h: 130 },
      workbookPrompt: 'Draw a rivet before driving (one manufactured head, protruding shank) and after driving (both heads formed) through a single plate section.',
      steps: [
        {
          id: 1,
          instruction: 'BEFORE DRIVING: the plate (sectioned) with the rivet inserted through its pre-drilled hole. Balloon 1: the domed top is the FACTORY (manufactured) head — already formed by the rivet\'s maker, long before it ever reaches site.',
          calloutAt: [65, 25],
          reveals: [
            { kind: 'polygon', points: [[plateA_x0, plateY0], [plateA_x1, plateY0], [plateA_x1, plateY1], [plateA_x0, plateY1]], lineType: 'A' },
            ...hatchRect(plateA_x0, plateY0, plateA_x1 - plateA_x0, plateY1 - plateY0, 4),
            { kind: 'line', p1: [60, 30], p2: [60, 95], lineType: 'A' }, { kind: 'line', p1: [70, 30], p2: [70, 95], lineType: 'A' },
            { kind: 'arc-construction', center: [65, 30], r: 5, startDeg: 180, endDeg: 360, lineType: 'A' },
            { kind: 'line', p1: [65, 60], p2: [65, 74], lineType: 'centre' },
            { kind: 'label', at: [40, 105], text: 'BEFORE DRIVING', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the straight shank passes through matching holes in the plates while still soft, then is DEFORMED to fill the hole completely — leaving no clearance gap at all, unlike a bolt.',
          calloutAt: [65, 60],
          reveals: [],
        },
        {
          id: 3,
          instruction: 'AFTER DRIVING: the protruding tail has been hammered or pressed flat, forming a second dome. Balloon 3: this new SHOP HEAD (or "driven head") permanently clamps the joint — the rivet cannot be removed without drilling it out and destroying it.',
          calloutAt: [140, 95],
          reveals: [
            { kind: 'polygon', points: [[plateB_x0, plateY0], [plateB_x1, plateY0], [plateB_x1, plateY1], [plateB_x0, plateY1]], lineType: 'A' },
            ...hatchRect(plateB_x0, plateY0, plateB_x1 - plateB_x0, plateY1 - plateY0, 4),
            { kind: 'line', p1: [135, 40], p2: [135, 85], lineType: 'A' }, { kind: 'line', p1: [145, 40], p2: [145, 85], lineType: 'A' },
            { kind: 'arc-construction', center: [140, 40], r: 5, startDeg: 180, endDeg: 360, lineType: 'A' },
            { kind: 'arc-construction', center: [140, 85], r: 5, startDeg: 0, endDeg: 180, lineType: 'A' },
            { kind: 'line', p1: [140, 60], p2: [140, 74], lineType: 'centre' },
            { kind: 'label', at: [110, 105], text: 'AFTER DRIVING', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4 (capstone): a rivet is a PERMANENT fastener — the shop head must be drilled or ground away to ever separate the joint again. A bolt, by contrast, is a TEMPORARY fastener: simply unscrew the nut to take the joint apart.',
          calloutAt: [102, 20],
          reveals: [],
        },
      ],
    };
  })();

  // ── 2. Riveted Lap Joint ──
  (function () {
    const p1x0 = 20, p1x1 = 110, p2x0 = 90, p2x1 = 180, py0 = 55, py1 = 70;
    const rivetXs = [100, 130, 160], rivetY = 62.5;
    CONSTRUCTIONS['riveted-lap-joint'] = {
      id: 'riveted-lap-joint', title: 'Riveted Lap Joint',
      summary: 'The simplest riveted joint: one plate overlaps the other directly, and a row of rivets clamps the two overlapping thicknesses together.',
      bounds: { w: 205, h: 155 },
      workbookPrompt: 'Draw a lap joint between two 60 mm wide plates, overlapping by 20 mm, joined by a single row of 3 rivets on a 30 mm pitch. Include a sectional detail through one rivet.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: this is a LAP JOINT — one plate simply overlaps the other along their common edge; the rivets pass through both thicknesses in the overlapping region only.',
          calloutAt: [100, 40],
          reveals: [
            { kind: 'polygon', points: [[p1x0, py0], [p1x1, py0], [p1x1, py1], [p1x0, py1]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'The second plate overlaps the first by the same amount the rivets need to safely clamp — shown here as a hidden-line outline behind the top plate.',
          calloutAt: [150, 78],
          reveals: [
            { kind: 'line', p1: [p2x0, py0], p2: [p2x1, py0], lineType: 'hidden' }, { kind: 'line', p1: [p2x0, py1], p2: [p2x1, py1], lineType: 'hidden' },
            { kind: 'line', p1: [p2x1, py0], p2: [p2x1, py1], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 2: each circle is one RIVET, seen end-on (its factory head, viewed from directly above) — three rivets in a single row down the centre of the overlap.',
          calloutAt: [130, 40],
          reveals: rivetXs.map(x => ({ kind: 'circle', center: [x, rivetY], r: 4, lineType: 'A' })),
        },
        {
          id: 4,
          instruction: 'Balloon 3: notice the equal spacing between rivets — consistent spacing is essential so the load is shared evenly along the whole joint (the exact spacing value is called the PITCH, covered fully in the next sheet).',
          calloutAt: [115, 62.5],
          reveals: [],
        },
        {
          id: 5,
          instruction: 'Balloon 4: a small sectional detail through one rivet confirms the same installed-rivet symbol from the last sheet — but now passing through BOTH plate thicknesses stacked together, exactly as it does in the real joint.',
          calloutAt: [50, 115],
          reveals: [
            { kind: 'polygon', points: [[30, 100], [70, 100], [70, 108], [30, 108]], lineType: 'A' },
            ...hatchRect(30, 100, 40, 8, 4),
            { kind: 'polygon', points: [[30, 108], [70, 108], [70, 116], [30, 116]], lineType: 'A' },
            ...hatchRectMirror(30, 108, 40, 8, 4),
            { kind: 'line', p1: [45, 92], p2: [45, 124], lineType: 'A' }, { kind: 'line', p1: [55, 92], p2: [55, 124], lineType: 'A' },
            { kind: 'arc-construction', center: [50, 92], r: 5, startDeg: 180, endDeg: 360, lineType: 'A' },
            { kind: 'arc-construction', center: [50, 124], r: 5, startDeg: 0, endDeg: 180, lineType: 'A' },
          ],
        },
        {
          id: 6,
          instruction: 'Balloon 5 (capstone): a lap joint is quick to fabricate, but it offsets the two plates\' centrelines — this introduces bending (prying) stress that a straight BUTT joint, in the next sheet, avoids entirely.',
          calloutAt: [100, 140],
          reveals: [],
        },
      ],
    };
  })();

  // ── 3. Riveted Double-Strap Butt Joint ──
  (function () {
    const mx0 = 20, mx1 = 170, my0 = 76, my1 = 90, joint = 95;
    const sx0 = 40, sx1 = 150, s_top0 = 62, s_top1 = 76, s_bot0 = 90, s_bot1 = 104;
    const rivetXs = [55, 75, 115, 135];
    CONSTRUCTIONS['riveted-double-strap-butt-joint'] = {
      id: 'riveted-double-strap-butt-joint', title: 'Riveted Double-Strap Butt Joint',
      summary: 'Two plates meet edge-to-edge and are clamped by cover straps on both faces — a heavier, straighter joint used wherever a lap joint\'s offset can\'t be tolerated.',
      bounds: { w: 195, h: 145 },
      workbookPrompt: 'Draw a double-strap butt joint between two main plates meeting edge-to-edge, with a cover strap on each face and a single row of 2 rivets each side of the joint through all three thicknesses.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: unlike a lap joint, the two MAIN PLATES meet directly edge-to-edge — this is a BUTT joint. The thin vertical line marks exactly where the two original plates abut.',
          calloutAt: [joint, 68],
          reveals: [
            { kind: 'polygon', points: [[mx0, my0], [mx1, my0], [mx1, my1], [mx0, my1]], lineType: 'A' },
            ...hatchRect(mx0, my0, joint - mx0, my1 - my0, 4),
            ...hatchRect(joint, my0, mx1 - joint, my1 - my0, 4),
            { kind: 'line', p1: [joint, my0], p2: [joint, my1], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: a COVER STRAP is riveted over the joint on the top face, and a matching strap on the bottom face — this "sandwiches" the butted plates from both sides, transferring the load straight across with no offset.',
          calloutAt: [95, 55],
          reveals: [
            { kind: 'polygon', points: [[sx0, s_top0], [sx1, s_top0], [sx1, s_top1], [sx0, s_top1]], lineType: 'A' },
            ...hatchRectMirror(sx0, s_top0, sx1 - sx0, s_top1 - s_top0, 4),
            { kind: 'polygon', points: [[sx0, s_bot0], [sx1, s_bot0], [sx1, s_bot1], [sx0, s_bot1]], lineType: 'A' },
            ...hatchRectMirror(sx0, s_bot0, sx1 - sx0, s_bot1 - s_bot0, 4),
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: at each rivet position, the shank now passes through THREE thicknesses at once — strap, main plate, and strap — clamping the whole sandwich together in a single joint.',
          calloutAt: [rivetXs[0], (s_top0 + s_bot1) / 2],
          reveals: rivetXs.flatMap(x => [
            { kind: 'line', p1: [x, s_top0], p2: [x, s_bot1], lineType: 'A' },
            { kind: 'arc-construction', center: [x, s_top0], r: 4, startDeg: 180, endDeg: 360, lineType: 'A' },
            { kind: 'arc-construction', center: [x, s_bot1], r: 4, startDeg: 0, endDeg: 180, lineType: 'A' },
          ]),
        },
        {
          id: 4,
          instruction: 'Balloon 4 (capstone): heavy structural riveting (boilers, bridges, older aircraft) favours a double-strap butt joint over a simple lap joint — no centreline offset means no extra bending stress, even though it needs more rivets and material.',
          calloutAt: [95, 120],
          reveals: [],
        },
      ],
    };
  })();

  // ── 4. Rivet Pitch & Edge-Distance Dimensioning ──
  (function () {
    const px0 = 20, px1 = 170, py0 = 55, py1 = 100;
    const rivetXs = [45, 75, 105, 135], rivetY = 77.5;
    CONSTRUCTIONS['rivet-pitch-edge-distance'] = {
      id: 'rivet-pitch-edge-distance', title: 'Rivet Pitch & Edge-Distance Dimensioning',
      summary: 'Three numbers govern every riveted row: the rivet diameter, the pitch between rivets, and the edge distance to the plate\'s edge — none of them chosen arbitrarily.',
      bounds: { w: 195, h: 135 },
      workbookPrompt: 'Given a plate with rivets on a 30 mm pitch, 25 mm edge distance and ⌀6 rivet diameter, calculate how many rivets fit along a 200 mm long edge.',
      steps: [
        {
          id: 1,
          instruction: 'A single row of 4 rivets along a plate edge, fully dimensioned. Balloon 1: "⌀6" — the rivet\'s (and matching drilled hole\'s) diameter, sized to a close designed fit, never a loose one.',
          calloutAt: [45, 50],
          reveals: [
            { kind: 'polygon', points: [[px0, py0], [px1, py0], [px1, py1], [px0, py1]], lineType: 'A' },
            ...rivetXs.map(x => ({ kind: 'circle', center: [x, rivetY], r: 3, lineType: 'A' })),
            { kind: 'label', at: [40, 48], text: '⌀6', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: "PITCH 30" — the centre-to-centre spacing between adjacent rivets along the row. Too large a pitch risks the joint opening or leaking between rivets; too small weakens the plate with too many closely-spaced holes.',
          calloutAt: [60, 63],
          reveals: [{ kind: 'dimension', p1: [45, rivetY], p2: [75, rivetY], offset: -15, text: 'PITCH 30' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: "EDGE DISTANCE 25" — the distance from the nearest rivet\'s centre to the plate\'s edge. Too small an edge distance risks the plate tearing outward through that short remaining edge under load.',
          calloutAt: [32, 90],
          reveals: [{ kind: 'dimension', p1: [px0, rivetY], p2: [45, rivetY], offset: 15, text: '25' }],
        },
        {
          id: 4,
          instruction: 'Balloon 4 (capstone): pitch, edge distance and diameter are always chosen together by a design calculation based on plate thickness and load — never picked arbitrarily, and never copied blindly between two different jobs.',
          calloutAt: [95, 115],
          reveals: [],
        },
      ],
    };
  })();

  // ── 5. Fillet-Welded Bracket — Sectional Assembly ──
  (function () {
    const baseX0 = 20, baseX1 = 170, baseY0 = 90, baseY1 = 104;
    const uprightX0 = 85, uprightX1 = 105, uprightY0 = 30, uprightY1 = 90;
    CONSTRUCTIONS['fillet-welded-bracket-sectional'] = {
      id: 'fillet-welded-bracket-sectional', title: 'Fillet-Welded Bracket — Sectional Assembly',
      summary: 'A welded joint fuses two parts into one continuous piece of metal — structurally different from a riveted or bolted joint, which mechanically clamps two still-separate parts.',
      bounds: { w: 195, h: 130 },
      workbookPrompt: 'Draw the sectional front view of a T-bracket: a vertical plate welded to a horizontal base plate with a fillet weld on both sides of the joint. Hatch the two plates at different angles.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: the horizontal BASE PLATE, hatched — the cutting plane passes straight through its solid material.',
          calloutAt: [40, 97],
          reveals: [
            { kind: 'polygon', points: [[baseX0, baseY0], [baseX1, baseY0], [baseX1, baseY1], [baseX0, baseY1]], lineType: 'A' },
            ...hatchRect(baseX0, baseY0, baseX1 - baseX0, baseY1 - baseY0, 5),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the vertical UPRIGHT PLATE, hatched at a DIFFERENT angle to the base — the same "different hatching = different part" convention from reading a section view, now used the other way round: to DRAW one.',
          calloutAt: [95, 50],
          reveals: [
            { kind: 'polygon', points: [[uprightX0, uprightY0], [uprightX1, uprightY0], [uprightX1, uprightY1], [uprightX0, uprightY1]], lineType: 'A' },
            ...hatchRectMirror(uprightX0, uprightY0, uprightX1 - uprightX0, uprightY1 - uprightY0, 5),
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the FILLET WELD bead fills the internal corner of the T-joint. On a real production drawing this triangular area is conventionally shown fully solid (filled black); it is left outlined here so the construction stays clear step-by-step.',
          calloutAt: [78, 88],
          reveals: [
            { kind: 'polygon', points: [[85, 90], [85, 76], [71, 90]], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: a T-joint is almost always welded on BOTH sides for full strength — recall from reading a welding symbol that the symbol itself would specify this explicitly (a symbol both above AND below the reference line, or an "all around" circle).',
          calloutAt: [112, 88],
          reveals: [
            { kind: 'polygon', points: [[105, 90], [105, 76], [119, 90]], lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5 (capstone): a welded joint fuses the two parts into one continuous piece of metal — structurally different from a riveted or bolted joint, which mechanically clamps two still-separate parts together.',
          calloutAt: [95, 115],
          reveals: [],
        },
      ],
    };
  })();

  // ── 6. Butt-Welded Plate Joint — Sectional View ──
  (function () {
    const x0 = 20, x1 = 170, y0 = 70, y1 = 90, joint = 95;
    CONSTRUCTIONS['butt-welded-plate-joint-sectional'] = {
      id: 'butt-welded-plate-joint-sectional', title: 'Butt-Welded Plate Joint — Sectional View',
      summary: 'A full-penetration butt weld fuses two plates for their entire thickness — the reinforcement bead on top and the root bead underneath are the visible proof of that.',
      bounds: { w: 195, h: 130 },
      workbookPrompt: 'Draw the sectional view of two plates butt-welded edge-to-edge, showing the top reinforcement bead and the underside root bead, hatched as a single continuous member.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: the thin vertical line marks where the two original plate edges met, BEFORE welding. After a full-penetration weld, the two plates are hatched CONTINUOUSLY as one — they now act structurally as a single member, unlike a bolted or riveted joint\'s two separate parts.',
          calloutAt: [joint, 60],
          reveals: [
            { kind: 'polygon', points: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], lineType: 'A' },
            ...hatchRect(x0, y0, x1 - x0, y1 - y0, 5),
            { kind: 'line', p1: [joint, y0], p2: [joint, y1], lineType: 'centre' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the slightly proud bead on the top face is the WELD REINFORCEMENT — extra filler metal left standing above the surface, normal for a butt weld and sometimes ground flush afterward if a smooth finish is required.',
          calloutAt: [95, 55],
          reveals: [
            { kind: 'polygon', points: [[85, y0], [95, 62], [105, y0]], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the small bead on the UNDERSIDE is the ROOT bead — weld metal that penetrated all the way through and out the back face, direct proof this is a FULL-PENETRATION weld, fused through the plate\'s entire thickness, not just partway.',
          calloutAt: [95, 100],
          reveals: [
            { kind: 'polygon', points: [[88, y1], [95, 96], [102, y1]], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4 (capstone): compared to the fillet weld in the previous sheet, a butt weld restores close to the FULL original strength of the plate; a fillet weld is faster and cheaper, but relies only on its own throat thickness for strength, not the parent plate\'s full cross-section.',
          calloutAt: [95, 115],
          reveals: [],
        },
      ],
    };
  })();

  // ── 7. Spot-Welded Lap Joint (Sheet Metal) ──
  (function () {
    const s1x0 = 20, s1x1 = 100, s2x0 = 80, s2x1 = 170, sy0 = 50, sy1 = 56;
    const spotXs = [88, 98, 108];
    CONSTRUCTIONS['spot-welded-lap-joint'] = {
      id: 'spot-welded-lap-joint', title: 'Spot-Welded Lap Joint (Sheet Metal)',
      summary: 'For thin sheet metal, a row of localized spot welds — each a small fused nugget between two electrode tips — replaces a continuous seam weld entirely.',
      bounds: { w: 195, h: 150 },
      workbookPrompt: 'Draw a lap joint between two thin sheets with a row of 3 spot welds, plus a small sectional inset showing the characteristic surface dimple at each weld.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: two THIN sheets overlap directly — the same lap principle as the riveted lap joint, but for sheet metal far too thin to rivet practically.',
          calloutAt: [50, 40],
          reveals: [
            { kind: 'polygon', points: [[s1x0, sy0], [s1x1, sy0], [s1x1, sy1], [s1x0, sy1]], lineType: 'A' },
            { kind: 'line', p1: [s2x0, sy0], p2: [s2x1, sy0], lineType: 'hidden' }, { kind: 'line', p1: [s2x0, sy1], p2: [s2x1, sy1], lineType: 'hidden' },
            { kind: 'line', p1: [s2x1, sy0], p2: [s2x1, sy1], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: each small circular mark is a SPOT WELD — the sheets are clamped between two electrode tips and a heavy electrical current is passed through, melting a small localized nugget of fused metal at that exact point only.',
          calloutAt: [98, 40],
          reveals: spotXs.map(x => ({ kind: 'circle', center: [x, 53], r: 2.4, lineType: 'A' })),
        },
        {
          id: 3,
          instruction: 'Balloon 3: a sectional inset through one spot weld shows its most characteristic sign — a slight dimple pressed into BOTH outer surfaces by the electrode tips, quite different from the raised bead of a continuous seam weld.',
          calloutAt: [50, 100],
          reveals: [
            { kind: 'polyline', points: [[30, 90], [45, 90], [48, 94], [52, 94], [55, 90], [70, 90]], lineType: 'A' },
            { kind: 'polyline', points: [[30, 100], [45, 100], [48, 96], [52, 96], [55, 100], [70, 100]], lineType: 'A' },
            { kind: 'label', at: [30, 112], text: 'SECTION THROUGH ONE SPOT WELD', size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4 (capstone): spot welding is standard for high-volume thin-sheet fabrication — vehicle bodies, appliance casings — since it is fast, needs no filler rod at all, and a robot can place hundreds of consistent welds automatically.',
          calloutAt: [95, 130],
          reveals: [],
        },
      ],
    };
  })();

  // ── 8. Temporary vs Permanent Fasteners — Capstone ──
  (function () {
    const wallX0 = 20, wallX1 = 170, wallY0 = 70, wallY1 = 90, weldJoint = 60;
    const panelX0 = 110, panelX1 = 155, panelY0 = 55, panelY1 = 70;
    CONSTRUCTIONS['temporary-vs-permanent-fasteners'] = {
      id: 'temporary-vs-permanent-fasteners', title: 'Temporary vs Permanent Fasteners — Capstone',
      summary: 'A single tank wall shows both worlds at once: welded where the joint must never open, bolted where it absolutely must.',
      bounds: { w: 195, h: 140 },
      workbookPrompt: 'Given a tank wall with a welded main seam and a bolted access panel, label which fastening method is permanent and which is temporary, and justify the choice for each.',
      steps: [
        {
          id: 1,
          instruction: 'A tank wall combining both fastening families. Balloon 1: the main wall seam is WELDED — chosen because the tank must be fully leak-tight, and this joint is never meant to be opened again in the structure\'s lifetime.',
          calloutAt: [weldJoint, 55],
          reveals: [
            { kind: 'polygon', points: [[wallX0, wallY0], [wallX1, wallY0], [wallX1, wallY1], [wallX0, wallY1]], lineType: 'A' },
            ...hatchRect(wallX0, wallY0, wallX1 - wallX0, wallY1 - wallY0, 5),
            { kind: 'line', p1: [weldJoint, wallY0], p2: [weldJoint, wallY1], lineType: 'centre' },
            { kind: 'polygon', points: [[weldJoint - 5, wallY0], [weldJoint, 63], [weldJoint + 5, wallY0]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the access panel is BOLTED on through a flange — chosen specifically BECAUSE this panel needs to be removed periodically, for cleaning or internal inspection. A welded panel here would defeat its own purpose.',
          calloutAt: [132, 45],
          reveals: [
            { kind: 'polygon', points: [[panelX0, panelY0], [panelX1, panelY0], [panelX1, panelY1], [panelX0, panelY1]], lineType: 'A' },
            { kind: 'line', p1: [118, panelY1], p2: [118, wallY1 - 4], lineType: 'A' }, { kind: 'circle', center: [118, panelY1 + 3], r: 2, lineType: 'A' },
            { kind: 'line', p1: [147, panelY1], p2: [147, wallY1 - 4], lineType: 'A' }, { kind: 'circle', center: [147, panelY1 + 3], r: 2, lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3 (capstone): the golden design rule — if a joint must be dismantled again, use a TEMPORARY fastener (bolt, screw). If it never needs to come apart, a PERMANENT fastener (rivet, weld) is normally lighter, cheaper and stronger for the same size and job.',
          calloutAt: [95, 115],
          reveals: [],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'What fundamentally distinguishes a rivet from a bolt as a fastener?',
      options: [
        'A rivet is PERMANENT — its shop head must be drilled out to remove it; a bolt is TEMPORARY — simply unscrew the nut',
        'A rivet is always larger in diameter than a bolt',
        'There is no real difference; the terms are interchangeable',
        'Bolts can only join sheet metal, rivets can only join structural steel'],
      answer: 0,
      explanation: 'Once a rivet\'s shop head is formed, the only way to remove it is to drill it out, destroying the rivet — a fundamentally permanent joint compared to a bolt\'s reusable, unscrew-able nut.',
    },
    {
      text: 'In a riveted LAP joint, why does the joint introduce extra bending stress compared to a butt joint?',
      options: [
        'The two plates\' centrelines are offset by the overlap, so the load path is no longer straight',
        'Lap joints always use fewer rivets, making them structurally weaker',
        'Lap joints cannot be hatched correctly in section',
        'There is no difference in stress between lap and butt joints'],
      answer: 0,
      explanation: 'Because the plates overlap rather than meeting in line, the load has to "kink" through the offset, introducing prying/bending stress a straight double-strap butt joint avoids.',
    },
    {
      text: 'What does the rivet PITCH dimension control?',
      options: [
        'The centre-to-centre spacing between adjacent rivets along a row',
        'The rivet\'s shank diameter',
        'The distance from the row to the plate edge',
        'The thickness of the plate being joined'],
      answer: 0,
      explanation: 'Pitch is the spacing between neighbouring rivet centres — too large risks gaps opening between rivets; too small over-perforates and weakens the plate.',
    },
    {
      text: 'Why must EDGE DISTANCE not be too small on a riveted joint?',
      options: [
        'The plate could tear outward through the short remaining edge under load',
        'It has no effect on strength, only on appearance',
        'A small edge distance always causes the rivet to fall out immediately',
        'Edge distance only matters for welded joints, not riveted ones'],
      answer: 0,
      explanation: 'If the rivet sits too close to the plate\'s edge, there isn\'t enough material left to resist the load, and the plate can tear outward through that short edge.',
    },
    {
      text: 'On a sectioned welded T-bracket, why is the fillet weld bead conventionally shown as a solid filled triangle on a real production drawing?',
      options: [
        'To clearly distinguish actual deposited weld metal from the surrounding hatched parent material',
        'It is purely a stylistic choice with no technical meaning',
        'Because welds are never allowed to be shown in section',
        'To indicate the weld failed inspection'],
      answer: 0,
      explanation: 'A solid-filled triangle marks exactly where new weld filler metal was deposited, visually distinct from the surrounding parent plate\'s ordinary section hatching.',
    },
    {
      text: 'What does a visible ROOT BEAD on the underside of a butt-welded joint prove?',
      options: [
        'The weld achieved FULL PENETRATION — fusion all the way through the plate\'s thickness, not just partway',
        'The weld failed and needs to be redone',
        'The plates were never actually welded, only clamped',
        'The joint is a fillet weld, not a butt weld'],
      answer: 0,
      explanation: 'A root bead is weld metal that pushed all the way through to the back face — visible proof the weld penetrated the full plate thickness, not just the top portion.',
    },
    {
      text: 'What is the most characteristic visual sign of a SPOT-welded joint (as opposed to a continuous seam weld)?',
      options: [
        'A slight dimple pressed into both outer surfaces where the electrode tips clamped the sheets',
        'A continuous raised bead running the full length of the joint',
        'A row of visible rivet heads',
        'A dashed hidden-detail line along the joint'],
      answer: 0,
      explanation: 'Each spot weld is made by clamping electrode tips onto the sheets at one point only, leaving a small characteristic dimple — quite different from a continuous seam weld\'s unbroken bead.',
    },
    {
      text: 'A tank has a welded main seam and a bolted inspection hatch. What is the design reasoning behind using two different fastening methods on the same structure?',
      options: [
        'Weld where the joint must never be opened (leak-tightness); bolt where the joint MUST be opened again (routine access)',
        'It is a construction mistake — the whole tank should use one method throughout',
        'Welding is only used underwater and bolting only above water',
        'The choice is purely about which is cheaper, with no functional reasoning at all'],
      answer: 0,
      explanation: 'The main seam needs permanent, leak-tight fusion, so it\'s welded. The inspection hatch needs to come off repeatedly for maintenance, so it\'s bolted — each fastener type matched to its actual functional requirement.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'rivet-representation', 'riveted-lap-joint', 'riveted-double-strap-butt-joint', 'rivet-pitch-edge-distance',
    'fillet-welded-bracket-sectional', 'butt-welded-plate-joint-sectional', 'spot-welded-lap-joint', 'temporary-vs-permanent-fasteners',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
