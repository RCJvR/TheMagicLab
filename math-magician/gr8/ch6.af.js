// Math Magician — Graad 8, Hoofstuk 6 data
// Algebraïese Uitdrukkings

MathMagician.registerChapter(6, {
  topics: [
    {
      id: 601,
      chapter: 6,
      name: "Algebraïese taal & terme",
      fullName: "Algebraïese taal, terme en polinome",
      lesson: {
        heading: "Algebraïese taal en terme",
        sub: "Hoofstuk 6 · Onderwerp 1",
        body: `
          <p>Algebra gebruik <strong>veranderlikes</strong> (letters) om onbekende of veranderende hoeveelhede voor te stel. Om die taal van algebra te verstaan, is die grondslag van alle verdere wiskunde.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoordeskat</div>
            <p>
              <strong>Veranderlike:</strong> 'n letter wat 'n onbekende waarde voorstel (bv. x, y, a).<br>
              <strong>Konstante:</strong> 'n vaste getal (bv. 5, −3, ½).<br>
              <strong>Koëffisiënt:</strong> die getal wat 'n veranderlike vermenigvuldig. In <span class="math">7x</span> is die koëffisiënt 7.<br>
              <strong>Term:</strong> 'n enkele getal, veranderlike, of produk van albei. Terme word deur + of − geskei.<br>
              <strong>Uitdrukking:</strong> 'n kombinasie van terme. bv. <span class="math">3x + 2y − 5</span><br>
              <strong>Polinoom:</strong> 'n uitdrukking met een of meer terme.<br>
              &nbsp;&nbsp;• Monoom: 1 term — <span class="math">4x²</span><br>
              &nbsp;&nbsp;• Binoom: 2 terme — <span class="math">3x + 5</span><br>
              &nbsp;&nbsp;• Trinoom: 3 terme — <span class="math">x² + 2x − 3</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Dele van 'n uitdrukking identifiseer</div>
            <div class="example-step"><span class="step-num">1</span><span>Uitdrukking: <span class="math">5x² − 3x + 8</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Terme: <span class="math">5x²</span>, <span class="math">−3x</span>, <span class="math">8</span> → 3 terme (trinoom)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Koëffisiënte: 5 (van x²), −3 (van x)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Konstante term: 8</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Veranderlike: x</span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Algebraïese uitdrukkings uit woorde skryf</div>
            <p>
              <strong>Som:</strong> a + b → "die som van a en b"<br>
              <strong>Verskil:</strong> a − b → "a min b" of "b afgetrek van a"<br>
              <strong>Produk:</strong> ab of a × b → "a vermenigvuldig met b" (die ×-teken word weggelaat)<br>
              <strong>Kwosiënt:</strong> a ÷ b of a/b → "a gedeel deur b"<br>
              <strong>Kwadraat:</strong> a² → "a in die kwadraat"<br><br>
              "Drie keer x plus vyf" → <span class="math">3x + 5</span><br>
              "Die kwadraat van y min twee keer y" → <span class="math">y² − 2y</span>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die woord "van" in algebra beteken gewoonlik vermenigvuldig. "Die helfte van x" = ½x = x/2.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Hoeveel terme het <span class='math'>4x² − 3x + 7</span>?", options: ["1", "2", "3", "4"], answer: 2, topic: "Uitdrukkings" },
        { type: "mc", text: "Wat is die koëffisiënt van x in <span class='math'>−6x + 11</span>?", options: ["6", "11", "−6", "−11"], answer: 2, topic: "Uitdrukkings" },
        { type: "input", text: "Skryf as 'n uitdrukking: 'twee keer x in die kwadraat min drie'", answer: "2x^2-3", topic: "Uitdrukkings" },
        { type: "mc", text: "Watter is 'n trinoom?", options: ["5x²", "3x − 4", "x² + 2x − 1", "7"], answer: 2, topic: "Uitdrukkings" },
        { type: "mc", text: "Wat is die konstante term in <span class='math'>3x² − 5x + 9</span>?", options: ["3", "−5", "9", "x"], answer: 2, topic: "Uitdrukkings" },
        { type: "input", text: "'Die produk van 4 en y, verminder met 6' as 'n uitdrukking:", answer: "4y-6", topic: "Uitdrukkings" },
        { type: "input", text: "Skryf as 'n uitdrukking: 'Trek twee keer y af van die kwadraat van x, tel dan 5 by'", answer: "x^2-2y+5", topic: "Uitdrukkings" },
        { type: "input", text: "'n Getaltruuk: dink aan 'n getal x, verdubbel dit, tel 6 by, deel deur 2, trek dan die oorspronklike getal x af. Skryf dit as 'n vereenvoudigde uitdrukking in x — watter enkele getal kry jy altyd?", answer: "3", topic: "Uitdrukkings" },
      ]
    },
    {
      id: 602,
      chapter: 6,
      name: "Gelyksoortige en ongelyksoortige terme",
      fullName: "Gelyksoortige terme en ongelyksoortige terme",
      lesson: {
        heading: "Gelyksoortige en ongelyksoortige terme",
        sub: "Hoofstuk 6 · Onderwerp 2",
        body: `
          <p><strong>Gelyksoortige terme</strong> het presies dieselfde veranderlike(s) tot dieselfde mag(te). Slegs gelyksoortige terme kan deur optelling of aftrekking gekombineer word.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Gelyksoortig vs ongelyksoortig</div>
            <p>
              <strong>Gelyksoortige terme</strong> (kan gekombineer word):<br>
              <span class="math">3x</span> en <span class="math">7x</span> → albei het x¹<br>
              <span class="math">4x²</span> en <span class="math">−2x²</span> → albei het x²<br>
              <span class="math">5</span> en <span class="math">−11</span> → albei is konstantes<br><br>
              <strong>Ongelyksoortige terme</strong> (kan nie gekombineer word nie):<br>
              <span class="math">3x</span> en <span class="math">3x²</span> → verskillende magte van x<br>
              <span class="math">4x</span> en <span class="math">4y</span> → verskillende veranderlikes<br>
              <span class="math">5x</span> en <span class="math">5</span> → een het 'n veranderlike, die ander nie
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Gelyksoortige terme identifiseer</div>
            <div class="example-step"><span class="step-num">1</span><span>Groepeer gelyksoortige terme in: <span class="math">3x² + 5x − 2x² + 4 − 3x + 1</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>x²-terme: <span class="math">3x²</span> en <span class="math">−2x²</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>x-terme: <span class="math">5x</span> en <span class="math">−3x</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Konstantes: <span class="math">4</span> en <span class="math">1</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Dink aan gelyksoortige terme soos vrugte: 3 appels + 5 appels = 8 appels. Maar 3 appels + 5 lemoene bly soos dit is — jy kan hulle nie kombineer nie.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter paar is gelyksoortige terme?", options: ["3x en 3x²", "4x en 4y", "5x² en −2x²", "7x en 7"], answer: 2, topic: "Uitdrukkings" },
        { type: "mc", text: "Hoeveel pare gelyksoortige terme is daar in <span class='math'>3x + 2y − x + 5y − 4</span>?", options: ["1", "2", "3", "4"], answer: 1, topic: "Uitdrukkings" },
        { type: "input", text: "Watter term(e) in <span class='math'>4a² + 3b − 2a² + b + 6</span> is gelyksoortig met <span class='math'>4a²</span>? (antwoord: -2a^2)", answer: "-2a^2", topic: "Uitdrukkings" },
        { type: "mc", text: "Is <span class='math'>3xy</span> en <span class='math'>5yx</span> gelyksoortige terme?", options: ["Nee — verskillende volgorde", "Ja — vermenigvuldiging is kommutatief", "Nee — verskillende koëffisiënte", "Slegs as x = y"], answer: 1, topic: "Uitdrukkings" },
        { type: "mc", text: "Watter uitdrukking het geen gelyksoortige terme om saam te voeg nie?", options: ["3x + 5x − 2", "4x² + 3x − x²", "2a + 3b + 4c", "5y − 2y + 1"], answer: 2, topic: "Uitdrukkings" },
        { type: "input", text: "Vereenvoudig deur gelyksoortige terme saam te voeg: <span class='math'>5x² + 3xy − 2x² + 4xy − x²</span>. Wat is die koëffisiënt van xy in die antwoord?", answer: "7", topic: "Uitdrukkings" },
        { type: "input", text: "<span class='math'>3x²y</span> en <span class='math'>3xy²</span> is NIE gelyksoortige terme nie. Vereenvoudig <span class='math'>3x²y + 2xy² − x²y + 5xy²</span> deur slegs die ware gelyksoortige terme saam te voeg. Wat is die koëffisiënt van xy² in die vereenvoudigde antwoord?", answer: "7", topic: "Uitdrukkings" },
      ]
    },
    {
      id: 603,
      chapter: 6,
      name: "Uitdrukkings optel & aftrek",
      fullName: "Optelling en aftrekking van algebraïese uitdrukkings",
      lesson: {
        heading: "Algebraïese uitdrukkings optel en aftrek",
        sub: "Hoofstuk 6 · Onderwerp 3",
        body: `
          <p>Om algebraïese uitdrukkings op te tel of af te trek, voeg jy <strong>gelyksoortige terme</strong> saam. Wanneer jy aftrek, versprei die negatiewe teken versigtig.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Die proses</div>
            <p>
              1. Verwyder hakies (let op tekens wanneer jy aftrek).<br>
              2. Identifiseer en groepeer gelyksoortige terme.<br>
              3. Tel/trek die koëffisiënte van gelyksoortige terme.<br><br>
              <strong>Sleutelreël:</strong> om 'n hakie af te trek, beteken die teken van elke term binne te verander:<br>
              <span class="math">−(3x − 2) = −3x + 2</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Optelling</div>
            <div class="example-step"><span class="step-num">1</span><span>Vereenvoudig: <span class="math">(3x² + 5x − 2) + (x² − 3x + 7)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Verwyder hakies: <span class="math">3x² + 5x − 2 + x² − 3x + 7</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Groepeer gelyksoortige terme: <span class="math">(3x²+x²) + (5x−3x) + (−2+7)</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Resultaat: <span class="math">4x² + 2x + 5</span></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Aftrekking — let op die tekens!</div>
            <div class="example-step"><span class="step-num">1</span><span>Vereenvoudig: <span class="math">(4x² − 3x + 1) − (2x² + x − 5)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Versprei die negatief: <span class="math">4x² − 3x + 1 − 2x² − x + 5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Groepeer: <span class="math">(4x²−2x²) + (−3x−x) + (1+5)</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Resultaat: <span class="math">2x² − 4x + 6</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Die algemeenste fout is om te vergeet om die teken van elke term te verander wanneer jy 'n hakie aftrek. Skryf die versprei-stap elke keer eksplisiet uit.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Vereenvoudig: <span class='math'>(5x + 3) + (2x − 7)</span>", options: ["7x − 4", "7x + 4", "3x − 4", "7x − 10"], answer: 0, topic: "Uitdrukkings" },
        { type: "mc", text: "Vereenvoudig: <span class='math'>(4x² − 3x) − (x² + 2x)</span>", options: ["3x² − x", "3x² − 5x", "5x² − x", "3x² + 5x"], answer: 1, topic: "Uitdrukkings" },
        { type: "input", text: "Vereenvoudig: <span class='math'>(3a + 2b − 1) + (a − 5b + 4)</span>. Koëffisiënt van b in die antwoord?", answer: "-3", topic: "Uitdrukkings" },
        { type: "mc", text: "Vereenvoudig: <span class='math'>3x² + 5x − 2 − (x² − 3x + 4)</span>", options: ["2x² + 8x − 6", "2x² + 2x − 6", "4x² + 2x + 2", "2x² + 8x + 2"], answer: 0, topic: "Uitdrukkings" },
        { type: "input", text: "Vereenvoudig: <span class='math'>(6y² − 4y + 3) − (2y² + y − 8)</span>. Wat is die konstante term?", answer: "11", topic: "Uitdrukkings" },
        { type: "mc", text: "Wat is <span class='math'>−(−3x + 5)</span>?", options: ["−3x + 5", "3x + 5", "3x − 5", "−3x − 5"], answer: 2, topic: "Uitdrukkings" },
        { type: "input", text: "Vereenvoudig: <span class='math'>(5x² − 3x + 7) − (2x² − x − 4) + (x² + 2x)</span>. Wat is die konstante term in die antwoord?", answer: "11", topic: "Uitdrukkings" },
        { type: "input", text: "'n Reghoek het lengte <span class='math'>(3x + 2)</span> en breedte <span class='math'>(x − 1)</span>. 'n Tweede reghoek het lengte <span class='math'>(2x − 3)</span> en breedte <span class='math'>(x + 4)</span>. Skryf en vereenvoudig 'n uitdrukking vir die som van die twee omtrekke. Wat is die koëffisiënt van x?", answer: "14", topic: "Uitdrukkings" },
      ]
    },
    {
      id: 604,
      chapter: 6,
      name: "Uitdrukkings vermenigvuldig",
      fullName: "Vermenigvuldiging van algebraïese uitdrukkings",
      lesson: {
        heading: "Algebraïese uitdrukkings vermenigvuldig",
        sub: "Hoofstuk 6 · Onderwerp 4",
        body: `
          <p>Om algebraïese uitdrukkings te vermenigvuldig, gebruik jy die <strong>eksponentwette</strong> en die <strong>distributiewe eienskap</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Reëls vir vermenigvuldiging</div>
            <p>
              <strong>Monoom × monoom:</strong> vermenigvuldig koëffisiënte, tel eksponente bymekaar.<br>
              <span class="math">3x² × 4x³ = 12x⁵</span><br><br>
              <strong>Monoom × polinoom (versprei):</strong><br>
              <span class="math">3x(2x + 5) = 6x² + 15x</span><br><br>
              <strong>Tekenreëls geld:</strong><br>
              <span class="math">−2x(3x − 4) = −6x² + 8x</span><br><br>
              <strong>Verhef tot 'n mag:</strong><br>
              <span class="math">(2x)³ = 8x³</span> &nbsp; (pas toe op beide koëffisiënt en veranderlike)
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Monoom × polinoom</div>
            <div class="example-step"><span class="step-num">1</span><span>Vermenigvuldig uit: <span class="math">4x(3x² − 2x + 1)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">4x × 3x² = 12x³</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">4x × (−2x) = −8x²</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">4x × 1 = 4x</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span>Resultaat: <span class="math">12x³ − 8x² + 4x</span></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Negatiewe monoom</div>
            <div class="example-step"><span class="step-num">1</span><span>Vermenigvuldig uit: <span class="math">−3y(2y − 5)</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">−3y × 2y = −6y²</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">−3y × (−5) = +15y</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Resultaat: <span class="math">−6y² + 15y</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir <span class="math">aˣ × aʸ = aˣ⁺ʸ</span> — tel eksponente bymekaar wanneer jy dieselfde grondtal vermenigvuldig. Vir koëffisiënte, vermenigvuldig net normaalweg.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Vereenvoudig: <span class='math'>3x² × 5x³</span>", options: ["15x⁵", "15x⁶", "8x⁵", "15x"], answer: 0, topic: "Uitdrukkings" },
        { type: "mc", text: "Vermenigvuldig uit: <span class='math'>2x(3x + 4)</span>", options: ["6x + 8", "6x² + 8", "6x² + 8x", "5x² + 6x"], answer: 2, topic: "Uitdrukkings" },
        { type: "input", text: "Vermenigvuldig uit: <span class='math'>−3a(2a − 5)</span>. Wat is die koëffisiënt van a?", answer: "15", topic: "Uitdrukkings" },
        { type: "mc", text: "Vermenigvuldig uit en vereenvoudig: <span class='math'>4x(x − 2) + 3x(x + 1)</span>", options: ["7x² − 5x", "7x² − 5", "7x² + 5x", "x² − 5x"], answer: 0, topic: "Uitdrukkings" },
        { type: "input", text: "Vereenvoudig: <span class='math'>2x² × 3x × 4</span>", answer: "24x^3", topic: "Uitdrukkings" },
        { type: "mc", text: "Vermenigvuldig uit: <span class='math'>−2x(x² − 3x + 5)</span>", options: ["−2x³ − 6x² − 10x", "−2x³ + 6x² − 10x", "2x³ − 6x² + 10x", "−2x³ + 6x² + 10x"], answer: 1, topic: "Uitdrukkings" },
        { type: "input", text: "Vermenigvuldig uit en vereenvoudig: <span class='math'>3x(2x − 5) − 2x(x + 4)</span>. Wat is die koëffisiënt van x in die antwoord?", answer: "-23", topic: "Uitdrukkings" },
        { type: "input", text: "'n Reghoek het lengte <span class='math'>2x</span> en breedte <span class='math'>(x + 3)</span>. Skryf 'n uitdrukking vir die oppervlakte, en bereken dan die oppervlakte as x = 4.", answer: "56", topic: "Uitdrukkings" },
      ]
    },
    {
      id: 605,
      chapter: 6,
      name: "Uitdrukkings deel",
      fullName: "Deling van algebraïese uitdrukkings deur 'n monoom",
      lesson: {
        heading: "Algebraïese uitdrukkings deur 'n monoom deel",
        sub: "Hoofstuk 6 · Onderwerp 5",
        body: `
          <p>Om 'n algebraïese uitdrukking deur 'n monoom te deel, beteken dat jy <strong>elke term</strong> in die uitdrukking deur die monoom deel. Pas die delingsreëls op koëffisiënte en die eksponentwette op die veranderlikes toe.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Reëls vir deling</div>
            <p>
              <strong>Koëffisiënte:</strong> deel die getalle soos normaalweg.<br>
              <strong>Veranderlikes:</strong> trek die eksponente af (dieselfde grondtal: <span class="math">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</span>).<br>
              <strong>Elke term</strong> in die teller word apart deur die monoom gedeel.<br><br>
              <span class="math">(ax^m + bx^n) ÷ cx^p = (a÷c)x^(m-p) + (b÷c)x^(n-p)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld 1 — Monoom ÷ monoom</div>
            <div class="example-step"><span class="step-num">1</span><span>Vereenvoudig: <span class="math">12x⁵ ÷ 4x²</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Koëffisiënte: <span class="math">12 ÷ 4 = 3</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Veranderlikes: <span class="math">x⁵ ÷ x² = x⁵⁻² = x³</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><strong>Antwoord: <span class="math">3x³</span></strong></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld 2 — Polinoom ÷ monoom</div>
            <div class="example-step"><span class="step-num">1</span><span>Vereenvoudig: <span class="math">(6x³ + 9x²) ÷ 3x</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Deel elke term apart: <span class="math">(6x³ ÷ 3x) + (9x² ÷ 3x)</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Eerste term: <span class="math">6÷3=2</span>, <span class="math">x³÷x=x²</span> → <span class="math">2x²</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Tweede term: <span class="math">9÷3=3</span>, <span class="math">x²÷x=x</span> → <span class="math">3x</span></span></div>
            <div class="example-step"><span class="step-num">5</span><span><strong>Antwoord: <span class="math">2x² + 3x</span></strong></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld 3 — Met negatiewe terme</div>
            <div class="example-step"><span class="step-num">1</span><span>Vereenvoudig: <span class="math">(8a³ − 12a² + 4a) ÷ 4a</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">(8a³÷4a) − (12a²÷4a) + (4a÷4a)</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">2a² − 3a + 1</span></span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Deel <strong>elke</strong> term in die hakie deur die monoom — 'n algemene fout is om te vergeet om die laaste term of die konstante te deel.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Vereenvoudig: <span class='math'>15x⁴ ÷ 5x</span>", options: ["3x³", "3x⁴", "10x³", "3x"], answer: 0, topic: "Deling" },
        { type: "input", text: "Vereenvoudig: <span class='math'>20a⁵ ÷ 4a²</span>. Gee slegs die koëffisiënt.", answer: "5", topic: "Deling" },
        { type: "mc", text: "Vereenvoudig: <span class='math'>(6x² + 9x) ÷ 3x</span>", options: ["2x + 9", "2x + 3", "6x + 3", "2x² + 3"], answer: 1, topic: "Deling" },
        { type: "input", text: "Vereenvoudig: <span class='math'>(12y³ − 8y² + 4y) ÷ 4y</span>. Wat is die konstante term?", answer: "1", topic: "Deling" },
        { type: "mc", text: "Vereenvoudig: <span class='math'>18x³y² ÷ 6xy</span>", options: ["3x²y", "3x²y²", "12x²y", "3xy"], answer: 0, topic: "Deling" },
        { type: "input", text: "Vereenvoudig: <span class='math'>(10a³b − 15a²b²) ÷ 5ab</span>. Wat is die koëffisiënt van die tweede term?", answer: "-3", topic: "Deling" },
        { type: "input", text: "Vereenvoudig: <span class='math'>(18x⁴ − 12x³ + 6x²) ÷ 6x²</span>. Wat is die koëffisiënt van x in die antwoord?", answer: "-2", topic: "Deling" },
        { type: "input", text: "'n Reghoek het oppervlakte <span class='math'>(12x³ + 8x²)</span> en breedte <span class='math'>4x²</span>. Bepaal 'n uitdrukking vir die lengte, en vind dan die lengte as x = 2.", answer: "8", topic: "Deling" },
      ]
    },
    {
      id: 606,
      chapter: 6,
      name: "Substitusie",
      fullName: "Substitusie in algebraïese uitdrukkings",
      lesson: {
        heading: "Substitusie",
        sub: "Hoofstuk 6 · Onderwerp 6",
        body: `
          <p><strong>Substitusie</strong> beteken om 'n veranderlike met 'n gegewe getal te vervang en die uitdrukking te evalueer. Dit word gebruik om antwoorde te kontroleer en in werklike formules.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Metode</div>
            <p>
              1. Skryf die uitdrukking.<br>
              2. Vervang elke veranderlike met die gegewe waarde (gebruik hakies om negatiewe waardes).<br>
              3. Pas BODMAS toe om te evalueer.<br><br>
              Gebruik altyd hakies wanneer jy 'n negatiewe getal vervang, om tekenfoute te vermy:<br>
              Vir x = −3: skryf <span class="math">x² = (−3)² = 9</span>, nie <span class="math">-3² = -9</span> nie
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>As <span class="math">x = 2</span> en <span class="math">y = −3</span>, evalueer <span class="math">3x² − 2xy + y</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">= 3(2)² − 2(2)(−3) + (−3)</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">= 3(4) − 2(−6) + (−3)</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">= 12 + 12 − 3 = 21</span></span></div>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Substitusie-sakrekenaar</div>
            <div style="margin-top:10px;">
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;align-items:flex-end;">
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Uitdrukking</label>
                  <select id="subExpr" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;min-width:180px;">
                    <option value="x2">x²</option>
                    <option value="3x2">3x²</option>
                    <option value="3x2m2x">3x² − 2x</option>
                    <option value="3x2m2xp1">3x² − 2x + 1</option>
                    <option value="2x3mx2">2x³ − x²</option>
                    <option value="xp3sq">(x + 3)²</option>
                  </select>
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">x =</label>
                  <input id="subX" type="number" value="2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
                </div>
                <div id="subResult" style="padding:7px 18px;background:rgba(110,231,183,0.10);border:1px solid rgba(110,231,183,0.25);border-radius:7px;font-family:JetBrains Mono,monospace;font-size:15px;color:#6ee7b7;min-width:80px;text-align:center;"></div>
              </div>
              <div id="subSteps" style="font-size:12px;color:rgba(221,225,240,0.55);line-height:1.8;font-family:JetBrains Mono,monospace;"></div>
            </div>
          </div>
          <script>
          (function(){
            const exprs = {
              x2:       { label:'x²',            fn: x => x*x,             steps: x => ['x²','= ('+x+')²','= '+x*x] },
              '3x2':    { label:'3x²',           fn: x => 3*x*x,           steps: x => ['3x²','= 3('+x+')²','= 3('+x*x+')','= '+3*x*x] },
              '3x2m2x': { label:'3x² − 2x',      fn: x => 3*x*x - 2*x,    steps: x => ['3x² − 2x','= 3('+x+')² − 2('+x+')','= '+(3*x*x)+' − '+(2*x),'= '+(3*x*x-2*x)] },
              '3x2m2xp1':{ label:'3x²−2x+1',    fn: x => 3*x*x-2*x+1,    steps: x => ['3x²−2x+1','= 3('+x+')²−2('+x+')+1','= '+(3*x*x)+' − '+(2*x)+' + 1','= '+(3*x*x-2*x+1)] },
              '2x3mx2': { label:'2x³ − x²',      fn: x => 2*x*x*x - x*x,  steps: x => ['2x³ − x²','= 2('+x+')³ − ('+x+')²','= '+(2*x*x*x)+' − '+(x*x),'= '+(2*x*x*x-x*x)] },
              xp3sq:    { label:'(x+3)²',        fn: x => (x+3)*(x+3),     steps: x => ['(x+3)²','= ('+x+'+3)²','= ('+( x+3)+')²','= '+((x+3)*(x+3))] },
            };
            function update() {
              const key = document.getElementById('subExpr').value;
              const x = parseFloat(document.getElementById('subX').value);
              if (isNaN(x)) return;
              const expr = exprs[key];
              document.getElementById('subResult').textContent = '= ' + expr.fn(x);
              document.getElementById('subSteps').innerHTML =
                expr.steps(x).map((s,i) => '<span style="opacity:'+(0.4+i*0.15+0.15)+'">' + (i===0?expr.label+' as x='+x+':':'  '+s) + '</span>').join('<br>');
            }
            document.getElementById('subExpr').addEventListener('change', update);
            document.getElementById('subX').addEventListener('input', update);
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Verander x na 'n negatiewe getal en let op hoe tekens werk. Probeer x = −2 met 3x² om te bevestig dat 'n negatiewe getal in die kwadraat 'n positiewe waarde gee.</span></div>
        `
      },
      questions: [
        { type: "input", text: "As x = 3, evalueer <span class='math'>2x² − 5x + 1</span>", answer: "4", topic: "Substitusie" },
        { type: "mc", text: "As a = −2, wat is <span class='math'>a² − 3a</span>?", options: ["2", "10", "−2", "−10"], answer: 1, topic: "Substitusie" },
        { type: "input", text: "As x = 2 en y = −1, evalueer <span class='math'>3x + 4y − 2</span>", answer: "0", topic: "Substitusie" },
        { type: "mc", text: "As p = −3, wat is <span class='math'>(p + 2)²</span>?", options: ["1", "−1", "25", "−25"], answer: 0, topic: "Substitusie" },
        { type: "input", text: "As x = 4, evalueer <span class='math'>x³ − 2x² + x</span>", answer: "36", topic: "Substitusie" },
        { type: "mc", text: "Die formule vir die oppervlakte van 'n trapesium is <span class='math'>A = ½(a+b)h</span>. As a=5, b=9, h=4, dan is A = ?", options: ["28", "56", "18", "36"], answer: 0, topic: "Substitusie" },
        { type: "input", text: "As x = −2 en y = 3, evalueer <span class='math'>2x²y − 3xy + y²</span>", answer: "51", topic: "Substitusie" },
        { type: "input", text: "'n Reghoek het lengte <span class='math'>(x + 4)</span> en breedte <span class='math'>(x − 1)</span>. Skryf 'n vereenvoudigde uitdrukking vir sy omtrek <span class='math'>P = 2(l + b)</span>, en evalueer dan P as x = 5.", answer: "26", topic: "Substitusie" },
      ]
    },
    {
      id: 607,
      chapter: 6,
      name: "H6 Eksamenfokus",
      fullName: "Eksamenfokusoefening",
      lesson: {
        heading: "Hoofstuk 6 — Eksamenfokus",
        sub: "Hoofstuk 6 · Hersiening",
        body: `
          <p>Algebra-eksamenvrae toets jou vermoë om uitdrukkings te identifiseer, te vereenvoudig, uit te vermenigvuldig, en te evalueer. Werk versigtig en wys elke stap.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 6-opsomming</div>
            <p>
              ✅ Terme: koëffisiënt × veranderlike(s) — geskei deur + of −<br>
              ✅ Monoom (1 term), binoom (2), trinoom (3)<br>
              ✅ Gelyksoortige terme: dieselfde veranderlike, dieselfde mag — kan gekombineer word<br>
              ✅ 'n Hakie aftrek: verander die teken van elke term binne<br>
              ✅ Vermenigvuldig: koëffisiënte × koëffisiënte, tel eksponente bymekaar<br>
              ✅ Versprei: a(b + c) = ab + ac<br>
              ✅ Deel: (ax^m + bx^n) ÷ cx^p — deel elke term deur die monoom<br>
              ✅ Substitusie: vervang die veranderlike met die waarde, gebruik hakies vir negatiewes
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Punte gaan verlore wanneer leerders vergeet om tekens te verander wanneer hulle 'n hakie aftrek, of die veranderlike laat val nadat hulle gelyksoortige terme saamgevoeg het. Skryf elke stap.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Vereenvoudig: <span class='math'>5x² − 3x + 2x² − x + 4</span>", options: ["7x² − 4x + 4", "7x² + 4x + 4", "3x² − 4x + 4", "7x² − 4x"], answer: 0, topic: "Gemeng" },
        { type: "mc", text: "Vermenigvuldig uit en vereenvoudig: <span class='math'>3x(x − 2) − (x² − 4x)</span>", options: ["2x² − 2x", "2x² + 2x", "4x² − 2x", "2x² − 10x"], answer: 0, topic: "Gemeng" },
        { type: "input", text: "As a = −1 en b = 3, evalueer <span class='math'>2a² − ab + b²</span>", answer: "14", topic: "Gemeng" },
        { type: "mc", text: "Vereenvoudig: <span class='math'>(3x² + x − 5) − (x² − 3x + 2)</span>", options: ["2x² − 2x − 3", "2x² + 4x − 7", "4x² + 4x − 7", "2x² + 4x − 3"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "Vermenigvuldig uit: <span class='math'>−4x(2x² − 3x + 1)</span>. Wat is die koëffisiënt van x²?", answer: "12", topic: "Gemeng" },
        { type: "input", text: "Vereenvoudig: <span class='math'>2x(x − 3) − (x² − 5x + 6)</span>. Wat is die konstante term?", answer: "-6", topic: "Gemeng" },
        { type: "input", text: "'n Getaltruuk: dink aan 'n getal x, tel 4 by, vermenigvuldig met 3, trek 12 af, deel dan deur 3. Vereenvoudig die uitdrukking algebraïes — wat kry jy altyd terug?", answer: "x", topic: "Gemeng" },
      ]
    }
  ],
  workbook: {
    chapter: 6, chapterName: "Algebraïese Uitdrukkings",
    topics: [
      {
        name: "Algebraïese taal en gelyksoortige terme",
        questions: [
          {
            num: "1",
            text: "Identifiseer en vereenvoudig die volgende:",
            parts: [
              { label: "a)", text: "Lys die terme in: <span class='math'>3x² − 5xy + 2y − 7</span>", marks: 2 },
              { label: "b)", text: "Gee die koëffisiënt van xy.", marks: 1 },
              { label: "c)", text: "Vereenvoudig: <span class='math'>4a + 3b − 2a + 5b − b</span>", marks: 3 },
              { label: "d)", text: "Vereenvoudig: <span class='math'>3x² + 2x − x² + 4x − 5</span>", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Uitdrukkings vermenigvuldig en deel",
        questions: [
          {
            num: "2",
            text: "Vermenigvuldig uit en vereenvoudig:",
            parts: [
              { label: "a)", text: "<span class='math'>3(2x − 4)</span>", marks: 2 },
              { label: "b)", text: "<span class='math'>−2(x + 5) + 3(2x − 1)</span>", marks: 3 },
              { label: "c)", text: "<span class='math'>(x + 3)(x + 4)</span>", marks: 3 },
              { label: "d)", text: "<span class='math'>(2x − 1)(x + 5)</span>", marks: 3 },
            ]
          },
          {
            num: "3",
            text: "Vereenvoudig:",
            parts: [
              { label: "a)", text: "<span class='math'>12x³ ÷ 4x</span>", marks: 2 },
              { label: "b)", text: "<span class='math'>(6x² + 9x) ÷ 3x</span>", marks: 3 },
              { label: "c)", text: "<span class='math'>√(9x⁴)</span>", marks: 2 },
              { label: "d)", text: "<span class='math'>∛(8x⁶)</span>", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Substitusie",
        questions: [
          {
            num: "4",
            text: "Gegewe <span class='math'>a = 3</span> en <span class='math'>b = −2</span>, evalueer:",
            parts: [
              { label: "a)", text: "<span class='math'>a² − b²</span>", marks: 2 },
              { label: "b)", text: "<span class='math'>2a² + 3b − 1</span>", marks: 3 },
              { label: "c)", text: "<span class='math'>√(a² + b²)</span> (los in wortelvorm)", marks: 2 },
              { label: "d)", text: "<span class='math'>(a + b)² − (a − b)²</span>", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 6, chapterName: "Hoofstuk 6 — Algebraïese Uitdrukkings",
    topics: [
      {
        name: "Algebraïese taal en gelyksoortige terme",
        answers: [
          { num: "Q1a", ans: "3x², −5xy, 2y, −7 (4 terme)", note: "" },
          { num: "Q1b", ans: "−5", note: "Koëffisiënt sluit die teken in" },
          { num: "Q1c", ans: "2a + 7b", note: "4a−2a=2a; 3b+5b−b=7b" },
          { num: "Q1d", ans: "2x² + 6x − 5", note: "3x²−x²=2x²; 2x+4x=6x; konstante −5" },
        ]
      },
      {
        name: "Uitdrukkings vermenigvuldig en deel",
        answers: [
          { num: "Q2a", ans: "6x − 12", note: "3×2x=6x; 3×(−4)=−12" },
          { num: "Q2b", ans: "4x − 13", note: "−2x−10+6x−3=4x−13" },
          { num: "Q2c", ans: "x² + 7x + 12", note: "FOIL: x²+4x+3x+12" },
          { num: "Q2d", ans: "2x² + 9x − 5", note: "FOIL: 2x²+10x−x−5" },
          { num: "Q3a", ans: "3x²", note: "12÷4=3; x³÷x=x²" },
          { num: "Q3b", ans: "2x + 3", note: "6x²÷3x=2x; 9x÷3x=3" },
          { num: "Q3c", ans: "3x²", note: "√9=3; √(x⁴)=x²" },
          { num: "Q3d", ans: "2x²", note: "∛8=2; ∛(x⁶)=x²" },
        ]
      },
      {
        name: "Substitusie",
        answers: [
          { num: "Q4a", ans: "5", note: "3²−(−2)²=9−4=5" },
          { num: "Q4b", ans: "11", note: "2(9)+3(−2)−1=18−6−1=11" },
          { num: "Q4c", ans: "√13", note: "√(9+4)=√13" },
          { num: "Q4d", ans: "−24", note: "(a+b)²−(a−b)²=4ab=4(3)(−2)=−24" },
        ]
      },
    ]
  }
});
