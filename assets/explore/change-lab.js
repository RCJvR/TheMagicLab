/* Gr10 Physical and Chemical Change — what happens to the particles.
 * Six experiments, each shown twice: what you see (left) and the particles
 * (right). In a physical change the molecules stay the same and only their
 * arrangement changes; in a chemical change atoms swap partners and new
 * substances form. The atom count is the same before and after either way.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text, h } = MLX;
  const COL = { H: '#e5e7eb', O: '#ef4444', Na: '#a78bfa', Cl: '#4ade80', Fe: '#a8a29e', S: '#facc15', Mg: '#cbd5e1' };
  const RAD = { H: 5.5, O: 8.5, Na: 8, Cl: 10, Fe: 9.5, S: 9.5, Mg: 9.5 };
  const T = {
    aria: { en: 'Experiment on the left, particle view on the right', af: 'Eksperiment links, deeltjie-aansig regs' },
    exp: { en: 'Experiment', af: 'Eksperiment' }, run: { en: 'Run it', af: 'Voer uit' }, rev: { en: 'Try to reverse it', af: 'Probeer dit omkeer' },
    obs: { en: 'Evidence', af: 'Bewyse' }, atoms: { en: 'Atoms before → after', af: 'Atome voor → na' },
    parts: { en: 'Particles before → after', af: 'Deeltjies voor → na' }, energy: { en: 'Energy', af: 'Energie' },
    decide: { en: 'Physical or chemical?', af: 'Fisies of chemies?' },
    phys: { en: 'Physical change', af: 'Fisiese verandering' }, chem: { en: 'Chemical change', af: 'Chemiese verandering' },
    see: { en: 'What you see', af: 'Wat jy sien' }, particles: { en: 'Particles', af: 'Deeltjies' },
    before: { en: 'before', af: 'voor' }, after: { en: 'after', af: 'na' },
    absorbed: { en: 'absorbed (endothermic)', af: 'geabsorbeer (endotermies)' }, released: { en: 'released (exothermic)', af: 'vrygestel (eksotermies)' }, little: { en: 'hardly any', af: 'byna geen' },
    runFirst: { en: 'Run the experiment first and watch the particles.', af: 'Voer eers die eksperiment uit en kyk na die deeltjies.' },
    right: { en: 'Correct. ', af: 'Reg. ' }, wrong: { en: 'Look again. ', af: 'Kyk weer. ' },
  };

  // Particle arrangements. Each experiment gives atoms {el, b:[x,y], a:[x,y]} in a
  // unit box (0..1) plus bonds before/after as index pairs.
  function rnd(seed) { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
  function scatter(n, r, seed, pad) { const out = [], R = rnd(seed); let tries = 0; while (out.length < n && tries++ < 4000) { const p = [pad + R() * (1 - 2 * pad), pad + R() * (1 - 2 * pad)]; if (out.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > r)) out.push(p); } return out; }
  function grid(n, cols, x0, y0, dx, dy) { const out = []; for (let i = 0; i < n; i++) out.push([x0 + (i % cols) * dx, y0 + Math.floor(i / cols) * dy]); return out; }
  function water(c, ang) { const a = ang || 0, d = 0.045; return [['O', c], ['H', [c[0] + Math.cos(a + 0.9) * d, c[1] + Math.sin(a + 0.9) * d]], ['H', [c[0] + Math.cos(a + 2.25) * d, c[1] + Math.sin(a + 2.25) * d]]]; }

  const EXP = [
    { id: 'ice', type: 'phys', name: { en: 'Melt ice', af: 'Smelt ys' }, energy: 'absorbed',
      formula: 'H₂O(s) → H₂O(ℓ)', parts: { en: '9 H₂O → 9 H₂O', af: '9 H₂O → 9 H₂O' },
      obs: { en: 'The solid turns into a liquid. It is still water: cool it and it freezes again.', af: 'Die vaste stof word \'n vloeistof. Dit is steeds water: verkoel dit en dit vries weer.' },
      revMsg: { en: 'Cooled again: the water freezes back into ice. Same molecules, arranged in a lattice again.', af: 'Weer verkoel: die water vries terug tot ys. Dieselfde molekules, weer in \'n rooster gerangskik.' },
      why: { en: 'Only the arrangement of the water molecules changed; no new substance formed.', af: 'Net die rangskikking van die watermolekules het verander; geen nuwe stof het gevorm nie.' },
      build() { const b = grid(9, 3, 0.3, 0.3, 0.2, 0.2), a = scatter(9, 0.16, 7, 0.15); const atoms = [], bonds = []; b.forEach((p, i) => { const wb = water(p, 0), wa = water(a[i], i * 1.3); const k = atoms.length; wb.forEach((w, j) => atoms.push({ el: w[0], b: w[1], a: wa[j][1] })); bonds.push([k, k + 1], [k, k + 2]); }); return { atoms, bb: bonds, ab: bonds }; } },
    { id: 'salt', type: 'phys', name: { en: 'Dissolve salt', af: 'Los sout op' }, energy: 'little',
      formula: 'NaCl(s) → Na⁺(aq) + Cl⁻(aq)', parts: { en: 'NaCl crystal → separate Na⁺ and Cl⁻ ions', af: 'NaCl-kristal → aparte Na⁺- en Cl⁻-ione' },
      obs: { en: 'The crystals disappear into the water. Evaporate the water and the salt crystals come back.', af: 'Die kristalle verdwyn in die water. Verdamp die water en die soutkristalle kom terug.' },
      revMsg: { en: 'Water evaporated: the same Na⁺ and Cl⁻ ions pack into salt crystals again.', af: 'Water verdamp: dieselfde Na⁺- en Cl⁻-ione pak weer in soutkristalle.' },
      why: { en: 'The ions only spread out between the water molecules; evaporating the water gives the salt back.', af: 'Die ione versprei net tussen die watermolekules; as die water verdamp, kry jy die sout terug.' },
      build() { const b = grid(16, 4, 0.36, 0.36, 0.09, 0.09), a = scatter(16, 0.14, 3, 0.1); const atoms = b.map((p, i) => ({ el: ((i % 4) + Math.floor(i / 4)) % 2 ? 'Cl' : 'Na', b: p, a: a[i] })); return { atoms, bb: [], ab: [] }; } },
    { id: 'mix', type: 'phys', name: { en: 'Mix iron and sulfur', af: 'Meng yster en swael' }, energy: 'little',
      formula: 'Fe + S (mixture)', parts: { en: 'Fe atoms and S atoms, side by side', af: 'Fe-atome en S-atome langs mekaar' },
      obs: { en: 'Grey and yellow powders mixed. A magnet can still pull the iron out.', af: 'Grys en geel poeiers gemeng. \'n Magneet kan steeds die yster uittrek.' },
      revMsg: { en: 'A magnet pulls the iron out again: the two elements were never joined.', af: '\'n Magneet trek die yster weer uit: die twee elemente was nooit verbind nie.' },
      why: { en: 'A mixture: the iron and sulfur keep their own properties and can be separated by a magnet.', af: '\'n Mengsel: die yster en swael behou hul eie eienskappe en kan met \'n magneet geskei word.' },
      build() { const fe = grid(8, 2, 0.12, 0.2, 0.12, 0.18), s = grid(8, 2, 0.76, 0.2, 0.12, 0.18), a = scatter(16, 0.15, 11, 0.1); const atoms = fe.map((p, i) => ({ el: 'Fe', b: p, a: a[i] })).concat(s.map((p, i) => ({ el: 'S', b: p, a: a[8 + i] }))); return { atoms, bb: [], ab: [] }; } },
    { id: 'fes', type: 'chem', name: { en: 'Heat iron and sulfur', af: 'Verhit yster en swael' }, energy: 'released',
      formula: 'Fe + S → FeS', parts: { en: '8 Fe + 8 S → 8 FeS', af: '8 Fe + 8 S → 8 FeS' },
      obs: { en: 'The mixture glows red and keeps glowing; a black solid forms that a magnet no longer attracts.', af: 'Die mengsel gloei rooi en bly gloei; \'n swart vaste stof vorm wat \'n magneet nie meer aantrek nie.' },
      revMsg: { en: 'A magnet no longer pulls out any iron: the iron is now part of a new compound, iron sulfide.', af: '\'n Magneet trek nie meer yster uit nie: die yster is nou deel van \'n nuwe verbinding, ystersulfied.' },
      why: { en: 'Fe and S atoms bonded into a new substance (FeS) with different properties.', af: 'Fe- en S-atome het gebind tot \'n nuwe stof (FeS) met ander eienskappe.' },
      build() { const b = scatter(16, 0.15, 11, 0.1), g = grid(8, 4, 0.18, 0.3, 0.2, 0.36); const atoms = [], ab = []; for (let i = 0; i < 8; i++) { atoms.push({ el: 'Fe', b: b[i], a: [g[i][0] - 0.045, g[i][1]] }); atoms.push({ el: 'S', b: b[8 + i], a: [g[i][0] + 0.045, g[i][1]] }); ab.push([2 * i, 2 * i + 1]); } return { atoms, bb: [], ab }; } },
    { id: 'mg', type: 'chem', name: { en: 'Burn magnesium', af: 'Brand magnesium' }, energy: 'released',
      formula: '2Mg + O₂ → 2MgO', parts: { en: '6 Mg + 3 O₂ → 6 MgO', af: '6 Mg + 3 O₂ → 6 MgO' },
      obs: { en: 'A blinding white flame; the shiny ribbon becomes a white powder.', af: '\'n Verblindende wit vlam; die blink lint word \'n wit poeier.' },
      revMsg: { en: 'Cooling the white powder does not give back shiny magnesium: it stays magnesium oxide.', af: 'As die wit poeier afkoel, kry jy nie weer blink magnesium nie: dit bly magnesiumoksied.' },
      why: { en: 'Magnesium atoms combined with oxygen to form a new substance, magnesium oxide.', af: 'Magnesiumatome het met suurstof gekombineer om \'n nuwe stof, magnesiumoksied, te vorm.' },
      build() { const mg = grid(6, 6, 0.15, 0.82, 0.14, 0), o2 = scatter(3, 0.25, 5, 0.18).map(p => [p[0], p[1] * 0.55]); const g = grid(6, 3, 0.25, 0.32, 0.25, 0.34); const atoms = [], bb = [], ab = []; mg.forEach((p, i) => atoms.push({ el: 'Mg', b: p, a: [g[i][0] - 0.045, g[i][1]] })); o2.forEach((p, k) => { const i1 = 2 * k, i2 = 2 * k + 1; atoms.push({ el: 'O', b: [p[0] - 0.03, p[1]], a: [g[i1][0] + 0.045, g[i1][1]] }); atoms.push({ el: 'O', b: [p[0] + 0.03, p[1]], a: [g[i2][0] + 0.045, g[i2][1]] }); bb.push([6 + 2 * k, 7 + 2 * k]); }); for (let i = 0; i < 6; i++) ab.push([i, 6 + i]); return { atoms, bb, ab }; } },
    { id: 'h2o2', type: 'chem', name: { en: 'Decompose hydrogen peroxide', af: 'Ontbind waterstofperoksied' }, energy: 'released',
      formula: '2H₂O₂ → 2H₂O + O₂', parts: { en: '4 H₂O₂ → 4 H₂O + 2 O₂', af: '4 H₂O₂ → 4 H₂O + 2 O₂' },
      obs: { en: 'With a little manganese dioxide it fizzes; the gas relights a glowing splint (oxygen).', af: 'Met \'n bietjie mangaandioksied bruis dit; die gas laat \'n gloeiende splinter weer brand (suurstof).' },
      revMsg: { en: 'The oxygen has bubbled away and the liquid is now water; you cannot simply cool or filter it back to hydrogen peroxide.', af: 'Die suurstof het weggeborrel en die vloeistof is nou water; jy kan dit nie eenvoudig terug afkoel of filtreer na waterstofperoksied nie.' },
      why: { en: 'H₂O₂ molecules broke apart and their atoms formed new molecules: water and oxygen.', af: 'H₂O₂-molekules het opgebreek en hul atome het nuwe molekules gevorm: water en suurstof.' },
      build() { const c = grid(4, 2, 0.32, 0.3, 0.36, 0.4), atoms = [], bb = [], ab = []; const wpos = [[0.2, 0.68], [0.45, 0.78], [0.7, 0.68], [0.85, 0.85]], opos = [[0.3, 0.18], [0.72, 0.2]];
        c.forEach((p, m) => { const k = atoms.length; atoms.push({ el: 'H', b: [p[0] - 0.1, p[1] - 0.04] }, { el: 'O', b: [p[0] - 0.04, p[1]] }, { el: 'O', b: [p[0] + 0.04, p[1]] }, { el: 'H', b: [p[0] + 0.1, p[1] + 0.04] }); bb.push([k, k + 1], [k + 1, k + 2], [k + 2, k + 3]);
          const w = water(wpos[m], m); atoms[k + 1].a = w[0][1]; atoms[k].a = w[1][1]; atoms[k + 3].a = w[2][1]; ab.push([k + 1, k], [k + 1, k + 3]);
          const op = opos[m >> 1]; atoms[k + 2].a = [op[0] + (m % 2 ? 0.035 : -0.035), op[1]]; });
        ab.push([2, 6], [10, 14]); return { atoms, bb, ab }; } },
  ];

  let cur = 0, prog = 0, dir = 0, reversed = false, ran = false, data = EXP[0].build();
  const ui = MLX.layout(root, { height: (w) => Math.max(260, Math.min(340, Math.round(w * 0.4))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.exp);
  MLX.seg(c1, { options: EXP.map((e, i) => [i, e.name]), value: 0, onChange: (i) => select(i) });
  const btns = h('div', { class: 'mlx-btns' }); c1.appendChild(btns);
  const runBtn = MLX.button(btns, T.run, () => { dir = 1; ran = true; reversed = false; }, 'primary');
  const revBtn = MLX.button(btns, T.rev, () => { reversed = true; if (EXP[cur].type === 'phys') dir = -1; ui.setCaption(EXP[cur].revMsg); });
  const c2 = MLX.card(ui.side, T.obs);
  const ro = MLX.readout(c2, [['parts', T.parts], ['atoms', T.atoms], ['energy', T.energy]]);
  const c3 = MLX.card(ui.side, T.decide);
  const db = h('div', { class: 'mlx-seg' }); c3.appendChild(db);
  MLX.button(db, T.phys, () => decide('phys')); MLX.button(db, T.chem, () => decide('chem'));
  const fb = h('p', { class: 'mlx-note', style: 'margin-top:10px' }); c3.appendChild(fb);

  function counts(atoms) { const c = {}; atoms.forEach(a => { c[a.el] = (c[a.el] || 0) + 1; }); return Object.keys(c).map(k => c[k] + ' ' + k).join(', '); }
  function select(i) { cur = i; data = EXP[i].build(); prog = 0; dir = 0; ran = false; reversed = false; fb.textContent = ''; info(); }
  function info() {
    const e = EXP[cur];
    ro.set('parts', ran ? L(e.parts) : '?');
    ro.set('atoms', ran ? counts(data.atoms) + ' → ' + counts(data.atoms) : '?');
    ro.set('energy', ran ? L(T[e.energy]) : '?');
    ui.setCaption(ran ? (reversed ? e.revMsg : e.obs) : T.runFirst);
    revBtn.disabled = !ran;
  }
  function decide(k) {
    if (!ran) { fb.textContent = L(T.runFirst); fb.style.color = '#fbbf24'; return; }
    const ok = EXP[cur].type === k;
    fb.textContent = L(ok ? T.right : T.wrong) + L(EXP[cur].why);
    fb.style.color = ok ? '#86efac' : '#fca5a5';
  }

  function draw(ctx, W, H) {
    const e = EXP[cur], t = prog * prog * (3 - 2 * prog);
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const split = Math.round(W * 0.38);
    // ── left: what you see
    text(ctx, T.see, 14, 22, { size: 12, weight: 700, color: 'rgba(226,232,240,0.6)' });
    text(ctx, e.formula, split / 2, H - 14, { size: 12, mono: true, align: 'center', color: '#93c5fd' });
    macro(ctx, e, t, split, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.moveTo(split, 10); ctx.lineTo(split, H - 10); ctx.stroke();
    // ── right: particles
    const bx = split + 16, by = 30, bw = W - split - 30, bh = H - 48;
    text(ctx, T.particles, bx, 22, { size: 12, weight: 700, color: 'rgba(226,232,240,0.6)' });
    text(ctx, L(t < 0.5 ? T.before : T.after), bx + bw, 22, { size: 12, mono: true, align: 'right', color: 'rgba(226,232,240,0.5)' });
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.strokeRect(bx, by, bw, bh);
    const P = (p) => [bx + 14 + p[0] * (bw - 28), by + 14 + p[1] * (bh - 28)];
    const wob = (i) => (prog > 0 && prog < 1) ? Math.sin(i * 1.7 + prog * 20) * 3 : 0;
    const pos = data.atoms.map((a, i) => { const p0 = P(a.b), p1 = P(a.a); return [p0[0] + (p1[0] - p0[0]) * t + wob(i), p0[1] + (p1[1] - p0[1]) * t + wob(i + 3)]; });
    const bonds = (list, alpha) => { if (alpha <= 0) return; ctx.strokeStyle = `rgba(226,232,240,${0.7 * alpha})`; ctx.lineWidth = 3 * Math.max(1, Math.min(1.7, bw / 380)); list.forEach(([i, j]) => { ctx.beginPath(); ctx.moveTo(pos[i][0], pos[i][1]); ctx.lineTo(pos[j][0], pos[j][1]); ctx.stroke(); }); };
    const same = data.bb === data.ab;
    if (same) bonds(data.bb, 1); else { bonds(data.bb, 1 - Math.min(1, t * 2.2)); bonds(data.ab, Math.max(0, t * 2.2 - 1.2)); }
    const k = Math.max(1, Math.min(1.7, bw / 380));      // bigger atoms on wide screens
    data.atoms.forEach((a, i) => {
      const r = RAD[a.el] * k;
      ctx.beginPath(); ctx.arc(pos[i][0], pos[i][1], r, 0, Math.PI * 2);
      ctx.fillStyle = COL[a.el]; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 1; ctx.stroke();
      if (RAD[a.el] >= 8.5) text(ctx, a.el, pos[i][0], pos[i][1] + 3.5 * k, { size: Math.round(9 * k), weight: 800, align: 'center', color: '#111827' });
    });
  }

  // simple pictures of each experiment
  function macro(ctx, e, t, w, H) {
    const cx = w / 2, base = H - 50;
    const beaker = (fill, level) => {
      ctx.fillStyle = fill; ctx.fillRect(cx - 48, base - level, 96, level);
      ctx.strokeStyle = 'rgba(203,213,225,0.7)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - 50, base - 110); ctx.lineTo(cx - 50, base); ctx.lineTo(cx + 50, base); ctx.lineTo(cx + 50, base - 110); ctx.stroke();
    };
    const flame = (s) => { ctx.fillStyle = `rgba(251,146,60,${0.8 * s})`; ctx.beginPath(); ctx.moveTo(cx - 12, base + 28); ctx.quadraticCurveTo(cx, base - 10 * s, cx + 12, base + 28); ctx.fill(); ctx.fillStyle = `rgba(96,165,250,${0.8 * s})`; ctx.beginPath(); ctx.moveTo(cx - 6, base + 28); ctx.quadraticCurveTo(cx, base + 10, cx + 6, base + 28); ctx.fill(); };
    if (e.id === 'ice') {
      beaker('rgba(96,165,250,0.35)', 10 + 40 * t);
      const s = 60 * (1 - t); if (s > 2) { ctx.fillStyle = 'rgba(219,234,254,0.85)'; ctx.fillRect(cx - s / 2, base - 10 - s * 0.8 - 40 * t, s, s * 0.8); }
      flame(dir !== 0 && prog < 1 ? 1 : 0);
    } else if (e.id === 'salt') {
      beaker('rgba(96,165,250,0.3)', 70);
      for (let k = 0; k < 10; k++) { const a = 1 - t; if (a <= 0.02) break; ctx.fillStyle = `rgba(255,255,255,${0.9 * a})`; ctx.fillRect(cx - 30 + (k * 23) % 60, base - 8 - (k % 3) * 5, 6, 6); }
    } else if (e.id === 'mix' || e.id === 'fes') {
      ctx.strokeStyle = 'rgba(203,213,225,0.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - 18, base - 120); ctx.lineTo(cx - 18, base - 14); ctx.arc(cx, base - 14, 18, Math.PI, 0, true); ctx.lineTo(cx + 18, base - 120); ctx.stroke();
      if (e.id === 'mix') { const g = ctx.createLinearGradient(cx - 16, 0, cx + 16, 0); g.addColorStop(0, '#78716c'); g.addColorStop(t < 0.5 ? 0.5 : 0.5, t > 0.5 ? '#a3a061' : '#78716c'); g.addColorStop(1, t > 0.5 ? '#a3a061' : '#facc15'); ctx.fillStyle = t > 0.5 ? '#9a9466' : g; }
      else { const glow = t > 0.15 && t < 0.95 ? 1 : 0; ctx.fillStyle = t < 0.5 ? '#9a9466' : '#1f2937'; if (glow) { ctx.shadowColor = '#f97316'; ctx.shadowBlur = 20; ctx.fillStyle = '#ea580c'; } }
      ctx.beginPath(); ctx.moveTo(cx - 16, base - 50); ctx.lineTo(cx - 16, base - 14); ctx.arc(cx, base - 14, 16, Math.PI, 0, true); ctx.lineTo(cx + 16, base - 50); ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
      if (e.id === 'fes') flame(dir > 0 && prog > 0 && prog < 0.35 ? 1 : 0);
    } else if (e.id === 'mg') {
      const burning = t > 0.1 && t < 0.9;
      if (burning) { const g = ctx.createRadialGradient(cx, base - 40, 2, cx, base - 40, 70); g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, base - 40, 70, 0, Math.PI * 2); ctx.fill(); }
      ctx.strokeStyle = t < 0.5 ? '#e5e7eb' : '#f8fafc'; ctx.lineWidth = t < 0.5 ? 3 : 6; ctx.setLineDash(t < 0.5 ? [] : [3, 3]);
      ctx.beginPath(); ctx.moveTo(cx - 50, base - 40); ctx.lineTo(cx + 50, base - 40); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 70, base - 30); ctx.lineTo(cx - 48, base - 40); ctx.stroke();
    } else if (e.id === 'h2o2') {
      beaker('rgba(186,230,253,0.25)', 70);
      if (prog > 0 && prog < 1 && dir > 0) for (let k = 0; k < 14; k++) { const y = base - ((k * 37 + prog * 400) % 70); ctx.strokeStyle = 'rgba(226,232,240,0.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx - 36 + (k * 17) % 72, y, 3, 0, Math.PI * 2); ctx.stroke(); }
      ctx.strokeStyle = '#a16207'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + 30, base - 150); ctx.lineTo(cx + 5, base - 95); ctx.stroke();
      ctx.fillStyle = t > 0.4 ? '#fb923c' : '#7c2d12'; ctx.beginPath(); ctx.arc(cx + 4, base - 93, t > 0.4 ? 6 : 3, 0, Math.PI * 2); ctx.fill();
    }
  }

  select(0);
  MLX.loop(ui.stage, (dt) => {
    if (dir !== 0) { prog = Math.max(0, Math.min(1, prog + dir * dt / 2.6)); if (prog === 1 || prog === 0) { if (dir > 0) info(); dir = 0; } }
    ui.cv.draw();
  }).start();
});
