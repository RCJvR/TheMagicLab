// Run: node scripts/test-calc-engine.js
const E = require('../math-magician/calc-engine.js');
let pass = 0, fail = 0;
function ev(text, ctx) {
  const t = E.textToTokens(text); if (!t) return 'BADTEXT';
  try { const r = E.evaluate(t, ctx); return r; } catch (e) { return e.kind || e.message; }
}
function show(v, st) {
  if (typeof v === 'string') return v;
  v = v.val;
  if (E.canFraction(v) && !v.dec) { const p = E.fractionParts(v, true); return (p.neg ? '-' : '') + (p.whole ? p.whole + ' ' : '') + p.n + '/' + p.d; }
  return E.formatDecimal(v.f, st);
}
function t(expr, want, ctx, st) {
  const got = show(ev(expr, ctx), st);
  if (got === want) pass++; else { fail++; console.log('FAIL', expr, '→', got, '(want', want + ')'); }
}
t('1+2*3', '7'); t('(1+2)*3', '9'); t('1/3', '1/3'); t('7/4', '1 3/4'); t('0.1+0.2', '0.3');
t('1/2+1/3', '5/6'); t('2^10', '1024'); t('2^-2', '1/4'); t('-2^2', '-4'); t('2^3^2', '512');
t('sqrt(16)', '4'); t('sqrt(2)', '1.414213562'); t('sqrt(1/4)', '1/2'); t('cbrt(27)', '3'); t('cbrt(-8)', '-2');
t('sin(30)', '1/2'); t('cos(60)', '1/2'); t('tan(45)', '1'); t('sin(90)', '1'); t('cos(90)', '0'); t('tan(90)', 'Math ERROR');
t('sin(pi)', '0', { angle: 'rad' }); t('cos(pi)', '-1', { angle: 'rad' }); t('tan(pi/4)', '1', { angle: 'rad' });
t('sin(100)', '0.984807753', { angle: 'deg' }); t('sin(100)', '-0.5063656411', { angle: 'rad' });
t('sin(100)', '1', { angle: 'gra' });
t('sin⁻¹(0.5)', '30'); t('cos⁻¹(0.5)', '60'); t('tan⁻¹(1)', '45'); t('asin(2)', 'Math ERROR');
t('log(1000)', '3'); t('log(2)', '0.3010299957'); t('ln(e)', '1'); t('ln(0)', 'Math ERROR'); t('ln(-1)', 'Math ERROR');
t('5!', '120'); t('0!', '1'); t('69!', '1.711224524×10⁹⁸'); t('70!', 'Math ERROR');
t('5P2', '20'); t('5C2', '10'); t('10C3', '120'); t('52C5', '2598960');
t('1/0', 'Math ERROR'); t('0^0', 'Math ERROR'); t('(', 'Syntax ERROR'); t('1+', 'Syntax ERROR'); t('2)', 'Syntax ERROR');
t('sqrt(-4)', 'Math ERROR'); t('(-8)^(1/3)', '-2');
t('2pi', '6.283185307'); t('1/2pi', '0.1591549431'); t('3(4)', '12'); t('2sin(30)', '1');
t('1E3', '1000'); t('1.5E-3', '1.5×10⁻³'); t('1E10', '1×10¹⁰'); t('123456789012', '1.23456789×10¹¹');
t('5%', '1/20'); t('200*15%', '30');
t('Abs(-5)', '5'); t('GCD(12,18)', '6'); t('LCM(4,6)', '12'); t('Int(-2.7)', '-2'); t('Intg(-2.7)', '-3');
t('3×-2', '-6'); t('1.2/0.3', '4');
t('2^(1/2)', '1.414213562'); t('8^(1/3)', '2'); t('0.5^2', '0.25');
t('A+B', '5', { vars: { A: E.vInt(2), B: E.vInt(3) } });
t('Ans*2', '20', { ans: E.vInt(10) });
t('100/7', '14 2/7');  t('1.5*2/7', '0.4285714286'); t('1/7', '1/7'); t('22/7', '3 1/7');
t('1000000*1000000', '1×10¹²'); t('10^99', '1×10⁹⁹'); t('10^100', 'Math ERROR');
t('0.000123', '1.23×10⁻⁴'); t('0.5', '0.5');
// fixed / sci settings
t('2.5/3', '0.83', {}, { fmt: 'fix', digits: 2 });

