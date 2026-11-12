/* Grading Grimoire — learner editor (written-task.html?a=<assignment id>).
   Write → autosave (this device first, then the server) → hand in (locks) → feedback after release.
   Spec: docs/marking-platform-spec.md §2. */
import { Editor } from './vendor/tiptap-3.32.1.bundle.js';
import {
  sb, me, esc, el, fmtWhen, fmtNum, friendly, capsLevel, whenAuthReady, extensions, docText, countWords, imagePaths,
  prepareImage, BUCKET, loadAssignment, Overlay, questionMap, tickTotals, rubricScore, criterionLevels, criterionMax, questionBadges,
  pageQuestionOf, signedUrl
} from './grimoire-core.js';
import { renderPdf, photosToPdf, pageCount, markedPdf, download, MAX_PDF_BYTES, MAX_PAGES } from './grimoire-pdf.js';

const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const AID = params.get('a');
const MAX_IMAGES = 30;

let A, questions = [], rubric = null, sub = null, editor = null;
let serverVersion = 0, dirty = false, saving = false, saveTimer = null, localTimer = null, lastSavedAt = null, offline = !navigator.onLine;
const localKey = () => 'ml-sub-' + (sub && sub.id);

function say(msg, cls) {
  const s = $('wtStatus'); s.textContent = '';
  s.appendChild(el('span', { class: cls || '', text: msg }));
}
function fail(msg) { $('wtMsg').hidden = false; $('wtMsg').className = 'gg-msg gg-err'; $('wtMsg').textContent = msg; }

/* ── Start ─────────────────────────────────────────────────── */
(async function init() {
  await whenAuthReady();
  if (!AID) return fail('No task was chosen. Open it from My assignments.');
  if (!window.MagicLabAuth.isLoggedIn()) return;            // require-auth.js sends signed-out visitors away
  try { ({ a: A, questions, rubric } = await loadAssignment(AID)); }
  catch (e) { return fail('This task could not be found, or it is not set for you.'); }
  if (A.kind !== 'written') return fail('This assignment is not a written task.');
  showHeader();
  if (!window.MagicLabAuth.isStudent()) {
    return fail('This page is where learners write. Teachers mark the task in Grading Grimoire.');
  }
  const { data, error } = await sb().rpc('start_submission', { p_assignment: AID });
  if (error) return fail(friendly(error));
  sub = data; serverVersion = sub.draft_version;
  $('wtMsg').hidden = true;
  await render();
})();

function showHeader() {
  $('wtHead').hidden = false;
  $('wtTitle').textContent = A.title;
  document.title = A.title + ' — The Magic Lab';
  const due = A.due_at ? new Date(A.due_at) : null;
  const late = due && Date.now() > due.getTime();
  const bits = [];
  if (due) bits.push(el('span', { class: late ? 'gg-late' : '', text: (late ? 'Was due ' : 'Due ') + fmtWhen(A.due_at) }));
  if (A.close_at) bits.push(el('span', { text: 'Closes ' + fmtWhen(A.close_at) }));
  bits.push(el('span', { class: 'mono', text: fmtNum(A.total_marks) + ' marks' }));
  if (A.word_limit) bits.push(el('span', { class: 'mono', text: 'up to ' + A.word_limit + ' words' }));
  $('wtMeta').replaceChildren(...bits);
  if (A.instructions) { $('wtBrief').hidden = false; $('wtBrief').textContent = A.instructions; }
  if (questions.length) {
    $('wtQuestions').hidden = false;
    $('wtQuestions').textContent = 'Questions: ' + questions.map(q => q.number + ' (' + fmtNum(q.max_marks) + ')').join(' · ') +
      '. Start each answer with its number, for example "' + questions[0].number + '", so your teacher\'s marks land on the right question.';
  }
}

