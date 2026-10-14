/* Gr11 Micro-organisms — a disc-diffusion test.
 * An agar plate is covered with one kind of micro-organism; five paper discs
 * soaked in different drugs are placed on it. While it incubates, the organism
 * grows everywhere except in a clear zone around a disc that kills or stops it.
 * Viruses cannot grow on agar on their own: they are grown in a layer of host
 * cells, where they make clear "plaques" of dead cells.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const DISCS = [
    { k: 'A', name: { en: 'Antibiotic A', af: 'Antibiotikum A' } },
    { k: 'B', name: { en: 'Antibiotic B', af: 'Antibiotikum B' } },
    { k: 'F', name: { en: 'Antifungal', af: 'Swamdoder' } },
    { k: 'V', name: { en: 'Antiviral', af: 'Antivirale middel' } },
    { k: 'W', name: { en: 'Water (control)', af: 'Water (kontrole)' } },
  ];
  // zone diameters in mm (6 mm = the disc itself, i.e. no effect)
  const ORG = {
    bact: { name: { en: 'Bacterium', af: 'Bakterie' }, lawn: '#e9d8a6', zones: { A: 19, B: 25, F: 6, V: 6, W: 6 },
      sum: { en: 'Both antibiotics clear zones; the antifungal and antiviral do nothing to bacteria.', af: 'Albei antibiotika maak sones skoon; die swamdoder en antivirale middel doen niks aan bakterieë nie.' } },
    res: { name: { en: 'Resistant bacterium', af: 'Weerstandige bakterie' }, lawn: '#e5cf93', zones: { A: 6, B: 21, F: 6, V: 6, W: 6 },
      sum: { en: 'This strain is resistant to antibiotic A: it grows right up to the disc. Antibiotic B still works.', af: 'Hierdie stam is weerstandig teen antibiotikum A: dit groei tot teen die skyfie. Antibiotikum B werk steeds.' } },
    fungus: { name: { en: 'Fungus (yeast)', af: 'Swam (gis)' }, lawn: '#f1f0e8', zones: { A: 6, B: 6, F: 23, V: 6, W: 6 },
      sum: { en: 'Fungi are eukaryotes: antibiotics that target bacterial cells do not affect them, but the antifungal does.', af: 'Swamme is eukariote: antibiotika wat bakteriese selle teiken, raak hulle nie, maar die swamdoder wel.' } },
    virus: { name: { en: 'Virus (in host cells)', af: 'Virus (in gasheerselle)' }, lawn: '#f4b6b6', zones: { A: 6, B: 6, F: 6, V: 18, W: 6 }, plaques: true,
      sum: { en: 'Viruses have no cell wall or ribosomes of their own for antibiotics to attack. Only the antiviral protects the host cells around it.', af: 'Virusse het nie hul eie selwand of ribosome wat antibiotika kan aanval nie. Net die antivirale middel beskerm die gasheerselle daarom.' } },
  };
  const T = {
    aria: { en: 'Agar plate with five antibiotic discs', af: 'Agarplaat met vyf antibiotikaskyfies' },
    plate: { en: 'The plate', af: 'Die plaat' }, org: { en: 'Grown on the plate', af: 'Op die plaat gekweek' },
    inc: { en: 'Incubation time', af: 'Inkubasietyd' }, h: { en: 'h', af: 'h' },
    zones: { en: 'Zone diameters', af: 'Sone-deursnee' }, clickDisc: { en: 'Click a disc on the plate to measure its zone.', af: 'Klik op \'n skyfie op die plaat om sy sone te meet.' },
    none: { en: 'no zone', af: 'geen sone' }, area: { en: 'area', af: 'oppervlakte' },
    grow: { en: 'Incubate the plate to let the micro-organism grow.', af: 'Inkubeer die plaat sodat die mikro-organisme kan groei.' },
  };
  const POS = [[0, -0.52], [0.5, -0.16], [0.31, 0.45], [-0.31, 0.45], [-0.5, -0.16]];
  let org = 'bact', hours = 0, sel = 0;
  const ui = MLX.layout(root, { height: (w) => Math.max(270, Math.min(380, Math.round(w * 0.46))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.plate);
  MLX.seg(c1, { label: T.org, options: Object.keys(ORG).map(k => [k, ORG[k].name]), value: org, onChange: (v) => { org = v; inc.set(0); hours = 0; update(); } });
  const inc = MLX.slider(c1, { label: T.inc, min: 0, max: 24, step: 1, value: 0, fmt: (v) => v + ' ' + L(T.h), onInput: (v) => { hours = v; update(); } });
  const c2 = MLX.card(ui.side, T.zones);
  const ro = MLX.readout(c2, DISCS.map(d => [d.k, d.name]));
  const note = MLX.h('p', { class: 'mlx-note', style: 'margin-top:8px', text: L(T.clickDisc) }); c2.appendChild(note);

  const grown = () => Math.min(1, hours / 18);
  function zoneMm(k) { return ORG[org].zones[k]; }
  function update() {
    const g = grown();
    DISCS.forEach(d => {
      const z = zoneMm(d.k);
      ro.set(d.k, g < 0.4 ? '—' : z <= 6 ? L(T.none) : z + ' mm', g >= 0.4 && z > 6 ? '#86efac' : '');
    });
    if (g < 0.4) ui.setCaption(T.grow);
    else {
      const d = DISCS[sel], z = zoneMm(d.k), r = z / 2;
      ui.setCaption(L(d.name) + ': ' + (z <= 6 ? L(T.none) : `${z} mm · r = ${num(r, 1)} mm · ${L(T.area)} = π r² = ${num(Math.PI * r * r, 0)} mm²`) + '. ' + L(ORG[org].sum));
    }
    ui.cv.draw();
  }

  let geo = null;
  function draw(ctx, W, H) {
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const R = Math.min(H * 0.44, W * 0.3), cx = W * 0.42, cy = H * 0.5;
    const pxPerMm = R / 45;                              // a 90 mm Petri dish
    geo = { R, cx, cy };
    const o = ORG[org], g = grown();
    // agar
    ctx.fillStyle = '#c9b77e'; ctx.globalAlpha = 0.28; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    // lawn of growth, with clear zones cut out
    if (g > 0) {
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R - 3, 0, Math.PI * 2);
      // bacteria/fungi: no growth inside a zone. Viruses: the host cells grow
      // everywhere; a zone only means no plaques there (cells protected).
      if (!o.plaques) DISCS.forEach((d, i) => { const z = zoneMm(d.k); if (z > 6) { const x = cx + POS[i][0] * R, y = cy + POS[i][1] * R; ctx.moveTo(x + z / 2 * pxPerMm, y); ctx.arc(x, y, z / 2 * pxPerMm, 0, Math.PI * 2, true); } });
      ctx.clip('evenodd');
      ctx.globalAlpha = 0.25 + 0.7 * g; ctx.fillStyle = o.lawn; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      // texture: colonies / host cells
      ctx.globalAlpha = 0.35 * g; ctx.fillStyle = '#00000055';
      for (let k = 0; k < 260; k++) { const a = k * 2.399, rr = Math.sqrt(k / 260) * R; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 1.6, 0, Math.PI * 2); ctx.fill(); }
      // viral plaques: holes of dead host cells
      if (o.plaques && g > 0.3) {
        ctx.globalAlpha = 1; ctx.fillStyle = '#2a1414';
        for (let k = 0; k < 70; k++) {
          const a = k * 2.13 + 0.5, rr = (0.15 + 0.82 * ((k * 0.618) % 1)) * R, px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
          const shielded = DISCS.some((d, i) => zoneMm(d.k) > 6 && Math.hypot(px - (cx + POS[i][0] * R), py - (cy + POS[i][1] * R)) < zoneMm(d.k) / 2 * pxPerMm);
          if (!shielded) { ctx.beginPath(); ctx.arc(px, py, (2 + (k % 4)) * g, 0, Math.PI * 2); ctx.fill(); }
        }
      }
      ctx.restore(); ctx.globalAlpha = 1;
    }
    // virus plate: outline the plaque-free (protected) zone so it can be measured
    if (o.plaques && g > 0.3) DISCS.forEach((d, i) => { const z = zoneMm(d.k); if (z > 6) { ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(cx + POS[i][0] * R, cy + POS[i][1] * R, z / 2 * pxPerMm, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); } });
    // dish rim
    ctx.strokeStyle = 'rgba(226,232,240,0.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    // discs and the selected zone's ruler
    DISCS.forEach((d, i) => {
      const x = cx + POS[i][0] * R, y = cy + POS[i][1] * R, r = 3 * pxPerMm;
      ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = i === sel ? MLX.accent() : 'rgba(0,0,0,0.3)'; ctx.lineWidth = i === sel ? 2.5 : 1; ctx.stroke();
      text(ctx, d.k, x, y + 4, { size: 11, weight: 800, align: 'center', color: '#111827' });
      if (i === sel && g >= 0.4) {
        const z = zoneMm(d.k), half = z / 2 * pxPerMm;
        ctx.strokeStyle = '#fde047'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(x - half, y + r + 8); ctx.lineTo(x + half, y + r + 8); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(x - half, y + r + 3); ctx.lineTo(x - half, y + r + 13); ctx.moveTo(x + half, y + r + 3); ctx.lineTo(x + half, y + r + 13); ctx.stroke();
        text(ctx, z + ' mm', x, y + r + 26, { size: 11, mono: true, weight: 700, align: 'center', color: '#fde047' });
      }
    });
    // legend
    const lx = cx + R + 24;
    DISCS.forEach((d, i) => text(ctx, d.k + '  ' + L(d.name), lx, cy - R * 0.5 + i * 20, { size: 12, color: i === sel ? '#e2e8f0' : 'rgba(226,232,240,0.6)', weight: i === sel ? 700 : 500 }));
    text(ctx, '90 mm', cx, cy + R + 16, { size: 11, mono: true, align: 'center', color: 'rgba(226,232,240,0.45)' });
  }
  ui.cv.el.addEventListener('pointerdown', (e) => {
    if (!geo) return;
    const r = ui.cv.el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    let best = -1, bd = 1e9;
    POS.forEach((p, i) => { const d = Math.hypot(x - (geo.cx + p[0] * geo.R), y - (geo.cy + p[1] * geo.R)); if (d < bd) { bd = d; best = i; } });
    if (bd < geo.R * 0.3) { sel = best; update(); }
  });

  update();
});
