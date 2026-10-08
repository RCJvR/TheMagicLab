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


  // ── save to / open from a file (report list and rubric) ──
  // A small envelope names what the file holds, so a rubric cannot be opened
  // as a comment list. Contents are rebuilt by the caller, never trusted.
  function downloadJson(kind, name, data) {
    const base = String(name || kind).replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || kind;
    const blob = new Blob([JSON.stringify({ magiclab: kind, saved: new Date().toISOString(), data }, null, 1)], { type: 'application/json' });
    const a = el('a', { href: URL.createObjectURL(blob), download: base + '.magiclab-' + kind + '.json' });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast('Saved to your downloads folder');
  }
  function wireOpen(buttonId, inputId, kind, apply) {
    $(buttonId).addEventListener('click', () => $(inputId).click());
    $(inputId).addEventListener('change', () => {
      const f = $(inputId).files[0]; $(inputId).value = '';
      if (!f) return;
      if (f.size > 4 * 1024 * 1024) return toast('That file is too large');
      const r = new FileReader();
      r.onload = () => {
        let o; try { o = JSON.parse(r.result); } catch (e) { return toast('That is not a saved file from this tool'); }
        if (!o || o.magiclab !== kind) return toast('That file is not the right kind of saved file');
        apply(o.data);
      };
      r.onerror = () => toast('Could not read that file');
      r.readAsText(f);
    });
  }
  const strOf = (v, max) => typeof v === 'string' ? v.slice(0, max) : '';

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
  $('r-save-file').addEventListener('click', () => classList.length ? downloadJson('report-comments', 'report-comments', classList) : toast('Nothing to save yet'));
  wireOpen('r-open-file', 'r-open-input', 'report-comments', data => {
    if (!Array.isArray(data)) return toast('That file is not a saved comment list');
    const clean = data.slice(0, 500).map(c => ({ name: strOf(c && c.name, 200), text: strOf(c && c.text, 4000) })).filter(c => c.text.trim());
    if (!clean.length) return toast('That file has no comments in it');
    if (classList.length && !confirm('Replace your current list with the ' + clean.length + ' comment(s) in this file?')) return;
    classList = clean; store.set('comments', classList); renderList(); toast('List opened');
  });

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
  $('b-save-file').addEventListener('click', () => downloadJson('rubric', rubric.title || 'rubric', rubric));
  wireOpen('b-open-file', 'b-open-input', 'rubric', data => {
    if (!data || !Array.isArray(data.rows)) return toast('That file is not a saved rubric');
    const levels = [3, 4, 5].includes(+data.levels) ? +data.levels : 4;
    const rows = data.rows.slice(0, 50).map(r => ({ name: strOf(r && r.name, 300), cells: (Array.isArray(r && r.cells) ? r.cells : []).slice(0, levels).map(c => strOf(c, 1000)) }));
    if (!rows.length) rows.push({ name: '', cells: [] });
    if (rubric.rows.some(r => r.name || r.cells.some(Boolean)) && !confirm('Replace the rubric you are working on with this file?')) return;
    rubric = { title: strOf(data.title, 300), levels, rows };
    $('b-title').value = rubric.title; $('b-levels').value = String(levels);
    save(); renderRubric(); toast('Rubric opened');
  });

  /* ═══════════════ PAPER ═══════════════ */
  // Cognitive levels, grouped the way the paper's mark analysis is reported.
  const BANDS = [
    { name: 'Lower order', levels: ['Recall', 'Comprehend'] },
    { name: 'Higher order', levels: ['Application', 'Analysis', 'Synthesis', 'Evaluate'] }
  ];
  const LEVELS = BANDS.flatMap(b => b.levels);
  // Papers saved before these levels existed used a four-level scale.
  const OLD_LEVEL = { 'Knowledge': 'Recall', 'Routine procedures': 'Comprehend', 'Complex procedures': 'Application', 'Problem solving': 'Analysis' };
  const TYPE_LABEL = { written: 'Written', mcq: 'Multiple choice', tf: 'True or false', context: 'Context note' };
  const DEFAULT_INST = [
    'Fill in your name in the space provided above.',
    'Check that your paper is complete.',
    'Answer ALL questions.',
    'Read each question carefully before answering.',
    'Write the answers in the space provided.',
    'There is extra space at the back if you need it.',
    'It is in your own interest to write NEATLY and LEGIBLY.',
    'Use the mark allocation as a guide to the length of your responses, e.g. 2 marks = 2 facts.'
  ].join('\n');

  // Older saves were a flat list of questions; fold them into one section.
  function migrate(p) {
    p = p || {};
    const o = Object.assign({
      school: '', grade: '', subject: '', title: '', headerLeft: '', headerRight: '', footerText: '', date: '', time: '',
      examiner: '', moderator: '', target: 50, inst: DEFAULT_INST, sections: []
    }, p);
    if (Array.isArray(p.qs)) {
      o.sections = [{ title: 'Questions', instruction: '', qs: p.qs.map(q => Object.assign({ type: 'written', lines: null }, q)) }];
      if (!p.inst) o.inst = DEFAULT_INST;
    }
    delete o.qs;
    o.sections.forEach(s => s.qs.forEach(q => { if (OLD_LEVEL[q.level]) q.level = OLD_LEVEL[q.level]; }));
    o.opts = Object.assign({ font: '12', marksPos: 'right', nameLine: 'yes', lines: 'on', cover: 'yes', analysis: 'yes', extra: 'yes' }, p.opts);
    return o;
  }
  let paper = migrate(store.get('paper', null));
  const savePaper = () => store.set('paper', paper);

  const FIELDS = { school: 'p-school', grade: 'p-grade', subject: 'p-subject', title: 'p-title', date: 'p-date', time: 'p-time', examiner: 'p-examiner', moderator: 'p-moderator', headerLeft: 'p-header-left', headerRight: 'p-header-right', footerText: 'p-footer', inst: 'p-inst' };
  Object.entries(FIELDS).forEach(([k, id]) => {
    $(id).value = paper[k] || '';
    $(id).addEventListener('input', () => { paper[k] = $(id).value; savePaper(); });
  });
  $('p-target').value = paper.target;
  $('p-target').addEventListener('input', () => { paper.target = +$('p-target').value || 0; savePaper(); renderPaper(); });
  const OPTS = [['p-font', 'font'], ['p-marks-pos', 'marksPos'], ['p-name-line', 'nameLine'], ['p-lines', 'lines'], ['p-cover', 'cover'], ['p-analysis', 'analysis'], ['p-extra', 'extra']];
  OPTS.forEach(([id, k]) => {
    $(id).value = paper.opts[k];
    $(id).addEventListener('change', () => { paper.opts[k] = $(id).value; savePaper(); });
  });

  // School logo: shrunk to fit and kept in this browser only, so it never
  // leaves the teacher's device and stays small enough for localStorage.
  function showLogo() {
    $('p-logo-box').hidden = !paper.logo;
    if (paper.logo) $('p-logo-img').src = paper.logo;
  }
  $('p-logo').addEventListener('change', () => {
    const f = $('p-logo').files[0];
    if (!f) return;
    if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(f.type)) return toast('Please choose a PNG, JPG, WebP or SVG image');
    if (f.size > 5 * 1024 * 1024) return toast('That image is over 5 MB');
    const url = URL.createObjectURL(f), img = new Image();
    img.onload = () => {
      const max = 400, k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      paper.logo = c.toDataURL('image/png');
      savePaper(); showLogo();
    };
    img.onerror = () => { URL.revokeObjectURL(url); toast('Could not read that image'); };
    img.src = url;
  });
  $('p-logo-remove').addEventListener('click', () => { delete paper.logo; $('p-logo').value = ''; savePaper(); showLogo(); });
  showLogo();

  // ── sub-tabs: details | print settings | sections & questions ──
  function showSub(name) {
    document.querySelectorAll('.aa-subtab').forEach(b => {
      const on = b.dataset.sub === name;
      b.classList.toggle('active', on); b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.aa-subpanel').forEach(p => { p.hidden = p.id !== 'sub-' + name; });
    store.set('paper-sub', name);
  }
  document.querySelectorAll('.aa-subtab').forEach(b => b.addEventListener('click', () => showSub(b.dataset.sub)));
  { const s = store.get('paper-sub', 'details'); showSub(['details', 'print', 'build'].includes(s) ? s : 'details'); }

  // ── helpers over the section tree ──
  const secMarks = s => s.qs.reduce((a, q) => a + (q.type === 'context' ? 0 : q.marks), 0);
  const paperMarks = () => paper.sections.reduce((a, s) => a + secMarks(s), 0);
  // Number questions 1.1, 1.2 … per section; context notes take no number.
  function numbered(si) {
    let n = 0;
    return paper.sections[si].qs.map(q => (q.type === 'context' ? null : (si + 1) + '.' + (++n)));
  }
  const autoLines = q => (q.lines == null || q.lines === '') ? q.marks + 2 : q.lines;
  const mk = n => n + (n === 1 ? ' MARK' : ' MARKS');

  // ── the add / edit question form ──
  let editing = null; // { si, qi } while a question is being edited
  const curSec = () => { const v = parseInt($('q-section').value, 10); return Number.isInteger(v) ? v : undefined; };
  function fillSections(sel) {
    const s = $('q-section'); s.textContent = '';
    paper.sections.forEach((sec, i) => s.appendChild(el('option', { value: String(i), text: 'Question ' + (i + 1) + ' · ' + (sec.title || 'Untitled') })));
    const last = Math.max(0, paper.sections.length - 1);
    s.value = String(Math.min(Number.isInteger(sel) ? Math.max(0, sel) : last, last));
  }
  function setType(t) {
    $('q-type').value = t;
    const show = (id, on) => { $(id).hidden = !on; };
    show('q-w-heading', t === 'context');
    show('q-w-opts', t === 'mcq');
    show('q-w-marks', t !== 'context');
    show('q-w-lines', t === 'written');
    show('q-w-ans', t === 'mcq' || t === 'tf');
    show('q-w-level', t !== 'context');
    show('q-w-memo', t === 'written');
    $('q-text-lbl').textContent = t === 'context' ? 'Scenario or context text (printed in italics)' : t === 'tf' ? 'Statement' : 'Question';
    const ans = $('q-ans'); ans.textContent = '';
    (t === 'mcq' ? ['A', 'B', 'C', 'D'] : ['True', 'False']).forEach(v => ans.appendChild(el('option', { value: v, text: v })));
  }
  $('q-type').addEventListener('change', () => { const t = $('q-type').value; setType(t); if (t === 'mcq' || t === 'tf') $('q-marks').value = 1; });
  setType('written');

  function clearForm() {
    ['q-text', 'q-heading', 'q-oa', 'q-ob', 'q-oc', 'q-od', 'q-memo', 'q-lines'].forEach(id => { $(id).value = ''; });
    $('q-marks').value = 1;
  }
  function endEdit() {
    editing = null;
    $('q-add').textContent = 'Add question'; $('q-cancel').hidden = true; $('q-form-title').textContent = 'Add a question';
    clearForm();
  }
  $('q-cancel').addEventListener('click', endEdit);

  $('q-add').addEventListener('click', () => {
    if (!paper.sections.length) return toast('Add a section first');
    const t = $('q-type').value, text = $('q-text').value.trim();
    if (!text) return toast('Type the question first');
    const q = { type: t, text };
    if (t !== 'context') {
      q.marks = parseInt($('q-marks').value, 10);
      if (!(q.marks > 0)) return toast('Marks must be 1 or more');
      q.level = $('q-level').value;
    } else {
      q.heading = $('q-heading').value.trim();
    }
    if (t === 'written') {
      q.memo = $('q-memo').value.trim();
      const l = $('q-lines').value.trim();
      q.lines = l === '' ? null : Math.min(20, Math.max(0, parseInt(l, 10) || 0));
    }
    if (t === 'mcq') {
      q.options = ['q-oa', 'q-ob', 'q-oc', 'q-od'].map(id => $(id).value.trim());
      if (q.options.filter(Boolean).length < 2) return toast('Give at least two options');
      q.ans = $('q-ans').value;
    }
    if (t === 'tf') q.ans = $('q-ans').value;
    const si = +$('q-section').value;
    if (editing) {
      if (editing.si === si) paper.sections[si].qs[editing.qi] = q;
      else { paper.sections[editing.si].qs.splice(editing.qi, 1); paper.sections[si].qs.push(q); }
    } else paper.sections[si].qs.push(q);
    const keep = si;
    endEdit(); savePaper(); renderPaper(); fillSections(keep); $('q-text').focus();
  });

  function editQuestion(si, qi) {
    const q = paper.sections[si].qs[qi];
    editing = { si, qi };
    showSub('build');
    fillSections(si); setType(q.type);
    $('q-text').value = q.text || ''; $('q-heading').value = q.heading || '';
    $('q-marks').value = q.marks || 1; $('q-level').value = q.level || LEVELS[0];
    $('q-memo').value = q.memo || ''; $('q-lines').value = q.lines == null ? '' : q.lines;
    (q.options || ['', '', '', '']).forEach((v, i) => { $(['q-oa', 'q-ob', 'q-oc', 'q-od'][i]).value = v; });
    if (q.ans) $('q-ans').value = q.ans;
    $('q-add').textContent = 'Save question'; $('q-cancel').hidden = false; $('q-form-title').textContent = 'Edit question';
    $('q-text').focus(); $('q-form-title').scrollIntoView({ block: 'center' });
  }

  // ── sections ──
  $('s-add').addEventListener('click', () => {
    const title = $('s-title').value.trim();
    if (!title) return toast('Give the section a title');
    paper.sections.push({ title, instruction: $('s-inst').value.trim(), qs: [] });
    $('s-title').value = ''; $('s-inst').value = '';
    savePaper(); renderPaper(); fillSections(paper.sections.length - 1);
  });
  function moveIn(arr, i, d, after) {
    const j = i + d; if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]]; savePaper(); after();
  }

  function renderPaper() {
    const sum = paperMarks();
    const tot = $('p-total');
    tot.textContent = 'Total: ' + sum + ' / ' + paper.target + ' marks';
    tot.className = 'aa-total ' + (sum === paper.target ? 'aa-ok' : sum > paper.target ? 'aa-bad' : 'aa-warn');
    const sp = $('p-spread'); sp.textContent = '';
    const marksAt = l => { let m = 0; paper.sections.forEach(s => s.qs.forEach(q => { if (q.type !== 'context' && l.includes(q.level)) m += q.marks; })); return m; };
    const tile = (label, m, band) => el('div', { class: band ? 'aa-band' : '', text: label }, [el('b', { text: m + ' marks · ' + (sum ? Math.round(m / sum * 100) : 0) + '%' })]);
    BANDS.forEach(b => sp.appendChild(tile(b.name, marksAt(b.levels), true)));
    LEVELS.forEach(l => sp.appendChild(tile(l, marksAt([l]), false)));

    const host = $('p-list'); host.textContent = '';
    if (!paper.sections.length) { host.appendChild(el('div', { class: 'aa-card aa-empty-hint', text: 'No sections yet. Add one above, then add questions to it.' })); fillSections(); return; }
    paper.sections.forEach((s, si) => {
      const nums = numbered(si);
      const card = el('div', { class: 'aa-card aa-sec' });
      const tin = el('input', { class: 'aa-in', 'aria-label': 'Section ' + (si + 1) + ' title', value: s.title });
      tin.addEventListener('input', () => { s.title = tin.value; savePaper(); });
      tin.addEventListener('change', () => fillSections(curSec()));
      const iin = el('input', { class: 'aa-in', 'aria-label': 'Section ' + (si + 1) + ' instruction', value: s.instruction || '', placeholder: 'Instruction (italic)' });
      iin.addEventListener('input', () => { s.instruction = iin.value; savePaper(); });
      card.appendChild(el('div', { class: 'aa-sec-head' }, [
        el('div', { class: 'aa-sec-no', text: 'QUESTION ' + (si + 1) + ' · ' + mk(secMarks(s)) }),
        el('div', { class: 'aa-actions' }, [
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', 'aria-label': 'Move section up', text: '↑', onclick: () => moveIn(paper.sections, si, -1, () => { renderPaper(); fillSections(si - 1); }) }),
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', 'aria-label': 'Move section down', text: '↓', onclick: () => moveIn(paper.sections, si, 1, () => { renderPaper(); fillSections(si + 1); }) }),
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', text: 'Remove section', onclick: () => {
            if (s.qs.length && !confirm('Remove this section and its ' + s.qs.length + ' question(s)?')) return;
            paper.sections.splice(si, 1); endEdit(); savePaper(); renderPaper();
          } })
        ])
      ]));
      card.appendChild(el('div', { class: 'aa-row' }, [tin, iin]));
      if (!s.qs.length) card.appendChild(el('div', { class: 'aa-empty-hint', text: 'No questions in this section yet.' }));
      s.qs.forEach((q, qi) => {
        const label = q.type === 'context' ? 'Context note' : nums[qi] + ' · [' + q.marks + '] · ' + TYPE_LABEL[q.type] + ' · ' + q.level;
        const item = el('div', { class: 'aa-list-item' }, [
          el('div', { class: 'aa-who', text: label }),
          el('div', { class: 'aa-txt', text: (q.heading ? q.heading + '\n' : '') + q.text })
        ]);
        if (q.type === 'mcq') item.appendChild(el('div', { class: 'aa-txt', text: q.options.map((o, i) => o ? 'ABCD'[i] + '. ' + o : '').filter(Boolean).join('\n') + '\nAnswer: ' + q.ans }));
        if (q.type === 'tf') item.appendChild(el('div', { class: 'aa-txt', text: 'Answer: ' + q.ans }));
        if (q.type === 'written' && q.memo) item.appendChild(el('div', { class: 'aa-txt aa-memo-note', text: 'Memo: ' + q.memo }));
        item.appendChild(el('div', { class: 'aa-actions' }, [
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', 'aria-label': 'Move up', text: '↑', onclick: () => moveIn(s.qs, qi, -1, renderPaper) }),
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', 'aria-label': 'Move down', text: '↓', onclick: () => moveIn(s.qs, qi, 1, renderPaper) }),
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', text: 'Edit', onclick: () => editQuestion(si, qi) }),
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', text: 'Remove', onclick: () => { s.qs.splice(qi, 1); if (editing) endEdit(); savePaper(); renderPaper(); } })
        ]));
        card.appendChild(item);
      });
      host.appendChild(card);
    });
    fillSections(curSec());
  }

  // ── printing ──
  // Modelled on a write-on exam paper: cover page (header with logo top right,
  // info and name boxes, per-question analysis, numbered instructions), then
  // sections on a number | text | marks grid with ruled answer lines, a grand
  // total and extra writing space. The running header and page numbers come
  // from the named @page rule in the stylesheet.
  const td = (text, attrs) => el('td', attrs || {}, text == null ? [] : [document.createTextNode(text)]);
  const th = (text, attrs) => el('th', attrs || {}, [document.createTextNode(text)]);
  const ruledLines = n => { const w = el('div', { class: 'aa-lines' }); for (let i = 0; i < n; i++) w.appendChild(el('div', { class: 'aa-line' })); return w; };

  function printHead(pa, memo) {
    const left = el('div', { class: 'aa-cv-left' }, [
      paper.school ? el('div', { class: 'aa-cv-school', text: paper.school }) : el('span'),
      paper.grade ? el('div', { class: 'aa-cv-grade', text: paper.grade.toUpperCase() }) : el('span'),
      paper.subject ? el('div', { class: 'aa-cv-grade', text: paper.subject.toUpperCase() }) : el('span')
    ]);
    const top = el('div', { class: 'aa-cv-top' }, [left]);
    if (paper.logo) top.appendChild(el('img', { class: 'aa-print-logo', src: paper.logo, alt: '' }));
    pa.appendChild(top);
    pa.appendChild(el('div', { class: 'aa-cv-term', text: (paper.title || 'Assessment') + (memo ? ' — MEMORANDUM' : '') }));
  }

  function printCover(pa) {
    const o = paper.opts, sum = paperMarks();
    printHead(pa, false);
    pa.appendChild(el('table', { class: 'aa-box' }, [
      el('colgroup', {}, [el('col', { style: 'width:26%' }), el('col', { style: 'width:32%' }), el('col', { style: 'width:13%' }), el('col', { style: 'width:30%' })]), el('tr', {}, [th('Examiner:', { class: 'aa-lab' }), td(paper.examiner), th('Date:', { class: 'aa-lab' }), td(paper.date)]),
      el('tr', {}, [th('Moderator:', { class: 'aa-lab' }), td(paper.moderator), th('Time:', { class: 'aa-lab' }), td(paper.time)]),
      el('tr', {}, [td('', { class: 'aa-blank' }), td('', { class: 'aa-blank' }), th('Marks:', { class: 'aa-lab' }), td(String(sum))])
    ]));
    if (o.nameLine === 'yes') {
      pa.appendChild(el('table', { class: 'aa-box aa-box--name' }, [
        el('colgroup', {}, [el('col', { style: 'width:26%' }), el('col', { style: 'width:32%' }), el('col', { style: 'width:13%' }), el('col', { style: 'width:30%' })]), el('tr', {}, [th('Name and surname:', { class: 'aa-lab' }), td('', { colspan: '3' })]),
        el('tr', {}, [th('Educator:', { class: 'aa-lab' }), td(''), th('Class:', { class: 'aa-lab' }), td('')])
      ]));
    }
    if (o.analysis === 'yes' && paper.sections.length) {
      pa.appendChild(el('div', { class: 'aa-an-h', text: 'PER QUESTION ANALYSIS' }));
      const t = el('table', { class: 'aa-an' }, [el('tr', {}, [th('QUESTION', { class: 'aa-lab' }), th('TOPIC', { class: 'aa-lab' }), th('MARKS', { class: 'aa-lab' }), th('MARK ACHIEVED', { class: 'aa-lab' })])]);
      paper.sections.forEach((s, i) => t.appendChild(el('tr', {}, [td(String(i + 1), { class: 'aa-c' }), td(s.title), td(String(secMarks(s)), { class: 'aa-c' }), td('')])));
      t.appendChild(el('tr', { class: 'aa-an-total' }, [td('TOTAL', { colspan: '2', class: 'aa-c' }), td(String(sum), { class: 'aa-c' }), td('%', { class: 'aa-pct' })]));
      pa.appendChild(t);
    }
    const inst = (paper.inst || '').split('\n').map(x => x.trim()).filter(Boolean);
    if (inst.length) {
      pa.appendChild(el('div', { class: 'aa-inst-h', text: 'PLEASE READ THE FOLLOWING INSTRUCTIONS CAREFULLY:' }));
      pa.appendChild(el('ol', { class: 'aa-inst-list' }, inst.map(x => el('li', { text: x }))));
    }
    pa.lastElementChild.classList.add('aa-cover-end');
  }

  function printQuestions(pa) {
    const o = paper.opts, right = o.marksPos === 'right', lines = o.lines === 'on';
    paper.sections.forEach((s, si) => {
      // The section heading, its instruction, any leading context note and the
      // first question travel together, so a heading is never stranded at the
      // foot of a page.
      const keep = el('div', { class: 'aa-keep' });
      keep.appendChild(el('div', { class: 'aa-sh' }, [el('span', { text: 'QUESTION ' + (si + 1) }), el('span', { class: 'aa-sh-t', text: (s.title || '').toUpperCase() }), el('span', { class: 'aa-sh-m', text: mk(secMarks(s)) })]));
      if (s.instruction) keep.appendChild(el('div', { class: 'aa-si', text: s.instruction }));
      pa.appendChild(keep);
      let dest = keep;
      const nums = numbered(si);
      let run = []; // consecutive true/false numbers waiting for their answer grid
      const flushTf = () => {
        if (!run.length) return;
        const t = el('table', { class: 'aa-tf' }, [
          el('tr', {}, run.map(n => th(n))),
          el('tr', {}, run.map(() => td('')))
        ]);
        pa.appendChild(t); run = [];
      };
      s.qs.forEach((q, qi) => {
        if (q.type !== 'tf') flushTf();
        if (q.type === 'context') {
          const c = el('div', { class: 'aa-ctx' });
          if (q.heading) c.appendChild(el('div', { class: 'aa-ctx-h', text: q.heading }));
          c.appendChild(el('div', { class: 'aa-ctx-t', text: q.text }));
          dest.appendChild(c); return;
        }
        const row = el('div', { class: 'aa-q' + (right ? '' : ' aa-q--inline') }, [
          el('div', { class: 'aa-qn', text: nums[qi] + '.' }),
          el('div', { class: 'aa-qt', text: q.text + (right ? '' : '  [' + q.marks + ']') })
        ]);
        if (right) row.appendChild(el('div', { class: 'aa-qm', text: '(' + q.marks + ')' }));
        if (q.type === 'mcq') {
          const ol = el('div', { class: 'aa-opts' });
          q.options.forEach((v, i) => { if (v) ol.appendChild(el('div', { text: 'ABCD'[i] + '. ' + v })); });
          row.appendChild(ol);
        }
        dest.appendChild(row);
        if (q.type === 'tf') run.push(nums[qi]);
        if (q.type === 'written' && lines) { const n = autoLines(q); if (n) dest.appendChild(ruledLines(n)); }
        dest = pa;
      });
      flushTf();
    });
    pa.appendChild(el('div', { class: 'aa-grand', text: 'GRAND TOTAL: ' + mk(paperMarks()) }));
    if (o.extra === 'yes') {
      const x = el('div', { class: 'aa-extra' }, [el('div', { class: 'aa-extra-h', text: 'ADDITIONAL WRITING SPACE:' })]);
      x.appendChild(ruledLines(14)); pa.appendChild(x);
    }
  }

  function printMemo(pa) {
    printHead(pa, true);
    paper.sections.forEach((s, si) => {
      pa.appendChild(el('div', { class: 'aa-sh' }, [el('span', { text: 'QUESTION ' + (si + 1) }), el('span', { class: 'aa-sh-t', text: (s.title || '').toUpperCase() }), el('span', { class: 'aa-sh-m', text: mk(secMarks(s)) })]));
      const nums = numbered(si);
      const t = el('table', { class: 'aa-memo' }, [el('tr', {}, [th('Q'), th('Answer / guidance'), th('Marks')])]);
      s.qs.forEach((q, qi) => {
        if (q.type === 'context') return;
        const ans = q.type === 'mcq' ? q.ans + (q.options['ABCD'.indexOf(q.ans)] ? '. ' + q.options['ABCD'.indexOf(q.ans)] : '') : q.type === 'tf' ? q.ans : (q.memo || '');
        t.appendChild(el('tr', {}, [td(nums[qi]), td(ans), td(String(q.marks), { class: 'aa-num' })]));
      });
      pa.appendChild(t);
    });
    pa.appendChild(el('div', { class: 'aa-grand', text: 'GRAND TOTAL: ' + mk(paperMarks()) }));
  }

  function marginContent(tpl) {
    const parts = String(tpl).replace(/\s+/g, ' ').split(/(\{pages?\})/i).filter(x => x !== '');
    if (!parts.length) return '""';
    return parts.map(p => /^\{page\}$/i.test(p) ? 'counter(page)' : /^\{pages\}$/i.test(p) ? 'counter(pages)' : JSON.stringify(p)).join(' ');
  }

  function printPaper(memo) {
    const pa = $('print-area'); pa.textContent = '';
    pa.style.setProperty('--aa-pt', paper.opts.font + 'pt');
    // The running header and footer live in the page margin, so they are handed
    // to the stylesheet as content lists. {page} and {pages} become the page
    // counters, which is what makes "Page 2 of 5" possible.
    const root = document.documentElement.style;
    root.setProperty('--aa-hl', marginContent(paper.headerLeft || paper.subject || ''));
    root.setProperty('--aa-hr', marginContent(paper.headerRight || paper.grade || ''));
    root.setProperty('--aa-fc', marginContent(paper.footerText || '{page}'));
    if (memo) printMemo(pa);
    else {
      if (paper.opts.cover === 'yes') printCover(pa);
      printQuestions(pa);
    }
    window.print();
  }
  // ── save to / open from a file ──
  // The browser keeps the working copy; a file lets a teacher carry a paper to
  // another device or come back after clearing site data. Anything read from a
  // file is rebuilt field by field, never trusted as-is.
  function cleanQuestion(q) {
    if (!q || typeof q !== 'object') return null;
    const str = (v, max) => typeof v === 'string' ? v.slice(0, max) : '';
    const type = ['written', 'mcq', 'tf', 'context'].includes(q.type) ? q.type : 'written';
    const text = str(q.text, 3000).trim();
    if (!text) return null;
    const out = { type, text };
    if (type === 'context') { out.heading = str(q.heading, 300); return out; }
    out.marks = Math.min(100, Math.max(1, parseInt(q.marks, 10) || 1));
    out.level = LEVELS.includes(q.level) ? q.level : LEVELS[0];
    if (type === 'written') {
      out.memo = str(q.memo, 3000);
      out.lines = q.lines == null || q.lines === '' ? null : Math.min(20, Math.max(0, parseInt(q.lines, 10) || 0));
    }
    if (type === 'mcq') {
      const o = Array.isArray(q.options) ? q.options : [];
      out.options = [0, 1, 2, 3].map(i => str(o[i], 500));
      out.ans = 'ABCD'.includes(q.ans) && q.ans ? q.ans : 'A';
    }
    if (type === 'tf') out.ans = q.ans === 'False' ? 'False' : 'True';
    return out;
  }
  function sanitizePaper(raw) {
    if (!raw || typeof raw !== 'object' || !(Array.isArray(raw.sections) || Array.isArray(raw.qs))) return null;
    const str = (v, max) => typeof v === 'string' ? v.slice(0, max) : '';
    const o = migrate(raw), yn = v => v === 'no' ? 'no' : 'yes';
    const clean = { inst: str(o.inst, 5000), target: Math.min(1000, Math.max(0, parseInt(o.target, 10) || 0)) };
    ['school', 'grade', 'subject', 'title', 'headerLeft', 'headerRight', 'footerText', 'date', 'time', 'examiner', 'moderator'].forEach(k => { clean[k] = str(o[k], 300); });
    if (typeof o.logo === 'string' && o.logo.length < 4e6 && /^data:image\/(png|jpeg|webp|svg\+xml);base64,[A-Za-z0-9+\/=]+$/.test(o.logo)) clean.logo = o.logo;
    const op = o.opts || {};
    clean.opts = {
      font: ['10', '11', '12', '14'].includes(String(op.font)) ? String(op.font) : '12',
      marksPos: op.marksPos === 'inline' ? 'inline' : 'right',
      nameLine: yn(op.nameLine), lines: op.lines === 'off' ? 'off' : 'on', cover: yn(op.cover), analysis: yn(op.analysis), extra: yn(op.extra)
    };
    clean.sections = (Array.isArray(o.sections) ? o.sections : []).slice(0, 50).map(s => ({
      title: str(s && s.title, 200), instruction: str(s && s.instruction, 500),
      qs: (Array.isArray(s && s.qs) ? s.qs : []).slice(0, 300).map(cleanQuestion).filter(Boolean)
    }));
    return clean;
  }
  function applyPaperToForm() {
    Object.entries(FIELDS).forEach(([k, id]) => { $(id).value = paper[k] || ''; });
    $('p-target').value = paper.target;
    OPTS.forEach(([id, k]) => { $(id).value = paper.opts[k]; });
    $('p-logo').value = '';
    showLogo(); endEdit(); renderPaper(); fillSections();
  }
  $('p-save-file').addEventListener('click', () => {
    const name = (paper.title || paper.subject || 'paper').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'paper';
    const blob = new Blob([JSON.stringify({ magiclabPaper: 1, saved: new Date().toISOString(), paper }, null, 1)], { type: 'application/json' });
    const a = el('a', { href: URL.createObjectURL(blob), download: name + '.magiclab-paper.json' });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast('Saved to your downloads folder');
  });
  $('p-open-file').addEventListener('click', () => $('p-open-input').click());
  $('p-open-input').addEventListener('change', () => {
    const f = $('p-open-input').files[0];
    $('p-open-input').value = '';
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) return toast('That file is too large to be a saved paper');
    const r = new FileReader();
    r.onload = () => {
      let raw; try { raw = JSON.parse(r.result); } catch (e) { return toast('That is not a saved paper file'); }
      const clean = sanitizePaper(raw && raw.magiclabPaper ? raw.paper : raw);
      if (!clean) return toast('That is not a saved paper file');
      if (paper.sections.some(s => s.qs.length) && !confirm('Replace the paper you are working on with this file?')) return;
      paper = migrate(clean); savePaper(); applyPaperToForm();
      toast('Paper opened');
    };
    r.onerror = () => toast('Could not read that file');
    r.readAsText(f);
  });

  const hasQs = () => paper.sections.some(s => s.qs.some(q => q.type !== 'context'));
  $('p-print').addEventListener('click', () => hasQs() ? printPaper(false) : toast('Add a question first'));
  $('p-print-memo').addEventListener('click', () => hasQs() ? printPaper(true) : toast('Add a question first'));
  $('p-reset').addEventListener('click', () => {
    if (!paper.sections.length || !confirm('Remove all sections and questions?')) return;
    paper.sections = []; endEdit(); savePaper(); renderPaper();
  });
  renderPaper();

  lucide();
})();
