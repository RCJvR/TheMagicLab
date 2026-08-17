// WRO 2026 RoboMission Senior — "Mosaic Masters" — scoring sheet data
// Mirrors the official Rules §4 Scoring Sheet exactly (Each / Max columns).
// Used to render a live points estimator alongside the mat.

window.WRO_SCORING = {
  maxScore: 233,
  categories: [
    {
      id: 'tools',
      name: '1. Provide the tools',
      items: [
        {
          id: 'trowel_rect',
          label: 'Rectangular trowel',
          type: 'tristate',
          states: [
            { value: 'none',    label: 'Not scored',        points: 0 },
            { value: 'partial', label: 'Partly in sponsor area',    points: 5 },
            { value: 'full',    label: 'Completely in sponsor area', points: 15 },
          ],
          max: 15,
        },
        {
          id: 'cement_bowl',
          label: 'Cement bowl',
          type: 'tristate',
          states: [
            { value: 'none',    label: 'Not scored',        points: 0 },
            { value: 'partial', label: 'Partly in parking space',    points: 5 },
            { value: 'full',    label: 'Completely in parking space', points: 15 },
          ],
          max: 15,
        },
        {
          id: 'trowel_masonry',
          label: 'Masonry trowel',
          type: 'tristate',
          states: [
            { value: 'none',    label: 'Not scored',        points: 0 },
            { value: 'partial', label: 'Partly in start area',    points: 5 },
            { value: 'full',    label: 'Completely in start area', points: 15 },
          ],
          max: 15,
        },
      ],
    },
    {
      id: 'mosaic',
      name: '2. Put the mosaic in place',
      items: [
        {
          id: 'mosaic_correct',
          label: 'Mosaic tiles correctly placed',
          type: 'counter',
          points: 10,
          maxCount: 12,
          max: 120,
        },
        {
          id: 'mosaic_incorrect',
          label: 'Mosaic tiles incorrectly placed',
          type: 'counter',
          points: 5,
          maxCount: 12,
          max: 60,
        },
      ],
    },
    {
      id: 'cement',
      name: '3. Deliver the cement',
      items: [
        {
          id: 'cement_in',
          label: 'Cement elements completely in matching-colour area',
          type: 'counter',
          points: 1,
          maxCount: 40,
          max: 40,
        },
      ],
    },
    {
      id: 'barriers',
      name: '4. Bonus for barriers',
      items: [
        { id: 'barrier_tl', label: 'Top-left (red) not damaged/moved',    type: 'checkbox', points: 7, max: 7 },
        { id: 'barrier_tr', label: 'Top-right (black) not damaged/moved', type: 'checkbox', points: 7, max: 7 },
        { id: 'barrier_bl', label: 'Bottom-left (black) not damaged/moved', type: 'checkbox', points: 7, max: 7 },
        { id: 'barrier_br', label: 'Bottom-right (red) not damaged/moved', type: 'checkbox', points: 7, max: 7 },
      ],
    },
  ],
};
