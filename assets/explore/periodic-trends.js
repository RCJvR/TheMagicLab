/* Gr10 The periodic table — periodic trends across a period and down a group, for H to Kr (Z 1–36).
 * Real data, shown as a heat map on a mini periodic table and as a graph against Z:
 *   atomic (covalent) radius in pm — Cordero et al. 2008 (the radii the old sim used);
 *   first ionisation energy in kJ·mol⁻¹ — standard values (Al 577, Si 786 as in the lesson's workbook table);
 *   electronegativity (Pauling) — the values on the CAPS/NSC data sheet (noble gases have none).
 * Across a period the nuclear charge rises while electrons go into the same shell: radius falls, IE and EN rise.
 * Down a group each element has one more shell, so outer electrons are further away and more shielded: radius
 * rises, IE and EN fall.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  // [symbol, English, Afrikaans, period, group, radius pm, IE kJ/mol, EN or null]
  const D = [null,
    ['H', 'Hydrogen', 'Waterstof', 1, 1, 31, 1312, 2.1], ['He', 'Helium', 'Helium', 1, 18, 28, 2372, null],
    ['Li', 'Lithium', 'Litium', 2, 1, 128, 520, 1.0], ['Be', 'Beryllium', 'Berillium', 2, 2, 96, 899, 1.5],
    ['B', 'Boron', 'Boor', 2, 13, 84, 801, 2.0], ['C', 'Carbon', 'Koolstof', 2, 14, 76, 1086, 2.5],
    ['N', 'Nitrogen', 'Stikstof', 2, 15, 71, 1402, 3.0], ['O', 'Oxygen', 'Suurstof', 2, 16, 66, 1314, 3.5],
    ['F', 'Fluorine', 'Fluoor', 2, 17, 57, 1681, 4.0], ['Ne', 'Neon', 'Neon', 2, 18, 58, 2081, null],
    ['Na', 'Sodium', 'Natrium', 3, 1, 166, 496, 0.9], ['Mg', 'Magnesium', 'Magnesium', 3, 2, 141, 738, 1.2],
    ['Al', 'Aluminium', 'Aluminium', 3, 13, 121, 577, 1.5], ['Si', 'Silicon', 'Silikon', 3, 14, 111, 786, 1.8],
    ['P', 'Phosphorus', 'Fosfor', 3, 15, 107, 1012, 2.1], ['S', 'Sulfur', 'Swael', 3, 16, 105, 1000, 2.5],
    ['Cl', 'Chlorine', 'Chloor', 3, 17, 102, 1251, 3.0], ['Ar', 'Argon', 'Argon', 3, 18, 106, 1521, null],
    ['K', 'Potassium', 'Kalium', 4, 1, 203, 419, 0.8], ['Ca', 'Calcium', 'Kalsium', 4, 2, 176, 590, 1.0],
    ['Sc', 'Scandium', 'Skandium', 4, 3, 170, 633, 1.3], ['Ti', 'Titanium', 'Titaan', 4, 4, 160, 659, 1.5],
    ['V', 'Vanadium', 'Vanadium', 4, 5, 153, 651, 1.6], ['Cr', 'Chromium', 'Chroom', 4, 6, 139, 653, 1.6],
    ['Mn', 'Manganese', 'Mangaan', 4, 7, 139, 717, 1.5], ['Fe', 'Iron', 'Yster', 4, 8, 132, 763, 1.8],
    ['Co', 'Cobalt', 'Kobalt', 4, 9, 126, 760, 1.8], ['Ni', 'Nickel', 'Nikkel', 4, 10, 124, 737, 1.8],
    ['Cu', 'Copper', 'Koper', 4, 11, 132, 746, 1.9], ['Zn', 'Zinc', 'Sink', 4, 12, 122, 906, 1.6],
    ['Ga', 'Gallium', 'Gallium', 4, 13, 122, 579, 1.6], ['Ge', 'Germanium', 'Germanium', 4, 14, 120, 762, 1.8],
    ['As', 'Arsenic', 'Arseen', 4, 15, 119, 947, 2.0], ['Se', 'Selenium', 'Seleen', 4, 16, 120, 941, 2.4],
    ['Br', 'Bromine', 'Broom', 4, 17, 120, 1140, 2.8], ['Kr', 'Krypton', 'Kripton', 4, 18, 116, 1351, null],
  ];
  const PROP = {
    r: { i: 5, lo: 0, hi: 220, d: 0, name: { en: 'Atomic radius', af: 'Atoomradius' }, unit: 'pm', ax: { en: 'Atomic radius (pm)', af: 'Atoomradius (pm)' } },
    ie: { i: 6, lo: 0, hi: 2500, d: 0, name: { en: 'First ionisation energy', af: 'Eerste ionisasie-energie' }, unit: 'kJ·mol⁻¹', ax: { en: 'First ionisation energy (kJ·mol⁻¹)', af: 'Eerste ionisasie-energie (kJ·mol⁻¹)' } },
    en: { i: 7, lo: 0, hi: 4.5, d: 1, name: { en: 'Electronegativity', af: 'Elektronegatiwiteit' }, unit: { en: '(Pauling)', af: '(Pauling)' }, ax: { en: 'Electronegativity (Pauling)', af: 'Elektronegatiwiteit (Pauling)' } },
  };
  const T = {
    aria: { en: 'A periodic table of elements 1 to 36 coloured by a periodic property, and a graph of that property against atomic number', af: '\'n Periodieke tabel van elemente 1 tot 36 gekleur volgens \'n periodieke eienskap, en \'n grafiek van daardie eienskap teen atoomgetal' },
    el: { en: 'Element', af: 'Element' }, per: { en: 'Period', af: 'Periode' }, grp: { en: 'Group', af: 'Groep' }, val: { en: 'Valence electrons', af: 'Valenselektrone' },
    show: { en: 'Show', af: 'Wys' }, prop: { en: 'Property', af: 'Eienskap' }, pr: { en: 'Radius', af: 'Radius' }, pie: { en: 'Ionisation energy', af: 'Ionisasie-energie' }, pen: { en: 'Electronegativity', af: 'Elektronegatiwiteit' },
    cmp: { en: 'Compare along', af: 'Vergelyk langs' }, cP: { en: 'Its period', af: 'Sy periode' }, cG: { en: 'Its group', af: 'Sy groep' },
    pick: { en: 'Element (or tap the table)', af: 'Element (of tik op die tabel)' }, xZ: { en: 'Atomic number Z', af: 'Atoomgetal Z' },
    low: { en: 'low', af: 'laag' }, high: { en: 'high', af: 'hoog' }, noval: { en: 'no value', af: 'geen waarde' }, of: { en: ' of ', af: ' van ' },
  };
  const S = { z: 11, prop: 'r', cmp: 'p' };
  const P = () => PROP[S.prop];
  const v = (z) => D[z][P().i];
  const nm = (z) => MLX.af ? D[z][2] : D[z][1];
  const fmtV = (x) => x == null ? '—' : (S.prop === 'en' ? num(x, 1) : MLX.big(x));
  const valence = (z) => { const g = D[z][4]; return z === 2 ? 2 : g <= 2 ? g : g >= 13 ? g - 10 : null; };
  const members = () => { const out = []; for (let z = 1; z <= 36; z++) if (S.cmp === 'p' ? D[z][3] === D[S.z][3] : D[z][4] === D[S.z][4]) out.push(z); return out; };

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 470 : Math.max(470, Math.min(540, Math.round(w * 0.6))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: '', unit: '' });
  const primLab = prim.el.querySelector('.mlx-card-title'), primUnit = prim.el.querySelector('.mlx-primary-unit');
  const ro = MLX.readout(prim.el, [['e', T.el], ['p', T.per], ['g', T.grp], ['v', T.val]]);
  const c1 = MLX.card(ui.side, T.show);
  MLX.seg(c1, { label: T.prop, options: [['r', T.pr], ['ie', T.pie], ['en', T.pen]], value: S.prop, onChange: (x) => { S.prop = x; update(); } });
  MLX.seg(c1, { label: T.cmp, options: [['p', T.cP], ['g', T.cG]], value: S.cmp, onChange: (x) => { S.cmp = x; update(); } });
  const sz = MLX.slider(c1, { label: T.pick, min: 1, max: 36, step: 1, value: S.z, fmt: (z) => 'Z = ' + z + ' (' + D[z][0] + ')', speak: (z) => 'Z ' + z + ', ' + nm(z), onInput: (z) => { S.z = z; update(); } });
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx, cells = [], gbox = null;
  const COLS_PHONE = [1, 2, 'gap', 13, 14, 15, 16, 17, 18];
  function accentRGB() {
    const m = String(c.accent).match(/\d+(\.\d+)?/g);
    if (m && m.length >= 3) return m.slice(0, 3).map(Number);
    const hx = String(c.accent).replace('#', ''); return [0, 2, 4].map(i => parseInt(hx.substr(i, 2), 16) || 128);
  }
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const tableH = table(W);
    ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(14, tableH + 0.5); ctx.lineTo(W - 14, tableH + 0.5); ctx.stroke();
    graph(0, tableH + 6, W, H - tableH - 6);
  }

  function table(W) {
    const phone = W < 640, lm = 30, top = 24;
    const cols = phone ? COLS_PHONE : Array.from({ length: 18 }, (_, i) => i + 1);
    const gapW = phone ? 22 : 0, n = phone ? cols.length - 1 : 18;
    const cw = Math.min(phone ? 44 : 48, (W - lm - 12 - gapW) / n), ch = Math.min(cw, phone ? 40 : 42);
    const colX = {}; let x = lm;
    cols.forEach(g => { colX[g] = x; x += g === 'gap' ? gapW : cw; });
    const rgb = accentRGB(), p = P(), vals = D.slice(1).map(d => d[p.i]).filter(x => x != null);
    const lo = Math.min(...vals), hi = Math.max(...vals);
    const mem = new Set(members());
    cells = [];
    // group numbers and period labels
    cols.forEach(g => { if (g !== 'gap') text(ctx, String(g), colX[g] + cw / 2, top - 8, { size: 12, mono: true, align: 'center', color: c.text3 }); });
    if (phone) text(ctx, '3–12', colX.gap + gapW / 2, top - 8, { size: 11, mono: true, align: 'center', color: c.text3 });
    for (let pr = 1; pr <= 4; pr++) text(ctx, String(pr), lm - 10, top + (pr - 0.5) * ch + 4, { size: 12, mono: true, align: 'right', color: c.text3 });
    for (let z = 1; z <= 36; z++) {
      const d = D[z], g = d[4];
      if (phone && g >= 3 && g <= 12) continue;
      const X = colX[g], Y = top + (d[3] - 1) * ch, val = d[p.i];
      const t = val == null ? 0 : (val - lo) / (hi - lo), a = 0.07 + 0.83 * t;
      if (val == null) { ctx.fillStyle = c.lineSoft; ctx.fillRect(X + 1, Y + 1, cw - 2, ch - 2); }
      else { ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(3)})`; ctx.fillRect(X + 1, Y + 1, cw - 2, ch - 2); }
      const dark = val != null && a > 0.5, tc = dark ? c.stage : c.ink;
      text(ctx, d[0], X + cw / 2, Y + ch * 0.48, { size: cw < 30 ? 12 : 14, weight: 700, align: 'center', color: tc });
      if (cw >= 30) text(ctx, val == null ? '–' : (cw < 44 ? (S.prop === 'en' ? num(val, 1) : String(val)) : fmtV(val)), X + cw / 2, Y + ch * 0.82, { size: 11, mono: true, align: 'center', color: dark ? c.stage : c.text2 });
      if (mem.has(z)) { ctx.strokeStyle = c.text2; ctx.lineWidth = 1; ctx.setLineDash([3, 2]); ctx.strokeRect(X + 1.5, Y + 1.5, cw - 3, ch - 3); ctx.setLineDash([]); }
      if (z === S.z) { ctx.strokeStyle = c.ink; ctx.lineWidth = 2.5; ctx.strokeRect(X + 1.5, Y + 1.5, cw - 3, ch - 3); }
      cells.push([z, X, Y, cw, ch]);
    }
    if (phone) { ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(colX.gap + gapW / 2, top + 3 * ch + 4); ctx.lineTo(colX.gap + gapW / 2, top + 4 * ch - 4); ctx.stroke(); }
    // legend: colour ramp low → high
    const ly = top + 4 * ch + 14, lw = Math.min(200, W * 0.36), lx = W - lw - 60;
    for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(0.07 + 0.83 * i / 39).toFixed(3)})`; ctx.fillRect(lx + i * lw / 40, ly, lw / 40 + 0.5, 10); }
    text(ctx, fmtV(lo), lx - 6, ly + 10, { size: 12, mono: true, align: 'right', color: c.text3 });
    text(ctx, fmtV(hi), lx + lw + 6, ly + 10, { size: 12, mono: true, color: c.text3 });
    if (!phone) text(ctx, L(p.name) + (typeof p.unit === 'string' ? ' (' + p.unit + ')' : ' ' + L(p.unit)), lx - 52, ly + 10, { size: 12, align: 'right', color: c.text2 });
    return ly + 26;
  }

  function graph(x0, y0, w, h) {
    const p = P();
    const ax = MLX.axes(ctx, { x0: x0 + 12, y0: y0 + 14, w: w - 12, h: h - 14, xMin: 0, xMax: 37, yMin: p.lo, yMax: p.hi, xTitle: T.xZ, yTitle: '', xTicks: 7, yTicks: 5, fmtX: (x) => x > 36 ? '' : String(x) });
    gbox = { ax, y0, h };
    // y title drawn here, further left than the kit puts it, so it clears four-digit tick labels
    ctx.save(); ctx.translate(x0 + 9, (ax.box.y0 + ax.box.y1) / 2); ctx.rotate(-Math.PI / 2);
    text(ctx, p.ax, 0, 0, { size: 12, align: 'center', base: 'middle', color: c.text2 }); ctx.restore();
    const B = ax.box;
    // period bands
    [[1, 2], [3, 10], [11, 18], [19, 36]].forEach(([a, b], i) => {
      if (i % 2) { ctx.fillStyle = c.lineSoft; ctx.fillRect(ax.X(a - 0.5), B.y0, ax.X(b + 0.5) - ax.X(a - 0.5), B.y1 - B.y0); }
      const lab = 'P' + (i + 1);
      text(ctx, lab, (ax.X(a - 0.5) + ax.X(b + 0.5)) / 2, B.y0 - 6, { size: 12, mono: true, align: 'center', color: c.text3 });
    });
    // the whole curve
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.4; ctx.beginPath(); let pen = false;
    for (let z = 1; z <= 36; z++) { const val = v(z); if (val == null) { pen = false; continue; } const X = ax.X(z), Y = ax.Y(val); pen ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); pen = true; }
    ctx.stroke();
    for (let z = 1; z <= 36; z++) { const val = v(z); if (val == null) continue; ctx.fillStyle = c.text3; ctx.beginPath(); ctx.arc(ax.X(z), ax.Y(val), 2.5, 0, Math.PI * 2); ctx.fill(); }
    // the compared set
    const mem = members().filter(z => v(z) != null);
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2.4; if (S.cmp === 'g') ctx.setLineDash([6, 4]);
    ctx.beginPath(); mem.forEach((z, i) => { const X = ax.X(z), Y = ax.Y(v(z)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke(); ctx.setLineDash([]);
    const spacing = ax.X(2) - ax.X(1);
    mem.forEach((z, i) => {
      const X = ax.X(z), Y = ax.Y(v(z));
      ctx.fillStyle = c.accent; ctx.beginPath(); ctx.arc(X, Y, 4, 0, Math.PI * 2); ctx.fill();
      const lab = S.cmp === 'g' || spacing >= 18 || i === 0 || i === mem.length - 1;
      if (lab && z !== S.z && !(spacing < 30 && z === S.z + 1)) text(ctx, D[z][0], X, Y - 9, { size: 12, align: 'center', color: c.text });
    });
    // the chosen element
    const sv = v(S.z);
    if (sv != null) {
      const X = ax.X(S.z), Y = ax.Y(sv);
      ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(X, Y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = c.stage; ctx.lineWidth = 2; ctx.stroke();
      const right = X < B.x1 - 90;
      text(ctx, D[S.z][0] + '  ' + fmtV(sv), X + (right ? 10 : -10), Y - 10, { size: 13, weight: 700, align: right ? 'left' : 'right', color: c.ink });
    }
  }

  function pick(ev) {
    const r = ui.cv.el.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
    const hit = cells.find(([, X, Y, w, hh]) => mx >= X && mx < X + w && my >= Y && my < Y + hh);
    if (hit) { S.z = hit[0]; sz.set(S.z); update(); return; }
    if (gbox && my > gbox.y0) {
      const B = gbox.ax.box; if (mx < B.x0 - 10 || mx > B.x1 + 10) return;
      let best = 1, bd = 1e9; for (let z = 1; z <= 36; z++) { const d = Math.abs(gbox.ax.X(z) - mx); if (d < bd) { bd = d; best = z; } }
      S.z = best; sz.set(S.z); update();
    }
  }
  ui.cv.el.addEventListener('click', pick);
  ui.cv.el.style.cursor = 'pointer';

  function caption() {
    const mem = members().filter(z => v(z) != null), p = P(), d = D[S.z];
    const pname = L(p.name).toLowerCase(), unit = typeof p.unit === 'string' ? ' ' + p.unit : '';
    if (S.prop === 'en' && v(S.z) == null) return MLX.af ? 'Edelgasse het geen elektronegatiwiteitswaarde nie: hulle vorm byna nooit bindings nie.' : 'Noble gases have no electronegativity value: they hardly ever form bonds.';
    if (mem.length < 2) return MLX.af ? `Net een element van groep ${d[4]} is in periodes 1–4. Kies 'n hoofgroepelement om die groeptendens te sien.` : `Only one element of group ${d[4]} is in periods 1–4. Pick a main-group element to see the trend down a group.`;
    const a = mem[0], b = mem[mem.length - 1], up = v(b) > v(a);
    const across = S.cmp === 'p';
    const why = {
      p: { r: { en: 'more protons pull the electrons in the same shell closer to the nucleus', af: 'meer protone trek die elektrone in dieselfde skil nader aan die kern' },
        ie: { en: 'a bigger nuclear charge holds the outer electrons, in the same shell, more tightly', af: '\'n groter kernlading hou die buitenste elektrone, in dieselfde skil, stywer vas' },
        en: { en: 'a bigger nuclear charge and a smaller atom attract bonding electrons more strongly', af: '\'n groter kernlading en \'n kleiner atoom trek bindingselektrone sterker aan' } },
      g: { r: { en: 'each element has one more electron shell', af: 'elke element het een elektronskil meer' },
        ie: { en: 'the outer electron is further from the nucleus and more shielded, so it is easier to remove', af: 'die buitenste elektron is verder van die kern en meer afgeskerm, dus is dit makliker om te verwyder' },
        en: { en: 'bonding electrons are further from the nucleus and more shielded', af: 'bindingselektrone is verder van die kern en meer afgeskerm' } },
    }[S.cmp][S.prop];
    let s = MLX.af
      ? `${across ? 'Oor periode ' + d[3] : 'Af in groep ' + d[4]} van ${D[a][0]} na ${D[b][0]} ${up ? 'styg' : 'daal'} die ${pname} van ${fmtV(v(a))} na ${fmtV(v(b))}${unit}: ${L(why)}.`
      : `${across ? 'Across period ' + d[3] : 'Down group ' + d[4]} from ${D[a][0]} to ${D[b][0]} the ${pname} ${up ? 'rises' : 'falls'} from ${fmtV(v(a))} to ${fmtV(v(b))}${unit}: ${L(why)}.`;
    if (across && S.prop === 'ie' && (d[3] === 2 || d[3] === 3)) s += MLX.af ? ' Soek die twee klein insinkings in die algehele styging.' : ' Look for the two small dips in the overall rise.';
    if (across && S.prop === 'r' && d[3] > 1) s += MLX.af ? ' (Edelgasse bind byna nooit nie, dus is hul radius \'n skatting.)' : ' (Noble gases hardly ever bond, so their radius is an estimate.)';
    if (across && d[3] === 4) s += MLX.af ? ' Oor die oorgangsmetale verander die waardes min.' : ' Across the transition metals the values change only a little.';
    return s;
  }

  function update() {
    const p = P(), d = D[S.z], val = v(S.z);
    primLab.textContent = L(p.name) + L(T.of) + nm(S.z).toLowerCase();
    prim.set(val == null ? '—' : fmtV(val));
    primUnit.textContent = val == null ? L(T.noval) : L(p.unit);
    ro.set('e', nm(S.z) + ' (' + d[0] + '), Z = ' + S.z); ro.set('p', String(d[3])); ro.set('g', String(d[4]));
    const ve = valence(S.z); ro.set('v', ve == null ? '—' : String(ve));
    ui.setCaption(caption());
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + nm(S.z) + ': ' + L(p.name) + ' ' + (val == null ? L(T.noval) : fmtV(val) + ' ' + L(p.unit)) + '.');
    ui.cv.draw();
  }
  update();
});
