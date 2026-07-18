// Perspective Drawing II — Two-Point Perspective. Chapter data. Requires engine-geometry.js
// loaded first (window.ConstructionGeometry). Grade 11-12 tier escalation of perspective-drawing
// .data.js (Ch8, one-point perspective) — this chapter adds a SECOND vanishing point, so both
// visible faces of an object recede, not just one.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // Same linear recede() used throughout perspective-drawing.data.js: point P moves toward
  // vanishing point VP by fraction t (0 = at P, 1 = at the VP itself).
  function recede(P, VP, t) { return [P[0] + t * (VP[0] - P[0]), P[1] + t * (VP[1] - P[1])]; }
  function lineIntersect(p1, p2, p3, p4) {
    const [x1, y1] = p1, [x2, y2] = p2, [x3, y3] = p3, [x4, y4] = p4;
    const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(d) < 1e-9) return G.midpoint(p1, p2);
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
  }

  const VPL = [10, 90], VPR = [190, 90], HORIZON_Y = 90;

  // ── 1. Setting Up Two-Point Perspective ──
  (function () {
    const cornerTop = [100, 55], cornerBot = [100, 130];
    CONSTRUCTIONS['two-point-setup'] = {
      id: 'two-point-setup', title: 'Setting Up Two-Point Perspective',
      summary: 'Instead of one-point perspective\'s single VP, two-point perspective uses TWO vanishing points on the horizon — one for each set of horizontal edges receding away from the viewer.',
      bounds: { w: 205, h: 150 },
      workbookPrompt: 'Set up a two-point perspective drawing: draw the horizon line, mark VPL and VPR at its ends, and draw a single vertical corner edge exactly where the object is nearest the viewer.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: the HORIZON — the line at the viewer\'s own eye level. Both vanishing points always sit on this same line.',
          calloutAt: [100, 84],
          reveals: [
            { kind: 'line', p1: [0, HORIZON_Y], p2: [200, HORIZON_Y], lineType: 'centre' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: VPL and VPR — TWO vanishing points, placed on the horizon on either side of the object. Every horizontal edge receding to the left converges toward VPL; every one receding to the right converges toward VPR.',
          calloutAt: [10, 84],
          reveals: [
            { kind: 'point', at: VPL, label: 'VPL' }, { kind: 'point', at: VPR, label: 'VPR' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the CORNER VERTICAL — drawn at the object\'s nearest point to the viewer. This is the only line in the whole drawing whose true height can be measured and drawn directly to scale.',
          calloutAt: [100, 92],
          reveals: [
            { kind: 'line', p1: cornerTop, p2: cornerBot, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4 (capstone): every other vertical elsewhere in the drawing is still vertical in direction — verticals never converge — but it sits at a different depth, so its TRUE height must be transferred from this corner using the technique in the next sheet.',
          calloutAt: [100, 140],
          reveals: [],
        },
      ],
    };
  })();

  // ── 2. The Basic Two-Point Box ──
  (function () {
    const cTop = [100, 55], cBot = [100, 130];
    const tL = 0.35, tR = 0.4;
    const lTop = recede(cTop, VPL, tL), lBot = recede(cBot, VPL, tL);
    const rTop = recede(cTop, VPR, tR), rBot = recede(cBot, VPR, tR);
    CONSTRUCTIONS['two-point-box'] = {
      id: 'two-point-box', title: 'The Basic Two-Point Box',
      summary: 'Both visible faces of the box recede — the left face toward VPL, the right face toward VPR — meeting at the true-height corner vertical.',
      bounds: { w: 205, h: 150 },
      workbookPrompt: 'Starting from a corner vertical, project both its top and bottom corners toward VPL and VPR, then close off both receding faces at a chosen depth on each side.',
      steps: [
        {
          id: 1,
          instruction: 'From both ends of the corner vertical, project four lines: top and bottom toward VPL, and top and bottom toward VPR.',
          calloutAt: [70, 65],
          reveals: [
            { kind: 'line', p1: cTop, p2: cBot, lineType: 'A' },
            { kind: 'line', p1: cTop, p2: VPL, lineType: 'construction' }, { kind: 'line', p1: cBot, p2: VPL, lineType: 'construction' },
            { kind: 'line', p1: cTop, p2: VPR, lineType: 'construction' }, { kind: 'line', p1: cBot, p2: VPR, lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: choose a depth for the LEFT face and draw its closing vertical between the two VPL projectors. Because both projectors share the same VP, this vertical is automatically the correctly foreshortened height at that depth — no extra measuring needed.',
          calloutAt: lTop,
          reveals: [{ kind: 'line', p1: lTop, p2: lBot, lineType: 'A' }],
        },
        {
          id: 3,
          instruction: 'Balloon 2: do the same for the RIGHT face, at its own chosen depth toward VPR.',
          calloutAt: rTop,
          reveals: [{ kind: 'line', p1: rTop, p2: rBot, lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Balloon 3: outline both faces solid — the corner vertical is shared by both, so the whole box reads as one solid object with two visible receding sides.',
          calloutAt: [100, 140],
          reveals: [
            { kind: 'line', p1: cTop, p2: lTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: lBot, lineType: 'A' },
            { kind: 'line', p1: cTop, p2: rTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: rBot, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 3. Transferring a True Height (Two-Point Method) ──
  (function () {
    const cTop = [100, 55], cBot = [100, 130];
    const t = 0.5;
    const P = recede(cBot, VPL, t);
    const newTrueTop = [100, 30];
    const R = recede(newTrueTop, VPL, t);
    CONSTRUCTIONS['two-point-height-transfer'] = {
      id: 'two-point-height-transfer', title: 'Transferring a True Height (Two-Point Method)',
      summary: 'Any NEW height that doesn\'t match the box (like a taller chimney) must be measured on the corner vertical first, then carried out to the correct depth along the same vanishing line.',
      bounds: { w: 205, h: 165 },
      workbookPrompt: 'Given a point halfway along a receding base edge, construct its true height for a feature taller than the existing box, using the corner vertical as a measuring line.',
      steps: [
        {
          id: 1,
          instruction: 'The corner vertical and its base edge receding to VPL. Balloon 1: point P sits partway along the base edge — this is where a NEW feature (e.g. a chimney) will stand, taller than the rest of the box.',
          calloutAt: P,
          reveals: [
            { kind: 'line', p1: cTop, p2: cBot, lineType: 'A' },
            { kind: 'line', p1: cBot, p2: VPL, lineType: 'construction' },
            { kind: 'point', at: P, label: 'P' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: since the corner vertical is the ONLY place true heights can be measured directly, mark the chimney\'s TRUE height there — well above the box\'s own top corner.',
          calloutAt: newTrueTop,
          reveals: [{ kind: 'point', at: newTrueTop, label: 'true height' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: draw a new line from that true-height mark toward the SAME vanishing point, VPL — this line now shows the correctly foreshortened version of that exact height, at every depth along it.',
          calloutAt: [70, 40],
          reveals: [{ kind: 'line', p1: newTrueTop, p2: VPL, lineType: 'construction' }],
        },
        {
          id: 4,
          instruction: 'Balloon 4: erect a vertical at P, up until it meets this new line — that crossing point is P\'s CORRECT foreshortened height. Draw the chimney as a solid vertical from P to this point.',
          calloutAt: R,
          reveals: [{ kind: 'line', p1: P, p2: R, lineType: 'A' }],
        },
        {
          id: 5,
          instruction: 'Balloon 5 (capstone): this is the fundamental technique behind every added feature in two-point perspective — nothing is ever guessed by eye; every new height traces back to the one true-height measuring line.',
          calloutAt: [100, 150],
          reveals: [],
        },
      ],
    };
  })();

  // ── 4. Dividing a Receding Face into Equal Bays ──
  (function () {
    const cTop = [100, 55], cBot = [100, 130];
    const tL = 0.55;
    const bTop = recede(cTop, VPL, tL), bBot = recede(cBot, VPL, tL);
    const center = lineIntersect(cTop, bBot, cBot, bTop);
    const midTop = lineIntersect([center[0], -1000], [center[0], 1000], cTop, bTop);
    const midBot = lineIntersect([center[0], -1000], [center[0], 1000], cBot, bBot);
    CONSTRUCTIONS['two-point-equal-bay-division'] = {
      id: 'two-point-equal-bay-division', title: 'Dividing a Receding Face into Equal Bays',
      summary: 'Crossing the diagonals of a receding face finds its exact centre in perspective — the same trick that divides any receding face into equal bays, however many times it\'s repeated.',
      bounds: { w: 205, h: 150 },
      workbookPrompt: 'Given one receding face of the two-point box, draw both diagonals, mark their crossing point, and drop a vertical through it to divide the face into two equal bays.',
      steps: [
        {
          id: 1,
          instruction: 'A single receding face (the left side of the box). Balloon 1: draw BOTH diagonals of the face, corner to opposite corner.',
          calloutAt: [85, 75],
          reveals: [
            { kind: 'line', p1: cTop, p2: bBot, lineType: 'A' }, { kind: 'line', p1: cBot, p2: bTop, lineType: 'A' },
            { kind: 'line', p1: bTop, p2: bBot, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: where the diagonals cross is the face\'s exact CENTRE, correctly foreshortened for its depth — a straightforward eye-measured midpoint would be wrong here, since the face narrows with distance.',
          calloutAt: center,
          reveals: [{ kind: 'point', at: center, label: 'centre' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: drop a vertical straight through the crossing point — this line divides the face into two EQUAL bays (e.g. two equal window bays), each correctly foreshortened for its own position.',
          calloutAt: [center[0], 92],
          reveals: [{ kind: 'line', p1: midTop, p2: midBot, lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Balloon 4 (capstone): repeating this same diagonal-crossing method inside each new bay divides the face into 4 equal bays, then 8, and so on — any number of equal repeats, without ever needing to guess a spacing by eye.',
          calloutAt: [100, 142],
          reveals: [],
        },
      ],
    };
  })();

  // ── 5. Door & Window on Two Receding Faces ──
  (function () {
    const cTop = [100, 55], cBot = [100, 130];
    const tL = 0.4, tR = 0.42;
    const lTop = recede(cTop, VPL, tL), lBot = recede(cBot, VPL, tL);
    const rTop = recede(cTop, VPR, tR), rBot = recede(cBot, VPR, tR);
    const doorT = 0.06;
    const doorNear = recede(cBot, VPL, doorT), doorFar = recede(cBot, VPL, doorT + 0.22);
    const doorTopLine_a = recede([100, 75], VPL, doorT), doorTopLine_b = recede([100, 75], VPL, doorT + 0.22);
    const sillTrue = [100, 95], headTrue = [100, 68];
    const winT0 = 0.18, winT1 = 0.34;
    const sillNear = recede(sillTrue, VPR, winT0), sillFar = recede(sillTrue, VPR, winT1);
    const headNear = recede(headTrue, VPR, winT0), headFar = recede(headTrue, VPR, winT1);
    CONSTRUCTIONS['two-point-door-window'] = {
      id: 'two-point-door-window', title: 'Door & Window on Two Receding Faces',
      summary: 'A door on the left face and a window on the right face — each height found by the same true-height transfer technique, just carried out toward whichever VP that face belongs to.',
      bounds: { w: 205, h: 150 },
      workbookPrompt: 'Add a door opening (from the ground) to the left receding face and a window opening (sill and head, both above the ground) to the right receding face of the two-point box.',
      steps: [
        {
          id: 1,
          instruction: 'The box\'s two faces. Balloon 1: on the LEFT face, the door\'s bottom coincides with the ground line, so only its TOP height needs transferring from the corner — carried out toward VPL.',
          calloutAt: doorTopLine_a,
          reveals: [
            { kind: 'line', p1: cTop, p2: cBot, lineType: 'A' }, { kind: 'line', p1: cTop, p2: lTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: lBot, lineType: 'A' }, { kind: 'line', p1: lTop, p2: lBot, lineType: 'A' },
            { kind: 'line', p1: cTop, p2: rTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: rBot, lineType: 'A' }, { kind: 'line', p1: rTop, p2: rBot, lineType: 'A' },
            { kind: 'point', at: [100, 75], label: 'true door height' },
            { kind: 'line', p1: [100, 75], p2: VPL, lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: mark the door\'s near and far edges along the base, project both up to the true-height line, and close off the opening — the door reads correctly foreshortened, narrower and shorter toward the back.',
          calloutAt: G.midpoint(doorNear, doorTopLine_a),
          reveals: [
            { kind: 'line', p1: doorNear, p2: doorTopLine_a, lineType: 'A' }, { kind: 'line', p1: doorFar, p2: doorTopLine_b, lineType: 'A' },
            { kind: 'line', p1: doorTopLine_a, p2: doorTopLine_b, lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: on the RIGHT face, a window needs TWO true heights transferred — sill height and head height — since neither touches the ground or the box top.',
          calloutAt: sillTrue,
          reveals: [
            { kind: 'point', at: sillTrue, label: 'sill' }, { kind: 'point', at: headTrue, label: 'head' },
            { kind: 'line', p1: sillTrue, p2: VPR, lineType: 'construction' }, { kind: 'line', p1: headTrue, p2: VPR, lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: mark the window\'s near and far edges, project up to BOTH true-height lines, and close off the opening — exactly the two-height technique already used on the one-point perspective window.',
          calloutAt: G.midpoint(sillNear, headNear),
          reveals: [
            { kind: 'line', p1: sillNear, p2: headNear, lineType: 'A' }, { kind: 'line', p1: sillFar, p2: headFar, lineType: 'A' },
            { kind: 'line', p1: headNear, p2: headFar, lineType: 'A' }, { kind: 'line', p1: sillNear, p2: sillFar, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 6. A Gable Roof End in Two-Point Perspective ──
  (function () {
    const cTop = [100, 55], cBot = [100, 130];
    const tL = 0.45;
    const bTop = recede(cTop, VPL, tL), bBot = recede(cBot, VPL, tL);
    const eaveMid = G.midpoint(cTop, bTop);
    const riseTrue = [100, 28];
    const ridge = recede(riseTrue, VPL, tL / 2);
    CONSTRUCTIONS['two-point-gable-roof'] = {
      id: 'two-point-gable-roof', title: 'A Gable Roof End in Two-Point Perspective',
      summary: 'The ridge point sits above the eave\'s exact midpoint, at a height transferred and foreshortened by exactly the same depth fraction — both found without any guesswork.',
      bounds: { w: 205, h: 165 },
      workbookPrompt: 'Given the left face of the two-point box as a gable end, construct the roof ridge point and draw the two sloping roof edges down to the eave corners.',
      steps: [
        {
          id: 1,
          instruction: 'The left face, treated as a gable end wall. Balloon 1: find the eave\'s midpoint — this is simply the ordinary midpoint of the two eave corners, since it lies on a single straight receding line.',
          calloutAt: eaveMid,
          reveals: [
            { kind: 'line', p1: cTop, p2: cBot, lineType: 'A' }, { kind: 'line', p1: bTop, p2: bBot, lineType: 'A' }, { kind: 'line', p1: cTop, p2: bTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: bBot, lineType: 'A' },
            { kind: 'point', at: eaveMid, label: 'mid' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: mark the roof\'s TRUE rise above the box on the corner vertical, exactly like any other new height.',
          calloutAt: riseTrue,
          reveals: [{ kind: 'point', at: riseTrue, label: 'true rise' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: because the eave midpoint sits exactly HALFWAY along the receding face, the ridge is found by receding the true-rise point toward VPL by exactly HALF the face\'s own depth fraction — the same halving relationship as the midpoint itself.',
          calloutAt: ridge,
          reveals: [
            { kind: 'line', p1: riseTrue, p2: VPL, lineType: 'construction' },
            { kind: 'point', at: ridge, label: 'ridge' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: join the ridge point down to both near and far eave corners — two correctly foreshortened roof slopes, ready to close the gable end.',
          calloutAt: [90, 45],
          reveals: [
            { kind: 'line', p1: ridge, p2: cTop, lineType: 'A' }, { kind: 'line', p1: ridge, p2: bTop, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 7. Bird's-Eye, Natural & Worm's-Eye Views (Two-Point) ──
  (function () {
    function miniBox(cx, vpDy) {
      const cTop = [cx, 50], cBot = [cx, 85];
      const hy = cTop[1] + vpDy;
      const vpl = [cx - 30, hy], vpr = [cx + 30, hy];
      const tL = 0.4, tR = 0.4;
      const lTop = recede(cTop, vpl, tL), lBot = recede(cBot, vpl, tL);
      const rTop = recede(cTop, vpr, tR), rBot = recede(cBot, vpr, tR);
      return [
        { kind: 'line', p1: cx - 32 < 0 ? [0, hy] : [cx - 32, hy], p2: [cx + 32, hy], lineType: 'centre' },
        { kind: 'line', p1: cTop, p2: cBot, lineType: 'A' },
        { kind: 'line', p1: cTop, p2: lTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: lBot, lineType: 'A' }, { kind: 'line', p1: lTop, p2: lBot, lineType: 'A' },
        { kind: 'line', p1: cTop, p2: rTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: rBot, lineType: 'A' }, { kind: 'line', p1: rTop, p2: rBot, lineType: 'A' },
      ];
    }
    CONSTRUCTIONS['two-point-birds-natural-worms'] = {
      id: 'two-point-birds-natural-worms', title: 'Bird\'s-Eye, Natural & Worm\'s-Eye Views (Two-Point)',
      summary: 'Moving the horizon relative to the object changes how much of its top (or underside) is revealed — the exact same principle from one-point perspective, now with two vanishing points.',
      bounds: { w: 205, h: 130 },
      workbookPrompt: 'Draw the same simple two-point box three times, moving only the horizon\'s height each time, to produce a bird\'s-eye, a natural, and a worm\'s-eye view.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: BIRD\'S-EYE VIEW — the horizon sits ABOVE the whole box, so the viewer looks down onto it; both top edges slope noticeably downward toward their vanishing points.',
          calloutAt: [40, 30],
          reveals: [
            ...miniBox(40, -25),
            { kind: 'label', at: [20, 105], text: "BIRD'S-EYE", size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: NATURAL (EYE-LEVEL) VIEW — the horizon passes directly through the box, roughly at its own mid-height, exactly as a person of ordinary height would actually see it standing nearby.',
          calloutAt: [102, 30],
          reveals: [
            ...miniBox(102, 20),
            { kind: 'label', at: [82, 105], text: 'NATURAL', size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: WORM\'S-EYE VIEW — the horizon sits BELOW the whole box, so the viewer looks steeply up at it; the top face vanishes from view entirely and both top edges now slope upward toward their vanishing points.',
          calloutAt: [164, 30],
          reveals: [
            ...miniBox(164, 55),
            { kind: 'label', at: [144, 105], text: "WORM'S-EYE", size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 8. Worked Example — A Small Cottage in Two-Point Perspective ──
  (function () {
    const cTop = [100, 50], cBot = [100, 128];
    const tL = 0.42, tR = 0.4;
    const lTop = recede(cTop, VPL, tL), lBot = recede(cBot, VPL, tL);
    const rTop = recede(cTop, VPR, tR), rBot = recede(cBot, VPR, tR);
    const eaveMid = G.midpoint(cTop, lTop);
    const riseTrue = [100, 25];
    const ridge = recede(riseTrue, VPL, tL / 2);
    const doorT0 = 0.08, doorT1 = 0.28;
    const doorTopTrue = [100, 78];
    const doorNear = recede(cBot, VPR, doorT0), doorFar = recede(cBot, VPR, doorT1);
    const doorTopN = recede(doorTopTrue, VPR, doorT0), doorTopF = recede(doorTopTrue, VPR, doorT1);
    CONSTRUCTIONS['two-point-cottage-capstone'] = {
      id: 'two-point-cottage-capstone', title: 'Worked Example — A Small Cottage in Two-Point Perspective',
      summary: 'Every technique from this chapter, combined into one finished drawing: the box, a gable roof, and a door — all built from the single corner vertical and its two vanishing points.',
      bounds: { w: 205, h: 170 },
      workbookPrompt: 'Draw a complete small cottage in two-point perspective: the basic box, a gable roof on the left face, and a door on the right face, using only the corner vertical, VPL and VPR.',
      steps: [
        {
          id: 1,
          instruction: 'Start with the basic two-point box, exactly as constructed earlier in this chapter.',
          calloutAt: [100, 20],
          reveals: [
            { kind: 'line', p1: cTop, p2: cBot, lineType: 'A' },
            { kind: 'line', p1: cTop, p2: lTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: lBot, lineType: 'A' }, { kind: 'line', p1: lTop, p2: lBot, lineType: 'A' },
            { kind: 'line', p1: cTop, p2: rTop, lineType: 'A' }, { kind: 'line', p1: cBot, p2: rBot, lineType: 'A' }, { kind: 'line', p1: rTop, p2: rBot, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Add the gable roof to the left face: true rise on the corner, receded to the eave midpoint\'s own depth fraction to find the ridge.',
          calloutAt: ridge,
          reveals: [
            { kind: 'line', p1: ridge, p2: cTop, lineType: 'A' }, { kind: 'line', p1: ridge, p2: lTop, lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Add the door to the right face: true door height transferred from the corner toward VPR, then the near and far edges closed off.',
          calloutAt: G.midpoint(doorNear, doorTopN),
          reveals: [
            { kind: 'line', p1: doorNear, p2: doorTopN, lineType: 'A' }, { kind: 'line', p1: doorFar, p2: doorTopF, lineType: 'A' },
            { kind: 'line', p1: doorTopN, p2: doorTopF, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'The finished cottage: one true-height corner, two vanishing points, and every other line and height on the page built up from just those three references.',
          calloutAt: [100, 155],
          reveals: [],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'How many vanishing points does two-point perspective use, and where must they sit?',
      options: ['Two, both on the horizon (eye-level) line', 'Two, one above and one below the horizon', 'Three, forming a triangle around the object', 'One, exactly like one-point perspective'],
      answer: 0,
      explanation: 'Two-point perspective uses exactly two vanishing points, VPL and VPR, and both always lie on the horizon line, since the horizon represents the viewer\'s own eye level.',
    },
    {
      text: 'Which single line in a two-point perspective drawing can be measured true-to-scale directly?',
      options: ['The corner vertical, at the object\'s nearest point to the viewer', 'Any horizontal line receding to either VP', 'The horizon line itself', 'Every vertical line in the drawing, regardless of position'],
      answer: 0,
      explanation: 'Only the corner vertical sits at the picture plane, where distances are still true to scale. Every other vertical is still vertical in direction, but must have its height transferred from the corner.',
    },
    {
      text: 'Why does erecting a vertical between two projectors that both go to the SAME vanishing point automatically give the correct box height at that depth?',
      options: [
        'Because both the top and bottom projector are foreshortened by exactly the same amount at any given depth along that VP',
        'It does not — a separate height-transfer step is always required',
        'Because vanishing points only affect horizontal measurements, never vertical ones',
        'Because the vertical is always drawn at true, unforeshortened height'],
      answer: 0,
      explanation: 'Since top and bottom projectors both converge toward the same VP, they are foreshortened identically at any chosen depth — so the vertical distance between them at that depth is automatically correct.',
    },
    {
      text: 'A chimney is taller than the rest of the box. What is the correct way to find its true perspective height at a point partway along a receding base edge?',
      options: [
        'Mark the new true height on the corner vertical, draw a new line from there to the same VP, then erect a vertical at the point up to that new line',
        'Simply estimate the extra height by eye and extend the vertical upward',
        'Use the OTHER vanishing point instead of the one the base edge converges to',
        'True heights can only ever be found at the corner vertical itself, nowhere else'],
      answer: 0,
      explanation: 'The corner vertical is the only true-height measuring line. A new height is marked there, receded to the same VP as the target point\'s base edge, and the crossing point gives the correct foreshortened height.',
    },
    {
      text: 'How is the exact centre of a receding face found in perspective, when a simple eye-measured midpoint would be wrong?',
      options: [
        'By drawing both diagonals of the face and marking where they cross',
        'By measuring the face with a ruler directly on the finished drawing',
        'By using the horizon line as a reference for the centre',
        'The centre of a receding face cannot be found accurately at all'],
      answer: 0,
      explanation: 'The two diagonals of any quadrilateral cross exactly at its centre — this holds true even for a foreshortened, receding face in perspective, unlike a naive eye-measured halfway point.',
    },
    {
      text: 'On the two-point gable roof construction, why can the eave midpoint be found using an ordinary arithmetic midpoint, rather than the diagonal-crossing method?',
      options: [
        'Because the two eave corners both lie on a single straight receding line, so simple linear interpolation along that one line is already correct',
        'Because roofs are never subject to perspective foreshortening',
        'Diagonal-crossing only works for finding heights, never horizontal positions',
        'It cannot — the diagonal method must always be used instead'],
      answer: 0,
      explanation: 'The diagonal-crossing method is needed to find the centre of a whole quadrilateral face. A midpoint of two points already on the SAME straight receding line is a much simpler, still fully valid, linear interpolation.',
    },
    {
      text: 'In a "worm\'s-eye" two-point perspective view, where does the horizon sit relative to the object, and what happens to the top face?',
      options: [
        'The horizon sits BELOW the whole object, and the top face disappears from view entirely',
        'The horizon sits ABOVE the object, revealing more of the top face',
        'The horizon passes through the object\'s exact centre',
        'Worm\'s-eye views do not use a horizon line at all'],
      answer: 0,
      explanation: 'A worm\'s-eye view means looking steeply upward at the object, which happens when the horizon is placed below it — from that angle, the top face is hidden and both top edges slope upward toward their vanishing points.',
    },
    {
      text: 'What is the purpose of the "true-height" line drawn from a marked point on the corner vertical toward a vanishing point?',
      options: [
        'It shows the correctly foreshortened version of that exact height at every depth along that line',
        'It marks the position of the horizon for that particular feature',
        'It is only a construction aid with no meaning in the final drawing',
        'It represents the true WIDTH of the object, not its height'],
      answer: 0,
      explanation: 'Once a true height is marked on the corner (the only true-scale reference), receding that point to a VP produces a line showing that same height, correctly foreshortened, at any depth position along it.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'two-point-setup', 'two-point-box', 'two-point-height-transfer', 'two-point-equal-bay-division',
    'two-point-door-window', 'two-point-gable-roof', 'two-point-birds-natural-worms', 'two-point-cottage-capstone',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
