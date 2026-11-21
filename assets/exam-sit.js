/* Exam Sanctum — the exam page (learner) and the live monitor (teacher, ?monitor=<sitting id>).
 *
 * Learner: code → full screen → paper. Answers go to the server (exam_save) every 10 s and when
 * the learner moves to another question, and are kept in localStorage until the server has them.
 * The deadline is the server's; the browser only shows it. Leaving the page (tab, window,
 * fullscreen) is sent as an event; when the sitting locks on exit, the paper hides behind a lock
 * screen until the teacher unlocks it from the monitor.
 *
 * None of this can stop a learner opening another app in an ordinary browser: that needs Safe
 * Exam Browser or Take a Test (see the sitting's lockdown setting). It deters and records.
 */
import { sb, $, el, esc, whenAuthReady, friendly, fmtNum, fmtClock, isStaff } from './exam-core.js';
import { renderItem, renderScenario, seededOrder, isAnswered } from './exam-render.js';

const params = new URLSearchParams(location.search);
const show = id => ['vCover', 'vPaper', 'vDone', 'vMonitor', 'msg'].forEach(v => { $(v).hidden = v !== id; });
const msg = t => { $('msg').textContent = t; show('msg'); };

/* ═════════════════════════════ LEARNER ═════════════════════════════ */
let att = null;            // { id, deadline, offset, status, lockOnExit, lockdown, shuffle, title }
let paper = null, answers = {}, version = 0, savedVersion = 0;
let events = [], saving = false, armed = false, finished = false, lastFocusItem = null, lastQuickSave = 0;
let pollLock = null, tick = null, saver = null;
const LS = id => 'xm-sit:' + id;
const nowServer = () => Date.now() + (att ? att.offset : 0);
const fsOK = () => !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
const inFs = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
function goFs() {
  const d = document.documentElement;
  try { const p = (d.requestFullscreen || d.webkitRequestFullscreen).call(d); if (p && p.catch) p.catch(() => {}); } catch (e) {}
}
function leaveFs() { try { if (inFs()) (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} }
const isSEB = () => /SEB[\/ ]/i.test(navigator.userAgent);

function keepLocal(synced) {
  try { localStorage.setItem(LS(att.id), JSON.stringify({ answers, t: Date.now(), synced })); } catch (e) {}
}
function readLocal(id) { try { return JSON.parse(localStorage.getItem(LS(id)) || 'null'); } catch (e) { return null; } }

async function learnerInit() {
  $('coverWho').textContent = 'Signed in as ' + ((window.MagicLabAuth.getProfile && window.MagicLabAuth.getProfile() || {}).display_name || 'you') + '.';
  if (params.get('code')) $('code').value = params.get('code').toUpperCase();
  show('vCover');
  $('code').focus();
  $('code').addEventListener('keydown', e => { if (e.key === 'Enter') start(); });
  $('btnStart').addEventListener('click', start);
}

async function start() {
  const code = $('code').value.replace(/\s/g, '').toUpperCase();
  $('coverErr').textContent = '';
  if (!/^[A-Z2-9]{6}$/.test(code)) { $('coverErr').textContent = 'The code has 6 letters and numbers.'; return; }
  if (fsOK()) goFs();                       // must happen inside the click
  $('btnStart').disabled = true;
  const { data, error } = await sb().rpc('exam_join', { p_code: code, p_client: navigator.userAgent.slice(0, 280) });
  $('btnStart').disabled = false;
  if (error) { leaveFs(); $('coverErr').textContent = friendly(error); return; }
  att = { id: data.attempt_id, deadline: Date.parse(data.deadline), offset: Date.parse(data.server_now) - Date.now(), status: data.status,
          lockOnExit: data.lock_on_exit, lockdown: data.lockdown, shuffle: data.shuffle, title: data.title };
  if (data.status === 'submitted') { leaveFs(); return done('You have already handed in this paper.'); }
  if (att.lockdown === 'seb' && !isSEB()) {
    events.push({ kind: 'seb_fail', at: new Date().toISOString(), detail: 'not SEB' });
  }
  paper = data.paper;
  answers = data.answers || {};
  const local = readLocal(att.id);
  if (local && !local.synced && local.answers) { answers = local.answers; version = 1; }   // the server missed our last changes
  drawPaper();
  armed = true;
  startLoops();
  if (att.status === 'locked') lockNow(false);
  else if (version) saveNow();
}

function drawPaper() {
  document.body.classList.add('xm-sit');
  document.title = att.title + ' — Exam';
  $('pTitle').textContent = att.title;
  const box = $('pBody'); box.innerHTML = '';
  const nav = $('pNav'); nav.innerHTML = '';
  if (paper.intro) box.appendChild(el('p', { class: 'xm-text', text: paper.intro }));
  let sec = -1, scen = null;
  paper.items.forEach(it => {
    if (it.sec !== sec) {
      sec = it.sec; const s = paper.sections[sec];
      box.appendChild(el('h2', { class: 'xm-section-h', text: `${s.title} (${fmtNum(s.total)} marks)` }));
      if (s.intro) box.appendChild(el('p', { class: 'xm-section-intro', text: s.intro }));
    }
    if (it.scen && it.scen !== scen) box.appendChild(renderScenario(paper.scenarios[it.scen]));
    scen = it.scen || null;
    const mix = it.type === 'mcq' && att.shuffle && !it.keepOrder ? seededOrder(it.options.length, att.id + it.id) : null;
    box.appendChild(renderItem(it, { answer: answers[it.id], mix, onChange: v => setAnswer(it, v) }));
    nav.appendChild(el('a', { href: '#q-' + it.id, 'data-id': it.id, text: it.num, onclick: e => { e.preventDefault(); document.getElementById('q-' + it.id).scrollIntoView({ block: 'start' }); } }));
  });
  if (window.MMFigs) window.MMFigs.scan(box);
  progress();
  show('vPaper');
  box.addEventListener('focusin', e => {
    const q = e.target.closest('.xm-q'); if (!q) return;
    if (lastFocusItem && q.dataset.id !== lastFocusItem && version !== savedVersion && Date.now() - lastQuickSave > 3000) { lastQuickSave = Date.now(); saveNow(); }
    lastFocusItem = q.dataset.id;
  });
}

function setAnswer(it, v) {
  if (v == null) delete answers[it.id]; else answers[it.id] = v;
  version++;
  keepLocal(false);
  progress();
}
function progress() {
  const n = paper.items.filter(it => isAnswered(it, answers[it.id])).length;
  $('pProg').textContent = `${n} of ${paper.items.length} answered`;
  $('pNav').querySelectorAll('a').forEach(a => { const it = paper.items.find(x => x.id === a.dataset.id); a.classList.toggle('done', isAnswered(it, answers[it.id])); });
  const left = paper.items.length - n;
  $('pEndHint').textContent = left ? `${left} question${left === 1 ? '' : 's'} not answered yet.` : 'Every question has an answer.';
}

function saveState(text, bad) { $('pSave').textContent = text; $('pSave').classList.toggle('bad', !!bad); }

async function saveNow(submit = false) {
  if (!att || (finished && !submit)) return null;
  if (saving) { if (submit) { await new Promise(r => setTimeout(r, 400)); return saveNow(true); } return null; }
  saving = true;
  const v = version, sent = events.splice(0, events.length);
  const { data, error } = await sb().rpc('exam_save', { p_attempt: att.id, p_answers: answers, p_events: sent, p_submit: submit });
  saving = false;
  if (error) {
    events.unshift(...sent);
    const offline = !navigator.onLine || /fetch|network|Failed/i.test(error.message || '');
    $('vOffline').hidden = !offline;
    saveState(offline ? 'Not saved: no connection' : 'Not saved: ' + friendly(error), true);
    return null;
  }
  $('vOffline').hidden = true;
  att.deadline = Date.parse(data.deadline);
  att.offset = Date.parse(data.server_now) - Date.now();
  if (data.saved) { savedVersion = v; if (version === v) keepLocal(true); saveState('Saved ' + fmtClock(new Date())); }
  if (data.status === 'submitted') { finish(submit && !timingOut ? 'Your paper has been handed in.' : 'Time is up. Your paper has been handed in.'); }
  else if (data.status === 'locked') lockNow(false);
  else if (data.status === 'writing' && !$('vLock').hidden && att.status === 'locked') { /* unlocked meanwhile */ }
  att.status = data.status;
  return data;
}

function startLoops() {
  saver = setInterval(() => { if (version !== savedVersion || events.length) saveNow(); }, 10000);
  tick = setInterval(clock, 250); clock();
  window.addEventListener('beforeunload', e => { if (armed && !finished) { keepLocal(version === savedVersion); e.preventDefault(); e.returnValue = ''; } });
}
function clock() {
  const left = Math.max(0, att.deadline - nowServer());
  const s = Math.ceil(left / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
  $('pClock').textContent = (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(ss).padStart(2, '0');
  $('pClock').classList.toggle('low', left < 5 * 60e3 && left >= 60e3);
  $('pClock').classList.toggle('vlow', left < 60e3);
  if (left <= 0 && !finished) timeUp();
}
let timingOut = false;
async function timeUp() {
  if (timingOut) return; timingOut = true;
  saveState('Time is up: handing in…');
  for (let i = 0; i < 8 && !finished; i++) {           // the server accepts a last save for 90 s
    const r = await saveNow(true);
    if (r) return;
    await new Promise(res => setTimeout(res, 8000));
  }
  if (!finished) finish('Time is up. Your answers up to the last save have been handed in.');
}

async function submitClick() {
  const left = paper.items.filter(it => !isAnswered(it, answers[it.id])).length;
  if (!confirm(left ? `${left} question${left === 1 ? ' is' : 's are'} not answered. Hand in anyway? You cannot change it afterwards.` : 'Hand in your paper? You cannot change it afterwards.')) return;
  $('btnSubmit').disabled = true;
  const r = await saveNow(true);
  $('btnSubmit').disabled = false;
  if (!r) alert('Your paper could not be handed in: there is no connection. Your answers are safe. Try again in a moment, or tell your teacher.');
}

function finish(text) {
  finished = true; armed = false;
  clearInterval(saver); clearInterval(tick); clearInterval(pollLock);
  try { localStorage.removeItem(LS(att.id)); } catch (e) {}
  $('vLock').hidden = true; $('vOffline').hidden = true;
  leaveFs();
  done(text);
}
function done(text) { $('doneText').textContent = text + ' You may close this window when your teacher says so.'; document.body.classList.remove('xm-sit'); show('vDone'); }

/* ── leaving the page ── */
let lastEvent = {};
function ev(kind, detail) {
  if (!armed || finished) return;
  const t = Date.now();
  if (lastEvent[kind] && t - lastEvent[kind] < 2000) return;   // one per burst
  lastEvent[kind] = t;
  events.push({ kind, at: new Date().toISOString(), detail: detail || null });
  if (att.lockOnExit && (kind === 'hidden' || kind === 'blur' || kind === 'fs_exit')) lockNow(true);
}
function lockNow(save) {
  if (finished) return;
  if (!$('vLock').hidden && $('btnResume').hidden) { if (save) saveNow(); return; }   // already locked and waiting
  $('vLock').hidden = false; $('btnResume').hidden = true; $('lockWait').textContent = 'Waiting for your teacher…';
  att.status = 'locked';
  if (save) saveNow();
  clearInterval(pollLock);
  pollLock = setInterval(async () => {
    if (version !== savedVersion || events.length) await saveNow();
    const { data, error } = await sb().rpc('exam_status', { p_attempt: att.id });
    if (error || !data) return;
    att.deadline = Date.parse(data.deadline); att.offset = Date.parse(data.server_now) - Date.now();
    if (data.status === 'writing') { clearInterval(pollLock); att.status = 'writing'; $('lockWait').textContent = 'Your teacher has unlocked your paper.'; $('btnResume').hidden = false; $('btnResume').focus(); }
    if (data.status === 'submitted') finish('Your paper has been handed in.');
  }, 4000);
}
$('btnResume').addEventListener('click', () => { if (fsOK()) goFs(); $('vLock').hidden = true; lastEvent = {}; });

document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { ev('hidden'); if (att && version !== savedVersion) keepLocal(false); } });
let blurTimer = null;
window.addEventListener('blur', () => { clearTimeout(blurTimer); blurTimer = setTimeout(() => { if (!document.hasFocus()) ev('blur'); }, 1500); });
window.addEventListener('focus', () => clearTimeout(blurTimer));
['fullscreenchange', 'webkitfullscreenchange'].forEach(n => document.addEventListener(n, () => {
  if (armed && fsOK() && !inFs() && $('vLock').hidden) ev('fs_exit');
}));
window.addEventListener('offline', () => { ev('offline'); $('vOffline').hidden = !armed; });
window.addEventListener('online', () => { ev('online'); if (armed) saveNow(); });
['copy', 'cut', 'contextmenu', 'drop', 'dragstart'].forEach(n => document.addEventListener(n, e => { if (armed) e.preventDefault(); }));
document.addEventListener('paste', e => { if (armed) { e.preventDefault(); ev('paste'); } });
$('btnSubmit').addEventListener('click', submitClick);

/* ═════════════════════════════ MONITOR ═════════════════════════════ */
let sit = null, monTimer = null;
async function monitorInit(id) {
  if (!(await isStaff())) return msg('The monitor is for exam staff only.');
  const { data, error } = await sb().from('exam_sittings').select('*').eq('id', id).single();
  if (error) return msg(friendly(error));
  sit = data;
  document.title = 'Monitor — ' + sit.title;
  $('mTitle').textContent = sit.title;
  $('mMeta').textContent = [sit.class_name, sit.minutes + ' minutes', { monitored: 'Monitored browser', seb: 'Safe Exam Browser', takeatest: 'Take a Test' }[sit.lockdown], sit.lock_on_exit ? 'leaving locks the paper' : 'leaving is only recorded'].filter(Boolean).join(' · ');
  $('mCode').textContent = sit.join_code;
  $('mReview').href = 'exam-review.html?s=' + sit.id;
  const url = location.origin + '/exam-sit.html?code=' + sit.join_code;
  $('mLink').innerHTML = 'Learner link: <span class="gg-mono">' + esc(url) + '</span>' +
    (sit.lockdown === 'takeatest' ? '<br>Take a Test link (paste into the Take a Test app or a shortcut): <span class="gg-mono">ms-edu-secureassessment:' + esc(url) + '!enforceLockdown</span>' : '') +
    (sit.lockdown === 'seb' ? '<br>Learners open the paper from Safe Exam Browser with The Magic Lab config file.' : '');
  $('mOpen').addEventListener('click', toggleOpen);
  $('mSubmitAll').addEventListener('click', submitAll);
  show('vMonitor');
  refresh();
  monTimer = setInterval(() => { if (document.visibilityState === 'visible') refresh(); }, 5000);
}
async function toggleOpen() {
  const { error } = await sb().from('exam_sittings').update({ is_open: !sit.is_open }).eq('id', sit.id);
  if (error) return $('mErr').textContent = friendly(error);
  sit.is_open = !sit.is_open; refresh();
}
let last = null;
async function refresh() {
  const { data, error } = await sb().rpc('exam_monitor', { p_sitting: sit.id });
  if (error) { $('mErr').textContent = friendly(error); return; }
  $('mErr').textContent = '';
  last = data;
  sit.is_open = data.is_open;
  $('mOpen').textContent = data.is_open ? 'Close the paper (no new starts)' : 'Open the paper';
  const off = Date.parse(data.server_now) - Date.now(), now = Date.now() + off;
  const L = data.learners;
  const c = { none: 0, writing: 0, locked: 0, submitted: 0, flags: 0 };
  L.forEach(l => { c[l.status || 'none']++; c.flags += l.flags || 0; });
  $('mCounts').innerHTML = `<span><b>${c.none}</b> not started</span><span><b>${c.writing}</b> writing</span><span><b>${c.locked}</b> locked</span><span><b>${c.submitted}</b> handed in</span><span><b>${c.flags}</b> exits/pastes</span>`;
  const grid = $('mGrid'); grid.innerHTML = '';
  L.forEach(l => {
    const s = l.status || 'none';
    let st;
    if (s === 'none') st = l.has_account ? 'Not started' : 'No account yet';
    else if (s === 'submitted') st = 'Handed in ' + fmtClock(l.submitted_at) + (l.submit_kind === 'time' ? ' (time up)' : l.submit_kind === 'teacher' ? ' (by you)' : '');
    else {
      const left = Math.max(0, Date.parse(l.deadline) - now), mins = Math.ceil(left / 60000);
      const ago = l.last_saved_at ? Math.round((now - Date.parse(l.last_saved_at)) / 1000) : null;
      st = (s === 'locked' ? 'LOCKED · ' : '') + `${l.answered} answered · ${mins} min left` + (ago != null ? ` · saved ${ago < 90 ? ago + ' s' : Math.round(ago / 60) + ' min'} ago` : '');
    }
    const acts = [];
    if (s === 'locked') acts.push(btn('Unlock', () => act(l, 'unlock'), true));
    if (s === 'writing' || s === 'locked') { acts.push(btn('+ time', () => { const m = prompt('Add how many minutes for ' + l.name + '?', '5'); if (m) act(l, 'add_time', Number(m)); })); acts.push(btn('Hand in', () => { if (confirm('Hand in ' + l.name + '’s paper now?')) act(l, 'submit'); })); }
    if (s === 'submitted') acts.push(btn('Reopen', () => { const m = prompt('Reopen ' + l.name + '’s paper for how many minutes?', '10'); if (m) act(l, 'reopen', Number(m)); }));
    grid.appendChild(el('div', { class: 'xm-card', 'data-s': s }, [
      el('div', { class: 'nm', text: l.name + (l.extra ? ` (+${l.extra} min/h)` : '') }),
      el('div', { class: 'st', text: st }),
      l.flags ? el('div', { class: 'xm-flag', text: `⚑ ${l.flags} exit${l.flags === 1 ? '' : 's'}/paste${l.flags === 1 ? '' : 's'} · last: ${l.last_event || ''}` }) : null,
      acts.length ? el('div', { class: 'acts' }, acts) : null
    ]));
  });
}
const btn = (t, f, primary) => el('button', { class: 'gg-btn gg-btn--sm' + (primary ? ' gg-btn--primary' : ''), type: 'button', text: t, onclick: f });
async function act(l, action, minutes) {
  const { error } = await sb().rpc('exam_teacher_action', { p_attempt: l.attempt_id, p_action: action, p_minutes: minutes || null });
  if (error) $('mErr').textContent = friendly(error);
  refresh();
}
async function submitAll() {
  const open = (last && last.learners || []).filter(l => l.status === 'writing' || l.status === 'locked');
  if (!open.length) return alert('Nobody is still writing.');
  if (!confirm(`Hand in ${open.length} paper${open.length === 1 ? '' : 's'} now?`)) return;
  for (const l of open) await sb().rpc('exam_teacher_action', { p_attempt: l.attempt_id, p_action: 'submit' });
  refresh();
}

/* ═════════════════════════════ LEARNER RESULTS (?results) ═════════════════════════════ */
async function resultsInit() {
  const { data, error } = await sb().rpc('exam_my_results');
  if (error) return msg(friendly(error));
  const box = el('main', { class: 'gg-main gg-narrow' }, [el('h1', { text: 'My exam results' })]);
  if (!data.length) box.appendChild(el('p', { class: 'gg-hint', text: 'No marks have been released to you yet.' }));
  data.forEach(r => {
    const pct = Math.round(1000 * r.score / r.total) / 10;
    box.appendChild(el('h2', { class: 'gg-h', text: `${r.title}: ${fmtNum(r.score)}/${fmtNum(r.total)} (${pct}%)` }));
    if (r.summary) box.appendChild(el('p', { class: 'xm-memo', text: r.summary }));
    const t = el('table', { class: 'xm-table' }, [el('thead', { html: '<tr><th>Question</th><th>Mark</th><th>Feedback</th></tr>' })]);
    const tb = el('tbody');
    r.items.forEach(i => tb.appendChild(el('tr', {}, [
      el('td', { text: i.id.split('.').map((x, k) => k === 0 ? Number(x) + 1 : x).join('.') }),
      el('td', { text: `${fmtNum(i.score)}/${fmtNum(i.max)}` }),
      el('td', { text: i.feedback || '' })
    ])));
    t.appendChild(tb);
    box.appendChild(el('div', { class: 'xm-table-wrap' }, [t]));
  });
  document.body.appendChild(box);
  $('msg').hidden = true;
}

/* ═════════════════════════════ START ═════════════════════════════ */
(async function init() {
  await whenAuthReady();
  const A = window.MagicLabAuth;
  if (!A.isLoggedIn()) return;
  if (params.get('monitor')) return monitorInit(params.get('monitor'));
  if (params.has('results')) return resultsInit();
  learnerInit();
})();
