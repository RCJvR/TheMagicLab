// Math Magician — Graad 9, Hoofstuk 1 data
// Getalstelsels, Verhoudings, Tempo's en Finansiële Wiskunde

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 0,
      chapter: 1,
      name: "Getalstelsels",
      fullName: "Getalstelsels en rasionale getalle",
      lesson: {
        heading: "Getalstelsels en rasionale getalle",
        sub: "Hoofstuk 1 · Onderwerp 1",
        body: `
          <p>Die <strong>reële getalstelsel</strong> is 'n hiërargie van getalversamelings, elkeen ingesluit binne die volgende.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Die getalhiërargie</div>
            <p>
              <strong>Natuurlike getalle (N):</strong> {1, 2, 3, …} — teltalle.<br>
              <strong>Heelgetalle (N0):</strong> {0, 1, 2, 3, …} — sluit nul in.<br>
              <strong>Gehele getalle (Z):</strong> {…, -2, -1, 0, 1, 2, …} — sluit negatiewe getalle in.<br>
              <strong>Rasionale getalle (Q):</strong> enige getal wat as <span class="math">p/q</span> geskryf kan word waar p, q ∈ Z, q ≠ 0. Sluit alle eindigende en herhalende desimale in.<br>
              <strong>Irrasionale getalle:</strong> nie-eindigende, nie-herhalende desimale (bv. <span class="math">√2, π</span>).<br>
              <strong>Reële getalle (R):</strong> alle rasionale en irrasionale getalle.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Klassifisering van getalle</div>
            <div class="example-step"><span class="step-num">1</span><span>Klassifiseer <span class="math">-3</span>: geheelgetal ✓, rasionaal ✓, reëel ✓</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Klassifiseer <span class="math">0,\overline{3} = 1/3</span>: rasionaal ✓, reëel ✓</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Klassifiseer <span class="math">√7</span>: irrasionaal ✓, reëel ✓ (nie rasionaal nie)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Herhalende desimaal omskep: laat x = 0,\overline{36} → 100x = 36,\overline{36} → 99x = 36 → x = 36/99 = 4/11</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Elke geheelgetal is rasionaal (bv. -5 = -5/1). Nie elke rasionale getal is 'n geheelgetal nie.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Getalklassifiseerder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Tik ’n getal — ’n heelgetal, desimaal, breuk, wortel, π of ’n repeterende desimaal soos 0,(36) — en sien al die versamelings waaraan dit behoort.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9ncIn" id="g9ncInL">Getal</label><input id="g9ncIn" type="text" value="-3" autocomplete="off" style="width:150px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;"></div></div>
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
})({"tryit":"Probeer dit","nat":"natuurlike getalle","whole":"telgetalle","int":"heelgetalle","rat":"rasionale getalle","irr":"irrasionale getalle","real":"reële getalle","equals":"=","whyInt":"’n heelgetal is rasionaal (dit kan oor 1 geskryf word).","whyDec":"’n eindigende desimaal is rasionaal.","whyFrac":"’n breuk van heelgetalle is rasionaal.","whyRec":"’n repeterende desimaal is rasionaal.","whySq":"die wortel van ’n volkome vierkant is rasionaal.","whyRoot":"die vierkantswortel van ’n getal wat nie ’n volkome vierkant is nie, is irrasionaal — die desimale eindig of herhaal nooit.","whyPi":"π is irrasionaal — die desimale eindig of herhaal nooit (22/7 is net ’n benadering).","bad":"Tik ’n getal soos -3, 0,75, 3/4, √7, π of 0,(36).","undef":"Deling deur nul is ongedefinieerd — dit is nie ’n getal nie.","nonreal":"Die vierkantswortel van ’n negatiewe getal is nie-reëel — dit is nie in ℝ nie."});
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Watter een van hierdie is irrasionaal?", options: ["0,25", "√9", "√5", "-7"], answer: 2, topic: "Getalstelsels" },
        { type: "mc", text: "Die versameling gehele getalle is 'n deelversameling van:", options: ["Natuurlike getalle", "Heelgetalle", "Rasionale getalle", "Irrasionale getalle"], answer: 2, topic: "Getalstelsels" },
        { type: "input", text: "Skryf 0,<span class='math'>\\overline{27}</span> as 'n breuk. Gee die teller as die breuk in eenvoudigste vorm oor 99 is.", answer: "3", topic: "Getalstelsels" },
        { type: "mc", text: "Watter stelling is ONWAAR?", options: ["Alle natuurlike getalle is gehele getalle", "Alle gehele getalle is rasionaal", "Alle irrasionale getalle is reëel", "Alle rasionale getalle is gehele getalle"], answer: 3, topic: "Getalstelsels" },
        { type: "input", text: "Skryf 0,<span class='math'>\\overline{142857}</span> as 'n breuk (gee die noemer).", answer: "7", topic: "Getalstelsels" },
        { type: "input", text: "Bereken 0,<span class='math'>\\overline{18}</span> + 0,2 en gee die antwoord as 'n enkele breuk a/b in eenvoudigste vorm (skryf dit as a/b).", answer: "21/55", altAnswers: ["21​/​55"], topic: "Getalstelsels" },
        { type: "mc", text: "Beskou die produk <span class='math'>√2 × √8</span>. Wat kan jy aflei?", options: ["Dit is irrasionaal, aangesien irrasionaal × irrasionaal altyd irrasionaal is", "Dit is rasionaal, gelyk aan 4", "Dit is irrasionaal, gelyk aan √16", "Dit kan nie vereenvoudig word nie"], answer: 1, topic: "Getalstelsels" },
      ]
    },
    {
      id: 1,
      chapter: 1,
      name: "Verhoudings en tempo's",
      fullName: "Verhoudings, tempo's en direkte/indirekte eweredigheid",
      lesson: {
        heading: "Verhoudings, tempo's en eweredigheid",
        sub: "Hoofstuk 1 · Onderwerp 2",
        body: `
          <p>'n <strong>Verhouding</strong> vergelyk hoeveelhede van dieselfde soort. 'n <strong>Tempo</strong> vergelyk hoeveelhede van verskillende soorte (bv. km/h).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleuteldefinisies</div>
            <p>
              <strong>Verhouding a : b:</strong> vir elke a eenhede van een hoeveelheid is daar b eenhede van 'n ander.<br>
              <strong>Tempo:</strong> verhouding met verskillende eenhede — bv. prys per kg, km per liter.<br>
              <strong>Direkte eweredigheid:</strong> soos een hoeveelheid toeneem, neem die ander eweredig toe. <span class="math">y = kx</span>.<br>
              <strong>Indirekte eweredigheid:</strong> soos een hoeveelheid toeneem, neem die ander af. <span class="math">y = k/x</span>.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>Verdeel R 720 in die verhouding 3 : 5 : 4 → Totale dele = 12; 1 deel = R 60 → aandele: R 180, R 300, R 240</span></div>
            <div class="example-step"><span class="step-num">2</span><span>As 5 werkers 12 dae neem (indirekte eweredigheid), hoe lank vir 4 werkers? → 5 × 12 = 4 × d → d = 15 dae</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Eenheidstempo: 252 km op 18 L → 252 ÷ 18 = 14 km/L</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Vir indirekte eweredigheid bly die produk konstant: <span class="math"> x1y1 = x2y2</span>.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Verhouding- en Eweredigheid-sakrekenaar</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Deel ’n bedrag in ’n verhouding, los direkte of omgekeerde eweredigheid op, of werk met ’n eenheidstempo.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;"><div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" for="g9rpMode">Soort</label><select id="g9rpMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:JetBrains Mono,monospace;">
              <option value="share">Deel in ’n verhouding</option>
              <option value="direct">Direkte eweredigheid</option>
              <option value="inverse">Omgekeerde eweredigheid</option>
              <option value="rate">Eenheidstempo</option></select></div>
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
})({"tryit":"Probeer dit","modes":{"share":["Bedrag","Verhouding (bv. 3:5:4)",""],"direct":["x₁","y₁","nuwe x"],"inverse":["x₁ (bv. werkers)","y₁ (bv. dae)","nuwe x"],"rate":["Totale bedrag","Eenhede","Hoeveel eenhede?"]},"totalParts":"Totale dele","onePart":"Een deel","directK":"Direkte eweredigheid (y ÷ x is konstant)","inverseK":"Omgekeerde eweredigheid (x × y is konstant)","unitRate":"Eenheidstempo","perUnit":"per eenheid","badShare":"Voer ’n bedrag en ’n verhouding soos 3:5 of 3:5:4 in.","badNum":"Voer getalle in wat nie nul is nie."});
          </script>
        `
      },
      questions: [
        { type: "mc", text: "Verdeel R 1 200 in die verhouding 2 : 3 : 5. Die grootste aandeel is:", options: ["R 240", "R 360", "R 480", "R 600"], answer: 3, topic: "Verhoudings" },
        { type: "input", text: "8 krane vul 'n tenk in 6 uur. Hoeveel uur sou 4 krane neem?", answer: "12", topic: "Tempo's" },
        { type: "mc", text: "Watter vergelyking toon indirekte eweredigheid tussen x en y?", options: ["y = 3x", "y = x + 3", "y = 3/x", "y = x²"], answer: 2, topic: "Verhoudings" },
        { type: "input", text: "'n Motor ry 390 km op 30 liter. Bereken die brandstofverbruik in km per liter.", answer: "13", topic: "Tempo's" },
        { type: "mc", text: "As y direk eweredig is aan x en y = 18 wanneer x = 6, bepaal y wanneer x = 10.", options: ["30", "60", "3", "108"], answer: 0, topic: "Verhoudings" },
        { type: "input", text: "'n Resep benodig meel, suiker en botter in die verhouding 5 : 2 : 3. Jy het 800 g meel (genoeg vir 'n volle porsie) maar slegs 250 g botter. Hoeveel meer gram botter moet jy koop?", answer: "230", topic: "Verhoudings" },
        { type: "input", text: "12 werkers kan 'n muur in 18 dae bou. Hulle werk vir 6 dae, waarna 4 werkers die werk verlaat. Deur die feit te gebruik dat totale werker-dae konstant bly, bereken die totale aantal dae (vanaf die begin) benodig om die muur te voltooi.", answer: "24", topic: "Tempo's" },
      ]
    },
    {
      id: 2,
      chapter: 1,
      name: "Finansiële wiskunde",
      fullName: "Finansiële wiskunde: rente, BTW en wisselkoerse",
      lesson: {
        heading: "Finansiële wiskunde",
        sub: "Hoofstuk 1 · Onderwerp 3",
        body: `
          <p>Finansiële wiskunde dek die berekening van rente, belasting, en geldeenheidomskakelings.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Sleutelformules</div>
            <p>
              <strong>Enkelvoudige rente:</strong> <span class="math">I = P × i × n</span> waar P = hoofsom, i = koers (desimaal), n = tyd in jare.<br>
              <strong>Saamgestelde rente:</strong> <span class="math">A = P(1 + i)n</span><br>
              <strong>BTW (15%):</strong> BTW-inklusief = prys × 1,15<br>
              <strong>Huurkoop:</strong> deposito + (maandelikse paaiement × maande)<br>
              <strong>Wisselkoers:</strong> vermenigvuldig of deel afhangende van die geldeenheidrigting.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Uitgewerkte voorbeelde</div>
            <div class="example-step"><span class="step-num">1</span><span>R 5 000 teen 8% p.j. enkelvoudige rente vir 3 jaar: I = 5000 × 0,08 × 3 = R 1 200; Totaal = R 6 200</span></div>
            <div class="example-step"><span class="step-num">2</span><span>R 10 000 teen 9% p.j. saamgesteld vir 2 jaar: A = 10 000(1,09)² = 10 000 × 1,1881 = R 11 881</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Wisselkoers: 1 USD = R 18,50. Skakel $250 om: 250 × 18,50 = R 4 625</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Saamgestelde rente groei vinniger as enkelvoudige rente. Die verskil word oor baie jare merkbaar.</span></div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Probeer dit &#8212; Enkelvoudige teenoor Saamgestelde Rente</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Sien hoe enkelvoudige en saamgestelde rente oor tyd vergelyk teen dieselfde koers.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Hoofsom (R)</label><input id="intP2" type="number" value="10000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Koers % p.j.</label><input id="intR2" type="number" value="8" step="0.5" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">Jare</label><input id="intN2" type="number" value="10" min="1" max="30" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="intBtn2" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Bereken</button>
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
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Enkelvoudig A = P(1+in):</span><span style="color:#a5b4fc;">'+rr(As)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Enkelvoudige rente verdien:</span><span style="color:#fbbf24;">'+rr(As-P)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgesteld A = P(1+i)\u207f:</span><span style="color:#6ee7b7;">'+rr(Ac)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgestelde rente verdien:</span><span style="color:#6ee7b7;font-weight:700;">'+rr(Ac-P)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:200px;display:inline-block;">Saamgestelde voordeel:</span><span style="color:#f59e0b;">+'+rr(Ac-As)+'</span></div>',
              ].join('');
            }
            document.getElementById('intBtn2').addEventListener('click',calc);
            ['intP2','intR2','intN2'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});

          })();
          </script>
        `
      },
      questions: [
        { type: "input", text: "Bereken enkelvoudige rente op R 6 000 teen 7% p.j. vir 4 jaar.", answer: "1680", topic: "Finansies" },
        { type: "mc", text: "'n Skootrekenaar kos R 12 000 uitgesluit BTW (15%). Die BTW-inklusiewe prys is:", options: ["R 13 200", "R 13 600", "R 13 800", "R 12 800"], answer: 2, topic: "Finansies" },
        { type: "input", text: "Bereken saamgestelde rente op R 8 000 teen 10% p.j. vir 2 jaar. Gee die totale bedrag.", answer: "9680", topic: "Finansies" },
        { type: "mc", text: "As 1 GBP = R 23, hoeveel rand vir £150?", options: ["R 3 350", "R 3 400", "R 3 450", "R 3 500"], answer: 2, topic: "Finansies" },
        { type: "input", text: "'n TV kos R 3 500. Jy betaal 'n 20% deposito en 12 maandelikse paaiemente van R 260. Wat is die totale huurkoopkoste?", answer: "3820", topic: "Finansies" },
        { type: "input", text: "'n Baadjie het 'n gemerkte (BTW-inklusiewe) prys van R 690. In 'n uitverkoping word dit met 20% van die gemerkte prys afgeslaan. Van die nuwe uitverkoopprys, hoeveel (in rand) is die BTW-gedeelte (BTW is 15%)? Rond af tot die naaste rand.", answer: "72", topic: "Finansies" },
        { type: "input", text: "'n Yskas kos R 9 000 kontant. Op huurkoop betaal jy 'n 15% deposito en dan 24 maandelikse paaiemente van R 350. Hoeveel MEER (in rand) betaal jy in totaal op huurkoop in vergelyking met die kontantprys?", answer: "750", topic: "Finansies" },
      ]
    },
  ],
  workbook: {
    chapter: 1, chapterName: "Getalstelsels, Verhoudings, Tempo's, en Finansiële Wiskunde",
    topics: [
      {
        name: "Getalstelsels",
        questions: [
          {
            num: "1",
            text: "Klassifiseer elke getal deur al die versamelings te lys waaraan dit behoort (N, N0, Z, Q, irrasionaal, R):",
            parts: [
              { label: "a)", text: "-6", marks: 2 },
              { label: "b)", text: "0", marks: 2 },
              { label: "c)", text: "√11", marks: 2 },
              { label: "d)", text: "2,4… (d.w.s. 2,444…)", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "Skakel elke herhalende desimaal om na 'n breuk in eenvoudigste vorm:",
            parts: [
              { label: "a)", text: "0,7…", marks: 3 },
              { label: "b)", text: "0,36… (d.w.s. 0,363636…)", marks: 3 },
              { label: "c)", text: "1,2… (d.w.s. 1,222…)", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Verhoudings en Tempo's",
        questions: [
          {
            num: "3",
            text: "Drie vriende belê in 'n besigheid in die verhouding 4 : 3 : 5. Die totale belegging is R 48 000.",
            parts: [
              { label: "a)", text: "Hoeveel belê elke persoon?", marks: 4 },
              { label: "b)", text: "Hulle maak 'n wins van R 18 000 wat in dieselfde verhouding gedeel word. Bereken elke persoon se aandeel.", marks: 4 },
            ]
          },
          {
            num: "4",
            text: "Ses masjiene vervaardig 480 items per dag.",
            parts: [
              { label: "a)", text: "Hoeveel items sou 9 masjiene in 'n dag vervaardig? (direkte eweredigheid)", marks: 3 },
              { label: "b)", text: "Hoeveel dae sou dit vir 4 masjiene neem om 480 items te vervaardig? (indirekte eweredigheid)", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Finansiële Wiskunde",
        questions: [
          {
            num: "5",
            text: "'n Hoofsom van R 15 000 word teen 6% per jaar enkelvoudige rente vir 5 jaar belê.",
            parts: [
              { label: "a)", text: "Bereken die rente verdien.", marks: 3 },
              { label: "b)", text: "Bereken die totale bedrag aan die einde van 5 jaar.", marks: 2 },
            ]
          },
          {
            num: "6",
            text: "R 20 000 word teen 8% per jaar saamgestelde rente belê.",
            parts: [
              { label: "a)", text: "Bereken die bedrag na 3 jaar.", marks: 4 },
              { label: "b)", text: "Hoeveel meer verdien saamgestelde rente in vergelyking met enkelvoudige rente oor 3 jaar?", marks: 3 },
            ]
          },
          {
            num: "7",
            text: "Die wisselkoers is 1 EUR = R 20,40.",
            parts: [
              { label: "a)", text: "Skakel €350 om na rand.", marks: 2 },
              { label: "b)", text: "Skakel R 8 160 om na euro.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 1, chapterName: "Hoofstuk 1 — Getalstelsels, Verhoudings, Tempo's, en Finansiële Wiskunde",
    topics: [
      {
        name: "Getalstelsels",
        answers: [
          { num: "Q1a", ans: "Z, Q, R", note: "-6 is negatief, dus nie N of N0 nie" },
          { num: "Q1b", ans: "N0, Z, Q, R", note: "0 is in heelgetalle en hoër, rasionaal = 0/1" },
          { num: "Q1c", ans: "Irrasionaal, R", note: "11 is nie 'n volkome vierkant nie" },
          { num: "Q1d", ans: "Q, R", note: "herhalende desimaal → 22/9, wat rasionaal is" },
          { num: "Q2a", ans: "7/9", note: "laat x = 0,7…; 10x = 7,7…; 9x = 7; x = 7/9" },
          { num: "Q2b", ans: "4/11", note: "100x = 36,36…; 99x = 36; x = 36/99 = 4/11" },
          { num: "Q2c", ans: "11/9", note: "laat x = 1,2…; 10x = 12,2…; 9x = 11; x = 11/9" },
        ]
      },
      {
        name: "Verhoudings en Tempo's",
        answers: [
          { num: "Q3a", ans: "R 16 000 : R 12 000 : R 20 000", note: "12 dele in totaal; 1 deel = R 4 000" },
          { num: "Q3b", ans: "R 6 000 : R 4 500 : R 7 500", note: "1 deel van wins = 18 000÷12 = R 1 500" },
          { num: "Q4a", ans: "720 items", note: "direk: 9/6 × 480 = 720" },
          { num: "Q4b", ans: "1,5 dae", note: "indirek: 6 × 1 dag = 4 × d; d = 6/4 = 1,5 dae vir 1 dag se produksie. Vir 480: dieselfde totale werk = 4 × d = 6 × 1, d = 1,5" },
        ]
      },
      {
        name: "Finansiële Wiskunde",
        answers: [
          { num: "Q5a", ans: "I = R 4 500", note: "I = 15 000 × 0,06 × 5 = 4 500" },
          { num: "Q5b", ans: "R 19 500", note: "15 000 + 4 500 = 19 500" },
          { num: "Q6a", ans: "R 25 194,24", note: "A = 20 000(1,08)³ = 20 000 × 1,259712 = 25 194,24" },
          { num: "Q6b", ans: "Saamgesteld = R 5 194,24; Enkelvoudig = R 4 800; Verskil = R 394,24", note: "Enkelvoudig: 20000 × 0,08 × 3 = 4800" },
          { num: "Q7a", ans: "R 7 140", note: "350 × 20,40 = 7 140" },
          { num: "Q7b", ans: "€400", note: "8 160 ÷ 20,40 = 400" },
        ]
      },
    ]
  }
});
