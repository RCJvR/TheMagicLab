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
    '.mlb-help{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;padding:0;flex-shrink:0;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:transparent;color:inherit;cursor:pointer;font:inherit}' +
    '.mlb-help:hover{border-color:rgba(255,255,255,.32)}' +
    '.mlb-help svg{display:block;width:16px;height:16px}' +
    '.mlb-home:focus-visible,.mlb-help:focus-visible,.mlb-pop a:focus-visible,.mlb-pop button:focus-visible{outline:2px solid #6ea8ff;outline-offset:2px}' +
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
    '@media (max-width:640px){.mlb-sep{display:none}.mlb-home{width:30px;height:30px}.mlb-home img{width:22px;height:22px}.mlb-help{width:32px;height:32px}.mlb-end{gap:6px;margin-left:2px}}' +
    '@media print{.mlb-home,.mlb-sep,.mlb-end .mlb-help{display:none!important}}';

  var ICON_HELP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>';

  var T = {
    en: { home: 'The Magic Lab: all tools', help: 'Help', guide: 'Show the welcome guide', ask: 'Ask a question', all: 'All tools', close: 'Close' },
    af: { home: 'The Magic Lab: alle gereedskap', help: 'Hulp', guide: 'Wys die welkom-gids', ask: 'Vra ’n vraag', all: 'Alle gereedskap', close: 'Maak toe' }
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
    if (brand) { brand.parentNode.insertBefore(start, brand); start.appendChild(home); start.appendChild(sep); start.appendChild(brand); }
    else { start.appendChild(home); bar.insertBefore(start, bar.firstChild); }
    var toolHome = bar.getAttribute('data-ml-home') || location.pathname;
    if (brand && brand.tagName === 'A' && isSiteHome(brand.getAttribute('href'))) brand.setAttribute('href', toolHome);

    // 2. Other buttons that only go home are now the logo's job.
    [].forEach.call(bar.querySelectorAll('a[href]'), function (a) {
      if (a !== home && a !== brand && isSiteHome(a.getAttribute('href'))) a.classList.add('mlb-dup');
    });
    [].forEach.call(bar.querySelectorAll('#showWelcomeBtn'), function (b) { b.classList.add('mlb-dup'); });

    // 3. The right-hand group.
    var auth = bar.querySelector('[data-ml-auth], .ml-user-chip-wrap');
    var end = bar.querySelector('[data-ml-end]');
    if (!end) {
      end = el('div', { class: 'mlb-end' });
      var host = auth ? auth.parentNode : (bar.querySelector('.ml-nav-right, .nav-right, .hdr-right') || bar);
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
    help.addEventListener('click', function () { pop ? closePop() : openPop(); });
    window.addEventListener('resize', closePop);
  }

  window.MLBar = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
