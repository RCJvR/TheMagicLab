/* Gr9 Technology: Preserving materials and plastics — identify plastics by testing.
 * Six unlabelled chips cut from everyday items. Drop each into liquids of
 * known density (water 1.00, salt water 1.20, an alcohol–water mix 0.925 g/cm³)
 * and bend it; every plastic gives a different set of results. Then choose its
 * recycling code. Densities: PET 1.38, HDPE 0.95, PVC 1.40, LDPE 0.92,
 * PP 0.90, PS 1.05 g/cm³ (solid, not foam).
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text, h } = MLX;
  const PL = [
    { code: 1, abbr: 'PET', d: 1.38, bend: 'spring', from: { en: 'a cold-drink bottle', af: '\'n koeldrankbottel' } },
    { code: 2, abbr: 'HDPE', d: 0.95, bend: 'bend', from: { en: 'a milk bottle', af: '\'n melkbottel' } },
    { code: 3, abbr: 'PVC', d: 1.40, bend: 'rigid', from: { en: 'a water pipe', af: '\'n waterpyp' } },
    { code: 4, abbr: 'LDPE', d: 0.92, bend: 'soft', from: { en: 'a plastic bag', af: '\'n plastieksak' } },
    { code: 5, abbr: 'PP', d: 0.90, bend: 'spring', from: { en: 'a yoghurt tub', af: '\'n joghurtbakkie' } },
    { code: 6, abbr: 'PS', d: 1.05, bend: 'snap', from: { en: 'a plastic knife', af: '\'n plastiekmes' } },
  ];
  // shuffled order so the chip letters don't give the code away
  const ORDER = [4, 0, 2, 5, 1, 3];
  const LIQ = [
    ['water', { en: 'Water', af: 'Water' }, 1.00, 'rgba(56,189,248,0.35)'],
    ['salt', { en: 'Salt water', af: 'Soutwater' }, 1.20, 'rgba(165,243,252,0.35)'],
    ['alc', { en: 'Alcohol mix', af: 'Alkoholmengsel' }, 0.925, 'rgba(216,180,254,0.3)'],
  ];
  const BEND = { spring: { en: 'bends, springs back', af: 'buig, spring terug' }, bend: { en: 'bends, feels waxy', af: 'buig, voel wasagtig' }, rigid: { en: 'rigid', af: 'styf' }, soft: { en: 'very soft, stays bent', af: 'baie sag, bly gebuig' }, snap: { en: 'snaps (brittle)', af: 'breek (bros)' } };
  const T = {
    aria: { en: 'Three beakers of liquid and a plastic chip', af: 'Drie bekers vloeistof en \'n plastiekskyfie' },
    chip: { en: 'Plastic chip', af: 'Plastiekskyfie' }, test: { en: 'Test it', af: 'Toets dit' }, bendIt: { en: 'Bend it', af: 'Buig dit' },
    code: { en: 'Which recycling code?', af: 'Watter herwinningskode?' }, floats: { en: 'floats', af: 'dryf' }, sinks: { en: 'sinks', af: 'sink' },
    need: { en: 'Do at least three tests on this chip first.', af: 'Doen eers ten minste drie toetse op hierdie skyfie.' },
    right: { en: 'Correct: ', af: 'Reg: ' }, wrong: { en: 'Not that one. Compare its density with the liquids it floated and sank in.', af: 'Nie daardie een nie. Vergelyk sy digtheid met die vloeistowwe waarin dit gedryf en gesink het.' },
    start: { en: 'Choose a chip, then drop it into each liquid and bend it.', af: 'Kies \'n skyfie, gooi dit dan in elke vloeistof en buig dit.' },
    dens: { en: 'g/cm³', af: 'g/cm³' },
  };
  let cur = 0, test = null, tt = 0;
  const seen = PL.map(() => ({}));
  const P = (i) => PL[ORDER[i]];
  const ui = MLX.layout(root, { height: (w) => Math.max(240, Math.min(300, Math.round(w * 0.36))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.chip);
  MLX.seg(c1, { options: ORDER.map((_, i) => [i, String.fromCharCode(65 + i)]), value: 0, onChange: (i) => { cur = i; test = null; fb.textContent = ''; ui.setCaption(T.start); refresh(); } });
  const c2 = MLX.card(ui.side, T.test);
  const ts = MLX.seg(c2, { options: LIQ.map(l => [l[0], l[1]]).concat([['bend', T.bendIt]]), value: null, onChange: (t) => run(t) });
  const c3 = MLX.card(ui.side, T.code);
  const cb = h('div', { class: 'mlx-seg' }); c3.appendChild(cb);
  PL.forEach(p => MLX.button(cb, p.code + ' ' + p.abbr, () => decide(p.code)));
  const fb = h('p', { class: 'mlx-note', style: 'margin-top:10px' }); c3.appendChild(fb);
  const tbl = h('table', { style: 'width:100%;border-collapse:collapse;font-size:12.5px;margin-top:10px' });
  ui.stage.appendChild(h('div', { style: 'overflow-x:auto' }, [tbl]));

  const result = (p, t) => t === 'bend' ? L(BEND[p.bend]) : L(p.d < LIQ.find(l => l[0] === t)[2] ? T.floats : T.sinks);
  function run(t) {
    test = t; tt = 0; seen[cur][t] = true;
    const p = P(cur);
    if (t === 'bend') ui.setCaption({ en: 'Bending it: ' + L(BEND[p.bend]) + '.', af: 'Om dit te buig: ' + L(BEND[p.bend]) + '.' });
    else { const l = LIQ.find(x => x[0] === t); const fl = p.d < l[2]; ui.setCaption({ en: `In ${L(l[1]).toLowerCase()} (${num(l[2], 3)} g/cm³) the chip ${fl ? 'floats: it is less dense than the liquid' : 'sinks: it is denser than the liquid'}.`, af: `In ${L(l[1]).toLowerCase()} (${num(l[2], 3)} g/cm³) ${fl ? 'dryf die skyfie: dit is minder dig as die vloeistof' : 'sink die skyfie: dit is digter as die vloeistof'}.` }); }
    refresh();
  }
  function decide(code) {
    if (Object.keys(seen[cur]).length < 3) { fb.textContent = L(T.need); fb.style.color = '#fbbf24'; return; }
    const p = P(cur), ok = p.code === code;
    fb.textContent = ok ? L(T.right) + p.code + ' ' + p.abbr + ', ' + num(p.d, 2) + ' g/cm³ — ' + L({ en: 'cut from ', af: 'gesny uit ' }) + L(p.from) + '.' : L(T.wrong);
    fb.style.color = ok ? '#86efac' : '#fca5a5';
  }
  function refresh() {
    ts.set(test);
    const cols = LIQ.map(l => [l[0], L(l[1]) + ' ' + num(l[2], 3)]).concat([['bend', L(T.bendIt)]]);
    let html = '<thead><tr><th></th>' + cols.map(([, l]) => '<th style="text-align:left;padding:6px 8px;color:rgba(226,232,240,.55);font-weight:600">' + l + '</th>').join('') + '</tr></thead><tbody>';
    ORDER.forEach((_, i) => {
      html += '<tr style="border-top:1px solid rgba(255,255,255,.06);' + (i === cur ? 'background:rgba(255,255,255,.05)' : '') + '"><td style="padding:6px 8px;font-weight:700">' + String.fromCharCode(65 + i) + '</td>' +
        cols.map(([t]) => '<td style="padding:6px 8px;font-family:var(--fm,monospace);color:' + (seen[i][t] ? '#e2e8f0' : 'rgba(226,232,240,.25)') + '">' + (seen[i][t] ? result(P(i), t) : '·') + '</td>').join('') + '</tr>';
    });
    tbl.innerHTML = html + '</tbody>';
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    const p = P(cur);
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const bw = Math.min(110, W * 0.16), bh = H * 0.55, base = H - 30;
    LIQ.forEach((l, i) => {
      const x = W * (0.14 + i * 0.24);
      ctx.fillStyle = l[3]; ctx.fillRect(x - bw / 2, base - bh * 0.8, bw, bh * 0.8);
      ctx.strokeStyle = 'rgba(226,232,240,0.6)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - bw / 2, base - bh); ctx.lineTo(x - bw / 2, base); ctx.lineTo(x + bw / 2, base); ctx.lineTo(x + bw / 2, base - bh); ctx.stroke();
      text(ctx, l[1], x, base + 18, { size: 11, weight: 700, align: 'center', color: 'rgba(226,232,240,0.75)' });
      text(ctx, num(l[2], 3) + ' g/cm³', x, base - bh - 8, { size: 10, mono: true, align: 'center', color: 'rgba(226,232,240,0.5)' });
      // a chip that has been tested here: floating at the surface or resting on the bottom
      if (test === l[0]) {
        const q = Math.min(1, tt / 1.2), surf = base - bh * 0.8, fl = p.d < l[2];
        const y = fl ? surf - 6 + Math.max(0, 1 - q) * -40 + Math.sin(tt * 3) * 1.5 : (surf - 40) + q * (base - 8 - (surf - 40));
        ctx.fillStyle = '#e5e7eb'; ctx.save(); ctx.translate(x, y); ctx.rotate(0.15); ctx.fillRect(-16, -5, 32, 10); ctx.restore();
      }
    });
    // bend test on the right
    const bx = W * 0.86, by = H * 0.45;
    text(ctx, T.bendIt, bx, 24, { size: 12, weight: 700, align: 'center', color: 'rgba(226,232,240,0.6)' });
    if (test === 'bend') {
      const q = Math.min(1, tt / 1.0), amt = { spring: 0.9, bend: 0.8, rigid: 0.05, soft: 1.3, snap: 0.25 }[p.bend];
      const back = p.bend === 'spring' && tt > 1.4 ? Math.max(0, 1 - (tt - 1.4) * 2) : 1;
      const a = amt * q * back;
      ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 8; ctx.lineCap = 'round';
      if (p.bend === 'snap' && q >= 1) { ctx.beginPath(); ctx.moveTo(bx - 40, by + 10); ctx.lineTo(bx - 4, by); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bx + 4, by - 6); ctx.lineTo(bx + 40, by + 14); ctx.stroke(); text(ctx, { en: 'snap!', af: 'kraak!' }, bx, by - 22, { size: 13, weight: 800, align: 'center', color: '#fca5a5' }); }
      else { ctx.beginPath(); ctx.moveTo(bx - 40, by + 30 * a); ctx.quadraticCurveTo(bx, by - 26 * a, bx + 40, by + 30 * a); ctx.stroke(); }
    } else { ctx.strokeStyle = 'rgba(229,231,235,0.5)'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx - 40, by); ctx.lineTo(bx + 40, by); ctx.stroke(); }
    text(ctx, L(T.chip) + ' ' + String.fromCharCode(65 + cur), bx, by + 60, { size: 12, weight: 700, align: 'center', color: '#e2e8f0' });
  }

  ui.setCaption(T.start);
  refresh();
  MLX.loop(ui.stage, (dt) => { if (test && tt < 2.2) { tt += dt; ui.cv.draw(); } }).start();
});
