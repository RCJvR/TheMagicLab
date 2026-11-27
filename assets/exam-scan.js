/* Exam Sanctum — handwritten paper scripts (exam-scan.html?s=<sitting id>).
 *
 * 1. Add a script for a learner on the class list, or an anonymous "Script NN" (exam_add_paper_script).
 * 2. Upload photos (resized in the browser) to the private bucket exam-scans/<attempt>/<NN>.jpg.
 * 3. "Read the handwriting" → edge function exam-transcribe prefills the answers.
 * 4. The teacher checks every answer beside the photo (same inputs a learner uses online),
 *    optionally enters the mark they gave on paper (stored as the blind "teacher" parity mark),
 *    and confirms. Only then can exam-mark mark the script.
 */
import { sb, me, $, el, esc, whenAuthReady, friendly, fmtNum, isStaff } from './exam-core.js';
import { renderItem, renderScenario, isAnswered } from './exam-render.js';

const sid = new URLSearchParams(location.search).get('s');
const BUCKET = 'exam-scans';
let sit, paper, items = [], learners = [], cur = null, att = null, photos = [], page = 0, answers = {}, hand = {}, dirty = false;
const isAI = it => paper.memo[it.id].type === 'written';
const showErr = e => { $('err').textContent = e ? friendly(e) : ''; };
const same = (x, y) => JSON.stringify(x ?? null) === JSON.stringify(y ?? null);

/* ── load ── */
async function load() {
  const s = await sb().from('exam_sittings').select('*').eq('id', sid).single();
  if (s.error) throw s.error;
  sit = s.data;
  const p = await sb().from('exam_papers').select('id, title, grade, total, learner, memo').eq('id', sit.paper_id).single();
  if (p.error) throw p.error;
  paper = p.data; items = paper.learner.items;
  await loadList();
}
async function loadList() {
  const mon = await sb().rpc('exam_monitor', { p_sitting: sid });
  if (mon.error) throw mon.error;
  learners = mon.data.learners;
  const ids = learners.filter(l => l.source === 'paper').map(l => l.attempt_id);
  const marked = {};
  if (ids.length) {
    const { data } = await sb().from('exam_attempts').select('id, mark_status, transcript').in('id', ids);
    (data || []).forEach(a => { marked[a.id] = a; });
  }
  learners.forEach(l => { if (marked[l.attempt_id]) Object.assign(l, { mark_status: marked[l.attempt_id].mark_status, read: !!marked[l.attempt_id].transcript }); });
  drawList();
}

function drawList() {
  const paperOnes = learners.filter(l => l.source === 'paper');
  $('sStats').innerHTML =
    `<div><b>${paperOnes.length}</b><span>paper scripts</span></div>` +
    `<div><b>${paperOnes.filter(l => l.read).length}</b><span>read by AI</span></div>` +
    `<div><b>${paperOnes.filter(l => l.checked).length}</b><span>checked by you</span></div>` +
    `<div><b>${paperOnes.filter(l => l.mark_status === 'done').length}</b><span>marked</span></div>`;
  const sel = $('addWho'); sel.innerHTML = '';
  sel.appendChild(el('option', { value: '', text: 'A new anonymous script (code below, or Script NN)' }));
  sel.onchange = () => { $('labelWrap').hidden = !!sel.value; };
  learners.filter(l => !l.attempt_id).forEach(l => sel.appendChild(el('option', { value: l.roster_id, text: l.name })));
  const tb = $('sTable').querySelector('tbody'); tb.innerHTML = '';
  paperOnes.forEach(l => tb.appendChild(el('tr', {}, [
    el('td', { text: l.name }), el('td', { text: l.pages || 0 }), el('td', { text: l.read ? 'yes' : '–' }),
    el('td', { text: l.checked ? 'yes' : '–' }), el('td', { text: l.mark_status === 'done' ? 'yes' : l.mark_status === 'error' ? 'failed' : '–' }),
    el('td', {}, [el('button', { class: 'gg-btn gg-btn--sm' + (cur && cur.attempt_id === l.attempt_id ? ' gg-btn--primary' : ''), type: 'button', text: 'Open', onclick: () => open(l) })])
  ])));
  if (!paperOnes.length) tb.appendChild(el('tr', {}, [el('td', { colspan: '6', class: 'gg-hint', text: 'No paper scripts yet. Add one above.' })]));
}

