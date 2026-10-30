/* Timer Talisman — colour themes and fonts, shared by the setup page and the timer.
 *
 * Every preset keeps text at 7:1 or better against the background and the
 * clock face, the warning colour at 4.5:1 and the accent at 3:1, so a timer
 * stays readable from the back of a classroom. Fixed-date South African days
 * carry their date, so the one coming up can be pointed out. "My themes" are
 * the user's own, saved in this browser.
 */
(function () {
  'use strict';
  var LIST = [
    { g: 'everyday', id: 'night', en: 'Night', af: 'Nag', bg: '#08090b', fg: '#f2f5f9', accent: '#ed5c86', warnc: '#f5b041', face: '#111418' },
    { g: 'everyday', id: 'day', en: 'Day', af: 'Dag', bg: '#f7f5f0', fg: '#14161a', accent: '#c2185b', warnc: '#b45309', face: '#ffffff' },
    { g: 'everyday', id: 'contrast', en: 'High contrast', af: 'Hoë kontras', bg: '#000000', fg: '#ffff00', accent: '#ffffff', warnc: '#ff5c5c', face: '#000000' },
    { g: 'everyday', id: 'chalk', en: 'Chalkboard', af: 'Swartbord', bg: '#1f3a2d', fg: '#f4f1e8', accent: '#f2d16b', warnc: '#ff9e7a', face: '#264837' },
    { g: 'everyday', id: 'ocean', en: 'Ocean', af: 'See', bg: '#0b1d33', fg: '#e8f1fb', accent: '#4fb3ff', warnc: '#ffb347', face: '#10294a' },
    { g: 'temp', id: 'hot', en: 'Hot', af: 'Warm', bg: '#2a0a05', fg: '#fff3e6', accent: '#ff6b1a', warnc: '#ffd23f', face: '#3a120a' },
    { g: 'temp', id: 'cold', en: 'Cold', af: 'Koud', bg: '#06182b', fg: '#eaf6ff', accent: '#7fd6ff', warnc: '#ffb4a2', face: '#0b2440' },
    { g: 'season', id: 'summer', en: 'Summer', af: 'Somer', bg: '#fff8e7', fg: '#1d2a33', accent: '#c25e00', warnc: '#c62828', face: '#ffffff' },
    { g: 'season', id: 'autumn', en: 'Autumn', af: 'Herfs', bg: '#2b1810', fg: '#f6e7d7', accent: '#e8853a', warnc: '#f2c14e', face: '#3a2216' },
    { g: 'season', id: 'winter', en: 'Winter', af: 'Winter', bg: '#e9eef4', fg: '#1b2733', accent: '#2f5f96', warnc: '#b3261e', face: '#ffffff' },
    { g: 'season', id: 'spring', en: 'Spring', af: 'Lente', bg: '#f3f8ee', fg: '#1f2d1d', accent: '#c2386c', warnc: '#a14a00', face: '#ffffff' },
    { g: 'holiday', id: 'newyear', en: 'New Year', af: 'Nuwejaar', bg: '#0b0b14', fg: '#f5f1e6', accent: '#d4af37', warnc: '#ff7a7a', face: '#15152a', date: '01-01' },
    { g: 'holiday', id: 'valentine', en: "Valentine's Day", af: 'Valentynsdag', bg: '#2b0a14', fg: '#ffeef3', accent: '#ff5c87', warnc: '#ffd166', face: '#3d1020', date: '02-14' },
    { g: 'holiday', id: 'easter', en: 'Easter', af: 'Paasfees', bg: '#f8f3fb', fg: '#2a2233', accent: '#7a52b3', warnc: '#b43c0c', face: '#ffffff' },
    { g: 'holiday', id: 'freedom', en: 'Freedom Day', af: 'Vryheidsdag', bg: '#001b6e', fg: '#ffffff', accent: '#ffb612', warnc: '#ff7a6e', face: '#062684', date: '04-27' },
    { g: 'holiday', id: 'youth', en: 'Youth Day', af: 'Jeugdag', bg: '#141414', fg: '#ffffff', accent: '#ff8c1a', warnc: '#ff6b6b', face: '#222222', date: '06-16' },
    { g: 'holiday', id: 'mandela', en: 'Mandela Day', af: 'Mandeladag', bg: '#1a1206', fg: '#fff8ec', accent: '#f2a900', warnc: '#ff7b6b', face: '#2a1d0a', date: '07-18' },
    { g: 'holiday', id: 'women', en: "Women's Day", af: 'Vrouedag', bg: '#2a0f2a', fg: '#fbeefa', accent: '#d38ddb', warnc: '#ffb347', face: '#3a1640', date: '08-09' },
    { g: 'holiday', id: 'heritage', en: 'Heritage Day', af: 'Erfenisdag', bg: '#0d1b12', fg: '#fff8ea', accent: '#ffb612', warnc: '#ff6a5c', face: '#13281a', date: '09-24' },
    { g: 'holiday', id: 'diwali', en: 'Diwali', af: 'Diwali', bg: '#1c0b2e', fg: '#fff3d6', accent: '#ffb000', warnc: '#ff7a6b', face: '#2a1245' },
    { g: 'holiday', id: 'eid', en: 'Eid', af: 'Eid', bg: '#0b2a26', fg: '#f4efe2', accent: '#d9b44a', warnc: '#ff8a65', face: '#12382f' },
    { g: 'holiday', id: 'christmas', en: 'Christmas', af: 'Kersfees', bg: '#0e2a1c', fg: '#fbf6ee', accent: '#ff4d5e', warnc: '#f2c14e', face: '#143a27', date: '12-25' },
    // school colours, measured from the school's own logo (blue #003b6f, gold #eeae30)
    { g: 'school', id: 'curro-blue', en: 'Curro blue', af: 'Curro-blou', bg: '#003b6f', fg: '#ffffff', accent: '#eeae30', warnc: '#ff8f80', face: '#002b52' },
    { g: 'school', id: 'curro-gold', en: 'Curro gold', af: 'Curro-goud', bg: '#eeae30', fg: '#002b52', accent: '#003b6f', warnc: '#8a1409', face: '#f6d27e' }
  ];
  var GROUPS = [
    { id: 'everyday', en: 'Everyday', af: 'Alledaags' },
    { id: 'temp', en: 'Hot and cold', af: 'Warm en koud' },
    { id: 'season', en: 'Seasons', af: 'Seisoene' },
    { id: 'holiday', en: 'Holidays and special days', af: 'Vakansie- en spesiale dae' },
    { id: 'school', en: 'Schools', af: 'Skole' },
    { id: 'mine', en: 'My themes', af: 'My temas' }
  ];
  var WORDS = {
    custom: { en: 'Custom colours', af: 'Eie kleure' },
    now: { en: 'now', af: 'nou' },
    soon: { en: 'soon', af: 'binnekort' },
    moreFonts: { en: 'More fonts', af: 'Meer lettertipes' }
  };

  // Fonts. The first six are always offered; the rest sit under "More fonts"
  // and come from Google Fonts, loaded only when someone picks one. `w` is the
  // weight the timer digits use (some display fonts have one weight only).
  var FONTS = [
    { id: 'cabinet', name: 'Cabinet Grotesk', css: "'Cabinet Grotesk', system-ui, sans-serif", w: 700 },
    { id: 'mono', name: 'JetBrains Mono', css: "'JetBrains Mono', ui-monospace, monospace", w: 700 },
    { id: 'serif', name: 'Instrument Serif', css: "'Instrument Serif', Georgia, serif", w: 400, gf: true },
    { id: 'orbitron', name: 'Orbitron', css: "'Orbitron', Impact, sans-serif", w: 700, lazy: true, gf: true },
    { id: 'sans', name: 'Arial', css: 'Arial, Helvetica, sans-serif', w: 700 },
    { id: 'georgia', name: 'Georgia', css: "Georgia, 'Times New Roman', serif", w: 700 },
    { id: 'courier', name: 'Courier New', css: "'Courier New', Courier, monospace", w: 700 },
    { id: 'inter', g: 'sans', name: 'Inter', w: 700 },
    { id: 'roboto', g: 'sans', name: 'Roboto', w: 700 },
    { id: 'montserrat', g: 'sans', name: 'Montserrat', w: 700 },
    { id: 'poppins', g: 'sans', name: 'Poppins', w: 600 },
    { id: 'nunito', g: 'sans', name: 'Nunito', w: 800 },
    { id: 'lato', g: 'sans', name: 'Lato', w: 700 },
    { id: 'oswald', g: 'sans', name: 'Oswald', w: 600 },
    { id: 'barlow-condensed', g: 'sans', name: 'Barlow Condensed', w: 600 },
    { id: 'merriweather', g: 'serif', name: 'Merriweather', w: 700 },
    { id: 'playfair', g: 'serif', name: 'Playfair Display', w: 700 },
    { id: 'lora', g: 'serif', name: 'Lora', w: 700 },
    { id: 'roboto-slab', g: 'serif', name: 'Roboto Slab', w: 700 },
    { id: 'bitter', g: 'serif', name: 'Bitter', w: 700 },
    { id: 'bebas', g: 'display', name: 'Bebas Neue', w: 400 },
    { id: 'anton', g: 'display', name: 'Anton', w: 400 },
    { id: 'archivo-black', g: 'display', name: 'Archivo Black', w: 400 },
    { id: 'righteous', g: 'display', name: 'Righteous', w: 400 },
    { id: 'caveat', g: 'hand', name: 'Caveat', w: 700 },
    { id: 'kalam', g: 'hand', name: 'Kalam', w: 700 },
    { id: 'patrick-hand', g: 'hand', name: 'Patrick Hand', w: 400 },
    { id: 'permanent-marker', g: 'hand', name: 'Permanent Marker', w: 400 },
    { id: 'roboto-mono', g: 'mono', name: 'Roboto Mono', w: 700 },
    { id: 'ibm-plex-mono', g: 'mono', name: 'IBM Plex Mono', w: 700 },
    { id: 'space-mono', g: 'mono', name: 'Space Mono', w: 700 },
    { id: 'share-tech-mono', g: 'mono', name: 'Share Tech Mono', w: 400 }
  ];
  var FONT_GROUPS = [
    { id: 'sans', en: 'Sans serif', af: 'Skreefloos', fallback: 'system-ui, sans-serif' },
    { id: 'serif', en: 'Serif', af: 'Skreef', fallback: 'Georgia, serif' },
    { id: 'display', en: 'Display', af: 'Vertoon', fallback: 'Impact, sans-serif' },
    { id: 'hand', en: 'Handwriting', af: 'Handskrif', fallback: 'cursive' },
    { id: 'mono', en: 'Monospace', af: 'Monospasie', fallback: 'monospace' }
  ];
  function font(id) { return FONTS.filter(function (f) { return f.id === id; })[0] || FONTS[0]; }
  function fontCss(f) {
    if (f.css) return f.css;
    var gr = FONT_GROUPS.filter(function (x) { return x.id === f.g; })[0];
    return "'" + f.name + "', " + gr.fallback;
  }
  // Add the Google Fonts stylesheet for a "More fonts" font once, then call
  // done() when the font is ready to measure (so a filled screen re-fits).
  function loadFont(id, done) {
    var f = font(id), cb = done || function () {};
    if (!f.g && !f.lazy) { cb(); return; }
    var lid = 'ttfont-' + f.id, l = document.getElementById(lid);
    if (!l) {
      l = document.createElement('link'); l.id = lid; l.rel = 'stylesheet';
      l.href = cssUrl(f, f.w !== 400 ? ':wght@400;' + f.w : '', '');
      document.head.appendChild(l);
    }
    var ready = function () {
      if (document.fonts && document.fonts.load) document.fonts.load(f.w + ' 100px "' + f.name + '"').then(cb, cb); else cb();
    };
    if (l.sheet) ready(); else { l.addEventListener('load', ready); l.addEventListener('error', cb); }
  }
  function cssUrl(f, weights, extra) {
    return 'https://fonts.googleapis.com/css2?family=' + f.name.replace(/ /g, '+') + weights + extra + '&display=swap';
  }

  // ── Font picker ───────────────────────────────────────────────────────
  // A dropdown that shows every font name, and a sample time, in that font.
  // The main fonts come first; "More fonts" expands inside the same list.
  // Previews load as tiny subsets (just the letters shown) under their own
  // family names, so they never interfere with the timer's real font.
  var PREVIEW_TEXT = '0123456789:';
  var previewed = {};
  function previewFamily(f) { return f.g || f.gf ? "'ttprev-" + f.id + "', " + fontCss(f).split(', ').slice(1).join(', ') : fontCss(f); }
  function loadPreview(f) {
    if (!(f.g || f.gf) || previewed[f.id] || !window.FontFace) return;
    previewed[f.id] = 1;
    fetch(cssUrl(f, f.w !== 400 ? ':wght@' + f.w : '', '&text=' + encodeURIComponent(f.name + PREVIEW_TEXT)))
      .then(function (r) { return r.text(); })
      .then(function (css) {
        var m = css.match(/url\((https:[^)]+)\)/);
        if (!m) return;
        return new FontFace('ttprev-' + f.id, 'url(' + m[1] + ')', { weight: String(f.w) }).load().then(function (ff) { document.fonts.add(ff); });
      }).catch(function () { previewed[f.id] = 0; });
  }
  var FP_CSS = '.fontpick{position:relative}' +
    '.fp-btn{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;cursor:pointer;color:var(--fp-fg);background:var(--fp-bg);border:1px solid var(--fp-line);border-radius:8px}' +
    '.fp-btn:focus-visible,.fp-list:focus-visible{outline:2px solid var(--fp-accent);outline-offset:1px}' +
    '.fp-cur{flex:1;font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.fp-btn svg{flex-shrink:0;opacity:.7}' +
    '.fp-list{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:50;max-height:min(340px,60vh);overflow-y:auto;padding:4px;box-sizing:border-box;' +
      'color:var(--fp-fg);background:var(--fp-bg);border:1px solid var(--fp-line);border-radius:10px;box-shadow:0 14px 34px rgba(0,0,0,.35)}' +
    '.fp-list[hidden]{display:none}' +
    '.fp-list.up{top:auto;bottom:calc(100% + 4px)}' +
    '.fp-opt{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:7px 10px;border-radius:6px;cursor:pointer;font-size:17px;line-height:1.25}' +
    '.fp-opt .fp-sample{font-size:15px;opacity:.65;font-variant-numeric:tabular-nums}' +
    '.fp-opt.active{background:var(--fp-hl)}' +
    '.fp-opt[aria-selected="true"]{box-shadow:inset 3px 0 0 var(--fp-accent)}' +
    '.fp-more{display:flex;align-items:center;justify-content:space-between;margin-top:4px;padding:8px 10px;border-top:1px solid var(--fp-line);font:600 13.5px/1.2 inherit;cursor:pointer;border-radius:0 0 6px 6px}' +
    '.fp-more.active{background:var(--fp-hl)}' +
    '.fp-more svg{transition:transform .15s}.fp-more[aria-expanded="true"] svg{transform:rotate(90deg)}' +
    '.fp-group{padding:10px 10px 3px;font:700 11.5px/1.2 inherit;opacity:.6}';
  var CHEVRON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  var DOWN = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var pickers = 0;
  // host: an empty element. o: { value, lang, label, onPick(id) }. Returns { set(id, lang) }.
  function fontPicker(host, o) {
    if (!document.getElementById('tt-fontpick-css')) {
      var st = document.createElement('style'); st.id = 'tt-fontpick-css'; st.textContent = FP_CSS; document.head.appendChild(st);
    }
    var uid = 'fp' + (++pickers), cur = o.value, lang = o.lang || 'en', active = null, expanded = false;
    host.classList.add('fontpick'); host.innerHTML = '';
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'fp-btn';
    btn.setAttribute('aria-haspopup', 'listbox'); btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="fp-cur"></span>' + DOWN;
    var list = document.createElement('div'); list.className = 'fp-list'; list.id = uid + '-list';
    list.setAttribute('role', 'listbox'); list.tabIndex = -1; list.hidden = true;
    btn.setAttribute('aria-controls', list.id);
    host.appendChild(btn); host.appendChild(list);

    function item(f) {
      var d = document.createElement('div'); d.className = 'fp-opt'; d.id = uid + '-' + f.id;
      d.setAttribute('role', 'option'); d.dataset.id = f.id;
      d.style.fontFamily = previewFamily(f); d.style.fontWeight = f.w;
      d.innerHTML = '<span class="fp-name"></span><span class="fp-sample" aria-hidden="true">12:45</span>';
      d.firstChild.textContent = f.name;
      return d;
    }
    var more, moreBox;
    function build() {
      list.innerHTML = '';
      FONTS.filter(function (f) { return !f.g; }).forEach(function (f) { list.appendChild(item(f)); });
      more = document.createElement('div'); more.className = 'fp-more'; more.id = uid + '-more';
      more.setAttribute('role', 'option'); more.setAttribute('aria-expanded', String(expanded));
      more.innerHTML = '<span></span>' + CHEVRON; more.firstChild.textContent = word('moreFonts', lang);
      list.appendChild(more);
      moreBox = document.createElement('div'); moreBox.setAttribute('role', 'group'); moreBox.hidden = !expanded;
      FONT_GROUPS.forEach(function (gr) {
        var h = document.createElement('div'); h.className = 'fp-group'; h.setAttribute('role', 'presentation'); h.textContent = gr[lang] || gr.en;
        moreBox.appendChild(h);
        FONTS.filter(function (f) { return f.g === gr.id; }).forEach(function (f) { moreBox.appendChild(item(f)); });
      });
      list.appendChild(moreBox);
      paint();
    }
    function paint() {
      var f = font(cur), c = btn.firstChild;
      c.textContent = f.name; c.style.fontFamily = previewFamily(f); c.style.fontWeight = f.w;
      loadPreview(f);
      btn.setAttribute('aria-label', (o.label ? o.label + ': ' : '') + f.name);
      [].forEach.call(list.querySelectorAll('.fp-opt'), function (d) { d.setAttribute('aria-selected', String(d.dataset.id === cur)); });
    }
    function visible() { return [].filter.call(list.querySelectorAll('.fp-opt, .fp-more'), function (d) { return !d.closest('[hidden]'); }); }
    // keep the active font in view by scrolling the list itself; scrollIntoView
    // would scroll the whole page too, which made it jump
    function setActive(d, noScroll) {
      if (active) active.classList.remove('active');
      active = d;
      if (!d) return;
      d.classList.add('active'); list.setAttribute('aria-activedescendant', d.id);
      if (noScroll) return;
      if (d.offsetTop < list.scrollTop) list.scrollTop = d.offsetTop - 4;
      else if (d.offsetTop + d.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = d.offsetTop + d.offsetHeight - list.clientHeight + 4;
    }
    function expand(on) {
      expanded = on; moreBox.hidden = !on; more.setAttribute('aria-expanded', String(on));
      if (on) FONTS.forEach(function (f) { if (f.g) loadPreview(f); });
    }
    function open() {
      if (font(cur).g) expand(true);
      list.classList.remove('up');
      list.hidden = false; btn.setAttribute('aria-expanded', 'true');
      // open upwards when there is more room above the button than below it
      var r = btn.getBoundingClientRect(), below = window.innerHeight - r.bottom;
      if (below < list.offsetHeight + 8 && r.top > below) list.classList.add('up');
      FONTS.forEach(function (f) { if (!f.g || expanded) loadPreview(f); });
      setActive(document.getElementById(uid + '-' + cur) || visible()[0]);
      list.focus({ preventScroll: true });
    }
    function close(refocus) {
      if (list.hidden) return;
      list.hidden = true; btn.setAttribute('aria-expanded', 'false'); setActive(null);
      if (refocus) btn.focus({ preventScroll: true });
    }
    function choose(d) {
      if (!d) return;
      if (d === more) { expand(!expanded); setActive(more); return; }
      cur = d.dataset.id; paint(); close(true);
      if (o.onPick) o.onPick(cur);
    }
    btn.addEventListener('click', function () { list.hidden ? open() : close(true); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); open(); }
    });
    list.addEventListener('click', function (e) { var d = e.target.closest('.fp-opt, .fp-more'); if (d) choose(d); });
    list.addEventListener('mousemove', function (e) { var d = e.target.closest('.fp-opt, .fp-more'); if (d && d !== active) setActive(d, true); });
    list.addEventListener('keydown', function (e) {
      var v = visible(), i = v.indexOf(active), k = e.key;
      if (k === 'ArrowDown') setActive(v[Math.min(v.length - 1, i + 1)]);
      else if (k === 'ArrowUp') setActive(v[Math.max(0, i - 1)]);
      else if (k === 'Home') setActive(v[0]);
      else if (k === 'End') setActive(v[v.length - 1]);
      else if (k === 'Enter' || k === ' ') choose(active);
      else if (k === 'ArrowRight' && active === more && !expanded) expand(true);
      else if (k === 'ArrowLeft' && active === more && expanded) expand(false);
      else if (k === 'Escape') close(true);
      else if (k === 'Tab') { close(false); return; }
      else return;
      e.preventDefault(); e.stopPropagation();
    });
    document.addEventListener('pointerdown', function (e) { if (!host.contains(e.target)) close(false); });
    build();
    return { set: function (id, lg) { cur = id; if (lg && lg !== lang) { lang = lg; build(); } else paint(); } };
  }

  var KEY = 'ml-timer-talisman-themes-v1';
  var COLOURS = ['bg', 'fg', 'accent', 'warnc', 'face'];

  function word(k, lang) { return WORDS[k][lang] || WORDS[k].en; }
  function mine() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]').map(function (m) { m.g = 'mine'; return m; }); } catch (e) { return []; }
  }
  function saveMine(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }

  // the season now (southern hemisphere), and fixed-date days in the next two weeks
  function marker(th, lang) {
    var now = new Date();
    if (th.g === 'season') return th.id === ['summer', 'autumn', 'winter', 'spring'][Math.floor(((now.getMonth() + 1) % 12) / 3)] ? word('now', lang) : '';
    if (!th.date) return '';
    var p = th.date.split('-'), d = new Date(now.getFullYear(), +p[0] - 1, +p[1]), days = (d - now) / 864e5;
    if (days < -1) { d.setFullYear(d.getFullYear() + 1); days = (d - now) / 864e5; }
    return days >= -1 && days <= 14 ? word('soon', lang) : '';
  }
  function matches(th, look) { return COLOURS.every(function (k) { return String(look[k]).toLowerCase() === th[k].toLowerCase(); }); }

  // Fill a <select> with every theme, grouped, and select the one that matches
  // `look` ("Custom colours" when none does). Returns { shown, cur }.
  function fill(sel, look, lang) {
    var shown = LIST.concat(mine()), cur = null;
    sel.innerHTML = '';
    var custom = new Option(word('custom', lang), ''); custom.disabled = true; sel.appendChild(custom);
    GROUPS.forEach(function (gr) {
      var list = shown.filter(function (th) { return th.g === gr.id; });
      if (!list.length) return;
      var og = document.createElement('optgroup'); og.label = gr[lang] || gr.en;
      list.forEach(function (th) {
        var mk = th.g === 'mine' ? '' : marker(th, lang);
        og.appendChild(new Option((th.name || th[lang] || th.en) + (mk ? ' · ' + mk : ''), th.id));
      });
      sel.appendChild(og);
    });
    // a saved theme wins over a preset with the same colours, so it can be deleted
    shown.slice().sort(function (a, b) { return (b.g === 'mine') - (a.g === 'mine'); })
      .some(function (th) { if (matches(th, look)) { cur = th; return true; } });
    custom.hidden = !!cur;
    sel.value = cur ? cur.id : '';
    return { shown: shown, cur: cur };
  }
  function find(shown, id) { return shown.filter(function (th) { return th.id === id; })[0]; }
  function apply(th, look) { COLOURS.forEach(function (k) { look[k] = th[k]; }); }

  // ── Short links ─────────────────────────────────────────────────────
  // A link carries only the settings that differ from BASE (see KEYS below).
  // Older links (compressed "#z…", "#j…" and plain JSON) still open. BASE
  // must never change its values, or links would change meaning.
  var BASE = {
    mode: 'countdown', lang: 'en', title: '', showDate: true, warn: 5, sound: true,
    chime: { id: 'bell', vol: 70, rep: 3 },
    pomo: { work: 1500, short: 300, long: 900, every: 4, auto: true },
    cd: { secs: 600 },
    exam: { subject: '', paper: '', date: '', start: '', reading: 600, writing: 10800, info: '',
            // up to two more subjects writing in the same venue: the same start
            // and reading time, but each with its own writing time and finish
            count: 1, subject2: '', paper2: '', writing2: 10800, subject3: '', paper3: '', writing3: 10800,
            audio: false },   // play the instructions recording (TTAudio) before the start
    look: { display: 'digital', secs: true, h24: true, nums: true, now: true,
            bg: '#08090b', fg: '#f2f5f9', accent: '#ed5c86', warnc: '#f5b041', face: '#111418',
            font: 'cabinet', size: 100, tsize: 100, fit: false, layout: 'standard', fill: 'off', pic: false }
  };
  function merge(a, b) {
    var o = {};
    for (var k in a) o[k] = (a[k] && typeof a[k] === 'object') ? merge(a[k], (b && b[k]) || {}) : (b && b[k] !== undefined ? b[k] : a[k]);
    return o;
  }
  function unb64u(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/'); while (str.length % 4) str += '=';
    var s = atob(str), b = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
    return b;
  }
  function pipe(bytes, stream) {
    return new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  var canZip = typeof CompressionStream === 'function' && typeof DecompressionStream === 'function';

  // Readable links: "m=e&s=Maths&w=2h30m&t=curro-blue". One short key per
  // setting, and only the settings that differ from BASE. Times read like
  // "5m", "1h30m" or "45s"; on/off is 1/0; a space is "_". A key never
  // changes meaning once published; add new keys only.
  var KEYS = [
    ['mode', 'm', 'mode'], ['lang', 'l'], ['title', 'n'], ['showDate', 'sd', 'bool'], ['warn', 'wn', 'num'], ['sound', 'sn', 'bool'],
    ['chime.id', 'ch'], ['chime.vol', 'cv', 'num'], ['chime.rep', 'cr', 'num'],
    ['pomo.work', 'pw', 'dur'], ['pomo.short', 'ps', 'dur'], ['pomo.long', 'pl', 'dur'], ['pomo.every', 'pe', 'num'], ['pomo.auto', 'pa', 'bool'],
    ['cd.secs', 'c', 'dur'],
    ['exam.subject', 's'], ['exam.paper', 'p'], ['exam.date', 'd'], ['exam.start', 'st'],
    ['exam.reading', 'r', 'dur'], ['exam.writing', 'w', 'dur'], ['exam.info', 'i'],
    ['exam.count', 'xn', 'num'], ['exam.subject2', 's2'], ['exam.paper2', 'p2'], ['exam.writing2', 'w2', 'dur'],
    ['exam.subject3', 's3'], ['exam.paper3', 'p3'], ['exam.writing3', 'w3', 'dur'], ['exam.audio', 'au', 'bool'],
    ['look.display', 'v', 'view'], ['look.secs', 'ss', 'bool'], ['look.h24', 'h', 'bool'], ['look.nums', 'nu', 'bool'], ['look.now', 'nw', 'bool'],
    ['look.bg', 'bg', 'hex'], ['look.fg', 'fg', 'hex'], ['look.accent', 'ac', 'hex'], ['look.warnc', 'wc', 'hex'], ['look.face', 'fc', 'hex'],
    ['look.font', 'f'], ['look.size', 'z', 'num'], ['look.tsize', 'tz', 'num'], ['look.fit', 'x', 'bool'],
    ['look.layout', 'y', 'layout'], ['look.fill', 'fl', 'fill'], ['look.pic', 'pi', 'bool']
  ];
  var MODES = { pomodoro: 'p', countdown: 'c', clock: 'k', stopwatch: 's', exam: 'e' };
  var VIEWS = { digital: 'd', analogue: 'a', both: 'b' };
  var LAYOUTS = { minimal: 'm', simple: 's', standard: 'n', detailed: 'd' };
  var FILLS = { off: '0', across: 'a', up: 'u' };
  function flip(o) { var r = {}; for (var k in o) r[o[k]] = k; return r; }
  function getPath(o, p) { return p.split('.').reduce(function (x, k) { return x && x[k]; }, o); }
  function setPath(o, p, v) { var ks = p.split('.'), last = ks.pop(); ks.reduce(function (x, k) { return x[k] = x[k] || {}; }, o)[last] = v; }
  function durOut(s) {
    var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return (h ? h + 'h' : '') + (m ? m + 'm' : '') + (x || !s ? x + 's' : '');
  }
  function durIn(v) {
    var t = 0, re = /(\d+(?:\.\d+)?)([hms]?)/g, mm;
    while ((mm = re.exec(v))) t += parseFloat(mm[1]) * ({ h: 3600, m: 60, s: 1 }[mm[2]] || 1);
    return Math.round(t);
  }
  // text: letters, digits and a few safe marks stay as they are; a space is "_"
  function textOut(s) {
    return String(s).replace(/[^A-Za-z0-9 \-.~!$'()*,;:@\/]/gu, function (c) { return c === '_' ? '%5F' : encodeURIComponent(c); }).replace(/ /g, '_');
  }
  function textIn(s) { return decodeURIComponent(s.replace(/_/g, ' ')); }
  function valOut(kind, v) {
    if (kind === 'bool') return v ? '1' : '0';
    if (kind === 'dur') return durOut(v);
    if (kind === 'mode') return MODES[v] || textOut(v);
    if (kind === 'view') return VIEWS[v] || textOut(v);
    if (kind === 'layout') return LAYOUTS[v] || textOut(v);
    if (kind === 'fill') return FILLS[v] || textOut(v);
    if (kind === 'hex') return String(v).replace(/^#/, '');
    return textOut(v);
  }
  function valIn(kind, v) {
    if (kind === 'bool') return v !== '0';
    if (kind === 'dur') return durIn(v);
    if (kind === 'num') return parseFloat(v) || 0;
    if (kind === 'mode') return flip(MODES)[v] || textIn(v);
    if (kind === 'view') return flip(VIEWS)[v] || textIn(v);
    if (kind === 'layout') return flip(LAYOUTS)[v] || textIn(v);
    if (kind === 'fill') return flip(FILLS)[v] || textIn(v);
    if (kind === 'hex') return '#' + v;
    return textIn(v);
  }

  // settings → the part after "#"
  function encode(cfg) {
    var parts = [];
    // colours that match a preset travel as the preset's id ("t") instead
    var preset = LIST.filter(function (th) { return matches(th, cfg.look); })[0];
    KEYS.forEach(function (k) {
      var v = getPath(cfg, k[0]);
      if (v === undefined || v === getPath(BASE, k[0])) return;
      if (preset && k[2] === 'hex') return;
      parts.push(k[1] + '=' + valOut(k[2], v));
    });
    if (preset && preset.id !== 'night') parts.push('t=' + preset.id);   // night is the default look
    var h = parts.join('&');
    // chat apps leave a final full stop or bracket out of a link; keep it in
    h = h.replace(/[.,!?:;)'*]$/, function (c) { return '%' + c.charCodeAt(0).toString(16).toUpperCase(); });
    return Promise.resolve(h);
  }
  function decodeKeys(h) {
    var obj = {}, byKey = {};
    KEYS.forEach(function (k) { byKey[k[1]] = k; });
    h.split('&').forEach(function (pair) {
      var i = pair.indexOf('='), key = i < 0 ? pair : pair.slice(0, i), v = i < 0 ? '1' : pair.slice(i + 1);
      try {
        if (key === 't') obj.t = textIn(v);
        else if (byKey[key]) setPath(obj, byKey[key][0], valIn(byKey[key][2], v));
      } catch (e) {}
    });
    return obj;
  }
  // The timer's own address. The live site serves timer.html as plain
  // "/timer"; a local copy needs the ".html".
  function page() {
    var live = location.protocol === 'https:' && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    return new URL(live ? 'timer' : 'timer.html', location.href).href;
  }
  // the part after "#" → full settings (BASE filled in for anything missing)
  function decode(h) {
    var done = function (obj) {
      obj = obj || {};
      var preset = obj.t && LIST.filter(function (th) { return th.id === obj.t; })[0];
      if (preset) { obj.look = obj.look || {}; COLOURS.forEach(function (k) { obj.look[k] = preset[k]; }); }
      delete obj.t;
      return merge(BASE, obj);
    };
    try {
      if (/^[a-z]{1,2}(=|&|$)/.test(h)) return Promise.resolve(done(decodeKeys(h)));
      // earlier link forms: "z…" (compressed JSON), "j…" (base64 JSON), "%7B…" (JSON)
      if (h[0] === 'z' && canZip) return pipe(unb64u(h.slice(1)), new DecompressionStream('deflate-raw'))
        .then(function (b) { return done(JSON.parse(new TextDecoder().decode(b))); }, function () { return done(); });
      if (h[0] === 'j') return Promise.resolve(done(JSON.parse(new TextDecoder().decode(unb64u(h.slice(1))))));
      if (h) return Promise.resolve(done(JSON.parse(decodeURIComponent(h))));   // older, long links
    } catch (e) {}
    return Promise.resolve(done());
  }

  // ── Chime sounds, made with Web Audio (no sound files) ─────────────────
  var SOUNDS = [
    { id: 'bell', en: 'Bell', af: 'Klok', len: 1.6, play: function (c, o, t) { tone(c, o, t, 880, 1.5, 'sine', 0.5); tone(c, o, t, 1760, 0.9, 'sine', 0.16); tone(c, o, t, 2640, 0.5, 'sine', 0.07); } },
    { id: 'chime', en: 'Soft chime', af: 'Sagte klokkie', len: 1.1, play: function (c, o, t) { tone(c, o, t, 660, 0.9, 'sine', 0.4); tone(c, o, t + 0.18, 880, 0.9, 'sine', 0.4); } },
    { id: 'dingdong', en: 'Ding-dong', af: 'Ding-dong', len: 1.7, play: function (c, o, t) { tone(c, o, t, 659, 1.0, 'sine', 0.45); tone(c, o, t, 1318, 0.6, 'sine', 0.1); tone(c, o, t + 0.5, 523, 1.1, 'sine', 0.45); tone(c, o, t + 0.5, 1046, 0.6, 'sine', 0.1); } },
    { id: 'marimba', en: 'Marimba', af: 'Marimba', len: 0.9, play: function (c, o, t) { [523, 659, 784].forEach(function (f, i) { tone(c, o, t + i * 0.12, f, 0.4, 'triangle', 0.45); }); } },
    { id: 'gong', en: 'Gong', af: 'Gong', len: 3, play: function (c, o, t) { tone(c, o, t, 110, 2.8, 'sine', 0.6); tone(c, o, t, 165, 2.2, 'sine', 0.25); tone(c, o, t, 223, 1.6, 'sine', 0.15); tone(c, o, t, 331, 1.0, 'sine', 0.08); } },
    { id: 'beep', en: 'Beep', af: 'Piep', len: 0.5, play: function (c, o, t) { tone(c, o, t, 1000, 0.12, 'square', 0.16); tone(c, o, t + 0.2, 1000, 0.12, 'square', 0.16); } },
    { id: 'alarm', en: 'Alarm', af: 'Alarm', len: 0.95, play: function (c, o, t) { for (var i = 0; i < 4; i++) tone(c, o, t + i * 0.22, i % 2 ? 720 : 960, 0.18, 'square', 0.14); } },
    { id: 'chirp', en: 'Bird chirp', af: 'Voëltjie', len: 0.6, play: function (c, o, t) { [0, 0.16, 0.32].forEach(function (d) { tone(c, o, t + d, 2200, 0.12, 'sine', 0.3, 3600); }); } }
  ];
  function tone(c, out, t0, f, dur, type, peak, sweepTo) {
    var osc = c.createOscillator(), g = c.createGain();
    osc.type = type; osc.frequency.setValueAtTime(f, t0);
    if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, t0 + dur * 0.75);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(peak, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(out); osc.start(t0); osc.stop(t0 + dur + 0.05);
  }
  var actx = null;
  // Browsers only allow sound after the user has clicked or pressed a key on
  // the page; call this from such an event so a later chime can play.
  function unlock() {
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch (e) {}
    return actx;
  }
  function playSound(id, vol, times) {
    var c = unlock(); if (!c) return;
    var snd = SOUNDS.filter(function (x) { return x.id === id; })[0] || SOUNDS[0];
    var master = c.createGain(); master.gain.value = Math.pow(Math.max(0, Math.min(100, vol)) / 100, 1.6); master.connect(c.destination);
    var t = c.currentTime + 0.03;
    for (var i = 0; i < Math.max(1, times || 1); i++) { snd.play(c, master, t); t += snd.len + 0.15; }
  }
  function fillSounds(sel, cur, lang) {
    sel.innerHTML = '';
    SOUNDS.forEach(function (x) { sel.appendChild(new Option(x[lang] || x.en, x.id)); });
    sel.value = cur;
  }

  // ── The screen-fill picture ──
  // A picture is far too big for a link, so it stays in this browser
  // (localStorage), shrunk to a JPEG. The link only says "use the picture";
  // on another computer the teacher chooses it again in the timer's settings.
  var PIC_KEY = 'tt-fill-picture';
  function picGet() { try { return localStorage.getItem(PIC_KEY); } catch (e) { return null; } }
  function picClear() { try { localStorage.removeItem(PIC_KEY); } catch (e) {} }
  function picSave(file, done) {
    var url = URL.createObjectURL(file), img = new Image();
    img.onload = function () {
      URL.revokeObjectURL(url);
      // try a large copy first, then smaller ones if the browser's storage is full
      var tries = [[1920, 0.82], [1440, 0.75], [1024, 0.7]];
      for (var i = 0; i < tries.length; i++) {
        var k = Math.min(1, tries[i][0] / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        try { localStorage.setItem(PIC_KEY, c.toDataURL('image/jpeg', tries[i][1])); return done(true); } catch (e) {}
      }
      done(false);
    };
    img.onerror = function () { URL.revokeObjectURL(url); done(false); };
    img.src = url;
  }

  // ── The exam instructions recording ──
  // A sound file is far too big for a link or localStorage, so it stays in
  // this browser's IndexedDB. The link only says "offer the recording". With
  // no file of its own, a browser uses the built-in one (BUILTIN), so any
  // computer, such as the projector's, has a recording straight away.
  // Saving or removing a file bumps AUDIO_KEY in localStorage, so an open
  // timer tab hears about it through the storage event.
  var AUDIO_KEY = 'tt-audio-changed';
  // the Grade 8–11 exam regulations, read out before the start
  var BUILTIN = { url: 'assets/timer-talisman/exam-regulations-gr8-11.m4a', name: 'Gr 8-11 Exam regulations' };
  function audioDb(fn, done) {
    var req;
    try { req = indexedDB.open('tt-audio', 1); } catch (e) { return done(null); }
    req.onupgradeneeded = function () { req.result.createObjectStore('files'); };
    req.onerror = function () { done(null); };
    req.onsuccess = function () {
      var db = req.result, tx;
      try { tx = db.transaction('files', fn ? 'readwrite' : 'readonly'); } catch (e) { db.close(); return done(null); }
      var store = tx.objectStore('files'), r = fn ? fn(store) : store.get('instructions');
      tx.oncomplete = function () { db.close(); done(fn ? true : (r && r.result) || null); };
      tx.onerror = tx.onabort = function () { db.close(); done(null); };
    };
  }
  function audioTouched() { try { localStorage.setItem(AUDIO_KEY, String(Date.now())); } catch (e) {} }
  function audioGet(done) { audioDb(null, done); }
  function audioSave(file, done) {
    // .m4a files are often reported as video/mp4, or with no type at all
    if (!file || !/^(audio|video)\//.test(file.type || 'audio/')) return done(false);
    var name = String(file.name || '').replace(/\.[^.]+$/, '');
    audioDb(function (st) { return st.put({ blob: file, name: name, type: file.type }, 'instructions'); },
      function (ok) { if (ok) audioTouched(); done(!!ok); });
  }
  // the recording to play: this browser's own file, or else the built-in one
  function audioResolve(done) {
    audioGet(function (rec) {
      if (rec && rec.blob) done({ blob: rec.blob, name: rec.name || '', own: true });
      else done({ url: BUILTIN.url, name: BUILTIN.name, own: false });
    });
  }
  function audioClear(done) {
    audioDb(function (st) { return st.delete('instructions'); }, function () { audioTouched(); if (done) done(); });
  }

  window.TTPicture = { get: picGet, save: picSave, clear: picClear, key: PIC_KEY };
  window.TTAudio = { get: audioGet, resolve: audioResolve, save: audioSave, clear: audioClear, key: AUDIO_KEY, builtin: BUILTIN };
  window.TTLink = { BASE: BASE, encode: encode, decode: decode, merge: merge, page: page };
  window.TTSounds = { play: playSound, unlock: unlock, fill: fillSounds };
  // ── The exam timetable (assets/timer-talisman/timetable.json) ──
  // Shared by the setup page and the timer's settings panel: the data, and
  // turning a date, a writing start and a venue into the exam settings.
  var TT_WORDS = {
    en: { grade: 'Grade {g}', paper: 'Paper {n}', prac: 'Practical' },
    af: { grade: 'Graad {g}', paper: 'Vraestel {n}', prac: 'Prakties' }
  };
  var TT_DATA = null, TT_WAIT = [];
  function ttLoad(done) {
    if (TT_DATA) return done(TT_DATA);
    TT_WAIT.push(done);
    if (TT_WAIT.length > 1) return;
    fetch('assets/timer-talisman/timetable.json', { cache: 'no-cache' }).then(function (r) { return r.json(); })
      .then(function (d) { TT_DATA = d; TT_WAIT.splice(0).forEach(function (f) { f(d); }); })
      .catch(function () { TT_WAIT.splice(0).forEach(function (f) { f(null); }); });
  }
  function ttUniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }
  function ttDays(d) { return ttUniq(d.entries.map(function (e) { return e.date; })).sort(); }
  function ttSessions(d, date) { return ttUniq(d.entries.filter(function (e) { return e.date === date; }).map(function (e) { return e.start; })).sort(); }
  function ttVenues(d, date, start) {
    var v = [];
    d.entries.forEach(function (e) { if (e.date === date && e.start === start) e.venues.forEach(function (x) { if (v.indexOf(x) < 0) v.push(x); }); });
    return v.sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); });
  }
  function ttHere(d, date, start, venue) { return d.entries.filter(function (e) { return e.date === date && e.start === start && e.venues.indexOf(venue) >= 0; }); }
  // the subjects in one venue: one column per writing time, so equal lengths share a column
  function ttColumns(d, date, start, venue, lang) {
    var W = TT_WORDS[lang] || TT_WORDS.en, by = {};
    ttHere(d, date, start, venue).forEach(function (e) { (by[e.mins] = by[e.mins] || []).push(e); });
    var name = function (code) { return code.split('/').map(function (c) { var n = d.names[c]; return n ? n[lang === 'af' ? 1 : 0] : c; }).join(' / '); };
    var paper = function (e) {
      var pp = e.paper === 'PRAC' ? W.prac : e.paper ? W.paper.replace('{n}', e.paper.replace(/^P/, '')) : '';
      return W.grade.replace('{g}', e.grade) + (pp ? ' · ' + pp : '');
    };
    return Object.keys(by).map(Number).map(function (m) {
      var es = by[m].sort(function (a, b) { return a.grade - b.grade; });
      return { mins: m, name: ttUniq(es.map(function (e) { return name(e.code); })).join(' / '), paper: ttUniq(es.map(paper)).join(' / '), grade: es[0].grade };
    }).sort(function (a, b) { return a.grade - b.grade || a.mins - b.mins; });
  }
  // the exam settings for a date, writing start and venue. The reading time
  // comes first, so the timer's start is the writing start minus it.
  function ttFill(d, date, start, venue, lang) {
    var cols = ttColumns(d, date, start, venue, lang);
    if (!cols.length) return null;
    var R = d.reading || 600, p = start.split(':'), mins = +p[0] * 60 + +p[1] - Math.round(R / 60);
    var exam = { date: date, reading: R, start: ('0' + Math.floor(mins / 60)).slice(-2) + ':' + ('0' + mins % 60).slice(-2), count: Math.min(3, cols.length) };
    cols.slice(0, 3).forEach(function (c, i) { var k = i ? String(i + 1) : ''; exam['subject' + k] = c.name; exam['paper' + k] = c.paper; exam['writing' + k] = c.mins * 60; });
    return { exam: exam, columns: cols, more: cols.length > 3 };
  }
  window.TTTimetable = { load: ttLoad, days: ttDays, sessions: ttSessions, venues: ttVenues, columns: ttColumns, fill: ttFill };

  window.TTThemes = { list: LIST, colours: COLOURS, mine: mine, saveMine: saveMine, fill: fill, find: find, apply: apply,
                      font: font, fontCss: fontCss, loadFont: loadFont, fontPicker: fontPicker };
})();
