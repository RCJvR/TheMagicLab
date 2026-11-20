// Grade 4 Math Magician, Chapter 8 sims (financial mathematics). Each is (L, root) => void and may only use window.G4.
// Money is kept in whole cents everywhere; R(c) only formats it for display ("R23,50").

/* 801 Purse: tap coins and notes to make an exact amount. */
exports.s801 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out'), tray = q(root, 'tray');
  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');
  const lab = v => v >= 100 ? 'R' + v / 100 : v + 'c';
  const NOTE = { 1000: '#15803d', 2000: '#92400e', 5000: '#b91c1c', 10000: '#1d4ed8' };
  const chip = (v, i) => v >= 1000
    ? '<button class="g4-btn" data-i="' + i + '" style="background:' + NOTE[v] + ';color:#fff;border-color:rgba(255,255,255,.5);min-width:72px;padding:10px 8px">' + lab(v) + '</button>'
    : '<button class="g4-btn" data-i="' + i + '" style="border-radius:50%;width:' + (v >= 100 ? 54 : 46) + 'px;height:' + (v >= 100 ? 54 : 46) + 'px;padding:0;font-size:' + (v >= 100 ? 16 : 14) + 'px;background:' + (v >= 100 ? 'radial-gradient(#e5e7eb,#9ca3af)' : 'radial-gradient(#fcd34d,#b45309)') + ';color:#111;border-color:rgba(255,255,255,.4)">' + lab(v) + '</button>';
  let target = 0, put = [];
  const total = () => put.reduce((s, v) => s + v, 0);
  function draw() {
    tray.innerHTML = put.length ? put.map((v, i) => chip(v, 't' + i)).join('') : '<span style="opacity:.6">' + L.empty + '</span>';
    q(root, 'sum').innerHTML = L.total(R(total()), total());
  }
  function fresh() { target = rnd(2, 120) * 10; put = []; q(root, 'goal').textContent = L.goal(R(target)); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }
  q(root, 'pal').innerHTML = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10].map(v => chip(v, 'p' + v)).join('');
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    const i = t.dataset.i;
    if (i && i[0] === 'p') { put.push(+i.slice(1)); put.sort((a, b) => b - a); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }
    else if (i && i[0] === 't') { put.splice(+i.slice(1), 1); draw(); }
    else if (t.dataset.k === 'check') {
      const s = total(), d = Math.abs(s - target);
      out.className = 'g4-out ' + (s === target ? 'good' : 'bad');
      out.innerHTML = s === target ? L.yes(R(target), target, put.map(lab).join(' + ')) : (s < target ? L.more : L.less)(R(d), d);
    } else if (t.dataset.k === 'clear') { put = []; draw(); }
    else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};

/* 802 Till: count on from the price to the money paid, coin by coin. */
exports.s802 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out'), tray = q(root, 'tray');
  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');
  const lab = v => v >= 100 ? 'R' + v / 100 : v + 'c';
  const NOTE = { 1000: '#15803d', 2000: '#92400e', 5000: '#b91c1c' };
  const chip = (v, i) => v >= 1000
    ? '<button class="g4-btn" data-i="' + i + '" style="background:' + NOTE[v] + ';color:#fff;border-color:rgba(255,255,255,.5);min-width:72px;padding:10px 8px">' + lab(v) + '</button>'
    : '<button class="g4-btn" data-i="' + i + '" style="border-radius:50%;width:' + (v >= 100 ? 54 : 46) + 'px;height:' + (v >= 100 ? 54 : 46) + 'px;padding:0;font-size:' + (v >= 100 ? 16 : 14) + 'px;background:' + (v >= 100 ? 'radial-gradient(#e5e7eb,#9ca3af)' : 'radial-gradient(#fcd34d,#b45309)') + ';color:#111;border-color:rgba(255,255,255,.4)">' + lab(v) + '</button>';
  let price = 0, paid = 0, put = [], item = null;
  const total = () => put.reduce((s, v) => s + v, 0);
  function draw() {
    tray.innerHTML = put.length ? put.map((v, i) => chip(v, 't' + i)).join('') : '<span style="opacity:.6">' + L.empty + '</span>';
    let run = price; const steps = [R(price)]; put.forEach(v => { run += v; steps.push(R(run)); });
    q(root, 'line').innerHTML = steps.join(' → ') + (put.length ? '' : ' → … ' + R(paid));
  }
  function fresh() {
    item = L.items[rnd(0, L.items.length - 1)]; paid = [1000, 2000, 5000][rnd(0, 2)];
    price = rnd(Math.ceil(paid * 0.4 / 50), paid / 50 - 1) * 50;
    put = []; q(root, 'sale').innerHTML = L.sale(item.n, R(price), R(paid)); q(root, 'stk').innerHTML = window.G4.stk(item.s);
    out.className = 'g4-out'; out.innerHTML = L.ask; draw();
  }
  q(root, 'pal').innerHTML = [2000, 1000, 500, 200, 100, 50, 20, 10].map(v => chip(v, 'p' + v)).join('');
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    const i = t.dataset.i;
    if (i && i[0] === 'p') { put.push(+i.slice(1)); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }
    else if (i && i[0] === 't') { put.splice(+i.slice(1), 1); draw(); }
    else if (t.dataset.k === 'check') {
      const ch = paid - price, s = total();
      out.className = 'g4-out ' + (s === ch ? 'good' : 'bad');
      out.innerHTML = s === ch ? L.yes(R(ch), R(price), R(paid)) : (s < ch ? L.short : L.over)(R(Math.abs(ch - s)), R(price + s), R(paid));
    } else if (t.dataset.k === 'clear') { put = []; draw(); }
    else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};

