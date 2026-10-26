/* The Magic Lab — "On this page" list beside lesson text.
 *
 * On wide screens the margin to the right of the lesson column shows the
 * lesson's section headings (its <h2>s). Clicking one scrolls to it; the
 * section being read is highlighted. It only appears while the Lesson tab is
 * showing, when there is room beside the text (and at least three sections),
 * and never in print. Nothing in the lesson content changes: the list is
 * built from the headings already on the page.
 */
(function () {
  'use strict';
  var GAP = 40, MAX_W = 230, MIN_W = 170, MIN_SECTIONS = 3, TOP = 96;
  var af = /\.af\.html$/.test(location.pathname) || (document.documentElement.lang || '').indexOf('af') === 0;
  var body, heads = [], toc, links = [], active = -1;

  function slug(t, used) {
    var s = t.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 48) || 'section';
    var base = s, n = 2;
    while (used[s] || document.getElementById(s)) s = base + '-' + n++;
    used[s] = true; return s;
  }

  function build() {
    // the lesson column with the most section headings
    var best = null, bestN = 0;
    document.querySelectorAll('.lesson-body').forEach(function (b) {
      var n = b.querySelectorAll('h2').length;
      if (n > bestN) { best = b; bestN = n; }
    });
    if (!best || bestN < MIN_SECTIONS) return false;
    body = best;
    heads = Array.prototype.slice.call(body.querySelectorAll('h2'));
    var used = {};
    var accent = (document.querySelector('.lesson-tag') && getComputedStyle(document.querySelector('.lesson-tag')).color) || '';
    toc = document.createElement('nav');
    toc.className = 'ml-toc';
    toc.setAttribute('aria-label', af ? 'Op hierdie bladsy' : 'On this page');
    if (accent) toc.style.setProperty('--toc-accent', accent);
    var title = document.createElement('div');
    title.className = 'ml-toc-title';
    title.textContent = af ? 'Op hierdie bladsy' : 'On this page';
    var list = document.createElement('ol');
    heads.forEach(function (h, i) {
      if (!h.id) h.id = slug(h.textContent, used);
      h.style.scrollMarginTop = (TOP - 8) + 'px';
      var li = document.createElement('li'), a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.replace(/\s+/g, ' ').trim();
      a.addEventListener('click', function (e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (history.replaceState) history.replaceState(null, '', '#' + h.id);
        setActive(i);
      });
      li.appendChild(a); list.appendChild(li); links.push(a);
    });
    toc.appendChild(title); toc.appendChild(list);
    document.body.appendChild(toc);
    addRevise();
    return true;
  }

  // Under the list, a link into Memory Mirror when this lesson has a
  // flashcard deck (assets/memory-mirror/). Lessons without one get nothing.
  function addRevise() {
    if (!window.fetch) return;
    var key = location.pathname.replace(/^\/+/, '').replace(/(\.af)?\.html$/, '');
    var dir = key.slice(0, key.lastIndexOf('/')), slug = key.slice(key.lastIndexOf('/') + 1);
    var base = '/assets/memory-mirror/';
    fetch(base + 'manifest.json').then(function (r) { return r.ok ? r.json() : null; }).then(function (m) {
      var g = m && m.groups.filter(function (x) { return x.path === dir; })[0];
      return g ? fetch(base + g.file).then(function (r) { return r.ok ? r.json() : null; }) : null;
    }).then(function (d) {
      var deck = d && d.decks.filter(function (x) { return x.lesson === slug; })[0];
      if (!deck) return;
      var a = document.createElement('a');
      a.className = 'ml-toc-revise';
      a.href = '/memory-mirror.html?lesson=' + encodeURIComponent(key);
      a.innerHTML = '<span>' + (af ? 'Hersien met flitskaarte' : 'Revise with flashcards') + '</span><small>' +
        deck.cards.length + (af ? ' kaarte · Memory Mirror' : ' cards · Memory Mirror') + '</small>';
      toc.appendChild(a);
      place();
    }).catch(function () {});
  }

  function setActive(i) {
    if (i === active) return;
    if (links[active]) links[active].removeAttribute('aria-current');
    active = i;
    if (links[i]) links[i].setAttribute('aria-current', 'location');
  }

  function place() {
    if (!toc) return;
    var visible = !!body.offsetParent;
    var r = body.getBoundingClientRect();
    var left = r.right + GAP;
    // as wide as the margin allows, between MIN_W and MAX_W
    var room = window.innerWidth - left - 20;
    if (!visible || room < MIN_W || r.bottom < TOP + 80) { toc.hidden = true; return; }
    toc.hidden = false;
    toc.style.width = Math.min(MAX_W, room) + 'px';
    var h = toc.offsetHeight;
    // follow the lesson column: start level with its top, stay put while
    // scrolling, and stop at the column's end
    var top = Math.max(TOP, r.top);
    top = Math.min(top, r.bottom - h);
    toc.style.left = left + 'px';
    toc.style.top = top + 'px';
    // current section: the last heading that has scrolled past the top band
    var cur = 0;
    for (var i = 0; i < heads.length; i++) if (heads[i].getBoundingClientRect().top < TOP + 40) cur = i;
    setActive(cur);
  }

  function init() {
    if (!build()) return;
    var css = document.createElement('style');
    css.id = 'ml-toc-style';
    css.textContent =
      // reset first: lesson pages style every <nav> as their top bar
      '.ml-toc{all:unset;box-sizing:border-box;display:block;position:fixed;max-height:calc(100vh - ' + (TOP + 24) + 'px);overflow:auto;z-index:20;font-size:13px;line-height:1.45;font-family:inherit}' +
      '.ml-toc[hidden]{display:none}' +
      '.ml-toc-title{font-weight:700;color:rgba(226,232,240,.92);margin:0 0 10px}' +
      '.ml-toc ol{list-style:none;margin:0;padding:0;border-left:1px solid rgba(255,255,255,.12)}' +
      '.ml-toc li{margin:0}' +
      '.ml-toc a{display:block;padding:5px 0 5px 14px;margin-left:-1px;border-left:2px solid transparent;color:rgba(226,232,240,.62);text-decoration:none}' +
      '.ml-toc a:hover{color:rgba(226,232,240,.95)}' +
      '.ml-toc a[aria-current]{color:var(--toc-accent,#e3e8ef);border-left-color:var(--toc-accent,#e3e8ef);font-weight:600}' +
      '.ml-toc a:focus-visible{outline:2px solid var(--toc-accent,#e3e8ef);outline-offset:2px}' +
      '.ml-toc a.ml-toc-revise{margin:16px 0 0;padding:10px 12px;border:1px solid rgba(255,255,255,.16);border-radius:8px;color:rgba(226,232,240,.95);font-weight:600}' +
      '.ml-toc a.ml-toc-revise:hover{border-color:var(--toc-accent,#e3e8ef)}' +
      '.ml-toc-revise small{display:block;font-weight:400;font-size:12px;color:rgba(226,232,240,.62);margin-top:2px}' +
      '@media print{.ml-toc{display:none!important}}';
    document.head.appendChild(css);
    place();
    // at most one layout pass per frame, however many events arrive
    var queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; place(); });
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // tab switches show and hide the lesson column (class changes on the
    // tab panels); our own moves and simulation style updates are ignored
    document.addEventListener('click', function () { setTimeout(schedule, 0); });
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var t = muts[i].target;
        if (t.classList && t.classList.contains('tab-panel')) { schedule(); return; }
      }
    }).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