$('btnAdd').addEventListener('click', async () => {
  showErr(null);
  const v = $('addWho').value;
  // a class-list code such as 8A1-5 (class + position on the list) keeps names out of the database
  const label = v ? null : $('addLabel').value.trim().toUpperCase().replace(/\s+/g, '');
  if (label && !/^[0-9]{1,2}[A-Z0-9]{1,4}-[0-9]{1,3}$/.test(label)) return showErr('Use the form class-number, e.g. 8A1-5.');
  const { data, error } = await sb().rpc('exam_add_paper_script', { p_sitting: sid, p_roster: v || null, p_label: label || null });
  if (error) return showErr(error);
  $('addLabel').value = '';
  await loadList();
  const l = learners.find(x => x.attempt_id === data.attempt_id);
  if (l) open(l);
});

/* ── one script ── */
async function open(l) {
  if (dirty && !confirm('You have unsaved changes on this script. Leave without saving?')) return;
  cur = l; dirty = false; page = 0;
  $('one').hidden = false; $('oTitle').textContent = l.name; $('oWarn').innerHTML = ''; $('ckState').textContent = '';
  const { data, error } = await sb().from('exam_attempts').select('id, answers, transcript, transcript_checked_at, mark_status, pages').eq('id', l.attempt_id).single();
  if (error) return showErr(error);
  att = data; answers = JSON.parse(JSON.stringify(att.answers || {}));
  const pa = await sb().from('exam_parity').select('item_id, score').eq('attempt_id', att.id).eq('role', 'teacher');
  hand = Object.fromEntries((pa.data || []).map(x => [x.item_id, Number(x.score)]));
  await loadPhotos();
  drawList(); drawCheck();
  $('one').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
async function loadPhotos() {
  const { data, error } = await sb().storage.from(BUCKET).list(att.id, { limit: 100, sortBy: { column: 'name', order: 'asc' } });
  if (error) return showErr(error);
  const files = (data || []).filter(f => /\.(jpe?g|png|webp)$/i.test(f.name)).sort((a, b) => parseInt(a.name) - parseInt(b.name));
  photos = [];
  for (const f of files) {
    const { data: u } = await sb().storage.from(BUCKET).createSignedUrl(`${att.id}/${f.name}`, 3600);
    photos.push({ name: f.name, url: u && u.signedUrl });
  }
  drawThumbs();
}
function drawThumbs() {
  const box = $('thumbs'); box.innerHTML = '';
  photos.forEach((p, k) => box.appendChild(el('div', { class: 'xm-thumb' + (k === page ? ' on' : '') }, [
    el('button', { type: 'button', class: 'xm-thumb-img', 'aria-label': 'Show page ' + (k + 1), onclick: () => { page = k; showPhoto(); drawThumbs(); } }, [el('img', { src: p.url, alt: '' })]),
    el('span', { text: 'p. ' + (k + 1) }),
    el('button', { type: 'button', class: 'gg-btn gg-btn--sm', text: 'Remove', 'aria-label': 'Remove page ' + (k + 1), onclick: async () => {
      if (!confirm(`Remove page ${k + 1}?`)) return;
      const { error } = await sb().storage.from(BUCKET).remove([`${att.id}/${p.name}`]);
      if (error) return showErr(error);
      await loadPhotos(); await setPages();
    } })
  ])));
  $('btnRead').disabled = !photos.length;
  $('btnRead').textContent = att.transcript ? 'Read the handwriting again' : 'Read the handwriting';
  showPhoto();
}
async function setPages() { await sb().from('exam_attempts').update({ pages: photos.length }).eq('id', att.id); cur.pages = photos.length; drawList(); }
function showPhoto() {
  const p = photos[page];
  $('phImg').src = p ? p.url : ''; $('phOpen').href = p ? p.url : '#';
  $('phLabel').textContent = photos.length ? `Page ${page + 1} of ${photos.length}` : 'No photos yet';
}
$('phPrev').addEventListener('click', () => { if (page > 0) { page--; showPhoto(); drawThumbs(); } });
$('phNext').addEventListener('click', () => { if (page < photos.length - 1) { page++; showPhoto(); drawThumbs(); } });

/* resize in the browser: long side ≤ 2200 px, JPEG — enough for handwriting, small to upload */
function shrink(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, 2200 / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(b => b ? resolve(b) : reject(new Error('Could not read that photo.')), 'image/jpeg', 0.85);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error(`${file.name || 'That file'} is not a photo this browser can read (try JPEG).`));
    img.src = URL.createObjectURL(file);
  });
}

