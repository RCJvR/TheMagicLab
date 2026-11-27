/* Exam Sanctum — mark & review (exam-review.html?s=<sitting id>).
 *
 * 1. "Mark all" sends each handed-in script to the exam-mark edge function (4 at a time).
 * 2. By question: every learner's answer to one question, flagged ones first; tick memo points
 *    to change a mark (the teacher's mark always wins) or press Agree.
 * 3. Parity: 10–15 scripts chosen across the mark range, marked blind by the teacher (and a
 *    second marker) without seeing the AI's marks; agreement statistics; an AI stability re-run.
 * 4. Results: totals, CSV, feedback condition, AI audit log, release (exam_release).
 */
import { sb, me, $, el, esc, whenAuthReady, friendly, fmtNum, fmtWhen, capsLevel, isStaff, pool, download, csvCell } from './exam-core.js';
import { memoText, numCandidates } from './exam-paper.js';
import { renderScenario, answerText } from './exam-render.js';

const sid = new URLSearchParams(location.search).get('s');
let sit, paper, items = [], byItem = {}, learners = [], attempts = {}, marks = {}, curQ = null, curL = null, busy = false;
let parity = {}, corrections = {}, views = {}, stab = {}, role = (() => { try { return localStorage.getItem('xm-parity-role') === 'second' ? 'second' : 'teacher'; } catch (e) { return 'teacher'; } })();
const pkey = (a, i, r) => a + '|' + i + '|' + r;
const REASONS = { memo_gap: 'Correct answer not in the memo', too_lenient: 'AI too lenient', too_strict: 'AI too strict', misread: 'AI misread the answer',
  language: 'Language / terminology', partial: 'Partly correct', other: 'Other' };
