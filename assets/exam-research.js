/* Exam Sanctum — research page (exam-research.html): wordbank, consent & research codes,
 * feedback groups (switching replications), and the school / research exports.
 * Staff only. All tables are protected by is_exam_staff() in supabase-exam-research.sql. */
import { sb, me, $, el, esc, whenAuthReady, friendly, fmtNum, fmtWhen, capsLevel, isStaff, download, csvCell } from './exam-core.js';

let terms = [], classes = [], sittings = [], groups = {};
const csv = (name, rows) => download(name, '﻿' + rows.map(r => r.map(csvCell).join(',')).join('\r\n'));
const list = s => String(s || '').split(';').map(x => x.trim()).filter(Boolean).slice(0, 20);
const showErr = e => { $('err').textContent = e ? friendly(e) : ''; };

document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => { location.hash = b.dataset.tab; }));
window.addEventListener('hashchange', tab);
function tab() {
  const t = ['wordbank', 'consent', 'groups', 'export'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'wordbank';
  document.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tab === t)));
  ['wordbank', 'consent', 'groups', 'export'].forEach(x => { $('tab-' + x).hidden = x !== t; });
  showErr(null);
  ({ wordbank: drawWb, consent: drawConsent, groups: drawGroups, export: drawExport })[t]();
}

/* ═════════ Wordbank ═════════ */
async function loadWb() {
  const { data, error } = await sb().from('exam_wordbank').select('*').order('en');
  if (error) throw error;
  terms = data || [];
}
function drawWb() {
  const q = $('wbFind').value.trim().toLowerCase();
  const shown = terms.filter(t => !q || [t.en, t.af, t.topic, ...(t.accept_en || []), ...(t.accept_af || [])].some(x => String(x || '').toLowerCase().includes(q)));
  $('wbCount').textContent = `${terms.length} terms, ${terms.filter(t => t.approved_at).length} approved${q ? ` · ${shown.length} match` : ''}.`;
  const tb = $('wbTable').querySelector('tbody'); tb.innerHTML = '';
  shown.forEach(t => tb.appendChild(el('tr', {}, [
    el('td', { text: t.en, title: t.def_en || null }), el('td', { text: t.af, title: t.def_af || null }),
    el('td', { text: t.topic || '' }), el('td', { text: t.grade || 'all' }),
    el('td', { text: [...(t.accept_en || []), ...(t.accept_af || [])].join('; ') }),
    el('td', {}, [t.approved_at ? el('span', { class: 'xm-pill ok', text: 'approved', title: fmtWhen(t.approved_at) }) : el('span', { class: 'xm-pill warn', text: 'not approved' })]),
    el('td', {}, [
      el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Edit', onclick: () => editTerm(t) }), ' ',
      el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Delete', 'aria-label': 'Delete ' + t.en, onclick: async () => {
        if (!confirm(`Delete “${t.en} = ${t.af}”?`)) return;
        const { error } = await sb().from('exam_wordbank').delete().eq('id', t.id);
        if (error) return showErr(error);
        terms = terms.filter(x => x.id !== t.id); drawWb();
      } })
    ])
  ])));
  if (!shown.length) tb.appendChild(el('tr', {}, [el('td', { colspan: '7', class: 'gg-hint', text: terms.length ? 'No terms match.' : 'No terms yet. Add one, or import a list from a spreadsheet.' })]));
}
$('wbFind').addEventListener('input', drawWb);
let editing = null;
function editTerm(t) {
  editing = t || null;
  $('termH').textContent = t ? 'Edit term' : 'Add a term';
  $('tEn').value = t ? t.en : ''; $('tAf').value = t ? t.af : '';
  $('tDefEn').value = t ? t.def_en || '' : ''; $('tDefAf').value = t ? t.def_af || '' : '';
  $('tTopic').value = t ? t.topic || '' : ''; $('tGrade').value = t ? t.grade || '' : '';
  $('tAccEn').value = t ? (t.accept_en || []).join('; ') : ''; $('tAccAf').value = t ? (t.accept_af || []).join('; ') : '';
  $('tSrc').value = t ? t.source || '' : ''; $('tOk').checked = t ? !!t.approved_at : false;
  $('tErr').textContent = '';
  $('dlgTerm').showModal();
}
$('wbAdd').addEventListener('click', () => editTerm(null));
$('tSave').addEventListener('click', async () => {
  const g = $('tGrade').value ? Number($('tGrade').value) : null;
  const row = {
    en: $('tEn').value.trim(), af: $('tAf').value.trim(), def_en: $('tDefEn').value.trim() || null, def_af: $('tDefAf').value.trim() || null,
    topic: $('tTopic').value.trim() || null, grade: g >= 1 && g <= 12 ? g : null,
    accept_en: list($('tAccEn').value), accept_af: list($('tAccAf').value), source: $('tSrc').value.trim() || null, updated_at: new Date().toISOString()
  };
  if (!row.en || !row.af) return $('tErr').textContent = 'Give the English and the Afrikaans term.';
  const wasOk = editing && editing.approved_at;
  if ($('tOk').checked && !wasOk) { row.approved_at = new Date().toISOString(); row.approved_by = me(); }
  if (!$('tOk').checked) { row.approved_at = null; row.approved_by = null; }
  const q = editing ? sb().from('exam_wordbank').update(row).eq('id', editing.id) : sb().from('exam_wordbank').insert(row);
  const { error } = await q;
  if (error) return $('tErr').textContent = /duplicate|unique/i.test(error.message) ? 'That English term is already in the wordbank for this grade.' : friendly(error);
  $('dlgTerm').close();
  await loadWb(); drawWb();
});
$('wbApproveAll').addEventListener('click', async () => {
  const q = $('wbFind').value.trim().toLowerCase();
  const todo = terms.filter(t => !t.approved_at && (!q || [t.en, t.af, t.topic].some(x => String(x || '').toLowerCase().includes(q))));
  if (!todo.length) return alert('Every term shown is already approved.');
  if (!confirm(`Approve ${todo.length} term${todo.length === 1 ? '' : 's'}? Check the translations first: approved terms are used in marking.`)) return;
  const { error } = await sb().from('exam_wordbank').update({ approved_at: new Date().toISOString(), approved_by: me() }).in('id', todo.map(t => t.id));
  if (error) return showErr(error);
  await loadWb(); drawWb();
});
$('wbCsv').addEventListener('click', () => csv('Exam wordbank.csv', [['en', 'af', 'def_en', 'def_af', 'topic', 'grade', 'accept_en', 'accept_af', 'source', 'approved'],
  ...terms.map(t => [t.en, t.af, t.def_en, t.def_af, t.topic, t.grade, (t.accept_en || []).join('; '), (t.accept_af || []).join('; '), t.source, t.approved_at ? t.approved_at.slice(0, 10) : ''])]));

