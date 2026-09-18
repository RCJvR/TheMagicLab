(function () {
  function init() {
    var style = document.createElement('style');
    style.textContent =
      // A quiet utility control, not a second call to action: the glowing
      // cyan gradient competed with the page's own accents on every screen.
      // Values carry fallbacks so pages that have not adopted
      // assets/magic-lab.css yet still get the same treatment.
      '.ml-contact-fab{position:fixed;bottom:24px;right:24px;z-index:9998;width:46px;height:46px;border-radius:14px;' +
      'border:1px solid var(--line-hard,rgba(255,255,255,.16));background:var(--ink-800,#111418);' +
      'color:var(--text,#e3e8ef);font-size:17px;cursor:pointer;box-shadow:0 8px 24px -8px rgba(0,0,0,.70);' +
      'display:flex;align-items:center;justify-content:center;gap:7px;text-decoration:none;' +
      'transition:background 140ms,border-color 140ms,transform 140ms}' +
      '.ml-contact-fab:hover{background:var(--ink-750,#171b20);border-color:var(--paper,#f2f5f9);transform:translateY(-2px)}' +
      '.ml-contact-fab .ml-contact-label{display:none}' +
      '@media (max-width:640px){' +
      '.ml-contact-fab{bottom:16px;right:16px;width:auto;height:34px;padding:0 13px 0 11px;border-radius:999px;font-size:12px}' +
      '.ml-contact-fab .ml-contact-icon{font-size:13px}' +
      '.ml-contact-fab .ml-contact-label{display:inline;font-weight:700;' +
      'font-family:"Cabinet Grotesk","Segoe UI",system-ui,sans-serif}' +
      '}';
    document.head.appendChild(style);

    var btn = document.createElement('a');
    btn.className = 'ml-contact-fab';
    btn.href = 'mailto:ruhan@themagiclab.co.za?subject=The%20Magic%20Lab%20-%20Suggestion%2FQuestion';
    btn.title = 'Contact Developer';
    btn.innerHTML = '<span class="ml-contact-icon">📧</span><span class="ml-contact-label">Contact</span>';
    document.body.appendChild(btn);
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
