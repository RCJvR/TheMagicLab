/* Markbook calculations (spec §6.4). One copy, used by the markbook grid and its exports.
   Same model as the Assessment Tracker: each counted task has a weight (% of the year mark);
   the year mark so far = Σ(mark / total × weight) / Σ(weight of tasks that have a mark).
   Statuses: excused and exempt drop out; absent drops out until a mark is entered; missing counts
   as 0 only when the class setting "missing counts as 0" is on. If no counted task has a weight,
   every counted task weighs the same. */
(function (root) {
  'use strict';
  const capsLevel = pct => pct >= 80 ? 7 : pct >= 70 ? 6 : pct >= 60 ? 5 : pct >= 50 ? 4 : pct >= 40 ? 3 : pct >= 30 ? 2 : 1;

  /** Parse what a teacher typed in a cell: a number, a status letter, or nothing. */
  function parseCell(text) {
    const t = String(text == null ? '' : text).trim().toLowerCase().replace(',', '.');
    if (!t) return { empty: true };
    const st = { a: 'absent', e: 'excused', x: 'exempt', m: 'missing', abs: 'absent', exc: 'excused', exe: 'exempt', mis: 'missing' }[t];
    if (st) return { status: st, mark: null };
    if (/^\d+(\.\d+)?$/.test(t)) return { mark: Number(t), status: null };
    return { invalid: true };
  }
  const STATUS_SHORT = { absent: 'a', excused: 'e', exempt: 'x', missing: 'm' };
  const cellText = m => !m ? '' : m.status ? STATUS_SHORT[m.status] || '' : (m.mark == null ? '' : String(Math.round(m.mark * 10) / 10));

  /**
   * tasks: [{ id, term, total, weight, counts_to_year }]
   * markOf(task) → { mark, status } | null
   * opts: { missingAsZero }
   * → { year, terms: { 1: pct, … }, counted: weight with a mark, level }
   */
  function learnerResult(tasks, markOf, opts) {
    opts = opts || {};
    const counted = tasks.filter(t => t.counts_to_year !== false && Number(t.total) > 0);
    const anyWeight = counted.some(t => Number(t.weight) > 0);
    const w = t => anyWeight ? Number(t.weight) || 0 : 1;
    const acc = { all: [0, 0] }, terms = {};
    counted.forEach(t => {
      if (!(w(t) > 0)) return;
      const m = markOf(t); if (!m) return;
      let frac = null;
      if (m.status === 'missing') { if (!opts.missingAsZero) return; frac = 0; }
      else if (m.status) return;                         // absent, excused, exempt
      else if (m.mark != null) frac = Number(m.mark) / Number(t.total);
      if (frac == null) return;
      const k = t.term || 0;
      acc.all[0] += frac * w(t); acc.all[1] += w(t);
      acc[k] = acc[k] || [0, 0]; acc[k][0] += frac * w(t); acc[k][1] += w(t);
    });
    Object.keys(acc).forEach(k => { if (k !== 'all' && k !== '0' && acc[k][1]) terms[k] = acc[k][0] / acc[k][1] * 100; });
    const year = acc.all[1] ? acc.all[0] / acc.all[1] * 100 : null;
    return { year, terms, counted: acc.all[1], level: year == null ? null : capsLevel(year) };
  }

  /** Normalised name for matching local lists and Test Tome names to the roster. */
  function normName(s) {
    let t = String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9, ]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (t.includes(',')) { const [last, first] = t.split(',').map(x => x.trim()); t = (first + ' ' + last).trim(); }   // "Surname, First"
    return t;
  }

  root.MLMarkbookCalc = { capsLevel, parseCell, cellText, learnerResult, normName };
})(typeof window !== 'undefined' ? window : globalThis);