const inSample = id => (sit.parity_sample || []).includes(id);
/** Blind: a parity-sample script hides the AI's marks until this marker has finished it. */
const blind = id => inSample(id) && items.filter(isAI).some(it => !parity[pkey(id, it.id, role)]);
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
  let q = sb().from('exam_attempts').select('id, student_id, status, deadline, answers, submitted_at, submit_kind, mark_status, mark_error, ai_summary, input_tokens, output_tokens, source, transcript_checked_at').eq('sitting_id', sid);
  if (only) q = q.in('id', only);
  const { data, error } = await q;
  if (error) throw error;
  (data || []).forEach(a => { attempts[a.id] = a; });
  const ids = only || Object.keys(attempts);
  for (let i = 0; i < ids.length; i += 60) {
    const { data: ms, error: e2 } = await sb().from('exam_marks').select('*').in('attempt_id', ids.slice(i, i + 60));
    if (e2) throw e2;
    (ms || []).forEach(m => { marks[key(m.attempt_id, m.item_id)] = m; });
    const [pa, co, vw] = await Promise.all([
      sb().from('exam_parity').select('*').in('attempt_id', ids.slice(i, i + 60)),
      sb().from('exam_corrections').select('*').in('attempt_id', ids.slice(i, i + 60)),
      sb().from('exam_feedback_views').select('attempt_id, item_id, kind').in('attempt_id', ids.slice(i, i + 60))]);
    (pa.data || []).forEach(x => { parity[pkey(x.attempt_id, x.item_id, x.role)] = x; });
    (co.data || []).forEach(x => { corrections[key(x.attempt_id, x.item_id)] = x; });
    (vw.data || []).forEach(x => { views[x.attempt_id] = (views[x.attempt_id] || 0) + 1; });
  }
}
async function loadStability() {
  const { data } = await sb().from('exam_ai_log').select('attempt_id, result, created_at').eq('sitting_id', sid).eq('kind', 'stability').eq('ok', true).order('created_at');
  stab = {};
  (data || []).forEach(r => { stab[r.attempt_id] = r.result || {}; });   // the latest run wins
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
    return a.mark_status !== 'done' && (a.status === 'submitted' || Date.now() > Date.parse(a.deadline) + 90e3)
      && !(a.source === 'paper' && !a.transcript_checked_at);   // handwritten scripts wait for their transcription check
  });
  const waiting = wrote().filter(l => attempts[l.attempt_id].source === 'paper' && !attempts[l.attempt_id].transcript_checked_at).length;
  if (waiting) $('markProg').textContent = `${waiting} paper script${waiting === 1 ? '' : 's'} still need their transcription checked (Paper scripts page).`;
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
  if (blind(l.attempt_id) && memo.type === 'written') {
    card.appendChild(el('div', { class: 'xm-ans-head' }, [el('b', { text: opts.showQ ? it.num : l.name, style: 'color:var(--paper)' }), el('span', { class: 'xm-pill warn', text: 'parity sample' })]));
    card.appendChild(el('p', { class: 'gg-hint', text: 'This script is in the parity sample. Mark it blind in the Parity tab first; the AI’s mark shows here after that.' }));
    return card;
  }
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
        saveMark(l.attempt_id, it.id, { teacher_met: met, teacher_score: score }).then(() => { head.querySelector('.xm-score').textContent = `${fmtNum(final(m))}/${fmtNum(m.max)}`; reasonBox(); });
      });
      box.appendChild(el('label', { class: aiSet.has(i) ? 'ai' : '', title: aiSet.has(i) ? 'The AI awarded this point' : null }, [cb, el('span', { text: `(${memo.weights[i]}) ${p}` })]));
    });
    card.appendChild(box);
    card.appendChild(feedbackBox(l, it, m, memo));
  } else {
    const inp = el('input', { class: 'gg-in', type: 'number', min: '0', max: String(m.max), step: '0.5', style: 'width:90px', 'aria-label': 'Mark for ' + l.name, value: m.teacher_score ?? '' , placeholder: fmtNum(m.auto_score) });
    inp.addEventListener('change', () => {
      const v = inp.value === '' ? null : Math.max(0, Math.min(Number(m.max), Number(inp.value)));
      saveMark(l.attempt_id, it.id, { teacher_score: v }).then(() => { head.querySelector('.xm-score').textContent = `${fmtNum(final(m))}/${fmtNum(m.max)}`; reasonBox(); });
    });
    card.appendChild(el('div', { class: 'gg-check' }, [el('span', { class: 'gg-hint', text: `Marked by rule: ${fmtNum(m.auto_score)}. Your mark (leave empty to keep it):` }), inp]));
    // a number answer written as a sentence with several numbers gets no mark by rule: the teacher decides
    const nums = memo.type === 'num' ? numCandidates(a.answers[it.id]) : [];
    if (nums.length > 1 && m.teacher_score == null) {
      head.appendChild(el('span', { class: 'xm-pill warn', text: 'several numbers: you decide' }));
      card.appendChild(el('p', { class: 'gg-hint', text: `The answer has ${nums.length} different numbers (${nums.join(', ')}); the memo answer is ${fmtNum(memo.answer)}. Give the mark yourself if the learner clearly meant it.` }));
    }
  }
  // why the teacher changed the AI's or the rule's mark (for the audit trail)
  const reasonWrap = el('div', { class: 'gg-check', style: 'margin:6px 0 0' });
  card.appendChild(reasonWrap);
  function reasonBox() {
    reasonWrap.innerHTML = '';
    if (m.teacher_score == null || Number(m.teacher_score) === Number(m.ai_score ?? m.auto_score)) return;
    const sel = el('select', { class: 'gg-in', 'aria-label': 'Reason for changing the mark' }, [el('option', { value: '', text: 'Why did you change it?' }),
      ...Object.entries(REASONS).map(([k, v]) => el('option', { value: k, text: v }))]);
    sel.value = m.override_reason || '';
    sel.addEventListener('change', () => saveMark(l.attempt_id, it.id, { override_reason: sel.value || null }));
    reasonWrap.appendChild(el('span', { class: 'gg-hint', text: 'Reason:' })); reasonWrap.appendChild(sel);
  }
  reasonBox();
  const row = el('div', { class: 'gg-top', style: 'margin:6px 0 0' });
  if (!m.reviewed) row.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Agree', onclick: () => saveMark(l.attempt_id, it.id, {}).then(redraw) }));
  if (m.teacher_score != null) row.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Use the ' + (memo.type === 'written' ? 'AI' : 'rule') + '’s mark', onclick: () => saveMark(l.attempt_id, it.id, { teacher_met: null, teacher_score: null, override_reason: null }).then(redraw) }));
  // marking script by script: change the memo from the answer itself (re-marks this question for everyone)
  if (opts.showQ && memo.type === 'written') row.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Edit memo for ' + it.num, onclick: () => editMemo(it) }));
  const cor = corrections[key(l.attempt_id, it.id)];
  if (cor) card.appendChild(el('div', { class: 'xm-fb', text: 'Learner’s correction: ' + cor.body }));
  if (row.childNodes.length) card.appendChild(row);
  return card;
}

