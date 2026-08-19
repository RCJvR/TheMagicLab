// ═══════════════════════════════════════════════════════════════
// The Magic Lab — shared EN / AF language toggle
// Renders a small pill switch, persists the choice in localStorage,
// and hands control back to the host page via an onChange callback
// so each app (SPA-style tools vs. static lesson pages) can decide
// how to actually swap content.
// ═══════════════════════════════════════════════════════════════
(function () {
  const KEY = 'ml_lang';

  function getLang() {
    return localStorage.getItem(KEY) === 'af' ? 'af' : 'en';
  }

  function setLang(lang) {
    localStorage.setItem(KEY, lang === 'af' ? 'af' : 'en');
  }

  const STYLE_ID = 'ml-lang-toggle-style';
  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = `
      .ml-lang-toggle{display:inline-flex;align-items:center;border-radius:99px;border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.05);padding:2px;gap:2px;font-family:inherit;flex-shrink:0}
      .ml-lang-btn{font-size:10.5px;font-weight:700;letter-spacing:0.03em;padding:4px 10px;border-radius:99px;border:none;background:none;color:rgba(221,225,240,0.45);cursor:pointer;transition:all 150ms;line-height:1.2;font-family:inherit}
      .ml-lang-btn.ml-active{background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff}
      .ml-lang-btn:not(.ml-active):hover{color:#fff}
      .ml-lang-note{position:fixed;bottom:20px;left:50%;transform:translateX(-50%) translateY(10px);background:#181428;border:1px solid rgba(255,255,255,0.14);color:#dde1f0;font-size:12.5px;font-family:"Cabinet Grotesk","DM Sans",sans-serif;padding:10px 18px;border-radius:11px;box-shadow:0 16px 40px rgba(0,0,0,0.45);opacity:0;pointer-events:none;transition:opacity 220ms,transform 220ms;z-index:99999;max-width:320px;text-align:center}
      .ml-lang-note.ml-show{opacity:1;transform:translateX(-50%) translateY(0)}
    `;
    document.head.appendChild(s);
  }

  function toast(msg) {
    ensureStyle();
    let n = document.querySelector('.ml-lang-note');
    if (!n) {
      n = document.createElement('div');
      n.className = 'ml-lang-note';
      document.body.appendChild(n);
    }
    n.textContent = msg;
    requestAnimationFrame(() => n.classList.add('ml-show'));
    clearTimeout(n._mlTimer);
    n._mlTimer = setTimeout(() => n.classList.remove('ml-show'), 2800);
  }

  // Renders the pill into `container` (an element or element id) and wires
  // click handling. `opts.onChange(nextLang, {toast})` is called AFTER the
  // preference has been persisted, so the host page can update its own DOM.
  function mount(container, opts) {
    opts = opts || {};
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return null;
    ensureStyle();

    function paint(lang) {
      el.innerHTML = `
        <div class="ml-lang-toggle" role="group" aria-label="Language / Taal">
          <button type="button" class="ml-lang-btn${lang === 'en' ? ' ml-active' : ''}" data-lang="en">EN</button>
          <button type="button" class="ml-lang-btn${lang === 'af' ? ' ml-active' : ''}" data-lang="af">AF</button>
        </div>`;
      el.querySelectorAll('.ml-lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const next = btn.dataset.lang;
          if (next === getLang()) return;
          setLang(next);
          paint(next);
          if (typeof opts.onChange === 'function') opts.onChange(next, { toast });
        });
      });
    }
    paint(getLang());
    return { repaint: () => paint(getLang()) };
  }

  window.MLLang = { getLang, setLang, mount, toast };
})();
