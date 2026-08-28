// Math Magician — Graad 12, Hoofstuk 7
// Analitiese Meetkunde — Sirkels en Raaklyne

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 700,
      chapter: 7,
      name: "Vergelyking van 'n sirkel",
      fullName: "Standaard- en algemene vorm van 'n sirkel, middelpunt en radius",
      lesson: {
        heading: "Vergelyking van 'n sirkel",
        sub: "Hoofstuk 7 · Onderwerp 1",
        body: `
          <p>Graad 12-analitiese meetkunde stel die <strong>sirkel</strong> bekend as 'n kurwe gedefinieer deur 'n vergelyking, en die raaklyn aan 'n sirkel by 'n gegewe punt.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Standaardvorm (middelpunt by die oorsprong)</div>
            <p>
              <span class="math">x² + y² = r²</span><br>
              Middelpunt: (0, 0), radius r
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Standaardvorm (middelpunt by (a, b))</div>
            <p>
              <span class="math">(x − a)² + (y − b)² = r²</span><br>
              Middelpunt: (a, b), radius r<br><br>
              Om die middelpunt en radius uit 'n punt op die sirkel te vind, gebruik die afstandsformule:<br>
              <span class="math">r = √[(x−a)² + (y−b)²]</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Algemene vorm → Standaardvorm (voltooiing van die vierkant)</div>
            <p>
              <span class="math">x² + y² + Dx + Ey + F = 0</span><br>
              Voltooi die vierkant vir x en y afsonderlik:<br>
              <span class="math">x² + Dx = (x + D/2)² − (D/2)²</span><br><br>
              Voorbeeld: x² + y² − 6x + 4y − 3 = 0<br>
              → (x−3)² − 9 + (y+2)² − 4 − 3 = 0<br>
              → (x−3)² + (y+2)² = 16<br>
              Middelpunt: (3, −2), radius: 4
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Sirkelvergelyking-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer x²+y²+Dx+Ey+F=0 in — voltooi die vierkant om middelpunt, radius, en 'n punt te kontroleer.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">D (koëff. x)</div><input id="g12c7D" type="number" value="-6" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">E (koëff. y)</div><input id="g12c7E" type="number" value="4" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">F (konst.)</div><input id="g12c7F" type="number" value="-3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Toetspunt x</div><input id="g12c7px" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Toetspunt y</div><input id="g12c7py" type="number" value="-1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c7Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed</button>
            </div>
            <div id="g12c7Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const D=gv('g12c7D'),E=gv('g12c7E'),F=gv('g12c7F'),px=gv('g12c7px'),py=gv('g12c7py');
                const out=document.getElementById('g12c7Out');
                if([D,E,F].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer D, E, F in.</span>';return;}
                const a=-D/2,b=-E/2;
                const r2=a*a+b*b-F;
                if(r2<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Nie 'n geldige sirkel nie (r² = "+f4(r2)+" ≤ 0).</span>";return;}
                const r=Math.sqrt(r2);
                let html='<span style="color:rgba(221,225,240,0.50);">x²+y²+('+D+')x+('+E+')y+('+F+') = 0</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">(x+('+D+'/2))²−'+(D/2)*(D/2)+' + (y+('+E+'/2))²−'+(E/2)*(E/2)+' + '+F+' = 0</span><br>';
                html+='<span style="color:#fcd34d;">(x−'+f4(a)+')² + (y−'+f4(b)+')² = '+f4(r2)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Middelpunt: ('+f4(a)+'; '+f4(b)+')   Radius: '+f4(r)+'</span>';
                if(!isNaN(px)&&!isNaN(py)){
                  const dist2=(px-a)*(px-a)+(py-b)*(py-b);
                  const pos=dist2<r2-1e-9?'BINNE':dist2>r2+1e-9?'BUITE':'OP';
                  html+='<br><span style="color:rgba(221,225,240,0.50);">Punt ('+px+';'+py+'): afst² = '+f4(dist2)+', r² = '+f4(r2)+'</span>';
                  html+='<br><span style="color:'+(pos==='OP'?'#6ee7b7':pos==='BINNE'?'#fcd34d':'rgba(221,225,240,0.60)')+';">Punt is '+pos+' die sirkel</span>';
                }
                out.innerHTML=html;
              }
              ['g12c7D','g12c7E','g12c7F','g12c7px','g12c7py'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c7Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Sirkel: (x − 2)² + (y + 3)² = 25. Middelpunt en radius:", options: ["(2, −3), r=5", "(−2, 3), r=5", "(2, −3), r=25", "(2, 3), r=5"], answer: 0, topic: "Vergelyking van 'n sirkel" },
        { type: "mc", text: "x² + y² = 49. Lê punt (3, 6) op, binne, of buite die sirkel?", options: ["Op", "Binne", "Buite", "Kan nie bepaal word nie"], answer: 1, topic: "Vergelyking van 'n sirkel" },
        { type: "input", text: "Skryf die vergelyking van 'n sirkel met middelpunt (−1, 4) en radius 3.", answer: "(x+1)²+(y-4)²=9", altAnswers: ["(x+1)² + (y-4)² = 9"], topic: "Vergelyking van 'n sirkel" },
        { type: "mc", text: "x² + y² − 4x + 6y − 12 = 0 in standaardvorm:", options: ["(x−2)²+(y+3)²=25", "(x+2)²+(y−3)²=25", "(x−2)²+(y+3)²=16", "(x−4)²+(y+6)²=12"], answer: 0, topic: "Vergelyking van 'n sirkel" },
        { type: "mc", text: "'n Sirkel het middelpunt (0, 0) en gaan deur (5, 12). Sy radius is:", options: ["17", "13", "7", "√17"], answer: 1, topic: "Vergelyking van 'n sirkel" },
        { type: "input", text: "'n Sirkel gaan deur A(1; 2) en B(1; −4), en sy middelpunt lê op die lyn y = x − 2. Bepaal die middelpunt van die sirkel. Gee slegs die x-koördinaat.", answer: "1", topic: "Vergelyking van 'n sirkel" }
      ]
    },
    {
      id: 701,
      chapter: 7,
      name: "Raaklyn aan 'n sirkel",
      fullName: "Vergelyking van 'n raaklyn aan 'n sirkel by 'n gegewe punt",
      lesson: {
        heading: "Raaklyn aan 'n sirkel",
        sub: "Hoofstuk 7 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Sleuteleienskap: raaklyn ⊥ radius</div>
            <p>
              Die raaklyn aan 'n sirkel by punt P is <strong>loodreg op die radius</strong> by P.<br><br>
              Metode om die raaklyn by P(x₁, y₁) op 'n sirkel met middelpunt C(a, b) te vind:<br>
              1. Bepaal die gradiënt van radius CP: <span class="math">m_r = (y₁ − b)/(x₁ − a)</span><br>
              2. Gradiënt van die raaklyn: <span class="math">m_t = −1/m_r</span><br>
              3. Vergelyking van die raaklyn: <span class="math">y − y₁ = m_t(x − x₁)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>Sirkel: (x − 1)² + (y − 2)² = 25. Raaklyn by P(4, 6).<br>
            m_radius = (6−2)/(4−1) = 4/3<br>
            m_raaklyn = −3/4<br>
            Raaklyn: y − 6 = −¾(x − 4)<br>
            y = −¾x + 9</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Raaklyn vanaf 'n buitepunt</div>
            <p>
              Vanaf 'n buitepunt P kan twee raaklyne na 'n sirkel getrek word.<br>
              Albei het gelyke lengte (sirkelstelling van Gr 11).<br>
              Om die raaklyne te vind: stel die loodregtheidsvoorwaarde en die afstandsvoorwaarde gelyktydig op.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Kontroleer of 'n lyn 'n raaklyn is</div>
            <p>
              Vervang die lyn in die sirkelvergelyking en kry 'n kwadratiese in x.<br>
              As diskriminant Δ = 0: die lyn is 'n raaklyn.<br>
              As Δ > 0: twee snypunte (sekans).<br>
              As Δ &lt; 0: geen snyding nie.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Raaklyn-aan-Sirkel-Sakrekenaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer sirkelmiddelpunt (a;b), radius r, en die raakpunt P(x₁;y₁) in — vind die raaklyn.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Middelpunt a</div><input id="g12c7t2a" type="number" value="1" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Middelpunt b</div><input id="g12c7t2b" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Punt x₁</div><input id="g12c7t2x1" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Punt y₁</div><input id="g12c7t2y1" type="number" value="6" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c7t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind Raaklyn</button>
            </div>
            <div id="g12c7t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const a=gv('g12c7t2a'),b=gv('g12c7t2b'),x1=gv('g12c7t2x1'),y1=gv('g12c7t2y1');
                const out=document.getElementById('g12c7t2Out');
                if([a,b,x1,y1].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer alle waardes in.</span>';return;}
                const dx=x1-a,dy=y1-b;
                if(dx===0&&dy===0){out.innerHTML='<span style="color:#fca5a5;">Punt is gelyk aan die middelpunt — nie op die sirkel nie.</span>';return;}
                if(dx===0){
                  // vertikale radius → horisontale raaklyn
                  out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Radius is vertikaal → raaklyn is horisontaal</span><br><span style="color:#6ee7b7;">Raaklyn: y = '+y1+'</span>';return;
                }
                const mr=dy/dx;
                const mt=-1/mr;
                const yint=y1-mt*x1;
                let html='<span style="color:rgba(221,225,240,0.50);">m_radius = ('+y1+'−'+b+')/('+x1+'−'+a+') = '+f4(mr)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">m_raaklyn = −1/m_r = '+f4(mt)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">y − '+y1+' = '+f4(mt)+'(x − '+x1+')</span><br>';
                html+='<span style="color:#6ee7b7;">Raaklyn: y = '+f4(mt)+'x + '+f4(yint)+'</span>';
                out.innerHTML=html;
              }
              ['g12c7t2a','g12c7t2b','g12c7t2x1','g12c7t2y1'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c7t2Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Raaklyn by (3, 4) op sirkel x² + y² = 25. Radiusgradiënt = 4/3. Raaklyngradiënt =", options: ["4/3", "3/4", "−3/4", "−4/3"], answer: 2, topic: "Raaklyn aan 'n sirkel" },
        { type: "mc", text: "Om te bevestig dat 'n lyn 'n raaklyn aan 'n sirkel is, moet die diskriminant by vervanging gelyk wees aan:", options: ["0", "1", "> 0", "< 0"], answer: 0, topic: "Raaklyn aan 'n sirkel" },
        { type: "mc", text: "Sirkel: x² + y² = 10. Raaklyn by (1, 3):", options: ["x + 3y = 10", "3x + y = 10", "x + 3y = 10 en 3x + y = 10", "x − 3y = 10"], answer: 0, topic: "Raaklyn aan 'n sirkel" },
        { type: "mc", text: "Sirkelmiddelpunt (2, −1), punt P(5, 3) op sirkel. Gradiënt van radius CP:", options: ["3/4", "4/3", "−3/4", "−4/3"], answer: 1, topic: "Raaklyn aan 'n sirkel" },
        { type: "input", text: "Raaklyn by (0, 4) op sirkel x² + (y−1)² = 9. Wat is die gradiënt van die raaklyn?", answer: "0", topic: "Raaklyn aan 'n sirkel" },
        { type: "mc", text: "Sirkel: x² + y² = 20. Is die lyn y = 2x − 10 'n raaklyn, 'n sekans, of mis dit die sirkel?", options: ["Raaklyn (raak by (4; −2))", "Sekans (twee snypunte)", "Mis die sirkel heeltemal", "Gaan deur die middelpunt"], answer: 0, topic: "Raaklyn aan 'n sirkel" }
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Lyne, koorde & sirkels",
      fullName: "'n Lyn wat 'n sirkel sny, koordlengte, en die loodlyn vanaf die middelpunt na 'n koord",
      lesson: {
        heading: "Lyne, koorde, en sirkels",
        sub: "Hoofstuk 7 · Onderwerp 3",
        body: `
          <p>'n Reguit lyn kan 'n sirkel in <strong>twee punte</strong> sny ('n sekans, wat 'n koord vorm), dit by presies <strong>een punt</strong> raak ('n raaklyn), of dit heeltemal mis.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Bepaal snypunte</div>
            <p>
              Om te vind waar 'n lyn y = mx + k 'n sirkel ontmoet, vervang die lyn in die sirkel se vergelyking om 'n kwadratiese in x te kry, los dan op.<br><br>
              Diskriminant Δ = b² − 4ac vertel jou:<br>
              Δ &gt; 0: lyn is 'n <strong>sekans</strong> — twee snypunte<br>
              Δ = 0: lyn is 'n <strong>raaklyn</strong> — een punt (raak)<br>
              Δ &lt; 0: lyn mis die sirkel heeltemal
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Koordlengte en die middelloodlyn</div>
            <p>
              'n <strong>Koord</strong> is 'n lynstuk wat twee punte op 'n sirkel verbind.<br>
              Die loodlyn vanaf die middelpunt van 'n sirkel na 'n koord <strong>halveer die koord</strong> (dit is waarom die middelpunt van A en B, waar AB 'n koord is, op die loodlyn vanaf die middelpunt lê).<br><br>
              Koordlengte: gebruik die afstandsformule tussen die twee snypunte, of gebruik<br>
              <span class="math">koord = 2√(r² − d²)</span> waar d die loodregte afstand vanaf die middelpunt na die koord is.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld</div>
            <p>Lyn y = x + 2 ontmoet sirkel x² + y² = 10 by A en B.<br>
            Vervang: x² + (x+2)² = 10 → 2x² + 4x − 6 = 0 → x² + 2x − 3 = 0 → (x+3)(x−1) = 0<br>
            x = −3 → y = −1;  x = 1 → y = 3<br>
            A(−3, −1), B(1, 3).  Middelpunt M = (−1, 1).<br>
            Aangesien O die middelpunt is (0,0), kan OM ⊥ AB gekontroleer word: m_OM × m_AB = (−1)×(1) = −1 ✓</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Eksamenstrategie</div>
            <p>
              Wanneer 'n vraag die middelpunt van 'n koord noem, dink onmiddellik: "die lyn vanaf die middelpunt na hierdie middelpunt is loodreg op die koord." Dit ontsluit die meeste koord-meetkunde-bewyse.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Lyn–Sirkel-Snyding-Verkenner</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer sirkel x²+y²=r² en lyn y=mx+k in — bepaal of dit 'n sekans, raaklyn, of mis, en die snypunte.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r (radius)</div><input id="g12c7t3r" type="number" value="5" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">m (gradiënt)</div><input id="g12c7t3m" type="number" value="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">k (y-afsnit)</div><input id="g12c7t3k" type="number" value="2" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c7t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Ontleed</button>
            </div>
            <div id="g12c7t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const r=gv('g12c7t3r'),m=gv('g12c7t3m'),k=gv('g12c7t3k');
                const out=document.getElementById('g12c7t3Out');
                if([r,m,k].some(isNaN)||r<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe radius en geldige m, k in.</span>";return;}
                // x² + (mx+k)² = r² → (1+m²)x² + 2mk x + (k²-r²) = 0
                const A=1+m*m,B=2*m*k,C=k*k-r*r;
                const disc=B*B-4*A*C;
                let html='<span style="color:rgba(221,225,240,0.50);">('+f4(A)+')x² + ('+f4(B)+')x + ('+f4(C)+') = 0,  Δ = '+f4(disc)+'</span><br>';
                if(disc<0){
                  html+='<span style="color:#fca5a5;">Δ &lt; 0 → die lyn mis die sirkel heeltemal.</span>';
                } else if(Math.abs(disc)<1e-9){
                  const x0=-B/(2*A),y0=m*x0+k;
                  html+="<span style=\"color:#6ee7b7;\">Δ = 0 → lyn is 'n RAAKLYN, wat raak by ("+f4(x0)+"; "+f4(y0)+")</span>";
                } else {
                  const x1=(-B+Math.sqrt(disc))/(2*A),x2=(-B-Math.sqrt(disc))/(2*A);
                  const y1=m*x1+k,y2=m*x2+k;
                  const chord=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
                  html+='<span style="color:#6ee7b7;">Δ &gt; 0 → SEKANS, wat ontmoet by ('+f4(x1)+'; '+f4(y1)+') en ('+f4(x2)+'; '+f4(y2)+')</span><br>';
                  html+='<span style="color:#fcd34d;">Koordlengte = '+f4(chord)+'   Middelpunt M = ('+f4((x1+x2)/2)+'; '+f4((y1+y2)/2)+')</span>';
                }
                out.innerHTML=html;
              }
              ['g12c7t3r','g12c7t3m','g12c7t3k'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c7t3Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Lyn y = x + 1 ontmoet sirkel x² + y² = 13. Die diskriminant van die gevolglike kwadratiese vertel ons:", options: ["Die gradiënt van die raaklyn", "Of die lyn 'n sekans, raaklyn is, of die sirkel mis", "Die radius van die sirkel", "Die middelpunt van die sirkel"], answer: 1, topic: "Lyne, koorde & sirkels" },
        { type: "mc", text: "AB is 'n koord van 'n sirkel met middelpunt O. M is die middelpunt van AB. Die verhouding tussen OM en AB is:", options: ["OM ∥ AB", "OM ⊥ AB", "OM = AB", "Geen vaste verhouding nie"], answer: 1, topic: "Lyne, koorde & sirkels" },
        { type: "input", text: "'n Koord is op loodregte afstand 3 eenhede vanaf die middelpunt van 'n sirkel met radius 5. Bepaal die koordlengte.", answer: "8", topic: "Lyne, koorde & sirkels" },
        { type: "mc", text: "Deur 'n lyn in 'n sirkel se vergelyking te vervang, kry mens 2x² − 4x + 6 = 0. Aangesien Δ &lt; 0, doen die lyn die volgende:", options: ["Is 'n raaklyn", "Is 'n sekans met twee punte", "Sny nie die sirkel nie", "Gaan deur die middelpunt"], answer: 2, topic: "Lyne, koorde & sirkels" },
        { type: "mc", text: "Sirkel x² + y² = 25. Lyn y = 7 − x ontmoet dit by twee punte. Die x-koördinate voldoen aan:", options: ["2x² − 14x + 24 = 0", "x² − 7x + 24 = 0", "2x² − 14x + 49 = 0", "x² + 7x − 24 = 0"], answer: 0, topic: "Lyne, koorde & sirkels" },
        { type: "input", text: "'n Koord van die sirkel x² + y² = 50 het middelpunt (3; 4). Bepaal die vergelyking van die lyn wat hierdie koord bevat, in die vorm 3x + 4y = k (gee k).", answer: "25", topic: "Lyne, koorde & sirkels" }
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Raaklyne vanaf 'n buitepunt",
      fullName: "Bepaal die vergelykings van raaklyne getrek vanaf 'n punt buite die sirkel, en raaklyne parallel aan 'n gegewe lyn",
      lesson: {
        heading: "Raaklyne vanaf 'n buitepunt",
        sub: "Hoofstuk 7 · Onderwerp 4",
        body: `
          <p>Vanaf enige punt <strong>buite</strong> 'n sirkel kan presies <strong>twee raaklyne</strong> na die sirkel getrek word, en (volgens die Graad 11-sirkelstelling) is hulle gelyk in lengte.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Metode: raaklyn(e) parallel aan 'n gegewe lyn</div>
            <p>
              As 'n raaklyn <strong>parallel</strong> moet wees aan 'n lyn met gradiënt m, dan het die raaklyn dieselfde gradiënt m.<br>
              Vervang y = mx + c in die sirkelvergelyking, en stel die diskriminant Δ = 0 om c op te los. Daar is gewoonlik <strong>twee waardes van c</strong> (raaklyne aan teenoorgestelde kante van die sirkel).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeeld: raaklyne parallel aan 'n lyn</div>
            <p>Bepaal die raaklyne aan x² + y² = 20 parallel aan y = 2x.<br>
            Raaklyn: y = 2x + c → x² + (2x+c)² = 20 → 5x² + 4cx + (c²−20) = 0<br>
            Δ = 0: 16c² − 20(c²−20) = 0 → −4c² + 400 = 0 → c² = 100 → c = ±10<br>
            Raaklyne: y = 2x + 10 en y = 2x − 10</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Raaklyne vanaf 'n buitepunt P(x₁, y₁)</div>
            <p>
              'n Raaklyn vanaf P het vergelyking y − y₁ = m(x − x₁) vir onbekende gradiënt m.<br>
              Vervang in die sirkelvergelyking en stel Δ = 0 — dit gee 'n kwadratiese (of vergelyking) in m, gewoonlik met twee oplossings (die twee raaklyne vanaf P).
            </p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Twee raaklyne, gelyke lengte</div>
            <p>
              As PA en PB raaklyne vanaf buitepunt P na 'n sirkel met middelpunt O is, wat raak by A en B, dan is PA = PB, en OP halveer ∠APB (dit volg uit die kongruente reghoekige driehoeke OAP en OBP).
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Parallelle-Raaklyn-Vinder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Sirkel x²+y²=r², vind die twee raaklyne parallel aan 'n lyn met gegewe gradiënt m.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r (radius)</div><input id="g12c7t4r" type="number" value="4" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">m (gradiënt)</div><input id="g12c7t4m" type="number" value="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c7t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Vind raaklyne</button>
            </div>
            <div id="g12c7t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function f4(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const r=gv('g12c7t4r'),m=gv('g12c7t4m');
                const out=document.getElementById('g12c7t4Out');
                if([r,m].some(isNaN)||r<=0){out.innerHTML="<span style=\"color:#fca5a5;\">Voer 'n positiewe radius en 'n gradiënt m in.</span>";return;}
                // x²+(mx+c)²=r² → (1+m²)x²+2mcx+(c²-r²)=0; Δ=0 → 4m²c²-4(1+m²)(c²-r²)=0 → c² = r²(1+m²)
                const c2=r*r*(1+m*m);
                const c=Math.sqrt(c2);
                let html='<span style="color:rgba(221,225,240,0.50);">Sirkel: x² + y² = '+(r*r)+'   Raaklynvorm: y = '+m+'x + c</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Δ = 0 gee c² = r²(1+m²) = '+f4(c2)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Raaklyn 1: y = '+m+'x + '+f4(c)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Raaklyn 2: y = '+m+'x − '+f4(c)+'</span>';
                out.innerHTML=html;
              }
              ['g12c7t4r','g12c7t4m'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g12c7t4Btn').addEventListener('click',calc);

            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Hoeveel raaklyne kan getrek word na 'n sirkel vanaf 'n punt buite die sirkel?", options: ["1", "2", "0", "Oneindig veel"], answer: 1, topic: "Raaklyne vanaf 'n buitepunt" },
        { type: "mc", text: "PA en PB is raaklyne vanaf buitepunt P na 'n sirkel, wat raak by A en B. Watter stelling is waar?", options: ["PA ≠ PB in die algemeen", "PA = PB altyd", "PA ∥ PB", "∠PAB = 90°"], answer: 1, topic: "Raaklyne vanaf 'n buitepunt" },
        { type: "input", text: "Bepaal c &gt; 0: y = x + c is 'n raaklyn aan x² + y² = 8.", answer: "4", topic: "Raaklyne vanaf 'n buitepunt" },
        { type: "mc", text: "Om raaklyne aan 'n sirkel parallel aan 'n gegewe lyn te vind, doen jy die volgende:", options: ["Gebruik dieselfde gradiënt en los Δ=0 op vir die y-afsnit", "Gebruik 'n loodregte gradiënt", "Vind slegs die middelpunt", "Gebruik die middelpunt van die lyn"], answer: 0, topic: "Raaklyne vanaf 'n buitepunt" },
        { type: "mc", text: "Sirkel x² + y² = 20. Raaklyne parallel aan y = 2x is y = 2x + c. Die twee waardes van c is:", options: ["±5", "±10", "±20", "±4"], answer: 1, topic: "Raaklyne vanaf 'n buitepunt" },
        { type: "input", text: "Bepaal die vergelykings van die raaklyne aan x² + y² = 25 wat parallel is aan die lyn 3x + 4y = 7, in die vorm 3x + 4y = k. Gee die positiewe waarde van k.", answer: "25", topic: "Raaklyne vanaf 'n buitepunt" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 7 Werkboek — Analitiese Meetkunde",
    questions: [
      { number: 1, text: "Sirkel: x² + y² − 8x + 2y + 8 = 0", parts: [
        { label: "a", text: "Skryf in standaardvorm deur die vierkant te voltooi.", marks: 4 },
        { label: "b", text: "Gee die middelpunt en radius.", marks: 2 },
        { label: "c", text: "Lê punt (6, −1) op, binne, of buite die sirkel?", marks: 2 }
      ]},
      { number: 2, text: "Sirkel met middelpunt C(3, 1) gaan deur A(−1, 4).", parts: [
        { label: "a", text: "Bepaal die radius.", marks: 2 },
        { label: "b", text: "Skryf die vergelyking van die sirkel.", marks: 2 },
        { label: "c", text: "Bepaal die vergelyking van die raaklyn aan die sirkel by A.", marks: 4 }
      ]},
      { number: 3, text: "Lyn y = 2x + k is 'n raaklyn aan die sirkel x² + y² = 5.", parts: [
        { label: "a", text: "Vervang die lyn in die sirkelvergelyking.", marks: 2 },
        { label: "b", text: "Gebruik Δ = 0 om k te bepaal.", marks: 3 },
        { label: "c", text: "Skryf albei raaklynvergelykings.", marks: 1 }
      ]}
    ],
    answers: {
      1: { a: "(x−4)²−16+(y+1)²−1+8=0→(x−4)²+(y+1)²=9", b: "Middelpunt (4,−1); r=3", c: "(6−4)²+(−1+1)²=4<9→binne" },
      2: { a: "r=√[(−1−3)²+(4−1)²]=√(16+9)=5", b: "(x−3)²+(y−1)²=25", c: "m_CA=(4−1)/(−1−3)=−3/4; m_raak=4/3; y−4=(4/3)(x+1)→y=(4/3)x+16/3" },
      3: { a: "x²+(2x+k)²=5→5x²+4kx+k²−5=0", b: "Δ=16k²−20(k²−5)=0→−4k²+100=0→k²=25→k=±5", c: "y=2x+5 en y=2x−5" }
    }
  }
});
