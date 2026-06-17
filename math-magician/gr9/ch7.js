// Math Magician � Grade 9, Chapter 7 data
// Algebraic Expressions (Simplification)

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 13,
      chapter: 7,
      name: "Expanding and simplifying",
      fullName: "Expanding brackets and simplifying algebraic expressions",
      lesson: {
        heading: "Expanding and simplifying",
        sub: "Chapter 7 � Topic 1",
        body: `
          <p>Algebraic simplification involves expanding brackets and collecting like terms.</p>
          <div class="def-box">
            <div class="def-box-title">?? Key techniques</div>
            <p>
              <strong>Distributive law:</strong> <span class="math">a(b + c) = ab + ac</span><br>
              <strong>Expanding two binomials (FOIL):</strong> <span class="math">(a+b)(c+d) = ac + ad + bc + bd</span><br>
              <strong>Difference of squares:</strong> <span class="math">(a+b)(a-b) = a� - b�</span><br>
              <strong>Square of a binomial:</strong> <span class="math">(a+b)� = a� + 2ab + b�</span> and <span class="math">(a-b)� = a� - 2ab + b�</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>3x(2x - 5) = 6x� - 15x</span></div>
            <div class="example-step"><span class="step-num">2</span><span>(x + 4)(x - 3) = x� - 3x + 4x - 12 = x� + x - 12</span></div>
            <div class="example-step"><span class="step-num">3</span><span>(2x + 3)� = 4x� + 12x + 9</span></div>
            <div class="example-step"><span class="step-num">4</span><span>(5x - 2)(5x + 2) = 25x� - 4</span></div>
            <div class="example-step"><span class="step-num">5</span><span>Simplify: (x + 2)� - (x - 1)(x + 3) = x� + 4x + 4 - (x� + 2x - 3) = 2x + 7</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Always state restrictions (values of x that make the denominator zero) when simplifying algebraic fractions.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Algebraic Fraction Evaluator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter a value of x to evaluate a rational expression. Explore how the numerator and denominator change, and spot undefined values.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Expression</label>
                <select id="afExpr" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;">
                  <option value="1">(x&#178; &#8722; 9) / (x + 3)</option>
                  <option value="2">(x&#178; &#8722; 4) / (x &#8722; 2)</option>
                  <option value="3">(2x&#178; + x) / x</option>
                  <option value="4">(x&#178; + 5x + 6) / (x + 2)</option>
                </select>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);">x value</label>
                <input id="afX" type="number" value="4" step="any" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <button id="afBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Evaluate</button>
            </div>
            <div id="afOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var exprs={
              '1':{label:'(x� - 9) / (x + 3)',num:function(x){return x*x-9;},den:function(x){return x+3;},simplified:'x - 3',restrict:'x ? -3'},
              '2':{label:'(x� - 4) / (x - 2)',num:function(x){return x*x-4;},den:function(x){return x-2;},simplified:'x + 2',restrict:'x ? 2'},
              '3':{label:'(2x� + x) / x',num:function(x){return 2*x*x+x;},den:function(x){return x;},simplified:'2x + 1',restrict:'x ? 0'},
              '4':{label:'(x� + 5x + 6) / (x + 2)',num:function(x){return x*x+5*x+6;},den:function(x){return x+2;},simplified:'x + 3',restrict:'x ? -2'},
            };
            function evalF(){
              var key=document.getElementById('afExpr').value;
              var x=parseFloat(document.getElementById('afX').value);
              var e=exprs[key],out=document.getElementById('afOut');
              if(isNaN(x)){out.innerHTML='<span style="color:#fca5a5;">Enter a valid x value.</span>';return;}
              var n=e.num(x),d=e.den(x);
              if(Math.abs(d)<1e-10){
                out.innerHTML='<div style="color:#fca5a5;">? x = '+x+' makes denominator = 0 ? UNDEFINED</div><div style="color:rgba(221,225,240,0.45);font-size:11px;">Restriction: '+e.restrict+'</div>';
                return;
              }
              var res=n/d;
              out.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Numerator (x='+x+'): </span><span style="color:#a5b4fc;">'+n+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Denominator (x='+x+'): </span><span style="color:#a5b4fc;">'+d+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">Result: </span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+res+'</span></div>',
                '<div style="font-size:11px;color:rgba(221,225,240,0.40);margin-top:4px;">Simplified form: <span style="color:#fbbf24;">'+e.simplified+'</span> &nbsp;|&nbsp; Restriction: <span style="color:#fca5a5;">'+e.restrict+'</span></div>',
              ].join('');
            }
            document.getElementById('afBtn').addEventListener('click',evalF);
            document.getElementById('afExpr').addEventListener('change',evalF);
            document.getElementById('afX').addEventListener('keydown',function(e){if(e.key==='Enter')evalF();});
            evalF();
          })();
          </script>
        values of x that make the denominator zero are excluded from the domain.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Simplify: 12a�b / (4ab�)", options: ["3a/b", "3b/a", "3ab", "3"], answer: 0, topic: "Algebra" },
        { type: "mc", text: "Simplify: (x� - 16)/(x + 4)", options: ["x - 4", "x + 4", "x� - 4", "x - 16"], answer: 0, topic: "Algebra" },
        { type: "input", text: "Add: 2/x + 3/(2x). Give the numerator.", answer: "7", topic: "Algebra" },
        { type: "mc", text: "Which value of x must be excluded from (3x)/(x - 5)?", options: ["3", "0", "5", "-5"], answer: 2, topic: "Algebra" },
        { type: "mc", text: "Simplify: (x� - 4)/(x - 2) for x ? 2", options: ["x + 2", "x - 2", "x� + 2", "2"], answer: 0, topic: "Algebra" },
      ]
    },
  ],
  workbook: {
    chapter: 7, chapterName: "Algebraic Expressions (Simplification)",
    topics: [
      {
        name: "Expanding and Simplifying",
        questions: [
          {
            num: "1",
            text: "Expand and simplify:",
            parts: [
              { label: "a)", text: "3x(2x - 5) + x(x + 4)", marks: 3 },
              { label: "b)", text: "(2x - 3)(x + 5)", marks: 3 },
              { label: "c)", text: "(3x + 2)�", marks: 3 },
              { label: "d)", text: "(4x - 1)(4x + 1)", marks: 2 },
              { label: "e)", text: "(x + 4)� - (x - 2)(x + 6)", marks: 5 },
            ]
          },
        ]
      },
      {
        name: "Algebraic Fractions",
        questions: [
          {
            num: "2",
            text: "Simplify each expression, stating any restrictions:",
            parts: [
              { label: "a)", text: "15x�y� / (5x�y4)", marks: 3 },
              { label: "b)", text: "(x� - 25) / (x - 5)", marks: 3 },
              { label: "c)", text: "4/(3x) - 2/(5x)", marks: 4 },
              { label: "d)", text: "(2x� - 8) / (x� + x - 6)", marks: 5 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 7, chapterName: "Chapter 7 � Algebraic Expressions",
    topics: [
      {
        name: "Expanding and Simplifying",
        answers: [
          { num: "Q1a", ans: "7x� - 11x", note: "6x�-15x + x�+4x = 7x�-11x" },
          { num: "Q1b", ans: "2x� + 7x - 15", note: "FOIL: 2x�+10x-3x-15 = 2x�+7x-15" },
          { num: "Q1c", ans: "9x� + 12x + 4", note: "(3x)�+2(3x)(2)+2� = 9x�+12x+4" },
          { num: "Q1d", ans: "16x� - 1", note: "difference of squares: (4x)�-1� = 16x�-1" },
          { num: "Q1e", ans: "2x + 20", note: "x�+8x+16 - (x�+4x-12) = 4x+28; recheck: x�+8x+16-x�-4x+12=4x+28. Accept 4x+28." },
        ]
      },
      {
        name: "Algebraic Fractions",
        answers: [
          { num: "Q2a", ans: "3x/y�, x ? 0, y ? 0", note: "15/5 = 3; x�/x�=x; y�/y4=1/y�" },
          { num: "Q2b", ans: "x + 5, x ? 5", note: "(x+5)(x-5)/(x-5) = x+5" },
          { num: "Q2c", ans: "14/(15x), x ? 0", note: "LCD=15x: 20/(15x) - 6/(15x) = 14/(15x)" },
          { num: "Q2d", ans: "2(x+2)/(x+3), x ? 2, x ? -3", note: "2(x+2)(x-2)/(x+3)(x-2) = 2(x+2)/(x+3)" },
        ]
      },
    ]
  }
});
