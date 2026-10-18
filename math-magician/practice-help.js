/* Math Magician — hints, worked solutions and cognitive levels for practice questions.
 * Each chapter's help lives in grN/chM.help.js, which calls MMHelp.add(grade, chapter, data).
 * data = { topicId: [ [level, fingerprint, hintEn, hintAf, stepsEn[], stepsAf[]], ... ] }
 * The fingerprint ties an entry to its question (type + answer), so an edited
 * question never shows a stale solution. */
(function () {
  const store = {}, loading = {};
  const LEVELS = {
    K: { en: 'Knowledge', af: 'Kennis' },
    R: { en: 'Routine', af: 'Roetine' },
    C: { en: 'Complex', af: 'Kompleks' },
    P: { en: 'Problem solving', af: 'Probleemoplossing' }
  };
  const TXT = {
    en: { hint: 'Hint', showSol: 'Show worked solution', sol: 'Worked solution', answerIs: 'The correct answer is', proof: 'Compare your proof with this one:', review: 'Have another look at the worked example in the lesson.', well: 'Well done!' },
    af: { hint: 'Wenk', showSol: 'Wys uitgewerkte oplossing', sol: 'Uitgewerkte oplossing', answerIs: 'Die korrekte antwoord is', proof: 'Vergelyk jou bewys met hierdie een:', review: 'Kyk weer na die uitgewerkte voorbeeld in die les.', well: 'Goed gedoen!' }
  };

  function fingerprint(q) {
    if (q.type === 'mc') return 'm' + (q.options || []).length + ':' + q.answer;
    if (q.type === 'proof') return 'p' + (q.steps || []).length;
    return 'i:' + String(q.answer).replace(/,/g, '.').replace(/[^0-9.\-\/]/g, '');
  }

  function chapterOf(topic) {
    return topic && topic.chapter ? topic.chapter : Math.floor(topic.id / 100);
  }

  function ensure(grade, ch) {
    const key = grade + ':' + ch;
    if (store[key]) return Promise.resolve(store[key]);
    if (loading[key]) return loading[key];
    loading[key] = new Promise(resolve => {
      const s = document.createElement('script');
      s.src = 'ch' + ch + '.help.js';
      s.onload = () => resolve(store[key] || null);
      s.onerror = () => resolve(null);
      document.head.appendChild(s);
    });
    return loading[key];
  }

  function entry(grade, ch, topicId, qIndex, q) {
    const d = store[grade + ':' + ch];
    const e = d && d[topicId] && d[topicId][qIndex];
    if (!e || e[1] !== fingerprint(q)) return null;
    return { level: e[0], hint: { en: e[2], af: e[3] }, steps: { en: e[4] || [], af: e[5] || [] } };
  }

  const pick = (o, lang) => (o[lang] && (Array.isArray(o[lang]) ? o[lang].length : true)) ? o[lang] : o.en;

  function stepsHTML(e, lang) {
    const steps = pick(e.steps, lang);
    if (!steps || !steps.length) return '';
    return '<ol class="mm-steps">' + steps.map(s => '<li>' + s + '</li>').join('') + '</ol>';
  }

  function correctText(q) {
    return q.type === 'mc' ? q.options[q.answer] : q.answer;
  }

  window.MMHelp = {
    add(grade, ch, data) { store[grade + ':' + ch] = data; },
    fingerprint,
    chapterOf,
    ensure,

    // CAPS level (K/R/C/P) of a question, once its chapter's help has loaded.
    level(grade, topic, qIndex, q) {
      const e = entry(grade, chapterOf(topic), topic.id, qIndex, q);
      return e ? e.level : null;
    },

    // Fill the level badge and hint slots for the current question.
    mount(o) {
      const ch = chapterOf(o.topic);
      const fill = () => {
        const e = entry(o.grade, ch, o.topic.id, o.qIndex, o.q);
        o.current = e;
        if (!e) return;
        const L = TXT[o.lang] || TXT.en;
        if (o.levelEl && LEVELS[e.level]) {
          o.levelEl.innerHTML = '<span class="mm-level mm-level-' + e.level + '" title="CAPS cognitive level">' + LEVELS[e.level][o.lang === 'af' ? 'af' : 'en'] + '</span>';
        }
        const hint = pick(e.hint, o.lang);
        if (o.hintEl && hint) {
          o.hintEl.innerHTML = '<button type="button" class="mm-hint-btn">💡 ' + L.hint + '</button><div class="mm-hint" hidden>' + hint + '</div>';
          const btn = o.hintEl.querySelector('.mm-hint-btn'), box = o.hintEl.querySelector('.mm-hint');
          btn.addEventListener('click', () => { box.hidden = false; btn.hidden = true; });
        }
      };
      return ensure(o.grade, ch).then(fill);
    },

    // Just the worked-solution steps (an ordered list), or '' if there are none.
    solutionHTML(o) {
      const e = entry(o.grade, chapterOf(o.topic), o.topic.id, o.qIndex, o.q);
      return e ? stepsHTML(e, o.lang) : '';
    },

    // Feedback after a wrong answer: the answer plus the worked solution.
    wrongHTML(o) {
      const L = TXT[o.lang] || TXT.en;
      const e = entry(o.grade, chapterOf(o.topic), o.topic.id, o.qIndex, o.q);
      if (o.q.type === 'proof' && e) return L.proof + stepsHTML(e, o.lang);
      const head = L.answerIs + ' <strong>' + correctText(o.q) + '</strong>.';
      if (!e) return head + ' ' + L.review;
      return head + '<div class="mm-sol-title">' + L.sol + '</div>' + stepsHTML(e, o.lang);
    },

    // Feedback after a right answer: praise, with the solution one click away.
    rightHTML(o) {
      const L = TXT[o.lang] || TXT.en;
      const e = entry(o.grade, chapterOf(o.topic), o.topic.id, o.qIndex, o.q);
      if (!e || !pick(e.steps, o.lang).length) return L.well;
      return L.well + ' <details class="mm-sol"><summary>' + L.showSol + '</summary>' + stepsHTML(e, o.lang) + '</details>';
    }
  };
})();
