/* Grading Grimoire — marking view (grimoire-mark.html?a=<assignment id>).
   The learner's handed-in version on the left, the marking pane on the right.
   The pen stays in hand (spec §3.4a): left click places it, Shift+click the opposite mark,
   middle click a cross, right click a quick menu; keyboard shortcuts in §3.4. */
import { Editor, Extension, Plugin } from './vendor/tiptap-3.32.1.bundle.js';
import {
  sb, me, el, fmtWhen, fmtNum, friendly, capsLevel, whenAuthReady, extensions, loadAssignment, Overlay,
  questionMap, tickTotals, rubricScore, criterionLevels, criterionMax, levelRange, questionBadges,
  anchorFromPos, rangeAnchor, SHAPES, round1, pageQuestionOf, signedUrl
} from './grimoire-core.js';
import { renderPdf, markedPdf, download } from './grimoire-pdf.js';

const $ = id => document.getElementById(id);
const AID = new URLSearchParams(location.search).get('a');
const STAMPS = ['Excellent', 'Good', 'See me', 'Incomplete', 'Check units', 'Show working'];
const TOOL_KEY = 'gg-pen';

let A, questions = [], rubric = null, roster = [], subs = [], marksBySub = {}, versionsBySub = {};
let order = [], idx = 0;                       // order: roster rows shown, idx: current
let cur = null;                                // { r, sub, versions, ver, anns, marks, scores, scoreRows }
let editor = null, overlay = null, qmap = new Map(), pdfMode = false;
let pen = loadPen(), selectedId = null;
let undoStack = [], redoStack = [], lastPlace = { t: 0, x: 0, y: 0 }, saveTimer = null, saving = false;

function loadPen() {
  try { const p = JSON.parse(localStorage.getItem(TOOL_KEY) || 'null'); if (p && ['tick', 'cross', 'comment', 'stamp', 'select'].includes(p.tool)) return { tool: p.tool, value: Number(p.value) || 1 }; } catch (e) {}
  return { tool: 'tick', value: 1 };
}
function savePen() { try { localStorage.setItem(TOOL_KEY, JSON.stringify(pen)); } catch (e) {} }
const fail = m => { $('mkMsg').hidden = false; $('mkMsg').className = 'gg-msg gg-err'; $('mkMsg').textContent = m; };

/* ── Start ─────────────────────────────────────────────────── */
(async function init() {
  await whenAuthReady();
  const Au = window.MagicLabAuth;
  if (!Au.isLoggedIn()) return;
  if (!AID) return fail('No task was chosen. Open one from the Assignments tab.');
  if (!Au.isTeacher()) return fail('Only teachers can mark.');
  try { ({ a: A, questions, rubric } = await loadAssignment(AID)); }
  catch (e) { return fail('This task could not be found, or you do not teach its class.'); }
  if (A.kind !== 'written') return fail('This assignment is not a written task.');
  $('mkEdit').href = 'grimoire-set.html?a=' + AID;
  document.title = 'Marking: ' + A.title + ' — Grading Grimoire';
  await loadClassData();
  buildTools();
  wireGlobal();
  $('mkMsg').hidden = true; $('mkBody').hidden = false;
  applyFilter();
})();

async function loadClassData() {
  const [{ data: cls }, { data: ros }, { data: ss }] = await Promise.all([
    sb().from('classes').select('id, name').eq('id', A.class_id).maybeSingle(),
    sb().from('class_roster').select('id, student_id, display_name, admission_no, active').eq('class_id', A.class_id).order('display_name'),
    sb().from('submissions').select('id, student_id, status, attempt, released_at, created_at').eq('assignment_id', AID)
  ]);
  roster = (ros || []).filter(r => r.active || (ss || []).some(s => s.student_id === r.student_id));
  if (A.student_ids && A.student_ids.length) roster = roster.filter(r => r.student_id && A.student_ids.includes(r.student_id));
  subs = ss || [];
  const ids = subs.map(s => s.id);
  marksBySub = {}; versionsBySub = {};
  if (ids.length) {
    const [{ data: mk }, { data: vs }] = await Promise.all([
      sb().from('submission_marks').select('*').in('submission_id', ids),
      sb().from('submission_versions').select('id, submission_id, attempt, submitted_at, is_late, word_count').in('submission_id', ids).order('attempt')
    ]);
    (mk || []).forEach(m => { marksBySub[m.submission_id] = m; });
    (vs || []).forEach(v => { (versionsBySub[v.submission_id] = versionsBySub[v.submission_id] || []).push(v); });
  }
  const handed = subs.filter(isHandedIn).length, marked = subs.filter(s => marksBySub[s.id] && marksBySub[s.id].score != null).length;
  const returned = subs.filter(s => s.released_at).length;
  $('mkTitle').textContent = A.title;
  $('mkMeta').replaceChildren(
    el('span', { text: (cls && cls.name) || 'Class' }),
    el('span', { text: 'Due ' + fmtWhen(A.due_at) }),
    el('span', { class: 'mono', text: fmtNum(A.total_marks) + ' marks' }),
    el('span', { text: handed + ' of ' + roster.length + ' handed in · ' + marked + ' marked · ' + returned + ' returned' })
  );
}
const isHandedIn = s => s && ['submitted', 'marking', 'returned'].includes(s.status);
const subFor = r => r.student_id ? subs.find(s => s.student_id === r.student_id) : null;
function lastVersion(s) { const v = versionsBySub[s.id] || []; return v[v.length - 1] || null; }

