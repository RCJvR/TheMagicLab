/* Gr10 Atomic structure — build an atom or ion from protons, neutrons and electrons (Z 1–20).
 *   Z = number of protons (defines the element), A = Z + N (mass number), charge = protons − electrons.
 *   Nuclide notation: A written top left, Z bottom left, charge top right of the symbol.
 *   Electrons fill orbitals in the Aufbau order 1s 2s 2p 3s 3p 4s (enough for 20 electrons), each orbital holds 2
 *   with opposite spins (Pauli), and p orbitals fill singly first (Hund). Shell totals give 2,8,8,2 for Ca.
 * Isotope stability uses the real stable isotopes of H–Ca; anything else is unstable (radioactive).
 * The nucleus is drawn far too large: a real nucleus is about 1/100 000 of the atom's diameter.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  // [symbol, English, Afrikaans, Ar (data sheet), most common N, stable N values]
  const EL = [null,
    ['H', 'hydrogen', 'waterstof', '1', 0, [0, 1]], ['He', 'helium', 'helium', '4', 2, [1, 2]],
    ['Li', 'lithium', 'litium', '7', 4, [3, 4]], ['Be', 'beryllium', 'berillium', '9', 5, [5]],
    ['B', 'boron', 'boor', '11', 6, [5, 6]], ['C', 'carbon', 'koolstof', '12', 6, [6, 7]],
    ['N', 'nitrogen', 'stikstof', '14', 7, [7, 8]], ['O', 'oxygen', 'suurstof', '16', 8, [8, 9, 10]],
    ['F', 'fluorine', 'fluoor', '19', 10, [10]], ['Ne', 'neon', 'neon', '20', 10, [10, 11, 12]],
    ['Na', 'sodium', 'natrium', '23', 12, [12]], ['Mg', 'magnesium', 'magnesium', '24', 12, [12, 13, 14]],
    ['Al', 'aluminium', 'aluminium', '27', 14, [14]], ['Si', 'silicon', 'silikon', '28', 14, [14, 15, 16]],
    ['P', 'phosphorus', 'fosfor', '31', 16, [16]], ['S', 'sulfur', 'swael', '32', 16, [16, 17, 18, 20]],
    ['Cl', 'chlorine', 'chloor', '35,5', 18, [18, 20]], ['Ar', 'argon', 'argon', '40', 22, [18, 20, 22]],
    ['K', 'potassium', 'kalium', '39', 20, [20, 22]], ['Ca', 'calcium', 'kalsium', '40', 20, [20, 22, 23, 24, 26]],
  ];
  const H_NAMES = [{ en: 'protium', af: 'protium' }, { en: 'deuterium', af: 'deuterium' }, { en: 'tritium', af: 'tritium' }];
  // Aufbau order for up to 20 electrons; energy rank sets the height in the energy diagram
  const ORB = [
    { n: 1, l: 's', k: 1, e: 0 }, { n: 2, l: 's', k: 1, e: 1.55 }, { n: 2, l: 'p', k: 3, e: 2.2 },
    { n: 3, l: 's', k: 1, e: 3.35 }, { n: 3, l: 'p', k: 3, e: 4.0 }, { n: 4, l: 's', k: 1, e: 4.85 },
  ];
  const T = {
    aria: { en: 'An atom built from protons, neutrons and electrons, its nuclide notation, and an orbital box diagram of its electron configuration', af: '\'n Atoom gebou uit protone, neutrone en elektrone, sy nuklied-notasie, en \'n orbitaalblokdiagram van sy elektronkonfigurasie' },
    id: { en: 'Particle', af: 'Deeltjie' }, atom: { en: 'atom', af: 'atoom' }, ion: { en: 'ion', af: 'ioon' },
    Z: { en: 'Atomic number Z', af: 'Atoomgetal Z' }, A: { en: 'Mass number A', af: 'Massagetal A' }, N: { en: 'Neutrons N = A − Z', af: 'Neutrone N = A − Z' },
    E: { en: 'Electrons', af: 'Elektrone' }, Q: { en: 'Charge', af: 'Lading' }, sh: { en: 'Shells', af: 'Skille' },
    iso: { en: 'Nucleus', af: 'Kern' }, ar: { en: 'Ar on the periodic table', af: 'Ar op die periodieke tabel' },
    build: { en: 'Build the particle', af: 'Bou die deeltjie' }, p: { en: 'Protons', af: 'Protone' }, n: { en: 'Neutrons', af: 'Neutrone' }, e: { en: 'Electrons', af: 'Elektrone' },
    neutral: { en: 'Neutral atom', af: 'Neutrale atoom' }, common: { en: 'Most common isotope', af: 'Algemeenste isotoop' },
    stable: { en: 'stable', af: 'stabiel' }, radio: { en: 'unstable (radioactive)', af: 'onstabiel (radioaktief)' },
    proton: { en: 'proton', af: 'proton' }, neutron: { en: 'neutron', af: 'neutron' }, electron: { en: 'electron', af: 'elektron' },
    nucleus: { en: 'nucleus', af: 'kern' }, scale: { en: 'Not to scale: if the atom were a stadium, the nucleus would be a marble.', af: 'Nie volgens skaal nie: as die atoom \'n stadion was, sou die kern \'n albaster wees.' },
    energy: { en: 'Energy', af: 'Energie' }, cfg: { en: 'Electron configuration', af: 'Elektronkonfigurasie' }, none: { en: 'no electrons', af: 'geen elektrone' },
    val: { en: 'valence electrons', af: 'valenselektrone' },
  };
  const S = { p: 6, n: 6, e: 6, rot: 0 };
  const el = () => EL[S.p];
  const name = () => MLX.af ? el()[2] : el()[1];
  const fill = (ne) => { let left = ne; return ORB.map(o => { const c = Math.min(left, 2 * o.k); left -= c; return c; }); };
  const shells = (ne) => { const f = fill(ne), s = [0, 0, 0, 0]; ORB.forEach((o, i) => { s[o.n - 1] += f[i]; }); while (s.length && !s[s.length - 1]) s.pop(); return s; };
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹', SUB = '₀₁₂₃₄₅₆₇₈₉';
  const sup = (v) => String(v).split('').map(d => SUP[+d]).join(''), sub = (v) => String(v).split('').map(d => SUB[+d]).join('');
  const qStr = (q) => q === 0 ? '0' : (Math.abs(q) === 1 ? '' : Math.abs(q)) + (q > 0 ? '+' : '−');
  const qWord = (q) => q === 0 ? '0' : Math.abs(q) + (q > 0 ? '+' : '−');
  const qSup = (q) => q === 0 ? '' : (Math.abs(q) === 1 ? '' : sup(Math.abs(q))) + (q > 0 ? '⁺' : '⁻');
  const isStable = () => el()[5].includes(S.n);
  const isoName = () => S.p === 1 && S.n <= 2 ? L(H_NAMES[S.n]) : name() + '-' + (S.p + S.n);

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 670 : Math.max(380, Math.min(440, Math.round(w * 0.46))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.id, unit: '' });
  const unitEl = prim.el.querySelector('.mlx-primary-unit');
  const ro = MLX.readout(prim.el, [['z', T.Z], ['a', T.A], ['n', T.N], ['e', T.E], ['q', T.Q], ['s', T.sh], ['i', T.iso], ['ar', T.ar]]);
  const c1 = MLX.card(ui.side, T.build);
  const sp = MLX.slider(c1, { label: T.p, min: 1, max: 20, step: 1, value: S.p, fmt: (v) => v + ' (' + EL[v][0] + ')', onInput: (v) => { S.p = v; update(); } });
  const sn = MLX.slider(c1, { label: T.n, min: 0, max: 26, step: 1, value: S.n, fmt: (v) => String(v), onInput: (v) => { S.n = v; update(); } });
  const se = MLX.slider(c1, { label: T.e, min: 0, max: 20, step: 1, value: S.e, fmt: (v) => String(v), onInput: (v) => { S.e = v; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.neutral, () => { S.e = S.p; se.set(S.e); update(); }, 'primary');
  MLX.button(bt, T.common, () => { S.n = el()[4]; sn.set(S.n); update(); });
  MLX.loop(ui.cv.el, (dt) => { if (!MLX.reducedMotion) { S.rot += dt * 0.25; ui.cv.draw(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx, col;
  function palette() {
    return c.light ? { p: '#c8352b', n: '#7d8590', e: '#1f6fd1', eSoft: 'rgba(31,111,209,0.14)' }
      : { p: '#f0776c', n: '#a3abb7', e: '#6aa9ff', eSoft: 'rgba(106,169,255,0.16)' };
  }
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); col = palette(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) {
      const aw = Math.round(W * 0.5); atom(0, 0, aw, H);
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(aw + 0.5, 14); ctx.lineTo(aw + 0.5, H - 14); ctx.stroke();
      orbitals(aw, 0, W - aw, H);
    } else { atom(0, 0, W, 360); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(14, 360.5); ctx.lineTo(W - 14, 360.5); ctx.stroke(); orbitals(0, 360, W, H - 360); }
  }

  // Nuclide notation: A top left, Z bottom left, charge top right
  function notation(x, y, size) {
    const q = S.p - S.e, sym = el()[0];
    ctx.font = '700 ' + size + 'px "Cabinet Grotesk", sans-serif'; const sw = ctx.measureText(sym).width;
    const small = Math.round(size * 0.42);
    text(ctx, sym, x, y, { size, weight: 700, color: c.ink });
    text(ctx, String(S.p + S.n), x - 4, y - size * 0.62, { size: small, mono: true, align: 'right', color: c.text });
    text(ctx, String(S.p), x - 4, y + 2, { size: small, mono: true, align: 'right', color: c.text });
    if (q) text(ctx, qStr(q), x + sw + 3, y - size * 0.62, { size: small, mono: true, color: q > 0 ? col.p : col.e });
  }

  function atom(x0, y0, w, h) {
    const cx = x0 + w * 0.5, cy = y0 + h * 0.53;
    const sh = shells(S.e), A = S.p + S.n;
    const Rmax = Math.min(w * 0.4, h * 0.37);
    const sN = A > 30 ? 2.6 : 3.1;                     // nucleon radius (px)
    const rn = sN * 1.05 * Math.sqrt(A + 0.5) + 1;     // nucleus radius
    const gap = (Rmax - rn - 8) / 4;
    // shells
    const labels = [];
    for (let k = 0; k < Math.max(sh.length, 0); k++) {
      const R = rn + 8 + gap * (k + 1);
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      const cnt = sh[k], off = S.rot / (k + 1) + k * 0.4;
      for (let i = 0; i < cnt; i++) {
        // pairs sit side by side, like the textbook dot diagrams
        const pair = cnt > 4 ? Math.floor(i / 2) : i, slots = cnt > 4 ? Math.ceil(cnt / 2) : cnt;
        const a = off + pair * 2 * Math.PI / Math.max(4, slots) + (cnt > 4 ? (i % 2 ? 0.11 : -0.11) : 0);
        ctx.fillStyle = col.e; ctx.beginPath(); ctx.arc(cx + R * Math.cos(a), cy + R * Math.sin(a), 4, 0, Math.PI * 2); ctx.fill();
      }
      labels.push([k + 1, cy - R]);
    }
    // shell labels on a small backing at the top of each ring, drawn over the electrons
    labels.forEach(([n, y]) => { ctx.fillStyle = c.stage; ctx.fillRect(cx - 19, y - 8, 38, 15); text(ctx, 'n = ' + n, cx, y + 4, { size: 12, mono: true, align: 'center', color: c.text3 }); });
    // nucleus: protons and neutrons mixed in a tight cluster (sunflower packing)
    const order = []; let pi = 0, ni = 0;
    for (let i = 0; i < A; i++) { const wantP = (pi + 0.5) / S.p <= (ni + 0.5) / Math.max(1, S.n) || ni >= S.n; if (wantP && pi < S.p) { order.push('p'); pi++; } else { order.push('n'); ni++; } }
    for (let i = A - 1; i >= 0; i--) {
      const r = sN * 1.05 * Math.sqrt(i + 0.5), a = i * 2.39996;
      ctx.fillStyle = order[i] === 'p' ? col.p : col.n; ctx.strokeStyle = c.stage; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), sN, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    // leader to the nucleus
    const lx = x0 + 16, ly = Math.min(cy + Rmax + 4, y0 + h - 52);
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - rn * 0.7, cy + rn * 0.7); ctx.lineTo(cx - Rmax * 0.55, ly - 4); ctx.lineTo(lx + 60, ly - 4); ctx.stroke();
    text(ctx, T.nucleus, lx, ly, { size: 12, color: c.text2 });
    // key
    const kx = x0 + w - 16; let ky = y0 + 24;
    [[col.p, L(T.proton) + ' (+1)'], [col.n, L(T.neutron) + ' (0)'], [col.e, L(T.electron) + ' (−1)']].forEach(([cc, s]) => {
      ctx.fillStyle = cc; ctx.beginPath(); ctx.arc(kx - 4, ky - 4, 4, 0, Math.PI * 2); ctx.fill();
      text(ctx, s, kx - 14, ky, { size: 12, align: 'right', color: c.text2 }); ky += 18;
    });
    notation(x0 + 40, y0 + 58, 40);
    text(ctx, isoName() + (MLX.af ? '-' : ' ') + L(S.p === S.e ? T.atom : T.ion), x0 + 16, y0 + 82, { size: 12, color: c.text2 });
    ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
    const ls = MLX.wrap(ctx, T.scale, w - 32);
    ls.forEach((s, i) => text(ctx, s, x0 + w / 2, y0 + h - 10 - (ls.length - 1 - i) * 15, { size: 12, align: 'center', color: c.text3 }));
  }

  function orbitals(x0, y0, w, h) {
    const f = fill(S.e);
    text(ctx, T.cfg, x0 + 20, y0 + 26, { size: 12, color: c.text2 });
    // configuration with superscripts
    let x = x0 + 20; const y = y0 + 52;
    if (!S.e) text(ctx, T.none, x, y, { size: 16, color: c.text3 });
    ORB.forEach((o, i) => {
      if (!f[i]) return;
      ctx.font = '600 18px "JetBrains Mono", monospace'; const s = o.n + o.l;
      text(ctx, s, x, y, { size: 18, weight: 600, mono: true, color: c.ink }); x += ctx.measureText(s).width + 1;
      text(ctx, String(f[i]), x, y - 8, { size: 12, weight: 600, mono: true, color: c.ink }); ctx.font = '600 12px "JetBrains Mono", monospace'; x += ctx.measureText(String(f[i])).width + 9;
    });
    const sh = shells(S.e);
    if (S.e) text(ctx, (MLX.af ? 'Skille: ' : 'Shells: ') + sh.join(', ') + '   (' + sh[sh.length - 1] + ' ' + L(T.val) + ')', x0 + 20, y + 22, { size: 12, color: c.text2 });
    // energy diagram
    const top = y0 + 104, bot = y0 + h - 22, ax = x0 + 30;
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(ax, bot); ctx.lineTo(ax, top); ctx.stroke();
    ctx.fillStyle = c.lineHard; ctx.beginPath(); ctx.moveTo(ax, top - 6); ctx.lineTo(ax - 4, top + 2); ctx.lineTo(ax + 4, top + 2); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.translate(ax - 10, (top + bot) / 2); ctx.rotate(-Math.PI / 2); text(ctx, T.energy, 0, 0, { size: 12, align: 'center', color: c.text2 }); ctx.restore();
    const b = Math.max(18, Math.min(28, (bot - top) / 8.2)), Ys = (e) => bot - b * 0.6 - e / 4.85 * (bot - top - b * 1.4);
    const sx = ax + 52, px = sx + b * 2.6;
    ORB.forEach((o, i) => {
      const yy = Ys(o.e) - b / 2, bx = o.l === 's' ? sx : px, cnt = f[i];
      const lit = cnt > 0;
      for (let k = 0; k < o.k; k++) {
        const X = bx + k * b;
        ctx.fillStyle = lit ? col.eSoft : 'transparent'; ctx.fillRect(X, yy, b, b);
        ctx.strokeStyle = lit ? c.text2 : c.lineHard; ctx.lineWidth = 1; ctx.strokeRect(X + 0.5, yy + 0.5, b - 1, b - 1);
        // Hund: one up arrow in each box first, then the down arrows
        const up = cnt > k, down = cnt > o.k + k;
        if (up) arrow(X + b * (down ? 0.33 : 0.5), yy + b * 0.82, yy + b * 0.18);
        if (down) arrow(X + b * 0.67, yy + b * 0.18, yy + b * 0.82);
      }
      const lab = o.n + o.l;
      if (o.l === 's') text(ctx, lab, sx - 8, yy + b * 0.68, { size: 13, mono: true, align: 'right', color: lit ? c.text : c.text3 });
      else text(ctx, lab, px + 3 * b + 8, yy + b * 0.68, { size: 13, mono: true, color: lit ? c.text : c.text3 });
    });
  }
  function arrow(x, ya, yb) {
    const d = yb < ya ? -1 : 1;
    ctx.strokeStyle = col.e; ctx.fillStyle = col.e; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(x, ya); ctx.lineTo(x, yb - d * 3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, yb); ctx.lineTo(x - 3.5, yb - d * 6); ctx.lineTo(x + 3.5, yb - d * 6); ctx.closePath(); ctx.fill();
  }

  function update() {
    const q = S.p - S.e, A = S.p + S.n, sh = shells(S.e), stable = isStable(), e = el();
    prim.set(e[0] + qSup(q));
    unitEl.textContent = isoName() + (MLX.af ? '-' : ' ') + L(q ? T.ion : T.atom);
    ro.set('z', String(S.p)); ro.set('a', String(A)); ro.set('n', String(S.n)); ro.set('e', String(S.e));
    ro.set('q', qWord(q)); ro.set('s', sh.length ? sh.join(', ') : '—');
    ro.set('i', L(stable ? T.stable : T.radio), stable ? '' : (c && c.warn) || MLX.colors().warn);
    ro.set('ar', e[3].replace(',', MLX.af ? ',' : '.'));
    const nm = name(), k = Math.abs(q), lost = MLX.af ? (k === 1 ? 'een elektron' : k + ' elektrone') : (k === 1 ? 'one electron' : k + ' electrons');
    let cap;
    if (q === 0) cap = MLX.af ? `'n Neutrale ${nm}-atoom: ${S.p} protone balanseer ${S.e} elektrone. Verander die neutrone en jy kry 'n ander isotoop, nie 'n ander element nie.`
      : `A neutral ${nm} atom: ${S.p} protons balance ${S.e} electrons. Change the neutrons and you get a different isotope, not a different element.`;
    else if (q > 0) cap = MLX.af ? `${S.p} protone maar net ${S.e} elektrone: die atoom het ${lost} verloor, dus is dit 'n positiewe ioon (katioon) met lading ${qWord(q)}.`
      : `${S.p} protons but only ${S.e} electrons: the atom has lost ${lost}, so it is a positive ion (cation) with charge ${qWord(q)}.`;
    else cap = MLX.af ? `${S.p} protone en ${S.e} elektrone: die atoom het ${lost} bygekry, dus is dit 'n negatiewe ioon (anioon) met lading ${qWord(q)}.`
      : `${S.p} protons and ${S.e} electrons: the atom has gained ${lost}, so it is a negative ion (anion) with charge ${qWord(q)}.`;
    if ([2, 10, 18].includes(S.e) && q !== 0) cap += MLX.af ? ' Dit het nou dieselfde konfigurasie as \'n edelgas.' : ' It now has the same configuration as a noble gas.';
    if (k > 3) cap += MLX.af ? ' (Ione met \'n lading groter as 3 kom selde voor.)' : ' (Ions with a charge bigger than 3 are rare.)';
    if (!stable) cap += MLX.af ? ` ${e[0]}-${A} is onstabiel: die kern het te ${S.n > Math.max(...e[5]) ? 'veel' : 'min'} neutrone en is radioaktief.`
      : ` ${e[0]}-${A} is unstable: the nucleus has too ${S.n > Math.max(...e[5]) ? 'many' : 'few'} neutrons and is radioactive.`;
    ui.setCaption(cap);
    const cfg = fill(S.e).map((v, i) => v ? ORB[i].n + ORB[i].l + sup(v) : '').filter(Boolean).join(' ');
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + sup(A) + sub(S.p) + e[0] + qSup(q) + ': ' + S.p + ' p, ' + S.n + ' n, ' + S.e + ' e. ' + (cfg || L(T.none)) + '.');
    ui.cv.draw();
  }
  update();
});
