/* ════════════════════════════════════════════════════════════════════
   Grade 9 Forces — the Explore tab's three simulations, shared by
   forces.html and forces.af.html (text in both languages below; the
   page's <html lang> picks one).

   1. Push the box      resultant force, balanced vs unbalanced, friction,
                        and what balanced forces do to a box that is
                        ALREADY moving (it keeps going)
   2. Contact or not?   contact forces exist only while touching;
                        non-contact forces act across a gap and weaken
                        with distance; then a sorting activity
   3. Add the forces    force vectors along one line, drawn head to tail
                        on a scale grid, with the resultant and working

   Grade 9 CAPS keeps forces on one straight line, so every sim does too.
   Animation runs only while the Explore tab and that sim are on screen.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  const root = document.getElementById('forceSims');
  if (!root) return;
  const AF = (document.documentElement.lang || '').startsWith('af');

  const T = AF ? {
    tabs: ['Stoot die boks', 'Kontak of nie?', 'Tel die kragte op'],
    // sim 1
    s1Title: 'Stoot die boks',
    s1Intro: 'Twee mense stoot ’n boks van 10 kg in teenoorgestelde rigtings. Stel hulle kragte, skakel wrywing aan of af, en druk Begin om te sien hoe die boks beweeg.',
    s1Predict: '<strong>Voorspel eers:</strong> Die boks beweeg na regs. Jy maak nou albei kragte gelyk. Sal die boks stop, of aanhou beweeg? <strong>Toets dit dan:</strong> Begin met regs 30 N en links 10 N, druk Begin, en maak die kragte gelyk terwyl die boks beweeg (wrywing af).',
    left: 'Krag na links', right: 'Krag na regs', friction: 'Ruwe vloer (wrywing 12 N)',
    start: 'Begin', pause: 'Pouseer', reset: 'Herstel',
    resultant: 'Resultante', speed: 'Spoed', distance: 'Afstand',
    balancedRest: 'Gebalanseerde kragte — die boks bly stil.',
    balancedMoving: 'Gebalanseerde kragte — die boks hou aan beweeg teen ’n konstante spoed. Gebalanseerde kragte stop nie beweging nie!',
    staticHold: 'Wrywing hou die boks stil: die stoot is nie groter as die wrywing nie, so die kragte is gebalanseer.',
    speeding: (n, d) => `Ongebalanseer: ${n} N na ${d} — die boks word vinniger.`,
    slowing: (n, d) => `Ongebalanseer: ${n} N na ${d}, teen die beweging in — die boks word stadiger.`,
    toRight: 'regs', toLeft: 'links',
    applied: 'Toegepaste krag', fric: 'Wrywing', weight: 'Gewig', normal: 'Normaalkrag', box: 'Boks',
    res: 'Resulterende krag', zero: 'Resultante = 0 N',
    capped: 'Die simulasie se spoedgrens is bereik.',
    // sim 2
    s2Title: 'Kontak of nie-kontak?',
    s2Intro: 'Kies ’n krag en trek die twee voorwerpe uitmekaar. Kyk watter kragte verdwyn sodra die voorwerpe nie meer raak nie, en watter oor die gaping heen werk.',
    s2Predict: '<strong>Voorspel eers:</strong> Watter van hierdie kragte sal nog werk as daar ’n gaping tussen die voorwerpe is? <strong>Toets dit dan:</strong> Probeer elke krag met die gaping op 0, en skuif dit dan groter.',
    kinds: { push: 'Stoot', friction: 'Wrywing', magnet: 'Magnete', charge: 'Ladings', gravity: 'Swaartekrag' },
    gap: 'Gaping', gapTouch: 'raak', attract: 'Trek aan', repel: 'Stoot af',
    force: 'Krag', touching: 'Raak hulle?', yes: 'Ja', no: 'Nee',
    contactBadge: 'Kontakkrag', nonBadge: 'Nie-kontakkrag',
    explain: {
      push: ['’n Stoot werk net terwyl die hand die boks raak.', 'Die hand raak nie die boks nie — geen stoot nie. ’n Stoot is ’n kontakkrag.'],
      friction: ['Wrywing werk tussen die blok en die vloer terwyl hulle raak, teen die beweging in.', 'Die blok is van die vloer af — geen wrywing nie. Wrywing is ’n kontakkrag.'],
      magnet: ['Die magnete werk op mekaar in, al raak hulle nie. Hoe verder uitmekaar, hoe swakker die krag.', 'Magnetiese krag werk oor ’n afstand — ’n nie-kontakkrag.'],
      charge: ['Gelaaide voorwerpe werk op mekaar in sonder om te raak, en die krag word swakker met afstand.', 'Elektrostatiese krag werk oor ’n afstand — ’n nie-kontakkrag.'],
      gravity: ['Enige twee massas trek mekaar aan, selfs oor ’n groot afstand. Die krag word swakker hoe verder hulle is.', 'Swaartekrag werk oor ’n afstand — ’n nie-kontakkrag.'],
    },
    objs: { push: ['Hand', 'Boks'], friction: ['Vloer', 'Blok'], magnet: ['Magneet A', 'Magneet B'], charge: ['Bal A', 'Bal B'], gravity: ['Aarde', 'Maan'] },
    likeUnlike: ['Ongelyke ladings (+ −)', 'Gelyke ladings (+ +)'], poles: ['N teenoor S', 'N teenoor N'],
    illus: 'Die kraggroottes hier is ’n illustrasie. Waaroor dit gaan: kontakkragte werk net terwyl voorwerpe raak, en nie-kontakkragte word swakker hoe verder die voorwerpe uitmekaar is.',
    sortTitle: 'Sorteer dit', sortIntro: 'Is elkeen ’n kontakkrag of ’n nie-kontakkrag?',
    contact: 'Kontak', non: 'Nie-kontak', score: (a, b) => `${a} uit ${b} reg`, again: 'Probeer weer',
    sorts: [
      ['’n Yskasmagneet hou ’n stuk papier teen die deur.', 1, 'Die magneet trek die deur oor ’n klein gaping aan — magnetiese krag.'],
      ['Jy stoot ’n trollie by die winkel.', 0, 'Jou hande raak die trollie — ’n toegepaste krag.'],
      ['’n Appel val van ’n boom af.', 1, 'Swaartekrag trek die appel sonder om dit te raak.'],
      ['Die remme van ’n fiets laat die wiel stadiger draai.', 0, 'Die remblokke vryf teen die wiel — wrywing.'],
      ['’n Ballon wat teen jou hare gevryf is, tel stukkies papier op.', 1, 'Die gelaaide ballon trek die papier oor ’n afstand — elektrostatiese krag.'],
      ['’n Tou trek ’n emmer uit ’n put.', 0, 'Die styf tou trek aan die emmer — spankrag.'],
      ['Die Maan wentel om die Aarde.', 1, 'Swaartekrag tussen die Aarde en die Maan werk oor 384 000 km.'],
      ['’n Boek rus op ’n tafel.', 0, 'Die tafel stoot op die boek waar hulle raak — die normaalkrag.'],
    ],
    // sim 3
    s3Title: 'Tel die kragte op',
    s3Intro: 'Kragte langs een lyn tel op soos pyle op ’n getallelyn: elke pyl begin waar die vorige een eindig (kop aan stert). Die resultante strek van die begin tot by die laaste kop.',
    s3Predict: '<strong>Voorspel eers:</strong> In die toutrek-voorbeeld trek albei spanne met twee mense. Watter span gaan wen, en met hoeveel? <strong>Toets dit dan:</strong> Kies Toutrek en kyk na die resultante.',
    presets: 'Voorbeelde', addForce: 'Voeg krag by', remove: 'Verwyder',
    presetNames: ['Toutrek', 'Trollie en wrywing', 'Twee leerders stoot saam', 'Motor wat vassteek'],
    forceN: n => `F${n}`, scaleLbl: '1 blokkie = 5 N', diagTop: 'Kragdiagram', diagBottom: 'Skaaltekening, kop aan stert',
    sign: 'Regs is positief (+), links is negatief (−).',
    resultIs: (n, d) => n === 0 ? 'Resultante = 0 N — die kragte is gebalanseer.' : `Resultante = ${n} N na ${d}.`,
    challenge: 'Daag my uit', challengeTxt: (n, d) => `Uitdaging: maak die resultante presies ${n} N na ${d}.`,
    challengeZero: 'Uitdaging: balanseer die kragte — resultante 0 N.',
    solved: 'Reg! Goed gedoen.', start0: 'Begin',
  } : {
    tabs: ['Push the box', 'Contact or not?', 'Add the forces'],
    s1Title: 'Push the box',
    s1Intro: 'Two people push a 10 kg box in opposite directions. Set their forces, switch friction on or off, and press Start to see how the box moves.',
    s1Predict: '<strong>Predict first:</strong> The box is moving to the right. Now you make both forces equal. Will the box stop, or keep moving? <strong>Then test it:</strong> Start with right 30 N and left 10 N, press Start, and make the forces equal while the box is moving (friction off).',
    left: 'Force to the left', right: 'Force to the right', friction: 'Rough floor (friction 12 N)',
    start: 'Start', pause: 'Pause', reset: 'Reset',
    resultant: 'Resultant', speed: 'Speed', distance: 'Distance',
    balancedRest: 'Balanced forces — the box stays at rest.',
    balancedMoving: 'Balanced forces — the box keeps moving at a constant speed. Balanced forces do not stop motion!',
    staticHold: 'Friction holds the box still: the push is not bigger than friction, so the forces are balanced.',
    speeding: (n, d) => `Unbalanced: ${n} N to the ${d} — the box speeds up.`,
    slowing: (n, d) => `Unbalanced: ${n} N to the ${d}, against the motion — the box slows down.`,
    toRight: 'right', toLeft: 'left',
    applied: 'Applied force', fric: 'Friction', weight: 'Weight', normal: 'Normal force', box: 'Box',
    res: 'Resultant force', zero: 'Resultant = 0 N',
    capped: 'The sim’s speed limit has been reached.',
    s2Title: 'Contact or non-contact?',
    s2Intro: 'Pick a force and pull the two objects apart. Watch which forces disappear as soon as the objects stop touching, and which reach across the gap.',
    s2Predict: '<strong>Predict first:</strong> Which of these forces will still act when there is a gap between the objects? <strong>Then test it:</strong> Try each force with the gap at 0, then make the gap bigger.',
    kinds: { push: 'Push', friction: 'Friction', magnet: 'Magnets', charge: 'Charges', gravity: 'Gravity' },
    gap: 'Gap', gapTouch: 'touching', attract: 'Attract', repel: 'Repel',
    force: 'Force', touching: 'Touching?', yes: 'Yes', no: 'No',
    contactBadge: 'Contact force', nonBadge: 'Non-contact force',
    explain: {
      push: ['A push only acts while the hand touches the box.', 'The hand is not touching the box — no push. A push is a contact force.'],
      friction: ['Friction acts between the block and the floor while they touch, against the motion.', 'The block is off the floor — no friction. Friction is a contact force.'],
      magnet: ['The magnets act on each other even though they do not touch. The further apart, the weaker the force.', 'Magnetic force acts across a distance — a non-contact force.'],
      charge: ['Charged objects act on each other without touching, and the force gets weaker with distance.', 'Electrostatic force acts across a distance — a non-contact force.'],
      gravity: ['Any two masses pull on each other, even across a huge distance. The force gets weaker the further apart they are.', 'Gravity acts across a distance — a non-contact force.'],
    },
    objs: { push: ['Hand', 'Box'], friction: ['Floor', 'Block'], magnet: ['Magnet A', 'Magnet B'], charge: ['Ball A', 'Ball B'], gravity: ['Earth', 'Moon'] },
    likeUnlike: ['Unlike charges (+ −)', 'Like charges (+ +)'], poles: ['N facing S', 'N facing N'],
    illus: 'The force sizes here are illustrative. What matters: contact forces only act while objects touch, and non-contact forces get weaker the further apart the objects are.',
    sortTitle: 'Sort it', sortIntro: 'Is each one a contact force or a non-contact force?',
    contact: 'Contact', non: 'Non-contact', score: (a, b) => `${a} out of ${b} correct`, again: 'Try again',
    sorts: [
      ['A fridge magnet holds a piece of paper against the door.', 1, 'The magnet pulls on the door across a small gap — magnetic force.'],
      ['You push a trolley at the shop.', 0, 'Your hands touch the trolley — an applied force.'],
      ['An apple falls from a tree.', 1, 'Gravity pulls the apple without touching it.'],
      ['A bicycle’s brakes slow the wheel down.', 0, 'The brake pads rub on the wheel — friction.'],
      ['A balloon rubbed on your hair picks up bits of paper.', 1, 'The charged balloon pulls the paper across a distance — electrostatic force.'],
      ['A rope pulls a bucket up out of a well.', 0, 'The tight rope pulls on the bucket — tension.'],
      ['The Moon orbits the Earth.', 1, 'Gravity between the Earth and the Moon acts across 384 000 km.'],
      ['A book rests on a table.', 0, 'The table pushes up on the book where they touch — the normal force.'],
    ],
    s3Title: 'Add the forces',
    s3Intro: 'Forces along one line add like arrows on a number line: each arrow starts where the last one ended (head to tail). The resultant runs from the start to the last arrowhead.',
    s3Predict: '<strong>Predict first:</strong> In the tug-of-war example both teams pull with two people. Which team will win, and by how much? <strong>Then test it:</strong> Pick Tug of war and look at the resultant.',
    presets: 'Examples', addForce: 'Add force', remove: 'Remove',
    presetNames: ['Tug of war', 'Trolley and friction', 'Two learners push together', 'Car stuck in sand'],
    forceN: n => `F${n}`, scaleLbl: '1 block = 5 N', diagTop: 'Force diagram', diagBottom: 'Scale drawing, head to tail',
    sign: 'Right is positive (+), left is negative (−).',
    resultIs: (n, d) => n === 0 ? 'Resultant = 0 N — the forces are balanced.' : `Resultant = ${n} N to the ${d}.`,
    challenge: 'Challenge me', challengeTxt: (n, d) => `Challenge: make the resultant exactly ${n} N to the ${d}.`,
    challengeZero: 'Challenge: balance the forces — resultant 0 N.',
    solved: 'Correct! Well done.', start0: 'Start',
  };

  /* ── shared drawing helpers ─────────────────────────────────────── */
  const COL = { right: '#4ade80', left: '#fbbf24', res: '#60a5fa', fric: '#f87171', grey: 'rgba(210,218,245,0.45)', text: '#e3e8ef', muted: 'rgba(210,218,245,0.55)' };
  const F1 = ['#4ade80', '#fbbf24', '#c084fc', '#f472b6'];
  function fitCanvas(c, h) {
    const dpr = window.devicePixelRatio || 1;
    const w = c.offsetWidth || 600;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }
  function arrow(ctx, x1, y1, x2, y2, color, width) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 1) return;
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len, head = Math.min(13, len * 0.6), lw = width || 4;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * head * 0.7, y2 - uy * head * 0.7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ux * head - uy * head * 0.55, y2 - uy * head + ux * head * 0.55);
    ctx.lineTo(x2 - ux * head + uy * head * 0.55, y2 - uy * head - ux * head * 0.55);
    ctx.closePath(); ctx.fill();
  }
  function label(ctx, txt, x, y, color, align, font) {
    ctx.fillStyle = color; ctx.textAlign = align || 'center'; ctx.textBaseline = 'middle';
    ctx.font = font || '600 12px "Cabinet Grotesk", sans-serif';
    ctx.fillText(txt, x, y);
  }
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ── page scaffolding: switcher + three panes ──────────────────── */
  const css = document.createElement('style');
  css.textContent = `
    .fs-switch{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 22px;padding:4px;border:1px solid var(--border);border-radius:12px;width:fit-content;max-width:100%;background:rgba(255,255,255,.03)}
    .fs-switch button{font:700 13px var(--fd);padding:9px 16px;border-radius:9px;border:0;background:none;color:var(--muted);cursor:pointer;min-height:40px}
    .fs-switch button[aria-selected=true]{background:rgba(251,191,36,.14);color:#fcd34d}
    .fs-pane{display:none}.fs-pane.on{display:block}
    .fs-pane h2{font-size:18px;font-weight:800;color:#fff;margin-bottom:6px}
    .fs-intro{font-size:13.5px;color:var(--muted);margin-bottom:16px;max-width:820px;line-height:1.65}
    .fs-predict{margin:0 0 16px;padding:10px 14px;border-radius:10px;background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.22);font-size:13px;line-height:1.6;color:rgba(226,232,240,.88);max-width:980px}
    .fs-predict strong{color:#fde68a}
    .fs-btns{display:flex;flex-wrap:wrap;gap:8px}
    .fs-btn{font:700 13px var(--fd);padding:9px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:var(--text);cursor:pointer;min-height:40px}
    .fs-btn:hover{background:rgba(255,255,255,.09)}
    .fs-btn.on{background:rgba(251,191,36,.14);border-color:rgba(251,191,36,.38);color:#fcd34d}
    .fs-btn.primary{background:#fbbf24;border-color:#fbbf24;color:#1a1205}
    .fs-check{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;cursor:pointer;min-height:36px}
    .fs-check input{width:18px;height:18px;accent-color:#fbbf24}
    .fs-badge{display:inline-block;padding:4px 10px;border-radius:99px;font-size:12px;font-weight:700;margin-bottom:8px}
    .fs-badge.c{background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.32);color:#86efac}
    .fs-badge.n{background:rgba(96,165,250,.12);border:1px solid rgba(96,165,250,.32);color:#93c5fd}
    .fs-note{font-size:13px;line-height:1.6;color:rgba(226,232,240,.8)}
    .fs-sort{margin-top:22px;max-width:980px}
    .fs-sort h3{font-size:16px;font-weight:800;color:#fff;margin-bottom:4px}
    .fs-sort-row{display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;padding:10px 0;border-top:1px solid var(--border)}
    .fs-sort-row p{font-size:14px;color:rgba(226,232,240,.85)}
    .fs-sort-row .fs-why{grid-column:1/-1;font-size:12.5px;margin-top:-4px}
    .fs-sort-row .fs-why.ok{color:#86efac}.fs-sort-row .fs-why.bad{color:#fca5a5}
    .fs-force{display:grid;grid-template-columns:auto auto 1fr auto auto;gap:8px;align-items:center;margin-bottom:8px}
    .fs-force .tag{font:700 12px var(--fm);width:28px}
    .fs-dir{font:700 15px var(--fd);width:40px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:var(--text);cursor:pointer}
    .fs-x{width:32px;height:32px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:none;color:var(--muted);cursor:pointer;font-size:16px}
    #forceSims .slider-val{white-space:nowrap;min-width:64px}
    .fs-work{font:600 13px var(--fm);color:#93c5fd;line-height:1.7;word-break:break-word}
    @media(max-width:640px){.fs-force{grid-template-columns:auto auto 1fr auto}.fs-force .fs-x{display:none}}`;
  document.head.appendChild(css);

  const sw = el('div', 'fs-switch'); sw.setAttribute('role', 'tablist');
  const panes = [0, 1, 2].map(() => el('div', 'fs-pane'));
  T.tabs.forEach((name, i) => {
    const b = el('button', '', name); b.type = 'button'; b.setAttribute('role', 'tab');
    b.addEventListener('click', () => show(i));
    sw.appendChild(b);
  });
  root.append(sw, ...panes);
  let current = 0;
  function show(i) {
    current = i;
    [...sw.children].forEach((b, k) => b.setAttribute('aria-selected', k === i));
    panes.forEach((p, k) => p.classList.toggle('on', k === i));
    sims[i].draw();
  }

  /* ════════════════ 1. PUSH THE BOX ════════════════ */
  const s1 = (function () {
    const p = panes[0];
    p.innerHTML = `<h2>${T.s1Title}</h2><p class="fs-intro">${T.s1Intro}</p><div class="fs-predict">${T.s1Predict}</div>
      <div class="explore-top">
        <div class="sim-canvas-wrap"><canvas height="340" role="img" aria-label="${T.s1Title}"></canvas></div>
        <div class="controls">
          <div class="ctrl-card">
            <div class="slider-row"><label for="fsL">${T.left}</label><input type="range" id="fsL" min="0" max="50" step="1" value="10"><span class="slider-val" id="fsLv"></span></div>
            <div class="slider-row"><label for="fsR">${T.right}</label><input type="range" id="fsR" min="0" max="50" step="1" value="30"><span class="slider-val" id="fsRv"></span></div>
            <label class="fs-check"><input type="checkbox" id="fsFr"> ${T.friction}</label>
            <div class="fs-btns" style="margin-top:10px"><button type="button" class="fs-btn primary" id="fsGo">${T.start}</button><button type="button" class="fs-btn" id="fsReset">${T.reset}</button></div>
          </div>
          <div class="ctrl-card">
            <div class="readout-grid">
              <div class="readout"><div class="readout-label">${T.resultant}</div><div class="readout-val" id="fsRes"></div></div>
              <div class="readout"><div class="readout-label">${T.speed}</div><div class="readout-val" id="fsV"></div></div>
            </div>
            <div class="result-banner balanced" id="fsBanner" role="status"></div>
          </div>
        </div>
      </div>`;
    const c = p.querySelector('canvas'), $ = id => p.querySelector('#' + id);
    const M = 10, FR = 12, VMAX = 12, PXM = 34;  // kg, N, m/s, pixels per metre
    let L = 10, R = 30, fr = false, running = false, x = 0, v = 0, last = 0, capped = false;

    function forces() {
      const applied = R - L;
      let f = 0;
      if (fr) {
        if (Math.abs(v) > 1e-3) f = -Math.sign(v) * FR;
        else f = Math.abs(applied) <= FR ? -applied : -Math.sign(applied) * FR;
      }
      return { applied, f, net: applied + f };
    }
    function readouts() {
      $('fsLv').textContent = L + ' N'; $('fsRv').textContent = R + ' N';
      const { net } = forces(), mag = Math.abs(net), d = net > 0 ? T.toRight : T.toLeft;
      $('fsRes').innerHTML = (mag < 1e-6 ? 0 : mag) + '<span>N ' + (mag < 1e-6 ? '' : (net > 0 ? '→' : '←')) + '</span>';
      $('fsV').innerHTML = Math.abs(v).toFixed(1) + '<span>m/s</span>';
      const b = $('fsBanner');
      let txt, cls;
      if (mag < 1e-6) {
        cls = 'balanced';
        txt = Math.abs(v) > 1e-3 ? T.balancedMoving : (fr && L !== R ? T.staticHold : T.balancedRest);
      } else if (Math.abs(v) > 1e-3 && Math.sign(net) !== Math.sign(v)) { cls = net > 0 ? 'right' : 'left'; txt = T.slowing(mag, d); }
      else { cls = net > 0 ? 'right' : 'left'; txt = T.speeding(mag, d); }
      if (capped) txt += ' ' + T.capped;
      b.className = 'result-banner ' + cls; b.textContent = txt;
    }
    function step(dt) {
      const before = v, { net, applied } = forces();
      v += net / M * dt;
      // kinetic friction must not push the box backwards through zero
      if (fr && before !== 0 && Math.sign(v) !== Math.sign(before) && Math.abs(applied) <= FR) v = 0;
      capped = Math.abs(v) >= VMAX;
      if (capped) v = Math.sign(v) * VMAX;
      x += v * dt;
    }
    function draw() {
      if (!c.offsetParent) return;
      const { ctx, w, h } = fitCanvas(c, 340);
      ctx.clearRect(0, 0, w, h);
      const gy = 236, cx = w / 2, bw = 92, bh = 70;
      // ground with metre marks, scrolling under the box (the camera follows it)
      ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      const first = Math.floor((x - cx / PXM)), lastM = Math.ceil(x + cx / PXM);
      for (let m = first; m <= lastM; m++) {
        const px = cx + (m - x) * PXM;
        ctx.strokeStyle = m % 5 === 0 ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.10)';
        ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, gy + (m % 5 === 0 ? 12 : 6)); ctx.stroke();
        if (m % 5 === 0) label(ctx, m + ' m', px, gy + 24, 'rgba(210,218,245,0.4)', 'center', '500 11px "JetBrains Mono", monospace');
      }
      if (fr) { ctx.fillStyle = 'rgba(248,113,113,0.10)'; ctx.fillRect(0, gy, w, 6); }
      // box
      const bx = cx - bw / 2, by = gy - bh;
      ctx.fillStyle = 'rgba(251,191,36,0.16)'; ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 8); ctx.fill(); ctx.stroke();
      label(ctx, T.box + ' 10 kg', cx, by + bh / 2, 'rgba(255,255,255,0.85)');
      const k = Math.min(3.2, (w / 2 - bw / 2 - 30) / 50); // pixels per newton
      const my = by + bh / 2 - 12;
      if (R > 0) { arrow(ctx, bx + bw + 4, my, bx + bw + 4 + R * k, my, COL.right); label(ctx, R + ' N', bx + bw + 8 + R * k, my - 16, COL.right, 'right', '700 12px "JetBrains Mono", monospace'); }
      if (L > 0) { arrow(ctx, bx - 4, my, bx - 4 - L * k, my, COL.left); label(ctx, L + ' N', bx - 8 - L * k, my - 16, COL.left, 'left', '700 12px "JetBrains Mono", monospace'); }
      const { f, net } = forces();
      if (Math.abs(f) > 1e-6) { arrow(ctx, cx, gy - 6, cx + f * k, gy - 6, COL.fric, 3); label(ctx, T.fric + ' ' + Math.abs(+f.toFixed(1)) + ' N', cx + f * k / 2, gy + 42, COL.fric, 'center'); }
      // vertical pair: weight and normal force, always balanced on level ground
      arrow(ctx, cx + 30, by, cx + 30, by - 46, COL.grey, 3); label(ctx, T.normal, cx + 38, by - 40, COL.grey, 'left', '500 11px "Cabinet Grotesk", sans-serif');
      arrow(ctx, cx - 30, gy - 2, cx - 30, gy + 44, COL.grey, 3); label(ctx, T.weight, cx - 38, gy + 40, COL.grey, 'right', '500 11px "Cabinet Grotesk", sans-serif');
      // resultant
      const ry = 46;
      if (Math.abs(net) > 1e-6) { arrow(ctx, cx, ry, cx + net * k, ry, COL.res, 5); label(ctx, T.res + ': ' + Math.abs(+net.toFixed(1)) + ' N', cx, ry - 22, '#93c5fd', 'center', '700 13px "Cabinet Grotesk", sans-serif'); }
      else label(ctx, T.zero, cx, ry, '#93c5fd', 'center', '700 13px "Cabinet Grotesk", sans-serif');
      label(ctx, T.distance + ': ' + x.toFixed(1) + ' m', 12, h - 16, COL.muted, 'left', '500 12px "JetBrains Mono", monospace');
    }
    function tick(t) {
      const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
      if (running) { step(dt); readouts(); }
      draw();
    }
    const go = $('fsGo');
    function setRunning(r) { running = r; go.textContent = r ? T.pause : T.start; go.classList.toggle('primary', !r); last = 0; }
    $('fsL').addEventListener('input', e => { L = +e.target.value; readouts(); draw(); });
    $('fsR').addEventListener('input', e => { R = +e.target.value; readouts(); draw(); });
    $('fsFr').addEventListener('change', e => { fr = e.target.checked; readouts(); draw(); });
    go.addEventListener('click', () => setRunning(!running));
    $('fsReset').addEventListener('click', () => { setRunning(false); x = 0; v = 0; capped = false; readouts(); draw(); });
    readouts();
    return { draw, tick, animating: () => running };
  })();

  /* ════════════════ 2. CONTACT OR NON-CONTACT? ════════════════ */
  const s2 = (function () {
    const p = panes[1];
    const KINDS = ['push', 'friction', 'magnet', 'charge', 'gravity'];
    const CONTACT = { push: true, friction: true, magnet: false, charge: false, gravity: false };
    p.innerHTML = `<h2>${T.s2Title}</h2><p class="fs-intro">${T.s2Intro}</p><div class="fs-predict">${T.s2Predict}</div>
      <div class="fs-btns" id="fsKinds" style="margin-bottom:14px">${KINDS.map(k => `<button type="button" class="fs-btn" data-k="${k}">${T.kinds[k]}</button>`).join('')}</div>
      <div class="explore-top">
        <div class="sim-canvas-wrap"><canvas height="300" role="img" aria-label="${T.s2Title}"></canvas></div>
        <div class="controls">
          <div class="ctrl-card">
            <div class="slider-row"><label for="fsGap">${T.gap}</label><input type="range" id="fsGap" min="0" max="100" value="0"><span class="slider-val" id="fsGapV"></span></div>
            <div class="fs-btns" id="fsPol"></div>
          </div>
          <div class="ctrl-card">
            <span class="fs-badge" id="fsBadge"></span>
            <div class="readout-grid">
              <div class="readout"><div class="readout-label">${T.force}</div><div class="readout-val" id="fsF"></div></div>
              <div class="readout"><div class="readout-label">${T.touching}</div><div class="readout-val" id="fsT" style="font-size:16px"></div></div>
            </div>
            <p class="fs-note" id="fsWhy" role="status" style="margin-top:10px"></p>
            <p class="fs-note" style="margin-top:8px;color:var(--muted);font-size:12px">${T.illus}</p>
          </div>
        </div>
      </div>
      <div class="fs-sort"><h3>${T.sortTitle}</h3><p class="fs-intro" style="margin-bottom:6px">${T.sortIntro} <strong id="fsScore" style="color:#fcd34d"></strong></p><div id="fsSortList"></div>
        <button type="button" class="fs-btn" id="fsSortAgain" style="margin-top:12px">${T.again}</button></div>`;
    const c = p.querySelector('canvas'), $ = id => p.querySelector('#' + id);
    let kind = 'push', gap = 0, alt = 0; // alt: 0 = attract (unlike / N–S), 1 = repel
    let phase = 0;

    // Illustrative force size in newtons: 20 N when touching, falling off as
    // 1/(distance)² for the non-contact kinds; contact kinds drop to 0 at any gap.
    // planets are far apart: the gravity slider runs from touching to the real Earth–Moon distance
    const gapText = () => gap === 0 ? T.gapTouch : kind === 'gravity' ? Math.round(gap * 3840).toLocaleString(AF ? 'af-ZA' : 'en-ZA') + ' km' : (gap / 10).toFixed(1) + ' cm';
    function forceN() {
      if (CONTACT[kind]) return gap === 0 ? 20 : 0;
      const d = 1 + gap / 25;            // 1 at touching, 5 at the widest gap
      return 20 / (d * d);
    }
    function polButtons() {
      const box = $('fsPol');
      const opts = kind === 'magnet' ? T.poles : kind === 'charge' ? T.likeUnlike : null;
      box.innerHTML = opts ? opts.map((o, i) => `<button type="button" class="fs-btn${i === alt ? ' on' : ''}" data-a="${i}">${o}</button>`).join('') : '';
      box.style.marginTop = opts ? '8px' : '0';
    }
    function update() {
      [...$('fsKinds').children].forEach(b => b.classList.toggle('on', b.dataset.k === kind));
      $('fsGapV').textContent = gapText();
      const F = forceN(), contact = CONTACT[kind];
      const badge = $('fsBadge');
      badge.className = 'fs-badge ' + (contact ? 'c' : 'n'); badge.textContent = contact ? T.contactBadge : T.nonBadge;
      $('fsF').innerHTML = (F < 0.05 ? '0' : F.toFixed(1)) + '<span>N</span>';
      $('fsT').textContent = gap === 0 ? T.yes : T.no;
      $('fsWhy').textContent = T.explain[kind][gap === 0 ? 0 : 1];
      draw();
    }
    function drawObj(ctx, k, which, x, y) {
      const name = T.objs[k][which];
      ctx.lineWidth = 2;
      if (k === 'gravity') {
        const r = which === 0 ? 46 : 20;
        ctx.fillStyle = which === 0 ? 'rgba(59,130,246,0.30)' : 'rgba(203,213,225,0.30)';
        ctx.strokeStyle = which === 0 ? 'rgba(96,165,250,0.8)' : 'rgba(203,213,225,0.8)';
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        label(ctx, name, x, y + r + 16, COL.muted); return r;
      }
      if (k === 'charge') {
        const r = 26, sign = which === 0 ? '+' : (alt === 0 ? '−' : '+');
        ctx.fillStyle = sign === '+' ? 'rgba(248,113,113,0.22)' : 'rgba(96,165,250,0.22)';
        ctx.strokeStyle = sign === '+' ? 'rgba(248,113,113,0.8)' : 'rgba(96,165,250,0.8)';
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        label(ctx, sign, x, y, '#fff', 'center', '800 22px "Cabinet Grotesk", sans-serif');
        label(ctx, name, x, y + r + 16, COL.muted); return r;
      }
      if (k === 'magnet') {
        const w = 70, h = 34, left = which === 0;
        // A shows S|N with N facing B; B shows S|N facing A (attract) or N|S (repel)
        const facing = left ? 'N' : (alt === 0 ? 'S' : 'N'), back = facing === 'N' ? 'S' : 'N';
        const xs = left ? [x - w, x - w / 2] : [x, x + w / 2], labs = left ? [back, facing] : [facing, back];
        labs.forEach((l, i) => {
          ctx.fillStyle = l === 'N' ? 'rgba(248,113,113,0.55)' : 'rgba(96,165,250,0.55)';
          ctx.fillRect(xs[i], y - h / 2, w / 2, h);
          label(ctx, l, xs[i] + w / 4, y, '#fff', 'center', '800 14px "Cabinet Grotesk", sans-serif');
        });
        ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.strokeRect(left ? x - w : x, y - h / 2, w, h);
        label(ctx, name, left ? x - w / 2 : x + w / 2, y + h / 2 + 16, COL.muted); return w;
      }
      if (k === 'push' && which === 0) {
        // a hand: palm and fingers pointing right
        ctx.fillStyle = 'rgba(253,186,116,0.35)'; ctx.strokeStyle = 'rgba(253,186,116,0.85)';
        ctx.beginPath(); ctx.roundRect(x - 60, y - 22, 40, 44, 10); ctx.fill(); ctx.stroke();
        for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.roundRect(x - 22, y - 20 + i * 11, 22, 9, 4); ctx.fill(); ctx.stroke(); }
        label(ctx, name, x - 30, y + 40, COL.muted); return 60;
      }
      const w = 80, h = 56, l = which === 0 ? x - w : x;
      ctx.fillStyle = 'rgba(251,191,36,0.16)'; ctx.strokeStyle = 'rgba(251,191,36,0.6)';
      ctx.beginPath(); ctx.roundRect(l, y - h / 2, w, h, 7); ctx.fill(); ctx.stroke();
      label(ctx, name, l + w / 2, y, 'rgba(255,255,255,0.85)'); return w;
    }
    function draw() {
      if (!c.offsetParent) return;
      const { ctx, w, h } = fitCanvas(c, 300);
      ctx.clearRect(0, 0, w, h);
      const F = forceN(), k = Math.min(5, w / 140);  // pixels per newton
      const gapPx = gap * Math.min(2.6, (w - 280) / 100);
      if (kind === 'friction') {
        // block above a floor; the gap lifts it. Friction acts along the floor, against the sliding.
        const fy = 210, bx = w / 2 - 40;
        ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(40, fy, w - 80, 26);
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.beginPath(); ctx.moveTo(40, fy); ctx.lineTo(w - 40, fy); ctx.stroke();
        for (let i = 50; i < w - 40; i += 14) { ctx.beginPath(); ctx.moveTo(i, fy + 26); ctx.lineTo(i + 10, fy + 4); ctx.stroke(); }
        label(ctx, T.objs.friction[0], 60, fy + 42, COL.muted, 'left');
        const by = fy - 56 - gapPx * 0.5;
        ctx.fillStyle = 'rgba(251,191,36,0.16)'; ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(bx, by, 80, 56, 7); ctx.fill(); ctx.stroke();
        label(ctx, T.objs.friction[1], bx + 40, by + 28, 'rgba(255,255,255,0.85)');
        // sliding to the right
        arrow(ctx, bx + 20, by - 18, bx + 66, by - 18, 'rgba(210,218,245,0.45)', 2);
        label(ctx, 'v', bx + 74, by - 18, COL.muted, 'left');
        if (F > 0) { arrow(ctx, bx + 40, fy - 4, bx + 40 - F * k, fy - 4, COL.fric, 4); label(ctx, F.toFixed(0) + ' N', bx + 40 - F * k, fy - 18, COL.fric, 'right', '700 12px "JetBrains Mono", monospace'); }
        return;
      }
      const cy = 130, aEdge = w / 2 - gapPx / 2, bEdge = w / 2 + gapPx / 2;
      let ra, rb;
      if (kind === 'gravity') { ra = 46; rb = 20; drawObj(ctx, kind, 0, aEdge - ra, cy); drawObj(ctx, kind, 1, bEdge + rb, cy); }
      else if (kind === 'charge') { ra = rb = 26; drawObj(ctx, kind, 0, aEdge - ra, cy); drawObj(ctx, kind, 1, bEdge + rb, cy); }
      else { drawObj(ctx, kind, 0, aEdge, cy); drawObj(ctx, kind, 1, bEdge, cy); ra = rb = 0; }
      if (!CONTACT[kind] && gap > 0) {
        // the gap the force reaches across
        ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(147,197,253,0.35)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(aEdge + 4, cy + 54); ctx.lineTo(bEdge - 4, cy + 54); ctx.stroke(); ctx.setLineDash([]);
        label(ctx, gapText(), w / 2, cy + 68, 'rgba(147,197,253,0.6)', 'center', '500 11px "JetBrains Mono", monospace');
      }
      if (F < 0.05) return;
      // equal and opposite: the force on A and the force on B
      const repel = (kind === 'magnet' || kind === 'charge') && alt === 1, pushK = kind === 'push';
      const len = Math.max(18, F * k), ay = cy - 64;   // never so short the direction can't be seen
      const aCx = kind === 'gravity' || kind === 'charge' ? aEdge - ra : aEdge - 35;
      const bCx = kind === 'gravity' || kind === 'charge' ? bEdge + rb : bEdge + 40;
      if (pushK || repel) { arrow(ctx, bCx, ay, bCx + len, ay, COL.right); arrow(ctx, aCx, ay, aCx - len, ay, COL.left); }
      else { arrow(ctx, bCx, ay, bCx - len, ay, COL.right); arrow(ctx, aCx, ay, aCx + len, ay, COL.left); }
      label(ctx, F.toFixed(1) + ' N', bCx, ay - 18, COL.right, 'center', '700 12px "JetBrains Mono", monospace');
      label(ctx, F.toFixed(1) + ' N', aCx, ay - 18, COL.left, 'center', '700 12px "JetBrains Mono", monospace');
    }
    // sorting activity
    let answers = {};
    function sortList() {
      const list = $('fsSortList'); list.innerHTML = '';
      T.sorts.forEach((s, i) => {
        const row = el('div', 'fs-sort-row');
        row.innerHTML = `<p>${s[0]}</p><div class="fs-btns"><button type="button" class="fs-btn" data-v="0">${T.contact}</button><button type="button" class="fs-btn" data-v="1">${T.non}</button></div><div class="fs-why"></div>`;
        row.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
          if (i in answers) return;
          const v = +b.dataset.v, ok = v === s[1];
          answers[i] = ok;
          b.classList.add('on');
          const why = row.querySelector('.fs-why'); why.className = 'fs-why ' + (ok ? 'ok' : 'bad');
          why.textContent = (ok ? '✓ ' : '✗ ') + s[2];
          score();
        }));
        list.appendChild(row);
      });
      score();
    }
    function score() {
      const n = Object.keys(answers).length;
      $('fsScore').textContent = n ? T.score(Object.values(answers).filter(Boolean).length, n) : '';
    }
    $('fsKinds').addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (!b) return; kind = b.dataset.k; alt = 0; polButtons(); update(); });
    $('fsPol').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b) return; alt = +b.dataset.a; polButtons(); update(); });
    $('fsGap').addEventListener('input', e => { gap = +e.target.value; update(); });
    $('fsSortAgain').addEventListener('click', () => { answers = {}; sortList(); });
    polButtons(); sortList(); update();
    return { draw: update, tick: () => {}, animating: () => false };
  })();

  /* ════════════════ 3. ADD THE FORCES ════════════════ */
  const s3 = (function () {
    const p = panes[2];
    const PRESETS = [
      [40, 30, -35, -30],          // tug of war: two pull right, two pull left
      [45, -15],                   // trolley pushed right, friction left
      [25, 20],                    // two learners push the same way
      [30, 25, -60],               // two push a car, sand and friction resist
    ];
    p.innerHTML = `<h2>${T.s3Title}</h2><p class="fs-intro">${T.s3Intro}</p><div class="fs-predict">${T.s3Predict}</div>
      <div class="fs-btns" style="margin-bottom:14px"><span class="ctrl-label" style="align-self:center;margin:0 4px 0 0">${T.presets}:</span>${T.presetNames.map((n, i) => `<button type="button" class="fs-btn" data-p="${i}">${n}</button>`).join('')}</div>
      <div class="explore-top">
        <div class="sim-canvas-wrap"><canvas height="400" role="img" aria-label="${T.s3Title}"></canvas></div>
        <div class="controls">
          <div class="ctrl-card"><div id="fsList"></div>
            <div class="fs-btns"><button type="button" class="fs-btn" id="fsAdd">+ ${T.addForce}</button><button type="button" class="fs-btn" id="fsChal">${T.challenge}</button></div>
          </div>
          <div class="ctrl-card">
            <p class="ctrl-label" style="margin-bottom:6px">${T.sign}</p>
            <div class="fs-work" id="fsWork"></div>
            <div class="result-banner balanced" id="fsSum" role="status"></div>
            <p class="fs-note" id="fsGoal" style="margin-top:10px"></p>
          </div>
        </div>
      </div>`;
    const c = p.querySelector('canvas'), $ = id => p.querySelector('#' + id);
    // each force: d = +1 (right) or −1 (left), m = size in newtons
    const load = arr => arr.map(v => ({ d: v < 0 ? -1 : 1, m: Math.abs(v) }));
    let fs = load(PRESETS[0]), goal = null;
    const val = f => f.d * f.m;

    function list() {
      const box = $('fsList'); box.innerHTML = '';
      fs.forEach((f, i) => {
        const row = el('div', 'fs-force');
        row.innerHTML = `<span class="tag" style="color:${F1[i]}">${T.forceN(i + 1)}</span>
          <button type="button" class="fs-dir" aria-label="direction">${f.d < 0 ? '←' : '→'}</button>
          <input type="range" min="0" max="60" step="5" value="${f.m}" aria-label="${T.forceN(i + 1)}">
          <span class="slider-val">${f.m} N</span>
          <button type="button" class="fs-x" aria-label="${T.remove}">×</button>`;
        const [dir, rng, out, x] = [row.querySelector('.fs-dir'), row.querySelector('input'), row.querySelector('.slider-val'), row.querySelector('.fs-x')];
        dir.addEventListener('click', () => { f.d = -f.d; dir.textContent = f.d < 0 ? '←' : '→'; refresh(); });
        rng.addEventListener('input', () => { f.m = +rng.value; out.textContent = f.m + ' N'; refresh(); });
        x.addEventListener('click', () => { if (fs.length > 1) { fs.splice(i, 1); list(); refresh(); } });
        box.appendChild(row);
      });
      $('fsAdd').disabled = fs.length >= 4;
    }
    const total = () => fs.reduce((a, f) => a + val(f), 0);
    function refresh() {
      const sum = total(), mag = Math.abs(sum), d = sum > 0 ? T.toRight : T.toLeft;
      $('fsWork').textContent = fs.map(f => `(${f.d < 0 ? '−' : '+'}${f.m})`).join(' + ') + ` = ${sum < 0 ? '−' : sum > 0 ? '+' : ''}${mag} N`;
      const s = $('fsSum'); s.className = 'result-banner ' + (sum === 0 ? 'balanced' : sum > 0 ? 'right' : 'left'); s.textContent = T.resultIs(mag, d);
      const g = $('fsGoal');
      if (goal === null) g.textContent = '';
      else if (sum === goal) { g.innerHTML = `<strong style="color:#86efac">${T.solved}</strong>`; }
      else g.textContent = goal === 0 ? T.challengeZero : T.challengeTxt(Math.abs(goal), goal > 0 ? T.toRight : T.toLeft);
      draw();
    }
    function draw() {
      if (!c.offsetParent) return;
      const { ctx, w, h } = fitCanvas(c, 400);
      ctx.clearRect(0, 0, w, h);
      // top: the force diagram on the object
      label(ctx, T.diagTop, 14, 18, COL.muted, 'left');
      const cx = w / 2, by = 92, bw = 70, bh = 50;
      ctx.fillStyle = 'rgba(251,191,36,0.16)'; ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(cx - bw / 2, by - bh / 2, bw, bh, 7); ctx.fill(); ctx.stroke();
      const kTop = Math.min(2.2, (w / 2 - bw / 2 - 30) / 70);
      let rOff = -14, lOff = -14;
      fs.forEach((fo, i) => {
        const f = val(fo);
        if (f === 0) return;
        const right = f > 0, y = by + (right ? (rOff += 14) : (lOff += 14)) - 8;
        const x0 = right ? cx + bw / 2 + 3 : cx - bw / 2 - 3;
        arrow(ctx, x0, y, x0 + f * kTop, y, F1[i], 3);
        label(ctx, T.forceN(i + 1), x0 + f * kTop + (right ? 14 : -14), y, F1[i], 'center', '700 11px "JetBrains Mono", monospace');
      });
      // bottom: scale drawing on a grid, head to tail
      const top = 158;
      label(ctx, T.diagBottom, 14, top, COL.muted, 'left');
      label(ctx, T.scaleLbl, w - 14, top, COL.muted, 'right', '500 11px "JetBrains Mono", monospace');
      let run = 0, lo = 0, hi = 0;
      fs.forEach(f => { run += val(f); lo = Math.min(lo, run); hi = Math.max(hi, run); });
      const span = Math.max(60, Math.ceil(Math.max(-lo, hi) / 10) * 10 + 10);
      const unit = (w - 60) / (2 * span);           // pixels per newton
      const ox = w / 2, gy0 = top + 18, rows = fs.length + 1, rowH = Math.min(36, (h - gy0 - 30) / rows);
      // grid: a block every 5 N
      ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
      for (let n = -span; n <= span; n += 5) { const x = ox + n * unit; ctx.beginPath(); ctx.moveTo(x, gy0); ctx.lineTo(x, gy0 + rows * rowH); ctx.stroke(); }
      for (let r = 0; r <= rows; r++) { ctx.beginPath(); ctx.moveTo(30, gy0 + r * rowH); ctx.lineTo(w - 30, gy0 + r * rowH); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.beginPath(); ctx.moveTo(ox, gy0 - 4); ctx.lineTo(ox, gy0 + rows * rowH + 4); ctx.stroke();
      label(ctx, '0', ox, gy0 + rows * rowH + 14, COL.muted, 'center', '500 11px "JetBrains Mono", monospace');
      for (let n = -span + (span % 20); n <= span; n += 20) if (n !== 0) label(ctx, (n > 0 ? '+' : '') + n, ox + n * unit, gy0 + rows * rowH + 14, 'rgba(210,218,245,0.35)', 'center', '500 10px "JetBrains Mono", monospace');
      run = 0;
      fs.forEach((fo, i) => {
        const f = val(fo), y = gy0 + (i + 0.5) * rowH, x1 = ox + run * unit;
        run += f;
        const x2 = ox + run * unit;
        if (i > 0) { ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.beginPath(); ctx.moveTo(x1, y - rowH); ctx.lineTo(x1, y); ctx.stroke(); ctx.setLineDash([]); }
        if (f !== 0) arrow(ctx, x1, y, x2, y, F1[i], 4);
        label(ctx, T.forceN(i + 1), 34, y, F1[i], 'left', '700 11px "JetBrains Mono", monospace');
      });
      const ry = gy0 + (rows - 0.5) * rowH;
      ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.beginPath(); ctx.moveTo(ox + run * unit, gy0 + (rows - 1.5) * rowH); ctx.lineTo(ox + run * unit, ry); ctx.stroke(); ctx.setLineDash([]);
      if (run !== 0) arrow(ctx, ox, ry, ox + run * unit, ry, COL.res, 6);
      else { ctx.fillStyle = COL.res; ctx.beginPath(); ctx.arc(ox, ry, 5, 0, Math.PI * 2); ctx.fill(); }
      label(ctx, 'R', 34, ry, COL.res, 'left', '800 12px "JetBrains Mono", monospace');
    }
    p.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => {
      fs = load(PRESETS[+b.dataset.p]); goal = null;
      p.querySelectorAll('[data-p]').forEach(x => x.classList.toggle('on', x === b));
      list(); refresh();
    }));
    $('fsAdd').addEventListener('click', () => { if (fs.length < 4) { fs.push({ d: 1, m: 10 }); list(); refresh(); } });
    $('fsChal').addEventListener('click', () => {
      let g; do { g = (Math.floor(Math.random() * 13) - 6) * 5; } while (g === total());
      goal = g; refresh();
    });
    p.querySelector('[data-p="0"]').classList.add('on');
    list(); refresh();
    return { draw, tick: () => {}, animating: () => false };
  })();

  /* ── one animation loop, only while this tab and an animated sim are on screen ── */
  const sims = [s1, s2, s3];
  function loop(t) {
    if (root.offsetParent && sims[current].animating()) sims[current].tick(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  window.addEventListener('resize', () => sims[current].draw());
  window.ForceSims = { show: () => show(current) };
  show(0);
})();
