/* Markbook tab in the teacher dashboard (Grading Grimoire phase 2, spec §6).
   One class at a time: learners × tasks, term and year marks (assets/markbook-calc.js), typed marks
   with a/e/x/m statuses, marks returned from Grading Grimoire, imports from this browser's
   Assessment Tracker and from Test Tome, and CSV / Excel export. Tables: class_roster, mb_tasks,
   mb_marks, mb_settings (supabase-grading-grimoire-phase0.sql). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const C = () => window.MLMarkbookCalc;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = n => n == null || isNaN(n) ? '' : String(Math.round(n * 10) / 10);
  const TYPES = ['Test', 'Exam', 'Practical', 'Project', 'Assignment', 'Oral', 'Practice', 'Other'];
  const PREF = 'mlMarkbookClass';
  let classes = [], cls = null, roster = [], tasks = [], marks = new Map(), settings = { missing_as_zero: false }, ready = false;
  const key = (t, r) => t + '|' + r;
  const sb = () => window.MagicLabAuth._supabase();
  const me = () => window.MagicLabAuth.getSession().user.id;
  function say(t, bad) { const n = $('mb-status'); n.textContent = t; n.className = 'mb-status' + (bad ? ' is-bad' : ''); if (!bad) setTimeout(() => { if (n.textContent === t) n.textContent = ''; }, 4000); }

  /* ── Load ──────────────────────────────────────────────────── */
  async function load() {
    const A = window.MagicLabAuth; if (!A || !A.isLoggedIn()) return;
    if (!ready) wire();
    classes = await A.getMyClasses();
    const sel = $('mb-class'); sel.textContent = '';
    if (!classes.length) { $('mb-grid').innerHTML = '<div class="empty-state"><h3>No classes yet</h3><p>Create a class on the My Classes tab first.</p></div>'; return; }
    let want = null; try { want = localStorage.getItem(PREF); } catch (e) {}
    classes.forEach(c => sel.appendChild(new Option(c.name + (c.co_teacher ? ' (co-teaching)' : ''), c.id)));
    sel.value = classes.some(c => c.id === want) ? want : classes[0].id;
    await openClass(sel.value);
  }
  async function openClass(id) {
    cls = classes.find(c => c.id === id); if (!cls) return;
    try { localStorage.setItem(PREF, id); } catch (e) {}
    $('mb-grid').innerHTML = '<div class="empty-state"><h3>Loading the markbook…</h3></div>';
    const [r, t, s] = await Promise.all([
      sb().from('class_roster').select('id, student_id, display_name, admission_no, active').eq('class_id', id).order('display_name'),
      sb().from('mb_tasks').select('*').eq('class_id', id).order('term', { nullsFirst: false }).order('task_date', { nullsFirst: false }).order('created_at'),
      sb().from('mb_settings').select('*').eq('class_id', id).maybeSingle()
    ]);
    if (r.error || t.error) { $('mb-grid').innerHTML = '<div class="empty-state"><h3>The markbook could not load</h3><p>' + esc((r.error || t.error).message) + '</p></div>'; return; }
    tasks = t.data || []; settings = s.data || { missing_as_zero: false };
    $('mb-missing').checked = !!settings.missing_as_zero;
    marks = new Map();
    if (tasks.length) {
      const { data } = await sb().from('mb_marks').select('id, task_id, roster_id, mark, status').in('task_id', tasks.map(x => x.id));
      (data || []).forEach(m => marks.set(key(m.task_id, m.roster_id), m));
    }
    // learners: active ones, plus anyone who has marks
    roster = (r.data || []).filter(x => x.active || [...marks.values()].some(m => m.roster_id === x.id));
    render();
  }

  /* ── Grid ──────────────────────────────────────────────────── */
  const markOf = (t, r) => marks.get(key(t.id, r.id)) || null;
  function render() {
    const host = $('mb-grid');
    // keep the cell the teacher is in (a save re-draws the grid)
    const a = document.activeElement, keep = a && a.classList && a.classList.contains('mb-in') ? { t: a.dataset.task, r: a.dataset.roster } : null;
    const weightSum = tasks.filter(t => t.counts_to_year !== false).reduce((a, t) => a + Number(t.weight || 0), 0);
    $('mb-weights').textContent = tasks.length ? 'Weights add up to ' + num(weightSum) + '% of the year' + (weightSum === 100 ? '' : weightSum > 100 ? ' (over 100%)' : weightSum ? ' (' + num(100 - weightSum) + '% still to set)' : ' (no weights: every counted task counts the same)') : '';
    $('mb-weights').className = 'mb-weights' + (weightSum > 100 ? ' is-bad' : weightSum === 100 ? ' is-ok' : '');
    if (!roster.length) { host.innerHTML = '<div class="empty-state"><h3>No learners in this class yet</h3><p>Learners appear when they join with the class code. You can also add a learner by name.</p></div>'; return; }
    const terms = [...new Set(tasks.map(t => t.term).filter(Boolean))].sort();
    const results = new Map(roster.map(r => [r.id, C().learnerResult(tasks, t => markOf(t, r), { missingAsZero: settings.missing_as_zero })]));
    let h = '<div class="mb-scroll"><table class="mb-table"><thead><tr><th scope="col" class="mb-name">Learner</th>';
    tasks.forEach(t => {
      const src = t.source === 'assignment' ? 'Grading Grimoire' : t.source === 'tome' ? 'Test Tome' : t.source === 'practice' ? 'Practice' : '';
      h += '<th scope="col" class="mb-task' + (t.counts_to_year === false ? ' is-uncounted' : '') + '"><button type="button" class="mb-task-btn" data-task="' + esc(t.id) + '" title="Edit this task">' +
        '<span class="mb-task-title">' + esc(t.title) + '</span>' +
        '<span class="mb-task-meta">' + (t.term ? 'T' + t.term + ' · ' : '') + '/' + num(t.total) + (t.counts_to_year === false ? ' · not counted' : ' · ' + num(t.weight) + '%') + (src ? ' · ' + src : '') + '</span></button></th>';
    });
    terms.forEach(k => { h += '<th scope="col" class="mb-calc">Term ' + k + '</th>'; });
    h += '<th scope="col" class="mb-calc">Year</th><th scope="col" class="mb-calc">Level</th></tr></thead><tbody>';
    roster.forEach(r => {
      const res = results.get(r.id);
      h += '<tr><th scope="row" class="mb-name">' + esc(r.display_name) + (r.student_id ? '' : ' <span class="mb-tag" title="No account on The Magic Lab">name only</span>') + (r.active ? '' : ' <span class="mb-tag">left</span>') + '</th>';
      tasks.forEach(t => {
        const m = markOf(t, r), locked = t.source === 'assignment';
        const over = m && m.mark != null && Number(m.mark) > Number(t.total);
        h += '<td class="mb-cell' + (over ? ' is-over' : '') + (m && m.status ? ' is-status' : '') + '">' +
          (locked ? '<span class="mb-locked" title="From Grading Grimoire. Change it on the marking page and return the marks again.">' + esc(C().cellText(m)) + '</span>'
                  : '<input class="mb-in" inputmode="decimal" aria-label="' + esc(r.display_name + ', ' + t.title + ' (out of ' + num(t.total) + ')') + '" data-task="' + esc(t.id) + '" data-roster="' + esc(r.id) + '" value="' + esc(C().cellText(m)) + '">') + '</td>';
      });
      terms.forEach(k => { h += '<td class="mb-calc">' + (res.terms[k] == null ? '' : Math.round(res.terms[k]) + '%') + '</td>'; });
      h += '<td class="mb-calc mb-year">' + (res.year == null ? '' : Math.round(res.year) + '%') + '</td><td class="mb-calc">' + (res.level || '') + '</td></tr>';
    });
    // class averages
    h += '<tr class="mb-avg"><th scope="row" class="mb-name">Class average</th>';
    tasks.forEach(t => {
      const ps = roster.map(r => markOf(t, r)).filter(m => m && m.mark != null).map(m => m.mark / t.total * 100);
      h += '<td class="mb-calc">' + (ps.length ? Math.round(ps.reduce((a, b) => a + b, 0) / ps.length) + '%' : '') + '</td>';
    });
    terms.forEach(k => { const ps = [...results.values()].map(x => x.terms[k]).filter(v => v != null); h += '<td class="mb-calc">' + (ps.length ? Math.round(ps.reduce((a, b) => a + b, 0) / ps.length) + '%' : '') + '</td>'; });
    const ys = [...results.values()].map(x => x.year).filter(v => v != null);
    h += '<td class="mb-calc mb-year">' + (ys.length ? Math.round(ys.reduce((a, b) => a + b, 0) / ys.length) + '%' : '') + '</td><td></td></tr>';
    h += '</tbody></table></div>';
    if (!tasks.length) h += '<p class="mb-hint">No tasks yet. Add one with "+ Task", import from the Assessment Tracker or Test Tome, or return marks in Grading Grimoire.</p>';
    host.innerHTML = h;
    if (keep) { const n = host.querySelector('.mb-in[data-task="' + CSS.escape(keep.t) + '"][data-roster="' + CSS.escape(keep.r) + '"]'); if (n) { n.focus(); n.select(); } }
  }

  /* ── Typing marks ──────────────────────────────────────────── */
  async function saveCell(input) {
    const t = tasks.find(x => x.id === input.dataset.task), rid = input.dataset.roster, k = key(t.id, rid);
    const v = C().parseCell(input.value), old = marks.get(k);
    if (v.invalid) { input.classList.add('is-bad'); say('Type a mark, or a for absent, e for excused, x for exempt, m for missing.', true); return; }
    input.classList.remove('is-bad');
    if (v.empty) {
      if (!old) return;
      const { error } = await sb().from('mb_marks').delete().eq('id', old.id);
      if (error) return say('Could not clear it: ' + error.message, true);
      marks.delete(k);
    } else {
      if (old && old.mark === v.mark && old.status === v.status) return;
      const { data, error } = await sb().from('mb_marks').upsert({ task_id: t.id, roster_id: rid, mark: v.mark, status: v.status, updated_by: me(), updated_at: new Date().toISOString() },
        { onConflict: 'task_id,roster_id' }).select('id, task_id, roster_id, mark, status').single();
      if (error) return say('Could not save: ' + error.message, true);
      marks.set(k, data);
      if (v.mark != null && v.mark > Number(t.total)) say('That is more than the task total of ' + num(t.total) + '.', true);
    }
    render();
  }
  function moveFocus(input, dRow, dCol) {
    const ins = [...document.querySelectorAll('#mb-grid .mb-in')];
    const cols = tasks.filter(t => t.source !== 'assignment').map(t => t.id);
    const rIdx = roster.findIndex(r => r.id === input.dataset.roster), cIdx = cols.indexOf(input.dataset.task);
    const r = roster[rIdx + dRow], c = cols[cIdx + dCol]; if (!r || !c) return;
    const n = ins.find(x => x.dataset.roster === r.id && x.dataset.task === c); if (n) { n.focus(); n.select(); }
  }

  /* ── Tasks ─────────────────────────────────────────────────── */
  function taskDialog(t) {
    const d = $('mb-task-dlg'); const f = $('mb-task-form'); f.reset();
    $('mb-task-head').textContent = t ? 'Edit task' : 'New task';
    $('mb-t-title').value = t ? t.title : ''; $('mb-t-type').value = t ? t.task_type : 'Test';
    $('mb-t-term').value = t && t.term ? String(t.term) : ''; $('mb-t-date').value = t && t.task_date ? t.task_date : '';
    $('mb-t-total').value = t ? t.total : 50; $('mb-t-weight').value = t ? t.weight : 0; $('mb-t-counts').checked = t ? t.counts_to_year !== false : true;
    $('mb-t-delete').hidden = !t; $('mb-t-err').textContent = '';
    $('mb-t-src').textContent = t && t.source === 'assignment' ? 'Marks come from Grading Grimoire; change them on the marking page.' : t && t.source === 'tome' ? 'Imported from Test Tome. Import again to refresh, or change marks here.' : '';
    d.dataset.task = t ? t.id : '';
    d.showModal(); $('mb-t-title').focus();
  }
  async function saveTask(e) {
    e.preventDefault();
    const d = $('mb-task-dlg'), id = d.dataset.task;
    const row = { title: $('mb-t-title').value.trim().slice(0, 120), task_type: $('mb-t-type').value, term: $('mb-t-term').value ? Number($('mb-t-term').value) : null,
      task_date: $('mb-t-date').value || null, total: Number($('mb-t-total').value), weight: Number($('mb-t-weight').value || 0), counts_to_year: $('mb-t-counts').checked };
    if (!row.title) return ($('mb-t-err').textContent = 'Give the task a name.');
    if (!(row.total > 0)) return ($('mb-t-err').textContent = 'The total must be more than 0.');
    if (!(row.weight >= 0 && row.weight <= 100)) return ($('mb-t-err').textContent = 'The weight is a percentage from 0 to 100.');
    const res = id ? await sb().from('mb_tasks').update(row).eq('id', id) : await sb().from('mb_tasks').insert({ ...row, class_id: cls.id, source: 'manual' });
    if (res.error) return ($('mb-t-err').textContent = res.error.message);
    d.close(); await openClass(cls.id); say('Task saved.');
  }
  async function deleteTask() {
    const d = $('mb-task-dlg'), id = d.dataset.task, t = tasks.find(x => x.id === id); if (!t) return;
    if (!confirm('Delete "' + t.title + '" and every mark in it? This cannot be undone.')) return;
    const { error } = await sb().from('mb_tasks').delete().eq('id', id);
    if (error) return ($('mb-t-err').textContent = error.message);
    d.close(); await openClass(cls.id); say('Task deleted.');
  }
  async function addLearner() {
    const name = (prompt('Learner\'s name (for a learner without an account on The Magic Lab):') || '').trim().slice(0, 80);
    if (!name) return;
    const { error } = await sb().from('class_roster').insert({ class_id: cls.id, display_name: name });
    if (error) return say(/duplicate|unique/i.test(error.message) ? 'There is already a learner called ' + name + ' in this class.' : 'Could not add: ' + error.message, true);
    await openClass(cls.id); say(name + ' added.');
  }

  /* ── Imports ───────────────────────────────────────────────── */
  // Match a list of names to roster rows (exact normalised name), creating name-only rows for the rest.
  async function rosterFor(names) {
    const byNorm = new Map(roster.map(r => [C().normName(r.display_name), r]));
    const out = new Map(), toAdd = [];
    names.forEach(n => { const r = byNorm.get(C().normName(n)); if (r) out.set(n, r); else if (!toAdd.includes(n)) toAdd.push(n); });
    if (toAdd.length) {
      const { data } = await sb().from('class_roster').insert(toAdd.map(n => ({ class_id: cls.id, display_name: n.slice(0, 80) }))).select('id, student_id, display_name, active');
      (data || []).forEach(r => { roster.push(r); out.set(toAdd.find(n => n.slice(0, 80) === r.display_name) || r.display_name, r); });
    }
    return { map: out, added: toAdd.length };
  }
  async function importTracker() {
    let local = [], tracker = {};
    try { local = JSON.parse(localStorage.getItem('aa:classes') || '[]'); tracker = JSON.parse(localStorage.getItem('aa:tracker') || '{}'); } catch (e) {}
    const withTasks = local.filter(c => tracker[c.id] && (tracker[c.id].tasks || []).length);
    if (!withTasks.length) return say('There is no Assessment Tracker programme saved in this browser.', true);
    const pick = withTasks.length === 1 ? withTasks[0] : withTasks.find(c => C().normName(c.name) === C().normName(cls.name)) || null;
    const choice = pick || withTasks[Number(prompt('Which Assessment Tracker class goes into ' + cls.name + '?\n' + withTasks.map((c, i) => (i + 1) + '. ' + c.name).join('\n')) || 0) - 1];
    if (!choice) return;
    if (!confirm('Import "' + choice.name + '" from the Assessment Tracker in this browser into ' + cls.name + '? Tasks already imported are skipped. Nothing in the browser is deleted.')) return;
    const data = tracker[choice.id];
    const names = [...new Set([...(choice.learners || []), ...Object.keys(data.marks || {})])];
    const { map, added } = await rosterFor(names);
    const done = new Set(tasks.map(t => t.import_ref).filter(Boolean));
    let nTasks = 0, nMarks = 0;
    for (const t of data.tasks) {
      const ref = ('aa:' + t.id).slice(0, 80);
      let taskId = (tasks.find(x => x.import_ref === ref) || {}).id;
      if (!done.has(ref)) {
        const { data: row, error } = await sb().from('mb_tasks').insert({ class_id: cls.id, source: 'manual', import_ref: ref, title: String(t.name || 'Task').slice(0, 120),
          task_type: TYPES.includes(t.type) ? t.type : 'Other', term: [1, 2, 3, 4].includes(+t.term) ? +t.term : null, task_date: /^\d{4}-\d{2}-\d{2}$/.test(t.date || '') ? t.date : null,
          total: Number(t.total) > 0 ? Number(t.total) : 1, weight: Math.min(100, Math.max(0, Number(t.weight) || 0)), counts_to_year: true }).select('id').single();
        if (error) continue; taskId = row.id; nTasks++;
      }
      const rows = Object.entries(data.marks || {}).filter(([, ms]) => ms && typeof ms[t.id] === 'number')
        .map(([name, ms]) => ({ task_id: taskId, roster_id: (map.get(name) || {}).id, mark: ms[t.id], status: null })).filter(x => x.roster_id);
      if (rows.length) { const { error } = await sb().from('mb_marks').upsert(rows, { onConflict: 'task_id,roster_id' }); if (!error) nMarks += rows.length; }
    }
    await openClass(cls.id);
    say('Imported ' + nTasks + ' task' + (nTasks === 1 ? '' : 's') + ' and ' + nMarks + ' mark' + (nMarks === 1 ? '' : 's') + (added ? '; added ' + added + ' learner' + (added === 1 ? '' : 's') + ' by name' : '') + '.');
  }
  async function importTome() {
    const { data: sessions, error } = await sb().from('tome_sessions').select('id, title, quiz_set, created_at').order('created_at', { ascending: false }).limit(40);
    if (error || !sessions || !sessions.length) return say('You have no Test Tome class sessions yet.', true);
    const list = $('mb-tome-list'); list.textContent = '';
    const { data: results } = await sb().from('tome_results').select('session_id, quiz_id, learner_name, learner_id, score, total, created_at').in('session_id', sessions.map(s => s.id));
    const groups = new Map();
    (results || []).forEach(r => { const k = r.session_id + '|' + r.quiz_id; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(r); });
    if (!groups.size) return say('Your Test Tome sessions have no results yet.', true);
    [...groups.entries()].forEach(([k, rs]) => {
      const s = sessions.find(x => x.id === rs[0].session_id);
      const b = document.createElement('button'); b.type = 'button'; b.className = 'mb-pick';
      b.textContent = s.title + ' · ' + rs[0].quiz_id + ' · ' + rs.length + ' result' + (rs.length === 1 ? '' : 's') + ' · ' + new Date(s.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
      b.onclick = () => { $('mb-tome-dlg').close(); importTomeGroup(s, rs); };
      list.appendChild(b);
    });
    $('mb-tome-dlg').showModal();
  }
  async function importTomeGroup(s, rs) {
    const total = Math.max(...rs.map(r => r.total));
    const ref = ('tome:' + s.id + ':' + rs[0].quiz_id).slice(0, 120);
    let task = tasks.find(t => t.source === 'tome' && t.source_ref === ref);
    if (!task) {
      const { data, error } = await sb().from('mb_tasks').insert({ class_id: cls.id, source: 'tome', source_ref: ref, title: (s.title + ' (' + rs[0].quiz_id + ')').slice(0, 120),
        task_type: 'Test', total, weight: 0, counts_to_year: true, task_date: s.created_at.slice(0, 10) }).select('*').single();
      if (error) return say('Could not create the task: ' + error.message, true);
      task = data;
    }
    // latest result per learner: by account first, then by name
    const latest = new Map();
    rs.slice().sort((a, b) => String(a.created_at).localeCompare(String(b.created_at))).forEach(r => latest.set(r.learner_id || ('n:' + C().normName(r.learner_name)), r));
    const byAccount = new Map(roster.filter(r => r.student_id).map(r => [r.student_id, r]));
    const byName = new Map(roster.map(r => [C().normName(r.display_name), r]));
    const rows = [], unmatched = [];
    latest.forEach(r => {
      const ro = (r.learner_id && byAccount.get(r.learner_id)) || byName.get(C().normName(r.learner_name));
      if (!ro) { unmatched.push(r.learner_name); return; }
      rows.push({ task_id: task.id, roster_id: ro.id, mark: Math.round(r.score / r.total * Number(task.total) * 10) / 10, status: null });
    });
    if (rows.length) { const { error } = await sb().from('mb_marks').upsert(rows, { onConflict: 'task_id,roster_id' }); if (error) return say('Could not save the marks: ' + error.message, true); }
    await openClass(cls.id);
    say('Imported ' + rows.length + ' Test Tome result' + (rows.length === 1 ? '' : 's') + (unmatched.length ? '. Not matched to a learner in this class: ' + unmatched.join(', ') : '') + '.', unmatched.length > 0);
  }

  /* ── Export ────────────────────────────────────────────────── */
  function table() {
    const terms = [...new Set(tasks.map(t => t.term).filter(Boolean))].sort();
    const head = ['Learner', 'Admission no', ...tasks.map(t => t.title + ' (' + (t.term ? 'T' + t.term + ', ' : '') + '/' + num(t.total) + (t.counts_to_year === false ? ', not counted' : ', ' + num(t.weight) + '%') + ')'),
      ...terms.map(k => 'Term ' + k + ' %'), 'Year %', 'Level'];
    const rows = roster.map(r => {
      const res = C().learnerResult(tasks, t => markOf(t, r), { missingAsZero: settings.missing_as_zero });
      return [r.display_name, r.admission_no || '', ...tasks.map(t => { const m = markOf(t, r); return !m ? '' : m.status ? m.status : Number(m.mark); }),
        ...terms.map(k => res.terms[k] == null ? '' : Math.round(res.terms[k] * 10) / 10), res.year == null ? '' : Math.round(res.year * 10) / 10, res.level || ''];
    });
    return [head, ...rows];
  }
  const fileName = ext => ('Markbook ' + cls.name).replace(/[^\w\- ]+/g, '').trim().slice(0, 60) + '.' + ext;
  function download(blob, name) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  function exportCsv() {
    const q = v => { const t = String(v ?? ''); return /[",;\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; };
    download(new Blob(['﻿' + table().map(r => r.map(q).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' }), fileName('csv'));
  }
  let xlsxLoading = null;
  async function exportXlsx() {
    if (!window.XLSX) {
      xlsxLoading = xlsxLoading || new Promise((res, rej) => { const s = document.createElement('script'); s.src = '/assets/vendor/sheetjs-0.20.3/xlsx.mini.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
      await xlsxLoading;
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(table());
    ws['!cols'] = [{ wch: 26 }, { wch: 12 }, ...tasks.map(() => ({ wch: 14 })), { wch: 9 }, { wch: 9 }, { wch: 7 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Marks');
    const info = [['Task', 'Type', 'Term', 'Date', 'Out of', 'Weight %', 'Counts to year', 'Source'],
      ...tasks.map(t => [t.title, t.task_type, t.term || '', t.task_date || '', Number(t.total), Number(t.weight), t.counts_to_year === false ? 'no' : 'yes', t.source])];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(info), 'Tasks');
    XLSX.writeFile(wb, fileName('xlsx'));
  }

  /* ── Wiring ────────────────────────────────────────────────── */
  function wire() {
    ready = true;
    $('mb-class').addEventListener('change', e => openClass(e.target.value));
    $('mb-add-task').addEventListener('click', () => taskDialog(null));
    $('mb-add-learner').addEventListener('click', addLearner);
    $('mb-task-form').addEventListener('submit', saveTask);
    $('mb-t-cancel').addEventListener('click', () => $('mb-task-dlg').close());
    $('mb-t-delete').addEventListener('click', deleteTask);
    $('mb-tome-cancel').addEventListener('click', () => $('mb-tome-dlg').close());
    $('mb-import').addEventListener('change', e => { const v = e.target.value; e.target.value = ''; if (v === 'tracker') importTracker(); if (v === 'tome') importTome(); });
    $('mb-export').addEventListener('change', e => { const v = e.target.value; e.target.value = ''; if (v === 'csv') exportCsv(); if (v === 'xlsx') exportXlsx().catch(err => say('Excel export failed: ' + err.message, true)); });
    $('mb-missing').addEventListener('change', async e => {
      settings.missing_as_zero = e.target.checked;
      const { error } = await sb().from('mb_settings').upsert({ class_id: cls.id, missing_as_zero: settings.missing_as_zero, updated_at: new Date().toISOString() }, { onConflict: 'class_id' });
      if (error) say('Could not save that setting: ' + error.message, true);
      render();
    });
    const grid = $('mb-grid');
    grid.addEventListener('click', e => { const b = e.target.closest('.mb-task-btn'); if (b) taskDialog(tasks.find(t => t.id === b.dataset.task)); });
    grid.addEventListener('change', e => { if (e.target.classList.contains('mb-in')) saveCell(e.target); });
    grid.addEventListener('keydown', e => {
      const t = e.target; if (!t.classList || !t.classList.contains('mb-in')) return;
      if (e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); moveFocus(t, 1, 0); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(t, -1, 0); }
      else if (e.key === 'ArrowRight' && t.selectionStart === t.value.length) { e.preventDefault(); moveFocus(t, 0, 1); }
      else if (e.key === 'ArrowLeft' && t.selectionStart === 0) { e.preventDefault(); moveFocus(t, 0, -1); }
    });
  }

  window.MLMarkbook = { load };
})();