/* ── Learner list ──────────────────────────────────────────── */
function applyFilter(keepId) {
  const f = $('mkFilter').value;
  order = roster.filter(r => {
    const s = subFor(r), m = s && marksBySub[s.id], v = s && lastVersion(s);
    if (f === 'in') return isHandedIn(s);
    if (f === 'todo') return isHandedIn(s) && !(m && m.score != null);
    if (f === 'late') return v && v.is_late;
    if (f === 'missing') return !isHandedIn(s);
    return true;
  });
  const sel = $('mkLearner'); sel.textContent = '';
  if (!order.length) sel.appendChild(el('option', { text: 'Nobody in this view' }));
  order.forEach((r, i) => {
    const s = subFor(r), m = s && marksBySub[s.id], v = s && lastVersion(s);
    const tag = !r.student_id ? ' — no account' : !isHandedIn(s) ? ' — not handed in' : s.released_at ? ' — returned' :
      (m && m.score != null) ? ' — ' + fmtNum(m.score) + '/' + fmtNum(A.total_marks) : ' — to mark';
    sel.appendChild(el('option', { value: String(i), text: r.display_name + tag + (v && v.is_late ? ' (late)' : '') }));
  });
  let i = keepId ? order.findIndex(r => r.id === keepId) : order.findIndex(r => { const s = subFor(r); return isHandedIn(s) && !(marksBySub[s.id] && marksBySub[s.id].score != null); });
  if (i < 0) i = 0;
  open(i);
}
async function open(i) {
  if (!order.length) { showEmpty('Nobody to show with this filter.'); return; }
  await flushSave();
  idx = Math.max(0, Math.min(order.length - 1, i));
  $('mkLearner').value = String(idx);
  const r = order[idx], s = subFor(r);
  selectedId = null; undoStack = []; redoStack = [];
  if (!isHandedIn(s)) {
    showEmpty(!r.student_id ? r.display_name + ' has no account on The Magic Lab yet, so they cannot hand in online.'
      : r.display_name + (s ? ' has started but not handed in yet.' : ' has not opened the task yet.'));
    cur = { r, sub: s || null }; renderPane(); return;
  }
  const versions = versionsBySub[s.id] || [];
  const mk = marksBySub[s.id] || null;
  const chosen = (mk && mk.marked_version && versions.find(v => v.id === mk.marked_version)) || versions[versions.length - 1];
  await loadVersion(r, s, versions, chosen.id);
  if (s.status === 'submitted') {                       // opened for marking
    const { error } = await sb().from('submissions').update({ status: 'marking' }).eq('id', s.id);
    if (!error) s.status = 'marking';
  }
}
async function loadVersion(r, s, versions, vid) {
  const [{ data: ver }, { data: anns }, { data: scores }] = await Promise.all([
    sb().from('submission_versions').select('*').eq('id', vid).single(),
    sb().from('annotations').select('*').eq('version_id', vid).order('created_at'),
    sb().from('rubric_scores').select('*').eq('submission_id', s.id)
  ]);
  const marks = marksBySub[s.id] || null;
  cur = { r, sub: s, versions, ver, anns: anns || [], marks,
          comment: marks ? marks.overall_comment || '' : '', overrides: { ...(marks && marks.question_overrides || {}) },
          direct: marks && A.scoring === 'direct' ? marks.score : null,
          scores: Object.fromEntries((scores || []).map(x => [x.criterion_id, { level_id: x.level_id, mark: x.mark, id: x.id }])),
          loadedAt: marks ? marks.marked_at : null };
  $('mkEmpty').hidden = true; $('mkPaper').hidden = false;
  if (ver.file_path) await mountPdf(ver); else mountEditor(ver.doc);
  $('mkVersionWrap').hidden = versions.length < 2;
  $('mkVersion').replaceChildren(...versions.map(v => el('option', { value: v.id, text: 'Hand-in ' + v.attempt + ' · ' + fmtWhen(v.submitted_at) })));
  $('mkVersion').value = vid;
  $('mkSubMeta').textContent = 'Handed in ' + fmtWhen(ver.submitted_at) + (ver.is_late ? ' (late)' : '') + ' · ' + (ver.file_path ? (ver.page_count || '?') + ' pages (PDF)' : ver.word_count + ' words') + (s.released_at ? ' · returned ' + fmtWhen(s.released_at) : '');
  banner();
  renderPane(); drawAnns();
  maxSnap = maxSnapshot();          // opening a script never announces anything
}
function teardown() {
  if (overlay) overlay.destroy();
  if (editor) editor.destroy();
  editor = null; overlay = null; pdfMode = false;
  $('mkDoc').textContent = ''; $('mkDoc').className = 'gg-doc'; $('mkPaper').classList.remove('is-pdf');
  $('mkPdfDl').hidden = true;
}
function showEmpty(msg) {
  teardown();
  $('mkPaper').hidden = true; $('mkEmpty').hidden = false; $('mkEmpty').textContent = msg;
  $('mkVersionWrap').hidden = true; $('mkSubMeta').textContent = ''; $('mkBanner').textContent = '';
}
function banner() {
  const b = $('mkBanner'); b.textContent = '';
  const m = cur.marks;
  if (m && m.marked_by && m.marked_by !== me() && Date.now() - new Date(m.marked_at).getTime() < 10 * 60 * 1000)
    b.appendChild(el('div', { class: 'gg-banner', text: 'Another teacher of this class saved marks for this learner at ' + fmtWhen(m.marked_at) + '. Your changes will replace theirs.' }));
  if (cur.sub.released_at) b.appendChild(el('div', { class: 'gg-banner', text: 'These marks were returned to the learner. Changes show to them straight away; press "Return this learner\'s marks" to update the markbook too.' }));
}

/* ── The document: caret yes, changes no ───────────────────── */
// The teacher gets a real caret (arrow keys, text selection for comments) but can never change the work.
const NoEdits = Extension.create({ name: 'ggNoEdits', addProseMirrorPlugins() { return [new Plugin({ filterTransaction: tr => !tr.docChanged })]; } });
function mountEditor(doc) {
  teardown();
  editor = new Editor({
    element: $('mkDoc'), editable: true, content: doc, extensions: [...extensions(), NoEdits],
    editorProps: {
      attributes: { 'aria-label': 'Learner\'s work. Arrow keys move the cursor; Enter places the pen.', spellcheck: 'false', inputmode: 'none', 'aria-readonly': 'true' },
      handleKeyDown: (view, e) => onKey(e, true),
      handleTextInput: () => true, handlePaste: () => true, handleDrop: () => true
    }
  });
  overlay = new Overlay(editor, $('mkPaper'), overlayOpts());
  qmap = questionMap(editor.state.doc, questions);
  wirePaper();
}
function overlayOpts() {
  return { interactive: true, onSelect: (a) => select(a.id), onContext: (a, e) => annMenu(a, e),
    qLabel: a => { const r = totals().perQ[a.question_id]; return r ? fmtNum(r.override != null ? r.override : r.got) + '/' + fmtNum(r.max) : ''; } };
}
/** A PDF (or joined photos) hand-in: pages drawn by pdf.js, marks anchored to page fractions. */
async function mountPdf(ver) {
  teardown();
  pdfMode = true;
  $('mkPaper').classList.add('is-pdf'); $('mkDoc').className = 'gg-pages';
  $('mkDoc').textContent = 'Loading the pages…';
  try {
    const url = await signedUrl(ver.file_path);
    const bytes = new Uint8Array(await (await fetch(url)).arrayBuffer());
    cur.pdfBytes = bytes;
    await renderPdf($('mkDoc'), bytes.slice(0));
  } catch (e) { $('mkDoc').textContent = 'The file could not be opened: ' + friendly(e); return; }
  overlay = new Overlay(null, $('mkPaper'), overlayOpts());
  $('mkPdfDl').hidden = false;
  wirePaper();
}

