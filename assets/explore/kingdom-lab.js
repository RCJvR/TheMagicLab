/* Gr10 Biodiversity and Classification — classify mystery specimens.
 * Eight specimens under the microscope. Examine them (nucleus, cell wall,
 * chloroplasts, number of cells, how it feeds), build up a results table and
 * place each in one of the five kingdoms. Several are chosen as traps: a
 * photosynthetic bacterium, a single-celled alga, a single-celled fungus and
 * a mushroom (no chloroplasts, chitin walls: not a plant).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text, h } = MLX;
  const K = { monera: { en: 'Monera', af: 'Monera' }, protista: { en: 'Protista', af: 'Protista' }, fungi: { en: 'Fungi', af: 'Fungi' }, plantae: { en: 'Plantae', af: 'Plantae' }, animalia: { en: 'Animalia', af: 'Animalia' } };
  const W_ = { none: { en: 'none', af: 'geen' }, pep: { en: 'yes (not cellulose)', af: 'ja (nie sellulose nie)' }, cell: { en: 'yes, cellulose', af: 'ja, sellulose' }, chit: { en: 'yes, chitin', af: 'ja, chitien' } };
  const FEED = { photo: { en: 'photosynthesis', af: 'fotosintese' }, abs: { en: 'absorbs food', af: 'absorbeer voedsel' }, ing: { en: 'ingests food', af: 'neem voedsel in' } };
  const SP = [
    { n: { en: 'Specimen 1: rod-shaped cells', af: 'Monster 1: staafvormige selle' }, nuc: false, wall: 'pep', chl: false, multi: false, feed: 'abs', k: 'monera', col: '#f87171',
      why: { en: 'No nucleus: a prokaryote, so Monera (a bacterium, e.g. E. coli).', af: 'Geen kern: \'n prokariot, dus Monera (\'n bakterie, bv. E. coli).' } },
    { n: { en: 'Specimen 2: blue-green chains', af: 'Monster 2: blougroen kettings' }, nuc: false, wall: 'pep', chl: false, multi: false, feed: 'photo', k: 'monera', col: '#2dd4bf',
      why: { en: 'It photosynthesises, but has no nucleus and no chloroplasts: a cyanobacterium, in Monera.', af: 'Dit fotosinteer, maar het geen kern en geen chloroplaste nie: \'n sianobakterie, in Monera.' } },
    { n: { en: 'Specimen 3: shape-changing blob', af: 'Monster 3: vormveranderende klont' }, nuc: true, wall: 'none', chl: false, multi: false, feed: 'ing', k: 'protista', col: '#60a5fa',
      why: { en: 'A single eukaryotic cell that engulfs food: Protista (an amoeba).', af: '\'n Enkele eukariotiese sel wat voedsel insluk: Protista (\'n ameba).' } },
    { n: { en: 'Specimen 4: green swimmer', af: 'Monster 4: groen swemmer' }, nuc: true, wall: 'cell', chl: true, multi: false, feed: 'photo', k: 'protista', col: '#4ade80',
      why: { en: 'It has chloroplasts, but it is a single cell: a single-celled alga, in Protista — plants are multicellular.', af: 'Dit het chloroplaste, maar dit is \'n enkele sel: \'n eensellige alg, in Protista — plante is meersellig.' } },
    { n: { en: 'Specimen 5: budding oval cells', af: 'Monster 5: botsende ovaal selle' }, nuc: true, wall: 'chit', chl: false, multi: false, feed: 'abs', k: 'fungi', col: '#fde68a',
      why: { en: 'Chitin walls and it absorbs food: a fungus, even though it is single-celled (yeast).', af: 'Chitienwande en dit absorbeer voedsel: \'n swam, al is dit eensellig (gis).' } },
    { n: { en: 'Specimen 6: mushroom tissue', af: 'Monster 6: sampioenweefsel' }, nuc: true, wall: 'chit', chl: false, multi: true, feed: 'abs', k: 'fungi', col: '#fbbf24',
      why: { en: 'No chloroplasts and walls of chitin, not cellulose: mushrooms absorb their food, so they are Fungi, not plants.', af: 'Geen chloroplaste nie en wande van chitien, nie sellulose nie: sampioene absorbeer hul voedsel, so hulle is Fungi, nie plante nie.' } },
    { n: { en: 'Specimen 7: leaf tissue', af: 'Monster 7: blaarweefsel' }, nuc: true, wall: 'cell', chl: true, multi: true, feed: 'photo', k: 'plantae', col: '#22c55e',
      why: { en: 'Many cells with cellulose walls and chloroplasts: Plantae.', af: 'Baie selle met sellulosewande en chloroplaste: Plantae.' } },
    { n: { en: 'Specimen 8: muscle tissue', af: 'Monster 8: spierweefsel' }, nuc: true, wall: 'none', chl: false, multi: true, feed: 'ing', k: 'animalia', col: '#f9a8d4',
      why: { en: 'Many cells without cell walls, from an organism that eats other organisms: Animalia.', af: 'Baie selle sonder selwande, van \'n organisme wat ander organismes eet: Animalia.' } },
  ];
  const TESTS = [['nuc', { en: 'Nucleus?', af: 'Kern?' }], ['wall', { en: 'Cell wall?', af: 'Selwand?' }], ['chl', { en: 'Chloroplasts?', af: 'Chloroplaste?' }], ['multi', { en: 'Cells', af: 'Selle' }], ['feed', { en: 'Feeding', af: 'Voeding' }]];
  const T = {
    aria: { en: 'Microscope view of the specimen', af: 'Mikroskoopaansig van die monster' },
    spec: { en: 'Specimen', af: 'Monster' }, exam: { en: 'Examine it', af: 'Ondersoek dit' }, kingdom: { en: 'Which kingdom?', af: 'Watter koninkryk?' },
    yes: { en: 'yes', af: 'ja' }, no: { en: 'no', af: 'nee' }, one: { en: 'one cell', af: 'een sel' }, many: { en: 'many cells', af: 'baie selle' },
    need: { en: 'Examine at least three features first.', af: 'Ondersoek eers ten minste drie kenmerke.' },
    right: { en: 'Correct. ', af: 'Reg. ' }, wrong: { en: 'Not this one. ', af: 'Nie hierdie een nie. ' },
    start: { en: 'Choose a specimen and examine it under the microscope.', af: 'Kies \'n monster en ondersoek dit onder die mikroskoop.' },
  };
  const val = (s, t) => t === 'nuc' ? L(s.nuc ? T.yes : T.no) : t === 'wall' ? L(W_[s.wall]) : t === 'chl' ? L(s.chl ? T.yes : T.no) : t === 'multi' ? L(s.multi ? T.many : T.one) : L(FEED[s.feed]);
  const say = (s, t) => ({
    nuc: s.nuc ? { en: 'A stain shows a nucleus surrounded by a membrane: eukaryotic.', af: '\'n Kleurstof wys \'n kern omring deur \'n membraan: eukarioties.' } : { en: 'No nucleus: the DNA lies loose in the cytoplasm — prokaryotic.', af: 'Geen kern nie: die DNS lê los in die sitoplasma — prokarioties.' },
    wall: { en: 'Cell wall: ' + L(W_[s.wall]) + '.', af: 'Selwand: ' + L(W_[s.wall]) + '.' },
    chl: s.chl ? { en: 'Green chloroplasts are visible.', af: 'Groen chloroplaste is sigbaar.' } : (s.feed === 'photo' ? { en: 'No chloroplasts, yet the cells are green: the pigment is spread through the cytoplasm.', af: 'Geen chloroplaste nie, tog is die selle groen: die pigment is deur die sitoplasma versprei.' } : { en: 'No chloroplasts.', af: 'Geen chloroplaste nie.' }),
    multi: s.multi ? { en: 'Many cells joined together: multicellular.', af: 'Baie selle saamgevoeg: meersellig.' } : { en: 'Each cell lives on its own: unicellular.', af: 'Elke sel leef op sy eie: eensellig.' },
    feed: { en: 'Feeding: ' + L(FEED[s.feed]) + '.', af: 'Voeding: ' + L(FEED[s.feed]) + '.' },
  })[t];

  let cur = 0, t0 = 0;
  const seen = SP.map(() => ({}));
  const ui = MLX.layout(root, { height: (w) => Math.max(250, Math.min(320, Math.round(w * 0.38))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.spec);
  MLX.seg(c1, { options: SP.map((s, i) => [i, String(i + 1)]), value: 0, onChange: (i) => { cur = i; fb.textContent = ''; ui.setCaption(T.start); refresh(); } });
  const c2 = MLX.card(ui.side, T.exam);
  MLX.seg(c2, { options: TESTS, value: null, onChange: (t) => { seen[cur][t] = true; ui.setCaption(say(SP[cur], t)); refresh(); } });
  const c3 = MLX.card(ui.side, T.kingdom);
  const kb = h('div', { class: 'mlx-seg' }); c3.appendChild(kb);
  Object.keys(K).forEach(k => MLX.button(kb, K[k], () => decide(k)));
  const fb = h('p', { class: 'mlx-note', style: 'margin-top:10px' }); c3.appendChild(fb);
  const tbl = h('table', { style: 'width:100%;border-collapse:collapse;font-size:12.5px;margin-top:10px' });
  ui.stage.appendChild(h('div', { style: 'overflow-x:auto' }, [tbl]));

  function decide(k) {
    if (Object.keys(seen[cur]).length < 3) { fb.textContent = L(T.need); fb.style.color = '#fbbf24'; return; }
    const ok = SP[cur].k === k;
    const DEF = {
      monera: { en: 'Monera have no nucleus (prokaryotes).', af: 'Monera het geen kern nie (prokariote).' },
      protista: { en: 'Protista are eukaryotes, mostly single-celled.', af: 'Protista is eukariote, meestal eensellig.' },
      fungi: { en: 'Fungi have chitin cell walls and absorb their food.', af: 'Fungi het chitien-selwande en absorbeer hul voedsel.' },
      plantae: { en: 'Plantae are multicellular, with chloroplasts and cellulose walls.', af: 'Plantae is meersellig, met chloroplaste en sellulosewande.' },
      animalia: { en: 'Animalia are multicellular, have no cell walls and ingest food.', af: 'Animalia is meersellig, het geen selwande nie en neem voedsel in.' },
    };
    fb.textContent = L(ok ? T.right : T.wrong) + (ok ? L(SP[cur].why) : L(DEF[k]) + ' ' + L({ en: 'Compare that with what you observed.', af: 'Vergelyk dit met wat jy waargeneem het.' }));
    fb.style.color = ok ? '#86efac' : '#fca5a5';
  }
  function refresh() {
    let html = '<thead><tr><th></th>' + TESTS.map(([, l]) => '<th style="text-align:left;padding:6px 8px;color:rgba(226,232,240,.55);font-weight:600">' + L(l) + '</th>').join('') + '</tr></thead><tbody>';
    SP.forEach((s, i) => {
      html += '<tr style="border-top:1px solid rgba(255,255,255,.06);' + (i === cur ? 'background:rgba(255,255,255,.05)' : '') + '"><td style="padding:6px 8px;font-weight:700">' + (i + 1) + '</td>' +
        TESTS.map(([t]) => '<td style="padding:6px 8px;font-family:var(--fm,monospace);color:' + (seen[i][t] ? '#e2e8f0' : 'rgba(226,232,240,.25)') + '">' + (seen[i][t] ? val(s, t) : '·') + '</td>').join('') + '</tr>';
    });
    tbl.innerHTML = html + '</tbody>';
    ui.cv.draw();
  }

  function cell(ctx, x, y, r, s, sn, rot) {
    const shown = seen[cur];
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0);
    const rod = s.wall === 'pep';
    const path = () => { ctx.beginPath(); if (rod) ctx.ellipse(0, 0, r * 1.5, r * 0.6, 0, 0, Math.PI * 2); else if (s.wall === 'none' && !s.multi) { for (let k = 0; k <= 20; k++) { const a = k / 20 * Math.PI * 2, rr = r * (1 + 0.2 * Math.sin(a * 3 + t0)); k ? ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } } else ctx.ellipse(0, 0, r, r * 0.8, 0, 0, Math.PI * 2); };
    ctx.fillStyle = s.col + '33'; path(); ctx.fill();
    ctx.strokeStyle = s.col; ctx.lineWidth = 1.5; path(); ctx.stroke();
    if (shown.wall && s.wall !== 'none') { ctx.strokeStyle = s.wall === 'chit' ? '#fbbf24' : s.wall === 'cell' ? '#86efac' : '#fca5a5'; ctx.lineWidth = 4; path(); ctx.stroke(); }
    if (s.feed === 'photo' && !s.chl) { ctx.fillStyle = 'rgba(45,212,191,0.25)'; path(); ctx.fill(); }
    if (shown.nuc) {
      if (s.nuc) { ctx.fillStyle = '#a78bfa'; ctx.beginPath(); ctx.arc(-r * 0.15, 0, r * 0.28, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#ddd6fe'; ctx.lineWidth = 1.5; ctx.stroke(); }
      else { ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k < 14; k++) { const a = k * 0.9; ctx.lineTo(Math.cos(a) * r * 0.3 * (k % 2 ? 1 : 0.6), Math.sin(a) * r * 0.2); } ctx.stroke(); }
    }
    if (shown.chl && s.chl) { ctx.fillStyle = '#16a34a'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.ellipse(r * 0.4 * Math.cos(k * 1.3), r * 0.45 * Math.sin(k * 1.3 + 0.5), r * 0.14, r * 0.07, k, 0, Math.PI * 2); ctx.fill(); } }
    ctx.restore();
  }
  function draw(ctx, W, H) {
    const s = SP[cur];
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    // round microscope field
    const cx = W * 0.5, cy = H * 0.5, R = Math.min(W, H) * 0.44;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = '#1b2433'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    if (s.multi) {
      // a sheet of joined cells
      const r = R * 0.16;
      for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) cell(ctx, cx + i * r * 2.05 + (j % 2) * r, cy + j * r * 1.7, r, s, i * 7 + j, 0);
    } else {
      const r = s.wall === 'pep' ? R * 0.16 : R * 0.3;
      if (s.feed === 'photo' && s.wall === 'pep') for (let k = -2; k <= 2; k++) cell(ctx, cx + k * r * 3.1, cy, r, s, k, 0);
      else if (s.wall === 'pep') [[-0.4, -0.3, 0.4], [0.3, 0.1, -0.3], [-0.1, 0.45, 1.2]].forEach(([dx, dy, a]) => cell(ctx, cx + dx * R, cy + dy * R, r, s, 0, a));
      else if (s.wall === 'chit') { cell(ctx, cx - r * 0.6, cy, r, s, 0, 0); cell(ctx, cx + r * 0.95, cy - r * 0.5, r * 0.5, s, 1, 0.4); }
      else cell(ctx, cx + Math.sin(t0 * 0.6) * 6, cy, r, s, 0, 0);
    }
    ctx.restore();
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, R + 4, 0, Math.PI * 2); ctx.stroke();
    text(ctx, s.n, 14, 22, { size: 12, weight: 700, color: 'rgba(226,232,240,0.75)' });
  }

  ui.setCaption(T.start);
  refresh();
  MLX.loop(ui.stage, (dt) => { t0 += dt; ui.cv.draw(); }).start();
});