/* What is this file really? (zip entries and phone files often have the wrong type or extension) */
async function sniff(file) {
  const b = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const txt = String.fromCharCode(...b);
  if (txt.startsWith('%PDF')) return 'pdf';
  if (txt.slice(4, 8) === 'ftyp' && /^(heic|heix|hevc|hevx|heim|heis|mif1|msf1|heif)/.test(txt.slice(8, 12))) return 'heic';
  if (/\.pdf$/i.test(file.name)) return 'pdf';
  if (/\.hei[cf]$/i.test(file.name)) return 'heic';
  return 'image';
}
let heicLib = null, pdfLib = null;
function loadScript(src, ready) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script'); s.src = src;
    s.onload = () => ready() ? resolve(ready()) : reject(new Error('Could not load a converter.'));
    s.onerror = () => reject(new Error('Could not load a converter. Check the internet connection.'));
    document.head.appendChild(s);
  });
}
async function heicToJpeg(file) {
  heicLib = heicLib || loadScript('https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js', () => window.heic2any).catch(e => { heicLib = null; throw e; });
  const conv = await heicLib;
  const out = await conv({ blob: file, toType: 'image/jpeg', quality: 0.9 });
  return new File([Array.isArray(out) ? out[0] : out], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
}
async function pdfToJpegs(file) {
  pdfLib = pdfLib || import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs').then(m => {
    m.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';
    return m;
  }).catch(e => { pdfLib = null; throw new Error('Could not load the PDF reader. Check the internet connection.'); });
  const pdfjs = await pdfLib;
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  if (doc.numPages > 16) throw new Error(`${file.name} has ${doc.numPages} pages; a script can have at most 16.`);
  const out = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const v1 = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale: Math.min(3, 2200 / Math.max(v1.width, v1.height)) });
    const c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
    const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.88));
    out.push(new File([blob], `${file.name.replace(/\.\w+$/, '')}-p${String(p).padStart(2, '0')}.jpg`, { type: 'image/jpeg' }));
  }
  return out;
}
async function toImages(file) {
  const kind = await sniff(file);
  if (kind === 'heic') { $('oProg').textContent = `Converting ${file.name} (iPhone photo)…`; return [await heicToJpeg(file)]; }
  if (kind === 'pdf') { $('oProg').textContent = `Opening ${file.name} (PDF)…`; return pdfToJpegs(file); }
  return [file];
}
/* a .zip of photos: unpacked in the browser (JSZip, loaded only when needed), pages in file-name order */
let jszip = null;
function loadJSZip() {
  if (jszip) return jszip;
  jszip = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    s.onload = () => window.JSZip ? resolve(window.JSZip) : reject(new Error('Could not load the zip reader.'));
    s.onerror = () => { jszip = null; reject(new Error('Could not load the zip reader. Check the internet connection.')); };
    document.head.appendChild(s);
  });
  return jszip;
}
const IMG = /\.(jpe?g|png|webp|gif|bmp|heic|heif|pdf)$/i;
const isZip = f => /\.zip$/i.test(f.name) || /zip/.test(f.type);
async function unzip(file) {
  const JSZip = await loadJSZip();
  const z = await JSZip.loadAsync(file);
  const entries = Object.values(z.files)
    .filter(f => !f.dir && IMG.test(f.name) && !/(^|\/)(__MACOSX|\.)/.test(f.name))   // skip Mac metadata and hidden files
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const out = [];
  for (const f of entries) {
    const blob = await f.async('blob');
    out.push(new File([blob], f.name.split('/').pop(), { type: /\.png$/i.test(f.name) ? 'image/png' : 'image/jpeg' }));
  }
  if (!out.length) throw new Error(`${file.name} has no photos in it.`);
  return out;
}
const byName = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true });

