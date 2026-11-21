/* Exam Sanctum — mark & review (exam-review.html?s=<sitting id>).
 *
 * 1. "Mark all" sends each handed-in script to the exam-mark edge function (4 at a time).
 * 2. By question: every learner's answer to one question, flagged ones first; tick memo points
 *    to change a mark (the teacher's mark always wins) or press Agree.
 * 3. Moderation sample: a fixed random 10% of scripts, and how often the teacher agreed with the AI.
 * 4. Results: totals, CSV, release to learners and the markbook (exam_release).
 */
import { sb, me, $, el, esc, whenAuthReady, friendly, fmtNum, fmtWhen, capsLevel, isStaff, pool, download, csvCell } from './exam-core.js';
import { memoText } from './exam-paper.js';
import { renderScenario, answerText } from './exam-render.js';

const sid = new URLSearchParams(location.search).get('s');
let sit, paper, items = [], byItem = {}, learners = [], attempts = {}, marks = {}, curQ = null, curL = null, busy = false;
const key = (a, i) => a + '|' + i;
const final = m => m ? Math.min(Number(m.max), Number(m.teacher_score ?? m.ai_score ?? m.auto_score ?? 0)) : 0;
const isAI = it => paper.memo[it.id].type === 'written';
const flagged = m => m && m.ai_score != null && !m.reviewed && (m.ai_confidence !== 'high' || m.ai_alt);
const wrote = () => learners.filter(l => l.attempt_id && attempts[l.attempt_id]);

document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => tab(b.dataset.tab)));
function tab(t) {
  document.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tab === t)));
  ['q', 'l', 's', 'r'].forEach(x => { $('tab' + x.toUpperCase()).hidden = x !== t; });
  ({ q: drawQ, l: drawL, s: drawS, r: drawR })[t]();
}

/* ── load ── */
async function load() {
  const s = await sb().from('exam_sittings').select('*').eq('id', sid).single();
  if (s.error) throw s.error;
  sit = s.data;
  const p = await sb().from('exam_papers').select('id, title, grade, total, learner, memo').eq('id', sit.paper_id).single();
  if (p.error) throw p.error;
  paper = p.data; items = paper.learner.items; byItem = Object.fromEntries(items.map(i => [i.id, i]));
  const mon = await sb().rpc('exam_monitor', { p_sitting: sid });
  if (mon.error) throw mon.error;
  learners = mon.data.learners;
  await loadAttempts();
}
async function loadAttempts(only) {
  let q = sb().from('exam_attempts').select('id, student_id, status, deadline, answers, submitted_at, submit_kind, mark_status, mark_error, ai_summary, input_tokens, output_tokens').eq('sitting_id', sid);
  if (only) q = q.in('id', only);
  const { data, error } = await q;
  if (error) throw error;
  (data || []).forEach(a => { attempts[a.id] = a; });
  const ids = only || Object.keys(attempts);
  for (let i = 0; i < ids.length; i += 60) {
    const { data: ms, error: e2 } = await sb().from('exam_marks').select('*').in('attempt_id', ids.slice(i, i + 60));
    if (e2) throw e2;
    (ms || []).forEach(m => { marks[key(m.attempt_id, m.item_id)] = m; });
  }
}

function stats() {
  const ws = wrote(), sub = ws.filter(l => attempts[l.attempt_id].status === 'submitted' || Date.now() > Date.parse(attempts[l.attempt_id].deadline) + 90e3);
  const done = ws.filter(l => attempts[l.attempt_id].mark_status === 'done').length;
  const errs = ws.filter(l => attempts[l.attempt_id].mark_status === 'error').length;
  const fl = Object.values(marks).filter(flagged).length;
  const tokIn = ws.reduce((s, l) => s + (attempts[l.attempt_id].input_tokens || 0), 0), tokOut = ws.reduce((s, l) => s + (attempts[l.attempt_id].output_tokens || 0), 0);
  $('rStats').innerHTML =
    `<div><b>${sub.length}/${learners.length}</b><span>handed in</span></div>` +
    `<div><b>${done}</b><span>marked${errs ? `, <span style="color:var(--crit)">${errs} failed</span>` : ''}</span></div>` +
    `<div><b>${fl}</b><span>answers to check (AI unsure or a possible extra answer)</span></div>` +
    `<div><b>${Math.round((tokIn + tokOut) / 1000)}k</b><span>AI tokens used (about $${((tokIn * 1.2 + tokOut * 20) / 1e6).toFixed(2)})</span></div>`;
  $('btnMark').textContent = done && done === sub.length ? 'All handed-in scripts are marked' : (done ? `Mark the ${sub.length - done} unmarked scripts` : 'Mark all handed-in scripts');
  $('btnMark').disabled = busy || done === sub.length;
}