/* ── Annotations: draw, place, change, undo ────────────────── */
function drawAnns() {
  if (!overlay) return;
  const t = totals();
  overlay.selected = selectedId;
  overlay.set(cur.anns, pdfMode ? [] : questionBadges(editor, questions, t, qmap));
  renderNotes(); renderTotals();
  [...overlay.layer.querySelectorAll('.gg-ann')].forEach(n => wireDrag(n));
}
function totals() { return tickTotals(cur.anns || [], pdfMode ? pageQuestionOf(cur.anns || []) : qmap, questions, cur.overrides); }

async function addAnn(a, record = true) {
  const row = { id: crypto.randomUUID(), version_id: cur.ver.id, layer: 'marker', marks: null, body: null, stamp: null, ...a };
  // A new mark is not selected: the pen stays in hand, and 1–9 keep setting the pen's value.
  cur.anns.push(row); drawAnns(); changedMarks();
  if (record) { undoStack.push({ undo: () => removeAnn(row.id, false), redo: () => addAnn(row, false) }); redoStack = []; undoToast('Mark added'); }
  const { error } = await sb().from('annotations').insert(row);
  if (error) { say('Could not save that mark: ' + friendly(error), true); cur.anns = cur.anns.filter(x => x.id !== row.id); drawAnns(); }
  return row;
}
async function removeAnn(id, record = true) {
  const row = cur.anns.find(x => x.id === id); if (!row) return;
  cur.anns = cur.anns.filter(x => x.id !== id); if (selectedId === id) selectedId = null; drawAnns(); changedMarks();
  if (record) { undoStack.push({ undo: () => addAnn(row, false), redo: () => removeAnn(id, false) }); redoStack = []; undoToast('Mark removed'); }
  const { error } = await sb().from('annotations').delete().eq('id', id);
  if (error) say('Could not remove that mark: ' + friendly(error), true);
}
async function updateAnn(id, patch, record = true) {
  const row = cur.anns.find(x => x.id === id); if (!row) return;
  const before = Object.fromEntries(Object.keys(patch).map(k => [k, row[k]]));
  Object.assign(row, patch, { updated_at: new Date().toISOString() }); drawAnns(); changedMarks();
  if (record) { undoStack.push({ undo: () => updateAnn(id, before, false), redo: () => updateAnn(id, patch, false) }); redoStack = []; }
  const { error } = await sb().from('annotations').update({ ...patch, updated_at: row.updated_at }).eq('id', id);
  if (error) say('Could not change that mark: ' + friendly(error), true);
}
function undo() { const op = undoStack.pop(); if (op) { op.undo(); redoStack.push(op); } }
function redo() { const op = redoStack.pop(); if (op) { op.redo(); undoStack.push(op); } }
let toastTimer = null;
function undoToast(text) {
  let t = document.querySelector('.gg-undo');
  if (!t) { t = el('div', { class: 'gg-undo', role: 'status' }, [el('span'), el('button', { type: 'button', text: 'Undo', onclick: () => { undo(); t.remove(); } })]); document.body.appendChild(t); }
  t.firstChild.textContent = text; clearTimeout(toastTimer); toastTimer = setTimeout(() => t.remove(), 5000);
}
function select(id) {
  selectedId = id; drawAnns();
  const n = overlay && overlay.layer.querySelector('[data-id="' + id + '"]'); if (n) n.focus({ preventScroll: false });
}

/* Placement from a pointer position (spec §3.3): text point, margin point or box on an image. */
function anchorAt(clientX, clientY, target) {
  if (pdfMode) {
    const pg = (target && target.closest && target.closest('.gg-page')) ||
      [...document.querySelectorAll('#mkDoc .gg-page')].find(p => { const r = p.getBoundingClientRect(); return clientY >= r.top && clientY <= r.bottom; });
    if (!pg) return null;
    const r = pg.getBoundingClientRect();
    return { kind: 'page', page: Number(pg.dataset.page), fx: round3((clientX - r.left) / r.width), fy: round3((clientY - r.top) / r.height) };
  }
  if (!editor) return null;
  const view = editor.view, { state } = editor;
  const img = target && target.closest && target.closest('img.gg-img');
  if (img) {
    let hit = null;
    state.doc.descendants((n, pos) => { if (!hit && n.type.name === 'image' && view.nodeDOM(pos) === img) hit = n; });
    if (hit && hit.attrs.bid) { const r = img.getBoundingClientRect();
      return { kind: 'box', bid: hit.attrs.bid, fx: round3((clientX - r.left) / r.width), fy: round3((clientY - r.top) / r.height) }; }
  }
  const dr = view.dom.getBoundingClientRect();
  let lane = 'text', x = clientX;
  if (clientX > dr.right - 2) { lane = 'margin'; x = dr.right - 6; }
  const hit = view.posAtCoords({ left: Math.max(dr.left + 2, x), top: clientY });
  if (!hit) return null;
  return anchorFromPos(state, hit.pos, lane);
}
const round3 = n => Math.round(Math.max(0, Math.min(1, n)) * 1000) / 1000;

function placeTool(tool, anchor, at) {
  if (!anchor) return;
  if (tool === 'tick') return addAnn({ type: 'tick', anchor, marks: pen.value });
  if (tool === 'cross') return addAnn({ type: 'cross', anchor, marks: null });
  if (tool === 'comment') return commentPop(at, body => body.text && addAnn({ type: 'comment', anchor, body: body.text, marks: body.marks }));
  if (tool === 'stamp') return stampMenu(at, s => addAnn({ type: 'stamp', anchor, stamp: s }));
}

