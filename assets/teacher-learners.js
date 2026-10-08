/* Learners and class lists for the Timetable Planner.
   Add learners to the classes you set up, tidy the lists, and print a class list
   per class (with optional blank columns for registers or marks).
   Learner details stay in this browser only. Depends on teacher-shared.js
   (window.MLT) and teacher-timetable.js (window.MLT_TT). */
(function () {
  'use strict';
  const M = window.MLT, T = window.MLT_TT;
  if (!M || !T) return;
  const { $, el, toast, uid, str, csv } = M;
  const S = () => T.S();
  const coll = (a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' });
  const cmp = (a, b) => coll(a.surname, b.surname) || coll(a.name, b.name);
  const learnersOf = cid => S().learners.filter(l => l.cls === cid).sort(cmp);
  const lbl = (text, forId) => el('label', { class: 'aa-lbl', for: forId, text });
  const btn = (text, onclick, cls) => el('button', { class: 'aa-btn' + (cls ? ' ' + cls : ''), type: 'button', text, onclick });
  const field = (label, id, control) => el('div', {}, [lbl(label, id), control]);
  const persist = () => T.save();
  let cur = '';                                  // class being edited
  let opts = Object.assign({ order: 'sn', scope: 'one', orient: 'landscape', number: 'no', blank: 12, heads: '', teacher: '', rows: 0 }, M.store.get('cl-opts', {}));
  const saveOpts = () => M.store.set('cl-opts', opts);

  const PREFIX = new Set(['van', 'der', 'den', 'de', 'du', 'le', 'la', 'von', 'ter', 'te', 'op', 'di', 'da', 'dos', 'du', 'mac', 'mc']);
  // One learner per line. A comma always means "Surname, First name"; a tab
  // splits spreadsheet columns in the chosen order (plus a learner number);
  // otherwise the words are split by the chosen order.
  function parse(text, order) {
    const out = [], skipped = [];
    text.split('\n').forEach(raw => {
      const line = raw.trim(); if (!line) return;
      let surname = '', name = '', ref = '';
      if (line.includes('\t')) {
        const c = line.split('\t').map(x => x.trim()); ref = c[2] || '';
        if (order === 'sn') { surname = c[0] || ''; name = c[1] || ''; } else { name = c[0] || ''; surname = c[1] || ''; }
      } else if (line.includes(',')) {
        const i = line.indexOf(','); surname = line.slice(0, i).trim(); name = line.slice(i + 1).trim();
      } else {
        const w = line.split(/\s+/);
        if (w.length === 1) surname = w[0];
        else if (order === 'sn') {
          // a surname may start with prefixes: "van der Merwe Pieter"
          let i = 0; while (i < w.length - 2 && PREFIX.has(w[i].toLowerCase())) i++;
          surname = w.slice(0, i + 1).join(' '); name = w.slice(i + 1).join(' ');
        } else {
          // ...or end with them: "Pieter van der Merwe"
          let i = w.length - 1; while (i > 1 && PREFIX.has(w[i - 1].toLowerCase())) i--;
          name = w.slice(0, i).join(' '); surname = w.slice(i).join(' ');
        }
      }
      surname = str(surname, 60).trim(); name = str(name, 60).trim();
      if (!surname && !name) { skipped.push(line); return; }
      out.push({ surname, name, ref: str(ref, 20).trim() });
    });
    return { out, skipped };
  }

  function render() {
    const host = $('tab-timetable-learners'); if (!host) return;
    host.textContent = '';
    const s = S();
    if (!s.classes.length) { host.appendChild(el('div', { class: 'aa-card aa-empty-hint', text: 'Add your classes first (step 3), then add their learners here.' })); return; }
    if (!s.classes.some(c => c.id === cur)) cur = s.classes[0].id;
    const cls = T.byId(s.classes, cur), list = learnersOf(cur);

    host.appendChild(el('div', { class: 'aa-privacy' }, [el('b', { text: 'Learners\' information. ' }), document.createTextNode('Names are kept only in this browser on this computer and are never sent to The Magic Lab or anyone else. Only names and an optional learner number are kept. Print lists and saved files carry names, so keep them somewhere secure.')]));

    // class chooser
    const sel = el('select', { class: 'aa-in', id: 'ln-class' }, s.classes.map(c => el('option', { value: c.id, text: c.name + ' (' + learnersOf(c.id).length + ')' }))); sel.value = cur;
    sel.addEventListener('change', () => { cur = sel.value; render(); });
    host.appendChild(el('div', { class: 'aa-card' }, [el('div', { class: 'aa-row' }, [field('Class', 'ln-class', sel)]),
      el('div', { class: 'aa-hint', text: s.learners.length + ' learner' + (s.learners.length === 1 ? '' : 's') + ' across ' + s.classes.filter(c => learnersOf(c.id).length).length + ' of ' + s.classes.length + ' classes.' })]));

    // add learners
    const fmt = el('select', { class: 'aa-in', id: 'ln-order' }, [el('option', { value: 'sn', text: 'Surname first (Smith, Anna  or  Smith Anna)' }), el('option', { value: 'ns', text: 'First name first (Anna Smith)' })]); fmt.value = opts.order;
    fmt.addEventListener('change', () => { opts.order = fmt.value; saveOpts(); });
    const ta = el('textarea', { class: 'aa-in', id: 'ln-paste', rows: '6', placeholder: 'One learner per line. Paste straight from a spreadsheet: columns are surname, first name, learner number.' });
    host.appendChild(el('div', { class: 'aa-section-title', text: 'Add learners to ' + cls.name }));
    host.appendChild(el('div', { class: 'aa-card' }, [
      el('div', { class: 'aa-row' }, [field('Names are written as', 'ln-order', fmt)]), lbl('Learners', 'ln-paste'), ta,
      el('div', { class: 'aa-actions' }, [btn('Add to ' + cls.name, () => {
        const { out, skipped } = parse(ta.value, fmt.value);
        if (!out.length) return toast('Paste some names first');
        const have = new Set(list.map(l => (l.surname + '|' + l.name).toLowerCase())); let added = 0, dup = 0;
        out.forEach(l => { const k = (l.surname + '|' + l.name).toLowerCase(); if (have.has(k)) { dup++; return; } have.add(k); s.learners.push({ id: uid(), cls: cur, surname: l.surname, name: l.name, ref: l.ref }); added++; });
        ta.value = ''; persist(); render();
        toast(added + ' added' + (dup ? ', ' + dup + ' already in the class' : '') + (skipped.length ? ', ' + skipped.length + ' skipped' : ''));
      }, 'aa-btn--primary')])
    ]));

    // the class
    host.appendChild(el('div', { class: 'aa-section-title', text: cls.name + ' (' + list.length + ')' }));
    const card = el('div', { class: 'aa-card' });
    if (!list.length) card.appendChild(el('div', { class: 'aa-empty-hint', text: 'No learners in this class yet.' }));
    else {
      const t = el('table', { class: 'aa-grid' }); t.appendChild(el('tr', {}, ['#', 'Surname', 'First name', 'Learner number', 'Class', ''].map(h => el('th', { text: h }))));
      const edit = (l, key, max, label) => { const i = el('input', { class: 'aa-in', value: l[key], maxlength: String(max), 'aria-label': label + ' for learner ' + (l.name || l.surname) }); i.addEventListener('change', () => { l[key] = i.value.trim().slice(0, max); if (!l.surname && !l.name) { l[key] = ''; return render(); } persist(); render(); }); return i; };
      list.forEach((l, i) => {
        const mv = el('select', { class: 'aa-in', 'aria-label': 'Move ' + (l.name || l.surname) + ' to another class' }, s.classes.map(c => el('option', { value: c.id, text: c.name }))); mv.value = l.cls;
        mv.addEventListener('change', () => { l.cls = mv.value; persist(); render(); });
        t.appendChild(el('tr', {}, [el('td', { class: 'aa-c', text: String(i + 1) }), el('td', {}, [edit(l, 'surname', 60, 'Surname')]), el('td', {}, [edit(l, 'name', 60, 'First name')]), el('td', {}, [edit(l, 'ref', 20, 'Number')]), el('td', {}, [mv]),
          el('td', {}, [btn('Delete', () => { s.learners = s.learners.filter(x => x.id !== l.id); persist(); render(); }, 'aa-btn--sm')])]));
      });
      card.appendChild(el('div', { class: 'aa-tbl-wrap' }, [t]));
      card.appendChild(el('div', { class: 'aa-actions' }, [
        btn('Copy for Excel', () => M.copy(csv([['No.', 'Surname', 'First name', 'Learner number']].concat(list.map((l, i) => [i + 1, l.surname, l.name, l.ref]))))),
        btn('Use in my other tools', () => toMyLists(cls, list)),
        btn('Remove everyone from ' + cls.name, () => { if (!confirm('Remove all ' + list.length + ' learners from ' + cls.name + '?')) return; s.learners = s.learners.filter(l => l.cls !== cur); persist(); render(); })
      ]));
      card.appendChild(el('div', { class: 'aa-hint', text: '"Use in my other tools" copies this class into your class lists, so the rubric marking, random picker, class log and assessment tracker can use it.' }));
    }
    host.appendChild(card);

    renderPrint(host);
  }

  function toMyLists(cls, list) {
    const all = M.classes.all().map(c => ({ id: c.id, name: c.name, learners: c.learners.slice() }));
    const names = list.map(l => (l.name + ' ' + l.surname).trim());
    const ex = all.find(c => c.name === cls.name);
    if (ex) { if (!confirm('You already have a class list called "' + cls.name + '". Replace its learners with these ' + names.length + '?')) return; ex.learners = names; }
    else all.push({ id: uid(), name: cls.name, learners: names });
    M.classes.replaceAll(all); toast('Added to your class lists');
  }

  /* ── printing ────────────────────────────────────────────────────────── */
  function renderPrint(host) {
    const s = S();
    host.appendChild(el('div', { class: 'aa-section-title', text: 'Print class lists' }));
    const sel = (id, label, key, options) => { const c = el('select', { class: 'aa-in', id }, options.map(([v, t]) => el('option', { value: v, text: t }))); c.value = String(opts[key]); c.addEventListener('change', () => { opts[key] = c.value; saveOpts(); }); return field(label, id, c); };
    const num = (id, label, key, max) => { const c = el('input', { class: 'aa-in', id, type: 'number', min: '0', max: String(max), value: opts[key] }); c.addEventListener('change', () => { opts[key] = Math.min(max, Math.max(0, parseInt(c.value, 10) || 0)); c.value = opts[key]; saveOpts(); }); return field(label, id, c); };
    const txt = (id, label, key, ph) => { const c = el('input', { class: 'aa-in', id, value: opts[key], placeholder: ph, maxlength: '200' }); c.addEventListener('change', () => { opts[key] = c.value.trim().slice(0, 200); saveOpts(); }); return field(label, id, c); };
    host.appendChild(el('div', { class: 'aa-card' }, [
      el('div', { class: 'aa-row' }, [sel('ln-scope', 'Print', 'scope', [['one', 'This class'], ['all', 'Every class that has learners']]), sel('ln-orient', 'Page', 'orient', [['landscape', 'Landscape (room for columns)'], ['portrait', 'Portrait']]), sel('ln-num', 'Learner number column', 'number', [['no', 'Leave out'], ['yes', 'Include']])]),
      el('div', { class: 'aa-row' }, [num('ln-blank', 'Blank columns (for ticks, marks, dates)', 'blank', 25), num('ln-extra', 'Extra empty rows at the end', 'rows', 20), txt('ln-teacher', 'Class teacher (optional)', 'teacher', 'Printed under the class name')]),
      txt('ln-heads', 'Column headings (optional, separated by commas)', 'heads', 'e.g. Mon, Tue, Wed, Thu, Fri'),
      el('div', { class: 'aa-actions' }, [btn('Print', () => {
        const ids = opts.scope === 'all' ? s.classes.filter(c => learnersOf(c.id).length).map(c => c.id) : [cur];
        if (!ids.length || !ids.some(id => learnersOf(id).length)) return toast('There are no learners to print yet');
        printLists(ids);
      }, 'aa-btn--primary')]),
      el('div', { class: 'aa-hint', text: 'Lists are in alphabetical order by surname. With blank columns you get a register or mark sheet; set them to 0 for a plain list.' })
    ]));
  }
  function printLists(ids) {
    const s = S(), heads = String(opts.heads).split(',').map(x => x.trim());
    M.printDoc(pa => {
      ids.forEach((cid, i) => {
        const c = T.byId(s.classes, cid), ls = learnersOf(cid); if (!c || !ls.length) return;
        const t = el('table', { class: 'aa-cl' });
        const head = el('tr', {}, [el('th', { class: 'aa-cl-n', text: 'No.' }), el('th', { text: 'Surname' }), el('th', { text: 'First name' })].concat(opts.number === 'yes' ? [el('th', { text: 'Number' })] : []));
        for (let b = 0; b < opts.blank; b++) head.appendChild(el('th', { class: 'aa-cl-b', text: heads[b] || '' }));
        t.appendChild(el('thead', {}, [head]));
        const body = el('tbody');
        const row = (n, l) => { const tr = el('tr', {}, [el('td', { class: 'aa-cl-n', text: n ? String(n) : '' }), el('td', { text: l ? l.surname : '' }), el('td', { text: l ? l.name : '' })].concat(opts.number === 'yes' ? [el('td', { text: l ? l.ref : '' })] : [])); for (let b = 0; b < opts.blank; b++) tr.appendChild(el('td', { class: 'aa-cl-b' })); return tr; };
        ls.forEach((l, k) => body.appendChild(row(k + 1, l)));
        for (let k = 0; k < opts.rows; k++) body.appendChild(row(ls.length + k + 1, null));
        t.appendChild(body);
        pa.appendChild(el('div', { class: 'aa-tt-page' + (i ? ' aa-tt-page--next' : '') }, [
          el('h1', { class: 'aa-pr-h', text: (s.school ? s.school + ' · ' : '') + 'Class list: ' + c.name }),
          el('div', { class: 'aa-pr-sub', text: [opts.teacher && 'Class teacher: ' + opts.teacher, ls.length + ' learner' + (ls.length === 1 ? '' : 's'), s.title].filter(Boolean).join('  ·  ') }),
          t
        ]));
      });
    }, { landscape: opts.orient === 'landscape', font: 10 });
  }

  T.register('learners', render);
  T.refresh();
})();
