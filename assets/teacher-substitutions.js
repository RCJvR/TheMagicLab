/* Substitutions for the Timetable Planner.
   Log a teacher's absence, see which lessons need cover, and give each one a
   substitute who is free at that time. Suggestions favour teachers whose only
   free period of the day this is, and share cover out evenly; teachers with
   several free periods are listed for manual choice, never auto-assigned.
   Depends on teacher-shared.js (window.MLT) and teacher-timetable.js (window.MLT_TT). */
(function () {
  'use strict';
  const M = window.MLT, T = window.MLT_TT;
  if (!M || !T) return;
  const { $, el, toast, uid, str, csv, today } = M;
  const S = () => T.S();
  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  const FAIR_DAYS = 60;       // cover given in this many days before a date counts towards fairness
  const REASONS = ['Sick', 'Course or meeting', 'School trip', 'Family reason', 'Other'];

  /* ── cycle day for a calendar date ───────────────────────────────────── */
  const parseDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmtDate = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const isSchoolDay = (dt, hol) => dt.getDay() !== 0 && dt.getDay() !== 6 && !hol.has(fmtDate(dt));
  // Counts school days (Monday to Friday, minus holidays) from a known anchor date.
  function cycleDayFor(ds) {
    const c = S().cycle, N = S().days.length;
    if (!DATE_RE.test(ds)) return { day: null, school: false };
    const hol = new Set(c.holidays), t = parseDate(ds);
    if (!isSchoolDay(t, hol)) return { day: null, school: false };
    if (!c.anchor) return { day: null, school: true, unknown: true };
    const a = parseDate(c.anchor);
    if (Math.abs(t - a) > 800 * 864e5) return { day: null, school: true, unknown: true };
    const step = t >= a ? 1 : -1, cur = new Date(a);
    let count = 0;
    while (fmtDate(cur) !== ds) { cur.setDate(cur.getDate() + step); if (isSchoolDay(cur, hol)) count += step; }
    return { day: (((c.anchorDay + count) % N) + N) % N, school: true };
  }
  const niceDate = ds => DATE_RE.test(ds) ? parseDate(ds).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : ds;

  /* ── who is busy and free ────────────────────────────────────────────── */
  // busy.get(teacherId) = Set of 'day-period' the teacher is teaching in.
  function busyMap() {
    const m = new Map();
    S().placed.forEach(p => {
      const L = T.byId(S().lessons, p.lesson); if (!L || !L.teacher) return;
      if (!m.has(L.teacher)) m.set(L.teacher, new Set());
      for (let k = 0; k < p.len; k++) m.get(L.teacher).add(p.day + '-' + (p.period + k));
    });
    return m;
  }
  const absCovers = (a, p) => !a.periods || a.periods.includes(p);
  const keyOf = (a, p) => a.id + '|' + p;

  // Lessons the absent teacher would have taught: one item per period.
  function itemsFor(a, busyPlaced) {
    const out = [];
    S().placed.forEach(pl => {
      if (pl.day !== a.day) return;
      const L = T.byId(S().lessons, pl.lesson);
      if (!L || L.teacher !== a.teacher) return;
      for (let k = 0; k < pl.len; k++) { const p = pl.period + k; if (absCovers(a, p)) out.push({ abs: a, period: p, lesson: L, key: keyOf(a, p) }); }
    });
    return out.sort((x, y) => x.period - y.period);
  }
  const absencesOn = ds => S().absences.filter(a => a.date === ds);

  // Count of timetabled free teaching periods for a teacher on a cycle day
  // (not counting periods they are blocked for).
  function freePeriods(t, d, busy) {
    const b = busy.get(t.id) || new Set(); let n = 0;
    S().days[d].periods.forEach((p, pi) => { if (!p.brk && !b.has(d + '-' + pi) && !t.off.includes(d + '-' + pi)) n++; });
    return n;
  }
  // Cover given by each teacher in the FAIR_DAYS before `ds`.
  function coverCounts(ds) {
    const to = parseDate(ds), from = new Date(to); from.setDate(from.getDate() - FAIR_DAYS);
    const count = new Map();
    Object.entries(S().cover).forEach(([k, v]) => {
      if (!v.sub) return;
      const a = S().absences.find(x => x.id === k.split('|')[0]); if (!a) return;
      const dt = parseDate(a.date); if (dt >= from && dt < to) count.set(v.sub, (count.get(v.sub) || 0) + 1);
    });
    return count;
  }
  // Everything the suggestions need about one date, worked out once: who is
  // busy, who is absent when, what is already assigned, how much cover each
  // teacher has given lately and how many free periods each has that day.
  function ctxFor(ds) {
    const busy = busyMap(), counts = coverCounts(ds), abs = absencesOn(ds);
    const items = []; abs.forEach(a => itemsFor(a).forEach(it => items.push(it)));
    const ctx = { ds, busy, counts, items, absentAt: new Map(), takenAt: new Map(), today: new Map(), free: new Map() };
    const add = (map, k, v) => { if (!map.has(k)) map.set(k, new Set()); map.get(k).add(v); };
    abs.forEach(a => { for (let p = 0; p < 40; p++) if (absCovers(a, p)) add(ctx.absentAt, p, a.teacher); });
    items.forEach(it => { const v = S().cover[it.key]; if (v && v.sub) { add(ctx.takenAt, it.period, v.sub); ctx.today.set(v.sub, (ctx.today.get(v.sub) || 0) + 1); } });
    return ctx;
  }
  function freeCount(ctx, t, d) {
    const k = t.id + '|' + d; if (ctx.free.has(k)) return ctx.free.get(k);
    const n = freePeriods(t, d, ctx.busy); ctx.free.set(k, n); return n;
  }
  // Teachers who can take this item. A teacher already covering something else
  // in the same period, or absent then, is never offered.
  function candidates(item, ctx, skipKey) {
    const d = item.abs.day, p = item.period, out = [];
    const skipSub = skipKey && S().cover[skipKey] ? S().cover[skipKey].sub : '';
    const absent = ctx.absentAt.get(p) || new Set(), taken = ctx.takenAt.get(p) || new Set();
    S().teachers.forEach(t => {
      if (t.id === item.abs.teacher || absent.has(t.id)) return;
      if (taken.has(t.id) && t.id !== skipSub) return;
      if ((ctx.busy.get(t.id) || new Set()).has(d + '-' + p) || t.off.includes(d + '-' + p)) return;
      const free = freeCount(ctx, t, d);
      const today = (ctx.today.get(t.id) || 0) - (t.id === skipSub ? 1 : 0);
      out.push({ t, free, tier: free === 1 ? 'A' : 'B', covers: ctx.counts.get(t.id) || 0, today });
    });
    // Most free periods first; a teacher whose only free period this is comes
    // after them (a last resort); anyone already covering that day comes last.
    const rank = x => x.today > 0 ? 2 : x.free === 1 ? 1 : 0;
    return out.sort((x, y) => rank(x) - rank(y) || y.free - x.free || x.covers - y.covers || x.t.name.localeCompare(y.t.name));
  }

  // Fill the cover list, protecting people's free periods:
  //   1. teachers with the MOST free periods that day go first, then those with
  //      fewer and fewer (two free periods is the lowest level used here);
  //      each is used for their first cover of the day only;
  //   2. a teacher whose ONLY free period this is comes last, and only if
  //      `lastResort` is on.
  // Within a level the lesson with the fewest options is covered first (counting
  // every eligible teacher, so it is not starved), and ties go to whoever has
  // covered least lately. A second cover in a day is always a manual choice.
  function autoAssign(ds, lastResort) {
    const ctx = ctxFor(ds); let made = 0;
    const maxFree = Math.max(2, ...S().teachers.map(t => S().days.reduce((m, _, d) => Math.max(m, freeCount(ctx, t, d)), 0)));
    const levels = []; for (let f = maxFree; f >= 2; f--) levels.push(f);
    if (lastResort) levels.push(1);
    levels.forEach(level => {
      for (;;) {
        let best = null;
        ctx.items.forEach(it => {
          const v = S().cover[it.key]; if (v && (v.sub || v.none)) return;
          const all = candidates(it, ctx, it.key).filter(x => x.today === 0 && (x.free >= 2 || lastResort));
          const here = all.filter(x => x.free === level);
          if (here.length && (!best || all.length < best.all)) best = { it, here, all: all.length };
        });
        if (!best) break;
        const low = Math.min(...best.here.map(x => x.covers)), pool = best.here.filter(x => x.covers === low);
        const pick = pool[Math.floor(Math.random() * pool.length)], id = pick.t.id;
        S().cover[best.it.key] = { sub: id, none: false };
        if (!ctx.takenAt.has(best.it.period)) ctx.takenAt.set(best.it.period, new Set()); ctx.takenAt.get(best.it.period).add(id);
        ctx.today.set(id, (ctx.today.get(id) || 0) + 1); ctx.counts.set(id, (ctx.counts.get(id) || 0) + 1); made++;
      }
    });
    return made;
  }

  /* ── UI ──────────────────────────────────────────────────────────────── */
  let viewDate = today(), logDraft = null;
  const lbl = (text, forId) => el('label', { class: 'aa-lbl', for: forId, text });
  const btn = (text, onclick, cls) => el('button', { class: 'aa-btn' + (cls ? ' ' + cls : ''), type: 'button', text, onclick });
  const field = (label, id, control) => el('div', {}, [lbl(label, id), control]);
  const periodText = (d, p) => { const x = T.periodAt(d, p); return x ? x.label + (x.start ? ' (' + x.start + (x.end ? '–' + x.end : '') + ')' : '') : ''; };
  const persist = () => T.save();

  function render() {
    const host = $('tab-timetable-subs'); if (!host) return;
    host.textContent = '';
    const s = S();
    if (!s.teachers.length || !s.placed.length) {
      host.appendChild(el('div', { class: 'aa-card aa-empty-hint', text: 'Substitutions use your timetable to find who is free. Add teachers and lessons, then generate the timetable first.' }));
      return;
    }
    renderSettings(host); renderLog(host); renderCover(host); renderTally(host);
  }

  function renderSettings(host) {
    const s = S(), c = s.cycle;
    const anchor = el('input', { class: 'aa-in', id: 'sb-anchor', type: 'date', value: c.anchor });
    const aday = el('select', { class: 'aa-in', id: 'sb-aday' }, s.days.map((d, i) => el('option', { value: String(i), text: d.name }))); aday.value = String(c.anchorDay);
    const hol = el('textarea', { class: 'aa-in', id: 'sb-hol', rows: '3', placeholder: 'One date a line, e.g. 2027-03-22', 'aria-label': 'Non-school days' }); hol.value = c.holidays.join('\n');
    anchor.addEventListener('change', () => { c.anchor = DATE_RE.test(anchor.value) ? anchor.value : ''; persist(); render(); });
    aday.addEventListener('change', () => { c.anchorDay = +aday.value; persist(); render(); });
    hol.addEventListener('change', () => { c.holidays = [...new Set(hol.value.split(/[\s,;]+/).filter(x => DATE_RE.test(x)))].slice(0, 500); persist(); render(); });
    const det = el('details', { class: 'aa-card' }, [
      el('summary', { class: 'aa-sum', text: 'Where the cycle sits on the calendar' + (c.anchor ? '' : ' (set this once)') }),
      el('div', { class: 'aa-hint', text: 'Tell the planner one date and which cycle day it is. It then works out the cycle day for any other date, skipping weekends and the non-school days you list. You can always override the day when you log an absence.' }),
      el('div', { class: 'aa-row' }, [field('A school date', 'sb-anchor', anchor), field('is cycle day', 'sb-aday', aday)]),
      lbl('Non-school days (holidays, closure days)', 'sb-hol'), hol
    ]);
    if (!c.anchor) det.setAttribute('open', '');
    host.appendChild(det);
  }

  function renderLog(host) {
    const s = S();
    if (!logDraft) logDraft = { teacher: s.teachers[0].id, date: today(), whole: true, periods: [], reason: REASONS[0], note: '', day: null };
    const D = logDraft;
    const cd = cycleDayFor(D.date);
    const auto = cd.day != null ? cd.day : 0;
    if (D.day == null || D.autoFor !== D.date) { D.day = auto; D.autoFor = D.date; }
    const tsel = el('select', { class: 'aa-in', id: 'sb-teacher' }, s.teachers.slice().sort((a, b) => a.name.localeCompare(b.name)).map(t => el('option', { value: t.id, text: t.name }))); tsel.value = D.teacher;
    const dt = el('input', { class: 'aa-in', id: 'sb-date', type: 'date', value: D.date });
    const dsel = el('select', { class: 'aa-in', id: 'sb-day' }, s.days.map((d, i) => el('option', { value: String(i), text: d.name }))); dsel.value = String(D.day);
    const rsel = el('select', { class: 'aa-in', id: 'sb-reason' }, REASONS.map(r => el('option', { value: r, text: r }))); rsel.value = D.reason;
    const scope = el('select', { class: 'aa-in', id: 'sb-scope' }, [el('option', { value: 'whole', text: 'Whole day' }), el('option', { value: 'some', text: 'Only certain periods' })]); scope.value = D.whole ? 'whole' : 'some';
    const note = el('input', { class: 'aa-in', id: 'sb-note', value: D.note, maxlength: '200', placeholder: 'Optional note' });
    tsel.addEventListener('change', () => { D.teacher = tsel.value; });
    dt.addEventListener('change', () => { D.date = DATE_RE.test(dt.value) ? dt.value : today(); D.day = null; render(); });
    dsel.addEventListener('change', () => { D.day = +dsel.value; D.autoFor = D.date; render(); });
    rsel.addEventListener('change', () => { D.reason = rsel.value; });
    scope.addEventListener('change', () => { D.whole = scope.value === 'whole'; render(); });
    note.addEventListener('input', () => { D.note = note.value; });
    const chips = el('div', { class: 'aa-chips', role: 'group', 'aria-label': 'Periods the teacher is out' });
    if (!D.whole) s.days[D.day].periods.forEach((p, pi) => {
      if (p.brk) return;
      const cb = el('input', { type: 'checkbox', value: String(pi) }); cb.checked = D.periods.includes(pi);
      cb.addEventListener('change', () => { D.periods = cb.checked ? D.periods.concat(pi) : D.periods.filter(x => x !== pi); });
      chips.appendChild(el('label', { class: 'aa-chip' }, [cb, el('span', { text: p.label })]));
    });
    const info = !cd.school ? 'That date is a weekend or a non-school day.' : cd.unknown ? 'Set where the cycle sits on the calendar (above) to fill the day in automatically.' : '';
    host.appendChild(el('div', { class: 'aa-section-title', text: 'Log an absence' }));
    host.appendChild(el('div', { class: 'aa-card' }, [
      el('div', { class: 'aa-row' }, [field('Teacher', 'sb-teacher', tsel), field('Date', 'sb-date', dt), field('Cycle day', 'sb-day', dsel)]),
      info ? el('div', { class: 'aa-hint', text: info }) : el('span'),
      el('div', { class: 'aa-row' }, [field('Out for', 'sb-scope', scope), field('Reason', 'sb-reason', rsel), field('Note', 'sb-note', note)]),
      D.whole ? el('span') : el('div', {}, [lbl('Periods out', ''), chips]),
      el('div', { class: 'aa-actions' }, [btn('Log absence', () => {
        if (!D.whole && !D.periods.length) return toast('Tick the periods the teacher is out');
        if (s.absences.some(a => a.teacher === D.teacher && a.date === D.date)) return toast('That teacher already has an absence logged for that date. Delete it first to change it.');
        s.absences.push({ id: uid(), teacher: D.teacher, date: D.date, day: D.day, periods: D.whole ? null : D.periods.slice().sort((a, b) => a - b), reason: D.reason, note: D.note.trim().slice(0, 200) });
        viewDate = D.date; persist(); toast('Absence logged'); logDraft = null; render();
      }, 'aa-btn--primary')])
    ]));
  }

  function renderCover(host) {
    const s = S(), ds = viewDate, abs = absencesOn(ds), ctx = ctxFor(ds);
    const dateIn = el('input', { class: 'aa-in', id: 'sb-view', type: 'date', value: ds });
    dateIn.addEventListener('change', () => { if (DATE_RE.test(dateIn.value)) { viewDate = dateIn.value; render(); } });
    host.appendChild(el('div', { class: 'aa-section-title', text: 'Cover list' }));
    const card = el('div', { class: 'aa-card' }, [el('div', { class: 'aa-row' }, [field('Show cover for', 'sb-view', dateIn)])]);
    host.appendChild(card);
    if (!abs.length) { card.appendChild(el('div', { class: 'aa-empty-hint', text: 'Nobody is logged absent on ' + niceDate(ds) + '.' })); return; }
    const items = []; abs.forEach(a => itemsFor(a).forEach(it => items.push(it)));
    items.sort((x, y) => x.period - y.period || x.abs.day - y.abs.day);
    const unfilled = items.filter(it => { const v = s.cover[it.key]; return !v || (!v.sub && !v.none); }).length;
    card.appendChild(el('div', { class: 'aa-hint', text: abs.map(a => ((T.byId(s.teachers, a.teacher) || {}).name || '?') + ' (' + s.days[a.day].name + ', ' + (a.periods ? a.periods.length + ' period(s)' : 'whole day') + ', ' + a.reason + ')').join('; ') + '. ' + items.length + ' lesson period(s) to cover, ' + unfilled + ' without cover.' }));
    card.appendChild(el('div', { class: 'aa-actions' }, [
      btn('Fill what can be filled automatically', () => { const n = autoAssign(ds, M.store.get('sb-last', true)); persist(); toast(n ? n + ' assigned' : 'Nothing more could be assigned automatically'); render(); }, 'aa-btn--primary'),
      btn('Clear cover for this date', () => { items.forEach(it => delete s.cover[it.key]); persist(); render(); }),
      btn('Print cover sheet', () => printSheet(ds, items)),
      btn('Copy for Excel', () => M.copy(csv([['Period', 'Absent teacher', 'Class', 'Subject', 'Room', 'Substitute']].concat(items.map(it => rowData(it).slice(0, 6)))))),
    ]));
    const many = el('input', { type: 'checkbox', id: 'sb-last' }); many.checked = M.store.get('sb-last', true);
    many.addEventListener('change', () => { M.store.set('sb-last', many.checked); });
    card.appendChild(el('label', { class: 'aa-pick', for: 'sb-last', style: 'display:flex;gap:8px;margin:8px 0' }, [many, el('span', { text: 'As a last resort, also use a teacher whose only free period of the day this is'})]));
    card.appendChild(el('div', { class: 'aa-hint', text: 'Automatic cover starts with the teachers who have the most free periods that day and works down to teachers with two. Each is used once a day. A teacher whose only free period it is comes last, and only if the box above is ticked. Anyone already covering that day is never added automatically, but can still be chosen by hand from the list. Within each group, cover is shared out evenly.' }));
    const tbl = el('table', { class: 'aa-grid' }); tbl.appendChild(el('tr', {}, ['Period', 'Absent', 'Class', 'Subject', 'Room', 'Substitute', ''].map(h => el('th', { text: h }))));
    items.forEach(it => {
      const v = s.cover[it.key] || { sub: '', none: false };
      const cand = candidates(it, ctx, it.key), A = cand.filter(x => x.tier === 'A'), B = cand.filter(x => x.tier === 'B');
      const sel = el('select', { class: 'aa-in', 'aria-label': 'Substitute for ' + (T.byId(s.teachers, it.abs.teacher) || {}).name + ', period ' + it.period });
      sel.appendChild(el('option', { value: '', text: '— not assigned —' })); sel.appendChild(el('option', { value: '__none', text: 'No cover needed' }));
      const grp = (label, list) => { if (!list.length) return; const g = el('optgroup', { label }); list.forEach(x => g.appendChild(el('option', { value: x.t.id, text: x.t.name + ' · ' + x.free + ' free today · ' + x.covers + ' cover' + (x.covers === 1 ? '' : 's') + ' lately' + (x.today ? ' · covering ' + x.today + ' today' : '') }))); sel.appendChild(g); };
      const first = cand.filter(x => !x.today && x.free >= 2), sole = cand.filter(x => !x.today && x.free === 1), again = cand.filter(x => x.today);
      grp('Several free periods today, most free first (' + first.length + ')', first);
      grp('Only free period today: last resort (' + sole.length + ')', sole);
      grp('Already covering today: choose by hand (' + again.length + ')', again);
      let warn = '';
      if (v.sub && !cand.some(x => x.t.id === v.sub)) { const t = T.byId(s.teachers, v.sub); sel.appendChild(el('option', { value: v.sub, text: (t ? t.name : '?') + ' (no longer free)' })); warn = 'The chosen teacher is no longer free then. Choose someone else.'; }
      sel.value = v.none ? '__none' : v.sub || '';
      sel.addEventListener('change', () => { if (sel.value === '') delete s.cover[it.key]; else if (sel.value === '__none') s.cover[it.key] = { sub: '', none: true }; else s.cover[it.key] = { sub: sel.value, none: false }; persist(); render(); });
      const status = warn || (v.sub || v.none ? '' : cand.length ? 'Needs cover' : 'Nobody is free');
      tbl.appendChild(el('tr', { class: warn || (!v.sub && !v.none && !cand.length) ? 'aa-low' : '' }, [
        el('td', { text: periodText(it.abs.day, it.period) }), el('td', { text: (T.byId(s.teachers, it.abs.teacher) || {}).name || '?' }),
        el('td', { text: T.cNames(it.lesson) }), el('td', { text: (T.byId(s.subjects, it.lesson.subject) || {}).name || '' }), el('td', { text: (T.byId(s.rooms, it.lesson.room) || {}).name || '' }),
        el('td', {}, [sel]), el('td', { text: status })
      ]));
    });
    card.appendChild(el('div', { class: 'aa-tbl-wrap' }, [tbl]));
    // absences on this date, removable
    const list = el('div', { style: 'margin-top:12px' });
    abs.forEach(a => list.appendChild(el('div', { class: 'aa-att-row' }, [
      el('div', { text: ((T.byId(s.teachers, a.teacher) || {}).name || '?') + ' · ' + a.reason + (a.note ? ' · ' + a.note : '') }),
      btn('Delete this absence', () => { if (!confirm('Delete this absence and its cover?')) return; s.absences = s.absences.filter(x => x.id !== a.id); Object.keys(s.cover).forEach(k => { if (k.startsWith(a.id + '|')) delete s.cover[k]; }); persist(); render(); }, 'aa-btn--sm')
    ])));
    card.appendChild(list);
  }

  function rowData(it) {
    const s = S(), v = s.cover[it.key] || {};
    const sub = v.none ? 'No cover needed' : v.sub ? (T.byId(s.teachers, v.sub) || {}).name : '';
    return [periodText(it.abs.day, it.period), (T.byId(s.teachers, it.abs.teacher) || {}).name || '?', T.cNames(it.lesson), (T.byId(s.subjects, it.lesson.subject) || {}).name || '', (T.byId(s.rooms, it.lesson.room) || {}).name || '', sub || ''];
  }
  function printSheet(ds, items) {
    const s = S(), dayNames = [...new Set(items.map(it => s.days[it.abs.day].name))].join(', ');
    M.printDoc(pa => {
      pa.appendChild(el('h1', { class: 'aa-pr-h', text: (s.school ? s.school + ' · ' : '') + 'Cover list' }));
      pa.appendChild(el('div', { class: 'aa-pr-sub', text: niceDate(ds) + (dayNames ? ' · ' + dayNames : '') }));
      const t = el('table', {}, [el('tr', {}, ['Period', 'Absent', 'Class', 'Subject', 'Room', 'Substitute'].map(h => el('th', { text: h })))]);
      items.forEach(it => t.appendChild(el('tr', {}, rowData(it).map(x => el('td', { text: x })))));
      pa.appendChild(t);
      const by = new Map(); items.forEach(it => { const v = s.cover[it.key]; if (v && v.sub) { if (!by.has(v.sub)) by.set(v.sub, []); by.get(v.sub).push(it); } });
      if (by.size) {
        pa.appendChild(el('h1', { class: 'aa-pr-h', style: 'margin-top:8mm', text: 'By substitute' }));
        const t2 = el('table', {}, [el('tr', {}, ['Substitute', 'Period', 'Class', 'Subject', 'Room', 'For'].map(h => el('th', { text: h })))]);
        [...by.entries()].sort((a, b) => (T.byId(s.teachers, a[0]) || {}).name.localeCompare((T.byId(s.teachers, b[0]) || {}).name)).forEach(([tid, its]) => its.forEach(it => t2.appendChild(el('tr', {}, [(T.byId(s.teachers, tid) || {}).name, periodText(it.abs.day, it.period), T.cNames(it.lesson), (T.byId(s.subjects, it.lesson.subject) || {}).name || '', (T.byId(s.rooms, it.lesson.room) || {}).name || '', (T.byId(s.teachers, it.abs.teacher) || {}).name || ''].map(x => el('td', { text: x }))))));
        pa.appendChild(t2);
      }
    });
  }

  function renderTally(host) {
    const s = S(); host.appendChild(el('div', { class: 'aa-section-title', text: 'Who has been covering' }));
    const from = el('input', { class: 'aa-in', id: 'sb-from', type: 'date' }), to = el('input', { class: 'aa-in', id: 'sb-to', type: 'date' });
    const d0 = new Date(); d0.setDate(d0.getDate() - 90); from.value = (logDraft && logDraft.from) || fmtDate(d0); to.value = (logDraft && logDraft.to) || today();
    const body = el('div');
    const draw = () => {
      body.textContent = '';
      const f = parseDate(from.value), tt = parseDate(to.value), cov = new Map(), out = new Map();
      s.absences.forEach(a => {
        const dt = parseDate(a.date); if (dt < f || dt > tt) return;
        out.set(a.teacher, (out.get(a.teacher) || 0) + 1);
        itemsFor(a).forEach(it => { const v = s.cover[it.key]; if (v && v.sub) cov.set(v.sub, (cov.get(v.sub) || 0) + 1); });
      });
      const rows = s.teachers.map(t => [t.name, cov.get(t.id) || 0, out.get(t.id) || 0]).filter(r => r[1] || r[2]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
      if (!rows.length) { body.appendChild(el('div', { class: 'aa-empty-hint', text: 'No cover or absences in that range.' })); return; }
      const t = el('table', { class: 'aa-grid' }, [el('tr', {}, ['Teacher', 'Periods covered', 'Days absent'].map(h => el('th', { text: h })))]);
      rows.forEach(r => t.appendChild(el('tr', {}, r.map((x, i) => el('td', { text: String(x), class: i ? 'aa-c' : '' })))));
      body.appendChild(el('div', { class: 'aa-tbl-wrap' }, [t]));
      body.appendChild(el('div', { class: 'aa-actions' }, [btn('Copy for Excel', () => M.copy(csv([['Teacher', 'Periods covered', 'Days absent']].concat(rows))), 'aa-btn--sm')]));
    };
    from.addEventListener('change', () => { if (DATE_RE.test(from.value)) draw(); }); to.addEventListener('change', () => { if (DATE_RE.test(to.value)) draw(); });
    host.appendChild(el('div', { class: 'aa-card' }, [el('div', { class: 'aa-row' }, [field('From', 'sb-from', from), field('To', 'sb-to', to)]), body]));
    draw();
  }

  T.register('subs', render);
  T.refresh();
  window.MLT_SUBS = { cycleDayFor, candidates, autoAssign, itemsFor, busyMap, coverCounts, ctxFor }; // exposed for testing
})();
