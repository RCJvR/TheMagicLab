/* The Magic Lab — light / dark theme.
 *
 * The site was built dark, and most pages carry their own colours (local
 * :root variables, rule colours, inline styles, colours in generated HTML).
 * Rather than hand-write a light stylesheet for ~350 pages, light mode
 * derives one: every colour in the page's stylesheets and inline styles is
 * mapped to its light-theme counterpart and applied on top.
 *
 *   neutral colours (greys, near-black grounds, white text) flip lightness;
 *   accent colours used for text or lines are darkened until readable;
 *   tinted and solid accent fills keep their colour.
 *
 * Kept as-is: print rules, simulation canvases (they stay dark "screens",
 * because their drawings assume a dark ground), and the printable surfaces of
 * the maths tools (graph paper, the worksheet page). Mark anything else that
 * must not change with data-ml-no-theme.
 *
 * Prism is a third palette on the same dark ground. Each tool's pages take
 * that tool's colour from the index page: every accent is recoloured to the
 * tool's hue and keeps its own lightness and alpha, so emphasis still reads as
 * emphasis. Pages outside the tools keep their colours.
 *
 * The choice is stored per browser in localStorage ('ml-theme').
 */
(function () {
  'use strict';
  var KEY = 'ml-theme';
  var root = document.documentElement;
  var KEEP_SEL = /plot-wrap|#paper\b|paper-wrap|math-field|\.ib img|data-ml-no-theme/;
  var KEEP_ZONE = '.plot-wrap, #paper, [data-ml-no-theme]';

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var THEMES = ['dark', 'light', 'prism'];
  var theme = THEMES.indexOf(stored()) > -1 ? stored() : 'dark';
  root.setAttribute('data-theme', theme);

  // Early styles: light ground straight away, and keep the body hidden until
  // the derived colours are in place (released by a timeout whatever happens).
  var early = document.createElement('style');
  early.id = 'ml-theme-early';
  early.textContent =
    'html[data-theme="light"]{background:#f5f5f3;color-scheme:light}' +
    'html[data-theme="light"].ml-theming body{visibility:hidden}' +
    'html[data-theme="light"] canvas{background-color:#0d1016 !important}' +
    '.ml-theme-toggle{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;padding:0;' +
    'border-radius:999px;border:1px solid rgba(255,255,255,.16);background:transparent;color:inherit;cursor:pointer;flex-shrink:0}' +
    '.ml-theme-toggle:hover{border-color:rgba(255,255,255,.32)}' +
    '.ml-theme-toggle.is-floating{position:fixed;left:16px;bottom:16px;z-index:9998;background:#111418;color:#e3e8ef}' +
    'html[data-theme="light"] .ml-theme-toggle{border-color:rgba(0,0,0,.18)}' +
    'html[data-theme="light"] .ml-theme-toggle:hover{border-color:rgba(0,0,0,.36)}' +
    'html[data-theme="light"] .ml-theme-toggle.is-floating{background:#fff;color:#16181d}' +
    '@media print{.ml-theme-toggle{display:none!important}}';
  (document.head || root).appendChild(early);
  if (theme !== 'dark') {
    root.classList.add('ml-theming');
    setTimeout(function () { root.classList.remove('ml-theming'); }, 1500);
  }

  // ── colour maths ──────────────────────────────────────────────────────
  var NAMED = { white: [255, 255, 255], black: [0, 0, 0] };
  var COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|\b(?:white|black)\b/g;

  function parse(c) {
    c = c.trim();
    if (c[0] === '#') {
      var h = c.slice(1);
      if (h.length === 3 || h.length === 4) h = h.split('').map(function (x) { return x + x; }).join('');
      if (h.length !== 6 && h.length !== 8) return null;
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
    }
    if (NAMED[c]) return NAMED[c].concat(1);
    var m = c.match(/^(rgba?|hsla?)\(([^)]*)\)$/);
    if (!m) return null;
    var parts = m[2].replace(/\//, ' ').split(/[\s,]+/).filter(Boolean);
    if (parts.length < 3) return null;
    var a = parts[3] != null ? (parts[3].indexOf('%') > -1 ? parseFloat(parts[3]) / 100 : parseFloat(parts[3])) : 1;
    if (m[1].indexOf('rgb') === 0) {
      var v = parts.slice(0, 3).map(function (p) { return p.indexOf('%') > -1 ? parseFloat(p) * 2.55 : parseFloat(p); });
      return [v[0], v[1], v[2], a];
    }
    var rgb = hsl2rgb(parseFloat(parts[0]) / 360, parseFloat(parts[1]) / 100, parseFloat(parts[2]) / 100);
    return rgb.concat(a);
  }
  function rgb2hsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, h = 0, s = 0;
    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function hsl2rgb(h, s, l) {
    if (s === 0) return [l * 255, l * 255, l * 255];
    function f(p, q, t) { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255];
  }
  function relLum(c) {
    function f(x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  }
  function fmt(c) {
    var r = Math.round(c[0]), g = Math.round(c[1]), b = Math.round(c[2]), a = Math.round(c[3] * 1000) / 1000;
    return a >= 1 ? 'rgb(' + r + ',' + g + ',' + b + ')' : 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  // Neutral = greys, near-blacks and very pale tints (e.g. the slightly blue
  // off-white used for body text on dark). These flip lightness and lose most
  // of their tint, so pale lavender text becomes dark grey, not purple.
  function isNeutral(hsl) { return hsl[1] < 0.22 || hsl[2] < 0.16 || hsl[2] > 0.8; }

  // ── prism ─────────────────────────────────────────────────────────────
  // The palette the current pass maps to: 'light' or 'prism'. Prism's accent
  // is the tool's index colour for this page, as HSL; null when the page is
  // not one of the tools, in which case prism leaves the colours alone.
  var PALETTE = 'light', ACCENT = null;
  var TOOL_ACCENT = [
    ['/code-conjurer', '#9b6bff'], ['/ai-oracle', '#7a7dff'], ['/java-genie', '#5b93ff'],
    ['/computer-codex', '#35a6f0'], ['/web-wizard', '#1fb8dc'], ['/model-mage', '#17c4c0'],
    ['/drawing-druid/', '#1fc98e'], ['/science-sage/', '#4acf6b'], ['/math-magician/', '#9ed43c'],
    ['/spike-spellcaster/', '#e8c63a'], ['/tech-tower/', '#eda13c'], ['/robot-realm/', '#ee7544'],
    ['/time-turner', '#ed5c86'], ['/timer-talisman', '#ed5c86']
  ];
  function accentFor(path) {
    for (var i = 0; i < TOOL_ACCENT.length; i++) {
      if (path.indexOf(TOOL_ACCENT[i][0]) === 0) {
        var c = parse(TOOL_ACCENT[i][1]);
        return rgb2hsl(c[0], c[1], c[2]);
      }
    }
    return null;
  }
  // Text and lines are lifted to a lightness that reads on the dark ground;
  // fills keep the lightness they were designed with.
  function prismColor(c, mode, hsl) {
    if (!ACCENT || isNeutral(hsl)) return c;
    var l = mode === 'text' || mode === 'fg' ? Math.max(hsl[2], 0.62) : hsl[2];
    var o = hsl2rgb(ACCENT[0], ACCENT[1], l);
    return [o[0], o[1], o[2], c[3]];
  }

  // mode: 'fg' text/lines, 'bg' fills, 'shadow', 'keepfg' (dark text sitting on a kept accent fill)
  function mapColor(c, mode) {
    var hsl = rgb2hsl(c[0], c[1], c[2]), h = hsl[0], s = hsl[1], l = hsl[2], a = c[3];
    if (mode === 'shadow') return [c[0], c[1], c[2], a * (l < 0.2 ? 0.45 : 0.5)];
    if (mode === 'keepfg') return c;
    if (PALETTE === 'prism') return prismColor(c, mode, hsl);
    if (isNeutral(hsl)) {
      l = Math.min(0.975, Math.max(0.07, 1 - l));
      s = Math.min(s, 0.18);
      // Faint text that was already marginal on the dark ground gets a floor,
      // so muted copy stays readable on white.
      if (mode === 'text' && a < 1) a = Math.min(1, Math.max(a * 1.15, 0.62));
      else if (mode === 'fg' && a < 1) a = Math.min(1, a * 1.15);
    } else if (mode === 'fg' || mode === 'text') {
      // Accent text and lines: darken until they reach ~4.6:1 on the light
      // ground. Done on luminance, not HSL lightness, because yellow, green
      // and cyan look far brighter than blue or red at the same lightness.
      l = Math.min(l, 0.5);
      var o2 = hsl2rgb(h, s, l);
      while (l > 0.12 && relLum(o2) > 0.14) { l -= 0.02; o2 = hsl2rgb(h, s, l); }
    }
    var o = hsl2rgb(h, s, l);
    return [o[0], o[1], o[2], a];
  }
  function mapValue(val, mode) {
    return val.replace(COLOR_RE, function (m) {
      var c = parse(m);
      return c ? fmt(mapColor(c, mode)) : m;
    });
  }

  var FG = /^(color|fill|stroke|caret-color|outline-color|text-decoration-color|column-rule-color|stop-color|border(-(top|right|bottom|left|block|inline)(-start|-end)?)?-color|-webkit-text-fill-color|-webkit-text-stroke-color|accent-color)$/;
  var BG = /^(background-color|background-image)$/;
  var SHADOW = /^(box-shadow|text-shadow|filter)$/;
  function modeForVar(name, val) {
    if (/bg|surface|ground|card|panel|overlay|backdrop|ink-\d/.test(name)) return 'bg';
    if (/text-4/.test(name)) return 'fg';        // placeholders / disabled: never body text
    if (/text|muted|paper|fg/.test(name)) return 'text';
    if (/line|border/.test(name)) return 'fg';
    var c = parse((val.match(COLOR_RE) || [''])[0] || '');
    if (!c) return 'fg';
    var hsl = rgb2hsl(c[0], c[1], c[2]);
    // Accent variables (the tool spectrum, subject colours) are mostly used
    // for text, icons and lines, so they are darkened like text. Neutrals go
    // by lightness: light ones are text, dark ones are grounds.
    if (!isNeutral(hsl)) return 'text';
    return hsl[2] > 0.5 ? 'text' : 'bg';
  }

  // Does this rule paint a solid accent fill that we keep? Then dark text on it stays dark.
  function keepsAccentFill(style) {
    var v = style.getPropertyValue('background-color') || '';
    var c = parse((v.match(COLOR_RE) || [''])[0] || '');
    if (!c || c[3] < 0.6) return false;
    var hsl = rgb2hsl(c[0], c[1], c[2]);
    return !isNeutral(hsl);
  }

  function declsFor(style) {
    var out = [], accentFill = keepsAccentFill(style);
    for (var i = 0; i < style.length; i++) {
      var p = style[i], v = style.getPropertyValue(p), pri = style.getPropertyPriority(p);
      // Values that use var() are still scanned: the variable itself is mapped
      // where it is defined, and any literal fallback colour (var(--x, #fff))
      // has to be mapped too, for pages that never define the variable.
      if (!v) continue;
      var mode = null;
      if (p.indexOf('--') === 0) { if (COLOR_RE.test(v)) mode = modeForVar(p, v); COLOR_RE.lastIndex = 0; }
      else if (p === 'color' || p === '-webkit-text-fill-color') mode = 'text';
      else if (FG.test(p)) mode = 'fg';
      else if (BG.test(p)) mode = 'bg';
      else if (SHADOW.test(p)) mode = 'shadow';
      if (!mode) continue;
      if (accentFill && p === 'color') {
        var c = parse((v.match(COLOR_RE) || [''])[0] || '');
        if (c && rgb2hsl(c[0], c[1], c[2])[2] < 0.3) mode = 'keepfg';
      }
      var nv = mapValue(v, mode);
      if (nv !== v) out.push([p, nv, pri]);
    }
    // A shorthand written with var() (background: var(--paper, #f2f5f9)) only
    // exposes its value on the shorthand itself; the longhands read as empty.
    SHORTHANDS.forEach(function (sp) {
      var v = style.getPropertyValue(sp);
      if (!v || v.indexOf('var(') < 0) return;
      var nv = mapValue(v, sp === 'background' ? 'bg' : 'fg');
      if (nv !== v) out.push([sp, nv, style.getPropertyPriority(sp)]);
    });
    return out;
  }
  var SHORTHANDS = ['background', 'border', 'border-top', 'border-right', 'border-bottom', 'border-left', 'border-color', 'outline'];

  // ── stylesheets ───────────────────────────────────────────────────────
  function rulesText(rules) {
    var out = '';
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.type === 1) { // style rule
        if (KEEP_SEL.test(r.selectorText)) continue;
        var d = declsFor(r.style);
        if (d.length) out += r.selectorText + '{' + d.map(function (x) { return x[0] + ':' + x[1] + (x[2] ? ' !important' : ''); }).join(';') + '}\n';
      } else if (r.type === 4) { // @media
        if (/print/.test(r.media.mediaText)) continue;
        var inner = rulesText(r.cssRules);
        if (inner) out += '@media ' + r.media.mediaText + '{' + inner + '}\n';
      } else if (r.type === 12) { // @supports
        var inn = rulesText(r.cssRules);
        if (inn) out += '@supports ' + r.conditionText + '{' + inn + '}\n';
      }
    }
    return out;
  }
  var done = new WeakSet(), lightEl = null;
  function sheetOwnerOk(sh) {
    var n = sh.ownerNode;
    return !(n && (n.id === 'ml-theme-light' || n.id === 'ml-theme-early'));
  }
  function buildStyles() {
    var css = '';
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sh = document.styleSheets[i];
      if (!sheetOwnerOk(sh) || done.has(sh)) continue;
      var rules; try { rules = sh.cssRules; } catch (e) { continue; } // cross-origin (fonts)
      done.add(sh);
      css += rulesText(rules);
    }
    if (!css) return;
    if (!lightEl) { lightEl = document.createElement('style'); lightEl.id = 'ml-theme-light'; }
    lightEl.textContent += css;
    document.head.appendChild(lightEl); // keep it last
  }

  // ── inline styles ─────────────────────────────────────────────────────
  // originals: the element's style attribute before we touched it (for switching back).
  // mapped: per element, the value we wrote for each property, so a colour we
  // already converted is never converted a second time when a script later
  // changes some other property (a width, a transform) on the same element.
  var originals = new Map(), mapped = new WeakMap();
  function themeEl(el) {
    if (!el.getAttribute || !el.hasAttribute('style')) return;
    if (el.closest && el.closest(KEEP_ZONE)) return;
    var prev = mapped.get(el) || {};
    var d = declsFor(el.style).filter(function (x) { return prev[x[0]] !== el.style.getPropertyValue(x[0]); });
    // A bright accent fill set inline (pyramid bars, chips) keeps its colour,
    // so the text on it must be dark, whatever the stylesheet's text colour
    // was mapped to.
    var bgv = el.style.backgroundColor || el.style.background || '';
    var bgm = bgv.match(COLOR_RE), bgc = bgm ? parse(bgm[0]) : null;
    var darkText = bgc && bgc[3] >= 0.85 && !isNeutral(rgb2hsl(bgc[0], bgc[1], bgc[2])) && relLum(bgc) > 0.3 &&
      prev.color === undefined && !el.style.color;
    if (!d.length && !darkText) return;
    if (!originals.has(el)) originals.set(el, el.getAttribute('style'));
    d.forEach(function (x) {
      el.style.setProperty(x[0], x[1], x[2]);
      prev[x[0]] = el.style.getPropertyValue(x[0]);
    });
    if (darkText) { el.style.setProperty('color', '#101317'); prev.color = el.style.getPropertyValue('color'); }
    mapped.set(el, prev);
  }
  function themeTree(node) {
    if (node.nodeType !== 1) return;
    themeEl(node);
    var list = node.querySelectorAll('[style]');
    for (var i = 0; i < list.length; i++) themeEl(list[i]);
  }
  var observer = null;
  function watch() {
    observer = new MutationObserver(function (muts) {
      var newSheet = false;
      muts.forEach(function (m) {
        if (m.type === 'attributes') themeEl(m.target);
        else m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.tagName === 'STYLE' && n.id !== 'ml-theme-light' || n.tagName === 'LINK') newSheet = true;
          themeTree(n);
        });
      });
      if (newSheet) setTimeout(buildStyles, 50);
    });
    observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['style'] });
  }

  // Applies the current palette ('light' or 'prism') to this page.
  function applyPalette() {
    PALETTE = theme;
    ACCENT = theme === 'prism' ? accentFor(location.pathname) : null;
    try {
      buildStyles();
      themeTree(document.body);
      if (!observer) watch();
      prismLayer();
    } catch (e) { if (window.console) console.warn('theme', e); }
    root.classList.remove('ml-theming');
  }

  // Prism's own additions, on top of the recoloured page: a faint wash of the
  // tool's colour in the ground, and a short rule of that colour above each
  // lesson heading. Both are removed with the rest of prism.
  var prismEl = null;
  function prismLayer() {
    if (!ACCENT) return;
    var c = hsl2rgb(ACCENT[0], ACCENT[1], Math.max(ACCENT[2], 0.62));
    var ground = [8, 9, 11];
    var wash = fmt([ground[0] + (c[0] - ground[0]) * 0.10, ground[1] + (c[1] - ground[1]) * 0.10, ground[2] + (c[2] - ground[2]) * 0.10, 1]);
    var accent = fmt([c[0], c[1], c[2], 1]);
    if (!prismEl) { prismEl = document.createElement('style'); prismEl.id = 'ml-theme-prism'; }
    prismEl.textContent =
      'html[data-theme="prism"], html[data-theme="prism"] body{background-color:' + wash + ' !important}' +
      'html[data-theme="prism"] .lesson-body h2::before{content:"";display:block;width:48px;height:4px;border-radius:2px;background:' + accent + ';margin-bottom:14px}';
    document.head.appendChild(prismEl);
  }
  function removeLight() {
    if (observer) { observer.disconnect(); observer = null; }
    if (lightEl) { lightEl.remove(); lightEl = null; }
    if (prismEl) { prismEl.remove(); prismEl = null; }
    done = new WeakSet();
    originals.forEach(function (orig, el) { el.setAttribute('style', orig); });
    originals.clear(); mapped = new WeakMap();
  }

  // ── toggle ────────────────────────────────────────────────────────────
  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  var MOON = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
  var PRISM = '<path d="M12 4 20 18H4Z"/><path d="M12 9v4"/>';
  var ICON = { dark: MOON, light: SUN, prism: PRISM };
  var NEXT = { dark: 'light', light: 'prism', prism: 'dark' };
  var af = /\.af\.html$/.test(location.pathname) || (root.lang || '').indexOf('af') === 0;
  function label() {
    var NAME = af ? { dark: 'Donker', light: 'Lig', prism: 'Prisma' } : { dark: 'Dark', light: 'Light', prism: 'Prism' };
    return (af ? 'Tema: ' : 'Theme: ') + NAME[theme] + (af ? '. Skakel oor na ' : '. Change to ') + NAME[NEXT[theme]];
  }
  function paint(btn) {
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[theme] + '</svg>';
    btn.setAttribute('aria-label', label()); btn.title = label();
  }
  function setTheme(next) {
    if (next === theme) return;
    theme = next; store(theme); root.setAttribute('data-theme', theme);
    removeLight();
    if (theme !== 'dark') applyPalette();
    document.querySelectorAll('.ml-theme-toggle').forEach(paint);
    document.dispatchEvent(new CustomEvent('magiclab:theme', { detail: { theme: theme } }));
  }
  function mount() {
    if (document.querySelector('.ml-theme-toggle')) return;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'ml-theme-toggle';
    btn.addEventListener('click', function () { setTheme(NEXT[theme]); });
    paint(btn);
    var anchor = document.querySelector('nav [data-ml-auth], nav .ml-user-chip-wrap, header [data-ml-auth]') || document.getElementById('mlLangToggle');
    var box = document.querySelector('.ml-nav-right, .nav-right');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(btn, anchor);
    else if (box) box.appendChild(btn);
    else {
      var nav = document.querySelector('nav');
      var last = nav && nav.lastElementChild;
      if (last && getComputedStyle(last).display.indexOf('flex') > -1) last.appendChild(btn);
    }
    if (!btn.parentNode) { btn.classList.add('is-floating'); document.body.appendChild(btn); return; }
    fit();
  }
  // Crowded tool headers: if the toggle is what makes the bar wrap onto a
  // second line, float it in the corner instead. Re-checked once the sign-in
  // button has rendered (it widens the bar) and when the window resizes.
  function fit() {
    var btn = document.querySelector('.ml-theme-toggle');
    if (!btn || btn.classList.contains('is-floating')) return;
    var bar = btn.closest('header, nav');
    if (!bar) return;
    var withIt = bar.getBoundingClientRect().height;
    btn.style.display = 'none';
    var without = bar.getBoundingClientRect().height;
    btn.style.display = '';
    if (withIt > without + 4) { btn.classList.add('is-floating'); document.body.appendChild(btn); }
  }
  document.addEventListener('magiclab:nav:rendered', function () { setTimeout(fit, 0); });
  window.addEventListener('load', function () { setTimeout(fit, 300); });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(fit, 200); });

  function ready() {
    mount();
    if (theme !== 'dark') applyPalette();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
  // stylesheets that finish loading late (or are added by scripts)
  window.addEventListener('load', function () { if (theme !== 'dark') buildStyles(); });

  window.MagicLabTheme = { get: function () { return theme; }, set: setTheme };
})();
