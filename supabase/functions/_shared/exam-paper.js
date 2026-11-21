// GENERATED from assets/exam-paper.js by scripts/sync-exam-paper.js. Do not edit here.
/* Exam Sanctum — paper module (ES module, no dependencies).
 *
 * One source of truth for: splitting a Test Tome-format paper into the memo-free
 * copy learners receive and the private memo; the paper's blueprint; and the
 * server's marking of objective items.
 *
 * Used by exam-papers.html (import) and, as a copy, by the exam-mark edge
 * function: supabase/functions/_shared/exam-paper.js. After editing this file run
 *   node scripts/sync-exam-paper.js
 * which copies it there (the site does not publish supabase/).
 *
 * Item ids and numbers follow test-tome.html exactly: section si, question n,
 * sub-question k → id "si.n" or "si.n.k", number "(si+1).n(.k)". A question (or
 * scenario) may set "n" to show the number printed on the paper instead, e.g. "6.2(a)".
 */

export const PAPER_FORMAT = 1;

/** Column A–B, true/false, multiple choice and the like: the "objective" share of the paper. */
export const OBJECTIVE = new Set(['mcq', 'tf', 'match', 'pairs', 'order']);
/** Marked by the server with an exact rule (short typed answers). */
export const AUTO = new Set(['mcq', 'tf', 'match', 'pairs', 'order', 'fill', 'word', 'num', 'blank', 'label']);
/** Marked against memo points by AI, then checked by the teacher. */
export const AI = new Set(['written']);

const KNOWN = new Set([...AUTO, ...AI]);