/* ── marking through the edge function ── */
async function callMark(attemptId, itemsOnly) {
  const { data, error } = await sb().functions.invoke('exam-mark', { body: itemsOnly ? { attempt_id: attemptId, items: itemsOnly } : { attempt_id: attemptId } });
  if (!error) return { ok: true, data };
  let body = null;
  try { body = await error.context.json(); } catch (e) {}
  return { ok: false, code: body && body.error, detail: body && body.detail, message: friendly(error) };
}
const PAUSED = { no_key: 'AI marking is not switched on yet: add the ANTHROPIC_API_KEY secret in Supabase (Edge Functions → Secrets).',
  no_credit: 'AI marking is paused: the Anthropic account has no credit left.', bad_key: 'AI marking is paused: the Anthropic API key is not valid.' };

async function markMany(ids, itemsOnly, label) {
  busy = true; stats(); $('rErr').textContent = '';
  let n = 0, failed = 0, stop = null;
  await pool(ids, 4, async id => {
    if (stop) return;
    const r = await callMark(id, itemsOnly);
    n++;
    if (!r.ok) {
      failed++;
      if (r.code === 'paused') stop = PAUSED[r.detail] || 'AI marking is paused.';
      if (r.code === 'cap') stop = 'Today’s marking limit has been reached. Carry on tomorrow, or raise EXAM_MARK_DAILY_CAP.';
      if (r.code === 'forbidden') stop = 'Only exam staff can mark.';
    }
    $('markProg').textContent = `${label}: ${n} of ${ids.length}${failed ? `, ${failed} failed` : ''}…`;
    await loadAttempts([id]);
  });
  busy = false;
  $('markProg').textContent = stop ? '' : `${label}: done${failed ? ` (${failed} failed: press the button again to retry them)` : ''}.`;
  if (stop) $('rErr').textContent = stop;
  stats(); redraw();
}
$('btnMark').addEventListener('click', () => {
  const ids = wrote().map(l => l.attempt_id).filter(id => {
    const a = attempts[id];
    return a.mark_status !== 'done' && (a.status === 'submitted' || Date.now() > Date.parse(a.deadline) + 90e3);
  });
  if (!ids.length) return;
  markMany(ids, null, 'Marking');
});

/* ── teacher marks ── */
async function saveMark(attemptId, itemId, patch) {
  const m = marks[key(attemptId, itemId)];
  if (!m) return;
  const row = { ...patch, reviewed: true, reviewed_by: me(), updated_at: new Date().toISOString() };
  const { error } = await sb().from('exam_marks').update(row).eq('attempt_id', attemptId).eq('item_id', itemId);
  if (error) { $('rErr').textContent = friendly(error); return; }
  Object.assign(m, row);
  stats();
}

