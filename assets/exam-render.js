/* Exam Sanctum — renders the learner copy of a paper (see assets/exam-paper.js).
 *
 * renderItem(item, { answer, onChange, readOnly, mix }) → element
 * renderScenario(scen) → element
 *
 * Answers have the shapes the server marks (exam-paper.js markObjective):
 *  mcq: original option index · tf: true/false · match: { leftIndex: shownRightIndex }
 *  order: [shown step indices in the learner's order] · fill/blank/label: [text…]
 *  word/num/written: text
 * Question text is escaped; svg/figures come from the teacher's own paper and are trusted.
 */
import { esc } from './exam-core.js';

const LETTER = i => String.fromCharCode(65 + i);

/** A fixed shuffle for one learner (seed = attempt id + item id), so a refresh shows the same order. */
export function seededOrder(n, seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const rand = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const marksText = (n, lang) => lang === 'af' ? (n === 1 ? '(1 punt)' : `(${n} punte)`) : (n === 1 ? '(1 mark)' : `(${n} marks)`);
const textBlock = s => s ? `<p class="xm-text">${esc(s)}</p>` : '';
const figure = svg => svg ? `<div class="xm-figure${/<table/.test(svg) ? ' wide' : ''}">${svg}</div>` : '';
const codeBlock = c => c ? `<pre class="xm-code">${esc(c)}</pre>` : '';

export function renderScenario(s) {
  const d = document.createElement('div');
  d.className = 'xm-scen';
  d.innerHTML = `<div class="xm-scen-label">${esc((s.label ? s.label + ' ' : '') + s.num)}</div>${textBlock(s.scenario)}${figure(s.svg)}${codeBlock(s.code)}`;
  return d;
}

function input(cls, label, value, ro, on) {
  const i = document.createElement('input');
  i.type = 'text'; i.className = cls; i.value = value ?? ''; i.setAttribute('aria-label', label);
  i.autocomplete = 'off'; i.spellcheck = false; i.setAttribute('autocapitalize', 'off'); i.setAttribute('autocorrect', 'off');
  if (ro) i.readOnly = true; else i.addEventListener('input', () => on(i.value));
  return i;
}

export function renderItem(it, opts = {}) {
  const { readOnly = false, mix = null } = opts;
  let a = opts.answer;
  const set = v => { a = v; opts.onChange && opts.onChange(v); };
  const wrap = document.createElement('div');
  wrap.className = 'xm-q'; wrap.id = 'q-' + it.id; wrap.dataset.id = it.id;
  wrap.innerHTML = `<div class="xm-qhead"><span class="xm-num">${esc(it.num)}</span><div class="xm-qtext">${esc(it.q)}</div><span class="xm-marks">${marksText(it.marks, opts.lang)}</span></div>` +
    `<div class="xm-body">${figure(it.svg)}${codeBlock(it.code)}</div>`;
  const body = wrap.querySelector('.xm-body');
  const name = 'q' + it.id.replace(/\./g, '_');

  if (it.type === 'mcq' || it.type === 'tf') {
    const g = document.createElement('div'); g.className = 'xm-opts' + (it.type === 'tf' ? ' xm-tf' : ''); g.setAttribute('role', 'radiogroup');
    const choices = it.type === 'tf' ? (opts.lang === 'af' ? [['Waar', true], ['Onwaar', false]] : [['True', true], ['False', false]])
      : (mix || it.options.map((_, i) => i)).map(oi => [it.options[oi], oi]);
    choices.forEach(([label, val], k) => {
      const lab = document.createElement('label'); lab.className = 'xm-opt';
      lab.innerHTML = `<input type="radio" name="${name}"${a === val ? ' checked' : ''}${readOnly ? ' disabled' : ''}>` +
        (it.type === 'mcq' ? `<span class="xm-letter">${LETTER(k)}</span>` : '') + `<span>${esc(label)}</span>`;
      if (!readOnly) lab.querySelector('input').addEventListener('change', () => set(val));
      g.appendChild(lab);
    });
    body.appendChild(g);
  } else if (it.type === 'match') {
    const box = document.createElement('div'); box.className = 'xm-match';
    const cur = a || {};
    const AF = opts.lang === 'af';
    box.innerHTML = `<div class="xm-col"><h4>${AF ? 'Kolom A' : 'Column A'}</h4>${it.left.map((l, i) =>
      `<div class="xm-arow"><span>${i + 1}. ${esc(l)}</span><select data-i="${i}" aria-label="Match for ${esc(l)}"${readOnly ? ' disabled' : ''}><option value="">–</option>${
        it.right.map((_, k) => `<option value="${k}"${cur[i] === k ? ' selected' : ''}>${LETTER(k)}</option>`).join('')}</select></div>`).join('')}</div>` +
      `<div class="xm-col"><h4>${AF ? 'Kolom B' : 'Column B'}</h4>${it.right.map((r, k) => `<div class="xm-brow"><b>${LETTER(k)}</b><span>${esc(r)}</span></div>`).join('')}</div>`;
    if (!readOnly) box.querySelectorAll('select').forEach(s => s.addEventListener('change', () => {
      const next = Object.assign({}, a || {}), i = s.dataset.i;
      if (s.value === '') delete next[i]; else next[i] = +s.value;
      set(Object.keys(next).length ? next : null);
    }));
    body.appendChild(box);
  } else if (it.type === 'order') {
    const ol = document.createElement('ol'); ol.className = 'xm-order';
    const draw = () => {
      const cur = a || it.steps.map((_, i) => i);
      ol.innerHTML = cur.map((si, pos) => `<li><span class="xm-pos">${pos + 1}</span><span class="xm-step">${esc(it.steps[si])}</span>` +
        (readOnly ? '' : `<span class="xm-moves"><button type="button" data-p="${pos}" data-d="-1" aria-label="Move up"${pos === 0 ? ' disabled' : ''}>▲</button>` +
          `<button type="button" data-p="${pos}" data-d="1" aria-label="Move down"${pos === cur.length - 1 ? ' disabled' : ''}>▼</button></span>`) + '</li>').join('');
      ol.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
        const c = (a || it.steps.map((_, i) => i)).slice(), p = +b.dataset.p, q = p + +b.dataset.d;
        [c[p], c[q]] = [c[q], c[p]]; set(c); draw();
        const again = ol.querySelector(`button[data-p="${q}"][data-d="${b.dataset.d}"]`) || ol.querySelector(`button[data-p="${q}"]`);
        again && again.focus();
      }));
    };
    draw();
    body.appendChild(ol);
    if (!readOnly) body.insertAdjacentHTML('beforeend', opts.lang === 'af' ? '<p class="xm-hint">Gebruik die pyltjies om die stappe in die regte volgorde te sit.</p>' : '<p class="xm-hint">Use the arrows to put the steps in the right order.</p>');
  } else if (it.type === 'fill' || it.type === 'blank') {
    const parts = (it.type === 'fill' ? it.fill : it.text).split('[[]]');
    const box = document.createElement(it.type === 'fill' ? 'pre' : 'p');
    box.className = it.type === 'fill' ? 'xm-code xm-fill' : 'xm-text xm-blank';
    const cur = Array.isArray(a) ? a.slice() : [];
    parts.forEach((txt, i) => {
      box.appendChild(document.createTextNode(txt));
      if (i < parts.length - 1) box.appendChild(input('xm-gap', 'Gap ' + (i + 1), cur[i], readOnly, v => {
        cur[i] = v; set(cur.some(x => String(x || '').trim()) ? cur.slice() : null);
      }));
    });
    body.appendChild(box);
  } else if (it.type === 'word' || it.type === 'num') {
    const row = document.createElement('div'); row.className = 'xm-wordrow';
    row.appendChild(input('xm-word', 'Your answer', a, readOnly, v => set(v.trim() ? v : null)));
    if (it.unit) row.insertAdjacentHTML('beforeend', `<span class="xm-unit">${esc(it.unit)}</span>`);
    body.appendChild(row);
  } else if (it.type === 'label') {
    const cur = Array.isArray(a) ? a.slice() : [];
    const box = document.createElement('div'); box.className = 'xm-labels';
    it.tags.forEach((tag, i) => {
      const l = document.createElement('label'); l.className = 'xm-labelrow';
      l.innerHTML = `<b>${esc(tag)}</b>`;
      l.appendChild(input('xm-word', 'Label ' + tag, cur[i], readOnly, v => { cur[i] = v; set(cur.some(x => String(x || '').trim()) ? cur.slice() : null); }));
      box.appendChild(l);
    });
    body.appendChild(box);
  } else if (it.type === 'written') {
    const ta = document.createElement('textarea');
    ta.className = 'xm-written'; ta.value = a || ''; ta.rows = Math.min(16, it.lines || 2 + it.marks * 2);
    ta.spellcheck = false; ta.setAttribute('autocorrect', 'off'); ta.setAttribute('autocapitalize', 'sentences');
    ta.setAttribute('aria-label', 'Your answer to ' + it.num); ta.maxLength = 4000;
    if (readOnly) ta.readOnly = true; else ta.addEventListener('input', () => set(ta.value.trim() ? ta.value : null));
    body.appendChild(ta);
  }
  return wrap;
}

/** Has the learner given any answer to this item? */
export function isAnswered(it, a) {
  if (a == null) return false;
  if (Array.isArray(a)) return it.type === 'order' ? true : a.some(v => v != null && String(v).trim());
  if (typeof a === 'object') return Object.keys(a).length > 0;
  if (typeof a === 'string') return a.trim() !== '';
  return true;
}

/** A learner's answer as plain text (review screen, CSV, AI marking). */
export function answerText(it, a) {
  if (a == null || a === '') return '';
  switch (it.type) {
    case 'mcq': return it.options[a] != null ? `${it.options[a]}` : '';
    case 'tf': return a ? 'True' : 'False';
    case 'match': return it.left.map((l, i) => `${i + 1}. ${l} → ${a[i] != null ? LETTER(a[i]) + ' ' + it.right[a[i]] : '–'}`).join('\n');
    case 'order': return a.map((s, p) => `${p + 1}. ${it.steps[s]}`).join('\n');
    case 'fill': case 'blank': return a.map((v, i) => `(${i + 1}) ${v || '–'}`).join('  ');
    case 'label': return it.tags.map((t, i) => `${t}: ${a[i] || '–'}`).join('  ');
    default: return String(a);
  }
}