/* ── four-part feedback: what went well, what was missing, next step, practice link ── */
const FB = [['well', 'What went well'], ['missing', 'What was missing'], ['next', 'Next step']];
function feedbackBox(l, it, m, memo) {
  const fb = m.teacher_fb || m.ai_fb || (m.ai_feedback ? { well: '', missing: m.ai_feedback, next: '' } : null);
  const wrap = el('div', { class: 'xm-fb' });
  if (sit.feedback_mode === 'marks') wrap.appendChild(el('p', { class: 'gg-hint', style: 'margin:0 0 4px', text: 'Marks-only condition: learners will not see this feedback.' }));
  if (!fb) { wrap.appendChild(el('span', { class: 'gg-hint', text: 'No feedback yet.' })); return wrap; }
  const show = () => {
    wrap.querySelectorAll('.xm-fbp').forEach(n => n.remove());
    const f = m.teacher_fb || fb;
    FB.forEach(([k, label]) => { if (f[k]) wrap.insertBefore(el('p', { class: 'xm-fbp', style: 'margin:2px 0' }, [el('b', { text: label + ': ' }), f[k]]), edit); });
    if (memo.practice) wrap.insertBefore(el('p', { class: 'xm-fbp gg-hint', style: 'margin:2px 0', text: 'Practice link: ' + memo.practice }), edit);
    if (m.teacher_fb) wrap.insertBefore(el('p', { class: 'xm-fbp gg-hint', style: 'margin:2px 0', text: 'You edited this feedback.' }), edit);
  };
  const edit = el('details', {}, [el('summary', { class: 'gg-hint', text: 'Edit feedback' })]);
  const inputs = {};
  FB.forEach(([k, label]) => {
    inputs[k] = el('textarea', { class: 'gg-in', rows: '2', style: 'width:100%', 'aria-label': label });
    inputs[k].value = (m.teacher_fb || fb)[k] || '';
    edit.appendChild(el('label', { class: 'gg-hint', text: label })); edit.appendChild(inputs[k]);
  });
  edit.appendChild(el('div', { class: 'gg-top', style: 'margin:4px 0 0' }, [
    el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Save feedback', onclick: async () => {
      const t = Object.fromEntries(FB.map(([k]) => [k, inputs[k].value.trim().slice(0, 600)]));
      await saveMark(l.attempt_id, it.id, { teacher_fb: t, teacher_note: [t.well, t.missing, t.next].filter(Boolean).join(' ').slice(0, 600) || null });
      edit.open = false; show();
    } }),
    m.teacher_fb ? el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Use the AI’s feedback', onclick: async () => {
      await saveMark(l.attempt_id, it.id, { teacher_fb: null, teacher_note: null }); redraw();
    } }) : null
  ]));
  wrap.appendChild(edit);
  show();
  return wrap;
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
  $('memoH').textContent = 'Edit the memo for ' + it.num;
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
  else redraw();
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
  if (a.source === 'paper') v.appendChild(el('p', { class: 'gg-hint', html: `Handwritten script, typed from photos${a.transcript_checked_at ? ' and checked by you' : ' — <b>transcription not checked yet</b>'}. <a href="exam-scan.html?s=${esc(sid)}">Paper scripts</a>` }));
  v.appendChild(el('p', { class: 'gg-hint', text: `Handed in ${fmtWhen(a.submitted_at)}${a.submit_kind === 'time' ? ' (time up)' : ''} · marking: ${a.mark_status}${a.mark_error ? ' (' + a.mark_error + ')' : ''}` +
    (sit.released_at ? ` · feedback opened ${views[a.id] || 0} time${views[a.id] === 1 ? '' : 's'}` : '') }));
  if (a.ai_summary) v.appendChild(el('div', { class: 'xm-memo', text: 'Summary for the learner: ' + a.ai_summary }));
  if (a.mark_status === 'error' || a.mark_status === 'none') v.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Mark this script now', onclick: () => markMany([a.id], null, 'Marking') }));
  items.forEach(it => v.appendChild(answerCard(l, it, { showQ: true })));
}

