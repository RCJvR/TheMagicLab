// ============================================================
// THE MAGIC LAB — topic-memory.js
// Lightweight, localStorage-only memory for subject index pages:
//   • remembers which lessons a visitor has opened (✓ markers)
//   • offers a "Continue where you left off" card
//   • collapses long topic lists behind a "Show all" toggle
// No login or backend required — works per-browser.
// Usage: TopicMemory.init({ key: 'science-sage' })
// ============================================================

window.TopicMemory = {
  init(opts) {
    const key  = opts.key;
    const max  = opts.maxVisible ?? 4;  // lists longer than this collapse
    const show = opts.showCount  ?? 3;  // rows shown while collapsed

    let visited;
    try {
      visited = new Set(JSON.parse(localStorage.getItem(key + ':visited') || '[]'));
    } catch (_) { visited = new Set(); }

    const topicLabel = a => (a.textContent || '').replace(/✓/g, '').trim();

    document.querySelectorAll('.strand-topics').forEach(list => {
      const links = Array.from(list.querySelectorAll('a.strand-topic'));

      links.forEach(a => {
        const href = a.getAttribute('href');
        if (visited.has(href)) {
          const tick = document.createElement('span');
          tick.className = 'topic-visited';
          tick.textContent = '✓';
          a.appendChild(tick);
        }
        a.addEventListener('click', () => {
          visited.add(href);
          try {
            localStorage.setItem(key + ':visited', JSON.stringify([...visited]));
            localStorage.setItem(key + ':last', JSON.stringify({ href, label: topicLabel(a) }));
          } catch (_) {}
        });
      });

      if (links.length > max) {
        links.slice(show).forEach(a => a.classList.add('topic-hidden'));
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'topics-toggle';
        btn.textContent = `Show all ${links.length} topics`;
        btn.addEventListener('click', () => {
          const open = btn.classList.toggle('open');
          links.slice(show).forEach(a => a.classList.toggle('topic-hidden', !open));
          btn.textContent = open ? 'Show fewer' : `Show all ${links.length} topics`;
        });
        list.appendChild(btn);
      }
    });

    const slot = document.querySelector('[data-continue-slot]');
    let last = null;
    try { last = JSON.parse(localStorage.getItem(key + ':last') || 'null'); } catch (_) {}
    if (slot && last && last.href && last.label) {
      const card = document.createElement('a');
      card.className = 'continue-card';
      card.href = last.href;
      const text = document.createElement('div');
      const label = document.createElement('div');
      label.className = 'continue-label';
      label.textContent = 'Continue where you left off';
      const title = document.createElement('div');
      title.className = 'continue-title';
      title.textContent = last.label;
      text.appendChild(label);
      text.appendChild(title);
      const arrow = document.createElement('span');
      arrow.className = 'continue-arrow';
      arrow.textContent = '→';
      card.appendChild(text);
      card.appendChild(arrow);
      slot.appendChild(card);
    }
  }
};
