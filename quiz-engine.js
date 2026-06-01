// ============================================================
// THE MAGIC LAB — quiz-engine.js
// Interactive challenge engine: fill-blank, spot-bug,
// arrange-blocks, predict-output
// Include after progress.js and xp.js on tool pages.
// Usage: <script defer src="quiz-engine.js"></script>
// ============================================================

(function () {
  'use strict';

  // ── CSS ──────────────────────────────────────────────────
  const CSS = `
  /* ── Shared challenge wrapper ── */
  .iq-challenge {
    background: var(--surface2, rgba(255,255,255,0.032));
    border: 1px solid var(--border2, rgba(255,255,255,0.055));
    border-radius: 14px; padding: 20px 22px; margin: 22px 0;
    font-family: var(--font-body, "Cabinet Grotesk", sans-serif);
  }
  .iq-challenge-header {
    display: flex; align-items: center; gap: 9px; margin-bottom: 14px;
  }
  .iq-badge {
    font-size: 10px; font-weight: 700; letter-spacing: 0.09em;
    text-transform: uppercase; padding: 3px 10px; border-radius: 99px;
  }
  .iq-badge-fill   { background: rgba(124,109,250,0.16); border: 1px solid rgba(124,109,250,0.30); color: #c4baff; }
  .iq-badge-bug    { background: rgba(239,68,68,0.14);   border: 1px solid rgba(239,68,68,0.30);   color: #fca5a5; }
  .iq-badge-arrange{ background: rgba(17,217,143,0.12);  border: 1px solid rgba(17,217,143,0.28);  color: #6ee7b7; }
  .iq-badge-predict{ background: rgba(245,166,35,0.13);  border: 1px solid rgba(245,166,35,0.28);  color: #fcd34d; }
  .iq-xp-hint {
    font-family: var(--font-mono, "JetBrains Mono", monospace);
    font-size: 10px; color: var(--muted, rgba(210,218,245,0.38));
    margin-left: auto;
  }
  .iq-prompt {
    font-size: 14px; color: var(--text2, rgba(210,218,245,0.65));
    margin-bottom: 14px; line-height: 1.6;
  }
  .iq-prompt strong { color: var(--text, #e4e8f8); }
  .iq-feedback {
    margin-top: 12px; padding: 10px 14px; border-radius: 10px;
    font-size: 13px; line-height: 1.6; display: none;
  }
  .iq-feedback.show { display: block; }
  .iq-feedback.correct { background: rgba(17,217,143,0.10); border: 1px solid rgba(17,217,143,0.25); color: #6ee7b7; }
  .iq-feedback.wrong   { background: rgba(239,68,68,0.10);  border: 1px solid rgba(239,68,68,0.25);  color: #fca5a5; }
  .iq-feedback.reveal  { background: rgba(245,166,35,0.10); border: 1px solid rgba(245,166,35,0.25); color: #fcd34d; }
  .iq-btn {
    padding: 8px 18px; border-radius: 10px; border: none; cursor: pointer;
    font-family: var(--font-body, "Cabinet Grotesk", sans-serif);
    font-size: 13px; font-weight: 700; transition: all 140ms;
  }
  .iq-btn-primary {
    background: linear-gradient(135deg, #5b50d6, #0fa874);
    color: #fff; box-shadow: 0 3px 12px rgba(91,80,214,0.25);
  }
  .iq-btn-primary:hover { box-shadow: 0 4px 18px rgba(91,80,214,0.40); transform: translateY(-1px); }
  .iq-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
  .iq-btn-ghost {
    background: var(--surface, rgba(255,255,255,0.048));
    border: 1px solid var(--border, rgba(255,255,255,0.085));
    color: var(--text2, rgba(210,218,245,0.65));
  }
  .iq-btn-ghost:hover { background: rgba(255,255,255,0.09); color: var(--text, #e4e8f8); }
  .iq-btn-row { display: flex; gap: 8px; margin-top: 12px; align-items: center; flex-wrap: wrap; }

  /* ── Fill-in-the-blank ── */
  .iq-code-block {
    font-family: var(--font-mono, "JetBrains Mono", monospace);
    font-size: 12px; line-height: 1.9; background: rgba(0,0,0,0.35);
    border-radius: 10px; padding: 14px 16px; margin-bottom: 12px;
    white-space: pre; overflow-x: auto;
  }
  .iq-blank {
    display: inline-block; background: rgba(124,109,250,0.18);
    border: 1px solid rgba(124,109,250,0.40); border-radius: 6px;
    min-width: 80px; padding: 0 6px; color: transparent;
    vertical-align: middle; position: relative; cursor: pointer;
    transition: background 150ms; height: 22px; line-height: 22px;
  }
  .iq-blank::after {
    content: attr(data-placeholder);
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    color: rgba(196,186,255,0.55); font-size: 11px;
    pointer-events: none; white-space: nowrap;
  }
  .iq-blank:hover { background: rgba(124,109,250,0.28); }
  .iq-blank.filled { background: rgba(124,109,250,0.22); color: #c4baff; }
  .iq-blank.filled::after { display: none; }
  .iq-blank.correct-fill { background: rgba(17,217,143,0.18); border-color: rgba(17,217,143,0.45); color: #6ee7b7 !important; }
  .iq-blank.wrong-fill   { background: rgba(239,68,68,0.15);  border-color: rgba(239,68,68,0.45);  color: #fca5a5 !important; }
  .iq-blank.wrong-fill::after { display: none; }
  .iq-word-bank {
    display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 12px;
  }
  .iq-word {
    padding: 5px 12px; border-radius: 8px; cursor: pointer;
    font-family: var(--font-mono, "JetBrains Mono", monospace);
    font-size: 12px; font-weight: 600;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    color: var(--text2, rgba(210,218,245,0.65)); transition: all 130ms;
    user-select: none;
  }
  .iq-word:hover { background: rgba(124,109,250,0.22); color: #c4baff; border-color: rgba(124,109,250,0.35); }
  .iq-word.used { opacity: 0.28; cursor: not-allowed; text-decoration: line-through; }
  .iq-word-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.07em;
    text-transform: uppercase; color: var(--muted, rgba(210,218,245,0.38));
    margin-bottom: 7px;
  }

  /* ── Spot the bug ── */
  .iq-code-lines { display: flex; flex-direction: column; gap: 2px; margin-bottom: 12px; }
  .iq-line {
    display: flex; align-items: flex-start; gap: 0; border-radius: 7px;
    cursor: pointer; transition: background 120ms; overflow: hidden;
  }
  .iq-line:hover { background: rgba(255,255,255,0.06); }
  .iq-line.selected-line  { background: rgba(239,68,68,0.14); border: 1px solid rgba(239,68,68,0.30); }
  .iq-line.correct-line   { background: rgba(17,217,143,0.14); border: 1px solid rgba(17,217,143,0.30); }
  .iq-line.wrong-line     { background: rgba(239,68,68,0.10); border: 1px solid rgba(239,68,68,0.25); }
  .iq-line-num {
    font-family: var(--font-mono, "JetBrains Mono", monospace);
    font-size: 11px; color: rgba(255,255,255,0.22);
    min-width: 32px; padding: 6px 8px; flex-shrink: 0; user-select: none;
    text-align: right;
  }
  .iq-line-code {
    font-family: var(--font-mono, "JetBrains Mono", monospace);
    font-size: 12px; line-height: 1.7; padding: 6px 10px 6px 4px;
    color: var(--text2, rgba(210,218,245,0.65)); white-space: pre;
    flex: 1;
  }
  .iq-line.correct-line .iq-line-code  { color: #6ee7b7; }
  .iq-line.wrong-line   .iq-line-code  { color: #fca5a5; }

  /* ── Arrange the blocks ── */
  .iq-blocks {
    display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;
    min-height: 40px;
  }
  .iq-block {
    display: flex; align-items: center; gap: 10px; padding: 8px 12px;
    border-radius: 9px; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10); cursor: grab;
    user-select: none; transition: all 150ms;
    font-family: var(--font-mono, "JetBrains Mono", monospace);
    font-size: 12px; color: var(--text2, rgba(210,218,245,0.65));
  }
  .iq-block:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.18); }
  .iq-block.dragging { opacity: 0.45; cursor: grabbing; }
  .iq-block.drag-over { border-color: rgba(124,109,250,0.55); background: rgba(124,109,250,0.12); }
  .iq-block.correct-block { background: rgba(17,217,143,0.12); border-color: rgba(17,217,143,0.35); color: #6ee7b7; cursor: default; }
  .iq-block.wrong-block   { background: rgba(239,68,68,0.10);  border-color: rgba(239,68,68,0.30);  color: #fca5a5; cursor: default; }
  .iq-drag-handle { color: rgba(255,255,255,0.22); font-size: 14px; flex-shrink: 0; }
  .iq-block-indent { margin-left: 0; transition: margin-left 200ms; }

  /* ── Predict the output ── */
  .iq-output-input {
    width: 100%; padding: 10px 14px; border-radius: 10px;
    background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12);
    font-family: var(--font-mono, "JetBrains Mono", monospace);
    font-size: 13px; color: var(--text, #e4e8f8); outline: none;
    transition: border-color 150ms; resize: vertical; min-height: 60px;
    margin-bottom: 10px;
  }
  .iq-output-input:focus { border-color: rgba(245,166,35,0.50); }
  .iq-output-input.correct-input { border-color: rgba(17,217,143,0.50); background: rgba(17,217,143,0.06); }
  .iq-output-input.wrong-input   { border-color: rgba(239,68,68,0.45);  background: rgba(239,68,68,0.05); }
  .iq-output-hint {
    font-size: 12px; color: var(--muted, rgba(210,218,245,0.38));
    margin-bottom: 8px; font-style: italic;
  }
  `;

  // Inject CSS once
  if (!document.getElementById('iq-styles')) {
    const style = document.createElement('style');
    style.id = 'iq-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ── HELPERS ──────────────────────────────────────────────

  function _trackResult(tool, correct, topic, questionType, firstTry) {
    if (!window.MagicLabProgress || !window.ML_TOOLS) return;
    const eventType = correct ? 'quiz_correct' : 'quiz_wrong';
    window.MagicLabProgress.track(tool, eventType, {
      topic,
      score: correct ? 1 : 0,
      metadata: { questionType, firstTry, interactive: true }
    });
  }

  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── SYNTAX HIGHLIGHT (minimal, inline) ───────────────────
  function _hlJava(code) {
    const keywords = /\b(public|private|protected|class|static|void|int|double|float|long|char|boolean|String|new|return|if|else|for|while|do|switch|case|break|continue|null|true|false|this|super|extends|implements|import|package|try|catch|finally|throws|throw|final|abstract|interface|enum)\b/g;
    return code
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/(\/\/[^\n]*)/g, '<span style="color:#4b5563;font-style:italic">$1</span>')
      .replace(/"([^"]*)"/g, '<span style="color:#86efac">"$1"</span>')
      .replace(keywords, '<span style="color:#c4baff;font-weight:600">$&</span>')
      .replace(/\b(\d+)\b/g, '<span style="color:#fbbf24">$1</span>');
  }

  // ── 1. FILL-IN-THE-BLANK ─────────────────────────────────
  //
  // Data format:
  // {
  //   type: 'fill-blank',
  //   prompt: 'Complete the method:',
  //   code: 'for (int i = 0; i ___; i++) {\n  System.out.println(i);\n}',
  //   blanks: [{ placeholder: '< 5', answer: '< 5', id: 'b1' }],
  //   wordBank: ['< 5', '<= 5', '> 5', '= 5', '!= 5']  // optional
  // }
  function renderFillBlank(container, data, tool, topic) {
    let firstTry = true;
    let selectedWord = null;
    let answered = false;

    // Build code with blank spans
    let codeHtml = data.code;
    data.blanks.forEach((b, i) => {
      codeHtml = codeHtml.replace('___',
        `<span class="iq-blank" data-blank-id="${b.id || i}" data-answer="${b.answer.replace(/"/g,'&quot;')}" data-placeholder="${b.placeholder || '?'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`
      );
    });

    // Shuffle word bank
    const words = data.wordBank ? _shuffle(data.wordBank) : [];

    container.innerHTML = `
      <div class="iq-challenge">
        <div class="iq-challenge-header">
          <span class="iq-badge iq-badge-fill">✏️ Fill in the blank</span>
          <span class="iq-xp-hint">+${(window.MagicLabXP?.XP_RATES?.quiz_correct_first || 5)} XP</span>
        </div>
        <div class="iq-prompt">${data.prompt}</div>
        ${words.length ? `
          <div class="iq-word-label">Word bank — click a word, then click the blank:</div>
          <div class="iq-word-bank">${words.map(w =>
            `<span class="iq-word" data-word="${w.replace(/"/g,'&quot;')}">${w}</span>`
          ).join('')}</div>
        ` : ''}
        <div class="iq-code-block">${_hlJava(data.code).replace(/___/g,
          data.blanks.map((b,i) =>
            `<span class="iq-blank" data-blank-id="${b.id||i}" data-answer="${b.answer.replace(/"/g,'&quot;')}" data-placeholder="${b.placeholder||'?'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`
          )[0] || '___'
        )}</div>
        <div class="iq-btn-row">
          <button class="iq-btn iq-btn-primary" id="iq-check">Check answer</button>
          <button class="iq-btn iq-btn-ghost" id="iq-reveal">Show answer</button>
        </div>
        <div class="iq-feedback" id="iq-fb"></div>
      </div>
    `;

    // Re-render properly with blanks in code
    const codeEl = container.querySelector('.iq-code-block');
    let rendered = _hlJava(data.code);
    data.blanks.forEach((b, i) => {
      rendered = rendered.replace(/___/,
        `<span class="iq-blank" data-blank-id="${b.id||i}" data-answer="${b.answer.replace(/"/g,'&quot;')}" data-placeholder="${b.placeholder||'?'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`
      );
    });
    codeEl.innerHTML = rendered;

    const fb  = container.querySelector('#iq-fb');
    const blanks = () => container.querySelectorAll('.iq-blank');

    // Word click — select it
    container.querySelectorAll('.iq-word').forEach(w => {
      w.addEventListener('click', () => {
        if (answered || w.classList.contains('used')) return;
        container.querySelectorAll('.iq-word').forEach(x => x.style.outline = '');
        w.style.outline = '2px solid #c4baff';
        selectedWord = w.dataset.word;
      });
    });

    // Blank click — fill with selected word
    container.addEventListener('click', e => {
      const blank = e.target.closest('.iq-blank');
      if (!blank || answered) return;
      if (selectedWord) {
        const prev = blank.dataset.current;
        // Return previous word to bank if any
        if (prev) {
          const prevWordEl = container.querySelector(`.iq-word[data-word="${prev}"]`);
          if (prevWordEl) prevWordEl.classList.remove('used');
        }
        blank.dataset.current = selectedWord;
        blank.textContent = selectedWord;
        blank.classList.add('filled');
        // Mark word as used
        const usedEl = container.querySelector(`.iq-word[data-word="${selectedWord}"]`);
        if (usedEl) { usedEl.classList.add('used'); usedEl.style.outline = ''; }
        selectedWord = null;
      }
    });

    // Check
    container.querySelector('#iq-check').addEventListener('click', () => {
      if (answered) return;
      let allCorrect = true;
      blanks().forEach(blank => {
        const given  = (blank.dataset.current || '').trim().toLowerCase();
        const wanted = (blank.dataset.answer  || '').trim().toLowerCase();
        if (given === wanted) {
          blank.classList.add('correct-fill');
        } else {
          blank.classList.add('wrong-fill');
          blank.textContent = blank.dataset.current || '?';
          allCorrect = false;
        }
      });
      answered = true;
      fb.classList.add('show');
      if (allCorrect) {
        fb.className = 'iq-feedback show correct';
        fb.textContent = '✅ Perfect! All blanks correct.';
        _trackResult(tool, true, topic, 'fill-blank', firstTry);
      } else {
        fb.className = 'iq-feedback show wrong';
        fb.textContent = '❌ Some blanks are wrong — see the answer below.';
        _trackResult(tool, false, topic, 'fill-blank', firstTry);
        firstTry = false;
      }
      container.querySelector('#iq-reveal').click();
    });

    // Reveal
    container.querySelector('#iq-reveal').addEventListener('click', () => {
      if (!answered) firstTry = false;
      answered = true;
      blanks().forEach(blank => {
        blank.classList.remove('correct-fill','wrong-fill');
        blank.classList.add('correct-fill');
        blank.textContent = blank.dataset.answer;
      });
      fb.className = 'iq-feedback show reveal';
      fb.innerHTML = `💡 Answer shown. ${data.explanation || ''}`;
    });
  }

  // ── 2. SPOT THE BUG ──────────────────────────────────────
  //
  // Data format:
  // {
  //   type: 'spot-bug',
  //   prompt: 'One line has a bug. Click it.',
  //   lines: ['public class Test {', '  public static void main(String[] args) {',
  //            '    for (int i = 0; i <= 5; i++)', '      System.out.println(i)', '  }', '}'],
  //   bugLine: 3,      // 0-indexed
  //   explanation: 'Missing semicolon after println(i)'
  // }
  function renderSpotBug(container, data, tool, topic) {
    let selectedLine = null;
    let answered = false;
    let firstTry = true;

    container.innerHTML = `
      <div class="iq-challenge">
        <div class="iq-challenge-header">
          <span class="iq-badge iq-badge-bug">🐛 Spot the bug</span>
          <span class="iq-xp-hint">+${(window.MagicLabXP?.XP_RATES?.quiz_correct_first || 5)} XP</span>
        </div>
        <div class="iq-prompt">${data.prompt || 'One line has a bug — click it to identify it.'}</div>
        <div class="iq-code-lines">
          ${data.lines.map((line, i) => `
            <div class="iq-line" data-line="${i}">
              <span class="iq-line-num">${i + 1}</span>
              <span class="iq-line-code">${_hlJava(line)}</span>
            </div>
          `).join('')}
        </div>
        <div class="iq-btn-row">
          <button class="iq-btn iq-btn-primary" id="iq-check" disabled>Select a line first</button>
          <button class="iq-btn iq-btn-ghost"   id="iq-reveal">Show answer</button>
        </div>
        <div class="iq-feedback" id="iq-fb"></div>
      </div>
    `;

    const checkBtn = container.querySelector('#iq-check');
    const fb       = container.querySelector('#iq-fb');

    container.querySelectorAll('.iq-line').forEach(lineEl => {
      lineEl.addEventListener('click', () => {
        if (answered) return;
        container.querySelectorAll('.iq-line').forEach(l => l.classList.remove('selected-line'));
        lineEl.classList.add('selected-line');
        selectedLine = parseInt(lineEl.dataset.line);
        checkBtn.disabled = false;
        checkBtn.textContent = 'That\'s the bug!';
      });
    });

    checkBtn.addEventListener('click', () => {
      if (answered || selectedLine === null) return;
      answered = true;
      const correct = selectedLine === data.bugLine;
      const selectedEl = container.querySelector(`.iq-line[data-line="${selectedLine}"]`);
      const correctEl  = container.querySelector(`.iq-line[data-line="${data.bugLine}"]`);

      if (correct) {
        selectedEl.classList.remove('selected-line');
        selectedEl.classList.add('correct-line');
        fb.className = 'iq-feedback show correct';
        fb.innerHTML = `✅ Correct! <strong>Line ${data.bugLine + 1}</strong> — ${data.explanation}`;
        _trackResult(tool, true, topic, 'spot-bug', firstTry);
      } else {
        selectedEl.classList.remove('selected-line');
        selectedEl.classList.add('wrong-line');
        correctEl.classList.add('correct-line');
        fb.className = 'iq-feedback show wrong';
        fb.innerHTML = `❌ Not quite. The bug is on <strong>line ${data.bugLine + 1}</strong> — ${data.explanation}`;
        _trackResult(tool, false, topic, 'spot-bug', firstTry);
      }
      fb.classList.add('show');
      checkBtn.disabled = true;
    });

    container.querySelector('#iq-reveal').addEventListener('click', () => {
      if (!answered) firstTry = false;
      answered = true;
      const correctEl = container.querySelector(`.iq-line[data-line="${data.bugLine}"]`);
      correctEl.classList.add('correct-line');
      fb.className = 'iq-feedback show reveal';
      fb.innerHTML = `💡 <strong>Line ${data.bugLine + 1}</strong> — ${data.explanation}`;
      fb.classList.add('show');
      checkBtn.disabled = true;
    });
  }

  // ── 3. ARRANGE THE BLOCKS ────────────────────────────────
  //
  // Data format:
  // {
  //   type: 'arrange',
  //   prompt: 'Drag the lines into the correct order:',
  //   blocks: ['public class Hello {', '  public static void main(String[] args) {',
  //            '    System.out.println("Hello!");', '  }', '}'],
  //   // blocks are shown shuffled; correct order = original order
  // }
  function renderArrange(container, data, tool, topic) {
    let answered = false;
    let firstTry = true;
    const correct = data.blocks; // correct order = as defined
    const shuffled = _shuffle(correct.map((b, i) => ({ text: b, idx: i })));

    container.innerHTML = `
      <div class="iq-challenge">
        <div class="iq-challenge-header">
          <span class="iq-badge iq-badge-arrange">⬆️ Arrange the blocks</span>
          <span class="iq-xp-hint">+${(window.MagicLabXP?.XP_RATES?.quiz_correct_first || 5)} XP</span>
        </div>
        <div class="iq-prompt">${data.prompt || 'Drag the code blocks into the correct order.'}</div>
        <div class="iq-blocks" id="iq-blocks">
          ${shuffled.map((b, i) => `
            <div class="iq-block" draggable="true" data-orig-idx="${b.idx}" data-pos="${i}">
              <span class="iq-drag-handle">⠿</span>
              <span>${_hlJava(b.text)}</span>
            </div>
          `).join('')}
        </div>
        <div class="iq-btn-row">
          <button class="iq-btn iq-btn-primary" id="iq-check">Check order</button>
          <button class="iq-btn iq-btn-ghost"   id="iq-reveal">Show answer</button>
        </div>
        <div class="iq-feedback" id="iq-fb"></div>
      </div>
    `;

    const blocksEl = container.querySelector('#iq-blocks');
    const fb       = container.querySelector('#iq-fb');
    let dragSrc    = null;

    blocksEl.querySelectorAll('.iq-block').forEach(block => {
      block.addEventListener('dragstart', e => {
        dragSrc = block;
        block.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      block.addEventListener('dragend', () => block.classList.remove('dragging'));
      block.addEventListener('dragover', e => {
        e.preventDefault(); e.dataTransfer.dropEffect = 'move';
        block.classList.add('drag-over');
      });
      block.addEventListener('dragleave', () => block.classList.remove('drag-over'));
      block.addEventListener('drop', e => {
        e.preventDefault();
        block.classList.remove('drag-over');
        if (dragSrc && dragSrc !== block) {
          const parent = blocksEl;
          const allBlocks = [...parent.querySelectorAll('.iq-block')];
          const srcIdx  = allBlocks.indexOf(dragSrc);
          const destIdx = allBlocks.indexOf(block);
          if (srcIdx < destIdx) {
            parent.insertBefore(dragSrc, block.nextSibling);
          } else {
            parent.insertBefore(dragSrc, block);
          }
        }
      });

      // Touch support
      let touchY = 0;
      block.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; dragSrc = block; }, { passive: true });
      block.addEventListener('touchmove', e => {
        e.preventDefault();
        const y = e.touches[0].clientY;
        const els = [...blocksEl.querySelectorAll('.iq-block')];
        const target = els.find(el => {
          const r = el.getBoundingClientRect();
          return y >= r.top && y <= r.bottom && el !== dragSrc;
        });
        if (target) {
          blocksEl.insertBefore(dragSrc, y < touchY ? target : target.nextSibling);
          touchY = y;
        }
      }, { passive: false });
    });

    container.querySelector('#iq-check').addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const currentOrder = [...blocksEl.querySelectorAll('.iq-block')].map(b => parseInt(b.dataset.origIdx));
      const isCorrect = correct.every((_, i) => currentOrder[i] === i);

      blocksEl.querySelectorAll('.iq-block').forEach((block, pos) => {
        block.draggable = false;
        if (currentOrder[pos] === pos) {
          block.classList.add('correct-block');
        } else {
          block.classList.add('wrong-block');
        }
      });

      fb.classList.add('show');
      if (isCorrect) {
        fb.className = 'iq-feedback show correct';
        fb.textContent = '✅ Perfect order!';
        _trackResult(tool, true, topic, 'arrange', firstTry);
      } else {
        fb.className = 'iq-feedback show wrong';
        fb.innerHTML = '❌ Not quite. Green blocks are in the right spot, red ones need moving. Click "Show answer" to see the correct order.';
        _trackResult(tool, false, topic, 'arrange', firstTry);
      }
    });

    container.querySelector('#iq-reveal').addEventListener('click', () => {
      if (!answered) firstTry = false;
      answered = true;
      blocksEl.innerHTML = correct.map((b, i) => `
        <div class="iq-block correct-block" style="cursor:default;">
          <span class="iq-drag-handle" style="opacity:0.3;">⠿</span>
          <span>${_hlJava(b)}</span>
        </div>
      `).join('');
      fb.className = 'iq-feedback show reveal';
      fb.innerHTML = `💡 Correct order shown above. ${data.explanation || ''}`;
      fb.classList.add('show');
    });
  }

  // ── 4. PREDICT THE OUTPUT ────────────────────────────────
  //
  // Data format:
  // {
  //   type: 'predict',
  //   prompt: 'What does this code print?',
  //   code: 'for (int i = 1; i <= 3; i++) {\n  System.out.println(i * i);\n}',
  //   answer: '1\n4\n9',
  //   hint: 'Think about what i*i gives for each iteration',
  //   explanation: 'i goes 1,2,3 so i*i = 1,4,9'
  // }
  function renderPredict(container, data, tool, topic) {
    let answered = false;
    let firstTry = true;

    container.innerHTML = `
      <div class="iq-challenge">
        <div class="iq-challenge-header">
          <span class="iq-badge iq-badge-predict">🔮 Predict the output</span>
          <span class="iq-xp-hint">+${(window.MagicLabXP?.XP_RATES?.quiz_correct_first || 5)} XP</span>
        </div>
        <div class="iq-prompt">${data.prompt || 'What does this code print? Type exactly what you see in the console.'}</div>
        <div class="iq-code-block">${_hlJava(data.code)}</div>
        ${data.hint ? `<div class="iq-output-hint">💭 Hint: ${data.hint}</div>` : ''}
        <textarea class="iq-output-input" id="iq-input" placeholder="Type the output here, one line per line…" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
        <div class="iq-btn-row">
          <button class="iq-btn iq-btn-primary" id="iq-check">Check my answer</button>
          <button class="iq-btn iq-btn-ghost"   id="iq-reveal">Show answer</button>
        </div>
        <div class="iq-feedback" id="iq-fb"></div>
      </div>
    `;

    const inputEl = container.querySelector('#iq-input');
    const fb      = container.querySelector('#iq-fb');

    // Normalise: trim each line, collapse blank lines, lowercase
    function _norm(s) {
      return s.trim().split('\n').map(l => l.trim()).filter(l => l !== '').join('\n').toLowerCase();
    }

    container.querySelector('#iq-check').addEventListener('click', () => {
      if (answered) return;
      const given  = _norm(inputEl.value);
      const wanted = _norm(data.answer);
      answered = true;
      fb.classList.add('show');
      if (given === wanted) {
        inputEl.classList.add('correct-input');
        fb.className = 'iq-feedback show correct';
        fb.innerHTML = `✅ Correct! ${data.explanation || ''}`;
        _trackResult(tool, true, topic, 'predict', firstTry);
      } else {
        inputEl.classList.add('wrong-input');
        fb.className = 'iq-feedback show wrong';
        fb.innerHTML = `❌ Not quite. Expected output:<br><code style="font-family:var(--font-mono,monospace);font-size:12px;white-space:pre;display:block;margin-top:6px;color:#fcd34d;">${data.answer}</code><br>${data.explanation || ''}`;
        _trackResult(tool, false, topic, 'predict', firstTry);
        firstTry = false;
      }
      inputEl.disabled = true;
    });

    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        container.querySelector('#iq-check').click();
      }
    });

    container.querySelector('#iq-reveal').addEventListener('click', () => {
      if (!answered) firstTry = false;
      answered = true;
      inputEl.value    = data.answer;
      inputEl.disabled = true;
      fb.className = 'iq-feedback show reveal';
      fb.innerHTML = `💡 Correct output: <code style="font-family:var(--font-mono,monospace);font-size:12px;white-space:pre;display:inline-block;margin-top:4px;color:#fcd34d;">${data.answer}</code><br>${data.explanation || ''}`;
      fb.classList.add('show');
    });
  }

  // ── PUBLIC API ───────────────────────────────────────────

  /**
   * Render a challenge into a container element.
   * @param {HTMLElement} container
   * @param {Object} data  — challenge definition (see formats above)
   * @param {string} tool  — ML_TOOLS constant e.g. 'computer-codex'
   * @param {string} topic — lesson title for tracking
   */
  function render(container, data, tool, topic) {
    if (!container || !data) return;
    switch (data.type) {
      case 'fill-blank': return renderFillBlank(container, data, tool, topic);
      case 'spot-bug':   return renderSpotBug(container, data, tool, topic);
      case 'arrange':    return renderArrange(container, data, tool, topic);
      case 'predict':    return renderPredict(container, data, tool, topic);
      default: console.warn('[MagicLab] Unknown challenge type:', data.type);
    }
  }

  /**
   * Scan a DOM element for [data-iq-challenge] attributes and render them.
   * Useful for challenges embedded in lesson HTML strings.
   *
   * Lesson HTML usage:
   *   <div data-iq-challenge='{"type":"predict","code":"...","answer":"..."}'></div>
   */
  function wire(rootEl, tool, topic) {
    if (!rootEl) return;
    rootEl.querySelectorAll('[data-iq-challenge]').forEach(el => {
      try {
        const data = JSON.parse(el.dataset.iqChallenge);
        render(el, data, tool, topic);
      } catch (e) {
        console.warn('[MagicLab] Failed to parse challenge:', e);
      }
    });
  }

  window.MagicLabQuiz = { render, wire };
  document.dispatchEvent(new CustomEvent('magiclab:quiz:ready'));

})();