/* ── parity: blind hand-marking of a sample, compared with the AI ── */
const aiTotal = id => items.filter(isAI).reduce((t, it) => { const m = marks[key(id, it.id)]; return t + (m ? Number(m.ai_score ?? 0) : 0); }, 0);
let parCur = null;

function chooseSample(n) {
  const done = wrote().filter(l => attempts[l.attempt_id].mark_status === 'done').map(l => l.attempt_id);
  const sorted = done.slice().sort((a, b) => aiTotal(a) - aiTotal(b) || a.localeCompare(b));
  if (sorted.length <= n) return sorted;
  // evenly across the mark range (stratified by the AI's written total), so weak, middle and strong scripts are all in
  return Array.from({ length: n }, (_, k) => sorted[Math.min(sorted.length - 1, Math.floor((k + 0.5) * sorted.length / n))]);
}

/* agreement statistics */
function agreeStats(pairs) {           // pairs: [{a, b, max}] (a = reference, b = compared)
  const n = pairs.length;
  if (!n) return null;
  const d = pairs.map(p => p.b - p.a);
  const exact = pairs.filter(p => Math.abs(p.b - p.a) < 1e-9).length / n;
  const adj = pairs.filter(p => Math.abs(p.b - p.a) <= 1 + 1e-9).length / n;
  const mean = d.reduce((s, x) => s + x, 0) / n;
  // quadratic weighted kappa, pooled with integer categories 0..largest max
  const K = Math.max(...pairs.map(p => Math.round(p.max))) + 1;
  const O = Array.from({ length: K }, () => Array(K).fill(0)), ra = Array(K).fill(0), rb = Array(K).fill(0);
  pairs.forEach(p => { const i = Math.min(K - 1, Math.round(p.a)), j = Math.min(K - 1, Math.round(p.b)); O[i][j]++; ra[i]++; rb[j]++; });
  let num = 0, den = 0;
  for (let i = 0; i < K; i++) for (let j = 0; j < K; j++) {
    const w = K > 1 ? ((i - j) ** 2) / ((K - 1) ** 2) : 0;
    num += w * O[i][j]; den += w * ra[i] * rb[j] / n;
  }
  const qwk = den > 0 ? 1 - num / den : (num === 0 ? 1 : null);
  return { n, exact, adj, mean, qwk };
}
function scriptStats(rows) {            // rows: [{a, b}] script totals → Pearson r and Bland–Altman limits
  const n = rows.length;
  if (n < 3) return null;
  const ma = rows.reduce((s, r) => s + r.a, 0) / n, mb = rows.reduce((s, r) => s + r.b, 0) / n;
  let sab = 0, saa = 0, sbb = 0;
  rows.forEach(r => { sab += (r.a - ma) * (r.b - mb); saa += (r.a - ma) ** 2; sbb += (r.b - mb) ** 2; });
  const d = rows.map(r => r.b - r.a), md = d.reduce((s, x) => s + x, 0) / n;
  const sd = Math.sqrt(d.reduce((s, x) => s + (x - md) ** 2, 0) / (n - 1));
  return { n, r: saa && sbb ? sab / Math.sqrt(saa * sbb) : null, md, lo: md - 1.96 * sd, hi: md + 1.96 * sd };
}
const pc = x => x == null ? '–' : Math.round(100 * x) + '%';
const f2 = x => x == null || isNaN(x) ? '–' : (Math.round(x * 100) / 100).toFixed(2);

function parityPairs(other) {          // teacher parity vs AI / second marker / stability
  const out = [];
  (sit.parity_sample || []).forEach(id => items.filter(isAI).forEach(it => {
    const t = parity[pkey(id, it.id, 'teacher')], m = marks[key(id, it.id)];
    if (!t || !m) return;
    let b = null;
    if (other === 'ai') b = m.ai_score;
    if (other === 'second') b = parity[pkey(id, it.id, 'second')] && parity[pkey(id, it.id, 'second')].score;
    if (other === 'stab') { if (!stab[id] || !stab[id][it.id]) return; out.push({ a: Number(m.ai_score), b: Number(stab[id][it.id].score), max: Number(m.max), it, id }); return; }
    if (b == null) return;
    out.push({ a: Number(t.score), b: Number(b), max: Number(m.max), it, id });
  }));
  return out;
}

