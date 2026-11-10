/* The Magic Lab — double circulation with a four-chamber heart (front view: the heart's right side is on
 * the viewer's left). Blood flows vena cava → right atrium → (tricuspid valve) → right ventricle →
 * pulmonary artery → lung capillaries → pulmonary veins → left atrium → (bicuspid valve) → left ventricle
 * → aorta → body capillaries → vena cava. It changes colour only in the capillaries.
 *
 * Usage: MLCirc.mount(el, { bpm: () => currentBpm });
 */
(function () {
  'use strict';
  const AF = /\.af\.html$/i.test(location.pathname) || /^af/i.test(document.documentElement.lang || '');
  const L = (en, af) => (AF ? af : en);
  const NS = 'http://www.w3.org/2000/svg';
  const RED = '#f87171', BLUE = '#60a5fa';

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // centre line of the whole loop (used for the moving blood cells)
  const LOOP = 'M262,140 L266,215 L288,204 L288,96 C288,76 260,64 222,52 L380,52 C352,64 340,92 340,135 L334,215 L312,204 L312,100 C312,70 360,62 420,68 ' +
    'C460,72 472,100 472,140 L472,318 L148,318 C128,318 120,306 120,286 L120,150 C120,142 128,140 232,140 L262,140';

  function mount(host, opts) {
    opts = opts || {};
    host.innerHTML = '';
    host.setAttribute('data-ml-no-theme', '');
    const svg = el('svg', { viewBox: '0 0 600 360', role: 'img',
      'aria-label': L('Double circulation: a four-chamber heart pumping blood to the lungs and to the body', 'Dubbele sirkulasie: ’n hart met vier kamers wat bloed na die longe en na die liggaam pomp') }, host);
    svg.style.cssText = 'display:block;width:100%;height:auto;max-height:440px;background:#040710;border-radius:10px;font-family:"Cabinet Grotesk",system-ui,sans-serif';
    const defs = el('defs', {}, svg);
    const gl = el('linearGradient', { id: 'mlcLung', x1: 0, x2: 1, y1: 0, y2: 0 }, defs);
    el('stop', { offset: '0', 'stop-color': BLUE }, gl); el('stop', { offset: '1', 'stop-color': RED }, gl);
    const gb = el('linearGradient', { id: 'mlcBody', x1: 1, x2: 0, y1: 0, y2: 0 }, defs);
    el('stop', { offset: '0', 'stop-color': RED }, gb); el('stop', { offset: '1', 'stop-color': BLUE }, gb);

    // capillary beds
    const bed = (x, y, w, grad) => {
      el('rect', { x: x, y: y, width: w, height: 30, rx: 14, fill: 'url(#' + grad + ')', 'fill-opacity': 0.22, stroke: 'url(#' + grad + ')', 'stroke-width': 1.4 }, svg);
      let d = '';
      for (let i = 0; i < 9; i++) { const xx = x + 16 + i * (w - 32) / 8; d += 'M' + xx + ',' + (y + 6) + ' C' + (xx + 8) + ',' + (y + 12) + ' ' + (xx - 8) + ',' + (y + 18) + ' ' + xx + ',' + (y + 24) + ' '; }
      el('path', { d: d, fill: 'none', stroke: 'rgba(226,232,240,.35)', 'stroke-width': 1 }, svg);
    };
    bed(206, 37, 190, 'mlcLung');
    bed(140, 303, 340, 'mlcBody');
    const txt = (x, y, s, o) => { const t = el('text', Object.assign({ x: x, y: y, 'font-size': 11, fill: 'rgba(226,232,240,.85)', 'text-anchor': 'middle', 'font-weight': 600 }, o || {}), svg); t.textContent = s; return t; };
    txt(301, 30, L('LUNGS: capillaries (gas exchange)', 'LONGE: kapillêre (gaswisseling)'));
    txt(310, 352, L('BODY CELLS: capillaries (O₂ and food out, CO₂ in)', 'LIGGAAMSELLE: kapillêre (O₂ en voedsel uit, CO₂ in)'));

    // vessels
    const vessel = (d, col) => el('path', { d: d, fill: 'none', stroke: col, 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-opacity': 0.8 }, svg);
    vessel('M288,190 L288,96 C288,76 260,64 222,52', BLUE);          // pulmonary artery
    vessel('M380,52 C352,64 340,92 340,122', RED);                    // pulmonary veins
    vessel('M312,190 L312,100 C312,70 360,62 420,68 C460,72 472,100 472,140 L472,308', RED); // aorta
    vessel('M150,318 L148,318 C128,318 120,306 120,286 L120,150 C120,142 128,140 234,140', BLUE); // vena cava

    // heart
    const heart = el('g', {}, svg);
    el('path', { d: 'M230,128 C230,110 250,108 296,112 L304,112 C350,108 370,110 370,128 L370,200 C370,236 330,262 300,270 C270,262 230,236 230,200Z',
      fill: '#2a1a24', stroke: 'rgba(248,113,113,.55)', 'stroke-width': 2 }, heart);
    el('path', { d: 'M238,122 L294,122 L294,168 L238,168Z', fill: BLUE, 'fill-opacity': 0.55, rx: 6 }, heart);                 // RA
    el('path', { d: 'M306,122 L362,122 L362,168 L306,168Z', fill: RED, 'fill-opacity': 0.55 }, heart);                         // LA
    const rv = el('path', { d: 'M240,180 L294,180 L294,250 C278,244 254,232 244,214Z', fill: BLUE, 'fill-opacity': 0.6 }, heart); // RV
    const lv = el('path', { d: 'M306,180 L360,180 L356,214 C346,236 324,252 300,262 L306,250Z', fill: RED, 'fill-opacity': 0.6, stroke: '#7f1d1d', 'stroke-width': 3 }, heart); // LV (thick wall)
    el('path', { d: 'M300,116 L300,262', stroke: 'rgba(4,7,16,.9)', 'stroke-width': 5 }, heart);   // septum
    // valves
    el('path', { d: 'M246,174 L262,180 M286,174 L270,180 M314,174 L330,180 M354,174 L338,180', stroke: '#fde68a', 'stroke-width': 2.4, 'stroke-linecap': 'round' }, heart);
    el('path', { d: 'M283,104 L288,110 L293,104 M307,104 L312,110 L317,104', fill: 'none', stroke: '#fde68a', 'stroke-width': 2, 'stroke-linecap': 'round' }, svg);

    // labels with leader lines
    const lab = (ax, ay, tx, ty, s, anchor) => {
      el('path', { d: 'M' + ax + ',' + ay + ' L' + tx + ',' + ty, stroke: 'rgba(226,232,240,.6)', 'stroke-width': 0.8, fill: 'none' }, svg);
      el('circle', { cx: ax, cy: ay, r: 1.8, fill: '#fff' }, svg);
      txt(tx + (anchor === 'end' ? -4 : 4), ty + 4, s, { 'text-anchor': anchor, 'font-weight': 500, 'font-size': 10.5 });
    };
    lab(258, 146, 196, 196, L('right atrium', 'regteratrium'), 'end');
    lab(262, 215, 196, 232, L('right ventricle', 'regterventrikel'), 'end');
    lab(278, 177, 196, 214, L('tricuspid valve', 'trikuspidaalklep'), 'end');
    lab(342, 146, 404, 196, L('left atrium', 'linkeratrium'), 'start');
    lab(336, 215, 404, 232, L('left ventricle (thick wall)', 'linkerventrikel (dik wand)'), 'start');
    lab(322, 177, 404, 214, L('bicuspid (mitral) valve', 'bikuspidaalklep (mitraal)'), 'start');
    lab(288, 107, 196, 112, L('semilunar valves', 'semilunêre kleppe'), 'end');
    lab(262, 70, 170, 84, L('pulmonary artery', 'pulmonêre arterie'), 'end');
    lab(352, 80, 404, 104, L('pulmonary veins', 'pulmonêre are'), 'start');
    lab(472, 200, 488, 200, L('aorta', 'aorta'), 'start');
    lab(120, 230, 104, 230, L('vena cava', 'vena cava'), 'end');
    txt(301, 92, '', {});
    const note = document.createElement('div');
    note.style.cssText = 'margin-top:8px;font-size:12px;color:rgba(210,218,245,.7)';
    note.textContent = L('Front view: the heart’s right side is on your left. The right side pumps blood to the lungs (pulmonary circuit); the left side pumps it to the body (systemic circuit).',
      'Vooraansig: die hart se regterkant is aan jou linkerkant. Die regterkant pomp bloed na die longe (pulmonale kringloop); die linkerkant pomp dit na die liggaam (sistemiese kringloop).');
    host.appendChild(note);

    // moving blood cells
    const loop = el('path', { d: LOOP, fill: 'none', stroke: 'none' }, svg);
    const len = loop.getTotalLength();
    const lungMid = 222 + 79, bodyMid = 0; // colour switches are computed from positions below
    const cells = [];
    for (let i = 0; i < 36; i++) cells.push({ s: i / 36, c: el('circle', { r: 4, fill: RED, stroke: 'rgba(4,7,16,.6)', 'stroke-width': 1 }, svg) });
    let last = performance.now(), alive = true;
    function oxygenated(p) {
      // oxygenated from the middle of the lung bed (y ≈ 52, x > 301) until the middle of the body bed (y ≈ 318, x < 310)
      if (p.y < 60 && p.x >= 301) return true;
      if (p.y < 60) return false;
      if (p.y > 312) return p.x > 310;
      if (p.x > 300 && p.x < 480) return true;   // LA, LV, aorta
      return false;                               // vena cava, RA, RV, pulmonary artery
    }
    function frame(now) {
      if (!alive || !svg.isConnected) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const bpm = (opts.bpm && opts.bpm()) || 70;
      const beat = (now / 1000) * (bpm / 60) % 1;
      const squeeze = beat < 0.3 ? Math.sin(beat / 0.3 * Math.PI) : 0;
      const sc = 1 - 0.06 * squeeze;
      heart.setAttribute('transform', 'translate(300,190) scale(' + sc + ') translate(-300,-190)');
      cells.forEach(c => {
        c.s = (c.s + dt * (bpm / 70) * 0.045 * (0.6 + squeeze)) % 1;
        const p = loop.getPointAtLength(c.s * len);
        c.c.setAttribute('cx', p.x); c.c.setAttribute('cy', p.y);
        c.c.setAttribute('fill', oxygenated(p) ? RED : BLUE);
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return { stop: () => { alive = false; } };
  }

  window.MLCirc = { mount: mount };
})();
