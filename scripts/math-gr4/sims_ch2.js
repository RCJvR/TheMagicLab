// Grade 4 Math Magician, Chapter 2 sims (2-D shapes and 3-D objects). Each is (L, root) => void and may only use window.G4.

/* 201 Shape sorter: straight sides, curved sides, or both. */
exports.s201 = function (L, root) {
  const { q, shuffle } = window.G4;
  const SH = {
    square: '<rect x="45" y="25" width="90" height="90" />',
    rectangle: '<rect x="20" y="40" width="140" height="70" />',
    triangle: '<path d="M90 20 L160 125 L20 125 Z" />',
    hexagon: '<path d="M60 25 L120 25 L150 75 L120 125 L60 125 L30 75 Z" />',
    circle: '<circle cx="90" cy="75" r="55" />',
    oval: '<ellipse cx="90" cy="75" rx="75" ry="45" />',
    crescent: '<path d="M110 20 A58 58 0 1 0 110 130 A45 45 0 1 1 110 20 Z" />',
    semicircle: '<path d="M25 110 A65 65 0 0 1 155 110 Z" />',
    quarter: '<path d="M40 125 L40 25 A100 100 0 0 1 140 125 Z" />',
    arch: '<path d="M40 130 L40 70 A50 50 0 0 1 140 70 L140 130 Z" />'
  };
  const KIND = { square: 0, rectangle: 0, triangle: 0, hexagon: 0, circle: 1, oval: 1, crescent: 1, semicircle: 2, quarter: 2, arch: 2 };
  const COLS = ['#60a5fa', '#f472b6', '#facc15'];
  const card = q(root, 'card'), out = q(root, 'out'), bins = q(root, 'bins');
  let deck, pos, score;
  bins.innerHTML = L.bins.map((b, i) => '<button class="g4-btn" data-b="' + i + '" style="flex:1;min-width:150px;border-color:' + COLS[i] + '">' + b + '</button>').join('');
  function start() { deck = shuffle(Object.keys(SH)); pos = 0; score = 0; draw(); }
  function draw() {
    bins.querySelectorAll('button').forEach(b => { b.disabled = false; b.style.outline = ''; });
    q(root, 'next').style.display = 'none';
    if (pos >= deck.length) { card.innerHTML = '<div class="g4-big">⭐ ' + L.done(score, deck.length) + '</div>'; bins.style.display = 'none'; q(root, 'again').style.display = ''; out.className = 'g4-out good'; out.innerHTML = L.end; return; }
    bins.style.display = ''; q(root, 'again').style.display = 'none';
    const k = deck[pos];
    card.innerHTML = '<svg viewBox="0 0 180 150" style="width:180px;height:150px"><g fill="rgba(158,212,60,.18)" stroke="#c3e56f" stroke-width="5" stroke-linejoin="round">' + SH[k] + '</g></svg><div class="g4-big" style="font-size:24px">' + L.names[k] + '</div>';
    out.className = 'g4-out'; out.innerHTML = L.ask + ' ' + L.of(pos + 1, deck.length);
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.b != null && !b.disabled) {
      const k = deck[pos], ok = +b.dataset.b === KIND[k]; if (ok) score++;
      bins.querySelectorAll('button').forEach(x => { x.disabled = true; if (+x.dataset.b === KIND[k]) x.style.outline = '3px solid #4ade80'; });
      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.why(KIND[k], L.names[k]);
      q(root, 'next').style.display = '';
    } else if (b.dataset.k === 'next') { pos++; draw(); }
    else if (b.dataset.k === 'again') start();
  });
  start();
};