function near(a, b, tol = 1e-9) { return Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)); }
function ok(cond, msg) { if (cond) pass++; else { fail++; console.log('FAIL', msg); } }
// statistics
const s1 = E.stat1([2, 4, 4, 4, 5, 5, 7, 9]);
ok(near(s1.mean, 5) && near(s1.sigma, 2) && near(s1.s, Math.sqrt(32 / 7)), 'stat1 mean/sd');
ok(s1.q1 === 4 && s1.median === 4.5 && s1.q3 === 6 && s1.min === 2 && s1.max === 9, 'quartiles even n ' + JSON.stringify(s1));
const s2 = E.stat1([1, 2, 3, 4, 5, 6, 7]);
ok(s2.q1 === 2 && s2.median === 4 && s2.q3 === 6, 'quartiles odd n (excl. median)');
const s3 = E.stat1([1, 2, 3], [2, 1, 1]);
ok(s3.n === 4 && near(s3.mean, 7 / 4), 'frequencies');
// regression
const lin = E.regression([1, 2, 3, 4], [3, 5, 7, 9], 'linear');
ok(near(lin.a, 1) && near(lin.b, 2) && near(lin.r, 1), 'linear fit');
const q = E.regression([0, 1, 2, 3], [1, 2, 5, 10], 'quad');
ok(near(q.a, 1) && near(q.b, 0, 1e-9) && near(q.c, 1), 'quad fit');
const ex = E.regression([0, 1, 2, 3], [2, 6, 18, 54], 'exp');
ok(near(ex.a, 2) && near(ex.b, 3) && near(ex.r, 1), 'exp fit');
const pw = E.regression([1, 2, 3, 4], [2, 8, 18, 32], 'power');
ok(near(pw.a, 2) && near(pw.b, 2), 'power fit');
ok(near(E.regressionEstimateY(lin, 10), 21) && near(E.regressionEstimateX(lin, 21)[0], 10), 'estimates');
// equations
const I = E.vInt, fv = x => E.formatDecimal(x.f);
let r = E.solveSimul([[I(1), I(1), I(5)], [I(1), E.neg(I(1)), I(1)]]);
ok(fv(r[0]) === '3' && fv(r[1]) === '2', 'simul 2');
r = E.solveSimul([[I(2), I(1), I(-1), I(8)], [I(-3), E.neg(I(1)), I(2), I(-11)], [I(-2), I(1), I(2), I(-3)]]);
ok(fv(r[0]) === '2' && fv(r[1]) === '3' && fv(r[2]) === '-1', 'simul 3 ' + r.map(fv));
let qd = E.solveQuadratic(I(1), I(-3), I(2));
ok(fv(qd.roots[0].re) === '2' && fv(qd.roots[1].re) === '1', 'quad roots');
qd = E.solveQuadratic(I(1), I(2), I(5));
ok(fv(qd.roots[0].re) === '-1' && fv(qd.roots[0].im) === '2' && fv(qd.roots[1].im) === '-2', 'quad complex');
qd = E.solveQuadratic(I(2), I(-1), I(-3));
ok(E.formatDecimal(qd.roots[0].re.f) === '1.5' && fv(qd.roots[1].re) === '-1', 'quad rational');
let cu = E.solveCubic(1, -6, 11, -6);
ok(cu.map(x => x.re).sort().join() === '1,2,3', 'cubic 3 real ' + JSON.stringify(cu));
cu = E.solveCubic(1, 0, 0, -1);
ok(cu[0].re === 1 && near(cu[1].re, -0.5) && near(Math.abs(cu[1].im), Math.sqrt(3) / 2), 'cubic complex');
cu = E.solveCubic(1, -3, 3, -1);
ok(cu.every(x => x.re === 1), 'cubic triple root');
// DMS & misc
ok(E.formatDMS(12.5125) === '12°30′45″', 'DMS ' + E.formatDMS(12.5125));
ok(show(ev('1°30°0°')) === '1.5', 'DMS entry');
ok(show(ev('1°30°0°', { angle: 'rad' })).startsWith('0.02617'), 'DMS in rad');
// table
const tb = E.table(E.textToTokens('X^2'), 1, 3, 1, {});
ok(tb.length === 3 && tb[2].y.f === 9, 'table');
ok(show({ val: E.pow(E.vInt(2), E.vInt(100)) }) === '1.2676506×10³⁰', 'big power ' + show({ val: E.pow(E.vInt(2), E.vInt(100)) }));
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
