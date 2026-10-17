// Math Magician — Grade 9, Chapter 1 data
// Number Systems, Ratios, Rates, and Financial Mathematics

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 0,
      chapter: 1,
      name: "Number systems",
      fullName: "Number systems and rational numbers",
      lesson: {
        heading: "Number systems and rational numbers",
        sub: "Chapter 1 · Topic 1",
        body: `
          <p>The <strong>real number system</strong> is a hierarchy of number sets, each contained within the next.</p>
          <div class="def-box">
            <div class="def-box-title">📖 The number hierarchy</div>
            <p>
              <strong>Natural numbers (N):</strong> {1, 2, 3, …} — counting numbers.<br>
              <strong>Whole numbers (N0):</strong> {0, 1, 2, 3, …} — includes zero.<br>
              <strong>Integers (Z):</strong> {…, -2, -1, 0, 1, 2, …} — includes negatives.<br>
              <strong>Rational numbers (Q):</strong> any number expressible as <span class="math">p/q</span> where p, q ∈ Z, q ≠ 0. Includes all terminating and recurring decimals.<br>
              <strong>Irrational numbers:</strong> non-terminating, non-recurring decimals (e.g. <span class="math">√2, π</span>).<br>
              <strong>Real numbers (R):</strong> all rational and irrational numbers.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Classifying numbers</div>
            <div class="example-step"><span class="step-num">1</span><span>Classify <span class="math">-3</span>: integer ✓, rational ✓, real ✓</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Classify <span class="math">0,<span style="text-decoration:overline">3</span> = 1/3</span>: rational ✓, real ✓</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Classify <span class="math">√7</span>: irrational ✓, real ✓ (not rational)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Converting recurring decimal: let x = 0,<span style="text-decoration:overline">36</span> → 100x = 36,<span style="text-decoration:overline">36</span> → 99x = 36 → x = 36/99 = 4/11</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Every integer is rational (e.g. -5 = -5/1). Not every rational is an integer.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Number Classifier</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Type a number — an integer, decimal, fraction, root, π or a recurring decimal such as 0,(36) — and see every set it belongs to.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9ncIn" id="g9ncInL">Number</label><input id="g9ncIn" type="text" value="-3" autocomplete="off" style="width:150px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;"><button type="button" data-g9nc="7" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">7</button><button type="button" data-g9nc="0" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">0</button><button type="button" data-g9nc="-12" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">-12</button><button type="button" data-g9nc="3/4" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">3/4</button><button type="button" data-g9nc="0,(36)" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">0,(36)</button><button type="button" data-g9nc="√7" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">√7</button><button type="button" data-g9nc="√49" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">√49</button><button type="button" data-g9nc="π" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">π</button><button type="button" data-g9nc="22/7" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">22/7</button><button type="button" data-g9nc="√-4" style="padding:4px 10px;border-radius:999px;border:1px solid rgba(99,102,241,0.40);background:rgba(99,102,241,0.12);color:#c7d2fe;font-family:JetBrains Mono,monospace;font-size:12px;cursor:pointer;">√-4</button></div>
            <div id="g9ncOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function numberClassifier(T) {
  var $ = function (id) { return document.getElementById(id); };
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function isSq(n) { if (n < 0 || n !== Math.floor(n)) return false; var r = Math.round(Math.sqrt(n)); return r * r === n; }
  // Returns {kind:'rational', p, q} | {kind:'irrational', why} | {kind:'nonreal'} | {kind:'undef'} | null
  function parse(raw) {
    var s = raw.replace(/\\s+/g, '').replace(/,/g, '.').replace(/−/g, '-').toLowerCase();
    if (!s) return null;
    var neg = false;
    if (s[0] === '-') { neg = true; s = s.slice(1); } else if (s[0] === '+') s = s.slice(1);
    if (s === 'π' || s === 'pi' || s === 'e') return { kind: 'irrational', why: T.whyPi };
    var m = s.match(/^(?:√|sqrt)\\(?([0-9.\\/]+)\\)?$/);
    if (m) {
      if (neg) { var inner = parse(m[1]); if (!inner || inner.kind !== 'rational') return inner; }
      var v = parse(m[1]);
      if (!v || v.kind !== 'rational') return v;
      if (isSq(v.p) && isSq(v.q)) { var p = Math.round(Math.sqrt(v.p)), q = Math.round(Math.sqrt(v.q)); return { kind: 'rational', p: neg ? -p : p, q: q, why: T.whySq }; }
      return { kind: 'irrational', why: T.whyRoot };
    }
    m = s.match(/^\\(?(?:√|sqrt)\\(?-([0-9.]+)\\)?\\)?$/);
    if (m) return { kind: 'nonreal' };
    m = s.match(/^([0-9]+)\\/([0-9]+)$/);
    if (m) {
      var a = +m[1], b = +m[2];
      if (b === 0) return { kind: 'undef' };
      var g = gcd(a, b); return { kind: 'rational', p: (neg ? -a : a) / g, q: b / g, why: T.whyFrac };
    }
    // recurring decimal written as 0.(36) or 0.1(6)
    m = s.match(/^([0-9]*)\\.([0-9]*)\\(([0-9]+)\\)$/);
    if (m) {
      var ip = m[1] || '0', nr = m[2], rep = m[3];
      var num = +(ip + nr + rep) - +(ip + nr), den = (Math.pow(10, rep.length) - 1) * Math.pow(10, nr.length);
      var g2 = gcd(num, den); return { kind: 'rational', p: (neg ? -num : num) / g2, q: den / g2, why: T.whyRec };
    }
    m = s.match(/^([0-9]*)(?:\\.([0-9]+))?$/);
    if (m && (m[1] || m[2])) {
      var dec = m[2] || '', den2 = Math.pow(10, dec.length), num2 = +((m[1] || '0') + dec);
      var g3 = gcd(num2, den2); return { kind: 'rational', p: (neg ? -num2 : num2) / g3, q: den2 / g3, why: dec ? T.whyDec : T.whyInt };
    }
    return null;
  }
  function run() {
    var r = parse($('g9ncIn').value), out = $('g9ncOut');
    if (!r) { out.innerHTML = '<span style="color:#fca5a5;">' + T.bad + '</span>'; return; }
    if (r.kind === 'undef') { out.innerHTML = '<span style="color:#fca5a5;">' + T.undef + '</span>'; return; }
    if (r.kind === 'nonreal') { out.innerHTML = '<span style="color:#fca5a5;">' + T.nonreal + '</span>'; return; }
    var rat = r.kind === 'rational', integer = rat && r.q === 1;
    var sets = [
      ['ℕ', T.nat, integer && r.p > 0],
      ['ℕ₀', T.whole, integer && r.p >= 0],
      ['ℤ', T.int, integer],
      ['ℚ', T.rat, rat],
      ["ℚ′", T.irr, !rat],
      ['ℝ', T.real, true],
    ];
    var html = sets.map(function (x) {
      return '<div><span style="display:inline-block;width:34px;color:#a5b4fc;font-weight:700;">' + x[0] + '</span><span style="display:inline-block;width:170px;color:rgba(221,225,240,0.55);">' + x[1] + '</span>' +
        (x[2] ? '<span style="color:#6ee7b7;">✓</span>' : '<span style="color:rgba(252,165,165,0.7);">✗</span>') + '</div>';
    }).join('');
    var note = rat ? (integer ? T.equals + ' ' + r.p : T.equals + ' ' + r.p + '/' + r.q) + ' — ' + r.why : r.why;
    out.innerHTML = html + '<div style="margin-top:6px;color:#fbbf24;">' + note + '</div>';
  }
  $('g9ncIn').addEventListener('input', run);
  document.querySelectorAll('[data-g9nc]').forEach(function (b) {
    b.addEventListener('click', function () { $('g9ncIn').value = b.getAttribute('data-g9nc'); run(); });
  });
  run();
})({"tryit":"Try it","nat":"natural numbers","whole":"whole numbers","int":"integers","rat":"rational numbers","irr":"irrational numbers","real":"real numbers","equals":"=","whyInt":"an integer is a rational number (it can be written over 1).","whyDec":"a terminating decimal is rational.","whyFrac":"a fraction of integers is rational.","whyRec":"a recurring decimal is rational.","whySq":"the root of a perfect square is rational.","whyRoot":"the square root of a number that is not a perfect square is irrational — its decimals never end or repeat.","whyPi":"π is irrational — its decimals never end or repeat (22/7 is only an approximation).","bad":"Type a number such as -3, 0,75, 3/4, √7, π or 0,(36).","undef":"Division by zero is undefined — it is not a number.","nonreal":"The square root of a negative number is non-real — it is not in ℝ."});
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Which of these is irrational?", options: ["0,25", "√9", "√5", "-7"], answer: 2, topic: "Number Systems" },
        { type: "mc", text: "The set of integers is a subset of:", options: ["Natural numbers", "Whole numbers", "Rational numbers", "Irrational numbers"], answer: 2, topic: "Number Systems" },
        { type: "input", text: "Convert 0,<span style='text-decoration:overline'>27</span> to a fraction in simplest form. Give the numerator.", answer: "3", topic: "Number Systems" },
        { type: "mc", text: "Which statement is FALSE?", options: ["All naturals are integers", "All integers are rational", "All irrationals are real", "All rationals are integers"], answer: 3, topic: "Number Systems" },
        { type: "input", text: "Write 0,<span style='text-decoration:overline'>142857</span> as a fraction (give the denominator).", answer: "7", topic: "Number Systems" },
        { type: "input", text: "Calculate 0,<span style='text-decoration:overline'>18</span> + 0,2 and give the answer as a single fraction a/b in simplest form (write it as a/b).", answer: "21/55", altAnswers: ["21​/​55"], topic: "Number Systems" },
        { type: "mc", text: "Consider the product <span class='math'>√2 × √8</span>. What can you conclude?", options: ["It is irrational, since irrational × irrational is always irrational", "It is rational, equal to 4", "It is irrational, equal to √16", "It cannot be simplified"], answer: 1, topic: "Number Systems" },
      ]
    },
    {
      id: 1,
      chapter: 1,
      name: "Ratios and rates",
      fullName: "Ratios, rates and direct/inverse proportion",
      lesson: {
        heading: "Ratios, rates and proportion",
        sub: "Chapter 1 · Topic 2",
        body: `
          <p>A <strong>ratio</strong> compares quantities of the same kind. A <strong>rate</strong> compares quantities of different kinds (e.g. km/h).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key definitions</div>
            <p>
              <strong>Ratio a : b:</strong> for every a units of one quantity there are b units of another.<br>
              <strong>Rate:</strong> ratio with different units — e.g. price per kg, km per litre.<br>
              <strong>Direct proportion:</strong> as one quantity increases, the other increases proportionally. <span class="math">y = kx</span>.<br>
              <strong>Inverse proportion:</strong> as one quantity increases, the other decreases. <span class="math">y = k/x</span>.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Share R 720 in the ratio 3 : 5 : 4 → Total parts = 12; 1 part = R 60 → shares: R 180, R 300, R 240</span></div>
            <div class="example-step"><span class="step-num">2</span><span>If 5 workers take 12 days (inverse proportion), how long for 4 workers? → 5 × 12 = 4 × d → d = 15 days</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Unit rate: 252 km on 18 L → 252 ÷ 18 = 14 km/L</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For inverse proportion, the product stays constant: <span class="math"> x1y1 = x2y2</span>.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Ratio & Proportion Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Share an amount in a ratio, solve direct or inverse proportion, or work with a unit rate.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9rpMode">Type</label><select id="g9rpMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;">
              <option value="share">Share in a ratio</option>
              <option value="direct">Direct proportion</option>
              <option value="inverse">Inverse proportion</option>
              <option value="rate">Unit rate</option></select></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9rpA" id="g9rpAL"></label><input id="g9rpA" type="number" value="720" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9rpB" id="g9rpBL"></label><input id="g9rpB" type="text" value="3:5:4" autocomplete="off" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9rpC" id="g9rpCL"></label><input id="g9rpC" type="number" value="" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
            <div id="g9rpOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function ratioProportion(T) {
  var $ = function (id) { return document.getElementById(id); };
  function f(x) { return Math.round(x * 1000) / 1000; }
  function labels() {
    var m = $('g9rpMode').value, L = T.modes[m];
    ['g9rpA', 'g9rpB', 'g9rpC'].forEach(function (id, i) { $(id + 'L').textContent = L[i]; });
    $('g9rpB').type = m === 'share' ? 'text' : 'number';
    if (m === 'share') { $('g9rpA').value = 720; $('g9rpB').value = '3:5:4'; $('g9rpC').parentNode.style.display = 'none'; }
    else {
      $('g9rpC').parentNode.style.display = '';
      var d = { direct: [5, 60, 8], inverse: [5, 12, 4], rate: [252, 18, 30] }[m];
      $('g9rpA').value = d[0]; $('g9rpB').value = d[1]; $('g9rpC').value = d[2];
    }
    run();
  }
  function run() {
    var m = $('g9rpMode').value, out = $('g9rpOut');
    var a = parseFloat(String($('g9rpA').value).replace(',', '.')), c = parseFloat(String($('g9rpC').value).replace(',', '.'));
    var h = '';
    if (m === 'share') {
      var parts = String($('g9rpB').value).split(':').map(function (x) { return parseFloat(x.replace(',', '.')); });
      if (isNaN(a) || parts.length < 2 || parts.some(function (x) { return isNaN(x) || x <= 0; })) { out.innerHTML = '<span style="color:#fca5a5;">' + T.badShare + '</span>'; return; }
      var tot = parts.reduce(function (s, x) { return s + x; }, 0), one = a / tot;
      h = '<div>' + T.totalParts + ' = ' + parts.join(' + ') + ' = <b>' + tot + '</b></div>' +
        '<div>' + T.onePart + ' = ' + f(a) + ' ÷ ' + tot + ' = <b>' + f(one) + '</b></div>' +
        '<div style="color:#6ee7b7;">' + parts.map(function (x) { return x + ' × ' + f(one) + ' = <b>' + f(x * one) + '</b>'; }).join(' &nbsp;|&nbsp; ') + '</div>';
    } else {
      var b = parseFloat(String($('g9rpB').value).replace(',', '.'));
      if ([a, b, c].some(isNaN) || a === 0) { out.innerHTML = '<span style="color:#fca5a5;">' + T.badNum + '</span>'; return; }
      if (m === 'direct') {
        var k = b / a;
        h = '<div>' + T.directK + ': k = y ÷ x = ' + f(b) + ' ÷ ' + f(a) + ' = <b>' + f(k) + '</b></div>' +
          '<div style="color:#6ee7b7;">y = k × x = ' + f(k) + ' × ' + f(c) + ' = <b>' + f(k * c) + '</b></div>';
      } else if (m === 'inverse') {
        if (c === 0) { out.innerHTML = '<span style="color:#fca5a5;">' + T.badNum + '</span>'; return; }
        var p = a * b;
        h = '<div>' + T.inverseK + ': x × y = ' + f(a) + ' × ' + f(b) + ' = <b>' + f(p) + '</b></div>' +
          '<div style="color:#6ee7b7;">y = ' + f(p) + ' ÷ ' + f(c) + ' = <b>' + f(p / c) + '</b></div>';
      } else {
        if (b === 0) { out.innerHTML = '<span style="color:#fca5a5;">' + T.badNum + '</span>'; return; }
        var u = a / b;
        h = '<div>' + T.unitRate + ' = ' + f(a) + ' ÷ ' + f(b) + ' = <b>' + f(u) + '</b> ' + T.perUnit + '</div>' +
          '<div style="color:#6ee7b7;">' + f(c) + ' × ' + f(u) + ' = <b>' + f(c * u) + '</b></div>';
      }
    }
    out.innerHTML = h;
  }
  $('g9rpMode').addEventListener('change', labels);
  ['g9rpA', 'g9rpB', 'g9rpC'].forEach(function (id) { $(id).addEventListener('input', run); });
  labels();
})({"tryit":"Try it","modes":{"share":["Amount","Ratio (e.g. 3:5:4)",""],"direct":["x₁","y₁","new x"],"inverse":["x₁ (e.g. workers)","y₁ (e.g. days)","new x"],"rate":["Total amount","Units","How many units?"]},"totalParts":"Total parts","onePart":"One part","directK":"Direct proportion (y ÷ x is constant)","inverseK":"Inverse proportion (x × y is constant)","unitRate":"Unit rate","perUnit":"per unit","badShare":"Enter an amount and a ratio such as 3:5 or 3:5:4.","badNum":"Enter non-zero numbers."});
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Share R 1 200 in the ratio 2 : 3 : 5. The largest share is:", options: ["R 240", "R 360", "R 480", "R 600"], answer: 3, topic: "Ratios" },
        { type: "input", text: "8 taps fill a tank in 6 hours. How many hours would 4 taps take?", answer: "12", topic: "Rates" },
        { type: "mc", text: "Which equation shows inverse proportion between x and y?", options: ["y = 3x", "y = x + 3", "y = 3/x", "y = x²"], answer: 2, topic: "Ratios" },
        { type: "input", text: "A car travels 390 km on 30 litres. Calculate fuel consumption in km per litre.", answer: "13", topic: "Rates" },
        { type: "mc", text: "If y is directly proportional to x and y = 18 when x = 6, find y when x = 10.", options: ["30", "60", "3", "108"], answer: 0, topic: "Ratios" },
        { type: "input", text: "A recipe needs flour, sugar and butter in the ratio 5 : 2 : 3. You have 800 g of flour (enough for a full batch) but only 250 g of butter. How many more grams of butter do you need to buy?", answer: "230", topic: "Ratios" },
        { type: "input", text: "12 workers can build a wall in 18 days. They work for 6 days, then 4 workers leave the job. Using the fact that total worker-days stays constant, calculate the total number of days (from the start) needed to finish the wall.", answer: "24", topic: "Rates" },
      ]
    },
    {
      id: 2,
      chapter: 1,
      name: "Financial mathematics",
      fullName: "Financial mathematics: interest, VAT and exchange rates",
      lesson: {
        heading: "Financial mathematics",
        sub: "Chapter 1 · Topic 3",
        body: `
          <p>Financial mathematics covers calculating interest, taxes, and currency conversions.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key formulas</div>
            <p>
              <strong>Simple interest:</strong> <span class="math">I = P × i × n</span> where P = principal, i = rate (decimal), n = time in years.<br>
              <strong>Compound interest:</strong> <span class="math">A = P(1 + i)n</span><br>
              <strong>VAT (15%):</strong> VAT-inclusive = price × 1,15<br>
              <strong>Hire purchase:</strong> deposit + (monthly instalment × months)<br>
              <strong>Exchange rate:</strong> multiply or divide depending on currency direction.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>R 5 000 at 8% p.a. simple interest for 3 years: I = 5000 × 0,08 × 3 = R 1 200; Total = R 6 200</span></div>
            <div class="example-step"><span class="step-num">2</span><span>R 10 000 at 9% p.a. compound for 2 years: A = 10 000(1,09)² = 10 000 × 1,1881 = R 11 881</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Exchange rate: 1 USD = R 18,50. Convert $250: 250 × 18,50 = R 4 625</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Compound interest grows faster than simple interest. The difference is noticeable over many years.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Simple vs Compound Interest</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">See how simple and compound interest compare over time at the same rate.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Principal (R)</label><input id="intP2" type="number" value="10000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Rate % p.a.</label><input id="intR2" type="number" value="8" step="0.5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Years</label><input id="intN2" type="number" value="10" min="1" max="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="intBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="intOut2" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function rr(n){return 'R\u202f'+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');}
            function calc(){
              var P=parseFloat(document.getElementById('intP2').value)||10000;
              var rate=parseFloat(document.getElementById('intR2').value)/100||0.08;
              var n=parseInt(document.getElementById('intN2').value)||10;
              var As=P*(1+rate*n),Ac=P*Math.pow(1+rate,n);
              document.getElementById('intOut2').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Simple A = P(1+in):</span><span style="color:#a5b4fc;">'+rr(As)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Simple interest earned:</span><span style="color:#fbbf24;">'+rr(As-P)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Compound A = P(1+i)\u207f:</span><span style="color:#6ee7b7;">'+rr(Ac)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Compound interest earned:</span><span style="color:#6ee7b7;font-weight:700;">'+rr(Ac-P)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Compound advantage:</span><span style="color:#f59e0b;">+'+rr(Ac-As)+'</span></div>',
              ].join('');
            }
            document.getElementById('intBtn2').addEventListener('click',calc);
            ['intP2','intR2','intN2'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});

          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Calculate simple interest on R 6 000 at 7% p.a. for 4 years.", answer: "1680", topic: "Finance" },
        { type: "mc", text: "A laptop costs R 12 000 excluding VAT (15%). The VAT-inclusive price is:", options: ["R 13 200", "R 13 600", "R 13 800", "R 12 800"], answer: 2, topic: "Finance" },
        { type: "input", text: "Calculate compound interest on R 8 000 at 10% p.a. for 2 years. Give total amount.", answer: "9680", topic: "Finance" },
        { type: "mc", text: "If 1 GBP = R 23, how many rands for £150?", options: ["R 3 350", "R 3 400", "R 3 450", "R 3 500"], answer: 2, topic: "Finance" },
        { type: "input", text: "A TV costs R 3 500. You pay a 20% deposit and 12 monthly instalments of R 260. What is the total hire purchase cost?", answer: "3820", topic: "Finance" },
        { type: "input", text: "A jacket has a marked (VAT-inclusive) price of R 690. In a sale it is discounted by 20% off the marked price. Of the new sale price, how much (in rand) is the VAT portion (VAT is 15%)? Round to the nearest rand.", answer: "72", topic: "Finance" },
        { type: "input", text: "A fridge costs R 9 000 cash. On hire purchase you pay a 15% deposit and then 24 monthly instalments of R 350. How much MORE (in rand) do you pay overall on hire purchase compared to the cash price?", answer: "750", topic: "Finance" },
      ]
    },
    {
      id: 101,
      chapter: 1,
      name: "Prime factors, HCF and LCM",
      fullName: "Prime factorisation, highest common factor and lowest common multiple",
      lesson: {
        heading: "Prime factors, HCF and LCM",
        sub: "Chapter 1 · Topic 4",
        body: `
<p>Every whole number bigger than 1 can be written as a product of <strong>prime numbers</strong> in exactly one way. That product is its <strong>prime factorisation</strong>, and it makes the HCF and LCM easy to find.</p>
<div class="mf-fig" data-fig='{"t":"ftree","n":360,"split":[[2,180],[2,90],[2,45],[3,15],[3,5]],"w":260}'></div>
<p>360 = 2 × 2 × 2 × 3 × 3 × 5 = <span class="math">2³ × 3² × 5</span></p>
<div class="def-box">
  <div class="def-box-title">📖 HCF and LCM from prime factors</div>
<p><strong>HCF</strong> (highest common factor): multiply the primes that appear in <em>every</em> number, each with its <em>lowest</em> power.<br><strong>LCM</strong> (lowest common multiple): multiply <em>every</em> prime that appears, each with its <em>highest</em> power.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: HCF and LCM of 84 and 120</div>
  <div class="example-step"><span class="step-num">1</span><span>84 = 2² × 3 × 7 and 120 = 2³ × 3 × 5</span></div>
  <div class="example-step"><span class="step-num">2</span><span>HCF: common primes 2 and 3, lowest powers: <span class="math">2² × 3 = 12</span></span></div>
  <div class="example-step"><span class="step-num">3</span><span>LCM: all primes, highest powers: <span class="math">2³ × 3 × 5 × 7 = 840</span></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: when do the buses meet again?</div>
  <div class="example-step"><span class="step-num">1</span><span>Bus A leaves every 12 minutes, bus B every 18 minutes. Both leave at 07:00.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>They leave together again after LCM(12 ; 18) minutes: 12 = 2² × 3, 18 = 2 × 3², so LCM = 2² × 3² = 36.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Answer: 07:36.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>"Share equally into the biggest groups" asks for the HCF; "happen together again" asks for the LCM.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Find the HCF of 36 and 60.", "answer": "12", "topic": "Prime factors, HCF and LCM"},
        {"type": "input", "text": "Find the LCM of 12 and 18.", "answer": "36", "topic": "Prime factors, HCF and LCM"},
        {"type": "mc", "text": "The prime factorisation of 72 is:", "options": ["2² × 3³", "2³ × 3²", "2 × 36", "8 × 9"], "answer": 1, "topic": "Prime factors, HCF and LCM"},
        {"type": "input", "text": "Find the LCM of 8, 12 and 15.", "answer": "120", "topic": "Prime factors, HCF and LCM"},
        {"type": "input", "text": "Two lights flash together. One flashes every 6 seconds, the other every 8 seconds. After how many seconds do they flash together again?", "answer": "24", "topic": "Prime factors, HCF and LCM"},
        {"type": "input", "text": "Find the HCF of 48, 72 and 120.", "answer": "24", "topic": "Prime factors, HCF and LCM"},
        {"type": "mc", "text": "54 red and 72 blue beads are shared into identical bags with no beads left over. What is the largest number of bags?", "options": ["6", "9", "18", "216"], "answer": 2, "topic": "Prime factors, HCF and LCM"},
      ]
    },
    {
      id: 102,
      chapter: 1,
      name: "Direct and indirect proportion",
      fullName: "Solving problems with direct and indirect (inverse) proportion",
      lesson: {
        heading: "Direct and indirect proportion",
        sub: "Chapter 1 · Topic 5",
        body: `
<p>Two quantities are in <strong>direct proportion</strong> when they grow at the same rate: double one and the other doubles. They are in <strong>indirect (inverse) proportion</strong> when one doubles and the other halves.</p>
<div class="def-box">
  <div class="def-box-title">📖 How to tell them apart</div>
<p><strong>Direct:</strong> the ratio y ÷ x stays the same (y = kx). The graph is a straight line through the origin.<br><strong>Indirect:</strong> the product x × y stays the same (xy = k). The graph is a curve that never touches the axes.</p>
</div>
<div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":180,"view":[0,0,10,10],"pad":24,"axes":{"x":"x","y":"y","o":false},"fn":[{"f":"x","c":"ac","dom":[0,9.5],"lab":[7.2,5.4,"direct: y = kx"]},{"f":"8/x","c":"hl","dom":[0.85,9.5],"lab":[1.7,9.2,"indirect: xy = k"]}]}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: direct proportion</div>
  <div class="example-step"><span class="step-num">1</span><span>5 pens cost R35. What do 8 pens cost?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>One pen: R35 ÷ 5 = R7. Eight pens: 8 × R7 = <strong>R56</strong>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: indirect proportion</div>
  <div class="example-step"><span class="step-num">1</span><span>6 workers build a wall in 10 days. How long do 4 workers take?</span></div>
  <div class="example-step"><span class="step-num">2</span><span>The total work stays the same: 6 × 10 = 60 worker-days.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>4 workers: 60 ÷ 4 = <strong>15 days</strong>. Fewer workers, more days.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Ask yourself: if one quantity doubles, does the other double (direct) or halve (indirect)?</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "3 kg of apples cost R45. What do 7 kg cost? (R)", "answer": "105", "topic": "Direct and indirect proportion"},
        {"type": "input", "text": "8 taps fill a tank in 6 hours. How many hours do 12 taps take?", "answer": "4", "topic": "Direct and indirect proportion"},
        {"type": "mc", "text": "Which pair is in INDIRECT proportion?", "options": ["Litres of petrol and cost", "Hours worked and wages at a fixed rate", "Speed and time for a fixed distance", "Number of tickets and total price"], "answer": 2, "topic": "Direct and indirect proportion"},
        {"type": "input", "text": "A car uses 20 litres of petrol for 240 km. How many litres does it use for 360 km?", "answer": "30", "topic": "Direct and indirect proportion"},
        {"type": "mc", "text": "The graph of two quantities is a straight line through the origin. They are in:", "options": ["direct proportion", "indirect proportion", "no proportion", "both"], "answer": 0, "topic": "Direct and indirect proportion"},
        {"type": "input", "text": "A prize is shared equally: with 5 winners each gets R600. How much does each get if there are 8 winners? (R)", "answer": "375", "topic": "Direct and indirect proportion"},
        {"type": "input", "text": "At 80 km/h a trip takes 3 hours. How many hours does it take at 120 km/h?", "answer": "2", "topic": "Direct and indirect proportion"},
      ]
    },
    {
      id: 103,
      chapter: 1,
      name: "Financial contexts",
      fullName: "Budgets, loans, hire purchase, exchange rates, commission and rentals",
      lesson: {
        heading: "Financial contexts",
        sub: "Chapter 1 · Topic 6",
        body: `
<p>Grade 9 money problems use the same few ideas in different situations. Read carefully what is <em>added</em>, what is <em>taken off</em> and what is <em>charged per period</em>.</p>
<div class="def-box">
  <div class="def-box-title">📖 Key terms</div>
<p><strong>Budget:</strong> a plan of expected income and expenses. Income − expenses = savings (or shortfall).<br><strong>Loan:</strong> money borrowed; you repay the amount plus interest.<br><strong>Hire purchase (HP):</strong> deposit + instalments; HP price − cash price = interest paid.<br><strong>Exchange rate:</strong> foreign → rand: multiply by the rate; rand → foreign: divide.<br><strong>Commission:</strong> a percentage of sales paid to a salesperson.<br><strong>Rental:</strong> a fixed amount paid per period to use something, often increased (escalated) by a percentage each year.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: commission</div>
  <div class="example-step"><span class="step-num">1</span><span>An estate agent earns 5% commission. She sells a house for R1 200 000.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Commission = 5% × 1 200 000 = 0,05 × 1 200 000 = <strong>R60 000</strong></span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: rental with escalation</div>
  <div class="example-step"><span class="step-num">1</span><span>A flat rents for R6 500 per month. The rent goes up by 8% after a year.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>New rent = 6 500 × 1,08 = <strong>R7 020</strong> per month.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Extra paid in the second year = 12 × (7 020 − 6 500) = 12 × 520 = <strong>R6 240</strong>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: a monthly budget</div>
<div class="math-block">Income: salary           R12 400
Expenses: rent            R4 800
          food            R3 100
          transport       R1 450
          other           R1 850
Total expenses            R11 200
Savings: 12 400 − 11 200 = R1 200</div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>A percentage increase of r% means multiply by (1 + r/100); a decrease means multiply by (1 − r/100).</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "A salesperson earns 4% commission on sales of R85 000. How much commission is that? (R)", "answer": "3400", "topic": "Financial contexts"},
        {"type": "input", "text": "Rent of R5 000 per month increases by 6%. What is the new monthly rent? (R)", "answer": "5300", "topic": "Financial contexts"},
        {"type": "input", "text": "A TV costs R9 000 cash, or R900 deposit plus 24 instalments of R420. How much more does hire purchase cost? (R)", "answer": "1980", "topic": "Financial contexts"},
        {"type": "input", "text": "$1 = R18,50. How many dollars do you get for R3 700?", "answer": "200", "topic": "Financial contexts"},
        {"type": "mc", "text": "Monthly income R9 500; expenses R4 200, R2 650, R1 300 and R900. The budget shows:", "options": ["savings of R450", "a shortfall of R450", "savings of R1 350", "savings of R9 050"], "answer": 0, "topic": "Financial contexts"},
        {"type": "input", "text": "Thabo borrows R4 000 at 12% simple interest per year for 2 years. How much does he repay in total? (R)", "answer": "4960", "topic": "Financial contexts"},
        {"type": "input", "text": "A shirt costs £24 in London. £1 = R23,50. What is the price in rand? (R)", "answer": "564", "topic": "Financial contexts"},
      ]
    },
    {
      id: 104,
      chapter: 1,
      name: "Ch 1 Exam focus",
      fullName: "Exam practice: number systems, ratio, proportion and financial mathematics",
      lesson: {
        heading: "Chapter 1 exam focus",
        sub: "Chapter 1 · Topic 7",
        body: `
<p>These questions mix the whole chapter, the way a test does. Before you calculate, decide which idea the question is about: number sets, HCF/LCM, ratio, proportion, or a financial context.</p>
<div class="def-box">
  <div class="def-box-title">📖 Compound interest reminder</div>
<p><span class="math">A = P(1 + i)ⁿ</span>: P the amount invested, i the interest rate per year as a decimal, n the number of years. Simple interest: <span class="math">A = P(1 + in)</span>.</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Show the formula, the substitution and the answer with units (R, km/h, days). Marks are given for each step.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Which number is irrational?", "options": ["√49", "0,333…", "√12", "−7/3"], "answer": 2, "topic": "Ch 1 Exam focus"},
        {"type": "input", "text": "R12 000 is invested at 8% compound interest per year. How much is it worth after 2 years? (R)", "answer": "13996.80", "altAnswers": ["13996,80", "13996.8", "13996,8"], "topic": "Ch 1 Exam focus"},
        {"type": "input", "text": "Share R2 400 in the ratio 3 : 5. What is the bigger share? (R)", "answer": "1500", "topic": "Ch 1 Exam focus"},
        {"type": "input", "text": "Find the LCM of 14 and 21.", "answer": "42", "topic": "Ch 1 Exam focus"},
        {"type": "input", "text": "12 learners clean the school in 3 hours. How many hours do 9 learners take?", "answer": "4", "topic": "Ch 1 Exam focus"},
        {"type": "mc", "text": "A price of R480 is increased by 15%, then decreased by 15%. The final price is:", "options": ["R480", "R469,20", "R552", "R408"], "answer": 1, "topic": "Ch 1 Exam focus"},
      ]
    },
  ],
  workbook: {
    chapter: 1, chapterName: "Number Systems, Ratios, Rates, and Financial Mathematics",
    topics: [
      {
        name: "Number Systems",
        questions: [
          {
            num: "1",
            text: "Classify each number by listing all the sets it belongs to (N, N0, Z, Q, irrational, R):",
            parts: [
              { label: "a)", text: "-6", marks: 2 },
              { label: "b)", text: "0", marks: 2 },
              { label: "c)", text: "√11", marks: 2 },
              { label: "d)", text: "2,4… (i.e. 2,444…)", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Convert each recurring decimal to a fraction in simplest form:",
            parts: [
              { label: "a)", text: "0,7…", marks: 3 },
              { label: "b)", text: "0,36… (i.e. 0,363636…)", marks: 3 },
              { label: "c)", text: "1,2… (i.e. 1,222…)", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Ratios and Rates",
        questions: [
          {
            num: "3",
            text: "Three friends invest in a business in the ratio 4 : 3 : 5. The total investment is R 48 000.",
            parts: [
              { label: "a)", text: "How much does each person invest?", marks: 4 },
              { label: "b)", text: "They make a profit of R 18 000 shared in the same ratio. Calculate each person's share.", marks: 4 },
            ]
          },
          {
            num: "4",
            text: "Six machines produce 480 items per day.",
            parts: [
              { label: "a)", text: "How many items would 9 machines produce in a day? (direct proportion)", marks: 3 },
              { label: "b)", text: "How many days would it take 4 machines to produce 480 items? (inverse proportion)", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Financial Mathematics",
        questions: [
          {
            num: "5",
            text: "A principal of R 15 000 is invested at 6% per annum simple interest for 5 years.",
            parts: [
              { label: "a)", text: "Calculate the interest earned.", marks: 3 },
              { label: "b)", text: "Calculate the total amount at the end of 5 years.", marks: 2 },
            ]
          },
          {
            num: "6",
            text: "R 20 000 is invested at 8% per annum compound interest.",
            parts: [
              { label: "a)", text: "Calculate the amount after 3 years.", marks: 4 },
              { label: "b)", text: "How much more does compound interest earn compared to simple interest over 3 years?", marks: 3 },
            ]
          },
          {
            num: "7",
            text: "The exchange rate is 1 EUR = R 20,40.",
            parts: [
              { label: "a)", text: "Convert €350 to rands.", marks: 2 },
              { label: "b)", text: "Convert R 8 160 to euros.", marks: 2 },
            ]
          },
        ]
      },
      {
        "name": "Prime factors, HCF and LCM",
        "questions": [
          {
            "num": "8",
            "text": "84 learners and 126 parents are split into identical groups with nobody left over.",
            "parts": [
              {
                "label": "a)",
                "text": "Write 84 and 126 as products of prime factors.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "What is the largest number of groups possible?",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "How many learners and how many parents are in each group?",
                "marks": 2
              }
            ]
          }
        ]
      },
      {
        "name": "Direct and indirect proportion",
        "questions": [
          {
            "num": "9",
            "text": "A farmer has enough feed for 40 cows for 15 days.",
            "parts": [
              {
                "label": "a)",
                "text": "Is the number of cows and the number of days in direct or indirect proportion? Explain.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "How long does the feed last for 60 cows?",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "How many cows can be fed for 24 days?",
                "marks": 2
              }
            ]
          }
        ]
      },
      {
        "name": "Financial contexts",
        "questions": [
          {
            "num": "10",
            "text": "Lerato earns a basic salary of R7 500 per month plus 3% commission on her sales.",
            "parts": [
              {
                "label": "a)",
                "text": "In March she sells goods worth R120 000. Calculate her total income for March.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "Her rent of R4 200 per month increases by 7,5%. Calculate the new rent.",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "She buys a fridge on HP: 10% deposit on R8 000 and 18 instalments of R495. Calculate the total HP price.",
                "marks": 3
              }
            ]
          }
        ]
      },
    ]
  },
  answerKey: {
    chapter: 1, chapterName: "Chapter 1 — Number Systems, Ratios, Rates, and Financial Mathematics",
    topics: [
      {
        name: "Number Systems",
        answers: [
          { num: "Q1a", ans: "Z, Q, R", note: "-6 is negative, so not N or N0" },
          { num: "Q1b", ans: "N0, Z, Q, R", note: "0 is in whole numbers and above, rational = 0/1" },
          { num: "Q1c", ans: "Irrational, R", note: "11 is not a perfect square" },
          { num: "Q1d", ans: "Q, R", note: "recurring decimal → 22/9, which is rational" },
          { num: "Q2a", ans: "7/9", note: "let x = 0,7…; 10x = 7,7…; 9x = 7; x = 7/9" },
          { num: "Q2b", ans: "4/11", note: "100x = 36,36…; 99x = 36; x = 36/99 = 4/11" },
          { num: "Q2c", ans: "11/9", note: "let x = 1,2…; 10x = 12,2…; 9x = 11; x = 11/9" },
        ]
      },
      {
        name: "Ratios and Rates",
        answers: [
          { num: "Q3a", ans: "R 16 000 : R 12 000 : R 20 000", note: "12 parts total; 1 part = R 4 000" },
          { num: "Q3b", ans: "R 6 000 : R 4 500 : R 7 500", note: "1 part of profit = 18 000÷12 = R 1 500" },
          { num: "Q4a", ans: "720 items", note: "direct: 9/6 × 480 = 720" },
          { num: "Q4b", ans: "1,5 days", note: "inverse: machines × days stays the same: 6 × 1 = 4 × d → d = 6/4 = 1,5 days" },
        ]
      },
      {
        name: "Financial Mathematics",
        answers: [
          { num: "Q5a", ans: "I = R 4 500", note: "I = 15 000 × 0,06 × 5 = 4 500" },
          { num: "Q5b", ans: "R 19 500", note: "15 000 + 4 500 = 19 500" },
          { num: "Q6a", ans: "R 25 194,24", note: "A = 20 000(1,08)³ = 20 000 × 1,259712 = 25 194,24" },
          { num: "Q6b", ans: "Compound = R 5 194,24; Simple = R 4 800; Difference = R 394,24", note: "Simple: 20000 × 0,08 × 3 = 4800" },
          { num: "Q7a", ans: "R 7 140", note: "350 × 20,40 = 7 140" },
          { num: "Q7b", ans: "€400", note: "8 160 ÷ 20,40 = 400" },
        ]
      },
      {
        "name": "Prime factors, HCF and LCM",
        "answers": [
          {
            "num": "Q8a",
            "ans": "84 = 2² × 3 × 7 ; 126 = 2 × 3² × 7",
            "note": "Factor trees"
          },
          {
            "num": "Q8b",
            "ans": "HCF = 2 × 3 × 7 = 42 groups",
            "note": "Common primes, lowest powers"
          },
          {
            "num": "Q8c",
            "ans": "2 learners and 3 parents per group",
            "note": "84 ÷ 42 = 2 ; 126 ÷ 42 = 3"
          }
        ]
      },
      {
        "name": "Direct and indirect proportion",
        "answers": [
          {
            "num": "Q9a",
            "ans": "Indirect: more cows means the feed lasts fewer days; cows × days stays 600.",
            "note": "40 × 15 = 600 cow-days"
          },
          {
            "num": "Q9b",
            "ans": "10 days",
            "note": "600 ÷ 60 = 10"
          },
          {
            "num": "Q9c",
            "ans": "25 cows",
            "note": "600 ÷ 24 = 25"
          }
        ]
      },
      {
        "name": "Financial contexts",
        "answers": [
          {
            "num": "Q10a",
            "ans": "R11 100",
            "note": "3% × 120 000 = 3 600; 7 500 + 3 600 = 11 100"
          },
          {
            "num": "Q10b",
            "ans": "R4 515",
            "note": "4 200 × 1,075 = 4 515"
          },
          {
            "num": "Q10c",
            "ans": "R9 710",
            "note": "Deposit 800; 18 × 495 = 8 910; 800 + 8 910 = 9 710"
          }
        ]
      },
    ]
  }
});
