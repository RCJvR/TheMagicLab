// Practical Assessment Task — Chapter 10 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // ── 1. The Design Process ──
  (function () {
    CONSTRUCTIONS['design-process'] = {
      id: 'design-process', title: 'The Design Process',
      summary: 'The five stages every PAT scenario moves through: Investigate, Design, Make, Evaluate, Communicate.',
      bounds: { w: 210, h: 110 },
      workbookPrompt: 'For your own PAT scenario, write one sentence describing what you will do at each of the five Design Process stages.',
      steps: [
        {
          id: 1,
          instruction: 'INVESTIGATE — research existing products, materials, safety and cost, and clearly identify the exact problem you are solving before you design anything.',
          calloutAt: [20, 60],
          reveals: [
            { kind: 'circle', center: [18, 58], r: 6, lineType: 'A' },
            { kind: 'line', p1: [23, 63], p2: [29, 69], lineType: 'A' },
            { kind: 'label', at: [20, 100], text: '1. INVESTIGATE', size: 4, anchor: 'middle', color: '#fde047' },
          ],
        },
        {
          id: 2,
          instruction: 'DESIGN — generate at least THREE different ideas or concepts, and sketch each one clearly with comprehensive freehand drawings.',
          calloutAt: [60, 60],
          reveals: [
            { kind: 'line', p1: [30, 60], p2: [48, 60], lineType: 'construction' },
            { kind: 'polygon', points: [[48, 52], [54, 52], [54, 68], [48, 68]], lineType: 'A' },
            { kind: 'polygon', points: [[57, 52], [63, 52], [63, 68], [57, 68]], lineType: 'A' },
            { kind: 'polygon', points: [[66, 52], [72, 52], [72, 68], [66, 68]], lineType: 'A' },
            { kind: 'label', at: [60, 100], text: '2. DESIGN (3 ideas)', size: 4, anchor: 'middle', color: '#fde047' },
          ],
        },
        {
          id: 3,
          instruction: 'MAKE — once the best idea is selected, produce the full set of accurate instrument (or CAD) drawings needed to communicate it completely. This is where every drawing skill from the earlier chapters comes together.',
          calloutAt: [100, 60],
          reveals: [
            { kind: 'line', p1: [72, 60], p2: [90, 60], lineType: 'construction' },
            { kind: 'polygon', points: [[92, 52], [108, 52], [108, 62], [92, 62]], lineType: 'A' },
            { kind: 'polygon', points: [[92, 66], [108, 66], [108, 76], [92, 76]], lineType: 'A' },
            { kind: 'label', at: [100, 100], text: '3. MAKE', size: 4, anchor: 'middle', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'EVALUATE — critically assess your solution against the original design brief\'s specifications and constraints, honestly noting what works and what does not.',
          calloutAt: [140, 60],
          reveals: [
            { kind: 'line', p1: [108, 60], p2: [130, 60], lineType: 'construction' },
            { kind: 'polygon', points: [[130, 50], [150, 50], [150, 70], [130, 70]], lineType: 'A' },
            { kind: 'line', p1: [133, 55], p2: [138, 55], lineType: 'B' },
            { kind: 'line', p1: [133, 60], p2: [138, 60], lineType: 'B' },
            { kind: 'line', p1: [133, 65], p2: [138, 65], lineType: 'B' },
            { kind: 'label', at: [140, 100], text: '4. EVALUATE', size: 4, anchor: 'middle', color: '#fde047' },
          ],
        },
        {
          id: 5,
          instruction: 'COMMUNICATE — present your finished solution clearly, including all supporting research, sketches, drawings and your honest evaluation.',
          calloutAt: [180, 60],
          reveals: [
            { kind: 'line', p1: [150, 60], p2: [170, 60], lineType: 'construction' },
            { kind: 'polygon', points: [[170, 50], [190, 50], [190, 70], [170, 70]], lineType: 'A' },
            { kind: 'line', p1: [170, 55], p2: [190, 55], lineType: 'A' },
            { kind: 'label', at: [180, 100], text: '5. COMMUNICATE', size: 4, anchor: 'middle', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. PAT: Three Phases ──
  (function () {
    CONSTRUCTIONS['pat-phases'] = {
      id: 'pat-phases', title: 'PAT: Three Phases',
      summary: 'The Practical Assessment Task is completed across three phases spread through the year, each with its own deliverables.',
      bounds: { w: 280, h: 100 },
      workbookPrompt: 'List the deliverables required for each of the three PAT phases, and note which term each phase falls in.',
      steps: [
        {
          id: 1,
          instruction: 'PHASE 1 (Term 2) — Formulate a design brief with clear specifications and constraints, conduct research, generate THREE ideas, and select the best solution.',
          calloutAt: [40, 60],
          reveals: [
            { kind: 'polygon', points: [[10, 40], [70, 40], [70, 80], [10, 80]], lineType: 'A' },
            { kind: 'label', at: [40, 55], text: 'PHASE 1', size: 5, anchor: 'middle', color: '#fde047' },
            { kind: 'label', at: [40, 65], text: 'Brief, Research,', size: 3.4, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [40, 71], text: '3 Ideas, Select', size: 3.4, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [40, 90], text: 'TERM 2', size: 3.6, anchor: 'middle', color: '#e8eaf2' },
          ],
        },
        {
          id: 2,
          instruction: 'PHASE 2 (Term 3) — Complete ALL the instrument and/or CAD presentation drawings required by the selected scenario.',
          calloutAt: [140, 60],
          reveals: [
            { kind: 'line', p1: [70, 60], p2: [110, 60], lineType: 'construction' },
            { kind: 'polygon', points: [[110, 40], [170, 40], [170, 80], [110, 80]], lineType: 'A' },
            { kind: 'label', at: [140, 55], text: 'PHASE 2', size: 5, anchor: 'middle', color: '#fde047' },
            { kind: 'label', at: [140, 65], text: 'Instrument /', size: 3.4, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [140, 71], text: 'CAD Drawings', size: 3.4, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [140, 90], text: 'TERM 3', size: 3.6, anchor: 'middle', color: '#e8eaf2' },
          ],
        },
        {
          id: 3,
          instruction: 'PHASE 3 (Term 3) — Compile the complete PAT portfolio, bringing every phase\'s work together, ready for final assessment.',
          calloutAt: [240, 60],
          reveals: [
            { kind: 'line', p1: [170, 60], p2: [210, 60], lineType: 'construction' },
            { kind: 'polygon', points: [[210, 40], [270, 40], [270, 80], [210, 80]], lineType: 'A' },
            { kind: 'label', at: [240, 55], text: 'PHASE 3', size: 5, anchor: 'middle', color: '#fde047' },
            { kind: 'label', at: [240, 65], text: 'Portfolio', size: 3.4, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [240, 71], text: 'Compilation', size: 3.4, anchor: 'middle', color: '#94a3b8' },
            { kind: 'label', at: [240, 90], text: 'TERM 3', size: 3.6, anchor: 'middle', color: '#e8eaf2' },
          ],
        },
      ],
    };
  })();

  // ── Design brief checklist (used by the Explore tab) ──
  const BRIEF_CHECKLIST = [
    'States the problem clearly, in one or two sentences',
    'Lists at least three specifications (what the solution MUST do)',
    'Lists at least two constraints (limits — e.g. size, cost, materials)',
    'Names the target user or client',
    'Includes a size and/or cost limit',
    'Is based on evidence from your research, not just opinion',
  ];

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'What are the five stages of the Design Process, in order?',
      options: [
        'Investigate, Design, Make, Evaluate, Communicate',
        'Research, Sketch, Build, Test, Sell',
        'Design, Investigate, Communicate, Make, Evaluate',
        'Plan, Draw, Cut, Assemble, Paint',
      ],
      answer: 0,
      explanation: 'The Design Process used throughout CAPS Technology/EGD PAT work is: Investigate, Design, Make, Evaluate, Communicate.',
    },
    {
      text: 'During the DESIGN stage, how many different ideas should you generate at minimum?',
      options: ['Three', 'Just one — your best idea', 'Ten', 'It does not matter, any number is fine'],
      answer: 0,
      explanation: 'CAPS requires learners to generate and sketch at least THREE different ideas or concepts before selecting the best one.',
    },
    {
      text: 'In a design brief, what is the difference between a "specification" and a "constraint"?',
      options: [
        'A specification is something the solution MUST do; a constraint is a LIMIT placed on the solution (e.g. cost, size, materials)',
        'They mean exactly the same thing',
        'A specification is a limit; a constraint is a requirement — the opposite way round',
        'Constraints only apply to civil drawings, never other scenarios',
      ],
      answer: 0,
      explanation: 'Specifications describe what the solution must achieve or include; constraints are the limits it must work within, such as budget, size, or available materials.',
    },
    {
      text: 'In which PAT phase are the final instrument and/or CAD presentation drawings completed?',
      options: ['Phase 2', 'Phase 1', 'Phase 3', 'They are completed in Phase 1, before the idea is even chosen'],
      answer: 0,
      explanation: 'Phase 2 (in Term 3) is where all the required instrument or CAD presentation drawings for the selected scenario are completed.',
    },
    {
      text: 'What happens during Phase 1 of the PAT?',
      options: [
        'Formulating the design brief, conducting research, generating three ideas, and selecting the best solution',
        'Compiling the final portfolio',
        'Completing all instrument drawings',
        'Marking the other learners\' work',
      ],
      answer: 0,
      explanation: 'Phase 1 (Term 2) covers the early Design Process stages: writing the brief, researching, generating three ideas, and selecting the strongest one.',
    },
    {
      text: 'Why is the EVALUATE stage important, even after a solution has already been built?',
      options: [
        'It honestly checks the solution against the original brief\'s specifications and constraints, showing what worked and what did not',
        'It is just a formality with no real purpose',
        'It replaces the need for the MAKE stage',
        'It only applies if the solution completely failed',
      ],
      answer: 0,
      explanation: 'Evaluation is a critical, honest comparison between what was actually achieved and the original design brief — it is core evidence of the design thinking behind the PAT, not just a formality.',
    },
    {
      text: 'What is compiled during Phase 3 of the PAT?',
      options: [
        'The complete portfolio, bringing together the work from every phase',
        'Only the final instrument drawings, discarding earlier research',
        'A brand new design brief',
        'Nothing — Phase 3 does not exist',
      ],
      answer: 0,
      explanation: 'Phase 3 is where the complete PAT portfolio is compiled, bringing together the design brief, research, ideas, drawings and evaluation from every earlier phase.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['design-process', 'pat-phases'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
  global.BRIEF_CHECKLIST = BRIEF_CHECKLIST;
})(window);
