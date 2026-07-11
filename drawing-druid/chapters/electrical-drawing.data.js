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
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['series-circuit', 'symbol-reference'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
