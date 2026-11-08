/* The Magic Lab — anatomical front view of the human body (head to upper thigh).
 *
 * Organs are drawn in their true positions and proportions (front view, so the
 * body's RIGHT side is on the viewer's LEFT): the right lung has three lobes and
 * the left lung two with a cardiac notch, the heart sits two-thirds left of the
 * midline with its apex on the diaphragm, the liver lies under the right dome of
 * the diaphragm, the stomach under the left, the kidneys at the back of the
 * abdomen (right one lower), the bladder low in the pelvis.
 *
 * Usage:  const fig = MLBody.mount(el, { region: 'chest', onSelect: key => … });
 *         fig.select('abdomen');
 * Regions: 'head', 'chest', 'abdomen'. Serves EN and AF pages (.af.html).
 */
(function () {
  'use strict';
  const AF = /\.af\.html$/i.test(location.pathname) || /^af/i.test(document.documentElement.lang || '');
  const L = (en, af) => (AF ? af : en);
  const NS = 'http://www.w3.org/2000/svg';

  const SYS = {
    resp: { c: '#60a5fa', en: 'Respiratory', af: 'Respiratories' },
    circ: { c: '#f87171', en: 'Circulatory', af: 'Sirkulasie' },
    dig: { c: '#fbbf24', en: 'Digestive', af: 'Vertering' },
    exc: { c: '#c084fc', en: 'Excretory', af: 'Uitskeiding' },
    nerv: { c: '#5eead4', en: 'Nervous', af: 'Senuwee' },
  };
  const REGION_COLOR = { head: '#60a5fa', chest: '#f87171', abdomen: '#34d399' };

  // Body outline: viewer's-left half, top of neck → arm → leg → crotch; mirrored about x = 160.
  const HALF = [[149, 76], [147, 95], [128, 103], [107, 109], [95, 121], [90, 150], [86, 190], [82, 228], [78, 270], [74, 310], [70, 328],
    [71, 350], [81, 357], [88, 341], [90, 316], [96, 272], [102, 232], [108, 190], [114, 152], [116, 182], [118, 220], [121, 248], [113, 278],
    [108, 308], [110, 350], [116, 400], [122, 450], [124, 500], [128, 548], [124, 567], [131, 578], [150, 578], [150, 560], [150, 500],
    [148, 450], [150, 400], [155, 345], [160, 330]];

  function smoothClosed(p) {
    let d = 'M' + p[0][0] + ',' + p[0][1];
    for (let i = 0; i < p.length; i++) {
      const p0 = p[(i - 1 + p.length) % p.length], p1 = p[i], p2 = p[(i + 1) % p.length], p3 = p[(i + 2) % p.length];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += 'C' + c1.map(v => v.toFixed(1)) + ' ' + c2.map(v => v.toFixed(1)) + ' ' + p2;
    }
    return d + 'Z';
  }
  const outline = () => smoothClosed(HALF.concat(HALF.slice(0, -1).reverse().map(([x, y]) => [320 - x, y])));
  const kidney = (cx, cy, s) => // s = +1: hilum faces right (body's right kidney, viewer's left)
    'M' + cx + ',' + (cy - 14) + 'C' + (cx - 9 * s) + ',' + (cy - 14) + ' ' + (cx - 10 * s) + ',' + (cy + 14) + ' ' + cx + ',' + (cy + 14) +
    'C' + (cx + 6 * s) + ',' + (cy + 14) + ' ' + (cx + 7 * s) + ',' + (cy + 6) + ' ' + (cx + 3 * s) + ',' + cy +
    'C' + (cx + 7 * s) + ',' + (cy - 6) + ' ' + (cx + 6 * s) + ',' + (cy - 14) + ' ' + cx + ',' + (cy - 14) + 'Z';

  // Organs, drawn back to front. tube: stroke-only path of the given width.
  const ORGANS = [
    { id: 'kidneyR', sys: 'exc', reg: 'abdomen', d: kidney(139, 253, 1), back: true },
    { id: 'kidneyL', sys: 'exc', reg: 'abdomen', d: kidney(181, 246, -1), back: true },
    { id: 'ureters', sys: 'exc', reg: 'abdomen', tube: 1.6, d: 'M143,258 C146,280 150,298 155,309 M177,251 C174,276 170,298 165,309', back: true },
    { id: 'brain', sys: 'nerv', reg: 'head', d: 'M139,34 C139,22 148,16 160,16 C172,16 181,22 181,34 C181,43 174,48 160,48 C146,48 139,43 139,34Z',
      extra: 'M160,17 L160,47 M147,24 C151,28 149,33 153,36 M173,24 C169,28 171,33 167,36 M144,38 C149,40 152,43 156,42 M176,38 C171,40 168,43 164,42' },
    { id: 'nasal', sys: 'resp', reg: 'head', d: 'M156,50 C156,47 164,47 164,50 L166,60 C163,62 157,62 154,60Z' },
    { id: 'mouth', sys: 'dig', reg: 'head', d: 'M151,66 C155,64 165,64 169,66 C166,70 154,70 151,66Z' },
    { id: 'pharynx', sys: 'resp', reg: 'head', tube: 5, d: 'M160,60 L160,84' },
    { id: 'oesophagus', sys: 'dig', reg: 'chest', tube: 4, d: 'M161,84 L161,130 C161,160 162,188 166,207' },
    { id: 'larynx', sys: 'resp', reg: 'head', d: 'M155,84 L165,84 L164,95 L156,95Z' },
    { id: 'trachea', sys: 'resp', reg: 'chest', tube: 7, d: 'M160,95 L160,128', rings: true },
    { id: 'lungR', sys: 'resp', reg: 'chest',
      d: 'M152,107 C146,103 138,110 133,124 C126,142 122,168 121,196 C121,206 126,210 134,206 C142,202 150,200 154,202 C155,180 154,150 154,128 C154,118 154,110 152,107Z',
      extra: 'M126,146 C134,172 142,190 150,202 M154,154 C146,152 138,154 131,160' },
    { id: 'lungL', sys: 'resp', reg: 'chest',
      d: 'M168,107 C174,103 182,110 187,124 C194,142 198,168 199,196 C199,206 194,210 186,206 C180,203 176,202 172,204 C171,198 175,192 181,188 C184,178 180,166 169,160 C167,140 166,120 168,107Z',
      extra: 'M188,128 C183,158 179,184 176,203' },
    { id: 'bronchi', sys: 'resp', reg: 'chest', tube: 4, d: 'M160,127 C155,131 150,135 145,142 M160,127 C165,131 170,134 175,140' },
    { id: 'vessels', sys: 'circ', reg: 'chest', tube: 5, d: 'M164,148 C161,132 167,124 175,127 C181,130 180,140 179,150 M151,152 L151,122' },
    { id: 'heart', sys: 'circ', reg: 'chest',
      d: 'M149,152 C149,143 159,140 168,144 C179,147 187,157 187,170 C187,181 182,190 178,197 C170,191 158,183 151,175 C147,167 147,159 149,152Z',
      extra: 'M165,145 C168,160 172,178 178,196' },
    { id: 'diaphragm', sys: 'resp', reg: 'chest', tube: 2.2, d: 'M120,211 C128,197 145,191 156,199 C162,203 166,200 172,196 C183,190 195,198 200,211' },
    { id: 'pancreas', sys: 'dig', reg: 'abdomen', d: 'M151,250 C161,246 177,244 191,240 C193,244 191,248 187,249 C175,252 163,254 153,257 C148,257 147,253 151,250Z' },
    { id: 'liver', sys: 'dig', reg: 'abdomen',
      d: 'M121,212 C130,201 147,197 157,203 C165,207 176,205 185,207 C183,214 173,218 163,222 C151,228 139,236 126,241 C121,233 119,222 121,212Z',
      extra: 'M157,204 C155,212 152,220 150,228' },
    { id: 'gallbladder', sys: 'dig', reg: 'abdomen', d: 'M142,229 C142,226 150,226 150,229 C150,236 147,239 146,239 C145,239 142,236 142,229Z' },
    { id: 'stomach', sys: 'dig', reg: 'abdomen',
      d: 'M166,208 C172,202 184,200 191,206 C197,214 197,229 192,239 C186,249 174,252 164,250 C158,249 156,244 160,242 C168,242 176,238 180,230 C182,222 176,214 168,215Z' },
    { id: 'duodenum', sys: 'dig', reg: 'abdomen', tube: 5, d: 'M160,245 C152,247 148,253 150,262 C152,268 160,268 166,265' },
    { id: 'smallInt', sys: 'dig', reg: 'abdomen',
      d: 'M142,272 C150,264 176,264 184,272 C188,284 186,298 178,304 C166,308 150,308 142,300 C138,292 138,280 142,272Z',
      extra: 'M146,276 C152,270 158,282 164,274 C170,268 176,280 180,276 M144,286 C150,280 156,292 162,284 C168,278 174,292 182,286 M146,297 C152,291 158,302 164,295 C170,289 176,301 179,297' },
    { id: 'largeInt', sys: 'dig', reg: 'abdomen', tube: 9,
      d: 'M136,304 C130,300 130,290 131,276 C131,264 131,256 134,250 C150,262 172,262 188,248 C192,262 192,280 191,292 C190,302 180,300 172,306 C166,310 163,314 162,324' },
    { id: 'appendix', sys: 'dig', reg: 'abdomen', tube: 2.5, d: 'M134,307 C132,313 134,317 137,317' },
    { id: 'bladder', sys: 'exc', reg: 'abdomen', d: 'M152,306 C152,300 168,300 168,306 C169,314 164,318 160,318 C156,318 151,314 152,306Z' },
  ];

  // Labels: [text, anchor x, anchor y, side] per region.
  const LABELS = {
    head: [[L('brain', 'brein'), 168, 28, 'R'], [L('nasal cavity', 'neusholte'), 158, 55, 'L'], [L('mouth', 'mond'), 154, 67, 'L'],
      [L('pharynx (throat)', 'farinks (keel)'), 161, 76, 'R'], [L('larynx (voice box)', 'larinks (stemkas)'), 157, 90, 'L']],
    chest: [[L('trachea', 'trachea'), 161, 112, 'R'], [L('bronchus', 'brongus'), 148, 138, 'L'], [L('right lung (3 lobes)', 'regterlong (3 lobbe)'), 130, 168, 'L'],
      [L('left lung (2 lobes)', 'linkerlong (2 lobbe)'), 192, 150, 'R'], [L('aorta', 'aorta'), 177, 132, 'R'], [L('heart', 'hart'), 176, 176, 'R'],
      [L('oesophagus', 'slukderm'), 162, 150, 'L'], [L('diaphragm', 'diafragma'), 125, 206, 'L']],
    abdomen: [[L('liver', 'lewer'), 131, 222, 'L'], [L('gall bladder', 'galblaas'), 145, 235, 'L'], [L('kidney (at the back)', 'nier (agter)'), 136, 256, 'L'],
      [L('appendix', 'blindedermaanhangsel'), 135, 315, 'L'], [L('stomach', 'maag'), 188, 222, 'R'], [L('pancreas', 'pankreas'), 188, 245, 'R'],
      [L('large intestine', 'dikderm'), 191, 278, 'R'], [L('small intestine', 'dunderm'), 172, 290, 'R'], [L('bladder', 'blaas'), 163, 312, 'R']],
  };

  const AREAS = {
    head: 'M160,10 C176,10 187,24 187,44 C187,62 178,76 172,80 L173,98 L147,98 L148,80 C142,76 133,62 133,44 C133,24 144,10 160,10Z',
    chest: 'M147,98 L173,98 C190,102 204,108 206,114 C206,150 203,190 201,212 C188,195 172,198 160,201 C148,197 132,195 119,212 C117,190 114,150 114,114 C116,108 130,102 147,98Z',
    abdomen: 'M119,212 C132,195 148,197 160,201 C172,198 188,195 201,212 C201,236 203,262 207,290 C205,306 196,318 186,324 L160,330 L134,324 C124,318 115,306 113,290 C117,262 119,236 119,212Z',
  };

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function mount(host, opts) {
    opts = opts || {};
    host.innerHTML = '';
    host.setAttribute('data-ml-no-theme', '');
    const svg = el('svg', { viewBox: '0 0 420 402', class: 'mlb-svg', role: 'img',
      'aria-label': L('Front view of the human body showing the organs of the head, chest and abdomen', 'Vooraansig van die menslike liggaam wat die organe van die kop, bors en buik toon') }, host);
    svg.style.cssText = 'display:block;width:100%;height:auto;max-height:560px;background:#040710;border-radius:10px;font-family:"Cabinet Grotesk",system-ui,sans-serif';
    const g = el('g', { transform: 'translate(50,0)' }, svg);
    // body + bony landmarks
    el('path', { d: outline(), fill: '#1b2234', stroke: 'rgba(210,218,245,.32)', 'stroke-width': 1.2 }, g);
    el('ellipse', { cx: 160, cy: 45, rx: 26, ry: 34, fill: '#1b2234', stroke: 'rgba(210,218,245,.32)', 'stroke-width': 1.2 }, g);
    el('path', { d: 'M151,104 C139,100 124,104 109,111 M169,104 C181,100 196,104 211,111 M160,104 L160,190', fill: 'none', stroke: 'rgba(210,218,245,.16)', 'stroke-width': 2.4, 'stroke-linecap': 'round' }, g);
    for (let i = 0; i < 6; i++) { // faint ribs behind the lungs
      const y = 118 + i * 14;
      el('path', { d: 'M158,' + y + ' C140,' + (y - 6) + ' ' + (122 + i) + ',' + (y + 2) + ' ' + (119 + i * 0.6) + ',' + (y + 20) +
        ' M162,' + y + ' C180,' + (y - 6) + ' ' + (198 - i) + ',' + (y + 2) + ' ' + (201 - i * 0.6) + ',' + (y + 20),
        fill: 'none', stroke: 'rgba(210,218,245,.07)', 'stroke-width': 3 }, g);
    }
    const areaEls = {}, organEls = [];
    for (const k in AREAS) areaEls[k] = el('path', { d: AREAS[k], fill: 'transparent', stroke: 'transparent', 'stroke-width': 1.4, 'stroke-dasharray': '4 3' }, g);
    ORGANS.forEach(o => {
      const grp = el('g', {}, g);
      const col = SYS[o.sys].c;
      if (o.tube) el('path', { d: o.d, fill: 'none', stroke: col, 'stroke-width': o.tube, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, grp);
      else el('path', { d: o.d, fill: col, 'fill-opacity': o.back ? 0.55 : 0.88, stroke: col, 'stroke-width': 1 }, grp);
      if (o.extra) el('path', { d: o.extra, fill: 'none', stroke: 'rgba(4,7,16,.55)', 'stroke-width': 1 }, grp);
      if (o.rings) for (let y = 98; y <= 126; y += 4) el('path', { d: 'M156.5,' + y + ' L163.5,' + y, stroke: 'rgba(4,7,16,.5)', 'stroke-width': 1 }, grp);
      organEls.push({ o: o, grp: grp });
    });
    // kidneys sit behind the gut: a dashed outline on top keeps them visible
    const kidneyTop = el('path', { d: kidney(139, 253, 1) + kidney(181, 246, -1), fill: 'none', stroke: SYS.exc.c, 'stroke-width': 1.1, 'stroke-dasharray': '3 2' }, g);
    const labelLayer = el('g', {}, g);
    // click targets
    for (const k in AREAS) {
      const hit = el('path', { d: AREAS[k], fill: 'transparent', style: 'cursor:pointer', tabindex: 0, role: 'button',
        'aria-label': { head: L('Head', 'Kop'), chest: L('Chest', 'Bors'), abdomen: L('Abdomen', 'Buik') }[k] }, g);
      const go = () => { select(k); if (opts.onSelect) opts.onSelect(k); };
      hit.addEventListener('click', go);
      hit.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    }
    // orientation note and legend
    const note = document.createElement('div');
    note.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;margin-top:10px;font-size:12px;color:rgba(210,218,245,.7)';
    note.innerHTML = '<span>' + L('Front view: the body’s right side is on your left.', 'Vooraansig: die liggaam se regterkant is aan jou linkerkant.') + '</span>' +
      Object.keys(SYS).map(s => '<span style="display:inline-flex;align-items:center;gap:5px"><i style="width:10px;height:10px;border-radius:3px;background:' +
        SYS[s].c + ';display:inline-block"></i>' + L(SYS[s].en, SYS[s].af) + '</span>').join('');
    host.appendChild(note);

    function drawLabels(region) {
      labelLayer.innerHTML = '';
      const list = LABELS[region] || [];
      ['L', 'R'].forEach(side => {
        const items = list.filter(l => l[3] === side).sort((a, b) => a[2] - b[2]);
        let last = -1e9;
        items.forEach(it => {
          const y = Math.max(it[2], last + 15); last = y;
          const tx = side === 'L' ? 60 : 262, ex = side === 'L' ? 64 : 258;
          el('path', { d: 'M' + it[1] + ',' + it[2] + ' L' + (side === 'L' ? ex + 10 : ex - 10) + ',' + y + ' L' + ex + ',' + y,
            fill: 'none', stroke: 'rgba(226,232,240,.75)', 'stroke-width': 0.8 }, labelLayer);
          el('circle', { cx: it[1], cy: it[2], r: 1.6, fill: '#fff' }, labelLayer);
          const t = el('text', { x: tx, y: y + 3.5, 'font-size': 10.5, 'font-weight': 600, fill: '#e8edf9', 'text-anchor': side === 'L' ? 'end' : 'start' }, labelLayer);
          t.textContent = it[0];
        });
      });
    }

    function select(region) {
      for (const k in areaEls) {
        const on = k === region;
        areaEls[k].setAttribute('fill', on ? REGION_COLOR[k] + '14' : 'transparent');
        areaEls[k].setAttribute('stroke', on ? REGION_COLOR[k] : 'transparent');
      }
      organEls.forEach(({ o, grp }) => grp.setAttribute('opacity', o.reg === region ? 1 : 0.28));
      kidneyTop.setAttribute('opacity', region === 'abdomen' ? 1 : 0.2);
      drawLabels(region);
    }
    select(opts.region || 'chest');
    return { select: select, svg: svg };
  }

  window.MLBody = { mount: mount, systems: SYS };
})();
