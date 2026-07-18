// Perspective Drawing — Chapter 8 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  function recede(P, VP, t) { return [P[0] + t * (VP[0] - P[0]), P[1] + t * (VP[1] - P[1])]; }

  // ── 1. One-Point Perspective: A Simple Building ──
  (function () {
    const FL = [40, 120], FR = [100, 120], TR = [100, 80], TL = [40, 80], apex = [70, 60];
    const VP = [170, 100];
    const T = 0.35;
    const bFL = recede(FL, VP, T), bFR = recede(FR, VP, T), bTR = recede(TR, VP, T), bTL = recede(TL, VP, T), bApex = recede(apex, VP, T);

    CONSTRUCTIONS['one-point-building'] = {
      id: 'one-point-building', title: 'One-Point Perspective: A Building',
      summary: 'Draw a simple pitched-roof building in one-point perspective — the front face at true shape, with every receding edge converging on a single vanishing point.',
      bounds: { w: 205, h: 150 },
      workbookPrompt: 'Draw this building in one-point perspective: the true-shape front face, the horizon line and vanishing point, and the receding depth edges converging correctly.',
      steps: [
        {
          id: 1,
          instruction: 'The front face of the building touches the picture plane, so it is drawn at its TRUE SHAPE and size — completely undistorted, just like an ordinary front view.',
          calloutAt: [70, 100],
          reveals: [
            { kind: 'polygon', points: [FL, FR, TR, TL], lineType: 'A' },
            { kind: 'polygon', points: [TL, TR, apex], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the Horizon Line (HL) at eye level, and mark a single Vanishing Point (VP) on it. In one-point perspective, every edge receding into the distance appears to converge on this one point.',
          calloutAt: [VP[0] - 15, VP[1] - 8],
          reveals: [
            { kind: 'line', p1: [0, VP[1]], p2: [205, VP[1]], lineType: 'B' },
            { kind: 'point', at: VP, label: 'VP', size: 1.6 },
            { kind: 'label', at: [5, VP[1] - 3], text: 'HL', size: 4.5, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 3,
          instruction: 'From every corner of the front face — including the roof apex — draw a feint construction line towards the VP. These show the direction each receding edge will follow.',
          calloutAt: [(FR[0] + VP[0]) / 2, (FR[1] + VP[1]) / 2],
          reveals: [
            { kind: 'line', p1: FL, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: FR, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: TR, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: TL, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: apex, p2: VP, lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'Choose how deep the building should be, and mark that depth along each receding line. Complete the back face with lines PARALLEL to the front face\'s own edges — only the depth direction converges in one-point perspective.',
          calloutAt: [(bFL[0] + bFR[0]) / 2, bFL[1] + 6],
          reveals: [
            { kind: 'line', p1: bFL, p2: bFR, lineType: 'A' },
            { kind: 'line', p1: bTL, p2: bTR, lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'Add the visible depth edges on the side facing the vanishing point, and the roof ridge line, to complete the pictorial view.',
          calloutAt: [(TR[0] + bTR[0]) / 2, (TR[1] + bTR[1]) / 2 - 8],
          reveals: [
            { kind: 'line', p1: FR, p2: bFR, lineType: 'A' },
            { kind: 'line', p1: TR, p2: bTR, lineType: 'A' },
            { kind: 'line', p1: bTR, p2: bFR, lineType: 'A' },
            { kind: 'line', p1: apex, p2: bApex, lineType: 'A' },
            { kind: 'line', p1: bApex, p2: bTR, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 2. Bird's-Eye, Natural and Worm's-Eye Views ──
  (function () {
    const boxes = [
      { name: 'Bird’s-Eye View', x1: 15, x2: 55, y1: 70, y2: 100, vp: [80, 20], note: 'VP high above — looking down' },
      { name: 'Natural (Eye-Level) View', x1: 75, x2: 115, y1: 70, y2: 100, vp: [140, 85], note: 'VP through the object — a natural view' },
      { name: 'Worm’s-Eye View', x1: 135, x2: 175, y1: 70, y2: 100, vp: [200, 150], note: 'VP low below — looking up' },
    ];

    CONSTRUCTIONS['viewpoint-comparison'] = {
      id: 'viewpoint-comparison', title: 'Bird’s-Eye, Natural & Worm’s-Eye',
      summary: 'The same simple box, drawn three times with the vanishing point at a different height each time — showing how moving the horizon line changes the viewpoint.',
      bounds: { w: 225, h: 175 },
      workbookPrompt: 'Draw the same simple box three times, moving only the position of the VP each time, to produce a bird’s-eye, a natural, and a worm’s-eye view.',
      steps: boxes.map((b, i) => ({
        id: i + 1,
        instruction: (i === 0
          ? 'For a BIRD’S-EYE view, place the horizon line (and VP) well ABOVE the object, as if looking down from a height.'
          : i === 1
          ? 'For a NATURAL view, place the horizon line at normal eye level, roughly passing through the object itself.'
          : 'For a WORM’S-EYE view, place the horizon line (and VP) well BELOW the object, as if looking up from ground level.'),
        calloutAt: [(b.x1 + b.x2) / 2, b.y1 - 10],
        reveals: [
          { kind: 'polygon', points: [[b.x1, b.y1], [b.x2, b.y1], [b.x2, b.y2], [b.x1, b.y2]], lineType: 'A' },
          { kind: 'point', at: b.vp, label: 'VP', size: 1.4 },
          { kind: 'line', p1: [b.x2, b.y1], p2: b.vp, lineType: 'construction' },
          { kind: 'line', p1: [b.x2, b.y2], p2: b.vp, lineType: 'construction' },
          { kind: 'label', at: [b.x1, b.y2 + 12], text: b.name, size: 4, anchor: 'start', color: '#fde047' },
          { kind: 'label', at: [b.x1, b.y2 + 18], text: b.note, size: 3.2, anchor: 'start', color: '#94a3b8' },
        ],
      })),
    };
  })();

  // ── 3. Door with Correct Depth (Reveal) ──
  (function () {
    const FL = [40, 120], FR = [100, 120], TR = [100, 80], TL = [40, 80];
    const VP = [175, 100], T = 0.4;
    const bFR = recede(FR, VP, T), bTR = recede(TR, VP, T);
    const doorH = 30, dNear = 0.10, dFar = 0.17;
    const doorTopFront = [FR[0], FR[1] - doorH];
    const dBotNear = recede(FR, VP, dNear), dBotFar = recede(FR, VP, dFar);
    const dTopNear = recede(doorTopFront, VP, dNear), dTopFar = recede(doorTopFront, VP, dFar);

    CONSTRUCTIONS['perspective-door-reveal'] = {
      id: 'perspective-door-reveal', title: 'Door with Correct Depth (Reveal)',
      summary: 'A door opening on the receding side wall — its verticals stay perfectly vertical (they never converge), while its top and bottom "reveal" edges recede toward the same VP as the wall itself.',
      bounds: { w: 215, h: 150 },
      workbookPrompt: 'Draw the building shell in one-point perspective, then construct a door opening on the receding side wall with a correctly projected reveal (depth), 30 mm true height.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front face (true shape) and project the receding side wall to the VP, exactly as before — this is the wall the door will sit on.',
          calloutAt: [(FR[0] + bFR[0]) / 2, (FR[1] + bTR[1]) / 2],
          reveals: [
            { kind: 'polygon', points: [FL, FR, TR, TL], lineType: 'A' },
            { kind: 'point', at: VP, label: 'VP', size: 1.4 },
            { kind: 'line', p1: FR, p2: bFR, lineType: 'A' }, { kind: 'line', p1: TR, p2: bTR, lineType: 'A' }, { kind: 'line', p1: bFR, p2: bTR, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Mark the door\'s TRUE height at the front corner, then project that point toward the VP — this line shows the door\'s correct (foreshortened) height at any position along the depth.',
          calloutAt: doorTopFront,
          reveals: [
            { kind: 'point', at: doorTopFront, label: '' },
            { kind: 'line', p1: doorTopFront, p2: VP, lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Mark the door\'s near and far position along the depth, and drop verticals at each down to the ground line and up to the height-projection line — these stay perfectly vertical, since verticals never converge in one-point perspective.',
          calloutAt: G.midpoint(dBotNear, dTopFar),
          reveals: [
            { kind: 'line', p1: dBotNear, p2: dTopNear, lineType: 'A' },
            { kind: 'line', p1: dBotFar, p2: dTopFar, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Join the top and bottom of the door reveal — these edges DO recede toward the VP, since they run in the depth direction, parallel to the wall\'s own top and bottom edges.',
          calloutAt: G.midpoint(dTopNear, dTopFar),
          reveals: [
            { kind: 'line', p1: dTopNear, p2: dTopFar, lineType: 'A' },
            { kind: 'line', p1: dBotNear, p2: dBotFar, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 4. Window with Sill and Reveal ──
  (function () {
    const FL = [40, 120], FR = [100, 120], TR = [100, 80], TL = [40, 80];
    const VP = [175, 100], T = 0.4;
    const bFR = recede(FR, VP, T), bTR = recede(TR, VP, T);
    const sillH = 14, winTopH = 32, wNear = 0.22, wFar = 0.30;
    const sillFront = [FR[0], FR[1] - sillH], winTopFront = [FR[0], FR[1] - winTopH];
    const sNear = recede(sillFront, VP, wNear), sFar = recede(sillFront, VP, wFar);
    const wtNear = recede(winTopFront, VP, wNear), wtFar = recede(winTopFront, VP, wFar);

    CONSTRUCTIONS['perspective-window-reveal'] = {
      id: 'perspective-window-reveal', title: 'Window with Sill and Reveal',
      summary: 'A window doesn\'t reach the ground, so BOTH its sill and its head need their own true-height projection lines before the reveal can be constructed.',
      bounds: { w: 215, h: 150 },
      workbookPrompt: 'Construct a window opening on the receding side wall: sill height 14 mm, window head height 32 mm, both projected correctly to the VP.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the building shell (front face and receding side wall), as before.',
          calloutAt: [(FR[0] + bFR[0]) / 2, (FR[1] + bTR[1]) / 2],
          reveals: [
            { kind: 'polygon', points: [FL, FR, TR, TL], lineType: 'A' },
            { kind: 'point', at: VP, label: 'VP', size: 1.4 },
            { kind: 'line', p1: FR, p2: bFR, lineType: 'A' }, { kind: 'line', p1: TR, p2: bTR, lineType: 'A' }, { kind: 'line', p1: bFR, p2: bTR, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Mark the TRUE sill height and window head height at the front corner, and project BOTH to the VP — a window needs two height-projection lines, not one, since neither its top nor bottom touches the ground or the wall top.',
          calloutAt: G.midpoint(sillFront, winTopFront),
          reveals: [
            { kind: 'point', at: sillFront, label: '' }, { kind: 'point', at: winTopFront, label: '' },
            { kind: 'line', p1: sillFront, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: winTopFront, p2: VP, lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Mark the window\'s near and far position along the depth, and drop verticals between the two projection lines at each — again, perfectly vertical.',
          calloutAt: G.midpoint(sNear, wtFar),
          reveals: [
            { kind: 'line', p1: sNear, p2: wtNear, lineType: 'A' },
            { kind: 'line', p1: sFar, p2: wtFar, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Join the sill and head lines across — both recede toward the VP, completing the window opening with a correct reveal.',
          calloutAt: G.midpoint(wtNear, wtFar),
          reveals: [
            { kind: 'line', p1: wtNear, p2: wtFar, lineType: 'A' },
            { kind: 'line', p1: sNear, p2: sFar, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 5. Overhanging Roof Detail ──
  (function () {
    const FL = [40, 120], FR = [100, 120], TR = [100, 80], TL = [40, 80], apex = [70, 60];
    const VP = [175, 100], T = 0.4, OVER = 7;
    const eaveL = [TL[0] - OVER, TL[1]], eaveR = [TR[0] + OVER, TR[1]];
    const bEaveL = recede(eaveL, VP, T), bEaveR = recede(eaveR, VP, T), bApex = recede(apex, VP, T);

    CONSTRUCTIONS['perspective-roof-overhang'] = {
      id: 'perspective-roof-overhang', title: 'Overhanging Roof Detail',
      summary: 'A roof that overhangs its walls is simply built on an EAVE LINE that extends past the wall corners — on both the true-shape front face and the receded back face.',
      bounds: { w: 220, h: 150 },
      workbookPrompt: 'Draw the building with a 7 mm roof overhang past each wall corner, on both the front eave line and the receded back eave line.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the walls, then extend the EAVE LINE past both wall corners at true shape on the front face — the roof will oversail the wall by this amount all round.',
          calloutAt: [(eaveL[0] + eaveR[0]) / 2, eaveL[1]],
          reveals: [
            { kind: 'polygon', points: [FL, FR, TR, TL], lineType: 'A' },
            { kind: 'line', p1: eaveL, p2: eaveR, lineType: 'A' },
            { kind: 'point', at: VP, label: 'VP', size: 1.4 },
          ],
        },
        {
          id: 2,
          instruction: 'Project the two extended eave points toward the VP — the overhang recedes exactly like every other depth edge.',
          calloutAt: G.midpoint(eaveR, VP),
          reveals: [
            { kind: 'line', p1: eaveL, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: eaveR, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: apex, p2: VP, lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Mark the building\'s depth on each projector, and complete the back eave line (parallel to the front eave line) and the receded roof apex.',
          calloutAt: G.midpoint(bEaveL, bEaveR),
          reveals: [
            { kind: 'line', p1: bEaveL, p2: bEaveR, lineType: 'A' },
            { kind: 'point', at: bApex, label: '' },
          ],
        },
        {
          id: 4,
          instruction: 'Complete the roof surfaces — the overhang is now visible past the wall face on both the near and far edges, exactly like a real oversailing roof.',
          calloutAt: [(apex[0] + bApex[0]) / 2, (apex[1] + bApex[1]) / 2 - 10],
          reveals: [
            { kind: 'line', p1: eaveL, p2: apex, lineType: 'A' }, { kind: 'line', p1: eaveR, p2: apex, lineType: 'A' },
            { kind: 'line', p1: bEaveL, p2: bApex, lineType: 'A' }, { kind: 'line', p1: bEaveR, p2: bApex, lineType: 'A' },
            { kind: 'line', p1: apex, p2: bApex, lineType: 'A' }, { kind: 'line', p1: eaveR, p2: bEaveR, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 6. Circular Feature in Perspective ──
  (function () {
    const FL = [40, 120], FR = [100, 120], TR = [100, 80], TL = [40, 80];
    const VP = [175, 100], T = 0.4;
    const bFR = recede(FR, VP, T), bTR = recede(TR, VP, T);
    const centreFront = [80, 100], r = 14, N = 12, tCircle = 0.22;
    const truePts = Array.from({ length: N }, (_, i) => {
      const a = i * 2 * Math.PI / N;
      return [centreFront[0] + r * Math.cos(a), centreFront[1] + r * Math.sin(a)];
    });
    const persPts = truePts.map(p => recede(p, VP, tCircle));
    const smooth = G.catmullRomExpand(persPts.concat([persPts[0], persPts[1]]), 6);

    CONSTRUCTIONS['perspective-circular-feature'] = {
      id: 'perspective-circular-feature', title: 'Circular Feature in Perspective',
      summary: 'A circular window on a receding wall is never a true circle — plot its true shape at the picture plane first, then project every point individually to the correct depth.',
      bounds: { w: 215, h: 150 },
      workbookPrompt: 'Construct a circular window (28 mm diameter) on the receding side wall using the point-projection method: plot the true circle, then project all 12 points to the required depth.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the building shell, as before.',
          calloutAt: [(FR[0] + bFR[0]) / 2, (FR[1] + bTR[1]) / 2],
          reveals: [
            { kind: 'polygon', points: [FL, FR, TR, TL], lineType: 'A' },
            { kind: 'point', at: VP, label: 'VP', size: 1.4 },
            { kind: 'line', p1: FR, p2: bFR, lineType: 'A' }, { kind: 'line', p1: TR, p2: bTR, lineType: 'A' }, { kind: 'line', p1: bFR, p2: bTR, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'At the picture-plane depth, construct the window\'s TRUE circle and divide it into 12 equal points — exactly like plotting any circle that isn\'t shown true shape.',
          calloutAt: centreFront,
          reveals: [
            { kind: 'circle', center: centreFront, r, lineType: 'construction' },
            ...truePts.map(p => ({ kind: 'point', at: p, size: 1, color: '#eab308' })),
          ],
        },
        {
          id: 3,
          instruction: 'Project EACH of the 12 points individually toward the VP, stopping every one at the SAME chosen depth — this places the whole circle at its correct perspective position at once.',
          calloutAt: G.midpoint(centreFront, VP),
          reveals: [
            ...truePts.map(p => ({ kind: 'line', p1: p, p2: VP, lineType: 'construction' })),
            ...persPts.map(p => ({ kind: 'point', at: p, size: 1.1, color: '#f472b6' })),
          ],
        },
        {
          id: 4,
          instruction: 'Join the 12 projected points with a smooth curve — the circular window as it actually appears on the receding wall, foreshortened by the perspective projection.',
          calloutAt: G.midpoint(persPts[0], persPts[6]),
          reveals: [{ kind: 'polyline', points: smooth, lineType: 'A' }],
        },
      ],
    };
  })();

  // ── 7. Full Worked Dwelling ──
  (function () {
    const FL = [35, 125], FR = [110, 125], TR = [110, 82], TL = [35, 82], apex = [72.5, 58];
    const VP = [185, 102], T = 0.42;
    const bFL = recede(FL, VP, T), bFR = recede(FR, VP, T), bTR = recede(TR, VP, T), bTL = recede(TL, VP, T), bApex = recede(apex, VP, T);
    const doorH = 32, dNear = 0.06, dFar = 0.12;
    const dTopFront = [FR[0], FR[1] - doorH];
    const dBotN = recede(FR, VP, dNear), dBotF = recede(FR, VP, dFar), dTopN = recede(dTopFront, VP, dNear), dTopF = recede(dTopFront, VP, dFar);
    const sillH = 15, winTopH = 34, wNear = 0.24, wFar = 0.30;
    const sillFront = [FR[0], FR[1] - sillH], winTopFront = [FR[0], FR[1] - winTopH];
    const sN = recede(sillFront, VP, wNear), sF = recede(sillFront, VP, wFar), wtN = recede(winTopFront, VP, wNear), wtF = recede(winTopFront, VP, wFar);

    CONSTRUCTIONS['perspective-full-dwelling'] = {
      id: 'perspective-full-dwelling', title: 'Full Worked Dwelling',
      summary: 'Bringing every technique in this chapter together — walls, roof, a door and a window, all built from the same single vanishing point.',
      bounds: { w: 235, h: 160 },
      workbookPrompt: 'Draw the complete dwelling in one-point perspective: front face and roof, the receding shell, and a door and window each with a correctly projected reveal.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the true-shape front face and roof, and mark the VP on the horizon line.',
          calloutAt: [(FL[0] + FR[0]) / 2, (FL[1] + TL[1]) / 2],
          reveals: [
            { kind: 'polygon', points: [FL, FR, TR, TL], lineType: 'A' },
            { kind: 'polygon', points: [TL, TR, apex], lineType: 'A' },
            { kind: 'line', p1: [0, VP[1]], p2: [235, VP[1]], lineType: 'B' },
            { kind: 'point', at: VP, label: 'VP', size: 1.4 },
          ],
        },
        {
          id: 2,
          instruction: 'Project every front corner (and the apex) to the VP, mark the building\'s depth, and complete the receding shell — walls, back face and roof.',
          calloutAt: [(bFL[0] + bFR[0]) / 2, bFL[1] + 6],
          reveals: [
            { kind: 'line', p1: FR, p2: bFR, lineType: 'A' }, { kind: 'line', p1: TR, p2: bTR, lineType: 'A' },
            { kind: 'line', p1: bFL, p2: bFR, lineType: 'A' }, { kind: 'line', p1: bTL, p2: bTR, lineType: 'A' }, { kind: 'line', p1: bTR, p2: bFR, lineType: 'A' },
            { kind: 'line', p1: apex, p2: bApex, lineType: 'A' }, { kind: 'line', p1: bApex, p2: bTR, lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Add the DOOR on the receding wall: project its true height to the VP, mark its near/far depth position, and complete the reveal.',
          calloutAt: G.midpoint(dBotN, dTopF),
          reveals: [
            { kind: 'line', p1: dTopFront, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: dBotN, p2: dTopN, lineType: 'A' }, { kind: 'line', p1: dBotF, p2: dTopF, lineType: 'A' },
            { kind: 'line', p1: dTopN, p2: dTopF, lineType: 'A' }, { kind: 'line', p1: dBotN, p2: dBotF, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Add the WINDOW on the receding wall, further back — its own sill and head height lines, then the reveal, exactly as before.',
          calloutAt: G.midpoint(sN, wtF),
          reveals: [
            { kind: 'line', p1: sillFront, p2: VP, lineType: 'construction' }, { kind: 'line', p1: winTopFront, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: sN, p2: wtN, lineType: 'A' }, { kind: 'line', p1: sF, p2: wtF, lineType: 'A' },
            { kind: 'line', p1: wtN, p2: wtF, lineType: 'A' }, { kind: 'line', p1: sN, p2: sF, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 8. Relative Size at Different Depths ──
  (function () {
    const VP = [190, 90];
    const near = { FL: [20, 130], FR: [55, 130], TR: [55, 100], TL: [20, 100] };
    const T1 = 0.35; // a second, identical box, set back further along the SAME projectors
    function recedeBox(box, t) {
      return { FL: recede(box.FL, VP, t), FR: recede(box.FR, VP, t), TR: recede(box.TR, VP, t), TL: recede(box.TL, VP, t) };
    }
    const far = recedeBox(near, T1);
    const nearH = G.distance(near.FL, near.TL), farH = G.distance(far.FL, far.TL);

    CONSTRUCTIONS['relative-size-depth'] = {
      id: 'relative-size-depth', title: 'Relative Size at Different Depths',
      summary: 'The same true-size box, drawn at two different depths from the SAME vanishing point — proof that apparent size shrinks purely as a function of distance, with no separate scaling step.',
      bounds: { w: 210, h: 145 },
      workbookPrompt: 'Draw one box at the picture plane and an identical true-size box set back along the same projectors to the VP. Compare their apparent heights.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the NEAR box at true shape (it touches the picture plane), and mark the VP.',
          calloutAt: G.midpoint(near.FL, near.TR),
          reveals: [
            { kind: 'polygon', points: [near.FL, near.FR, near.TR, near.TL], lineType: 'A' },
            { kind: 'point', at: VP, label: 'VP', size: 1.4 },
          ],
        },
        {
          id: 2,
          instruction: 'Project every corner of the near box toward the VP — these projectors show every position that box COULD occupy, at any depth, along the same sightlines.',
          calloutAt: G.midpoint(near.FR, VP),
          reveals: [
            { kind: 'line', p1: near.FL, p2: VP, lineType: 'construction' }, { kind: 'line', p1: near.FR, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: near.TL, p2: VP, lineType: 'construction' }, { kind: 'line', p1: near.TR, p2: VP, lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Mark a second, FARTHER depth on the same projectors, and complete the far box the same way as any receding face.',
          calloutAt: G.midpoint(far.FL, far.TR),
          reveals: [
            { kind: 'polygon', points: [far.FL, far.FR, far.TR, far.TL], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Compare the two boxes\' apparent heights. Both are the SAME true size — the far box only looks smaller because it is farther away, exactly like a real building or a row of similar columns receding into the distance.',
          measurement: { label: `near height = ${nearH.toFixed(1)}, far height = ${farH.toFixed(1)}` },
          calloutAt: [near.TL[0] - 10, (near.TL[1] + far.TL[1]) / 2],
          reveals: [
            { kind: 'dimension', p1: [near.FL[0] - 10, near.TL[1]], p2: [near.FL[0] - 10, near.FL[1]], offset: 0, text: nearH.toFixed(0) },
            { kind: 'dimension', p1: [far.FL[0] - 8, far.TL[1]], p2: [far.FL[0] - 8, far.FL[1]], offset: 0, text: farH.toFixed(0) },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'In one-point perspective, why is the front face of a building drawn at its true shape and size?',
      options: [
        'Because it touches the picture plane, so it is not distorted by the perspective projection',
        'Because true shape is always easier to draw',
        'It is not really true shape — it just looks that way',
        'Only the roof is ever drawn true shape',
      ],
      answer: 0,
      explanation: 'Any surface lying directly on the picture plane is projected onto it without any distortion, so it is drawn at its true, undistorted shape and size.',
    },
    {
      text: 'What is the Vanishing Point (VP) in one-point perspective?',
      options: [
        'The single point on the horizon line where all lines receding into the distance appear to converge',
        'The exact centre of the front face',
        'A point used only for hidden detail',
        'The position of the observer\'s feet',
      ],
      answer: 0,
      explanation: 'In one-point perspective, every edge that recedes away from the viewer (in the depth direction) is drawn converging towards a single vanishing point placed on the horizon line.',
    },
    {
      text: 'Which lines do NOT converge towards the vanishing point in one-point perspective?',
      options: [
        'Horizontal and vertical lines that lie in the picture plane (the front face)',
        'Every single line in the drawing converges to the VP',
        'Only curved lines avoid converging',
        'Lines converge randomly with no rule',
      ],
      answer: 0,
      explanation: 'Only lines receding in depth converge to the VP. Lines running horizontally or vertically within the picture-plane face stay parallel to themselves, exactly as in the true-shape front view.',
    },
    {
      text: 'The Horizon Line (HL) represents:',
      options: ['The observer\'s eye level', 'The ground line only', 'The back edge of the object', 'The picture plane'],
      answer: 0,
      explanation: 'The horizon line represents the height of the observer\'s eye — it is where the vanishing point(s) for a perspective drawing are placed.',
    },
    {
      text: 'To produce a "bird\'s-eye view" of a building, where should the horizon line (and VP) be placed?',
      options: [
        'Well above the object, as if looking down from a height',
        'Well below the object, as if looking up from ground level',
        'Exactly through the middle of the object',
        'The horizon line has no effect on the type of view produced',
      ],
      answer: 0,
      explanation: 'A bird’s-eye view simulates looking down on the object from above, which is achieved by placing the horizon line (and vanishing point) well above the object.',
    },
    {
      text: 'To produce a "worm\'s-eye view" of a building, where should the horizon line (and VP) be placed?',
      options: [
        'Well below the object, as if looking up from ground level',
        'Well above the object',
        'It is identical to a natural view',
        'On the roof ridge line',
      ],
      answer: 0,
      explanation: 'A worm’s-eye view simulates looking up at the object from ground level, achieved by placing the horizon line (and vanishing point) well below the object.',
    },
    {
      text: 'What do the abbreviations HL, PP and SP stand for in perspective drawing?',
      options: [
        'Horizon Line, Picture Plane, Station Point',
        'Height Line, Plan Position, Section Point',
        'Horizontal Layout, Projection Plane, Scale Point',
        'Hidden Line, Perspective Plane, Symmetry Point',
      ],
      answer: 0,
      explanation: 'HL is the Horizon Line (eye level), PP is the Picture Plane (the imaginary glass surface the image is projected onto), and SP is the Station Point (the observer\'s eye position).',
    },
    {
      text: 'A door is cut into the receding side wall of a building in one-point perspective. Why do the door\'s vertical edges stay perfectly vertical, while its top and bottom reveal edges converge toward the VP?',
      options: [
        'Only lines running in the DEPTH direction converge to the VP — the door\'s verticals run in the height direction, which never converges in one-point perspective',
        'All lines on a receding wall must converge, without exception',
        'The door\'s vertical edges are a common exception with no real explanation',
        'Vertical edges only stay vertical if the door is exactly at the vanishing point',
      ],
      answer: 0,
      explanation: 'In one-point perspective, only edges receding in depth converge to the VP. True verticals (height) and the horizontals within the picture-plane face never converge — the door\'s reveal edges converge because they run in the depth direction, but its jambs stay vertical.',
    },
    {
      text: 'Why does constructing a window opening require TWO separate height-projection lines to the VP, while a door only needs one?',
      options: [
        'A door\'s bottom is at ground level (already established by the wall\'s own bottom edge), but a window\'s sill AND head both sit above the ground, so both need their own true height projected',
        'Windows are simply more complicated shapes than doors in every respect',
        'It is a mistake — a window only ever needs one projection line too',
        'The number of projection lines depends only on the window\'s width, not its position',
      ],
      answer: 0,
      explanation: 'A door bottom coincides with the ground line, which is already established. A window\'s sill height and head height are both new heights above the ground, so each needs its own true-height point projected to the VP before the reveal can be constructed.',
    },
    {
      text: 'How is a circular feature (e.g. a porthole window) on a receding wall constructed in one-point perspective?',
      options: [
        'Plot the true circle at the picture-plane depth, then project each of its points individually toward the VP, stopping all of them at the same required depth',
        'Draw a normal true circle directly on the receding wall — circles are never distorted by perspective',
        'It cannot be done; circular features are impossible to show accurately in perspective',
        'Simply squash a true circle vertically by an arbitrary amount',
      ],
      answer: 0,
      explanation: 'Because the receding wall is foreshortened, a circle drawn on it is never a true circle. Plotting the true circle at the picture plane and projecting every point to the correct depth (exactly like an isometric circle\'s coordinate method) produces the correct foreshortened result.',
    },
    {
      text: 'Two identical, true-size boxes are drawn in one-point perspective from the same VP, one closer to the picture plane and one set further back along the same projectors. What is true of their drawn sizes?',
      options: [
        'The farther box is drawn smaller, purely as a result of being farther from the picture plane — no separate scaling step is applied',
        'Both boxes must always be drawn exactly the same size, since they are the same true size',
        'The farther box must be drawn LARGER to compensate for the distance',
        'Size in perspective drawing has nothing to do with distance from the picture plane',
      ],
      answer: 0,
      explanation: 'Perspective foreshortening naturally makes objects appear smaller with distance — the SAME construction technique (projecting toward the VP and stopping at the required depth) automatically produces the correct, smaller size for the farther object.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'one-point-building', 'viewpoint-comparison', 'perspective-door-reveal', 'perspective-window-reveal',
    'perspective-roof-overhang', 'perspective-circular-feature', 'perspective-full-dwelling', 'relative-size-depth',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