/* spreadsheet import */
function parseSheet(text) {
  const lines = text.replace(/\r/g, '').split('\n').filter(l => l.trim());
  if (lines.length < 2) return { rows: [], error: 'Paste a header row and at least one term.' };
  const sep = lines[0].includes('\t') ? '\t' : ',';
  const split = line => {
    if (sep === '\t') return line.split('\t');
    const out = []; let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) { if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') inQ = false; else cur += c; }
      else if (c === '"') inQ = true; else if (c === ',') { out.push(cur); cur = ''; } else cur += c;
    }
    out.push(cur); return out;
  };
  const head = split(lines[0]).map(h => h.trim().toLowerCase().replace(/[^a-z_]/g, ''));
  if (!head.includes('en') || !head.includes('af')) return { rows: [], error: 'The header row needs at least the columns en and af.' };
  const rows = lines.slice(1).map(l => { const v = split(l); return Object.fromEntries(head.map((h, i) => [h, (v[i] || '').trim()])); })
    .filter(r => r.en && r.af).slice(0, 2000);
  return { rows };
}
$('wbPaste').addEventListener('click', () => { $('pText').value = ''; $('pInfo').textContent = ''; $('pErr').textContent = ''; $('dlgPaste').showModal(); });
$('pText').addEventListener('input', () => { const r = parseSheet($('pText').value); $('pErr').textContent = r.error || ''; $('pInfo').textContent = r.rows.length ? r.rows.length + ' terms found.' : ''; });
$('pGo').addEventListener('click', async () => {
  const r = parseSheet($('pText').value);
  if (r.error || !r.rows.length) return $('pErr').textContent = r.error || 'No terms found.';
  const byKey = new Map(terms.map(t => [t.en.toLowerCase() + '|' + (t.grade || 0), t]));
  let added = 0, updated = 0;
  for (const x of r.rows) {
    const g = Number(x.grade) >= 1 && Number(x.grade) <= 12 ? Number(x.grade) : null;
    const row = { en: x.en.slice(0, 120), af: x.af.slice(0, 120), def_en: x.def_en || null, def_af: x.def_af || null, topic: x.topic || null, grade: g,
      accept_en: list(x.accept_en), accept_af: list(x.accept_af), source: x.source || null, updated_at: new Date().toISOString(), approved_at: null, approved_by: null };
    const old = byKey.get(row.en.toLowerCase() + '|' + (g || 0));
    const { error } = old ? await sb().from('exam_wordbank').update(row).eq('id', old.id) : await sb().from('exam_wordbank').insert(row);
    if (error) { $('pErr').textContent = `${x.en}: ${friendly(error)}`; break; }
    old ? updated++ : added++;
  }
  $('pInfo').textContent = `${added} added, ${updated} updated.`;
  await loadWb(); drawWb();
  if (!$('pErr').textContent) $('dlgPaste').close();
});

