// Math Magician — Graad 9, Hoofstuk 12 data (Afrikaans)
// Meetkunde van Reguit Lyne

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 23,
      chapter: 12,
      name: "Hoekverhoudings",
      fullName: "Hoekverhoudings by reguit lyne",
      lesson: {
        heading: "Hoekverhoudings by reguit lyne",
        sub: "Hoofstuk 12 · Onderwerp 1",
        body: `
          <p>Verskeie belangrike hoekverhoudings ontstaan wanneer lyne mekaar sny, of wanneer ewewydige lyne deur 'n transversaal gesny word.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Basiese hoekverhoudings</div>
            <p>
              <strong>Hoeke op 'n reguit lyn:</strong> som = 180° (supplementêr)<br>
              <strong>Hoeke rondom 'n punt:</strong> som = 360°<br>
              <strong>Regoorstaande hoeke:</strong> gelyk (gevorm deur snydende lyne)<br>
              <strong>Komplementêre hoeke:</strong> som = 90°<br>
              <strong>Supplementêre hoeke:</strong> som = 180°
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Ewewydige lyne gesny deur 'n transversaal</div>
            <p>
              <strong>Ooreenkomstige hoeke (F-hoeke):</strong> gelyk<br>
              <strong>Verwisselende binnehoeke (Z-hoeke):</strong> gelyk<br>
              <strong>Mede-binnehoeke (C-hoeke):</strong> supplementêr (tel op tot 180°)<br><br>
              <em>Hierdie verhoudings werk ook in OMGEKEERDE rigting: as enige paar aan die voorwaarde voldoen, is die lyne ewewydig.</em>
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Gee altyd 'n rede by elke hoekberekening. "Regoorst. ∠e", "Verw. binnehoeke, AB ∥ CD", "Mede-binnehoeke, PQ ∥ RS" —
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Hoekverhouding-oplosser</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer bekende hoeke in, kies 'n verhouding, en vind die onbekende met 'n rede.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Verhouding</label>
                <select id="ang4Rel" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="supp">Supplementêr (180°)</option>
                  <option value="comp">Komplementêr (90°)</option>
                  <option value="rev">Omwenteling (360°)</option>
                  <option value="vert">Regoorstaande (gelyk)</option>
                  <option value="coInt">Mede-binne (180°)</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Bekende hoek(e) (kommageskei)</label>
                <input id="ang4Known" type="text" value="72" style="min-width:140px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;">
              </div>
              <button id="ang4Solve" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="ang4Out" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var reasons={supp:'Hoeke op \'n reguit lyn',comp:'Komplementêre hoeke',rev:'Hoeke rondom \'n punt',vert:'Regoorst. ∠e (gelyk)',coInt:'Mede-binne ∠e, lyne ∥'};
            var totals={supp:180,comp:90,rev:360,vert:null,coInt:180};
            function solve(){
              var rel=document.getElementById('ang4Rel').value;
              var vals=document.getElementById('ang4Known').value.split(',').map(function(s){return parseFloat(s.trim());}).filter(function(n){return !isNaN(n);});
              var el=document.getElementById('ang4Out');
              if(!vals.length){el.innerHTML='<span style="color:#fca5a5;">Voer ten minste een hoek in.</span>';return;}
              var lines=['<div><span style="color:rgba(221,225,240,0.45);">Rede: </span><span style="color:#fbbf24;">'+reasons[rel]+'</span></div>'];
              if(rel==='vert'){lines.push('<div><span style="color:rgba(221,225,240,0.45);">Onbekend: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+vals[0]+'°</span></div>');}
              else{var sum=vals.reduce(function(a,b){return a+b;},0);var unknown=totals[rel]-sum;lines.push('<div><span style="color:rgba(221,225,240,0.45);">Som van bekendes: </span><span style="color:#a5b4fc;">'+sum+'°</span></div>');lines.push('<div><span style="color:rgba(221,225,240,0.45);">Onbekend: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+unknown+'°</span></div>');}
              el.innerHTML=lines.join('');
            }
            document.getElementById('ang4Solve').addEventListener('click',solve);
            document.getElementById('ang4Known').addEventListener('keydown',function(e){if(e.key==='Enter')solve();});
            solve();
          })();
          </script>
        redes verdien punte.</span></div>
        `
      },
      questions: [
        { type: "input", text: "'n Hoek is 37°. Vind sy supplementêre hoek.", answer: "143", topic: "Lyne" },
        { type: "mc", text: "Regoorstaande hoeke is:", options: ["Supplementêr", "Komplementêr", "Gelyk", "Aangrensend"], answer: 2, topic: "Lyne" },
        { type: "input", text: "Twee ewewydige lyne word deur 'n transversaal gesny. Een mede-binnehoek is 65°. Vind die ander.", answer: "115", topic: "Lyne" },
        { type: "mc", text: "Watter hoekpaar is gelyk wanneer dit deur ewewydige lyne en 'n transversaal gevorm word?", options: ["Mede-binne", "Ooreenkomstig", "Supplementêr", "Aangrensend"], answer: 1, topic: "Lyne" },
        { type: "mc", text: "Hoeke van 3x° en (x + 40)° is regoorstaande hoeke. Vind x.", options: ["20", "10", "15", "35"], answer: 0, topic: "Lyne" },
        { type: "input", text: "Twee hoeke op 'n reguit lyn is in die verhouding 5 : 7. Bereken die grootte van die kleiner hoek (in grade).", answer: "75", topic: "Lyne" },
        { type: "input", text: "Vier hoeke rondom 'n punt is (2x)°, (3x)°, (4x)° en 90°. Vind x.", answer: "30", topic: "Lyne" },
      ]
    },
    {
      id: 24,
      chapter: 12,
      name: "Bewys van ewewydige lyne",
      fullName: "Bewys dat lyne ewewydig is en probleemoplossing",
      lesson: {
        heading: "Bewys dat lyne ewewydig is",
        sub: "Hoofstuk 12 · Onderwerp 2",
        body: `
          <p>Ons kan bewys dat lyne ewewydig is deur te wys dat spesifieke hoekpare aan die vereiste voorwaardes voldoen.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Voorwaardes om AB ∥ CD te bewys</div>
            <p>
              As 'n transversaal twee lyne sny en:<br>
              • <strong>Ooreenkomstige hoeke is gelyk</strong> → lyne is ewewydig<br>
              • <strong>Verwisselende binnehoeke is gelyk</strong> → lyne is ewewydig<br>
              • <strong>Mede-binnehoeke is supplementêr</strong> → lyne is ewewydig
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Meerstap-voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>In 'n diagram: ∠1 = 70°, ∠2 = 110° (mede-binne). Tel dit op tot 180°? 70 + 110 = 180 → Ja, lyne is ewewydig.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Vind onbekende hoek: x = 180° - 55° = 125° (mede-binnehoeke, gegewe lyne ewewydig)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Los op vir veranderlike: (3x + 10)° en (x + 50)° is verwisselende hoeke → 3x + 10 = x + 50 → x = 20</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Noem watter lyne ewewydig is en gee die volledige rede in elke stap — bv. "∠3 = ∠5 (verw. binnehoeke; AB ∥ CD)".</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Ewewydige-lyne Hoekverkenner</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Sleep die skuifknoppie om die transversaalhoek te verander. Al 8 hoeke word regstreeks bygewerk met hulle verhoudings.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
              <input id="parAng" type="range" min="10" max="170" value="65" style="flex:1;min-width:140px;accent-color:#6366f1;">
              <input id="parAngNum" type="number" value="65" min="10" max="170" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;">°</span>
            </div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
              <svg id="parSvg" viewBox="0 0 240 220" style="width:240px;max-width:100%;flex-shrink:0;border-radius:10px;background:rgba(10,15,30,0.60);"></svg>
              <div id="parOut" style="font-family:JetBrains Mono,monospace;font-size:11.5px;line-height:2.1;flex:1;min-width:160px;"></div>
            </div>
          </div>
          <script>
          (function(){
            function update(){
              var deg=parseFloat(document.getElementById('parAng').value)||65;
              document.getElementById('parAngNum').value=deg;
              var sup=180-deg;
              var svg=document.getElementById('parSvg');
              var y1=80,y2=155,lx=20,rx=220,ttx=110,ttop=15,tbot=215;
              var topX=ttx-(y1-ttop)*Math.tan((deg-90)*Math.PI/180);
              var botX=ttx+(tbot-y1)*Math.tan((deg-90)*Math.PI/180);
              var p1x=ttx;
              var p2x=ttx+(y2-y1)*Math.tan((deg-90)*Math.PI/180);
              var html='<line x1="'+lx+'" y1="'+y1+'" x2="'+rx+'" y2="'+y1+'" stroke="#6366f1" stroke-width="2" opacity="0.7"/>';
              html+='<line x1="'+lx+'" y1="'+y2+'" x2="'+rx+'" y2="'+y2+'" stroke="#6366f1" stroke-width="2" opacity="0.7"/>';
              html+='<line x1="'+topX.toFixed(1)+'" y1="'+ttop+'" x2="'+botX.toFixed(1)+'" y2="'+tbot+'" stroke="rgba(245,158,11,0.85)" stroke-width="2"/>';
              var off=24;
              html+='<text x="'+(p1x+off)+'" y="'+(y1-8)+'" font-size="9.5" fill="#fbbf24" font-family="JetBrains Mono,monospace">'+deg+'°</text>';
              html+='<text x="'+(p1x-off-20)+'" y="'+(y1-8)+'" font-size="9.5" fill="#a5b4fc" font-family="JetBrains Mono,monospace">'+sup+'°</text>';
              html+='<text x="'+(p1x+off)+'" y="'+(y1+17)+'" font-size="9.5" fill="#a5b4fc" font-family="JetBrains Mono,monospace">'+sup+'°</text>';
              html+='<text x="'+(p1x-off-20)+'" y="'+(y1+17)+'" font-size="9.5" fill="#fbbf24" font-family="JetBrains Mono,monospace">'+deg+'°</text>';
              html+='<text x="'+(p2x+off)+'" y="'+(y2-8)+'" font-size="9.5" fill="#6ee7b7" font-family="JetBrains Mono,monospace">'+deg+'°</text>';
              html+='<text x="'+(p2x-off-20)+'" y="'+(y2-8)+'" font-size="9.5" fill="#fca5a5" font-family="JetBrains Mono,monospace">'+sup+'°</text>';
              html+='<text x="'+(p2x+off)+'" y="'+(y2+17)+'" font-size="9.5" fill="#fca5a5" font-family="JetBrains Mono,monospace">'+sup+'°</text>';
              html+='<text x="'+(p2x-off-20)+'" y="'+(y2+17)+'" font-size="9.5" fill="#6ee7b7" font-family="JetBrains Mono,monospace">'+deg+'°</text>';
              svg.innerHTML=html;
              document.getElementById('parOut').innerHTML=[
                '<div><span style="color:#fbbf24;">•</span> Skerp hoeke: <span style="color:#fbbf24;font-weight:700;">'+deg+'°</span></div>',
                '<div><span style="color:#a5b4fc;">•</span> Stomp hoeke: <span style="color:#a5b4fc;font-weight:700;">'+sup+'°</span></div>',
                '<div style="margin-top:6px;font-size:10.5px;color:rgba(221,225,240,0.60);">Ooreenkomstig (F): <strong>gelyk</strong></div>',
                '<div style="font-size:10.5px;color:rgba(221,225,240,0.60);">Verw. binne (Z): <strong>gelyk</strong></div>',
                '<div style="font-size:10.5px;color:rgba(221,225,240,0.60);">Mede-binne (C): '+deg+'°+'+sup+'° = <strong>180°</strong></div>',
                '<div style="font-size:10.5px;color:rgba(221,225,240,0.60);">Regoorstaande: <strong>gelyk</strong></div>',
              ].join('');
            }
            document.getElementById('parAng').addEventListener('input',update);
            document.getElementById('parAngNum').addEventListener('input',function(){document.getElementById('parAng').value=this.value;update();});
            update();
          })();
          </script>
        "Ooreenkomstige hoeke, PQ ∥ RS" is 'n volledige rede; net "ooreenkomstige hoeke" is onvolledig.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "As verwisselende binnehoeke gelyk is wanneer twee lyne deur 'n transversaal gesny word, is die lyne:", options: ["Loodreg", "Ewewydig", "Gelyke lengte", "Skeef"], answer: 1, topic: "Lyne" },
        { type: "input", text: "Twee verwisselende hoeke is (4x - 10)° en (2x + 30)°. Vind x.", answer: "20", topic: "Lyne" },
        { type: "mc", text: "Mede-binnehoeke tel op tot 180°. Dit is 'n rede om af te lei dat:", options: ["Hoeke is gelyk", "Lyne is loodreg", "Lyne is ewewydig", "Hoeke is komplementêr"], answer: 2, topic: "Lyne" },
        { type: "input", text: "Ooreenkomstige hoeke is (5x + 15)° en (3x + 45)°. Vind x.", answer: "15", topic: "Lyne" },
        { type: "mc", text: "Watter VOLLEDIGE rede sou jy gebruik vir verwisselende binnehoeke?", options: ["Verw. hoeke", "Verw. binnehoeke, AB ∥ CD", "Gelyke hoeke", "Z-patroon"], answer: 1, topic: "Lyne" },
        { type: "input", text: "Twee mede-binnehoeke is (2x + 10)° en (3x - 30)°. Vind x.", answer: "40", topic: "Lyne" },
        { type: "input", text: "Twee lyne word deur 'n transversaal gesny sodat een paar mede-binnehoeke 118° en 62° is (wat bevestig dat die twee lyne ewewydig is). 'n Derde lyn, ewewydig aan die eerste, vorm 'n ooreenkomstige hoek van (2x + 10)° met die transversaal (ooreenstemmend met die 118°-hoek). Vind x.", answer: "54", topic: "Lyne" },
      ]
    },
  ],
  workbook: {
    chapter: 12, chapterName: "Meetkunde van Reguit Lyne",
    topics: [
      {
        name: "Hoekverhoudings",
        questions: [
          {
            num: "1",
            text: "Bereken die waarde van elke onbekende hoek, en gee 'n rede vir elke stap:",
            parts: [
              { label: "a)", text: "Drie hoeke op 'n reguit lyn is (2x)°, (x + 10)° en 40°. Vind x en al die hoeke.", marks: 4 },
              { label: "b)", text: "Hoeke rondom 'n punt sluit (3y)°, (2y + 20)°, (y + 40)° en 80° in. Vind y.", marks: 4 },
              { label: "c)", text: "Twee snydende lyne vorm hoeke (4a - 5)° en (2a + 35)°. As hulle regoorstaande hoeke is, vind a en albei hoeke.", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Ewewydige Lyne",
        questions: [
          {
            num: "2",
            text: "AB ∥ CD en EF is 'n transversaal. Hoek AEF = (3x + 20)° en hoek CFE = (x + 60)°.",
            parts: [
              { label: "a)", text: "Verduidelik waarom AEF en CFE verwisselende binnehoeke is.", marks: 2 },
              { label: "b)", text: "Vind x en albei hoeke.", marks: 3 },
              { label: "c)", text: "Vind die mede-binnehoek by AEF aan dieselfde kant van die transversaal.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 12, chapterName: "Hoofstuk 12 — Meetkunde van Reguit Lyne",
    topics: [
      {
        name: "Hoekverhoudings",
        answers: [
          { num: "Q1a", ans: "x = 43,3°; hoeke: 86,7°, 53,3°, 40° — aanvaar x = 130/3", note: "2x+x+10+40=180 → 3x=130 → x=43,3" },
          { num: "Q1b", ans: "y = 110/3 ≈ 36,67°", note: "3y+2y+20+y+40+80=360; 6y+140=360; 6y=220; y=110/3≈36,67", /* was: "y = 36�", note: "3y+2y+20+y+40+80=360 ? 6y+140=360 ? 6y=220 ? y=36,7. JUNK_REMOVED_CH12 */},
          { num: "Q1c", ans: "a = 20; albei hoeke = 75°", note: "4a-5=2a+35 → 2a=40 → a=20; hoek = 4(20)-5=75°" },
        ]
      },
      {
        name: "Ewewydige Lyne",
        answers: [
          { num: "Q2a", ans: "Hulle is aan teenoorgestelde kante van die transversaal tussen die ewewydige lyne, en vorm 'n Z-vorm.", note: "Verwisselende binnehoeke lê tussen die ewewydige lyne aan teenoorgestelde kante van die transversaal" },
          { num: "Q2b", ans: "x = 20; albei hoeke = 80°", note: "3x+20 = x+60 → 2x=40 → x=20; hoek = 80°" },
          { num: "Q2c", ans: "100°", note: "Mede-binnehoeke tel op tot 180°; 180°-80°=100°" },
        ]
      },
    ]
  }
});
