/* The Magic Lab — shared tool header (ml-bar).
 *
 * Every tool keeps its own top bar and its own buttons; this script gives all
 * of them the same frame, in the same places:
 *
 *   [Magic Lab logo] / [tool name]   …the tool's own buttons…   [? Help] [EN|AF] [theme] [account]
 *
 * - The logo, far left, always goes to the homepage (all tools). Separate
 *   "Home", "All tools" and "Back to Magic Lab" buttons in the bar are hidden,
 *   and a tool name that linked to the homepage now links to the tool's home.
 * - The right-hand group always runs Help, language, theme, account, in that
 *   order, however the page or the auth and theme scripts add them.
 * - Help opens the tool's welcome guide where it has one, otherwise a short
 *   panel with what the tool is for and how to ask a question.
 *
 * Opt in on the bar itself:
 *   <header data-ml-bar="science-sage" data-ml-home="/science-sage/index.html">
 *     … <a data-ml-brand …>Science Sage</a> …
 *   </header>
 *   <script src="/assets/ml-bar.js" defer></script>
 * data-ml-name marks the element holding the tool's name, when the brand is an icon.
 * data-ml-brand marks the tool name (the logo goes just before it; default:
 * the bar's first child). data-ml-home is the tool's home (default: this page).
 * data-ml-help is an optional sentence for the help panel (default: the page's
 * meta description).
 */
