// Descriptive Geometry — Chapter 6 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  function perp(v) { return [-v[1], v[0]]; }
  function unitVec(v) { const L = Math.hypot(v[0], v[1]); return [v[0] / L, v[1] / L]; }
  function angleBetweenVecs(v1, v2) {
    const dot = v1[0] * v2[0] + v1[1] * v2[1];
    const mags = Math.hypot(v1[0], v1[1]) * Math.hypot(v2[0], v2[1]);
    return Math.acos(Math.max(-1, Math.min(1, dot / mags))) * 180 / Math.PI;
  }
  // G.angleBetween returns the sweep from p1 to p2 (0-360°, direction-dependent), which can be
  // the reflex angle depending on point order. A "true angle between two lines" is always the
  // non-reflex (≤180°) interior angle, so always take the smaller of the two possibilities.
  function trueAngle(vertex, p1, p2) {
    const raw = G.angleBetween(vertex, p1, p2);
    return Math.min(raw, 360 - raw);
  }

  // ── 1. Oblique Line: True Length & True Inclination ──
  (function () {
    const Xb = 50, Yb = 25, Zb = 35; // 3D offset from A to B
    const TL = Math.sqrt(Xb * Xb + Yb * Yb + Zb * Zb);

    const Ap = [60, 100], Bp = [Ap[0] + Xb, Ap[1] - Zb];       // front view A', B'
    const App = [60, 160], Bpp = [App[0] + Xb, App[1] + Yb];   // top view A'', B''

    const dirTop = unitVec([Bpp[0] - App[0], Bpp[1] - App[1]]);
    const perpTop = perp(dirTop);
    const P = [Bpp[0] + perpTop[0] * Zb, Bpp[1] + perpTop[1] * Zb];
    const thetaHP = angleBetweenVecs([Bpp[0] - App[0], Bpp[1] - App[1]], [P[0] - App[0], P[1] - App[1]]);

    const dirFront = unitVec([Bp[0] - Ap[0], Bp[1] - Ap[1]]);
    const perpFront = perp(dirFront);
    const Q = [Bp[0] + perpFront[0] * Yb, Bp[1] + perpFront[1] * Yb];
    const phiVP = angleBetweenVecs([Bp[0] - Ap[0], Bp[1] - Ap[1]], [Q[0] - Ap[0], Q[1] - Ap[1]]);

    CONSTRUCTIONS['oblique-true-length'] = {
      id: 'oblique-true-length', title: 'Oblique Line: True Length',
      summary: 'Find the true length and true inclination (to the HP and VP) of a line that runs obliquely to every projection plane.',
      bounds: { w: 185, h: 235 },
      workbookPrompt: 'Given the front and top views of line AB, construct its true length and true inclination to the HP (using the top view) and to the VP (using the front view).',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view (A\'B\') and top view (A\'\'B\'\') of an oblique line — one that runs diagonally in width, depth AND height, so neither view shows its true length.',
          calloutAt: [(Ap[0] + Bp[0]) / 2, (Ap[1] + Bp[1]) / 2],
          reveals: [
            { kind: 'line', p1: Ap, p2: Bp, lineType: 'A' },
            { kind: 'point', at: Ap, label: 'A\'' }, { kind: 'point', at: Bp, label: 'B\'' },
            { kind: 'line', p1: App, p2: Bpp, lineType: 'A' },
            { kind: 'point', at: App, label: 'A\'\'' }, { kind: 'point', at: Bpp, label: 'B\'\'' },
          ],
        },
        {
          id: 2,
          instruction: 'Working from the TOP view: at B\'\', draw a line perpendicular to A\'\'B\'\', equal in length to the height difference between A and B (read directly from the front view).',
          calloutAt: [(Bpp[0] + P[0]) / 2 + 6, (Bpp[1] + P[1]) / 2],
          reveals: [{ kind: 'line', p1: Bpp, p2: P, lineType: 'construction' }],
        },
        {
          id: 3,
          instruction: 'Join A\'\' to this new point. The hypotenuse is the TRUE LENGTH of line AB — and the angle it makes with the top view is the line\'s true inclination to the HP.',
          calloutAt: [(App[0] + P[0]) / 2 - 10, (App[1] + P[1]) / 2],
          reveals: [
            { kind: 'line', p1: App, p2: P, lineType: 'A' },
            { kind: 'angle-arc', vertex: App, p1: Bpp, p2: P, radius: 20, text: thetaHP.toFixed(1) + '°' },
            { kind: 'label', at: [P[0] + 4, P[1]], text: 'TL = ' + TL.toFixed(1), size: 4.5, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'Now work from the FRONT view: at B\', draw a perpendicular equal to the depth difference between A and B (read from the top view).',
          calloutAt: [(Bp[0] + Q[0]) / 2 + 6, (Bp[1] + Q[1]) / 2],
          reveals: [{ kind: 'line', p1: Bp, p2: Q, lineType: 'construction' }],
        },
        {
          id: 5,
          instruction: 'Join A\' to this point. The hypotenuse is the true length again (a useful check!) — and this angle is the line\'s true inclination to the VP.',
          calloutAt: [(Ap[0] + Q[0]) / 2 + 10, (Ap[1] + Q[1]) / 2],
          reveals: [
            { kind: 'line', p1: Ap, p2: Q, lineType: 'A' },
            { kind: 'angle-arc', vertex: Ap, p1: Bp, p2: Q, radius: 20, text: phiVP.toFixed(1) + '°' },
            { kind: 'label', at: [Q[0] + 4, Q[1] - 4], text: 'TL = ' + TL.toFixed(1) + ' (check)', size: 4.5, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. Line Classification: When Is a View True Length? ──
  (function () {
    const types = [
      { name: 'Horizontal', dX: 26, dY: 18, dZ: 0, trueIn: 'TOP view only' },
      { name: 'Frontal', dX: 26, dY: 0, dZ: 18, trueIn: 'FRONT view only' },
      { name: 'Profile', dX: 0, dY: 22, dZ: 14, trueIn: 'NEITHER (needs a side/auxiliary view)' },
      { name: 'Oblique', dX: 26, dY: 16, dZ: 18, trueIn: 'NEITHER (needs the true-length construction)' },
    ];
    const reveals = [];
    const colW = 42;
    types.forEach((t, i) => {
      const ox = 15 + i * colW;
      const fvA = [ox, 30], fvB = [ox + t.dX, 30 - t.dZ];
      const tvA = [ox, 75], tvB = [ox + t.dX, 75 + t.dY];
      const trueLen = Math.sqrt(t.dX * t.dX + t.dY * t.dY + t.dZ * t.dZ);
      const fvLen = Math.hypot(t.dX, t.dZ), tvLen = Math.hypot(t.dX, t.dY);
      reveals.push(
        { kind: 'line', p1: fvA, p2: fvB, lineType: 'A' },
        { kind: 'line', p1: tvA, p2: tvB, lineType: 'A' },
        { kind: 'label', at: [ox, 18], text: t.name, size: 4.2, anchor: 'start', color: '#fde047' },
        { kind: 'label', at: [ox, 95], text: 'True length in:', size: 3.2, anchor: 'start', color: '#94a3b8' },
        { kind: 'label', at: [ox, 100.5], text: t.trueIn, size: 3.2, anchor: 'start', color: '#94a3b8' }
      );
    });

    CONSTRUCTIONS['line-classification'] = {
      id: 'line-classification', title: 'Line Classification',
      summary: 'Four kinds of line, and which view (if any) shows each one at its true length.',
      bounds: { w: 190, h: 110 },
      workbookPrompt: 'For each of the four line types shown, sketch its front and top view, and state which view (if any) shows the true length.',
      steps: [
        { id: 1, instruction: 'A horizontal line is parallel to the HP (no height change) — only the TOP view shows its true length; the front view is foreshortened.', calloutAt: [30, 52], reveals: [reveals[0], reveals[1], reveals[2], reveals[3], reveals[4]] },
        { id: 2, instruction: 'A frontal line is parallel to the VP (no depth change) — only the FRONT view shows its true length; the top view is foreshortened.', calloutAt: [72, 52], reveals: [reveals[5], reveals[6], reveals[7], reveals[8], reveals[9]] },
        { id: 3, instruction: 'A profile line is parallel to the side (profile) plane (no width change) — NEITHER the front nor top view shows its true length; you would need an actual side view.', calloutAt: [114, 52], reveals: [reveals[10], reveals[11], reveals[12], reveals[13], reveals[14]] },
        { id: 4, instruction: 'An oblique line runs diagonally to every plane — NEITHER view shows its true length, which is exactly why the true-length construction from the previous topic is needed.', calloutAt: [156, 52], reveals: [reveals[15], reveals[16], reveals[17], reveals[18], reveals[19]] },
      ],
    };
  })();

  // ── 3. True Length by the Auxiliary View Method ──
  (function () {
    const Xb = 45, Yb = 20, Zb = 30;
    const Ap = [55, 90], Bp = [Ap[0] + Xb, Ap[1] - Zb];
    const App = [55, 150], Bpp = [App[0] + Xb, App[1] + Yb];
    const dir = unitVec([Bpp[0] - App[0], Bpp[1] - App[1]]);
    const nrm = perp(dir);
    const GAP = 18;
    const FA = [App[0] + nrm[0] * GAP, App[1] + nrm[1] * GAP];
    const FB = [Bpp[0] + nrm[0] * GAP, Bpp[1] + nrm[1] * GAP];
    const AuxA = FA; // height 0, sits on the fold line
    const AuxB = [FB[0] + nrm[0] * Zb, FB[1] + nrm[1] * Zb];
    const TL = Math.sqrt(Xb * Xb + Yb * Yb + Zb * Zb);

    CONSTRUCTIONS['auxiliary-true-length'] = {
      id: 'auxiliary-true-length', title: 'True Length by the Auxiliary View Method',
      summary: 'A second way to find true length — instead of a right-triangle construction, project a genuine auxiliary view via a fold line parallel to the top view, exactly like an auxiliary view of a surface.',
      bounds: { w: 180, h: 220 },
      workbookPrompt: 'Given the front and top views of line AB, find its true length using the auxiliary-view method: a fold line parallel to the top view, with height transferred from the front view.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front and top views of the same kind of oblique line as before.',
          calloutAt: G.midpoint(Ap, Bp),
          reveals: [
            { kind: 'line', p1: Ap, p2: Bp, lineType: 'A' }, { kind: 'point', at: Ap, label: 'A\'' }, { kind: 'point', at: Bp, label: 'B\'' },
            { kind: 'line', p1: App, p2: Bpp, lineType: 'A' }, { kind: 'point', at: App, label: 'A\'\'' }, { kind: 'point', at: Bpp, label: 'B\'\'' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw a fold line PARALLEL to the top view of the line, then project perpendicular construction lines from A\'\' and B\'\' beyond it.',
          calloutAt: G.midpoint(FA, FB),
          reveals: [
            { kind: 'line', p1: FA, p2: FB, lineType: 'centre' },
            { kind: 'line', p1: App, p2: AuxA, lineType: 'construction' },
            { kind: 'line', p1: Bpp, p2: AuxB, lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Transfer each point\'s HEIGHT (read from the front view) along its projector, starting at the fold line — A is at zero height here, B is higher by its true height difference.',
          calloutAt: AuxB,
          reveals: [
            { kind: 'point', at: AuxA, label: 'A' }, { kind: 'point', at: AuxB, label: 'B' },
          ],
        },
        {
          id: 4,
          instruction: `Join the two points — this edge is the TRUE LENGTH, found by a completely different method (auxiliary projection) than the right-triangle technique, yet it gives the same answer.`,
          measurement: { label: 'TL = ' + TL.toFixed(1) + ' mm' },
          calloutAt: G.midpoint(AuxA, AuxB),
          reveals: [
            { kind: 'line', p1: AuxA, p2: AuxB, lineType: 'A' },
            { kind: 'label', at: [AuxA[0] - 30, AuxA[1] + 10], text: 'TL = ' + TL.toFixed(1), size: 4.5, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 4. True Length by Rotation (Revolution Method) ──
  (function () {
    const Xb = 45, Zb = 30, Yb = 20;
    const Ap = [55, 90], Bp = [Ap[0] + Xb, Ap[1] - Zb];
    const App = [55, 150], Bpp = [App[0] + Xb, App[1] + Yb];
    const topLen = G.distance(App, Bpp);
    const BppRot = [App[0] + topLen, App[1]];
    const BpRot = [BppRot[0], Bp[1]];
    const TL = G.distance(Ap, BpRot);
    const arcR = topLen;

    CONSTRUCTIONS['rotation-true-length'] = {
      id: 'rotation-true-length', title: 'True Length by Rotation (Revolution Method)',
      summary: 'Rotate the line in the top view until it runs parallel to the ground line — it becomes "frontal", so its new front view shows the true length directly, with no extra triangle needed.',
      bounds: { w: 180, h: 200 },
      workbookPrompt: 'Rotate the top view of line AB about A until it is parallel to the ground line, project the rotated end up to the front view, and read the true length directly.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front and top views of the oblique line.',
          calloutAt: G.midpoint(Ap, Bp),
          reveals: [
            { kind: 'line', p1: Ap, p2: Bp, lineType: 'A' }, { kind: 'point', at: Ap, label: 'A\'' }, { kind: 'point', at: Bp, label: 'B\'' },
            { kind: 'line', p1: App, p2: Bpp, lineType: 'A' }, { kind: 'point', at: App, label: 'A\'\'' }, { kind: 'point', at: Bpp, label: 'B\'\'' },
          ],
        },
        {
          id: 2,
          instruction: 'In the TOP view, rotate the line about A\'\' (using a compass, radius A\'\'B\'\') until it lies parallel to the ground line — rotation never changes a line\'s length, only its direction.',
          calloutAt: [App[0] + arcR / 2, App[1] - 10],
          reveals: [
            { kind: 'arc-construction', center: App, r: arcR, startDeg: -40, endDeg: 5, lineType: 'construction' },
            { kind: 'line', p1: App, p2: BppRot, lineType: 'A' },
            { kind: 'point', at: BppRot, label: 'B\'\'ᵣ' },
          ],
        },
        {
          id: 3,
          instruction: 'Project the rotated point straight up to the front view, at the SAME height as the original B\' — rotating in plan view never changes any point\'s height.',
          calloutAt: [BppRot[0], (Bp[1] + BppRot[1]) / 2],
          reveals: [
            { kind: 'line', p1: BppRot, p2: BpRot, lineType: 'construction' },
            { kind: 'line', p1: Bp, p2: BpRot, lineType: 'construction' },
            { kind: 'point', at: BpRot, label: 'B\'ᵣ' },
          ],
        },
        {
          id: 4,
          instruction: 'Join A\' to this new point. Because the line is now effectively "frontal" (parallel to the VP) in its rotated position, this length IS the true length — read directly, no triangle required.',
          measurement: { label: 'TL = ' + TL.toFixed(1) + ' mm' },
          calloutAt: G.midpoint(Ap, BpRot),
          reveals: [
            { kind: 'line', p1: Ap, p2: BpRot, lineType: 'A' },
            { kind: 'label', at: [Ap[0], Ap[1] - 12], text: 'TL = ' + TL.toFixed(1), size: 4.5, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 5. Locating a Point at a Given True Distance Along a Line ──
  (function () {
    const Xb = 50, Yb = 25, Zb = 35;
    const TL = Math.sqrt(Xb * Xb + Yb * Yb + Zb * Zb);
    const Ap = [55, 90], Bp = [Ap[0] + Xb, Ap[1] - Zb];
    const App = [55, 150], Bpp = [App[0] + Xb, App[1] + Yb];
    const dirTop = unitVec([Bpp[0] - App[0], Bpp[1] - App[1]]);
    const perpTop = perp(dirTop);
    const P = [Bpp[0] + perpTop[0] * Zb, Bpp[1] + perpTop[1] * Zb];
    const D = 40; // required true distance from A
    const f = D / TL;
    const Tline = [App[0] + f * (P[0] - App[0]), App[1] + f * (P[1] - App[1])];
    const Ttop = [App[0] + f * (Bpp[0] - App[0]), App[1] + f * (Bpp[1] - App[1])];
    const Tfront = [Ap[0] + f * (Bp[0] - Ap[0]), Ap[1] + f * (Bp[1] - Ap[1])];

    CONSTRUCTIONS['point-at-true-distance'] = {
      id: 'point-at-true-distance', title: 'Locating a Point at a Given True Distance',
      summary: 'Given the true length of a line, mark a required real-world distance along it, then use similar triangles to find that same point on both the front and top views.',
      bounds: { w: 195, h: 240 },
      workbookPrompt: `Given line AB (true length ${TL.toFixed(1)} mm), locate the point T that is exactly ${D} mm from A along the true line, and show T on both the front and top views.`,
      steps: [
        {
          id: 1,
          instruction: 'Start with the true-length construction already built for line AB (front view, top view, and the true-length hypotenuse).',
          calloutAt: G.midpoint(App, P),
          reveals: [
            { kind: 'line', p1: Ap, p2: Bp, lineType: 'A' }, { kind: 'point', at: Ap, label: 'A\'' }, { kind: 'point', at: Bp, label: 'B\'' },
            { kind: 'line', p1: App, p2: Bpp, lineType: 'A' }, { kind: 'point', at: App, label: 'A\'\'' }, { kind: 'point', at: Bpp, label: 'B\'\'' },
            { kind: 'line', p1: Bpp, p2: P, lineType: 'construction' },
            { kind: 'line', p1: App, p2: P, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: `On the TRUE LENGTH line, measure and mark point T exactly ${D} mm from A — a direct ruler measurement, since this line shows true length.`,
          measurement: { label: `${D} mm of ${TL.toFixed(1)} mm total` },
          calloutAt: Tline,
          reveals: [{ kind: 'point', at: Tline, label: 'T' }],
        },
        {
          id: 3,
          instruction: 'Draw a line through T, PARALLEL to the triangle\'s height leg (Bpp–P), back to the top-view line — by similar triangles, this locates T\'s TOP VIEW position at the exact same proportion along A\'\'B\'\'.',
          calloutAt: Ttop,
          reveals: [
            { kind: 'line', p1: Tline, p2: Ttop, lineType: 'construction' },
            { kind: 'point', at: Ttop, label: 'T\'\'' },
          ],
        },
        {
          id: 4,
          instruction: 'Project T\'\' up to the front view, at the same proportion along A\'B\' — this completes both views with the point correctly located.',
          calloutAt: Tfront,
          reveals: [
            { kind: 'line', p1: Ttop, p2: Tfront, lineType: 'construction' },
            { kind: 'point', at: Tfront, label: 'T\'' },
          ],
        },
      ],
    };
  })();

  // ── 6. True Angle Between Two Intersecting Lines ──
  (function () {
    const TL_VA = 49.5, TL_VB = 45, AB = 35.7;
    const O = [70, 70];
    const A6 = [O[0] + AB, O[1]];
    const h = Math.sqrt(Math.max(0, TL_VA * TL_VA - (AB / 2) * (AB / 2)));
    // Circle-circle intersection for V, using the two true lengths as radii from O and A6.
    const a = (TL_VA * TL_VA - TL_VB * TL_VB + AB * AB) / (2 * AB);
    const hV = Math.sqrt(Math.max(0, TL_VA * TL_VA - a * a));
    const V6 = [O[0] + a, O[1] - hV];
    const trueAngleVal = trueAngle(V6, O, A6);

    CONSTRUCTIONS['true-angle-two-lines'] = {
      id: 'true-angle-two-lines', title: 'True Angle Between Two Intersecting Lines',
      summary: 'Neither the front nor top view shows the real angle between two oblique lines — triangulating from their already-known true lengths does.',
      bounds: { w: 150, h: 110 },
      workbookPrompt: 'Given two oblique lines VA and VB (true lengths 49.5 mm and 45 mm, true distance AB = 35.7 mm), construct the true angle at V by triangulation.',
      steps: [
        {
          id: 1,
          instruction: 'GIVEN: two oblique lines from a common point V, with their true lengths already found (49.5 mm and 45 mm, using the true-length method earlier in this chapter) and the true 3D distance AB calculated as 35.7 mm.',
          calloutAt: O,
          reveals: [
            { kind: 'label', at: [O[0] - 10, O[1] - 20], text: 'TL(VA)=49.5  TL(VB)=45  AB=35.7', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw a baseline equal to the true distance AB.',
          calloutAt: [(O[0] + A6[0]) / 2, O[1] + 10],
          reveals: [
            { kind: 'line', p1: O, p2: A6, lineType: 'A' },
            { kind: 'point', at: O, label: 'A' }, { kind: 'point', at: A6, label: 'B' },
          ],
        },
        {
          id: 3,
          instruction: 'From A, swing an arc of radius TL(VA); from B, swing an arc of radius TL(VB). Their intersection is the true position of V.',
          calloutAt: V6,
          reveals: [
            { kind: 'arc-construction', center: O, r: TL_VA, startDeg: -110, endDeg: -70, lineType: 'construction' },
            { kind: 'arc-construction', center: A6, r: TL_VB, startDeg: -110, endDeg: -70, lineType: 'construction' },
            { kind: 'point', at: V6, label: 'V' },
          ],
        },
        {
          id: 4,
          instruction: 'Join V to both A and B. The angle at V is the TRUE angle between the two lines — impossible to read directly from either the front or top view.',
          measurement: { label: 'true angle = ' + trueAngleVal.toFixed(1) + '°' },
          calloutAt: V6,
          reveals: [
            { kind: 'line', p1: V6, p2: O, lineType: 'A' },
            { kind: 'line', p1: V6, p2: A6, lineType: 'A' },
            { kind: 'angle-arc', vertex: V6, p1: O, p2: A6, radius: 14, text: trueAngleVal.toFixed(1) + '°' },
          ],
        },
      ],
    };
  })();

  // ── 7. True Length of a Roof Strut (Practical Application) ──
  (function () {
    const Xb = 48, Yb = 32, Zb = 36; // scaled from a real 1200 x 800 x 900 mm strut
    const TL = Math.sqrt(Xb * Xb + Yb * Yb + Zb * Zb);
    const Ap = [55, 90], Bp = [Ap[0] + Xb, Ap[1] - Zb];
    const App = [55, 150], Bpp = [App[0] + Xb, App[1] + Yb];
    const dirTop = unitVec([Bpp[0] - App[0], Bpp[1] - App[1]]);
    const perpTop = perp(dirTop);
    const P = [Bpp[0] + perpTop[0] * Zb, Bpp[1] + perpTop[1] * Zb];

    CONSTRUCTIONS['roof-strut-true-length'] = {
      id: 'roof-strut-true-length', title: 'True Length of a Roof Strut',
      summary: 'The true-length technique isn\'t just an abstract exercise — this is exactly how a fabricator works out the real length to cut a diagonal strut connecting a wall-plate to a ridge beam.',
      bounds: { w: 185, h: 225 },
      workbookPrompt: 'A roof strut runs from a wall-plate point to a ridge point, 1200 mm along the wall, 800 mm in depth, and 900 mm in rise (drawn here at 1:25 scale). Find the true length — the actual length the strut must be cut to.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front and top views of the strut, from the wall-plate point A to the ridge point B — width, depth AND height all differ, so this is a genuinely oblique member.',
          calloutAt: G.midpoint(Ap, Bp),
          reveals: [
            { kind: 'line', p1: Ap, p2: Bp, lineType: 'A' }, { kind: 'point', at: Ap, label: 'A' }, { kind: 'point', at: Bp, label: 'B' },
            { kind: 'line', p1: App, p2: Bpp, lineType: 'A' }, { kind: 'point', at: App, label: 'A' }, { kind: 'point', at: Bpp, label: 'B' },
          ],
        },
        {
          id: 2,
          instruction: 'From the top view, add the height-difference perpendicular at B (read from the front view).',
          calloutAt: G.midpoint(Bpp, P),
          reveals: [{ kind: 'line', p1: Bpp, p2: P, lineType: 'construction' }],
        },
        {
          id: 3,
          instruction: 'Join A to the new point. This hypotenuse is the strut\'s TRUE LENGTH — the actual length the timber must be cut to, before any allowance for the angled end cuts.',
          measurement: { label: 'TL = ' + TL.toFixed(1) + ' mm (× 25 scale ≈ ' + (TL * 25 / 10).toFixed(0) + ' cm real length)' },
          calloutAt: G.midpoint(App, P),
          reveals: [
            { kind: 'line', p1: App, p2: P, lineType: 'A' },
            { kind: 'label', at: [App[0] - 4, App[1] + 14], text: 'TL = ' + TL.toFixed(1) + ' mm', size: 4.5, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'Also read the strut\'s true inclination to the HP — the actual slope angle it must be cut at where it meets the wall-plate and ridge.',
          measurement: { label: 'true slope = ' + trueAngle(App, Bpp, P).toFixed(1) + '°' },
          calloutAt: [App[0] + 10, App[1] - 10],
          reveals: [
            { kind: 'angle-arc', vertex: App, p1: Bpp, p2: P, radius: 18, text: trueAngle(App, Bpp, P).toFixed(1) + '°' },
          ],
        },
      ],
    };
  })();

  // ── 8. Comparing the Three True-Length Methods ──
  (function () {
    const panels = [
      { label: 'RIGHT-TRIANGLE METHOD', ox: 15 },
      { label: 'ROTATION METHOD', ox: 90 },
      { label: 'AUXILIARY-VIEW METHOD', ox: 165 },
    ];
    const Xb = 30, Yb = 14, Zb = 20;
    const TL = Math.sqrt(Xb * Xb + Yb * Yb + Zb * Zb);

    function trianglePanel(ox) {
      const A = [ox, 60], B = [ox + Xb, 60 - Zb];
      const P = [B[0], B[1] - Yb];
      return [
        { kind: 'line', p1: A, p2: B, lineType: 'construction' },
        { kind: 'line', p1: B, p2: P, lineType: 'construction' },
        { kind: 'line', p1: A, p2: P, lineType: 'A' },
      ];
    }

    CONSTRUCTIONS['three-methods-comparison'] = {
      id: 'three-methods-comparison', title: 'Comparing the Three True-Length Methods',
      summary: 'The right-triangle method, the rotation method, and the auxiliary-view method are three completely different construction routes — all three must always agree on the same true length.',
      bounds: { w: 190, h: 90 },
      workbookPrompt: 'Using the same oblique line, find its true length by all three methods covered in this chapter, and confirm all three answers match.',
      steps: [
        {
          id: 1,
          instruction: `RIGHT-TRIANGLE METHOD: add a perpendicular equal to the height difference, join, and read the hypotenuse.`,
          measurement: { label: 'TL = ' + TL.toFixed(1) + ' mm' },
          calloutAt: [panels[0].ox + Xb / 2, 40],
          reveals: [
            ...trianglePanel(panels[0].ox),
            { kind: 'label', at: [panels[0].ox, 20], text: panels[0].label, size: 3.6, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 2,
          instruction: 'ROTATION METHOD: rotate the top view until parallel to the ground line, then read the true length directly from the new front view.',
          measurement: { label: 'TL = ' + TL.toFixed(1) + ' mm' },
          calloutAt: [panels[1].ox + Xb / 2, 40],
          reveals: [
            ...trianglePanel(panels[1].ox),
            { kind: 'label', at: [panels[1].ox, 20], text: panels[1].label, size: 3.6, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 3,
          instruction: 'AUXILIARY-VIEW METHOD: project a genuine new view via a fold line, transferring height — the line appears at true length directly, as an edge of the new view.',
          measurement: { label: 'TL = ' + TL.toFixed(1) + ' mm' },
          calloutAt: [panels[2].ox + Xb / 2, 40],
          reveals: [
            ...trianglePanel(panels[2].ox),
            { kind: 'label', at: [panels[2].ox, 20], text: panels[2].label, size: 3.6, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'All three constructions are different ROUTES to the same physical quantity — so all three must agree. Getting matching answers from two different methods is a genuinely useful way to check your own work in an exam.',
          calloutAt: [95, 78],
          reveals: [
            { kind: 'label', at: [15, 78], text: 'THREE METHODS, ONE ANSWER: ' + TL.toFixed(1) + ' mm', size: 4.2, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'Why does neither the front view nor the top view show the true length of an oblique line?',
      options: [
        'Because the line runs diagonally to every projection plane, so every view foreshortens it',
        'Because oblique lines have no true length at all',
        'Because oblique lines are always curved',
        'Only the top view is ever affected — the front view always shows true length',
      ],
      answer: 0,
      explanation: 'An oblique line has a component in all three directions (width, depth and height), so every standard view foreshortens it to some degree — none shows the actual true length.',
    },
    {
      text: 'To find the true length of a line using its TOP view, what do you add to construct the auxiliary right triangle?',
      options: [
        'A line perpendicular to the top view, equal to the height difference between the two endpoints',
        'A line parallel to the top view, equal to the top view\'s own length',
        'A circle with a radius equal to the front view\'s length',
        'Nothing — the top view already shows the true length',
      ],
      answer: 0,
      explanation: 'Adding a perpendicular equal to the height difference (read from the front view) turns the top view into one leg of a right triangle whose hypotenuse is the true length.',
    },
    {
      text: 'In the true-length construction using the top view, what does the angle between the hypotenuse and the top view represent?',
      options: [
        'The true inclination of the line to the HP (horizontal plane)',
        'The true inclination of the line to the VP',
        'The angle between the front and top views',
        'It has no physical meaning — it is just a construction angle',
      ],
      answer: 0,
      explanation: 'This angle is exactly the true inclination to the HP — the real-world angle the line makes with the horizontal plane.',
    },
    {
      text: 'To find the true inclination to the VP, which view do you start from, and what do you add?',
      options: [
        'The front view, adding a perpendicular equal to the depth difference between the endpoints',
        'The top view, adding a perpendicular equal to the height difference',
        'Either view — it makes no difference',
        'A brand new side view is always required',
      ],
      answer: 0,
      explanation: 'Starting from the front view and adding a perpendicular equal to the depth difference (read from the top view) gives a right triangle whose angle is the true inclination to the VP.',
    },
    {
      text: 'A "frontal" line is one that is parallel to the VP. Which view shows its true length?',
      options: ['The front view', 'The top view', 'Neither view', 'Both views equally'],
      answer: 0,
      explanation: 'A line parallel to the VP has no depth (Y) variation, so the front view — which shows width and height — captures its full true length without any foreshortening.',
    },
    {
      text: 'A "profile" line is parallel to the side (profile) plane. Why does neither the front nor top view show its true length?',
      options: [
        'Because a profile line has no width (X) component, so both the front and top views foreshorten it down to just its height or depth component',
        'Because profile lines do not really exist',
        'Because profile lines are always vertical',
        'Both views actually DO show its true length',
      ],
      answer: 0,
      explanation: 'With zero width component, the front view only shows the height difference and the top view only shows the depth difference — neither captures the combined true length, which requires an actual side view or auxiliary construction.',
    },
    {
      text: 'When finding true length via the top-view method, why should the resulting true length match the value found via the front-view method?',
      options: [
        'Because both methods are calculating the same true 3D length of the same physical line, just via two different right triangles',
        'They are not expected to match — a mismatch is normal',
        'Because both methods use exactly the same triangle',
        'Only the top-view method gives the correct value; the front-view result is always approximate',
      ],
      answer: 0,
      explanation: 'Both constructions are two different routes to the same physical quantity — the line\'s true length — so getting matching answers from both is a valuable way to check your construction is correct.',
    },
    {
      text: 'In the ROTATION method for true length, why does rotating the top view never change the true length of the line?',
      options: [
        'Rotation is a rigid transformation — it changes a line\'s direction but never its length',
        'It does change the length, which is exactly the point of the method',
        'Rotation only works on lines that are already true length',
        'The top view length and the true length are unrelated quantities',
      ],
      answer: 0,
      explanation: 'Rotating a shape (or a line) about a point is a rigid-body transformation: every distance within it is preserved. Only the DIRECTION changes, which is exactly what lets the line become "frontal" without altering its actual length.',
    },
    {
      text: 'To locate a point at a given TRUE distance along an oblique line, why can\'t you just measure that distance directly on the front or top view?',
      options: [
        'Because both views foreshorten the line, so a ruler measurement on either view does not correspond to the true 3D distance',
        'You can always measure it directly on either view with no issue',
        'Only the top view can be measured directly; the front view never can',
        'True distances cannot be located on oblique lines at all',
      ],
      answer: 0,
      explanation: 'Since an oblique line is foreshortened in both the front and top views, a ruler measurement in either view does not equal the real 3D distance — the true-length line must be used, then the point transferred back by similar triangles.',
    },
    {
      text: 'To find the TRUE ANGLE between two intersecting oblique lines, what three measurements are triangulated?',
      options: [
        'The true length of each line, plus the true 3D distance between their far endpoints',
        'The two front-view lengths only',
        'The two top-view lengths only',
        'The angle can be read directly from the top view with a protractor',
      ],
      answer: 0,
      explanation: 'Neither view shows the real angle directly. Triangulating with the two true lengths (found separately) and the true distance between the two far endpoints reconstructs the actual triangle, from which the true angle can be measured.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'oblique-true-length', 'line-classification', 'auxiliary-true-length', 'rotation-true-length',
    'point-at-true-distance', 'true-angle-two-lines', 'roof-strut-true-length', 'three-methods-comparison',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
