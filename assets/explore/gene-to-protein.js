/* Gr12 DNA: The Code of Life — from gene to protein, and what a mutation does.
 * The template strand of a short gene is transcribed into mRNA (A→U, T→A,
 * G→C, C→G) and translated codon by codon with the standard genetic code,
 * starting at AUG and ending at a stop codon. Click a base to change, insert
 * or delete it and compare the new protein with the original.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text } = MLX;
  const CODE = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
  const NAME = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly' };
  const COL = { A: '#f87171', T: '#fbbf24', U: '#a78bfa', G: '#4ade80', C: '#60a5fa' };
  const PAIR_DNA = { A: 'T', T: 'A', G: 'C', C: 'G' }, TO_RNA = { A: 'U', T: 'A', G: 'C', C: 'G' };
  const ORIGINAL = 'TACAAACCGTTTACCATT';          // template strand → mRNA AUG UUU GGC AAA UGG UAA
  const aa = (codon) => { const i = (s) => 'UCAG'.indexOf(s); return CODE[16 * i(codon[0]) + 4 * i(codon[1]) + i(codon[2])]; };
  function express(tpl) {
    const mrna = tpl.split('').map(b => TO_RNA[b]).join('');
    const start = mrna.indexOf('AUG');
    const prot = [];
    if (start >= 0) for (let i = start; i + 3 <= mrna.length; i += 3) { const a = aa(mrna.slice(i, i + 3)); if (a === '*') { prot.push('*'); break; } prot.push(a); }
    return { mrna, start, prot };
  }
  const T = {
    aria: { en: 'DNA, mRNA and the protein it codes for', af: 'DNS, mRNS en die proteïen waarvoor dit kodeer' },
    tool: { en: 'Click a base to…', af: 'Klik op \'n basis om…' }, change: { en: 'Change it', af: 'Dit te verander' }, ins: { en: 'Insert before it', af: 'Voor dit in te voeg' }, del: { en: 'Delete it', af: 'Dit te verwyder' },
    reset: { en: 'Original gene', af: 'Oorspronklike geen' }, res: { en: 'Result', af: 'Resultaat' },
    orig: { en: 'Original protein', af: 'Oorspronklike proteïen' }, now: { en: 'Your protein', af: 'Jou proteïen' }, effect: { en: 'Effect', af: 'Gevolg' },
    coding: { en: 'DNA coding strand', af: 'DNS-koderende string' }, template: { en: 'DNA template strand (click a base)', af: 'DNS-templaatstring (klik op \'n basis)' },
    mrna: { en: 'mRNA (transcription)', af: 'mRNS (transkripsie)' }, protein: { en: 'Protein (translation)', af: 'Proteïen (translasie)' },
    same: { en: 'no change: silent mutation', af: 'geen verandering: stil mutasie' }, one: { en: 'one amino acid changed', af: 'een aminosuur verander' },
    short: { en: 'stop codon: protein cut short', af: 'stopkodon: proteïen verkort' }, shift: { en: 'frameshift: amino acids after it all change', af: 'raamverskuiwing: aminosure daarna verander almal' },
    nostart: { en: 'no start codon (AUG): no protein', af: 'geen beginkodon (AUG) nie: geen proteïen' }, orig2: { en: 'original gene', af: 'oorspronklike geen' },
    stop: { en: 'STOP', af: 'STOP' },
  };
  let tpl = ORIGINAL, tool = 'change';
  const base0 = express(ORIGINAL);
  const ui = MLX.layout(root, { height: (w) => Math.max(270, Math.min(330, Math.round(w * 0.36))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.tool);
  MLX.seg(c1, { options: [['change', T.change], ['ins', T.ins], ['del', T.del]], value: tool, onChange: (v) => { tool = v; } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.reset, () => { tpl = ORIGINAL; update(); });
  const c2 = MLX.card(ui.side, T.res);
  const ro = MLX.readout(c2, [['orig', T.orig], ['now', T.now], ['effect', T.effect]]);

  const protStr = (p) => p.map(a => a === '*' ? L(T.stop) : NAME[a]).join('-');
  function effect(e) {
    if (tpl === ORIGINAL) return L(T.orig2);
    if (e.start < 0) return L(T.nostart);
    const a = base0.prot, b = e.prot;
    if (a.join('') === b.join('')) return L(T.same);
    if (tpl.length % 3 !== ORIGINAL.length % 3) return L(T.shift);
    const stopAt = b.indexOf('*');
    if (stopAt >= 0 && stopAt < a.indexOf('*')) return L(T.short);
    const diff = a.filter((x, i) => b[i] !== x).length;
    return diff === 1 ? L(T.one) : L(T.shift);
  }
  function update() {
    const e = express(tpl);
    ro.set('orig', protStr(base0.prot)); ro.set('now', e.prot.length ? protStr(e.prot) : '—');
    const eff = effect(e);
    ro.set('effect', eff, tpl === ORIGINAL ? '' : eff === L(T.same) ? '#86efac' : eff === L(T.one) ? '#fde68a' : '#fca5a5');
    ui.setCaption(tpl === ORIGINAL
      ? { en: 'Each group of three mRNA bases (a codon) codes for one amino acid. Click a base on the template strand to mutate it.', af: 'Elke groep van drie mRNS-basisse (\'n kodon) kodeer vir een aminosuur. Klik op \'n basis op die templaatstring om dit te muteer.' }
      : { en: 'Mutation: ' + eff + '.', af: 'Mutasie: ' + eff + '.' });
    ui.cv.draw();
  }

  let geo = null;
  function draw(ctx, W, H) {
    const e = express(tpl);
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const n = Math.max(tpl.length, 18), x0 = 20, tw = Math.min(40, (W - 40) / n), th = Math.min(30, tw * 1.05);
    const rows = { coding: 34, template: 34 + th + 34, mrna: 34 + 2 * th + 84, prot: 34 + 3 * th + 124 };
    geo = { x0, tw, y: rows.template, th };
    const tile = (x, y, b, hl) => {
      ctx.fillStyle = COL[b] + (hl ? 'ff' : 'cc'); MLX.roundRect(ctx, x + 1.5, y, tw - 3, th, 4); ctx.fill();
      text(ctx, b, x + tw / 2, y + th / 2 + 5, { size: Math.min(15, tw * 0.45), weight: 800, align: 'center', color: '#0b1220' });
    };
    text(ctx, T.coding, x0, rows.coding - 8, { size: 11, weight: 700, color: 'rgba(226,232,240,0.55)' });
    text(ctx, T.template, x0, rows.template - 8, { size: 11, weight: 700, color: '#e2e8f0' });
    tpl.split('').forEach((b, i) => {
      const x = x0 + i * tw;
      tile(x, rows.coding, PAIR_DNA[b]);
      ctx.strokeStyle = 'rgba(226,232,240,0.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + tw / 2, rows.coding + th); ctx.lineTo(x + tw / 2, rows.coding + th + 8); ctx.moveTo(x + tw / 2, rows.template - 4); ctx.lineTo(x + tw / 2, rows.template); ctx.stroke();
      tile(x, rows.template, b, true);
    });
    // mRNA, grouped into codons from the start codon
    text(ctx, T.mrna, x0, rows.mrna - 8, { size: 11, weight: 700, color: '#c4b5fd' });
    e.mrna.split('').forEach((b, i) => tile(x0 + i * tw, rows.mrna, b));
    if (e.start >= 0) for (let k = 0; k < e.prot.length; k++) {
      const i = e.start + 3 * k, x = x0 + i * tw;
      ctx.strokeStyle = 'rgba(253,224,71,0.8)'; ctx.lineWidth = 1.5; MLX.roundRect(ctx, x - 1, rows.mrna - 3, 3 * tw + 2, th + 6, 6); ctx.stroke();
      // the amino acid under its codon
      const a = e.prot[k], cx = x + 1.5 * tw, cy = rows.prot + 14;
      const changed = base0.prot[k] !== a;
      ctx.fillStyle = a === '*' ? '#475569' : changed && tpl !== ORIGINAL ? '#f97316' : '#14b8a6';
      ctx.beginPath(); ctx.arc(cx, cy, Math.min(18, tw * 1.2), 0, Math.PI * 2); ctx.fill();
      text(ctx, a === '*' ? L(T.stop) : NAME[a], cx, cy + 4, { size: 11, weight: 800, align: 'center', color: '#fff' });
      if (k > 0 && a !== '*') { ctx.strokeStyle = 'rgba(226,232,240,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 3 * tw + Math.min(18, tw * 1.2), cy); ctx.lineTo(cx - Math.min(18, tw * 1.2), cy); ctx.stroke(); }
    }
    text(ctx, T.protein, x0, rows.prot - 10, { size: 11, weight: 700, color: '#5eead4' });
  }
  ui.cv.el.addEventListener('pointerdown', (ev) => {
    if (!geo) return;
    const r = ui.cv.el.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top;
    if (y < geo.y - 6 || y > geo.y + geo.th + 6) return;
    const i = Math.floor((x - geo.x0) / geo.tw);
    if (i < 0 || i >= tpl.length) return;
    const nxt = { A: 'T', T: 'G', G: 'C', C: 'A' };
    if (tool === 'change') tpl = tpl.slice(0, i) + nxt[tpl[i]] + tpl.slice(i + 1);
    else if (tool === 'ins' && tpl.length < 24) tpl = tpl.slice(0, i) + 'G' + tpl.slice(i);
    else if (tool === 'del' && tpl.length > 9) tpl = tpl.slice(0, i) + tpl.slice(i + 1);
    update();
  });

  update();
});
