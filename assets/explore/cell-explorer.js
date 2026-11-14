/* Gr9 Cells — labelled plant and animal cells (textbook diagrams, as seen under a microscope, not to scale).
 * Plant cell: cell wall, cell membrane, large central vacuole (pushes the nucleus to the side), nucleus, chloroplasts,
 * mitochondria, cytoplasm. Animal cell: no wall, no chloroplasts, small vacuoles, nucleus near the centre.
 * Parts can be chosen on the drawing or from the list (keyboard friendly); the chosen part is drawn in the accent colour.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text } = MLX;
  const T = {
    aria: { en: 'A labelled diagram of a plant cell or an animal cell', af: '\'n Benoemde diagram van \'n plantsel of \'n dieresel' },
    type: { en: 'Cell', af: 'Sel' }, plant: { en: 'Plant cell', af: 'Plantsel' }, animal: { en: 'Animal cell', af: 'Dieresel' },
    parts: { en: 'Parts of the cell', af: 'Dele van die sel' }, pick: { en: 'Choose a part on the drawing or in the list.', af: 'Kies \'n deel op die tekening of in die lys.' },
    only: { en: 'Only in plant cells', af: 'Slegs in plantselle' }, both: { en: 'In plant and animal cells', af: 'In plant- en dierselle' },
    ns: { en: 'not to scale', af: 'nie volgens skaal nie' },
  };
  const P = {
    wall: { n: { en: 'Cell wall', af: 'Selwand' }, plantOnly: true, d: { en: 'A rigid layer of cellulose outside the membrane. It supports the cell and gives it a fixed shape.', af: '\'n Stywe laag sellulose buite die membraan. Dit ondersteun die sel en gee dit \'n vaste vorm.' } },
    membrane: { n: { en: 'Cell membrane', af: 'Selmembraan' }, d: { en: 'A thin, flexible layer around the cytoplasm. It controls what enters and leaves the cell.', af: '\'n Dun, buigsame laag om die sitoplasma. Dit beheer wat die sel binnegaan en verlaat.' } },
    cyto: { n: { en: 'Cytoplasm', af: 'Sitoplasma' }, d: { en: 'Jelly-like fluid where many of the cell\'s chemical reactions take place.', af: 'Jellieagtige vloeistof waar baie van die sel se chemiese reaksies plaasvind.' } },
    nucleus: { n: { en: 'Nucleus', af: 'Kern' }, d: { en: 'Contains the genetic material (DNA) and controls the cell\'s activities.', af: 'Bevat die genetiese materiaal (DNS) en beheer die sel se aktiwiteite.' } },
    vacuole: { n: { en: 'Vacuole', af: 'Vakuool' }, d: { en: 'A sac of cell sap. In plant cells one large central vacuole keeps the cell firm; animal cells have only small ones.', af: '\'n Sakkie selsap. In plantselle hou een groot sentrale vakuool die sel ferm; dierselle het net klein vakuole.' } },
    chloro: { n: { en: 'Chloroplast', af: 'Chloroplas' }, plantOnly: true, d: { en: 'Contains green chlorophyll, which absorbs light energy for photosynthesis.', af: 'Bevat groen chlorofil, wat ligenergie vir fotosintese absorbeer.' } },
    mito: { n: { en: 'Mitochondrion', af: 'Mitochondrion' }, d: { en: 'Where cellular respiration releases energy from glucose.', af: 'Waar sellulêre respirasie energie uit glukose vrystel.' } },
  };
  const S = { type: 'plant', sel: null };
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 360 : Math.max(380, Math.min(460, Math.round(w * 0.46))), ariaLabel: T.aria, draw });
  ui.cv.el.classList.add('mlx-themed');
  const c1 = MLX.card(ui.side);
  MLX.seg(c1, { label: T.type, options: [['plant', T.plant], ['animal', T.animal]], value: S.type, onChange: (v) => { S.type = v; if (S.sel && P[S.sel].plantOnly && v === 'animal') S.sel = null; build(); update(); } });
  const c2 = MLX.card(ui.side, T.parts);
  const list = MLX.h('div', { class: 'mlx-seg', role: 'group', 'aria-label': L(T.parts) }); c2.appendChild(list);
  const info = MLX.h('p', { class: 'mlx-note', style: 'margin-top:12px' }); c2.appendChild(info);
  const btns = {};
  function build() {
    list.innerHTML = '';
    Object.keys(P).filter(k => S.type === 'plant' || !P[k].plantOnly).forEach(k => {
      const b = MLX.h('button', { type: 'button', 'aria-pressed': String(S.sel === k), text: L(P[k].n) });
      b.addEventListener('click', () => { S.sel = k; update(); });
      list.appendChild(b); btns[k] = b;
    });
  }
  build();
  MLX.onTheme(() => ui.cv.draw());

  // geometry is rebuilt each draw; each part keeps a Path2D for hit-testing
  let paths = {};
  ui.cv.el.addEventListener('click', (e) => {
    const r = ui.cv.el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, ctx = ui.cv.ctx;
    const order = ['chloro', 'mito', 'nucleus', 'vacuole', 'wall', 'membrane', 'cyto'];
    // isPointInPath works in device pixels (the context is scaled by devicePixelRatio)
    const px = x * ui.cv.el.width / r.width, py = y * ui.cv.el.height / r.height;
    for (const k of order) if (paths[k] && paths[k].some(p => ctx.isPointInPath(p, px, py))) { S.sel = k; update(); return; }
  });

  function draw(ctx, W, H) {
    const c = MLX.colors(), acc = c.accent;
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    paths = {};
    const add = (k, p) => { (paths[k] = paths[k] || []).push(p); };
    const stroke = (k, base) => (S.sel === k ? acc : base);
    const narrow = W < 640;
    const cx = narrow ? W * 0.33 : W * 0.42, cy = H * 0.5, cw = narrow ? W * 0.5 : Math.min(W * 0.5, H * 1.05), ch = H * 0.74;
    const labels = [];
    if (S.type === 'plant') {
      const x0 = cx - cw / 2, y0 = cy - ch / 2;
      const wall = new Path2D(); wall.rect(x0, y0, cw, ch);
      const inner = new Path2D(); inner.rect(x0 + 9, y0 + 9, cw - 18, ch - 18);
      ctx.fillStyle = c.light ? 'rgba(120,160,90,0.12)' : 'rgba(120,180,90,0.10)'; ctx.fill(wall);
      ctx.lineWidth = S.sel === 'wall' ? 4 : 3; ctx.strokeStyle = stroke('wall', c.light ? '#5f7f3a' : '#9fc27a'); ctx.stroke(wall);
      const wallRing = new Path2D(); wallRing.rect(x0 - 4, y0 - 4, cw + 8, ch + 8); wallRing.rect(x0 + 6, y0 + ch - 6, cw - 12, -(ch - 12)); add('wall', wallRing);
      ctx.lineWidth = S.sel === 'membrane' ? 2.5 : 1.4; ctx.strokeStyle = stroke('membrane', c.text2); ctx.stroke(inner);
      const memRing = new Path2D(); memRing.rect(x0 + 6, y0 + 6, cw - 12, ch - 12); memRing.rect(x0 + 13, y0 + ch - 13, cw - 26, -(ch - 26)); add('membrane', memRing);
      add('cyto', inner);
      // large central vacuole
      const vac = new Path2D(); vac.ellipse(cx + cw * 0.06, cy + ch * 0.04, cw * 0.3, ch * 0.3, 0, 0, Math.PI * 2);
      ctx.fillStyle = c.light ? 'rgba(53,166,240,0.14)' : 'rgba(53,166,240,0.14)'; ctx.fill(vac); ctx.lineWidth = 1.4; ctx.strokeStyle = stroke('vacuole', c.glass); ctx.stroke(vac); add('vacuole', vac);
      // nucleus pressed against the side
      nucleus(ctx, c, x0 + cw * 0.17, y0 + ch * 0.24, Math.min(cw, ch) * 0.1, add, stroke);
      // chloroplasts round the edge
      [[0.12, 0.62], [0.2, 0.86], [0.5, 0.12], [0.78, 0.12], [0.9, 0.42], [0.86, 0.84], [0.5, 0.9]].forEach(([u, v]) => chloro(ctx, c, x0 + u * cw, y0 + v * ch, add, stroke));
      [[0.36, 0.14], [0.12, 0.42], [0.68, 0.88]].forEach(([u, v]) => mito(ctx, c, x0 + u * cw, y0 + v * ch, add, stroke));
      labels.push(['wall', x0 + cw, y0 + ch * 0.06], ['membrane', x0 + cw - 9, y0 + ch * 0.22], ['chloro', x0 + 0.9 * cw, y0 + 0.42 * ch], ['vacuole', cx + cw * 0.3, cy], ['mito', x0 + 0.68 * cw, y0 + 0.88 * ch],
        ['nucleus', x0 + cw * 0.17, y0 + ch * 0.24], ['cyto', x0 + cw * 0.3, y0 + ch * 0.7]);
    } else {
      const shape = new Path2D();
      for (let i = 0; i <= 60; i++) { const a = i / 60 * 2 * Math.PI, rr = 1 + 0.05 * Math.sin(3 * a) + 0.03 * Math.cos(5 * a), x = cx + Math.cos(a) * cw * 0.5 * rr, y = cy + Math.sin(a) * ch * 0.46 * rr; i ? shape.lineTo(x, y) : shape.moveTo(x, y); }
      shape.closePath();
      ctx.fillStyle = c.light ? 'rgba(200,120,140,0.10)' : 'rgba(239,150,170,0.08)'; ctx.fill(shape);
      ctx.lineWidth = S.sel === 'membrane' ? 3 : 1.8; ctx.strokeStyle = stroke('membrane', c.text2); ctx.stroke(shape);
      add('cyto', shape); add('membrane', shape);
      nucleus(ctx, c, cx, cy, Math.min(cw, ch) * 0.13, add, stroke);
      [[-0.28, -0.2], [0.26, 0.22], [0.1, -0.3]].forEach(([u, v]) => { const vv = new Path2D(); vv.ellipse(cx + u * cw, cy + v * ch, 12, 9, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(53,166,240,0.14)'; ctx.fill(vv); ctx.lineWidth = 1.2; ctx.strokeStyle = stroke('vacuole', c.glass); ctx.stroke(vv); add('vacuole', vv); });
      [[-0.3, 0.16], [0.3, -0.12], [-0.05, 0.32], [0.18, 0.06]].forEach(([u, v]) => mito(ctx, c, cx + u * cw, cy + v * ch, add, stroke));
      labels.push(['membrane', cx + cw * 0.5, cy - ch * 0.1], ['nucleus', cx, cy], ['mito', cx + 0.3 * cw, cy - 0.12 * ch], ['vacuole', cx + 0.26 * cw, cy + 0.22 * ch], ['cyto', cx - 0.15 * cw, cy - 0.32 * ch]);
    }
    // ribosomes: tiny dots
    ctx.fillStyle = c.text3; for (let i = 0; i < 40; i++) { const u = Math.sin(i * 12.9898) * 43758.5453 % 1, v = Math.sin(i * 78.233) * 12345.678 % 1; ctx.fillRect(cx + u * cw * 0.4, cy + v * ch * 0.38, 1.6, 1.6); }
    // leader-line labels on the right
    // labels in a column on the right, in the same top-to-bottom order as the parts, so leader lines don't cross
    const lx = cx + cw / 2 + (narrow ? 22 : 40);
    labels.sort((a, b) => a[2] - b[2]);
    labels.forEach(([k, px, py], i) => {
      const ly = 34 + i * ((H - 60) / Math.max(1, labels.length - 1));
      ctx.strokeStyle = S.sel === k ? acc : c.lineHard; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(lx - 8, ly); ctx.stroke();
      text(ctx, P[k].n, lx, ly + 4, { size: narrow ? 12 : 13, weight: S.sel === k ? 700 : 500, color: S.sel === k ? acc : c.text });
    });
    text(ctx, T.ns, 12, H - 10, { size: 11, color: c.text3 });
  }
  function nucleus(ctx, c, x, y, r, add, stroke) {
    const p = new Path2D(); p.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = c.light ? 'rgba(124,58,237,0.14)' : 'rgba(167,139,250,0.18)'; ctx.fill(p); ctx.lineWidth = 1.6; ctx.strokeStyle = stroke('nucleus', c.light ? '#6d28d9' : '#a78bfa'); ctx.stroke(p);
    ctx.fillStyle = c.light ? '#6d28d9' : '#a78bfa'; ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.1, r * 0.3, 0, Math.PI * 2); ctx.fill();
    add('nucleus', p);
  }
  function chloro(ctx, c, x, y, add, stroke) {
    const p = new Path2D(); p.ellipse(x, y, 14, 7, 0.4, 0, Math.PI * 2);
    ctx.fillStyle = c.light ? '#3f9a4a' : '#4caf50'; ctx.fill(p); ctx.lineWidth = 1.2; ctx.strokeStyle = stroke('chloro', c.light ? '#215c2b' : '#a5d6a7'); ctx.stroke(p);
    ctx.strokeStyle = c.light ? '#215c2b' : '#1b5e20'; ctx.lineWidth = 1; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(x - 8 + k * 2, y + k * 3 - 2); ctx.lineTo(x + 6 + k * 2, y + k * 3 + 3); ctx.stroke(); }
    add('chloro', p);
  }
  function mito(ctx, c, x, y, add, stroke) {
    const p = new Path2D(); p.ellipse(x, y, 13, 6.5, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = c.light ? 'rgba(234,88,12,0.18)' : 'rgba(251,146,60,0.22)'; ctx.fill(p); ctx.lineWidth = 1.2; ctx.strokeStyle = stroke('mito', c.light ? '#c2410c' : '#fdba74'); ctx.stroke(p);
    ctx.beginPath(); ctx.moveTo(x - 9, y + 2); for (let k = 0; k < 5; k++) ctx.lineTo(x - 7 + k * 4, y + (k % 2 ? -3 : 3)); ctx.stroke();
    add('mito', p);
  }
  function update() {
    Object.keys(btns).forEach(k => btns[k].setAttribute('aria-pressed', String(S.sel === k)));
    if (!S.sel) info.textContent = L(T.pick);
    else info.innerHTML = '<strong>' + L(P[S.sel].n) + '</strong> · ' + L(P[S.sel].plantOnly ? T.only : T.both) + '<br>' + L(P[S.sel].d);
    ui.setCaption(S.type === 'plant' ? { en: 'Plant cell: cell wall, chloroplasts and one large vacuole.', af: 'Plantsel: selwand, chloroplaste en een groot vakuool.' } : { en: 'Animal cell: no cell wall, no chloroplasts, only small vacuoles.', af: 'Dieresel: geen selwand, geen chloroplaste, net klein vakuole.' });
    ui.cv.el.setAttribute('aria-label', L(T.aria) + ': ' + L(S.type === 'plant' ? T.plant : T.animal) + (S.sel ? ', ' + L(P[S.sel].n) : ''));
    ui.cv.draw();
  }
  update();
});