/* ── small helpers ─────────────────────────────────────────── */
function rng(seedText) {               // mulberry32 seeded from a string: same paper → same shuffles
  let h = 1779033703 ^ seedText.length;
  for (let i = 0; i < seedText.length; i++) { h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
/** A permutation of 0..n-1 that is never the identity (for n ≥ 2). */
function derange(n, rand) {
  const idx = [...Array(n).keys()];
  if (n < 2) return idx;
  let s;
  do {
    s = idx.slice();
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; }
  } while (s.every((v, k) => v === k));
  return s;
}
const sum = a => a.reduce((x, y) => x + (Number(y) || 0), 0);
/** One language of a paper: every field may have an …Af twin (Test Tome convention). */
function localise(o, lang) {
  if (Array.isArray(o)) return o.map(x => localise(x, lang));
  if (!o || typeof o !== 'object') return o;
  const r = {};
  for (const k of Object.keys(o)) {
    if (/Af$/.test(k)) continue;
    r[k] = localise(lang === 'af' && o[k + 'Af'] != null ? o[k + 'Af'] : o[k], lang);
  }
  return r;
}
/** Does this paper also have an Afrikaans version (…Af fields)? */
export function hasAfrikaans(source) { return /"[A-Za-z]+Af"\s*:/.test(JSON.stringify(source || {})); }

export function maxMarks(q) {
  const n = q.type === 'match' || q.type === 'pairs' ? (q.pairs || []).length
    : q.type === 'order' ? (q.steps || []).length
    : q.type === 'fill' || q.type === 'blank' ? (q.blanks || []).length
    : q.type === 'label' ? (q.labels || []).length
    : q.type === 'written' ? (q.pointMarks ? sum(q.pointMarks) : (q.points || []).length) || 1
    : 1;
  return q.marks || n;
}

/* ── split a paper ─────────────────────────────────────────── */
/**
 * prepare(source, { lang: 'en' | 'af' }) → { learner, memo, total, blueprint, warnings, errors }
 *  learner: what a learner receives (no answers, no memo points, no explanations)
 *  memo:    { [itemId]: { type, max, topic, skill, … answers … } }
 */
export function prepare(source, opts = {}) {
  const errors = [], warnings = [];
  const lang = opts.lang === 'af' ? 'af' : 'en';
  const src = localise(source || {}, lang);
  if (!Array.isArray(src.sections) || !src.sections.length) errors.push('The paper has no sections.');
  const seed = String(src.id || src.title || 'paper');
  const learner = {
    format: PAPER_FORMAT, title: src.title || 'Untitled paper', subject: src.subject || '', grade: src.grade || null,
    minutes: src.minutes || 60, intro: src.intro || '', topics: src.topics || {}, lang,
    addendum: src.addendum || '',            // the paper's own information sheet (HTML)
    sheets: Array.isArray(src.sheets) ? src.sheets.filter(x => /^[a-z0-9-]{1,20}$/.test(x)) : [],   // formula sheets in the overlay (assets/exam-sheets.js)
    calculator: !!src.calculator,            // scientific calculator in the overlay
    sections: [], scenarios: {}, items: []
  };
  const memo = {};

  (src.sections || []).forEach((sec, si) => {
    learner.sections.push({ title: sec.title || `Section ${si + 1}`, intro: sec.intro || '', total: 0 });
    let n = 0;
    (sec.questions || []).forEach(q => {
      n++;
      if (q.type === 'scenario') {
        const key = `${si}.${n}`;
        learner.scenarios[key] = { label: q.label != null ? q.label : 'Scenario', num: q.n != null ? String(q.n) : `${si + 1}.${n}`, scenario: q.scenario || '', svg: q.svg || '', code: q.code || '' };
        (q.questions || []).forEach((sq, k) => add(`${si}.${n}.${k + 1}`, `${si + 1}.${n}.${k + 1}`, sq, si, key, sq.skill || 'application', sq.topic || q.topic));
      } else add(`${si}.${n}`, `${si + 1}.${n}`, q, si, null, q.skill || 'knowledge', q.topic);
    });
  });

  function add(id, num, q, si, scen, skill, topic) {
    if (!KNOWN.has(q.type)) { errors.push(`${num}: question type "${q.type}" is not supported in exams.`); return; }
    const max = maxMarks(q);
    const rand = rng(seed + '|' + id);
    if (q.n != null) num = String(q.n);       // the number printed on the paper, e.g. "4.3(a)"
    const L = { id, num, sec: si, type: q.type, q: q.q || '', marks: max };
    if (scen) L.scen = scen;
    if (q.svg) L.svg = q.svg;
    if (q.code) L.code = q.code;
    if (q.calc) L.calc = true;
    const M = { type: q.type, max, topic: topic || null, skill, num };
    if (q.explain) M.explain = q.explain;

    switch (q.type) {
      case 'mcq':
        if (!Array.isArray(q.options) || !(q.answer >= 0 && q.answer < q.options.length)) errors.push(`${num}: the MCQ needs options and a correct answer.`);
        L.options = q.options || []; if (q.keepOrder) L.keepOrder = true;
        M.answer = q.answer; break;
      case 'tf':
        if (typeof q.answer !== 'boolean') errors.push(`${num}: true/false needs answer true or false.`);
        M.answer = q.answer; break;
      case 'match':
      case 'pairs': {            // both become Column A → Column B
        const pairs = q.pairs || [];
        const b = pairs.map(p => p[1]).concat(q.extra || []);
        const perm = derange(b.length, rand);              // perm[shownIndex] = index in b
        L.type = 'match'; L.left = pairs.map(p => p[0]); L.right = perm.map(i => b[i]);
        M.type = 'match'; M.correct = pairs.map((_, i) => perm.indexOf(i));   // for left i: the shown B index
        M.show = pairs.map(p => p[0] + ' → ' + p[1]);
        break;
      }
      case 'order': {
        const steps = q.steps || [];
        const perm = derange(steps.length, rand);
        L.steps = perm.map(i => steps[i]);
        M.correct = steps.map((_, i) => perm.indexOf(i));  // the shown indices in the right order
        M.show = steps; break;
      }
      case 'fill':
        L.fill = q.fill || ''; L.blanks = (q.blanks || []).length;
        if ((L.fill.match(/\[\[\]\]/g) || []).length !== L.blanks) errors.push(`${num}: the number of [[]] gaps and blanks differ.`);
        M.blanks = q.blanks || []; break;
      case 'blank':
        L.text = q.text || ''; L.blanks = (q.blanks || []).length;
        M.blanks = q.blanks || []; break;
      case 'word':
        M.answer = q.answer; break;
      case 'num':
        if (q.unit) L.unit = q.unit;
        M.answer = q.answer; if (q.tol != null) M.tol = q.tol; M.unit = q.unit || ''; break;
      case 'label':
        L.tags = (q.labels || []).map(l => l[0]);
        M.labels = (q.labels || []).map(l => l.slice(1)); break;
      case 'written':
        if (!(q.points || []).length) errors.push(`${num}: a written question needs memo points.`);
        M.points = q.points || [];
        M.weights = (q.points || []).map((_, i) => q.pointMarks ? (q.pointMarks[i] || 0) : 1);
        if (q.memoSvg) M.memoSvg = q.memoSvg;
        if (q.pointMarks && sum(q.pointMarks) !== max) warnings.push(`${num}: memo points add up to ${sum(q.pointMarks)} but the question is worth ${max}.`);
        if (!q.pointMarks && q.marks && q.points && q.points.length < q.marks) warnings.push(`${num}: ${q.marks} marks but only ${q.points.length} memo points.`);
        if (q.lines) L.lines = q.lines;
        break;
    }
    learner.items.push(L);
    learner.sections[si].total += max;
    memo[id] = M;
  }

  const total = sum(learner.items.map(i => i.marks));
  learner.total = total;
  if (src.marks && src.marks !== total) warnings.push(`The paper says ${src.marks} marks, but its questions add up to ${total}.`);
  return { learner, memo, total, blueprint: blueprint(learner, memo), warnings, errors };
}

/** Shares of the paper, in marks. The target: objective 20–25%, the rest short answers built on scenarios. */
export function blueprint(learner, memo) {
  const total = sum(learner.items.map(i => i.marks)) || 1;
  const pct = m => Math.round(1000 * m / total) / 10;
  const by = f => learner.items.reduce((o, it) => { const k = f(it); o[k] = (o[k] || 0) + it.marks; return o; }, {});
  const objective = sum(learner.items.filter(i => OBJECTIVE.has(i.type)).map(i => i.marks));
  const scenario = sum(learner.items.filter(i => i.scen && !OBJECTIVE.has(i.type)).map(i => i.marks));
  const ai = sum(learner.items.filter(i => AI.has(i.type)).map(i => i.marks));
  return {
    total,
    objective, objectivePct: pct(objective),
    scenarioShort: scenario, scenarioShortPct: pct(scenario),
    aiMarked: ai, aiMarkedPct: pct(ai),
    byTopic: by(it => memo[it.id].topic || 'other'),
    bySkill: by(it => memo[it.id].skill || 'knowledge'),
    byType: by(it => it.type),
    items: learner.items.length
  };
}

/* ── objective marking (exact rules, the same as Test Tome) ── */
export function wordNorm(s) {
  return String(s == null ? '' : s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[‘’`]/g, "'")
    .replace(/⁄/g, '/').replace(/θ/g, ' theta ').replace(/π/g, ' pi ').replace(/ω/g, ' ohm ').replace(/σ/g, ' sigma ')
    .replace(/×/g, ' x ').replace(/Δ|δ/g, ' delta ').replace(/\s+/g, ' ')
    .replace(/^\s*(the|a|an|die|'n)\s+/, '').replace(/[-–_\/]/g, ' ').replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ').trim();
}
export function wordOk(acc, v) { const mine = wordNorm(v); return mine !== '' && [].concat(acc).some(x => wordNorm(x) === mine); }
export function numVal(v) {
  const m = String(v == null ? '' : v).replace(/\s/g, '').replace(/^[a-z]=/i, '').replace(/−/g, '-').replace(',', '.').match(/^[-+]?\d*\.?\d+(e[-+]?\d+)?/i);
  return m ? parseFloat(m[0]) : NaN;
}
export function numOk(m, v) {
  const x = numVal(v); if (isNaN(x)) return false;
  const tol = m.tol != null ? m.tol : Math.max(Math.abs(m.answer) * 0.01, 1e-12);
  return Math.abs(x - m.answer) <= tol + 1e-12;
}
export function codeTokens(s) {
  return String(s || '').trim().match(/<!--|-->|\/\/|\/\*|\*\/|\+\+|--|\+=|-=|==|!=|<=|>=|[A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?|\S/g) || [];
}
export function blankOk(b, v) {
  const acc = Array.isArray(b) ? b : [b], mine = codeTokens(v).join('\u0001');
  return mine !== '' && acc.some(x => codeTokens(x).join('\u0001') === mine);
}
const scale = (right, n, max) => n === max ? right : Math.round(right * max / n);

/** The server's mark for one auto-marked item, or null for an AI-marked item. */
export function markObjective(m, a) {
  if (AI.has(m.type)) return null;
  if (a == null) return 0;
  switch (m.type) {
    case 'mcq': return a === m.answer ? m.max : 0;
    case 'tf': return a === m.answer ? m.max : 0;
    case 'match': { let r = 0; m.correct.forEach((c, i) => { if (a[i] === c || a[String(i)] === c) r++; }); return scale(r, m.correct.length, m.max); }
    case 'order': { if (!Array.isArray(a)) return 0; let r = 0; m.correct.forEach((c, pos) => { if (a[pos] === c) r++; }); return scale(r, m.correct.length, m.max); }
    case 'fill': { if (!Array.isArray(a)) return 0; let r = 0; m.blanks.forEach((b, i) => { if (blankOk(b, a[i])) r++; }); return scale(r, m.blanks.length, m.max); }
    case 'blank': { if (!Array.isArray(a)) return 0; let r = 0; m.blanks.forEach((b, i) => { if (wordOk(b, a[i])) r++; }); return scale(r, m.blanks.length, m.max); }
    case 'label': { if (!Array.isArray(a)) return 0; let r = 0; m.labels.forEach((acc, i) => { if (wordOk(acc, a[i])) r++; }); return scale(r, m.labels.length, m.max); }
    case 'word': return wordOk(m.answer, a) ? m.max : 0;
    case 'num': return numOk(m, a) ? m.max : 0;
  }
  return 0;
}

/** The memo's answer, as text, for the review screen. */
export function memoText(m) {
  switch (m.type) {
    case 'mcq': return null;   // shown with the options
    case 'tf': return m.answer ? 'True' : 'False';
    case 'match': return m.show.join('\n');
    case 'order': return m.show.map((s, i) => `${i + 1}. ${s}`).join('\n');
    case 'fill': case 'blank': return m.blanks.map((b, i) => `(${i + 1}) ${[].concat(b).join(' / ')}`).join('\n');
    case 'label': return m.labels.map((l, i) => `${i + 1}: ${[].concat(l).join(' / ')}`).join('\n');
    case 'word': return [].concat(m.answer).join(' / ');
    case 'num': return String(m.answer) + (m.unit ? ' ' + m.unit : '');
    case 'written': return m.points.map((p, i) => `${i}. (${m.weights[i]}) ${p}`).join('\n');
  }
  return '';
}
