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
    { id: 'serif', name: 'Instrument Serif', css: "'Instrument Serif', Georgia, serif", w: 400 },
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
    { id: 'orbitron', g: 'display', name: 'Orbitron', w: 700 },
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
    if (!f.g) { cb(); return; }
    var lid = 'ttfont-' + f.id, l = document.getElementById(lid);
    if (!l) {
      l = document.createElement('link'); l.id = lid; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=' + f.name.replace(/ /g, '+') + (f.w !== 400 ? ':wght@400;' + f.w : '') + '&display=swap';
      document.head.appendChild(l);
    }
    var ready = function () {
      if (document.fonts && document.fonts.load) document.fonts.load(f.w + ' 100px "' + f.name + '"').then(cb, cb); else cb();
    };
    if (l.sheet) ready(); else { l.addEventListener('load', ready); l.addEventListener('error', cb); }
  }
  // Fill the main font <select> (first six plus "More fonts…") and the more
  // fonts <select>. Returns true when the current font is one of the extras.
  function fillFonts(main, more, cur, lang) {
    main.innerHTML = ''; more.innerHTML = '';
    FONTS.filter(function (f) { return !f.g; }).forEach(function (f) { main.appendChild(new Option(f.name, f.id)); });
    main.appendChild(new Option(word('moreFonts', lang) + '…', 'more'));
    FONT_GROUPS.forEach(function (gr) {
      var og = document.createElement('optgroup'); og.label = gr[lang] || gr.en;
      FONTS.filter(function (f) { return f.g === gr.id; }).forEach(function (f) { og.appendChild(new Option(f.name, f.id)); });
      more.appendChild(og);
    });
    var f = font(cur);
    main.value = f.g ? 'more' : f.id;
    if (f.g) more.value = f.id;
    return !!f.g;
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

  window.TTThemes = { list: LIST, colours: COLOURS, mine: mine, saveMine: saveMine, fill: fill, find: find, apply: apply,
                      font: font, fontCss: fontCss, loadFont: loadFont, fillFonts: fillFonts };
})();
