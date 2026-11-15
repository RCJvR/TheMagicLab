/* Gr10 Electrostatics — charging by friction, and charge sharing between two identical conducting spheres.
 *  Friction: rubbing moves electrons from one material to the other (plastic rod + fur: the rod gains electrons
 *  and becomes negative; glass rod + silk: the glass loses electrons and becomes positive). Each rub here moves
 *  1 × 10¹⁰ electrons, so Q = n e = 1,6 nC per rub; the two charges are always equal and opposite (conservation),
 *  and every charge is a whole number of e (quantisation). On an insulator the charge stays where it was rubbed.
 *  Touching spheres: identical conductors share the total charge equally, Q = (Q_A + Q_B)/2; the change in charge of
 *  either sphere gives the number of electrons transferred, n = ΔQ / e (e = 1,6 × 10⁻¹⁹ C). Like charges repel,
 *  unlike charges attract, and a charged sphere attracts a neutral one by polarising it.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const E = 1.6e-19;
  const T = {
    aria: { en: 'Two metal spheres on insulating stands that touch and share their charge', af: 'Twee metaalsfere op isolerende staanders wat raak en hul lading deel' },
    ariaRub: { en: 'A rod being rubbed with a cloth, with the charges that move between them', af: '\'n Staaf wat met \'n lap gevryf word, met die ladings wat tussen hulle beweeg' },
    mode: { en: 'What to explore', af: 'Wat om te verken' }, share: { en: 'Touching spheres', af: 'Sfere wat raak' }, rub: { en: 'Charging by friction', af: 'Laai deur wrywing' },
    after: { en: 'Charge on each sphere after touching', af: 'Lading op elke sfeer ná aanraking' }, rodQ: { en: 'Charge on the rod', af: 'Lading op die staaf' },
    totB: { en: 'Total charge before', af: 'Totale lading voor' }, totA: { en: 'Total charge after', af: 'Totale lading ná' },
    nE: { en: 'Electrons transferred', af: 'Elektrone oorgedra' }, dir: { en: 'Electrons move', af: 'Elektrone beweeg' },
    clothQ: { en: 'Charge on the cloth', af: 'Lading op die lap' }, tot: { en: 'Total charge', af: 'Totale lading' },
    before: { en: 'Charges before contact', af: 'Ladings voor aanraking' }, qa: { en: 'Charge on sphere A', af: 'Lading op sfeer A' }, qb: { en: 'Charge on sphere B', af: 'Lading op sfeer B' },
    touch: { en: 'Touch and separate', af: 'Raak en skei' }, again: { en: 'Start again', af: 'Begin weer' },
    mat: { en: 'Materials', af: 'Materiale' }, plastic: { en: 'Plastic rod and fur', af: 'Plastiekstaaf en pels' }, glass: { en: 'Glass rod and silk', af: 'Glasstaaf en sy' },
    rubOnce: { en: 'Rub once', af: 'Vryf een keer' },
    beforeL: { en: 'before', af: 'voor' }, afterL: { en: 'after', af: 'ná' }, stand: { en: 'insulating stand', af: 'isolerende staander' },
    repel: { en: 'repel', af: 'stoot af' }, attract: { en: 'attract', af: 'trek aan' }, polar: { en: 'attract (B is polarised)', af: 'trek aan (B is gepolariseer)' },
    polarA: { en: 'attract (A is polarised)', af: 'trek aan (A is gepolariseer)' }, none: { en: 'no force: both neutral', af: 'geen krag: albei neutraal' },
    rodP: { en: 'plastic rod', af: 'plastiekstaaf' }, rodG: { en: 'glass rod', af: 'glasstaaf' }, fur: { en: 'fur', af: 'pels' }, silk: { en: 'silk', af: 'sy' },
    only: { en: 'Only the extra (unbalanced) charges are shown.', af: 'Net die ekstra (ongebalanseerde) ladings word getoon.' },
    one: { en: 'Each symbol = 1 × 10¹⁰ electrons (1,6 nC)', af: 'Elke simbool = 1 × 10¹⁰ elektrone (1,6 nC)' },
    oneS: { en: 'Each symbol ≈ 2 nC', af: 'Elke simbool ≈ 2 nC' },
    totLine: { en: 'Total before: Q_A + Q_B =', af: 'Totaal voor: Q_A + Q_B =' },
    keep: { en: '(this total cannot change)', af: '(hierdie totaal kan nie verander nie)' },
    electrons: { en: 'electrons', af: 'elektrone' }, noE: { en: 'No electrons move: the charges were already equal.', af: 'Geen elektrone beweeg nie: die ladings was reeds gelyk.' },
    cons: { en: 'charge is conserved', af: 'lading bly behoue' },
    capB: { en: 'Set the charges, predict the result, then let the spheres touch. Identical spheres end up with equal charges.', af: 'Stel die ladings, voorspel die resultaat en laat die sfere dan raak. Identiese sfere eindig met gelyke ladings.' },
    capM: { en: 'While the spheres touch, electrons flow through the metal until the two identical spheres carry equal charges.', af: 'Terwyl die sfere raak, vloei elektrone deur die metaal totdat die twee identiese sfere gelyke ladings dra.' },
    capA: { en: 'The identical spheres share the total charge equally, so each gets half of it. The total is the same as before, because charge is conserved.', af: 'Die identiese sfere deel die totale lading gelyk, dus kry elkeen die helfte daarvan. Die totaal is dieselfde as voorheen, want lading bly behoue.' },
    capR0: { en: 'Both objects start neutral: equal numbers of protons and electrons. Rub them together to move electrons.', af: 'Albei voorwerpe begin neutraal: ewe veel protone en elektrone. Vryf hulle teen mekaar om elektrone te verskuif.' },
    capRP: { en: 'Rubbing moves electrons from the fur to the plastic rod: the rod becomes negative and the fur equally positive.', af: 'Vryf verskuif elektrone van die pels na die plastiekstaaf: die staaf word negatief en die pels ewe veel positief.' },
    capRG: { en: 'Rubbing moves electrons from the glass rod to the silk: the rod becomes positive and the silk equally negative.', af: 'Vryf verskuif elektrone van die glasstaaf na die sy: die staaf word positief en die sy ewe veel negatief.' },
    full: { en: 'The rod holds no more charge in this model. Start again to try the other materials.', af: 'Die staaf hou nie meer lading in hierdie model nie. Begin weer om die ander materiale te probeer.' },
  };
  const S = { mode: 'share', QA: 6, QB: -10, phase: 'before', t: 0, pair: 'plastic', rubs: 0, rt: 0, rubbing: false };
  const MAXR = 8;
  const Qf = () => (S.QA + S.QB) / 2;

  // ── number formatting ──
  const fq = (v) => (v > 0 ? '+' : '') + num(v, Math.abs(v % 1) > 1e-9 ? 1 : 0);
  const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
  function sci(x) {
    if (x === 0) return '0';
    let e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e);
    m = Math.round(m * 100) / 100; if (Math.abs(m) >= 10) { m /= 10; e += 1; }
    const ms = num(m, 2).replace(/[,.]?0+$/, '');
    return ms + ' × 10' + String(e).split('').map(ch => SUP[ch]).join('');
  }

  // ── layout and controls ──
  const ui = MLX.layout(root, { height: (w) => w < 640 ? (S.mode === 'share' ? 370 : 420) : Math.max(360, Math.min(390, Math.round(w * 0.46))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.after, unit: 'nC' });
  const primTitle = prim.el.querySelector('.mlx-card-title');
  const roS = MLX.h('div'); const roR = MLX.h('div'); prim.el.appendChild(roS); prim.el.appendChild(roR);
  const ro1 = MLX.readout(roS, [['tb', T.totB], ['ta', T.totA], ['n', T.nE], ['d', T.dir]]);
  const ro2 = MLX.readout(roR, [['c', T.clothQ], ['t', T.tot], ['n', T.nE]]);
  const c0 = MLX.card(ui.side, T.mode);
  MLX.seg(c0, { options: [['share', T.share], ['rub', T.rub]], value: S.mode, onChange: (v) => { S.mode = v; showMode(); update(); } });
  const cS = MLX.card(ui.side, T.before);
  const sA = MLX.slider(cS, { label: T.qa, min: -20, max: 20, step: 1, value: S.QA, fmt: (v) => fq(v) + ' nC', onInput: (v) => { S.QA = v; S.phase = 'before'; S.t = 0; update(); } });
  const sB = MLX.slider(cS, { label: T.qb, min: -20, max: 20, step: 1, value: S.QB, fmt: (v) => fq(v) + ' nC', onInput: (v) => { S.QB = v; S.phase = 'before'; S.t = 0; update(); } });
  const bS = MLX.h('div', { class: 'mlx-btns' }); cS.appendChild(bS);
  const bTouch = MLX.button(bS, T.touch, () => { if (S.phase !== 'before') return; S.phase = 'moving'; S.t = 0; if (MLX.reducedMotion) { S.t = 1; S.phase = 'after'; } update(); }, 'primary');
  MLX.button(bS, T.again, () => { S.phase = 'before'; S.t = 0; update(); });
  const cR = MLX.card(ui.side, T.mat);
  MLX.seg(cR, { options: [['plastic', T.plastic], ['glass', T.glass]], value: S.pair, onChange: (v) => { S.pair = v; S.rubs = 0; S.rubbing = false; update(); } });
  const bR = MLX.h('div', { class: 'mlx-btns' }); cR.appendChild(bR);
  const bRub = MLX.button(bR, T.rubOnce, () => {
    if (S.rubbing || S.rubs >= MAXR) return;
    if (MLX.reducedMotion) { S.rubs++; } else { S.rubbing = true; S.rt = 0; }
    update();
  }, 'primary');
  MLX.button(bR, T.again, () => { S.rubs = 0; S.rubbing = false; update(); });
  function showMode() {
    const sh = S.mode === 'share';
    cS.style.display = sh ? '' : 'none'; roS.style.display = sh ? '' : 'none';
    cR.style.display = sh ? 'none' : ''; roR.style.display = sh ? 'none' : '';
    primTitle.textContent = L(sh ? T.after : T.rodQ);
  }

  MLX.loop(ui.cv.el, (dt) => {
    let busy = false;
    if (S.mode === 'share' && S.phase === 'moving') { S.t = Math.min(1, S.t + dt / 3.4); busy = true; if (S.t >= 1) { S.phase = 'after'; update(); return; } }
    if (S.mode === 'rub' && S.rubbing) { S.rt += dt / 1.8; busy = true; if (S.rt >= 1) { S.rubbing = false; S.rubs++; update(); return; } }
    if (busy) ui.cv.draw();
  }).start();
  MLX.onTheme(() => ui.cv.draw());

  // ── drawing helpers ──
  let c, ctx, POS, NEG, METAL;
  // text with single-character subscripts written as _X (Q_A → Q with a small A)
  function rich(s, x, y, o) {
    s = L(s); o = o || {};
    const parts = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '_' && i + 1 < s.length) { parts.push({ t: s[i + 1], sub: true }); i++; }
      else if (parts.length && !parts[parts.length - 1].sub) parts[parts.length - 1].t += s[i];
      else parts.push({ t: s[i], sub: false });
    }
    const sz = o.size || 12, ss = Math.round(sz * 0.78);
    const font = (z) => (o.weight || 500) + ' ' + z + 'px ' + (o.mono ? '"JetBrains Mono", monospace' : '"Cabinet Grotesk", sans-serif');
    let w = 0; parts.forEach(p => { ctx.font = font(p.sub ? ss : sz); p.w = ctx.measureText(p.t).width; w += p.w; });
    if (o.measure) return w;
    let cx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
    ctx.fillStyle = o.color || c.text; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    parts.forEach(p => { ctx.font = font(p.sub ? ss : sz); ctx.fillText(p.t, cx, y + (p.sub ? sz * 0.28 : 0)); cx += p.w; });
    return w;
  }
  // join segments into as few lines as fit in maxW; returns the y after the last line
  function flow(segs, x, y, maxW, o) {
    let cur = '';
    const lines = [];
    segs.forEach(sg => { const t = cur ? cur + ' ' + sg : sg; if (cur && rich(t, 0, 0, Object.assign({}, o, { measure: true })) > maxW) { lines.push(cur); cur = sg; } else cur = t; });
    if (cur) lines.push(cur);
    lines.forEach((ln, i) => rich(ln, x, y + i * (o.lh || 18), o));
    return y + lines.length * (o.lh || 18);
  }
  function sym(x, y, sign, s) {
    ctx.strokeStyle = sign > 0 ? POS : NEG; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y);
    if (sign > 0) { ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); }
    ctx.stroke(); ctx.lineCap = 'butt';
  }
  function arrow(x1, y1, x2, y2, col, w) {
    const a = Math.atan2(y2 - y1, x2 - x1), hd = 8;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w || 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - hd * 0.8 * Math.cos(a), y2 - hd * 0.8 * Math.sin(a)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hd * Math.cos(a - 0.45), y2 - hd * Math.sin(a - 0.45)); ctx.lineTo(x2 - hd * Math.cos(a + 0.45), y2 - hd * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
  }
  function leader(x1, y1, x2, y2) { ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    POS = c.light ? '#b91c1c' : '#f87171'; NEG = c.light ? '#1d4ed8' : '#60a5fa';
    METAL = c.light ? '#dde1e7' : '#2b313a';
    if (S.mode === 'share') drawShare(W, H); else drawRub(W, H);
  }

  // ── touching spheres ──
  function ease(f) { return f < 0 ? 0 : f > 1 ? 1 : f * f * (3 - 2 * f); }
  function drawShare(W, H) {
    const phone = W < 640;
    const R = Math.round(Math.min(W * 0.085, 56, H * 0.14));
    const cy = R + 78;
    const baseY = Math.round(cy + R + (phone ? 56 : 66));
    // positions: apart → touching → apart
    const t = S.t, ap = phone ? 0.25 : 0.27;
    const xa0 = W * ap, xb0 = W * (1 - ap), xat = W / 2 - R, xbt = W / 2 + R;
    let k = 0;
    if (S.phase === 'moving') k = t < 0.3 ? ease(t / 0.3) : t < 0.7 ? 1 : 1 - ease((t - 0.7) / 0.3);
    const xa = xa0 + (xat - xa0) * k, xb = xb0 + (xbt - xb0) * k;
    // displayed charges
    const fl = S.phase === 'after' ? 1 : S.phase === 'moving' ? ease((t - 0.32) / 0.34) : 0;
    const qa = S.QA + (Qf() - S.QA) * fl, qb = S.QB + (Qf() - S.QB) * fl;
    // stands and bench line
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(16, baseY + 0.5); ctx.lineTo(W - 16, baseY + 0.5); ctx.stroke();
    [xa, xb].forEach(x => {
      ctx.fillStyle = c.light ? '#c9b48a' : '#6b5b3e';
      ctx.fillRect(x - 3, cy + R - 2, 6, baseY - 8 - (cy + R - 2));
      ctx.fillStyle = c.light ? '#9aa1ab' : '#4a515c'; MLX.roundRect(ctx, x - 26, baseY - 8, 52, 8, 2); ctx.fill();
    });
    ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
    const sy = cy + R + 40;
    leader(xb - 4, sy + 4, xb - 22, sy - 4);
    text(ctx, T.stand, xb - 26, sy, { size: 12, color: c.text2, align: 'right' });
    // spheres
    const sphere = (x, q, name, other, otherX) => {
      ctx.fillStyle = METAL; ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, cy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = c.light ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.10)';
      ctx.beginPath(); ctx.ellipse(x - R * 0.35, cy - R * 0.4, R * 0.28, R * 0.16, -0.6, 0, Math.PI * 2); ctx.fill();
      const n = Math.abs(q) < 0.25 ? 0 : Math.max(1, Math.round(Math.abs(q) / 2));
      const ss = Math.max(4, Math.min(6, R * 0.12));
      if (n > 0) {
        for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / n; sym(x + Math.cos(a) * R * 0.72, cy + Math.sin(a) * R * 0.72, Math.sign(q), ss); }
      } else if (Math.abs(other) > 0.25 && S.phase !== 'moving') {
        // neutral sphere next to a charged one: induced charges (opposite sign on the near side)
        const dirx = Math.sign(otherX - x), s = -Math.sign(other);
        for (let i = -1; i <= 1; i++) { sym(x + dirx * R * 0.66, cy + i * R * 0.42, s, ss); sym(x - dirx * R * 0.66, cy + i * R * 0.42, -s, ss); }
      }
      text(ctx, name, x, cy - R - 34, { size: 13, weight: 700, align: 'center', color: c.ink });
      text(ctx, fq(Math.round(q * 2) / 2) + ' nC', x, cy - R - 14, { size: 15, mono: true, weight: 600, align: 'center', color: Math.abs(q) < 0.25 ? c.text2 : q > 0 ? POS : NEG });
    };
    sphere(xa, qa, 'A', qb, xb); sphere(xb, qb, 'B', qa, xa);
    // electrons streaming through the contact point
    if (S.phase === 'moving' && t > 0.3 && t < 0.7 && Math.abs(Qf() - S.QA) > 0.01) {
      const toB = Qf() - S.QA > 0; // A becomes more positive: electrons leave A
      for (let i = 0; i < 7; i++) {
        const f = ((t - 0.3) / 0.4 * 3 + i / 7) % 1;
        const from = toB ? xa : xb, to = toB ? xb : xa;
        const x = from + (to - from) * f, y = cy + Math.sin(f * Math.PI) * -R * 0.25;
        ctx.fillStyle = NEG; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
      }
      arrow(W / 2 + (toB ? -26 : 26), cy - R - 56, W / 2 + (toB ? 26 : -26), cy - R - 56, NEG, 2);
      text(ctx, 'e⁻', W / 2, cy - R - 64, { size: 13, align: 'center', color: NEG });
    }
    // force arrows when apart
    if (S.phase !== 'moving') {
      const pa = qa, pb = qb, ay = cy + R + 16;
      let lab = null, out = 0;
      if (Math.abs(pa) < 0.25 && Math.abs(pb) < 0.25) lab = T.none;
      else if (Math.abs(pa) < 0.25) { lab = T.polarA; out = -1; }
      else if (Math.abs(pb) < 0.25) { lab = T.polar; out = -1; }
      else { out = Math.sign(pa) === Math.sign(pb) ? 1 : -1; lab = out > 0 ? T.repel : T.attract; }
      if (out) {
        const len = Math.min(44, 18 + Math.sqrt(Math.abs(pa * pb)) * 2.2) * (Math.abs(pa) < 0.25 || Math.abs(pb) < 0.25 ? 0.6 : 1) + 4;
        if (out > 0) { arrow(xa - R * 0.3, ay, xa - R * 0.3 - len, ay, c.ink); arrow(xb + R * 0.3, ay, xb + R * 0.3 + len, ay, c.ink); }
        else { arrow(xa + R * 0.3, ay, xa + R * 0.3 + len, ay, c.ink); arrow(xb - R * 0.3, ay, xb - R * 0.3 - len, ay, c.ink); }
      }
      const ls = L(lab), gap = xb - xa - 2 * R - 10;
      ctx.font = '500 12px "Cabinet Grotesk", sans-serif';
      if (ctx.measureText(ls).width > gap && ls.indexOf(' (') > 0) {
        const i = ls.indexOf(' (');
        text(ctx, ls.slice(0, i), W / 2, cy - 3, { size: 12, align: 'center', color: c.text2 });
        text(ctx, ls.slice(i + 1), W / 2, cy + 13, { size: 12, align: 'center', color: c.text2 });
      } else text(ctx, ls, W / 2, cy + 5, { size: 12, align: 'center', color: c.text2 });
    }
    // symbol key
    text(ctx, phone ? T.oneS : { en: 'Each symbol ≈ 2 nC of extra charge', af: 'Elke simbool ≈ 2 nC ekstra lading' }, 16, 20, { size: 12, color: c.text3 });
    // working
    const y0 = baseY + 26, mw = W - 32, o = { size: phone ? 12 : 13, mono: true, color: c.text, lh: phone ? 17 : 19 };
    const tot = S.QA + S.QB;
    let y = flow([L(T.totLine), '(' + fq(S.QA) + ') + (' + fq(S.QB) + ') = ' + fq(tot) + ' nC', L(T.keep)], 16, y0, mw, o);
    if (S.phase === 'after') {
      y = flow(['Q = (Q_A + Q_B) / 2', '= ' + fq(tot) + ' / 2', '= ' + fq(Qf()) + ' nC', L({ en: 'on each sphere', af: 'op elke sfeer' })], 16, y + 2, mw, Object.assign({}, o, { color: c.accent, weight: 600 }));
      const dA = Qf() - S.QA;
      if (Math.abs(dA) < 1e-9) flow([L(T.noE)], 16, y + 2, mw, o);
      else flow(['ΔQ_A = ' + fq(Qf()) + ' − (' + fq(S.QA) + ') = ' + fq(dA) + ' nC;', 'n = |ΔQ| / e = ' + sci(Math.abs(dA) * 1e-9).replace(' × ', '×') + ' / 1,6×10⁻¹⁹'.replace(',', MLX.af ? ',' : '.'), '= ' + sci(Math.abs(dA) * 1e-9 / E) + ' ' + L(T.electrons) + ',', (dA < 0 ? 'B → A' : 'A → B')], 16, y + 2, mw, o);
    }
  }

  // ── charging by friction ──
  function drawRub(W, H) {
    const phone = W < 640, plastic = S.pair === 'plastic';
    const rx0 = Math.round(W * (phone ? 0.08 : 0.14)), rx1 = Math.round(W * (phone ? 0.92 : 0.86)), ry = Math.round(H * 0.30), rh = phone ? 16 : 20;
    const zone0 = rx0 + (rx1 - rx0) * 0.42, zone1 = rx1 - 14;
    // cloth position: rests below; while rubbing rises to the rod and slides along it twice
    const cw = Math.min(150, (rx1 - rx0) * 0.36), ch = phone ? 46 : 56;
    const restY = Math.round(H * 0.56), rubY = ry - ch / 2;
    let clX = (zone0 + zone1) / 2 - cw / 2, clY = restY, f = S.rt;
    if (S.rubbing) {
      const up = f < 0.18 ? ease(f / 0.18) : f > 0.82 ? 1 - ease((f - 0.82) / 0.18) : 1;
      clY = restY + (rubY - restY) * up;
      if (f >= 0.18 && f <= 0.82) clX += Math.sin((f - 0.18) / 0.64 * Math.PI * 4) * (zone1 - zone0 - cw) / 2;
    }
    const nShown = S.rubs + (S.rubbing && f > 0.5 ? 1 : 0);
    // rod: handle on the left, rubbed end on the right
    ctx.fillStyle = plastic ? (c.light ? '#3b4250' : '#58606e') : (c.light ? 'rgba(120,170,200,0.22)' : 'rgba(160,210,235,0.16)');
    MLX.roundRect(ctx, rx0, ry - rh / 2, rx1 - rx0, rh, rh / 2); ctx.fill();
    ctx.strokeStyle = plastic ? (c.light ? '#22262e' : '#8a93a2') : (c.light ? 'rgba(40,90,120,0.75)' : 'rgba(180,220,240,0.7)'); ctx.lineWidth = 1.5; ctx.stroke();
    if (!plastic) { ctx.strokeStyle = c.light ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(rx0 + rh, ry - rh * 0.22); ctx.lineTo(rx1 - rh, ry - rh * 0.22); ctx.stroke(); }
    // rod charges stay where it was rubbed (insulator)
    const rodSign = plastic ? -1 : 1;
    for (let i = 0; i < nShown; i++) sym(zone0 + 12 + (zone1 - zone0 - 24) * (MAXR > 1 ? i / (MAXR - 1) : 0.5), ry, rodSign, phone ? 4 : 5);
    // cloth
    ctx.fillStyle = plastic ? (c.light ? '#c8a27a' : '#7a5d40') : (c.light ? '#e9dcef' : '#5b4c66');
    MLX.roundRect(ctx, clX, clY, cw, ch, 10); ctx.fill();
    ctx.strokeStyle = plastic ? (c.light ? '#8a6a48' : '#a8865f') : (c.light ? '#a58db3' : '#8e7aa0'); ctx.lineWidth = 1.2; ctx.stroke();
    if (plastic) { // short hairs along the edges
      ctx.beginPath();
      for (let x = clX + 6; x < clX + cw - 4; x += 7) { ctx.moveTo(x, clY + 1); ctx.lineTo(x + 2, clY - 4); ctx.moveTo(x, clY + ch - 1); ctx.lineTo(x + 2, clY + ch + 4); }
      ctx.stroke();
    } else { ctx.beginPath(); ctx.moveTo(clX + cw * 0.2, clY + ch * 0.25); ctx.quadraticCurveTo(clX + cw * 0.5, clY + ch * 0.55, clX + cw * 0.85, clY + ch * 0.35); ctx.stroke(); }
    for (let i = 0; i < nShown; i++) {
      const col = i % 4, row = Math.floor(i / 4);
      sym(clX + cw * (0.17 + col * 0.22), clY + ch * (row ? 0.7 : 0.32), -rodSign, phone ? 4 : 5);
    }
    // electrons hopping during the strokes
    if (S.rubbing && f > 0.25 && f < 0.75) {
      for (let i = 0; i < 4; i++) {
        const g = ((f - 0.25) / 0.5 * 3 + i / 4) % 1;
        const x = clX + cw * (0.2 + 0.2 * i), yA = clY + ch * 0.5, yB = ry;
        const y = plastic ? yA + (yB - yA) * g : yB + (yA - yB) * g;
        ctx.fillStyle = NEG; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
      }
    }
    // labels with leader lines
    const lx = rx0 + (rx1 - rx0) * 0.14;
    leader(lx, ry - rh / 2 - 2, lx, ry - rh / 2 - 18);
    text(ctx, plastic ? T.rodP : T.rodG, lx, ry - rh / 2 - 23, { size: 12, align: 'center', color: c.text });
    if (!S.rubbing) {
      leader(clX - 2, clY + ch / 2, clX - 22, clY + ch / 2);
      text(ctx, plastic ? T.fur : T.silk, clX - 26, clY + ch / 2 + 4, { size: 12, align: 'right', color: c.text });
      if (nShown) {
        text(ctx, fq(rodSign * nShown * 1.6) + ' nC', (zone0 + zone1) / 2, ry - rh / 2 - 12, { size: 14, mono: true, weight: 600, align: 'center', color: rodSign > 0 ? POS : NEG });
        const cl = fq(-rodSign * nShown * 1.6) + ' nC'; ctx.font = '600 14px "JetBrains Mono", monospace';
        const fits = clX + cw + 10 + ctx.measureText(cl).width < W - 8;
        text(ctx, cl, fits ? clX + cw + 10 : clX + cw / 2, fits ? clY + ch / 2 + 5 : clY - 10, { size: 14, mono: true, weight: 600, align: fits ? 'left' : 'center', color: rodSign > 0 ? NEG : POS });
      }
    }
    // key and working
    text(ctx, T.only, 16, 20, { size: 12, color: c.text3 });
    const y0 = Math.round(restY + ch + (phone ? 30 : 34)), mw = W - 32, o = { size: phone ? 12 : 13, mono: true, color: c.text, lh: phone ? 17 : 19 };
    let y = flow([L(T.one)], 16, y0, mw, Object.assign({}, o, { mono: false, color: c.text3, size: 12 }));
    if (S.rubs) {
      const n = S.rubs * 1e10, q = n * E;
      y = flow(['Q = n e', '= (' + sci(n) + ')(1,6 × 10⁻¹⁹)'.replace('1,6', MLX.af ? '1,6' : '1.6'), '= ' + sci(q) + ' C', '= ' + num(q * 1e9, 1) + ' nC'], 16, y + 4, mw, Object.assign({}, o, { color: c.accent, weight: 600 }));
      flow([L(T.tot) + ': (' + fq(-1.6 * S.rubs) + ') + (' + fq(1.6 * S.rubs) + ') = 0 nC,', L(T.cons)], 16, y + 2, mw, o);
    }
  }

  function update() {
    showMode();
    if (S.mode === 'share') {
      const tot = S.QA + S.QB, dA = Qf() - S.QA;
      prim.set(S.phase === 'after' ? fq(Qf()) : '?');
      ro1.set('tb', fq(tot) + ' nC');
      ro1.set('ta', S.phase === 'after' ? fq(2 * Qf()) + ' nC' : '—');
      ro1.set('n', S.phase === 'after' ? sci(Math.abs(dA) * 1e-9 / E) : '—');
      ro1.set('d', S.phase === 'after' ? (Math.abs(dA) < 1e-9 ? L({ en: 'none', af: 'geen' }) : dA < 0 ? L({ en: 'from B to A', af: 'van B na A' }) : L({ en: 'from A to B', af: 'van A na B' })) : '—');
      ui.setCaption(S.phase === 'before' ? T.capB : S.phase === 'moving' ? T.capM : T.capA);
      ui.cv.el.setAttribute('aria-label', L(T.aria) + '. A ' + fq(S.QA) + ' nC, B ' + fq(S.QB) + ' nC' + (S.phase === 'after' ? '; ' + L({ en: 'after touching each has', af: 'ná aanraking het elkeen' }) + ' ' + fq(Qf()) + ' nC.' : '.'));
      bTouch.disabled = S.phase !== 'before';
    } else {
      const q = S.rubs * 1.6, rs = S.pair === 'plastic' ? -1 : 1;
      prim.set(S.rubs ? fq(rs * q) : '0');
      ro2.set('c', fq(-rs * q) + ' nC'); ro2.set('t', '0 nC'); ro2.set('n', S.rubs ? sci(S.rubs * 1e10) : '0');
      ui.setCaption(S.rubs >= MAXR ? T.full : !S.rubs && !S.rubbing ? T.capR0 : S.pair === 'plastic' ? T.capRP : T.capRG);
      ui.cv.el.setAttribute('aria-label', L(T.ariaRub) + '. ' + L(S.pair === 'plastic' ? T.plastic : T.glass) + ': ' + L(T.rodQ).toLowerCase() + ' ' + fq(rs * q) + ' nC.');
      bRub.disabled = S.rubs >= MAXR;
    }
    ui.cv.draw();
  }
  update();
});
