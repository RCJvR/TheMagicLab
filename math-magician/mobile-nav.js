/* Math Magician — phone navigation (≤ 700 px wide).
 *
 * The tab bar sits in a sticky bar with a "Chapters" button and the current
 * topic. The sidebar becomes a panel that slides in over the content: picking
 * a topic (or Mixed exam practice) closes it and jumps to the top of the
 * lesson. Tapping outside it, the ✕ button, Escape and the phone's back
 * button also close it. On a learner's first visit on a phone the panel opens
 * by itself. Wider screens keep the normal sidebar; nothing here applies. */
(function () {
  const TXT = {
    en: { chapters: 'Chapters', close: 'Close chapters', choose: 'Choose a topic', exam: 'Mixed exam practice' },
    af: { chapters: 'Hoofstukke', close: 'Maak hoofstukke toe', choose: 'Kies \'n onderwerp', exam: 'Gemengde eksamenoefening' }
  };
  const SEEN = 'mm_nav_seen';
  const phone = window.matchMedia('(max-width: 700px)');
  const L = () => TXT[document.documentElement.lang === 'af' ? 'af' : 'en'];

  function init() {
    const sidebar = document.getElementById('sidebar'), list = document.getElementById('sidebarList');
    const tabBar = document.getElementById('tabBar');
    if (!sidebar || !list || !tabBar) return;

    // Sticky wrapper: [Chapters button · current topic] above the tabs.
    const stick = document.createElement('div');
    stick.id = 'mmStick';
    stick.innerHTML = `<div id="mmNavRow">
        <button type="button" id="mmNavBtn" aria-controls="sidebar" aria-expanded="false"><span class="mm-nav-burger" aria-hidden="true"></span><span class="mm-nav-btn-text"></span></button>
        <span id="mmNavTopic"></span>
      </div>`;
    tabBar.parentNode.insertBefore(stick, tabBar);
    stick.appendChild(tabBar);

    const close = document.createElement('button');
    close.type = 'button'; close.id = 'mmNavClose'; close.textContent = '✕';
    document.getElementById('sidebarHeader').appendChild(close);

    const backdrop = document.createElement('div');
    backdrop.id = 'mmNavBackdrop';
    document.body.appendChild(backdrop);

    const btn = stick.querySelector('#mmNavBtn');
    const isOpen = () => document.body.classList.contains('mm-nav-open');

    function setInert() { sidebar.inert = phone.matches && !isOpen(); }

    function open() {
      if (!phone.matches || isOpen()) return;
      document.body.classList.add('mm-nav-open');
      document.documentElement.classList.add('mm-nav-lock');
      btn.setAttribute('aria-expanded', 'true');
      setInert();
      history.pushState({ mmNav: true }, '');
      const active = list.querySelector('.topic-item.active');
      if (active) list.scrollTop += active.getBoundingClientRect().top - list.getBoundingClientRect().top - 80;
      close.focus({ preventScroll: true });
    }
    // fromHistory: the back button already removed our history entry.
    function shut(fromHistory) {
      if (!isOpen()) return;
      document.body.classList.remove('mm-nav-open');
      document.documentElement.classList.remove('mm-nav-lock');
      btn.setAttribute('aria-expanded', 'false');
      setInert();
      try { localStorage.setItem(SEEN, '1'); } catch (_) {}
      if (!fromHistory && history.state && history.state.mmNav) history.back();
    }
    function toLessonTop() {
      if (!phone.matches) return;
      const y = stick.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, y - 1), behavior: 'auto' });
    }

    btn.addEventListener('click', open);
    // Switching tabs further down the page starts the new tab at its top.
    tabBar.addEventListener('click', e => {
      if (e.target.closest('.tab-btn') && stick.getBoundingClientRect().top <= 0) setTimeout(toLessonTop, 0);
    });
    close.addEventListener('click', () => { shut(); btn.focus({ preventScroll: true }); });
    backdrop.addEventListener('click', () => shut());
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen()) { shut(); btn.focus({ preventScroll: true }); } });
    window.addEventListener('popstate', () => shut(true));
    // Choosing a topic or the exam closes the panel.
    sidebar.addEventListener('click', e => {
      if (e.target.closest('.topic-item, #mxOpen')) { shut(); setTimeout(toLessonTop, 0); }
    });
    phone.addEventListener('change', () => { if (!phone.matches) shut(); setInert(); });

    // Keep the button text and the current-topic label in step with the sidebar.
    function refresh() {
      const t = L();
      btn.querySelector('.mm-nav-btn-text').textContent = t.chapters;
      btn.setAttribute('aria-label', t.chapters);
      close.setAttribute('aria-label', t.close);
      const exam = document.getElementById('mxOpen');
      let label = t.choose;
      if (exam && exam.classList.contains('on')) label = t.exam;
      else {
        const active = list.querySelector('.topic-item.active');
        if (active) {
          const group = active.closest('.chapter-topics');
          const hdr = group && group.previousElementSibling;
          const ch = hdr ? (hdr.querySelector('.chapter-hdr-left span') || hdr).textContent.split('—')[0].trim() : '';
          const name = active.querySelector('.topic-name').textContent.trim();
          label = ch ? `${ch} · ${name}` : name;
        }
      }
      stick.querySelector('#mmNavTopic').textContent = label;
    }
    new MutationObserver(refresh).observe(sidebar, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
    new MutationObserver(refresh).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    refresh();
    setInert();

    // First visit on a phone, without a link to a particular topic: show the chapters.
    let seen = false;
    try { seen = !!localStorage.getItem(SEEN); } catch (_) {}
    const deepLink = /[?&](ch|topic)=/.test(location.search);
    if (!seen && !deepLink && phone.matches) setTimeout(open, 600);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
