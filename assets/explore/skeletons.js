/* The Magic Lab — the three animal skeleton types, drawn as labelled illustrations.
 *   hydro: earthworm (side view + cross-section: circular and longitudinal muscle round a fluid-filled coelom)
 *   exo:   insect, dorsal view (chitin exoskeleton, three body parts, three pairs of jointed legs on the thorax)
 *   endo:  human skeleton, front view
 * Usage: MLSkel.draw(el, 'hydro' | 'exo' | 'endo')
 */
(function () {
  'use strict';
  const AF = /\.af\.html$/i.test(location.pathname) || /^af/i.test(document.documentElement.lang || '');
  const L = (en, af) => (AF ? af : en);
  const NS = 'http://www.w3.org/2000/svg';
  function el(tag, a, p) { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function label(g, ax, ay, tx, ty, s, anchor) {
    el('path', { d: 'M' + ax + ',' + ay + ' L' + tx + ',' + ty, stroke: 'rgba(226,232,240,.6)', 'stroke-width': 0.7, fill: 'none' }, g);
    el('circle', { cx: ax, cy: ay, r: 1.5, fill: '#fff' }, g);
    const t = el('text', { x: tx + (anchor === 'end' ? -3 : 3), y: ty + 3.5, 'font-size': 9.5, fill: 'rgba(226,232,240,.9)', 'text-anchor': anchor || 'start' }, g);
    t.textContent = s;
  }

  function note(g, x, y, s, anchor) {
    const w = s.split(' '), half = Math.ceil(w.length / 2);
    [w.slice(0, half).join(' '), w.slice(half).join(' ')].forEach((line, i) => {
      const t = el('text', { x: x, y: y + i * 12, 'font-size': 9.5, fill: 'rgba(226,232,240,.75)', 'text-anchor': anchor || 'start' }, g);
      t.textContent = line;
    });
  }

  function hydro(g) {
    const C = '#f472b6';
    // body: tapered band with segments; clitellum
    el('path', { d: 'M14,92 C14,82 24,78 40,78 L176,80 C192,80 200,86 200,92 C200,98 192,104 176,104 L40,106 C24,106 14,102 14,92Z', fill: C, 'fill-opacity': 0.35, stroke: C, 'stroke-width': 1.4 }, g);
    let d = '';
    for (let x = 26; x < 196; x += 6) d += 'M' + x + ',' + (80 + Math.abs(x - 110) * 0.01) + ' L' + x + ',' + (104 - Math.abs(x - 110) * 0.01) + ' ';
    el('path', { d: d, stroke: 'rgba(4,7,16,.45)', 'stroke-width': 0.8 }, g);
    el('rect', { x: 56, y: 78.5, width: 20, height: 27, rx: 3, fill: C, 'fill-opacity': 0.55 }, g);
    label(g, 66, 80, 66, 50, L('clitellum', 'klitellum'), 'start');
    label(g, 120, 81, 140, 50, L('segments', 'segmente'), 'start');
    label(g, 20, 92, 20, 130, L('front end', 'voorkant'), 'start');
    // cross-section
    const cx = 248, cy = 150;
    el('path', { d: 'M200,96 L' + (cx - 30) + ',' + (cy - 30), stroke: 'rgba(226,232,240,.35)', 'stroke-dasharray': '3 3' }, g);
    el('circle', { cx: cx, cy: cy, r: 40, fill: '#f9a8d4', 'fill-opacity': 0.25, stroke: C, 'stroke-width': 1.4 }, g);   // epidermis
    el('circle', { cx: cx, cy: cy, r: 36, fill: 'none', stroke: '#fb7185', 'stroke-width': 5 }, g);                       // circular muscle
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; el('path', { d: 'M' + (cx + 27 * Math.cos(a)) + ',' + (cy + 27 * Math.sin(a)) + ' L' + (cx + 32 * Math.cos(a)) + ',' + (cy + 32 * Math.sin(a)), stroke: '#c084fc', 'stroke-width': 4 }, g); } // longitudinal muscle blocks
    el('circle', { cx: cx, cy: cy, r: 26, fill: '#60a5fa', 'fill-opacity': 0.35 }, g);                                     // coelom fluid
    el('circle', { cx: cx, cy: cy, r: 9, fill: '#a16207', 'fill-opacity': 0.85 }, g);                                      // gut
    label(g, cx - 36, cy - 6, 196, 136, L('circular muscle', 'kringspier'), 'end');
    label(g, cx - 29, cy + 6, 196, 152, L('longitudinal muscle', 'lengtespier'), 'end');
    label(g, cx - 17, cy + 14, 196, 168, L('fluid-filled coelom', 'vloeistofgevulde selom'), 'end');
    label(g, cx - 4, cy + 4, 196, 184, L('gut', 'derm'), 'end');
    const t = el('text', { x: cx, y: cy + 56, 'font-size': 9, fill: 'rgba(226,232,240,.6)', 'text-anchor': 'middle' }, g);
    t.textContent = L('cross-section', 'deursnee');
    note(g, 14, 226, L('Muscles squeeze the fluid, which cannot be compressed, so the body changes shape.', 'Spiere druk die vloeistof saam, wat nie saamgepers kan word nie, dus verander die liggaam van vorm.'));
  }

  function exo(g) {
    const C = '#fbbf24';
    const leg = (pts, side) => {
      const p = pts.map(([x, y]) => [side < 0 ? x : 300 - x, y]);
      el('path', { d: 'M' + p.map(q => q.join(',')).join(' L'), fill: 'none', stroke: C, 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-opacity': 0.9 }, g);
      p.slice(1, -1).forEach(q => el('circle', { cx: q[0], cy: q[1], r: 2.2, fill: '#040710', stroke: C, 'stroke-width': 1.2 }, g));
    };
    [-1, 1].forEach(s => {
      leg([[138, 82], [114, 70], [100, 44], [94, 32]], s);
      leg([[136, 94], [108, 98], [88, 120], [80, 126]], s);
      leg([[138, 106], [112, 126], [100, 168], [96, 184]], s);
      el('path', { d: s < 0 ? 'M144,46 C132,30 124,18 112,10' : 'M156,46 C168,30 176,18 188,10', fill: 'none', stroke: C, 'stroke-width': 1.6 }, g); // antennae
    });
    el('ellipse', { cx: 150, cy: 56, rx: 12, ry: 11, fill: C, 'fill-opacity': 0.45, stroke: C, 'stroke-width': 1.4 }, g);           // head
    el('circle', { cx: 142, cy: 53, r: 3.5, fill: '#78350f' }, g); el('circle', { cx: 158, cy: 53, r: 3.5, fill: '#78350f' }, g);   // compound eyes
    el('path', { d: 'M136,76 C136,68 164,68 164,76 L166,108 C166,114 134,114 134,108Z', fill: C, 'fill-opacity': 0.5, stroke: C, 'stroke-width': 1.4 }, g); // thorax
    el('path', { d: 'M135,88 L165,88 M134,100 L166,100', stroke: 'rgba(4,7,16,.5)', 'stroke-width': 1 }, g);
    el('ellipse', { cx: 150, cy: 160, rx: 24, ry: 48, fill: C, 'fill-opacity': 0.4, stroke: C, 'stroke-width': 1.4 }, g);          // abdomen
    let d = ''; for (let y = 124; y < 204; y += 9) { const w = 24 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 160) / 48, 2))); d += 'M' + (150 - w) + ',' + y + ' L' + (150 + w) + ',' + y + ' '; }
    el('path', { d: d, stroke: 'rgba(4,7,16,.5)', 'stroke-width': 1 }, g);
    label(g, 150, 46, 214, 40, L('head', 'kop'), 'start');
    label(g, 164, 92, 214, 76, L('thorax (legs attached here)', 'toraks (pote hier geheg)'), 'start');
    label(g, 172, 150, 214, 150, L('abdomen (segmented)', 'abdomen (gesegmenteer)'), 'start');
    label(g, 108, 98, 30, 150, L('joint', 'gewrig'), 'end');
    label(g, 100, 168, 30, 200, L('jointed leg', 'gelede poot'), 'end');
    label(g, 135, 180, 30, 226, L('exoskeleton of chitin', 'eksoskelet van chitien'), 'end');
    note(g, 150, 234, L('Insect, top view: muscles are attached to the inside of the hard outer covering.', 'Insek, bo-aansig: spiere is aan die binnekant van die harde buitebedekking geheg.'), 'middle');
  }

  function endo(g) {
    const B = '#e2e8f0', bone = { fill: 'none', stroke: B, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-opacity': 0.85 };
    const thin = Object.assign({}, bone, { 'stroke-width': 1.6 });
    const pair = (d) => { el('path', Object.assign({ d: d }, bone), g); el('path', Object.assign({ d: d, transform: 'translate(300,0) scale(-1,1)' }, bone), g); };
    const pairThin = (d) => { el('path', Object.assign({ d: d }, thin), g); el('path', Object.assign({ d: d, transform: 'translate(300,0) scale(-1,1)' }, thin), g); };
    // skull and mandible
    el('path', { d: 'M136,26 C136,12 164,12 164,26 C164,34 162,38 158,40 L142,40 C138,38 136,34 136,26Z', fill: B, 'fill-opacity': 0.2, stroke: B, 'stroke-width': 1.6 }, g);
    el('path', { d: 'M141,40 C142,48 147,51 150,51 C153,51 158,48 159,40', fill: 'none', stroke: B, 'stroke-width': 1.6 }, g);
    el('circle', { cx: 145, cy: 29, r: 3, fill: '#040710', stroke: B, 'stroke-width': 1 }, g); el('circle', { cx: 155, cy: 29, r: 3, fill: '#040710', stroke: B, 'stroke-width': 1 }, g);
    // vertebral column
    for (let y = 54; y < 162; y += 5) el('rect', { x: 147.5 - (y > 120 ? 1 : 0), y: y, width: 5 + (y > 120 ? 2 : 0), height: 3.6, rx: 1, fill: B, 'fill-opacity': 0.75 }, g);
    el('path', { d: 'M144,160 L156,160 L152,172 L148,172Z', fill: B, 'fill-opacity': 0.6 }, g); // sacrum
    // clavicles, sternum, ribs
    pair('M148,64 C140,61 130,61 120,64');
    el('path', Object.assign({ d: 'M150,68 L150,104' }, bone), g);
    for (let i = 0; i < 7; i++) { const y = 70 + i * 6, w = 18 + Math.min(i, 4) * 2.5; pairThin('M148,' + y + ' C' + (150 - w - 6) + ',' + (y - 3) + ' ' + (150 - w - 8) + ',' + (y + 10) + ' ' + (150 - w + 2) + ',' + (y + 13)); }
    // arms
    pair('M120,66 L112,124'); pairThin('M111,127 L101,178'); pairThin('M115,127 L106,178');
    pairThin('M103,181 L99,198 M105,181 L103,200 M107,181 L107,199 M109,181 L111,196');
    // pelvis
    el('path', { d: 'M126,152 C122,140 136,138 146,152 L150,160 L154,152 C164,138 178,140 174,152 C172,166 162,176 150,178 C138,176 128,166 126,152Z', fill: B, 'fill-opacity': 0.18, stroke: B, 'stroke-width': 1.6 }, g);
    // legs
    pair('M138,170 L136,234'); el('circle', { cx: 137, cy: 237, r: 2.6, fill: B, 'fill-opacity': 0.8 }, g); el('circle', { cx: 163, cy: 237, r: 2.6, fill: B, 'fill-opacity': 0.8 }, g);
    pair('M136,240 L137,288'); pairThin('M141,241 L142,286'); pair('M137,290 L126,294');
    label(g, 158, 22, 214, 22, L('skull (cranium)', 'skedel (kranium)'), 'start');
    label(g, 150, 100, 214, 60, L('vertebral column', 'werwelkolom'), 'start');
    label(g, 168, 84, 214, 86, L('ribcage', 'ribbekas'), 'start');
    label(g, 166, 160, 214, 156, L('pelvic girdle', 'bekkengordel'), 'start');
    label(g, 163, 205, 214, 200, L('femur', 'femur'), 'start');
    label(g, 163, 237, 214, 232, L('knee joint', 'kniegewrig'), 'start');
    label(g, 134, 63, 84, 56, L('clavicle', 'sleutelbeen'), 'end');
    label(g, 116, 96, 84, 92, L('humerus', 'humerus'), 'end');
    label(g, 106, 152, 84, 148, L('radius and ulna', 'radius en ulna'), 'end');
    label(g, 137, 266, 84, 262, L('tibia and fibula', 'tibia en fibula'), 'end');
  }

  function draw(host, id) {
    host.innerHTML = '';
    host.setAttribute('data-ml-no-theme', '');
    const svg = el('svg', { viewBox: { hydro: '-6 0 312 252', exo: '-84 0 460 252', endo: '0 0 330 300' }[id] || '0 0 300 250', role: 'img', 'aria-label': {
      hydro: L('Earthworm with a cross-section of its hydrostatic skeleton', 'Erdwurm met ’n deursnee van sy hidrostatiese skelet'),
      exo: L('Insect showing its exoskeleton and jointed legs', 'Insek wat sy eksoskelet en gelede pote toon'),
      endo: L('Human skeleton, front view', 'Menslike skelet, vooraansig') }[id] }, host);
    svg.style.cssText = 'display:block;width:100%;height:auto;max-height:340px;font-family:"Cabinet Grotesk",system-ui,sans-serif';
    ({ hydro: hydro, exo: exo, endo: endo }[id] || hydro)(el('g', {}, svg));
  }

  window.MLSkel = { draw: draw };
})();
