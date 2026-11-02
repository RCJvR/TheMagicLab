// ============================================================
// THE MAGIC LAB — verify-chat.js
// The applicant's side of the teacher-verification chat. Someone whose
// teacher request is pending sees the admin's messages and can reply.
// Needs the tables and functions from supabase-verify-chat.sql.
//   MLVerifyChat.mount(containerElement)
// ============================================================
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function sb() { return window.MagicLabAuth && window.MagicLabAuth._supabase && window.MagicLabAuth._supabase(); }

  var CSS = '.vc{width:100%;max-width:520px;margin:18px auto 0;text-align:left;border:1px solid var(--line,rgba(255,255,255,.14));border-radius:12px;background:var(--ink-850,#10162b);padding:16px}' +
    '.vc h3{margin:0 0 4px;font-size:16px;color:var(--paper,#fff)}.vc p.vc-s{margin:0 0 12px;font-size:13.5px;line-height:1.5;color:var(--text-2,#aab)}' +
    '.vc-log{display:flex;flex-direction:column;gap:8px;max-height:300px;overflow-y:auto;margin-bottom:12px}' +
    '.vc-m{max-width:86%;padding:8px 12px;border-radius:10px;font-size:14px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere}' +
    '.vc-m small{display:block;margin-top:3px;font-size:11.5px;opacity:.65}' +
    '.vc-in{align-self:flex-start;background:var(--ink-900,#080c1a);border:1px solid var(--line-hard,rgba(255,255,255,.22));color:var(--text,#eee)}' +
    '.vc-out{align-self:flex-end;background:var(--paper,#fff);color:var(--ink-900,#080c1a)}' +
    '.vc textarea{width:100%;box-sizing:border-box;min-height:70px;resize:vertical;font:inherit;font-size:14px;color:var(--text,#eee);background:var(--ink-900,#080c1a);border:1px solid var(--line-hard,rgba(255,255,255,.22));border-radius:8px;padding:9px 11px}' +
    '.vc-row{display:flex;align-items:center;gap:10px;margin-top:8px;flex-wrap:wrap}' +
    '.vc button{font:inherit;font-weight:700;font-size:14px;padding:8px 16px;border-radius:8px;border:0;cursor:pointer;background:var(--paper,#fff);color:var(--ink-900,#080c1a)}' +
    '.vc button:disabled{opacity:.5;cursor:not-allowed}.vc-st{font-size:13px;color:var(--text-3,#889)}.vc-st.bad{color:var(--crit,#ef5b5b)}';

  function mount(root) {
    if (!root || root.dataset.vc) return;
    root.dataset.vc = '1';
    if (!document.getElementById('vc-css')) { var st = document.createElement('style'); st.id = 'vc-css'; st.textContent = CSS; document.head.appendChild(st); }
    root.innerHTML = '<div class="vc"><h3>Messages about your request</h3>' +
      '<p class="vc-s">We may ask you to confirm that you are a teacher, for example with your school and a school email address. Reply here and we will approve your account once we are satisfied.</p>' +
      '<div class="vc-log" id="vcLog" aria-live="polite"></div>' +
      '<textarea id="vcText" maxlength="2000" placeholder="Write a message…" aria-label="Your message"></textarea>' +
      '<div class="vc-row"><button type="button" id="vcSend">Send</button><span class="vc-st" id="vcSt"></span></div></div>';
    var log = root.querySelector('#vcLog'), txt = root.querySelector('#vcText'), btn = root.querySelector('#vcSend'), msg = root.querySelector('#vcSt');
    var me = window.MagicLabAuth.getSession && window.MagicLabAuth.getSession() && window.MagicLabAuth.getSession().user.id;
    var count = -1;
    function load() {
      var c = sb(); if (!c) return;
      c.from('verify_messages').select('id,sender_id,body,created_at').order('created_at', { ascending: true }).then(function (r) {
        var rows = r.data || [];
        if (rows.length === count) return;
        var nearEnd = log.scrollHeight - log.scrollTop - log.clientHeight < 60 || count < 0;
        count = rows.length;
        log.innerHTML = rows.length ? rows.map(function (m) {
          var mine = m.sender_id === me;
          return '<div class="vc-m ' + (mine ? 'vc-out' : 'vc-in') + '">' + esc(m.body) + '<small>' + (mine ? 'You' : 'The Magic Lab') + ' · ' +
            esc(new Date(m.created_at).toLocaleString('en-ZA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })) + '</small></div>';
        }).join('') : '<p class="vc-st">No messages yet.</p>';
        if (nearEnd) log.scrollTop = log.scrollHeight;
        if (rows.some(function (m) { return m.sender_id !== me; })) c.rpc('verify_mark_read');
      });
    }
    function send() {
      var body = txt.value.trim(); if (!body) return;
      btn.disabled = true; msg.textContent = ''; msg.className = 'vc-st';
      sb().rpc('verify_send', { p_body: body }).then(function (r) {
        btn.disabled = false;
        if (r.error) { msg.textContent = r.error.message; msg.className = 'vc-st bad'; return; }
        txt.value = ''; count = -1; load();
      });
    }
    btn.addEventListener('click', send);
    txt.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) send(); });
    load();
    setInterval(function () { if (!document.hidden) load(); }, 30000);
  }
  window.MLVerifyChat = { mount: mount };
})();