$('files').addEventListener('change', async e => {
  const picked = [...e.target.files];
  e.target.value = '';
  showErr(null);
  let list = [];
  try {
    for (const f of picked.sort(byName)) {
      if (isZip(f)) { $('oProg').textContent = `Opening ${f.name}…`; list.push(...await unzip(f)); }
      else list.push(f);
    }
  } catch (err) { $('oProg').textContent = ''; return showErr(err); }
  if (!picked.some(isZip)) list.sort(byName);
  // iPhone HEIC photos become JPEG and PDFs become one image per page, all in the browser
  try {
    const pages = [];
    for (const f of list) pages.push(...await toImages(f));
    list = pages;
  } catch (err) { $('oProg').textContent = ''; return showErr(err); }
  if (!list.length) return;
  if (photos.length + list.length > 16) return showErr('A script can have at most 16 pages.');
  let next = photos.reduce((m, p) => Math.max(m, parseInt(p.name) || 0), 0);
  for (let i = 0; i < list.length; i++) {
    $('oProg').textContent = `Uploading ${i + 1} of ${list.length}…`;
    try {
      const blob = await shrink(list[i]);
      next++;
      const { error } = await sb().storage.from(BUCKET).upload(`${att.id}/${String(next).padStart(2, '0')}.jpg`, blob, { contentType: 'image/jpeg', upsert: true });
      if (error) throw error;
    } catch (err) { showErr(err); break; }
  }
  $('oProg').textContent = '';
  await loadPhotos(); await setPages();
});

$('btnRead').addEventListener('click', async () => {
  if (att.transcript_checked_at && !confirm('You already checked this script. Reading it again replaces the answers with a new AI reading. Continue?')) return;
  showErr(null);
  $('btnRead').disabled = true; $('oProg').textContent = 'Reading the handwriting… (about a minute)';
  const { data, error } = await sb().functions.invoke('exam-transcribe', { body: { attempt_id: att.id, force: !!att.transcript_checked_at } });
  $('btnRead').disabled = false; $('oProg').textContent = '';
  if (error) {
    let b = null; try { b = await error.context.json(); } catch (e) {}
    const code = b && (b.detail || b.error);
    return showErr({ no_key: 'AI reading is not switched on: the ANTHROPIC_API_KEY secret is missing.', no_credit: 'The Anthropic account has no credit left.',
      no_pages: 'Add the photos first.', busy: 'The AI is busy. Try again in a minute.' }[code] || friendly(error));
  }
  $('oProg').textContent = `Read ${data.pages} page${data.pages === 1 ? '' : 's'} (about $${Number(data.cost_usd || 0).toFixed(2)}).`;
  const l = cur; cur = null; dirty = false; await loadList(); await open(learners.find(x => x.attempt_id === l.attempt_id) || l);
});

