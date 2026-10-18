/* Math Magician — make each lesson something to do, not only to read.
 *
 * "Have a go first" (top of the lesson): one of the topic's easier practice
 * questions, answered before reading — predict, then check. A wrong guess is
 * expected; the card points into the lesson and offers the worked solution.
 *
 * "Explore it" (end of the lesson): a link to the Math Magician tool that fits
 * the topic (from explore-data.js) with a short predict-then-check task to do
 * there.
 *
 * A grade page calls MMExplore.decorate({ grade, topic, lang, panel }) at the
 * end of renderLesson(). Uses MMHelp (levels, solutions) and MMAnswer. */
(function () {
  const TOOLS = {
    geo:     ['geometry.html',      'Geometry Sketcher',         'Meetkunde-sketsblad'],
    trig:    ['geometry.html',      'Geometry Sketcher',         'Meetkunde-sketsblad'],
    measure: ['calculator.html',    'Scientific Calculator',     'Wetenskaplike sakrekenaar'],
    calc:    ['calculator.html',    'Scientific Calculator',     'Wetenskaplike sakrekenaar'],
    trigid:  ['calculator.html',    'Scientific Calculator',     'Wetenskaplike sakrekenaar'],
    graph:   ['grapher.html',       'Graph Plotter',             'Grafiekplotter'],
    seq:     ['grapher.html',       'Graph Plotter',             'Grafiekplotter'],
    stats:   ['stats.html',         'Statistics Charts',         'Statistiekgrafieke'],
    prob:    ['probability.html',   'Probability Diagrams',      'Waarskynlikheidsdiagramme'],
    fin:     ['timeline.html',      'Finance Timeline',          'Finansiële tydlyn'],
    nl:      ['numberline.html',    'Number Line',               'Getallyn'],
    tiles:   ['manipulatives.html', 'Fractions & Algebra Tiles', 'Breuke en algebra-teëls']
  };
  const TASKS = {
    geo: ['Draw this lesson\'s figure. Before you drag a point, predict which angles and lengths will change and which relationships will stay true. Then drag it and check.',
          'Teken hierdie les se figuur. Voorspel, voordat jy \'n punt sleep, watter hoeke en lengtes sal verander en watter verbande waar sal bly. Sleep dit dan en kontroleer.'],
    trig: ['Draw the triangle from this lesson. Work out a side or an angle with a trig ratio or rule first, then measure it in the sketch to check your answer.',
           'Teken die driehoek uit hierdie les. Bereken eers \'n sy of \'n hoek met \'n trigverhouding of -reël, en meet dit dan in die skets om jou antwoord te kontroleer.'],
    measure: ['Estimate first: round every measurement and work out a rough answer in your head. Then calculate it exactly. How close was your estimate?',
              'Skat eers: rond elke meting af en bereken \'n rowwe antwoord in jou kop. Bereken dit dan presies. Hoe naby was jou skatting?'],
    calc: ['Predict the size of an answer from this lesson (bigger or smaller than 1? about how big?) before you work it out, then check it on the calculator.',
           'Voorspel die grootte van \'n antwoord uit hierdie les (groter of kleiner as 1? ongeveer hoe groot?) voordat jy dit uitwerk, en kontroleer dit dan op die sakrekenaar.'],
    trigid: ['Choose an angle and work out both sides of an identity from this lesson in degree mode. Predict: will they be equal for every angle? Test two more angles.',
             'Kies \'n hoek en bereken albei kante van \'n identiteit uit hierdie les in grade-modus. Voorspel: sal hulle vir elke hoek gelyk wees? Toets nog twee hoeke.'],
    graph: ['Plot this lesson\'s graph. Predict how it will move before you change one number in the equation, then change it and check.',
            'Plot hierdie les se grafiek. Voorspel hoe dit sal skuif voordat jy een getal in die vergelyking verander, en verander dit dan en kontroleer.'],
    seq: ['Plot the terms as points (n ; Tₙ). Predict first: will they lie on a straight line or on a curve? Then plot them and check.',
          'Plot die terme as punte (n ; Tₙ). Voorspel eers: sal hulle op \'n reguit lyn of op \'n kurwe lê? Plot hulle dan en kontroleer.'],
    stats: ['Type in a small data set. Predict what adding one very large value will do to the mean, the median and the spread, then add it and check.',
            'Tik \'n klein datastel in. Voorspel wat een baie groot waarde aan die gemiddeld, die mediaan en die verspreiding sal doen, voeg dit dan by en kontroleer.'],
    prob: ['Build the tree or Venn diagram from this lesson. Predict the probability first, then check that each set of branches adds up to 1.',
           'Bou die boom- of Venn-diagram uit hierdie les. Voorspel eers die waarskynlikheid en kontroleer dan dat elke stel takke tot 1 optel.'],
    fin: ['Put this lesson\'s example on the timeline. Predict which helps more, doubling the time or doubling the rate, then try both.',
          'Plaas hierdie les se voorbeeld op die tydlyn. Voorspel wat meer help, om die tyd of om die koers te verdubbel, en probeer dan albei.'],
    nl: ['Show an example from this lesson on the number line. Predict where the answer will land before you place it.',
         'Wys \'n voorbeeld uit hierdie les op die getallyn. Voorspel waar die antwoord sal land voordat jy dit plaas.'],
    tiles: ['Model one example from this lesson with fraction strips or algebra tiles. Predict the result first, then build it to check.',
            'Modelleer een voorbeeld uit hierdie les met breukstroke of algebra-teëls. Voorspel eers die resultaat, en bou dit dan om te kontroleer.']
  };
  const TXT = {
    en: { first: 'Have a go first', firstSub: 'Answer this before you read. A wrong guess is fine: the lesson shows you why.',
          check: 'Check', placeholder: 'Your answer…', right: 'Right! Read on to see why it works.',
          wrong: a => `The answer is <strong>${a}</strong>. Read the lesson below to see why.`, sol: 'Show the worked solution',
          explore: 'Explore it', open: name => `Open the ${name} ↗` },
    af: { first: 'Probeer dit eers', firstSub: 'Beantwoord dit voor jy lees. \'n Verkeerde raaiskoot is reg so: die les wys jou hoekom.',
          check: 'Gaan na', placeholder: 'Jou antwoord…', right: 'Reg! Lees verder om te sien hoekom dit werk.',
          wrong: a => `Die antwoord is <strong>${a}</strong>. Lees die les hieronder om te sien hoekom.`, sol: 'Wys die uitgewerkte oplossing',
          explore: 'Verken dit', open: name => `Maak die ${name} oop ↗` }
  };

  // The easiest question that is quick to answer: knowledge or routine, multiple choice first.
  function pickQuestion(o) {
    const qs = o.topic.questions || [];
    const lv = i => MMHelp.level(o.grade, o.topic, i, qs[i]);
    const score = i => (lv(i) === 'K' ? 0 : lv(i) === 'R' ? 1 : 3) + (qs[i].type === 'mc' ? 0 : 0.5) + i * 0.01;
    let best = -1;
    qs.forEach((q, i) => { if (!/mf-fig|<canvas|<svg/.test(q.text) && (best < 0 || score(i) < score(best))) best = i; });
    return best;
  }

  function predictCard(o, L) {
    const i = pickQuestion(o);
    if (i < 0) return null;
    const q = o.topic.questions[i];
    const ctx = { grade: o.grade, topic: o.topic, qIndex: i, q, lang: o.lang };
    const card = document.createElement('section');
    card.className = 'ex-card ex-predict';
    card.innerHTML = `
      <div class="ex-head"><span class="ex-badge" aria-hidden="true">?</span><div><div class="ex-title">${L.first}</div><div class="ex-sub">${L.firstSub}</div></div></div>
      <div class="ex-q">${q.text}</div>
      ${q.type === 'mc'
        ? `<div class="ex-opts">${q.options.map((op, k) => `<button type="button" class="ex-opt" data-k="${k}">${op}</button>`).join('')}</div>`
        : `<div class="ex-row"><input type="text" class="ex-in" aria-label="${L.placeholder}" placeholder="${L.placeholder}" autocomplete="off"><button type="button" class="ex-go">${L.check}</button></div>`}
      <div class="ex-fb" hidden></div>`;
    const fb = card.querySelector('.ex-fb');
    const done = ok => {
      const answer = q.type === 'mc' ? q.options[q.answer] : q.answer;
      const steps = MMHelp.solutionHTML(ctx);
      const solution = steps ? `<details class="mm-sol"><summary>${L.sol}</summary>${steps}</details>` : '';
      fb.hidden = false;
      fb.className = 'ex-fb ' + (ok ? 'ok' : 'no');
      fb.innerHTML = (ok ? L.right : L.wrong(answer)) + solution;
    };
    if (q.type === 'mc') {
      const btns = card.querySelectorAll('.ex-opt');
      btns.forEach(b => b.addEventListener('click', () => {
        if (card.dataset.done) return;
        card.dataset.done = '1';
        const k = +b.dataset.k;
        btns.forEach(x => { x.disabled = true; });
        btns[q.answer].classList.add('ok');
        if (k !== q.answer) b.classList.add('no');
        done(k === q.answer);
      }));
    } else {
      const inp = card.querySelector('.ex-in'), go = card.querySelector('.ex-go');
      const submit = () => {
        if (card.dataset.done || !inp.value.trim()) return;
        card.dataset.done = '1';
        inp.disabled = go.disabled = true;
        const ok = MMAnswer.matches(inp.value.trim(), q);
        inp.classList.add(ok ? 'ok' : 'no');
        done(ok);
      };
      go.addEventListener('click', submit);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    }
    return card;
  }

  function exploreCard(o, L) {
    const key = (window.MM_EXPLORE || {})[o.grade + ':' + o.topic.id];
    if (!key || !TOOLS[key]) return null;
    const [file, en, af] = TOOLS[key];
    const af_ = o.lang === 'af';
    const card = document.createElement('section');
    card.className = 'ex-card ex-explore';
    card.innerHTML = `
      <div class="ex-head"><span class="ex-badge" aria-hidden="true">↗</span><div><div class="ex-title">${L.explore}</div>
      <div class="ex-sub">${TASKS[key][af_ ? 1 : 0]}</div></div></div>
      <a class="ex-link" href="../${file}" target="_blank" rel="noopener">${L.open(af_ ? af : en)}</a>`;
    return card;
  }

  window.MMExplore = {
    decorate(o) {
      const panel = o.panel, L = TXT[o.lang] || TXT.en;
      const body = panel.querySelector('.lesson-body');
      if (!body || !o.topic) return;
      const ex = exploreCard(o, L);
      if (ex) body.after(ex);
      const token = panel._exToken = {};
      MMHelp.ensure(o.grade, MMHelp.chapterOf(o.topic)).then(() => {
        // The lesson may have been re-rendered while the help file loaded.
        if (panel._exToken !== token || !panel.contains(body)) return;
        const card = predictCard(o, L);
        if (card) body.before(card);
      });
    }
  };
})();
