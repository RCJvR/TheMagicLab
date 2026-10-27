/* Teacher classroom tools: random picker and groups, timer, attendance and
   behaviour log, assessment programme tracker.
   Learner information stays in this browser's localStorage (aa:*) and is never
   sent anywhere. Depends on teacher-shared.js (window.MLT). */
(function () {
  'use strict';
  const M = window.MLT;
  if (!M) return;
  const { $, el, store, toast, copy, uid, str, today, csv, capsLevel } = M;
  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  const sameClass = c => c && c.learners.length;

  // sub-tab switcher scoped to one tab panel
  function subTabs(rootId, onShow) {
    const root = $(rootId);
    const show = name => {
      root.querySelectorAll('.aa-subtab').forEach(b => { const on = b.dataset.sub === name; b.classList.toggle('active', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      root.querySelectorAll('.aa-subpanel').forEach(p => { p.hidden = p.id !== rootId + '-' + name; });
      if (onShow) onShow(name);
    };
    root.querySelectorAll('.aa-subtab').forEach(b => b.addEventListener('click', () => show(b.dataset.sub)));
    return show;
  }
  function wireClass(selId, manageId, render) {
    M.classes.bind($(selId), render);
    $(manageId).addEventListener('click', () => M.classes.manage());
  }
  const todayAbsent = cls => {
    const day = ((store.get('attendance', {})[cls.id] || {})[today()]) || {};
    return new Set(Object.keys(day).filter(n => day[n] === 'A'));
  };
  // uniform random integer without modulo bias
  function rnd(n) {
    const a = new Uint32Array(1), lim = Math.floor(0x100000000 / n) * n;
    do { crypto.getRandomValues(a); } while (a[0] >= lim);
    return a[0] % n;
  }
  function shuffle(list) { const a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ═══════════ CLASSROOM TOOLS: picker, groups, timer (seating: teacher-seating.js) ═══════════ */
  subTabs('tab-classroom');

  // ── random picker ──
  let used = new Set(), pickClass = null;
  function pickerPool(cls) {
    let pool = cls.learners.slice();
    if ($('pk-skip').value === 'yes') { const ab = todayAbsent(cls); pool = pool.filter(n => !ab.has(n)); }
    return pool;
  }
  function renderPicker() {
    const cls = M.classes.current();
    if (!cls || cls.id !== pickClass) { used = new Set(); pickClass = cls ? cls.id : null; $('pk-name').textContent = '—'; }
    if (!sameClass(cls)) { $('pk-left').textContent = 'Add a class list to start.'; return; }
    const pool = pickerPool(cls);
    const left = $('pk-norepeat').value === 'yes' ? pool.filter(n => !used.has(n)).length : pool.length;
    $('pk-left').textContent = left + ' of ' + pool.length + ' still to be picked' + ($('pk-skip').value === 'yes' ? ' (absent learners left out)' : '');
  }
  $('pk-go').addEventListener('click', () => {
    const cls = M.classes.current();
    if (!sameClass(cls)) return toast('Add a class list first');
    let pool = pickerPool(cls);
    if (!pool.length) return toast('Nobody to pick from');
    if ($('pk-norepeat').value === 'yes') {
      let fresh = pool.filter(n => !used.has(n));
      if (!fresh.length) { used = new Set(); fresh = pool; toast('Everyone has had a turn. Starting again.'); }
      pool = fresh;
    }
    const winner = pool[rnd(pool.length)];
    used.add(winner);
    // Spin: names flick past fast, then slow down and land, about 2.5 s in all.
    // "Straight away", or reduced motion, shows the answer at once.
    const out = $('pk-name'), reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || $('pk-spin').value === 'quick' || pool.length < 2) { out.textContent = winner; out.classList.remove('aa-spinning'); renderPicker(); return; }
    $('pk-go').disabled = true; out.classList.add('aa-spinning');
    const STEPS = 24; let t = 0, last = '';
    const tick = () => {
      if (t++ >= STEPS) { out.textContent = winner; out.classList.remove('aa-spinning'); $('pk-go').disabled = false; renderPicker(); return; }
      let n; do { n = pool[rnd(pool.length)]; } while (n === last && pool.length > 1);
      out.textContent = last = n;
      const k = t / STEPS;
      setTimeout(tick, 45 + 330 * k * k * k);   // ease out: the gaps grow towards the end
    };
    tick();
  });
  $('pk-big').addEventListener('click', () => {
    const cls = M.classes.current();
    M.bigScreen('Random picker' + (cls ? ' — ' + cls.name : ''), [$('pk-area')]);
    $('pk-go').focus();
  });
  $('pk-reset').addEventListener('click', () => { used = new Set(); $('pk-name').textContent = '—'; renderPicker(); });
  ['pk-skip', 'pk-norepeat'].forEach(id => $(id).addEventListener('change', renderPicker));
  wireClass('pk-class', 'pk-manage', renderPicker);
  // attendance may have changed since the picker was last on screen
  document.querySelector('.tab-btn[data-tab="classroom"]').addEventListener('click', renderPicker);

  // ── groups ──
  let lastGroups = [];
  function renderGroups() {
    const out = $('gr-out'); out.textContent = '';
    if (!lastGroups.length) { out.appendChild(el('div', { class: 'aa-empty-hint', text: 'Choose how to split the class, then press Make groups.' })); return; }
    lastGroups.forEach((g, i) => out.appendChild(el('div', { class: 'aa-group' }, [
      el('div', { class: 'aa-group-h', text: 'Group ' + (i + 1) + ' · ' + g.length }),
      el('div', { text: g.join('\n'), style: 'white-space:pre-wrap' })
    ])));
  }
  // Learners joined by "keep together" travel as one cluster. Clusters with
  // the chosen tag are dealt first, each to the group with fewest of that tag;
  // the rest go to the groups with most room. Every placement avoids a group
  // holding a "keep apart" partner when it can. Many random tries; the best
  // (fewest broken rules, then most even) wins.
  function makeGroups(pool, count, rules, tag) {
    const parent = new Map(pool.map(n => [n, n]));
    const find = n => parent.get(n) === n ? n : find(parent.get(n));
    if (rules) rules.together.forEach(([a, b]) => { if (parent.has(a) && parent.has(b)) parent.set(find(a), find(b)); });
    const byRoot = new Map(); pool.forEach(n => { const r = find(n); if (!byRoot.has(r)) byRoot.set(r, []); byRoot.get(r).push(n); });
    const clusters = [...byRoot.values()];
    const apart = new Map();
    if (rules) rules.apart.forEach(([a, b]) => { (apart.get(a) || apart.set(a, new Set()).get(a)).add(b); (apart.get(b) || apart.set(b, new Set()).get(b)).add(a); });
    const hasTag = n => tag && rules && (rules.tags[n] || []).includes(tag);
    const cap = Math.ceil(pool.length / count);
    let best = null;
    for (let attempt = 0; attempt < 300; attempt++) {
      const groups = Array.from({ length: count }, () => []), tagN = new Array(count).fill(0);
      const clash = (g, cl) => cl.reduce((s, n) => s + groups[g].filter(m => apart.has(n) && apart.get(n).has(m)).length, 0);
      const order = shuffle(clusters).sort((a, b) => (b.some(hasTag) - a.some(hasTag)) || (b.length - a.length));
      order.forEach(cl => {
        const tagged = cl.some(hasTag);
        const ranked = shuffle(groups.map((_, i) => i)).sort((x, y) =>
          (clash(x, cl) - clash(y, cl)) ||
          ((groups[x].length + cl.length > cap) - (groups[y].length + cl.length > cap)) ||
          (tagged ? tagN[x] - tagN[y] : 0) ||
          (groups[x].length - groups[y].length));
        const g = ranked[0];
        groups[g].push(...cl); if (tagged) tagN[g] += cl.filter(hasTag).length;
      });
      const broken = groups.reduce((s, g) => s + g.reduce((t, n) => t + g.filter(m => apart.has(n) && apart.get(n).has(m)).length, 0), 0) / 2;
      const sizes = groups.map(g => g.length), spread = Math.max(...sizes) - Math.min(...sizes);
      const tagSpread = tag ? Math.max(...tagN) - Math.min(...tagN) : 0;
      const score = broken * 1000 + Math.max(0, spread - 1) * 10 + Math.max(0, tagSpread - 1);
      if (!best || score < best.score) best = { groups: groups.filter(g => g.length), broken, score };
      if (score === 0) break;
    }
    return best;
  }
  function fillBalance(cls) {
    const sel = $('gr-balance'), keep = sel.value;
    sel.textContent = '';
    sel.appendChild(el('option', { value: '', text: 'Nothing in particular' }));
    if (cls) M.rules.tags(M.rules.get(cls)).forEach(t => sel.appendChild(el('option', { value: t, text: 'Tag: ' + t })));
    sel.value = [...sel.options].some(o => o.value === keep) ? keep : '';
  }
  $('gr-go').addEventListener('click', () => {
    const cls = M.classes.current();
    if (!sameClass(cls)) return toast('Add a class list first');
    let pool = cls.learners.slice();
    if ($('gr-skip').value === 'yes') { const ab = todayAbsent(cls); pool = pool.filter(n => !ab.has(n)); }
    if (!pool.length) return toast('Nobody to put in groups');
    const n = Math.max(1, Math.min(50, parseInt($('gr-n').value, 10) || 1));
    const count = $('gr-mode').value === 'count' ? Math.min(n, pool.length) : Math.ceil(pool.length / n);
    const rules = $('gr-rules').value === 'yes' || $('gr-balance').value ? M.rules.get(cls) : null;
    const res = makeGroups(pool, count, $('gr-rules').value === 'yes' ? rules : (rules && { tags: rules.tags, apart: [], together: [] }), $('gr-balance').value);
    lastGroups = res.groups;
    $('gr-warn').textContent = res.broken ? res.broken + (res.broken === 1 ? ' "keep apart" pair' : ' "keep apart" pairs') + ' had to share a group. Try more groups, or press Make groups again.' : '';
    renderGroups();
  });
  $('gr-big').addEventListener('click', () => {
    if (!lastGroups.length) return toast('Make groups first');
    const cls = M.classes.current();
    M.bigScreen('Groups' + (cls ? ' — ' + cls.name : ''), [$('gr-out')], [el('button', { class: 'aa-btn aa-btn--primary', type: 'button', text: 'Make groups again', onclick: () => $('gr-go').click() })]);
  });
  $('gr-tags').addEventListener('click', () => M.rules.manage());
  $('gr-copy').addEventListener('click', () => lastGroups.length ? copy(lastGroups.map((g, i) => 'Group ' + (i + 1) + '\n' + g.join('\n')).join('\n\n')) : toast('Make groups first'));
  $('gr-print').addEventListener('click', () => {
    if (!lastGroups.length) return toast('Make groups first');
    const cls = M.classes.current();
    M.printDoc(pa => {
      pa.appendChild(el('h1', { class: 'aa-pr-h', text: 'Groups' + (cls ? ' — ' + cls.name : '') }));
      const wrap = el('div', { class: 'aa-pr-groups' });
      lastGroups.forEach((g, i) => wrap.appendChild(el('div', { class: 'aa-pr-group' }, [el('div', { class: 'aa-pr-gh', text: 'Group ' + (i + 1) }), el('div', { text: g.join('\n'), style: 'white-space:pre-wrap' })])));
      pa.appendChild(wrap);
    });
  });
  wireClass('gr-class', 'gr-manage', cls => { lastGroups = []; $('gr-warn').textContent = ''; fillBalance(cls); renderGroups(); });
  renderGroups();

  // ── timer: Timer Talisman ──
  // A quick countdown opens the timer in a new tab, filling the screen. The
  // link uses Timer Talisman's short form: "j" + base64url of the settings
  // that differ from its defaults (a countdown is the default type).
  function talismanLink(secs) {
    const cfg = { cd: { secs }, look: { fit: true } }, title = $('tm-label').value.trim();
    if (title) cfg.title = title;
    const bytes = new TextEncoder().encode(JSON.stringify(cfg));
    let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); });
    return 'timer-talisman-display.html#j' + btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  [1, 2, 3, 5, 10, 15, 20, 30, 45, 60].forEach(m => $('tm-quick').appendChild(el('button', { class: 'aa-btn aa-btn--sm', type: 'button', text: m + ' min',
    onclick: () => window.open(talismanLink(m * 60), '_blank', 'noopener') })));

  /* ═══════════ CLASS LOG: attendance + behaviour ═══════════ */
  const showLog = subTabs('tab-log', name => { if (name === 'attendance') renderAttendance(); else renderBehaviour(); });

  // ── attendance ──
  const att = () => store.get('attendance', {});
  const STATUS = { P: 'Present', A: 'Absent', L: 'Late' };
  function renderAttendance() {
    const cls = M.classes.current(), list = $('at-list'), sum = $('at-summary');
    list.textContent = ''; sum.textContent = '';
    if (!sameClass(cls)) { list.appendChild(el('div', { class: 'aa-empty-hint', text: 'Add a class list first (Manage class lists).' })); return; }
    const date = DATE_RE.test($('at-date').value) ? $('at-date').value : today();
    const day = ((att()[cls.id] || {})[date]) || {};
    cls.learners.forEach((name, i) => {
      const row = el('div', { class: 'aa-att-row' }, [el('div', { class: 'aa-att-name', text: name })]);
      const g = el('div', { class: 'aa-att-opts', role: 'radiogroup', 'aria-label': name + ' attendance on ' + date });
      Object.entries(STATUS).forEach(([k, label]) => {
        const id = 'at-' + i + '-' + k;
        const inp = el('input', { type: 'radio', name: 'at-' + i, id, value: k });
        if (day[name] === k) inp.checked = true;
        inp.addEventListener('change', () => { const a = att(); ((a[cls.id] = a[cls.id] || {})[date] = a[cls.id][date] || {})[name] = k; store.set('attendance', a); renderAttSummary(); });
        g.appendChild(el('label', { class: 'aa-chip aa-chip--' + k, for: id }, [inp, el('span', { text: label })]));
      });
      row.appendChild(g); list.appendChild(row);
    });
    renderAttSummary();
  }
  function attStats(cls) {
    const days = att()[cls.id] || {};
    return cls.learners.map(n => {
      let P = 0, A = 0, L = 0;
      Object.values(days).forEach(d => { if (d[n] === 'P') P++; else if (d[n] === 'A') A++; else if (d[n] === 'L') L++; });
      const rec = P + A + L;
      return { n, P, A, L, rec, pct: rec ? Math.round((P + L) / rec * 100) : null };
    });
  }
  function renderAttSummary() {
    const cls = M.classes.current(), t = $('at-summary'); t.textContent = '';
    if (!sameClass(cls)) return;
    t.appendChild(el('tr', {}, ['Learner', 'Present', 'Late', 'Absent', 'Days recorded', 'Attendance'].map(h => el('th', { text: h }))));
    attStats(cls).forEach(s => t.appendChild(el('tr', { class: s.pct != null && s.pct < 90 ? 'aa-low' : '' }, [
      el('td', { text: s.n }), el('td', { text: String(s.P) }), el('td', { text: String(s.L) }), el('td', { text: String(s.A) }), el('td', { text: String(s.rec) }),
      el('td', { text: s.pct == null ? '' : s.pct + '%' + (s.pct < 90 ? ' (below 90%)' : '') })
    ])));
  }
  $('at-date').value = today();
  $('at-date').addEventListener('change', renderAttendance);
  $('at-allp').addEventListener('click', () => {
    const cls = M.classes.current(); if (!sameClass(cls)) return;
    const date = DATE_RE.test($('at-date').value) ? $('at-date').value : today();
    const a = att(); const day = ((a[cls.id] = a[cls.id] || {})[date] = a[cls.id][date] || {});
    cls.learners.forEach(n => { if (!day[n]) day[n] = 'P'; });
    store.set('attendance', a); renderAttendance();
  });
  $('at-copy').addEventListener('click', () => { const cls = M.classes.current(); if (!sameClass(cls)) return; copy(csv([['Learner', 'Present', 'Late', 'Absent', 'Days recorded', 'Attendance %']].concat(attStats(cls).map(s => [s.n, s.P, s.L, s.A, s.rec, s.pct == null ? '' : s.pct])))); });
  $('at-print').addEventListener('click', () => {
    const cls = M.classes.current(); if (!sameClass(cls)) return;
    M.printDoc(pa => {
      pa.appendChild(el('h1', { class: 'aa-pr-h', text: 'Attendance summary — ' + cls.name }));
      const t = el('table', {}, [el('tr', {}, ['Learner', 'Present', 'Late', 'Absent', 'Days', '%'].map(h => el('th', { text: h })))]);
      attStats(cls).forEach(s => t.appendChild(el('tr', {}, [el('td', { text: s.n }), el('td', { text: String(s.P) }), el('td', { text: String(s.L) }), el('td', { text: String(s.A) }), el('td', { text: String(s.rec) }), el('td', { text: s.pct == null ? '' : s.pct + '%' })])));
      pa.appendChild(t);
    });
  });
  wireClass('at-class', 'at-manage', renderAttendance);

  // ── behaviour ──
  const beh = () => store.get('behaviour', []);
  const KINDS = { positive: 'Positive', concern: 'Concern', incident: 'Incident' };
  function fillBehLearners() {
    const cls = M.classes.current(), s = $('bh-learner'), f = $('bh-filter');
    const keepS = s.value, keepF = f.value;
    s.textContent = ''; f.textContent = '';
    f.appendChild(el('option', { value: '', text: 'All learners' }));
    (cls ? cls.learners : []).forEach(n => { s.appendChild(el('option', { value: n, text: n })); f.appendChild(el('option', { value: n, text: n })); });
    if (cls && cls.learners.includes(keepS)) s.value = keepS;
    if (cls && cls.learners.includes(keepF)) f.value = keepF;
  }
  function renderBehaviour() {
    fillBehLearners();
    const cls = M.classes.current(), host = $('bh-list'); host.textContent = '';
    if (!sameClass(cls)) { host.appendChild(el('div', { class: 'aa-empty-hint', text: 'Add a class list first (Manage class lists).' })); return; }
    const who = $('bh-filter').value;
    const rows = beh().filter(b => b.classId === cls.id && (!who || b.learner === who)).sort((a, b) => b.date.localeCompare(a.date));
    const pos = rows.filter(b => b.kind === 'positive').length;
    $('bh-count').textContent = rows.length ? rows.length + ' entries · ' + pos + ' positive · ' + (rows.length - pos) + ' concern or incident' : 'No entries yet.';
    rows.forEach(b => host.appendChild(el('div', { class: 'aa-list-item' }, [
      el('div', { class: 'aa-who', text: b.date + ' · ' + b.learner + ' · ' + (KINDS[b.kind] || b.kind) + (b.cat ? ' · ' + b.cat : '') }),
      el('div', { class: 'aa-txt', text: b.note + (b.action ? '\nAction taken: ' + b.action : '') }),
      el('div', { class: 'aa-actions' }, [el('button', { class: 'aa-btn aa-btn--sm', type: 'button', text: 'Delete', onclick: () => { if (!confirm('Delete this entry?')) return; store.set('behaviour', beh().filter(x => x.id !== b.id)); renderBehaviour(); } })])
    ])));
  }
  $('bh-date').value = today();
  $('bh-add').addEventListener('click', () => {
    const cls = M.classes.current(); if (!sameClass(cls)) return toast('Add a class list first');
    const learner = $('bh-learner').value, note = $('bh-note').value.trim();
    if (!learner) return toast('Choose a learner');
    if (!note) return toast('Write what happened');
    const date = DATE_RE.test($('bh-date').value) ? $('bh-date').value : today();
    const all = beh(); all.push({ id: uid(), classId: cls.id, learner, date, kind: $('bh-kind').value, cat: $('bh-cat').value, note: note.slice(0, 1000), action: $('bh-action').value.trim().slice(0, 500) });
    store.set('behaviour', all.slice(-5000));
    $('bh-note').value = ''; $('bh-action').value = ''; renderBehaviour(); toast('Entry added');
  });
  $('bh-filter').addEventListener('change', renderBehaviour);
  $('bh-copy').addEventListener('click', () => {
    const cls = M.classes.current(); if (!sameClass(cls)) return;
    const who = $('bh-filter').value;
    const rows = beh().filter(b => b.classId === cls.id && (!who || b.learner === who)).sort((a, b) => a.date.localeCompare(b.date));
    copy(csv([['Date', 'Learner', 'Type', 'Category', 'What happened', 'Action taken']].concat(rows.map(b => [b.date, b.learner, KINDS[b.kind] || b.kind, b.cat, b.note, b.action]))));
  });
  wireClass('bh-class', 'bh-manage', renderBehaviour);

  // ── log file save / open / wipe ──
  $('lg-save-file').addEventListener('click', () => M.downloadJson('class-log', 'class-log', { classes: M.classes.all(), attendance: att(), behaviour: beh() }));
  M.wireOpen('lg-open-file', 'lg-open-input', 'class-log', data => {
    if (!data || typeof data !== 'object') return toast('That file is not a saved class log');
    const classes = M.classes.cleanClasses(data.classes), ids = new Set(classes.map(c => c.id));
    const attendance = {};
    Object.entries(data.attendance && typeof data.attendance === 'object' ? data.attendance : {}).forEach(([cid, days]) => {
      if (!ids.has(cid) || !days || typeof days !== 'object') return;
      Object.entries(days).forEach(([d, m]) => {
        if (!DATE_RE.test(d) || !m || typeof m !== 'object') return;
        Object.entries(m).forEach(([n, v]) => { if (STATUS[v]) { ((attendance[cid] = attendance[cid] || {})[d] = attendance[cid][d] || {})[str(n, 80)] = v; } });
      });
    });
    const behaviour = (Array.isArray(data.behaviour) ? data.behaviour : []).slice(0, 5000).filter(b => b && ids.has(b.classId) && DATE_RE.test(b.date) && str(b.note, 1).length).map(b => ({
      id: str(b.id, 20) || uid(), classId: b.classId, learner: str(b.learner, 80), date: b.date, kind: KINDS[b.kind] ? b.kind : 'concern', cat: str(b.cat, 40), note: str(b.note, 1000), action: str(b.action, 500)
    }));
    if (!confirm('Replace the class lists, attendance and behaviour entries in this browser with this file?')) return;
    M.classes.replaceAll(classes); store.set('attendance', attendance); store.set('behaviour', behaviour);
    renderAttendance(); renderBehaviour(); toast('Class log opened');
  });
  $('lg-wipe').addEventListener('click', () => {
    if (!confirm('Delete ALL attendance and behaviour entries stored in this browser? Class lists are kept. This cannot be undone.')) return;
    store.del('attendance'); store.del('behaviour'); renderAttendance(); renderBehaviour(); toast('Class log cleared');
  });

  /* ═══════════ ASSESSMENT TRACKER ═══════════ */
  const trAll = () => store.get('tracker', {});
  const trFor = (all, cid) => (all[cid] = all[cid] && Array.isArray(all[cid].tasks) ? all[cid] : { tasks: [], marks: {} });
  const TYPES = ['Test', 'Exam', 'Practical', 'Project', 'Assignment', 'Oral', 'Other'];
  const showTr = subTabs('tab-tracker', name => { if (name === 'marks') renderTrMarks(); else renderTrTasks(); });
  let trEdit = null;

  function renderTrTasks() {
    const cls = M.classes.current(), host = $('tk-list'), up = $('tk-up');
    host.textContent = ''; up.textContent = '';
    if (!cls) { host.appendChild(el('div', { class: 'aa-empty-hint', text: 'Create a class first (Manage class lists). Each class has its own programme.' })); return; }
    const data = trFor(trAll(), cls.id), tasks = data.tasks.slice();
    const totalW = tasks.reduce((a, t) => a + t.weight, 0);
    $('tk-weight-sum').textContent = 'Weighting so far: ' + totalW + '% of the year mark' + (totalW === 100 ? '' : totalW > 100 ? ' (over 100%)' : ' (' + (100 - totalW) + '% still to allocate)');
    $('tk-weight-sum').className = 'aa-total ' + (totalW === 100 ? 'aa-ok' : totalW > 100 ? 'aa-bad' : 'aa-warn');
    // coming up / needs marking
    const t0 = today();
    const marked = t => Object.values(data.marks).some(m => m && m[t.id] != null);
    const soon = tasks.filter(t => t.date && t.date >= t0 && !marked(t)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
    const late = tasks.filter(t => t.date && t.date < t0 && !marked(t));
    if (late.length) up.appendChild(el('div', { class: 'aa-up aa-up--late' }, [el('b', { text: 'Date passed, no marks entered: ' }), document.createTextNode(late.map(t => t.name + ' (' + t.date + ')').join('; '))]));
    if (soon.length) up.appendChild(el('div', { class: 'aa-up' }, [el('b', { text: 'Coming up: ' }), document.createTextNode(soon.map(t => t.name + ' (' + t.date + ')').join('; '))]));
    [1, 2, 3, 4].forEach(term => {
      const ts = tasks.filter(t => t.term === term).sort((a, b) => (a.date || '9').localeCompare(b.date || '9'));
      const card = el('div', { class: 'aa-card' }, [el('div', { class: 'aa-sec-no', text: 'TERM ' + term + ' · ' + ts.reduce((a, t) => a + t.weight, 0) + '% OF YEAR · ' + ts.length + ' TASK' + (ts.length === 1 ? '' : 'S') })]);
      if (!ts.length) card.appendChild(el('div', { class: 'aa-empty-hint', text: 'No tasks yet.' }));
      ts.forEach(t => card.appendChild(el('div', { class: 'aa-list-item' }, [
        el('div', { class: 'aa-who', text: t.name + ' · ' + t.type }),
        el('div', { class: 'aa-txt', text: [t.date || 'no date', 'out of ' + t.total, t.weight + '% of the year'].join(' · ') }),
        el('div', { class: 'aa-actions' }, [
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', text: 'Edit', onclick: () => editTask(t.id) }),
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', text: 'Remove', onclick: () => {
            if (!confirm('Remove "' + t.name + '" and any marks entered for it?')) return;
            const a = trAll(), d = trFor(a, cls.id); d.tasks = d.tasks.filter(x => x.id !== t.id); Object.values(d.marks).forEach(m => { if (m) delete m[t.id]; }); store.set('tracker', a); renderTrTasks();
          } })
        ])
      ])));
      host.appendChild(card);
    });
  }
  function resetTaskForm() { trEdit = null; $('tk-name').value = ''; $('tk-date').value = ''; $('tk-total').value = 50; $('tk-weight').value = 10; $('tk-add').textContent = 'Add task'; $('tk-cancel').hidden = true; }
  function editTask(id) {
    const cls = M.classes.current(); if (!cls) return;
    const t = trFor(trAll(), cls.id).tasks.find(x => x.id === id); if (!t) return;
    trEdit = id; $('tk-term').value = String(t.term); $('tk-name').value = t.name; $('tk-type').value = t.type; $('tk-date').value = t.date || ''; $('tk-total').value = t.total; $('tk-weight').value = t.weight;
    $('tk-add').textContent = 'Save task'; $('tk-cancel').hidden = false; $('tk-name').focus();
  }
  $('tk-cancel').addEventListener('click', resetTaskForm);
  $('tk-add').addEventListener('click', () => {
    const cls = M.classes.current(); if (!cls) return toast('Create a class first');
    const name = $('tk-name').value.trim(); if (!name) return toast('Give the task a name');
    const total = parseFloat($('tk-total').value), weight = parseFloat($('tk-weight').value);
    if (!(total > 0)) return toast('Total marks must be more than 0');
    if (!(weight >= 0 && weight <= 100)) return toast('Weighting must be between 0 and 100');
    const task = { id: trEdit || uid(), term: +$('tk-term').value, name: name.slice(0, 120), type: $('tk-type').value, date: DATE_RE.test($('tk-date').value) ? $('tk-date').value : '', total, weight };
    const a = trAll(), d = trFor(a, cls.id), i = d.tasks.findIndex(x => x.id === task.id);
    if (i >= 0) d.tasks[i] = task; else d.tasks.push(task);
    store.set('tracker', a); resetTaskForm(); renderTrTasks(); toast('Task saved');
  });

  function learnerYear(d, name) {
    let earned = 0, done = 0;
    d.tasks.forEach(t => { const v = d.marks[name] && d.marks[name][t.id]; if (typeof v === 'number') { earned += v / t.total * t.weight; done += t.weight; } });
    return { earned, done, so_far: done ? earned / done * 100 : null };
  }
  function renderTrMarks() {
    const cls = M.classes.current(), host = $('tk-grid'); host.textContent = '';
    if (!sameClass(cls)) { host.appendChild(el('div', { class: 'aa-empty-hint', text: 'Add a class list first (Manage class lists).' })); return; }
    const d = trFor(trAll(), cls.id), tasks = d.tasks.slice().sort((a, b) => a.term - b.term || (a.date || '9').localeCompare(b.date || '9'));
    if (!tasks.length) { host.appendChild(el('div', { class: 'aa-empty-hint', text: 'Add some tasks on the Programme tab, then enter marks here.' })); return; }
    const t = el('table', { class: 'aa-grid aa-tk' });
    t.appendChild(el('tr', {}, [el('th', { text: 'Learner' })].concat(tasks.map(k => el('th', { text: 'T' + k.term + ' ' + k.name + ' (/' + k.total + ', ' + k.weight + '%)' })), [el('th', { text: 'Year mark so far' }), el('th', { text: 'Level' })])));
    const outs = [];
    cls.learners.forEach(n => {
      const cells = [el('td', { text: n })];
      tasks.forEach(k => {
        const inp = el('input', { class: 'aa-in aa-num-in', type: 'number', min: '0', max: String(k.total), step: 'any', 'aria-label': n + ', ' + k.name });
        const v = d.marks[n] && d.marks[n][k.id]; if (typeof v === 'number') inp.value = String(v);
        inp.addEventListener('change', () => {
          const a = trAll(), dd = trFor(a, cls.id); const raw = inp.value.trim(); dd.marks[n] = dd.marks[n] || {};
          if (raw === '') delete dd.marks[n][k.id];
          else { const x = parseFloat(raw); if (!(x >= 0 && x <= k.total)) { toast('Mark must be between 0 and ' + k.total); inp.value = typeof v === 'number' ? String(v) : ''; return; } dd.marks[n][k.id] = x; }
          store.set('tracker', a); renderTrMarks();
        });
        cells.push(el('td', {}, [inp]));
      });
      const y = learnerYear(d, n); outs.push(y);
      cells.push(el('td', { class: 'aa-c', text: y.so_far == null ? '' : Math.round(y.so_far) + '%  (' + Math.round(y.done) + '% counted)' }));
      cells.push(el('td', { class: 'aa-c', text: y.so_far == null ? '' : String(capsLevel(y.so_far)) }));
      t.appendChild(el('tr', {}, cells));
    });
    host.appendChild(el('div', { class: 'aa-tbl-wrap' }, [t]));
    const have = outs.filter(o => o.so_far != null);
    $('tk-avg').textContent = have.length ? 'Class average so far: ' + Math.round(have.reduce((a, o) => a + o.so_far, 0) / have.length) + '% (' + have.length + ' learners with marks)' : '';
  }
  $('tk-copy').addEventListener('click', () => {
    const cls = M.classes.current(); if (!sameClass(cls)) return;
    const d = trFor(trAll(), cls.id), tasks = d.tasks.slice().sort((a, b) => a.term - b.term || (a.date || '9').localeCompare(b.date || '9'));
    const rows = [['Learner'].concat(tasks.map(k => 'T' + k.term + ' ' + k.name + ' (/' + k.total + ', ' + k.weight + '%)'), ['Year mark so far %', 'Weight counted %', 'Level'])];
    cls.learners.forEach(n => { const y = learnerYear(d, n); rows.push([n].concat(tasks.map(k => d.marks[n] && typeof d.marks[n][k.id] === 'number' ? d.marks[n][k.id] : ''), [y.so_far == null ? '' : Math.round(y.so_far), Math.round(y.done), y.so_far == null ? '' : capsLevel(y.so_far)])); });
    copy(csv(rows));
  });
  $('tk-print').addEventListener('click', () => {
    const cls = M.classes.current(); if (!cls) return;
    const d = trFor(trAll(), cls.id), tasks = d.tasks.slice().sort((a, b) => a.term - b.term || (a.date || '9').localeCompare(b.date || '9'));
    if (!tasks.length) return toast('Add some tasks first');
    M.printDoc(pa => {
      pa.appendChild(el('h1', { class: 'aa-pr-h', text: 'Assessment programme — ' + cls.name }));
      const t = el('table', {}, [el('tr', {}, ['Term', 'Task', 'Type', 'Date', 'Total', 'Weight'].map(h => el('th', { text: h })))]);
      tasks.forEach(k => t.appendChild(el('tr', {}, [el('td', { text: String(k.term) }), el('td', { text: k.name }), el('td', { text: k.type }), el('td', { text: k.date }), el('td', { text: String(k.total) }), el('td', { text: k.weight + '%' })])));
      t.appendChild(el('tr', {}, [el('td', { colspan: '5', text: 'Total weighting' }), el('td', { text: tasks.reduce((a, k) => a + k.weight, 0) + '%' })]));
      pa.appendChild(t);
    });
  });
  $('tk-save-file').addEventListener('click', () => M.downloadJson('assessment-tracker', 'assessment-tracker', { classes: M.classes.all(), tracker: trAll() }));
  M.wireOpen('tk-open-file', 'tk-open-input', 'assessment-tracker', data => {
    if (!data || typeof data !== 'object') return toast('That file is not a saved tracker');
    const classes = M.classes.cleanClasses(data.classes), ids = new Set(classes.map(c => c.id)), out = {};
    Object.entries(data.tracker && typeof data.tracker === 'object' ? data.tracker : {}).forEach(([cid, d]) => {
      if (!ids.has(cid) || !d || !Array.isArray(d.tasks)) return;
      const tasks = d.tasks.slice(0, 100).map(t => t && ({
        id: str(t.id, 20) || uid(), term: [1, 2, 3, 4].includes(+t.term) ? +t.term : 1, name: str(t.name, 120), type: TYPES.includes(t.type) ? t.type : 'Other',
        date: DATE_RE.test(t.date) ? t.date : '', total: parseFloat(t.total) > 0 ? parseFloat(t.total) : 1, weight: Math.min(100, Math.max(0, parseFloat(t.weight) || 0))
      })).filter(t => t && t.name);
      const tid = new Set(tasks.map(t => t.id)), marks = {};
      Object.entries(d.marks && typeof d.marks === 'object' ? d.marks : {}).forEach(([n, m]) => {
        if (!m || typeof m !== 'object') return;
        Object.entries(m).forEach(([k, v]) => { const x = parseFloat(v), tk = tasks.find(t => t.id === k); if (tid.has(k) && x >= 0 && x <= tk.total) (marks[str(n, 80)] = marks[str(n, 80)] || {})[k] = x; });
      });
      out[cid] = { tasks, marks };
    });
    if (!confirm('Replace the class lists and assessment programmes in this browser with this file?')) return;
    M.classes.replaceAll(classes); store.set('tracker', out); renderTrTasks(); renderTrMarks(); toast('Tracker opened');
  });
  wireClass('tk-class', 'tk-manage', () => { resetTaskForm(); renderTrTasks(); renderTrMarks(); });
  TYPES.forEach(t => $('tk-type').appendChild(el('option', { value: t, text: t })));
  resetTaskForm();
})();