/* ── Choose the view ───────────────────────────────────────── */
async function render() {
  const editable = sub.status === 'draft' || sub.status === 'reopened';
  const mode = A.submission_mode || 'online';       // 'online' | 'upload' | 'either'
  if (editable) {
    if (mode === 'upload') return openUpload();
    $('wtEditorWrap').hidden = false;
    if (mode === 'either') {
      $('wtModeSwitch').hidden = false;
      const pick = which => {
        $('wtModeWrite').setAttribute('aria-pressed', String(which === 'write'));
        $('wtModeUpload').setAttribute('aria-pressed', String(which === 'upload'));
        $('wtEditorWrap').hidden = which !== 'write'; $('wtUpload').hidden = which !== 'upload';
        if (which === 'upload') openUpload();
      };
      $('wtModeWrite').onclick = () => pick('write'); $('wtModeUpload').onclick = () => pick('upload');
    }
    return openEditor();
  }
  $('wtEditorWrap').hidden = false;
  // handed in: show the latest handed-in version, read-only (with marking once released)
  const { data: vers } = await sb().from('submission_versions').select('*').eq('submission_id', sub.id).order('attempt', { ascending: false }).limit(1);
  const ver = vers && vers[0];
  if (!ver) return fail('Your hand-in could not be loaded.');
  if (sub.released_at) return showFeedback(ver);
  if (ver.file_path) await showReadOnlyPdf(ver); else showReadOnly(ver.doc);
  say('Handed in ' + fmtWhen(ver.submitted_at) + (ver.is_late ? ' (late)' : '') + (sub.attempt > 1 ? ' · hand-in ' + sub.attempt : '') +
      (sub.status === 'marking' ? ' · your teacher is marking it' : ' · waiting for your teacher to mark it'));
  const canAgain = A.allow_resubmit && sub.attempt < A.max_attempts && !sub.released_at;
  $('wtAgain').hidden = !canAgain;
  $('wtAgain').onclick = async () => {
    const { error } = await sb().rpc('resubmit_submission', { p_submission: sub.id });
    if (error) return say(friendly(error), 'is-bad');
    sub.status = 'draft'; editor && editor.destroy(); editor = null; $('wtAgain').hidden = true;
    $('wtDoc').textContent = ''; $('wtDoc').className = 'gg-doc'; $('wtPaper').classList.remove('is-pdf');
    render();
  };
}

/* ── Hand in a file: a PDF, or phone photos joined into one PDF (spec: PDF hand-ins) ── */
let pending = null, photos = [], uploadWired = false;
function openUpload() {
  $('wtUpload').hidden = false; $('wtMsg').hidden = true;
  if (uploadWired) return; uploadWired = true;
  const st = t => { $('wtUpStatus').textContent = t; };
  $('wtPickPdf').onclick = () => $('wtPdfFile').click();
  $('wtPickPhotos').onclick = () => $('wtPhotoFiles').click();
  $('wtPdfFile').onchange = async e => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    if (f.size > MAX_PDF_BYTES) return st('That PDF is over 15 MB. Make it smaller (for example "Save as PDF" with smaller images) and try again.');
    st('Opening ' + f.name + '…');
    try {
      const bytes = new Uint8Array(await f.arrayBuffer());
      const n = await pageCount(bytes);
      if (n > MAX_PAGES) return st('That PDF has ' + n + ' pages; the most is ' + MAX_PAGES + '.');
      photos = []; await showPending({ bytes, pages: n, label: f.name });
    } catch (err) { st('That file could not be opened as a PDF.'); }
  };
  $('wtPhotoFiles').onchange = async e => {
    const add = [...e.target.files].filter(f => f.type.startsWith('image/')); e.target.value = '';
    if (!add.length) return;
    photos = photos.concat(add).slice(0, MAX_PAGES);
    st('Joining ' + photos.length + ' photo' + (photos.length === 1 ? '' : 's') + ' into one PDF…');
    try {
      const bytes = await photosToPdf(photos, (i, n) => st('Joining photos… ' + i + ' of ' + n));
      if (bytes.length > MAX_PDF_BYTES) return st('Together the photos are over 15 MB. Use fewer photos.');
      await showPending({ bytes, pages: photos.length, label: photos.length + ' photo' + (photos.length === 1 ? '' : 's') });
    } catch (err) { st(friendly(err)); }
  };
  $('wtUpClear').onclick = () => { pending = null; photos = []; $('wtUpPreview').textContent = ''; $('wtUpSubmit').hidden = true; $('wtUpClear').hidden = true; st(''); };
  $('wtUpSubmit').onclick = handInFile;
}
async function showPending(p) {
  pending = p;
  $('wtUpStatus').textContent = p.label + ' · ' + p.pages + ' page' + (p.pages === 1 ? '' : 's') + '. Check the pages below, then hand in.' +
    (photos.length ? ' Add more photos to put them after these.' : '');
  await renderPdf($('wtUpPreview'), p.bytes.slice(0));
  $('wtUpSubmit').hidden = false; $('wtUpClear').hidden = false;
}
async function handInFile() {
  if (!pending) return;
  const late = A.due_at && Date.now() > new Date(A.due_at).getTime();
  const lines = [pending.pages + ' page' + (pending.pages === 1 ? '' : 's') + '.'];
  if (late) lines.push('The due time has passed, so this will be marked as late.');
  lines.push(A.allow_resubmit && A.max_attempts > 1 ? 'You can hand in again until your teacher returns the marks.' : 'After you hand in, you cannot change it unless your teacher reopens it.');
  $('wtConfirmText').textContent = lines.join(' ');
  const d = $('wtConfirm'); d.showModal();
  $('wtConfirmNo').onclick = () => d.close();
  $('wtConfirmYes').onclick = async () => {
    $('wtConfirmYes').disabled = true;
    $('wtUpStatus').textContent = 'Uploading…';
    const path = me() + '/' + sub.id + '/' + crypto.randomUUID() + '.pdf';
    const up = await sb().storage.from(BUCKET).upload(path, new Blob([pending.bytes], { type: 'application/pdf' }), { contentType: 'application/pdf', upsert: false });
    if (up.error) { $('wtConfirmYes').disabled = false; d.close(); $('wtUpStatus').textContent = 'Upload failed: ' + friendly(up.error); return; }
    const { error } = await sb().rpc('submit_upload', { p_submission: sub.id, p_file_path: path, p_page_count: pending.pages });
    $('wtConfirmYes').disabled = false; d.close();
    if (error) { $('wtUpStatus').textContent = friendly(error); return; }
    pending = null; photos = []; dirty = false;
    backToAssignments();
  };
}
/** A handed-in PDF, read-only. Returns its bytes (for the marked-PDF download). */
async function showReadOnlyPdf(ver) {
  $('wtToolbar').hidden = true; $('wtSubmit').hidden = true;
  $('wtPaper').classList.add('is-readonly', 'is-pdf'); $('wtDoc').className = 'gg-pages'; $('wtDoc').textContent = 'Loading your pages…';
  const bytes = new Uint8Array(await (await fetch(await signedUrl(ver.file_path))).arrayBuffer());
  await renderPdf($('wtDoc'), bytes.slice(0));
  $('wtCount').textContent = (ver.page_count || '') + ' pages';
  return bytes;
}

