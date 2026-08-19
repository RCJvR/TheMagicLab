// Math Magician — Grade 8, Chapter 9 data (Afrikaans)
// Meetkunde van Reguit Lyne

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 901,
      chapter: 9,
      name: "Lyne en hoeke",
      fullName: "Die meetkunde van lyne en hoeke",
      lesson: {
        heading: "Die meetkunde van lyne en hoeke",
        sub: "Hoofstuk 9 · Onderwerp 1",
        body: `
          <p>Meetkunde van reguit lyne behels om te verstaan hoe lyne en hoeke benoem, geklassifiseer en gemeet word. Dit is die grondslag vir alle verdere meetkunde.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelwoordeskat</div>
            <p>
              <strong>Lyn:</strong> strek oneindig in albei rigtings. Geskryf as ←→ of benoem met twee punte, bv. AB.<br>
              <strong>Lynstuk:</strong> 'n deel van 'n lyn met twee eindpunte. bv. <span class="math">AB</span> met lengte <span class="math">AB = 5 cm</span>.<br>
              <strong>Straal:</strong> begin by 'n punt en strek oneindig in een rigting.<br><br>
              <strong>Hoek:</strong> gevorm deur twee strale wat 'n gemeenskaplike eindpunt (hoekpunt) deel.<br>
              <strong>Notasie:</strong> <span class="math">Â</span> of <span class="math">∠BAC</span> of <span class="math">∠A</span>. Die middelste letter is altyd die hoekpunt.<br><br>
              <strong>Tipes hoeke:</strong><br>
              &nbsp;&nbsp;• <strong>Skerp hoek:</strong> 0° &lt; hoek &lt; 90°<br>
              &nbsp;&nbsp;• <strong>Regte hoek:</strong> presies 90° (getoon met 'n vierkantige hoeksimbool)<br>
              &nbsp;&nbsp;• <strong>Stomp hoek:</strong> 90° &lt; hoek &lt; 180°<br>
              &nbsp;&nbsp;• <strong>Gestrekte hoek:</strong> presies 180° ('n reguit lyn)<br>
              &nbsp;&nbsp;• <strong>Refleks hoek:</strong> 180° &lt; hoek &lt; 360°<br>
              &nbsp;&nbsp;• <strong>Omwenteling:</strong> presies 360°
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Benoeming en klassifisering van hoeke</div>
            <div class="example-step"><span class="step-num">1</span><span>Drie punte: A, B (hoekpunt), C → hoek word geskryf <span class="math">∠ABC</span> of <span class="math">B̂</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>As <span class="math">∠ABC = 65°</span> → is dit 'n <strong>skerp</strong> hoek (tussen 0° en 90°)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>As <span class="math">∠ABC = 130°</span> → is dit 'n <strong>stomp</strong> hoek (tussen 90° en 180°)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>As <span class="math">∠ABC = 220°</span> → is dit 'n <strong>refleks</strong> hoek (tussen 180° en 360°)</span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Hoeke meet</div>
            <p>
              'n <strong>Gradeboog</strong> word gebruik om hoeke in grade (°) te meet.<br>
              Plaas die middelpunt van die gradeboog op die hoekpunt en belyn die basislyn met een arm van die hoek.<br>
              Lees die skaal vanaf 0° in die rigting van die eerste arm.
            </p>
          </div>

          <div style="overflow-x:auto;margin:14px 0;">
            <svg viewBox="0 0 520 115" style="width:100%;max-width:520px;border-radius:8px;background:rgba(10,15,30,0.50);">
              <text x="52" y="13" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">SKERP</text>
              <line x1="42" y1="80" x2="97" y2="80" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="42" y1="80" x2="69.5" y2="40.7" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <path d="M42,80 L62.0,80.0 A20,20 0 0,0 53.5,63.6 Z" fill="rgba(99,102,241,0.25)" stroke="#6366f1" stroke-width="1"/>
              <text x="70.4" y="68.2" text-anchor="middle" font-size="8.5" fill="#6366f1" font-family="JetBrains Mono,monospace">55°</text>
              <text x="156" y="13" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">REGTE</text>
              <line x1="146" y1="80" x2="201" y2="80" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="146" y1="80" x2="146" y2="30" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <rect x="146" y="68" width="12" height="12" fill="none" stroke="#6ee7b7" stroke-width="1.2"/>
              <text x="164" y="77" font-size="8.5" fill="#6ee7b7" font-family="JetBrains Mono,monospace">90°</text>
              <text x="260" y="13" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">STOMP</text>
              <line x1="250" y1="80" x2="305" y2="80" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="250" y1="80" x2="219.1" y2="43.2" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <path d="M250,80 L270.0,80.0 A20,20 0 0,0 237.1,64.7 Z" fill="rgba(245,158,11,0.22)" stroke="#fbbf24" stroke-width="1"/>
              <text x="263.5" y="54.0" text-anchor="middle" font-size="8.5" fill="#fbbf24" font-family="JetBrains Mono,monospace">130°</text>
              <text x="364" y="13" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">GESTREK</text>
              <line x1="312" y1="80" x2="409" y2="80" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <path d="M354,80 L374,80 A20,20 0 0,0 334,80 Z" fill="rgba(16,185,129,0.15)" stroke="#6ee7b7" stroke-width="1"/>
              <text x="354" y="55" text-anchor="middle" font-size="8.5" fill="#6ee7b7" font-family="JetBrains Mono,monospace">180°</text>
              <text x="468" y="13" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">REFLEKS</text>
              <line x1="458" y1="80" x2="513" y2="80" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="458" y1="80" x2="441.6" y2="125.1" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <path d="M458,80 L480.0,80.0 A22,22 0 1,0 450.5,100.7 Z" fill="rgba(239,68,68,0.18)" stroke="#fca5a5" stroke-width="1"/>
              <text x="438.5" y="55.1" text-anchor="middle" font-size="8.5" fill="#fca5a5" font-family="JetBrains Mono,monospace">250°</text>
            </svg>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Gee altyd die rede vir elke hoekberekening in meetkunde. bv. "hoeke op 'n reguit lyn" of "regoorstaande hoeke". Redes verdien punte in eksamens.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Hoek-klassifiseerder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Voer 'n hoek in om dit te klassifiseer, en vind sy komplement en supplement.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <input id="angVal" type="number" value="65" min="0" max="360" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:22px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="font-size:16px;color:#a5b4fc;font-family:JetBrains Mono,monospace;">°</span>
              <svg id="angSvg" viewBox="0 0 120 80" style="width:120px;height:80px;flex-shrink:0;"></svg>
            </div>
            <div id="angOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function update(){
              const deg=parseFloat(document.getElementById('angVal').value)||0;
              const rad=deg*Math.PI/180;
              // SVG arc
              const svg=document.getElementById('angSvg');
              const cx=15,cy=65,r=50;
              const ex=cx+r*Math.cos(-rad),ey=cy+r*Math.sin(-rad);
              const large=deg>180?1:0;
              const arcD=deg>=360?
                'M '+cx+' '+cy+' m -'+r+' 0 a '+r+' '+r+' 0 1 1 0.001 0':
                'M '+cx+' '+cy+' L '+(cx+r)+' '+cy+' A '+r+' '+r+' 0 '+large+' 0 '+ex.toFixed(1)+' '+ey.toFixed(1)+' Z';
              let colour=deg<=90?'rgba(99,102,241,0.40)':deg<=180?'rgba(245,158,11,0.40)':'rgba(239,68,68,0.30)';
              svg.innerHTML=
                '<path d="'+arcD+'" fill="'+colour+'"/>'+
                '<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r)+'" y2="'+cy+'" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>'+
                (deg<360?'<line x1="'+cx+'" y1="'+cy+'" x2="'+ex.toFixed(1)+'" y2="'+ey.toFixed(1)+'" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>':'')+
                '<text x="'+(cx+r*0.55*Math.cos(-rad/2)).toFixed(0)+'" y="'+(cy+r*0.55*Math.sin(-rad/2)-2).toFixed(0)+'" fill="#fcd34d" font-size="10" font-family="JetBrains Mono,monospace" text-anchor="middle">'+deg+'°</text>';
              let type='';
              if(deg===0)type='Nul-hoek';
              else if(deg<90)type='Skerp';
              else if(deg===90)type='Regte hoek';
              else if(deg<180)type='Stomp';
              else if(deg===180)type='Gestrekte hoek';
              else if(deg<360)type='Refleks';
              else type='Omwenteling (volle draai)';
              const comp=90-deg,supp=180-deg;
              document.getElementById('angOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Tipe:</span><span style="color:#fbbf24;">'+type+'</span></div>',
                deg<=90?'<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Komplement:</span><span style="color:#6ee7b7;">'+comp+'°</span> <span style="color:rgba(221,225,240,0.30);font-size:10px;">(90°−'+deg+'°)</span></div>':'',
                deg<=180?'<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Supplement:</span><span style="color:#6ee7b7;">'+supp+'°</span> <span style="color:rgba(221,225,240,0.30);font-size:10px;">(180°−'+deg+'°)</span></div>':'',
              ].filter(Boolean).join('');
            }
            document.getElementById('angVal').addEventListener('input',update);
            update();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "'n Hoek van 135° word geklassifiseer as:", options: ["Skerp", "Stomp", "Refleks", "Regte hoek"], answer: 1, topic: "Hoeke" },
        { type: "mc", text: "Hoe word die hoek by hoekpunt P, met strale PA en PB, korrek geskryf?", options: ["∠AP", "∠APB", "∠PA", "∠BP"], answer: 1, topic: "Hoeke" },
        { type: "input", text: "Watter tipe hoek meet presies 90°? (een woord)", answer: "regte", topic: "Hoeke" },
        { type: "mc", text: "Watter hoekomvang beskryf 'n refleks hoek?", options: ["0° tot 90°", "90° tot 180°", "180° tot 360°", "Gelyk aan 180°"], answer: 2, topic: "Hoeke" },
        { type: "input", text: "'n Hoek meet 47°. Watter tipe hoek is dit? (een woord)", answer: "skerp", topic: "Hoeke" },
        { type: "input", text: "'n Hoek en sy refleks hoek vorm saam 'n volle omwenteling om 'n punt. As die refleks hoek 5 keer die grootte van die kleiner hoek is, vind die grootte van die kleiner hoek in grade.", answer: "60", topic: "Hoeke" },
        { type: "input", text: "Vier hoeke rondom 'n punt is in die verhouding 1 : 2 : 3 : 4. Vind die grootte van die grootste hoek.", answer: "144", topic: "Hoeke" },
      ]
    },
    {
      id: 902,
      chapter: 9,
      name: "Hoekverhoudings",
      fullName: "Hoekeienskappe by reguit lyne",
      lesson: {
        heading: "Hoekeienskappe by reguit lyne",
        sub: "Hoofstuk 9 · Onderwerp 2",
        body: `
          <p>Wanneer lyne ontmoet of kruis, het die gevormde hoeke spesiale verhoudings. Hierdie verhoudings word gebruik om onbekende hoeke te bereken — gee altyd 'n <strong>rede</strong> vir elke stap.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Hoekverhoudings by reguit lyne</div>
            <p>
              <strong>Aangrensende supplementêre hoeke (hoeke op 'n reguit lyn):</strong><br>
              Hoeke wat saam 'n reguit lyn vorm, tel op tot 180°.<br>
              <span class="math">â + b̂ = 180°</span> &nbsp; <em>(hoeke op 'n reguit lyn)</em><br><br>
              <strong>Hoeke rondom 'n punt:</strong><br>
              Alle hoeke rondom 'n enkele punt tel op tot 360°.<br>
              <span class="math">â + b̂ + ĉ + … = 360°</span> &nbsp; <em>(hoeke rondom 'n punt)</em><br><br>
              <strong>Regoorstaande hoeke:</strong><br>
              Wanneer twee reguit lyne sny, is die hoeke regoor mekaar gelyk.<br>
              <span class="math">â = ĉ</span> en <span class="math">b̂ = d̂</span> &nbsp; <em>(regoorstaande hoeke)</em><br><br>
              <strong>Loodregte lyne:</strong><br>
              Twee lyne is loodreg as hulle by 90° ontmoet. Getoon met die simbool ⊥.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeeld — onbekende hoeke vind</div>
            <div class="example-step"><span class="step-num">1</span><span>Twee lyne sny. Een hoek is <span class="math">x = 65°</span>. Vind die ander drie hoeke.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Regoorstaande: die hoek direk regoor = 65°. <em>(regoorst. hoeke)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Aangrensende hoek: <span class="math">180° − 65° = 115°</span>. <em>(hoeke op 'n reguit lyn)</em></span></div>
            <div class="example-step"><span class="step-num">4</span><span>Vierde hoek: 115° (regoorstaande met die 115°-hoek). <em>(regoorst. hoeke)</em></span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Hoeke rondom 'n punt</div>
            <div class="example-step"><span class="step-num">1</span><span>Drie hoeke rondom 'n punt: 110°, 85°, en x.</span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">110° + 85° + x = 360°</span> <em>(hoeke rondom 'n punt)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span><span class="math">x = 360° − 195° = 165°</span></span></div>
          </div>

          <div style="overflow-x:auto;margin:14px 0;">
            <svg viewBox="0 0 400 130" style="width:100%;max-width:400px;border-radius:8px;background:rgba(10,15,30,0.50);">
              <text x="70"  y="13" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">REGUIT LYN</text>
              <text x="230" y="13" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">REGOORSTAANDE</text>
              <text x="348" y="13" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.80)" font-family="Syne,sans-serif" font-weight="700">RONDOM PUNT</text>
              <line x1="10" y1="80" x2="130" y2="80" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="70" y1="80" x2="93.2" y2="30.2" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <path d="M70,80 L88.0,80.0 A18,18 0 0,0 77.6,63.7 Z" fill="rgba(99,102,241,0.30)" stroke="#6366f1" stroke-width="1"/>
              <text x="96.1" y="66.3" text-anchor="middle" font-size="8.5" fill="#a5b4fc" font-family="JetBrains Mono,monospace">a</text>
              <path d="M70,80 L52.0,80.0 A18,18 0 0,1 77.6,63.7 Z" fill="rgba(245,158,11,0.25)" stroke="#fbbf24" stroke-width="1"/>
              <text x="53.3" y="56.9" text-anchor="middle" font-size="8.5" fill="#fbbf24" font-family="JetBrains Mono,monospace">b</text>
              <text x="70" y="112" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.45)" font-family="DM Sans,sans-serif">a + b = 180°</text>
              <line x1="230" y1="70" x2="276.0" y2="31.4" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="230" y1="70" x2="184.0" y2="108.6" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="230" y1="70" x2="191.4" y2="24.0" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="230" y1="70" x2="268.6" y2="116.0" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <path d="M230,70 L218.4,56.2 A18,18 0 0,1 243.8,58.4 Z" fill="rgba(99,102,241,0.30)" stroke="#6366f1" stroke-width="1"/>
              <text x="232.7" y="42.1" text-anchor="middle" font-size="8.5" fill="#a5b4fc" font-family="JetBrains Mono,monospace">a</text>
              <path d="M230,70 L241.6,83.8 A18,18 0 0,1 216.2,81.6 Z" fill="rgba(99,102,241,0.30)" stroke="#6366f1" stroke-width="1"/>
              <text x="227.3" y="103.9" text-anchor="middle" font-size="8.5" fill="#a5b4fc" font-family="JetBrains Mono,monospace">a</text>
              <text x="230" y="118" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.45)" font-family="DM Sans,sans-serif">gelyk (regoorst.)</text>
              <line x1="293" y1="68" x2="403" y2="68" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <line x1="348" y1="18" x2="348" y2="113" stroke="rgba(255,255,255,0.40)" stroke-width="1.5"/>
              <path d="M348,68 L364.0,68.0 A16,16 0 0,0 348.0,52.0 Z" fill="rgba(99,102,241,0.28)" stroke="#6366f1" stroke-width="1"/>
              <path d="M348,68 L348.0,52.0 A16,16 0 0,0 332.0,68.0 Z" fill="rgba(245,158,11,0.22)" stroke="#fbbf24" stroke-width="1"/>
              <path d="M348,68 L332.0,68.0 A16,16 0 0,0 348.0,84.0 Z" fill="rgba(16,185,129,0.22)" stroke="#6ee7b7" stroke-width="1"/>
              <path d="M348,68 L348.0,84.0 A16,16 0 0,0 364.0,68.0 Z" fill="rgba(236,72,153,0.22)" stroke="#f9a8d4" stroke-width="1"/>
              <text x="370" y="63" font-size="8.5" fill="#6366f1" font-family="JetBrains Mono,monospace">90°</text>
              <text x="370" y="84" font-size="8.5" fill="#f9a8d4" font-family="JetBrains Mono,monospace">90°</text>
              <text x="348" y="118" text-anchor="middle" font-size="8" fill="rgba(221,225,240,0.45)" font-family="DM Sans,sans-serif">som = 360°</text>
            </svg>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Skryf in elke meetkunde-antwoord die numeriese berekening ÉN die rede in hakies, bv. "x = 180° − 65° = 115° (hoeke op 'n reguit lyn)".</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Reguitlyn- en Snyhoek-oplosser</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:flex-end;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Scenario</label>
                <select id="angRelType" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:6px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="straight">Hoeke op 'n reguit lyn</option>
                  <option value="point">Hoeke rondom 'n punt</option>
                  <option value="vert">Regoorstaande hoeke</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Bekende hoek(e) — komma-geskei</label>
                <input id="angRelVals" type="text" value="72, 43" style="min-width:160px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <button id="angRelSolve" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Los op</button>
            </div>
            <div id="angRelOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function solve(){
              const type=document.getElementById('angRelType').value;
              const vals=document.getElementById('angRelVals').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              const el=document.getElementById('angRelOut');
              const sum=vals.reduce((a,b)=>a+b,0);
              let html='';
              if(type==='straight'){
                const x=180-sum;
                html='<div style="color:rgba(221,225,240,0.45);font-size:11px;">Reël: hoeke op \'n reguit lyn tel op tot 180°</div>'+
                  '<div>Som van bekende hoeke: <span style="color:#fbbf24;">'+sum+'°</span></div>'+
                  (x>=0?'<div>Onbekende hoek x = 180° − '+sum+'° = <span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+x+'°</span></div>':
                  '<span style="color:#fca5a5;">Hoeke oorskry reeds 180°</span>');
              } else if(type==='point'){
                const x=360-sum;
                html='<div style="color:rgba(221,225,240,0.45);font-size:11px;">Reël: hoeke rondom \'n punt tel op tot 360°</div>'+
                  '<div>Som van bekende hoeke: <span style="color:#fbbf24;">'+sum+'°</span></div>'+
                  (x>=0?'<div>Onbekende hoek x = 360° − '+sum+'° = <span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+x+'°</span></div>':
                  '<span style="color:#fca5a5;">Hoeke oorskry reeds 360°</span>');
              } else {
                const v=vals[0]||0;
                const opp=v, adj=180-v;
                html='<div style="color:rgba(221,225,240,0.45);font-size:11px;">Reël: regoorstaande hoeke is gelyk</div>'+
                  '<div>Gegewe hoek: <span style="color:#fbbf24;">'+v+'°</span></div>'+
                  '<div>Regoorstaande hoek = <span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+opp+'°</span></div>'+
                  '<div>Aangrensende hoeke = <span style="color:#6ee7b7;">'+adj+'°</span> elk <span style="color:rgba(221,225,240,0.30);font-size:10px;">(reguit lyn)</span></div>';
              }
              el.innerHTML=html;
            }
            document.getElementById('angRelSolve').addEventListener('click',solve);
            document.getElementById('angRelType').addEventListener('change',solve);
            document.getElementById('angRelVals').addEventListener('keydown',e=>{if(e.key==='Enter')solve();});
            solve();
          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Twee aangrensende hoeke op 'n reguit lyn is 72° en x°. Vind x.", answer: "108", topic: "Hoekverhoudings" },
        { type: "mc", text: "Twee reguit lyne sny. Een hoek is 48°. Wat is die regoorstaande hoek?", options: ["132°", "48°", "90°", "312°"], answer: 1, topic: "Hoekverhoudings" },
        { type: "input", text: "Drie hoeke rondom 'n punt is 95°, 130°, en x°. Vind x.", answer: "135", topic: "Hoekverhoudings" },
        { type: "mc", text: "Watter rede verduidelik waarom regoorstaande hoeke gelyk is?", options: ["Hoeke rondom 'n punt", "Albei pare is supplementêr tot dieselfde hoek", "Hoeke op 'n reguit lyn", "Ooreenkomstige hoeke"], answer: 1, topic: "Hoekverhoudings" },
        { type: "input", text: "Twee lyne is loodreg. Een gevormde hoek is x°. Wat is x?", answer: "90", topic: "Hoekverhoudings" },
        { type: "input", text: "Twee aangrensende hoeke op 'n reguit lyn is (4x + 10)° en (2x + 20)°. Los op vir x, en vind dan die grootte van die groter hoek.", answer: "110", topic: "Hoekverhoudings" },
        { type: "input", text: "Vyf hoeke ontmoet by 'n punt. Vier daarvan meet 55°, 68°, 92°, en 75°. Bereken die vyfde hoek.", answer: "70", topic: "Hoekverhoudings" },
      ]
    },
    {
      id: 903,
      chapter: 9,
      name: "Ewewydige lyne en hoeke",
      fullName: "Ewewydige lyne en hoeke",
      lesson: {
        heading: "Ewewydige lyne en hoeke",
        sub: "Hoofstuk 9 · Onderwerp 3",
        body: `
          <p>Wanneer 'n <strong>transversaal</strong> twee ewewydige lyne kruis, word agt hoeke gevorm. Hierdie hoeke het spesiale verhoudings wat ons in staat stel om onbekende waardes te bereken.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleuteldefinisies</div>
            <p>
              <strong>Ewewydige lyne:</strong> lyne in dieselfde vlak wat nooit sny nie. Getoon met pyle (→ →) of die simbool ∥.<br>
              bv. AB ∥ CD beteken lyn AB is ewewydig aan lyn CD.<br><br>
              <strong>Transversaal:</strong> 'n lyn wat oor twee of meer ander lyne sny.<br><br>
              <strong>Die 8 gevormde hoeke</strong> word gegroepeer as:<br>
              &nbsp;&nbsp;• <strong>Ooreenkomstige hoeke</strong> — dieselfde posisie by elke snypunt (F-vorm). Hulle is <em>gelyk</em>.<br>
              &nbsp;&nbsp;• <strong>Verwisselende binnehoeke</strong> — tussen die ewewydige lyne, aan teenoorgestelde kante van die transversaal (Z-vorm). Hulle is <em>gelyk</em>.<br>
              &nbsp;&nbsp;• <strong>Mede-binnehoeke</strong> (selfdekant binnehoeke / C-vorm) — tussen die ewewydige lyne, aan dieselfde kant. Hulle is <em>supplementêr</em> (tel op tot 180°).<br>
              &nbsp;&nbsp;• <strong>Regoorstaande hoeke</strong> — steeds gelyk (soos altyd wanneer twee lyne sny).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Identifisering van hoekpare</div>
            <div class="example-step"><span class="step-num">1</span><span>'n Transversaal sny ewewydige lyne AB en CD by punte P en Q.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>∠1 (bo AB, links van transversaal) en ∠5 (bo CD, links van transversaal) → <strong>ooreenkomstige hoeke</strong> → gelyk.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>∠3 (onder AB, regs) en ∠5 (bo CD, links) → <strong>verwisselende binnehoeke</strong> → gelyk.</span></div>
            <div class="example-step"><span class="step-num">4</span><span>∠3 (onder AB, links) en ∠5 (bo CD, links) → <strong>mede-binnehoeke</strong> → som = 180°.</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Berekening van onbekende hoeke</div>
            <div class="example-step"><span class="step-num">1</span><span>AB ∥ CD met transversaal. 'n Ooreenkomstige hoek by AB = 115°. Vind die hoek by CD.</span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">x = 115°</span> <em>(ooreenkomstige hoeke; AB ∥ CD)</em></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Vind nou die mede-binnehoek: <span class="math">y + 115° = 180°</span> <em>(mede-binnehoeke; AB ∥ CD)</em></span></div>
            <div class="example-step"><span class="step-num">4</span><span><span class="math">y = 65°</span></span></div>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Bewys dat lyne ewewydig is</div>
            <p>
              Jy kan ook agteruit werk: as jy kan wys dat 'n paar hoeke een van die bogenoemde voorwaardes bevredig, kan jy <strong>bewys</strong> dat die lyne ewewydig is.<br><br>
              bv. "∠3 = ∠5 → AB ∥ CD (verwiss. binnehoeke gelyk)"
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Onthou die vorms: <strong>F</strong> = ooreenkomstig (gelyk), <strong>Z</strong> = verwisselend (gelyk), <strong>C</strong> of <strong>U</strong> = mede-binnehoeke (supplementêr). Die vorm in die diagram raaksien is die vinnigste manier om die verhouding te identifiseer.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Probeer dit — Ewewydige Lyne Hoekdiagram</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Sleep die skuifknop of tik ∠1 in om al 8 hoeke intyds op die diagram te sien verander.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
              <input id="parAng" type="range" min="10" max="170" value="65" style="flex:1;min-width:140px;accent-color:#6366f1;">
              <input id="parAngNum" type="number" value="65" min="10" max="170" style="width:64px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              <span style="color:#a5b4fc;font-family:JetBrains Mono,monospace;font-size:14px;">°</span>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
              <span style="font-size:10px;color:rgba(221,225,240,0.40);align-self:center;">Verlig:</span>
              <button class="par-hl" data-hl="all"   style="padding:3px 9px;border-radius:5px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.08);color:rgba(221,225,240,0.60);font-size:10px;font-family:DM Sans,sans-serif;cursor:pointer;font-weight:700;">Alles</button>
              <button class="par-hl" data-hl="corr"  style="padding:3px 9px;border-radius:5px;border:1px solid rgba(245,158,11,0.35);background:rgba(245,158,11,0.08);color:#fbbf24;font-size:10px;font-family:DM Sans,sans-serif;cursor:pointer;font-weight:700;">F — Ooreenkomstig</button>
              <button class="par-hl" data-hl="alt"   style="padding:3px 9px;border-radius:5px;border:1px solid rgba(99,102,241,0.35);background:rgba(99,102,241,0.08);color:#a5b4fc;font-size:10px;font-family:DM Sans,sans-serif;cursor:pointer;font-weight:700;">Z — Verwisselend</button>
              <button class="par-hl" data-hl="coint" style="padding:3px 9px;border-radius:5px;border:1px solid rgba(16,185,129,0.35);background:rgba(16,185,129,0.08);color:#6ee7b7;font-size:10px;font-family:DM Sans,sans-serif;cursor:pointer;font-weight:700;">C — Mede-binne</button>
              <button class="par-hl" data-hl="vert"  style="padding:3px 9px;border-radius:5px;border:1px solid rgba(236,72,153,0.35);background:rgba(236,72,153,0.08);color:#f9a8d4;font-size:10px;font-family:DM Sans,sans-serif;cursor:pointer;font-weight:700;">X — Regoorst.</button>
            </div>
            <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start;">
              <svg id="parSvg" viewBox="0 0 280 260" style="width:280px;max-width:100%;flex-shrink:0;border-radius:10px;background:rgba(10,15,30,0.60);"></svg>
              <div id="parOut" style="font-family:JetBrains Mono,monospace;font-size:11.5px;line-height:2.1;flex:1;min-width:180px;"></div>
            </div>
          </div>
          <script>
          (function(){

            // Colours
            var CLR = {
              given: '#fcd34d', str: '#94a3b8', vert: '#f9a8d4',
              corr:  '#fbbf24', alt: '#a5b4fc', coint:'#6ee7b7',
              dim:   'rgba(255,255,255,0.06)'
            };
            var ANG_REL  = {1:'given',2:'str',3:'alt',4:'str',5:'corr',6:'coint',7:'vert',8:'str'};
            var HL_GROUPS= {all:[1,2,3,4,5,6,7,8],corr:[1,5],alt:[3,5],coint:[3,6],vert:[1,3,5,7]};
            var HL_CLR   = {all:null,corr:'#fbbf24',alt:'#a5b4fc',coint:'#6ee7b7',vert:'#f9a8d4'};
            var highlight = 'all';
            var LY1=80, LY2=180;

            function computeGeom(a1){
              var IX1=130, svgDown=180-a1, rad=svgDown*Math.PI/180;
              var dy=LY2-LY1, tanV=Math.tan(rad);
              var dx=(Math.abs(tanV)>0.001)?dy/tanV:0, IX2=IX1+dx;
              var ext=65, extX=ext*Math.cos(rad), extY=ext*Math.sin(rad);
              return {IX1:IX1,IX2:IX2,svgDown:svgDown,
                      TXa:IX1-extX,TYa:LY1-extY,TXb:IX2+extX,TYb:LY2+extY};
            }

            function arcPath(cx,cy,r,startDeg,sweepDeg){
              var s=startDeg*Math.PI/180, e=(startDeg+sweepDeg)*Math.PI/180;
              var x1=cx+r*Math.cos(s),y1=cy+r*Math.sin(s);
              var x2=cx+r*Math.cos(e),y2=cy+r*Math.sin(e);
              return 'M '+cx+' '+cy+' L '+x1.toFixed(1)+' '+y1.toFixed(1)+
                     ' A '+r+' '+r+' 0 '+(sweepDeg>180?1:0)+' 1 '+x2.toFixed(1)+' '+y2.toFixed(1)+' Z';
            }

            function drawIntersection(cx,cy,nums,a1,a2,svgDown,hlSet){
              var sectors=[
                {n:nums[0],start:180+svgDown,sweep:180-svgDown,val:a1}, // above-right
                {n:nums[1],start:180,        sweep:svgDown,    val:a2}, // above-left
                {n:nums[2],start:svgDown,    sweep:180-svgDown,val:a1}, // below-left
                {n:nums[3],start:0,          sweep:svgDown,    val:a2}, // below-right
              ];
              var R=24, hlGrpCol=HL_CLR[highlight]||null, out='';
              sectors.forEach(function(sec){
                var n=sec.n, active=hlSet.has(n);
                // In 'all' mode: each angle gets its own ANG_REL colour
                // In highlight mode: active angles get the group colour, inactive get dim
                var col, textCol;
                if(highlight==='all'){
                  col     = 'rgba(255,255,255,0.07)';   // no fill in All mode
                  textCol = 'rgba(221,225,240,0.65)';   // labels still visible
                } else {
                  col      = active ? hlGrpCol  : CLR.dim;
                  textCol  = active ? hlGrpCol  : 'rgba(255,255,255,0.18)';
                }
                var norm=((sec.start%360)+360)%360;
                out+='<path d="'+arcPath(cx,cy,R,norm,sec.sweep)+'" fill="'+col+'" opacity="1" stroke="rgba(0,0,0,0.25)" stroke-width="0.5"/>';
                var midDeg=norm+sec.sweep/2;
                var lx=cx+(R+13)*Math.cos(midDeg*Math.PI/180);
                var ly=cy+(R+13)*Math.sin(midDeg*Math.PI/180);
                out+='<text x="'+lx.toFixed(1)+'" y="'+(ly+3.5).toFixed(1)+'" text-anchor="middle" font-size="9" font-family="JetBrains Mono,monospace" fill="'+textCol+'" font-weight="700">∠'+n+'</text>';
                var vx=cx+(R*0.52)*Math.cos(midDeg*Math.PI/180);
                var vy=cy+(R*0.52)*Math.sin(midDeg*Math.PI/180);
                var valOpacity=highlight==='all'?'rgba(221,225,240,0.55)':(active?'rgba(255,255,255,0.80)':'rgba(255,255,255,0.22)');
                out+='<text x="'+vx.toFixed(1)+'" y="'+(vy+3).toFixed(1)+'" text-anchor="middle" font-size="7" font-family="JetBrains Mono,monospace" fill="'+valOpacity+'">'+sec.val+'°</text>';
              });
              return out;
            }

            function drawSVG(a1){
              var g=computeGeom(a1), a2=180-a1;
              var svg=document.getElementById('parSvg');
              var hlSet=new Set(HL_GROUPS[highlight]||[1,2,3,4,5,6,7,8]);
              var W=280, h='';

              // Parallel lines
              h+='<line x1="10" y1="'+LY1+'" x2="'+(W-10)+'" y2="'+LY1+'" stroke="#f59e0b" stroke-width="2"/>';
              h+='<line x1="10" y1="'+LY2+'" x2="'+(W-10)+'" y2="'+LY2+'" stroke="#f59e0b" stroke-width="2"/>';
              // Parallel tick marks
              var mx=W-55;
              function ptick(x,y){
                return '<line x1="'+(x-3)+'" y1="'+(y-7)+'" x2="'+(x+3)+'" y2="'+(y+7)+'" stroke="#f59e0b" stroke-width="1.5"/>'+
                       '<line x1="'+(x+3)+'" y1="'+(y-7)+'" x2="'+(x+9)+'" y2="'+(y+7)+'" stroke="#f59e0b" stroke-width="1.5"/>';
              }
              h+=ptick(mx,LY1)+ptick(mx,LY2);
              // Labels
              h+='<text x="14" y="'+(LY1-6)+'" font-size="11" fill="#f59e0b" font-family="Syne,sans-serif" font-weight="700">A</text>';
              h+='<text x="'+(W-16)+'" y="'+(LY1-6)+'" font-size="11" fill="#f59e0b" font-family="Syne,sans-serif" font-weight="700">B</text>';
              h+='<text x="14" y="'+(LY2-6)+'" font-size="11" fill="#f59e0b" font-family="Syne,sans-serif" font-weight="700">C</text>';
              h+='<text x="'+(W-16)+'" y="'+(LY2-6)+'" font-size="11" fill="#f59e0b" font-family="Syne,sans-serif" font-weight="700">D</text>';
              // Transversal
              h+='<line x1="'+g.TXa.toFixed(1)+'" y1="'+g.TYa.toFixed(1)+'" x2="'+g.TXb.toFixed(1)+'" y2="'+g.TYb.toFixed(1)+'" stroke="rgba(165,180,252,0.80)" stroke-width="2"/>';
              // Intersections
              h+=drawIntersection(g.IX1,LY1,[1,2,3,4],a1,a2,g.svgDown,hlSet);
              h+=drawIntersection(g.IX2,LY2,[5,6,7,8],a1,a2,g.svgDown,hlSet);
              // Dots and labels
              h+='<circle cx="'+g.IX1.toFixed(1)+'" cy="'+LY1+'" r="3.5" fill="white" opacity="0.85"/>';
              h+='<circle cx="'+g.IX2.toFixed(1)+'" cy="'+LY2+'" r="3.5" fill="white" opacity="0.85"/>';
              h+='<text x="'+(g.IX1-16).toFixed(1)+'" y="'+(LY1+4)+'" font-size="10" fill="rgba(165,180,252,0.90)" font-family="Syne,sans-serif" font-weight="700">P</text>';
              h+='<text x="'+(g.IX2-16).toFixed(1)+'" y="'+(LY2+4)+'" font-size="10" fill="rgba(165,180,252,0.90)" font-family="Syne,sans-serif" font-weight="700">Q</text>';
              svg.innerHTML=h;
            }

            function summaryLine(a1,a2){
              if(highlight==='all')    return '<span style="color:rgba(221,225,240,0.35);">Kies \'n verligting hierbo om die verhoudingsreël te sien.</span>';
              if(highlight==='corr')  return '<span style="color:'+CLR.corr+';">∠1 = ∠5 = '+a1+'° ✓ Ooreenkomstige hoeke is gelyk (F-vorm)</span>';
              if(highlight==='alt')   return '<span style="color:'+CLR.alt+';">∠3 = ∠5 = '+a1+'° ✓ Verwisselende binnehoeke is gelyk (Z-vorm)</span>';
              if(highlight==='coint') return '<span style="color:'+CLR.coint+';">∠3 + ∠6 = '+a1+' + '+a2+' = 180° ✓ Mede-binnehoeke is supplementêr (C-vorm)</span>';
              if(highlight==='vert')  return '<span style="color:'+CLR.vert+';">∠1 = ∠3 = '+a1+'° ✓ Regoorstaande hoeke is gelyk</span>';
              return '';
            }

            function updateText(a1){
              var a2=180-a1, el=document.getElementById('parOut');
              function row(n,val,col,rule){
                return '<div><span style="color:rgba(221,225,240,0.40);width:30px;display:inline-block;">∠'+n+':</span>'+
                  '<span style="color:'+col+';font-weight:700;margin-right:6px;">'+val+'°</span>'+
                  '<span style="color:rgba(221,225,240,0.28);font-size:10px;">'+rule+'</span></div>';
              }
              el.innerHTML=
                '<div style="color:#f59e0b;font-size:9px;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">By P — lyn AB</div>'+
                row(1,a1,CLR.given,'gegee')+
                row(2,a2,CLR.str,  'reguit lyn −∠1')+
                row(3,a1,CLR.alt,  'regoorst. ∠1')+
                row(4,a2,CLR.str,  'regoorst. ∠2')+
                '<div style="color:rgba(165,180,252,0.70);font-size:9px;text-transform:uppercase;letter-spacing:0.07em;margin:7px 0 4px;">By Q — lyn CD</div>'+
                row(5,a1,CLR.corr, 'ooreenk. ∠1 (F) / verwiss. binne ∠3 (Z)')+
                row(6,a2,CLR.coint,'ooreenk. ∠2 / mede-binne ∠3 (C)')+
                row(7,a1,CLR.vert, 'regoorst. ∠5')+
                row(8,a2,CLR.str,  'regoorst. ∠6')+
                '<div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.07);font-size:10px;">'+summaryLine(a1,a2)+'</div>';
            }

            // Button styles stored per-mode for active/inactive
            var BTN_ACTIVE = {
              all:  'border:2px solid rgba(255,255,255,0.60);background:rgba(255,255,255,0.20);color:#fff;',
              corr: 'border:2px solid #fbbf24;background:rgba(245,158,11,0.28);color:#fbbf24;',
              alt:  'border:2px solid #a5b4fc;background:rgba(99,102,241,0.28);color:#a5b4fc;',
              coint:'border:2px solid #6ee7b7;background:rgba(16,185,129,0.28);color:#6ee7b7;',
              vert: 'border:2px solid #f9a8d4;background:rgba(236,72,153,0.28);color:#f9a8d4;',
            };
            var BTN_INACTIVE = {
              all:  'border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.08);color:rgba(221,225,240,0.60);',
              corr: 'border:1px solid rgba(245,158,11,0.35);background:rgba(245,158,11,0.08);color:#fbbf24;',
              alt:  'border:1px solid rgba(99,102,241,0.35);background:rgba(99,102,241,0.08);color:#a5b4fc;',
              coint:'border:1px solid rgba(16,185,129,0.35);background:rgba(16,185,129,0.08);color:#6ee7b7;',
              vert: 'border:1px solid rgba(236,72,153,0.35);background:rgba(236,72,153,0.08);color:#f9a8d4;',
            };

            function updateButtons(){
              // Scope to the parAng element's closest .def-box to avoid cross-widget contamination
              var box=document.getElementById('parAng').closest('.def-box');
              if(!box) return;
              box.querySelectorAll('.par-hl').forEach(function(btn){
                var hl=btn.dataset.hl;
                btn.style.cssText=(hl===highlight?BTN_ACTIVE:BTN_INACTIVE)[hl]||'';
                btn.style.fontWeight=hl===highlight?'800':'700';
                btn.style.boxShadow=hl===highlight?'0 0 10px -2px '+HL_CLR[hl]||'rgba(255,255,255,0.20)':'none';
              });
            }

            function update(){
              var a1=parseInt(document.getElementById('parAng').value)||65;
              document.getElementById('parAngNum').value=a1;
              drawSVG(a1);
              updateText(a1);
            }

            document.getElementById('parAng').addEventListener('input',function(){
              document.getElementById('parAngNum').value=this.value;
              update();
            });
            document.getElementById('parAngNum').addEventListener('input',function(){
              var v=parseInt(this.value)||65;
              v=Math.max(10,Math.min(170,v));
              document.getElementById('parAng').value=v;
              update();
            });
            document.getElementById('parAngNum').addEventListener('keydown',function(e){
              if(e.key==='Enter') update();
            });
            document.getElementById('parAng').closest('.def-box').addEventListener('click',function(e){
              var btn=e.target.closest('.par-hl');
              if(!btn) return;
              highlight=btn.dataset.hl;
              updateButtons();
              update();
            });

            updateButtons();
            update();
          })();
          </script>
        `
      },
      questions: [
        { type: "mc", text: "AB ∥ CD. 'n Transversaal vorm 'n 70°-hoek by AB. Wat is die ooreenkomstige hoek by CD?", options: ["110°", "70°", "180°", "35°"], answer: 1, topic: "Ewewydige lyne" },
        { type: "input", text: "AB ∥ CD. Mede-binnehoeke is x° en 112°. Vind x.", answer: "68", topic: "Ewewydige lyne" },
        { type: "mc", text: "Watter hoekpaar vorm 'n Z-vorm met ewewydige lyne?", options: ["Ooreenkomstig", "Mede-binne", "Verwisselende binnehoeke", "Regoorstaande"], answer: 2, topic: "Ewewydige lyne" },
        { type: "mc", text: "AB ∥ CD. 'n Verwisselende binnehoek by AB is 55°. Wat is die verwisselende binnehoek by CD?", options: ["125°", "55°", "90°", "305°"], answer: 1, topic: "Ewewydige lyne" },
        { type: "input", text: "Twee lyne word deur 'n transversaal gesny. Ooreenkomstige hoeke is 3x + 10 en 5x − 20 grade. Die lyne is ewewydig. Vind x.", answer: "15", topic: "Ewewydige lyne" },
        { type: "input", text: "AB ∥ CD. Verwisselende binnehoeke is (2x + 18)° en (4x − 30)°. Los op vir x, en gee dan die grootte van elke hoek.", answer: "66", topic: "Ewewydige lyne" },
        { type: "input", text: "AB ∥ CD. Twee mede-binnehoeke gevorm deur 'n transversaal is (3x + 15)° en (2x + 25)°. Vind x, en sê dan of die hoek (3x + 15)° skerp, reg, of stomp is. (Gee die hoekwaarde in grade)", answer: "99", topic: "Ewewydige lyne" },
      ]
    },
    {
      id: 904,
      chapter: 9,
      name: "H9 Eksamenfokus",
      fullName: "Eksamenfokus-oefening",
      lesson: {
        heading: "Hoofstuk 9 — Eksamenfokus",
        sub: "Hoofstuk 9 · Hersiening",
        body: `
          <p>Hierdie eksamen-tipe vrae kombineer al die hoekverhoudings van Hoofstuk 9. Jy sal hoektipes moet identifiseer, die korrekte eienskap toepas, en altyd 'n rede gee.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Hoofstuk 9-opsomming</div>
            <p>
              ✅ <strong>Hoeke op 'n reguit lyn</strong> — tel op tot 180°<br>
              ✅ <strong>Hoeke rondom 'n punt</strong> — tel op tot 360°<br>
              ✅ <strong>Regoorstaande hoeke</strong> — gelyk<br>
              ✅ <strong>Ooreenkomstige hoeke</strong> (ewewydige lyne, F-vorm) — gelyk<br>
              ✅ <strong>Verwisselende binnehoeke</strong> (ewewydige lyne, Z-vorm) — gelyk<br>
              ✅ <strong>Mede-binnehoeke</strong> (ewewydige lyne, C-vorm) — supplementêr (som = 180°)<br>
              ✅ Skryf altyd 'n rede vir elke hoekstelling
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">📝 Algemene eksamenfoute om te vermy</div>
            <div class="example-step"><span class="step-num">✗</span><span>Hoekwaardes sonder 'n rede skryf — gee altyd die eienskap wat gebruik is.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Mede-binnehoeke (supplementêr) met verwisselende hoeke (gelyk) verwar.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Aanvaar dat lyne ewewydig is sonder dat dit gesê is — gebruik slegs ewewydige-lyn-eienskappe wanneer die diagram of vraag sê die lyne is ewewydig.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>'n Gradeboog gebruik om in berekeningsvrae te meet — bereken altyd met behulp van hoekverhoudings.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In veelstap-probleme, benoem elke onbekende hoek soos jy vorder en skryf die rede langs elkeen. Dit hou jou berekeninge duidelik en verdien metodepunte.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Twee ewewydige lyne word deur 'n transversaal gesny. 'n Hoek van 63° word gevorm. Vind die mede-binnehoek.", answer: "117", topic: "Gemeng" },
        { type: "mc", text: "Drie hoeke by 'n punt op 'n reguit lyn is x, 2x, en 3x. Vind x.", options: ["60°", "30°", "45°", "20°"], answer: 1, topic: "Gemeng" },
        { type: "mc", text: "AB ∥ CD. 'n Transversaal vorm 'n hoek van 48° met AB (bo, links). Wat is die verwisselende binnehoek by CD?", options: ["132°", "48°", "42°", "90°"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "Twee lyne sny. Een hoek is (2x + 15)° en sy regoorstaande hoek is (3x − 10)°. Vind x.", answer: "25", topic: "Gemeng" },
        { type: "mc", text: "Watter stel hoekverhoudings geld SLEGS wanneer lyne ewewydig is?", options: ["Regoorstaande en reguitlyn-hoeke", "Ooreenkomstige, verwisselende, en mede-binnehoeke", "Hoeke rondom 'n punt", "Supplementêre en komplementêre hoeke"], answer: 1, topic: "Gemeng" },
        { type: "input", text: "Drie hoeke op 'n reguit lyn is (x + 15)°, (2x + 25)°, en (3x + 20)°. Los op vir x, en gee dan die grootte van die grootste hoek.", answer: "80", topic: "Gemeng" },
        { type: "input", text: "Twee ewewydige lyne word deur 'n transversaal gesny. Een hoek is 3x° en sy ooreenkomstige hoek by die ander lyn is (2x + 25)°. Vind x, en gee dan die grootte van die hoek. Is dit skerp of stomp? (Gee die hoekwaarde)", answer: "75", topic: "Gemeng" },
      ]
    }
  ],
  workbook: {
    chapter: 9, chapterName: "Meetkunde van Reguit Lyne",
    topics: [
      {
        name: "Lyne, hoeke en reguitlyn-eienskappe",
        questions: [
          {
            num: "1",
            text: "In die diagram word drie hoeke op 'n reguit lyn gevorm: (2x + 10)°, 3x°, en 40°.",
            parts: [
              { label: "a)", text: "Skryf 'n vergelyking met behulp van die hoeke op 'n reguit lyn.", marks: 1 },
              { label: "b)", text: "Los op vir x.", marks: 2 },
              { label: "c)", text: "Vind dus die grootte van elke hoek.", marks: 2 },
            ]
          },
          {
            num: "2",
            text: "Twee reguit lyne sny by punt P, en vorm hoeke a, b, c, en d. Hoek a = 74°.",
            parts: [
              { label: "a)", text: "Vind b, met 'n rede.", marks: 2 },
              { label: "b)", text: "Vind c, met 'n rede.", marks: 2 },
              { label: "c)", text: "Vind d, met 'n rede.", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "Vier hoeke word rondom 'n punt P gevorm: x, 2x, 90°, en 3x − 6°.",
            parts: [
              { label: "a)", text: "Stel 'n vergelyking op vir die hoeke rondom 'n punt.", marks: 1 },
              { label: "b)", text: "Los op vir x.", marks: 3 },
              { label: "c)", text: "Gee die grootte van die grootste hoek.", marks: 1 },
            ]
          },
        ]
      },
      {
        name: "Ewewydige lyne gesny deur 'n transversaal",
        questions: [
          {
            num: "4",
            text: "AB ∥ CD. 'n Transversaal sny AB by P en CD by Q. ∠APQ = 118° (stomp hoek bo AB, links van transversaal).",
            parts: [
              { label: "a)", text: "Vind ∠BPQ. Gee 'n rede.", marks: 2 },
              { label: "b)", text: "Vind die ooreenkomstige hoek by Q. Gee 'n rede.", marks: 2 },
              { label: "c)", text: "Vind die verwisselende binnehoek by Q. Gee 'n rede.", marks: 2 },
              { label: "d)", text: "Vind die mede-binnehoek by Q. Gee 'n rede.", marks: 2 },
            ]
          },
          {
            num: "5",
            text: "'n Transversaal sny twee lyne. By die eerste lyn word 'n hoek van (4x − 5)° gevorm. By die tweede lyn is die ooreenkomstige hoek (2x + 35)°.",
            parts: [
              { label: "a)", text: "As die lyne ewewydig is, vind x.", marks: 3 },
              { label: "b)", text: "Vind dus die grootte van elke ooreenkomstige hoek.", marks: 1 },
              { label: "c)", text: "Vind die mede-binnehoek by die tweede snypunt.", marks: 2 },
            ]
          },
          {
            num: "6",
            text: "EF ∥ GH. 'n Transversaal ontmoet EF by M en GH by N. ∠EMN = (3x + 20)° en die mede-binnehoek ∠GNM = (2x + 50)°.",
            parts: [
              { label: "a)", text: "Skryf 'n vergelyking vir hierdie mede-binnehoeke.", marks: 1 },
              { label: "b)", text: "Los op vir x.", marks: 3 },
              { label: "c)", text: "Gee die grootte van albei mede-binnehoeke en bevestig dat hulle optel tot 180°.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 9, chapterName: "Hoofstuk 9 — Meetkunde van Reguit Lyne",
    topics: [
      {
        name: "Lyne, hoeke en reguitlyn-eienskappe",
        answers: [
          { num: "Q1a", ans: "(2x + 10) + 3x + 40 = 180", note: "Hoeke op 'n reguit lyn tel op tot 180°" },
          { num: "Q1b", ans: "x = 26°", note: "5x + 50 = 180 → 5x = 130 → x = 26 (toets: 5(26)+50=180 ✓)" },
          { num: "Q1c", ans: "2(26)+10 = 62°; 3(26) = 78°; 40°", note: "Vervang x = 26 in elke uitdrukking; toets: 62+78+40 = 180 ✓" },
          { num: "Q2a", ans: "b = 106°", note: "Hoeke op 'n reguit lyn: 180° − 74° = 106°" },
          { num: "Q2b", ans: "c = 74°", note: "Regoorstaande hoeke: c = a = 74°" },
          { num: "Q2c", ans: "d = 106°", note: "Regoorstaande hoeke: d = b = 106°" },
          { num: "Q3a", ans: "x + 2x + 90 + 3x − 6 = 360", note: "Hoeke rondom 'n punt tel op tot 360°" },
          { num: "Q3b", ans: "x = 46°", note: "6x + 84 = 360 → 6x = 276 → x = 46" },
          { num: "Q3c", ans: "3(46) − 6 = 132°", note: "Grootste hoek is 3x − 6°" },
        ]
      },
      {
        name: "Ewewydige lyne gesny deur 'n transversaal",
        answers: [
          { num: "Q4a", ans: "∠BPQ = 62°", note: "Hoeke op 'n reguit lyn: 180° − 118° = 62°" },
          { num: "Q4b", ans: "∠PQD = 118°", note: "Ooreenkomstige hoeke; AB ∥ CD" },
          { num: "Q4c", ans: "∠PQG = 62°", note: "Verwisselende binnehoeke; AB ∥ CD (ook = ∠BPQ)" },
          { num: "Q4d", ans: "∠BPQ + mede-binne = 180° → mede-binne = 118°", note: "Mede-binnehoeke; AB ∥ CD: 62° + 118° = 180° ✓" },
          { num: "Q5a", ans: "x = 20", note: "4x − 5 = 2x + 35 (ooreenk. hoeke, lyne ∥) → 2x = 40 → x = 20" },
          { num: "Q5b", ans: "Elke ooreenkomstige hoek = 75°", note: "4(20) − 5 = 75°; 2(20) + 35 = 75° ✓" },
          { num: "Q5c", ans: "Mede-binnehoek = 105°", note: "180° − 75° = 105° (mede-binnehoeke; lyne ∥)" },
          { num: "Q6a", ans: "(3x + 20) + (2x + 50) = 180", note: "Mede-binnehoeke; EF ∥ GH" },
          { num: "Q6b", ans: "x = 22", note: "5x + 70 = 180 → 5x = 110 → x = 22" },
          { num: "Q6c", ans: "∠EMN = 86°; ∠GNM = 94°; 86 + 94 = 180° ✓", note: "3(22)+20=86°; 2(22)+50=94°" },
        ]
      },
    ]
  }
});