/* ── Pointer handling on the paper ─────────────────────────── */
let down = null, longPress = null;
function wirePaper() {
  const paper = $('mkPaper');
  if (paper.dataset.wired) return; paper.dataset.wired = '1';
  paper.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); });   // no autoscroll inside the work
  paper.addEventListener('pointerdown', e => {
    if (!cur || !cur.ver || e.target.closest('.gg-ann, .gg-menu, .gg-pop')) return;
    down = { x: e.clientX, y: e.clientY, button: e.button, shift: e.shiftKey, type: e.pointerType, t: Date.now(), target: e.target };
    if (e.pointerType === 'touch') longPress = setTimeout(() => { if (down) { const d = down; down = null; quickMenu(d.x, d.y, anchorAt(d.x, d.y, d.target)); } }, 500);
  });
  paper.addEventListener('pointermove', e => { if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) clearTimeout(longPress); });
  paper.addEventListener('pointerup', e => {
    clearTimeout(longPress);
    if (!down || !cur || !cur.ver) return; const d = down; down = null;
    if (e.target.closest('.gg-ann, .gg-menu, .gg-pop')) return;
    const moved = Math.hypot(e.clientX - d.x, e.clientY - d.y) > 4;
    const sel = editor && editor.state.selection;
    if (moved && sel && !sel.empty) return selectionPop(e.clientX, e.clientY);      // drag over words
    if (moved || d.button === 2) return;
    if (Date.now() - lastPlace.t < 300 && Math.hypot(e.clientX - lastPlace.x, e.clientY - lastPlace.y) < 6) return;   // nervous double click
    let tool = pen.tool;
    if (d.button === 1) tool = 'cross';
    else if (d.shift && (tool === 'tick' || tool === 'cross')) tool = tool === 'tick' ? 'cross' : 'tick';
    if (tool === 'select') { selectedId = null; drawAnns(); return; }
    lastPlace = { t: Date.now(), x: e.clientX, y: e.clientY };
    placeTool(tool, anchorAt(e.clientX, e.clientY, d.target), { x: e.clientX, y: e.clientY });
  });
  paper.addEventListener('contextmenu', e => {
    if (e.shiftKey || !cur || !cur.ver || e.target.closest('.gg-ann')) return;   // Shift+right click = the browser's own menu
    e.preventDefault(); down = null;
    quickMenu(e.clientX, e.clientY, anchorAt(e.clientX, e.clientY, e.target));
  });
}
function wireDrag(node) {
  node.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    const id = node.dataset.id, a = cur.anns.find(x => x.id === id); if (!a || a.anchor.kind === 'range') return;
    const sx = e.clientX, sy = e.clientY; let moved = false;
    const move = ev => { if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 4) { moved = true; node.style.translate = (ev.clientX - sx) + 'px ' + (ev.clientY - sy) + 'px'; } };
    const up = ev => {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      node.style.translate = '';
      if (!moved) return;
      node.style.pointerEvents = 'none';
      const target = document.elementFromPoint(ev.clientX, ev.clientY);
      node.style.pointerEvents = '';
      const anchor = anchorAt(ev.clientX, ev.clientY, target);
      if (anchor) updateAnn(id, { anchor });
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  });
}

/* ── Menus and pop-ups ─────────────────────────────────────── */
function closeFloats() { document.querySelectorAll('.gg-menu, .gg-pop').forEach(n => n.remove()); }
function floatAt(node, x, y) {
  document.body.appendChild(node);
  const r = node.getBoundingClientRect();
  node.style.left = Math.max(8, Math.min(x, innerWidth - r.width - 8)) + 'px';
  node.style.top = Math.max(8, Math.min(y, innerHeight - r.height - 8)) + 'px';
}
function menu(x, y, items) {
  closeFloats();
  const m = el('div', { class: 'gg-menu', role: 'menu' });
  items.forEach(it => {
    if (it === '-') return m.appendChild(el('div', { class: 'gg-menu-sep', role: 'separator' }));
    m.appendChild(el('button', { role: 'menuitem', type: 'button', onclick: () => { closeFloats(); it.run(); } }, [el('span', { text: it.label }), it.key ? el('kbd', { text: it.key }) : null]));
  });
  floatAt(m, x, y);
  const btns = [...m.querySelectorAll('[role=menuitem]')]; btns[0] && btns[0].focus();
  m.addEventListener('keydown', e => {
    const i = btns.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); btns[(i + 1) % btns.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); btns[(i - 1 + btns.length) % btns.length].focus(); }
    if (e.key === 'Escape') { e.preventDefault(); closeFloats(); editor && editor.view.focus(); }
  });
}
function quickMenu(x, y, anchor) {
  if (!anchor) return;
  const at = { x, y };
  menu(x, y, [
    { label: 'Tick ' + fmtNum(pen.value), key: 'T', run: () => addAnn({ type: 'tick', anchor, marks: pen.value }) },
    { label: 'Tick ½', run: () => addAnn({ type: 'tick', anchor, marks: 0.5 }) },
    { label: 'Tick 2', run: () => addAnn({ type: 'tick', anchor, marks: 2 }) },
    { label: 'Cross', key: 'X', run: () => addAnn({ type: 'cross', anchor }) },
    { label: 'Comment…', key: 'C', run: () => placeTool('comment', anchor, at) },
    '-',
    ...STAMPS.map((s, i) => ({ label: 'Stamp: ' + s, key: String(i + 1), run: () => addAnn({ type: 'stamp', anchor, stamp: s }) })),
    ...(pdfMode && questions.length ? ['-', ...questions.map(q => ({ label: 'Question ' + q.number + ' starts here',
      run: () => addAnn({ type: 'qstart', anchor: { ...anchor, fx: 0.02 }, question_id: q.id, body: q.number }) }))] : []),
    '-',
    { label: 'Undo', key: 'Ctrl+Z', run: undo }
  ]);
}
function annMenu(a, e) {
  select(a.id);
  menu(e.clientX, e.clientY, [
    a.type === 'tick' || a.type === 'comment' ? { label: 'Change marks…', run: () => marksPop(a, e) } : null,
    a.type === 'comment' ? { label: 'Edit comment…', run: () => commentPop({ x: e.clientX, y: e.clientY }, b => updateAnn(a.id, { body: b.text, marks: b.marks }), a) } : null,
    a.type === 'tick' ? { label: 'Make it a cross', run: () => updateAnn(a.id, { type: 'cross', marks: null }) } : null,
    a.type === 'cross' ? { label: 'Make it a tick', run: () => updateAnn(a.id, { type: 'tick', marks: pen.value }) } : null,
    { label: 'Remove', key: 'Del', run: () => removeAnn(a.id) }
  ].filter(Boolean));
}
function stampMenu(at, done) { menu(at.x, at.y, STAMPS.map((s, i) => ({ label: s, key: String(i + 1), run: () => done(s) }))); }
function commentPop(at, done, existing) {
  closeFloats();
  const ta = el('textarea', { class: 'gg-in', 'aria-label': 'Comment', maxlength: '2000', placeholder: 'Comment for the learner' });
  ta.value = existing ? existing.body || '' : '';
  const mk = el('input', { class: 'gg-in gg-q-in', type: 'number', step: '0.5', min: '-100', max: '100', 'aria-label': 'Marks for this comment (optional)', placeholder: 'marks' });
  if (existing && existing.marks != null) mk.value = existing.marks;
  const ok = () => { const text = ta.value.trim(); closeFloats(); editor && editor.view.focus(); done({ text, marks: mk.value === '' ? null : Number(mk.value) }); };
  const pop = el('div', { class: 'gg-pop', role: 'dialog', 'aria-label': 'Comment' }, [ta,
    el('div', { class: 'gg-pop-row' }, [el('label', { class: 'gg-hint', text: 'Marks ' }, [mk]),
      el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Cancel', onclick: () => { closeFloats(); editor && editor.view.focus(); } }),
      el('button', { class: 'gg-btn gg-btn--sm gg-btn--primary', type: 'button', text: 'Save', onclick: ok })])]);
  pop.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); closeFloats(); } if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) ok(); });
  floatAt(pop, at.x + 8, at.y + 8); ta.focus();
}
function marksPop(a, e) {
  closeFloats();
  const mk = el('input', { class: 'gg-in', type: 'number', step: '0.5', min: '-100', max: '100', 'aria-label': 'Marks', value: a.marks ?? '' });
  const ok = () => { closeFloats(); updateAnn(a.id, { marks: mk.value === '' ? null : Number(mk.value) }); };
  const pop = el('div', { class: 'gg-pop', role: 'dialog', 'aria-label': 'Marks' }, [mk, el('div', { class: 'gg-pop-row' }, [
    el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Cancel', onclick: closeFloats }),
    el('button', { class: 'gg-btn gg-btn--sm gg-btn--primary', type: 'button', text: 'Save', onclick: ok })])]);
  pop.addEventListener('keydown', ev => { if (ev.key === 'Enter') ok(); if (ev.key === 'Escape') closeFloats(); });
  floatAt(pop, e.clientX + 8, e.clientY + 8); mk.focus(); mk.select();
}
function selectionPop(x, y) {
  const { from, to } = editor.state.selection; const anchor = rangeAnchor(editor.state, from, to); if (!anchor) return;
  menu(x, y, [
    { label: 'Comment on these words…', key: 'C', run: () => commentPop({ x, y }, b => b.text && addAnn({ type: 'comment', anchor, body: b.text, marks: b.marks })) },
    { label: 'Highlight', key: 'H', run: () => addAnn({ type: 'highlight', anchor }) },
    { label: 'Tick these words', run: () => addAnn({ type: 'tick', anchor: { ...anchor }, marks: pen.value }) }
  ]);
}
document.addEventListener('pointerdown', e => { if (!e.target.closest('.gg-menu, .gg-pop')) closeFloats(); }, true);