function showReadOnly(doc) {
  $('wtToolbar').hidden = true; $('wtSubmit').hidden = true;
  $('wtPaper').classList.add('is-readonly');
  editor = new Editor({ element: $('wtDoc'), editable: false, content: doc, extensions: extensions() });
  const words = countWords(docText(doc)); $('wtCount').textContent = words + ' words';
  return editor;
}

/* ── Editing ───────────────────────────────────────────────── */
function openEditor() {
  $('wtToolbar').hidden = false; $('wtSubmit').hidden = false; $('wtPaper').classList.remove('is-readonly');
  let content = sub.draft_doc;
  // Unsaved work left on this device (offline, or the tab closed before the server save)?
  try {
    const local = JSON.parse(localStorage.getItem(localKey()) || 'null');
    if (local && local.doc && local.base === sub.draft_version && JSON.stringify(local.doc) !== JSON.stringify(sub.draft_doc)) {
      content = local.doc; dirty = true;
    }
  } catch (e) { /* storage blocked: the server copy is used */ }

  editor = new Editor({
    element: $('wtDoc'), editable: true, content,
    extensions: extensions({ editable: true, placeholder: 'Start writing here… Type / for headings, lists, tables and images.', wordLimit: A.word_limit }),
    editorProps: {
      attributes: { 'aria-label': 'Your answer. Type / for commands.', role: 'textbox', 'aria-multiline': 'true' },
      handleKeyDown: (view, e) => slashKey(e),
      handlePaste: (view, event) => takeImages(event.clipboardData && event.clipboardData.files),
      handleDrop: (view, event) => takeImages(event.dataTransfer && event.dataTransfer.files, view.posAtCoords({ left: event.clientX, top: event.clientY }))
    },
    onUpdate: () => { changed(); slashCheck(); },
    onSelectionUpdate: () => { syncToolbar(); slashCheck(); },
    onBlur: () => setTimeout(slashClose, 150),
    onTransaction: () => syncToolbar()
  });
  buildToolbar();
  updateCount();
  if (dirty) { say('Restored work saved on this device. Saving it…'); scheduleSave(200); }
  else say(sub.draft_saved_at ? 'Saved ' + fmtWhen(sub.draft_saved_at) : 'Your work saves itself as you type.');
  $('wtSubmit').onclick = confirmSubmit;
  window.addEventListener('online', () => { offline = false; if (dirty) scheduleSave(100); });
  window.addEventListener('offline', () => { offline = true; say('Offline — your work is saved on this device', 'is-warn'); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && dirty) saveNow(); });
  window.addEventListener('pagehide', () => { if (dirty) saveNow(); });
  window.addEventListener('beforeunload', e => { if (dirty && !navigator.onLine) { e.preventDefault(); e.returnValue = ''; } });
}

