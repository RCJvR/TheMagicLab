(function () {
  function init() {
    var style = document.createElement('style');
    style.textContent =
      '.ml-contact-fab{position:fixed;bottom:28px;right:28px;z-index:9998;width:54px;height:54px;border-radius:16px;border:none;' +
      'background:linear-gradient(135deg,#0891b2,#0e7490);color:#fff;font-size:22px;cursor:pointer;box-shadow:0 8px 28px rgba(8,145,178,.50);' +
      'display:flex;align-items:center;justify-content:center;gap:6px;text-decoration:none;transition:all 180ms;' +
      'animation:mlFabPop .4s cubic-bezier(.34,1.56,.64,1) both}' +
      '.ml-contact-fab:hover{transform:scale(1.10);box-shadow:0 12px 36px rgba(8,145,178,.60)}' +
      '.ml-contact-fab .ml-contact-label{display:none}' +
      '@keyframes mlFabPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}' +
      '@media (max-width:640px){' +
      '.ml-contact-fab{top:10px;right:10px;bottom:auto;left:auto;width:auto;height:30px;padding:0 12px 0 10px;border-radius:999px;font-size:13px;box-shadow:0 4px 14px rgba(8,145,178,.45)}' +
      '.ml-contact-fab .ml-contact-icon{font-size:14px}' +
      '.ml-contact-fab .ml-contact-label{display:inline;font-weight:600}' +
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
