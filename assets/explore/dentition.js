/* The Magic Lab — mammal dentition, side view of the upper and lower jaw (front of the mouth on the left).
 *   herbivore (cow):  dental pad instead of upper incisors, lower incisors cropping against it, a diastema
 *                     (gap, no canines), broad ridged premolars and molars for grinding
 *   carnivore (lion): small incisors, long pointed canines, pointed premolars, blade-like carnassials
 *   omnivore (human): 2 incisors, 1 canine, 2 premolars, 3 molars in each half-jaw, all of similar height
 * Usage: MLTeeth.draw(el, 'herbivore' | 'carnivore' | 'omnivore')
 */
(function () {
  'use strict';
  const AF = /\.af\.html$/i.test(location.pathname) || /^af/i.test(document.documentElement.lang || '');
  const L = (en, af) => (AF ? af : en);
  const NS = 'http://www.w3.org/2000/svg';
  function el(tag, a, p) { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  const COL = { i: '#60a5fa', c: '#f87171', p: '#fbbf24', m: '#4ade80', k: '#c084fc', pad: '#f9a8d4' };
  const NAME = { i: L('incisors', 'snytande'), c: L('canine', 'oogtand'), p: L('premolars', 'voorkiestande'), m: L('molars', 'kiestande'),
    k: L('carnassial', 'skeurtand'), pad: L('dental pad', 'tandkussing') };
  const UG = 84, LG = 126; // upper and lower gum lines

  // tooth outline; dir = +1 for upper teeth (grow downwards), -1 for lower teeth (grow upwards)
  function tooth(t, x, w, h, dir) {
    const y = dir > 0 ? UG : LG, Y = f => y + dir * h * f;
    const P = {
      i: [[0, 0], [0.1, 1], [0.9, 1], [1, 0]],
      c: [[0, 0], [0.2, 0.6], [0.5, 1], [0.8, 0.6], [1, 0]],
      p: [[0, 0], [0, 0.7], [0.25, 1], [0.5, 0.75], [0.75, 1], [1, 0.7], [1, 0]],
      m: [[0, 0], [0, 0.85], [0.18, 1], [0.36, 0.88], [0.54, 1], [0.72, 0.88], [0.9, 1], [1, 0.9], [1, 0]],
      k: [[0, 0], [0.12, 0.5], [0.42, 1], [0.6, 0.45], [0.84, 0.72], [1, 0]],
    }[t];
    return 'M' + P.map(([a, b]) => (x + a * w).toFixed(1) + ',' + Y(b).toFixed(1)).join(' L') + 'Z';
  }

  const DIET = {
    herbivore: {
      title: L('Herbivore (cow)', 'Herbivoor (bees)'), front: 22, back: 300,
      upper: [['pad', 22, 40], ['p', 150, 18, 16], ['p', 170, 18, 16], ['p', 190, 18, 16], ['m', 212, 26, 18], ['m', 240, 26, 18], ['m', 268, 26, 18]],
      lower: [['i', 18, 8, 16, -18], ['i', 27, 8, 16, -14], ['i', 36, 8, 16, -10], ['i', 45, 8, 15, -6], ['p', 150, 18, 15], ['p', 170, 18, 15], ['p', 190, 18, 15],
        ['m', 212, 26, 17], ['m', 240, 26, 17], ['m', 268, 26, 17]],
      gap: [62, 146], note: L('Lower incisors crop grass against the hard dental pad; the diastema lets the tongue move food back to the grinding teeth.',
        'Onderste snytande sny gras teen die harde tandkussing af; die diasteem laat die tong toe om kos na die maaltande te beweeg.'),
    },
    carnivore: {
      title: L('Carnivore (lion)', 'Karnivoor (leeu)'), front: 40, back: 250,
      upper: [['i', 38, 8, 10], ['i', 47, 8, 10], ['i', 56, 8, 11], ['c', 76, 16, 40], ['p', 98, 16, 16], ['p', 116, 22, 20], ['k', 140, 40, 26], ['m', 182, 12, 8]],
      lower: [['i', 36, 7, 9], ['i', 44, 7, 9], ['i', 52, 7, 10], ['c', 60, 13, 30], ['p', 104, 16, 15], ['p', 122, 18, 18], ['k', 144, 36, 24]],
      note: L('Long canines stab and grip prey; the upper and lower carnassials slide past each other like scissors to slice meat.',
        'Lang oogtande steek en gryp prooi; die boonste en onderste skeurtande gly soos ’n skêr verby mekaar om vleis te sny.'),
    },
    omnivore: {
      title: L('Omnivore (human)', 'Omnivoor (mens)'), front: 70, back: 230,
      upper: [['i', 70, 13, 17], ['i', 84, 11, 15], ['c', 96, 12, 18], ['p', 109, 13, 14], ['p', 123, 13, 14], ['m', 137, 20, 13], ['m', 158, 20, 13], ['m', 179, 18, 12]],
      lower: [['i', 72, 10, 14], ['i', 83, 10, 14], ['c', 94, 12, 16], ['p', 107, 13, 13], ['p', 121, 13, 13], ['m', 135, 21, 13], ['m', 157, 21, 13], ['m', 179, 19, 12]],
      note: L('Each half-jaw has 2 incisors, 1 canine, 2 premolars and 3 molars: teeth for cutting, tearing and grinding.',
        'Elke halwe kaak het 2 snytande, 1 oogtand, 2 voorkiestande en 3 kiestande: tande om te sny, te skeur en te maal.'),
    },
  };

  function draw(host, id) {
    const D = DIET[id] || DIET.herbivore;
    host.innerHTML = '';
    host.setAttribute('data-ml-no-theme', '');
    const svg = el('svg', { viewBox: '0 0 320 256', role: 'img', 'aria-label': D.title }, host);
    svg.style.cssText = 'display:block;width:100%;height:auto;max-height:320px;font-family:"Cabinet Grotesk",system-ui,sans-serif';
    const bone = { fill: '#334155', 'fill-opacity': 0.55, stroke: 'rgba(210,218,245,.4)', 'stroke-width': 1.2 };
    // upper jaw (maxilla) and lower jaw (mandible with the ramus rising at the back)
    el('path', Object.assign({ d: 'M' + (D.front - 6) + ',' + UG + ' C' + (D.front - 8) + ',' + (UG - 20) + ' ' + (D.front + 10) + ',' + (UG - 30) + ' ' + (D.front + 30) + ',' + (UG - 32) +
      ' L' + D.back + ',' + (UG - 40) + ' L' + (D.back + 4) + ',' + UG + 'Z' }, bone), svg);
    el('path', Object.assign({ d: 'M' + (D.front - 6) + ',' + LG + ' C' + (D.front - 6) + ',' + (LG + 18) + ' ' + (D.front + 10) + ',' + (LG + 26) + ' ' + (D.front + 30) + ',' + (LG + 26) +
      ' L' + (D.back - 20) + ',' + (LG + 30) + ' C' + (D.back + 4) + ',' + (LG + 30) + ' ' + (D.back + 8) + ',' + (LG + 10) + ' ' + (D.back + 6) + ',' + (LG - 20) +
      ' L' + (D.back + 4) + ',' + (UG - 2) + ' L' + (D.back - 10) + ',' + (UG + 6) + ' L' + (D.back - 14) + ',' + LG + 'Z' }, bone), svg);
    const used = {};
    const put = (arr, dir) => arr.forEach(([t, x, w, h, tilt]) => {
      used[t] = used[t] || [];
      if (t === 'pad') {
        el('path', { d: 'M' + x + ',' + UG + ' C' + x + ',' + (UG + 12) + ' ' + (x + w) + ',' + (UG + 12) + ' ' + (x + w) + ',' + UG + 'Z', fill: COL.pad, 'fill-opacity': 0.75, stroke: COL.pad }, svg);
        used[t].push([x + w / 2, UG + 8]);
        return;
      }
      const p = el('path', { d: tooth(t, x, w, h, dir), fill: '#f1f5f9', 'fill-opacity': 0.92, stroke: COL[t], 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, svg);
      if (tilt) p.setAttribute('transform', 'rotate(' + tilt + ' ' + (x + w / 2) + ' ' + LG + ')');
      used[t].push([x + w / 2, dir > 0 ? UG + h * 0.5 : LG - h * 0.5]);
    });
    put(D.upper, 1); put(D.lower, -1);
    if (D.gap) {
      el('path', { d: 'M' + D.gap[0] + ',' + (LG - 4) + ' L' + D.gap[1] + ',' + (LG - 4), stroke: 'rgba(226,232,240,.6)', 'stroke-dasharray': '3 3' }, svg);
      const t = el('text', { x: (D.gap[0] + D.gap[1]) / 2, y: (UG + LG) / 2 + 4, 'font-size': 10, fill: 'rgba(226,232,240,.85)', 'text-anchor': 'middle' }, svg);
      t.textContent = L('diastema (gap)', 'diasteem (gaping)');
    }
    // labels: upper-jaw types above, lower-jaw-only types below
    const upperTypes = D.upper.map(a => a[0]).filter((v, i, s) => s.indexOf(v) === i);
    const items = Object.keys(used).map(t => {
      const pts = used[t], up = upperTypes.indexOf(t) >= 0;
      return { t: t, up: up, ax: pts.reduce((s, p) => s + p[0], 0) / pts.length, pt: up ? pts.filter(p => p[1] < 110)[0] || pts[0] : pts[pts.length - 1] };
    });
    [true, false].forEach(up => {
      const row = items.filter(o => o.up === up).sort((a, b) => a.ax - b.ax);
      row.forEach((o, i) => {
        let x = o.ax;
        if (i > 0) x = Math.max(x, row[i - 1].x + 34);
        if (i > 1) x = Math.max(x, row[i - 2].x + 64);
        o.x = x; o.y = up ? (i % 2 ? 30 : 14) : (i % 2 ? 190 : 204);
      });
      const over = row.length ? row[row.length - 1].x - 290 : 0;
      if (over > 0) row.forEach(o => { o.x -= over; });
    });
    items.forEach(o => {
      el('path', { d: 'M' + o.pt[0] + ',' + o.pt[1] + ' L' + o.x + ',' + (o.up ? o.y + 4 : o.y - 11), stroke: COL[o.t], 'stroke-width': 0.9, fill: 'none' }, svg);
      const tx = el('text', { x: o.x, y: o.y, 'font-size': 10.5, 'font-weight': 600, fill: COL[o.t], 'text-anchor': 'middle' }, svg);
      tx.textContent = NAME[o.t];
    });
    const w = D.note.split(' '), half = Math.ceil(w.length / 2);
    [w.slice(0, half).join(' '), w.slice(half).join(' ')].forEach((line, i) => {
      const t = el('text', { x: 160, y: 224 + i * 12, 'font-size': 9.5, fill: 'rgba(226,232,240,.75)', 'text-anchor': 'middle' }, svg);
      t.textContent = line;
    });
    const f = el('text', { x: 6, y: 253, 'font-size': 8.5, fill: 'rgba(226,232,240,.5)' }, svg);
    f.textContent = L('Side view; front of the mouth on the left.', 'Syaansig; voorkant van die bek links.');
  }

  window.MLTeeth = { draw: draw };
})();