function changed() {
  dirty = true; updateCount();
  clearTimeout(localTimer);
  localTimer = setTimeout(() => {
    try { localStorage.setItem(localKey(), JSON.stringify({ base: serverVersion, doc: editor.getJSON(), at: Date.now() })); } catch (e) { /* storage full or blocked */ }
  }, 400);
  scheduleSave(3000);
  if (!offline) say('Saving…');
}
function scheduleSave(ms) { clearTimeout(saveTimer); saveTimer = setTimeout(saveNow, ms); }

async function saveNow() {
  if (!editor || saving || !dirty) return;
  if (offline) { say('Offline — your work is saved on this device', 'is-warn'); return; }
  saving = true;
  const doc = editor.getJSON();
  const { data, error } = await sb().rpc('save_draft', { p_submission: sub.id, p_doc: doc, p_expected_version: serverVersion });
  saving = false;
  if (error) {
    if (/stale/i.test(error.message)) return conflict(doc);
    if (/locked|handed in/i.test(error.message)) { say('This work has been handed in and is locked.', 'is-bad'); return; }
    say("Couldn't save — retrying", 'is-bad'); scheduleSave(8000); return;
  }
  serverVersion = data; lastSavedAt = new Date();
  // only clear "dirty" if nothing changed while we were saving
  if (JSON.stringify(editor.getJSON()) === JSON.stringify(doc)) {
    dirty = false;
    try { localStorage.setItem(localKey(), JSON.stringify({ base: serverVersion, doc, at: Date.now() })); } catch (e) {}
  } else scheduleSave(1500);
  say('Saved ' + lastSavedAt.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }));
}

async function conflict(mine) {
  const d = $('wtConflict');
  // Drafts are private to the learner: read through get_my_draft() (falls back to a plain read
  // on databases where supabase-grading-grimoire-phase2.sql has not been run yet).
  let fresh = null;
  const r = await sb().rpc('get_my_draft', { p_submission: sub.id });
  if (!r.error && r.data && r.data.length) fresh = r.data[0];
  else { const q = await sb().from('submissions').select('draft_doc, draft_version, status').eq('id', sub.id).single(); fresh = q.data; }
  if (!fresh) return;
  d.showModal();
  $('wtConflictMine').onclick = () => { d.close(); serverVersion = fresh.draft_version; dirty = true; saveNow(); };
  $('wtConflictTheirs').onclick = () => {
    d.close(); serverVersion = fresh.draft_version; editor.commands.setContent(fresh.draft_doc, { emitUpdate: false }); dirty = false;
    try { localStorage.setItem(localKey(), JSON.stringify({ base: serverVersion, doc: fresh.draft_doc, at: Date.now() })); } catch (e) {}
    say('Loaded the other copy.');
  };
}

function updateCount() {
  const words = countWords(editor.getText());
  const over = A.word_limit && words > A.word_limit;
  $('wtCount').textContent = words + (A.word_limit ? ' / ' + A.word_limit : '') + ' words' + (over ? ' — over the limit' : '');
  $('wtCount').className = over ? 'gg-hint gg-late' : 'gg-hint';
}

/* ── Images ────────────────────────────────────────────────── */
function takeImages(files, at) {
  const list = [...(files || [])].filter(f => f.type.startsWith('image/'));
  if (!list.length) return false;
  list.forEach(f => uploadImage(f, at && at.pos));
  return true;
}
async function uploadImage(file, pos) {
  if (imagePaths(editor.getJSON()).length >= MAX_IMAGES) return say('A task can have at most ' + MAX_IMAGES + ' images.', 'is-bad');
  say('Adding your image…');
  try {
    const img = await prepareImage(file);
    const path = me() + '/' + sub.id + '/' + crypto.randomUUID() + '.' + img.ext;
    const { error } = await sb().storage.from(BUCKET).upload(path, img.blob, { contentType: img.type, upsert: false });
    if (error) throw error;
    const node = { type: 'image', attrs: { path, width: img.w, height: img.h, alt: '' } };
    const chain = editor.chain().focus();
    (pos != null ? chain.insertContentAt(pos, node) : chain.insertContent(node)).run();
  } catch (e) { say(friendly(e), 'is-bad'); }
}