function answerCard(l, it, opts = {}) {
  const a = attempts[l.attempt_id], m = marks[key(l.attempt_id, it.id)], memo = paper.memo[it.id];
  const text = answerText(it, a.answers[it.id]);
  const card = el('div', { class: 'xm-ans', 'data-flag': flagged(m) ? '1' : '0' });
  const head = el('div', { class: 'xm-ans-head' }, [
    el('b', { text: opts.showQ ? it.num : l.name, style: 'color:var(--paper)' }),
    el('span', { class: 'xm-score', text: m ? `${fmtNum(final(m))}/${fmtNum(m.max)}` : '–' })
  ]);
  if (m && m.ai_score != null) {
    head.appendChild(el('span', { class: 'xm-pill ' + (m.ai_confidence === 'high' ? 'ok' : m.ai_confidence === 'medium' ? 'warn' : 'bad'), text: 'AI ' + m.ai_confidence }));
    if (m.ai_alt) head.appendChild(el('span', { class: 'xm-pill warn', text: 'possible answer not in memo' }));
  }
  if (m && m.teacher_score != null) head.appendChild(el('span', { class: 'xm-pill', text: 'your mark' }));
  else if (m && m.reviewed) head.appendChild(el('span', { class: 'xm-pill ok', text: 'checked' }));
  card.appendChild(head);
  card.appendChild(el('p', { class: 'xm-ans-text' + (text ? '' : ' empty'), text: text || 'No answer.' }));
  if (!m) { card.appendChild(el('p', { class: 'gg-hint', text: 'Not marked yet.' })); return card; }

  if (memo.type === 'written') {
    const ticks = new Set(m.teacher_met && m.teacher_met.length <= memo.points.length ? m.teacher_met : (m.ai_met || []));
    const aiSet = new Set(m.ai_met || []);
    const box = el('div', { class: 'xm-points' });
    memo.points.forEach((p, i) => {
      const cb = el('input', { type: 'checkbox' }); cb.checked = ticks.has(i);
      cb.addEventListener('change', () => {
        const met = [...box.querySelectorAll('input')].map((c, k) => c.checked ? k : -1).filter(k => k >= 0);
        const score = Math.min(memo.max, met.reduce((s, k) => s + (memo.weights[k] || 0), 0));
        saveMark(l.attempt_id, it.id, { teacher_met: met, teacher_score: score }).then(() => { head.querySelector('.xm-score').textContent = `${fmtNum(final(m))}/${fmtNum(m.max)}`; });
      });
      box.appendChild(el('label', { class: aiSet.has(i) ? 'ai' : '', title: aiSet.has(i) ? 'The AI awarded this point' : null }, [cb, el('span', { text: `(${memo.weights[i]}) ${p}` })]));
    });
    card.appendChild(box);
    if (m.ai_feedback) card.appendChild(el('div', { class: 'xm-fb', text: 'Feedback: ' + (m.teacher_note || m.ai_feedback) }));
  } else {
    const inp = el('input', { class: 'gg-in', type: 'number', min: '0', max: String(m.max), step: '0.5', style: 'width:90px', 'aria-label': 'Mark for ' + l.name, value: m.teacher_score ?? '' , placeholder: fmtNum(m.auto_score) });
    inp.addEventListener('change', () => {
      const v = inp.value === '' ? null : Math.max(0, Math.min(Number(m.max), Number(inp.value)));
      saveMark(l.attempt_id, it.id, { teacher_score: v }).then(() => { head.querySelector('.xm-score').textContent = `${fmtNum(final(m))}/${fmtNum(m.max)}`; });
    });
    card.appendChild(el('div', { class: 'gg-check' }, [el('span', { class: 'gg-hint', text: `Marked by rule: ${fmtNum(m.auto_score)}. Your mark (leave empty to keep it):` }), inp]));
  }
  const row = el('div', { class: 'gg-top', style: 'margin:6px 0 0' });
  if (!m.reviewed) row.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Agree', onclick: () => saveMark(l.attempt_id, it.id, {}).then(redraw) }));
  if (m.teacher_score != null) row.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Use the ' + (memo.type === 'written' ? 'AI' : 'rule') + '’s mark', onclick: () => saveMark(l.attempt_id, it.id, { teacher_met: null, teacher_score: null }).then(redraw) }));
  if (row.childNodes.length) card.appendChild(row);
  return card;
}

