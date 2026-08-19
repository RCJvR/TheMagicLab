// Math Magician — Graad 8, Hoofstuk 4 data
// Word outomaties gelaai deur math-magician-gr8.html

MathMagician.registerChapter(4, {
  topics: [
{
    id: 401,
    chapter: 4,
    name: "Numeriese getalpatrone",
    fullName: "Numeriese getalpatrone",
    lesson: {
      heading: "Numeriese getalpatrone",
      sub: "Hoofstuk 4 · Onderwerp 1",
      body: `
        <p>'n <strong>Getalpatroon</strong> (of ry) is 'n geordende lys getalle wat 'n spesifieke reël volg. As jy die reël kan identifiseer, kan jy enige term voorspel.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Sleutelwoordeskat</div>
          <p>
            <strong>Term:</strong> elke getal in die ry.<br>
            <strong>Konstante verskil (d):</strong> die konstante waarde wat tussen opeenvolgende terme bygetel of afgetrek word.<br>
            <span class="math">d = term₂ − term₁</span><br><br>
            <strong>Rekenkundige ry:</strong> tel/trek elke keer dieselfde waarde by/af.<br>
            <em>bv.</em> <span class="math">3, 7, 11, 15, …</span> (d = 4)<br><br>
            <strong>Meetkundige ry:</strong> vermenigvuldig elke keer met dieselfde waarde (word in Onderwerp 2 behandel).<br><br>
            <strong>Formule vir die algemene term (Tₙ):</strong> 'n formule om enige term te vind.<br>
            Vir rekenkundig: <span class="math">Tₙ = a + (n−1)d</span><br>
            waar a = eerste term, d = konstante verskil, n = termposisie.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Die algemene term vind</div>
          <div class="example-step"><span class="step-num">1</span><span>Ry: <span class="math">5, 9, 13, 17, …</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>a = 5, d = 9 − 5 = 4</span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">Tₙ = 5 + (n−1)(4) = 5 + 4n − 4 = 4n + 1</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Kontroleer T₃: <span class="math">4(3) + 1 = 13</span> ✓</span></div>
          <div class="example-step"><span class="step-num">5</span><span>Vind T₂₀: <span class="math">4(20) + 1 = 81</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Kontroleer altyd jou algemene term deur n = 1, 2 en 3 in te vervang. As al drie klop, is jou formule korrek.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Rekenkundige Ry-bouer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer die eerste term en konstante verskil in om die ry en algemene term te genereer.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Eerste term (a)</label>
                <input id="arA" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Konstante verskil (d)</label>
                <input id="arD" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Vind term n =</label>
                <input id="arN" type="number" value="10" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div id="arOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('arA').value)||0;
              const d=parseFloat(document.getElementById('arD').value)||0;
              const n=parseInt(document.getElementById('arN').value)||10;
              // First 8 terms
              const terms=Array.from({length:8},(_,i)=>a+i*d);
              const tn=a+(n-1)*d;
              // General term formula
              const c=a-d; // Tn = dn + c
              const formulaStr=(d===0?a:(d>0?d+'n'+(c>0?' + '+c:c<0?' − '+Math.abs(c):''):(d<0?d+'n'+(c>0?' + '+c:c<0?' − '+Math.abs(c):''):'')));
              document.getElementById('arOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Eerste 8 terme:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Algemene term:</span><span style="color:#fbbf24;">Tₙ = '+formulaStr+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">T<sub>'+n+'</sub>:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+tn+'</span></div>',
                '<div style="font-size:10px;opacity:0.45;">Afgelei van: Tₙ = a + (n−1)d = '+a+' + (n−1)('+d+')</div>',
              ].join('');
            }
            ['arA','arD','arN'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Wat is die konstante verskil van: <span class='math'>2, 8, 14, 20, …</span>?", options: ["4", "6", "8", "10"], answer: 1, topic: "Patrone" },
      { type: "input", text: "Vind die volgende twee terme: <span class='math'>3, 7, 11, 15, __, __</span> (formaat: x,y)", answer: "19,23", topic: "Patrone" },
      { type: "mc", text: "Die algemene term van 'n ry is <span class='math'>Tₙ = 3n − 1</span>. Wat is T₅?", options: ["14", "12", "16", "10"], answer: 0, topic: "Patrone" },
      { type: "input", text: "'n Ry het a = 4 en d = 5. Wat is die 10de term?", answer: "49", topic: "Patrone" },
      { type: "mc", text: "Watter is die algemene term vir <span class='math'>6, 10, 14, 18, …</span>?", options: ["Tₙ = 4n + 2", "Tₙ = 4n + 6", "Tₙ = 2n + 4", "Tₙ = 6n − 4"], answer: 0, topic: "Patrone" },
      { type: "input", text: "In 'n rekenkundige ry is T₄ = 22 en T₉ = 47. Bepaal die eerste term.", answer: "7", topic: "Patrone" },
      { type: "input", text: "Stoele word in rye gestapel: die voorste ry het 1 stoel, en elke ry daaragter het 3 meer stoele as die ry voor dit. As die laaste ry 40 stoele het, hoeveel rye is daar?", answer: "14", topic: "Patrone" },
    ]
  },
  {
    id: 402,
    chapter: 4,
    name: "Meetkundige getalpatrone",
    fullName: "Meetkundige getalpatrone",
    lesson: {
      heading: "Meetkundige getalpatrone",
      sub: "Hoofstuk 4 · Onderwerp 2",
      body: `
        <p>In 'n <strong>meetkundige ry</strong> word elke term vermenigvuldig met 'n konstante waarde wat die <strong>konstante verhouding (r)</strong> genoem word.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Meetkundige rye</div>
          <p>
            <strong>Konstante verhouding (r):</strong> <span class="math">r = term₂ ÷ term₁</span><br><br>
            <strong>Voorbeelde:</strong><br>
            <span class="math">2, 6, 18, 54, …</span> → r = 3 (vermenigvuldig met 3)<br>
            <span class="math">100, 50, 25, 12.5, …</span> → r = 0.5 (deel deur 2)<br>
            <span class="math">1, −2, 4, −8, …</span> → r = −2<br><br>
            <strong>Visuele/tandestokkiepatrone</strong> is ook meetkundig — tel voorwerpe en vind die vermenigvuldigingsreël.<br><br>
            <strong>Let wel:</strong> Graad 8 fokus op die identifisering en uitbreiding van meetkundige rye, nie op die formele formule vir die algemene term nie.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
          <div class="example-step"><span class="step-num">1</span><span>Ry: <span class="math">3, 12, 48, 192, …</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>r = 12 ÷ 3 = 4. Kontroleer: 48 ÷ 12 = 4 ✓</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Volgende term: <span class="math">192 × 4 = 768</span></span></div>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Tandestokkiepatroon</div>
          <div class="example-step"><span class="step-num">1</span><span>Vierkante gemaak van tandestokkies: 4, 7, 10, 13, … (rekenkundig, d = 3)</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Driehoeke: 3, 5, 7, 9, … (rekenkundig, d = 2)</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Beskryf die patroon in woorde ÉN as 'n formule.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>As terme deur optelling toeneem → rekenkundig. As deur vermenigvuldiging → meetkundig. Kontroleer deur opeenvolgende terme te deel.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Meetkundige Ry-bouer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer die eerste term en konstante verhouding in. Voer 'n ry in om die tipe en reël te identifiseer.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Eerste term (a)</label>
                <input id="grA" type="number" value="2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Konstante verhouding (r)</label>
                <input id="grR" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Vind term n =</label>
                <input id="grN" type="number" value="6" min="1" max="12" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div style="margin-bottom:8px;border-top:1px solid rgba(255,255,255,0.07);padding-top:10px;">
              <span style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Of identifiseer 'n ry:</span>
              <div style="display:flex;gap:8px;margin-top:6px;">
                <input id="grSeq" type="text" value="4, 12, 36, 108" placeholder="bv. 5, 10, 20, 40" style="flex:1;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
                <button id="grIdent" style="padding:6px 12px;border-radius:7px;border:none;background:rgba(99,102,241,0.25);color:#a5b4fc;font-family:DM Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Identifiseer</button>
              </div>
            </div>
            <div id="grOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function build(){
              const a=parseFloat(document.getElementById('grA').value)||1;
              const r=parseFloat(document.getElementById('grR').value)||2;
              const n=parseInt(document.getElementById('grN').value)||6;
              const terms=Array.from({length:6},(_,i)=>+(a*Math.pow(r,i)).toFixed(6));
              const tn=+(a*Math.pow(r,n-1)).toFixed(6);
              document.getElementById('grOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Eerste 6 terme:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Konstante verhouding:</span><span style="color:#fbbf24;">r = '+r+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">T<sub>'+n+'</sub>:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+tn+'</span></div>',
                '<div style="font-size:10px;opacity:0.45;">Tₙ = a × rⁿ⁻¹ = '+a+' × '+r+'^'+(n-1)+'</div>',
              ].join('');
            }
            function identify(){
              const nums=document.getElementById('grSeq').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              if(nums.length<3){document.getElementById('grOut').innerHTML='<span style="color:#fca5a5;">Voer ten minste 3 terme in.</span>';return;}
              const diffs=nums.slice(1).map((v,i)=>v-nums[i]);
              const ratios=nums.slice(1).map((v,i)=>nums[i]!==0?+(v/nums[i]).toFixed(6):null);
              const isArith=diffs.every(d=>Math.abs(d-diffs[0])<0.001);
              const isGeom=ratios.every(r=>r!==null&&Math.abs(r-ratios[0])<0.001);
              let html='';
              if(isArith){html='<div><span style="color:#6ee7b7;">✓ Rekenkundige ry</span> — d = '+diffs[0]+'</div><div>Volgende term: <span style="color:#fcd34d;">'+(nums[nums.length-1]+diffs[0])+'</span></div>';}
              else if(isGeom){html='<div><span style="color:#6ee7b7;">✓ Meetkundige ry</span> — r = '+ratios[0]+'</div><div>Volgende term: <span style="color:#fcd34d;">'+(+(nums[nums.length-1]*ratios[0]).toFixed(6))+'</span></div>';}
              else{html='<div><span style="color:#fbbf24;">Nóg rekenkundig nóg meetkundig</span></div><div style="font-size:11px;opacity:0.55;">Verskille: '+diffs.join(', ')+'</div><div style="font-size:11px;opacity:0.55;">Verhoudings: '+ratios.join(', ')+'</div>';}
              document.getElementById('grOut').innerHTML=html;
            }
            ['grA','grR','grN'].forEach(id=>document.getElementById(id).addEventListener('input',build));
            document.getElementById('grIdent').addEventListener('click',identify);
            build();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Wat is die konstante verhouding van: <span class='math'>5, 15, 45, 135, …</span>?", options: ["5", "10", "3", "15"], answer: 2, topic: "Patrone" },
      { type: "input", text: "Vind die volgende term: <span class='math'>2, 8, 32, 128, __</span>", answer: "512", topic: "Patrone" },
      { type: "mc", text: "Watter ry is meetkundig?", options: ["2, 5, 8, 11, …", "3, 6, 12, 24, …", "1, 4, 9, 16, …", "10, 7, 4, 1, …"], answer: 1, topic: "Patrone" },
      { type: "input", text: "'n Meetkundige ry het 'n eerste term van 5 en 'n konstante verhouding van 3. Wat is die 4de term?", answer: "135", topic: "Patrone" },
      { type: "mc", text: "Vierkante gemaak van tandestokkies volg: 4, 7, 10, … Wat is die 8ste term?", options: ["22", "25", "28", "31"], answer: 1, topic: "Patrone" },
      { type: "input", text: "In 'n meetkundige ry is T₂ = 12 en T₃ = 36. Bereken die 5de term.", answer: "324", topic: "Patrone" },
      { type: "input", text: "'n Bakteriekolonie begin met 5 bakterieë en verdubbel elke uur. Na hoeveel volle ure sal die kolonie vir die eerste keer 1000 bakterieë oorskry?", answer: "8", topic: "Patrone" },
    ]
  },
  {
    id: 403,
    chapter: 4,
    name: "Visuele meetkundige patrone",
    fullName: "Visuele en meetkundige patrone",
    lesson: {
      heading: "Visuele en meetkundige patrone",
      sub: "Hoofstuk 4 · Onderwerp 3",
      body: `
        <p>CAPS vereis dat jy met <strong>meetkundige patrone</strong> werk — patrone wat uit voorwerpe soos tandestokkies, kolletjies of teëls gebou word. Jy moet in staat wees om hierdie patrone te tel, te beskryf, te tabuleer en 'n algemene reël daarvoor te vind.</p>

        <div class="def-box">
          <div class="def-box-title">📖 Sleutelterme</div>
          <p>
            <strong>Figuurnommer (n):</strong> watter posisie in die patroon (1ste, 2de, 3de…).<br>
            <strong>Term (Tₙ):</strong> die aantal voorwerpe in die n-de figuur.<br>
            <strong>Verwantskap:</strong> die reël wat n aan Tₙ verbind.<br><br>
            Die meeste visuele patrone op Graad 8-vlak is <strong>rekenkundig</strong> — elke figuur tel dieselfde aantal voorwerpe by.
          </p>
        </div>

        <div class="example-box">
          <div class="example-box-title">✏️ Voorbeeld 1 — Vuurhoutjievierkante</div>
          <div style="display:flex;gap:20px;align-items:flex-end;margin:12px 0 8px;flex-wrap:wrap;">
            <div style="text-align:center;">
              <svg width="40" height="40" viewBox="0 0 40 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Figuur 1<br>4 stokkies</div>
            </div>
            <div style="text-align:center;">
              <svg width="75" height="40" viewBox="0 0 75 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="35" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Figuur 2<br>7 stokkies</div>
            </div>
            <div style="text-align:center;">
              <svg width="110" height="40" viewBox="0 0 110 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="35" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="65" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Figuur 3<br>10 stokkies</div>
            </div>
            <div style="text-align:center;">
              <svg width="145" height="40" viewBox="0 0 145 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="35" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="65" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/><rect x="95" y="5" width="30" height="30" fill="none" stroke="#fbbf24" stroke-width="3"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Figuur 4<br>13 stokkies</div>
            </div>
          </div>
          <div class="example-step"><span class="step-num">1</span><span>Tel en tabuleer:</span></div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:12px;margin:8px 0 12px;color:rgba(221,225,240,0.70);">
            n (figuur):  1  |  2  |  3  |  4<br>
            Tₙ (stokkies): 4  |  7  |  10 |  13
          </div>
          <div class="example-step"><span class="step-num">2</span><span>Vind die konstante verskil: <span class="math">d = 7 − 4 = 3</span> (rekenkundig — tel elke keer 3 by)</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Algemene term: <span class="math">Tₙ = a + (n−1)d = 4 + (n−1)(3) = 3n + 1</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Verifieer: T₁ = 3(1)+1 = 4 ✓ &nbsp; T₃ = 3(3)+1 = 10 ✓</span></div>
          <div class="example-step"><span class="step-num">5</span><span>Hoeveel stokkies vir Figuur 20? <span class="math">T₂₀ = 3(20)+1 = 61</span></span></div>
        </div>

        <div class="example-box">
          <div class="example-box-title">✏️ Voorbeeld 2 — Kolletjiedriehoeke</div>
          <div style="display:flex;gap:24px;align-items:flex-end;margin:12px 0 8px;flex-wrap:wrap;">
            <div style="text-align:center;">
              <svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="5" fill="#a5b4fc"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Fig 1<br>1 kolletjie</div>
            </div>
            <div style="text-align:center;">
              <svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="10" r="5" fill="#a5b4fc"/><circle cx="15" cy="35" r="5" fill="#a5b4fc"/><circle cx="35" cy="35" r="5" fill="#a5b4fc"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Fig 2<br>3 kolletjies</div>
            </div>
            <div style="text-align:center;">
              <svg width="75" height="65" viewBox="0 0 75 65"><circle cx="37" cy="5" r="5" fill="#a5b4fc"/><circle cx="22" cy="30" r="5" fill="#a5b4fc"/><circle cx="52" cy="30" r="5" fill="#a5b4fc"/><circle cx="7" cy="56" r="5" fill="#a5b4fc"/><circle cx="37" cy="56" r="5" fill="#a5b4fc"/><circle cx="67" cy="56" r="5" fill="#a5b4fc"/></svg>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);margin-top:4px;">Fig 3<br>6 kolletjies</div>
            </div>
          </div>
          <div class="example-step"><span class="step-num">1</span><span>Ry: 1, 3, 6, 10, … (verskille: 2, 3, 4 — nie konstant nie → nie rekenkundig nie)</span></div>
          <div class="example-step"><span class="step-num">2</span><span>Dit is 'n <strong>driehoekgetal</strong>-patroon: <span class="math">Tₙ = n(n+1)/2</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>T₅ = 5(6)/2 = 15. Verifieer deur figuur 5 te teken.</span></div>
        </div>

        <div class="def-box">
          <div class="def-box-title">📖 Hoe om enige visuele patroon in 'n eksamen aan te pak</div>
          <p>
            <strong>Stap 1:</strong> Tel versigtig en maak 'n tabel (n teenoor Tₙ).<br>
            <strong>Stap 2:</strong> Vind die verskille tussen opeenvolgende terme.<br>
            <strong>Stap 3:</strong> As die verskille konstant is → rekenkundig → gebruik <span class="math">Tₙ = a + (n−1)d</span>.<br>
            <strong>Stap 4:</strong> Verifieer jou formule met ten minste 2 bekende terme.<br>
            <strong>Stap 5:</strong> Beantwoord die vraag (vind 'n spesifieke term, of vind n gegewe Tₙ).
          </p>
        </div>

        <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
          <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Vuurhoutjiepatroon-bouer</div>
          <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:12px;">Kies 'n patroon, bou die tabel, en vind die reël.</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;align-items:flex-end;">
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Patroon</label>
              <select id="vpPat" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="sq">Vuurhoutjievierkante (Tₙ = 3n+1)</option>
                <option value="tri">Vuurhoutjiedriehoeke (Tₙ = 2n+1)</option>
                <option value="L">L-vorms (Tₙ = 2n+1)</option>
                <option value="plus">Plusteken (Tₙ = 4n)</option>
              </select>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Vind T<sub>n</sub> vir n =</label>
              <input id="vpN" type="number" value="10" min="1" max="50" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
          </div>
          <div id="vpOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
        </div>
        <script>
        (function(){
          const pats = {
            sq:   { name:'Vuurhoutjievierkante',   fn: n=>3*n+1,  a:4, d:3, formula:'3n + 1' },
            tri:  { name:'Vuurhoutjiedriehoeke',  fn: n=>2*n+1,  a:3, d:2, formula:'2n + 1' },
            L:    { name:'L-vorms',              fn: n=>2*n+1,  a:3, d:2, formula:'2n + 1' },
            plus: { name:'Plusteken',            fn: n=>4*n,    a:4, d:4, formula:'4n' },
          };
          function update(){
            const key=document.getElementById('vpPat').value;
            const n=parseInt(document.getElementById('vpN').value)||10;
            const p=pats[key];
            const terms=Array.from({length:6},(_,i)=>p.fn(i+1));
            const tn=p.fn(n);
            document.getElementById('vpOut').innerHTML=[
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Patroon:</span><span style="color:#a5b4fc;">'+p.name+'</span></div>',
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Eerste 6 terme:</span><span style="color:#a5b4fc;">'+terms.join(', ')+', …</span></div>',
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Konstante verskil (d):</span><span style="color:#fbbf24;">'+p.d+'</span></div>',
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">Algemene term:</span><span style="color:#fbbf24;">Tₙ = '+p.formula+'</span></div>',
              '<div><span style="color:rgba(221,225,240,0.45);width:160px;display:inline-block;">T<sub>'+n+'</sub>:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+tn+'</span></div>',
            ].join('');
          }
          ['vpPat','vpN'].forEach(id=>document.getElementById(id).addEventListener('input',update));
          update();
        })();
        </script>
        <div class="tip-box"><span class="tip-icon">💡</span><span>In eksamens sluit vrae oor visuele patrone altyd 'n diagram in. Maak altyd eers 'n tabel — dit maak dit baie makliker om die reël te vind.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Vuurhoutjievierkante: 4, 7, 10, 13, … Wat is die algemene term?", options: ["Tₙ = 3n", "Tₙ = 3n + 1", "Tₙ = 4n − 1", "Tₙ = n + 3"], answer: 1, topic: "Visuele patrone" },
      { type: "input", text: "'n Patroon van vuurhoutjiedriehoeke gee: 3, 5, 7, 9, … Hoeveel vuurhoutjies in die 15de figuur?", answer: "31", topic: "Visuele patrone" },
      { type: "mc", text: "Die tabel toon: n = 1 → 5; n = 2 → 9; n = 3 → 13. Wat is die algemene term?", options: ["Tₙ = 4n + 1", "Tₙ = 5n", "Tₙ = 4n − 1", "Tₙ = n + 4"], answer: 0, topic: "Visuele patrone" },
      { type: "input", text: "'n Kolletjiepatroon het die reël Tₙ = 3n + 2. Hoeveel kolletjies in figuur 8?", answer: "26", topic: "Visuele patrone" },
      { type: "mc", text: "Watter term van die vuurhoutjievierkante-patroon (Tₙ = 3n + 1) is gelyk aan 31?", options: ["n = 9", "n = 10", "n = 11", "n = 12"], answer: 1, topic: "Visuele patrone" },
      { type: "input", text: "Teëls word in 'n L-vorm gerangskik. Figuur 1 het 3 teëls, figuur 2 het 5, figuur 3 het 7. Hoeveel teëls in figuur 12?", answer: "25", topic: "Visuele patrone" },
      { type: "input", text: "'n Sesagoon-teëlpatroon het figuur 1 = 6 teëls, figuur 2 = 11 teëls, figuur 3 = 16 teëls. Vind die algemene term en gebruik dit om te bereken hoeveel teëls in figuur 30 is.", answer: "151", topic: "Visuele patrone" },
      { type: "input", text: "'n Teëlpatroon volg Tₙ = 4n + 3. 'n Leerder het presies 79 teëls. Watter figuurnommer kan hulle presies bou, sonder oorskietteëls?", answer: "19", topic: "Visuele patrone" },
    ]
  },
  {
    id: 404,
    chapter: 4,
    name: "H4 Eksamenfokus",
    fullName: "Eksamenfokusoefening",
    lesson: {
      heading: "Hoofstuk 4 — Eksamenfokus",
      sub: "Hoofstuk 4 · Hersiening",
      body: `
        <p>Hierdie eksamenstyl-vrae meng numeriese en meetkundige patrone. Jy kan gevra word om die tipe te identifiseer, die reël te vind, 'n formule te skryf, of die ry uit te brei.</p>
        <div class="def-box">
          <div class="def-box-title">📋 Hoofstuk 4-opsomming</div>
          <p>
            ✅ Rekenkundig: konstante verskil (optel/aftrek)<br>
            ✅ Meetkundig: konstante verhouding (vermenigvuldig/deel)<br>
            ✅ Algemene term: <span class="math">Tₙ = a + (n−1)d</span> vir rekenkundig<br>
            ✅ Verifieer altyd die formule deur T₁, T₂, T₃ te toets<br>
            ✅ Vir visuele patrone: tel, tabuleer, vind die reël
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Meld in eksamens altyd of 'n ry rekenkundig of meetkundig is, en gee die konstante verskil of verhouding voordat jy die formule vind.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Is <span class='math'>2, 6, 18, 54</span> rekenkundig of meetkundig?", options: ["Rekenkundig, d = 4", "Meetkundig, r = 3", "Rekenkundig, d = 3", "Geeneen nie"], answer: 1, topic: "Patrone" },
      { type: "input", text: "Vind die algemene term vir: <span class='math'>7, 10, 13, 16, …</span> (formaat: 3n+4)", answer: "3n+4", topic: "Patrone" },
      { type: "mc", text: "Die 5de term van 'n ry is 23 en d = 4. Wat is die 1ste term?", options: ["3", "7", "11", "5"], answer: 1, topic: "Patrone" },
      { type: "input", text: "'n Meetkundige ry: 1, 3, 9, 27, … Wat is die 6de term?", answer: "243", topic: "Patrone" },
      { type: "mc", text: "Watter algemene term gee die ry <span class='math'>5, 8, 11, 14, …</span>?", options: ["Tₙ = 3n + 2", "Tₙ = 2n + 3", "Tₙ = 3n + 1", "Tₙ = n + 4"], answer: 0, topic: "Patrone" },
      { type: "input", text: "'n Rekenkundige ry het T₃ = 17 en T₆ = 32. Bepaal Tₙ, en bereken dan T₂₀.", answer: "102", topic: "Patrone" },
      { type: "input", text: "Ry A (rekenkundig) is <span class='math'>3, 7, 11, 15, 19, 23</span>. Ry B (meetkundig) is <span class='math'>2, 4, 8, 16, 32, 64</span>. By watter termnommer n word ry B se waarde vir die eerste keer groter as ry A se waarde?", answer: "4", topic: "Patrone" },
    ]
  }
  ],
  workbook: {
    chapter: 4, chapterName: "Numeriese en Meetkundige Patrone",
    topics: [
      {
        name: "Rekenkundige rye",
        questions: [
          {
            num: "1",
            text: "Beskou die ry: 4, 11, 18, 25, …",
            parts: [
              { label: "a)", text: "Gee die tipe ry en die konstante verskil.", marks: 2 },
              { label: "b)", text: "Skryf die algemene term Tₙ neer.", marks: 3 },
              { label: "c)", text: "Bereken T₁₅.", marks: 2 },
              { label: "d)", text: "Watter term van die ry is gelyk aan 109?", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Die 3de term van 'n rekenkundige ry is 14 en die 7de term is 30.",
            parts: [
              { label: "a)", text: "Vind die konstante verskil.", marks: 3 },
              { label: "b)", text: "Vind die eerste term.", marks: 2 },
              { label: "c)", text: "Skryf die algemene term.", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Meetkundige rye",
        questions: [
          {
            num: "3",
            text: "Beskou die ry: 2, 6, 18, 54, …",
            parts: [
              { label: "a)", text: "Identifiseer die tipe en gee die konstante verhouding.", marks: 2 },
              { label: "b)", text: "Skryf die volgende twee terme.", marks: 2 },
              { label: "c)", text: "Bereken die 8ste term.", marks: 3 },
            ]
          },
          {
            num: "4",
            text: "Tandestokkies word in 'n groeiende patroon van driehoeke gerangskik: 3, 5, 7, 9, …",
            parts: [
              { label: "a)", text: "Hoeveel tandestokkies word vir die 6de figuur benodig?", marks: 2 },
              { label: "b)", text: "Skryf 'n formule vir die aantal tandestokkies in die n-de figuur.", marks: 3 },
              { label: "c)", text: "'n Leerder het 51 tandestokkies. Wat is die grootste figuur wat hulle kan bou?", marks: 3 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 4, chapterName: "Hoofstuk 4 — Numeriese en Meetkundige Patrone",
    topics: [
      {
        name: "Rekenkundige rye",
        answers: [
          { num: "Q1a", ans: "Rekenkundig; d = 7", note: "11−4 = 7" },
          { num: "Q1b", ans: "Tₙ = 7n − 3", note: "a=4, d=7; Tₙ = 4+(n−1)7 = 4+7n−7 = 7n−3" },
          { num: "Q1c", ans: "T₁₅ = 102", note: "7(15)−3 = 105−3 = 102" },
          { num: "Q1d", ans: "n = 16", note: "7n−3=109 → 7n=112 → n=16" },
          { num: "Q2a", ans: "d = 4", note: "T₇−T₃ = 30−14 = 16; 16÷4 terme uitmekaar = 4" },
          { num: "Q2b", ans: "a = 6", note: "T₃ = a+2d; 14 = a+8 → a=6" },
          { num: "Q2c", ans: "Tₙ = 4n + 2", note: "Tₙ = 6+(n−1)4 = 6+4n−4 = 4n+2" },
        ]
      },
      {
        name: "Meetkundige rye",
        answers: [
          { num: "Q3a", ans: "Meetkundig; r = 3", note: "6÷2 = 3; 18÷6 = 3 ✓" },
          { num: "Q3b", ans: "162, 486", note: "54×3=162; 162×3=486" },
          { num: "Q3c", ans: "4 374", note: "T₈ = 2×3⁷ = 2×2187 = 4374" },
          { num: "Q4a", ans: "13 tandestokkies", note: "d=2; T₆ = 3+(6−1)2 = 3+10 = 13" },
          { num: "Q4b", ans: "Tₙ = 2n + 1", note: "a=3, d=2; Tₙ = 3+(n−1)2 = 2n+1" },
          { num: "Q4c", ans: "Figuur 25", note: "2n+1=51 → 2n=50 → n=25" },
        ]
      },
    ]
  }
});