/* 202 Polygon namer: a random polygon appears; name it, then count sides and vertices. */
exports.s202 = function (L, root) {
  const { q, rnd, shuffle } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out'), opts = q(root, 'opts');
  let n = 4, pts = [], answered = false, score = 0, tries = 0;
  function make() {
    n = rnd(3, 6);
    const regular = q(root, 'reg').getAttribute('aria-pressed') === 'true';
    const angs = regular ? Array.from({ length: n }, (_, i) => -Math.PI / 2 + i * 2 * Math.PI / n) : Array.from({ length: n }, (_, i) => -Math.PI / 2 + (i + 0.25 + Math.random() * 0.5) * 2 * Math.PI / n);
    pts = angs.map(a => { const r = regular ? 85 : rnd(60, 95); return [160 + r * Math.cos(a), 110 + r * Math.sin(a)]; });
    answered = false; draw(false);
    const choices = shuffle([3, 4, 5, 6]);
    opts.innerHTML = choices.map(c => '<button class="g4-btn ghost" data-n="' + c + '">' + L.names[c] + '</button>').join('');
    out.className = 'g4-out'; out.innerHTML = L.ask;
  }
  function draw(reveal) {
    let h = '<path d="M' + pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L') + ' Z" fill="rgba(96,165,250,.18)" stroke="#93c5fd" stroke-width="4" stroke-linejoin="round"/>';
    if (reveal) {
      pts.forEach((p, i) => { const qq = pts[(i + 1) % n], mx = (p[0] + qq[0]) / 2, my = (p[1] + qq[1]) / 2, dx = mx - 160, dy = my - 110, d = Math.hypot(dx, dy) || 1; h += '<text x="' + (mx + dx / d * 18) + '" y="' + (my + dy / d * 18 + 6) + '" text-anchor="middle" fill="#fde047" font-size="18" font-weight="900">' + (i + 1) + '</text>'; });
      pts.forEach(p => { h += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="7" fill="#f472b6"/>'; });
    }
    svg.innerHTML = h;
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.n && !answered) {
      answered = true; tries++; const ok = +b.dataset.n === n; if (ok) score++;
      opts.querySelectorAll('button').forEach(x => { x.disabled = true; if (+x.dataset.n === n) x.setAttribute('aria-pressed', 'true'); });
      draw(true);
      out.className = 'g4-out ' + (ok ? 'good' : 'bad'); out.innerHTML = (ok ? L.yes : L.no) + ' ' + L.count(L.names[n], n) + ' ' + L.score(score, tries);
    } else if (b.dataset.k === 'new') make();
    else if (b.dataset.k === 'reg') { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); make(); }
  });
  make();
};

/* 203 Grid drawer: join dots to draw a polygon on grid paper. */
exports.s203 = function (L, root) {
  const { q, pt, shuffle } = window.G4;
  const svg = q(root, 'svg'), out = q(root, 'out');
  const COLS = 12, ROWS = 8, G = 40, X0 = 60, Y0 = 20;
  let pts = [], closed = false, target = null;
  const name = n => L.names[n] || L.many(n);
  function draw(hover) {
    let h = '';
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) h += '<circle cx="' + (X0 + c * G) + '" cy="' + (Y0 + r * G) + '" r="3.5" fill="rgba(226,232,240,.35)"/>';
    if (pts.length) {
      const P = pts.map(([c, r]) => [X0 + c * G, Y0 + r * G]);
      if (closed) h += '<path d="M' + P.map(p => p.join(' ')).join(' L') + ' Z" fill="rgba(158,212,60,.18)" stroke="#9ed43c" stroke-width="4" stroke-linejoin="round"/>';
      else h += '<path d="M' + P.map(p => p.join(' ')).join(' L') + '" fill="none" stroke="#9ed43c" stroke-width="4" stroke-linejoin="round"/>';
      P.forEach((p, i) => { h += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i === 0 && !closed ? 10 : 7) + '" fill="' + (i === 0 ? '#fde047' : '#f472b6') + '"/>'; });
    }
    svg.innerHTML = h;
  }
  function status() {
    out.className = 'g4-out';
    if (closed) {
      const n = pts.length; let msg = L.made(name(n), n);
      if (target) { const ok = n === target; out.className = 'g4-out ' + (ok ? 'good' : 'bad'); msg = (ok ? L.yes : L.notTarget(name(target))) + ' ' + msg; }
      out.innerHTML = msg;
    } else out.innerHTML = (target ? L.goal(name(target)) + ' ' : '') + (pts.length ? L.keep(pts.length) : L.start);
  }
  svg.addEventListener('click', e => {
    if (closed) return;
    const p = pt(svg, e), c = Math.round((p.x - X0) / G), r = Math.round((p.y - Y0) / G);
    if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return;
    if (pts.length >= 3 && c === pts[0][0] && r === pts[0][1]) closed = true;
    else if (!pts.some(([a, b]) => a === c && b === r)) pts.push([c, r]);
    draw(); status();
  });
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.k === 'undo') { if (closed) closed = false; else pts.pop(); }
    else if (b.dataset.k === 'clear') { pts = []; closed = false; }
    else if (b.dataset.k === 'goal') { target = shuffle([3, 4, 5, 6])[0]; pts = []; closed = false; }
    else return;
    draw(); status();
  });
  draw(); status();
};

