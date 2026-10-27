/* Shared helpers for the teacher classroom tools: browser storage, small DOM
   builder, file save/open, and the class lists every tool draws on.
   Everything stays in this browser's localStorage (keys aa:*); nothing is sent
   to a server. Loaded before the tools that use it. */
(function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const store = {
    get(k, d) { try { const v = localStorage.getItem('aa:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('aa:' + k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem('aa:' + k); } catch (e) {} }
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
    setTimeout(() => t.remove(), 2200);
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast('Copied'); }
    catch (e) { toast('Copy failed. Select the text and copy it manually.'); }
  }
  const uid = () => Math.random().toString(36).slice(2, 9);
  const str = (v, max) => typeof v === 'string' ? v.slice(0, max) : '';
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const csv = rows => rows.map(r => r.map(c => '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"').join('\t')).join('\n');
  // CAPS achievement levels from a percentage.
  const capsLevel = pct => pct >= 80 ? 7 : pct >= 70 ? 6 : pct >= 60 ? 5 : pct >= 50 ? 4 : pct >= 40 ? 3 : pct >= 30 ? 2 : 1;

  function downloadJson(kind, name, data) {
    const base = String(name || kind).replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || kind;
    const blob = new Blob([JSON.stringify({ magiclab: kind, saved: new Date().toISOString(), data }, null, 1)], { type: 'application/json' });
    const a = el('a', { href: URL.createObjectURL(blob), download: base + '.magiclab-' + kind + '.json' });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast('Saved to your downloads folder');
  }
  // Wire a button and a hidden file input to open one kind of saved file.
  function wireOpen(buttonId, inputId, kind, apply) {
    $(buttonId).addEventListener('click', () => $(inputId).click());
    $(inputId).addEventListener('change', () => {
      const f = $(inputId).files[0]; $(inputId).value = '';
      if (!f) return;
      if (f.size > 8 * 1024 * 1024) return toast('That file is too large');
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

  // Print something other than a paper (results, registers) through the same
  // print area and page rules the Paper Assembler uses.
  function printDoc(build, o) {
    o = o || {};
    const pa = $('print-area'); pa.textContent = '';
    pa.style.setProperty('--aa-pt', (o.font || 11) + 'pt');
    pa.style.setProperty('page', o.landscape ? 'aal' : 'aa');
    const r = document.documentElement.style;
    r.setProperty('--aa-hl', '""'); r.setProperty('--aa-hr', '""'); r.setProperty('--aa-fc', 'counter(page)');
    build(pa);
    window.print();
  }

  /* ── class lists ──────────────────────────────────────────────────────── */
  // [{ id, name, learners: [names] }]. Names are how records are matched in
  // every tool, so they are kept unique within a class.
  function cleanLearners(list) {
    const seen = new Map(), out = [];
    (Array.isArray(list) ? list : []).forEach(n => {
      let name = str(n, 80).trim(); if (!name) return;
      const k = name.toLowerCase();
      if (seen.has(k)) { const c = seen.get(k) + 1; seen.set(k, c); name += ' (' + c + ')'; } else seen.set(k, 1);
      out.push(name);
    });
    return out.slice(0, 200);
  }
  function cleanClasses(list) {
    return (Array.isArray(list) ? list : []).slice(0, 40).map(c => ({
      id: str(c && c.id, 20) || uid(), name: str(c && c.name, 80).trim() || 'Class', learners: cleanLearners(c && c.learners)
    }));
  }
  let classes = cleanClasses(store.get('classes', []));
  let current = store.get('class-current', null);
  const subscribers = [];
  const notify = () => subscribers.forEach(f => { try { f(); } catch (e) { /* one tool failing must not stop the rest */ } });
  const getClass = id => classes.find(c => c.id === id) || null;
  const currentClass = () => getClass(current) || classes[0] || null;
  function saveClasses() { store.set('classes', classes); notify(); }
  function setCurrent(id) { current = id; store.set('class-current', id); notify(); }

  function fillClassSelect(sel) {
    const cur = currentClass();
    sel.textContent = '';
    if (!classes.length) sel.appendChild(el('option', { value: '', text: 'No class yet. Press Manage class lists.' }));
    classes.forEach(c => sel.appendChild(el('option', { value: c.id, text: c.name + ' (' + c.learners.length + ')' })));
    if (cur) sel.value = cur.id;
  }
  // Bind a <select> to the shared current class; onChange runs after any change
  // to the class lists or the selection, so each tool just re-renders.
  function bindClassSelect(sel, onChange) {
    const refresh = () => { fillClassSelect(sel); if (onChange) onChange(currentClass()); };
    sel.addEventListener('change', () => { if (sel.value) setCurrent(sel.value); });
    subscribers.push(refresh);
    refresh();
  }

  let dlg = null;
  function manage(focusId) {
    if (!dlg) {
      dlg = el('dialog', { class: 'aa-dlg', 'aria-label': 'Class lists' });
      dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
    }
    let editId = focusId || (currentClass() && currentClass().id) || '';
    const draw = () => {
      dlg.textContent = '';
      const sel = el('select', { class: 'aa-in', id: 'mlt-dlg-sel', 'aria-label': 'Choose a class to edit' });
      classes.forEach(c => sel.appendChild(el('option', { value: c.id, text: c.name })));
      sel.appendChild(el('option', { value: '', text: '+ New class' }));
      sel.value = getClass(editId) ? editId : '';
      sel.addEventListener('change', () => { editId = sel.value; draw(); });
      const c = getClass(editId);
      const name = el('input', { class: 'aa-in', id: 'mlt-dlg-name', placeholder: 'e.g. 9A Coding and Robotics', value: c ? c.name : '' });
      const names = el('textarea', { class: 'aa-in', id: 'mlt-dlg-names', rows: '12', placeholder: 'One learner per line. Paste a column from a spreadsheet.' });
      names.value = c ? c.learners.join('\n') : '';
      const save = el('button', { class: 'aa-btn aa-btn--primary', type: 'button', text: c ? 'Save class' : 'Create class', onclick: () => {
        const n = cleanLearners(names.value.split('\n'));
        const nm = name.value.trim() || 'Class';
        if (c) { c.name = nm; c.learners = n; } else { const nc = { id: uid(), name: nm, learners: n }; classes.push(nc); editId = nc.id; current = nc.id; store.set('class-current', current); }
        saveClasses(); toast('Class saved'); draw();
      } });
      const del = c ? el('button', { class: 'aa-btn', type: 'button', text: 'Delete class', onclick: () => {
        if (!confirm('Delete "' + c.name + '"? Marks and logs kept for this class stay in the browser but will no longer show.')) return;
        classes = classes.filter(x => x.id !== c.id);
        if (current === c.id) { current = classes[0] ? classes[0].id : null; store.set('class-current', current); }
        editId = current || ''; saveClasses(); draw();
      } }) : el('span');
      dlg.appendChild(el('div', { class: 'aa-dlg-in' }, [
        el('h2', { class: 'aa-dlg-h', text: 'Class lists' }),
        el('p', { class: 'aa-hint', text: 'These lists are used by the rubric marking, random picker, class log and assessment tracker. They are kept only in this browser. Records are matched on the name, so rename a learner carefully.' }),
        el('label', { class: 'aa-lbl', for: 'mlt-dlg-sel', text: 'Class' }), sel,
        el('label', { class: 'aa-lbl', for: 'mlt-dlg-name', text: 'Class name', style: 'margin-top:12px' }), name,
        el('label', { class: 'aa-lbl', for: 'mlt-dlg-names', text: 'Learners (first name and initial is plenty)', style: 'margin-top:12px' }), names,
        el('div', { class: 'aa-actions' }, [save, del, el('button', { class: 'aa-btn', type: 'button', text: 'Close', onclick: () => dlg.close() })])
      ]));
    };
    draw();
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }

  /* ── learner tags and pairing rules ───────────────────────────────────── */
  // Per class: { tags: { name: ['strong reader', …] }, apart: [[a, b]], together: [[a, b]] }.
  // Groups and seating read them; like the lists, they stay in this browser.
  function rulesFor(cls) {
    const r = (store.get('class-rules', {})[cls && cls.id]) || {}, has = new Set(cls ? cls.learners : []);
    const pairs = list => (Array.isArray(list) ? list : []).filter(p => Array.isArray(p) && p.length === 2 && has.has(p[0]) && has.has(p[1]) && p[0] !== p[1]);
    const tags = {};
    Object.keys(r.tags || {}).forEach(n => { if (has.has(n)) tags[n] = (r.tags[n] || []).map(t => str(t, 30).trim()).filter(Boolean).slice(0, 6); });
    return { tags, apart: pairs(r.apart), together: pairs(r.together) };
  }
  function saveRules(cls, r) { const all = store.get('class-rules', {}); all[cls.id] = r; store.set('class-rules', all); notify(); }
  const tagList = r => [...new Set(Object.values(r.tags).flat())].sort((a, b) => a.localeCompare(b));

  let rdlg = null;
  function manageRules() {
    const cls = currentClass();
    if (!cls || !cls.learners.length) return toast('Add a class list first');
    if (!rdlg) {
      rdlg = el('dialog', { class: 'aa-dlg aa-dlg--wide', 'aria-label': 'Tags and seating rules' });
      rdlg.addEventListener('click', e => { if (e.target === rdlg) rdlg.close(); });
      document.body.appendChild(rdlg);
    }
    const r = rulesFor(cls);
    const draw = () => {
      rdlg.textContent = '';
      const dl = el('datalist', { id: 'mlt-tag-list' }); tagList(r).forEach(t => dl.appendChild(el('option', { value: t })));
      const rows = cls.learners.map(n => el('tr', {}, [
        el('td', { text: n }),
        el('td', {}, [el('input', { class: 'aa-in', list: 'mlt-tag-list', 'aria-label': 'Tags for ' + n, placeholder: 'e.g. strong reader', value: (r.tags[n] || []).join(', '),
          onchange: e => { const v = e.target.value.split(',').map(s => s.trim()).filter(Boolean); if (v.length) r.tags[n] = v; else delete r.tags[n]; } })])
      ]));
      const pairBox = (key, title, hint) => {
        const a = el('select', { class: 'aa-in', 'aria-label': title + ': first learner' }), b = el('select', { class: 'aa-in', 'aria-label': title + ': second learner' });
        cls.learners.forEach(n => { a.appendChild(el('option', { value: n, text: n })); b.appendChild(el('option', { value: n, text: n })); });
        if (cls.learners[1]) b.value = cls.learners[1];
        const list = el('ul', { class: 'aa-pairs' });
        r[key].forEach((p, i) => list.appendChild(el('li', {}, [el('span', { text: p[0] + '  ·  ' + p[1] }),
          el('button', { class: 'aa-btn aa-btn--sm', type: 'button', text: 'Remove', 'aria-label': 'Remove ' + p[0] + ' and ' + p[1], onclick: () => { r[key].splice(i, 1); draw(); } })])));
        return el('div', { class: 'aa-pairbox' }, [
          el('h3', { class: 'aa-lbl', text: title }), el('p', { class: 'aa-hint', text: hint }),
          el('div', { class: 'aa-row' }, [a, b, el('button', { class: 'aa-btn', type: 'button', text: 'Add', onclick: () => {
            if (a.value === b.value) return toast('Choose two different learners');
            if (r[key].some(p => (p[0] === a.value && p[1] === b.value) || (p[0] === b.value && p[1] === a.value))) return toast('That pair is already there');
            r[key].push([a.value, b.value]); draw();
          } })]), list
        ]);
      };
      rdlg.appendChild(el('div', { class: 'aa-dlg-in' }, [
        el('h2', { class: 'aa-dlg-h', text: 'Tags and rules — ' + cls.name }),
        el('p', { class: 'aa-hint', text: 'Used by Groups and Seating. Kept only in this browser. Use neutral working labels (e.g. "strong reader", "needs front row"), not sensitive information.' }),
        pairBox('apart', 'Keep apart', 'Never in the same group, and not seated next to or behind each other.'),
        pairBox('together', 'Keep together', 'In the same group, and seated side by side where possible.'),
        el('h3', { class: 'aa-lbl', text: 'Tags', style: 'margin-top:14px' }),
        el('p', { class: 'aa-hint', text: 'Separate several tags with commas. Groups can spread a tag evenly across the groups.' }),
        dl, el('div', { class: 'aa-tagtable' }, [el('table', {}, [el('tbody', {}, rows)])]),
        el('div', { class: 'aa-actions' }, [
          el('button', { class: 'aa-btn aa-btn--primary', type: 'button', text: 'Save', onclick: () => { saveRules(cls, r); toast('Tags and rules saved'); rdlg.close(); } }),
          el('button', { class: 'aa-btn', type: 'button', text: 'Cancel', onclick: () => rdlg.close() })
        ])
      ]));
    };
    draw();
    if (typeof rdlg.showModal === 'function') rdlg.showModal(); else rdlg.setAttribute('open', '');
  }

  /* ── big screen ───────────────────────────────────────────────────────── */
  // Show the given nodes full screen for the projector, on a plain page with
  // no dashboard around them. The nodes are moved, not copied (so their
  // buttons keep working), and go back where they came from on close.
  // extras: buttons for the top bar. Returns close().
  function bigScreen(title, nodes, extras) {
    const ov = el('div', { class: 'aa-big', role: 'dialog', 'aria-modal': 'true', 'aria-label': title });
    const body = el('div', { class: 'aa-big-body' });
    const homes = nodes.map(n => [n, n.parentNode, n.nextSibling]);
    let done = false;
    const close = () => {
      if (done) return; done = true;
      homes.forEach(([n, p, s]) => { if (p) p.insertBefore(n, s); });   // nodes built just for the big screen have no home
      document.removeEventListener('keydown', onKey); document.removeEventListener('fullscreenchange', onFs);
      ov.remove();
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
    const onKey = e => { if (e.key === 'Escape' && !document.fullscreenElement) close(); };
    const onFs = () => { if (!document.fullscreenElement) close(); };   // Esc in full screen leaves both
    ov.appendChild(el('div', { class: 'aa-big-bar' }, [el('div', { class: 'aa-big-title', text: title })].concat(extras || [], [
      el('button', { class: 'aa-btn', type: 'button', text: 'Close', onclick: close })])));
    ov.appendChild(body);
    nodes.forEach(n => body.appendChild(n));
    document.body.appendChild(ov);
    document.addEventListener('keydown', onKey);
    if (ov.requestFullscreen) ov.requestFullscreen().then(() => document.addEventListener('fullscreenchange', onFs)).catch(() => {});
    return close;
  }

  window.MLT = {
    $, el, store, toast, copy, uid, str, today, csv, capsLevel, downloadJson, wireOpen, printDoc, bigScreen,
    classes: { all: () => classes, current: currentClass, get: getClass, bind: bindClassSelect, manage, replaceAll(list) { classes = cleanClasses(list); if (!getClass(current)) current = classes[0] ? classes[0].id : null; saveClasses(); }, cleanLearners, cleanClasses },
    rules: { get: rulesFor, save: saveRules, tags: tagList, manage: manageRules }
  };
})();