/* ═════════ Consent & codes ═════════ */
let roster = [], consent = {};
async function loadClass(id) {
  const { data, error } = await sb().from('class_roster').select('id, display_name, admission_no, sort_key, active').eq('class_id', id).eq('active', true);
  if (error) throw error;
  roster = (data || []).sort((a, b) => (a.sort_key || a.display_name).localeCompare(b.sort_key || b.display_name));
  consent = {};
  for (let i = 0; i < roster.length; i += 100) {
    const { data: c, error: e2 } = await sb().from('exam_research_consent').select('*').in('roster_id', roster.slice(i, i + 100).map(r => r.id));
    if (e2) throw e2;
    (c || []).forEach(x => { consent[x.roster_id] = x; });
  }
}
const OPTS = [['unknown', 'Not yet'], ['given', 'Given'], ['refused', 'Refused'], ['withdrawn', 'Withdrawn']];
async function drawConsent() {
  const sel = $('cClass');
  if (!sel.options.length) {
    classes.forEach(c => sel.appendChild(el('option', { value: c.id, text: c.name })));
    sel.addEventListener('change', drawConsent);
  }
  if (!classes.length) { $('cSum').textContent = 'You have no classes yet.'; return; }
  try { await loadClass(sel.value); } catch (e) { return showErr(e); }
  const tb = $('cTable').querySelector('tbody'); tb.innerHTML = '';
  roster.forEach(r => {
    const c = consent[r.id];
    const mk = field => {
      const s = el('select', { class: 'gg-in', 'aria-label': (field === 'consent' ? 'Parent consent for ' : 'Learner assent for ') + r.display_name },
        OPTS.map(([v, t]) => el('option', { value: v, text: t })));
      s.value = c ? c[field] : 'unknown';
      s.addEventListener('change', async () => {
        const row = { roster_id: r.id, [field]: s.value, recorded_by: me(), updated_at: new Date().toISOString() };
        const { data, error } = await sb().from('exam_research_consent').upsert(row, { onConflict: 'roster_id' }).select().single();
        if (error) { showErr(error); s.value = c ? c[field] : 'unknown'; return; }
        consent[r.id] = data; drawConsentRow(r, tr); summary();
      });
      return s;
    };
    const tr = el('tr', {}, [el('td', { text: r.display_name }), el('td', { text: r.admission_no || '' }), el('td', {}, [mk('consent')]), el('td', {}, [mk('assent')]), el('td', { class: 'gg-mono' })]);
    drawConsentRow(r, tr);
    tb.appendChild(tr);
  });
  summary();
}
function drawConsentRow(r, tr) {
  const c = consent[r.id], ok = c && c.consent === 'given' && c.assent === 'given';
  tr.lastChild.textContent = c ? c.research_code + (ok ? '' : ' (not in dataset)') : '–';
}
function summary() {
  const n = roster.length, rows = roster.map(r => consent[r.id]);
  const inData = rows.filter(c => c && c.consent === 'given' && c.assent === 'given').length;
  const refused = rows.filter(c => c && (c.consent === 'refused' || c.assent === 'refused' || c.consent === 'withdrawn' || c.assent === 'withdrawn')).length;
  $('cSum').textContent = `${n} learners · ${inData} in the research dataset · ${refused} refused or withdrawn · ${n - rows.filter(Boolean).length} without a code yet`;
}
$('cCodes').addEventListener('click', async () => {
  const todo = roster.filter(r => !consent[r.id]).map(r => ({ roster_id: r.id, recorded_by: me() }));
  if (!todo.length) return alert('Every learner in this class already has a code.');
  const { error } = await sb().from('exam_research_consent').upsert(todo, { onConflict: 'roster_id', ignoreDuplicates: true });
  if (error) return showErr(error);
  drawConsent();
});
$('cKey').addEventListener('click', async () => {
  if (!confirm('The code key links research codes to names. Store it apart from the research dataset (for example on the school network, not with the analysis files). Download it?')) return;
  const rows = [['Class', 'Learner', 'Admission no.', 'Research code', 'Parent consent', 'Learner assent']];
  for (const c of classes) {
    await loadClass(c.id);
    roster.forEach(r => { const k = consent[r.id]; if (k) rows.push([c.name, r.display_name, r.admission_no || '', k.research_code, k.consent, k.assent]); });
  }
  csv('Research code key - KEEP SEPARATE.csv', rows);
  drawConsent();
});

