/* The Magic Lab — the human eye (horizontal section, light enters from the left) and ear (vertical section,
 * outer ear on the left), labelled the way exam papers show them.
 * Usage: const fig = MLSense.mount(el, { organ: 'eye' | 'ear', onPick: id => … }); fig.focus('lens');
 */
(function () {
  'use strict';
  const AF = /\.af\.html$/i.test(location.pathname) || /^af/i.test(document.documentElement.lang || '');
  const L = (en, af) => (AF ? af : en);
  const NS = 'http://www.w3.org/2000/svg';
  function el(tag, a, p) { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  const ring = (r, a0, a1) => { // arc of radius r round (290,150), angles in degrees from +x (back of the eye), drawn through the back
    const P = a => [290 + r * Math.cos(a * Math.PI / 180), 150 - r * Math.sin(a * Math.PI / 180)];
    const s = P(a0), e = P(a1);
    return 'M' + s.map(v => v.toFixed(1)) + ' A' + r + ',' + r + ' 0 1,0 ' + e.map(v => v.toFixed(1));
  };
  function spiral(cx, cy, r0, r1, turns, a0) {
    let d = '';
    for (let i = 0; i <= 120; i++) {
      const t = i / 120, a = a0 + t * turns * Math.PI * 2, r = r0 + (r1 - r0) * t;
      d += (i ? ' L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1);
    }
    return d;
  }

  // part: [id, colour, kind ('fill'|'stroke:w'), path, label en, label af, anchor x, anchor y, label x, label y, text-anchor]
  const EYE = [
    ['vitreous', '#93c5fd', 'fill:.12', 'M221,92 A90,90 0 1,1 221,208 C238,180 238,120 221,92Z', 'vitreous humour', 'glasvogtigheid', 300, 140, 480, 125, 'start'],
    ['aqueous', '#7dd3fc', 'fill:.25', 'M194.7,95 C165,110 158,190 194.7,205 L204,170 L216,170 C222,160 222,140 216,130 L204,130Z', 'aqueous humour', 'waterige vog', 182, 118, 140, 70, 'end'],
    ['sclera', '#e2e8f0', 'stroke:8', ring(110, -150, 150), 'sclera', 'sklera', 345, 55, 480, 65, 'start'],
    ['choroid', '#a16207', 'stroke:6', ring(101, -146, 146), 'choroid', 'vaatvlies (choroïed)', 310, 50, 480, 40, 'start'],
    ['retina', '#f472b6', 'stroke:6', ring(94, -142, 142), 'retina', 'retina', 368, 97, 480, 95, 'start'],
    ['cornea', '#93c5fd', 'stroke:4', 'M194.7,95 C165,110 158,190 194.7,205', 'cornea', 'kornea', 166, 150, 140, 125, 'end'],
    ['ciliary', '#c084fc', 'fill:.85', 'M198,98 L214,106 L218,116 L206,112Z M198,202 L214,194 L218,184 L206,188Z', 'ciliary body', 'siliêre liggaam', 207, 191, 140, 235, 'end'],
    ['suspensory', '#e9d5ff', 'stroke:1.2', 'M216,112 L224,116 M216,114 L222,121 M214,113 L226,113 M216,188 L224,184 M216,186 L222,179 M214,187 L226,187', 'suspensory ligaments', 'ophangligamente', 219, 186, 140, 210, 'end'],
    ['lens', '#c4b5fd', 'fill:.75', 'M226,112 C244,124 244,176 226,188 C208,176 208,124 226,112Z', 'lens', 'lens', 228, 165, 140, 175, 'end'],
    ['iris', '#60a5fa', 'fill:.9', 'M195,97 L206,100 L207,130 L201,130Z M195,203 L206,200 L207,170 L201,170Z', 'iris', 'iris', 202, 110, 140, 95, 'end'],
    ['pupil', '#0f172a', 'stroke:1', 'M204,131 L204,169', 'pupil (opening)', 'pupil (opening)', 204, 150, 140, 150, 'end'],
    ['fovea', '#fde047', 'fill:.95', 'M381,144 C387,146 387,154 381,156 C384,152 384,148 381,144Z', 'fovea (yellow spot)', 'fovea (geelvlek)', 384, 150, 480, 150, 'start'],
    ['opticnerve', '#fbbf24', 'fill:.8', 'M392,172 L470,178 L470,200 L390,194Z', 'optic nerve', 'optiese senuwee', 450, 192, 480, 210, 'start'],
    ['blindspot', '#f8fafc', 'fill:.9', 'M383,176 L389,176 L389,190 L383,190Z', 'blind spot', 'blindekol', 386, 183, 480, 180, 'start'],
  ];
  const EAR = [
    ['bone', '#64748b', 'fill:.16', 'M206,40 L470,40 L470,270 L300,270 C270,240 250,214 232,196 L206,190Z'],
    ['pinna', '#f9a8d4', 'fill:.5', 'M60,40 C30,40 18,80 22,120 C26,160 40,190 46,220 C50,240 64,250 74,240 C82,230 76,212 80,196 C84,180 92,170 92,150 L92,140 C96,100 92,60 60,40Z', 'pinna', 'oorskulp', 40, 90, 50, 18, 'middle'],
    ['canal', '#fda4af', 'stroke:2', 'M88,134 C130,126 180,128 222,126 M90,168 C136,172 186,170 230,174', 'auditory canal', 'gehoorgang', 150, 150, 150, 18, 'middle'],
    ['eardrum', '#c4b5fd', 'stroke:4', 'M220,124 C226,140 230,160 232,176', 'eardrum (tympanic membrane)', 'trommelvlies (timpaniese membraan)', 228, 160, 120, 292, 'middle'],
    ['middle', '#0b1220', 'fill:1', 'M232,112 L300,108 C306,130 306,170 300,192 L234,190Z'],
    ['ossicles', '#fbbf24', 'stroke:4', 'M226,130 L246,120 C252,116 258,118 258,124 M258,124 C266,118 274,122 274,132 L270,142 M270,142 L292,140 M270,150 L292,152 M292,138 L292,154 M270,142 L270,150',
      'ossicles (hammer, anvil, stirrup)', 'gehoorbeentjies (hamer, aambeeld, stiebeuel)', 262, 124, 262, 34, 'middle'],
    ['oval', '#fb923c', 'fill:.95', 'M298,139 C302,139 303,153 298,153 C295,153 295,139 298,139Z', 'oval window', 'ovaal venster', 299, 146, 490, 135, 'start'],
    ['round', '#fb923c', 'fill:.95', 'M300,170 C304,170 305,182 300,182 C297,182 297,170 300,170Z', 'round window', 'ronde venster', 301, 176, 490, 250, 'start'],
    ['eustachian', '#94a3b8', 'stroke:8', 'M262,190 C258,220 246,250 228,276', 'Eustachian tube', 'Eustachiusbuis', 240, 258, 250, 292, 'start'],
    ['semicircular', '#4ade80', 'stroke:5', 'M318,120 C300,90 310,56 336,56 C362,56 364,92 340,120 M332,118 C340,80 376,70 392,92 C404,110 380,130 344,128 M340,138 C362,124 390,134 386,150 C382,166 356,160 342,150',
      'semicircular canals', 'halfsirkelvormige kanale', 360, 60, 380, 18, 'middle'],
    ['vestibule', '#86efac', 'fill:.7', 'M300,128 C310,116 334,116 342,128 C350,142 344,160 330,164 C316,168 302,160 300,128Z', 'vestibule (utriculus, sacculus)', 'voorhof (utrikulus, sakkulus)', 326, 140, 490, 110, 'start'],
    ['cochlea', '#f472b6', 'stroke:7', spiral(372, 204, 34, 5, 2.5, Math.PI * 1.1), 'cochlea', 'koglea', 404, 210, 490, 220, 'start'],
    ['auditorynerve', '#fde047', 'stroke:5', 'M372,204 C400,196 430,176 470,172 M342,140 C380,152 420,162 470,166', 'auditory nerve', 'gehoorsenuwee', 450, 170, 490, 170, 'start'],
  ];

  function mount(host, opts) {
    opts = opts || {};
    const eye = opts.organ !== 'ear', parts = eye ? EYE : EAR;
    host.innerHTML = '';
    host.setAttribute('data-ml-no-theme', '');
    const svg = el('svg', { viewBox: eye ? '0 0 640 300' : '0 0 660 300', role: 'img',
      'aria-label': eye ? L('Section through the human eye', 'Snit deur die menslike oog') : L('Section through the human ear', 'Snit deur die menslike oor') }, host);
    svg.style.cssText = 'display:block;width:100%;height:auto;max-height:420px;background:#040710;border-radius:10px;font-family:"Cabinet Grotesk",system-ui,sans-serif';
    if (eye) { // light rays focused on the fovea
      el('path', { d: 'M150,118 L166,132 L226,136 L383,150 M150,182 L166,168 L226,164 L383,150', fill: 'none', stroke: 'rgba(253,224,71,.45)', 'stroke-width': 1, 'stroke-dasharray': '4 3' }, svg);
    }
    const els = {};
    parts.forEach(p => {
      const [id, col, kind, d] = p, g = el('g', {}, svg);
      const [k, v] = kind.split(':');
      if (k === 'fill') el('path', { d: d, fill: col, 'fill-opacity': v, stroke: v < 0.3 ? 'none' : col, 'stroke-width': 1 }, g);
      else el('path', { d: d, fill: 'none', stroke: col, 'stroke-width': v, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
      if (p[4] && opts.onPick) { g.style.cursor = 'pointer'; g.addEventListener('click', () => opts.onPick(id)); }
      els[id] = { g: g, p: p };
    });
    const labels = el('g', {}, svg);
    const note = document.createElement('div');
    note.style.cssText = 'margin-top:8px;font-size:12px;color:rgba(210,218,245,.7)';
    note.textContent = eye ? L('Horizontal section; light enters from the left and is focused on the fovea.', 'Horisontale snit; lig kom van links in en word op die fovea gefokus.')
      : L('Vertical section; outer ear on the left, inner ear (in the skull bone) on the right.', 'Vertikale snit; buitenste oor links, binneoor (in die skedelbeen) regs.');
    host.appendChild(note);

    function focus(id) {
      labels.innerHTML = '';
      for (const k in els) {
        const on = !id || k === id, p = els[k].p;
        els[k].g.setAttribute('opacity', !p[4] || on ? 1 : 0.45);
        if (!p[4]) continue;
        const [, , , , en, af, ax, ay, lx, ly, anchor] = p, sel = k === id;
        const ey = anchor === 'middle' ? (ly < 150 ? ly + 4 : ly - 12) : ly;
        const ex = anchor === 'end' ? lx + 2 : anchor === 'start' ? lx - 2 : lx;
        el('path', { d: 'M' + ax + ',' + ay + ' L' + ex + ',' + ey, stroke: sel ? '#ffffff' : 'rgba(226,232,240,.45)', 'stroke-width': sel ? 1.2 : 0.7, fill: 'none' }, labels);
        el('circle', { cx: ax, cy: ay, r: sel ? 2.4 : 1.5, fill: '#fff' }, labels);
        const t = el('text', { x: lx, y: ly + 4, 'font-size': 11, 'font-weight': sel ? 700 : 500, fill: sel ? '#ffffff' : 'rgba(226,232,240,.7)', 'text-anchor': anchor }, labels);
        t.textContent = L(en, af);
      }
    }
    focus(opts.focus);
    return { focus: focus };
  }

  window.MLSense = { mount: mount };
})();
