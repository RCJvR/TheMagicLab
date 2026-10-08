/* Timetable Planner: define teachers, classes, subjects, rooms and lessons, let
   the generator build a clash-free timetable, then adjust it by hand.
   Everything is stored in this browser (aa:timetable); a file lets the school
   carry it elsewhere. Depends on teacher-shared.js (window.MLT). */
(function () {
  'use strict';
  const M = window.MLT;
  if (!M || !document.getElementById('tab-timetable')) return;
  const { $, el, store, toast, uid, str, csv } = M;
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const TIME_RE = /^\d{2}:\d{2}$/;

  /* ── data ─────────────────────────────────────────────────────────────── */
  const defaultPeriods = () => [
    ['1', '07:45', '08:30', 0], ['2', '08:30', '09:15', 0], ['3', '09:15', '10:00', 0], ['Break', '10:00', '10:30', 1],
    ['4', '10:30', '11:15', 0], ['5', '11:15', '12:00', 0], ['6', '12:00', '12:45', 0], ['Lunch', '12:45', '13:15', 1],
    ['7', '13:15', '14:00', 0], ['8', '14:00', '14:45', 0]
  ].map(([label, start, end, brk]) => ({ label, start, end, brk: !!brk }));
  const blank = () => ({ school: '', title: '', days: 5, periods: defaultPeriods(), teachers: [], classes: [], subjects: [], rooms: [], lessons: [], placed: [] });

  // Rebuild everything from untrusted input (a saved file or old storage).
  function sanitize(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const o = blank();
    o.school = str(raw.school, 120); o.title = str(raw.title, 120);
    o.days = [5, 6].includes(+raw.days) ? +raw.days : 5;
    if (Array.isArray(raw.periods) && raw.periods.length) {
      o.periods = raw.periods.slice(0, 16).map((p, i) => ({
        label: str(p && p.label, 12) || String(i + 1), start: TIME_RE.test(p && p.start) ? p.start : '', end: TIME_RE.test(p && p.end) ? p.end : '', brk: !!(p && p.brk)
      }));
      if (!o.periods.some(p => !p.brk)) o.periods = defaultPeriods();
    }
    const ids = new Set();
    const mkId = v => { let id = str(v, 20); if (!id || ids.has(id)) id = uid(); ids.add(id); return id; };
    const list = (a, n, f) => (Array.isArray(a) ? a : []).slice(0, n).map(f).filter(Boolean);
    o.teachers = list(raw.teachers, 200, t => t && ({
      id: mkId(t.id), name: str(t.name, 80).trim(), short: str(t.short, 8).trim(), maxDay: Math.min(16, Math.max(1, parseInt(t.maxDay, 10) || 16)),
      off: (Array.isArray(t.off) ? t.off : []).filter(k => /^\d-\d{1,2}$/.test(k)).slice(0, 120)
    })).filter(t => t.name);
    o.classes = list(raw.classes, 200, c => c && ({ id: mkId(c.id), name: str(c.name, 40).trim() })).filter(c => c.name);
    o.subjects = list(raw.subjects, 100, s => s && ({ id: mkId(s.id), name: str(s.name, 60).trim(), short: str(s.short, 8).trim() })).filter(s => s.name);
    o.rooms = list(raw.rooms, 100, r => r && ({ id: mkId(r.id), name: str(r.name, 40).trim() })).filter(r => r.name);
    const has = (arr, id) => arr.some(x => x.id === id);
    o.lessons = list(raw.lessons, 1500, l => l && has(o.subjects, l.subject) && ({
      id: mkId(l.id), subject: l.subject, teacher: has(o.teachers, l.teacher) ? l.teacher : '', room: has(o.rooms, l.room) ? l.room : '',
      classes: (Array.isArray(l.classes) ? l.classes : []).filter(c => has(o.classes, c)).slice(0, 20),
      ppw: Math.min(20, Math.max(1, parseInt(l.ppw, 10) || 1)), doubles: Math.min(10, Math.max(0, parseInt(l.doubles, 10) || 0))
    }));
    o.placed = list(raw.placed, 6000, p => p && o.lessons.some(l => l.id === p.lesson) && ({
      id: mkId(p.id), lesson: p.lesson, day: Math.min(5, Math.max(0, parseInt(p.day, 10) || 0)), period: Math.max(0, parseInt(p.period, 10) || 0),
      len: p.len === 2 ? 2 : 1, locked: !!p.locked
    }));
    return o;
  }
  let S = sanitize(store.get('timetable', null)) || blank();
  const save = () => store.set('timetable', S);
  const byId = (arr, id) => arr.find(x => x.id === id) || null;
  const shortOf = (name, given) => given || (name.split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 4)) || name.slice(0, 3);
  const nonBreak = () => S.periods.reduce((a, p) => a + (p.brk ? 0 : 1), 0);

  // Each lesson asks for `doubles` double periods plus singles for the rest.
  function requiredUnits() {
    const out = [];
    S.lessons.forEach(L => {
      const d = Math.min(L.doubles, Math.floor(L.ppw / 2)), s = L.ppw - 2 * d;
      for (let i = 0; i < d; i++) out.push({ lesson: L.id, len: 2 });
      for (let i = 0; i < s; i++) out.push({ lesson: L.id, len: 1 });
    });
    return out;
  }
  // Drop placements that no longer match a lesson, its counts, or the grid.
  function reconcile() {
    const need = new Map(); requiredUnits().forEach(u => { const k = u.lesson + '|' + u.len; need.set(k, (need.get(k) || 0) + 1); });
    const NP = S.periods.length, keep = [];
    S.placed.forEach(p => {
      const k = p.lesson + '|' + p.len;
      const okSlot = p.day < S.days && p.period + p.len <= NP && !S.periods.slice(p.period, p.period + p.len).some(x => x.brk);
      if (okSlot && (need.get(k) || 0) > 0) { need.set(k, need.get(k) - 1); keep.push(p); }
    });
    S.placed = keep;
  }
  reconcile();

  /* ── scheduling engine ───────────────────────────────────────────────── */
  // Resources (teacher, classes, room) each get a slot array holding the unit
  // that occupies that slot, so clash checks are plain array reads.
  function makeEngine() {
    const D = S.days, NP = S.periods.length, N = D * NP;
    const tIdx = new Map(S.teachers.map((t, i) => [t.id, i])), cIdx = new Map(S.classes.map((c, i) => [c.id, i])), rIdx = new Map(S.rooms.map((r, i) => [r.id, i]));
    const mk = n => Array.from({ length: n }, () => new Int32Array(N).fill(-1));
    const tOcc = mk(S.teachers.length), cOcc = mk(S.classes.length), rOcc = mk(S.rooms.length);
    const off = S.teachers.map(t => { const a = new Uint8Array(N); t.off.forEach(k => { const [d, p] = k.split('-').map(Number); if (d < D && p < NP) a[d * NP + p] = 1; }); return a; });
    const tDay = S.teachers.map(() => new Int32Array(D));
    const brk = S.periods.map(p => p.brk);
    const units = [], ld = new Map(); // lessonId -> single-period count per day
    const E = {
      D, NP, N, units, tOcc, cOcc, rOcc,
      addUnit(lessonId, len, id, locked) {
        const L = byId(S.lessons, lessonId);
        const u = { i: units.length, id: id || uid(), lesson: lessonId, len, t: tIdx.has(L.teacher) ? tIdx.get(L.teacher) : -1, cls: L.classes.map(c => cIdx.get(c)).filter(x => x != null), r: rIdx.has(L.room) ? rIdx.get(L.room) : -1, slot: -1, locked: !!locked };
        units.push(u); return u;
      },
      staticOK(u, d, p) {
        if (p + u.len > NP) return false;
        for (let k = 0; k < u.len; k++) { if (brk[p + k]) return false; if (u.t >= 0 && off[u.t][d * NP + p + k]) return false; }
        if (u.t >= 0 && tDay[u.t][d] + u.len > S.teachers[u.t].maxDay) return false;
        return true;
      },
      blockers(u, slot) {
        const set = new Set();
        for (let k = 0; k < u.len; k++) {
          const s = slot + k;
          if (u.t >= 0 && tOcc[u.t][s] >= 0) set.add(tOcc[u.t][s]);
          u.cls.forEach(c => { if (cOcc[c][s] >= 0) set.add(cOcc[c][s]); });
          if (u.r >= 0 && rOcc[u.r][s] >= 0) set.add(rOcc[u.r][s]);
        }
        set.delete(u.i); return set;
      },
      place(u, slot) {
        u.slot = slot; const d = Math.floor(slot / NP);
        for (let k = 0; k < u.len; k++) { if (u.t >= 0) tOcc[u.t][slot + k] = u.i; u.cls.forEach(c => { cOcc[c][slot + k] = u.i; }); if (u.r >= 0) rOcc[u.r][slot + k] = u.i; }
        if (u.t >= 0) tDay[u.t][d] += u.len;
        if (u.len === 1) { if (!ld.has(u.lesson)) ld.set(u.lesson, new Int32Array(D)); ld.get(u.lesson)[d]++; }
      },
      lift(u) {
        if (u.slot < 0) return; const slot = u.slot, d = Math.floor(slot / NP);
        for (let k = 0; k < u.len; k++) { if (u.t >= 0) tOcc[u.t][slot + k] = -1; u.cls.forEach(c => { cOcc[c][slot + k] = -1; }); if (u.r >= 0) rOcc[u.r][slot + k] = -1; }
        if (u.t >= 0) tDay[u.t][d] -= u.len;
        if (u.len === 1 && ld.has(u.lesson)) ld.get(u.lesson)[d]--;
        u.slot = -1;
      },
      feasible(u) {
        const out = [];
        for (let d = 0; d < D; d++) for (let p = 0; p < NP; p++) if (E.staticOK(u, d, p) && E.blockers(u, d * NP + p).size === 0) out.push(d * NP + p);
        return out;
      },
      gaps(occ, d) {
        let first = -1, last = -1;
        for (let p = 0; p < NP; p++) if (!brk[p] && occ[d * NP + p] >= 0) { if (first < 0) first = p; last = p; }
        if (first < 0) return 0;
        let g = 0; for (let p = first; p <= last; p++) if (!brk[p] && occ[d * NP + p] < 0) g++;
        return g;
      },
      sameDay(u, d) { const a = ld.get(u.lesson); return a ? a[d] : 0; },
      // Soft cost of the days a unit touches: gaps for its classes (heavy) and
      // teacher, plus a penalty for the same single lesson twice in a day.
      local(u, days) {
        let c = 0;
        days.forEach(d => {
          u.cls.forEach(ci => { c += 4 * E.gaps(cOcc[ci], d); });
          if (u.t >= 0) c += 1.5 * E.gaps(tOcc[u.t], d);
          if (u.len === 1) c += 6 * Math.max(0, E.sameDay(u, d) - 1);
        });
        return c;
      },
      delta(u, slot) {
        const d = Math.floor(slot / NP), before = E.local(u, [d]);
        E.place(u, slot); const after = E.local(u, [d]); E.lift(u); return after - before;
      }
    };
    return E;
  }

  const yieldUI = () => new Promise(r => setTimeout(r, 0));
  let generating = false;
  async function generate(keepLocked) {
    if (generating) return;
    generating = true; $('tt-gen').disabled = true; $('tt-status').textContent = 'Generating…';
    try {
      const probs = issues().filter(i => i.level === 'error');
      if (probs.length && !confirm('There are problems that make a full timetable impossible:\n\n' + probs.slice(0, 5).map(p => '• ' + p.text).join('\n') + '\n\nGenerate anyway?')) return;
      const t0 = performance.now(), budget = 5000;
      let best = null, bestMissing = Infinity;
      for (let attempt = 0; performance.now() - t0 < budget; attempt++) {
        const E = makeEngine();
        const lockedRecs = keepLocked ? S.placed.filter(p => p.locked) : [];
        const used = new Set();
        requiredUnits().forEach(r => {
          const rec = lockedRecs.find(p => p.lesson === r.lesson && p.len === r.len && !used.has(p.id));
          if (rec) used.add(rec.id);
          const u = E.addUnit(r.lesson, r.len, rec ? rec.id : null, !!rec);
          if (rec) { const slot = rec.day * E.NP + rec.period; if (E.staticOK(u, rec.day, rec.period) && E.blockers(u, slot).size === 0) E.place(u, slot); else u.locked = false; }
        });
        const queue = E.units.filter(u => u.slot < 0);
        // hardest first: doubles, combined classes, busy teachers, with a little noise per attempt
        const load = new Map(); E.units.forEach(u => { if (u.t >= 0) load.set(u.t, (load.get(u.t) || 0) + u.len); });
        const weight = u => (u.len === 2 ? 4 : 0) + u.cls.length * 1.5 + (u.t >= 0 ? (load.get(u.t) || 0) / 6 : 0) + Math.random() * 3;
        queue.sort((a, b) => weight(b) - weight(a));
        let ejections = 0, steps = 0;
        const dead = [];
        while (queue.length && ejections < 4000) {
          if (++steps % 150 === 0) { if (performance.now() - t0 > budget) break; await yieldUI(); }
          const u = queue.shift();
          const cands = E.feasible(u);
          if (cands.length) {
            let bestS = cands[0], bestC = Infinity;
            cands.forEach(s => { const c = E.delta(u, s) + Math.random() * 1.2; if (c < bestC) { bestC = c; bestS = s; } });
            E.place(u, bestS); continue;
          }
          // no free slot: evict the fewest movable blockers from the least-bad slot
          let pick = -1, pickN = 99, ties = 0;
          for (let d = 0; d < E.D; d++) for (let p = 0; p < E.NP; p++) {
            if (!E.staticOK(u, d, p)) continue;
            const b = E.blockers(u, d * E.NP + p);
            if ([...b].some(i => E.units[i].locked)) continue;
            if (b.size < pickN) { pickN = b.size; pick = d * E.NP + p; ties = 1; } else if (b.size === pickN && Math.random() < 1 / ++ties) pick = d * E.NP + p;
          }
          if (pick < 0) { dead.push(u); continue; }
          E.blockers(u, pick).forEach(i => { E.lift(E.units[i]); queue.push(E.units[i]); });
          E.place(u, pick); ejections++;
        }
        const missing = E.units.filter(u => u.slot < 0).length;
        if (missing < bestMissing) { bestMissing = missing; best = E; }
        if (missing === 0) break;
        await yieldUI();
      }
      const E = best;
      if (!E) return;
      // polish: try moving single units to cheaper slots while it stays clash-free
      if (bestMissing === 0) {
        const t1 = performance.now(), movable = E.units.filter(u => !u.locked);
        let n = 0;
        while (movable.length && performance.now() - t1 < 1800) {
          if (++n % 300 === 0) await yieldUI();
          const u = movable[Math.floor(Math.random() * movable.length)], old = u.slot, oldD = Math.floor(old / E.NP);
          E.lift(u);
          const c = E.feasible(u).filter(s => s !== old); if (!c.length) { E.place(u, old); continue; }
          const s = c[Math.floor(Math.random() * c.length)], nd = Math.floor(s / E.NP);
          E.place(u, old); const cb = E.local(u, [oldD, nd]); E.lift(u);
          E.place(u, s); const ca = E.local(u, [oldD, nd]);
          if (ca > cb) { E.lift(u); E.place(u, old); }
        }
      }
      S.placed = E.units.filter(u => u.slot >= 0).map(u => ({ id: u.id, lesson: u.lesson, day: Math.floor(u.slot / E.NP), period: u.slot % E.NP, len: u.len, locked: u.locked }));
      save(); renderAll();
      $('tt-status').textContent = bestMissing === 0 ? 'Timetable generated with no clashes.' : bestMissing + ' lesson period(s) could not be placed. Relax some availability limits or reduce periods, then generate again.';
      toast(bestMissing === 0 ? 'Timetable generated' : bestMissing + ' period(s) left unplaced');
    } finally { generating = false; $('tt-gen').disabled = false; }
  }

  // Everything currently placed, loaded into a fresh engine (for checks and moves).
  function loadedEngine() {
    const E = makeEngine();
    S.placed.forEach(p => { const u = E.addUnit(p.lesson, p.len, p.id, p.locked); const slot = p.day * E.NP + p.period; if (E.staticOK(u, p.day, p.period) && E.blockers(u, slot).size === 0) E.place(u, slot); });
    return E;
  }
  function unplacedList() {
    const need = new Map(); requiredUnits().forEach(u => { const k = u.lesson + '|' + u.len; need.set(k, (need.get(k) || 0) + 1); });
    S.placed.forEach(p => { const k = p.lesson + '|' + p.len; need.set(k, (need.get(k) || 0) - 1); });
    const out = [];
    need.forEach((n, k) => { const [lesson, len] = k.split('|'); for (let i = 0; i < n; i++) out.push({ lesson, len: +len }); });
    return out;
  }

  /* ── checks ──────────────────────────────────────────────────────────── */
  function issues() {
    const out = [], nb = nonBreak(), cap = S.days * nb;
    if (!S.lessons.length) return [{ level: 'warn', text: 'No lessons yet. Add teachers, classes, subjects, then lessons.' }];
    S.lessons.forEach(l => {
      const sub = byId(S.subjects, l.subject);
      if (l.doubles * 2 > l.ppw) out.push({ level: 'error', text: (sub && sub.name) + ': more double periods than periods per week.' });
      if (!l.classes.length) out.push({ level: 'error', text: (sub && sub.name) + ' has no class.' });
      if (!l.teacher) out.push({ level: 'warn', text: (sub && sub.name) + ' (' + l.classes.map(c => (byId(S.classes, c) || {}).name).join(', ') + ') has no teacher, so teacher clashes are not checked.' });
    });
    S.classes.forEach(c => {
      const n = S.lessons.filter(l => l.classes.includes(c.id)).reduce((a, l) => a + l.ppw, 0);
      if (n > cap) out.push({ level: 'error', text: c.name + ' has ' + n + ' periods a week but only ' + cap + ' slots exist.' });
    });
    S.teachers.forEach(t => {
      const n = S.lessons.filter(l => l.teacher === t.id).reduce((a, l) => a + l.ppw, 0);
      const avail = cap - t.off.filter(k => { const [d, p] = k.split('-').map(Number); return d < S.days && S.periods[p] && !S.periods[p].brk; }).length;
      const maxed = Math.min(avail, t.maxDay * S.days);
      if (n > maxed) out.push({ level: 'error', text: t.name + ' is asked to teach ' + n + ' periods but is only available for ' + maxed + '.' });
    });
    const up = unplacedList().length;
    if (S.placed.length && up) out.push({ level: 'warn', text: up + ' lesson period(s) are not placed yet.' });
    return out;
  }

  /* ── small UI toolkit ────────────────────────────────────────────────── */
  const lbl = (text, forId) => el('label', { class: 'aa-lbl', for: forId, text });
  const inp = (id, attrs) => el('input', Object.assign({ class: 'aa-in', id }, attrs || {}));
  const btn = (text, onclick, cls) => el('button', { class: 'aa-btn' + (cls ? ' ' + cls : ''), type: 'button', text, onclick });
  const field = (label, id, control) => el('div', {}, [lbl(label, id), control]);
  const removeBtn = (what, fn) => btn('Delete', () => { if (confirm('Delete ' + what + '? Anything that uses it will be updated.')) { fn(); save(); reconcile(); renderAll(); } }, 'aa-btn--sm');
  const hue = id => { let h = 0; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };

  function subTabs() {
    const root = $('tab-timetable');
    const show = name => {
      root.querySelectorAll('.aa-subtab').forEach(b => { const on = b.dataset.sub === name; b.classList.toggle('active', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      root.querySelectorAll('.aa-subpanel').forEach(p => { p.hidden = p.id !== 'tab-timetable-' + name; });
      store.set('tt-sub', name); renderAll();
    };
    root.querySelectorAll('.aa-subtab').forEach(b => b.addEventListener('click', () => show(b.dataset.sub)));
    return show;
  }
  const currentSub = () => { const a = document.querySelector('#tab-timetable .aa-subtab.active'); return a ? a.dataset.sub : 'setup'; };

  // bulk add: one name per line
  function bulkAdd(kind, label, mk) {
    const ta = el('textarea', { class: 'aa-in', rows: '4', placeholder: 'One per line. Paste a column from a spreadsheet.', 'aria-label': 'Add several ' + label });
    return el('div', { class: 'aa-card' }, [lbl('Add several ' + label + ' at once', ''), ta,
      el('div', { class: 'aa-actions' }, [btn('Add', () => {
        const names = ta.value.split('\n').map(x => x.trim()).filter(Boolean); if (!names.length) return toast('Type or paste some names first');
        names.slice(0, 200).forEach(n => S[kind].push(mk(n))); ta.value = ''; save(); renderAll();
      }, 'aa-btn--primary')])]);
  }
  function simpleTable(kind, cols) {
    const t = el('table', { class: 'aa-grid' });
    t.appendChild(el('tr', {}, cols.map(c => el('th', { text: c.h })).concat([el('th', { text: '' })])));
    S[kind].forEach(item => {
      const tr = el('tr', {}, cols.map(c => el('td', {}, [c.ctl(item)])));
      tr.appendChild(el('td', {}, [removeBtn((item.name || 'this item'), () => {
        S[kind] = S[kind].filter(x => x.id !== item.id);
        if (kind === 'teachers') S.lessons.forEach(l => { if (l.teacher === item.id) l.teacher = ''; });
        if (kind === 'rooms') S.lessons.forEach(l => { if (l.room === item.id) l.room = ''; });
        if (kind === 'classes') S.lessons.forEach(l => { l.classes = l.classes.filter(c => c !== item.id); });
        if (kind === 'subjects') S.lessons = S.lessons.filter(l => l.subject !== item.id);
      })]));
      t.appendChild(tr);
    });
    return el('div', { class: 'aa-tbl-wrap' }, [t]);
  }
  const textCtl = (key, max, label) => item => { const i = el('input', { class: 'aa-in', value: item[key] || '', maxlength: String(max), 'aria-label': label }); i.addEventListener('change', () => { item[key] = i.value.trim().slice(0, max); save(); renderAll(); }); return i; };

  /* ── panels ──────────────────────────────────────────────────────────── */
  function renderSetup() {
    const host = $('tab-timetable-setup'); host.textContent = '';
    const school = inp('tt-school', { value: S.school, placeholder: 'School name', maxlength: '120' });
    const title = inp('tt-title', { value: S.title, placeholder: 'e.g. 2027 Timetable, Term 1', maxlength: '120' });
    school.addEventListener('change', () => { S.school = school.value.trim(); save(); }); title.addEventListener('change', () => { S.title = title.value.trim(); save(); });
    const days = el('select', { class: 'aa-in', id: 'tt-days' }, [el('option', { value: '5', text: 'Monday to Friday' }), el('option', { value: '6', text: 'Monday to Saturday' })]);
    days.value = String(S.days);
    days.addEventListener('change', () => { S.days = +days.value; reconcile(); save(); renderAll(); });
    host.appendChild(el('div', { class: 'aa-card' }, [el('div', { class: 'aa-row' }, [field('School', 'tt-school', school), field('Timetable title', 'tt-title', title), field('School days', 'tt-days', days)])]));
    host.appendChild(el('div', { class: 'aa-section-title', text: 'Periods and breaks' }));
    const t = el('table', { class: 'aa-grid' }); t.appendChild(el('tr', {}, ['Label', 'Start', 'End', 'Break', ''].map(h => el('th', { text: h }))));
    S.periods.forEach((p, i) => {
      const lab = el('input', { class: 'aa-in', value: p.label, maxlength: '12', 'aria-label': 'Period ' + (i + 1) + ' label' });
      const st = el('input', { class: 'aa-in', type: 'time', value: p.start, 'aria-label': 'Period ' + (i + 1) + ' start' });
      const en = el('input', { class: 'aa-in', type: 'time', value: p.end, 'aria-label': 'Period ' + (i + 1) + ' end' });
      const bk = el('input', { type: 'checkbox', 'aria-label': 'Period ' + (i + 1) + ' is a break' }); bk.checked = p.brk;
      lab.addEventListener('change', () => { p.label = lab.value.trim().slice(0, 12) || String(i + 1); save(); renderAll(); });
      st.addEventListener('change', () => { p.start = TIME_RE.test(st.value) ? st.value : ''; save(); }); en.addEventListener('change', () => { p.end = TIME_RE.test(en.value) ? en.value : ''; save(); });
      bk.addEventListener('change', () => { p.brk = bk.checked; if (!S.periods.some(x => !x.brk)) { p.brk = false; bk.checked = false; return toast('At least one period must be a teaching period'); } reconcile(); save(); renderAll(); });
      t.appendChild(el('tr', {}, [el('td', {}, [lab]), el('td', {}, [st]), el('td', {}, [en]), el('td', { class: 'aa-c' }, [bk]),
        el('td', {}, [btn('Delete', () => { if (S.periods.length <= 1) return; if (!confirm('Delete this period? Lessons placed after it move up one period.')) return;
          S.placed.forEach(pl => { if (pl.period > i) pl.period--; else if (pl.period + pl.len > i && pl.period <= i) pl.period = -99; }); S.placed = S.placed.filter(pl => pl.period >= 0);
          S.periods.splice(i, 1); S.teachers.forEach(tc => { tc.off = tc.off.map(k => { const [d, pp] = k.split('-').map(Number); return pp === i ? null : d + '-' + (pp > i ? pp - 1 : pp); }).filter(Boolean); });
          reconcile(); save(); renderAll(); }, 'aa-btn--sm')])]));
    });
    host.appendChild(el('div', { class: 'aa-card' }, [el('div', { class: 'aa-tbl-wrap' }, [t]),
      el('div', { class: 'aa-actions' }, [btn('Add a period', () => { if (S.periods.length >= 16) return; S.periods.push({ label: String(S.periods.length + 1), start: '', end: '', brk: false }); save(); renderAll(); }, 'aa-btn--sm'),
        btn('Reset to the default day', () => { if (!confirm('Replace the periods with the default day? Placed lessons will be cleared.')) return; S.periods = defaultPeriods(); S.placed = []; S.teachers.forEach(tc => { tc.off = []; }); save(); renderAll(); }, 'aa-btn--sm')]),
      el('div', { class: 'aa-hint', text: 'Tick Break for tea and lunch: nothing is placed there. A double period needs two teaching periods side by side with no break between.' })]));
  }

  function availDialog(teacher) {
    let dlg = $('tt-avail');
    if (!dlg) { dlg = el('dialog', { class: 'aa-dlg', id: 'tt-avail', 'aria-label': 'Teacher availability' }); dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); document.body.appendChild(dlg); }
    dlg.textContent = '';
    const t = el('table', { class: 'aa-grid' }); t.appendChild(el('tr', {}, [el('th', { text: '' })].concat(DAYS.slice(0, S.days).map(d => el('th', { text: d.slice(0, 3) })))));
    S.periods.forEach((p, pi) => {
      if (p.brk) return;
      t.appendChild(el('tr', {}, [el('th', { text: p.label })].concat(Array.from({ length: S.days }, (_, d) => {
        const k = d + '-' + pi, c = el('input', { type: 'checkbox', 'aria-label': teacher.name + ' available ' + DAYS[d] + ' period ' + p.label }); c.checked = !teacher.off.includes(k);
        c.addEventListener('change', () => { teacher.off = c.checked ? teacher.off.filter(x => x !== k) : teacher.off.concat(k); save(); });
        return el('td', { class: 'aa-c' }, [c]);
      }))));
    });
    dlg.appendChild(el('div', { class: 'aa-dlg-in' }, [el('h2', { class: 'aa-dlg-h', text: teacher.name + ': availability' }), el('p', { class: 'aa-hint', text: 'Ticked means the teacher can be given a lesson then. Untick the periods they cannot teach.' }), el('div', { class: 'aa-tbl-wrap' }, [t]),
      el('div', { class: 'aa-actions' }, [btn('Done', () => { dlg.close(); renderAll(); }, 'aa-btn--primary')])]));
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }

  function renderTeachers() {
    const host = $('tab-timetable-teachers'); host.textContent = '';
    host.appendChild(bulkAdd('teachers', 'teachers', n => ({ id: uid(), name: n.slice(0, 80), short: '', maxDay: 16, off: [] })));
    host.appendChild(el('div', { class: 'aa-card' }, [simpleTable('teachers', [
      { h: 'Name', ctl: textCtl('name', 80, 'Teacher name') },
      { h: 'Short', ctl: item => { const i = el('input', { class: 'aa-in', value: item.short, placeholder: shortOf(item.name, ''), maxlength: '8', 'aria-label': 'Short name for ' + item.name }); i.addEventListener('change', () => { item.short = i.value.trim().slice(0, 8); save(); }); return i; } },
      { h: 'Max periods a day', ctl: item => { const i = el('input', { class: 'aa-in aa-num-in', type: 'number', min: '1', max: '16', value: item.maxDay, 'aria-label': 'Maximum periods a day for ' + item.name }); i.addEventListener('change', () => { item.maxDay = Math.min(16, Math.max(1, parseInt(i.value, 10) || 16)); save(); }); return i; } },
      { h: 'Availability', ctl: item => btn(item.off.length ? item.off.length + ' blocked' : 'Always available', () => availDialog(item), 'aa-btn--sm') }
    ]), !S.teachers.length ? el('div', { class: 'aa-empty-hint', text: 'No teachers yet.' }) : el('span')]));
  }
  function renderSimple(kind, label, panelId) {
    const host = $(panelId); host.textContent = '';
    host.appendChild(bulkAdd(kind, label, n => kind === 'subjects' ? { id: uid(), name: n.slice(0, 60), short: '' } : { id: uid(), name: n.slice(0, 40) }));
    const cols = [{ h: 'Name', ctl: textCtl('name', 60, label + ' name') }];
    if (kind === 'subjects') cols.push({ h: 'Short', ctl: item => { const i = el('input', { class: 'aa-in', value: item.short, placeholder: shortOf(item.name, ''), maxlength: '8', 'aria-label': 'Short name for ' + item.name }); i.addEventListener('change', () => { item.short = i.value.trim().slice(0, 8); save(); renderAll(); }); return i; } });
    host.appendChild(el('div', { class: 'aa-card' }, [simpleTable(kind, cols), !S[kind].length ? el('div', { class: 'aa-empty-hint', text: 'None yet.' }) : el('span')]));
  }

  // lessons
  let editLesson = null;
  function renderLessons() {
    const host = $('tab-timetable-lessons'); host.textContent = '';
    const L = editLesson ? byId(S.lessons, editLesson) : null;
    const subj = el('select', { class: 'aa-in', id: 'ls-subject' }, S.subjects.map(s => el('option', { value: s.id, text: s.name })));
    const teach = el('select', { class: 'aa-in', id: 'ls-teacher' }, [el('option', { value: '', text: '(no teacher)' })].concat(S.teachers.map(t => el('option', { value: t.id, text: t.name }))));
    const room = el('select', { class: 'aa-in', id: 'ls-room' }, [el('option', { value: '', text: '(any room)' })].concat(S.rooms.map(r => el('option', { value: r.id, text: r.name }))));
    const ppw = inp('ls-ppw', { type: 'number', min: '1', max: '20', value: L ? L.ppw : 4 });
    const dbl = inp('ls-doubles', { type: 'number', min: '0', max: '10', value: L ? L.doubles : 0 });
    const mode = el('select', { class: 'aa-in', id: 'ls-mode' }, [el('option', { value: 'sep', text: 'Each selected class separately' }), el('option', { value: 'tog', text: 'All selected classes together' })]);
    if (L) { subj.value = L.subject; teach.value = L.teacher; room.value = L.room; }
    const chips = el('div', { class: 'aa-chips', role: 'group', 'aria-label': 'Classes' });
    S.classes.forEach(c => { const cb = el('input', { type: 'checkbox', value: c.id }); if (L && L.classes.includes(c.id)) cb.checked = true; chips.appendChild(el('label', { class: 'aa-chip' }, [cb, el('span', { text: c.name })])); });
    const form = el('div', { class: 'aa-card' }, [
      el('div', { class: 'aa-row' }, [field('Subject', 'ls-subject', subj), field('Teacher', 'ls-teacher', teach), field('Room', 'ls-room', room)]),
      lbl('Classes', ''), chips,
      el('div', { class: 'aa-row' }, [field('Periods a week', 'ls-ppw', ppw), field('Of which double periods', 'ls-doubles', dbl), L ? el('span') : field('When several classes are selected', 'ls-mode', mode)]),
      el('div', { class: 'aa-actions' }, [btn(L ? 'Save lesson' : 'Add lesson', () => {
        if (!S.subjects.length) return toast('Add subjects first');
        const cls = [...chips.querySelectorAll('input:checked')].map(c => c.value); if (!cls.length) return toast('Choose at least one class');
        const p = Math.min(20, Math.max(1, parseInt(ppw.value, 10) || 1)), dd = Math.min(10, Math.max(0, parseInt(dbl.value, 10) || 0));
        if (dd * 2 > p) return toast('Double periods cannot be more than half the periods a week');
        const base = { subject: subj.value, teacher: teach.value, room: room.value, ppw: p, doubles: dd };
        if (L) Object.assign(L, base, { classes: cls });
        else if (mode.value === 'tog') S.lessons.push(Object.assign({ id: uid(), classes: cls }, base));
        else cls.forEach(c => S.lessons.push(Object.assign({ id: uid(), classes: [c] }, base)));
        editLesson = null; reconcile(); save(); renderAll(); toast('Lesson saved');
      }, 'aa-btn--primary'), L ? btn('Cancel edit', () => { editLesson = null; renderAll(); }) : el('span')])
    ]);
    host.appendChild(form);
    host.appendChild(el('div', { class: 'aa-section-title', text: 'Lessons (' + S.lessons.length + ')' }));
    const t = el('table', { class: 'aa-grid' }); t.appendChild(el('tr', {}, ['Subject', 'Teacher', 'Classes', 'Room', 'Per week', 'Doubles', ''].map(h => el('th', { text: h }))));
    S.lessons.forEach(l => t.appendChild(el('tr', {}, [
      el('td', { text: (byId(S.subjects, l.subject) || {}).name || '' }), el('td', { text: (byId(S.teachers, l.teacher) || {}).name || '' }),
      el('td', { text: l.classes.map(c => (byId(S.classes, c) || {}).name).join(', ') }), el('td', { text: (byId(S.rooms, l.room) || {}).name || '' }),
      el('td', { class: 'aa-c', text: String(l.ppw) }), el('td', { class: 'aa-c', text: String(l.doubles) }),
      el('td', {}, [el('div', { class: 'aa-actions', style: 'margin:0' }, [btn('Edit', () => { editLesson = l.id; renderAll(); window.scrollTo({ top: 0 }); }, 'aa-btn--sm'), removeBtn('this lesson', () => { S.lessons = S.lessons.filter(x => x.id !== l.id); })])])
    ])));
    host.appendChild(el('div', { class: 'aa-card' }, [el('div', { class: 'aa-tbl-wrap' }, [t]), !S.lessons.length ? el('div', { class: 'aa-empty-hint', text: 'No lessons yet.' }) : el('span')]));
    renderIssues(host);
  }
  function renderIssues(host) {
    const list = issues(); if (!list.length) return;
    host.appendChild(el('div', { class: 'aa-section-title', text: 'Checks' }));
    host.appendChild(el('div', { class: 'aa-card' }, list.map(i => el('div', { class: 'aa-issue aa-issue--' + i.level, text: (i.level === 'error' ? 'Problem: ' : 'Note: ') + i.text }))));
  }

  /* ── timetable grid ─────────────────────────────────────────────────── */
  let view = { type: 'class', id: '' }, sel = null, E_ui = null;
  const subjShort = id => { const s = byId(S.subjects, id); return s ? shortOf(s.name, s.short) : '?'; };
  const tShort = id => { const t = byId(S.teachers, id); return t ? shortOf(t.name, t.short) : ''; };
  const cNames = L => L.classes.map(c => (byId(S.classes, c) || {}).name).filter(Boolean).join('+');
  const rName = id => (byId(S.rooms, id) || {}).name || '';
  const unitText = (L, type) => type === 'class' ? [subjShort(L.subject), tShort(L.teacher), rName(L.room)] : type === 'teacher' ? [subjShort(L.subject), cNames(L), rName(L.room)] : [subjShort(L.subject), cNames(L), tShort(L.teacher)];

  function resourceList(type) { return type === 'class' ? S.classes : type === 'teacher' ? S.teachers : S.rooms; }
  // The unit occupying a slot for the viewed resource, or null.
  function unitAt(E, type, id, slot) {
    const arr = type === 'class' ? E.cOcc[S.classes.findIndex(c => c.id === id)] : type === 'teacher' ? E.tOcc[S.teachers.findIndex(t => t.id === id)] : E.rOcc[S.rooms.findIndex(r => r.id === id)];
    return arr && arr[slot] >= 0 ? E.units[arr[slot]] : null;
  }
  // `forPrint` draws a static table; otherwise cells are interactive.
  function gridTable(E, type, id, valid, forPrint) {
    const NP = S.periods.length, t = el('table', { class: 'aa-tt' + (forPrint ? ' aa-tt--print' : '') });
    t.appendChild(el('tr', {}, [el('th', { text: '' })].concat(DAYS.slice(0, S.days).map(d => el('th', { text: d })))));
    const skip = new Set();
    S.periods.forEach((p, pi) => {
      const tr = el('tr', { class: p.brk ? 'aa-tt-brk' : '' }, [el('th', { class: 'aa-tt-p' }, [el('div', { text: p.label }), p.start ? el('div', { class: 'aa-tt-time', text: p.start + (p.end ? '–' + p.end : '') }) : el('span')])]);
      if (p.brk) { tr.appendChild(el('td', { class: 'aa-tt-brkcell', colspan: String(S.days), text: p.label })); t.appendChild(tr); return; }
      for (let d = 0; d < S.days; d++) {
        const slot = d * NP + pi;
        if (skip.has(slot)) continue;
        const u = unitAt(E, type, id, slot);
        const td = el('td', { 'data-slot': String(slot) });
        if (u) {
          const L = byId(S.lessons, u.lesson), parts = unitText(L, type).filter(Boolean);
          if (u.len === 2) { td.setAttribute('rowspan', '2'); skip.add(slot + 1); }
          td.classList.add('aa-tt-u'); td.style.borderLeftColor = 'hsl(' + hue(L.subject) + ' 60% 62%)';
          td.appendChild(el('div', { class: 'aa-tt-s', text: parts[0] })); parts.slice(1).forEach(x => td.appendChild(el('div', { class: 'aa-tt-m', text: x })));
          if (u.locked) td.appendChild(el('div', { class: 'aa-tt-lock', text: forPrint ? '' : 'locked' }));
          if (!forPrint) { td.tabIndex = 0; td.setAttribute('role', 'button'); td.setAttribute('aria-label', parts.join(', ') + (u.locked ? ', locked' : '')); if (sel && sel.id === u.id) td.classList.add('aa-tt-sel'); }
        } else if (!forPrint && valid && valid.has(slot)) { td.classList.add('aa-tt-ok'); td.tabIndex = 0; td.setAttribute('role', 'button'); td.setAttribute('aria-label', 'Move here, ' + DAYS[d] + ' period ' + p.label); }
        tr.appendChild(td);
      }
      t.appendChild(tr);
    });
    return t;
  }

  function renderGrid() {
    const host = $('tab-timetable-grid'); host.textContent = '';
    E_ui = loadedEngine();
    const list = resourceList(view.type);
    if (!list.some(x => x.id === view.id)) view.id = list[0] ? list[0].id : '';
    const typeSel = el('select', { class: 'aa-in', id: 'tt-vtype' }, [el('option', { value: 'class', text: 'Classes' }), el('option', { value: 'teacher', text: 'Teachers' }), el('option', { value: 'room', text: 'Rooms' })]); typeSel.value = view.type;
    const idSel = el('select', { class: 'aa-in', id: 'tt-vid' }, list.map(x => el('option', { value: x.id, text: x.name }))); idSel.value = view.id;
    typeSel.addEventListener('change', () => { view.type = typeSel.value; view.id = ''; sel = null; renderGrid(); });
    idSel.addEventListener('change', () => { view.id = idSel.value; renderGrid(); });
    host.appendChild(el('div', { class: 'aa-card' }, [
      el('div', { class: 'aa-row' }, [field('Show', 'tt-vtype', typeSel), field('', 'tt-vid', idSel)]),
      el('div', { class: 'aa-actions' }, [
        el('button', { class: 'aa-btn aa-btn--primary', id: 'tt-gen', type: 'button', text: 'Generate timetable', onclick: () => generate(true) }),
        btn('Start again (ignore locks)', () => { if (!S.placed.some(p => p.locked) || confirm('This also replaces locked lessons. Continue?')) generate(false); }),
        btn('Clear unlocked', () => { S.placed = S.placed.filter(p => p.locked); sel = null; save(); renderAll(); }),
        btn('Print', () => printViews([view.id]), ''), btn('Print all in this list', () => printViews(list.map(x => x.id))), btn('Copy for Excel', copyView)
      ]),
      el('div', { class: 'aa-hint', id: 'tt-status', text: S.placed.length ? '' : 'Press Generate timetable to build one from your lessons.' })
    ]));
    // selected unit + guidance
    let valid = null;
    const up = unplacedList();
    if (sel) {
      const u = sel.kind === 'placed' ? E_ui.units.find(x => x.id === sel.id) : null;
      let probe = u;
      if (sel.kind === 'unplaced') probe = E_ui.addUnit(sel.lesson, sel.len, null, false);
      if (probe) { const was = probe.slot; if (was >= 0) E_ui.lift(probe); valid = new Set(E_ui.feasible(probe)); if (was >= 0) E_ui.place(probe, was); }
      const L = byId(S.lessons, sel.kind === 'placed' ? (u && u.lesson) : sel.lesson);
      if (!L) sel = null;
      else host.appendChild(el('div', { class: 'aa-card aa-tt-selbar' }, [
        el('div', { text: 'Selected: ' + (byId(S.subjects, L.subject) || {}).name + ' · ' + cNames(L) + ' · ' + ((byId(S.teachers, L.teacher) || {}).name || 'no teacher') + (sel.kind === 'placed' ? '' : ' (not placed)') + '. Green cells are free for it: click one to ' + (sel.kind === 'placed' ? 'move it there.' : 'place it there.') }),
        el('div', { class: 'aa-actions' }, [
          sel.kind === 'placed' ? btn(u && u.locked ? 'Unlock' : 'Lock in place', () => { const p = S.placed.find(x => x.id === sel.id); if (p) { p.locked = !p.locked; save(); renderGrid(); } }, 'aa-btn--sm') : el('span'),
          sel.kind === 'placed' ? btn('Take off the timetable', () => { S.placed = S.placed.filter(x => x.id !== sel.id); sel = null; save(); renderAll(); }, 'aa-btn--sm') : el('span'),
          btn('Done', () => { sel = null; renderGrid(); }, 'aa-btn--sm')
        ])
      ]));
    }
    const wrap = el('div', { class: 'aa-card' }, [el('div', { class: 'aa-tbl-wrap' }, [gridTable(E_ui, view.type, view.id, valid, false)])]);
    wrap.addEventListener('click', onCell); wrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { if (e.target.dataset && e.target.dataset.slot) { e.preventDefault(); onCell(e); } } });
    host.appendChild(wrap);
    if (up.length) {
      const c = el('div', { class: 'aa-card' }, [el('div', { class: 'aa-sec-no', text: 'NOT YET PLACED (' + up.length + ')' })]);
      up.forEach(x => { const L = byId(S.lessons, x.lesson); c.appendChild(el('div', { class: 'aa-att-row' }, [el('div', { text: (byId(S.subjects, L.subject) || {}).name + ' · ' + cNames(L) + ' · ' + ((byId(S.teachers, L.teacher) || {}).name || 'no teacher') + (x.len === 2 ? ' · double' : '') }), btn('Find a slot', () => { sel = { kind: 'unplaced', lesson: x.lesson, len: x.len }; renderGrid(); }, 'aa-btn--sm')])); });
      host.appendChild(c);
    }
    renderIssues(host);
  }
  function onCell(e) {
    const td = e.target.closest ? e.target.closest('td[data-slot]') : null; if (!td) return;
    const slot = +td.dataset.slot, NP = S.periods.length, d = Math.floor(slot / NP), p = slot % NP;
    if (td.classList.contains('aa-tt-ok') && sel) {
      if (sel.kind === 'placed') { const rec = S.placed.find(x => x.id === sel.id); if (rec) { rec.day = d; rec.period = p; } }
      else { const id = uid(); S.placed.push({ id, lesson: sel.lesson, day: d, period: p, len: sel.len, locked: false }); sel = { kind: 'placed', id }; }
      save(); renderAll(); return;
    }
    const u = unitAt(E_ui, view.type, view.id, slot);
    sel = u ? { kind: 'placed', id: u.id } : null; renderGrid();
  }
  function viewRows(E, type, id) {
    const NP = S.periods.length, rows = [[''].concat(DAYS.slice(0, S.days))];
    S.periods.forEach((p, pi) => {
      const r = [p.label + (p.start ? ' ' + p.start + '-' + p.end : '')];
      for (let d = 0; d < S.days; d++) { const u = p.brk ? null : unitAt(E, type, id, d * NP + pi); r.push(p.brk ? p.label : u ? unitText(byId(S.lessons, u.lesson), type).filter(Boolean).join(' ') : ''); }
      rows.push(r);
    });
    return rows;
  }
  function copyView() { M.copy(csv(viewRows(loadedEngine(), view.type, view.id))); }
  function printViews(ids) {
    if (!S.placed.length) return toast('Generate a timetable first');
    const E = loadedEngine(), list = resourceList(view.type);
    M.printDoc(pa => {
      ids.forEach((id, i) => {
        const item = list.find(x => x.id === id); if (!item) return;
        const sec = el('div', { class: 'aa-tt-page' + (i ? ' aa-tt-page--next' : '') }, [
          el('h1', { class: 'aa-pr-h', text: (S.school ? S.school + ' · ' : '') + (S.title || 'Timetable') }),
          el('div', { class: 'aa-pr-sub', text: (view.type === 'class' ? 'Class ' : view.type === 'teacher' ? 'Teacher: ' : 'Room: ') + item.name }),
          gridTable(E, view.type, id, null, true)
        ]);
        pa.appendChild(sec);
      });
    }, { landscape: true, font: 10 });
  }

  function renderAll() {
    const sub = currentSub();
    if (sub === 'setup') renderSetup();
    else if (sub === 'teachers') renderTeachers();
    else if (sub === 'classes') renderSimple('classes', 'classes', 'tab-timetable-classes');
    else if (sub === 'subjects') renderSimple('subjects', 'subjects', 'tab-timetable-subjects');
    else if (sub === 'rooms') renderSimple('rooms', 'rooms', 'tab-timetable-rooms');
    else if (sub === 'lessons') renderLessons();
    else renderGrid();
  }

  /* ── file ───────────────────────────────────────────────────────────── */
  $('tt-save-file').addEventListener('click', () => M.downloadJson('timetable', S.title || S.school || 'timetable', S));
  M.wireOpen('tt-open-file', 'tt-open-input', 'timetable', data => {
    const clean = sanitize(data);
    if (!clean) return toast('That file is not a saved timetable');
    if ((S.lessons.length || S.teachers.length) && !confirm('Replace the timetable you are working on with this file?')) return;
    S = clean; reconcile(); save(); sel = null; editLesson = null; renderAll(); toast('Timetable opened');
  });
  $('tt-reset-all').addEventListener('click', () => { if (!confirm('Delete the whole timetable project (teachers, classes, lessons and the timetable) from this browser?')) return; S = blank(); save(); sel = null; editLesson = null; renderAll(); });

  const show = subTabs();
  const saved = store.get('tt-sub', 'setup');
  show(['setup', 'teachers', 'classes', 'subjects', 'rooms', 'lessons', 'grid'].includes(saved) ? saved : 'setup');
  document.querySelector('.tab-btn[data-tab="timetable"]').addEventListener('click', renderAll);
})();