/* ═════════ Feedback groups ═════════ */
async function loadGroups() {
  const { data, error } = await sb().from('exam_feedback_groups').select('class_id, grp');
  if (error) throw error;
  groups = Object.fromEntries((data || []).map(g => [g.class_id, g.grp]));
}
function drawGroups() {
  const tb = $('gTable').querySelector('tbody'); tb.innerHTML = '';
  const cond = (g, early) => !g ? 'Full feedback' : (g === 'A') === early ? 'Full feedback' : 'Marks only';
  classes.forEach(c => {
    const s = el('select', { class: 'gg-in', 'aria-label': 'Group for ' + c.name }, [el('option', { value: '', text: 'No group' }), el('option', { value: 'A', text: 'A' }), el('option', { value: 'B', text: 'B' })]);
    s.value = groups[c.id] || '';
    const tr = el('tr', {}, [el('td', { text: c.name }), el('td', {}, [s]), el('td', { text: cond(groups[c.id], true) }), el('td', { text: cond(groups[c.id], false) })]);
    s.addEventListener('change', async () => {
      const { error } = s.value
        ? await sb().from('exam_feedback_groups').upsert({ class_id: c.id, grp: s.value, updated_by: me(), updated_at: new Date().toISOString() }, { onConflict: 'class_id' })
        : await sb().from('exam_feedback_groups').delete().eq('class_id', c.id);
      if (error) { showErr(error); s.value = groups[c.id] || ''; return; }
      if (s.value) groups[c.id] = s.value; else delete groups[c.id];
      drawGroups();
    });
    tb.appendChild(tr);
  });
  const a = classes.filter(c => groups[c.id] === 'A').length, b = classes.filter(c => groups[c.id] === 'B').length;
  tb.appendChild(el('tr', {}, [el('td', { colspan: '4', class: 'gg-hint', text: `Group A: ${a} classes · Group B: ${b} classes` + (Math.abs(a - b) > 1 ? ' (try to balance the groups by grade and class type)' : '') })]));
}

/* ═════════ Exports ═════════ */
async function loadSittings() {
  const { data, error } = await sb().from('exam_sittings').select('id, paper_id, class_id, class_name, title, term, released_at, feedback_mode, created_at').order('created_at', { ascending: false });
  if (error) throw error;
  sittings = data || [];
}
function drawExport() {
  const tb = $('xTable').querySelector('tbody'); tb.innerHTML = '';
  sittings.forEach(s => tb.appendChild(el('tr', {}, [
    el('td', {}, [el('input', { type: 'checkbox', value: s.id, 'aria-label': 'Include ' + s.title + ' ' + (s.class_name || '') })]),
    el('td', { text: s.title }), el('td', { text: s.class_name || '' }), el('td', { text: s.term || '' }),
    el('td', { text: s.feedback_mode === 'marks' ? 'marks only' : 'full' }), el('td', { text: s.released_at ? fmtWhen(s.released_at) : 'not yet' })
  ])));
  if (!sittings.length) tb.appendChild(el('tr', {}, [el('td', { colspan: '6', class: 'gg-hint', text: 'No sittings yet.' })]));
}
const chosen = () => [...$('xTable').querySelectorAll('tbody input:checked')].map(i => i.value);
$('xAll').addEventListener('click', () => $('xTable').querySelectorAll('tbody input').forEach(i => { i.checked = true; }));
$('xNone').addEventListener('click', () => $('xTable').querySelectorAll('tbody input').forEach(i => { i.checked = false; }));

