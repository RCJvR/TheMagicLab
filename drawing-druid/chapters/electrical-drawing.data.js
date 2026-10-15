// Electrical Drawing — Chapter 9 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // ── 1. Simple Series Circuit ──
  (function () {
    const TL = [20, 30], TR = [130, 30], BR = [130, 110], BL = [20, 110];

    CONSTRUCTIONS['series-circuit'] = {
      id: 'series-circuit', title: 'Simple Series Circuit',
      summary: 'Draw a simple series circuit using correct symbols for a cell, switch, resistor and lamp, wired together with proper right-angled drafting lines.',
      bounds: { w: 165, h: 140 },
      workbookPrompt: 'Draw this series circuit diagram using correct component symbols and right-angled wiring: a cell, a switch, a resistor and a lamp.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the circuit\'s wiring as a simple rectangular loop, using straight lines that meet at right angles — the standard drafting style for circuit diagrams.',
          calloutAt: [75, 30],
          reveals: [
            { kind: 'line', p1: TL, p2: [50, 30], lineType: 'A' },
            { kind: 'line', p1: [70, 30], p2: TR, lineType: 'A' },
            { kind: 'line', p1: TR, p2: [130, 55], lineType: 'A' },
            { kind: 'line', p1: [130, 85], p2: BR, lineType: 'A' },
            { kind: 'line', p1: BR, p2: [85, 110], lineType: 'A' },
            { kind: 'line', p1: [65, 110], p2: BL, lineType: 'A' },
            { kind: 'line', p1: BL, p2: [20, 74], lineType: 'A' },
            { kind: 'line', p1: [20, 66], p2: TL, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Insert the CELL (battery) symbol on the left wire: one long line for the positive terminal, and one short, thicker line for the negative terminal.',
          calloutAt: [32, 70],
          reveals: [
            { kind: 'line', p1: [13, 66], p2: [27, 66], lineType: 'A' },
            { kind: 'line', p1: [16, 74], p2: [24, 74], lineType: 'A' },
            { kind: 'label', at: [30, 68], text: '+', size: 5, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 3,
          instruction: 'Insert the SWITCH symbol on the top wire: two terminal points joined by a diagonal "blade" line, drawn open (not touching the second terminal) to show the switch can break the circuit.',
          calloutAt: [60, 22],
          reveals: [
            { kind: 'circle', center: [50, 30], r: 1.5, lineType: 'A' },
            { kind: 'circle', center: [70, 30], r: 1.5, lineType: 'A' },
            { kind: 'line', p1: [50, 30], p2: [67, 18], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Insert the LAMP symbol on the bottom wire: a circle with a cross inside it.',
          calloutAt: [75, 128],
          reveals: [
            { kind: 'circle', center: [75, 110], r: 10, lineType: 'A' },
            { kind: 'line', p1: [68, 103], p2: [82, 117], lineType: 'A' },
            { kind: 'line', p1: [82, 103], p2: [68, 117], lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'Insert the RESISTOR symbol on the right wire: a plain rectangular box. Label every component to complete the diagram.',
          calloutAt: [148, 70],
          reveals: [
            { kind: 'polygon', points: [[124, 55], [136, 55], [136, 85], [124, 85]], lineType: 'A' },
            { kind: 'label', at: [10, 60], text: 'CELL', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [42, 12], text: 'SWITCH', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [60, 128], text: 'LAMP', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [140, 70], text: 'RESISTOR', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. Component Symbol Reference ──
  (function () {
    CONSTRUCTIONS['symbol-reference'] = {
      id: 'symbol-reference', title: 'Component Symbol Reference',
      summary: 'The standard symbols for a cell, switch, lamp, resistor, ammeter and voltmeter, drawn to correct proportions.',
      bounds: { w: 220, h: 90 },
      workbookPrompt: 'Draw each of these six standard component symbols to the correct proportions, and label each one.',
      steps: [
        {
          id: 1,
          instruction: 'CELL: one long line (positive terminal) and one short line (negative terminal). SWITCH: two terminals joined by an open diagonal blade.',
          calloutAt: [37, 30],
          reveals: [
            { kind: 'line', p1: [13, 46], p2: [27, 46], lineType: 'A' },
            { kind: 'line', p1: [16, 54], p2: [24, 54], lineType: 'A' },
            { kind: 'label', at: [10, 68], text: 'CELL', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'circle', center: [48, 50], r: 1.5, lineType: 'A' },
            { kind: 'circle', center: [62, 50], r: 1.5, lineType: 'A' },
            { kind: 'line', p1: [48, 50], p2: [59, 40], lineType: 'A' },
            { kind: 'label', at: [45, 68], text: 'SWITCH', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 2,
          instruction: 'LAMP: a circle with a cross inside. RESISTOR: a plain rectangular box.',
          calloutAt: [107, 30],
          reveals: [
            { kind: 'circle', center: [90, 50], r: 10, lineType: 'A' },
            { kind: 'line', p1: [83, 43], p2: [97, 57], lineType: 'A' },
            { kind: 'line', p1: [97, 43], p2: [83, 57], lineType: 'A' },
            { kind: 'label', at: [82, 68], text: 'LAMP', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'polygon', points: [[119, 40], [131, 40], [131, 60], [119, 60]], lineType: 'A' },
            { kind: 'label', at: [113, 68], text: 'RESISTOR', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 3,
          instruction: 'AMMETER: a circle labelled "A", measures current, always connected IN SERIES. VOLTMETER: a circle labelled "V", measures potential difference, always connected IN PARALLEL.',
          calloutAt: [178, 30],
          reveals: [
            { kind: 'circle', center: [160, 50], r: 10, lineType: 'A' },
            { kind: 'label', at: [160, 52], text: 'A', size: 6, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [148, 68], text: 'AMMETER', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'circle', center: [197, 50], r: 10, lineType: 'A' },
            { kind: 'label', at: [197, 52], text: 'V', size: 6, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'label', at: [183, 68], text: 'VOLTMETER', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ═══ Circuit symbols (IEC 60617 / SANS 60617 style) ═══
  // Each symbol sits on a straight wire through c, along 'h' (left to right), 'h-' (right to
  // left), 'v' (top to bottom) or 'v-'. u runs along the wire, w across it (w < 0 is up / left).
  const EL = {
    T(c, o) {
      return (u, w) => o === 'h' ? [c[0] + u, c[1] + w] : o === 'h-' ? [c[0] - u, c[1] + w] : o === 'v' ? [c[0] + w, c[1] + u] : [c[0] + w, c[1] - u];
    },
    line(P, a, b, lt) { return { kind: 'line', p1: P(a[0], a[1]), p2: P(b[0], b[1]), lineType: lt || 'A' }; },
    leads(P, hl, a) { return [EL.line(P, [-hl, 0], [-a, 0]), EL.line(P, [a, 0], [hl, 0])]; },
    // single cell: long plate (+) first along u
    cell(c, o) {
      const P = EL.T(c, o);
      return [...EL.leads(P, 6, 1.5), EL.line(P, [-1.5, -6], [-1.5, 6]), EL.line(P, [1.5, -3], [1.5, 3]),
        { kind: 'label', at: P(-5, -7), text: '+', size: 4, anchor: 'middle', color: '#94a3b8' }];
    },
    // battery of two cells in series
    battery(c, o) {
      const P = EL.T(c, o);
      return [EL.line(P, [-10, 0], [-6, 0]), EL.line(P, [-6, -6], [-6, 6]), EL.line(P, [-3, -3], [-3, 3]), EL.line(P, [-3, 0], [3, 0], 'hidden'),
        EL.line(P, [3, -6], [3, 6]), EL.line(P, [6, -3], [6, 3]), EL.line(P, [6, 0], [10, 0]),
        { kind: 'label', at: P(-9, -7), text: '+', size: 4, anchor: 'middle', color: '#94a3b8' }];
    },
    // single-pole switch, drawn open
    sw(c, o) {
      const P = EL.T(c, o);
      return [...EL.leads(P, 8, 6.2), { kind: 'circle', center: P(-5, 0), r: 1.2, lineType: 'A' }, { kind: 'circle', center: P(5, 0), r: 1.2, lineType: 'A' },
        EL.line(P, [-4.2, -0.8], [4.5, -5.5])];
    },
    // two-way switch: common on the left, contacts at w = -4 and +4 on the right; blade to 'up' or 'down'
    twoWay(c, o, to) {
      const P = EL.T(c, o), wt = to === 'down' ? 4 : -4;
      return [EL.line(P, [-8, 0], [-6.2, 0]), { kind: 'circle', center: P(-5, 0), r: 1.2, lineType: 'A' },
        { kind: 'circle', center: P(5, -4), r: 1.2, lineType: 'A' }, { kind: 'circle', center: P(5, 4), r: 1.2, lineType: 'A' },
        EL.line(P, [6.2, -4], [8, -4]), EL.line(P, [6.2, 4], [8, 4]), EL.line(P, [-3.9, Math.sign(wt) * 0.5], [3.9, wt * 0.8])];
    },
    lamp(c, o) {
      const P = EL.T(c, o), k = 5 * Math.SQRT1_2;
      return [...EL.leads(P, 9, 5), { kind: 'circle', center: P(0, 0), r: 5, lineType: 'A' }, EL.line(P, [-k, -k], [k, k]), EL.line(P, [-k, k], [k, -k])];
    },
    resistor(c, o) {
      const P = EL.T(c, o);
      return [...EL.leads(P, 10, 6), { kind: 'polygon', points: [P(-6, -2), P(6, -2), P(6, 2), P(-6, 2)], lineType: 'A' }];
    },
    rheostat(c, o) {
      const P = EL.T(c, o);
      return [...EL.resistor(c, o), EL.line(P, [-6, 5], [6, -5]), { kind: 'polyline', points: [P(3.2, -4.6), P(6, -5), P(5.2, -2.3)], lineType: 'A' }];
    },
    fuse(c, o) {
      const P = EL.T(c, o);
      return [...EL.resistor(c, o), EL.line(P, [-6, 0], [6, 0])];
    },
    meter(c, o, letter) {
      const P = EL.T(c, o);
      return [...EL.leads(P, 9, 5), { kind: 'circle', center: P(0, 0), r: 5, lineType: 'A' }, { kind: 'label', at: [P(0, 0)[0], P(0, 0)[1] + 1.6], text: letter, size: 4.6, anchor: 'middle', color: '#e8eaf2' }];
    },
    motor(c, o) {
      const P = EL.T(c, o);
      return [...EL.leads(P, 10, 6), { kind: 'circle', center: P(0, 0), r: 6, lineType: 'A' }, { kind: 'label', at: [P(0, 0)[0], P(0, 0)[1] + 1.8], text: 'M', size: 5, anchor: 'middle', color: '#e8eaf2' }];
    },
    // diode pointing along +u (conventional current flows from the triangle to the bar); led adds two arrows
    diode(c, o, led) {
      const P = EL.T(c, o);
      const out = [...EL.leads(P, 8, 3), { kind: 'polygon', points: [P(-3, -3.5), P(-3, 3.5), P(3, 0)], lineType: 'A' }, EL.line(P, [3, -3.5], [3, 3.5])];
      if (led) [[-1, 0], [2, 0]].forEach(([u]) => {
        out.push(EL.line(P, [u, -4.5], [u + 3, -8.5]), { kind: 'polyline', points: [P(u + 1.2, -8.2), P(u + 3, -8.5), P(u + 3.1, -6.7)], lineType: 'A' });
      });
      return out;
    },
    terminal(at) { return { kind: 'circle', center: at, r: 1.4, lineType: 'A' }; },
    dot(at) { return { kind: 'point', at }; },
    wire(pts) { return { kind: 'polyline', points: pts, lineType: 'A' }; },
    tag(at, text, anchor) { return { kind: 'label', at, text, size: 3.4, anchor: anchor || 'middle', color: '#fde047' }; },
  };

  // ── 3. Parallel circuit ──
  CONSTRUCTIONS['parallel-circuit'] = {
    id: 'parallel-circuit', title: 'Parallel Circuit with Fuse and Ammeter',
    summary: 'Two lamps in parallel, fed from a two-cell battery through a switch, a fuse and an ammeter in the main line. Junction dots show where the current divides.',
    bounds: { w: 200, h: 130 },
    workbookPrompt: 'Draw the circuit diagram: a 2-cell battery, a switch, a fuse and an ammeter in series in the main line, feeding two lamps connected in parallel. Use correct SANS/IEC symbols, right-angled wiring and junction dots, and label each component.',
    steps: [
      { id: 1, instruction: 'Lay out the main loop of the circuit as a rectangle with thick straight lines that meet at right angles. Leave gaps where the components go.',
        calloutAt: [90, 110],
        reveals: [EL.wire([[20, 60], [20, 30], [37, 30]]), EL.wire([[53, 30], [65, 30]]), EL.wire([[85, 30], [96, 30]]), EL.wire([[114, 30], [165, 30], [165, 61]]), EL.wire([[165, 79], [165, 110], [20, 110], [20, 80]])] },
      { id: 2, instruction: 'Draw the BATTERY on the left-hand wire: two cells in series, each a long line (+) and a short line (-). The long line of the first cell is the positive terminal.',
        calloutAt: [8, 70], reveals: EL.battery([20, 70], 'v') },
      { id: 3, instruction: 'Draw the SWITCH on the top wire, shown open: two small terminal circles and a blade that does not touch the second one.',
        calloutAt: [45, 20], reveals: EL.sw([45, 30], 'h') },
      { id: 4, instruction: 'Draw the FUSE next to it: a rectangle with a line through its full length. It protects the circuit, so it goes in the main line, close to the supply.',
        calloutAt: [75, 20], reveals: EL.fuse([75, 30], 'h') },
      { id: 5, instruction: 'Draw the AMMETER in the main line: a circle with an A. It is in SERIES, so it measures the total current.',
        calloutAt: [105, 20], reveals: EL.meter([105, 30], 'h', 'A') },
      { id: 6, instruction: 'Draw the second branch, from the top wire to the bottom wire, and put a junction dot at each point where the wires join.',
        calloutAt: [130, 50], reveals: [EL.wire([[130, 30], [130, 61]]), EL.wire([[130, 79], [130, 110]]), EL.dot([130, 30]), EL.dot([130, 110])] },
      { id: 7, instruction: 'Draw the two LAMPS, one in each branch: a circle with a cross. They are in PARALLEL, so each lamp gets the full battery voltage.',
        calloutAt: [148, 70], reveals: [...EL.lamp([130, 70], 'v'), ...EL.lamp([165, 70], 'v')] },
      { id: 8, instruction: 'Label every component (B1, S1, F1, A, L1, L2) next to its symbol.',
        calloutAt: [100, 122], reveals: [EL.tag([8, 72], 'B1', 'end'), EL.tag([45, 22], 'S1'), EL.tag([75, 24], 'F1'), EL.tag([105, 20], 'A'), EL.tag([138, 72], 'L1', 'start'), EL.tag([173, 72], 'L2', 'start')] },
    ],
  };

  // ── 4. Measuring circuit: rheostat, ammeter and voltmeter ──
  CONSTRUCTIONS['meters-circuit'] = {
    id: 'meters-circuit', title: 'Measuring Circuit: Ammeter, Voltmeter and Rheostat',
    summary: 'A resistor with a voltmeter across it and an ammeter in series, the current set by a rheostat (variable resistor). Shows where each meter must be connected.',
    bounds: { w: 220, h: 130 },
    workbookPrompt: 'Draw the circuit diagram: a battery, a switch, a rheostat and an ammeter in series with resistor R1 and a lamp; a voltmeter is connected across R1. Use correct symbols and label each component.',
    steps: [
      { id: 1, instruction: 'Lay out the main loop with right-angled wiring, leaving gaps for the components.',
        calloutAt: [95, 110],
        reveals: [EL.wire([[20, 60], [20, 30], [42, 30]]), EL.wire([[58, 30], [80, 30]]), EL.wire([[100, 30], [126, 30]]), EL.wire([[144, 30], [170, 30], [170, 60]]), EL.wire([[170, 80], [170, 110], [104, 110]]), EL.wire([[86, 110], [20, 110], [20, 80]])] },
      { id: 2, instruction: 'Draw the BATTERY on the left-hand wire, positive terminal at the top.',
        calloutAt: [8, 70], reveals: EL.battery([20, 70], 'v') },
      { id: 3, instruction: 'Draw the open SWITCH on the top wire.', calloutAt: [50, 20], reveals: EL.sw([50, 30], 'h') },
      { id: 4, instruction: 'Draw the RHEOSTAT (variable resistor): a resistor rectangle with an arrow drawn diagonally through it. Turning it changes the current in the circuit.',
        calloutAt: [90, 20], reveals: EL.rheostat([90, 30], 'h') },
      { id: 5, instruction: 'Draw the AMMETER in series in the main line.', calloutAt: [135, 20], reveals: EL.meter([135, 30], 'h', 'A') },
      { id: 6, instruction: 'Draw resistor R1 on the right-hand wire and the LAMP on the bottom wire.',
        calloutAt: [170, 70], reveals: [...EL.resistor([170, 70], 'v'), ...EL.lamp([95, 110], 'h')] },
      { id: 7, instruction: 'The VOLTMETER measures the voltage across R1, so it is connected in PARALLEL with it: take a wire off above R1 and back in below it, with a junction dot at each join.',
        calloutAt: [200, 50], reveals: [EL.wire([[170, 45], [200, 45], [200, 61]]), EL.wire([[200, 79], [200, 95], [170, 95]]), EL.dot([170, 45]), EL.dot([170, 95])] },
      { id: 8, instruction: 'Draw the voltmeter symbol: a circle with a V.', calloutAt: [212, 70], reveals: EL.meter([200, 70], 'v', 'V') },
      { id: 9, instruction: 'Label the components (B1, S1, RV1, A, R1, V, L1).',
        calloutAt: [100, 122], reveals: [EL.tag([8, 72], 'B1', 'end'), EL.tag([50, 20], 'S1'), EL.tag([90, 20], 'RV1'), EL.tag([135, 20], 'A'), EL.tag([162, 72], 'R1', 'end'), EL.tag([208, 72], 'V', 'start'), EL.tag([95, 122], 'L1')] },
    ],
  };

  // ── 5. Two-way switching (a staircase light) ──
  CONSTRUCTIONS['two-way-switching'] = {
    id: 'two-way-switching', title: 'Two-Way Switching: Staircase Light',
    summary: 'One lamp switched from two places, as on a staircase: two two-way switches joined by two strapper wires. Changing either switch turns the lamp on or off.',
    bounds: { w: 200, h: 130 },
    workbookPrompt: 'Draw the circuit diagram of a lamp controlled by two two-way switches (staircase switching), fed from a 230 V AC supply through a fuse in the live wire. Label the live and neutral, the switches, the strappers and the lamp.',
    steps: [
      { id: 1, instruction: 'Draw the supply terminals on the left: L (live) at the top and N (neutral) at the bottom.',
        calloutAt: [12, 75], reveals: [EL.terminal([20, 40]), EL.terminal([20, 110]), EL.tag([14, 41], 'L', 'end'), EL.tag([14, 111], 'N', 'end')] },
      { id: 2, instruction: 'The FUSE always goes in the LIVE wire, next to the supply. Draw the live wire with the fuse in it.',
        calloutAt: [42, 30], reveals: [EL.wire([[21.4, 40], [32, 40]]), ...EL.fuse([42, 40], 'h'), EL.wire([[52, 40], [70, 40]])] },
      { id: 3, instruction: 'Draw switch S1: a TWO-WAY switch. Its blade joins the common terminal (left) to one of two contacts (right). Here it is set to the upper contact.',
        calloutAt: [78, 28], reveals: EL.twoWay([78, 40], 'h', 'up') },
      { id: 4, instruction: 'Draw switch S2, the mirror image of S1, with its common terminal on the right. Set it to the LOWER contact.',
        calloutAt: [138, 28], reveals: EL.twoWay([138, 40], 'h-', 'down') },
      { id: 5, instruction: 'Join the two pairs of contacts with the two STRAPPER wires.',
        calloutAt: [108, 30], reveals: [EL.wire([[86, 36], [130, 36]]), EL.wire([[86, 44], [130, 44]])] },
      { id: 6, instruction: 'Take the switched live from the common of S2 to the lamp, and draw the LAMP.',
        calloutAt: [180, 70], reveals: [EL.wire([[146, 40], [170, 40], [170, 66]]), ...EL.lamp([170, 75], 'v')] },
      { id: 7, instruction: 'Return the neutral from the lamp to the N terminal.',
        calloutAt: [95, 116], reveals: [EL.wire([[170, 84], [170, 110], [21.4, 110]])] },
      { id: 8, instruction: 'Label the drawing. With S1 up and S2 down there is no path, so the lamp is OFF; changing EITHER switch completes the circuit.',
        calloutAt: [100, 60], reveals: [EL.tag([42, 33], 'F1'), EL.tag([78, 56], 'S1'), EL.tag([138, 56], 'S2'), EL.tag([108, 31], 'STRAPPERS / KOPPELDRADE'), EL.tag([178, 77], 'L1', 'start'),
          EL.tag([60, 126], '230 V AC SUPPLY / TOEVOER')] },
    ],
  };

  // ── 6. Motor with an LED indicator ──
  CONSTRUCTIONS['motor-led-circuit'] = {
    id: 'motor-led-circuit', title: 'DC Motor with an LED Indicator',
    summary: 'A DC motor switched from a battery through a fuse, with an LED and its series resistor in parallel to show when the motor is on.',
    bounds: { w: 200, h: 140 },
    workbookPrompt: 'Draw the circuit diagram: a battery, a switch and a fuse supply a DC motor. An LED with a series resistor is connected in parallel with the motor as an "on" indicator. Use correct symbols and label each component.',
    steps: [
      { id: 1, instruction: 'Lay out the main loop and the LED branch on the right, with gaps for the components.',
        calloutAt: [90, 120],
        reveals: [EL.wire([[20, 65], [20, 30], [42, 30]]), EL.wire([[58, 30], [75, 30]]), EL.wire([[95, 30], [160, 30], [160, 45]]), EL.wire([[160, 65], [160, 87]]), EL.wire([[160, 103], [160, 120], [20, 120], [20, 85]])] },
      { id: 2, instruction: 'Draw the BATTERY on the left-hand wire, positive at the top.', calloutAt: [8, 75], reveals: EL.battery([20, 75], 'v') },
      { id: 3, instruction: 'Draw the open SWITCH and the FUSE on the top wire.', calloutAt: [65, 20], reveals: [...EL.sw([50, 30], 'h'), ...EL.fuse([85, 30], 'h')] },
      { id: 4, instruction: 'Draw the motor branch from the top wire to the bottom wire, with junction dots where it joins.',
        calloutAt: [115, 45], reveals: [EL.wire([[115, 30], [115, 65]]), EL.wire([[115, 85], [115, 120]]), EL.dot([115, 30]), EL.dot([115, 120])] },
      { id: 5, instruction: 'Draw the MOTOR: a circle with an M.', calloutAt: [128, 75], reveals: EL.motor([115, 75], 'v') },
      { id: 6, instruction: 'Draw the series RESISTOR in the LED branch. It limits the current, so the LED does not burn out.', calloutAt: [172, 55], reveals: EL.resistor([160, 55], 'v') },
      { id: 7, instruction: 'Draw the LED: a diode (a triangle pointing the way current flows, against a bar) with two small arrows pointing away for the light. The triangle points down, from + towards -.',
        calloutAt: [172, 95], reveals: EL.diode([160, 95], 'v', true) },
      { id: 8, instruction: 'Label the components (B1, S1, F1, M1, R1, LED1).',
        calloutAt: [100, 132], reveals: [EL.tag([8, 77], 'B1', 'end'), EL.tag([50, 20], 'S1'), EL.tag([85, 24], 'F1'), EL.tag([125, 77], 'M1', 'start'), EL.tag([152, 57], 'R1', 'end'), EL.tag([145, 97], 'LED1', 'end')] },
    ],
  };

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'On a cell (battery) symbol, which terminal is represented by the LONG line?',
      options: ['The positive terminal', 'The negative terminal', 'Neither — both lines mean the same thing', 'It depends on the current direction'],
      answer: 0,
      explanation: 'The long line of a cell symbol represents the positive terminal; the short line represents the negative terminal.',
    },
    {
      text: 'How is an OPEN switch shown in a circuit diagram?',
      options: [
        'As two terminal points joined by a diagonal line that does not quite touch the second terminal',
        'As a solid, unbroken line',
        'As a circle with a cross inside',
        'Switches are never shown open on a diagram',
      ],
      answer: 0,
      explanation: 'An open switch is drawn as two terminals with a diagonal "blade" line that stops short of the second terminal, showing the circuit is broken at that point.',
    },
    {
      text: 'What does the standard "circle with a cross" symbol represent?',
      options: ['A lamp (light bulb)', 'A switch', 'A resistor', 'A cell'],
      answer: 0,
      explanation: 'A circle with a cross (X) inside it is the standard symbol for a lamp or light bulb.',
    },
    {
      text: 'An ammeter must always be connected:',
      options: ['In series with the component whose current is being measured', 'In parallel with the component', 'Directly across the cell only', 'It can be connected anywhere in the circuit'],
      answer: 0,
      explanation: 'An ammeter measures current, and current must flow through it, so it is always connected in series in the circuit branch being measured.',
    },
    {
      text: 'A voltmeter must always be connected:',
      options: ['In parallel across the component whose potential difference is being measured', 'In series with the component', 'It cannot be used in a circuit diagram', 'The same way as an ammeter'],
      answer: 0,
      explanation: 'A voltmeter measures the potential difference (voltage) across a component, so it is connected in parallel with that component, not in series.',
    },
    {
      text: 'In a circuit diagram, why are wires drawn as straight lines meeting at right angles, rather than freehand curves?',
      options: [
        'It is the standard drafting convention for schematic/circuit diagrams, making them clear and easy to read',
        'Because current can only flow in straight lines',
        'Curved wires are technically impossible to manufacture',
        'There is no reason — it is purely a stylistic choice with no convention behind it',
      ],
      answer: 0,
      explanation: 'Circuit diagrams are schematic drawings, not physical layouts — straight lines at right angles is simply the accepted drafting convention that keeps them clean and unambiguous.',
    },
    {
      text: 'In a 230 V circuit, in which wire must the fuse (and the switch) be placed?',
      options: ['The live wire', 'The neutral wire', 'The earth wire', 'It makes no difference'],
      answer: 0,
      explanation: 'The fuse and switches go in the LIVE wire, so that when the fuse blows or the switch is off, the appliance is disconnected from the live supply and is safe to touch.',
    },
    {
      text: 'In two-way (staircase) switching, what joins the two two-way switches?',
      options: ['Two strapper wires between their contacts', 'A single neutral wire', 'The earth wire', 'A fuse'],
      answer: 0,
      explanation: 'The two contacts of one two-way switch are joined to the two contacts of the other by two strapper wires; the lamp is on when both blades select the same strapper.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['symbol-reference', 'series-circuit', 'parallel-circuit', 'meters-circuit', 'motor-led-circuit', 'two-way-switching'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
