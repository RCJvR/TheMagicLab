// Mechanical Assemblies (Gr 11-12): sectional assemblies from given parts, built with the shared
// assembly() builder from mechanical-assemblies.data.js (window.AssemblyBuilder). Runs after
// mechanical-assemblies-2.data.js and adds to that page's CONSTRUCTIONS.
(function (global) {
  'use strict';
  const B = global.AssemblyBuilder, A = global.AssemblyKit;
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, t) => ({ kind: 'line', p1, p2, lineType: t || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3.2, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const arc = (c, r, n) => Array.from({ length: n + 1 }, (_, i) => { const a = Math.PI - Math.PI * i / n; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
  const add = cfg => { B.assembly(Object.assign({ into: C }, cfg)); ORDER.push(cfg.id + '-parts', cfg.id); };

  // ── Pulley pedestal: a shaft in two flanged bushes, with a flat-belt pulley (Gr 11) ──
  (function () {
    const D = 16;
    const bush = [[0, 8], [24, 8], [24, 12], [4, 12], [4, 17], [0, 17]];            // flange at x = 0..4
    const shaft = [[0, 0], [0, 14], [8, 14], [8, 8], [112, 8], [112, 0]];
    const pulley = [[0, 8], [24, 8], [24, 14], [16, 14], [16, 36], [26, 36], [26, 40], [-2, 40], [-2, 36], [8, 36], [8, 14], [0, 14]];
    const washer = [[0, 8.5], [3, 8.5], [3, 16], [0, 16]];
    const body = {
      name: 'PEDESTAL', mat: 'CAST IRON / GIETYSTER', callout: [-14, 6], nearX: 50,
      section: [
        [[-34, 0], [84, 0], [84, 12], [50, 12], [50, 38], [0, 38], [0, 12], [-34, 12]],
        [[0, 62], [50, 62], [50, 72], [0, 72]],
      ],
      hatch: 45,
      end: [
        [[-46, 0], [46, 0], [46, 12], [-46, 12], [-46, 0]],
        [[-22, 12], [-22, 50]].concat(arc([0, 50], 22, 12)).concat([[22, 12]]),
      ],
    };
    add({
      id: 'pulley-pedestal-assembly', title: 'Pulley Pedestal with Two Bushes (Gr 11)',
      summary: 'A shaft turning in two flanged bronze bushes in a cast-iron pedestal, with a flat-belt pulley on the end held by a washer and an M16 nut. Two bushes hatched opposite to the pedestal, a pulley hatched opposite to the bush it touches.',
      prompt: 'The parts of a pulley pedestal are given. Draw, full size in 3rd-angle projection: the sectional front view on A-A and the right view. Do not section the shaft, washer or nut; show three faces of the nut.',
      story: 'one bush is pressed into each end of the pedestal\'s bore with its flange outside, the shaft goes in from the left until its collar meets the left flange, and the pulley, washer and nut go on from the right.',
      ax: 70, by: 150, axisH: 50, rx: 262, cutTop: 96, axisFrom: -34, axisTo: 104, rvHalf: 52,
      body,
      parts: [
        { name: 'BUSH', mat: 'BRONZE / BRONS', qty: 2, profile: bush, at: -4, sectioned: true, hatch: 135, note: 'Part 2, the two flanged BUSHES: one pressed into each end of the Ø24 bore with its flange outside. Section both, hatched opposite to the pedestal.' },
        { name: 'BUSH', mat: 'BRONZE / BRONS', profile: bush, at: 30, flip: true, sectioned: true, hatch: 135, list: false, note: '' },
        { name: 'SHAFT', mat: 'MILD STEEL / SAGTE STAAL', profile: shaft, at: -12, sectioned: false, D, thread: [88, 100], note: 'Part 3, the SHAFT, from the left until its Ø28 collar meets the left flange. Shafts are never sectioned.' },
        { name: 'PULLEY', mat: 'CAST IRON / GIETYSTER', profile: pulley, at: 56, sectioned: true, hatch: 45, note: 'Part 4, the flat-belt PULLEY, on the shaft against the right flange: hub, web and crowned rim, sectioned. It touches the bush, so its hatching is opposite to the bush.' },
        { name: 'WASHER', mat: 'MILD STEEL / SAGTE STAAL', profile: washer, at: 80, sectioned: false, note: 'Part 5, the WASHER, and' },
        { name: 'M16 NUT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: 83, D, profile: [[0, 0], [12.8, 0]], note: 'part 6, the M16 NUT (12.8 thick, three faces showing).' },
      ],
      order: [[0, 1], [2], [3], [4, 5]],
      details: [
        { note: 'Part 1, the PEDESTAL (cast iron): a base 118 × 92 × 12 with an upright boss Ø44 × 50 long, its Ø24 bore 50 above the base. Front view and right view.', at: [60, 60],
          draw: () => {
            const F = (x, y) => [52 + x, 96 - y], R = (z, y) => [180 + z, 96 - y];
            return [
              { kind: 'polygon', points: [[-34, 0], [84, 0], [84, 12], [50, 12], [50, 72], [0, 72], [0, 12], [-34, 12]].map(([x, y]) => F(x, y)), lineType: 'A' },
              L(F(0, 38), F(50, 38), 'hidden'), L(F(0, 62), F(50, 62), 'hidden'), L(F(-4, 50), F(54, 50), 'centre'),
              ...body.end.map(pl => ({ kind: 'polyline', points: pl.map(([z, y]) => R(z, y)), lineType: 'A' })),
              { kind: 'circle', center: R(0, 50), r: 12, lineType: 'A' },
              L(R(-28, 50), R(28, 50), 'centre'), L(R(0, 20), R(0, 78), 'centre'),
              { kind: 'dimension', p1: F(-34, 0), p2: F(84, 0), offset: 7, text: '118' },
              { kind: 'dimension', p1: F(0, 72), p2: F(50, 72), offset: -5, text: '50' },
              { kind: 'dimension', p1: R(-46, 0), p2: R(46, 0), offset: 7, text: '92' },
              { kind: 'dimension', p1: R(46, 0), p2: R(46, 50), offset: -8, text: '50' },
              lbl(R(-26, 76), 'R22', { size: 2.8 }), lbl(R(14, 60), 'Ø24', { size: 2.8 }),
              lbl(F(25, 80), '(1) PEDESTAL', { size: 3, color: '#fde047' }),
            ];
          } },
        { note: 'Part 2, the BUSH (bronze, 2 off): Ø16 bore, Ø24 where it fits the pedestal, Ø34 flange 4 thick, 24 long.', at: [40, 128], draw: () => B.partDetail(2, 'BUSH', bush, 20, 126, { section: true }) },
        { note: 'Part 3, the SHAFT (mild steel): Ø28 collar 8 long, then Ø16 for 104, threaded M16 for the last 12.', at: [130, 128], draw: () => B.partDetail(3, 'SHAFT', shaft, 96, 130) },
        { note: 'Part 4, the PULLEY (cast iron): hub Ø28 × 24 with a Ø16 bore, web 8 thick, rim Ø80 × 28 with a slight crown.', at: [262, 50], draw: () => B.partDetail(4, 'PULLEY', pulley, 236, 12, { section: true }) },
        { note: 'Part 5, the WASHER (Ø32 × 3), and part 6, the M16 NUT (across flats 24, 12.8 thick).', at: [262, 136], draw: () => [...B.partDetail(5, 'WASHER', washer, 236, 130, { section: true }), ...A.nutEnd(312, 146, D, {}), lbl([312, 131], '(6) M16 NUT', { size: 3, color: '#fde047' })] },
      ],
      listAt: [16, 172],
    });
  })();

  // ── Idler gear on a fork (Gr 11) ──
  (function () {
    const D = 16;
    const fk = B.fork(70, 10, 56, 8, 30, 12, 10, 44);
    const pin = [[0, 0], [0, 13], [6, 13], [6, 8], [102, 8], [102, 0]];
    const bush = [[0, 8], [46, 8], [46, 12], [0, 12]];
    const gear = [[0, 12], [46, 12], [46, 20], [33, 20], [33, 30], [37, 30], [37, 38], [9, 38], [9, 30], [13, 30], [13, 20], [0, 20]];
    const washer = [[0, 8.5], [3, 8.5], [3, 16], [0, 16]];
    const pitch = (P, ay) => { const x0 = P(0, 0)[0]; return [-1, 1].map(s => L([x0 + 19, ay + s * 35], [x0 + 51, ay + s * 35], 'centre')); };
    add({
      id: 'idler-gear-assembly', title: 'Idler Gear on a Fork (Gr 11)',
      summary: 'A spur gear (idler) running on a bronze bush, on a pin between the two uprights of a fork. The gear is drawn conventionally: its pitch circle as a chain line, its teeth not drawn one by one.',
      prompt: 'The parts of an idler gear assembly are given. Draw, full size in 3rd-angle projection: the sectional front view on A-A and the right view. Show the gear conventionally with its pitch circle; do not section the pin, washer or nut.',
      story: 'the bush is pressed into the gear, the gear sits between the uprights, the pin goes through the left upright, the bush and the right upright, and the washer and nut hold it.',
      ax: 70, by: 150, axisH: 56, rx: 236, cutTop: 102, axisFrom: -10, axisTo: 100, rvHalf: 52,
      body: { name: 'FORK', mat: 'CAST IRON / GIETYSTER', callout: [5, 30], nearX: fk.nearX, section: fk.section, hatch: 45, end: fk.end },
      parts: [
        { name: 'PIN', mat: 'MILD STEEL / SAGTE STAAL', profile: pin, at: -6, sectioned: false, D, thread: [72, 96], note: 'Part 2, the PIN: its Ø26 head against the left upright, the Ø16 shank through both uprights. Never sectioned.' },
        { name: 'BUSH', mat: 'BRONZE / BRONS', profile: bush, at: 12, sectioned: true, hatch: 135, note: 'Part 3, the BUSH, on the pin between the uprights, sectioned and hatched opposite to the gear.' },
        { name: 'IDLER GEAR', mat: 'CAST STEEL / GIETSTAAL', profile: gear, at: 12, sectioned: true, hatch: 45, extra: pitch, note: 'Part 4, the IDLER GEAR around the bush: hub, web and toothed rim in section, drawn to the tips of the teeth (Ø76), with the pitch circle (Ø70) as a chain line. It must clear both uprights.' },
        { name: 'WASHER', mat: 'MILD STEEL / SAGTE STAAL', profile: washer, at: 70, sectioned: false, note: 'Part 5, the WASHER, and' },
        { name: 'M16 NUT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: 73, D, profile: [[0, 0], [12.8, 0]], note: 'part 6, the M16 NUT (three faces).' },
      ],
      order: [[0], [1], [2], [3, 4]],
      details: [
        { note: 'Part 1, the FORK (cast iron): a base with two uprights 10 thick, 50 apart inside, each with a Ø16 hole 56 above the base and a rounded top (R30). Front view and right view.', at: [40, 50],
          draw: () => [
            ...B.forkDetail(fk, 70, 56, 8, 30, 30, 100, 168, '(1) FORK'),
            { kind: 'dimension', p1: [20, 100], p2: [110, 100], offset: 7, text: '90' },
            { kind: 'dimension', p1: [40, 30], p2: [90, 30], offset: -5, text: '50' },
            { kind: 'dimension', p1: [212, 100], p2: [212, 44], offset: -8, text: '56' },
            lbl([200, 22], 'R30', { size: 2.8 }), lbl([180, 40], 'Ø16', { size: 2.8 }),
          ] },
        { note: 'Part 2, the PIN (mild steel): head Ø26 × 6, shank Ø16 × 96, threaded M16 for the last 24.', at: [40, 128], draw: () => B.partDetail(2, 'PIN', pin, 16, 122) },
        { note: 'Part 3, the BUSH (bronze): Ø16 bore, Ø24 outside, 46 long.', at: [170, 128], draw: () => B.partDetail(3, 'BUSH', bush, 150, 124, { section: true }) },
        { note: 'Part 4, the IDLER GEAR (cast steel): 35 teeth, module 2: pitch circle Ø70, tips Ø76; hub Ø40 × 46 with a Ø24 bore, web 6 thick, face width 28.', at: [262, 50],
          draw: () => [...B.partDetail(4, 'IDLER GEAR', gear, 236, 12, { section: true }), L([246, 15], [274, 15], 'centre'), L([246, 85], [274, 85], 'centre'), lbl([300, 102], 'PCD Ø70', { size: 2.6, color: '#94a3b8' })] },
        { note: 'Part 5, the WASHER (Ø32 × 3), and part 6, the M16 NUT (across flats 24, 12.8 thick).', at: [262, 136], draw: () => [...B.partDetail(5, 'WASHER', washer, 236, 130, { section: true }), ...A.nutEnd(312, 146, D, {}), lbl([312, 131], '(6) M16 NUT', { size: 3, color: '#fde047' })] },
      ],
      listAt: [16, 172],
    });
  })();
})(window);
