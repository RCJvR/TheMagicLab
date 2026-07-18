// Civil Drawing II — Chapter data. Requires engine-geometry.js loaded first
// (window.ConstructionGeometry). Grade 12 tier escalation of civil-drawing.data.js (Ch7) —
// deeper construction-detail sections: staircases, foundations, retaining walls, multi-storey
// sections, drainage/sanitation, safety detailing and a combined working-drawing-set capstone.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

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
  function groundHatch(x0, x1, y) {
    const lines = [];
    for (let x = x0; x <= x1; x += 8) lines.push({ kind: 'line', p1: [x, y], p2: [x - 5, y + 7], lineType: 'B' });
    return lines;
  }

  // ── 1. Staircase — Rise, Going & Headroom ──
  (function () {
    const RISE = 30, GOING = 50, x0 = 20, y0 = 150;
    const pts = [[x0, y0]];
    for (let i = 0; i < 4; i++) {
      const last = pts[pts.length - 1];
      pts.push([last[0], last[1] - RISE]);
      pts.push([last[0] + GOING, last[1] - RISE]);
    }
    const nosing1 = pts[1], nosing4 = pts[7];
    const soffitY = 10;
    CONSTRUCTIONS['staircase-rise-going-section'] = {
      id: 'staircase-rise-going-section', title: 'Staircase — Rise, Going & Headroom',
      summary: 'A staircase section is governed by three safety-critical numbers: the rise (step height), the going (step depth), and the headroom clearance above the pitch line.',
      bounds: { w: 260, h: 175 },
      workbookPrompt: 'Draw a 4-step staircase section (175 mm rise, 280 mm going, drawn at reduced scale), the pitch line through the nosings, and dimension the headroom clearance above it.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the stepped profile: alternating riser (vertical) and going (horizontal) lines, from the lower floor level up to the upper landing.',
          calloutAt: [pts[4][0], pts[4][1] - 15],
          reveals: [
            { kind: 'line', p1: [0, y0], p2: pts[0], lineType: 'A' },
            ...pts.slice(0, -1).map((p, i) => ({ kind: 'line', p1: p, p2: pts[i + 1], lineType: 'A' })),
            { kind: 'line', p1: pts[pts.length - 1], p2: [pts[pts.length - 1][0] + 30, pts[pts.length - 1][1]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the RISE — the vertical height of one step. Building regulations set a maximum rise for safety and comfort.',
          calloutAt: [x0 - 12, y0 - RISE / 2],
          reveals: [{ kind: 'dimension', p1: [x0, y0], p2: [x0, y0 - RISE], offset: -14, text: '175' }],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the GOING — the horizontal depth of one step, measured nosing to nosing. Rise and going together must satisfy a standard comfort formula (e.g. 2 x rise + going ≈ 600 mm).',
          calloutAt: [nosing1[0] + GOING / 2, nosing1[1] + 12],
          reveals: [{ kind: 'dimension', p1: nosing1, p2: [nosing1[0] + GOING, nosing1[1]], offset: 14, text: '280' }],
        },
        {
          id: 4,
          instruction: 'Balloon 3: the PITCH LINE — an imaginary line drawn through every step\'s nosing (front top corner). This is the reference line headroom is always measured from.',
          calloutAt: G.midpoint(nosing1, nosing4),
          reveals: [{ kind: 'line', p1: nosing1, p2: nosing4, lineType: 'centre' }],
        },
        {
          id: 5,
          instruction: 'Balloon 4: HEADROOM — the clear vertical distance from the pitch line up to the underside of any structure above (a landing, a floor, a sloping ceiling). A minimum of 2000 mm is a typical regulatory requirement.',
          calloutAt: [nosing4[0] - 25, (nosing4[1] + soffitY) / 2],
          reveals: [
            { kind: 'line', p1: [0, soffitY], p2: [230, soffitY], lineType: 'A' },
            { kind: 'dimension', p1: [nosing4[0], nosing4[1]], p2: [nosing4[0], soffitY], offset: 20, text: 'min. 2000' },
          ],
        },
      ],
    };
  })();

  // ── 2. Strip Foundation Detail ──
  (function () {
    const NGL_Y = 90, footW = 46, footH = 14, footX0 = 77;
    const wallW = 20, wallX0 = 90;
    const founding_Y = NGL_Y + footH + 20;
    CONSTRUCTIONS['strip-foundation-detail'] = {
      id: 'strip-foundation-detail', title: 'Strip Foundation Detail',
      summary: 'A strip footing spreads a wall\'s load over a wider base of concrete, founded deep enough to reach undisturbed, stable ground below the reach of seasonal ground movement.',
      bounds: { w: 190, h: 170 },
      workbookPrompt: 'Draw a strip foundation section: the concrete footing, the wall above it, DPC, NGL, and the founding-depth dimension from NGL to the footing\'s underside.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the NATURAL GROUND LEVEL line either side of the excavation.',
          calloutAt: [30, NGL_Y - 6],
          reveals: [
            { kind: 'line', p1: [10, NGL_Y], p2: [70, NGL_Y], lineType: 'B' }, ...groundHatch(10, 66, NGL_Y),
            { kind: 'line', p1: [130, NGL_Y], p2: [180, NGL_Y], lineType: 'B' }, ...groundHatch(134, 176, NGL_Y),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the concrete STRIP FOOTING — wider than the wall it carries, so the load spreads over more soil area and doesn\'t punch straight through.',
          calloutAt: [footX0 + footW / 2, founding_Y - footH / 2],
          reveals: [
            { kind: 'polygon', points: [[footX0, founding_Y - footH], [footX0 + footW, founding_Y - footH], [footX0 + footW, founding_Y], [footX0, founding_Y]], lineType: 'A' },
            ...hatchRect(footX0, founding_Y - footH, footW, footH, 5),
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the WALL rises from the footing up past ground level — narrower than the footing below it, and hatched consistently since it\'s a different part from the footing (the same "different hatching = different part" convention).',
          calloutAt: [wallX0 + wallW / 2, 55],
          reveals: [
            { kind: 'polygon', points: [[wallX0, 30], [wallX0 + wallW, 30], [wallX0 + wallW, founding_Y - footH], [wallX0, founding_Y - footH]], lineType: 'A' },
            ...hatchRect(wallX0, 30, wallW, founding_Y - footH - 30, 6),
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 3: the DPC line, set just above NGL — the same damp-proof course from every wall section in this course, doing exactly the same job here.',
          calloutAt: [wallX0 - 12, NGL_Y - 5],
          reveals: [{ kind: 'line', p1: [wallX0, NGL_Y - 5], p2: [wallX0 + wallW, NGL_Y - 5], lineType: 'A' }],
        },
        {
          id: 5,
          instruction: 'Balloon 4: the FOUNDING DEPTH — measured from NGL down to the footing\'s underside. This must reach below the depth where seasonal moisture changes cause the soil itself to swell and shrink, or the whole foundation risks movement and cracking.',
          calloutAt: [95, (NGL_Y + founding_Y) / 2],
          reveals: [{ kind: 'dimension', p1: [footX0 + footW + 5, NGL_Y], p2: [footX0 + footW + 5, founding_Y], offset: 0, text: 'min. 500' }],
        },
      ],
    };
  })();

  // ── 3. Retaining Wall Section ──
  (function () {
    const baseY = 140, wallTopY = 60, toeW = 14, wallW = 18, backfillTopY = 65;
    const x0 = 60;
    CONSTRUCTIONS['retaining-wall-section'] = {
      id: 'retaining-wall-section', title: 'Retaining Wall Section',
      summary: 'A retaining wall holds back higher ground on one side — its wider base resists overturning, and weep holes relieve water pressure that would otherwise build up behind it.',
      bounds: { w: 195, h: 175 },
      workbookPrompt: 'Draw a gravity retaining wall section: wider at the base than the top, with weep holes near its base and differing ground levels on each side.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the wall\'s tapered profile — wider at the base for stability, narrowing toward the top.',
          calloutAt: [x0 + toeW / 2, (baseY + wallTopY) / 2],
          reveals: [
            { kind: 'polygon', points: [[x0, baseY], [x0 + toeW + wallW, baseY], [x0 + toeW + wallW, wallTopY], [x0 + toeW, wallTopY]], lineType: 'A' },
            ...hatchRect(x0, wallTopY, toeW + wallW, baseY - wallTopY, 6),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the ground is HIGHER behind the wall (the retained side) and LOWER in front — this level difference is exactly what the wall is holding back.',
          calloutAt: [x0 + toeW + wallW + 20, backfillTopY - 8],
          reveals: [
            { kind: 'line', p1: [x0 - 30, baseY - 5], p2: [x0, baseY - 5], lineType: 'B' }, ...groundHatch(x0 - 30, x0 - 4, baseY - 5),
            { kind: 'line', p1: [x0 + toeW + wallW, backfillTopY], p2: [x0 + toeW + wallW + 40, backfillTopY], lineType: 'B' }, ...groundHatch(x0 + toeW + wallW, x0 + toeW + wallW + 36, backfillTopY),
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 2: WEEP HOLES — small drainage holes through the wall near its base, letting water that collects behind the wall drain out instead of building up hydrostatic pressure that could push the wall over.',
          calloutAt: [x0 + toeW + wallW / 2, baseY - 15],
          reveals: [
            { kind: 'circle', center: [x0 + toeW + 6, baseY - 15], r: 2, lineType: 'A' },
            { kind: 'circle', center: [x0 + toeW + wallW - 6, baseY - 15], r: 2, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 3 (capstone): the wide BASE is the key to a retaining wall\'s stability — it resists the overturning moment created by the retained soil\'s pressure, exactly like a wide-based lever arm resisting a tipping force.',
          calloutAt: [x0 + (toeW + wallW) / 2, baseY + 10],
          reveals: [],
        },
      ],
    };
  })();

  // ── 4. Two-Storey Building Section ──
  (function () {
    const NGL = 175, FFL1 = NGL - 8, wallTop1 = FFL1 - 55, FFL2 = wallTop1 - 4, wallTop2 = FFL2 - 50, wallPlate = wallTop2 - 3;
    const x0 = 40, x1 = 150;
    CONSTRUCTIONS['two-storey-section'] = {
      id: 'two-storey-section', title: 'Two-Storey Building Section',
      summary: 'A multi-storey section stacks the same levels used on a single-storey building — but now with an extra floor level and an extra wall height between NGL and the roof.',
      bounds: { w: 190, h: 210 },
      workbookPrompt: 'Draw a two-storey wall section: NGL, DPC, ground-floor FFL, the first floor slab, first-floor FFL, and the wall plate — with the ground- and first-floor wall heights each dimensioned separately.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the NGL and DPC lines, exactly as in a single-storey section.',
          calloutAt: [25, NGL - 4],
          reveals: [
            { kind: 'line', p1: [10, NGL], p2: [180, NGL], lineType: 'B' }, ...groundHatch(10, 176, NGL),
            { kind: 'line', p1: [x0, NGL - 6], p2: [x1, NGL - 6], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: GROUND-FLOOR FFL, and the ground-floor wall rising from it to the underside of the first floor.',
          calloutAt: [x0 - 12, (FFL1 + wallTop1) / 2],
          reveals: [
            { kind: 'line', p1: [x0, FFL1], p2: [x1, FFL1], lineType: 'A' },
            { kind: 'line', p1: [x0, FFL1], p2: [x0, wallTop1], lineType: 'A' }, { kind: 'line', p1: [x1, FFL1], p2: [x1, wallTop1], lineType: 'A' },
            { kind: 'dimension', p1: [x1 + 8, FFL1], p2: [x1 + 8, wallTop1], offset: 0, text: '2550' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the FIRST FLOOR slab sits on top of the ground-floor wall — its own top surface becomes the FIRST-FLOOR FFL, the reference level for the whole upper storey.',
          calloutAt: [x0 - 12, (wallTop1 + FFL2) / 2],
          reveals: [
            { kind: 'line', p1: [x0, wallTop1], p2: [x1, wallTop1], lineType: 'A' }, { kind: 'line', p1: [x0, FFL2], p2: [x1, FFL2], lineType: 'A' },
            { kind: 'line', p1: [x0, wallTop1], p2: [x0, FFL2], lineType: 'A' }, { kind: 'line', p1: [x1, wallTop1], p2: [x1, FFL2], lineType: 'A' },
            ...hatchRect(x0, wallTop1, x1 - x0, FFL2 - wallTop1, 6),
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 3: the FIRST-FLOOR wall rises from its own FFL up to the wall plate, exactly like the ground floor did — every additional storey simply repeats the same wall-and-floor stack.',
          calloutAt: [x0 - 12, (FFL2 + wallPlate) / 2],
          reveals: [
            { kind: 'line', p1: [x0, FFL2], p2: [x0, wallPlate], lineType: 'A' }, { kind: 'line', p1: [x1, FFL2], p2: [x1, wallPlate], lineType: 'A' },
            { kind: 'line', p1: [x0, wallPlate], p2: [x1, wallPlate], lineType: 'A' },
            { kind: 'dimension', p1: [x1 + 8, FFL2], p2: [x1 + 8, wallPlate], offset: 0, text: '2400' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 4 (capstone): every level on this two-storey building is STILL measured from the one shared NGL datum — a first-floor level is simply a larger cumulative height above that same 0.000 reference.',
          calloutAt: [(x0 + x1) / 2, wallPlate - 10],
          reveals: [],
        },
      ],
    };
  })();

  // ── 5. Septic Tank & Soakaway ──
  (function () {
    const tankX0 = 40, tankX1 = 120, tankTop = 60, tankBot = 130, baffleX = 80;
    const inletY = 72, outletY = 82;
    const soakX0 = 150, soakX1 = 190;
    CONSTRUCTIONS['septic-tank-soakaway'] = {
      id: 'septic-tank-soakaway', title: 'Septic Tank & Soakaway',
      summary: 'Wastewater settles in a two-chamber septic tank before the clarified liquid drains away into a soakaway — a gravel-filled trench that lets it disperse safely back into the ground.',
      bounds: { w: 205, h: 155 },
      workbookPrompt: 'Draw a two-chamber septic tank in section with a baffle wall, inlet and outlet pipes (outlet lower than inlet), and a soakaway trench with a perforated pipe.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the underground tank chamber, split into two compartments by a BAFFLE WALL — solid waste settles in the first chamber, and only the clarified liquid above passes under or over the baffle into the second.',
          calloutAt: [baffleX, (tankTop + tankBot) / 2],
          reveals: [
            { kind: 'polygon', points: [[tankX0, tankTop], [tankX1, tankTop], [tankX1, tankBot], [tankX0, tankBot]], lineType: 'A' },
            { kind: 'line', p1: [baffleX, tankTop + 8], p2: [baffleX, tankBot], lineType: 'A' },
            ...hatchRect(tankX0, tankTop, tankX1 - tankX0, tankBot - tankTop, 7),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the INLET pipe brings raw wastewater in from the house, entering the first chamber.',
          calloutAt: [tankX0 - 15, inletY],
          reveals: [{ kind: 'line', p1: [tankX0 - 20, inletY], p2: [tankX0, inletY], lineType: 'A' }],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the OUTLET pipe leaves the second chamber slightly LOWER than the inlet — this small drop keeps flow moving in the right direction and stops solids from washing straight through.',
          calloutAt: [tankX1 + 15, outletY],
          reveals: [{ kind: 'line', p1: [tankX1, outletY], p2: [tankX1 + 30, outletY], lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Balloon 3: the SOAKAWAY — a gravel-filled trench with a perforated pipe running through it. The clarified liquid leaving the tank disperses out through the pipe\'s perforations and filters safely back into the surrounding soil.',
          calloutAt: [(soakX0 + soakX1) / 2, 100],
          reveals: [
            { kind: 'polygon', points: [[soakX0, 90], [soakX1, 90], [soakX1, 120], [soakX0, 120]], lineType: 'A' },
            { kind: 'circle', center: [(soakX0 + soakX1) / 2, 105], r: 6, lineType: 'A' },
            { kind: 'line', p1: [tankX1 + 30, outletY], p2: [(soakX0 + soakX1) / 2 - 6, 105], lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 6. Balustrade & Handrail Safety Detail ──
  (function () {
    const floorY = 130, railY = 40, postX0 = 40, spacing = 22, postCount = 5;
    CONSTRUCTIONS['balustrade-handrail-detail'] = {
      id: 'balustrade-handrail-detail', title: 'Balustrade & Handrail Safety Detail',
      summary: 'A balustrade is dimensioned for one purpose above all others: safety — a maximum baluster gap that a small child can\'t pass through, and a handrail height at a safe, graspable level.',
      bounds: { w: 195, h: 165 },
      workbookPrompt: 'Draw a balustrade detail: a row of vertical balusters with their maximum permitted gap dimensioned, and a handrail with its height above floor level dimensioned.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the floor line and a row of evenly-spaced vertical balusters rising from it.',
          calloutAt: [postX0 + spacing * postCount / 2, (floorY + railY) / 2],
          reveals: [
            { kind: 'line', p1: [20, floorY], p2: [170, floorY], lineType: 'A' },
            ...Array.from({ length: postCount }, (_, i) => ({ kind: 'line', p1: [postX0 + i * spacing, floorY], p2: [postX0 + i * spacing, railY], lineType: 'A' })),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the HANDRAIL, running along the top of every baluster.',
          calloutAt: [postX0 + spacing * (postCount - 1) / 2, railY - 6],
          reveals: [{ kind: 'line', p1: [postX0 - 6, railY], p2: [postX0 + spacing * (postCount - 1) + 6, railY], lineType: 'A' }],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the GAP between adjacent balusters must be dimensioned to a strict MAXIMUM (commonly 100 mm) — small enough that a young child can never fit through or get their head stuck.',
          calloutAt: [postX0 + spacing / 2, (floorY + railY) / 2 + 10],
          reveals: [{ kind: 'dimension', p1: [postX0, (floorY + railY) / 2], p2: [postX0 + spacing, (floorY + railY) / 2], offset: 10, text: 'max. 100' }],
        },
        {
          id: 4,
          instruction: 'Balloon 3: the HANDRAIL HEIGHT is dimensioned from the floor (or from the pitch line, on a staircase) up to the top of the rail — set at a safe, comfortable, graspable height, commonly a minimum of 900 mm.',
          calloutAt: [15, (floorY + railY) / 2],
          reveals: [{ kind: 'dimension', p1: [20, floorY], p2: [20, railY], offset: -14, text: 'min. 900' }],
        },
      ],
    };
  })();

  // ── 7. Below-Ground Tanking (Waterproofing) ──
  (function () {
    const wallX0 = 70, wallX1 = 100, groundY = 90, wallBot = 150, wallTop = 40;
    CONSTRUCTIONS['below-ground-tanking'] = {
      id: 'below-ground-tanking', title: 'Below-Ground Tanking (Waterproofing)',
      summary: 'DPC alone stops rising damp — but a wall with ground pushing against it below grade needs a completely different defence against real hydrostatic water pressure: tanking.',
      bounds: { w: 175, h: 180 },
      workbookPrompt: 'Draw a below-ground wall section with an external waterproof membrane (tanking), a protective board over it, and the backfill against the finished face.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the wall, spanning from well below ground up past ground level, and the ground line on the side being backfilled.',
          calloutAt: [(wallX0 + wallX1) / 2, (wallBot + wallTop) / 2],
          reveals: [
            { kind: 'polygon', points: [[wallX0, wallTop], [wallX1, wallTop], [wallX1, wallBot], [wallX0, wallBot]], lineType: 'A' },
            ...hatchRect(wallX0, wallTop, wallX1 - wallX0, wallBot - wallTop, 7),
            { kind: 'line', p1: [30, groundY], p2: [wallX0, groundY], lineType: 'B' }, ...groundHatch(30, wallX0 - 4, groundY),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the TANKING — a continuous waterproof membrane applied to the wall\'s external, below-ground face. Unlike DPC (a single thin line stopping capillary rise), tanking has to resist genuine hydrostatic PRESSURE from the retained groundwater.',
          calloutAt: [wallX0 - 6, (groundY + wallBot) / 2],
          reveals: [{ kind: 'line', p1: [wallX0 - 3, groundY], p2: [wallX0 - 3, wallBot], lineType: 'A' }],
        },
        {
          id: 3,
          instruction: 'Balloon 2: a PROTECTION BOARD is fixed over the membrane before backfilling — without it, sharp stones in the backfill could easily puncture the waterproof layer during construction.',
          calloutAt: [wallX0 - 10, (groundY + wallBot) / 2 + 20],
          reveals: [{ kind: 'line', p1: [wallX0 - 6, groundY + 5], p2: [wallX0 - 6, wallBot - 5], lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Balloon 3 (capstone): DPC and tanking solve two DIFFERENT problems — DPC stops slow capillary rise through masonry; tanking resists active water pressure pushing against a below-ground face. A basement wall often needs both, at different locations.',
          calloutAt: [(wallX0 + wallX1) / 2, wallTop - 15],
          reveals: [],
        },
      ],
    };
  })();

  // ── 8. Capstone — A Small Working Drawing Set ──
  (function () {
    const planX0 = 20, planY0 = 20, planW = 70, planD = 50;
    const elevX0 = 110, elevY0 = 20, elevW = 70, elevH = 45;
    const secX0 = 20, secY0 = 100, secW = 70, secH = 55;
    CONSTRUCTIONS['small-working-drawing-set'] = {
      id: 'small-working-drawing-set', title: 'Capstone — A Small Working Drawing Set',
      summary: 'A plan, an elevation and a section of the same small structure, cross-referenced together — exactly how a real set of construction drawings is actually issued.',
      bounds: { w: 200, h: 175 },
      workbookPrompt: 'Draw a plan, a front elevation, and a cross-section of a small brick storeroom, with a cutting-plane line on the plan matching the section shown.',
      steps: [
        {
          id: 1,
          instruction: 'The PLAN — a simple rectangular storeroom outline with a door opening, and a cutting-plane line marked "A-A" across it.',
          calloutAt: [planX0 + planW / 2, planY0 - 8],
          reveals: [
            { kind: 'polygon', points: [[planX0, planY0], [planX0 + planW, planY0], [planX0 + planW, planY0 + planD], [planX0, planY0 + planD]], lineType: 'A' },
            { kind: 'line', p1: [planX0 + 25, planY0 + planD], p2: [planX0 + 45, planY0 + planD], lineType: 'construction' },
            { kind: 'line', p1: [planX0, planY0 + planD / 2], p2: [planX0 + planW, planY0 + planD / 2], lineType: 'centre' },
            { kind: 'label', at: [planX0 - 8, planY0 + planD / 2 - 2], text: 'A', size: 3.6, anchor: 'start', color: '#94a3b8' },
            { kind: 'label', at: [planX0 + planW + 2, planY0 + planD / 2 - 2], text: 'A', size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'The FRONT ELEVATION — the same building seen from outside, showing the door and roof outline in true external appearance, no hatching.',
          calloutAt: [elevX0 + elevW / 2, elevY0 - 8],
          reveals: [
            { kind: 'polygon', points: [[elevX0, elevY0 + 10], [elevX0 + elevW, elevY0 + 10], [elevX0 + elevW, elevY0 + elevH], [elevX0, elevY0 + elevH]], lineType: 'A' },
            { kind: 'polygon', points: [[elevX0 - 4, elevY0 + 10], [elevX0 + elevW / 2, elevY0], [elevX0 + elevW + 4, elevY0 + 10]], lineType: 'A' },
            { kind: 'polygon', points: [[elevX0 + 25, elevY0 + 24], [elevX0 + 45, elevY0 + 24], [elevX0 + 45, elevY0 + elevH], [elevX0 + 25, elevY0 + elevH]], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'The SECTION "A-A" — cut exactly where the plan\'s cutting-plane line shows, revealing the internal wall thickness, floor and roof construction as hatched solid material.',
          calloutAt: [secX0 + secW / 2, secY0 - 8],
          reveals: [
            { kind: 'polygon', points: [[secX0, secY0 + 45], [secX0 + secW, secY0 + 45], [secX0 + secW, secY0 + 50], [secX0, secY0 + 50]], lineType: 'A' },
            ...hatchRect(secX0, secY0 + 45, secW, 5, 4),
            { kind: 'polygon', points: [[secX0, secY0], [secX0 + 6, secY0], [secX0 + 6, secY0 + 45], [secX0, secY0 + 45]], lineType: 'A' },
            ...hatchRect(secX0, secY0, 6, 45, 4),
            { kind: 'polygon', points: [[secX0 + secW - 6, secY0], [secX0 + secW, secY0], [secX0 + secW, secY0 + 45], [secX0 + secW - 6, secY0 + 45]], lineType: 'A' },
            ...hatchRect(secX0 + secW - 6, secY0, 6, 45, 4),
            { kind: 'line', p1: [secX0 - 4, secY0], p2: [secX0 + secW / 2, secY0 - 10], lineType: 'A' }, { kind: 'line', p1: [secX0 + secW + 4, secY0], p2: [secX0 + secW / 2, secY0 - 10], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon (capstone): the plan tells you the LAYOUT, the elevation tells you the external APPEARANCE, and the section tells you the internal CONSTRUCTION — no single view can carry all three, which is exactly why a real drawing set always issues them together.',
          calloutAt: [140, 120],
          reveals: [],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'What is the "pitch line" on a staircase section, and what is it used for?',
      options: [
        'An imaginary line through every step\'s nosing, used as the reference line for measuring headroom clearance',
        'The centre line of the handrail',
        'The line marking the maximum permitted rise',
        'A line used only on spiral staircases, never straight ones'],
      answer: 0,
      explanation: 'The pitch line runs through the nosing of every step. Headroom is always measured as the perpendicular clearance from this line up to any structure above.',
    },
    {
      text: 'Why is a strip footing made WIDER than the wall it supports?',
      options: [
        'To spread the wall\'s load over a larger area of soil, so it doesn\'t punch straight through',
        'Purely for appearance, with no structural purpose',
        'To save on concrete compared to a narrower footing',
        'Because building regulations require all footings to be exactly 3x the wall width'],
      answer: 0,
      explanation: 'A wider footing distributes the wall\'s point-load over more bearing area, reducing the pressure on the soil beneath to a level it can safely support.',
    },
    {
      text: 'What is the purpose of weep holes in a retaining wall?',
      options: [
        'To let water that collects behind the wall drain out, relieving hydrostatic pressure that could otherwise push the wall over',
        'To provide ventilation for the retained soil',
        'To reduce the wall\'s overall weight',
        'They are purely decorative and have no drainage function'],
      answer: 0,
      explanation: 'Without weep holes, water trapped behind a retaining wall builds up hydrostatic pressure — a major cause of retaining wall failure. Weep holes let that water escape.',
    },
    {
      text: 'On a two-storey building section, where is the FIRST-FLOOR FFL measured from?',
      options: [
        'The same shared NGL datum used for every other level on the drawing, just at a greater cumulative height',
        'A completely separate, independent datum specific to the first floor',
        'The underside of the roof',
        'It cannot be measured on a section, only on a plan'],
      answer: 0,
      explanation: 'Every level on a building, no matter how many storeys, is still measured as a height above the one shared NGL datum — a first-floor FFL is simply a larger number.',
    },
    {
      text: 'In a septic tank, why is the outlet pipe positioned LOWER than the inlet pipe?',
      options: [
        'The small drop keeps wastewater flowing in the correct direction and prevents solids from washing straight through',
        'It has no functional purpose, purely a construction convenience',
        'To make the tank easier to empty',
        'The inlet is always lower than the outlet, not the other way round'],
      answer: 0,
      explanation: 'A slight fall from inlet to outlet keeps flow moving one-way through the settling chambers, rather than solids washing straight across and out.',
    },
    {
      text: 'Why is the gap between balustrade posts dimensioned to a strict maximum (commonly 100 mm)?',
      options: [
        'So a small child cannot fit through the gap or get their head trapped',
        'To reduce the amount of material used in the balustrade',
        'It is purely an aesthetic design choice with no safety basis',
        'To match the width of the handrail exactly'],
      answer: 0,
      explanation: 'A maximum baluster gap (commonly around 100 mm) is a life-safety dimension, specifically sized so a young child cannot pass through or become trapped.',
    },
    {
      text: 'What is the key functional difference between a DPC and below-ground tanking?',
      options: [
        'DPC stops slow capillary rising damp through masonry; tanking resists active hydrostatic water pressure against a below-ground face',
        'They are two names for exactly the same waterproofing method',
        'Tanking is only used above ground, DPC only below ground',
        'DPC is always thicker and stronger than a tanking membrane'],
      answer: 0,
      explanation: 'DPC is a thin membrane defeating slow capillary action. Tanking is a continuous, pressure-resistant membrane needed wherever a wall faces real standing or moving groundwater pressure.',
    },
    {
      text: 'Why does a real construction drawing set always issue a plan, an elevation AND a section together, rather than just one view?',
      options: [
        'Each view carries different information — layout (plan), external appearance (elevation), and internal construction (section) — and no single view can show all three',
        'It is a legal requirement with no technical justification',
        'Sections are only ever used as a backup in case the plan is lost',
        'Elevations are optional and rarely included in a real drawing set'],
      answer: 0,
      explanation: 'A plan shows layout, an elevation shows external appearance, and a section shows internal construction detail — together they form the minimum complete description of a building.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'staircase-rise-going-section', 'strip-foundation-detail', 'retaining-wall-section', 'two-storey-section',
    'septic-tank-soakaway', 'balustrade-handrail-detail', 'below-ground-tanking', 'small-working-drawing-set',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