/* ── Tools ─────────────────────────────────────────────────── */
const TOOLS = [
  { k: 'tick', label: 'Tick', key: 'T', svg: SHAPES.tick },
  { k: 'cross', label: 'Cross', key: 'X', svg: SHAPES.cross },
  { k: 'comment', label: 'Comment', key: 'C', svg: SHAPES.comment },
  { k: 'stamp', label: 'Stamp', key: 'S', svg: '' },
  { k: 'select', label: 'Pen down', key: 'Esc', svg: '' }
];
function buildTools() {
  const host = $('mkTools'); host.textContent = '';
  TOOLS.forEach(t => {
    const b = el('button', { class: 'gg-tool', type: 'button', 'data-k': t.k, 'aria-pressed': 'false', title: t.label + ' (' + t.key + ')' });
    b.innerHTML = t.svg; b.append(el('span', { text: t.label }));
    if (t.k === 'tick') b.append(el('span', { class: 'gg-tool-value', id: 'mkPenValue' }));
    b.append(el('kbd', { text: t.key }));
    b.addEventListener('click', () => setTool(t.k));
    host.appendChild(b);
  });
  setTool(pen.tool);
}
function setTool(k) {
  pen.tool = k; savePen();
  document.querySelectorAll('#mkTools .gg-tool').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
  document.body.className = document.body.className.replace(/\bgg-tool-\w+/g, '') + ' gg-tool-' + k;
  $('mkPenValue') && ($('mkPenValue').textContent = '· ' + fmtNum(pen.value));
  $('mkToolHint').textContent = k === 'tick' ? 'Each click is a tick worth ' + fmtNum(pen.value) + '. Press 1–9 (or . for ½) to change it.'
    : k === 'cross' ? 'Each click is a cross. Shift+click places a tick.'
    : k === 'comment' ? 'Click where the comment belongs, or drag over words.'
    : k === 'stamp' ? 'Click, then choose a stamp.' : 'Clicks select marks. Drag over words to comment.';
}
function setValue(v) {
  if (selectedId) { const a = cur.anns.find(x => x.id === selectedId); if (a && (a.type === 'tick' || a.type === 'comment')) return updateAnn(a.id, { marks: v }); }
  pen.value = v; setTool(pen.tool);
}

/* ── Keyboard (spec §3.4) ──────────────────────────────────── */
function typing(e) { const t = e.target; return t && (t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && t.type !== 'checkbox') || t.tagName === 'SELECT') && !t.closest('.ProseMirror'); }
function caretAnchor() { if (!editor || pdfMode) return null; return anchorFromPos(editor.state, editor.state.selection.head, 'text'); }
function caretXY() { try { const c = editor.view.coordsAtPos(editor.state.selection.head); return { x: c.left, y: c.bottom }; } catch (e) { return { x: innerWidth / 2, y: innerHeight / 2 }; } }
function onKey(e, fromEditor) {
  if (!fromEditor && typing(e)) return false;
  if (document.querySelector('.gg-pop')) return false;
  const code = e.code, k = e.key;
  if ((e.ctrlKey || e.metaKey) && !e.altKey && k.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return true; }
  if ((e.ctrlKey || e.metaKey) && k.toLowerCase() === 'y') { e.preventDefault(); redo(); return true; }
  if (e.ctrlKey || e.metaKey) return false;
  if (e.altKey) {
    const map = { Digit1: 'tick', Digit2: 'cross', Digit3: 'comment', Digit5: 'stamp' };
    if (map[code]) { e.preventDefault(); setTool(map[code]); return true; }
    if (code === 'Digit4') { e.preventDefault(); highlightSelection(); return true; }
    if (code === 'ArrowDown') { e.preventDefault(); open(idx + 1); return true; }
    if (code === 'ArrowUp') { e.preventDefault(); open(idx - 1); return true; }
    return false;
  }
  if ((k === 'F10' && e.shiftKey) || k === 'ContextMenu') { e.preventDefault(); const p = caretXY(); quickMenu(p.x, p.y, caretAnchor()); return true; }
  if (k === 'Escape') { if (selectedId) { selectedId = null; drawAnns(); } else setTool('select'); closeFloats(); return true; }
  if (k === '?') { $('mkHelpDlg').showModal(); return true; }
  const letter = { KeyT: 'tick', KeyX: 'cross', KeyC: 'comment', KeyS: 'stamp', KeyV: 'select' }[code];
  if (letter && !e.shiftKey) { setTool(letter); return true; }
  if (code === 'KeyH') { highlightSelection(); return true; }
  if (code === 'KeyJ') { open(idx + 1); return true; }
  if (code === 'KeyK') { open(idx - 1); return true; }
  if (code === 'KeyR') { const f = document.querySelector('#mkRubric button, #mkRubric input'); if (f) { f.focus(); return true; } return false; }
  if (/^Digit[1-9]$/.test(code) && !e.shiftKey) { setValue(Number(code.slice(5))); return true; }
  if (k === '.' || code === 'Period' || code === 'NumpadDecimal') { setValue(0.5); return true; }
  if ((k === 'Delete' || k === 'Backspace') && selectedId) { removeAnn(selectedId); return true; }
  if (k === '[' || k === ']') { stepAnn(k === ']' ? 1 : -1); return true; }
  if (k === 'Enter' && fromEditor && !pdfMode) {
    const a = caretAnchor(); const p = caretXY();
    if (pen.tool === 'select') return true;
    placeTool(pen.tool, a, p); return true;
  }
  return false;
}
function highlightSelection() {
  if (!editor || editor.state.selection.empty) return;
  const { from, to } = editor.state.selection; const a = rangeAnchor(editor.state, from, to); if (a) addAnn({ type: 'highlight', anchor: a });
}
function stepAnn(dir) {
  if (!cur || !cur.anns || !cur.anns.length) return;
  const nodes = [...overlay.layer.querySelectorAll('.gg-ann:not([hidden])')]
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);
  const i = nodes.findIndex(n => n.dataset.id === selectedId);
  const n = nodes[(i + dir + nodes.length) % nodes.length]; if (n) select(n.dataset.id);
}

