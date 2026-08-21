// Math Magician — Grade 8, Chapter 8 data
// Constructions

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 801,
      chapter: 8,
      name: "Notasie en terminologie",
      fullName: "Hersiening van notasie, terminologie, en die benoeming van hoeke",
      lesson: {
        heading: "Notasie, terminologie, en die benoeming van hoeke",
        sub: "Hoofstuk 8 · Onderwerp 1",
        body: `
          <p>Voordat jy meetkundige figure konstrueer, is dit noodsaaklik om die korrekte notasie en terminologie wat in meetkunde gebruik word, te verstaan. Hierdie konvensies word in alle diagramme, bewyse, en eksamenvrae gebruik.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Punte, lyne, en hoeke</div>
            <p>
              <strong>Punt:</strong> 'n plek in die ruimte, benoem met 'n hoofletter. bv. A, B, P.<br>
              <strong>Lynstuk:</strong> 'n reguit pad tussen twee punte. Geskryf as <span class="math">AB</span> met lengte <span class="math">AB = 5 cm</span>.<br>
              <strong>Straal:</strong> begin by 'n punt en strek oneindig in een rigting. bv. straal AB.<br>
              <strong>Lyn:</strong> strek oneindig in beide rigtings.<br><br>
              <strong>Hoeknotasie:</strong><br>
              &nbsp;&nbsp;• <span class="math">∠ABC</span> — die middelste letter B is die hoekpunt.<br>
              &nbsp;&nbsp;• <span class="math">B̂</span> — 'n hoedjie oor die hoekpuntletter.<br>
              &nbsp;&nbsp;• <span class="math">∠B</span> — gebruik wanneer daar slegs een hoek by daardie hoekpunt is.<br><br>
              <strong>Driehoeknotasie:</strong> △ABC — hoekpunte in volgorde gelys; sye benoem volgens hul teenoorstaande hoekpunte: sy a (teenoor A), sy b (teenoor B), sy c (teenoor C).
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Klassifisering van hoeke — hersiening</div>
            <p>
              <strong>Skerp:</strong> 0° &lt; â &lt; 90° &nbsp;&nbsp;
              <strong>Reg:</strong> â = 90° &nbsp;&nbsp;
              <strong>Stomp:</strong> 90° &lt; â &lt; 180°<br>
              <strong>Gestrek:</strong> â = 180° &nbsp;&nbsp;
              <strong>Refleks:</strong> 180° &lt; â &lt; 360° &nbsp;&nbsp;
              <strong>Volledige omwenteling:</strong> â = 360°<br><br>
              <strong>Komplementêre hoeke:</strong> twee hoeke wat saam 90° gee.<br>
              <strong>Supplementêre hoeke:</strong> twee hoeke wat saam 180° gee.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Gebruik van korrekte notasie</div>
            <div class="example-step"><span class="step-num">1</span><span>In △PQR word die hoek by Q geskryf as <span class="math">∠PQR</span> of <span class="math">Q̂</span>.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Die sy teenoor P is <span class="math">QR</span>, benoem as sy p.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>As <span class="math">∠PQR = 35°</span>, dan is die komplement van Q̂ = <span class="math">90° − 35° = 55°</span>.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Die supplement van Q̂ = <span class="math">180° − 35° = 145°</span>.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Komplement- en Supplementberekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Voer enige hoek in en sien onmiddellik sy komplement (90° −) en supplement (180° −).</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <span style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Hoek =</span>
              <input id="csAngle" type="number" value="38" min="0" max="180" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="font-size:13px;color:#a5b4fc;font-family:JetBrains Mono,monospace;">°</span>
            </div>
            <div id="csOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('csAngle').value);
              const el=document.getElementById('csOut');
              if(isNaN(a)||a<0||a>180){el.innerHTML='<span style="color:#fca5a5;">Voer \'n hoek tussen 0° en 180° in</span>';return;}
              const comp=90-a;
              const supp=180-a;
              let html='';
              html+='<div><span style="color:rgba(221,225,240,0.45);">Komplement  </span><span style="color:#6ee7b7;">90° − '+a+'° = <strong>'+comp+'°</strong></span>'+(comp<0?' <span style="color:#fca5a5;font-size:11px;">(geen komplement — hoek &gt; 90°)</span>':'')+'</div>';
              html+='<div><span style="color:rgba(221,225,240,0.45);">Supplement  </span><span style="color:#fcd34d;">180° − '+a+'° = <strong>'+supp+'°</strong></span></div>';
              html+='<div style="margin-top:6px;font-size:11px;opacity:0.4;">'+a+'° is '+(a<90?'skerp':(a===90?'\'n regte hoek':(a<180?'stomp':'\'n gestrekte hoek')))+'</div>';
              el.innerHTML=html;
            }
            document.getElementById('csAngle').addEventListener('input',update);
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>By konstruksievrae word punte toegeken vir korrekte benoeming. Benoem altyd punte met hoofletters en gebruik die korrekte hoeknotasie in jou antwoorde.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "In △ABC word die hoek by hoekpunt B korrek geskryf as:", options: ["∠BAC", "∠ABC", "∠ACB", "∠BAB"], answer: 1, topic: "Notasie" },
        { type: "input", text: "Wat is die komplement van 'n hoek van 38°?", answer: "52", topic: "Notasie" },
        { type: "mc", text: "Twee hoeke is supplementêr. Een hoek is 115°. Wat is die ander een?", options: ["75°", "65°", "25°", "155°"], answer: 1, topic: "Notasie" },
        { type: "mc", text: "In △PQR is die sy teenoor hoekpunt P:", options: ["PQ", "PR", "QR", "PQR"], answer: 2, topic: "Notasie" },
        { type: "input", text: "'n Hoek is 3 keer sy komplement. Bepaal die hoek in grade.", answer: "67.5", topic: "Notasie" },
        { type: "input", text: "Twee komplementêre hoeke is in die verhouding 2 : 3. Bepaal die grootte van die groter hoek.", answer: "54", topic: "Notasie" },
        { type: "input", text: "Die supplement van 'n hoek is 4 keer sy komplement. Bepaal die hoek in grade.", answer: "60", topic: "Notasie" },
      ]
    },
    {
      id: 802,
      chapter: 8,
      name: "Loodregte lyne",
      fullName: "Konstruksie van loodregte lyne",
      lesson: {
        heading: "Konstruksie van loodregte lyne",
        sub: "Hoofstuk 8 · Onderwerp 2",
        body: `
          <p>'n <strong>Loodregte lyn</strong> ontmoet 'n ander lyn by presies 90°. Twee sleutelkonstruksies is die loodregte middelloodlyn van 'n lynstuk, en 'n loodlyn vanaf 'n punt na 'n lyn.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Gereedskap en reëls</div>
            <p>
              Konstruksies word slegs met 'n <strong>passer</strong> en <strong>liniaal</strong> (reguitkant) gedoen — geen gradeboog nie.<br>
              Alle boë moet sigbaar wees in jou finale antwoord.<br>
              Benoem alle relevante punte.<br><br>
              <strong>Middelloodlyn van AB:</strong> 'n lyn wat loodreg op AB is en deur die middelpunt van AB gaan.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Konstruksie van die middelloodlyn van AB</div>
            <div class="example-step"><span class="step-num">1</span><span>Open die passer tot meer as die helfte van die lengte van AB.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Plaas die passer by A en trek boë bo en onder AB.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Sonder om die passerinstelling te verander, plaas dit by B en trek boë wat die eerste boë sny by punte P en Q.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Trek 'n reguit lyn deur P en Q. Hierdie lyn is die middelloodlyn van AB.</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Benoem die middelpunt M waar PQ met AB sny. <span class="math">AM = MB</span> en <span class="math">∠PMA = 90°</span>.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Loodlyn vanaf 'n punt na 'n lyn</div>
            <div class="example-step"><span class="step-num">1</span><span>Gegee lyn l en punt P wat nie op die lyn is nie.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Plaas die passer by P. Trek 'n boog wat l sny by twee punte, A en B.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Konstrueer die middelloodlyn van AB (stappe hierbo). Dit gaan deur P.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Die lyn vanaf P na die middelpunt van AB is loodreg op l.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vee nooit jou konstruksieboë uit nie — hulle is bewys van korrekte metode en verdien punte op hul eie.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter hoek vorm 'n middelloodlyn met die oorspronklike lynstuk?", options: ["45°", "60°", "90°", "180°"], answer: 2, topic: "Konstruksies" },
        { type: "mc", text: "Wanneer 'n middelloodlyn gekonstrueer word, word die passer eers by punt A geplaas. Wat moet die passeropening wees?", options: ["Presies die helfte van AB", "Minder as die helfte van AB", "Meer as die helfte van AB", "Gelyk aan AB"], answer: 2, topic: "Konstruksies" },
        { type: "input", text: "Die middelloodlyn van AB gaan deur die middelpunt M. As AB = 8,4 cm, wat is AM in cm?", answer: "4.2", topic: "Konstruksies" },
        { type: "mc", text: "Watter gereedskap word vir meetkundige konstruksies gebruik?", options: ["Gradeboog en liniaal", "Passer en liniaal", "Passer en gradeboog", "Liniaal en driehoek-liniaal alleen"], answer: 1, topic: "Konstruksies" },
        { type: "mc", text: "Nadat 'n middelloodlyn gekonstrueer is, wat moet jy NIE doen nie?", options: ["Benoem die middelpunt", "Trek die lyn deur beide boogsnypunte", "Vee die konstruksieboë uit", "Kontroleer dat die hoek 90° is"], answer: 2, topic: "Konstruksies" },
        { type: "input", text: "M is die middelpunt van AB op sy middelloodlyn. AM = (3x − 1) cm en MB = (x + 7) cm. Los op vir x, en bereken dan die lengte van AB in cm.", answer: "22", topic: "Konstruksies" },
        { type: "input", text: "Punte A en B is 10 cm uitmekaar. Punt P lê op die middelloodlyn van AB sodat PA = 13 cm. Gebruik die stelling van Pythagoras om die afstand van P na die middelpunt van AB te bereken.", answer: "12", topic: "Konstruksies" },
      ]
    },
    {
      id: 803,
      chapter: 8,
      name: "Konstruksie van hoeke",
      fullName: "Konstruksie van hoeke",
      lesson: {
        heading: "Konstruksie van hoeke",
        sub: "Hoofstuk 8 · Onderwerp 3",
        body: `
          <p>Met 'n passer en liniaal kan jy spesifieke hoeke akkuraat konstrueer — sonder 'n gradeboog. Die belangrikste hoeke om te ken is 60°, 90°, en hul veelvoude en halverings.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelhoekkonstruksies</div>
            <p>
              <strong>60°-hoek:</strong> gekonstrueer met 'n gelyksydige driehoek (alle sye gelyk = alle hoeke 60°).<br>
              <strong>90°-hoek:</strong> gekonstrueer met 'n middelloodlyn.<br>
              <strong>30°-hoek:</strong> halveer 'n 60°-hoek.<br>
              <strong>45°-hoek:</strong> halveer 'n 90°-hoek.<br>
              <strong>120°-hoek:</strong> konstrueer twee aangrensende 60°-hoeke.<br><br>
              <strong>Hoekhalveerder:</strong> 'n straal wat 'n hoek in twee gelyke helftes verdeel.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Konstruksie van 'n 60°-hoek by punt A op lyn AB</div>
            <div class="example-step"><span class="step-num">1</span><span>Plaas die passer by A. Trek 'n boog wat lyn AB by punt P sny.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Sonder om die passerwydte te verander, plaas dit by P en trek 'n boog wat die eerste boog by Q sny.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Trek straal AQ. <span class="math">∠QAB = 60°</span>.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Halvering van 'n hoek (bv. halvering van ∠BAC)</div>
            <div class="example-step"><span class="step-num">1</span><span>Plaas die passer by hoekpunt A. Trek 'n boog wat AB by P en AC by Q sny.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Plaas die passer by P; trek 'n boog binne die hoek. Herhaal vanaf Q met dieselfde passerwydte. Laat die boë ontmoet by R.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Trek straal AR — dit is die hoekhalveerder. <span class="math">∠BAR = ∠RAC = ½∠BAC</span>.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Enige hoek wat 'n veelvoud van 15° is, kan gekonstrueer word deur kombinasies van 60° en 90° en hul halverings te gebruik: 15°, 30°, 45°, 60°, 75°, 90°, 120°, 135°, 150°.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Hoe word 'n 30°-hoek gekonstrueer?", options: ["Deur 'n 90°-hoek te halveer", "Deur 'n 60°-hoek te halveer", "Deur twee aangrensende 15°-hoeke te konstrueer", "Deur die middelloodlyn te gebruik"], answer: 1, topic: "Konstruksies" },
        { type: "mc", text: "Watter hoek word gevorm wanneer jy 'n gelyksydige driehoek konstrueer?", options: ["90°", "45°", "60°", "30°"], answer: 2, topic: "Konstruksies" },
        { type: "input", text: "As jy 'n 90°-hoek halveer, wat is die grootte van elke resulterende hoek?", answer: "45", topic: "Konstruksies" },
        { type: "mc", text: "Wanneer ∠BAC gehalveer word, word boë vanaf P en Q getrek. Wat moet waar wees van die passerinstelling vir albei boë?", options: ["Dit moet elke keer verander", "Dit moet vir albei gelyk wees", "Dit maak nie saak nie", "Dit moet wyer as AB wees"], answer: 1, topic: "Konstruksies" },
        { type: "input", text: "Watter hoek kry jy as jy twee aangrensende 60°-hoeke konstrueer?", answer: "120", topic: "Konstruksies" },
        { type: "input", text: "Jy konstrueer 'n 60°-hoek, halveer dit, en halveer dan die resultaat weer. Wat is die grootte van die finale hoek?", answer: "15", topic: "Konstruksies" },
        { type: "mc", text: "Watter kombinasie van konstrueerbare hoeke gee 'n totaal van 105°?", options: ["60° + 45°", "90° + 30°", "60° + 30°", "45° + 45°"], answer: 0, topic: "Konstruksies" },
      ]
    },
    {
      id: 804,
      chapter: 8,
      name: "Konstruksie van driehoeke",
      fullName: "Konstruksie van driehoeke",
      lesson: {
        heading: "Konstruksie van driehoeke",
        sub: "Hoofstuk 8 · Onderwerp 4",
        body: `
          <p>'n Driehoek word uniek bepaal wanneer genoeg metings gegee is. Daar is vier standaardgevalle vir driehoekkonstruksie.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Die vier konstruksiegevalle</div>
            <p>
              <strong>Geval 1 — SSS (Sy-Sy-Sy):</strong> al drie sye is gegee.<br>
              <strong>Geval 2 — SHS (Sy-Hoek-Sy):</strong> twee sye en die ingeslote hoek is gegee.<br>
              <strong>Geval 3 — HSH (Hoek-Sy-Hoek):</strong> twee hoeke en die ingeslote sy is gegee.<br>
              <strong>Geval 4 — RSS (Regte hoek-Skuinssy-Sy):</strong> 'n regte hoek, die skuinssy, en een ander sy is gegee.<br><br>
              <em>Let wel: HHH (slegs drie hoeke) gee NIE 'n unieke driehoek nie — eendersvormige driehoeke van verskillende groottes voldoen almal daaraan.</em>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ SSS-konstruksie — △ABC met AB = 6 cm, BC = 5 cm, AC = 4 cm</div>
            <div class="example-step"><span class="step-num">1</span><span>Trek basis AB = 6 cm met 'n liniaal.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Stel die passer op 5 cm (= BC). Plaas by B en trek 'n boog bo AB.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Stel die passer op 4 cm (= AC). Plaas by A en trek 'n boog wat die eerste boog by C sny.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Verbind AC en BC. Benoem alle hoekpunte.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ SHS-konstruksie — △PQR met PQ = 7 cm, ∠Q = 50°, QR = 5 cm</div>
            <div class="example-step"><span class="step-num">1</span><span>Trek PQ = 7 cm.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Konstrueer (of meet) 'n hoek van 50° by Q.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Merk R op die straal op 5 cm van Q.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Verbind PR. Benoem alle hoekpunte.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Meet en benoem die driehoek altyd na konstruksie om te verifieer. In eksamens kan jy gevra word om 'n spesifieke sy of hoek van jou voltooide konstruksie te meet.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter inligting word benodig vir 'n SSS-driehoekkonstruksie?", options: ["Twee sye en 'n hoek", "Drie sye", "Twee hoeke en 'n sy", "Een sy en twee hoeke"], answer: 1, topic: "Konstruksies" },
        { type: "mc", text: "In 'n SHS-konstruksie moet die gegewe hoek wees:", options: ["Enige hoek van die driehoek", "Die grootste hoek", "Die ingeslote hoek tussen die twee gegewe sye", "Teenoor die langste sy"], answer: 2, topic: "Konstruksies" },
        { type: "mc", text: "Waarom gee HHH nie 'n unieke driehoek nie?", options: ["Al die hoeke is gelyk", "Baie driehoeke van verskillende groottes kan dieselfde hoeke hê", "Dit vereis 'n gradeboog", "Die sye kan nie bereken word nie"], answer: 1, topic: "Konstruksies" },
        { type: "input", text: "In 'n HSH-konstruksie, hoeveel hoeke word gegee? (skryf die getal)", answer: "2", topic: "Konstruksies" },
        { type: "mc", text: "Watter konstruksiegeval geld wanneer jy 'n regte hoek, die skuinssy, en een been ken?", options: ["SHS", "SSS", "HSH", "RSS"], answer: 3, topic: "Konstruksies" },
        { type: "input", text: "△ABC word met SHS gekonstrueer met AB = 9 cm, ∠B = 40°, BC = 6 cm. Na meting is ∠A = 95°. Gebruik die hoeksom van 'n driehoek om ∠C te bereken.", answer: "45", topic: "Konstruksies" },
        { type: "input", text: "'n Leerder wil 'n driehoek (SSS) konstrueer met twee sye van 4 cm en 5 cm. Gebruik die driehoeksongelykheid om die grootste moontlike heelgetal-lengte (in cm) vir die derde sy te bepaal.", answer: "8", topic: "Konstruksies" },
      ]
    },
    {
      id: 805,
      chapter: 8,
      name: "Konstruksie van vierhoeke",
      fullName: "Konstruksie van vierhoeke",
      lesson: {
        heading: "Konstruksie van vierhoeke",
        sub: "Hoofstuk 8 · Onderwerp 5",
        body: `
          <p>'n <strong>Vierhoek</strong> is 'n veelhoek met vier sye. Om een te konstrueer, word dit in driehoeke verdeel — elke driehoek word met die metodes uit Onderwerp 4 gekonstrueer.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Strategie — verdeling in driehoeke</div>
            <p>
              Enige vierhoek kan in twee driehoeke verdeel word deur 'n diagonaal te trek.<br>
              <strong>Minimum inligting benodig:</strong> 5 metings (sye en/of hoeke) om 'n algemene vierhoek uniek te bepaal.<br><br>
              <strong>Spesiale vierhoeke en hul eienskappe:</strong><br>
              &nbsp;&nbsp;• <strong>Vierkant:</strong> 4 gelyke sye, 4 regte hoeke.<br>
              &nbsp;&nbsp;• <strong>Reghoek:</strong> teenoorstaande sye gelyk, 4 regte hoeke.<br>
              &nbsp;&nbsp;• <strong>Parallelogram:</strong> teenoorstaande sye ewewydig en gelyk, teenoorstaande hoeke gelyk.<br>
              &nbsp;&nbsp;• <strong>Ruit:</strong> 4 gelyke sye, teenoorstaande hoeke gelyk, diagonale halveer mekaar by 90°.<br>
              &nbsp;&nbsp;• <strong>Trapesium:</strong> een paar ewewydige sye.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Konstruksie van reghoek ABCD met AB = 6 cm en BC = 4 cm</div>
            <div class="example-step"><span class="step-num">1</span><span>Trek AB = 6 cm.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Konstrueer 'n 90°-hoek by beide A en B.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Merk D op die loodlyn by A (4 cm van A) en C op die loodlyn by B (4 cm van B).</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Verbind DC. Kontroleer: DC behoort gelyk te wees aan AB = 6 cm. Benoem alle hoekpunte.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Konstruksie van 'n algemene vierhoek ABCD met 'n diagonaal</div>
            <div class="example-step"><span class="step-num">1</span><span>Trek eers diagonaal AC — dit verdeel ABCD in △ABC en △ACD.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Konstrueer △ABC met die gegewe metings vir daardie driehoek.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Konstrueer △ACD aan die ander kant van AC met sy metings.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Verbind die oorblywende sy (BD indien nodig). Benoem alle hoekpunte.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Gebruik vir spesiale vierhoeke altyd hul eienskappe as kortpaaie — bv. vir 'n ruit hoef jy net een sylengte te konstrueer en dit vir al vier sye te gebruik.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Hoe word 'n algemene vierhoek vir konstruksiedoeleindes verdeel?", options: ["In vier regte driehoeke", "In twee driehoeke deur 'n diagonaal te gebruik", "In 'n driehoek en 'n reghoek", "In twee parallelogramme"], answer: 1, topic: "Konstruksies" },
        { type: "mc", text: "Hoeveel regte hoeke het 'n reghoek?", options: ["2", "4", "1", "0"], answer: 1, topic: "Konstruksies" },
        { type: "input", text: "'n Ruit het 'n sy van 5 cm. Wat is die lengte van elk van die ander drie sye in cm?", answer: "5", topic: "Konstruksies" },
        { type: "mc", text: "Watter vierhoek het diagonale wat mekaar by 90° halveer?", options: ["Reghoek", "Trapesium", "Ruit", "Parallelogram"], answer: 2, topic: "Konstruksies" },
        { type: "mc", text: "Minimum hoeveel metings word benodig om 'n algemene vierhoek uniek te konstrueer?", options: ["3", "4", "5", "6"], answer: 2, topic: "Konstruksies" },
        { type: "input", text: "Reghoek ABCD het AB = 8 cm en BC = 6 cm. Gebruik die stelling van Pythagoras om die lengte van diagonaal AC in cm te bereken.", answer: "10", topic: "Konstruksies" },
        { type: "input", text: "'n Ruit het diagonale van 16 cm en 12 cm wat mekaar loodreg halveer. Bereken die lengte van een sy van die ruit in cm.", answer: "10", topic: "Konstruksies" },
      ]
    },
    {
      id: 806,
      chapter: 8,
      name: "H8 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 8 — Eksamenfokus",
        sub: "Hoofstuk 8 · Hersiening",
        body: `
          <p>Eksamenvrae oor konstruksies toets beide jou praktiese vaardighede (netjiese, akkurate diagramme met sigbare boë) en jou kennis van terminologie en eienskappe.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 8-opsomming</div>
            <p>
              ✅ Benoem hoeke met die hoekpunt in die middel: <span class="math">∠ABC</span><br>
              ✅ Komplementêre hoeke som tot 90°; supplementêre tot 180°<br>
              ✅ Middelloodlyn: passer &gt; helfte van AB, boë vanaf A en B<br>
              ✅ 60° vanaf gelyksydige boog; halveer vir 30°; 90° vanaf middelloodlyn; halveer vir 45°<br>
              ✅ Driehoekgevalle: SSS, SHS, HSH, RSS<br>
              ✅ Vierhoeke: verdeel in twee driehoeke via 'n diagonaal<br>
              ✅ Laat konstruksieboë altyd sigbaar
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">📝 Algemene eksamenfoute om te vermy</div>
            <div class="example-step"><span class="step-num">✗</span><span>Om konstruksieboë uit te vee — boë dra punte.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Om 'n gradeboog te gebruik waar 'n passerkonstruksie vereis word.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Om te vergeet om hoekpunte te benoem — onbenoemde punte verloor punte.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Om die passerwydte tydens konstruksie te verander wanneer dit dieselfde moet bly (bv. tydens hoekhalvering).</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Lees die vraag versigtig — as dit "konstrueer" sê, gebruik slegs passer en liniaal. As dit "trek" of "skets" sê, kan 'n ruwe diagram aanvaarbaar wees. In Graad 8-eksamens beteken "konstrueer" altyd passer en liniaal.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Watter konstruksiegeval gebruik twee sye en die hoek tussen hulle?", options: ["SSS", "HSH", "SHS", "RSS"], answer: 2, topic: "Gemeng" },
        { type: "input", text: "Wat is die supplement van 'n hoek van 47°?", answer: "133", topic: "Gemeng" },
        { type: "mc", text: "Om 'n 45°-hoek te konstrueer, konstrueer jy eers 'n:", options: ["60°-hoek en halveer dit", "90°-hoek en halveer dit", "30°-hoek", "120°-hoek en trek 75° af"], answer: 1, topic: "Gemeng" },
        { type: "mc", text: "Wanneer △ABC (SSS) gekonstrueer word, stel jy die passer op BC en plaas dit by B. Wat trek jy?", options: ["'n Reguit lyn", "'n Boog om hoekpunt C te bepaal", "Die middelloodlyn", "Die hoek by B"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "'n Vierhoek word deur 'n diagonaal in twee driehoeke verdeel. Hoeveel driehoeke word gevorm?", answer: "2", topic: "Gemeng" },
        { type: "input", text: "Twee hoeke is komplementêr. Die groter hoek is 6° minder as 3 keer die kleiner een. Bepaal die grootte van die groter hoek.", answer: "66", topic: "Gemeng" },
        { type: "input", text: "'n Driehoek het ∠A = 2x, ∠B = (3x − 10)°, en ∠C = (x + 40)°. Gebruik die hoeksom van 'n driehoek om x te bepaal, en gee dan die grootte van die grootste hoek.", answer: "65", topic: "Gemeng" },
      ]
    },
  ],
  workbook: {
    chapter: 8, chapterName: "Konstruksies",
    topics: [
      {
        name: "Terminologie en hoeknotasie",
        questions: [
          {
            num: "1",
            text: "Gebruik die korrekte notasie om die volgende te beantwoord:",
            parts: [
              { label: "a)", text: "In △KLM, skryf die naam van die hoek by hoekpunt L neer.", marks: 1 },
              { label: "b)", text: "Benoem die sy van △KLM wat teenoor hoekpunt K is.", marks: 1 },
              { label: "c)", text: "'n Hoek is 4 keer sy komplement. Stel 'n vergelyking op en los op vir die hoek.", marks: 3 },
              { label: "d)", text: "Twee hoeke is supplementêr. Een is (2x + 10)°. Die ander is (3x − 5)°. Bepaal x en beide hoeke.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Loodregte lyne en hoekkonstruksies",
        questions: [
          {
            num: "2",
            text: "Trek 'n lynstuk AB = 7 cm.",
            parts: [
              { label: "a)", text: "Konstrueer die middelloodlyn van AB. Benoem die middelpunt M.", marks: 3 },
              { label: "b)", text: "Wat is die lengte van AM?", marks: 1 },
              { label: "c)", text: "By punt A op AB, konstrueer 'n hoek van 60°. Benoem die straal AP.", marks: 3 },
              { label: "d)", text: "Halveer ∠PAB om 'n hoek van 30° te konstrueer. Benoem die halveerder AQ.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Konstruksie van driehoeke",
        questions: [
          {
            num: "3",
            text: "Konstrueer △ABC met die volgende metings:",
            parts: [
              { label: "a)", text: "AB = 8 cm, BC = 6 cm, AC = 5 cm. (SSS) Meet en skryf ∠BAC neer.", marks: 4 },
              { label: "b)", text: "△PQR: PQ = 7 cm, ∠PQR = 55°, QR = 4 cm. (SHS) Meet en skryf PR neer.", marks: 4 },
            ]
          },
          {
            num: "4",
            text: "△DEF het ∠D = 40°, ∠E = 75°, en DE = 6 cm.",
            parts: [
              { label: "a)", text: "Gee die konstruksiegeval wat gebruik word.", marks: 1 },
              { label: "b)", text: "Bereken ∠F voordat jy konstrueer.", marks: 2 },
              { label: "c)", text: "Konstrueer △DEF. Meet en skryf EF neer.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Konstruksie van vierhoeke",
        questions: [
          {
            num: "5",
            text: "Konstrueer reghoek ABCD met AB = 6 cm en BC = 3,5 cm.",
            parts: [
              { label: "a)", text: "Beskryf die stappe wat jy gebruik om te verseker dat die hoeke by A en B 90° is.", marks: 2 },
              { label: "b)", text: "Voltooi die konstruksie en benoem alle hoekpunte.", marks: 4 },
              { label: "c)", text: "Meet die diagonaal AC en skryf die lengte daarvan neer.", marks: 1 },
            ]
          },
          {
            num: "6",
            text: "Konstrueer ruit PQRS met PQ = 5 cm en ∠PQR = 70°.",
            parts: [
              { label: "a)", text: "Hoe lank is al vier sye?", marks: 1 },
              { label: "b)", text: "Verduidelik hoe jy die diagonaal sou gebruik om die ruit te konstrueer.", marks: 2 },
              { label: "c)", text: "Voltooi die konstruksie en benoem alle hoekpunte.", marks: 4 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 8, chapterName: "Hoofstuk 8 — Konstruksies",
    topics: [
      {
        name: "Terminologie en hoeknotasie",
        answers: [
          { num: "Q1a", ans: "∠KLM of L̂", note: "Die hoekpunt is altyd in die middel wanneer drieletternotasie gebruik word" },
          { num: "Q1b", ans: "LM (sy l, teenoor K)", note: "Die sy teenoor 'n hoekpunt word met die ooreenstemmende kleinletter benoem" },
          { num: "Q1c", ans: "Hoek = 72°", note: "Laat hoek = x; komplement = 90−x; x = 4(90−x) → x = 360−4x → 5x = 360 → x = 72°" },
          { num: "Q1d", ans: "x = 35; hoeke is 80° en 100°", note: "(2x+10)+(3x−5)=180 → 5x+5=180 → 5x=175 → x=35; 2(35)+10=80°; 3(35)−5=100°" },
        ]
      },
      {
        name: "Loodregte lyne en hoekkonstruksies",
        answers: [
          { num: "Q2a", ans: "Middelloodlyn gekonstrueer met sigbare boë; M benoem by die middelpunt", note: "Passer gestel op > 3,5 cm; boë getrek vanaf A en B bo en onder; lyn deur snypunte" },
          { num: "Q2b", ans: "AM = 3,5 cm", note: "Helfte van AB = 7 ÷ 2 = 3,5 cm" },
          { num: "Q2c", ans: "60°-hoek gekonstrueer by A; straal AP sigbaar met boë", note: "Boog vanaf A sny AB by P; boog met dieselfde radius vanaf P sny die eerste boog by Q; straal AQ = 60°" },
          { num: "Q2d", ans: "30°-hoek (halveerder AQ van ∠PAB) gekonstrueer met sigbare boë", note: "Halveer die 60°-hoek met passerboë vanaf beide arms; straal deur snypunt = 30°" },
        ]
      },
      {
        name: "Konstruksie van driehoeke",
        answers: [
          { num: "Q3a", ans: "Konstruksie van △ABC (SSS); ∠BAC ≈ 46° (aanvaar ±2°)", note: "Trek AB=8; boog 6 cm vanaf B, boog 5 cm vanaf A; snypunt = C; meet ∠BAC" },
          { num: "Q3b", ans: "Konstruksie van △PQR (SHS); PR ≈ 5,7 cm (aanvaar ±2 mm)", note: "Trek PQ=7; konstrueer 55° by Q; merk R op 4 cm; verbind PR en meet" },
          { num: "Q4a", ans: "HSH (Hoek-Sy-Hoek)", note: "Twee hoeke en die ingeslote sy is gegee" },
          { num: "Q4b", ans: "∠F = 65°", note: "Hoeksom van driehoek: 180° − 40° − 75° = 65°" },
          { num: "Q4c", ans: "Konstruksie van △DEF; EF ≈ 4,6 cm (aanvaar ±2 mm)", note: "Trek DE=6; konstrueer 40° by D en 75° by E; snypunt = F" },
        ]
      },
      {
        name: "Konstruksie van vierhoeke",
        answers: [
          { num: "Q5a", ans: "Konstrueer middelloodlyne (of gebruik driehoek-liniaal/passer) by A en B om 90°-hoeke te skep", note: "'n Loodlyn by elke eindpunt van AB verseker regte hoeke" },
          { num: "Q5b", ans: "Reghoek ABCD gekonstrueer met alle hoekpunte benoem; BC = AD = 3,5 cm; AB = DC = 6 cm", note: "Kontroleer dat al vier hoeke soos 90° lyk" },
          { num: "Q5c", ans: "AC ≈ 6,96 cm (aanvaar ±2 mm)", note: "Volgens Pythagoras: AC = √(6² + 3,5²) = √(36 + 12,25) = √48,25 ≈ 6,95 cm" },
          { num: "Q6a", ans: "Al vier sye = 5 cm", note: "'n Ruit het vier gelyke sye" },
          { num: "Q6b", ans: "Trek PQ = 5 cm; konstrueer 70° by Q; merk R op 5 cm op die straal; trek diagonaal PR; gebruik PR om S te vind met boë van 5 cm vanaf P en R", note: "Driehoek PQR word eers gekonstrueer; S word gevind met boë gelyk aan die sylengte" },
          { num: "Q6c", ans: "Ruit PQRS gekonstrueer met alle hoekpunte benoem en konstruksieboë sigbaar", note: "Alle sye moet 5 cm meet; ∠PQR = 70° en ∠QRS = 110° (mede-binnehoeke)" },
        ]
      },
    ]
  }
});