/* ── by question ── */
function drawQ() {
  const list = $('qList'); list.innerHTML = '';
  items.forEach(it => {
    const fl = wrote().filter(l => flagged(marks[key(l.attempt_id, it.id)])).length;
    const b = el('button', { class: 'gg-btn gg-btn--sm' + (fl ? ' has-flags' : ''), type: 'button', 'aria-pressed': String(curQ === it.id),
      text: it.num + (fl ? ` ·${fl}` : ''), title: (isAI(it) ? 'AI-marked' : 'Marked by rule') + (fl ? `, ${fl} to check` : ''), onclick: () => { curQ = it.id; drawQ(); } });
    if (curQ === it.id) b.style.cssText = 'background:var(--paper);color:var(--ink-900)';
    list.appendChild(b);
  });
  if (!curQ) curQ = (items.find(it => isAI(it)) || items[0]).id;
  const it = byItem[curQ], memo = paper.memo[it.id], v = $('qView'); v.innerHTML = '';
  if (it.scen) v.appendChild(renderScenario(paper.learner.scenarios[it.scen]));
  v.appendChild(el('h2', { class: 'gg-h', text: `${it.num} · ${fmtNum(memo.max)} mark${memo.max === 1 ? '' : 's'}` }));
  v.appendChild(el('p', { class: 'xm-text', text: it.q }));
  if (it.svg) v.appendChild(el('div', { class: 'xm-figure', html: it.svg }));
  const mt = memo.type === 'mcq' ? 'Answer: ' + it.options[memo.answer] : memoText(memo);
  v.appendChild(el('div', { class: 'xm-memo', text: mt }));
  if (memo.type === 'written') v.appendChild(el('div', { class: 'gg-top' }, [
    el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Edit memo and re-mark this question', onclick: () => editMemo(it) }),
    el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Agree with every unchecked mark below', onclick: async () => {
      const todo = wrote().filter(l => { const m = marks[key(l.attempt_id, it.id)]; return m && !m.reviewed && !flagged(m); });
      if (!todo.length || !confirm(`Mark ${todo.length} answer${todo.length === 1 ? '' : 's'} the AI was sure about as checked?`)) return;
      for (const l of todo) await saveMark(l.attempt_id, it.id, {});
      drawQ();
    } })
  ]));
  const ws = wrote().slice().sort((a, b) => {
    const ma = marks[key(a.attempt_id, it.id)], mb = marks[key(b.attempt_id, it.id)];
    const ra = flagged(ma) ? (ma.ai_confidence === 'low' ? 0 : ma.ai_alt ? 1 : 2) : ma && !ma.reviewed ? 3 : 4;
    const rb = flagged(mb) ? (mb.ai_confidence === 'low' ? 0 : mb.ai_alt ? 1 : 2) : mb && !mb.reviewed ? 3 : 4;
    return ra - rb || a.name.localeCompare(b.name);
  });
  const scores = ws.map(l => marks[key(l.attempt_id, it.id)]).filter(Boolean);
  if (scores.length) v.appendChild(el('p', { class: 'gg-hint', text: `Class average ${fmtNum(scores.reduce((s, m) => s + final(m), 0) / scores.length)}/${fmtNum(memo.max)} · ${scores.filter(m => m.reviewed).length} of ${scores.length} checked` }));
  ws.forEach(l => v.appendChild(answerCard(l, it)));
  if (window.MMFigs) MMFigs.scan(v);
}

function editMemo(it) {
  const memo = paper.memo[it.id];
  $('memoText').value = memo.points.map((p, i) => `(${memo.weights[i]}) ${p}`).join('\n');
  $('memoErr').textContent = '';
  $('dlgMemo').dataset.item = it.id;
  $('dlgMemo').showModal();
}
$('memoSave').addEventListener('click', async () => {
  const id = $('dlgMemo').dataset.item, memo = paper.memo[id];
  const lines = $('memoText').value.split('\n').map(s => s.trim()).filter(Boolean);
  const parsed = lines.map(s => s.match(/^\((\d+(?:\.\d+)?)\)\s*(.+)$/));
  if (!lines.length || parsed.some(x => !x)) return $('memoErr').textContent = 'Start every line with its marks in brackets, like (1).';
  const points = parsed.map(x => x[2]), weights = parsed.map(x => Number(x[1]));
  const next = JSON.parse(JSON.stringify(paper.memo));
  next[id] = { ...memo, points, weights };
  const { error } = await sb().from('exam_papers').update({ memo: next, updated_at: new Date().toISOString() }).eq('id', paper.id);
  if (error) return $('memoErr').textContent = friendly(error);
  paper.memo = next;
  $('dlgMemo').close();
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum < memo.max) alert(`Note: the memo points add up to ${sum}, the question is worth ${memo.max}. Learners can earn at most ${sum}.`);
  const ids = wrote().map(l => l.attempt_id).filter(a => attempts[a].mark_status === 'done');
  if (ids.length) await markMany(ids, [id], 'Re-marking ' + byItem[id].num);
  else drawQ();
});

