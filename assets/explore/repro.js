/* The Magic Lab — human reproductive systems, drawn the way textbooks and exam papers show them.
 *
 * Male: side view (sagittal section) with the front of the body on the LEFT. The vas deferens runs
 * from the epididymis up the spermatic cord, loops over the ureter and behind the bladder, joins the
 * seminal vesicle duct and enters the urethra inside the prostate. Cowper's gland sits below the prostate.
 * Female: front view (coronal section). The oviducts open beside, not onto, the ovaries (fimbriae).
 *
 * Usage:  const fig = MLRepro.mount(el, { sex: 'm' | 'f', onPick: id => … });  fig.focus(['testis']);
 * Part ids: testis epididymis vasdeferens seminalvesicle prostate cowper urethra penis scrotum
 *           ovary oviduct uterus endometrium cervix vagina   (context: bladder ureter rectum pubic)
 */
(function () {
  'use strict';
  const AF = /\.af\.html$/i.test(location.pathname) || /^af/i.test(document.documentElement.lang || '');
  const L = (en, af) => (AF ? af : en);
  const NS = 'http://www.w3.org/2000/svg';
  const SKIN = '#1b2234', LINE = 'rgba(210,218,245,.34)', CTX = '#475569';

  // [id, colour, path, tube width or 0, label en, label af, anchor x, anchor y, side, extra detail path]
  const MALE = [
    ['skin', null, 'M96,8 C92,60 92,110 104,150 C112,170 126,178 138,180 M330,8 C338,80 344,160 330,206 C318,232 296,240 278,238 C250,236 214,236 192,232', 0],
    ['rectum', CTX, 'M262,20 C258,80 260,150 268,196 C272,214 276,226 278,236', 18, 'rectum', 'rektum', 270, 120, 'R'],
    ['pubic', '#64748b', 'M112,128 C122,124 132,136 132,152 C132,166 124,174 116,170 C108,166 104,152 106,140 C107,134 109,130 112,128Z', 0, 'pubic bone', 'skaambeen', 118, 150, 'L'],
    ['ureter', CTX, 'M246,14 C238,40 224,64 206,84', 3],
    ['bladder', '#64748b', 'M138,92 C138,62 158,48 182,50 C210,52 222,74 220,98 C218,118 202,128 182,128 C160,128 138,118 138,92Z', 0, 'bladder', 'blaas', 160, 80, 'L'],
    ['seminalvesicle', '#a78bfa', 'M214,112 C222,100 236,96 244,104 C250,110 246,118 240,120 C246,126 240,134 232,132 C226,138 216,136 212,130 C206,126 206,118 214,112Z', 0, 'seminal vesicle', 'saadblasie', 236, 112, 'R'],
    ['prostate', '#c084fc', 'M162,146 C162,132 176,126 190,128 C204,130 210,142 208,154 C206,166 194,172 182,172 C170,172 162,160 162,146Z', 0, 'prostate gland', 'prostaatklier', 202, 150, 'R'],
    ['cowper', '#e879f9', 'M190,184 C190,180 198,180 198,184 C198,189 190,189 190,184Z', 0, 'Cowper’s gland', 'Cowper se klier', 194, 184, 'R'],
    ['scrotum', null, 'M142,212 C122,212 112,232 114,252 C116,276 132,292 152,292 C172,292 186,276 186,254 C186,232 174,212 152,210Z', 0, 'scrotum', 'skrotum', 128, 282, 'L'],
    ['testis', '#60a5fa', 'M134,252 C134,236 144,228 154,228 C166,228 172,240 172,254 C172,270 164,280 152,280 C140,280 134,268 134,252Z', 0, 'testis', 'testis', 146, 262, 'L',
      'M142,244 C148,250 146,256 152,258 M150,238 C156,246 160,250 164,262 M140,262 C146,264 150,270 158,270'],
    ['epididymis', '#93c5fd', 'M146,228 C156,220 172,224 176,238 C180,252 178,268 170,280', 6, 'epididymis', 'epididimis', 177, 250, 'R'],
    ['penis', '#f472b6', 'M140,176 C124,182 102,202 86,232 C80,244 74,252 68,262 C64,272 76,280 84,272 C92,258 106,232 128,210 C142,198 152,194 156,186 C154,178 148,174 140,176Z', 0, 'penis', 'penis', 100, 226, 'L',
      'M68,262 C64,272 76,280 84,272 C86,266 80,258 74,258Z'],
    ['urethra', '#fbbf24', 'M181,128 L183,172 C184,186 170,190 152,190 C130,192 104,214 88,244 C82,256 76,264 72,270', 2.4, 'urethra', 'uretra', 120, 202, 'L'],
    ['vasdeferens', '#34d399', 'M172,278 C182,262 176,232 156,214 C136,198 106,186 100,160 C96,136 98,92 110,62 C124,36 176,26 210,40 C234,50 240,80 232,100 C228,114 218,124 206,132 C198,138 190,144 184,152', 2.6, 'vas deferens (sperm duct)', 'saadbuis (vas deferens)', 100, 120, 'L'],
  ];
  const FEMALE = [
    ['uterus', '#c084fc', 'M160,92 C160,62 260,62 260,92 C260,130 240,165 226,190 L194,190 C180,165 160,130 160,92Z', 0, 'uterus (muscular wall)', 'uterus (spierwand)', 252, 120, 'R'],
    ['endometrium', '#fda4af', 'M178,94 C195,87 225,87 242,94 C232,125 220,152 213,178 L207,178 C200,152 188,125 178,94Z', 0, 'endometrium (lining)', 'endometrium (voering)', 222, 110, 'R'],
    ['cervix', '#34d399', 'M194,190 L226,190 C228,205 226,215 222,222 L198,222 C194,215 192,205 194,190Z', 0, 'cervix', 'serviks', 224, 206, 'R', 'M210,178 L210,222'],
    ['vagina', '#f472b6', 'M198,222 L222,222 C226,250 230,275 234,300 L186,300 C190,275 194,250 198,222Z', 0, 'vagina', 'vagina', 228, 262, 'R',
      'M210,222 L210,300 M202,240 L206,240 M214,240 L218,240 M200,260 L205,260 M215,260 L220,260 M198,280 L204,280 M216,280 L222,280'],
    ['ovary', '#60a5fa', 'M84,118 C84,106 98,100 112,102 C126,104 134,112 132,122 C130,132 118,138 104,136 C92,134 84,128 84,118Z M288,122 C286,112 294,104 308,102 C322,100 336,106 336,118 C336,128 328,134 316,136 C302,138 290,132 288,122Z', 0, 'ovary', 'ovarium', 104, 124, 'L',
      'M98,114 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M114,122 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M106,128 m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0 M320,114 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M306,124 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0'],
    ['oviduct', '#fb923c', 'M162,84 C140,68 112,60 94,68 C82,74 76,88 80,100 M258,84 C280,68 308,60 326,68 C338,74 344,88 340,100', 6, 'oviduct (Fallopian tube)', 'eierleier (Fallopiusbuis)', 130, 68, 'L',
      'M80,100 L72,106 M80,100 L76,110 M80,100 L83,111 M80,100 L89,108 M340,100 L348,106 M340,100 L344,110 M340,100 L337,111 M340,100 L331,108'],
    ['ligament', CTX, 'M130,114 C142,110 152,104 162,100 M290,114 C278,110 268,104 258,100', 1.6],
  ];

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function mount(host, opts) {
    opts = opts || {};
    const male = opts.sex !== 'f';
    host.innerHTML = '';
    host.setAttribute('data-ml-no-theme', '');
    const svg = el('svg', { viewBox: '0 0 620 312', role: 'img', 'aria-label': male
      ? L('Side view of the male reproductive system', 'Syaansig van die manlike voortplantingstelsel')
      : L('Front view of the female reproductive system', 'Vooraansig van die vroulike voortplantingstelsel') }, host);
    svg.style.cssText = 'display:block;width:100%;height:auto;max-height:520px;background:#040710;border-radius:10px;font-family:"Cabinet Grotesk",system-ui,sans-serif';
    const g = el('g', { transform: 'translate(' + (male ? 170 : 120) + ',4)' }, svg);
    const parts = male ? MALE : FEMALE, els = {};
    parts.forEach(p => {
      const [id, col, d, tube] = p;
      const grp = el('g', {}, g);
      if (id === 'skin') { el('path', { d: d, fill: 'none', stroke: LINE, 'stroke-width': 1.3, 'stroke-dasharray': '5 4' }, grp); return; }
      if (id === 'scrotum') el('path', { d: d, fill: SKIN, stroke: LINE, 'stroke-width': 1.3 }, grp);
      else if (tube) el('path', { d: d, fill: 'none', stroke: col, 'stroke-width': tube, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, grp);
      else el('path', { d: d, fill: col, 'fill-opacity': col === CTX || col === '#64748b' ? 0.5 : 0.85, stroke: col, 'stroke-width': 1.1 }, grp);
      if (p[9]) el('path', { d: p[9], fill: 'none', stroke: 'rgba(4,7,16,.6)', 'stroke-width': 1.1 }, grp);
      if (opts.onPick && p[4]) {
        grp.style.cursor = 'pointer';
        grp.addEventListener('click', () => opts.onPick(id));
      }
      els[id] = { grp: grp, p: p };
    });
    const labels = el('g', {}, g);
    const note = document.createElement('div');
    note.style.cssText = 'margin-top:8px;font-size:12px;color:rgba(210,218,245,.7)';
    note.textContent = male
      ? L('Side view (section): the front of the body is on the left. Grey structures are not part of the reproductive system.', 'Syaansig (snit): die voorkant van die liggaam is links. Grys strukture is nie deel van die voortplantingstelsel nie.')
      : L('Front view (section): the body’s right side is on your left.', 'Vooraansig (snit): die liggaam se regterkant is aan jou linkerkant.');
    host.appendChild(note);

    function focus(ids) {
      ids = ids || [];
      labels.innerHTML = '';
      for (const id in els) {
        const on = ids.indexOf(id) >= 0, ctx = !els[id].p[1] || els[id].p[1] === CTX || els[id].p[1] === '#64748b';
        els[id].grp.setAttribute('opacity', !ids.length || on ? 1 : ctx ? 0.7 : 0.35);
      }
      const show = (ids.length ? ids : Object.keys(els)).map(id => els[id]).filter(e => e && e.p[4]);
      ['L', 'R'].forEach(side => {
        let last = -1e9;
        show.filter(e => e.p[8] === side).sort((a, b) => a.p[7] - b.p[7]).forEach(e => {
          const p = e.p, y = Math.max(p[7], last + 15); last = y;
          const ex = side === 'L' ? (male ? -6 : 46) : (male ? 300 : 360);
          el('path', { d: 'M' + p[6] + ',' + p[7] + ' L' + ex + ',' + y, fill: 'none', stroke: 'rgba(226,232,240,.7)', 'stroke-width': 0.8 }, labels);
          el('circle', { cx: p[6], cy: p[7], r: 1.8, fill: '#fff' }, labels);
          const t = el('text', { x: side === 'L' ? ex - 4 : ex + 4, y: y + 4, 'font-size': 11, 'font-weight': ids.indexOf(p[0]) >= 0 ? 700 : 500,
            fill: ids.indexOf(p[0]) >= 0 ? '#ffffff' : 'rgba(226,232,240,.75)', 'text-anchor': side === 'L' ? 'end' : 'start' }, labels);
          t.textContent = L(p[4], p[5]);
        });
      });
    }
    focus(opts.focus || []);
    return { focus: focus, svg: svg };
  }

  window.MLRepro = { mount: mount };
})();
