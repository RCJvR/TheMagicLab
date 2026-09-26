// Math Magician — Graad 9, Hoofstuk 11 data (Afrikaans)
// Meetkunde van 2D-vorms

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 21,
      chapter: 11,
      name: "Driehoeke en vierhoeke",
      fullName: "Eienskappe van driehoeke en vierhoeke",
      lesson: {
        heading: "Driehoeke en vierhoeke",
        sub: "Hoofstuk 11 · Onderwerp 1",
        body: `
          <p>Om die eienskappe van 2D-vorms te verstaan, stel ons in staat om onbekende hoeke en sye te bereken.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Driehoekeienskappe</div>
            <p>
              <strong>Hoeksom:</strong> hoeke in 'n driehoek = 180°<br>
              <strong>Gelyksydig:</strong> 3 gelyke sye, 3 hoeke van 60°<br>
              <strong>Gelykbenig:</strong> 2 gelyke sye; hoeke teenoor die gelyke sye is gelyk<br>
              <strong>Ongelyksydig:</strong> geen gelyke sye of hoeke nie<br>
              <strong>Reghoekig:</strong> een hoek = 90°<br>
              <strong>Buitehoek:</strong> = som van die twee nie-aangrensende binnehoeke
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Vierhoek-hiërargie</div>
            <p>
              <strong>Parallelogram:</strong> 2 pare ewewydige sye; oorstaande sye gelyk; oorstaande hoeke gelyk; diagonale halveer mekaar.<br>
              <strong>Reghoek:</strong> parallelogram + alle hoeke 90°; diagonale gelyk.<br>
              <strong>Ruit:</strong> parallelogram + alle sye gelyk; diagonale halveer mekaar by 90°.<br>
              <strong>Vierkant:</strong> reghoek + ruit (alle sye gelyk, alle hoeke 90°).<br>
              <strong>Trapesium:</strong> presies een paar ewewydige sye.<br>
              <strong>Vlieër:</strong> twee pare aangrensende gelyke sye; een diagonaal halveer die ander by 90°.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In enige driehoek is die buitehoek gelyk aan die som van die twee nie-aangrensende binnehoeke.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Driehoek- en Vierhoekhoek-oplosser</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer bekende hoeke in. Die onbekende hoek word met hoeksomreëls bereken.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Vorm</label>
                <select id="shapeType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="tri">Driehoek (som = 180°)</option>
                  <option value="quad">Vierhoek (som = 360°)</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;1 (°)</label><input id="ang1" type="number" value="65" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;2 (°)</label><input id="ang2" type="number" value="75" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div id="ang3div" style="display:none;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">&ang;3 (°)</label><input id="ang3" type="number" value="110" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="angBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Vind onbekende</button>
            </div>
            <div id="angOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function setShape(){
              var isQ=document.getElementById('shapeType').value==='quad';
              document.getElementById('ang3div').style.display=isQ?'flex':'none';
            }
            document.getElementById('shapeType').addEventListener('change',function(){setShape();solve();});
            function solve(){
              var isQ=document.getElementById('shapeType').value==='quad';
              var total=isQ?360:180;
              var a1=parseFloat(document.getElementById('ang1').value)||0;
              var a2=parseFloat(document.getElementById('ang2').value)||0;
              var a3=isQ?(parseFloat(document.getElementById('ang3').value)||0):0;
              var known=a1+a2+a3,unknown=total-known;
              var out=document.getElementById('angOut');
              if(unknown<=0){out.innerHTML='<span style="color:#fca5a5;">Bekende hoeke is reeds gelyk aan of oorskry '+total+'°. Gaan waardes na.</span>';return;}
              out.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Hoeksomreël: </span><span style="color:#a5b4fc;">'+total+'°</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Som van bekende hoeke: </span><span style="color:#fbbf24;">'+a1+'° + '+a2+'°'+(isQ?' + '+a3+'°':'')+' = '+known+'°</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Onbekende hoek x: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+unknown+'°</span></div>',
                '<div style="font-size:10px;color:rgba(221,225,240,0.35);margin-top:2px;">'+total+'° - '+known+'° = '+unknown+'°</div>',
              ].join('');
            }
            document.getElementById('angBtn').addEventListener('click',solve);
            setShape();solve();
          })();
          </script>
        Elke vierkant is 'n reghoek EN 'n ruit. Maar nie elke reghoek is 'n vierkant nie.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Twee hoeke van 'n driehoek is 47° en 83°. Die derde hoek is:", options: ["50°", "40°", "60°", "130°"], answer: 0, topic: "2D-vorms" },
        { type: "mc", text: "In 'n gelykbenige driehoek is die basishoeke elk 55°. Die apekshoek is:", options: ["55°", "70°", "110°", "90°"], answer: 1, topic: "2D-vorms" },
        { type: "mc", text: "Watter vierhoek het diagonale wat mekaar by 90° halveer?", options: ["Reghoek", "Trapesium", "Ruit", "Vlieër"], answer: 2, topic: "2D-vorms" },
        { type: "input", text: "Die buitehoek van 'n driehoek is 115°. Een nie-aangrensende binnehoek is 60°. Vind die ander nie-aangrensende binnehoek.", answer: "55", topic: "2D-vorms" },
        { type: "mc", text: "Watter stelling oor 'n parallelogram is ONWAAR?", options: ["Oorstaande sye is gelyk", "Oorstaande hoeke is gelyk", "Alle hoeke is 90°", "Diagonale halveer mekaar"], answer: 2, topic: "2D-vorms" },
        { type: "input", text: "In driehoek PQR is hoek P = (3x + 5)°, hoek Q = 2x°, en hoek R = (4x - 5)°. Vind x.", answer: "20", topic: "2D-vorms" },
        { type: "input", text: "Die hoeke van 'n vierhoek is in die verhouding 2 : 3 : 4 : 6. Bereken die grootte van die grootste hoek (in grade).", answer: "144", topic: "2D-vorms" },
      ]
    },
    {
      id: 22,
      chapter: 11,
      name: "Gelykvormige en kongruente vorms",
      fullName: "Gelykvormigheid en kongruensie van driehoeke",
      lesson: {
        heading: "Gelykvormige en kongruente driehoeke",
        sub: "Hoofstuk 11 · Onderwerp 2",
        body: `
          <p><strong>Kongruente</strong> vorms is identies (dieselfde vorm ÉN grootte). <strong>Gelykvormige</strong> vorms het dieselfde vorm maar verskillende groottes.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Kongruensievoorwaardes (driehoeke)</div>
            <p>
              <strong>SSS:</strong> drie sye gelyk<br>
              <strong>SHS:</strong> twee sye en die ingeslote hoek gelyk<br>
              <strong>HHS/HSH:</strong> twee hoeke en 'n ooreenstemmende sy gelyk<br>
              <strong>RSS:</strong> regte hoek, skuinssy en een sy gelyk
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Gelykvormigheid</div>
            <p>
              Driehoeke is gelykvormig as:<br>
              • Al drie pare hoeke gelyk is (HH is voldoende), OF<br>
              • Al die sye in dieselfde verhouding is (SSS-gelykvormigheid)<br><br>
              <strong>Skaalfaktor k:</strong> as sye van △ABC k keer die sye van △DEF is, dan is die oppervlaktes in die verhouding k²
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>By gelykvormigheidsprobleme, pas altyd ooreenstemmende hoekpunte in dieselfde volgorde by. △ABC ||| △DEF beteken A→D, B→E, C→F.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Gelykvormige Driehoeke-sakrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer die sye van △ABC en △DEF in (in ooreenstemmende volgorde). Laat een sy van △DEF oop om dit te vind.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stA" id="g9stAL">AB</label><input id="g9stA" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stB" id="g9stBL">BC</label><input id="g9stB" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stC" id="g9stCL">AC</label><input id="g9stC" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stD" id="g9stDL">DE</label><input id="g9stD" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stE" id="g9stEL">EF</label><input id="g9stE" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9stF" id="g9stFL">DF</label><input id="g9stF" type="number" value="" placeholder="?" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div id="g9stOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function similarTriangles(T) {
  var $ = function (id) { return document.getElementById(id); };
  var ids = ['g9stA', 'g9stB', 'g9stC', 'g9stD', 'g9stE', 'g9stF'];
  function v(id) { var s = $(id).value.replace(',', '.').trim(); return s === '' ? null : parseFloat(s); }
  function f(x) { return String(Math.round(x * 1000) / 1000).replace('.', ','); }
  function run() {
    var s = ids.map(v), out = $('g9stOut');
    if (s.slice(0, 3).some(function (x) { return x === null || isNaN(x) || x <= 0; })) { out.innerHTML = '<span style="color:#fca5a5;">' + T.needABC + '</span>'; return; }
    var blanks = s.slice(3).filter(function (x) { return x === null; }).length;
    if (blanks > 1 || s.slice(3).some(function (x) { return x !== null && (isNaN(x) || x <= 0); })) { out.innerHTML = '<span style="color:#fca5a5;">' + T.needDEF + '</span>'; return; }
    var names = ['DE/AB', 'EF/BC', 'DF/AC'], ratios = [];
    for (var i = 0; i < 3; i++) if (s[i + 3] !== null) ratios.push([names[i], s[i + 3] / s[i]]);
    var k = ratios[0][1], same = ratios.every(function (r) { return Math.abs(r[1] - k) < 1e-6 * Math.max(1, k); });
    var h = '<div>' + ratios.map(function (r) { return r[0] + ' = ' + f(r[1]); }).join(' &nbsp; ') + '</div>';
    if (!same) { out.innerHTML = h + '<div style="color:#fca5a5;">✗ ' + T.notSim + '</div>'; return; }
    if (blanks === 1) {
      var j = s.slice(3).indexOf(null), side = ['DE', 'EF', 'DF'][j], orig = ['AB', 'BC', 'AC'][j];
      h += '<div style="color:#fbbf24;">' + side + ' = k × ' + orig + ' = ' + f(k) + ' × ' + f(s[j]) + ' = <b>' + f(k * s[j]) + '</b></div>';
    }
    h += '<div style="color:#6ee7b7;">✓ ' + (Math.abs(k - 1) < 1e-9 ? T.cong : T.sim) + '</div>' +
      '<div>' + T.scale + ' k = ' + f(k) + ' &nbsp; | &nbsp; ' + T.area + ' = k² = ' + f(k * k) + '</div>';
    out.innerHTML = h;
  }
  ids.forEach(function (id) { $(id).addEventListener('input', run); });
  run();
})({"tryit":"Probeer dit","needABC":"Voer al drie sye van △ABC in.","needDEF":"Voer die sye van △DEF in — hoogstens een mag oop wees.","notSim":"Die verhoudings verskil, dus is die driehoeke NIE gelykvormig nie.","sim":"Gelykvormig (sye in verhouding: SSS-gelykvormigheid).","cong":"Kongruent (k = 1: alle sye gelyk, SSS).","scale":"Skaalfaktor","area":"oppervlakteverhouding"});
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Twee driehoeke het hoeke 40°, 70°, 70° en 40°, 70°, 70°. Hulle is:", options: ["Kongruent", "Gelykvormig (nie noodwendig kongruent nie)", "Nie een van beide nie", "Beide kongruent en gelykvormig"], answer: 1, topic: "2D-vorms" },
        { type: "mc", text: "Watter een is NIE 'n kongruensievoorwaarde vir driehoeke nie?", options: ["SSS", "HHS", "HHH", "RSS"], answer: 2, topic: "2D-vorms" },
        { type: "input", text: "Twee gelykvormige driehoeke het 'n skaalfaktor van 3. As die kleiner driehoek 'n oppervlakte van 8 cm² het, wat is die oppervlakte van die groter driehoek?", answer: "72", topic: "2D-vorms" },
        { type: "mc", text: "△ABC ||| △DEF met AB = 4, DE = 6 en BC = 5. Vind EF.", options: ["7,5", "3,33", "7", "10"], answer: 0, topic: "2D-vorms" },
        { type: "mc", text: "Die SHS-kongruensievoorwaarde vereis:", options: ["Slegs twee sye gelyk", "Twee hoeke en 'n sy gelyk", "Twee sye ÉN die INGESLOTE hoek gelyk", "Twee sye en enige hoek gelyk"], answer: 2, topic: "2D-vorms" },
        { type: "input", text: "Twee gelykvormige driehoeke het oppervlaktes 18 cm² en 50 cm². As die omtrek van die kleiner driehoek 24 cm is, vind die omtrek van die groter driehoek (in cm).", answer: "40", topic: "2D-vorms" },
        { type: "input", text: "Driehoek ABC is gelykvormig aan driehoek DEF, met driehoek DEF die groter een. Die verhouding van hulle oppervlaktes is 4 : 9. As die kortste sy van driehoek ABC 6 cm is, vind die lengte van die ooreenstemmende kortste sy van driehoek DEF (in cm).", answer: "9", topic: "2D-vorms" },
      ]
    },
  ],
  workbook: {
    chapter: 11, chapterName: "Meetkunde van 2D-vorms",
    topics: [
      {
        name: "Driehoeke en Vierhoeke",
        questions: [
          {
            num: "1",
            text: "In driehoek ABC: hoek A = (2x + 10)°, hoek B = (3x - 5)° en hoek C = (x + 15)°.",
            parts: [
              { label: "a)", text: "Vind x.", marks: 3 },
              { label: "b)", text: "Vind elke hoek.", marks: 3 },
              { label: "c)", text: "Klassifiseer die driehoek (skerp, stomp of reghoekig).", marks: 2 },
            ]
          },
          {
            num: "2",
            text: "ABCD is 'n parallelogram. Hoek A = (4y - 10)° en hoek B = (2y + 30)°.",
            parts: [
              { label: "a)", text: "Vind y. (Gebruik die mede-binnehoek-eienskap: A + B = 180°)", marks: 3 },
              { label: "b)", text: "Vind al vier hoeke van die parallelogram.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Gelykvormigheid en Kongruensie",
        questions: [
          {
            num: "3",
            text: "Twee gelykvormige driehoeke het ooreenstemmende sye in die verhouding 2 : 5.",
            parts: [
              { label: "a)", text: "As die kleiner driehoek 'n omtrek van 18 cm het, vind die omtrek van die groter driehoek.", marks: 2 },
              { label: "b)", text: "As die groter driehoek 'n oppervlakte van 100 cm² het, vind die oppervlakte van die kleiner driehoek.", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 11, chapterName: "Hoofstuk 11 — Meetkunde van 2D-vorms",
    topics: [
      {
        name: "Driehoeke en Vierhoeke",
        answers: [
          { num: "Q1a", ans: "x = 27", note: "(2x+10)+(3x-5)+(x+15)=180 → 6x+20=180 → x=27" },
          { num: "Q1b", ans: "A=64°, B=76°, C=57°", note: "Vervang x=27 in elk" },
          { num: "Q1c", ans: "Skerphoekige driehoek", note: "Alle hoeke kleiner as 90°" },
          { num: "Q2a", ans: "y = 26,67 — aanvaar y = 80/3", note: "(4y-10)+(2y+30)=180 → 6y+20=180 → y=160/6=26,7" },
          { num: "Q2b", ans: "A = C ≈ 96,7°; B = D ≈ 83,3°", note: "Oorstaande hoeke van 'n parallelogram gelyk; mede-binnehoeke vul mekaar aan" },
        ]
      },
      {
        name: "Gelykvormigheid en Kongruensie",
        answers: [
          { num: "Q3a", ans: "45 cm", note: "18 × 5/2 = 45" },
          { num: "Q3b", ans: "16 cm²", note: "Oppervlakteverhouding = (2/5)² = 4/25; kleiner = 100 × 4/25 = 16 cm²" },
        ]
      },
    ]
  }
});
