// Math Magician � Grade 9, Chapter 3 data
// Common & Decimal Fractions

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 5,
      chapter: 3,
      name: "Common fractions",
      fullName: "Operations with common fractions",
      lesson: {
        heading: "Operations with common fractions",
        sub: "Chapter 3 � Topic 1",
        body: `
          <p>Common fractions represent parts of a whole. In Grade 9 we work with all four operations on fractions, including mixed numbers.</p>
          <div class="def-box">
            <div class="def-box-title">?? Operations summary</div>
            <p>
              <strong>Add/Subtract:</strong> find the LCD, convert, then add/subtract numerators.<br>
              <strong>Multiply:</strong> multiply numerators � numerators, denominators � denominators. Simplify first if possible.<br>
              <strong>Divide:</strong> multiply by the reciprocal of the divisor (KCF: Keep, Change, Flip).<br>
              <strong>Mixed numbers:</strong> convert to improper fractions before operating, then convert back.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>3/4 + 5/6 ? LCD = 12 ? 9/12 + 10/12 = 19/12 = 1 7/12</span></div>
            <div class="example-step"><span class="step-num">2</span><span>2 1/3 � 1 1/2 = 7/3 � 3/2 = 21/6 = 7/2 = 3 1/2</span></div>
            <div class="example-step"><span class="step-num">3</span><span>3/4 � 9/8 = 3/4 � 8/9 = 24/36 = 2/3</span></div>
            <div class="example-step"><span class="step-num">4</span><span>4 - 1 3/5 = 4 - 8/5 = 20/5 - 8/5 = 12/5 = 2 2/5</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Always simplify before multiplying � cancel common factors between any numerator and any denominator to keep numbers small.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Fraction Operations Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter two fractions and choose an operation. See the step-by-step result in simplest form.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;"><input id="fn1" type="number" value="3" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px 7px 0 0;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"><div style="width:55px;height:2px;background:rgba(99,102,241,0.60);"></div><input id="fd1" type="number" value="4" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:0 0 7px 7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <select id="fop" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:8px 10px;border-radius:7px;font-size:18px;font-family:JetBrains Mono,monospace;"><option value="+">+</option><option value="-">&minus;</option><option value="*">&times;</option><option value="/">&divide;</option></select>
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;"><input id="fn2" type="number" value="5" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px 7px 0 0;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"><div style="width:55px;height:2px;background:rgba(99,102,241,0.60);"></div><input id="fd2" type="number" value="6" style="width:55px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:0 0 7px 7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="fCalc" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="fOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
            function simplify(n,d){if(d===0)return{n:NaN,d:1};var g=gcd(Math.abs(n),Math.abs(d));var sign=d<0?-1:1;return{n:sign*n/g,d:sign*d/g};}
            function fmt(n,d){if(isNaN(n))return '<span style="color:#fca5a5;">undefined</span>';if(d===1)return '<span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+n+'</span>';var whole=Math.floor(Math.abs(n)/d),rem=Math.abs(n)%d,sign=n<0?'&minus;':'';return whole>0?'<span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+sign+whole+' '+rem+'/'+d+'</span>':'<span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+n+'/'+d+'</span>';}
            function calc(){var n1=parseInt(document.getElementById('fn1').value)||0,d1=parseInt(document.getElementById('fd1').value)||1;var n2=parseInt(document.getElementById('fn2').value)||0,d2=parseInt(document.getElementById('fd2').value)||1;var op=document.getElementById('fop').value;var rn,rd,step;if(op==='+'){rn=n1*d2+n2*d1;rd=d1*d2;step=n1+'/'+d1+' + '+n2+'/'+d2+' = '+(n1*d2)+'/'+(d1*d2)+' + '+(n2*d1)+'/'+(d1*d2)+' = '+rn+'/'+rd;}else if(op==='-'){rn=n1*d2-n2*d1;rd=d1*d2;step=n1+'/'+d1+' - '+n2+'/'+d2+' = '+(n1*d2)+'/'+(d1*d2)+' - '+(n2*d1)+'/'+(d1*d2)+' = '+rn+'/'+rd;}else if(op==='*'){rn=n1*n2;rd=d1*d2;step=n1+'/'+d1+' � '+n2+'/'+d2+' = '+(n1*n2)+'/'+(d1*d2);}else{if(n2===0){document.getElementById('fOut').innerHTML='<span style="color:#fca5a5;">Cannot divide by zero fraction.</span>';return;}rn=n1*d2;rd=d1*n2;step=n1+'/'+d1+' � '+n2+'/'+d2+' = '+n1+'/'+d1+' � '+d2+'/'+n2+' = '+(n1*d2)+'/'+(d1*n2);}var r=simplify(rn,rd);document.getElementById('fOut').innerHTML=['<div style="color:rgba(221,225,240,0.45);font-size:11px;">'+step+'</div>','<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Result: </span>'+fmt(r.n,r.d)+'</div>'].join('');}
            document.getElementById('fCalc').addEventListener('click',calc);document.getElementById('fop').addEventListener('change',calc);calc();
          })();
          </script>
        `
        `
      },
      questions: [
        { type: "mc", text: "Calculate: 2/3 + 3/4", options: ["5/7", "17/12", "5/12", "6/7"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate: 3 1/2 � 2 2/3 (give answer as improper fraction numerator over 3)", answer: "28", topic: "Fractions" },
        { type: "mc", text: "Calculate: 5/6 � 5/12", options: ["1/2", "2", "25/72", "10/6"], answer: 1, topic: "Fractions" },
        { type: "input", text: "Calculate: 4 1/4 - 2 3/4 (give answer as a mixed number numerator + denominator as 2-digit number e.g. 1 1/2 = write 3 for 1+1+... � just write: 1.5 ? write 3/2 ? write numerator 3)", answer: "3", topic: "Fractions" },
        { type: "mc", text: "Which fraction is equivalent to 3 3/7?", options: ["24/7", "21/7", "24/3", "21/3"], answer: 0, topic: "Fractions" },
      ]
    },
    {
      id: 6,
      chapter: 3,
      name: "Decimal fractions",
      fullName: "Decimal fractions and conversion",
      lesson: {
        heading: "Decimal fractions and conversion",
        sub: "Chapter 3 � Topic 2",
        body: `
          <p>Decimal fractions extend place value beyond the units column. Converting between fractions and decimals is an essential skill.</p>
          <div class="def-box">
            <div class="def-box-title">?? Conversion rules</div>
            <p>
              <strong>Fraction ? Decimal:</strong> divide numerator by denominator.<br>
              <strong>Terminating decimal ? Fraction:</strong> write digits over 10/100/1000 etc., simplify.<br>
              <strong>Recurring decimal ? Fraction:</strong> use the algebraic method (multiply by 10n where n = recurring block length).<br>
              <strong>Percentage ? Decimal:</strong> divide by 100.<br>
              <strong>Decimal ? Percentage:</strong> multiply by 100.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>0,625 = 625/1000 = 5/8</span></div>
            <div class="example-step"><span class="step-num">2</span><span>5/11: 5 � 11 = 0,4�5� (recurring)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Convert 0,83�: let x = 0,83�; 10x = 8,3�; 9x = 7,5; x = 7,5/9 = 15/18 = 5/6</span></div>
            <div class="example-step"><span class="step-num">4</span><span>0,36 � 100 = 36% and 36% � 100 = 0,36</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>When converting a recurring decimal, the number of 9s in the denominator equals the length of the recurring block.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Fraction &#8596; Decimal Converter</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Convert a fraction to a decimal, or a terminating decimal to a fraction. Includes percentage conversion.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:10px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Mode</label><select id="convMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;"><option value="f2d">Fraction &#8594; Decimal</option><option value="d2f">Decimal &#8594; Fraction</option><option value="pct">Decimal &#8596; %</option></select></div>
              <div id="convF" style="display:flex;flex-direction:column;gap:4px;align-items:center;"><input id="convN" type="number" value="7" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:7px 7px 0 0;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"><div style="width:60px;height:2px;background:rgba(99,102,241,0.60);"></div><input id="convD" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:0 0 7px 7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div id="convDec" style="display:none;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Value</label><input id="convVal" type="text" value="0.625" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="convBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Convert</button>
            </div>
            <div id="convOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
            var modeEl=document.getElementById('convMode');
            function setMode(){var m=modeEl.value;document.getElementById('convF').style.display=(m==='f2d')?'flex':'none';document.getElementById('convDec').style.display=(m!=='f2d')?'flex':'none';}
            modeEl.addEventListener('change',function(){setMode();convert();});
            function convert(){var m=modeEl.value,out=document.getElementById('convOut');if(m==='f2d'){var n=parseInt(document.getElementById('convN').value)||0,d=parseInt(document.getElementById('convD').value)||1;if(d===0){out.innerHTML='<span style="color:#fca5a5;">Denominator cannot be 0.</span>';return;}var dec=(n/d).toFixed(10).replace(/0+$/,'').replace(/\.$/,'');out.innerHTML='<div><span style="color:rgba(221,225,240,0.45);">'+n+' � '+d+' = </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+dec+'</span></div>';}else if(m==='d2f'){var v=parseFloat(document.getElementById('convVal').value);if(isNaN(v)){out.innerHTML='<span style="color:#fca5a5;">Enter a valid decimal.</span>';return;}var s=String(v),dec_part=(s.split('.')[1]||''),places=dec_part.length;var denom=Math.pow(10,places),numer=Math.round(v*denom);var g=gcd(Math.abs(numer),denom);out.innerHTML='<div><span style="color:rgba(221,225,240,0.45);">Step 1: </span>'+v+' = '+numer+'/'+denom+'</div><div><span style="color:rgba(221,225,240,0.45);">GCF = '+g+' ? simplified: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+(numer/g)+'/'+(denom/g)+'</span></div>';}else{var v=parseFloat(document.getElementById('convVal').value);if(isNaN(v)){out.innerHTML='<span style="color:#fca5a5;">Enter a value.</span>';return;}var pct=v<=1?v*100:v,dec2=v>1?v/100:v;out.innerHTML='<div><span style="color:rgba(221,225,240,0.45);">As decimal: </span><span style="color:#6ee7b7;font-weight:700;">'+dec2+'</span></div><div><span style="color:rgba(221,225,240,0.45);">As percentage: </span><span style="color:#fbbf24;font-weight:700;">'+pct+'%</span></div>';}}
            document.getElementById('convBtn').addEventListener('click',convert);setMode();convert();
          })();
          </script>
        `
        the length of the recurring block.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Write 0,375 as a fraction in simplest form:", options: ["375/1000", "3/8", "37/100", "7/20"], answer: 1, topic: "Decimals" },
        { type: "input", text: "Convert 7/8 to a decimal.", answer: "0.875", topic: "Decimals" },
        { type: "mc", text: "Express 0,2� (= 0,222�) as a fraction:", options: ["2/9", "1/5", "2/10", "22/99"], answer: 0, topic: "Decimals" },
        { type: "input", text: "Convert 0,45 to a percentage.", answer: "45", topic: "Decimals" },
        { type: "mc", text: "Which decimal is equivalent to 5/12?", options: ["0,416�", "0,41�6�", "0,4166�", "Both a) and c)"], answer: 3, topic: "Decimals" },
      ]
    },
  ],
  workbook: {
    chapter: 3, chapterName: "Common & Decimal Fractions",
    topics: [
      {
        name: "Common Fractions",
        questions: [
          {
            num: "1",
            text: "Calculate, simplifying all answers:",
            parts: [
              { label: "a)", text: "3/5 + 7/10 - 1/2", marks: 3 },
              { label: "b)", text: "4/9 � 3/8 � 1/6", marks: 4 },
              { label: "c)", text: "2 3/4 + 1 5/6", marks: 3 },
              { label: "d)", text: "3 1/3 � 2 1/2", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Decimal Fractions",
        questions: [
          {
            num: "2",
            text: "Convert each decimal to a fraction in simplest form:",
            parts: [
              { label: "a)", text: "0,48", marks: 2 },
              { label: "b)", text: "1,64", marks: 2 },
              { label: "c)", text: "0,5� (0,555�)", marks: 3 },
              { label: "d)", text: "0,81� (0,8111�)", marks: 4 },
            ]
          },
          {
            num: "3",
            text: "Convert each fraction to a decimal (indicate recurring decimals with dot notation):",
            parts: [
              { label: "a)", text: "7/8", marks: 2 },
              { label: "b)", text: "5/9", marks: 2 },
              { label: "c)", text: "4/15", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 3, chapterName: "Chapter 3 � Common & Decimal Fractions",
    topics: [
      {
        name: "Common Fractions",
        answers: [
          { num: "Q1a", ans: "4/5", note: "LCD = 10: 6/10 + 7/10 - 5/10 = 8/10 = 4/5" },
          { num: "Q1b", ans: "1", note: "4/9 � 3/8 = 12/72 = 1/6; then 1/6 � 1/6 = 1" },
          { num: "Q1c", ans: "4 7/12", note: "11/4 + 11/6 = 33/12 + 22/12 = 55/12 = 4 7/12" },
          { num: "Q1d", ans: "1 1/3", note: "10/3 � 5/2 = 10/3 � 2/5 = 20/15 = 4/3 = 1 1/3" },
        ]
      },
      {
        name: "Decimal Fractions",
        answers: [
          { num: "Q2a", ans: "12/25", note: "48/100 = 12/25" },
          { num: "Q2b", ans: "1 16/25", note: "164/100 = 41/25 = 1 16/25" },
          { num: "Q2c", ans: "5/9", note: "x = 0,5�; 10x = 5,5�; 9x = 5; x = 5/9" },
          { num: "Q2d", ans: "73/90", note: "let x = 0,81�; 10x = 8,1�; 90x = 73; x = 73/90" },
          { num: "Q3a", ans: "0,875", note: "7 � 8 = 0,875" },
          { num: "Q3b", ans: "0,5�", note: "5 � 9 = 0,555�" },
          { num: "Q3c", ans: "0,26�", note: "4 � 15 = 0,2666�" },
        ]
      },
    ]
  }
});