/* ── Pane: totals, rubric, comment ─────────────────────────── */
function score() {
  const t = totals(), r = rubric ? rubricScore(rubric.definition, cur.scores || {}) : { got: 0, max: 0 };
  let got;
  if (A.scoring === 'ticks') got = t.total;
  else if (A.scoring === 'rubric') got = r.got;
  else if (A.scoring === 'ticks_rubric') got = t.total + r.got;
  else got = cur.direct == null || cur.direct === '' ? null : Number(cur.direct);
  return { t, r, got: got == null ? null : round1(got) };
}
function renderPane() {
  const has = !!(cur && cur.ver);
  ['mkComment', 'mkReturnOne', 'mkReopen'].forEach(id => { $(id).disabled = !has; });
  $('mkComment').value = has ? cur.comment : '';
  renderTotals(); renderRubric();
}
function renderTotals() {
  const host = $('mkTotals'); host.textContent = '';
  if (!cur || !cur.ver) { host.appendChild(el('span', { class: 'k', text: 'Nothing to mark yet.' })); return; }
  const s = score();
  if (A.scoring === 'ticks' || A.scoring === 'ticks_rubric') {
    questions.forEach(q => {
      const r = s.t.perQ[q.id];
      const inp = el('input', { class: 'gg-in gg-q-in', type: 'number', step: '0.5', min: '0', 'aria-label': 'Override the total for question ' + q.number,
        placeholder: fmtNum(r.got), value: cur.overrides[q.id] ?? '' });
      inp.addEventListener('change', () => { if (inp.value === '') delete cur.overrides[q.id]; else cur.overrides[q.id] = Number(inp.value); drawAnns(); changedMarks(); });
      host.append(el('span', { class: 'k', text: 'Question ' + q.number + (r.got > r.max ? ' (over ' + fmtNum(r.max) + ')' : '') }),
        el('span', { class: 'v' }, [inp, ' / ' + fmtNum(r.max)]));
    });
    if (s.t.unsorted || !questions.length) host.append(el('span', { class: 'k', text: questions.length ? 'Ticks outside a question' : 'Ticks' }), el('span', { class: 'v', text: fmtNum(s.t.unsorted) }));
  }
  if (rubric && (A.scoring === 'rubric' || A.scoring === 'ticks_rubric'))
    host.append(el('span', { class: 'k', text: 'Rubric' }), el('span', { class: 'v', text: fmtNum(s.r.got) + ' / ' + fmtNum(s.r.max) }));
  if (A.scoring === 'direct') {
    const inp = el('input', { class: 'gg-in gg-q-in', type: 'number', step: '0.5', min: '0', max: String(A.total_marks), 'aria-label': 'Mark', value: cur.direct ?? '' });
    inp.addEventListener('input', () => { cur.direct = inp.value; renderTotalLine(); changedMarks(); });
    host.append(el('span', { class: 'k', text: 'Mark' }), el('span', { class: 'v' }, [inp]));
  }
  host.append(el('span', { class: 'k is-total', id: 'mkTotalK', text: 'Total' }), el('span', { class: 'v is-total', id: 'mkTotalV' }));
  renderTotalLine();
}
function renderTotalLine() {
  const s = score(), v = $('mkTotalV'); if (!v) return;
  if (s.got == null) { v.textContent = '– / ' + fmtNum(A.total_marks); return; }
  const pct = s.got / Number(A.total_marks) * 100;
  v.textContent = fmtNum(s.got) + ' / ' + fmtNum(A.total_marks) + '  ·  ' + Math.round(pct) + '% · L' + capsLevel(pct);
}
function renderRubric() {
  const sec = $('mkRubricSec'), host = $('mkRubric');
  sec.hidden = !(rubric && (A.scoring === 'rubric' || A.scoring === 'ticks_rubric'));
  host.textContent = '';
  if (sec.hidden || !cur || !cur.ver) return;
  const def = rubric.definition;
  def.criteria.forEach(c => {
    const s = cur.scores[c.id] || {}, levels = criterionLevels(def, c);
    const box = el('div', { class: 'gg-crit' });
    const markIn = el('input', { class: 'gg-in gg-q-in', type: 'number', step: '0.5', min: '0', max: String(criterionMax(def, c)), 'aria-label': c.name + ' mark', value: s.mark ?? '' });
    box.appendChild(el('div', { class: 'gg-crit-head' }, [el('span', { text: c.name }), el('span', { class: 'gg-mono' }, [markIn, ' / ' + fmtNum(criterionMax(def, c))])]));
    const lv = el('div', { class: 'gg-levels', role: 'group', 'aria-label': c.name + ' level' });
    const desc = el('div', { class: 'gg-level-desc' });
    const showDesc = id => { const l = levels.find(x => x.id === id); desc.textContent = l ? ((c.cells && c.cells[l.id]) || '') : ''; };
    levels.forEach(l => {
      const rg = levelRange(l);
      const b = el('button', { class: 'gg-level', type: 'button', 'aria-pressed': String(s.level_id === l.id),
        text: l.label + ' · ' + (rg.min === rg.max ? fmtNum(rg.max) : fmtNum(rg.min) + '–' + fmtNum(rg.max)), title: (c.cells && c.cells[l.id]) || '' });
      b.addEventListener('click', () => {
        const prev = cur.scores[c.id] && cur.scores[c.id].mark;
        const mark = rg.min === rg.max ? rg.max : (prev != null && prev >= rg.min && prev <= rg.max ? prev : rg.max);
        setScore(c.id, l.id, mark); renderRubric();
        if (rg.min !== rg.max) { const i = host.querySelector('[aria-label="' + CSS.escape(c.name + ' mark') + '"]'); i && (i.focus(), i.select()); }
      });
      b.addEventListener('focus', () => showDesc(l.id)); b.addEventListener('mouseenter', () => showDesc(l.id));
      b.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; e.preventDefault();
        const bs = [...lv.querySelectorAll('button')], i = bs.indexOf(e.target); bs[(i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length].focus();
      });
      lv.appendChild(b);
    });
    markIn.addEventListener('change', () => {
      const m = markIn.value === '' ? null : Number(markIn.value);
      const l = m == null ? null : levels.find(x => { const r = levelRange(x); return m >= r.min && m <= r.max; });
      setScore(c.id, l ? l.id : (cur.scores[c.id] || {}).level_id || null, m); renderRubric();
    });
    box.append(lv, desc); showDesc(s.level_id);
    host.appendChild(box);
  });
}
function setScore(cid, level_id, mark) {
  cur.scores[cid] = { ...(cur.scores[cid] || {}), level_id, mark };
  renderTotals(); changedMarks();
}
function renderNotes() {
  const list = $('mkNotes'), notes = (cur.anns || []).filter(a => (a.body || a.type === 'highlight') && a.type !== 'qstart');
  const unplaced = overlay ? overlay.unplaced() : [];
  $('mkNotesSec').hidden = !notes.length && !unplaced.length;
  list.textContent = '';
  notes.forEach(a => list.appendChild(el('li', {}, [el('button', { type: 'button', text: (a.body || 'Highlight') + (a.anchor.quote ? ' — "' + a.anchor.quote.exact.slice(0, 40) + '"' : ''), onclick: () => select(a.id) })])));
  if (unplaced.length) list.appendChild(el('li', { class: 'gg-hint', text: unplaced.length + ' mark(s) could not be placed on this hand-in.' }));
}