const finalScore = m => Math.min(Number(m.max), Number(m.teacher_score ?? m.ai_score ?? m.auto_score ?? 0));
$('xSchool').addEventListener('click', async () => {
  const ids = chosen();
  if (!ids.length) return alert('Choose at least one sitting.');
  $('xState').textContent = 'Preparing…';
  const rows = [['Admission no.', 'Learner', 'Class', 'Assessment', 'Term', 'Mark', 'Total', '%', 'Level', 'Status']];
  try {
    for (const id of ids) {
      const s = sittings.find(x => x.id === id);
      const [{ data: mon, error: e1 }, { data: p, error: e2 }, { data: ro }] = await Promise.all([
        sb().rpc('exam_monitor', { p_sitting: id }),
        sb().from('exam_papers').select('total').eq('id', s.paper_id).single(),
        sb().from('class_roster').select('id, admission_no').eq('class_id', s.class_id)]);
      if (e1 || e2) throw e1 || e2;
      const adm = Object.fromEntries((ro || []).map(r => [r.id, r.admission_no || '']));
      const att = mon.learners.filter(l => l.attempt_id).map(l => l.attempt_id);
      const tot = {};
      for (let i = 0; i < att.length; i += 60) {
        const { data: ms, error: e3 } = await sb().from('exam_marks').select('attempt_id, max, auto_score, ai_score, teacher_score').in('attempt_id', att.slice(i, i + 60));
        if (e3) throw e3;
        (ms || []).forEach(m => { tot[m.attempt_id] = (tot[m.attempt_id] || 0) + finalScore(m); });
      }
      mon.learners.forEach(l => {
        const mark = l.attempt_id ? Math.round((tot[l.attempt_id] || 0) * 10) / 10 : null;
        const pct = mark == null ? null : Math.round(1000 * mark / p.total) / 10;
        rows.push([adm[l.roster_id] || '', l.name, s.class_name || '', s.title, s.term || '', mark ?? '', p.total, pct ?? '', pct == null ? '' : capsLevel(pct),
          !l.attempt_id ? 'absent' : s.released_at ? 'released' : 'not released']);
      });
    }
  } catch (e) { $('xState').textContent = ''; return showErr(e); }
  csv('School marks.csv', rows);
  $('xState').textContent = `${rows.length - 1} rows. This file has names: keep it on school systems.`;
});
$('xResearch').addEventListener('click', async () => {
  const ids = chosen();
  if (!ids.length) return alert('Choose at least one sitting.');
  $('xState').textContent = 'Preparing…';
  const { data, error } = await sb().rpc('exam_research_export', { p_sittings: ids });
  if (error) { $('xState').textContent = ''; return showErr(error); }
  const cols = ['code', 'grade', 'group', 'term', 'condition', 'lang', 'paper', 'paper_title', 'sitting', 'item', 'num', 'type', 'topic', 'skill', 'bloom', 'max',
    'auto', 'ai', 'ai_conf', 'ai_alt', 'teacher', 'final', 'reviewed', 'override', 'parity_t', 'parity_s', 'submitted', 'released', 'views', 'corrected'];
  csv('Research dataset (coded).csv', [cols, ...(data || []).map(r => cols.map(c => r[c] ?? ''))]);
  const learners = new Set((data || []).map(r => r.code)).size;
  $('xState').textContent = `${(data || []).length} rows for ${learners} consenting learners. No names are in this file.`;
});

/* ═════════ start ═════════ */
(async function init() {
  await whenAuthReady();
  const A = window.MagicLabAuth;
  if (!A.isLoggedIn()) return;
  if (!(await isStaff())) return $('msg').textContent = 'This page is for exam staff only.';
  try {
    classes = (await A.getMyClasses()) || [];
    await Promise.all([loadWb(), loadGroups(), loadSittings()]);
  } catch (e) { $('msg').textContent = friendly(e); return; }
  $('msg').hidden = true; $('app').hidden = false;
  tab();
})();
