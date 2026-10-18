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
    eqgraph: ['grapher.html',       'Graph Plotter',             'Grafiekplotter'],
    seq:     ['grapher.html',       'Graph Plotter',             'Grafiekplotter'],
    stats:   ['stats.html',         'Statistics Charts',         'Statistiekgrafieke'],
    prob:    ['probability.html',   'Probability Diagrams',      'Waarskynlikheidsdiagramme'],
    fin:     ['timeline.html',      'Finance Timeline',          'Finansiële tydlyn'],
    nl:      ['numberline.html',    'Number Line',               'Getallyn'],
    tiles:   ['manipulatives.html', 'Fractions & Algebra Tiles', 'Breuke en algebra-teëls']
  };
  const TASKS = {
    geo: ['The sketch opens with a figure for this topic. Before you drag a point, predict which angles and lengths will change and which relationships will stay true. Then drag it and check.',
          'Die skets maak oop met \'n figuur vir hierdie onderwerp. Voorspel, voordat jy \'n punt sleep, watter hoeke en lengtes sal verander en watter verbande waar sal bly. Sleep dit dan en kontroleer.'],
    trig: ['The sketch opens with a triangle. Select an angle and tick “Show the measured size”. Predict how the angles will change when you drag a corner to make one side longer, then drag it and check: is the biggest angle always opposite the longest side?',
           'Die skets maak oop met \'n driehoek. Kies \'n hoek en merk “Wys die gemete grootte”. Voorspel hoe die hoeke sal verander as jy \'n hoekpunt sleep om een sy langer te maak, sleep dit dan en kontroleer: is die grootste hoek altyd oorkant die langste sy?'],
    measure: ['Estimate first: round every measurement and work out a rough answer in your head. Then calculate it exactly. How close was your estimate?',
              'Skat eers: rond elke meting af en bereken \'n rowwe antwoord in jou kop. Bereken dit dan presies. Hoe naby was jou skatting?'],
    calc: ['Predict the size of an answer from this lesson (bigger or smaller than 1? about how big?) before you work it out, then check it on the calculator.',
           'Voorspel die grootte van \'n antwoord uit hierdie les (groter of kleiner as 1? ongeveer hoe groot?) voordat jy dit uitwerk, en kontroleer dit dan op die sakrekenaar.'],
    trigid: ['Choose an angle and work out both sides of an identity from this lesson in degree mode. Predict: will they be equal for every angle? Test two more angles.',
             'Kies \'n hoek en bereken albei kante van \'n identiteit uit hierdie les in grade-modus. Voorspel: sal hulle vir elke hoek gelyk wees? Toets nog twee hoeke.'],
    graph: ['The plotter opens with a graph like the ones in this lesson. Predict how it will move before you change one number in its equation, then change it and check.',
            'Die plotter maak oop met \'n grafiek soos dié in hierdie les. Voorspel hoe dit sal skuif voordat jy een getal in sy vergelyking verander, en verander dit dan en kontroleer.'],
    eqgraph: ['Each side of an equation can be drawn as a graph. Plot y = (left side) and y = (right side) for an equation from this lesson, predict the x-value where they meet, then check that it solves the equation.',
              'Elke kant van \'n vergelyking kan as \'n grafiek geteken word. Plot y = (linkerkant) en y = (regterkant) vir \'n vergelyking uit hierdie les, voorspel die x-waarde waar hulle sny, en kontroleer dan dat dit die vergelyking oplos.'],
    seq: ['The plotter shows two sequences as points (n ; Tₙ): 3 ; 5 ; 7 ; … and 2 ; 5 ; 10 ; … Predict which one lies on a straight line and why, then add a sequence from this lesson.',
          'Die plotter wys twee rye as punte (n ; Tₙ): 3 ; 5 ; 7 ; … en 2 ; 5 ; 10 ; … Voorspel watter een op \'n reguit lyn lê en hoekom, en voeg dan \'n ry uit hierdie les by.'],
    stats: ['The chart opens with a data set for this topic. Predict what changing one value to a very large number will do to the mean, the median and the spread, then change it and check.',
            'Die grafiek maak oop met \'n datastel vir hierdie onderwerp. Voorspel wat dit aan die gemiddeld, die mediaan en die verspreiding sal doen as jy een waarde na \'n baie groot getal verander, en verander dit dan en kontroleer.'],
    prob: ['The tool opens with a diagram for this topic. Predict a probability from it first, then change it to match an example from this lesson and check.',
           'Die hulpmiddel maak oop met \'n diagram vir hierdie onderwerp. Voorspel eers \'n waarskynlikheid daaruit, en verander dit dan om by \'n voorbeeld uit hierdie les te pas en kontroleer.'],
    fin: ['The timeline opens with an example for this topic. Predict which helps more, doubling the time or doubling the rate, then try both.',
          'Die tydlyn maak oop met \'n voorbeeld vir hierdie onderwerp. Voorspel wat meer help, om die tyd of om die koers te verdubbel, en probeer dan albei.'],
    nl: ['Show an example from this lesson on the number line. Predict where the answer will land before you place it.',
         'Wys \'n voorbeeld uit hierdie les op die getallyn. Voorspel waar die antwoord sal land voordat jy dit plaas.'],
    tiles: ['The tool opens on the right model for this topic. Type in an example from this lesson, predict the result first, then let the model show you.',
            'Die hulpmiddel maak oop op die regte model vir hierdie onderwerp. Tik \'n voorbeeld uit hierdie les in, voorspel eers die resultaat, en laat die model jou dan wys.']
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
    qs.forEach((q, i) => { if (q.type !== 'proof' && !/mf-fig|<canvas|<svg/.test(q.text) && (best < 0 || score(i) < score(best))) best = i; });
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
    // Map entries are "tool" or "tool.example"; the example opens via #ex=.
    const [key, ex] = String((window.MM_EXPLORE || {})[o.grade + ':' + o.topic.id] || '').split('.');
    if (!key || !TOOLS[key]) return null;
    const [file, en, af] = TOOLS[key];
    const af_ = o.lang === 'af';
    const card = document.createElement('section');
    card.className = 'ex-card ex-explore';
    card.innerHTML = `
      <div class="ex-head"><span class="ex-badge" aria-hidden="true">↗</span><div><div class="ex-title">${L.explore}</div>
      <div class="ex-sub">${TASKS[key][af_ ? 1 : 0]}</div></div></div>
      <a class="ex-link" href="../${file}${ex ? '#ex=' + ex : ''}" target="_blank" rel="noopener">${L.open(af_ ? af : en)}</a>`;
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