/* ── Saving the marks (submission_marks + rubric_scores) ───── */
function say(t, bad) { $('mkSaveState').textContent = t; $('mkSaveState').className = bad ? 'gg-hint gg-err' : 'gg-hint'; }
/* ── "Maximum reached" notice: announced at the moment a question or the whole task
   reaches its maximum (or goes over it), never when a script is opened. ── */
let maxSnap = null, noticeTimer = null;
function maxSnapshot() {
  if (!cur || !cur.ver) return null;
  const s = score();
  return { q: Object.fromEntries(questions.map(q => { const r = s.t.perQ[q.id]; return [q.id, r ? (r.override != null ? r.override : r.got) : 0]; })), total: s.got };
}
function checkMaximum() {
  const now = maxSnapshot(), prev = maxSnap; maxSnap = now;
  if (!now || !prev) return;
  const who = cur.r.display_name, T = Number(A.total_marks), msgs = [];
  if (now.total != null && T > 0) {
    if ((prev.total ?? 0) <= T && now.total > T) msgs.push({ warn: true, text: who + ' is over the total: ' + fmtNum(now.total) + ' / ' + fmtNum(T) + '. Check the marks.' });
    else if ((prev.total ?? 0) < T && now.total === T) msgs.push({ text: who + ' has the maximum mark: ' + fmtNum(T) + ' / ' + fmtNum(T) + '.' });
  }
  if (!msgs.length) questions.forEach(q => {
    const a = prev.q[q.id] || 0, b = now.q[q.id] || 0, m = Number(q.max_marks);
    if (!(m > 0)) return;
    if (a <= m && b > m) msgs.push({ warn: true, text: 'Question ' + q.number + ' is over its maximum: ' + fmtNum(b) + ' / ' + fmtNum(m) + '.' });
    else if (a < m && b === m) msgs.push({ text: who + ' has full marks for question ' + q.number + ' (' + fmtNum(m) + ' / ' + fmtNum(m) + ').' });
  });
  if (msgs.length) notice(msgs);
}
function notice(msgs) {
  let n = document.querySelector('.gg-notice');
  if (!n) { n = el('div', { class: 'gg-notice', role: 'status', 'aria-live': 'polite' }); document.body.appendChild(n); }
  n.className = 'gg-notice' + (msgs.some(m => m.warn) ? ' is-warn' : '');
  n.replaceChildren(...msgs.map(m => el('div', { text: m.text })),
    el('button', { type: 'button', 'aria-label': 'Close', text: '×', onclick: () => n.remove() }));
  clearTimeout(noticeTimer); noticeTimer = setTimeout(() => n.remove(), msgs.some(m => m.warn) ? 7000 : 4500);
}

function changedMarks() { if (!cur || !cur.ver) return; checkMaximum(); say('Saving…'); clearTimeout(saveTimer); saveTimer = setTimeout(saveMarks, 700); }
async function flushSave() { if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; await saveMarks(); } }
async function saveMarks() {
  saveTimer = null;
  if (!cur || !cur.ver || saving) return;
  saving = true;
  const s = score(), qTotals = {};
  questions.forEach(q => { const r = s.t.perQ[q.id]; qTotals[q.number] = r.override != null ? r.override : r.got; });
  const row = { submission_id: cur.sub.id, score: s.got, score_max: A.total_marks, question_overrides: cur.overrides, question_totals: qTotals,
                overall_comment: cur.comment || null, marked_version: cur.ver.id, marked_by: me(), marked_at: new Date().toISOString() };
  let error;
  if (cur.loadedAt) {
    const res = await sb().from('submission_marks').update(row).eq('submission_id', cur.sub.id).eq('marked_at', cur.loadedAt).select('submission_id');
    error = res.error;
    if (!error && (!res.data || !res.data.length)) {
      saving = false;
      say('Another teacher changed these marks after you opened them. Reload this learner to see their version.', true);
      return;
    }
  } else {
    ({ error } = await sb().from('submission_marks').insert(row));
  }
  if (error) { saving = false; return say('Could not save: ' + friendly(error), true); }
  cur.loadedAt = row.marked_at; marksBySub[cur.sub.id] = { ...(marksBySub[cur.sub.id] || {}), ...row }; cur.marks = marksBySub[cur.sub.id];
  // rubric scores: update rows we have, insert new ones
  if (rubric) {
    for (const [cid, v] of Object.entries(cur.scores)) {
      const data = { rubric_version_id: rubric.id, submission_id: cur.sub.id, criterion_id: cid, level_id: v.level_id || null, mark: v.mark ?? null, updated_at: new Date().toISOString() };
      if (v.id) { const r = await sb().from('rubric_scores').update(data).eq('id', v.id); if (r.error) error = r.error; }
      else { const r = await sb().from('rubric_scores').insert(data).select('id').single(); if (r.error) error = r.error; else v.id = r.data.id; }
    }
  }
  saving = false;
  say(error ? 'Marks saved, rubric not: ' + friendly(error) : 'Saved ' + new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }), !!error);
  refreshOption();
}
function refreshOption() {
  const opt = $('mkLearner').options[idx]; if (!opt || !cur) return;
  const m = marksBySub[cur.sub.id];
  opt.textContent = cur.r.display_name + (cur.sub.released_at ? ' — returned' : m && m.score != null ? ' — ' + fmtNum(m.score) + '/' + fmtNum(A.total_marks) : ' — to mark');
}