/* ── check ── */
function drawCheck() {
  const t = att.transcript;
  $('check').hidden = !t;
  const warn = $('oWarn'); warn.innerHTML = '';
  if (!t) return;
  if (t.name_visible) warn.appendChild(el('p', { class: 'gg-err', text: 'The AI could read a learner’s name on a photo. Cover names before uploading: remove that page and photograph it again.' }));
  if (t.notes) warn.appendChild(el('p', { class: 'gg-hint', style: 'color:var(--warn)', text: 'AI note: ' + t.notes }));
  if (t.missing && t.missing.length) warn.appendChild(el('p', { class: 'gg-hint', style: 'color:var(--warn)', text: `The AI gave nothing for ${t.missing.length} question(s); check them.` }));
  const box = $('items'); box.innerHTML = '';
  let lastScen = null;
  items.forEach(it => {
    if (it.scen && it.scen !== lastScen) box.appendChild(renderScenario(paper.learner.scenarios[it.scen]));
    lastScen = it.scen || null;
    const ti = (t.items || {})[it.id] || {};
    const card = el('div', { class: 'xm-ck' + (ti.unsure || ti.unreadable ? ' unsure' : '') });
    const head = el('div', { class: 'xm-ans-head' });
    if (ti.unreadable) head.appendChild(el('span', { class: 'xm-pill bad', text: 'unreadable' }));
    else if (ti.unsure) head.appendChild(el('span', { class: 'xm-pill warn', text: 'AI unsure' }));
    const edited = el('span', { class: 'xm-pill', text: 'changed by you', hidden: same(answers[it.id], ti.answer) });
    head.appendChild(edited);
    if (ti.page) head.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Show page ' + ti.page, onclick: () => { page = Math.min(photos.length - 1, ti.page - 1); showPhoto(); drawThumbs(); } }));
    card.appendChild(head);
    card.appendChild(renderItem(it, { answer: answers[it.id], lang: paper.learner.lang, onChange: v => {
      if (v == null) delete answers[it.id]; else answers[it.id] = v;
      dirty = true; edited.hidden = same(answers[it.id], ti.answer); summary();
    } }));
    if (ti.raw && (it.type === 'written' || ti.unsure)) {
      const p = el('p', { class: 'gg-hint xm-raw' }); p.innerHTML = 'AI read: ' + esc(ti.raw).replace(/\[([^\]]+)\]/g, '<mark>$1</mark>');
      card.appendChild(p);
    }
    if (it.type === 'match' && ti.rows && ti.rows.length) card.appendChild(el('p', { class: 'gg-hint', text: 'Letters written: ' + ti.rows.map(r => `${r.row}→${r.letter}`).join(', ') + '. The letters on the paper may be in a different order: check each choice by its Column B text.' }));
    if (isAI(it)) {
      const max = paper.memo[it.id].max;
      const hm = el('input', { class: 'gg-in', type: 'number', min: '0', max: String(max), step: '0.5', style: 'width:80px', value: hand[it.id] ?? '', 'aria-label': `Your mark on paper for ${it.num}` });
      hm.addEventListener('change', () => { hand[it.id] = hm.value === '' ? null : Math.max(0, Math.min(max, Number(hm.value))); dirty = true; });
      card.appendChild(el('div', { class: 'gg-check' }, [el('span', { class: 'gg-hint', text: `Your mark on paper (optional, out of ${fmtNum(max)}):` }), hm]));
    }
    box.appendChild(card);
  });
  if (window.MMFigs) MMFigs.scan(box);
  summary();
  $('btnChecked').textContent = att.transcript_checked_at ? 'Checked ✓ (save changes)' : 'I have checked every answer';
  $('btnMark').hidden = !att.transcript_checked_at;
  $('btnMark').textContent = att.mark_status === 'done' ? 'Mark this script again' : 'Mark this script';
}
function summary() {
  const t = att.transcript || { items: {} };
  const n = items.length, changed = items.filter(it => !same(answers[it.id], (t.items[it.id] || {}).answer)).length;
  const unsure = items.filter(it => (t.items[it.id] || {}).unsure || (t.items[it.id] || {}).unreadable).length;
  const answered = items.filter(it => isAnswered(it, answers[it.id])).length;
  $('ckSum').textContent = `${answered} of ${n} questions answered · ${unsure} the AI was unsure of · ${changed} changed by you`;
}

