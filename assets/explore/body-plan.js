/* Gr11 Biodiversity of Animals — build a body plan, find the phylum.
 * Choose tissue layers, symmetry, gut, coelom and one special feature. The
 * cross-section and the top view update, and the plan is matched to the six
 * phyla in the CAPS syllabus (or the closest one, with what differs).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text } = MLX;
  const O = {
    layers: [['0', { en: 'None', af: 'Geen' }], ['2', { en: 'Two', af: 'Twee' }], ['3', { en: 'Three', af: 'Drie' }]],
    sym: [['none', { en: 'None', af: 'Geen' }], ['radial', { en: 'Radial', af: 'Radiaal' }], ['bilateral', { en: 'Bilateral', af: 'Bilateraal' }]],
    gut: [['0', { en: 'No gut', af: 'Geen derm' }], ['1', { en: 'One opening', af: 'Een opening' }], ['2', { en: 'Mouth + anus', af: 'Mond + anus' }]],
    coel: [['no', { en: 'No coelom', af: 'Geen seloom' }], ['yes', { en: 'True coelom', af: 'Ware seloom' }]],
    feat: [['none', { en: 'None', af: 'Geen' }], ['seg', { en: 'Segments', af: 'Segmente' }], ['legs', { en: 'Exoskeleton + jointed legs', af: 'Eksoskelet + gelede pote' }], ['noto', { en: 'Notochord / backbone', af: 'Notochord / ruggraat' }]],
  };
  const LAB = { layers: { en: 'Tissue layers', af: 'Weefsellae' }, sym: { en: 'Symmetry', af: 'Simmetrie' }, gut: { en: 'Gut', af: 'Derm' }, coel: { en: 'Body cavity', af: 'Liggaamsholte' }, feat: { en: 'Special feature', af: 'Spesiale kenmerk' } };
  const PHYLA = [
    { n: 'Porifera', ex: { en: 'sea sponge', af: 'seespons' }, p: { layers: '0', sym: 'none', gut: '0', coel: 'no', feat: 'none' } },
    { n: 'Cnidaria', ex: { en: 'jellyfish', af: 'jellievis' }, p: { layers: '2', sym: 'radial', gut: '1', coel: 'no', feat: 'none' } },
    { n: 'Platyhelminthes', ex: { en: 'flatworm, tapeworm', af: 'platwurm, lintwurm' }, p: { layers: '3', sym: 'bilateral', gut: '1', coel: 'no', feat: 'none' } },
    { n: 'Annelida', ex: { en: 'earthworm', af: 'erdwurm' }, p: { layers: '3', sym: 'bilateral', gut: '2', coel: 'yes', feat: 'seg' } },
    { n: 'Arthropoda', ex: { en: 'insect, spider, crab', af: 'insek, spinnekop, krap' }, p: { layers: '3', sym: 'bilateral', gut: '2', coel: 'yes', feat: 'legs' } },
    { n: 'Chordata', ex: { en: 'fish, frog, human', af: 'vis, padda, mens' }, p: { layers: '3', sym: 'bilateral', gut: '2', coel: 'yes', feat: 'noto' } },
  ];
  const T = {
    aria: { en: 'Cross-section and top view of the body plan you built', af: 'Deursnee en bo-aansig van die liggaamsplan wat jy gebou het' },
    build: { en: 'Build a body plan', af: 'Bou \'n liggaamsplan' }, result: { en: 'Which phylum?', af: 'Watter filum?' },
    cross: { en: 'Cross-section', af: 'Deursnee' }, top: { en: 'Top view', af: 'Bo-aansig' },
    ecto: { en: 'ectoderm', af: 'ektoderm' }, meso: { en: 'mesoderm', af: 'mesoderm' }, endo: { en: 'endoderm', af: 'endoderm' },
    coelom: { en: 'coelom', af: 'seloom' }, gutL: { en: 'gut', af: 'derm' }, mouth: { en: 'mouth', af: 'mond' }, anus: { en: 'anus', af: 'anus' },
    match: { en: 'Match', af: 'Pas by' }, close: { en: 'Closest', af: 'Naaste' }, differs: { en: 'differs in', af: 'verskil in' },
    eg: { en: 'e.g.', af: 'bv.' },
    noCoelom: { en: 'A coelom forms inside the mesoderm, so it needs three tissue layers.', af: '\'n Seloom vorm binne die mesoderm, so dit benodig drie weefsellae.' },
    noGut: { en: 'Without true tissue layers there is no gut lining (endoderm).', af: 'Sonder ware weefsellae is daar geen dermvoering (endoderm) nie.' },
  };
  const pick = { layers: '3', sym: 'bilateral', gut: '1', coel: 'no', feat: 'none' };
  const ui = MLX.layout(root, { height: (w) => Math.max(260, Math.min(340, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.build);
  const segs = {};
  Object.keys(O).forEach(k => { segs[k] = MLX.seg(c1, { label: LAB[k], options: O[k], value: pick[k], onChange: (v) => { pick[k] = v; update(); } }); });
  const c2 = MLX.card(ui.side, T.result);
  const res = MLX.h('div', { style: 'font-size:15px;font-weight:800;margin-bottom:6px' }); c2.appendChild(res);
  const why = MLX.h('p', { class: 'mlx-note' }); c2.appendChild(why);

  function match() {
    let best = null, bestN = -1;
    PHYLA.forEach(ph => { const n = Object.keys(pick).filter(k => ph.p[k] === pick[k]).length; if (n > bestN) { bestN = n; best = ph; } });
    return { ph: best, exact: bestN === 5, diff: Object.keys(pick).filter(k => best.p[k] !== pick[k]) };
  }
  function update() {
    const m = match();
    const opt = (k, v) => L(O[k].find(o => o[0] === v)[1]);
    if (m.exact) {
      res.textContent = L(T.match) + ': ' + m.ph.n; res.style.color = '#86efac';
      why.textContent = L(T.eg) + ' ' + L(m.ph.ex) + '.';
    } else {
      res.textContent = L(T.close) + ': ' + m.ph.n; res.style.color = '#fde68a';
      let t = L(T.differs) + ': ' + m.diff.map(k => L(LAB[k]).toLowerCase() + ' (' + opt(k, m.ph.p[k]) + ')').join(', ') + '.';
      if (pick.coel === 'yes' && pick.layers !== '3') t += ' ' + L(T.noCoelom);
      if (pick.gut !== '0' && pick.layers === '0') t += ' ' + L(T.noGut);
      why.textContent = t;
    }
    ui.setCaption(m.exact ? { en: `${m.ph.n}: ${opt('layers', pick.layers).toLowerCase()} tissue layers, ${opt('sym', pick.sym).toLowerCase()} symmetry, ${opt('gut', pick.gut).toLowerCase()}, ${opt('coel', pick.coel).toLowerCase()}.`, af: `${m.ph.n}: ${opt('layers', pick.layers).toLowerCase()} weefsellae, ${opt('sym', pick.sym).toLowerCase()} simmetrie, ${opt('gut', pick.gut).toLowerCase()}, ${opt('coel', pick.coel).toLowerCase()}.` }
      : { en: 'No phylum in the syllabus has exactly this body plan. Change the features that differ.', af: 'Geen filum in die sillabus het presies hierdie liggaamsplan nie. Verander die kenmerke wat verskil.' });
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const half = W / 2;
    text(ctx, T.cross, 14, 22, { size: 12, weight: 700, color: 'rgba(226,232,240,0.6)' });
    text(ctx, T.top, half + 14, 22, { size: 12, weight: 700, color: 'rgba(226,232,240,0.6)' });
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.moveTo(half, 12); ctx.lineTo(half, H - 12); ctx.stroke();
    // ── cross-section: rings from outside in
    const cx = half / 2, cy = H / 2 + 8, R = Math.min(half * 0.36, H * 0.36);
    const lab = (s, x, y, c) => text(ctx, s, x, y, { size: 11, weight: 700, color: c });
    if (pick.layers === '0') {
      // loose cells around a water channel, no true tissues
      ctx.fillStyle = 'rgba(252,165,165,0.35)';
      for (let k = 0; k < 60; k++) { const a = k * 2.4, r = R * (0.45 + 0.5 * ((k * 0.37) % 1)); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 5, 0, Math.PI * 2); ctx.fill(); }
      ctx.strokeStyle = 'rgba(147,197,253,0.6)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(cx, cy, R * 0.35, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      lab({ en: 'cells, no tissues', af: 'selle, geen weefsels' }, cx - R, cy + R + 22, '#fca5a5');
    } else {
      const three = pick.layers === '3', coel = pick.coel === 'yes' && three;
      ring(ctx, cx, cy, R, R * 0.86, '#60a5fa');                        // ectoderm
      if (three) {
        ring(ctx, cx, cy, R * 0.86, R * 0.36, '#f472b6');                // mesoderm (split by a coelom)
        if (coel) { ctx.fillStyle = '#0b1220'; ctx.beginPath(); ctx.arc(cx, cy, R * 0.7, 0, Math.PI * 2); ctx.arc(cx, cy, R * 0.48, 0, Math.PI * 2, true); ctx.fill('evenodd'); ring(ctx, cx, cy, R * 0.48, R * 0.36, '#f472b6'); }
      } else {
        ctx.fillStyle = 'rgba(203,213,225,0.15)'; ctx.beginPath(); ctx.arc(cx, cy, R * 0.86, 0, Math.PI * 2); ctx.arc(cx, cy, R * 0.36, 0, Math.PI * 2, true); ctx.fill('evenodd');
      }
      if (pick.gut !== '0') { ring(ctx, cx, cy, R * 0.36, R * 0.24, '#fbbf24'); ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(cx, cy, R * 0.24, 0, Math.PI * 2); ctx.fill(); }
      const lx = cx + R + 10;
      lab(T.ecto, Math.min(lx, half - 70), cy - R + 10, '#93c5fd');
      if (three) lab(T.meso, Math.min(lx, half - 70), cy - R * 0.45, '#f9a8d4');
      else lab({ en: 'jelly (mesoglea)', af: 'jellie (mesoglea)' }, Math.min(lx, half - 100), cy - R * 0.45, 'rgba(203,213,225,0.7)');
      if (coel) lab(T.coelom, Math.min(lx, half - 70), cy - R * 0.05, 'rgba(226,232,240,0.7)');
      if (pick.gut !== '0') { lab(T.endo, Math.min(lx, half - 70), cy + R * 0.35, '#fde68a'); lab(T.gutL, cx - 10, cy + 4, 'rgba(226,232,240,0.7)'); }
      if (pick.feat === 'noto') { ctx.fillStyle = '#c084fc'; ctx.beginPath(); ctx.arc(cx, cy - R * 0.58, R * 0.08, 0, Math.PI * 2); ctx.fill(); }
      if (pick.feat === 'legs') { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R + 3, 0, Math.PI * 2); ctx.stroke(); }
    }
    // ── top view: outline with symmetry planes, mouth and anus
    const tx = half + half / 2, ty = H / 2 + 8, S = Math.min(half * 0.32, H * 0.34);
    ctx.save(); ctx.translate(tx, ty);
    ctx.fillStyle = 'rgba(148,163,184,0.18)'; ctx.strokeStyle = 'rgba(226,232,240,0.75)'; ctx.lineWidth = 2;
    ctx.beginPath();
    if (pick.sym === 'none') { for (let k = 0; k <= 24; k++) { const a = k / 24 * Math.PI * 2, r = S * (0.75 + 0.25 * Math.sin(a * 3 + 1) * Math.cos(a * 2)); k ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); } }
    else if (pick.sym === 'radial') { for (let k = 0; k <= 48; k++) { const a = k / 48 * Math.PI * 2, r = S * (0.82 + 0.12 * Math.cos(a * 8)); k ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); } }
    else ctx.ellipse(0, 0, S * 0.42, S * 1.05, 0, 0, Math.PI * 2);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    if (pick.feat === 'seg' || pick.feat === 'legs') { ctx.strokeStyle = 'rgba(226,232,240,0.35)'; ctx.lineWidth = 1; for (let k = -4; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(-S * 0.42 * Math.sqrt(1 - Math.pow(k / 5, 2)), k * S * 0.2); ctx.lineTo(S * 0.42 * Math.sqrt(1 - Math.pow(k / 5, 2)), k * S * 0.2); ctx.stroke(); } }
    if (pick.feat === 'legs' && pick.sym === 'bilateral') { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2.5; for (let k = -1; k <= 1; k++) [-1, 1].forEach(sg => { ctx.beginPath(); ctx.moveTo(sg * S * 0.4, k * S * 0.35); ctx.lineTo(sg * S * 0.75, k * S * 0.35 - 10); ctx.lineTo(sg * S * 0.9, k * S * 0.35 + 14); ctx.stroke(); }); }
    if (pick.feat === 'noto' && pick.sym === 'bilateral') { ctx.strokeStyle = '#c084fc'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -S * 0.85); ctx.lineTo(0, S * 0.85); ctx.stroke(); }
    // symmetry planes
    ctx.strokeStyle = 'rgba(253,224,71,0.8)'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    if (pick.sym === 'radial') for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; ctx.beginPath(); ctx.moveTo(-Math.cos(a) * S * 1.1, -Math.sin(a) * S * 1.1); ctx.lineTo(Math.cos(a) * S * 1.1, Math.sin(a) * S * 1.1); ctx.stroke(); }
    if (pick.sym === 'bilateral') { ctx.beginPath(); ctx.moveTo(0, -S * 1.2); ctx.lineTo(0, S * 1.2); ctx.stroke(); }
    ctx.setLineDash([]);
    // mouth / anus
    const dot = (x, y, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill(); };
    if (pick.gut === '1') { const y = pick.sym === 'bilateral' ? -S * 0.8 : 0; dot(0, y, '#fbbf24'); text(ctx, L(T.mouth) + ' = ' + L(T.anus), 10, y + 4, { size: 11, weight: 700, color: '#fde68a' }); }
    if (pick.gut === '2') {
      const y1 = pick.sym === 'bilateral' ? -S * 0.85 : -S * 0.3, y2 = pick.sym === 'bilateral' ? S * 0.85 : S * 0.3;
      ctx.strokeStyle = 'rgba(251,191,36,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, y1); ctx.lineTo(0, y2); ctx.stroke();
      dot(0, y1, '#fbbf24'); dot(0, y2, '#f97316');
      text(ctx, T.mouth, 10, y1 + 4, { size: 11, weight: 700, color: '#fde68a' }); text(ctx, T.anus, 10, y2 + 4, { size: 11, weight: 700, color: '#fdba74' });
    }
    ctx.restore();
  }
  function ring(ctx, x, y, r1, r2, col) {
    ctx.fillStyle = col + '55'; ctx.strokeStyle = col; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y, r1, 0, Math.PI * 2); ctx.arc(x, y, r2, 0, Math.PI * 2, true); ctx.fill('evenodd');
    ctx.beginPath(); ctx.arc(x, y, r1, 0, Math.PI * 2); ctx.stroke();
  }

  update();
});
