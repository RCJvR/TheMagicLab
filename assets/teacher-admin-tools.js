/* Teacher admin tools: Report Comments, Rubric Builder, Paper Assembler.
   Everything is client-side; data lives in this browser's localStorage (aa:*). */
(function () {
  'use strict';

  // ── helpers ────────────────────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const store = {
    get(k, d) { try { const v = localStorage.getItem('aa:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('aa:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  function el(tag, attrs, kids) {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'text') n.textContent = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    });
    (kids || []).forEach(c => n.appendChild(c));
    return n;
  }
  function toast(msg) {
    const t = el('div', { class: 'aa-toast', role: 'status', text: msg });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast('Copied'); }
    catch (e) { toast('Copy failed — select the text and copy manually'); }
  }
  const pick = a => a[Math.floor(Math.random() * a.length)];
  function lucide() { if (window.lucide) window.lucide.createIcons(); }

  /* ═══════════════ REPORT COMMENTS ═══════════════ */
  const STRENGTHS = {
    participates: 'Participates actively in class',
    consistent:   'Works consistently',
    problem:      'Shows strong problem-solving skills',
    neat:         'Presents neat, careful work',
    teamwork:     'Works well with others',
    initiative:   'Shows initiative',
    homework:     'Hands in homework on time',
    tests:        'Performs well in tests'
  };
  const NEEDS = {
    revise:   'Revise regularly',
    homework: 'Hand in homework on time',
    focus:    'Stay focused in class',
    working:  'Show full working',
    help:     'Ask for help sooner',
    present:  'Improve presentation of work',
    testprep: 'Prepare more thoroughly for tests',
    participate: 'Take part more in class'
  };
  // [verb|verbs] resolves by pronoun; {S} subject pronoun, {o} object, {p} possessive.
  const STRENGTH_PHRASE = {
    participates: '{S} [take|takes] an active part in lessons',
    consistent:   '{S} [work|works] consistently',
    problem:      '{S} [approach|approaches] problems with confidence and clear thinking',
    neat:         '{p} work is neat and carefully presented',
    teamwork:     '{S} [work|works] well with classmates',
    initiative:   '{S} [show|shows] initiative',
    homework:     '{S} [hand|hands] in homework on time',
    tests:        '{S} [perform|performs] well in assessments'
  };
  const NEED_PHRASE = {
    revise:   'revising regularly',
    homework: 'handing in homework on time',
    focus:    'staying focused in class',
    working:  'showing full working',
    help:     'asking for help sooner',
    present:  'improving the presentation of {p} work',
    testprep: 'preparing more thoroughly for tests',
    participate: 'taking a more active part in lessons'
  };
  const OPENERS = {
    7: ['{N} has achieved outstanding results{sub}.', '{N} has produced outstanding work{sub} this term.'],
    6: ['{N} has achieved a meritorious result{sub}.', '{N} has done very well{sub} this term.'],
    5: ['{N} has achieved a substantial result{sub}.', '{N} has made good progress{sub} this term.'],
    4: ['{N} has achieved an adequate result{sub}.', '{N} has met the basic requirements{sub} this term.'],
    3: ['{N} has achieved a moderate result{sub}, and there is room to grow.', '{N} is working at a moderate level{sub} and can improve with more effort.'],
    2: ['{N} is currently performing at an elementary level{sub} and needs more support.', '{N} has found the work{sub} challenging this term.'],
    1: ['{N} has not yet achieved the required standard{sub} and needs urgent support.', '{N} is not yet meeting the requirements{sub} and needs focused help.']
  };
  const TREND = {
    up:   ['This is an improvement on last term.', 'It is encouraging to see progress since last term.'],
    same: ['This is consistent with last term.'],
    down: ['This is a drop from last term, which we would like to turn around.']
  };
  const CLOSERS = {
    high: ['Keep it up!', 'Well done on a strong term.'],
    mid:  ['With continued effort {s} can reach even higher.', 'I look forward to seeing {o} build on this.'],
    low:  ['With support at home and regular practice, improvement is possible.', 'Please encourage regular revision; I am happy to help.']
  };
  const PRON = {
    they: { S: 'They', s: 'they', o: 'them', p: 'their', i: 0 },
    she:  { S: 'She',  s: 'she',  o: 'her',  p: 'her',   i: 1 },
    he:   { S: 'He',   s: 'he',   o: 'him',  p: 'his',   i: 1 }
  };
  function fill(tpl, ctx) {
    return tpl
      .replace(/\[([^|\]]+)\|([^\]]+)\]/g, (m, a, b) => ctx.pr.i ? b : a)
      .replace(/\{N\}/g, ctx.name)
      .replace(/\{sub\}/g, ctx.subject ? ' in ' + ctx.subject : '')
      .replace(/\{S\}/g, ctx.pr.S)
      .replace(/\{s\}/g, ctx.pr.s)
      .replace(/\{o\}/g, ctx.pr.o)
      .replace(/\{p\}/g, ctx.pr.p);
  }
  // Possessive at the start of a sentence needs a capital.
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  function joinList(a) { return a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }

  function buildComment() {
    const name = $('r-name').value.trim() || 'This learner';
    const pr = PRON[$('r-pron').value];
    const level = +$('r-level').value;
    const ctx = { name, pr, subject: $('r-subject').value.trim() };
    const sKeys = [...document.querySelectorAll('#r-strengths input:checked')].map(i => i.value);
    const nKeys = [...document.querySelectorAll('#r-needs input:checked')].map(i => i.value);
    const parts = [fill(pick(OPENERS[level]), ctx)];
    const trend = $('r-trend').value;
    if (trend) parts.push(pick(TREND[trend]));
    if (sKeys.length) {
      const phrases = sKeys.map(k => fill(STRENGTH_PHRASE[k], ctx)).map(cap);
      parts.push(phrases.map(p => p + '.').join(' '));
    }
    if (nKeys.length) {
      const verb = pick(['would benefit from', 'should focus on']);
      parts.push(pr.S + ' ' + verb + ' ' + joinList(nKeys.map(k => fill(NEED_PHRASE[k], ctx))) + '.');
    }
    parts.push(fill(pick(level >= 6 ? CLOSERS.high : level >= 4 ? CLOSERS.mid : CLOSERS.low), ctx));
    return parts.join(' ');
  }

  function chipGroup(host, map) {
    Object.entries(map).forEach(([k, label]) => {
      host.appendChild(el('label', { class: 'aa-chip' }, [
        el('input', { type: 'checkbox', value: k }), el('span', { text: label })
      ]));
    });
  }
  chipGroup($('r-strengths'), STRENGTHS);
  chipGroup($('r-needs'), NEEDS);

  const gen = () => { $('r-out').value = buildComment(); };
  $('r-gen').addEventListener('click', gen);
  $('r-regen').addEventListener('click', gen);
  $('r-copy').addEventListener('click', () => $('r-out').value && copy($('r-out').value));

  let classList = store.get('comments', []);
  function renderList() {
    const host = $('r-list');
    host.textContent = '';
    if (!classList.length) { host.appendChild(el('div', { class: 'aa-empty-hint', text: 'No comments added yet.' })); return; }
    classList.forEach((c, i) => {
      host.appendChild(el('div', { class: 'aa-list-item' }, [
        el('div', { class: 'aa-who', text: c.name }),
        el('div', { class: 'aa-txt', text: c.text }),
        el('div', { class: 'aa-actions' }, [
          el('button', { class: 'aa-btn aa-btn--sm', text: 'Copy', onclick: () => copy(c.text) }),
          el('button', { class: 'aa-btn aa-btn--sm', text: 'Remove', onclick: () => { classList.splice(i, 1); store.set('comments', classList); renderList(); } })
        ])
      ]));
    });
  }
  $('r-add').addEventListener('click', () => {
    const text = $('r-out').value.trim();
    if (!text) return toast('Generate a comment first');
    classList.push({ name: $('r-name').value.trim() || 'Learner ' + (classList.length + 1), text });
    store.set('comments', classList); renderList();
    $('r-name').value = ''; $('r-out').value = ''; $('r-name').focus();
  });
  $('r-copyall').addEventListener('click', () => classList.length && copy(classList.map(c => c.name + ': ' + c.text).join('\n\n')));
  $('r-clear').addEventListener('click', () => { if (classList.length && confirm('Remove all saved comments?')) { classList = []; store.set('comments', classList); renderList(); } });
  renderList();

  /* ═══════════════ RUBRIC ═══════════════ */
  const TEMPLATES = {
    presentation: ['Content knowledge', 'Organisation', 'Delivery and voice', 'Use of visual aids'],
    practical:    ['Aim and hypothesis', 'Method and safety', 'Results and data', 'Conclusion'],
    project:      ['Planning and research', 'Quality of product', 'Process documentation', 'Evaluation and reflection']
  };
  let rubric = store.get('rubric', null) || { title: '', levels: 4, rows: [{ name: '', cells: [] }] };

  function levelLabel(i, n) { return n - i; } // top level scores highest
  function renderRubric() {
    const n = rubric.levels;
    const t = $('b-table'); t.textContent = '';
    const head = el('tr', {}, [el('th', { text: 'Criterion' })]);
    for (let i = 0; i < n; i++) head.appendChild(el('th', { text: 'Level ' + levelLabel(i, n) + ' · ' + levelLabel(i, n) + ' marks' }));
    t.appendChild(head);
    rubric.rows.forEach((r, ri) => {
      const tr = el('tr');
      const name = el('input', { class: 'aa-in', 'aria-label': 'Criterion ' + (ri + 1), value: r.name, placeholder: 'Criterion' });
      name.addEventListener('input', () => { r.name = name.value; save(); });
      tr.appendChild(el('td', {}, [name, el('button', { class: 'aa-btn aa-btn--sm', style: 'margin-top:6px', text: 'Remove', onclick: () => { rubric.rows.splice(ri, 1); save(); renderRubric(); } })]));
      for (let i = 0; i < n; i++) {
        const ta = el('textarea', { class: 'aa-in', 'aria-label': 'Criterion ' + (ri + 1) + ' level ' + levelLabel(i, n) });
        ta.value = r.cells[i] || '';
        ta.addEventListener('input', () => { r.cells[i] = ta.value; save(); });
        tr.appendChild(el('td', {}, [ta]));
      }
      t.appendChild(tr);
    });
    $('b-total').textContent = 'Total: ' + (rubric.rows.length * n) + ' marks · ' + rubric.rows.length + ' criteria';
  }
  const save = () => store.set('rubric', rubric);
  $('b-title').value = rubric.title; $('b-levels').value = String(rubric.levels);
  $('b-title').addEventListener('input', () => { rubric.title = $('b-title').value; save(); });
  $('b-levels').addEventListener('change', () => { rubric.levels = +$('b-levels').value; save(); renderRubric(); });
  $('b-addrow').addEventListener('click', () => { rubric.rows.push({ name: '', cells: [] }); save(); renderRubric(); });
  $('b-start').addEventListener('change', () => {
    const t = TEMPLATES[$('b-start').value]; if (!t) return;
    if (rubric.rows.some(r => r.name || r.cells.some(Boolean)) && !confirm('Replace the current criteria?')) return;
    rubric.rows = t.map(name => ({ name, cells: [] })); save(); renderRubric();
  });
  $('b-reset').addEventListener('click', () => {
    if (!confirm('Clear the rubric?')) return;
    rubric = { title: '', levels: rubric.levels, rows: [{ name: '', cells: [] }] };
    $('b-title').value = ''; save(); renderRubric();
  });
  $('b-csv').addEventListener('click', () => {
    const n = rubric.levels, q = s => '"' + String(s || '').replace(/"/g, '""') + '"';
    const lines = [['Criterion'].concat(Array.from({ length: n }, (_, i) => 'Level ' + levelLabel(i, n))).map(q).join('\t')];
    rubric.rows.forEach(r => lines.push([r.name].concat(Array.from({ length: n }, (_, i) => r.cells[i] || '')).map(q).join('\t')));
    copy(lines.join('\n'));
  });
  $('b-print').addEventListener('click', () => {
    const n = rubric.levels, pa = $('print-area'); pa.textContent = '';
    pa.appendChild(el('h1', { text: rubric.title || 'Rubric' }));
    pa.appendChild(el('div', { class: 'aa-meta', text: 'Learner: ______________________    Date: ____________    Total: ____ / ' + (rubric.rows.length * n) }));
    const tbl = el('table'); const hr = el('tr', {}, [el('th', { text: 'Criterion' })]);
    for (let i = 0; i < n; i++) hr.appendChild(el('th', { text: 'Level ' + levelLabel(i, n) + ' (' + levelLabel(i, n) + ')' }));
    hr.appendChild(el('th', { text: 'Mark' })); tbl.appendChild(hr);
    rubric.rows.forEach(r => {
      const tr = el('tr', {}, [el('td', { text: r.name })]);
      for (let i = 0; i < n; i++) tr.appendChild(el('td', { text: r.cells[i] || '' }));
      tr.appendChild(el('td', { text: '' })); tbl.appendChild(tr);
    });
    pa.appendChild(tbl); window.print();
  });
  renderRubric();

  /* ═══════════════ PAPER ═══════════════ */
  const LEVELS = ['Knowledge', 'Routine procedures', 'Complex procedures', 'Problem solving'];
  let paper = store.get('paper', null) || { school: '', subject: '', title: '', target: 50, time: '', inst: '', qs: [] };
  const fields = { school: 'p-school', subject: 'p-subject', title: 'p-title', time: 'p-time', inst: 'p-inst' };
  Object.entries(fields).forEach(([k, id]) => { $(id).value = paper[k] || ''; $(id).addEventListener('input', () => { paper[k] = $(id).value; savePaper(); }); });
  $('p-target').value = paper.target;
  $('p-target').addEventListener('input', () => { paper.target = +$('p-target').value || 0; savePaper(); renderPaper(); });
  const savePaper = () => store.set('paper', paper);

  function renderPaper() {
    const sum = paper.qs.reduce((a, q) => a + q.marks, 0);
    const tot = $('p-total');
    tot.textContent = 'Total: ' + sum + ' / ' + paper.target + ' marks';
    tot.className = 'aa-total ' + (sum === paper.target ? 'aa-ok' : sum > paper.target ? 'aa-bad' : 'aa-warn');
    const sp = $('p-spread'); sp.textContent = '';
    LEVELS.forEach(l => {
      const m = paper.qs.filter(q => q.level === l).reduce((a, q) => a + q.marks, 0);
      sp.appendChild(el('div', { text: l }, [el('b', { text: m + ' marks · ' + (sum ? Math.round(m / sum * 100) : 0) + '%' })]));
    });
    const host = $('p-list'); host.textContent = '';
    if (!paper.qs.length) { host.appendChild(el('div', { class: 'aa-empty-hint', text: 'No questions yet. Add one above.' })); return; }
    paper.qs.forEach((q, i) => {
      const move = d => () => { const j = i + d; if (j < 0 || j >= paper.qs.length) return; [paper.qs[i], paper.qs[j]] = [paper.qs[j], paper.qs[i]]; savePaper(); renderPaper(); };
      host.appendChild(el('div', { class: 'aa-list-item' }, [
        el('div', { class: 'aa-who', text: 'Question ' + (i + 1) + ' · [' + q.marks + '] · ' + q.level }),
        el('div', { class: 'aa-txt', text: q.text }),
        q.memo ? el('div', { class: 'aa-txt', style: 'color:var(--text-3)', text: 'Memo: ' + q.memo }) : el('span'),
        el('div', { class: 'aa-actions' }, [
          el('button', { class: 'aa-btn aa-btn--sm', 'aria-label': 'Move question ' + (i + 1) + ' up', text: '↑', onclick: move(-1) }),
          el('button', { class: 'aa-btn aa-btn--sm', 'aria-label': 'Move question ' + (i + 1) + ' down', text: '↓', onclick: move(1) }),
          el('button', { class: 'aa-btn aa-btn--sm', text: 'Edit', onclick: () => {
            $('q-text').value = q.text; $('q-marks').value = q.marks; $('q-level').value = q.level; $('q-memo').value = q.memo || '';
            paper.qs.splice(i, 1); savePaper(); renderPaper(); $('q-text').focus();
          } }),
          el('button', { class: 'aa-btn aa-btn--sm', text: 'Remove', onclick: () => { paper.qs.splice(i, 1); savePaper(); renderPaper(); } })
        ])
      ]));
    });
  }
  $('q-add').addEventListener('click', () => {
    const text = $('q-text').value.trim(), marks = parseInt($('q-marks').value, 10);
    if (!text) return toast('Type the question first');
    if (!(marks > 0)) return toast('Marks must be 1 or more');
    paper.qs.push({ text, marks, level: $('q-level').value, memo: $('q-memo').value.trim() });
    savePaper(); renderPaper();
    $('q-text').value = ''; $('q-memo').value = ''; $('q-text').focus();
  });
  function printPaper(memo) {
    const pa = $('print-area'); pa.textContent = '';
    const sum = paper.qs.reduce((a, q) => a + q.marks, 0);
    pa.appendChild(el('h1', { text: (paper.school ? paper.school + ' — ' : '') + (paper.title || 'Assessment') + (memo ? ' — MEMORANDUM' : '') }));
    pa.appendChild(el('div', { class: 'aa-meta', text: [paper.subject, 'Total: ' + sum + ' marks', paper.time && 'Time: ' + paper.time].filter(Boolean).join('  |  ') }));
    if (!memo && paper.inst) pa.appendChild(el('div', { class: 'aa-meta', text: 'Instructions: ' + paper.inst }));
    if (memo) {
      const tbl = el('table', {}, [el('tr', {}, [el('th', { text: 'Q' }), el('th', { text: 'Answer / guidance' }), el('th', { text: 'Marks' })])]);
      paper.qs.forEach((q, i) => tbl.appendChild(el('tr', {}, [el('td', { text: String(i + 1) }), el('td', { text: q.memo || '' }), el('td', { text: String(q.marks) })])));
      pa.appendChild(tbl);
    } else {
      paper.qs.forEach((q, i) => pa.appendChild(el('div', { class: 'aa-q', text: (i + 1) + '.  ' + q.text + '   [' + q.marks + ']' })));
    }
    window.print();
  }
  $('p-print').addEventListener('click', () => paper.qs.length ? printPaper(false) : toast('Add a question first'));
  $('p-print-memo').addEventListener('click', () => paper.qs.length ? printPaper(true) : toast('Add a question first'));
  $('p-reset').addEventListener('click', () => {
    if (!paper.qs.length || !confirm('Remove all questions?')) return;
    paper.qs = []; savePaper(); renderPaper();
  });
  renderPaper();

  lucide();
})();
