/* Gr8 Metals and Non-metals — a virtual property-testing lab.
 * Choose a sample, run tests on it (look, circuit, hammer, strike, magnet),
 * build up a results table, then decide: metal, non-metal or metalloid.
 * Graphite (a non-metal that conducts) and iron (the only magnetic sample)
 * are there on purpose: no single test decides it.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text, h } = MLX;
  const S = [
    { id: 'Cu', name: { en: 'Copper', af: 'Koper' }, col: '#c87533', shiny: true, cond: 1, hammer: 'flat', ring: true, mag: false, type: 'metal',
      why: { en: 'Copper is shiny, conducts well, flattens when hammered and rings: a metal. (It is not magnetic: most metals are not.)', af: 'Koper is blink, gelei goed, word plat as dit gehamer word en lui: \'n metaal. (Dit is nie magneties nie: die meeste metale is nie.)' } },
    { id: 'Fe', name: { en: 'Iron', af: 'Yster' }, col: '#9ca3af', shiny: true, cond: 0.8, hammer: 'flat', ring: true, mag: true, type: 'metal',
      why: { en: 'Iron is shiny, conducts, is malleable and rings: a metal. It is also magnetic, but that is unusual: only iron, nickel and cobalt are.', af: 'Yster is blink, gelei, is smeebaar en lui: \'n metaal. Dit is ook magneties, maar dit is ongewoon: net yster, nikkel en kobalt is.' } },
    { id: 'Al', name: { en: 'Aluminium', af: 'Aluminium' }, col: '#d1d5db', shiny: true, cond: 0.95, hammer: 'flat', ring: true, mag: false, type: 'metal',
      why: { en: 'Aluminium is shiny, conducts, flattens and rings: a metal, even though a magnet does not pick it up.', af: 'Aluminium is blink, gelei, word plat en lui: \'n metaal, al tel \'n magneet dit nie op nie.' } },
    { id: 'S', name: { en: 'Sulfur', af: 'Swael' }, col: '#facc15', shiny: false, cond: 0, hammer: 'shatter', ring: false, mag: false, type: 'nonmetal',
      why: { en: 'Sulfur is dull, does not conduct and shatters when hammered: a non-metal.', af: 'Swael is dof, gelei nie en spat uitmekaar as dit gehamer word: \'n nie-metaal.' } },
    { id: 'C', name: { en: 'Carbon (graphite)', af: 'Koolstof (grafiet)' }, col: '#4b5563', shiny: false, cond: 0.55, hammer: 'crumble', ring: false, mag: false, type: 'nonmetal',
      why: { en: 'Graphite conducts electricity, yet it is a non-metal: it crumbles when hammered and does not ring. One test is never enough.', af: 'Grafiet gelei elektrisiteit, tog is dit \'n nie-metaal: dit verkrummel as dit gehamer word en lui nie. Een toets is nooit genoeg nie.' } },
    { id: 'Si', name: { en: 'Silicon', af: 'Silikon' }, col: '#64748b', shiny: true, cond: 0.07, hammer: 'shatter', ring: false, mag: false, type: 'metalloid',
      why: { en: 'Silicon looks shiny like a metal but is brittle and only conducts a tiny bit: a metalloid, with properties of both.', af: 'Silikon lyk blink soos \'n metaal, maar is bros en gelei net \'n klein bietjie: \'n metalloïed, met eienskappe van albei.' } },
  ];
  const TESTS = [
    ['look', { en: 'Look', af: 'Kyk' }], ['circuit', { en: 'Circuit', af: 'Stroombaan' }], ['hammer', { en: 'Hammer', af: 'Hamer' }],
    ['strike', { en: 'Strike', af: 'Slaan' }], ['magnet', { en: 'Magnet', af: 'Magneet' }],
  ];
  const T = {
    aria: { en: 'Lab bench with the sample and the test equipment', af: 'Laboratoriumbank met die monster en die toetstoerusting' },
    sample: { en: 'Sample', af: 'Monster' }, test: { en: 'Run a test', af: 'Doen \'n toets' },
    decide: { en: 'Your decision', af: 'Jou besluit' },
    metal: { en: 'Metal', af: 'Metaal' }, nonmetal: { en: 'Non-metal', af: 'Nie-metaal' }, metalloid: { en: 'Metalloid', af: 'Metalloïed' },
    needMore: { en: 'Run at least three tests on this sample first.', af: 'Doen eers ten minste drie toetse op hierdie monster.' },
    right: { en: 'Correct. ', af: 'Reg. ' }, wrong: { en: 'Not quite. ', af: 'Nie heeltemal nie. ' },
    table: { en: 'Results', af: 'Resultate' },
    start: { en: 'Choose a sample, then run tests on it.', af: 'Kies \'n monster en doen dan toetse daarop.' },
    shiny: { en: 'shiny', af: 'blink' }, dull: { en: 'dull', af: 'dof' },
    bright: { en: 'bright', af: 'helder' }, dim: { en: 'dim', af: 'dof' }, faint: { en: 'very faint', af: 'baie flou' }, off: { en: 'no', af: 'nee' },
    flat: { en: 'flattens', af: 'word plat' }, shatter: { en: 'shatters', af: 'spat' }, crumble: { en: 'crumbles', af: 'verkrummel' },
    ring: { en: 'rings', af: 'lui' }, thud: { en: 'thud', af: 'dowwe klap' }, yes: { en: 'yes', af: 'ja' }, no: { en: 'no', af: 'nee' },
  };
  function result(s, t) {
    if (t === 'look') return L(s.shiny ? T.shiny : T.dull);
    if (t === 'circuit') return L(s.cond > 0.7 ? T.bright : s.cond > 0.3 ? T.dim : s.cond > 0 ? T.faint : T.off);
    if (t === 'hammer') return L(T[s.hammer]);
    if (t === 'strike') return L(s.ring ? T.ring : T.thud);
    return L(s.mag ? T.yes : T.no);
  }
  const say = {
    look: (s) => s.shiny ? { en: `${L(s.name)} has a shiny surface (lustre).`, af: `${L(s.name)} het 'n blink oppervlak (glans).` } : { en: `${L(s.name)} looks dull.`, af: `${L(s.name)} lyk dof.` },
    circuit: (s) => s.cond > 0.7 ? { en: 'The bulb lights brightly: a good conductor.', af: 'Die gloeilamp brand helder: \'n goeie geleier.' }
      : s.cond > 0.3 ? { en: 'The bulb lights, but less brightly: it conducts.', af: 'Die gloeilamp brand, maar minder helder: dit gelei.' }
      : s.cond > 0 ? { en: 'The bulb barely glows: it conducts only a tiny bit.', af: 'Die gloeilamp gloei skaars: dit gelei net \'n klein bietjie.' }
      : { en: 'The bulb stays off: an insulator.', af: 'Die gloeilamp bly af: \'n isolator.' },
    hammer: (s) => s.hammer === 'flat' ? { en: 'It flattens without breaking: malleable.', af: 'Dit word plat sonder om te breek: smeebaar.' }
      : s.hammer === 'crumble' ? { en: 'It crumbles into powder: brittle.', af: 'Dit verkrummel tot poeier: bros.' } : { en: 'It shatters into pieces: brittle.', af: 'Dit spat in stukke: bros.' },
    strike: (s) => s.ring ? { en: 'It rings when struck: sonorous.', af: 'Dit lui as dit geslaan word: klinkend.' } : { en: 'Only a dull thud: not sonorous.', af: 'Net \'n dowwe klap: nie klinkend nie.' },
    magnet: (s) => s.mag ? { en: 'The magnet pulls it: iron is magnetic.', af: 'Die magneet trek dit aan: yster is magneties.' } : { en: 'The magnet does not attract it.', af: 'Die magneet trek dit nie aan nie.' },
  };

  let cur = 0, test = null, tt = 0;
  const done = S.map(() => ({}));            // done[i][test] = true
  const ui = MLX.layout(root, { height: (w) => Math.max(230, Math.min(300, Math.round(w * 0.36))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.sample);
  const sampleSeg = MLX.seg(c1, { options: S.map((s, i) => [i, s.name]), value: 0, onChange: (i) => { cur = i; test = null; ui.setCaption(T.start); fb.textContent = ''; refresh(); } });
  const c2 = MLX.card(ui.side, T.test);
  const testSeg = MLX.seg(c2, { options: TESTS, value: null, onChange: (t) => run(t) });
  const c3 = MLX.card(ui.side, T.decide);
  const db = h('div', { class: 'mlx-seg' });
  c3.appendChild(db);
  ['metal', 'nonmetal', 'metalloid'].forEach(k => MLX.button(db, T[k], () => decide(k)));
  const fb = h('p', { class: 'mlx-note', style: 'margin-top:10px' });
  c3.appendChild(fb);
  // results table under the stage
  const tbl = h('table', { style: 'width:100%;border-collapse:collapse;font-size:12.5px;margin-top:10px' });
  ui.stage.appendChild(h('div', { style: 'overflow-x:auto' }, [tbl]));

  function run(t) {
    test = t; tt = 0;
    done[cur][t] = true;
    ui.setCaption(say[t](S[cur]));
    refresh();
  }
  function decide(k) {
    const n = Object.keys(done[cur]).length;
    if (n < 3) { fb.textContent = L(T.needMore); fb.style.color = '#fbbf24'; return; }
    const s = S[cur], ok = s.type === k;
    fb.textContent = L(ok ? T.right : T.wrong) + L(s.why);
    fb.style.color = ok ? '#86efac' : '#fca5a5';
  }
  function refresh() {
    testSeg.set(test);
    let html = '<thead><tr><th style="text-align:left;padding:6px 8px;color:rgba(226,232,240,.55);font-weight:600"></th>' +
      TESTS.map(([, lab]) => '<th style="text-align:left;padding:6px 8px;color:rgba(226,232,240,.55);font-weight:600">' + L(lab) + '</th>').join('') + '</tr></thead><tbody>';
    S.forEach((s, i) => {
      html += '<tr style="border-top:1px solid rgba(255,255,255,.06);' + (i === cur ? 'background:rgba(255,255,255,.05)' : '') + '"><td style="padding:6px 8px;font-weight:700;white-space:nowrap">' + L(s.name) + '</td>' +
        TESTS.map(([t]) => '<td style="padding:6px 8px;font-family:var(--fm,monospace);color:' + (done[i][t] ? '#e2e8f0' : 'rgba(226,232,240,.25)') + '">' + (done[i][t] ? result(s, t) : '·') + '</td>').join('') + '</tr>';
    });
    tbl.innerHTML = html + '</tbody>';
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    const s = S[cur];
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const bench = H * 0.74;
    ctx.fillStyle = '#1c2333'; ctx.fillRect(0, bench, W, H - bench);
    ctx.fillStyle = '#273246'; ctx.fillRect(0, bench, W, 4);
    const cx = W * 0.5, sw = Math.min(150, W * 0.22), sh = 26;
    const p = Math.min(1, tt / 1.1);
    let sx = cx, swNow = sw, shNow = sh, pieces = null;
    if (test === 'hammer' && p > 0.45) {
      const q = Math.min(1, (p - 0.45) / 0.3);
      if (s.hammer === 'flat') { swNow = sw * (1 + 0.35 * q); shNow = sh * (1 - 0.45 * q); }
      else pieces = q;
    }
    if (test === 'magnet' && s.mag) sx = cx + Math.min(1, p * 1.4) * (W * 0.16);
    // sample (or its fragments)
    if (pieces != null) {
      const n = s.hammer === 'crumble' ? 26 : 9;
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI - Math.PI, d = pieces * (30 + (k * 37) % 50);
        const px = cx + Math.cos(a) * d * 1.6 + ((k * 13) % 20 - 10), py = bench - 4 - Math.max(0, Math.sin(-a) * d * 0.25);
        const r = s.hammer === 'crumble' ? 2.5 : 5 + (k % 3) * 2;
        ctx.fillStyle = s.col; ctx.beginPath(); ctx.moveTo(px - r, py); ctx.lineTo(px, py - r * 1.3); ctx.lineTo(px + r, py); ctx.closePath(); ctx.fill();
      }
    } else {
      ctx.fillStyle = s.col;
      ctx.fillRect(sx - swNow / 2, bench - shNow, swNow, shNow);
      if (s.shiny) {
        const g = ctx.createLinearGradient(sx - swNow / 2, 0, sx + swNow / 2, 0);
        g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.35, 'rgba(255,255,255,0.55)'); g.addColorStop(0.45, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.fillRect(sx - swNow / 2, bench - shNow, swNow, shNow * 0.6);
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        for (let k = 0; k < 14; k++) ctx.fillRect(sx - swNow / 2 + ((k * 29) % swNow), bench - shNow + ((k * 11) % shNow), 3, 2);
      }
    }
    text(ctx, s.name, cx, bench + 22, { size: 13, weight: 700, align: 'center', color: '#e2e8f0' });

    if (test === 'circuit') {
      // battery, wires, bulb; the bulb glows with the sample's conductivity
      const bx = W * 0.18, by = bench - 70, lx = W * 0.82, ly = bench - 90;
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - sw / 2, bench - sh / 2); ctx.lineTo(bx + 20, bench - sh / 2); ctx.lineTo(bx + 20, by + 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + sw / 2, bench - sh / 2); ctx.lineTo(lx, bench - sh / 2); ctx.lineTo(lx, ly + 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + 20, by - 20); ctx.lineTo(bx + 20, ly - 40); ctx.lineTo(lx, ly - 40); ctx.lineTo(lx, ly - 18); ctx.stroke();
      ctx.fillStyle = '#334155'; ctx.fillRect(bx, by - 20, 40, 40); ctx.fillStyle = '#f87171'; ctx.fillRect(bx + 14, by - 26, 12, 6);
      text(ctx, '+  −', bx + 20, by + 5, { size: 12, mono: true, align: 'center', color: '#e2e8f0' });
      const glow = s.cond * Math.min(1, p * 2);
      if (glow > 0) { const g = ctx.createRadialGradient(lx, ly, 2, lx, ly, 40 + 30 * glow); g.addColorStop(0, `rgba(253,224,71,${0.25 + 0.6 * glow})`); g.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(lx, ly, 70, 0, Math.PI * 2); ctx.fill(); }
      ctx.beginPath(); ctx.arc(lx, ly, 16, 0, Math.PI * 2); ctx.fillStyle = glow > 0.02 ? `rgba(253,224,71,${0.3 + 0.7 * glow})` : 'rgba(148,163,184,0.25)'; ctx.fill();
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    if (test === 'hammer') {
      const up = p < 0.45 ? 1 - p / 0.45 : Math.min(1, (p - 0.45) / 0.55) * 0.6;
      const hy = bench - sh - 12 - up * 110;
      ctx.fillStyle = '#78350f'; ctx.fillRect(cx + 30, hy - 8, 90, 10);
      ctx.fillStyle = '#6b7280'; ctx.fillRect(cx - 22, hy - 22, 52, 30);
    }
    if (test === 'strike') {
      const rx = cx - sw / 2 - 30 + Math.sin(Math.min(1, p * 3) * Math.PI) * 18;
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(rx - 50, bench - 70); ctx.lineTo(rx, bench - 16); ctx.stroke();
      if (p > 0.3) {
        const q = (p - 0.3) / 0.7;
        if (s.ring) {
          ctx.strokeStyle = `rgba(147,197,253,${0.8 * (1 - q * 0.6)})`; ctx.lineWidth = 2;
          for (let k = 0; k < 4; k++) { const r = 20 + k * 22 + q * 40; ctx.beginPath(); ctx.arc(cx, bench - 14, r, -Math.PI * 0.85, -Math.PI * 0.15); ctx.stroke(); }
          text(ctx, 'ting!', cx + sw / 2 + 20, bench - 60, { size: 18, weight: 800, color: '#93c5fd' });
        } else {
          text(ctx, 'thud', cx + sw / 2 + 20, bench - 30, { size: 14, weight: 700, color: 'rgba(226,232,240,0.5)' });
        }
      }
    }
    if (test === 'magnet') {
      const mx = W * 0.8;
      ctx.lineWidth = 16; ctx.lineCap = 'butt';
      // horseshoe opening towards the sample (to the left), poles at the open ends
      ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.arc(mx, bench - 40, 28, 0, Math.PI * 0.5); ctx.lineTo(mx - 14, bench - 12); ctx.stroke();
      ctx.strokeStyle = '#2563eb'; ctx.beginPath(); ctx.arc(mx, bench - 40, 28, -Math.PI * 0.5, 0); ctx.moveTo(mx, bench - 68); ctx.lineTo(mx - 14, bench - 68); ctx.stroke();
      text(ctx, 'N', mx - 10, bench - 8, { size: 11, weight: 800, align: 'center', color: '#fff' });
      text(ctx, 'S', mx - 10, bench - 64, { size: 11, weight: 800, align: 'center', color: '#fff' });
    }
    if (test === 'look' && s.shiny) {
      const q = Math.min(1, p * 1.5);
      ctx.fillStyle = `rgba(255,255,255,${0.9 * Math.sin(q * Math.PI)})`;
      const gx = cx - sw / 2 + q * sw;
      ctx.beginPath(); ctx.moveTo(gx, bench - sh - 8); ctx.lineTo(gx + 3, bench - sh - 1); ctx.lineTo(gx + 10, bench - sh + 2); ctx.lineTo(gx + 3, bench - sh + 5); ctx.lineTo(gx, bench - sh + 12); ctx.lineTo(gx - 3, bench - sh + 5); ctx.lineTo(gx - 10, bench - sh + 2); ctx.lineTo(gx - 3, bench - sh - 1); ctx.closePath(); ctx.fill();
    }
  }

  ui.setCaption(T.start);
  refresh();
  MLX.loop(ui.stage, (dt) => { if (test && tt < 1.6) { tt += dt; ui.cv.draw(); } }).start();
});