async function save(checked) {
  showErr(null);
  const row = { answers };
  if (checked) { row.transcript_checked_at = new Date().toISOString(); row.transcript_checked_by = me(); }
  const { error } = await sb().from('exam_attempts').update(row).eq('id', att.id);
  if (error) { showErr(error); return false; }
  // hand marks → the blind "teacher" parity marks (made on paper before the AI marked)
  const ups = [], dels = [];
  items.filter(isAI).forEach(it => { if (hand[it.id] != null && hand[it.id] !== '') ups.push({ attempt_id: att.id, item_id: it.id, role: 'teacher', marker_id: me(), score: hand[it.id], note: 'paper', updated_at: new Date().toISOString() }); else dels.push(it.id); });
  if (ups.length) {
    const { error: e2 } = await sb().from('exam_parity').upsert(ups, { onConflict: 'attempt_id,item_id,role' });
    if (e2) { showErr(e2); return false; }
    if (!(sit.parity_sample || []).includes(att.id)) {
      const next = [...(sit.parity_sample || []), att.id];
      const { error: e3 } = await sb().from('exam_sittings').update({ parity_sample: next }).eq('id', sid);
      if (!e3) sit.parity_sample = next;
    }
  }
  if (dels.length) await sb().from('exam_parity').delete().eq('attempt_id', att.id).eq('role', 'teacher').in('item_id', dels);
  if (checked) att.transcript_checked_at = row.transcript_checked_at;
  att.answers = JSON.parse(JSON.stringify(answers));
  dirty = false;
  return true;
}
$('btnSave').addEventListener('click', async () => { if (await save(false)) $('ckState').textContent = 'Saved.'; });
$('btnChecked').addEventListener('click', async () => {
  const t = att.transcript || { items: {} };
  const open = items.filter(it => (t.items[it.id] || {}).unreadable && !isAnswered(it, answers[it.id])).length;
  if (open && !confirm(`${open} answer(s) the AI could not read are still empty. Confirm that the learner left them blank?`)) return;
  if (await save(true)) { $('ckState').textContent = 'Checked. You can mark it now.'; cur.checked = true; drawList(); drawCheck(); }
});
$('btnMark').addEventListener('click', async () => {
  if (dirty && !(await save(!!att.transcript_checked_at))) return;
  $('ckState').textContent = 'Marking…';
  const { error } = await sb().functions.invoke('exam-mark', { body: { attempt_id: att.id } });
  if (error) { let b = null; try { b = await error.context.json(); } catch (e) {} $('ckState').textContent = ''; return showErr(b && b.error === 'unchecked' ? 'Check the transcription first.' : friendly(error)); }
  $('ckState').textContent = 'Marked. See it on the Mark & review page.';
  att.mark_status = 'done'; cur.mark_status = 'done'; drawList(); drawCheck();
});
window.addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

(async function init() {
  await whenAuthReady();
  const A = window.MagicLabAuth;
  if (!A.isLoggedIn()) return;
  if (!sid) return $('msg').textContent = 'No sitting chosen.';
  if (!(await isStaff())) return $('msg').textContent = 'Paper scripts are for exam staff only.';
  try { await load(); } catch (e) { $('msg').textContent = friendly(e); return; }
  document.title = 'Paper scripts — ' + sit.title;
  $('pTitle').textContent = 'Paper scripts · ' + sit.title;
  $('lnkReview').href = 'exam-review.html?s=' + sid;
  $('msg').hidden = true; $('app').hidden = false;
})();
