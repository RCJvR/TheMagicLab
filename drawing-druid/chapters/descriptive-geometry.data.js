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
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['oblique-true-length', 'line-classification'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
