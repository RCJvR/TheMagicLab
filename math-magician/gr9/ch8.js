// Math Magician � Grade 9, Chapter 8 data
// Factorisation

MathMagician.registerChapter(8, {
  topics: [
    {
      id: 15,
      chapter: 8,
      name: "Common factors and grouping",
      fullName: "HCF and grouping in pairs",
      lesson: {
        heading: "Common factors and grouping",
        sub: "Chapter 8 � Topic 1",
        body: `
          <p>Factorisation is the reverse of expansion. We take an expression and write it as a product of factors.</p>
          <div class="def-box">
            <div class="def-box-title">?? Factorisation methods � Grade 9</div>
            <p>
              <strong>1. HCF (Highest Common Factor):</strong> take out the largest common factor.<br>
              <strong>2. Difference of squares:</strong> <span class="math">a� - b� = (a+b)(a-b)</span><br>
              <strong>3. Trinomials:</strong> <span class="math">x� + bx + c = (x + p)(x + q)</span> where p + q = b and pq = c.<br>
              <strong>4. Grouping in pairs:</strong> group terms, factorise each group, extract common bracket.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>HCF: 6x�y - 9xy� = 3xy(2x - 3y)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Grouping: 3ax + 3ay + bx + by = 3a(x + y) + b(x + y) = (3a + b)(x + y)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Always check for HCF first before applying other methods.</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Always take out the HCF first before applying any other factorisation method.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; HCF & Grouping Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter up to four coefficients. Find their HCF and see how a common factor is extracted.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Term 1</label><input id="hcf1" type="number" value="12" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Term 2</label><input id="hcf2" type="number" value="8" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Term 3 (opt)</label><input id="hcf3" type="number" placeholder="�" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Term 4 (opt)</label><input id="hcf4" type="number" placeholder="�" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="hcfBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Find HCF</button>
            </div>
            <div id="hcfOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
            function primeFactors(n){n=Math.abs(n);var factors=[];for(var p=2;p*p<=n;p++){while(n%p===0){factors.push(p);n/=p;}}if(n>1)factors.push(n);return factors;}
            function calc(){
              var vals=[1,2,3,4].map(function(i){return parseInt(document.getElementById('hcf'+i).value);}).filter(function(v){return!isNaN(v)&&v!==0;});
              if(vals.length<2){document.getElementById('hcfOut').innerHTML='<span style="color:#fca5a5;">Enter at least 2 non-zero terms.</span>';return;}
              var h=vals.reduce(gcd);
              var factored=vals.map(function(v){return v+' = '+h+(v/h!==1?' � '+(v/h):'');});
              var divided=vals.map(function(v){return (v/h);});
              document.getElementById('hcfOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Terms: </span><span style="color:#a5b4fc;">'+vals.join(', ')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">HCF: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+h+'</span></div>',
                '<div style="font-size:11px;color:rgba(221,225,240,0.40);">'+factored.join(' &nbsp;|&nbsp; ')+'</div>',
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Factored form: </span><span style="color:#fbbf24;font-weight:700;">'+h+'('+divided.join(' + ')+')</span></div>',
                '<div style="font-size:10px;color:rgba(221,225,240,0.35);margin-top:4px;">Prime factors of HCF ('+h+'): '+primeFactors(h).join(' � ')+'</div>',
              ].join('');
            }
            document.getElementById('hcfBtn').addEventListener('click',calc);

          })();
          </script>
        ALWAYS look for a common factor first. It simplifies all other methods that follow.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Factorise: 12x�y� - 8x�y�", options: ["4x�y�(3x - 2y)", "4xy(3x� - 2y�)", "2xy(6x� - 4xy)", "4x�y(3y - 2x)"], answer: 0, topic: "Factorisation" },
        { type: "mc", text: "Factorise by grouping: ax + ay + 3x + 3y", options: ["(a + 3)(x + y)", "a(x + y) + 3", "(a + x)(3 + y)", "(ax)(3y)"], answer: 0, topic: "Factorisation" },
        { type: "input", text: "Factorise 15a�b� - 10ab�. What is the coefficient of the HCF?", answer: "5", topic: "Factorisation" },
        { type: "mc", text: "Factorise by grouping: px - qx + py - qy", options: ["(p - q)(x + y)", "(p + q)(x - y)", "(p - q)(x - y)", "(x + y)(p + q)"], answer: 0, topic: "Factorisation" },
        { type: "mc", text: "Which expression has (2x - y) as a factor?", options: ["4x� + y�", "4x� - y�", "2x� - y", "4x - 2y"], answer: 1, topic: "Factorisation" },
      ]
    },
    {
      id: 16,
      chapter: 8,
      name: "Difference of squares and trinomials",
      fullName: "Difference of squares and factorising trinomials",
      lesson: {
        heading: "Difference of squares and trinomials",
        sub: "Chapter 8 � Topic 2",
        body: `
          <p>Two powerful factorisation techniques: difference of squares and trinomials.</p>
          <div class="def-box">
            <div class="def-box-title">?? Formulas and rules</div>
            <p>
              <strong>Difference of squares:</strong> <span class="math">a� - b� = (a + b)(a - b)</span><br>
              Only works when both terms are perfect squares and there is a MINUS sign.<br><br>
              <strong>Trinomial x� + bx + c:</strong><br>
              Find two numbers p and q such that p � q = c and p + q = b.<br>
              Then: <span class="math">x� + bx + c = (x + p)(x + q)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>9x� - 25 = (3x + 5)(3x - 5)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>x� + 7x + 12: need p � q = 12 and p + q = 7 ? p = 3, q = 4 ? (x + 3)(x + 4)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>x� - 5x - 14: need pq = -14, p+q = -5 ? p = -7, q = 2 ? (x - 7)(x + 2)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>2x� - 8 = 2(x� - 4) = 2(x + 2)(x - 2) (HCF first!)</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>For trinomials, always check: p + q = b (middle term coefficient) AND p � q = c (constant). 
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Quadratic Factoriser</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter a, b, c for ax&#178; + bx + c. See the discriminant, roots, and factorised form.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">a</label><input id="faca4" type="number" value="2" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">b</label><input id="facb4" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">c</label><input id="facc4" type="number" value="-3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="facBtn4" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Factorise</button>
            </div>
            <div id="facOut4" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function solve(){
              const a=parseInt(document.getElementById('faca4').value)||1;
              const b=parseInt(document.getElementById('facb4').value)||0;
              const c=parseInt(document.getElementById('facc4').value)||0;
              const d=b*b-4*a*c;
              const bStr=b===0?'':b>0?' + '+b+'x':' \u2212 '+Math.abs(b)+'x';
              const cStr=c===0?'':c>0?' + '+c:' \u2212 '+Math.abs(c);
              let lines=['<div><span style="color:rgba(221,225,240,0.45);">Expression: </span><span style="color:#fbbf24;">'+(a===1?'':a)+'x\xb2'+bStr+cStr+'</span></div>','<div><span style="color:rgba(221,225,240,0.45);">\u0394 = '+b+'\xb2\u22124('+a+')('+c+') = </span><span style="color:#a5b4fc;">'+d+'</span></div>'];
              if(d<0){lines.push('<div style="color:#fca5a5;">\u0394 &lt; 0 \u2192 no real roots</div>');}
              else{const sq=Math.sqrt(d),isRat=Number.isInteger(sq);const x1=(-b+sq)/(2*a),x2=(-b-sq)/(2*a);
                if(isRat){lines.push('<div><span style="color:rgba(221,225,240,0.45);">Roots: </span><span style="color:#6ee7b7;">x = '+x1+(x1!==x2?' or x = '+x2:'  (equal)')+'</span></div>');
                  const f=x=>(x>=0?'\u2212 '+x:'+ '+Math.abs(x));
                  lines.push('<div><span style="color:rgba(221,225,240,0.45);">Factorised: </span><span style="color:#6ee7b7;font-size:14px;font-weight:700;">'+(x1===x2?(a!==1?a:'')+'(x '+f(x1)+')\xb2':'(x '+f(x1)+')('+(a!==1?a:'')+'x '+f(x2)+')')+'</span></div>');}
                else{lines.push('<div style="color:#fbbf24;">Irrational roots \u2014 use x = ('+(-b)+' \xb1 \u221a'+d+') / '+(2*a)+'</div>');}}
              document.getElementById('facOut4').innerHTML=lines.join('');
            }
            document.getElementById('facBtn4').addEventListener('click',solve);
            ['faca4','facb4','facc4'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')solve();}));
            solve();
          })();
          </script>
        Both conditions must hold.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Factorise: 4x� - 49", options: ["(2x - 7)(2x - 7)", "(2x - 7)(2x + 7)", "(4x - 7)(x + 7)", "(2x + 49)(2x - 1)"], answer: 1, topic: "Factorisation" },
        { type: "mc", text: "Factorise: x� + 9x + 20", options: ["(x + 4)(x + 5)", "(x + 2)(x + 10)", "(x + 1)(x + 20)", "(x−4)(x−5)"/*JUNK�*/], answer: 0, topic: "Factorisation" },
        { type: "mc", text: "Factorise: x� - 3x - 18", options: ["(x - 9)(x + 2)", "(x + 3)(x - 6)", "(x - 3)(x + 6)", "(x - 6)(x + 3)"], answer: 3, topic: "Factorisation" },
        { type: "input", text: "Factorise: 3x� - 48. What is the constant in one of the linear factors? (give positive value)", answer: "4", topic: "Factorisation" },
        { type: "mc", text: "Factorise completely: 2x� - 2x - 24", options: ["2(x - 4)(x + 3)", "2(x + 4)(x - 3)", "(2x - 6)(x + 4)", "2(x - 4)(x - 3)"], answer: 0, topic: "Factorisation" },
      ]
    },
  ],
  workbook: {
    chapter: 8, chapterName: "Factorisation",
    topics: [
      {
        name: "HCF and Grouping",
        questions: [
          {
            num: "1",
            text: "Factorise fully:",
            parts: [
              { label: "a)", text: "18a�b - 12a�b� + 6ab�", marks: 3 },
              { label: "b)", text: "3ax + 6ay - bx - 2by", marks: 4 },
              { label: "c)", text: "2p(x - 3) - 5(3 - x)", marks: 4 },
            ]
          },
        ]
      },
      {
        name: "Difference of Squares and Trinomials",
        questions: [
          {
            num: "2",
            text: "Factorise fully:",
            parts: [
              { label: "a)", text: "25x� - 64", marks: 2 },
              { label: "b)", text: "3x� - 75", marks: 3 },
              { label: "c)", text: "x� + 8x + 15", marks: 3 },
              { label: "d)", text: "x� - 4x - 12", marks: 3 },
              { label: "e)", text: "2x� + 14x + 24", marks: 4 },
              { label: "f)", text: "x� - 16 + x(x - 4)", marks: 5 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 8, chapterName: "Chapter 8 � Factorisation",
    topics: [
      {
        name: "HCF and Grouping",
        answers: [
          { num: "Q1a", ans: "6ab(3a� - 2ab + b�)", note: "HCF = 6ab" },
          { num: "Q1b", ans: "(3a - b)(x + 2y)", note: "3a(x+2y) - b(x+2y) = (3a-b)(x+2y)" },
          { num: "Q1c", ans: "(2p + 5)(x - 3)", note: "Note 3-x = -(x-3); -5(3-x) = +5(x-3); factor out (x-3)" },
        ]
      },
      {
        name: "Difference of Squares and Trinomials",
        answers: [
          { num: "Q2a", ans: "(5x - 8)(5x + 8)", note: "v25x�=5x; v64=8" },
          { num: "Q2b", ans: "3(x - 5)(x + 5)", note: "HCF 3 first: 3(x�-25) = 3(x-5)(x+5)" },
          { num: "Q2c", ans: "(x + 3)(x + 5)", note: "3 � 5 = 15; 3 + 5 = 8 ?" },
          { num: "Q2d", ans: "(x - 6)(x + 2)", note: "-6 � 2 = -12; -6 + 2 = -4 ?" },
          { num: "Q2e", ans: "2(x + 3)(x + 4)", note: "HCF 2; x�+7x+12 = (x+3)(x+4)" },
          { num: "Q2f", ans: "(x + 4)(x - 4) + x(x - 4) = (x - 4)(2x + 4) = 2(x - 4)(x + 2)", note: "factor (x-4) from both parts" },
        ]
      },
    ]
  }
});