/* 803 Tuck shop budget: buy the must-haves, stay within the budget, and spend so that nothing else fits. */
exports.s803 = function (L, root) {
  const { q, rnd, shuffle } = window.G4;
  const out = q(root, 'out'), shop = q(root, 'shop');
  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');
  let budget = 0, must = [], got = new Set();
  const spent = () => [...got].reduce((s, i) => s + L.items[i].p, 0);
  function draw() {
    shop.innerHTML = L.items.map((it, i) => '<button class="g4-btn ghost" data-it="' + i + '" aria-pressed="' + got.has(i) + '" style="display:flex;flex-direction:column;align-items:center;gap:2px;width:104px;padding:8px 4px">' + '<img src="/assets/stickers/' + it.s + '.webp" srcset="/assets/stickers/' + it.s + '@2x.webp 2x" alt="" style="width:58px;height:58px;object-fit:contain">' + '<span style="font-size:15px">' + it.n + '</span><b>' + R(it.p) + '</b>' + (must.includes(i) ? '<span style="font-size:12px;color:#fbbf24">' + L.mustTag + '</span>' : '') + '</button>').join('');
    const s = spent(), left = budget - s;
    q(root, 'live').innerHTML = L.live(R(s), left >= 0 ? R(left) : '−' + R(-left));
  }
  function fresh() {
    budget = [3000, 4000, 5000][rnd(0, 2)];
    do { must = shuffle(L.items.map((_, i) => i)).slice(0, 2); } while (L.items[must[0]].p + L.items[must[1]].p > budget - 800);
    got = new Set(must); q(root, 'task').innerHTML = L.task(R(budget), must.map(i => L.items[i].n).join(L.and));
    out.className = 'g4-out'; out.innerHTML = L.ask; draw();
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.it != null) { const i = +t.dataset.it; if (got.has(i)) got.delete(i); else got.add(i); out.className = 'g4-out'; out.innerHTML = L.ask; draw(); }
    else if (t.dataset.k === 'check') {
      const s = spent(), left = budget - s, miss = must.filter(i => !got.has(i));
      const fits = L.items.map((it, i) => i).filter(i => !got.has(i) && L.items[i].p <= left).sort((a, b) => L.items[a].p - L.items[b].p);
      out.className = 'g4-out bad';
      if (miss.length) out.innerHTML = L.missing(miss.map(i => L.items[i].n).join(L.and));
      else if (left < 0) out.innerHTML = L.over(R(-left));
      else if (fits.length) out.innerHTML = L.more(R(left), L.items[fits[0]].n, R(L.items[fits[0]].p));
      else { out.className = 'g4-out good'; out.innerHTML = L.yes(R(s), R(budget), R(left)); }
    } else if (t.dataset.k === 'new') fresh();
  });
  fresh();
};

/* 804 Till slip: work out each line, the total and the change. Every box gets its own feedback. */
exports.s804 = function (L, root) {
  const { q, rnd } = window.G4;
  const out = q(root, 'out'), slip = q(root, 'slip');
  const R = c => 'R' + Math.floor(c / 100) + ',' + String(c % 100).padStart(2, '0');
  const parse = s => { s = String(s).replace(/[\s ]/g, '').replace(/^r/i, ''); if (!s) return null; if (/c$/i.test(s)) { const v = parseInt(s, 10); return isNaN(v) ? null : v; } const v = parseFloat(s.replace(',', '.')); return isNaN(v) ? null : Math.round(v * 100); };
  let P = null;
  function fresh() {
    const a = L.items.slice().sort(() => Math.random() - 0.5).slice(0, 2);
    const lines = a.map(it => ({ n: it.n, k: rnd(2, 4), p: rnd(it.lo, it.hi) * 50 }));
    const tot = lines.reduce((s, l) => s + l.k * l.p, 0), paid = [2000, 5000, 10000, 20000].find(v => v > tot);
    P = { lines, tot, paid };
    const inp = k => '<input class="g4-input" data-k="' + k + '" inputmode="decimal" style="width:120px" aria-label="' + k + '">';
    slip.innerHTML = lines.map((l, i) => '<tr><td style="text-align:left;font-size:18px">' + l.k + ' × ' + l.n + ' @ ' + R(l.p) + '</td><td>' + inp('l' + i) + '</td></tr>').join('') +
      '<tr><td style="text-align:left;font-size:18px"><b>' + L.total + '</b></td><td>' + inp('tot') + '</td></tr>' +
      '<tr><td style="text-align:left;font-size:18px">' + L.paid(R(paid)) + ' · <b>' + L.change + '</b></td><td>' + inp('ch') + '</td></tr>';
    out.className = 'g4-out'; out.innerHTML = L.ask;
  }
  function check() {
    const want = { l0: P.lines[0].k * P.lines[0].p, l1: P.lines[1].k * P.lines[1].p, tot: P.tot, ch: P.paid - P.tot };
    const msgs = []; let all = true;
    Object.keys(want).forEach(k => {
      const el = q(root, k), v = parse(el.value), ok = v === want[k];
      el.style.borderColor = v == null ? '' : ok ? '#4ade80' : '#f87171';
      if (!ok) { all = false; if (v != null) msgs.push(k === 'tot' ? L.tipTot : k === 'ch' ? L.tipCh(R(P.paid)) : L.tipLine(P.lines[+k[1]].k, R(P.lines[+k[1]].p))); }
    });
    out.className = 'g4-out ' + (all ? 'good' : 'bad');
    out.innerHTML = all ? L.yes(R(P.tot), R(P.paid - P.tot), R(P.paid)) : (msgs.length ? msgs.join('<br>') : L.fill);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.k === 'check') check(); else if (t.dataset.k === 'new') fresh();
  });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') check(); });
  fresh();
};