function drawS() {
  const v = $('sView'); v.innerHTML = '';
  const sample = sit.parity_sample || [];
  const done = wrote().filter(l => attempts[l.attempt_id].mark_status === 'done');

  // 1. the sample
  const nIn = el('input', { class: 'gg-in', type: 'number', min: '3', max: '30', value: String(Math.min(15, Math.max(10, Math.ceil(done.length * 0.1)))), style: 'width:70px', 'aria-label': 'Scripts in the sample' });
  v.appendChild(el('div', { class: 'gg-top' }, [
    el('span', { class: 'gg-hint', text: sample.length ? `${sample.length} scripts in the parity sample.` : 'No parity sample yet.' }),
    nIn,
    el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: sample.length ? 'Choose a new sample' : 'Choose the sample', onclick: async () => {
      if (!done.length) return alert('Mark the scripts first.');
      if (sample.length && Object.keys(parity).length && !confirm('Hand marks already saved stay in the database, but a new sample replaces the list of scripts. Continue?')) return;
      const ids = chooseSample(Math.max(3, Math.min(30, Number(nIn.value) || 12)));
      const { error } = await sb().from('exam_sittings').update({ parity_sample: ids }).eq('id', sid);
      if (error) return alert(friendly(error));
      sit.parity_sample = ids; parCur = null; drawS();
    } })
  ]));
  if (!sample.length) {
    v.appendChild(el('p', { class: 'gg-hint', style: 'max-width:70ch', text: 'The sample is spread across the range of the AI’s marks, so weak, middle and strong scripts are all included. You then mark the written answers of those scripts without seeing the AI’s marks or the learners’ names; a second marker can do the same. Until you have finished a sample script, its AI marks are hidden in the other tabs too.' }));
    return;
  }

  // 2. blind marking
  v.appendChild(el('h3', { class: 'gg-h', text: 'Blind marking' }));
  const roleSel = $('parRole');
  const scripts = sample.map((id, k) => ({ id, label: 'Script ' + (k + 1), done: items.filter(isAI).every(it => parity[pkey(id, it.id, role)]) }));
  const bar = el('div', { class: 'xm-classes' });
  scripts.forEach(sc => bar.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', 'aria-pressed': String(parCur === sc.id),
    text: sc.label + (sc.done ? ' ✓' : ''), onclick: () => { parCur = sc.id; drawS(); } })));
  v.appendChild(el('p', { class: 'gg-hint', text: `Marking as the ${role === 'second' ? 'second marker' : 'teacher (first marker)'} · ${scripts.filter(s => s.done).length} of ${scripts.length} scripts done` }));
  v.appendChild(bar);
  if (!parCur) parCur = (scripts.find(s => !s.done) || scripts[0]).id;
  const sc = scripts.find(s => s.id === parCur), a = attempts[parCur];
  if (a) {
    const box = el('div', { class: 'xm-parity' });
    box.appendChild(el('h4', { class: 'gg-h', text: sc.label }));
    items.filter(isAI).forEach(it => {
      const memo = paper.memo[it.id], mine = parity[pkey(parCur, it.id, role)];
      const card = el('div', { class: 'xm-ans' });
      card.appendChild(el('div', { class: 'xm-ans-head' }, [el('b', { text: it.num, style: 'color:var(--paper)' }),
        el('span', { class: 'xm-score', text: mine ? `${fmtNum(mine.score)}/${fmtNum(memo.max)}` : `–/${fmtNum(memo.max)}` }),
        memo.bloom ? el('span', { class: 'xm-pill', text: memo.bloom }) : null]));
      card.appendChild(el('p', { class: 'gg-hint', style: 'margin:2px 0', text: it.q }));
      const text = answerText(it, a.answers[it.id]);
      card.appendChild(el('p', { class: 'xm-ans-text' + (text ? '' : ' empty'), text: text || 'No answer.' }));
      const ticks = new Set(mine && mine.met ? mine.met : []);
      const pts = el('div', { class: 'xm-points' });
      memo.points.forEach((p, i) => {
        const cb = el('input', { type: 'checkbox' }); cb.checked = ticks.has(i);
        pts.appendChild(el('label', {}, [cb, el('span', { text: `(${memo.weights[i]}) ${p}` })]));
      });
      card.appendChild(pts);
      card.appendChild(el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: mine ? 'Save again' : 'Save my mark', onclick: async () => {
        const met = [...pts.querySelectorAll('input')].map((c, k) => c.checked ? k : -1).filter(k => k >= 0);
        const score = Math.min(memo.max, met.reduce((t, k) => t + (memo.weights[k] || 0), 0));
        const row = { attempt_id: parCur, item_id: it.id, role, marker_id: me(), score, met, updated_at: new Date().toISOString() };
        const { error } = await sb().from('exam_parity').upsert(row, { onConflict: 'attempt_id,item_id,role' });
        if (error) return alert(friendly(error));
        parity[pkey(parCur, it.id, role)] = row; drawS();
      } }));
      box.appendChild(card);
    });
    v.appendChild(box);
  }

  // 3. agreement
  v.appendChild(el('h3', { class: 'gg-h', text: 'Agreement' }));
  const rowsFor = (label, pairs) => {
    const st = agreeStats(pairs);
    return `<tr><td>${esc(label)}</td><td>${st ? st.n : 0}</td><td>${pc(st && st.exact)}</td><td>${pc(st && st.adj)}</td><td>${f2(st && st.mean)}</td><td>${f2(st && st.qwk)}</td></tr>`;
  };
  const ai = parityPairs('ai'), sec = parityPairs('second'), st = parityPairs('stab');
  let html = rowsFor('AI vs teacher (all written answers)', ai);
  [...new Set(ai.map(p => paper.memo[p.it.id].bloom || 'untagged'))].forEach(b => { html += rowsFor('  · ' + b, ai.filter(p => (paper.memo[p.it.id].bloom || 'untagged') === b)); });
  html += rowsFor('Second marker vs teacher', sec) + rowsFor('AI re-run vs first AI run (stability)', st);
  v.appendChild(el('div', { class: 'xm-table-wrap', html: `<table class="xm-table"><thead><tr><th>Comparison</th><th>Answers</th><th>Exact</th><th>Within 1 mark</th><th>Mean difference</th><th>Weighted κ</th></tr></thead><tbody>${html}</tbody></table>` }));
  const tot = sample.filter(id => items.filter(isAI).every(it => parity[pkey(id, it.id, 'teacher')])).map(id => ({
    a: items.filter(isAI).reduce((t, it) => t + Number(parity[pkey(id, it.id, 'teacher')].score), 0), b: aiTotal(id) }));
  const ss = scriptStats(tot);
  v.appendChild(el('p', { class: 'gg-hint', style: 'max-width:75ch', text: ss
    ? `Script totals (written answers, ${ss.n} scripts): correlation r = ${f2(ss.r)}; the AI is on average ${f2(ss.md)} marks ${ss.md >= 0 ? 'above' : 'below'} you, and 95% of differences fall between ${f2(ss.lo)} and ${f2(ss.hi)} marks (Bland–Altman).`
    : 'Script-level statistics appear once at least 3 sample scripts are fully hand-marked.' }));
  v.appendChild(el('p', { class: 'gg-hint', style: 'max-width:75ch', text: 'Mean difference is the compared mark minus the reference (positive: the AI or second marker gave more). With 10–15 scripts per paper these figures are rough; the research export pools them across papers.' }));

  // 4. stability + export
  v.appendChild(el('div', { class: 'gg-top' }, [
    el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: Object.keys(stab).length ? 'Run the AI stability check again' : 'Run the AI stability check on the sample', onclick: async () => {
      if (!confirm(`Ask the AI to mark the ${sample.length} sample scripts again? Nothing changes in the marks: the new run is only logged and compared. It costs about the same as marking them the first time.`)) return;
      busy = true; let n = 0, failed = 0;
      await pool(sample, 3, async id => {
        const { error } = await sb().functions.invoke('exam-mark', { body: { attempt_id: id, mode: 'stability' } });
        n++; if (error) failed++;
        $('markProg').textContent = `Stability check: ${n} of ${sample.length}${failed ? `, ${failed} failed` : ''}…`;
      });
      busy = false; await loadStability();
      $('markProg').textContent = `Stability check done${failed ? ` (${failed} failed)` : ''}.`;
      drawS();
    } }),
    el('button', { class: 'gg-btn gg-btn--sm', type: 'button', text: 'Download parity data (CSV)', onclick: () => {
      const head = ['Script', 'Question', 'Bloom', 'Skill', 'Max', 'AI', 'AI confidence', 'Teacher (blind)', 'Second marker (blind)', 'AI re-run', 'Final mark'];
      const lines = [head];
      sample.forEach((id, k) => items.filter(isAI).forEach(it => {
        const m = marks[key(id, it.id)] || {}, memo = paper.memo[it.id];
        const t = parity[pkey(id, it.id, 'teacher')], s2 = parity[pkey(id, it.id, 'second')];
        lines.push(['S' + (k + 1), it.num, memo.bloom || '', memo.skill || '', memo.max, m.ai_score ?? '', m.ai_confidence || '', t ? t.score : '', s2 ? s2.score : '',
          stab[id] && stab[id][it.id] ? stab[id][it.id].score : '', m.max != null ? final(m) : '']);
      }));
      download((sit.class_name || 'class') + ' - ' + sit.title + ' - parity.csv', '﻿' + lines.map(r => r.map(csvCell).join(',')).join('\r\n'));
    } })
  ]));
  roleSel.onchange = () => { role = roleSel.value; try { localStorage.setItem('xm-parity-role', role); } catch (e) {} parCur = null; drawS(); };
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
  $('fbMode').value = sit.feedback_mode || 'full';
  const viewed = rows.filter(r => r.a && views[r.a.id]).length, corrected = new Set(Object.values(corrections).map(c => c.attempt_id)).size;
  $('fbState').textContent = sit.released_at ? `${viewed} of ${marked.length} learners have opened their feedback; ${corrected} wrote at least one correction.` : '';
}
$('fbMode').addEventListener('change', async () => {
  const v = $('fbMode').value;
  const { error } = await sb().from('exam_sittings').update({ feedback_mode: v }).eq('id', sid);
  if (error) { alert(friendly(error)); $('fbMode').value = sit.feedback_mode; return; }
  sit.feedback_mode = v;
});
$('btnLog').addEventListener('click', async () => {
  const { data, error } = await sb().from('exam_ai_log').select('*').eq('sitting_id', sid).order('created_at');
  if (error) return alert(friendly(error));
  const names = Object.fromEntries(learners.filter(l => l.attempt_id).map(l => [l.attempt_id, l.name]));
  const cols = ['created_at', 'kind', 'ok', 'error', 'model', 'prompt_version', 'memo_hash', 'wordbank_hash', 'wordbank_terms', 'items', 'input_tokens', 'cache_write', 'cache_read', 'output_tokens', 'cost_usd', 'ms'];
  const lines = [['Learner', ...cols], ...(data || []).map(r => [names[r.attempt_id] || '', ...cols.map(c => Array.isArray(r[c]) ? r[c].join(' ') : r[c])])];
  const cost = (data || []).reduce((t, r) => t + Number(r.cost_usd || 0), 0);
  download((sit.class_name || 'class') + ' - ' + sit.title + ' - AI log.csv', '\ufeff' + lines.map(r => r.map(csvCell).join(',')).join('\r\n'));
  $('fbState').textContent = `${(data || []).length} AI calls logged, about $${cost.toFixed(2)} in total.`;
});
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
  $('parRole').value = role;
  document.title = 'Mark & review — ' + sit.title;
  $('rTitle').textContent = sit.title;
  $('rMeta').textContent = [sit.class_name, fmtNum(paper.total) + ' marks', items.filter(isAI).length + ' AI-marked questions'].filter(Boolean).join(' · ');
  $('lnkMonitor').href = 'exam-sit.html?monitor=' + sid;
  $('msg').hidden = true; $('app').hidden = false;
  await loadStability();
  stats(); tab('q');
})();
