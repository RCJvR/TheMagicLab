// ============================================================
// THE MAGIC LAB — verify-notify.js
// For someone whose teacher request is pending: a small note on any page
// when the admin has sent them a message they have not read yet, linking
// to the dashboard where the chat is. Loaded by contact-button.js.
// Needs supabase-verify-chat.sql. Does nothing for anyone else.
// ============================================================
(function () {
  'use strict';
  if (/dashboard-teacher/.test(location.pathname)) return;
  var shown = false;
  function run() {
    var A = window.MagicLabAuth;
    if (shown || !A || !A.isLoggedIn || !A.isLoggedIn()) return;
    var p = A.getProfile && A.getProfile(), s = A.getSession && A.getSession();
    if (!p || !s || p.teacher_request !== 'pending') return;
    try { if (sessionStorage.getItem('ml-vn-dismissed')) return; } catch (e) {}
    A._supabase().from('verify_messages').select('id', { count: 'exact', head: true }).neq('sender_id', s.user.id).is('read_at', null).then(function (r) {
      if (!r || r.error || !r.count || shown) return;
      shown = true;
      var st = document.createElement('style');
      st.textContent = '.ml-vn{position:fixed;right:24px;bottom:84px;z-index:9997;max-width:300px;display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border-radius:12px;' +
        'border:1px solid var(--line-hard,rgba(255,255,255,.22));background:var(--ink-850,#10162b);color:var(--text,#eee);font:600 14px/1.4 "Cabinet Grotesk","Segoe UI",system-ui,sans-serif}' +
        '.ml-vn a{color:var(--paper,#fff);text-decoration:underline;text-underline-offset:3px}.ml-vn button{all:unset;cursor:pointer;color:var(--text-3,#889);font-size:18px;line-height:1;padding:0 2px}' +
        '@media(max-width:640px){.ml-vn{right:16px;left:16px;max-width:none;bottom:60px}}';
      document.head.appendChild(st);
      var d = document.createElement('div'); d.className = 'ml-vn'; d.setAttribute('role', 'status');
      d.innerHTML = '<span>You have ' + (r.count === 1 ? 'a new message' : r.count + ' new messages') + ' from The Magic Lab. <a href="dashboard-teacher.html">Read and reply</a></span><button type="button" aria-label="Dismiss">×</button>';
      d.querySelector('button').addEventListener('click', function () { d.remove(); try { sessionStorage.setItem('ml-vn-dismissed', '1'); } catch (e) {} });
      document.body.appendChild(d);
    });
  }
  document.addEventListener('magiclab:auth:ready', run);
  document.addEventListener('magiclab:auth:change', run);
  setTimeout(run, 1500);
})();