/* ── by learner ── */
function drawL() {
  const sel = $('lSel');
  if (!sel.options.length) {
    wrote().slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(l => sel.appendChild(el('option', { value: l.attempt_id, text: l.name })));
    sel.addEventListener('change', () => { curL = sel.value; drawL(); });
  }
  if (curL) sel.value = curL; else curL = sel.value;
  const v = $('lView'); v.innerHTML = '';
  const l = wrote().find(x => x.attempt_id === curL);
  if (!l) { v.textContent = 'Nobody has written yet.'; return; }
  const a = attempts[l.attempt_id];
  const tot = items.reduce((s, it) => s + final(marks[key(l.attempt_id, it.id)]), 0);
  v.appendChild(el('h2', { class: 'gg-h', text: `${l.name}: ${fmtNum(tot)}/${fmtNum(paper.total)} (${Math.round(100 * tot / paper.total)}%)` }));
  v.appendChild(el('p', { class: 'gg-hint', text: `Handed in ${fmtWhen(a.submitted_at)}${a.submit_kind === 'time' ? ' (time up)' : ''} · marking: ${a.mark_status}${a.mark_error ? ' (' + a.mark_error + ')' : ''}` }));
  if (a.ai_summary) v.appendChild(el('div', { class: 'xm-memo', text: 'Summary for the learner: ' + a.ai_summary }));
  if (a.mark_status === 'error' || a.mark_status === 'none') v.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Mark this script now', onclick: () => markMany([a.id], null, 'Marking') }));
  items.forEach(it => v.appendChild(answerCard(l, it, { showQ: true })));
}

/* ── moderation sample ── */
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function drawS() {
  const v = $('sView'); v.innerHTML = '';
  const done = wrote().filter(l => attempts[l.attempt_id].mark_status === 'done');
  const n = Math.min(done.length, Math.max(3, Math.ceil(done.length * 0.1)));
  const sample = done.slice().sort((a, b) => hash(sid + a.attempt_id) - hash(sid + b.attempt_id)).slice(0, n);
  const reviewedAI = Object.values(marks).filter(m => m.reviewed && m.ai_score != null && attempts[m.attempt_id]);
  const agree = m => m.teacher_score == null || Number(m.teacher_score) === Number(m.ai_score);
  const pct = list => list.length ? Math.round(100 * list.filter(agree).length / list.length) + '%' : '–';
  v.appendChild(el('div', { class: 'xm-bp', html:
    `<div><b>${pct(reviewedAI)}</b><span>agreement with the AI, over ${reviewedAI.length} written answers you checked</span></div>` +
    `<div><b>${sample.filter(l => items.every(it => !marks[key(l.attempt_id, it.id)] || marks[key(l.attempt_id, it.id)].reviewed)).length}/${sample.length}</b><span>sample scripts fully checked</span></div>` }));
  v.appendChild(el('h3', { class: 'gg-h', text: 'Sample scripts' }));
  const ul = el('div', { class: 'xm-classes' });
  sample.forEach(l => ul.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: l.name, onclick: () => { curL = l.attempt_id; tab('l'); } })));
  v.appendChild(ul);
  if (!sample.length) v.appendChild(el('p', { class: 'gg-hint', text: 'Mark the scripts first.' }));
  const rows = items.filter(isAI).map(it => {
    const list = reviewedAI.filter(m => m.item_id === it.id);
    return `<tr><td>${esc(it.num)}</td><td>${list.length}</td><td>${pct(list)}</td></tr>`;
  }).join('');
  v.appendChild(el('h3', { class: 'gg-h', text: 'Agreement per question' }));
  v.appendChild(el('div', { class: 'xm-table-wrap', html: `<table class="xm-table"><thead><tr><th>Question</th><th>Checked</th><th>Agreed</th></tr></thead><tbody>${rows}</tbody></table>` }));
}

