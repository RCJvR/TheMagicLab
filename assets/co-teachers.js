/* Co-teachers (Grading Grimoire phase 0, docs/marking-platform-spec.md §6.7).
   - MLCoTeachers.panel(cls, host, onLeft): the "Teachers" strip in a class's detail view.
     The owner invites with a one-time code and removes co-teachers; a co-teacher can leave.
   - MLCoTeachers.joinTile(onJoined): the "Join a class as co-teacher" tile in the class grid.
   Needs supabase-co-teachers.sql. Until that has been run, both stay hidden. */
(function () {
  'use strict';

  const auth = () => window.MagicLabAuth;
  const sb = () => auth() && auth()._supabase && auth()._supabase();
  const me = () => { const s = auth() && auth().getSession && auth().getSession(); return s && s.user && s.user.id; };

  function el(tag, attrs, kids) {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'text') n.textContent = v;
      else if (k === 'class') n.className = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    });
    (kids || []).forEach(c => c && n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return n;
  }
  // Missing table or function = the SQL has not been run yet.
  const notInstalled = err => !!err && /PGRST20[25]|42P01|42883|does not exist|Could not find/i.test((err.code || '') + ' ' + (err.message || ''));
  const friendly = err => String((err && err.message) || 'Something went wrong').replace(/^.*?:\s*(?=[A-Z])/, '');

  let ready = null;   // Promise<boolean>: is the co-teacher SQL installed?
  function installed() {
    if (!ready) ready = Promise.resolve(sb() ? sb().from('class_teachers').select('class_id').limit(1) : { error: { code: '42P01' } })
      .then(r => !notInstalled(r.error), () => false);
    return ready;
  }

  /* ── Class detail: Teachers strip ───────────────────────────────── */
  async function panel(cls, host, onLeft) {
    if (!host) return;
    host.hidden = true; host.textContent = '';
    if (!cls || !(await installed())) return;
    const { data, error } = await sb().rpc('get_class_teachers', { p_class: cls.id });
    if (error) { if (!notInstalled(error)) console.warn('[co-teachers]', error.message); return; }
    const uid = me(), owner = (data || []).find(t => t.is_owner), amOwner = owner && owner.teacher_id === uid;

    const list = el('ul', { class: 'ct-list', 'aria-label': 'Teachers of this class' });
    (data || []).forEach(t => {
      const li = el('li', { class: 'ct-person' }, [
        el('span', { class: 'ct-name', text: t.display_name || 'Teacher' }),
        el('span', { class: 'ct-role', text: t.is_owner ? 'owner' : 'co-teacher' })
      ]);
      if (amOwner && !t.is_owner) {
        li.appendChild(el('button', { class: 'ct-link', type: 'button', text: 'Remove',
          'aria-label': 'Remove ' + (t.display_name || 'this teacher') + ' from the class',
          onclick: async () => {
            if (!confirm('Remove ' + (t.display_name || 'this teacher') + ' from ' + cls.name + '? They will no longer see the class or its learners.')) return;
            const { error: e } = await sb().from('class_teachers').delete().eq('class_id', cls.id).eq('teacher_id', t.teacher_id);
            if (e) alert(friendly(e)); else panel(cls, host, onLeft);
          } }));
      }
      list.appendChild(li);
    });

    const actions = el('div', { class: 'ct-actions' });
    const out = el('div', { class: 'ct-out', 'aria-live': 'polite' });
    if (amOwner) {
      actions.appendChild(el('button', { class: 'back-btn', type: 'button', text: 'Invite a co-teacher', onclick: async ev => {
        const btn = ev.currentTarget;   // currentTarget is cleared once the handler awaits
        btn.disabled = true;
        const { data: code, error: e } = await sb().rpc('create_co_teacher_invite', { p_class: cls.id });
        btn.disabled = false;
        out.textContent = '';
        if (e) { out.appendChild(el('span', { class: 'ct-err', text: friendly(e) })); return; }
        const codeBtn = el('button', { class: 'ct-code', type: 'button', text: code, title: 'Copy the code',
          onclick: () => navigator.clipboard && navigator.clipboard.writeText(code).then(() => { codeBtn.dataset.copied = '1'; codeBtn.title = 'Copied'; }) });
        out.append(codeBtn, el('span', { class: 'ct-hint', text: 'Give this code to the other teacher. They enter it under "Join a class as co-teacher" in their own dashboard. It works once, for 7 days.' }));
      } }));
    } else {
      actions.appendChild(el('button', { class: 'ct-link', type: 'button', text: 'Leave this class', onclick: async () => {
        if (!confirm('Stop co-teaching ' + cls.name + '? You will need a new code from the owner to come back.')) return;
        const { error: e } = await sb().from('class_teachers').delete().eq('class_id', cls.id).eq('teacher_id', uid);
        if (e) alert(friendly(e)); else if (onLeft) onLeft();
      } }));
    }

    host.append(el('div', { class: 'ct-head', text: 'Teachers' }), list, actions, out);
    host.hidden = false;
  }

  /* ── Class grid: Join tile ──────────────────────────────────────── */
  function joinTile(onJoined) {
    const tile = el('div', { class: 'create-class-btn ct-join', hidden: '' });
    function closed() {
      tile.textContent = '';
      tile.appendChild(el('button', { class: 'ct-join-open', type: 'button', text: 'Join a class as co-teacher', onclick: open }));
    }
    function open() {
      tile.textContent = '';
      const input = el('input', { class: 'form-input ct-input', type: 'text', maxlength: '12', autocomplete: 'off', spellcheck: 'false',
        placeholder: 'Code', 'aria-label': 'Co-teacher code from the class owner' });
      const msg = el('div', { class: 'ct-hint', 'aria-live': 'polite' });
      const join = el('button', { class: 'back-btn', type: 'submit', text: 'Join' });
      const form = el('form', { class: 'ct-join-form', onsubmit: async ev => {
        ev.preventDefault();
        const code = input.value.replace(/\s/g, '').toUpperCase();
        if (code.length !== 8) { msg.textContent = 'The code has 8 letters and numbers.'; input.focus(); return; }
        join.disabled = true; msg.textContent = 'Joining…';
        const { error } = await sb().rpc('accept_co_teacher_invite', { p_code: code });
        join.disabled = false;
        if (error) { msg.textContent = friendly(error); input.focus(); return; }
        msg.textContent = 'Joined.';
        if (onJoined) onJoined();
      } }, [input, join, el('button', { class: 'ct-link', type: 'button', text: 'Cancel', onclick: closed })]);
      tile.append(form, msg);
      input.focus();
    }
    closed();
    installed().then(ok => { if (ok) tile.hidden = false; });
    return tile;
  }

  window.MLCoTeachers = { panel, joinTile, installed };
})();