(function () {
  'use strict';
  if (window.MLBar) return;

  var css =
    '.mlb-start{display:inline-flex;align-items:center;gap:8px;min-width:0}' +
    '.mlb-home{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;flex-shrink:0;border-radius:9px;text-decoration:none;transition:background-color 140ms}' +
    '.mlb-home:hover{background:rgba(255,255,255,.07)}' +
    '.mlb-home img{display:block;width:24px;height:24px}' +
    '.mlb-sep{flex-shrink:0;margin:0 2px 0 0;color:rgba(227,232,239,.35);font-weight:400;font-size:18px;line-height:1;user-select:none}' +
    '.mlb-dup{display:none!important}' +
    '.mlb-end{display:inline-flex;align-items:center;gap:8px;flex-shrink:0;margin-left:4px}' +
    '.mlb-help{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;padding:0;flex-shrink:0;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:transparent;color:inherit;cursor:pointer;font:inherit}' +
    '.mlb-help:hover,.mlb-back:hover{border-color:rgba(255,255,255,.32)}' +
    '.mlb-back{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;padding:0;flex-shrink:0;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:transparent;color:inherit;cursor:pointer;font:inherit}' +
    '.mlb-back svg{display:block;width:17px;height:17px}' +
    'html[data-theme="light"] .mlb-back{border-color:rgba(0,0,0,.18)}' +
    'html[data-theme="light"] .mlb-back:hover{border-color:rgba(0,0,0,.36)}' +
    '.mlb-help svg{display:block;width:16px;height:16px}' +
    '.mlb-home:focus-visible,.mlb-help:focus-visible,.mlb-back:focus-visible,.mlb-pop a:focus-visible,.mlb-pop button:focus-visible{outline:2px solid #6ea8ff;outline-offset:2px}' +
    '.mlb-pop{position:fixed;z-index:10000;width:min(320px,calc(100vw - 24px));box-sizing:border-box;padding:16px 16px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:#111418;color:#e3e8ef;box-shadow:0 14px 34px -14px rgba(0,0,0,.75);font:14px/1.5 "Cabinet Grotesk","Segoe UI",system-ui,sans-serif;text-align:left}' +
    '.mlb-pop h2{margin:0 0 6px;font-size:15px;font-weight:800;letter-spacing:-.01em;color:#f2f5f9}' +
    '.mlb-pop p{margin:0 0 12px;color:#aab3bf}' +
    '.mlb-pop ul{list-style:none;margin:0;padding:0;display:grid;gap:4px}' +
    '.mlb-pop a,.mlb-pop li>button{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:8px 10px;border-radius:8px;border:0;background:rgba(255,255,255,.04);color:#e3e8ef;text-decoration:none;font:inherit;font-weight:600;cursor:pointer;text-align:left}' +
    '.mlb-pop a:hover,.mlb-pop li>button:hover{background:rgba(255,255,255,.09)}' +
    'html[data-theme="light"] .mlb-home:hover{background:rgba(0,0,0,.06)}' +
    'html[data-theme="light"] .mlb-sep{color:rgba(22,24,29,.35)}' +
    'html[data-theme="light"] .mlb-help{border-color:rgba(0,0,0,.18)}' +
    'html[data-theme="light"] .mlb-help:hover{border-color:rgba(0,0,0,.36)}' +
    'html[data-theme="light"] .mlb-pop{background:#fff;color:#16181d;border-color:rgba(0,0,0,.14);box-shadow:0 14px 34px -14px rgba(0,0,0,.25)}' +
    'html[data-theme="light"] .mlb-pop h2{color:#0b0d10}' +
    'html[data-theme="light"] .mlb-pop p{color:#4a525e}' +
    'html[data-theme="light"] .mlb-pop a,html[data-theme="light"] .mlb-pop li>button{background:rgba(0,0,0,.04);color:#16181d}' +
    'html[data-theme="light"] .mlb-pop a:hover,html[data-theme="light"] .mlb-pop li>button:hover{background:rgba(0,0,0,.08)}' +
    // One button style for every tool's own header buttons (overrides each page's
    // pill, chip or coloured button), and one for the account button.
    '[data-mlb-ready] .mlb-act{align-items:center;gap:6px;min-height:36px;box-sizing:border-box;padding:0 14px!important;border-radius:999px!important;border:1px solid rgba(255,255,255,.16)!important;background:transparent!important;color:#e3e8ef!important;font:600 14.5px/1 "Cabinet Grotesk","Segoe UI",system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important;text-decoration:none!important;box-shadow:none!important;white-space:nowrap;cursor:pointer}' +
    '[data-mlb-ready] .mlb-act:not(.hidden):not([hidden]){display:inline-flex}' +
    '[data-mlb-ready] .mlb-act:hover{border-color:rgba(255,255,255,.34)!important;background:rgba(255,255,255,.05)!important}' +
    '[data-mlb-ready] .mlb-act svg{width:14px!important;height:14px!important;flex-shrink:0;margin:0!important}' +
    '[data-mlb-ready] .mlb-act:focus-visible{outline:2px solid #6ea8ff;outline-offset:2px}' +
    '[data-mlb-ready] .mlb-end :is([data-ml-auth],.ml-auth-btn):not(.ml-user-chip-wrap){display:inline-flex;align-items:center;gap:6px;min-height:36px;box-sizing:border-box;padding:0 15px!important;border-radius:999px!important;border:1px solid #f2f5f9!important;background:#f2f5f9!important;color:#0b0d10!important;font:700 14.5px/1 "Cabinet Grotesk","Segoe UI",system-ui,sans-serif!important;text-decoration:none!important;box-shadow:none!important;white-space:nowrap;cursor:pointer}' +
    '[data-mlb-ready] .mlb-end :is([data-ml-auth],.ml-auth-btn):not(.ml-user-chip-wrap) svg{width:14px!important;height:14px!important;margin:0!important}' +
    'html[data-theme="light"] [data-mlb-ready] .mlb-act{border-color:rgba(0,0,0,.18)!important;color:#16181d!important}' +
    'html[data-theme="light"] [data-mlb-ready] .mlb-act:hover{border-color:rgba(0,0,0,.36)!important;background:rgba(0,0,0,.04)!important}' +
    'html[data-theme="light"] [data-mlb-ready] .mlb-end :is([data-ml-auth],.ml-auth-btn):not(.ml-user-chip-wrap){border-color:#16181d!important;background:#16181d!important;color:#fff!important}' +
    // The signed-in account pill: the same outline as the other header buttons, with a solid initials disc.
    '[data-mlb-ready] .mlb-end .ml-user-chip-wrap{background:none!important;border:0!important;padding:0!important;min-height:0}' +
    '[data-mlb-ready] .mlb-end .ml-user-chip{min-height:36px;box-sizing:border-box;padding:3px 10px 3px 4px!important;gap:6px;border-radius:999px!important;border:1px solid rgba(255,255,255,.16)!important;background:transparent!important;color:#e3e8ef!important}' +
    '[data-mlb-ready] .mlb-end .ml-user-chip:hover,[data-mlb-ready] .mlb-end .ml-user-chip[aria-expanded="true"]{border-color:rgba(255,255,255,.34)!important;background:rgba(255,255,255,.05)!important}' +
    '[data-mlb-ready] .mlb-end .ml-user-avatar{width:28px;height:28px;border:0!important;background:#f2f5f9!important;color:#0b0d10!important;font-size:12px}' +
    '[data-mlb-ready] .mlb-end .ml-user-chevron{color:currentColor!important;opacity:.7}' +
    'html[data-theme="light"] [data-mlb-ready] .mlb-end .ml-user-chip{border-color:rgba(0,0,0,.18)!important;color:#16181d!important}' +
    'html[data-theme="light"] [data-mlb-ready] .mlb-end .ml-user-chip:hover,html[data-theme="light"] [data-mlb-ready] .mlb-end .ml-user-chip[aria-expanded="true"]{border-color:rgba(0,0,0,.36)!important;background:rgba(0,0,0,.04)!important}' +
    'html[data-theme="light"] [data-mlb-ready] .mlb-end .ml-user-avatar{background:#16181d!important;color:#fff!important}' +
    'html[data-theme="light"] .ml-user-menu{background:#fff!important;border-color:rgba(0,0,0,.12)!important;box-shadow:0 18px 44px rgba(0,0,0,.18)!important}' +
    'html[data-theme="light"] .ml-user-menu-item{color:#16181d!important}' +
    'html[data-theme="light"] .ml-user-menu-item:hover{background:rgba(0,0,0,.06)!important}' +
    'html[data-theme="light"] .ml-user-menu-sep{background:rgba(0,0,0,.1)!important}' +
    // Phones: buttons with an icon show the icon only (the label stays as its
    // accessible name and tooltip); labels such as a lesson's strand are hidden.
    '@media (max-width:640px){.mlb-sep{display:none}.mlb-home{width:30px;height:30px}.mlb-home img{width:22px;height:22px}.mlb-help,.mlb-back{width:34px;height:34px}.mlb-end{gap:6px;margin-left:2px}' +
      '[data-mlb-ready] .mlb-act.mlb-ico{width:34px;padding:0!important;justify-content:center;font-size:0!important;gap:0}' +
      '[data-mlb-ready] .mlb-act.mlb-ico svg{width:16px!important;height:16px!important}' +
      '[data-mlb-ready] .mlb-act.mlb-ico span{display:none!important}' +
      '[data-mlb-ready] .nav-strand,[data-mlb-ready] .nav-filename-ext,[data-mlb-ready] .app-sub{display:none!important}' +
      '[data-mlb-ready] .mlb-start [data-ml-name],[data-mlb-ready] .mlb-start .app-title{font-size:17px!important}}' +
    '@media print{.mlb-home,.mlb-sep,.mlb-end .mlb-help{display:none!important}}';

  var ICON_BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>';
  var ICON_HELP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>';

  var T = {
    en: { back: 'Back', home: 'The Magic Lab: all tools', help: 'Help', guide: 'Show the welcome guide', ask: 'Ask a question', all: 'All tools', close: 'Close' },
    af: { back: 'Terug', home: 'The Magic Lab: alle gereedskap', help: 'Hulp', guide: 'Wys die welkom-gids', ask: 'Vra ’n vraag', all: 'Alle gereedskap', close: 'Maak toe' }
  };
  function lang() {
    try { if (window.MLLang && MLLang.getLang) return MLLang.getLang() === 'af' ? 'af' : 'en'; } catch (e) {}
    return /^af/i.test(document.documentElement.lang || '') ? 'af' : 'en';
  }
  function t(k) { return (T[lang()] || T.en)[k]; }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }
  function isSiteHome(href) {
    if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) return false;
    try {
      var u = new URL(href, location.href);
      return u.origin === location.origin && (u.pathname === '/' || u.pathname === '/index.html') && !u.hash;
    } catch (e) { return false; }
  }

  // Right-hand group order: help, language, theme, account.
  function rank(n) {
    if (n.classList.contains('mlb-help')) return 0;
    if (n.id === 'mlLangToggle') return 1;
    if (n.classList.contains('ml-theme-toggle')) return 2;
    if (n.hasAttribute('data-ml-auth') || n.classList.contains('ml-user-chip-wrap') || n.classList.contains('ml-auth-btn')) return 3;
    return 1.5;
  }
  function sortEnd(end) {
    var kids = [].slice.call(end.children);
    var sorted = kids.slice().sort(function (a, b) { return rank(a) - rank(b); });
    for (var i = 0; i < kids.length; i++) {
      if (kids[i] !== sorted[i]) { sorted.forEach(function (n) { end.appendChild(n); }); return; }
    }
  }

  function init() {
    var bar = document.querySelector('[data-ml-bar]');
    if (!bar || bar.hasAttribute('data-mlb-ready')) return;
    bar.setAttribute('data-mlb-ready', '');
    var tool = bar.getAttribute('data-ml-bar');
    var style = el('style', { 'data-ml-no-theme': '' }); style.textContent = css; document.head.appendChild(style);

    // 1. The logo, which always goes home, then the tool name.
    var brand = bar.querySelector('[data-ml-brand]') || bar.firstElementChild;
    var home = el('a', { class: 'mlb-home', href: '/index.html', title: t('all'), 'aria-label': t('home') },
      '<img src="/assets/logo-prism.svg" alt="" width="24" height="24">');
    var sep = el('span', { class: 'mlb-sep', 'aria-hidden': 'true' }, '/');
    // One group, so bars that spread their children apart keep logo, slash and
    // name together, and grid bars keep the same number of columns.
    var start = el('span', { class: 'mlb-start' });
    // Back: the previous page on this site if there is one, otherwise up a
    // level (the tool's home, or the homepage from a tool's home).
    var back = el('button', { type: 'button', class: 'mlb-back', title: t('back'), 'aria-label': t('back') }, ICON_BACK);
    back.addEventListener('click', function () {
      var ref = ''; try { ref = document.referrer ? new URL(document.referrer).origin : ''; } catch (e) {}
      if (ref === location.origin && history.length > 1) { history.back(); return; }
      var up = bar.getAttribute('data-ml-home') || '/index.html';
      location.href = (new URL(up, location.href).pathname === location.pathname) ? '/index.html' : up;
    });
    start.appendChild(back);
    if (brand) { brand.parentNode.insertBefore(start, brand); start.appendChild(home); start.appendChild(sep); start.appendChild(brand); }
    else { start.appendChild(home); bar.insertBefore(start, bar.firstChild); }
    var toolHome = bar.getAttribute('data-ml-home') || location.pathname;
    if (brand && brand.tagName === 'A' && isSiteHome(brand.getAttribute('href'))) brand.setAttribute('href', toolHome);

    // 2. Other buttons that only go home are now the logo's job.
    [].forEach.call(bar.querySelectorAll('a[href]'), function (a) {
      if (a !== home && a !== brand && isSiteHome(a.getAttribute('href'))) a.classList.add('mlb-dup');
      // A page's own "Back" / "Home" link up to the tool's home is the Back button's job now.
      else if (a !== home && a !== brand && /^(←\s*)?(back|terug|home|tuis|grades|grade)\b/i.test((a.textContent || '').replace(/\s+/g, ' ').trim())) {
        try { if (new URL(a.getAttribute('href'), location.href).pathname === new URL(toolHome, location.href).pathname) a.classList.add('mlb-dup'); } catch (e) {}
      }
    });
    [].forEach.call(bar.querySelectorAll('#showWelcomeBtn'), function (b) { b.classList.add('mlb-dup'); });

    // 3. The right-hand group.
    var auth = bar.querySelector('[data-ml-auth], .ml-user-chip-wrap');
    var end = bar.querySelector('[data-ml-end]');
    if (!end) {
      end = el('div', { class: 'mlb-end' });
      // Join the bar's own right-hand group: where the account button is, a known
      // right-hand container, or the bar's last container (lesson pages).
      var last = bar.lastElementChild;
      var lastBox = last && last !== start && /^(DIV|SPAN)$/.test(last.tagName) && last.children.length ? last : null;
      var host = auth ? auth.parentNode : (bar.querySelector('.ml-nav-right, .nav-right, .hdr-right, .header-right') || lastBox || bar);
      host.appendChild(end);
    } else end.classList.add('mlb-end');
    var help = el('button', { type: 'button', class: 'mlb-help', title: t('help'), 'aria-label': t('help'), 'aria-haspopup': 'dialog', 'aria-expanded': 'false' }, ICON_HELP);
    end.appendChild(help);
    var lt = document.getElementById('mlLangToggle');
    if (lt && bar.contains(lt)) end.appendChild(lt);
    var th = bar.querySelector('.ml-theme-toggle');
    if (th) end.appendChild(th);
    if (auth) end.appendChild(auth);
    sortEnd(end);
    // The auth and theme scripts add or swap their controls later: keep the order.
    if (window.MutationObserver) new MutationObserver(function () { sortEnd(end); }).observe(end, { childList: true });
    // A theme toggle placed elsewhere in the bar before we ran joins the group.
    if (window.MutationObserver) new MutationObserver(function () {
      var x = bar.querySelector('.ml-theme-toggle');
      if (x && x.parentNode !== end && !x.classList.contains('is-floating')) end.appendChild(x);
    }).observe(bar, { childList: true, subtree: true });

    // 3b. The tool's own buttons take the shared button style; on phones the
    // ones with an icon shrink to the icon, keeping the label as their name.
    [].forEach.call(bar.querySelectorAll('a[href], button'), function (n) {
      if (n.closest('.mlb-start') || n.closest('.mlb-end') || n.closest('#mlLangToggle') || n.closest('[role="group"]') ||
          n.classList.contains('mlb-dup') || n.classList.contains('ml-theme-toggle') || n.hasAttribute('data-ml-auth') || n.classList.contains('ml-auth-btn')) return;
      n.classList.add('mlb-act');
      var text = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (text && n.querySelector('svg, i[data-lucide]')) {
        n.classList.add('mlb-ico');
        if (!n.getAttribute('aria-label')) n.setAttribute('aria-label', text);
        if (!n.getAttribute('title')) n.setAttribute('title', text);
      }
    });

    // 4. Help.
    var pop = null;
    function closePop() {
      if (!pop) return;
      pop.remove(); pop = null; help.setAttribute('aria-expanded', 'false');
      document.removeEventListener('mousedown', outside, true); document.removeEventListener('keydown', onKey, true);
    }
    function outside(e) { if (pop && !pop.contains(e.target) && !help.contains(e.target)) closePop(); }
    function onKey(e) { if (e.key === 'Escape') { closePop(); help.focus(); } }
    function openPop() {
      var nameEl = bar.querySelector('[data-ml-name]') || brand;
      var name = ((nameEl && nameEl.textContent) || document.title).replace(/\s+/g, ' ').trim();
      var meta = document.querySelector('meta[name="description"]');
      var text = bar.getAttribute('data-ml-help') || (meta && meta.content) || '';
      pop = el('div', { class: 'mlb-pop', role: 'dialog', 'aria-label': t('help') + ': ' + name, 'data-ml-no-theme': '' });
      pop.appendChild(el('h2', {}, '')).textContent = name;
      if (text) pop.appendChild(el('p', {}, '')).textContent = text;
      var ul = el('ul', {});
      var guide = window.MagicLabWelcome && MagicLabWelcome.has && MagicLabWelcome.has(tool);
      if (guide) {
        var g = el('button', { type: 'button' }, ''); g.textContent = t('guide');
        g.addEventListener('click', function () { closePop(); MagicLabWelcome.show(tool); });
        ul.appendChild(el('li', {})).appendChild(g);
      }
      var ask = el('a', { href: 'mailto:ruhan@themagiclab.co.za?subject=' + encodeURIComponent('The Magic Lab - ' + name) }, ''); ask.textContent = t('ask');
      ul.appendChild(el('li', {})).appendChild(ask);
      var all = el('a', { href: '/index.html' }, ''); all.textContent = t('all');
      ul.appendChild(el('li', {})).appendChild(all);
      pop.appendChild(ul);
      document.body.appendChild(pop);
      var r = help.getBoundingClientRect(), w = pop.offsetWidth;
      pop.style.top = Math.round(r.bottom + 8) + 'px';
      pop.style.left = Math.round(Math.max(12, Math.min(window.innerWidth - w - 12, r.right - w))) + 'px';
      help.setAttribute('aria-expanded', 'true');
      document.addEventListener('mousedown', outside, true); document.addEventListener('keydown', onKey, true);
      var first = pop.querySelector('a, button'); if (first) first.focus();
    }
    // With a welcome guide, Help opens it straight away; otherwise the short panel.
    help.addEventListener('click', function () {
      if (window.MagicLabWelcome && MagicLabWelcome.has && MagicLabWelcome.has(tool)) { closePop(); MagicLabWelcome.show(tool); return; }
      pop ? closePop() : openPop();
    });
    // Every tool has a welcome guide in /tool-welcome.js; load it where the page does not.
    if (!window.MagicLabWelcome && !document.querySelector('script[src$="tool-welcome.js"]')) {
      var tw = document.createElement('script'); tw.src = '/tool-welcome.js'; tw.defer = true; document.head.appendChild(tw);
    }
    window.addEventListener('resize', closePop);
  }

  window.MLBar = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
