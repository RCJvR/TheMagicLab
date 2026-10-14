/* Gr12 Evolution — hominin brain size through time.
 * Each species is a bar: when it lived (million years ago) against its
 * average brain volume (cm³). Drag the time line to see who lived together.
 * Approximate, commonly cited values; South African finds are marked.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const SP = [
    { n: 'Ardipithecus ramidus', a: 4.5, b: 4.3, brain: 325, core: false, sa: false, note: { en: 'partly bipedal, also climbed trees', af: 'gedeeltelik regop, het ook in bome geklim' } },
    { n: 'Australopithecus afarensis', a: 3.9, b: 2.9, brain: 450, core: true, sa: false, note: { en: '"Lucy"; walked upright, small brain', af: '"Lucy"; het regop geloop, klein brein' } },
    { n: 'Australopithecus africanus', a: 3.3, b: 2.1, brain: 460, core: true, sa: true, note: { en: 'Taung Child, Mrs Ples (Cradle of Humankind)', af: 'Taung-kind, Mrs Ples (Wieg van die Mensdom)' } },
    { n: 'Australopithecus sediba', a: 2.0, b: 1.95, brain: 420, core: false, sa: true, note: { en: 'Karabo, found at Malapa', af: 'Karabo, by Malapa gevind' } },
    { n: 'Paranthropus robustus', a: 2.0, b: 1.0, brain: 530, core: false, sa: true, note: { en: 'big jaws and teeth for tough plant food', af: 'groot kake en tande vir taai plantvoedsel' } },
    { n: 'Homo habilis', a: 2.4, b: 1.5, brain: 610, core: true, sa: false, note: { en: 'first stone tools', af: 'eerste klipgereedskap' } },
    { n: 'Homo erectus', a: 1.9, b: 0.14, brain: 950, core: true, sa: false, note: { en: 'used fire; first to leave Africa', af: 'het vuur gebruik; eerste om Afrika te verlaat' } },
    { n: 'Homo naledi', a: 0.34, b: 0.24, brain: 510, core: false, sa: true, note: { en: 'Rising Star cave; small brain, yet recent', af: 'Rising Star-grot; klein brein, tog onlangs' } },
    { n: 'Homo neanderthalensis', a: 0.4, b: 0.04, brain: 1450, core: false, sa: false, note: { en: 'Europe and Asia; lived alongside us', af: 'Europa en Asië; het saam met ons geleef' } },
    { n: 'Homo sapiens', a: 0.3, b: 0, brain: 1350, core: true, sa: false, note: { en: 'modern humans, from Africa', af: 'moderne mense, uit Afrika' } },
  ];
  const COL = { Ardipithecus: '#a8a29e', Australopithecus: '#fbbf24', Paranthropus: '#fb923c', Homo: '#60a5fa' };
  const T = {
    aria: { en: 'Chart of hominin species: when they lived and their brain size', af: 'Grafiek van hominienspesies: wanneer hulle geleef het en hul breingrootte' },
    ctrl: { en: 'Explore', af: 'Verken' }, time: { en: 'Time', af: 'Tyd' }, mya: { en: 'million years ago', af: 'miljoen jaar gelede' },
    show: { en: 'Species shown', af: 'Spesies gewys' }, core: { en: 'The four in the lesson', af: 'Die vier in die les' }, all: { en: 'All ten', af: 'Al tien' },
    join: { en: 'Join the species in time order', af: 'Verbind die spesies in tydsvolgorde' },
    alive: { en: 'Alive at this time', af: 'Lewend op hierdie tyd' }, none: { en: 'no hominins found from this time', af: 'geen hominiene van hierdie tyd gevind nie' },
    brain: { en: 'Brain volume (cm³)', af: 'Breinvolume (cm³)' }, chimp: { en: 'chimpanzee ~400', af: 'sjimpansee ~400' }, now: { en: 'now', af: 'nou' },
    sa: { en: 'SA = found in South Africa', af: 'SA = in Suid-Afrika gevind' },
  };
  let tNow = 2.0, all = true, join = false;
  const shown = () => SP.filter(s => all || s.core);
  const fmtT = (t) => t >= 1 ? num(t, 1) : t > 0 ? num(t, 2) : '0';
  const ui = MLX.layout(root, { height: (w) => Math.max(290, Math.min(380, Math.round(w * 0.46))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.ctrl);
  const sl = MLX.slider(c1, { label: T.time, min: 0, max: 450, value: 450 - tNow * 100, fmt: (v) => fmtT((450 - v) / 100) + ' ' + L(T.mya), onInput: (v) => { tNow = (450 - v) / 100; update(); } });
  MLX.seg(c1, { label: T.show, options: [[true, T.all], [false, T.core]], value: all, onChange: (v) => { all = v; update(); } });
  MLX.check(c1, { label: T.join, value: join, onChange: (v) => { join = v; update(); } });
  const c2 = MLX.card(ui.side, T.alive);
  const list = MLX.h('div', { style: 'font-size:13px;line-height:1.55' }); c2.appendChild(list);

  function update() {
    const alive = shown().filter(s => tNow <= s.a + 0.02 && tNow >= s.b - 0.02);
    list.innerHTML = alive.length ? alive.map(s => '<div style="margin-bottom:6px"><strong style="color:' + COL[s.n.split(' ')[0]] + '"><em>' + s.n + '</em></strong>' + (s.sa ? ' · SA' : '') + '<br><span style="color:rgba(226,232,240,.6)">' + s.brain + ' cm³ · ' + L(s.note) + '</span></div>').join('') : '<span style="color:rgba(226,232,240,.5)">' + L(T.none) + '</span>';
    let c;
    if (join) c = { en: 'In time order the brain size does not rise smoothly: it jumps, and some later species (like Homo naledi) had small brains. Evolution branches; it is not a ladder.', af: 'In tydsvolgorde styg die breingrootte nie egalig nie: dit spring, en sommige latere spesies (soos Homo naledi) het klein breine gehad. Evolusie vertak; dit is nie \'n leer nie.' };
    else if (alive.length > 1) c = { en: `${alive.length} hominin species lived at the same time ${fmtT(tNow)} million years ago — they did not simply replace one another.`, af: `${alive.length} hominienspesies het ${fmtT(tNow)} miljoen jaar gelede gelyktydig geleef — hulle het mekaar nie eenvoudig vervang nie.` };
    else c = { en: 'Drag the time line and watch which species lived together.', af: 'Sleep die tydlyn en kyk watter spesies saam geleef het.' };
    ui.setCaption(c);
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const x0 = 58, x1 = W - 20, y0 = 26, y1 = H - 40;
    const X = (t) => x1 - t / 4.6 * (x1 - x0), Y = (b) => y1 - b / 1600 * (y1 - y0);
    // axes and grid
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    for (let b = 0; b <= 1600; b += 400) { ctx.beginPath(); ctx.moveTo(x0, Y(b)); ctx.lineTo(x1, Y(b)); ctx.stroke(); text(ctx, String(b), x0 - 6, Y(b) + 4, { size: 10, mono: true, align: 'right', color: 'rgba(226,232,240,0.5)' }); }
    for (let t = 0; t <= 4.5; t += 0.5) { ctx.beginPath(); ctx.moveTo(X(t), y1); ctx.lineTo(X(t), y1 + 4); ctx.stroke(); text(ctx, t === 0 ? L(T.now) : num(t, 1), X(t), y1 + 16, { size: 10, mono: true, align: 'center', color: 'rgba(226,232,240,0.5)' }); }
    text(ctx, T.mya, (x0 + x1) / 2, H - 8, { size: 11, align: 'center', color: 'rgba(226,232,240,0.6)' });
    ctx.save(); ctx.translate(14, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); text(ctx, T.brain, 0, 0, { size: 11, align: 'center', color: 'rgba(226,232,240,0.6)' }); ctx.restore();
    // chimpanzee reference
    ctx.strokeStyle = 'rgba(226,232,240,0.25)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x0, Y(400)); ctx.lineTo(x1, Y(400)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, T.chimp, x0 + 6, Y(400) + 13, { size: 10, color: 'rgba(226,232,240,0.45)' });
    // trend line through the species in time order
    const S = shown();
    if (join) {
      const pts = S.map(s => [X((s.a + s.b) / 2), Y(s.brain)]).sort((p, q) => p[0] - q[0]);
      ctx.strokeStyle = 'rgba(253,224,71,0.7)'; ctx.lineWidth = 2; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    }
    // species bars; labels go to the first free spot (right, left, above, below)
    const placed = S.map(s => { const xa = X(s.a), xb = Math.max(X(s.b), xa + 6), y = Y(s.brain); return [xa - 2, y - 6, xb + 2, y + 6]; });
    ctx.font = '500 10px "Cabinet Grotesk", sans-serif';
    placed.push([x0 + 4, Y(400) + 2, x0 + 10 + ctx.measureText(L(T.chimp)).width, Y(400) + 15]);   // chimpanzee label
    const hit = (r) => placed.some(q => r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1]);
    S.forEach(s => {
      const col = COL[s.n.split(' ')[0]], alive = tNow <= s.a + 0.02 && tNow >= s.b - 0.02;
      const xa = X(s.a), xb = Math.max(X(s.b), xa + 6), y = Y(s.brain);
      ctx.fillStyle = col; ctx.globalAlpha = alive ? 1 : 0.45;
      MLX.roundRect(ctx, xa, y - 5, xb - xa, 10, 5); ctx.fill(); ctx.globalAlpha = 1;
      if (alive) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; MLX.roundRect(ctx, xa, y - 5, xb - xa, 10, 5); ctx.stroke(); }
      const lab = s.n.replace('Australopithecus', 'A.').replace('Paranthropus', 'P.').replace('Ardipithecus', 'Ar.').replace('Homo ', 'H. ');
      const full = lab + (s.sa ? ' · SA' : '');
      ctx.font = (alive ? 700 : 500) + ' 11px "Cabinet Grotesk", sans-serif';
      const tw = ctx.measureText(full).width, mid = (xa + xb) / 2;
      const spots = [[xb + 6, y + 4, 'left'], [xa - 6, y + 4, 'right'], [mid, y - 9, 'center'], [mid, y + 17, 'center'], [xb + 6, y - 9, 'left'], [xb + 6, y + 17, 'left']];
      let pick = spots[0];
      for (const sp of spots) {
        const left = sp[2] === 'left' ? sp[0] : sp[2] === 'right' ? sp[0] - tw : sp[0] - tw / 2;
        const r = [left, sp[1] - 10, left + tw, sp[1] + 2];
        if (left >= x0 && left + tw <= x1 && !hit(r)) { pick = sp; placed.push(r); break; }
      }
      text(ctx, full, pick[0], pick[1], { size: 11, weight: alive ? 700 : 500, align: pick[2], color: alive ? '#fff' : 'rgba(226,232,240,0.6)' });
    });
    // time line
    ctx.strokeStyle = 'rgba(167,139,250,0.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(tNow), y0 - 6); ctx.lineTo(X(tNow), y1); ctx.stroke();
    text(ctx, fmtT(tNow), X(tNow), y0 - 10, { size: 11, mono: true, weight: 700, align: 'center', color: '#c4b5fd' });
    text(ctx, T.sa, x1, y0 + 2, { size: 10, align: 'right', color: 'rgba(226,232,240,0.45)' });
  }
  // drag the time line on the chart
  let drag = false;
  const toT = (e) => { const r = ui.cv.el.getBoundingClientRect(), x0 = 58, x1 = r.width - 20; return Math.max(0, Math.min(4.5, (x1 - (e.clientX - r.left)) / (x1 - x0) * 4.6)); };
  ui.cv.el.addEventListener('pointerdown', (e) => { drag = true; ui.cv.el.setPointerCapture(e.pointerId); tNow = Math.round(toT(e) * 100) / 100; sl.set(450 - tNow * 100); update(); });
  ui.cv.el.addEventListener('pointermove', (e) => { if (!drag) return; tNow = Math.round(toT(e) * 100) / 100; sl.set(450 - tNow * 100); update(); });
  ui.cv.el.addEventListener('pointerup', () => { drag = false; });

  update();
});
