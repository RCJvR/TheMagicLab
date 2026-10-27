/* Seat Sorcerer: seating charts in the teacher dashboard (Classroom Tools,
   Seating tab). A layout is a grid of cells (a desk, floor, or the teacher's
   desk) with learners on the desks. Start from a template, then click or drag
   on the plan to change it. A class can keep several layouts (normal, exam,
   group work). Row 0 is the front of the room.
   Kept only in this browser (aa:seat-layouts); never sent anywhere.
   Depends on teacher-shared.js (window.MLT). */
(function () {
  'use strict';
  const M = window.MLT;
  if (!M || !M.$('st-grid')) return;
  const { $, el, store, toast, uid, str, today } = M;
  const MAX_C = 20, MAX_R = 14;

  // template: [default columns, default rows, (c, r, C, R) => desk here?]
  const TPL = {
    singles: [9, 6, c => c % 2 === 0],
    pairs: [11, 6, c => c % 3 !== 2],
    ushape: [10, 7, (c, r, C, R) => c === 0 || c === C - 1 || r === R - 1],
    groups4: [11, 8, (c, r) => c % 3 !== 2 && r % 3 !== 2],
    groups6: [11, 8, (c, r) => c % 4 !== 3 && r % 3 !== 2],
    lab: [9, 7, (c, r) => c !== 4 && r % 2 === 0],
    exam: [11, 9, (c, r) => c % 2 === 0 && r % 2 === 0],
    blank: [8, 6, () => false]
  };
  const TOOL_HINT = {
    arrange: 'Click a learner, then another desk to swap them. Click a name under "Not seated yet", then a desk, to seat them.',
    pin: 'Click a seated learner to fix them to that desk. Fixed seats keep their learner when you fill the desks again.',
    desk: 'Click or drag across the plan to add desks or take them away.',
    teacher: "Click a spot to put the teacher's desk there."
  };

  /* ── storage ── */
  function clean(L) {
    const cols = Math.max(2, Math.min(MAX_C, L.cols | 0)), rows = Math.max(2, Math.min(MAX_R, L.rows | 0)), n = cols * rows;
    let cells = String(L.cells || '').slice(0, n).replace(/[^.dt]/g, '.');
    cells = cells.padEnd(n, '.');
    const seats = {};
    Object.keys(L.seats || {}).forEach(i => { if (+i < n && cells[+i] === 'd' && typeof L.seats[i] === 'string') seats[+i] = L.seats[i]; });
    return { id: str(L.id, 20) || uid(), classId: str(L.classId, 20), name: str(L.name, 40) || 'Layout', cols, rows, cells, seats,
             pins: (Array.isArray(L.pins) ? L.pins : []).filter(i => seats[i] !== undefined), flip: !!L.flip };
  }
  let layouts = (store.get('seat-layouts', []) || []).slice(0, 80).map(clean);
  let pick = store.get('seat-current', {}) || {};
  const save = () => { store.set('seat-layouts', layouts); store.set('seat-current', pick); };
  const forClass = cls => layouts.filter(L => cls && L.classId === cls.id);

  function build(tpl, cols, rows) {
    const t = TPL[tpl] || TPL.pairs;
    let s = '';
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += t[2](c, r, cols, rows) ? 'd' : '.';
    return s;
  }
  // a first layout big enough for the class: pairs, as many rows as needed
  function starter(cls, name) {
    const perRow = 8, rows = Math.max(3, Math.min(MAX_R, Math.ceil((cls.learners.length || 24) / perRow)));
    return clean({ id: uid(), classId: cls.id, name: name || 'Normal', cols: 11, rows, cells: build('pairs', 11, rows) });
  }
  function current() {
    const cls = M.classes.current();
    if (!cls) return null;
    let list = forClass(cls), L = list.find(x => x.id === pick[cls.id]) || list[0];
    if (!L) { L = starter(cls); layouts.push(L); }
    pick[cls.id] = L.id;
    return L;
  }

  /* ── helpers ── */
  const at = (L, i) => [Math.floor(i / L.cols), i % L.cols];
  const near = (L, i, j) => { const [a, b] = at(L, i), [c, d] = at(L, j); return i !== j && Math.abs(a - c) <= 1 && Math.abs(b - d) <= 1; };
  const sideBySide = (L, i, j) => { const [a, b] = at(L, i), [c, d] = at(L, j); return a === c && Math.abs(b - d) === 1; };
  const desks = L => [...L.cells].map((v, i) => v === 'd' ? i : -1).filter(i => i >= 0);
  // "Surname, Name", or the last word with any prefixes before it, as the
  // Timetable Planner reads names: "Lara du Plessis" sorts under D
  const PREFIX = new Set(['van', 'der', 'den', 'de', 'du', 'le', 'la', 'von', 'ter', 'te', 'op', 'di', 'da', 'dos', 'mac', 'mc']);
  function surname(n) {
    if (n.includes(',')) return n.split(',')[0].trim().toLowerCase();
    const w = n.trim().split(/\s+/); let i = w.length - 1;
    while (i > 1 && PREFIX.has(w[i - 1].toLowerCase())) i--;
    return w.slice(i).join(' ').toLowerCase();
  }
  function rnd(n) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
  function shuffle(list) { const a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const absentToday = cls => { const d = ((store.get('attendance', {})[cls.id] || {})[today()]) || {}; return new Set(Object.keys(d).filter(n => d[n] === 'A')); };
  function apartBroken(L, rules) {
    const where = {}; Object.keys(L.seats).forEach(i => { where[L.seats[i]] = +i; });
    return rules.apart.filter(([a, b]) => where[a] !== undefined && where[b] !== undefined && near(L, where[a], where[b]));
  }

  /* ── filling the desks ── */
  function fill() {
    const cls = M.classes.current(), L = current();
    if (!cls || !cls.learners.length) return toast('Add a class list first');
    const all = desks(L);
    if (!all.length) return toast('Add some desks first');
    const fixed = {}; L.pins.forEach(i => { if (cls.learners.includes(L.seats[i])) fixed[i] = L.seats[i]; });
    let pool = cls.learners.filter(n => !Object.values(fixed).includes(n));
    if ($('st-skip').value === 'yes') { const ab = absentToday(cls); pool = pool.filter(n => !ab.has(n)); }
    const free = all.filter(i => fixed[i] === undefined);
    const rules = $('st-rules').value === 'yes' ? M.rules.get(cls) : { tags: {}, apart: [], together: [] };
    let seats;
    if ($('st-order').value === 'alpha') {
      // front left to back right, by surname
      seats = Object.assign({}, fixed);
      pool.slice().sort((a, b) => surname(a).localeCompare(surname(b)) || a.localeCompare(b)).forEach((n, k) => { if (k < free.length) seats[free[k]] = n; });
    } else {
      let best = null;
      for (let attempt = 0; attempt < 400; attempt++) {
        const s = Object.assign({}, fixed); let open = shuffle(free), left = shuffle(pool);
        // "keep together" pairs first, on two free desks side by side
        rules.together.forEach(([a, b]) => {
          if (!left.includes(a) || !left.includes(b)) return;
          const pairs = []; open.forEach(i => open.forEach(j => { if (i < j && sideBySide(L, i, j)) pairs.push([i, j]); }));
          if (!pairs.length) return;
          const [i, j] = pairs[rnd(pairs.length)];
          s[i] = a; s[j] = b; open = open.filter(x => x !== i && x !== j); left = left.filter(x => x !== a && x !== b);
        });
        left.forEach((n, k) => { if (k < open.length) s[open[k]] = n; });
        const broken = apartBroken({ cols: L.cols, seats: s }, rules).length;
        if (!best || broken < best.broken) best = { seats: s, broken };
        if (!broken) break;
      }
      seats = best.seats;
    }
    L.seats = seats; L.pins = Object.keys(fixed).map(Number);
    save(); render();
    const seated = Object.keys(seats).length, total = pool.length + Object.keys(fixed).length;
    if (seated < total) toast((total - seated) + ' learner' + (total - seated === 1 ? '' : 's') + ' still need a desk');
  }

  /* ── drawing the plan ── */
  let tool = 'arrange', sel = null, chip = null, focusPos = 0;
  function cellLabel(L, i) {
    const [r, c] = at(L, i), v = L.cells[i], who = L.seats[i];
    const where = 'Row ' + (r + 1) + ', place ' + (c + 1) + ': ';
    if (v === 't') return where + "teacher's desk";
    if (v !== 'd') return where + 'floor';
    return where + (who ? who + (L.pins.includes(i) ? ' (fixed seat)' : '') : 'empty desk');
  }
  function drawGrid(L, grid, front, readOnly) {
    grid.textContent = '';
    grid.style.gridTemplateColumns = 'repeat(' + L.cols + ', minmax(0, 1fr))';
    const n = L.cols * L.rows, broken = new Set();
    const cls = M.classes.current();
    if (cls) apartBroken(L, M.rules.get(cls)).forEach(([a, b]) => { broken.add(a); broken.add(b); });
    for (let p = 0; p < n; p++) {
      const i = L.flip ? n - 1 - p : p, v = L.cells[i], who = L.seats[i];
      const cell = el(readOnly ? 'div' : 'button', { class: 'aa-st-cell' + (v === 'd' ? ' desk' : v === 't' ? ' teacher' : '') +
        (L.pins.includes(i) ? ' pinned' : '') + (who && broken.has(who) ? ' clash' : '') + (!readOnly && sel === i ? ' sel' : ''),
        'data-i': i, 'aria-label': cellLabel(L, i), text: v === 't' ? 'Teacher' : (who || '') });
      if (!readOnly) { cell.type = 'button'; cell.tabIndex = p === focusPos ? 0 : -1; }
      else cell.setAttribute('role', 'img');
      grid.appendChild(cell);
    }
    // the front of the room sits above the plan, or below it when turned round
    front.parentNode.insertBefore(front, L.flip ? grid.nextSibling : grid);
    if (!readOnly) grid.setAttribute('role', 'group');
  }
  function render() {
    const cls = M.classes.current(), L = current();
    const lsel = $('st-layout'); lsel.textContent = '';
    if (!cls || !L) {
      lsel.appendChild(el('option', { value: '', text: 'Add a class list first' }));
      $('st-grid').textContent = ''; $('st-unseated-wrap').hidden = true; $('st-warn').textContent = '';
      return;
    }
    forClass(cls).forEach(x => lsel.appendChild(el('option', { value: x.id, text: x.name })));
    lsel.value = L.id;
    if (document.activeElement !== $('st-name')) $('st-name').value = L.name;
    $('st-cols').value = L.cols; $('st-rows').value = L.rows;
    $('st-turn').checked = L.flip;
    drawGrid(L, $('st-grid'), $('st-front'), false);
    const seatedNames = new Set(Object.values(L.seats)), ab = absentToday(cls);
    const unseated = cls.learners.filter(n => !seatedNames.has(n));
    $('st-unseated-wrap').hidden = !unseated.length;
    const box = $('st-unseated'); box.textContent = '';
    unseated.forEach(n => box.appendChild(el('button', { class: 'aa-st-chip' + (chip === n ? ' sel' : ''), type: 'button', 'aria-pressed': String(chip === n),
      text: n + (ab.has(n) ? ' (absent)' : ''), onclick: () => { chip = chip === n ? null : n; sel = null; render(); } })));
    const d = desks(L).length, broken = apartBroken(L, M.rules.get(cls)).length, warn = [];
    if (d < cls.learners.length) warn.push('This layout has ' + d + ' desks for ' + cls.learners.length + ' learners.');
    if (broken) warn.push(broken + (broken === 1 ? ' "keep apart" pair is' : ' "keep apart" pairs are') + ' seated next to each other (outlined in red).');
    $('st-warn').textContent = warn.join(' ');
    save();
  }

  /* ── editing ── */
  function setTool(t) {
    tool = t; sel = null; chip = null;
    document.querySelectorAll('.aa-st-tools [data-tool]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool === t)));
    $('st-toolhint').textContent = TOOL_HINT[t];
    render();
  }
  function setDesk(L, i, on) {
    if (on) { L.cells = L.cells.slice(0, i) + 'd' + L.cells.slice(i + 1); return; }
    L.cells = L.cells.slice(0, i) + '.' + L.cells.slice(i + 1);
    delete L.seats[i]; L.pins = L.pins.filter(x => x !== i);
  }
  function clickCell(i) {
    const L = current(); if (!L) return;
    const v = L.cells[i];
    if (tool === 'teacher') {
      L.cells = L.cells.replace(/t/g, '.');
      if (v !== 't') { delete L.seats[i]; L.pins = L.pins.filter(x => x !== i); L.cells = L.cells.slice(0, i) + 't' + L.cells.slice(i + 1); }
    } else if (tool === 'desk') {
      if (v === 't') return;
      setDesk(L, i, v !== 'd');
    } else if (tool === 'pin') {
      if (v !== 'd' || !L.seats[i]) return toast('Choose a desk with a learner on it');
      L.pins = L.pins.includes(i) ? L.pins.filter(x => x !== i) : L.pins.concat(i);
    } else { // arrange
      if (v !== 'd') return;
      if (chip) {
        L.seats[i] = chip; chip = null; L.pins = L.pins.filter(x => x !== i);   // whoever sat there goes back to "Not seated yet"
      } else if (sel === null) {
        if (!L.seats[i]) return toast('Click a learner first, or a name under "Not seated yet"');
        sel = i;
      } else if (sel === i) sel = null;
      else {
        const a = L.seats[sel], b = L.seats[i];
        if (b) L.seats[sel] = b; else delete L.seats[sel];
        L.seats[i] = a;
        L.pins = L.pins.filter(x => x !== sel && x !== i);   // a moved learner is no longer fixed
        sel = null;
      }
    }
    render();
  }
  const grid = $('st-grid');
  let painting = null;
  grid.addEventListener('pointerdown', e => {
    const c = e.target.closest('.aa-st-cell'); if (!c || tool !== 'desk') return;
    const L = current(), i = +c.dataset.i; if (L.cells[i] === 't') return;
    painting = L.cells[i] !== 'd';
    setDesk(L, i, painting); c.classList.toggle('desk', painting); c.textContent = '';
    grid.setPointerCapture(e.pointerId); e.preventDefault();
  });
  grid.addEventListener('pointermove', e => {
    if (painting === null) return;
    const hit = document.elementFromPoint(e.clientX, e.clientY), c = hit && hit.closest('.aa-st-cell');
    if (!c || !grid.contains(c)) return;
    const L = current(), i = +c.dataset.i;
    if (L.cells[i] === 't' || (L.cells[i] === 'd') === painting) return;
    setDesk(L, i, painting); c.classList.toggle('desk', painting); c.textContent = '';
  });
  const endPaint = () => { if (painting !== null) { painting = null; render(); } };
  grid.addEventListener('pointerup', endPaint); grid.addEventListener('pointercancel', endPaint);
  grid.addEventListener('click', e => {
    const c = e.target.closest('.aa-st-cell'); if (!c) return;
    focusPos = [...grid.children].indexOf(c);
    if (tool === 'desk' && e.detail !== 0) return;   // the mouse already painted it; keyboard clicks have detail 0
    clickCell(+c.dataset.i);
    const again = grid.children[focusPos]; if (again) again.focus();
  });
  // arrow keys move round the plan; one cell at a time is in the tab order
  grid.addEventListener('keydown', e => {
    const L = current(), moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -L.cols, ArrowDown: L.cols };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const n = grid.children.length, p = Math.max(0, Math.min(n - 1, focusPos + moves[e.key]));
    [...grid.children].forEach((c, k) => { c.tabIndex = k === p ? 0 : -1; });
    focusPos = p; grid.children[p].focus();
  });

  /* ── layouts ── */
  $('st-layout').addEventListener('change', () => { const cls = M.classes.current(); if (cls) { pick[cls.id] = $('st-layout').value; sel = chip = null; render(); } });
  $('st-name').addEventListener('input', () => { const L = current(); if (L) { L.name = $('st-name').value.slice(0, 40) || 'Layout'; save(); [...$('st-layout').options].forEach(o => { if (o.value === L.id) o.textContent = L.name; }); } });
  $('st-new').addEventListener('click', () => {
    const cls = M.classes.current(); if (!cls) return toast('Add a class list first');
    const L = starter(cls, 'Layout ' + (forClass(cls).length + 1)); layouts.push(L); pick[cls.id] = L.id;
    render(); $('st-room').open = true; $('st-name').focus(); $('st-name').select();
  });
  $('st-dup').addEventListener('click', () => {
    const L = current(); if (!L) return;
    const copy = clean(JSON.parse(JSON.stringify(L))); copy.id = uid(); copy.name = (L.name + ' (copy)').slice(0, 40);
    layouts.push(copy); pick[L.classId] = copy.id; render();
  });
  $('st-del').addEventListener('click', () => {
    const L = current(); if (!L || !confirm('Delete the layout "' + L.name + '"?')) return;
    layouts = layouts.filter(x => x.id !== L.id); delete pick[L.classId]; render();
  });
  $('st-tpl').addEventListener('change', () => { const t = TPL[$('st-tpl').value]; $('st-cols').value = t[0]; $('st-rows').value = t[1]; });
  $('st-apply').addEventListener('click', () => {
    const L = current(); if (!L) return toast('Add a class list first');
    if (Object.keys(L.seats).length && !confirm('Start this layout again? The desks are replaced and everyone will need a seat again.')) return;
    L.cols = Math.max(2, Math.min(MAX_C, parseInt($('st-cols').value, 10) || 8));
    L.rows = Math.max(2, Math.min(MAX_R, parseInt($('st-rows').value, 10) || 6));
    L.cells = build($('st-tpl').value, L.cols, L.rows); L.seats = {}; L.pins = []; sel = chip = null; focusPos = 0;
    render(); toast(desks(L).length + ' desks');
  });
  $('st-turn').addEventListener('change', () => { const L = current(); if (L) { L.flip = $('st-turn').checked; render(); } });
  document.querySelectorAll('.aa-st-tools [data-tool]').forEach(b => b.addEventListener('click', () => setTool(b.dataset.tool)));
  $('st-fill').addEventListener('click', fill);
  $('st-clear').addEventListener('click', () => {
    const L = current(); if (!L) return;
    const keep = {}; L.pins.forEach(i => { keep[i] = L.seats[i]; });
    L.seats = keep; sel = chip = null; render();
    if (L.pins.length) toast('Names cleared. Fixed seats were kept.');
  });
  $('st-tags').addEventListener('click', () => M.rules.manage());
  $('st-manage').addEventListener('click', () => M.classes.manage());

  /* ── big screen and print ── */
  $('st-big').addEventListener('click', () => {
    const L = current(), cls = M.classes.current(); if (!L) return;
    const front = el('div', { class: 'aa-st-front', text: 'Front of the class' }), g = el('div', { class: 'aa-st-grid' });
    const wrap = el('div', { class: 'aa-st-bigwrap' }, [front, g]);
    drawGrid(L, g, front, true);
    M.bigScreen('Seating plan — ' + cls.name + ' · ' + L.name, [wrap]);
  });
  $('st-print').addEventListener('click', () => {
    const L = current(), cls = M.classes.current(); if (!L) return;
    M.printDoc(pa => {
      pa.appendChild(el('h1', { class: 'aa-pr-h', text: 'Seating plan — ' + cls.name }));
      pa.appendChild(el('div', { class: 'aa-pr-sub', text: L.name + ' · ' + new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) }));
      const front = el('div', { class: 'aa-pr-front', text: 'Front of the class' }), t = el('table', { class: 'aa-pr-seat' }), tb = el('tbody');
      const n = L.cols * L.rows;
      for (let r = 0; r < L.rows; r++) {
        const tr = el('tr');
        for (let c = 0; c < L.cols; c++) {
          const p = r * L.cols + c, i = L.flip ? n - 1 - p : p, v = L.cells[i];
          tr.appendChild(el('td', { class: v === 'd' ? 'd' : v === 't' ? 't' : '', text: v === 't' ? 'Teacher' : (L.seats[i] || '') }));
        }
        tb.appendChild(tr);
      }
      t.appendChild(tb);
      if (L.flip) { pa.appendChild(t); pa.appendChild(front); } else { pa.appendChild(front); pa.appendChild(t); }
    }, { landscape: true, font: L.cols > 12 ? 8 : 10 });
  });

  M.classes.bind($('st-class'), () => { sel = chip = null; render(); });
  $('st-toolhint').textContent = TOOL_HINT[tool];
  const t0 = TPL[$('st-tpl').value]; if (t0) { $('st-cols').value = t0[0]; $('st-rows').value = t0[1]; }
  render();
})();