/* 204 3-D object explorer: turn the object, count faces and vertices, and see its net. */
exports.s204 = function (L, root) {
  const { q } = window.G4;
  const svg = q(root, 'svg'), info = q(root, 'info'), turn = q(root, 'turn');
  const box = (a, b, c) => ({ v: [[-a, -b, -c], [a, -b, -c], [a, b, -c], [-a, b, -c], [-a, -b, c], [a, -b, c], [a, b, c], [-a, b, c]], f: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]] });
  const OBJ = {
    cube: box(1, 1, 1), rprism: box(1.5, 0.8, 0.9),
    tprism: { v: [[-1, -0.8, -1.3], [1, -0.8, -1.3], [0, 0.95, -1.3], [-1, -0.8, 1.3], [1, -0.8, 1.3], [0, 0.95, 1.3]], f: [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]] },
    pyramid: { v: [[-1, -0.8, -1], [1, -0.8, -1], [1, -0.8, 1], [-1, -0.8, 1], [0, 1.15, 0]], f: [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]] },
    cylinder: null, sphere: null
  };
  const KEYS = ['cube', 'rprism', 'tprism', 'pyramid', 'cylinder', 'sphere'];
  let key = 'cube', ang = 0.6, net = false;
  q(root, 'pick').innerHTML = KEYS.map(k => '<button class="g4-btn ghost" data-o="' + k + '">' + L.obj[k].n + '</button>').join('');
  const COL = { 4: [96, 165, 250], 3: [244, 114, 182] };
  function solid() {
    const o = OBJ[key], tilt = 0.45, ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);
    const P = o.v.map(([x, y, z]) => { const x1 = x * ca + z * sa, z1 = -x * sa + z * ca; const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct; return [x1, y2, z2]; });
    const faces = o.f.map(f => {
      const pts = f.map(i => P[i]), c = pts.reduce((a, p) => [a[0] + p[0] / pts.length, a[1] + p[1] / pts.length, a[2] + p[2] / pts.length], [0, 0, 0]);
      const u = pts[1].map((v, i) => v - pts[0][i]), w = pts[2].map((v, i) => v - pts[0][i]);
      let nrm = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
      if (nrm[0] * c[0] + nrm[1] * c[1] + nrm[2] * c[2] < 0) nrm = nrm.map(v => -v);
      const len = Math.hypot(...nrm) || 1; return { pts, z: c[2], vis: nrm[2] / len, f };
    }).sort((a, b) => a.z - b.z);
    let h = '';
    faces.forEach(F => {
      const base = COL[F.f.length] || COL[4], light = 0.45 + 0.55 * Math.max(0, F.vis), alpha = F.vis > 0 ? 0.92 : 0.12;
      const d = 'M' + F.pts.map(p => (320 + p[0] * 70).toFixed(1) + ' ' + (150 - p[1] * 70).toFixed(1)).join(' L') + ' Z';
      h += '<path d="' + d + '" fill="rgba(' + base.map(c => Math.round(c * light)).join(',') + ',' + alpha + ')" stroke="#e2e8f0" stroke-width="' + (F.vis > 0 ? 2 : 1) + '" stroke-dasharray="' + (F.vis > 0 ? '' : '4 4') + '"/>';
    });
    P.forEach(p => { h += '<circle cx="' + (320 + p[0] * 70) + '" cy="' + (150 - p[1] * 70) + '" r="5" fill="#fde047" opacity="' + (p[2] > -0.2 ? 1 : 0.4) + '"/>'; });
    return h;
  }
  function round() {
    if (key === 'cylinder') return '<defs><linearGradient id="g4cyl" x1="0" x2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".45" stop-color="#60a5fa"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient></defs><rect x="250" y="60" width="140" height="170" fill="url(#g4cyl)"/><ellipse cx="320" cy="230" rx="70" ry="20" fill="#1e3a8a"/><ellipse cx="320" cy="60" rx="70" ry="20" fill="#93c5fd" stroke="#e2e8f0" stroke-width="2"/>';
    return '<defs><radialGradient id="g4sph" cx="35%" cy="35%"><stop offset="0" stop-color="#fbcfe8"/><stop offset=".6" stop-color="#f472b6"/><stop offset="1" stop-color="#831843"/></radialGradient></defs><circle cx="320" cy="150" r="100" fill="url(#g4sph)"/>';
  }
  function netSVG() {
    const s = 44, sq = (x, y, w, hh, c) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="' + c + '" stroke="#e2e8f0" stroke-width="2"/>', tri = (p, c) => '<path d="M' + p.map(v => v.join(' ')).join(' L') + ' Z" fill="' + c + '" stroke="#e2e8f0" stroke-width="2"/>';
    const B = 'rgba(96,165,250,.55)', P = 'rgba(244,114,182,.55)';
    if (key === 'cube') { const x = 230, y = 30; return sq(x + s, y, s, s, B) + sq(x, y + s, s, s, B) + sq(x + s, y + s, s, s, B) + sq(x + 2 * s, y + s, s, s, B) + sq(x + 3 * s, y + s, s, s, B) + sq(x + s, y + 2 * s, s, s, B); }
    if (key === 'rprism') { const x = 180, y = 30, a = 90, b = 44, c = 50; return sq(x + c, y, a, c, B) + sq(x, y + c, c, b, B) + sq(x + c, y + c, a, b, B) + sq(x + c + a, y + c, c, b, B) + sq(x + 2 * c + a, y + c, a, b, B) + sq(x + c, y + c + b, a, c, B); }
    if (key === 'tprism') { const x = 200, y = 90, w = 60, l = 100; return sq(x, y, w, l, B) + sq(x + w, y, w, l, B) + sq(x + 2 * w, y, w, l, B) + tri([[x + w, y], [x + 2 * w, y], [x + 1.5 * w, y - 52]], P) + tri([[x + w, y + l], [x + 2 * w, y + l], [x + 1.5 * w, y + l + 52]], P); }
    if (key === 'pyramid') { const x = 270, y = 105, w = 90; return sq(x, y, w, w, B) + tri([[x, y], [x + w, y], [x + w / 2, y - 75]], P) + tri([[x, y + w], [x + w, y + w], [x + w / 2, y + w + 75]], P) + tri([[x, y], [x, y + w], [x - 75, y + w / 2]], P) + tri([[x + w, y], [x + w, y + w], [x + w + 75, y + w / 2]], P); }
    if (key === 'cylinder') return sq(200, 100, 240, 100, B) + '<circle cx="320" cy="58" r="40" fill="' + P + '" stroke="#e2e8f0" stroke-width="2"/><circle cx="320" cy="242" r="40" fill="' + P + '" stroke="#e2e8f0" stroke-width="2"/>';
    return '<text x="320" y="150" text-anchor="middle" fill="#e2e8f0" font-size="20">' + L.noNet + '</text>';
  }
  function draw() {
    root.querySelectorAll('[data-o]').forEach(b => b.setAttribute('aria-pressed', b.dataset.o === key));
    q(root, 'net').setAttribute('aria-pressed', net);
    turn.disabled = net || !OBJ[key];
    svg.innerHTML = net ? netSVG() : (OBJ[key] ? solid() : round());
    const o = L.obj[key];
    info.innerHTML = '<b>' + o.n + '</b><br>' + L.faces + ': <b>' + o.f + '</b> (' + o.fs + ')<br>' + L.verts + ': <b>' + o.v + '</b><br>' + o.t;
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.o) { key = b.dataset.o; draw(); } else if (b.dataset.k === 'net') { net = !net; draw(); }
  });
  turn.addEventListener('input', () => { ang = turn.value / 180 * Math.PI; draw(); });
  let drag = null;
  svg.addEventListener('pointerdown', e => { if (!net && OBJ[key]) { drag = e.clientX; svg.setPointerCapture(e.pointerId); } });
  svg.addEventListener('pointermove', e => { if (drag == null) return; ang += (e.clientX - drag) / 90; drag = e.clientX; turn.value = ((ang * 180 / Math.PI) % 360 + 360) % 360; draw(); });
  svg.addEventListener('pointerup', () => { drag = null; });
  draw();
};