/* ── Toolbar ───────────────────────────────────────────────── */
const TOOLS = [
  { k: 'bold', t: 'B', l: 'Bold (Ctrl+B)', run: c => c.toggleBold(), on: 'bold', style: 'font-weight:900' },
  { k: 'italic', t: 'I', l: 'Italic (Ctrl+I)', run: c => c.toggleItalic(), on: 'italic', style: 'font-style:italic' },
  { k: 'underline', t: 'U', l: 'Underline (Ctrl+U)', run: c => c.toggleUnderline(), on: 'underline', style: 'text-decoration:underline' },
  { k: 'sub', t: 'x₂', l: 'Subscript', run: c => c.toggleSubscript(), on: 'subscript' },
  { k: 'sup', t: 'x²', l: 'Superscript', run: c => c.toggleSuperscript(), on: 'superscript' },
  'sep',
  { k: 'h2', t: 'H2', l: 'Heading', run: c => c.toggleHeading({ level: 2 }), on: ['heading', { level: 2 }] },
  { k: 'h3', t: 'H3', l: 'Smaller heading', run: c => c.toggleHeading({ level: 3 }), on: ['heading', { level: 3 }] },
  { k: 'ul', t: '•', l: 'Bulleted list', run: c => c.toggleBulletList(), on: 'bulletList' },
  { k: 'ol', t: '1.', l: 'Numbered list', run: c => c.toggleOrderedList(), on: 'orderedList' },
  { k: 'quote', t: '❝', l: 'Quote', run: c => c.toggleBlockquote(), on: 'blockquote' },
  'sep',
  { k: 'link', t: 'Link', l: 'Add a link (Ctrl+K)', run: () => addLink(), on: 'link' },
  { k: 'table', t: 'Table', l: 'Insert a table', run: c => c.insertTable({ rows: 3, cols: 3, withHeaderRow: true }) },
  { k: 'image', t: 'Image', l: 'Add an image', run: () => $('wtFile').click() },
  'sep',
  { k: 'row', t: '+Row', l: 'Add a table row', run: c => c.addRowAfter(), table: true },
  { k: 'col', t: '+Col', l: 'Add a table column', run: c => c.addColumnAfter(), table: true },
  { k: 'delrow', t: '−Row', l: 'Delete this row', run: c => c.deleteRow(), table: true },
  { k: 'deltable', t: '−Table', l: 'Delete the table', run: c => c.deleteTable(), table: true },
  'sep',
  { k: 'undo', t: '↶', l: 'Undo (Ctrl+Z)', run: c => c.undo() },
  { k: 'redo', t: '↷', l: 'Redo (Ctrl+Shift+Z)', run: c => c.redo() }
];
function buildToolbar() {
  const tb = $('wtToolbar'); tb.textContent = '';
  TOOLS.forEach(t => {
    if (t === 'sep') return tb.appendChild(el('span', { class: 'gg-tb-sep', 'aria-hidden': 'true' }));
    const b = el('button', { class: 'gg-tb', type: 'button', 'aria-label': t.l, title: t.l, 'data-k': t.k, style: t.style || null, text: t.t });
    if (t.on) b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => { const r = t.run(editor.chain().focus()); if (r && r.run) r.run(); });
    tb.appendChild(b);
  });
  $('wtFile').onchange = e => { const f = e.target.files[0]; e.target.value = ''; if (f) uploadImage(f); };
  editor.view.dom.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); addLink(); } });
  syncToolbar();
}
function syncToolbar() {
  if (!editor) return;
  const inTable = editor.isActive('table');
  TOOLS.forEach(t => {
    if (t === 'sep') return;
    const b = $('wtToolbar').querySelector('[data-k="' + t.k + '"]'); if (!b) return;
    if (t.table) b.hidden = !inTable;
    if (t.on) b.setAttribute('aria-pressed', String(Array.isArray(t.on) ? editor.isActive(...t.on) : editor.isActive(t.on)));
  });
}
function addLink() {
  const prev = editor.getAttributes('link').href || '';
  const url = prompt('Link address (https://…). Leave empty to remove the link.', prev);
  if (url === null) return;
  if (!url.trim()) return editor.chain().focus().extendMarkRange('link').unsetLink().run();
  const href = /^(https?:|mailto:)/i.test(url.trim()) ? url.trim() : 'https://' + url.trim();
  if (editor.state.selection.empty && !editor.isActive('link')) editor.chain().focus().insertContent({ type: 'text', text: href, marks: [{ type: 'link', attrs: { href } }] }).run();
  else editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
}

/* ── "/" commands, like Loop and Notion ──────────────────────
   Typing / at the start of a line or after a space opens a list; typing filters it;
   ↑ ↓ choose, Enter or Tab runs, Esc closes. The "/word" typed is removed when a command runs. */
