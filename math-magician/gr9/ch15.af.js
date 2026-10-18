// Math Magician — Graad 9, Hoofstuk 15 data (Afrikaans)
// Oppervlak en Volume

MathMagician.registerChapter(15, {
  topics: [
    {
      id: 29,
      chapter: 15,
      name: "Oppervlak",
      fullName: "Oppervlak van prismas en silinders",
      lesson: {
        heading: "Oppervlak van 3D-voorwerpe",
        sub: "Hoofstuk 15 · Onderwerp 1",
        body: `
          <p><strong>Oppervlak</strong> is die totale oppervlakte van al die vlakke van 'n 3D-voorwerp. Verbeel jou dat die vorm uitgevou word in 'n net.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Oppervlakformules</div>
            <p>
              <strong>Reghoekige prisma (kubusvorm):</strong><br>
              OV = 2(lw + lh + wh)<br><br>
              <strong>Kubus:</strong> OV = 6s²<br><br>
              <strong>Driehoekige prisma:</strong><br>
              OV = 2 × (oppervlakte van driehoek) + 3 × (oppervlakte van reghoeke)<br><br>
              <strong>Silinder:</strong><br>
              OV = 2πr² + 2πrh = 2πr(r + h)<br><br>
              <strong>Keël:</strong> OV = πr² + πrl (l = skuinshoogte)<br><br>
              <strong>Sfeer:</strong> OV = 4πr²
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Silinder-voorbeeld</div>
            <div class="example-step"><span class="step-num">1</span><span>r = 4 cm, h = 10 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>OV = 2π(4)² + 2π(4)(10) = 32π + 80π = 112π ≈ 351,86 cm²</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Oppervlak is die totale oppervlakte van al die vlakke van 'n 3D-vorm — dink daaraan as die hoeveelheid toedraaipapier wat nodig is om dit te bedek.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Oppervlakberekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n 3D-voorwerp en voer sy afmetings in. Sien die formule, elke vlak se oppervlakte, en die totale oppervlak.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Voorwerp</label>
                <select id="saShape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="cube">Kubus</option>
                  <option value="rect">Reghoekige prisma</option>
                  <option value="tri">Driehoekige prisma</option>
                  <option value="cyl">Silinder</option>
                </select>
              </div>
              <div id="saInputs" style="display:flex;gap:8px;flex-wrap:wrap;"></div>
              <button id="saBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="saOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var solids={
              cube:{labels:['Sy (s)'],defaults:[5],formula:'OV = 6s²',
                calc:function(v){var s=v[0];return {total:6*s*s,faces:['6 vierkante: 6 × '+s+'² = '+6*s*s]};} },
              rect:{labels:['Lengte (l)','Breedte (w)','Hoogte (h)'],defaults:[8,5,4],formula:'OV = 2(lw + lh + wh)',
                calc:function(v){var l=v[0],w=v[1],h=v[2];var lw=l*w,lh=l*h,wh=w*h;return{total:2*(lw+lh+wh),faces:['2 × lw = 2×'+lw+' = '+2*lw,'2 × lh = 2×'+lh+' = '+2*lh,'2 × wh = 2×'+wh+' = '+2*wh]};} },
              tri:{labels:['Basis (b)','Hoogte van driehoek (h)','Lengte (l)','Skuinssye (s1, s2)','s2'],defaults:[6,4,10,5,5],formula:'OV = bh + l(b + s1 + s2)',
                calc:function(v){var b=v[0],h=v[1],l=v[2],s1=v[3],s2=v[4];var bases=b*h,rect1=l*b,rect2=l*s1,rect3=l*s2;return{total:bases+rect1+rect2+rect3,faces:['2 driehoekige vlakke: '+b+'×'+h+' = '+bases,'Reghoekige basis: '+l+'×'+b+' = '+rect1,'Sykant 1: '+l+'×'+s1+' = '+rect2,'Sykant 2: '+l+'×'+s2+' = '+rect3]};} },
              cyl:{labels:['Radius (r)','Hoogte (h)'],defaults:[4,10],formula:'OV = 2πr² + 2πrh',
                calc:function(v){var r=v[0],h=v[1];var circles=2*Math.PI*r*r,lateral=2*Math.PI*r*h;return{total:circles+lateral,faces:['2 sirkels: 2π('+r+')² = '+circles.toFixed(3),'Geboë oppervlak: 2π('+r+')('+h+') = '+lateral.toFixed(3)]};} },
            };
            function setShape(){
              var key=document.getElementById('saShape').value;var s=solids[key];
              document.getElementById('saInputs').innerHTML=s.labels.map(function(lbl,i){
                return '<div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">'+lbl+'</label><input class="saVal" type="number" value="'+s.defaults[i]+'" style="width:62px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>';
              }).join('');
            }
            function calc(){
              var key=document.getElementById('saShape').value;var s=solids[key];
              var vals=Array.from(document.querySelectorAll('.saVal')).map(function(el){return parseFloat(el.value)||0;});
              var res=s.calc(vals);
              document.getElementById('saOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Formule: </span><span style="color:#fbbf24;">'+s.formula+'</span></div>',
                res.faces.map(function(f){return '<div style="color:rgba(221,225,240,0.50);font-size:11px;">• '+f+'</div>';}).join(''),
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Totale OV: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+(typeof res.total==='number'&&res.total%1!==0?res.total.toFixed(3):res.total)+'</span> <span style="color:rgba(221,225,240,0.35);">eenhede²</span></div>',
              ].join('');
            }
            document.getElementById('saShape').addEventListener('change',function(){setShape();});
            document.getElementById('saBtn').addEventListener('click',calc);
            setShape();
          })();
          </script>
        Teken eers die net van die voorwerp. Tel elke vlak en bereken sy oppervlakte apart voordat jy dit bymekaartel.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Vind die oppervlak van 'n kubus met sy 5 cm.", answer: "150", topic: "Oppervlak" },
        { type: "mc", text: "'n Silinder het r = 3 cm en h = 7 cm. Sy oppervlak (met π ≈ 3,14) is ongeveer:", options: ["188,4 cm²", "94,2 cm²", "56,52 cm²", "376,8 cm²"], answer: 0, topic: "Oppervlak" },
        { type: "input", text: "'n Reghoekige prisma het l = 8, w = 5, h = 3 cm. Vind die oppervlak.", answer: "158", topic: "Oppervlak" },
        { type: "mc", text: "Die laterale oppervlak van 'n silinder (net die geboë kant, nie die ente nie) met r = 4 cm, h = 6 cm is:", options: ["150,72 cm²", "100,48 cm²", "50,24 cm²", "75,36 cm²"], answer: 0, topic: "Oppervlak" },
        { type: "input", text: "Vind die oppervlak van 'n sfeer met radius 6 cm. (Gebruik π ≈ 3,14; gee tot die naaste heelgetal)", answer: "452", topic: "Oppervlak" },
        { type: "input", text: "Die oppervlak van 'n kubus is 216 cm². Vind die sylengte (in cm).", answer: "6", topic: "Oppervlak" },
        { type: "input", text: "'n Silinder het 'n oppervlak van 314 cm² en radius 5 cm. Gebruik π ≈ 3,14 om sy hoogte te vind (in cm).", answer: "5", topic: "Oppervlak" },
      ]
    },
    {
      id: 30,
      chapter: 15,
      name: "Volume",
      fullName: "Volume van prismas, silinders en sfere",
      lesson: {
        heading: "Volume van 3D-voorwerpe",
        sub: "Hoofstuk 15 · Onderwerp 2",
        body: `
          <p><strong>Volume</strong> is die hoeveelheid 3D-ruimte wat 'n voorwerp beslaan, gemeet in kubieke eenhede (cm³, m³, ens.).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Volumeformules</div>
            <p>
              <strong>Prisma/Silinder:</strong> V = oppervlakte van basis × hoogte<br>
              • Reghoekige prisma: V = l × w × h<br>
              • Driehoekige prisma: V = ½bh × lengte<br>
              • Silinder: V = πr²h<br><br>
              <strong>Piramide/Keël:</strong> V = ⅓ × oppervlakte van basis × hoogte<br>
              • Vierkantige piramide: V = ⅓s²h<br>
              • Keël: V = ⅓πr²h<br><br>
              <strong>Sfeer:</strong> V = 4/3 πr³
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Silinder r = 5, h = 12: V = π(25)(12) = 300π ≈ 942,48 cm³</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Keël r = 6, h = 8: V = ⅓π(36)(8) = 96π ≈ 301,59 cm³</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Sfeer r = 3: V = 4/3π(27) = 36π ≈ 113,10 cm³</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Piramide-/keëlvolume = ⅓ × ( volume van die ooreenstemmende prisma/silinder). 'n Nuttige toets!</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; 3D-Volume en -Oppervlak</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Kies 'n voorwerp, voer afmetings in, en kry V en OV onmiddellik.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <select id="volShape4" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="cub">Reghoekige prisma</option>
                <option value="cyl">Silinder</option>
                <option value="cone">Keël</option>
                <option value="sph">Sfeer</option>
              </select>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="volL14">l</label><input id="volV14" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="volL24">w</label><input id="volV24" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="volL34">h</label><input id="volV34" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="volBtn4" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
            </div>
            <div id="volOut4" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var PI=Math.PI;function f(v){return Math.round(v*100)/100;}
            var cfg={cub:{l1:'l',l2:'w',l3:'h'},cyl:{l1:'r',l2:'h',l3:''},cone:{l1:'r',l2:'h',l3:''},sph:{l1:'r',l2:'',l3:''}};
            function setL(){var s=document.getElementById('volShape4').value;var c=cfg[s];document.getElementById('volL14').textContent=c.l1;document.getElementById('volL24').textContent=c.l2;document.getElementById('volL34').textContent=c.l3;document.getElementById('volV24').disabled=(s==='sph');document.getElementById('volV34').disabled=(s!=='cub');}
            function calc(){
              var s=document.getElementById('volShape4').value;
              var v1=parseFloat(document.getElementById('volV14').value)||0,v2=parseFloat(document.getElementById('volV24').value)||0,v3=parseFloat(document.getElementById('volV34').value)||0;
              var V,SA;
              if(s==='cub'){V=v1*v2*v3;SA=2*(v1*v2+v1*v3+v2*v3);}
              else if(s==='cyl'){V=PI*v1*v1*v2;SA=2*PI*v1*(v1+v2);}
              else if(s==='cone'){V=PI*v1*v1*v2/3;var sl=Math.sqrt(v1*v1+v2*v2);SA=PI*v1*(v1+sl);}
              else{V=4/3*PI*v1*v1*v1;SA=4*PI*v1*v1;}
              document.getElementById('volOut4').innerHTML='<div><span style="color:rgba(221,225,240,0.45);width:80px;display:inline-block;">Volume:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+f(V)+' eenhede\xb3</span></div><div><span style="color:rgba(221,225,240,0.45);width:80px;display:inline-block;">Oppervlak:</span><span style="color:#a5b4fc;">'+f(SA)+' eenhede\xb2</span></div>';
            }
            document.getElementById('volShape4').addEventListener('change',function(){setL();});
            document.getElementById('volBtn4').addEventListener('click',calc);
            ['volV14','volV24','volV34'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});
            setL();
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Vind die volume van 'n reghoekige prisma met afmetings 6 cm × 4 cm × 9 cm.", answer: "216", topic: "Volume" },
        { type: "mc", text: "Vind die volume van 'n silinder met r = 5 cm en h = 8 cm. (π ≈ 3,14)", options: ["628 cm³", "251,2 cm³", "502,4 cm³", "1256 cm³"], answer: 0, topic: "Volume" },
        { type: "input", text: "Vind die volume van 'n keël met r = 6 cm en h = 9 cm. (Gebruik π ≈ 3,14; gee tot die naaste heelgetal)", answer: "339", topic: "Volume" },
        { type: "mc", text: "'n Sfeer het radius 4 cm. Sy volume (π ≈ 3,14) is ongeveer:", options: ["200,96 cm³", "267,95 cm³", "803,84 cm³", "134,04 cm³"], answer: 1, topic: "Volume" },
        { type: "input", text: "'n Driehoekige prisma het 'n reghoekige-driehoek-basis met bene 6 cm en 8 cm. Sy lengte is 15 cm. Vind die volume.", answer: "360", topic: "Volume" },
        { type: "input", text: "'n Reghoekige prisma het 'n volume van 480 cm³. Sy lengte is 10 cm en sy breedte is 6 cm. Vind sy hoogte (in cm).", answer: "8", topic: "Volume" },
        { type: "input", text: "'n Silindriese tenk het 'n volume van 6 280 cm³ en 'n hoogte van 20 cm. Gebruik π ≈ 3,14 om sy radius te vind (in cm).", answer: "10", topic: "Volume" },
      ]
    },
    {
      id: 1501,
      chapter: 15,
      name: "Inhoudsmaat en eenhede van volume",
      fullName: "Volume en inhoudsmaat, en herleiding tussen SI-eenhede van volume",
      lesson: {
        heading: "Inhoudsmaat en eenhede van volume",
        sub: "Hoofstuk 15 · Onderwerp 3",
        body: `
<p><strong>Volume</strong> is die ruimte wat 'n voorwerp inneem. <strong>Inhoudsmaat</strong> is hoeveel 'n houer kan hou, gewoonlik in milliliter, liter en kiloliter gemeet.</p>
<div class="def-box">
  <div class="def-box-title">📖 Die verbande tussen die eenhede</div>
<p>1 cm³ = 1 000 mm³ &nbsp;·&nbsp; 1 m³ = 1 000 000 cm³<br><strong>1 cm³ = 1 ml</strong> &nbsp;·&nbsp; 1 000 cm³ = 1 l &nbsp;·&nbsp; <strong>1 m³ = 1 000 l = 1 kl</strong></p>
</div>
<div class="mf-fig" data-fig='{"t":"solid","kind":"cuboid","bw":120,"hh":70,"labels":{"l":"60 cm","b":"30 cm","h":"40 cm"},"w":260,"h":190}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: 'n vistenk</div>
  <div class="example-step"><span class="step-num">1</span><span>V = l × b × h = 60 × 30 × 40 = 72 000 cm³</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Inhoudsmaat = 72 000 ml = 72 000 ÷ 1 000 = <strong>72 liter</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: 'n silindriese watertenk</div>
  <div class="example-step"><span class="step-num">1</span><span>r = 0,5 m en h = 1,2 m: V = πr²h = π × 0,25 × 1,2 = 0,942 m³</span></div>
  <div class="example-step"><span class="step-num">2</span><span>0,942 m³ × 1 000 = <strong>942 liter</strong> (afgerond)</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Werk in een eenheid: as die lengtes in cm is, is die volume in cm³ = ml. Herlei eers aan die einde na liter.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Herlei 2,5 liter na milliliter.", "answer": "2500", "topic": "Inhoudsmaat en eenhede van volume"},
        {"type": "input", "text": "Herlei 3 m³ na liter.", "answer": "3000", "topic": "Inhoudsmaat en eenhede van volume"},
        {"type": "input", "text": "'n Boks hou 8 000 cm³. Hoeveel liter is dit?", "answer": "8", "topic": "Inhoudsmaat en eenhede van volume"},
        {"type": "input", "text": "'n Tenk is 50 cm × 40 cm × 30 cm. Wat is sy inhoudsmaat in liter?", "answer": "60", "topic": "Inhoudsmaat en eenhede van volume"},
        {"type": "input", "text": "'n Silinder het r = 10 cm en h = 30 cm. Wat is sy inhoudsmaat in liter, tot 2 desimale plekke?", "answer": "9.42", "altAnswers": ["9,42"], "topic": "Inhoudsmaat en eenhede van volume"},
        {"type": "input", "text": "Herlei 4 500 mm³ na cm³.", "answer": "4.5", "altAnswers": ["4,5"], "topic": "Inhoudsmaat en eenhede van volume"},
        { type: "input", text: "'n Reghoekige vistenk is 60 cm lank, 30 cm breed en 40 cm hoog. Dit word gevul tot 5 cm onder die bokant. Hoeveel liter water is daarin?", answer: "63", topic: "Inhoudsmaat en eenhede van volume" }
      ]
    },
    {
      id: 1502,
      chapter: 15,
      name: "Afmetings verander: volume en buite-oppervlakte",
      fullName: "Hoe die verandering van die afmetings van prismas en silinders hul volume en buite-oppervlakte beïnvloed",
      lesson: {
        heading: "Afmetings verander: volume en buite-oppervlakte",
        sub: "Hoofstuk 15 · Onderwerp 4",
        body: `
<p>As elke lengte van 'n liggaam met k vermenigvuldig word, word die buite-oppervlakte met k² en die volume met k³ vermenigvuldig. As net <em>een</em> afmeting verander, verander die volume net met daardie faktor.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":300,"h":160,"view":[-0.5,-0.9,9.5,5],"pts":{"a":[0,0],"b":[2,0],"c":[2,2],"d":[0,2],"a2":[0.8,0.7],"b2":[2.8,0.7],"c2":[2.8,2.7],"d2":[0.8,2.7],"e":[4.5,0],"f":[8.5,0],"g":[8.5,4],"h":[4.5,4],"f2":[9.3,0.7],"g2":[9.3,4.7],"h2":[5.3,4.7]},"nolab":["a","b","c","d","a2","b2","c2","d2","e","f","g","h","f2","g2","h2"],"seg":[["a","b"],["b","c"],["c","d"],["d","a"],["b","b2"],["c","c2"],["d","d2"],["b2","c2"],["c2","d2"],["e","f"],["f","g"],["g","h"],["h","e"],["f","f2"],["g","g2"],["h","h2"],["f2","g2"],["g2","h2"]],"txt":[[1,-0.6,"2 cm","or"],[6.5,-0.6,"4 cm","or"],[1.4,3.3,"V = 8 cm³","mu"],[6.9,5.1,"V = 64 cm³","mu"]],"cap":"Verdubbel elke rand: die volume is 2³ = 8 keer so groot."}'></div>
<div class="math-block">kubus sy 2 cm: BO = 6 × 4 = 24 cm²,  V = 8 cm³
kubus sy 4 cm: BO = 6 × 16 = 96 cm² (× 4),  V = 64 cm³ (× 8)</div>
<div class="example-box">
  <div class="example-box-title">✏️ Voorbeeld: net die radius verdubbel</div>
  <div class="example-step"><span class="step-num">1</span><span>'n Silinder se radius word verdubbel; sy hoogte bly dieselfde.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>V = πr²h: r² word (2r)² = 4r², so die volume is <strong>4 keer</strong> so groot.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Lengtes ×k, oppervlaktes ×k², volumes ×k³: tel die dimensies in die eenheid (cm, cm², cm³).</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Al die afmetings van 'n boks word verdubbel. Hoeveel keer neem sy volume toe?", "answer": "8", "topic": "Afmetings verander: volume en buite-oppervlakte"},
        {"type": "input", "text": "Net die hoogte van 'n boks word verdubbel. Hoeveel keer neem sy volume toe?", "answer": "2", "topic": "Afmetings verander: volume en buite-oppervlakte"},
        {"type": "input", "text": "'n Silinder se radius word verdubbel en sy hoogte bly dieselfde. Hoeveel keer neem sy volume toe?", "answer": "4", "topic": "Afmetings verander: volume en buite-oppervlakte"},
        {"type": "input", "text": "Die sye van 'n kubus word verdriedubbel. Hoeveel keer neem sy buite-oppervlakte toe?", "answer": "9", "topic": "Afmetings verander: volume en buite-oppervlakte"},
        {"type": "input", "text": "'n Kubus het 'n volume van 27 cm³. Sy sye word verdubbel. Wat is die nuwe volume? (cm³)", "answer": "216", "topic": "Afmetings verander: volume en buite-oppervlakte"},
        {"type": "input", "text": "'n Boks van 2 cm × 3 cm × 4 cm word vergroot sodat elke afmeting verdubbel. Wat is sy nuwe volume? (cm³)", "answer": "192", "topic": "Afmetings verander: volume en buite-oppervlakte"},
        { type: "input", text: "'n Silindriese blik hou 1 liter. 'n Tweede blik het twee keer die radius en die helfte van die hoogte. Hoeveel liter hou die tweede blik?", answer: "2", topic: "Afmetings verander: volume en buite-oppervlakte" }
      ]
    },
    {
      id: 1503,
      chapter: 15,
      name: "Hfst 15 Eksamenfokus",
      fullName: "Eksamenoefening: buite-oppervlakte en volume",
      lesson: {
        heading: "Hfst 15 Eksamenfokus",
        sub: "Hoofstuk 15 · Onderwerp 5",
        body: `
<p>Hierdie vrae meng die hele hoofstuk, soos 'n toets doen. Skryf die formule, vervang met eenhede, en sê of die antwoord cm² (oppervlakte) of cm³ (volume) is.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Skryf die reël of formule neer wat jy gebruik, vervang dan, en gee die antwoord met eenhede. Punte word vir elke stap gegee.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "'n Driehoekige prisma het 'n driehoek met basis 6 cm en hoogte 4 cm, en lengte 10 cm. Wat is sy volume? (cm³)", "answer": "120", "topic": "Hfst 15 Eksamenfokus"},
        {"type": "input", "text": "Wat is die buite-oppervlakte van 'n kubus met sye van 5 cm? (cm²)", "answer": "150", "topic": "Hfst 15 Eksamenfokus"},
        {"type": "input", "text": "'n Silinder het r = 3 cm en h = 7 cm. Wat is sy volume, tot 2 desimale plekke? (cm³)", "answer": "197.92", "altAnswers": ["197,92"], "topic": "Hfst 15 Eksamenfokus"},
        {"type": "input", "text": "Wat is die buite-oppervlakte van 'n reghoekige prisma van 8 cm × 5 cm × 3 cm? (cm²)", "answer": "158", "topic": "Hfst 15 Eksamenfokus"},
        {"type": "mc", "text": "1 kl is gelyk aan:", "options": ["100 l", "1 000 cm³", "1 m³", "10 m³"], "answer": 2, "topic": "Hfst 15 Eksamenfokus"},
        { type: "input", text: "'n Silindriese glas (radius 3 cm, hoogte 10 cm) is vol water. Die water word in 'n leë reghoekige houer met 'n basis van 10 cm × 6 cm gegooi. Hoe diep is die water in die houer, tot 1 desimale plek? (cm, gebruik π = 3,14)", answer: "4.7", altAnswers: ["4,7"], topic: "Hfst 15 Eksamenfokus" }
      ]
    },
  ],
  workbook: {
    chapter: 15, chapterName: "Oppervlak en Volume",
    topics: [
      {
        name: "Oppervlak",
        questions: [
          {
            num: "1",
            text: "Bereken die oppervlak van elke voorwerp. (Gebruik π = 3,14 waar nodig)",
            parts: [
              { label: "a)", text: "'n Reghoekige prisma met l = 12 cm, w = 8 cm en h = 5 cm.", marks: 4 },
              { label: "b)", text: "'n Silinder met r = 6 cm en h = 10 cm.", marks: 4 },
              { label: "c)", text: "'n Sfeer met radius 5 cm.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Volume",
        questions: [
          {
            num: "2",
            text: "Bereken die volume van elke voorwerp. (Gebruik π = 3,14 waar nodig)",
            parts: [
              { label: "a)", text: "'n Silinder met r = 7 cm en h = 15 cm.", marks: 3 },
              { label: "b)", text: "'n Keël met r = 9 cm en h = 12 cm.", marks: 3 },
              { label: "c)", text: "'n Sfeer met deursnee 10 cm.", marks: 3 },
            ]
          },
          {
            num: "3",
            text: "'n Silindriese watertenk het 'n radius van 1,2 m en 'n hoogte van 2,5 m.",
            parts: [
              { label: "a)", text: "Bereken die volume water wat dit kan hou (in m³).", marks: 3 },
              { label: "b)", text: "Skakel jou antwoord om na liter (1 m³ = 1 000 liter).", marks: 1 },
            ]
          },
        ]
      },
      {
        "name": "Inhoudsmaat en eenhede van volume",
        "questions": [
          {
            "num": "4",
            "text": "'n Silindriese watertenk het 'n radius van 0,7 m en 'n hoogte van 1,5 m.",
            "parts": [
              {
                "label": "a)",
                "text": "Bereken sy volume in m³.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "Hoeveel liter water kan dit hou?",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "'n Nuwe tenk het die dubbele radius en die dubbele hoogte. Hoeveel keer die volume is dit?",
                "marks": 2
              }
            ]
          }
        ]
      },
    ]
  },
  answerKey: {
    chapter: 15, chapterName: "Hoofstuk 15 — Oppervlak en Volume",
    topics: [
      {
        name: "Oppervlak",
        answers: [
          { num: "Q1a", ans: "392 cm²", note: "2(96+60+40) = 2×196 = 392" },
          { num: "Q1b", ans: "602,88 cm² (≈ 603 cm²)", note: "2×3,14×36 + 2×3,14×6×10 = 226,08+376,8 = 602,88 ≈ 603 cm²" },
          { num: "Q1c", ans: "314 cm²", note: "4×3,14×25 = 314" },
        ]
      },
      {
        name: "Volume",
        answers: [
          { num: "Q2a", ans: "2 307,9 cm³", note: "3,14×49×15 = 2 307,9" },
          { num: "Q2b", ans: "1 017,36 cm³", note: "⅓×3,14×81×12 = 1 017,36" },
          { num: "Q2c", ans: "523,33 cm³", note: "r=5; 4/3×3,14×125 = 523,33" },
          { num: "Q3a", ans: "≈ 11,31 m³", note: "3,14×1,44×2,5 = 11,304" },
          { num: "Q3b", ans: "≈ 11 304 liter", note: "11,304 × 1 000" },
        ]
      },
      {
        "name": "Inhoudsmaat en eenhede van volume",
        "answers": [
          {
            "num": "Q4a",
            "ans": "≈ 2,31 m³",
            "note": "π × 0,49 × 1,5 = 2,309"
          },
          {
            "num": "Q4b",
            "ans": "≈ 2 309 liter",
            "note": "1 m³ = 1 000 l"
          },
          {
            "num": "Q4c",
            "ans": "8 keer (≈ 18,47 m³)",
            "note": "r² × 4 en h × 2"
          }
        ]
      },
    ]
  }
});
