// Math Magician — Grade 8, Chapter 2 data (Afrikaans)
// Auto-loaded on demand by math-magician-gr8.html

MathMagician.registerChapter(2, {
  topics: [
{
    id: 201,
    chapter: 2,
    name: "Tel in heelgetalle",
    fullName: "Hersiening van tel in heelgetalle",
    lesson: {
      heading: "Tel in heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 1",
      body: `
        <p><strong>Heelgetalle</strong> sluit alle natuurlike getalle, nul, en hul negatiewe in: <span class="math">… −3, −2, −1, 0, 1, 2, 3 …</span></p>
        <div class="def-box">
          <div class="def-box-title">📖 Die heelgetallelyn</div>
          <p>
            Heelgetalle strek oneindig in beide rigtings op die getallelyn.<br><br>
            <strong>Positiewe heelgetalle:</strong> regs van nul (1, 2, 3, …)<br>
            <strong>Negatiewe heelgetalle:</strong> links van nul (−1, −2, −3, …)<br>
            <strong>Nul (0):</strong> nie positief of negatief nie<br><br>
            Regs beweeg op die getallelyn = optel (toeneem).<br>
            Links beweeg = aftel (afneem).
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Telreekse</div>
          <div class="example-step"><span class="step-num">1</span><span>Tel op in 3'e vanaf −9: <span class="math">−9, −6, −3, 0, 3, 6, 9</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Tel af in 4'e vanaf 8: <span class="math">8, 4, 0, −4, −8, −12</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Dink aan die getallelyn soos 'n termometer. Getalle onder nul is soos temperature onder vriespunt.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Watter heelgetal volg in die ry: <span class='math'>−10, −7, −4, −1, …</span>?", options: ["2", "−2", "3", "0"], answer: 0, topic: "Heelgetalle" },
      { type: "input", text: "Tel terug in 5'e vanaf 10. Wat is die 5de term?", answer: "-10", topic: "Heelgetalle" },
      { type: "mc", text: "Watter versameling bevat slegs heelgetalle?", options: ["−3, 0, 1.5, 4", "−5, −2, 0, 7", "0, ½, 1, 2", "1, 2, 3, 3.3"], answer: 1, topic: "Heelgetalle" },
      { type: "input", text: "Watter heelgetal is 6 stappe links van 2 op die getallelyn?", answer: "-4", topic: "Heelgetalle" },
      { type: "mc", text: "'n Getalpatroon begin by 15 en verminder met 4 elke term: <span class='math'>15, 11, 7, 3, −1, …</span> Watter termnommer is die eerste negatiewe term?", options: ["3de", "4de", "5de", "6de"], answer: 2, topic: "Heelgetalle" },
      { type: "input", text: "Die temperatuur is 5°C en daal met 3°C elke uur. Na hoeveel volle ure sal die temperatuur die eerste keer onder −10°C wees?", answer: "6", topic: "Heelgetalle" },
    ]
  },
  {
    id: 202,
    chapter: 2,
    name: "Rangskikking van heelgetalle",
    fullName: "Hersiening van die rangskikking en vergelyking van heelgetalle",
    lesson: {
      heading: "Rangskikking en vergelyking van heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 2",
      body: `
        <p>Ons <strong>vergelyk</strong> heelgetalle deur die simbole <span class="math">&gt;</span> (groter as), <span class="math">&lt;</span> (kleiner as), en <span class="math">=</span> te gebruik.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Reëls vir vergelyking</div>
          <p>
            Op die getallelyn is die getal wat verder <strong>regs is, altyd groter</strong>.<br><br>
            Enige positiewe heelgetal > 0 > enige negatiewe heelgetal.<br>
            <span class="math">−1 > −100</span> (−1 is nader aan nul, dus is dit groter)<br><br>
            <strong>Stygende volgorde:</strong> kleinste na grootste (links → regs op die getallelyn)<br>
            <strong>Dalende volgorde:</strong> grootste na kleinste (regs → links)
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
          <div class="example-step"><span class="step-num">1</span><span>Rangskik in stygende volgorde: <span class="math">−5, 3, −1, 0, −8, 2</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Plaas op die getallelyn: −8 is die verste links, dan −5, −1, 0, 2, 3</span></div>
          <div class="example-step"><span class="step-num">3</span><span>Antwoord: <span class="math">−8, −5, −1, 0, 2, 3</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Leerders dink dikwels −8 > −1 omdat 8 > 1. Onthou: hoe meer negatief 'n getal is, hoe kleiner is dit.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Heelgetallelyn</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer tot 6 heelgetalle in om hulle op 'n getallelyn te plaas en te rangskik.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="nlInput" type="text" value="-8, 3, -2, 7, 0, -5" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="nlPlot" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Teken</button>
            </div>
            <svg id="nlSvg" viewBox="0 0 460 60" style="width:100%;max-width:460px;"></svg>
            <div id="nlOrder" style="font-family:JetBrains Mono,monospace;font-size:12px;margin-top:8px;color:rgba(221,225,240,0.60);"></div>
          </div>
          <script>
          (function(){
            function plot(){
              const nums=document.getElementById('nlInput').value.split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)).slice(0,8);
              if(!nums.length)return;
              const min=Math.min(...nums,-1),max=Math.max(...nums,1);
              const pad=(max-min)*0.15||2;
              const lo=Math.floor(min-pad),hi=Math.ceil(max+pad);
              const svg=document.getElementById('nlSvg');
              const W=460,cy=38,ax=30,bx=430;
              function px(v){return ax+(v-lo)/(hi-lo)*(bx-ax);}
              let h='<line x1="'+ax+'" y1="'+cy+'" x2="'+bx+'" y2="'+cy+'" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>';
              h+='<polygon points="'+bx+','+cy+' '+(bx-6)+','+(cy-4)+' '+(bx-6)+','+(cy+4)+'" fill="rgba(255,255,255,0.15)"/>';
              for(let v=lo;v<=hi;v++){
                const x=px(v);
                h+='<line x1="'+x+'" y1="'+(cy-4)+'" x2="'+x+'" y2="'+(cy+4)+'" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>';
                if(v%2===0||hi-lo<=12)h+='<text x="'+x+'" y="'+(cy+16)+'" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.25)" font-family="JetBrains Mono,monospace">'+v+'</text>';
              }
              const colors=['#f59e0b','#6366f1','#10b981','#ec4899','#06b6d4','#a78bfa','#f87171','#34d399'];
              nums.forEach((v,i)=>{
                const x=px(v);
                h+='<circle cx="'+x+'" cy="'+cy+'" r="7" fill="'+colors[i%colors.length]+'" opacity="0.9"/>';
                h+='<text x="'+x+'" y="'+(cy-12)+'" text-anchor="middle" font-size="9" fill="'+colors[i%colors.length]+'" font-family="JetBrains Mono,monospace" font-weight="700">'+v+'</text>';
              });
              svg.innerHTML=h;
              const sorted=[...nums].sort((a,b)=>a-b);
              document.getElementById('nlOrder').innerHTML=
                '<span style="color:rgba(221,225,240,0.40);">Stygend: </span>'+sorted.join(' &lt; ')+
                ' <span style="color:rgba(221,225,240,0.25);margin-left:12px;">Dalend: </span>'+[...sorted].reverse().join(' &gt; ');
            }
            document.getElementById('nlPlot').addEventListener('click',plot);
            document.getElementById('nlInput').addEventListener('keydown',e=>{if(e.key==='Enter')plot();});
            plot();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Watter stelling is korrek?", options: ["−6 > −2", "−3 > 1", "−1 > −8", "0 < −5"], answer: 2, topic: "Heelgetalle" },
      { type: "mc", text: "Rangskik in dalende volgorde: <span class='math'>−4, 7, −9, 1, 0</span>", options: ["7, 1, 0, −4, −9", "−9, −4, 0, 1, 7", "7, −9, 1, 0, −4", "0, 1, 7, −4, −9"], answer: 0, topic: "Heelgetalle" },
      { type: "input", text: "Wat is die kleinste heelgetal in hierdie versameling: {−3, 5, −10, 2, −1}?", answer: "-10", topic: "Heelgetalle" },
      { type: "mc", text: "Watter een is waar?", options: ["−100 > −50", "−50 > −100", "−100 = −50", "Kan nie vergelyk word nie"], answer: 1, topic: "Heelgetalle" },
      { type: "input", text: "Vyf stede het hierdie temperature aangeteken: Kaapstad 18°C, Moskou −12°C, Reykjavik −4°C, Dubai 41°C, Oslo −9°C. Bereken die verskil tussen die warmste en die koudste temperatuur.", answer: "53", topic: "Heelgetalle" },
      { type: "mc", text: "Watter lys rangskik hierdie bankbalanse korrek van mees in skuld tot minste in skuld: −R450, R200, −R1200, R50?", options: ["−R1200, −R450, R50, R200", "R200, R50, −R450, −R1200", "−R450, −R1200, R50, R200", "R50, R200, −R450, −R1200"], answer: 0, topic: "Heelgetalle" },
    ]
  },
  {
    id: 203,
    chapter: 2,
    name: "Optelling van heelgetalle",
    fullName: "Optelling van heelgetalle",
    lesson: {
      heading: "Optelling van heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 3",
      body: `
        <p>Die optelling van heelgetalle vereis noukeurige aandag aan die <strong>tekens</strong> betrokke.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Reëls vir optelling</div>
          <p>
            <strong>Selfde tekens:</strong> tel die absolute waardes bymekaar, hou die teken.<br>
            <span class="math">(+4) + (+3) = +7</span><br>
            <span class="math">(−4) + (−3) = −7</span><br><br>
            <strong>Verskillende tekens:</strong> trek die kleiner absolute waarde van die groter af, hou die teken van die groter.<br>
            <span class="math">(+7) + (−3) = +4</span> &nbsp; (7 > 3, positief wen)<br>
            <span class="math">(−7) + (+3) = −4</span> &nbsp; (7 > 3, negatief wen)
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
          <div class="example-step"><span class="step-num">1</span><span><span class="math">(−8) + (−5)</span> → selfde tekens, tel op: <span class="math">8 + 5 = 13</span>, hou negatief → <span class="math">−13</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span><span class="math">(−6) + (+10)</span> → verskillende tekens: <span class="math">10 − 6 = 4</span>, positief wen → <span class="math">+4</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">(+5) + (−5)</span> → teenoorgesteldes kanselleer → <span class="math">0</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Gebruik 'n getallelyn om te visualiseer: positief = beweeg regs, negatief = beweeg links.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Bereken: <span class='math'>(−7) + (−9)</span>", answer: "-16", topic: "Heelgetalle" },
      { type: "mc", text: "Wat is <span class='math'>(−12) + (+8)</span>?", options: ["−20", "20", "−4", "4"], answer: 2, topic: "Heelgetalle" },
      { type: "input", text: "Bereken: <span class='math'>(−15) + (+15)</span>", answer: "0", topic: "Heelgetalle" },
      { type: "mc", text: "Wat is <span class='math'>(+6) + (−11) + (+3)</span>?", options: ["−2", "2", "−8", "8"], answer: 0, topic: "Heelgetalle" },
      { type: "input", text: "Die temperatuur is −4°C. Dit styg met 9°C. Wat is die nuwe temperatuur?", answer: "5", topic: "Heelgetalle" },
      { type: "input", text: "'n Stapper begin 120 m bo seespieël, daal 340 m af in 'n vallei, en klim dan 185 m op. Wat is haar finale hoogte relatief tot seespieël? (Gebruik 'n negatiewe getal as dit onder seespieël is.)", answer: "-35", topic: "Heelgetalle" },
      { type: "mc", text: "'n Bankrekening se balans is −R850. 'n Deposito van R320 word gemaak, en dan vind 'n onttrekking van R95 plaas. Wat is die nuwe balans?", options: ["−R625", "−R665", "R625", "−R1265"], answer: 0, topic: "Heelgetalle" },
    ]
  },
  {
    id: 204,
    chapter: 2,
    name: "Aftrekking van heelgetalle",
    fullName: "Aftrekking van heelgetalle",
    lesson: {
      heading: "Aftrekking van heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 4",
      body: `
        <p>Om 'n heelgetal af te trek is dieselfde as om sy <strong>teenoorgestelde by te tel</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Die sleutelreël</div>
          <p>
            <span class="math">a − b = a + (−b)</span><br><br>
            Verander die aftrekking na optelling, verander dan die teken van die getal wat afgetrek word.<br><br>
            <span class="math">5 − (−3) = 5 + (+3) = 8</span><br>
            <span class="math">−4 − (+6) = −4 + (−6) = −10</span><br>
            <span class="math">−2 − (−5) = −2 + (+5) = 3</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Stap-vir-stap</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken <span class="math">3 − (−8)</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Herskryf: <span class="math">3 + (+8)</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Resultaat: <span class="math">11</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>"Minus 'n minus is 'n plus" — om 'n negatiewe getal af te trek beteken jy beweeg regs op die getallelyn, wat die resultaat groter maak.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Bereken: <span class='math'>6 − (−4)</span>", answer: "10", topic: "Heelgetalle" },
      { type: "mc", text: "Wat is <span class='math'>(−3) − (+8)</span>?", options: ["5", "−5", "−11", "11"], answer: 2, topic: "Heelgetalle" },
      { type: "input", text: "Bereken: <span class='math'>(−7) − (−7)</span>", answer: "0", topic: "Heelgetalle" },
      { type: "mc", text: "Watter uitdrukking is gelyk aan <span class='math'>−5 − (−9)</span>?", options: ["−5 + (−9)", "−5 + 9", "5 − 9", "−14"], answer: 1, topic: "Heelgetalle" },
      { type: "input", text: "Bereken: <span class='math'>2 − 15</span>", answer: "-13", topic: "Heelgetalle" },
      { type: "input", text: "Dag 1 het 'n hoogtepunt van 8°C en 'n laagtepunt van −15°C gehad. Dag 2 het 'n hoogtepunt van −2°C en 'n laagtepunt van −20°C gehad. Hoeveel groter is Dag 1 se temperatuurspeling (hoogste − laagste) as Dag 2 s'n?", answer: "5", topic: "Heelgetalle" },
      { type: "mc", text: "Wat is <span class='math'>−8 − (−3) − 5</span>?", options: ["−10", "−16", "6", "0"], answer: 0, topic: "Heelgetalle" },
    ]
  },
  {
    id: 205,
    chapter: 2,
    name: "Vermenigvuldiging van heelgetalle",
    fullName: "Vermenigvuldiging van heelgetalle",
    lesson: {
      heading: "Vermenigvuldiging van heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 5",
      body: `
        <p>Vermenigvuldiging van heelgetalle volg eenvoudige <strong>tekenreëls</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Tekenreëls vir vermenigvuldiging</div>
          <p>
            <strong>Positief × Positief = Positief</strong><br>
            <span class="math">(+4) × (+3) = +12</span><br><br>
            <strong>Negatief × Negatief = Positief</strong><br>
            <span class="math">(−4) × (−3) = +12</span><br><br>
            <strong>Positief × Negatief = Negatief</strong><br>
            <span class="math">(+4) × (−3) = −12</span><br><br>
            <strong>Negatief × Positief = Negatief</strong><br>
            <span class="math">(−4) × (+3) = −12</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Meervoudige faktore</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken <span class="math">(−2) × (−3) × (−4)</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Eerste paar: <span class="math">(−2) × (−3) = +6</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Dan: <span class="math">(+6) × (−4) = −24</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span><strong>Reël:</strong> onewe aantal negatiewe tekens → negatiewe resultaat; ewe → positief.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Tel die aantal negatiewe tekens. Onewe aantal = negatiewe antwoord. Ewe aantal = positiewe antwoord.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Verkenner van Tekenreëls vir Heelgetalle</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Sien die tekenreëls in aksie vir × en ÷. Verander die waardes en kyk hoe die resultaat verander.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="srA" type="number" value="-4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
              <select id="srOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;">
                <option value="mul">×</option>
                <option value="div">÷</option>
              </select>
              <input id="srB" type="number" value="-3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:16px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
            <div id="srOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const a=parseFloat(document.getElementById('srA').value)||0;
              const b=parseFloat(document.getElementById('srB').value)||1;
              const op=document.getElementById('srOp').value;
              const res=op==='mul'?a*b:a/b;
              const signA=a>=0?'positief':'negatief';
              const signB=b>=0?'positief':'negatief';
              const signR=res>=0?'positief':'negatief';
              const rule=signA===signB?'Selfde tekens → Positiewe resultaat':'Verskillende tekens → Negatiewe resultaat';
              const el=document.getElementById('srOut');
              el.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Berekening: </span><span style="color:#fcd34d;">'+a+' '+(op==='mul'?'×':'÷')+' '+b+' = <strong style="font-size:16px;color:'+(res>=0?'#6ee7b7':'#fca5a5')+';">'+res+'</strong></span></div>',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Tekenreël: </span><span style="color:#fbbf24;">'+rule+'</span></div>',
                '<div style="font-size:10px;opacity:0.45;margin-top:2px;">('+signA+') '+(op==='mul'?'×':'÷')+' ('+signB+') = ('+signR+')</div>',
              ].join('');
            }
            ['srA','srB','srOp'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "mc", text: "Wat is <span class='math'>(−6) × (−7)</span>?", options: ["−42", "42", "−13", "13"], answer: 1, topic: "Heelgetalle" },
      { type: "input", text: "Bereken: <span class='math'>(−5) × (+8)</span>", answer: "-40", topic: "Heelgetalle" },
      { type: "mc", text: "Wat is die teken van <span class='math'>(−2) × (−3) × (−1) × (−4)</span>?", options: ["Negatief", "Positief", "Nul", "Kan nie bepaal word nie"], answer: 1, topic: "Heelgetalle" },
      { type: "input", text: "Bereken: <span class='math'>(−3)²</span>  (wenk: −3 × −3)", answer: "9", topic: "Heelgetalle" },
      { type: "mc", text: "Watter een gee 'n negatiewe resultaat?", options: ["(−4)²", "(−2) × (−6)", "(+3) × (−2)", "(−1) × (−1) × (−1) × (−1)"], answer: 2, topic: "Heelgetalle" },
      { type: "input", text: "'n Duiker begin by die oppervlak (0 m) en daal teen 6 m per minuut vir 7 minute, en styg dan teen 4 m per minuut vir 3 minute. Wat is haar finale diepte relatief tot die oppervlak? (Gebruik 'n negatiewe getal vir onder die oppervlak.)", answer: "-30", topic: "Heelgetalle" },
      { type: "mc", text: "As <span class='math'>a × b × c × d</span> negatief is, en <span class='math'>a</span>, <span class='math'>c</span>, en <span class='math'>d</span> almal negatiewe heelgetalle is, wat moet waar wees van <span class='math'>b</span>?", options: ["b moet positief wees", "b moet negatief wees", "b moet nul wees", "b kan enige teken hê"], answer: 0, topic: "Heelgetalle" },
    ]
  },
  {
    id: 206,
    chapter: 2,
    name: "Deling van heelgetalle",
    fullName: "Deling van heelgetalle",
    lesson: {
      heading: "Deling van heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 6",
      body: `
        <p>Deling van heelgetalle gebruik <strong>dieselfde tekenreëls</strong> as vermenigvuldiging.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Tekenreëls vir deling</div>
          <p>
            <strong>Selfde tekens → Positiewe resultaat</strong><br>
            <span class="math">(+12) ÷ (+3) = +4</span><br>
            <span class="math">(−12) ÷ (−3) = +4</span><br><br>
            <strong>Verskillende tekens → Negatiewe resultaat</strong><br>
            <span class="math">(+12) ÷ (−3) = −4</span><br>
            <span class="math">(−12) ÷ (+3) = −4</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken <span class="math">(−48) ÷ (+6)</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Verskillende tekens → negatiewe resultaat</span></div>
          <div class="example-step"><span class="step-num">3</span><span><span class="math">48 ÷ 6 = 8</span>, dus is die antwoord <span class="math">−8</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Deling en vermenigvuldiging deel dieselfde tekenreëls. As jy een baasraak, raak jy die ander ook baas.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Bereken: <span class='math'>(−36) ÷ (−9)</span>", answer: "4", topic: "Heelgetalle" },
      { type: "mc", text: "Wat is <span class='math'>(+56) ÷ (−8)</span>?", options: ["7", "−7", "48", "−48"], answer: 1, topic: "Heelgetalle" },
      { type: "input", text: "Bereken: <span class='math'>(−72) ÷ (+8)</span>", answer: "-9", topic: "Heelgetalle" },
      { type: "mc", text: "Watter uitdrukking gee 'n positiewe antwoord?", options: ["(−20) ÷ (+5)", "(+30) ÷ (−6)", "(−24) ÷ (−4)", "(−10) ÷ (+2)"], answer: 2, topic: "Heelgetalle" },
      { type: "input", text: "'n Maatskappy se totale wins oor 4 maande was −R2 400 (’n verlies), eweredig versprei oor die maande. In die 5de maand het die maatskappy 'n wins van R3 000 gemaak. Wat is die nuwe gemiddelde maandelikse wins/verlies oor al 5 maande?", answer: "120", topic: "Heelgetalle" },
      { type: "mc", text: "Watter uitdrukking is ook gelyk aan <span class='math'>(−6) × (−8) ÷ (−4)</span>?", options: ["(−48) ÷ 4", "48 ÷ 4", "(−24) ÷ (−2)", "(−12) ÷ (−1)"], answer: 0, topic: "Heelgetalle" },
    ]
  },
  {
    id: 207,
    chapter: 2,
    name: "Kommutatief, assosiatief & distributief",
    fullName: "Die kommutatiewe, assosiatiewe en distributiewe eienskappe",
    lesson: {
      heading: "Eienskappe toegepas op heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 7",
      body: `
        <p>Die drie hoofeienskappe wat vir natuurlike getalle geld, geld ook vir heelgetalle, maar pas op met aftrekking en deling — hulle is <strong>nie kommutatief nie</strong>.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Eienskappe met heelgetalle</div>
          <p>
            <strong>Kommutatief (slegs + en ×):</strong><br>
            <span class="math">(−3) + (−5) = (−5) + (−3) = −8</span> ✓<br>
            <span class="math">3 − 5 ≠ 5 − 3</span> ✗ (aftrekking is nie kommutatief nie)<br><br>
            <strong>Assosiatief (slegs + en ×):</strong><br>
            <span class="math">[(−2) + (−3)] + (−4) = (−2) + [(−3) + (−4)]</span><br><br>
            <strong>Distributief:</strong><br>
            <span class="math">(−3) × (4 + (−2)) = (−3)×4 + (−3)×(−2)</span><br>
            <span class="math">= −12 + 6 = −6</span>
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Aftrekking en deling is nie kommutatief of assosiatief nie. Gebruik hierdie eienskappe slegs vir optelling en vermenigvuldiging.</span></div>
      `
    },
    questions: [
      { type: "mc", text: "Watter een wys die distributiewe eienskap korrek?", options: ["(−2)(3+5) = (−2)(3) + (−2)(5)", "(−2)(3+5) = (−2+3)(−2+5)", "(−2)+(3×5) = (−2+3)×(−2+5)", "Geeneen van hierdie"], answer: 0, topic: "Eienskappe" },
      { type: "mc", text: "Is aftrekking kommutatief? Bv. is <span class='math'>(−5) − 3 = 3 − (−5)</span>?", options: ["Ja, altyd", "Nee — hulle gee verskillende resultate", "Slegs vir negatiewe getalle", "Slegs wanneer een getal nul is"], answer: 1, topic: "Eienskappe" },
      { type: "input", text: "Gebruik die distributiewe eienskap: <span class='math'>(−4) × (6 + (−2))</span>", answer: "-16", topic: "Eienskappe" },
      { type: "mc", text: "<span class='math'>[(−2) × (−3)] × (−5)</span> is gelyk aan <span class='math'>(−2) × [(−3) × (−5)]</span>. Watter eienskap is dit?", options: ["Kommutatief", "Distributief", "Assosiatief", "Identiteit"], answer: 2, topic: "Eienskappe" },
      { type: "input", text: "Gebruik die distributiewe eienskap om <span class='math'>(−7) × 23</span> te bereken deur 23 te skryf as <span class='math'>(20 + 3)</span>.", answer: "-161", topic: "Eienskappe" },
      { type: "mc", text: "Watter berekening wys dat deling NIE assosiatief is nie, met gebruik van 24, 4 en 2?", options: ["(24÷4)÷2 = 3 en 24÷(4÷2) = 12, dus is hulle nie gelyk nie", "(24÷4)÷2 = 12 en 24÷(4÷2) = 3, dus is hulle nie gelyk nie", "(24÷4)÷2 = 24÷(4÷2) = 6, dus is hulle gelyk", "Deling is altyd assosiatief, soos optelling"], answer: 0, topic: "Eienskappe" },
    ]
  },
  {
    id: 208,
    chapter: 2,
    name: "Kwadrate, kubusse & wortels",
    fullName: "Kwadrate, kubusse, vierkantswortels en kubuswortels",
    lesson: {
      heading: "Kwadrate, kubusse en wortels van heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 8",
      body: `
        <p>Hierdie bewerkings kom regdeur algebra, meetkunde en finansies voor.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Definisies</div>
          <p>
            <strong>Kwadraat:</strong> <span class="math">a² = a × a</span> &nbsp; bv. <span class="math">(−4)² = 16</span><br>
            <strong>Kubus:</strong> <span class="math">a³ = a × a × a</span> &nbsp; bv. <span class="math">(−2)³ = −8</span><br><br>
            <strong>Vierkantswortel (√):</strong> die positiewe getal wat, wanneer dit gekwadreer word, a gee. Slegs gedefinieer vir positiewe getalle.<br>
            <span class="math">√49 = 7</span><br><br>
            <strong>Kubuswortel (∛):</strong> die getal wat, wanneer dit gekubeer word, a gee. Gedefinieer vir alle heelgetalle.<br>
            <span class="math">∛(−27) = −3</span>
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Sleutelinsig</div>
          <div class="example-step"><span class="step-num">1</span><span>Enige heelgetal wat gekwadreer word, is <strong>altyd positief</strong> (of nul): <span class="math">(−5)² = 25</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>'n Negatiewe getal wat gekubeer word, is <strong>altyd negatief</strong>: <span class="math">(−3)³ = −27</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>√ van 'n negatiewe getal is <strong>nie reëel nie</strong> — jy kan nie die vierkantswortel van 'n negatiewe getal trek nie.</span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Let op die verskil tussen <span class="math">−4²</span> en <span class="math">(−4)²</span>. Die eerste is <span class="math">−16</span>; die tweede is <span class="math">+16</span>.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Kwadraat-, Kubus- en Wortelberekenaar</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="scInput" type="number" value="9" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:18px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
            <div id="scOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const n=parseFloat(document.getElementById('scInput').value);
              if(isNaN(n)){document.getElementById('scOut').innerHTML='';return;}
              const sq=n*n, cu=n*n*n;
              const sqrtVal=Math.sqrt(Math.abs(n));
              const cbrtVal=Math.cbrt(n);
              const isSqrt=Number.isInteger(sqrtVal)&&n>=0;
              const isCbrt=Number.isInteger(cbrtVal);
              document.getElementById('scOut').innerHTML=[
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Kwadraat ('+n+'²):</span><span style="color:#fcd34d;">'+sq+'</span></div>',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">Kubus ('+n+'³):</span><span style="color:#fcd34d;">'+cu+'</span></div>',
                n>=0?'<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">√'+n+':</span><span style="color:'+(isSqrt?'#6ee7b7':'rgba(221,225,240,0.60)')+'">'+sqrtVal.toFixed(4)+(isSqrt?' ✓ volkome vierkant':'')+'</span></div>':'',
                '<div><span style="color:rgba(245,158,11,0.70);width:160px;display:inline-block;">∛'+n+':</span><span style="color:'+(isCbrt?'#6ee7b7':'rgba(221,225,240,0.60)')+'">'+cbrtVal.toFixed(4)+(isCbrt?' ✓ volkome kubus':'')+'</span></div>',
              ].filter(Boolean).join('');
            }
            document.getElementById('scInput').addEventListener('input',update);
            update();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "Bereken: <span class='math'>(−3)²</span>", answer: "9", topic: "Magte & wortels" },
      { type: "mc", text: "Wat is <span class='math'>∛(−64)</span>?", options: ["8", "−8", "4", "−4"], answer: 3, topic: "Magte & wortels" },
      { type: "input", text: "Bereken: <span class='math'>(−2)³</span>", answer: "-8", topic: "Magte & wortels" },
      { type: "mc", text: "Watter een is ongedefinieerd (nie 'n reële getal nie)?", options: ["√64", "∛(−8)", "√(−9)", "(−3)²"], answer: 2, topic: "Magte & wortels" },
      { type: "input", text: "Bereken: <span class='math'>√144</span>", answer: "12", topic: "Magte & wortels" },
      { type: "input", text: "Bereken: <span class='math'>√169 − ∛(−27) + (−2)⁴</span>", answer: "32", topic: "Magte & wortels" },
      { type: "input", text: "'n Vierkantige skildery het 'n oppervlakte van 225 cm². 'n Kubusvormige geskenkboksie het 'n volume van 512 cm³. Wat is die som van die skildery se sylengte en die boksie se sylengte?", answer: "23", topic: "Magte & wortels" },
    ]
  },
  {
    id: 209,
    chapter: 2,
    name: "Gemengde bewerkings met heelgetalle",
    fullName: "Berekeninge met gemengde bewerkings van heelgetalle",
    lesson: {
      heading: "Gemengde bewerkings met heelgetalle",
      sub: "Hoofstuk 2 · Onderwerp 9",
      body: `
        <p>Wanneer verskeie bewerkings saam voorkom, gebruik <strong>BODMAS</strong> saam met die tekenreëls vir heelgetalle.</p>
        <div class="def-box">
          <div class="def-box-title">📖 Gekombineerde benadering</div>
          <p>
            Pas BODMAS toe: Hakies → Magte/Wortels → Deling/Vermenigvuldiging → Optelling/Aftrekking<br><br>
            By elke stap, pas die korrekte tekenreël vir heelgetalle toe.
          </p>
        </div>
        <div class="example-box">
          <div class="example-box-title">✏️ Uitgewerkte voorbeeld</div>
          <div class="example-step"><span class="step-num">1</span><span>Bereken: <span class="math">(−3)² − (−4) × 2 + (−10) ÷ 5</span></span></div>
          <div class="example-step"><span class="step-num">2</span><span>Magte: <span class="math">(−3)² = 9</span> → <span class="math">9 − (−4) × 2 + (−10) ÷ 5</span></span></div>
          <div class="example-step"><span class="step-num">3</span><span>Verm/Deling: <span class="math">(−4)×2 = −8</span>, <span class="math">(−10)÷5 = −2</span> → <span class="math">9 − (−8) + (−2)</span></span></div>
          <div class="example-step"><span class="step-num">4</span><span>Aftrekking: <span class="math">9 + 8 = 17</span></span></div>
          <div class="example-step"><span class="step-num">5</span><span>Optelling: <span class="math">17 + (−2) = 15</span></span></div>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Skryf elke stap uit. Gemengde-bewerkings vrae is waar die meeste punte verloor word — en die meeste gewen word — in eksamens.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — BODMAS-stap-evalueerder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Tik 'n uitdrukking in — elke BODMAS-stap word in volgorde gewys. Probeer die voorbeelde of voer jou eie in.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
              <input id="bodInput" type="text" value="3 + 2 * (8 - 5) ** 2" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="bodCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Evalueer</button>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
              <button class="bod-eg" data-v="3 + 2 * (8 - 5) ** 2" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.30);background:rgba(99,102,241,0.08);color:rgba(165,180,252,0.70);font-size:10px;font-family:JetBrains Mono,monospace;cursor:pointer;">3 + 2 * (8 - 5) ** 2</button>
              <button class="bod-eg" data-v="(4 + 6) / 2 - 1" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.30);background:rgba(99,102,241,0.08);color:rgba(165,180,252,0.70);font-size:10px;font-family:JetBrains Mono,monospace;cursor:pointer;">(4 + 6) / 2 - 1</button>
              <button class="bod-eg" data-v="2 ** 3 + 4 * 5 - 6 / 2" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.30);background:rgba(99,102,241,0.08);color:rgba(165,180,252,0.70);font-size:10px;font-family:JetBrains Mono,monospace;cursor:pointer;">2**3 + 4*5 - 6/2</button>
              <button class="bod-eg" data-v="100 / (2 + 3) ** 2" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.30);background:rgba(99,102,241,0.08);color:rgba(165,180,252,0.70);font-size:10px;font-family:JetBrains Mono,monospace;cursor:pointer;">100 / (2 + 3) ** 2</button>
            </div>
            <div id="bodOut" style="font-size:12.5px;line-height:1.9;"></div>
          </div>
          <script>
          (function(){
            function fmt(n){ return Number.isInteger(n)?String(n):parseFloat(n.toPrecision(6)).toString(); }

            // ── Tokeniser ──────────────────────────────────────────────────
            function tokenise(str){
              const tok=[];
              let i=0;
              while(i<str.length){
                if(/\s/.test(str[i])){i++;continue;}
                if(/[0-9.]/.test(str[i])){
                  let n='';
                  while(i<str.length&&/[0-9.]/.test(str[i]))n+=str[i++];
                  tok.push({t:'NUM',v:parseFloat(n)});continue;
                }
                if(str[i]==='*'&&str[i+1]==='*'){tok.push({t:'POW'});i+=2;continue;}
                if(str[i]==='*'){tok.push({t:'MUL'});i++;continue;}
                if(str[i]==='/'){tok.push({t:'DIV'});i++;continue;}
                if(str[i]==='+'){tok.push({t:'ADD'});i++;continue;}
                if(str[i]==='-'){tok.push({t:'SUB'});i++;continue;}
                if(str[i]==='('){tok.push({t:'LP'});i++;continue;}
                if(str[i]===')'){tok.push({t:'RP'});i++;continue;}
                if(str[i]==='^'){tok.push({t:'POW'});i++;continue;}
                throw new Error('Onbekende karakter: "'+str[i]+'"');
              }
              return tok;
            }

            // ── Parser (recursive descent) ─────────────────────────────────
            function parse(tokens){
              let p=0;
              const peek=()=>tokens[p];
              const eat=()=>tokens[p++];
              const expect=t=>{const k=eat();if(!k||k.t!==t)throw new Error('Verwag '+t);return k;};

              function expr(){return addSub();}
              function addSub(){
                let l=mulDiv();
                while(peek()&&(peek().t==='ADD'||peek().t==='SUB')){
                  const op=eat().t;l={t:'bin',op,l,r:mulDiv()};
                }return l;
              }
              function mulDiv(){
                let l=pow();
                while(peek()&&(peek().t==='MUL'||peek().t==='DIV')){
                  const op=eat().t;l={t:'bin',op,l,r:pow()};
                }return l;
              }
              function pow(){
                let b=unary();
                if(peek()&&peek().t==='POW'){eat();return{t:'bin',op:'POW',l:b,r:pow()};}
                return b;
              }
              function unary(){
                if(peek()&&peek().t==='SUB'){eat();return{t:'neg',a:unary()};}
                return atom();
              }
              function atom(){
                const k=peek();
                if(!k)throw new Error('Onverwagte einde van uitdrukking');
                if(k.t==='NUM'){eat();return{t:'num',v:k.v};}
                if(k.t==='LP'){
                  eat();const inner=expr();expect('RP');return{t:'par',inner};
                }
                throw new Error('Onverwagte simbool: '+k.t);
              }
              const ast=expr();
              if(p<tokens.length)throw new Error('Onverwagte teks na uitdrukking');
              return ast;
            }

            // ── Pretty-printer ─────────────────────────────────────────────
            function pretty(n){
              if(n.t==='num') return n.v<0?'('+n.v+')':String(n.v);
              if(n.t==='neg') return '-'+pretty(n.a);
              if(n.t==='par') return '('+pretty(n.inner)+')';
              if(n.t==='bin'){
                const sym={ADD:'+',SUB:'−',MUL:'×',DIV:'÷',POW:'**'};
                return pretty(n.l)+' '+sym[n.op]+' '+pretty(n.r);
              }
            }

            // ── Evaluator (collects steps) ─────────────────────────────────
            function ev(node,steps){
              if(node.t==='num')  return node.v;
              if(node.t==='neg')  return -ev(node.a,steps);
              if(node.t==='par'){
                const before=pretty(node.inner);
                const val=ev(node.inner,steps);
                if(before!==String(val))
                  steps.push({lbl:'B',desc:'Hakies: ( '+before+' )  =  '+fmt(val),col:'#f59e0b'});
                return val;
              }
              if(node.t==='bin'){
                const l=ev(node.l,steps);
                const r=ev(node.r,steps);
                let res,lbl,desc,col;
                if(node.op==='POW'){res=Math.pow(l,r);lbl='O';col='#a78bfa';
                  desc='Magte (eksponent): '+fmt(l)+' ** '+fmt(r)+'  =  '+fmt(res);}
                else if(node.op==='MUL'){res=l*r;lbl='M';col='#06b6d4';
                  desc='Vermenigvuldiging: '+fmt(l)+' × '+fmt(r)+'  =  '+fmt(res);}
                else if(node.op==='DIV'){
                  if(r===0)throw new Error('Deling deur nul');
                  res=l/r;lbl='D';col='#06b6d4';
                  desc='Deling: '+fmt(l)+' ÷ '+fmt(r)+'  =  '+fmt(res);}
                else if(node.op==='ADD'){res=l+r;lbl='A';col='#6ee7b7';
                  desc='Optelling: '+fmt(l)+' + '+fmt(r)+'  =  '+fmt(res);}
                else if(node.op==='SUB'){res=l-r;lbl='S';col='#6ee7b7';
                  desc='Aftrekking: '+fmt(l)+' − '+fmt(r)+'  =  '+fmt(res);}
                steps.push({lbl,desc,col});
                return res;
              }
            }

            // ── Main evaluate function ──────────────────────────────────────
            function evaluate(){
              const raw=document.getElementById('bodInput').value.trim();
              const el=document.getElementById('bodOut');
              if(!raw){el.innerHTML='';return;}
              // Normalise friendly symbols to JS operators
              const expr=raw.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/\^/g,'**');
              try{
                const steps=[];
                const result=ev(parse(tokenise(expr)),steps);
                let html='<div style="color:rgba(221,225,240,0.38);font-size:11px;margin-bottom:10px;">'+
                  'Uitdrukking: <span style="color:#fcd34d;">'+raw+'</span></div>';
                if(steps.length===0){
                  html+='<div style="color:rgba(221,225,240,0.50);">Enkele waarde — niks om te vereenvoudig nie.</div>';
                } else {
                  steps.forEach(s=>{
                    html+='<div style="display:flex;gap:10px;align-items:baseline;margin-bottom:3px;">'
                      +'<span style="font-family:Syne,sans-serif;font-weight:800;font-size:11px;color:'+s.col
                      +';width:14px;flex-shrink:0;text-align:center;">'+s.lbl+'</span>'
                      +'<span style="color:rgba(221,225,240,0.78);font-family:JetBrains Mono,monospace;font-size:12px;">'+s.desc+'</span>'
                      +'</div>';
                  });
                }
                html+='<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);">'
                  +'<span style="color:rgba(221,225,240,0.45);">Antwoord: </span>'
                  +'<span style="color:#6ee7b7;font-size:17px;font-weight:700;font-family:JetBrains Mono,monospace;">'+fmt(result)+'</span>'
                  +'</div>';
                el.innerHTML=html;
              }catch(e){
                el.innerHTML='<span style="color:#fca5a5;">⚠ '+e.message+'. Gebruik: getalle, + − * / ** ( )</span>';
              }
            }

            document.getElementById('bodCalc').addEventListener('click',evaluate);
            document.getElementById('bodInput').addEventListener('keydown',e=>{if(e.key==='Enter')evaluate();});
            // Use event delegation on the parent so it works after innerHTML injection
            document.getElementById('bodInput').closest('.def-box').addEventListener('click',function(e){
              const btn=e.target.closest('.bod-eg');
              if(btn){ document.getElementById('bodInput').value=btn.dataset.v; evaluate(); }
            });
            evaluate();
          })();
          </script>
        `
    },
    questions: [
      { type: "input", text: "Bereken: <span class='math'>(−2)³ + (−3) × (−4)</span>", answer: "4", topic: "Gemengde bewerkings" },
      { type: "mc", text: "Wat is <span class='math'>−5² + (−3)²</span>?", options: ["−16", "4", "−34", "34"], answer: 1, topic: "Gemengde bewerkings" },
      { type: "input", text: "Bereken: <span class='math'>[(−6) ÷ 2] × (−3) − (−1)</span>", answer: "10", topic: "Gemengde bewerkings" },
      { type: "mc", text: "Bereken <span class='math'>(−2) × 3 − (−4) × (−2)</span>", options: ["−14", "−2", "2", "14"], answer: 0, topic: "Gemengde bewerkings" },
      { type: "input", text: "Bereken: <span class='math'>(−6 + 2)² − (−3)³ ÷ 3</span>", answer: "25", topic: "Gemengde bewerkings" },
      { type: "mc", text: "Sonder om die volle waarde te bereken, wat is die teken van <span class='math'>(−2)⁵ × (−3)² ÷ (−6)</span>?", options: ["Positief", "Negatief", "Nul", "Kan nie bepaal word nie"], answer: 0, topic: "Gemengde bewerkings" },
    ]
  },
  {
    id: 210,
    chapter: 2,
    name: "Hfst 2 Eksamenfokus",
    fullName: "Eksamenfokus-oefening",
    lesson: {
      heading: "Hoofstuk 2 — Eksamenfokus",
      sub: "Hoofstuk 2 · Hersiening",
      body: `
        <p>Hierdie vrae is in eksamenstyl en meng al die onderwerpe van Hoofstuk 2. Werk noukeurig, wys al die stappe.</p>
        <div class="def-box">
          <div class="def-box-title">📋 Hoofstuk 2-opsomming</div>
          <p>
            ✅ Heelgetalle strek van −∞ tot +∞<br>
            ✅ Groter = verder regs op die getallelyn<br>
            ✅ Optel: selfde tekens → tel op, hou; verskillende tekens → trek af, hou die groter teken<br>
            ✅ Aftrek: verander na optelling van die teenoorgestelde<br>
            ✅ Vermenigvuldig/deel: selfde tekens → +, verskillende tekens → −<br>
            ✅ Die kwadraat van enige heelgetal is positief; die kubus hou die teken<br>
            ✅ Gebruik BODMAS saam met die tekenreëls vir heelgetalle
          </p>
        </div>
        <div class="tip-box"><span class="tip-icon">💡</span><span>Foute met heelgetalle is byna altyd tekenfoute. Skryf die teken duidelik in elke stap.</span></div>
      `
    },
    questions: [
      { type: "input", text: "Bereken: <span class='math'>(−3) × (−4) − (−2)³ ÷ (−4)</span>", answer: "10", topic: "Gemeng" },
      { type: "mc", text: "Rangskik in stygende volgorde: <span class='math'>−7, 2, −1, 0, −4</span>", options: ["−7, −4, −1, 0, 2", "2, 0, −1, −4, −7", "−1, −4, −7, 0, 2", "0, −1, −4, −7, 2"], answer: 0, topic: "Rangskikking" },
      { type: "input", text: "Bereken: <span class='math'>√36 − (−2)² × 3 + (−18) ÷ (−3)</span>", answer: "0", topic: "Gemeng" },
      { type: "mc", text: "Die temperatuur het gedaal van 3°C na −8°C. Met hoeveel grade het dit gedaal?", options: ["5°C", "11°C", "−11°C", "−5°C"], answer: 1, topic: "Gemeng" },
      { type: "input", text: "Bereken: <span class='math'>(−1)¹⁰⁰</span>  (wenk: ewe mag van −1)", answer: "1", topic: "Magte" },
      { type: "input", text: "'n Duikboot begin by −85 m (85 m onder die oppervlak). Dit styg 3 m elke minuut vir 12 minute, en duik dan 4 m elke minuut vir die volgende 5 minute. In vergelyking met sy beginndiepte, hoeveel meter hoër is dit nou?", answer: "16", topic: "Gemeng" },
    ]
  }
  ],
  workbook: {
    chapter: 2, chapterName: "Heelgetalle",
    topics: [
      {
        name: "Bewerkings met heelgetalle",
        questions: [
          {
            num: "1",
            text: "Bereken, en wys alle berekeninge:",
            parts: [
              { label: "a)", text: "(−8) + (−5) − (−12)", marks: 2 },
              { label: "b)", text: "(−4) × (−3) + (−2) × 5", marks: 3 },
              { label: "c)", text: "(−36) ÷ (−9) − (−2)³", marks: 3 },
              { label: "d)", text: "(−3)² − [(−2) × (−4) + (−10) ÷ 5]", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Magte & wortels van heelgetalle",
        questions: [
          {
            num: "2",
            text: "Bereken sonder 'n sakrekenaar:",
            parts: [
              { label: "a)", text: "(−5)³", marks: 1 },
              { label: "b)", text: "(−2)⁴ + (−3)²", marks: 2 },
              { label: "c)", text: "∛(−125)", marks: 2 },
              { label: "d)", text: "√144 − (−1)¹⁰¹", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Gemengde eksamenstyl",
        questions: [
          {
            num: "3",
            text: "Die temperatuur in Johannesburg was −3°C om middernag. Teen die middag het dit met 17°C gestyg, en toe teen 6 nm met 8°C gedaal.",
            parts: [
              { label: "a)", text: "Wat was die temperatuur teen die middag?", marks: 2 },
              { label: "b)", text: "Wat was die temperatuur om 6 nm?", marks: 2 },
              { label: "c)", text: "Wat was die totale verandering vanaf middernag tot 6 nm?", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 2, chapterName: "Hoofstuk 2 — Heelgetalle",
    topics: [
      {
        name: "Bewerkings met heelgetalle",
        answers: [
          { num: "Q1a", ans: "−1", note: "(−8)+(−5) = −13; −13−(−12) = −13+12 = −1" },
          { num: "Q1b", ans: "2", note: "12 + (−10) = 2" },
          { num: "Q1c", ans: "12", note: "(−36)÷(−9) = 4; (−2)³=−8; 4−(−8)=12" },
          { num: "Q1d", ans: "3", note: "9 − [8 + (−2)] = 9 − 6 = 3" },
        ]
      },
      {
        name: "Magte & wortels van heelgetalle",
        answers: [
          { num: "Q2a", ans: "−125", note: "Onewe mag van 'n negatiewe getal = negatief" },
          { num: "Q2b", ans: "25", note: "16 + 9 = 25" },
          { num: "Q2c", ans: "−5", note: "Kubuswortel van 'n negatiewe getal = negatief" },
          { num: "Q2d", ans: "13", note: "√144 = 12; (−1)¹⁰¹ = −1; 12−(−1) = 13" },
        ]
      },
      {
        name: "Gemengde eksamenstyl",
        answers: [
          { num: "Q3a", ans: "14°C", note: "−3 + 17 = 14" },
          { num: "Q3b", ans: "6°C", note: "14 − 8 = 6" },
          { num: "Q3c", ans: "9°C styging", note: "6 − (−3) = 9°C toename" },
        ]
      },
    ]
  }
});
