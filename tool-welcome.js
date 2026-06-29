// ============================================================
// THE MAGIC LAB — tool-welcome.js
// Injects a welcome overlay on each tool's first visit.
// No changes needed to tool logic — overlay sits on top and
// fades out when the student clicks "Let's go".
//
// Usage: <script defer src="tool-welcome.js"></script>
// Configure via data attributes on <body>:
//   data-tool-id="computer-codex"
//   (matches the key in TOOL_CONFIG below)
// ============================================================

(function () {

  // ── Tool config ─────────────────────────────────────────
  const TOOL_CONFIG = {
    'computer-codex': {
      icon:    '💻',
      name:    'Computer Codex',
      grade:   'Grade 8 – 10',
      tagline: 'Your complete guide to digital literacy',
      desc:    'From Windows basics to Excel, Word, and a full unit on Artificial Intelligence — 25 structured lessons across 9 units. Work through them at your own pace.',
      color:   '#93c5fd',
      colorBg: 'rgba(59,130,246,0.15)',
      colorBd: 'rgba(59,130,246,0.28)',
      features: [
        { icon: '📖', label: '25 lessons across 9 units' },
        { icon: '🧩', label: 'Interactive quizzes & challenges' },
        { icon: '🤖', label: 'Brand new AI & Machine Learning unit' },
        { icon: '⚡', label: 'Earn XP for every lesson completed' },
      ],
      cta: 'Start Learning',
      tip: 'Use the sidebar to jump between lessons, or follow them in order.'
    },
    'java-genie': {
      icon:    '🧞',
      name:    'Java Genie',
      grade:   'Grade 8 – 9',
      tagline: 'Write real Java. Watch it draw.',
      desc:    'Learn Java through turtle graphics — write code and watch it come to life on screen. No installation needed. Start coding in 30 seconds.',
      color:   '#5b50d6',
      colorBg: 'rgba(91,80,214,0.14)',
      colorBd: 'rgba(91,80,214,0.30)',
      features: [
        { icon: '🎨', label: 'Turtle graphics — see code draw shapes' },
        { icon: '📚', label: 'Step-by-step Java tutorial built in' },
        { icon: '🎯', label: 'Challenges to test your skills' },
        { icon: '💾', label: 'Save and load your programs' },
      ],
      cta: 'Open Java Genie',
      tip: 'Click "Learn Java" in the toolbar to open the guided tutorial.'
    },
    'web-wizard': {
      icon:    '🌐',
      name:    'Web Wizard',
      grade:   'Grade 8 – 9',
      tagline: 'Build websites. See them live.',
      desc:    'Write HTML and CSS in the editor and watch your website appear instantly in the preview panel. Everything runs in the browser — no server needed.',
      color:   '#0776a0',
      colorBg: 'rgba(7,118,160,0.14)',
      colorBd: 'rgba(7,118,160,0.30)',
      features: [
        { icon: '⚡', label: 'Live preview — changes appear as you type' },
        { icon: '📖', label: 'Guided HTML & CSS tutorial included' },
        { icon: '🎨', label: 'Start from example templates' },
        { icon: '📱', label: 'Preview at mobile, tablet, or desktop size' },
      ],
      cta: 'Start Building',
      tip: 'Click "Web Tutorial" in the toolbar to follow the guided lessons.'
    },
    'code-conjurer': {
      icon:    '📜',
      name:    'Code Conjurer',
      grade:   'Grade 10 – 12',
      tagline: 'Advanced Java for IEB & CAPS IT',
      desc:    'A full Java IDE in your browser. Structured lessons for Grades 10, 11, and 12 — OOP, arrays, algorithms, sorting, file I/O, and exception handling. Exam-aligned.',
      color:   '#b31540',
      colorBg: 'rgba(179,21,64,0.14)',
      colorBd: 'rgba(179,21,64,0.30)',
      features: [
        { icon: '▶️', label: 'Java runs directly in the browser' },
        { icon: '📚', label: 'Grade 10, 11 & 12 lesson tracks' },
        { icon: '🎯', label: 'Coding challenges after every lesson' },
        { icon: '🧩', label: 'Predict the output & spot the bug quizzes' },
      ],
      cta: 'Open Code Conjurer',
      tip: 'Click "Lessons" in the toolbar to open the Grade 10 lesson panel.'
    },
    'math-magician': {
      icon:    '🔢',
      name:    'Math Magician',
      grade:   'Grade 8',
      tagline: 'Master mathematics — one topic at a time',
      desc:    'Work through every chapter of Grade 8 Mathematics with clear explanations and practice questions. Wrong answers get personalised AI feedback so you understand where you went wrong.',
      color:   '#d4920e',
      colorBg: 'rgba(212,146,14,0.14)',
      colorBd: 'rgba(212,146,14,0.30)',
      features: [
        { icon: '📐', label: '19 topics covering the full Grade 8 syllabus' },
        { icon: '🤖', label: 'AI explains every wrong answer' },
        { icon: '📊', label: 'Track your score per topic' },
        { icon: '⚡', label: 'Earn XP for every correct answer' },
      ],
      cta: 'Start Practising',
      tip: 'Work through topics in order, or jump to any chapter from the sidebar.'
    },
  };

  // ── Storage key ─────────────────────────────────────────
  function _storageKey(toolId) {
    return `ml_welcome_seen_${toolId}`;
  }

  // ── CSS ─────────────────────────────────────────────────
  const CSS = `
  #ml-welcome-overlay {
    position: fixed; inset: 0; z-index: 99999;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    background: rgba(6, 8, 20, 0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    opacity: 0;
    transition: opacity 320ms ease;
  }
  #ml-welcome-overlay.ml-w-show { opacity: 1; }
  #ml-welcome-overlay.ml-w-hide {
    opacity: 0;
    pointer-events: none;
    transition: opacity 280ms ease;
  }

  #ml-welcome-card {
    background: #0d1226;
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 26px;
    width: 100%; max-width: 480px;
    padding: 36px 36px 32px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.70);
    transform: translateY(18px) scale(0.97);
    transition: transform 360ms cubic-bezier(0.34,1.15,0.64,1);
    position: relative; overflow: hidden;
  }
  #ml-welcome-overlay.ml-w-show #ml-welcome-card {
    transform: translateY(0) scale(1);
  }

  /* Ambient glow */
  #ml-welcome-card::before {
    content: '';
    position: absolute; inset: 0; border-radius: 26px;
    background: var(--wc-color-bg, rgba(82,86,200,0.08));
    pointer-events: none;
  }

  .ml-w-top {
    display: flex; align-items: center; gap: 14px; margin-bottom: 22px;
    position: relative; z-index: 1;
  }
  .ml-w-icon {
    width: 56px; height: 56px; border-radius: 17px; flex-shrink: 0;
    background: var(--wc-color-bg, rgba(82,86,200,0.14));
    border: 1px solid var(--wc-color-bd, rgba(82,86,200,0.30));
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
  }
  .ml-w-heading {}
  .ml-w-grade {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase;
    color: rgba(210,218,245,0.38); margin-bottom: 4px;
  }
  .ml-w-name {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 900; font-size: 22px; letter-spacing: -0.03em;
    color: #fff; line-height: 1.1;
  }

  .ml-w-tagline {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 700; font-size: 15px; letter-spacing: -0.01em;
    color: var(--wc-color, #a5b4fc); margin-bottom: 10px;
    position: relative; z-index: 1;
  }
  .ml-w-desc {
    font-size: 14px; color: rgba(210,218,245,0.55); line-height: 1.75;
    margin-bottom: 24px; position: relative; z-index: 1;
  }

  .ml-w-features {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px; margin-bottom: 26px;
    position: relative; z-index: 1;
  }
  .ml-w-feature {
    display: flex; align-items: flex-start; gap: 9px;
    padding: 10px 12px; border-radius: 11px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
  }
  .ml-w-feature-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
  .ml-w-feature-text {
    font-size: 12px; font-weight: 500;
    color: rgba(210,218,245,0.65); line-height: 1.4;
  }

  .ml-w-cta {
    width: 100%; padding: 14px;
    border-radius: 14px; border: none; cursor: pointer;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 15px; font-weight: 800; letter-spacing: -0.01em;
    color: #fff;
    background: var(--wc-color-btn, linear-gradient(135deg,#5256c8,#10b981));
    box-shadow: 0 4px 20px var(--wc-color-shadow, rgba(82,86,200,0.35));
    transition: all 160ms; position: relative; z-index: 1;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .ml-w-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 28px var(--wc-color-shadow, rgba(82,86,200,0.48));
  }
  .ml-w-cta:active { transform: none; }

  .ml-w-tip {
    margin-top: 14px; font-size: 12px;
    color: rgba(210,218,245,0.28); text-align: center; line-height: 1.5;
    position: relative; z-index: 1;
    display: flex; align-items: flex-start; gap: 6px; justify-content: center;
  }
  .ml-w-tip-icon { flex-shrink: 0; opacity: 0.5; font-size: 13px; }

  .ml-w-skip {
    position: absolute; top: 14px; right: 14px;
    width: 28px; height: 28px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    color: rgba(210,218,245,0.35); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; transition: all 120ms; z-index: 2;
    font-family: sans-serif; line-height: 1;
  }
  .ml-w-skip:hover { color: rgba(210,218,245,0.80); background: rgba(255,255,255,0.10); }

  .ml-w-seen-label {
    display: flex; align-items: center; gap: 7px; justify-content: center;
    margin-top: 14px; cursor: pointer;
    font-size: 12px; color: rgba(210,218,245,0.28);
    position: relative; z-index: 1;
    transition: color 130ms; user-select: none;
  }
  .ml-w-seen-label:hover { color: rgba(210,218,245,0.55); }
  .ml-w-seen-check {
    width: 15px; height: 15px; border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; flex-shrink: 0; transition: all 130ms;
  }
  .ml-w-seen-check.checked {
    background: rgba(17,217,143,0.20);
    border-color: rgba(17,217,143,0.45);
    color: #6ee7b7;
  }

  @media (max-width: 520px) {
    #ml-welcome-card { padding: 28px 22px 26px; border-radius: 20px; }
    .ml-w-features { grid-template-columns: 1fr; }
    .ml-w-name { font-size: 20px; }
  }
  `;

  // ── Dismiss ──────────────────────────────────────────────
  function _dismiss(overlay, dontShow) {
    if (dontShow) {
      try { localStorage.setItem(overlay.dataset.storageKey, '1'); } catch (_) {}
    }
    overlay.classList.add('ml-w-hide');
    overlay.classList.remove('ml-w-show');
    setTimeout(() => overlay.remove(), 320);
  }

  // ── Build and show ───────────────────────────────────────
  function _showWelcome(toolId, cfg) {
    // Build shadow colours
    const shadowMap = {
      'computer-codex':  'rgba(59,130,246,0.32)',
      'java-genie':      'rgba(91,80,214,0.35)',
      'web-wizard':      'rgba(7,118,160,0.32)',
      'code-conjurer':   'rgba(179,21,64,0.32)',
      'math-magician':   'rgba(212,146,14,0.32)',
    };
    const btnMap = {
      'computer-codex':  'linear-gradient(135deg,#1d4ed8,#3b82f6)',
      'java-genie':      'linear-gradient(135deg,#5b50d6,#0fa874)',
      'web-wizard':      'linear-gradient(135deg,#0776a0,#6d28d9)',
      'code-conjurer':   'linear-gradient(135deg,#b31540,#e06012)',
      'math-magician':   'linear-gradient(135deg,#a05c08,#d4920e)',
    };

    // Inject CSS
    if (!document.getElementById('ml-welcome-styles')) {
      const style = document.createElement('style');
      style.id = 'ml-welcome-styles';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    const storageKey = _storageKey(toolId);

    const overlay = document.createElement('div');
    overlay.id = 'ml-welcome-overlay';
    overlay.dataset.storageKey = storageKey;
    overlay.style.cssText = `
      --wc-color: ${cfg.color};
      --wc-color-bg: ${cfg.colorBg};
      --wc-color-bd: ${cfg.colorBd};
      --wc-color-btn: ${btnMap[toolId] || 'linear-gradient(135deg,#5256c8,#10b981)'};
      --wc-color-shadow: ${shadowMap[toolId] || 'rgba(82,86,200,0.35)'};
    `;

    overlay.innerHTML = `
      <div id="ml-welcome-card">
        <button class="ml-w-skip" id="ml-w-skip" title="Skip">✕</button>
        <div class="ml-w-top">
          <div class="ml-w-icon">${cfg.icon}</div>
          <div class="ml-w-heading">
            <div class="ml-w-grade">${cfg.grade}</div>
            <div class="ml-w-name">${cfg.name}</div>
          </div>
        </div>
        <div class="ml-w-tagline">${cfg.tagline}</div>
        <div class="ml-w-desc">${cfg.desc}</div>
        <div class="ml-w-features">
          ${cfg.features.map(f => `
            <div class="ml-w-feature">
              <span class="ml-w-feature-icon">${f.icon}</span>
              <span class="ml-w-feature-text">${f.label}</span>
            </div>
          `).join('')}
        </div>
        <button class="ml-w-cta" id="ml-w-cta">
          ${cfg.cta} →
        </button>
        <label class="ml-w-seen-label" id="ml-w-seen-label">
          <span class="ml-w-seen-check" id="ml-w-seen-check"></span>
          Don't show this again
        </label>
        <div class="ml-w-tip">
          <span class="ml-w-tip-icon">💡</span>
          <span>${cfg.tip}</span>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('ml-w-show'));
    });

    // "Don't show again" toggle
    let dontShow = false;
    const checkEl = overlay.querySelector('#ml-w-seen-check');
    overlay.querySelector('#ml-w-seen-label').addEventListener('click', () => {
      dontShow = !dontShow;
      checkEl.textContent = dontShow ? '✓' : '';
      checkEl.classList.toggle('checked', dontShow);
    });

    // CTA button
    overlay.querySelector('#ml-w-cta').addEventListener('click', () => {
      _dismiss(overlay, dontShow);
    });

    // Skip ✕
    overlay.querySelector('#ml-w-skip').addEventListener('click', () => {
      _dismiss(overlay, dontShow);
    });

    // Click outside card
    overlay.addEventListener('click', e => {
      if (e.target === overlay) _dismiss(overlay, false);
    });

    // Keyboard
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        document.removeEventListener('keydown', onKey);
        if (e.key !== 'Escape') e.preventDefault();
        _dismiss(overlay, dontShow);
      }
    });
  }

  // ── Init ─────────────────────────────────────────────────
  function _init() {
    // Detect which tool we're on
    const bodyId  = document.body.dataset.toolId;
    const pathMap = {
      'java-genie.html':     'java-genie',
      'web-wizard.html':     'web-wizard',
      'computer-codex.html': 'computer-codex',
      'code-conjurer.html':  'code-conjurer',
      'math-magician':       'math-magician',
    };
    let toolId = bodyId;
    if (!toolId) {
      const path = window.location.pathname;
      for (const [key, val] of Object.entries(pathMap)) {
        if (path.includes(key)) { toolId = val; break; }
      }
    }

    if (!toolId || !TOOL_CONFIG[toolId]) return;

    // Check if already seen
    try {
      if (localStorage.getItem(_storageKey(toolId))) return;
    } catch (_) {}

    const cfg = TOOL_CONFIG[toolId];

    // Show after a brief delay so the tool renders first
    setTimeout(() => _showWelcome(toolId, cfg), 180);
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    _init();
  }

  // Public API — allow manually showing welcome (e.g. from a help button)
  window.MagicLabWelcome = {
    show: (toolId) => {
      const cfg = TOOL_CONFIG[toolId];
      if (cfg) _showWelcome(toolId, cfg);
    },
    reset: (toolId) => {
      try { localStorage.removeItem(_storageKey(toolId || '')); } catch (_) {}
    },
    resetAll: () => {
      Object.keys(TOOL_CONFIG).forEach(id => {
        try { localStorage.removeItem(_storageKey(id)); } catch (_) {}
      });
    }
  };

})();