const SLASH = [
  { label: 'Heading', hint: 'Big section heading', words: 'h2 title section', run: c => c.setNode('heading', { level: 2 }) },
  { label: 'Smaller heading', hint: 'Sub-heading', words: 'h3 subheading', run: c => c.setNode('heading', { level: 3 }) },
  { label: 'Question number', hint: 'Start an answer, e.g. 1.1', words: 'question answer number', run: c => c.setNode('heading', { level: 3 }).insertContent((questions[0] && questions[0].number || '1.1') + ' ') },
  { label: 'Bulleted list', hint: '• points', words: 'ul bullet list points', run: c => c.toggleBulletList() },
  { label: 'Numbered list', hint: '1. 2. 3.', words: 'ol numbered ordered list steps', run: c => c.toggleOrderedList() },
  { label: 'Table', hint: '3 × 3 with a header row', words: 'table grid data', run: c => c.insertTable({ rows: 3, cols: 3, withHeaderRow: true }) },
  { label: 'Image', hint: 'Photo or diagram', words: 'image picture photo diagram upload', run: c => { c.run(); $('wtFile').click(); return null; } },
  { label: 'Link', hint: 'Web address', words: 'link url web', run: c => { c.run(); addLink(); return null; } },
  { label: 'Quote', hint: 'Quoted text', words: 'quote blockquote citation', run: c => c.toggleBlockquote() },
  { label: 'Divider', hint: 'A line across the page', words: 'divider line rule hr separator', run: c => c.setHorizontalRule() },
  { label: 'Plain text', hint: 'Back to a normal paragraph', words: 'text paragraph normal', run: c => c.setParagraph() }
];
let slash = null;   // { from, to, query, items, i, el }
function slashCheck() {
  if (!editor || !editor.isEditable) return slashClose();
  const { $from, empty } = editor.state.selection;
  if (!empty || !$from.parent.isTextblock) return slashClose();
  const before = $from.parent.textBetween(0, $from.parentOffset, undefined, '￼');
  const m = before.match(/(?:^|\s)\/([\p{L}\d ]{0,20})$/u);
  if (!m || m[1].startsWith(' ')) return slashClose();
  const query = m[1].toLowerCase().trim();
  const items = SLASH.filter(c => !query || (c.label + ' ' + c.words).toLowerCase().includes(query));
  if (!items.length) return slashClose();
  const to = $from.pos, from = to - m[1].length - 1;
  if (!slash) slash = { el: el('div', { class: 'gg-menu gg-slash', role: 'listbox', id: 'wtSlash', 'aria-label': 'Commands' }) };
  Object.assign(slash, { from, to, query, items, i: Math.min(slash.i || 0, items.length - 1) });
  slashRender();
}
function slashRender() {
  const box = slash.el; box.textContent = '';
  slash.items.forEach((c, i) => {
    const o = el('div', { role: 'option', id: 'wtSlash-' + i, 'aria-selected': String(i === slash.i), class: 'gg-slash-item' + (i === slash.i ? ' is-on' : '') },
      [el('span', { text: c.label }), el('span', { class: 'gg-hint', text: c.hint })]);
    o.addEventListener('mousedown', e => { e.preventDefault(); slashRun(i); });
    box.appendChild(o);
  });
  if (!box.isConnected) document.body.appendChild(box);
  const c = editor.view.coordsAtPos(slash.to), r = box.getBoundingClientRect();
  box.style.left = Math.max(8, Math.min(c.left, innerWidth - r.width - 8)) + 'px';
  box.style.top = (c.bottom + 6 + r.height > innerHeight ? Math.max(8, c.top - r.height - 6) : c.bottom + 6) + 'px';
  editor.view.dom.setAttribute('aria-activedescendant', 'wtSlash-' + slash.i);
  editor.view.dom.setAttribute('aria-controls', 'wtSlash');
  const on = box.querySelector('.is-on'); on && on.scrollIntoView({ block: 'nearest' });
}
function slashClose() {
  if (!slash) return;
  slash.el.remove(); slash = null;
  if (editor) { editor.view.dom.removeAttribute('aria-activedescendant'); editor.view.dom.removeAttribute('aria-controls'); }
}
function slashRun(i) {
  const cmd = slash && slash.items[i]; if (!cmd) return;
  const { from, to } = slash; slashClose();
  const chain = editor.chain().focus().deleteRange({ from, to });
  const r = cmd.run(chain); if (r && r.run) r.run();
}
function slashKey(e) {
  if (!slash) return false;
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { slash.i = (slash.i + (e.key === 'ArrowDown' ? 1 : -1) + slash.items.length) % slash.items.length; slashRender(); return true; }
  if (e.key === 'Enter' || e.key === 'Tab') { slashRun(slash.i); return true; }
  if (e.key === 'Escape') { slashClose(); return true; }
  return false;
}