/* ── results & release ── */
function resultRows() {
  return learners.slice().sort((a, b) => a.name.localeCompare(b.name)).map(l => {
    const a = l.attempt_id && attempts[l.attempt_id];
    const per = items.map(it => a ? final(marks[key(l.attempt_id, it.id)]) : null);
    const tot = a ? per.reduce((s, x) => s + (x || 0), 0) : null;
    return { l, a, per, tot, pct: tot == null ? null : Math.round(1000 * tot / paper.total) / 10 };
  });
}
function drawR() {
  const rows = resultRows();
  $('resTable').querySelector('thead').innerHTML = '<tr><th>Learner</th><th>State</th><th>Total</th><th>%</th><th>Level</th></tr>';
  $('resTable').querySelector('tbody').innerHTML = rows.map(r => `<tr><td>${esc(r.l.name)}</td><td>${r.a ? esc(r.a.mark_status === 'done' ? 'marked' : r.a.mark_status) : 'absent'}</td>` +
    `<td>${r.tot == null ? '–' : fmtNum(r.tot) + '/' + fmtNum(paper.total)}</td><td>${r.pct == null ? '–' : r.pct}</td><td>${r.pct == null ? '–' : capsLevel(r.pct)}</td></tr>`).join('');
  const marked = rows.filter(r => r.a && r.a.mark_status === 'done');
  const avg = marked.length ? marked.reduce((s, r) => s + r.pct, 0) / marked.length : null;
  $('relState').textContent = (sit.released_at ? `Released ${fmtWhen(sit.released_at)}: learners can see their marks and feedback, and the marks are in the markbook.` : 'Not released: learners cannot see anything yet.') +
    (avg != null ? ` Class average ${fmtNum(avg)}%.` : '');
  $('btnRelease').textContent = sit.released_at ? 'Release again (after changes)' : 'Release marks to learners and the markbook';
  $('btnUnrelease').hidden = !sit.released_at;
  if (sit.term) $('relTerm').value = sit.term;
}
$('btnRelease').addEventListener('click', async () => {
  const notChecked = Object.values(marks).filter(flagged).length;
  if (!confirm((notChecked ? `${notChecked} answers the AI was unsure about are not checked yet. ` : '') + 'Release the marks? Learners will see each question’s mark, the total and the feedback.')) return;
  const { error } = await sb().rpc('exam_release', { p_sitting: sid, p_task_type: $('relType').value, p_term: $('relTerm').value ? Number($('relTerm').value) : null });
  if (error) return alert(friendly(error));
  const s = await sb().from('exam_sittings').select('*').eq('id', sid).single(); sit = s.data; drawR();
});
$('btnUnrelease').addEventListener('click', async () => {
  if (!confirm('Hide the marks from learners again? The markbook marks are hidden too.')) return;
  const { error } = await sb().rpc('exam_unrelease', { p_sitting: sid });
  if (error) return alert(friendly(error));
  const s = await sb().from('exam_sittings').select('*').eq('id', sid).single(); sit = s.data; drawR();
});
$('btnCsv').addEventListener('click', () => {
  const rows = resultRows();
  const head = ['Learner', ...items.map(it => it.num + ' (' + paper.memo[it.id].max + ')'), 'Total (' + paper.total + ')', '%', 'Level'];
  const lines = [head, ...rows.map(r => [r.l.name, ...r.per.map(x => x == null ? '' : x), r.tot ?? 'absent', r.pct ?? '', r.pct == null ? '' : capsLevel(r.pct)])];
  download((sit.class_name || 'class') + ' - ' + sit.title + '.csv', '﻿' + lines.map(r => r.map(csvCell).join(',')).join('\r\n'));
});

function redraw() { const t = document.querySelector('[data-tab][aria-pressed="true"]').dataset.tab; tab(t); }

(async function init() {
  await whenAuthReady();
  const A = window.MagicLabAuth;
  if (!A.isLoggedIn()) return;
  if (!sid) return $('msg').textContent = 'No sitting chosen.';
  if (!(await isStaff())) return $('msg').textContent = 'Marking is for exam staff only.';
  try { await load(); } catch (e) { $('msg').textContent = friendly(e); return; }
  document.title = 'Mark & review — ' + sit.title;
  $('rTitle').textContent = sit.title;
  $('rMeta').textContent = [sit.class_name, fmtNum(paper.total) + ' marks', items.filter(isAI).length + ' AI-marked questions'].filter(Boolean).join(' · ');
  $('lnkMonitor').href = 'exam-sit.html?monitor=' + sid;
  $('msg').hidden = true; $('app').hidden = false;
  stats(); tab('q');
})();
