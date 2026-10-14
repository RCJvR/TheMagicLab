/* Gr8 Simple machines and gears — cams, the crank and the wedge.
 * Cams: a flat follower rests on the turning cam; its height is the highest
 * point of the cam profile under it, so the follower's motion is set entirely
 * by the cam's shape (plotted live against the angle turned).
 * Crank and slider: piston position x = r·cosθ + √(l² − r²·sin²θ).
 * Wedge: pushing it a distance d sideways lifts the block by d·tan(angle);
 * ideal mechanical advantage = 1 / tan(angle) (ignoring friction).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A rotating cam or crank with its follower, and a graph of the follower movement', af: '\'n Draaiende nok of kruk met sy volger, en \'n grafiek van die volger se beweging' },
    mech: { en: 'Mechanism', af: 'Meganisme' },
    ecc: { en: 'Eccentric cam', af: 'Eksentriese nok' }, pear: { en: 'Pear cam', af: 'Peernok' }, snail: { en: 'Snail cam', af: 'Slaknok' },
    crank: { en: 'Crank and slider', af: 'Kruk en skuifstuk' }, wedge: { en: 'Wedge', af: 'Wig' },
    speed: { en: 'Turning speed', af: 'Draaispoed' }, size: { en: 'Offset / crank length', af: 'Afwyking / kruklengte' },
    angle: { en: 'Wedge angle', af: 'Wighoek' }, push: { en: 'Push distance', af: 'Drukafstand' },
    res: { en: 'Movement', af: 'Beweging' }, stroke: { en: 'Follower rises by (stroke)', af: 'Volger styg met (slag)' },
    turn: { en: 'Shaft angle', af: 'Ashoek' }, lift: { en: 'Block lifted', af: 'Blok gelig' }, ma: { en: 'Mechanical advantage (ideal)', af: 'Meganiese voordeel (ideaal)' },
    follower: { en: 'follower', af: 'volger' }, shaft: { en: 'shaft', af: 'as' }, rod: { en: 'connecting rod', af: 'verbindingstang' }, piston: { en: 'piston', af: 'suier' },
    graph: { en: 'follower height over one turn', af: 'volgerhoogte oor een draai' }, rot: { en: 'rotary', af: 'rotasie' }, recip: { en: 'reciprocating', af: 'wissel' },
  };
  const CAP = {
    ecc: { en: 'An off-centre disc: the follower rises and falls smoothly and evenly — rotary motion becomes reciprocating motion.', af: '\'n Skyf wat nie in die middel gemonteer is nie: die volger styg en daal glad en eweredig — rotasiebeweging word wisselbeweging.' },
    pear: { en: 'The round part of a pear cam keeps the follower still (a pause, or dwell); the point lifts it and lets it fall.', af: 'Die ronde deel van \'n peernok hou die volger stil (\'n rustyd); die punt lig dit en laat dit val.' },
    snail: { en: 'A snail cam lifts the follower slowly through one turn, then it drops suddenly at the step. It can only turn one way.', af: '\'n Slaknok lig die volger stadig oor een draai, dan val dit skielik by die trappie. Dit kan net een kant toe draai.' },
    crank: { en: 'The crank is an offset pivot: the piston moves back and forth evenly. A longer crank gives a longer stroke. In an engine it works the other way round.', af: 'Die kruk is \'n draaipunt wat uit die middel is: die suier beweeg eweredig heen en weer. \'n Langer kruk gee \'n langer slag. In \'n enjin werk dit andersom.' },
  };
  let mode = 'ecc', speed = 1, size = 20, angle = 15, push = 0, th = 0, hist = [];
  const ui = MLX.layout(root, { height: (w) => Math.max(270, Math.min(340, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.mech);
  MLX.seg(c1, { options: [['ecc', T.ecc], ['pear', T.pear], ['snail', T.snail], ['crank', T.crank], ['wedge', T.wedge]], value: mode, onChange: (v) => { mode = v; hist = []; controls(); update(); } });
  const sp = MLX.slider(c1, { label: T.speed, min: 0, max: 3, step: 0.25, value: speed, fmt: (v) => num(v, 2) + '×', onInput: (v) => { speed = v; } });
  const sz = MLX.slider(c1, { label: T.size, min: 10, max: 30, step: 1, value: size, fmt: (v) => v + ' mm', onInput: (v) => { size = v; hist = []; update(); } });
  const an = MLX.slider(c1, { label: T.angle, min: 5, max: 45, step: 1, value: angle, fmt: (v) => v + '°', onInput: (v) => { angle = v; update(); } });
  const pu = MLX.slider(c1, { label: T.push, min: 0, max: 100, step: 1, value: push, fmt: (v) => v + ' mm', onInput: (v) => { push = v; update(); } });
  const c2 = MLX.card(ui.side, T.res);
  const ro = MLX.readout(c2, [['a', T.stroke], ['b', T.turn]]);
  const rlab = c2.querySelectorAll('.mlx-row span:first-child');
  function controls() {
    const w = mode === 'wedge';
    sp.el.style.display = w ? 'none' : ''; sz.el.style.display = w || mode === 'pear' || mode === 'snail' ? 'none' : '';
    an.el.style.display = w ? '' : 'none'; pu.el.style.display = w ? '' : 'none';
    rlab[0].textContent = L(w ? T.lift : T.stroke); rlab[1].textContent = L(w ? T.ma : T.turn);
  }

  // cam profiles in mm: radius at angle φ (cam frame)
  function camR(phi) {
    phi = ((phi % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    if (mode === 'ecc') { const R = 45, e = size; const c = Math.cos(phi), s2 = Math.sin(phi); return e * c + Math.sqrt(R * R - e * e * s2 * s2); }
    if (mode === 'pear') return 35 + 32 * Math.pow(Math.max(0, Math.cos(phi)), 4);
    return 32 + 34 * (phi / (2 * Math.PI));          // snail: grows, then steps back
  }
  // knife-edge follower straight above the shaft (the cam turns clockwise):
  // its height is the cam's radius at the point directly underneath
  function camLift(theta) { return camR(Math.PI / 2 + theta); }
  const ROD = 90;
  const crankX = (theta) => size * Math.cos(theta) + Math.sqrt(ROD * ROD - size * size * Math.sin(theta) ** 2);
  function stroke() {
    if (mode === 'crank') return 2 * size;
    let lo = 1e9, hi = -1e9; for (let k = 0; k < 90; k++) { const v = camLift(k / 90 * 2 * Math.PI); lo = Math.min(lo, v); hi = Math.max(hi, v); } return hi - lo;
  }
  function update() {
    if (mode === 'wedge') {
      const t = Math.tan(angle * Math.PI / 180);
      ro.set('a', num(push * t, 1) + ' mm'); ro.set('b', num(1 / t, 1));
      ui.setCaption({ en: `Pushing the wedge ${push} mm sideways lifts the block ${num(push * t, 1)} mm. A thinner wedge (smaller angle) lifts less per push, but multiplies the force more: about ${num(1 / t, 1)}× without friction.`, af: `As die wig ${push} mm sywaarts gedruk word, lig dit die blok ${num(push * t, 1)} mm. 'n Dunner wig (kleiner hoek) lig minder per druk, maar vermenigvuldig die krag meer: omtrent ${num(1 / t, 1)}× sonder wrywing.` });
    } else { ro.set('a', num(stroke(), 0) + ' mm'); ui.setCaption(CAP[mode]); }
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    if (mode === 'wedge') return drawWedge(ctx, W, H);
    const s = Math.min(1.5, H / 260), cx = W * 0.22, cy = H * 0.66;
    let followerY;
    if (mode === 'crank') {
      // vertical crank and slider: crank pin on a circle, rod up to the piston
      const px = cx + size * s * Math.cos(th - Math.PI / 2), py = cy + size * s * Math.sin(th - Math.PI / 2);
      const x = crankX(th), pistonY = cy - x * s;
      ctx.strokeStyle = 'rgba(226,232,240,0.2)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(cx, cy, size * s, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(cx, pistonY); ctx.stroke();
      ctx.fillStyle = '#334155'; ctx.fillRect(cx - 30, cy - (ROD + size + 26) * s, 6, (2 * size + 40) * s); ctx.fillRect(cx + 24, cy - (ROD + size + 26) * s, 6, (2 * size + 40) * s);
      ctx.fillStyle = '#f59e0b'; ctx.fillRect(cx - 22, pistonY - 18, 44, 22);
      ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
      text(ctx, T.piston, cx + 36, pistonY - 4, { size: 11, weight: 700, color: '#fcd34d' });
      text(ctx, T.rod, (px + cx) / 2 + 12, (py + pistonY) / 2, { size: 11, color: 'rgba(226,232,240,0.6)' });
      followerY = x - (ROD - size);
    } else {
      // cam outline, rotated by th
      ctx.fillStyle = '#64748b'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.beginPath();
      for (let k = 0; k <= 180; k++) { const phi = k / 180 * 2 * Math.PI, r = camR(phi) * s, a = -(phi - th); const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.closePath(); ctx.fill(); ctx.stroke();
      const lift = camLift(th) * s;
      ctx.fillStyle = '#334155'; ctx.fillRect(cx - 14, cy - lift - 110 * s, 6, 70 * s); ctx.fillRect(cx + 8, cy - lift - 110 * s, 6, 70 * s);
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.moveTo(cx, cy - lift); ctx.lineTo(cx - 7, cy - lift - 12); ctx.lineTo(cx + 7, cy - lift - 12); ctx.closePath(); ctx.fill(); ctx.fillRect(cx - 4, cy - lift - 90 * s, 8, 80 * s);
      text(ctx, T.follower, cx + 14, cy - lift - 16, { size: 11, weight: 700, color: '#fcd34d' });
      followerY = camLift(th) - 30;
    }
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
    text(ctx, T.shaft, cx, cy + 22, { size: 11, align: 'center', color: 'rgba(226,232,240,0.6)' });
    // rotation arrow
    ctx.strokeStyle = 'rgba(147,197,253,0.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, 16, -2.2, -0.3); ctx.stroke();   // clockwise
    // graph: follower height against angle turned
    const gx0 = W * 0.42, gx1 = W - 18, gy0 = 30, gy1 = H - 34;
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1; ctx.strokeRect(gx0, gy0, gx1 - gx0, gy1 - gy0);
    text(ctx, T.graph, gx0, gy0 - 10, { size: 11, weight: 700, color: 'rgba(226,232,240,0.6)' });
    ['0°', '90°', '180°', '270°', '360°'].forEach((l, i) => text(ctx, l, gx0 + i / 4 * (gx1 - gx0), gy1 + 15, { size: 10, mono: true, align: 'center', color: 'rgba(226,232,240,0.5)' }));
    const val = (t) => mode === 'crank' ? crankX(t) - (ROD - size) : camLift(t) - 30;
    let lo = 1e9, hi = -1e9; for (let k = 0; k <= 90; k++) { const v = val(k / 90 * 2 * Math.PI); lo = Math.min(lo, v); hi = Math.max(hi, v); }
    const Y = (v) => gy1 - 10 - (v - lo) / Math.max(1, hi - lo) * (gy1 - gy0 - 30);
    ctx.strokeStyle = 'rgba(245,158,11,0.35)'; ctx.lineWidth = 2; ctx.beginPath();
    for (let k = 0; k <= 120; k++) { const t = k / 120 * 2 * Math.PI, x = gx0 + k / 120 * (gx1 - gx0); k ? ctx.lineTo(x, Y(val(t))) : ctx.moveTo(x, Y(val(t))); } ctx.stroke();
    const tm = ((th % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), mx = gx0 + tm / (2 * Math.PI) * (gx1 - gx0);
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(mx, Y(followerY), 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(167,139,250,0.6)'; ctx.beginPath(); ctx.moveTo(mx, gy0); ctx.lineTo(mx, gy1); ctx.stroke();
    ro.set('b', Math.round(tm * 180 / Math.PI) + '°');
  }
  function drawWedge(ctx, W, H) {
    const t = Math.tan(angle * Math.PI / 180), gy = H - 40, sc = Math.min(2.2, W / 360);
    const len = 150 * sc, ht = len * t, bw = 60 * sc * 0.7, bh = 40 * sc * 0.7;
    const bx = W * 0.55;                                   // the block can only move up, between guides
    const tip = bx + Math.min(push, 150) * sc;   // thin end, pushed under the block
    const x0 = tip - len;                                  // thick end
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, gy, W, 6);
    const lift = Math.min(push, 150) * t * sc;             // block rises by push × tan(angle)
    ctx.fillStyle = '#334155'; ctx.fillRect(bx - 8, gy - ht - bh - 60, 6, ht + bh + 60); ctx.fillRect(bx + bw + 2, gy - ht - bh - 60, 6, ht + bh + 60);
    ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.moveTo(x0, gy); ctx.lineTo(tip, gy); ctx.lineTo(x0, gy - ht); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#64748b'; ctx.fillRect(bx, gy - lift - bh, bw, bh);
    text(ctx, num(push * t, 1) + ' mm ↑', bx + bw + 14, gy - lift - bh / 2, { size: 12, mono: true, weight: 700, color: '#86efac' });
    const ay = gy - ht / 3;
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 - 50, ay); ctx.lineTo(x0 - 8, ay); ctx.lineTo(x0 - 16, ay - 6); ctx.moveTo(x0 - 8, ay); ctx.lineTo(x0 - 16, ay + 6); ctx.stroke();
    text(ctx, angle + '°', tip - 34, gy - 6, { size: 11, mono: true, color: '#fde68a' });
  }

  controls(); update();
  MLX.loop(ui.stage, (dt) => { if (mode !== 'wedge') { th += dt * speed * 1.4; ui.cv.draw(); } }).start();
});