/** After a hand-in: confirm it, then return the learner to their assignment list. */
function backToAssignments() {
  const msg = 'Handed in. Taking you back to your assignments…';
  $('wtMsg').hidden = false; $('wtMsg').className = 'gg-msg'; $('wtMsg').textContent = msg;
  $('wtUpload').hidden = true; $('wtModeSwitch').hidden = true; $('wtEditorWrap').hidden = true;
  $('wtMsg').scrollIntoView({ block: 'center' });
  setTimeout(() => { location.href = 'dashboard-student.html#assignments-panel'; }, 1200);
}

/* ── Hand in ───────────────────────────────────────────────── */
function confirmSubmit() {
  const json = editor.getJSON(), words = countWords(editor.getText()), imgs = imagePaths(json).length;
  if (!words && !imgs) return say('Write something before you hand in.', 'is-warn');
  const late = A.due_at && Date.now() > new Date(A.due_at).getTime();
  const lines = [words + ' words' + (imgs ? ' and ' + imgs + ' image' + (imgs === 1 ? '' : 's') : '') + '.'];
  if (A.word_limit && words > A.word_limit) lines.push('That is over the ' + A.word_limit + '-word limit.');
  if (late) lines.push('The due time has passed, so this will be marked as late.');
  lines.push(A.allow_resubmit && A.max_attempts > 1
    ? 'You can hand in again until your teacher returns the marks (' + A.max_attempts + ' hand-ins in total).'
    : 'After you hand in, you cannot change it unless your teacher reopens it.');
  $('wtConfirmText').textContent = lines.join(' ');
  const d = $('wtConfirm'); d.showModal();
  $('wtConfirmNo').onclick = () => d.close();
  $('wtConfirmYes').onclick = async () => {
    $('wtConfirmYes').disabled = true;
    clearTimeout(saveTimer); await saveNow();
    if (dirty) { $('wtConfirmYes').disabled = false; d.close(); return say('Your latest changes are not saved yet. Check your connection and try again.', 'is-bad'); }
    const { error } = await sb().rpc('submit_submission', {
      p_submission: sub.id, p_doc_text: docText(json), p_word_count: words, p_image_paths: imagePaths(json) });
    $('wtConfirmYes').disabled = false; d.close();
    if (error) return say(friendly(error), 'is-bad');
    try { localStorage.removeItem(localKey()); } catch (e) {}
    dirty = false;
    backToAssignments();
  };
}

