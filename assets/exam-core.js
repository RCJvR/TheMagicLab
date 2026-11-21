/* Exam Sanctum — small shared helpers for exam-papers.html, exam-sit.html and exam-review.html.
   Deliberately light (no editor bundle): the exam page must load fast on lab PCs. */
export const auth = () => window.MagicLabAuth;
export const sb = () => auth() && auth()._supabase && auth()._supabase();
export const me = () => { const s = auth() && auth().getSession && auth().getSession(); return s && s.user ? s.user.id : null; };
export const $ = id => document.getElementById(id);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const capsLevel = pct => pct >= 80 ? 7 : pct >= 70 ? 6 : pct >= 60 ? 5 : pct >= 50 ? 4 : pct >= 40 ? 3 : pct >= 30 ? 2 : 1;
export const fmtNum = n => (n == null || isNaN(n)) ? '–' : String(Math.round(n * 10) / 10).replace(/\.0$/, '');
export function fmtWhen(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
export function fmtClock(ts) { return ts ? new Date(ts).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }) : ''; }
export function el(tag, attrs, kids) {
  const n = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (v == null || v === false) return;
    if (k === 'text') n.textContent = v;
    else if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;            // only ever with esc()'d or constant markup, or the teacher's own paper figures
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  });
  (kids || []).forEach(c => c != null && n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return n;
}
export function whenAuthReady() {
  return new Promise(resolve => {
    if (auth()) return resolve();
    document.addEventListener('magiclab:auth:ready', () => resolve(), { once: true });
  });
}
export const friendly = err => String((err && err.message) || err || 'Something went wrong').replace(/^.*?:\s*(?=[A-Z])/, '');

/** Is the signed-in teacher on the exam staff list? */
export async function isStaff() {
  const { data, error } = await sb().rpc('is_exam_staff');
  if (error) { console.warn('[exam] staff check', error.message); return false; }
  return data === true;
}

/** Run async jobs with at most `n` at a time. */
export async function pool(list, n, job) {
  let i = 0;
  const run = async () => { while (i < list.length) { const k = i++; await job(list[k], k); } };
  await Promise.all(Array.from({ length: Math.min(n, list.length) }, run));
}

export function download(name, text, type = 'text/csv') {
  const a = el('a', { href: URL.createObjectURL(new Blob([text], { type })), download: name });
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
export const csvCell = v => { const s = String(v ?? ''); return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