/* ── Return marks, reopen, export ──────────────────────────── */
async function releaseMarks(onlyThis) {
  await flushSave();
  const ready = onlyThis ? [cur.sub] : subs.filter(s => isHandedIn(s) && marksBySub[s.id] && marksBySub[s.id].score != null);
  const unmarked = subs.filter(s => isHandedIn(s) && !(marksBySub[s.id] && marksBySub[s.id].score != null)).length;
  if (!ready.length) return say('Nothing marked to return yet.', true);
  $('mkReleaseText').textContent = onlyThis
    ? 'Return the marks and feedback to ' + cur.r.display_name + '? They will see their mark, your comments and the rubric.'
    : 'Return marks and feedback to ' + ready.length + ' learner' + (ready.length === 1 ? '' : 's') + '?' + (unmarked ? ' ' + unmarked + ' handed-in piece' + (unmarked === 1 ? ' is' : 's are') + ' not marked yet and will not be returned.' : '') + ' The marks also go into the markbook.';
  const d = $('mkReleaseDlg'); d.showModal();
  $('mkReleaseNo').onclick = () => d.close();
  $('mkReleaseYes').onclick = async () => {
    d.close();
    const { data, error } = await sb().rpc('release_marks', { p_assignment: AID, p_submissions: onlyThis ? [cur.sub.id] : null });
    if (error) return say('Could not return marks: ' + friendly(error), true);
    say('Returned to ' + data + ' learner' + (data === 1 ? '' : 's') + '.');
    const keep = cur && cur.r && cur.r.id; await loadClassData(); applyFilter(keep);
  };
}
async function reopen() {
  if (!cur || !cur.sub) return;
  if (!confirm('Let ' + cur.r.display_name + ' change their work and hand it in again? Their earlier hand-in and your marks on it are kept' + (cur.sub.released_at ? ', but the returned marks are hidden from them again.' : '.'))) return;
  const { error } = await sb().rpc('reopen_submission', { p_submission: cur.sub.id });
  if (error) return say(friendly(error), true);
  const keep = cur.r.id; await loadClassData(); applyFilter(keep);
}
function exportCsv() {
  const qh = questions.map(q => 'Q' + q.number + ' (/' + fmtNum(q.max_marks) + ')');
  const rows = [['Learner', 'Admission no', 'Status', 'Handed in', 'Late', 'Hand-ins', 'Mark', 'Out of', '%', 'Level', ...qh, 'Returned']];
  roster.forEach(r => {
    const s = subFor(r), m = s && marksBySub[s.id], v = s && lastVersion(s);
    const pct = m && m.score != null ? m.score / A.total_marks * 100 : null;
    rows.push([r.display_name, r.admission_no || '', !r.student_id ? 'no account' : !isHandedIn(s) ? (s ? 'draft' : 'not started') : s.status,
      v ? new Date(v.submitted_at).toLocaleString('sv-SE', { timeZone: 'Africa/Johannesburg' }).slice(0, 16) : '',   // local time, sortable v && v.is_late ? 'yes' : '', s ? s.attempt : '',
      m && m.score != null ? m.score : '', A.total_marks, pct == null ? '' : Math.round(pct), pct == null ? '' : capsLevel(pct),
      ...questions.map(q => m && m.question_totals && m.question_totals[q.number] != null ? m.question_totals[q.number] : ''),
      s && s.released_at ? 'yes' : '']);
  });
  const q = v => { const t = String(v ?? ''); return /[",;\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; };
  const csv = '﻿' + rows.map(r => r.map(q).join(',')).join('\r\n');
  const a = el('a', { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })), download: A.title.replace(/[^\w\- ]+/g, '').trim().slice(0, 60) + ' marks.csv' });
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

async function downloadMarked() {
  if (!cur || !cur.pdfBytes) return;
  await flushSave();
  const s = score(), def = rubric && rubric.definition;
  const info = { title: A.title, learner: cur.r.display_name, score: s.got, max: Number(A.total_marks), comment: cur.comment,
    perQ: questions.map(q => { const r = s.t.perQ[q.id]; return { number: q.number, got: r.override != null ? r.override : r.got, max: r.max }; }),
    rubric: def ? def.criteria.map(c => { const sc = cur.scores[c.id] || {}; const l = criterionLevels(def, c).find(x => x.id === sc.level_id);
      return { name: c.name, got: sc.mark ?? 0, max: criterionMax(def, c), level: l ? l.label : '' }; }) : [] };
  const bytes = await markedPdf(cur.pdfBytes.slice(0), cur.anns, info);
  download(bytes, (cur.r.display_name + ' - ' + A.title).replace(/[^\w\- ]+/g, '').slice(0, 80) + ' (marked).pdf');
}

/* ── Global wiring ─────────────────────────────────────────── */
function wireGlobal() {
  $('mkLearner').addEventListener('change', () => open(Number($('mkLearner').value)));
  $('mkPrev').addEventListener('click', () => open(idx - 1));
  $('mkNext').addEventListener('click', () => open(idx + 1));
  $('mkFilter').addEventListener('change', () => applyFilter(cur && cur.r && cur.r.id));
  $('mkVersion').addEventListener('change', async () => { await flushSave(); loadVersion(cur.r, cur.sub, cur.versions, $('mkVersion').value); });
  $('mkComment').addEventListener('input', () => { if (cur) { cur.comment = $('mkComment').value; changedMarks(); } });
  $('mkRelease').addEventListener('click', () => releaseMarks(false));
  $('mkReturnOne').addEventListener('click', () => releaseMarks(true));
  $('mkReopen').addEventListener('click', reopen);
  $('mkCsv').addEventListener('click', exportCsv);
  $('mkHelp').addEventListener('click', () => $('mkHelpDlg').showModal());
  $('mkPdfDl').addEventListener('click', downloadMarked);
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('.ProseMirror')) return;      // the editor's own handler runs
    if (e.target.closest && e.target.closest('.gg-menu, dialog[open]')) return;
    if (onKey(e, false)) e.preventDefault();
  });
  window.addEventListener('beforeunload', e => { if (saveTimer || saving) { saveMarks(); e.preventDefault(); e.returnValue = ''; } });
}