/* ── Feedback after release (spec §3.7) ────────────────────── */
async function showFeedback(ver) {
  const { data: marks } = await sb().from('submission_marks').select('*').eq('submission_id', sub.id).maybeSingle();
  const vid = (marks && marks.marked_version) || ver.id;
  const [{ data: anns }, { data: scores }, shown] = await Promise.all([
    sb().from('annotations').select('*').eq('version_id', vid),
    sb().from('rubric_scores').select('*').eq('submission_id', sub.id),
    vid === ver.id ? Promise.resolve(ver) : versionById(vid)
  ]);
  const shownVer = shown || ver;
  let totals, overlay, pdfBytes = null;
  if (shownVer.file_path) {
    pdfBytes = await showReadOnlyPdf(shownVer);
    totals = tickTotals(anns || [], pageQuestionOf(anns || []), questions, marks && marks.question_overrides);
    overlay = new Overlay(null, $('wtPaper'), { interactive: false,
      qLabel: a => { const r = totals.perQ[a.question_id]; return r ? fmtNum(r.override != null ? r.override : r.got) + '/' + fmtNum(r.max) : ''; } });
    overlay.set(anns || [], []);
  } else {
    showReadOnly(shownVer.doc);
    const qmap = questionMap(editor.state.doc, questions);
    totals = tickTotals(anns || [], qmap, questions, marks && marks.question_overrides);
    overlay = new Overlay(editor, $('wtPaper'), { interactive: false });
    overlay.set(anns || [], questionBadges(editor, questions, totals, qmap));
  }
  say('Marked and returned' + (sub.released_at ? ' ' + fmtWhen(sub.released_at) : ''));

  const fb = $('wtFeedback'); fb.hidden = false; fb.textContent = '';
  const score = marks && marks.score != null ? Number(marks.score) : null, max = Number((marks && marks.score_max) || A.total_marks);
  const pct = score != null && max ? score / max * 100 : null;
  fb.appendChild(el('h2', { class: 'gg-h', id: 'wtFbHead', style: 'margin-top:0', text: 'Your mark' }));
  fb.appendChild(el('div', { class: 'gg-big', text: score != null ? fmtNum(score) + ' / ' + fmtNum(max) : 'Not marked' }));
  if (pct != null) fb.appendChild(el('div', { class: 'gg-meta', style: 'margin-top:6px', text: Math.round(pct) + '% · level ' + capsLevel(pct) }));
  if (questions.length) {
    const t = el('div', { class: 'gg-totals', style: 'margin-top:14px;max-width:320px' });
    questions.forEach(q => { const r = totals.perQ[q.id]; const got = r.override != null ? r.override : r.got;
      t.append(el('span', { class: 'k', text: 'Question ' + q.number }), el('span', { class: 'v', text: fmtNum(got) + ' / ' + fmtNum(q.max_marks) })); });
    fb.appendChild(t);
  }
  if (rubric && scores && scores.length) fb.appendChild(rubricSummary(rubric.definition, scores));
  if (pdfBytes) fb.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', style: 'margin-top:14px', text: 'Download marked PDF', onclick: async () => {
    const def = rubric && rubric.definition, by = Object.fromEntries((scores || []).map(x => [x.criterion_id, x]));
    const bytes = await markedPdf(pdfBytes.slice(0), anns || [], { title: A.title, score, max, comment: marks && marks.overall_comment,
      perQ: questions.map(q => { const r = totals.perQ[q.id]; return { number: q.number, got: r.override != null ? r.override : r.got, max: r.max }; }),
      rubric: def ? def.criteria.filter(c => by[c.id]).map(c => ({ name: c.name, got: by[c.id].mark ?? 0, max: criterionMax(def, c),
        level: (criterionLevels(def, c).find(l => l.id === by[c.id].level_id) || {}).label || '' })) : [] });
    download(bytes, A.title.replace(/[^\w\- ]+/g, '').slice(0, 60) + ' (marked).pdf');
  } }));
  if (marks && marks.overall_comment) {
    fb.appendChild(el('h3', { class: 'gg-h', style: 'font-size:15px', text: 'Comment from your teacher' }));
    fb.appendChild(el('p', { class: 'gg-brief', style: 'margin:0', text: marks.overall_comment }));
  }
  const notes = (anns || []).filter(a => a.body && a.type !== 'qstart');
  if (notes.length) {
    fb.appendChild(el('h3', { class: 'gg-h', style: 'font-size:15px', text: 'Comments on your work' }));
    const ul = el('ul', { class: 'gg-list' });
    notes.forEach(a => ul.appendChild(el('li', {}, [el('button', { type: 'button', text: a.body + (a.anchor.quote ? ' — "' + a.anchor.quote.exact.slice(0, 50) + '"' : ''),
      onclick: () => { overlay.selected = a.id; overlay.render(); const n = overlay.layer.querySelector('[data-id="' + a.id + '"]'); n && n.scrollIntoView({ block: 'center', behavior: 'smooth' }); } })])));
    fb.appendChild(ul);
  }
}
async function versionById(id) {
  const { data } = await sb().from('submission_versions').select('*').eq('id', id).maybeSingle(); return data;
}
function rubricSummary(def, scores) {
  const by = Object.fromEntries(scores.map(s => [s.criterion_id, s]));
  const wrap = el('div', { style: 'margin-top:16px' }, [el('h3', { class: 'gg-h', style: 'font-size:15px', text: 'Rubric' })]);
  const r = rubricScore(def, Object.fromEntries(scores.map(s => [s.criterion_id, { level_id: s.level_id, mark: s.mark }])));
  def.criteria.forEach(c => {
    const s = by[c.id]; const lv = s && criterionLevels(def, c).find(l => l.id === s.level_id);
    wrap.appendChild(el('div', { class: 'gg-crit' }, [
      el('div', { class: 'gg-crit-head' }, [el('span', { text: c.name }), el('span', { class: 'gg-mono', text: (s && s.mark != null ? fmtNum(s.mark) : '–') + ' / ' + fmtNum(criterionMax(def, c)) })]),
      lv ? el('div', { class: 'gg-level-desc', text: lv.label + ((c.cells && c.cells[lv.id]) ? ': ' + c.cells[lv.id] : '') }) : null
    ]));
  });
  wrap.appendChild(el('div', { class: 'gg-meta', text: 'Rubric total ' + fmtNum(r.got) + ' / ' + fmtNum(r.max) }));
  return wrap;
}
