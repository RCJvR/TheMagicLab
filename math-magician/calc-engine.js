// © 2026 Ruhan Janse van Rensburg. All rights reserved.
// ═══════════════════════════════════════════════════════════════════════
// Scientific calculator engine — expression parser, exact fractions,
// number formatting, statistics and equation solvers.
//
// No DOM here, so it runs unchanged in the browser (window.CalcEngine) and
// in Node (require) for the tests in scripts/test-calc-engine.js.
//
// The editor stores an expression as an array of TOKENS (one array item per
// key press, e.g. "7", ".", "sin(", "×", "π"). evaluate() lexes and parses
// that array directly. Values keep an exact rational (BigInt) alongside the
// float for as long as only exact operations (+ − × ÷, integer powers,
// perfect roots, factorials) have been used, so 1÷3 can show as 1/3 and
// 0.1+0.2 is exactly 0.3.
// ═══════════════════════════════════════════════════════════════════════
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CalcEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  class CalcError extends Error {
    constructor(kind) { super(kind); this.kind = kind; }
  }
  const MATH = () => new CalcError('Math ERROR');
  const SYNTAX = () => new CalcError('Syntax ERROR');

  // ── Exact rationals (BigInt) ────────────────────────────────────────────
  const MAXB = 10n ** 18n;
  const gcd = (a, b) => { if (a < 0n) a = -a; if (b < 0n) b = -b; while (b) { [a, b] = [b, a % b]; } return a; };
  function Rat(n, d) {
    if (d === 0n) throw MATH();
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d);
    if (g > 1n) { n /= g; d /= g; }
    return { n, d };
  }
  const ratFloat = r => Number(r.n) / Number(r.d);
  const ratTooBig = r => r.n > MAXB || r.n < -MAXB || r.d > MAXB;

  // ── Values: { f: float, r: Rat|null, dec: typed-as-decimal } ────────────
  function V(f, r, dec) { return { f, r: r || null, dec: !!dec }; }
  function vInt(n) { return V(Number(n), { n: BigInt(n), d: 1n }, false); }
  function vRat(r, dec) {
    if (ratTooBig(r)) return V(ratFloat(r), null, dec);
    return V(ratFloat(r), r, dec);
  }
  const clean = f => parseFloat(f.toPrecision(14));
  // A float result of a transcendental function: tidy 15-digit noise, and
  // promote whole numbers back to exact so log(1000) is the integer 3.
  function vFloat(f, dec) {
    if (!isFinite(f)) throw MATH();
    f = clean(f);
    if (Math.abs(f) >= 1e100) throw MATH();
    if (dec === undefined) dec = true;
    if (Number.isInteger(f) && Math.abs(f) < 1e15) return V(f, { n: BigInt(f), d: 1n }, dec);
    return V(f, null, dec);
  }
  const ZERO = () => vInt(0);
  const isZero = a => a.r ? a.r.n === 0n : a.f === 0;
  const isInt = a => a.r ? a.r.d === 1n : Number.isInteger(a.f);
  const checkRange = v => { if (!isFinite(v.f) || Math.abs(v.f) >= 1e100) throw MATH(); return v; };

  function add(a, b) {
    if (a.r && b.r) return vRat(Rat(a.r.n * b.r.d + b.r.n * a.r.d, a.r.d * b.r.d), a.dec || b.dec);
    return vFloat(a.f + b.f, a.dec || b.dec);
  }
  function sub(a, b) {
    if (a.r && b.r) return vRat(Rat(a.r.n * b.r.d - b.r.n * a.r.d, a.r.d * b.r.d), a.dec || b.dec);
    return vFloat(a.f - b.f, a.dec || b.dec);
  }
  function mul(a, b) {
    if (a.r && b.r) return checkRange(vRat(Rat(a.r.n * b.r.n, a.r.d * b.r.d), a.dec || b.dec));
    return vFloat(a.f * b.f, a.dec || b.dec);
  }
  function div(a, b) {
    if (isZero(b)) throw MATH();
    if (a.r && b.r) return checkRange(vRat(Rat(a.r.n * b.r.d, a.r.d * b.r.n), a.dec || b.dec));
    return vFloat(a.f / b.f, a.dec || b.dec);
  }
  const neg = a => a.r ? V(-a.f, { n: -a.r.n, d: a.r.d }, a.dec) : V(-a.f, null, a.dec);
  const recip = a => div(vInt(1), a);

  // integer k-th root of a non-negative BigInt if exact, else null
  function iroot(n, k) {
    if (n < 0n) return null;
    if (n < 2n) return n;
    let x = BigInt(Math.round(Math.pow(Number(n), 1 / k)));
    for (let c = x - 1n; c <= x + 1n; c++) if (c >= 0n && c ** BigInt(k) === n) return c;
    return null;
  }
  function exactRoot(r, q) { // r^(1/q) for rational r, q positive integer
    let n = r.n, d = r.d, s = 1n;
    if (n < 0n) { if (q % 2 === 0) return null; n = -n; s = -1n; }
    const a = iroot(n, q), b = iroot(d, q);
    return a !== null && b !== null ? Rat(s * a, b) : null;
  }

  function pow(a, b) {
    if (isZero(a) && isZero(b)) throw MATH();
    if (isZero(a)) { if (b.f < 0) throw MATH(); return vInt(0); }
    const dec = a.dec || b.dec;
    if (a.r && b.r && b.r.d === 1n) { // exact integer power
      const e = b.r.n;
      if (e >= -2000n && e <= 2000n) {
        const k = e < 0n ? -e : e;
        const pn = a.r.n ** k, pd = a.r.d ** k;
        const est = Math.abs(Number(k) * Math.log10(Math.abs(Number(a.r.n)) + 1));
        if (est < 110) {
          const r = e >= 0n ? Rat(pn, pd) : Rat(pd, pn);
          return checkRange(vRat(r, dec));
        }
      }
    }
    if (a.r && b.r && b.r.d !== 1n && b.r.d < 50n) { // rational power → exact root when perfect
      const root = exactRoot(a.r, Number(b.r.d));
      if (root) return pow(vRat(root, dec), vRat(Rat(b.r.n, 1n), dec));
    }
    if (a.f < 0) { // negative base only with an odd-denominator rational exponent
      if (b.r && b.r.d % 2n === 1n) {
        const m = Math.pow(-a.f, b.f);
        return vFloat((b.r.n % 2n === 0n) ? m : -m, dec);
      }
      throw MATH();
    }
    return vFloat(Math.pow(a.f, b.f), dec);
  }

  function factorial(a) {
    if (!isInt(a) || a.f < 0 || a.f > 69) throw MATH();
    let r = 1n; for (let i = 2n; i <= BigInt(a.f); i++) r *= i;
    return vInt(r);
  }
  function nPr(n, r) {
    if (!isInt(n) || !isInt(r) || r.f < 0 || n.f < r.f || n.f >= 1e10) throw MATH();
    let p = 1n; const N = BigInt(n.f);
    for (let i = 0n; i < BigInt(r.f); i++) { p *= (N - i); if (p > 10n ** 101n) throw MATH(); }
    return checkRange(vInt(p));
  }
  function nCr(n, r) {
    if (!isInt(n) || !isInt(r) || r.f < 0 || n.f < r.f || n.f >= 1e10) throw MATH();
    const N = BigInt(n.f); let k = BigInt(r.f); if (k > N - k) k = N - k;
    let c = 1n;
    for (let i = 1n; i <= k; i++) { c = c * (N - k + i) / i; if (c > 10n ** 101n) throw MATH(); }
    return checkRange(vInt(c));
  }

  // ── Angles & trig ───────────────────────────────────────────────────────
  const toRad = (x, u) => u === 'rad' ? x : u === 'gra' ? x * Math.PI / 200 : x * Math.PI / 180;
  const fromRad = (x, u) => u === 'rad' ? x : u === 'gra' ? x * 200 / Math.PI : x * 180 / Math.PI;
  function snapTrig(f) {
    if (Math.abs(f) < 1e-14) return vInt(0);
    for (const k of [1, -1]) if (Math.abs(f - k) < 1e-14) return vInt(k);
    for (const k of [0.5, -0.5]) if (Math.abs(f - k) < 1e-14) return V(k, Rat(BigInt(k * 2), 2n), false);
    return vFloat(f);
  }
  function trig(name, a, u) {
    const x = toRad(a.f, u);
    if (name === 'sin') return snapTrig(Math.sin(x));
    if (name === 'cos') return snapTrig(Math.cos(x));
    if (Math.abs(Math.cos(x)) < 1e-14) throw MATH();
    return snapTrig(Math.tan(x));
  }
  function invTrig(name, a, u) {
    const x = a.f;
    let r;
    if (name === 'sin') { if (x < -1 || x > 1) throw MATH(); r = Math.asin(x); }
    else if (name === 'cos') { if (x < -1 || x > 1) throw MATH(); r = Math.acos(x); }
    else r = Math.atan(x);
    return vFloat(fromRad(r, u));
  }

  // ── Function table ──────────────────────────────────────────────────────
  const need = (args, n) => { if (args.length !== n) throw SYNTAX(); };
  const FUNCS = {
    'sin(': (a, c) => (need(a, 1), trig('sin', a[0], c.angle)),
    'cos(': (a, c) => (need(a, 1), trig('cos', a[0], c.angle)),
    'tan(': (a, c) => (need(a, 1), trig('tan', a[0], c.angle)),
    'sin⁻¹(': (a, c) => (need(a, 1), invTrig('sin', a[0], c.angle)),
    'cos⁻¹(': (a, c) => (need(a, 1), invTrig('cos', a[0], c.angle)),
    'tan⁻¹(': (a, c) => (need(a, 1), invTrig('tan', a[0], c.angle)),
    'sinh(': a => (need(a, 1), vFloat(Math.sinh(a[0].f))),
    'cosh(': a => (need(a, 1), vFloat(Math.cosh(a[0].f))),
    'tanh(': a => (need(a, 1), vFloat(Math.tanh(a[0].f))),
    'sinh⁻¹(': a => (need(a, 1), vFloat(Math.asinh(a[0].f))),
    'cosh⁻¹(': a => { need(a, 1); if (a[0].f < 1) throw MATH(); return vFloat(Math.acosh(a[0].f)); },
    'tanh⁻¹(': a => { need(a, 1); if (Math.abs(a[0].f) >= 1) throw MATH(); return vFloat(Math.atanh(a[0].f)); },
    'log(': a => { need(a, 1); if (a[0].f <= 0) throw MATH(); return vFloat(Math.log10(a[0].f)); },
    'ln(': a => { need(a, 1); if (a[0].f <= 0) throw MATH(); return vFloat(Math.log(a[0].f)); },
    'logₐ(': a => { // logₐ(base, x)
      need(a, 2);
      if (a[0].f <= 0 || a[0].f === 1 || a[1].f <= 0) throw MATH();
      return vFloat(Math.log(a[1].f) / Math.log(a[0].f));
    },
    '√(': a => { need(a, 1); if (a[0].f < 0) throw MATH(); return pow(a[0], V(0.5, Rat(1n, 2n), false)); },
    '³√(': a => { need(a, 1); return pow(a[0], V(1 / 3, Rat(1n, 3n), false)); },
    'Abs(': a => (need(a, 1), a[0].f < 0 ? neg(a[0]) : a[0]),
    'Int(': a => (need(a, 1), vInt(BigInt(Math.trunc(a[0].f)))),
    'Intg(': a => (need(a, 1), vInt(BigInt(Math.floor(a[0].f)))),
    'GCD(': a => {
      need(a, 2);
      if (!isInt(a[0]) || !isInt(a[1])) throw MATH();
      return vInt(gcd(BigInt(a[0].f), BigInt(a[1].f)));
    },
    'LCM(': a => {
      need(a, 2);
      if (!isInt(a[0]) || !isInt(a[1])) throw MATH();
      const x = BigInt(a[0].f), y = BigInt(a[1].f);
      if (x === 0n || y === 0n) return vInt(0);
      const g = gcd(x, y); const l = x / g * y; return vInt(l < 0n ? -l : l);
    },
    'RanInt(': (a, c) => {
      need(a, 2);
      const lo = Math.ceil(a[0].f), hi = Math.floor(a[1].f);
      if (!isInt(a[0]) || !isInt(a[1]) || hi < lo) throw MATH();
      return vInt(lo + Math.floor(c.random() * (hi - lo + 1)));
    },
    'Pol(': (a, c) => { // rectangular → polar
      need(a, 2);
      const r = Math.hypot(a[0].f, a[1].f);
      const th = fromRad(Math.atan2(a[1].f, a[0].f), c.angle);
      const rv = vFloat(r), tv = vFloat(th);
      c.vars.X = rv; c.vars.Y = tv;
      c.extra = [['r', rv], ['θ', tv]];
      return rv;
    },
    'Rec(': (a, c) => { // polar → rectangular
      need(a, 2);
      const t = toRad(a[1].f, c.angle);
      const xv = a[1].f !== 0 && isFinite(t) ? snapTrigScaled(a[0].f * Math.cos(t), a[0].f) : vFloat(a[0].f);
      const yv = snapTrigScaled(a[0].f * Math.sin(t), a[0].f);
      c.vars.X = xv; c.vars.Y = yv;
      c.extra = [['x', xv], ['y', yv]];
      return xv;
    },
  };
  function snapTrigScaled(f, scale) { // like snapTrig but relative to the radius
    if (Math.abs(f) < 1e-14 * Math.max(1, Math.abs(scale))) return vInt(0);
    return vFloat(f);
  }

  // ── Lexer: editor tokens → parser items ─────────────────────────────────
  const BINOPS = new Set(['+', '-', '×', '÷', '^', 'ˣ√', 'P', 'C']);
  const POSTFIX = new Set(['²', '³', '⁻¹', '!', '%']);
  const CONSTS = new Set(['π', 'e', 'Ans', 'Ran#']);
  const VARS = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'M', 'X', 'Y']);
  const isDigit = t => t.length === 1 && t >= '0' && t <= '9';

  function decimalValue(mant, exp) {
    const parts = mant.split('.');
    if (parts.length > 2) throw SYNTAX();
    const frac = parts[1] || '';
    const digits = (parts[0] || '') + frac;
    if (!digits.length) throw SYNTAX();
    let n = BigInt(digits), d = 10n ** BigInt(frac.length);
    if (exp > 0) { if (exp > 100) throw MATH(); n *= 10n ** BigInt(exp); }
    else if (exp < 0) { if (exp < -100) throw MATH(); d *= 10n ** BigInt(-exp); }
    const hasDot = mant.includes('.');
    const v = V(Number(mant + 'e' + exp), Rat(n, d), hasDot);
    if (ratTooBig(v.r)) v.r = null;
    return checkRange(v);
  }

  function lex(tokens) {
    const out = [];
    for (let i = 0; i < tokens.length; i++) {
      const tk = tokens[i];
      if (isDigit(tk) || tk === '.' || tk === 'ᴇ') {
        let mant = '';
        while (i < tokens.length && (isDigit(tokens[i]) || tokens[i] === '.')) mant += tokens[i++];
        let exp = 0;
        if (tokens[i] === 'ᴇ') {
          if (!mant) mant = '1';
          i++;
          let sign = 1;
          if (tokens[i] === '-') { sign = -1; i++; }
          let ex = '';
          while (i < tokens.length && isDigit(tokens[i])) ex += tokens[i++];
          if (!ex) throw SYNTAX();
          exp = sign * parseInt(ex, 10);
        }
        i--;
        out.push({ t: 'num', v: decimalValue(mant, exp) });
      } else if (BINOPS.has(tk)) out.push({ t: 'op', s: tk });
      else if (POSTFIX.has(tk)) out.push({ t: 'post', s: tk });
      else if (tk === '┘') out.push({ t: 'frac' });
      else if (tk === '°') out.push({ t: 'dms' });
      else if (tk === '(') out.push({ t: 'lp' });
      else if (tk === ')') out.push({ t: 'rp' });
      else if (tk === ',') out.push({ t: 'comma' });
      else if (CONSTS.has(tk)) out.push({ t: 'const', s: tk });
      else if (VARS.has(tk)) out.push({ t: 'var', s: tk });
      else if (FUNCS[tk]) out.push({ t: 'fn', s: tk });
      else throw SYNTAX();
    }
    return out;
  }

  // ── Parser / evaluator ──────────────────────────────────────────────────
  // Priority (high → low): postfix (x² x! %) · ^ ˣ√ · unary − · nPr nCr ·
  // implicit multiplication (2π, 3sin(x)) · × ÷ · + −
  class Parser {
    constructor(items, ctx) { this.it = items; this.i = 0; this.c = ctx; }
    peek(k = 0) { return this.it[this.i + k]; }
    isOp(t, s) { return t && t.t === 'op' && t.s === s; }

    expr() {
      let v = this.mulDiv();
      for (;;) {
        const t = this.peek();
        if (this.isOp(t, '+')) { this.i++; v = add(v, this.mulDiv()); }
        else if (this.isOp(t, '-')) { this.i++; v = sub(v, this.mulDiv()); }
        else return v;
      }
    }
    mulDiv() {
      let v = this.implicit();
      for (;;) {
        const t = this.peek();
        if (this.isOp(t, '×')) { this.i++; v = mul(v, this.implicit()); }
        else if (this.isOp(t, '÷')) { this.i++; v = div(v, this.implicit()); }
        else return v;
      }
    }
    startsOperand() {
      const t = this.peek();
      return !!t && (t.t === 'num' || t.t === 'const' || t.t === 'var' || t.t === 'lp' || t.t === 'fn');
    }
    implicit() {
      let v = this.permComb();
      while (this.startsOperand()) v = mul(v, this.permComb());
      return v;
    }
    permComb() {
      let v = this.unary();
      for (;;) {
        const t = this.peek();
        if (this.isOp(t, 'P')) { this.i++; v = nPr(v, this.unary()); }
        else if (this.isOp(t, 'C')) { this.i++; v = nCr(v, this.unary()); }
        else return v;
      }
    }
    unary() {
      const t = this.peek();
      if (this.isOp(t, '-')) { this.i++; return neg(this.unary()); }
      if (this.isOp(t, '+')) { this.i++; return this.unary(); }
      return this.power();
    }
    power() {
      const base = this.postfix();
      const t = this.peek();
      if (this.isOp(t, '^')) { this.i++; return pow(base, this.powerOperand()); }
      if (this.isOp(t, 'ˣ√')) { // index ˣ√ radicand
        this.i++;
        const rad = this.powerOperand();
        if (isZero(base)) throw MATH();
        return pow(rad, recip(base));
      }
      return base;
    }
    powerOperand() {
      const t = this.peek();
      if (this.isOp(t, '-')) { this.i++; return neg(this.powerOperand()); }
      if (this.isOp(t, '+')) { this.i++; return this.powerOperand(); }
      return this.power();
    }
    postfix() {
      let v = this.primary();
      for (;;) {
        const t = this.peek();
        if (!t || t.t !== 'post') return v;
        this.i++;
        if (t.s === '²') v = pow(v, vInt(2));
        else if (t.s === '³') v = pow(v, vInt(3));
        else if (t.s === '⁻¹') v = recip(v);
        else if (t.s === '!') v = factorial(v);
        else v = div(v, vInt(100)); // %
      }
    }
    primary() {
      let v = this.atom();
      if (this.peek() && this.peek().t === 'frac') { // a┘b  or  a┘b┘c
        this.i++;
        const w = this.atom();
        if (this.peek() && this.peek().t === 'frac') {
          this.i++;
          v = add(v, div(w, this.atom()));
        } else v = div(v, w);
      }
      return v;
    }
    close() {
      const t = this.peek();
      if (!t) return; // closing brackets may be left off at the end
      if (t.t === 'rp') { this.i++; return; }
      throw SYNTAX();
    }
    atom() {
      const t = this.it[this.i++];
      if (!t) throw SYNTAX();
      const c = this.c;
      switch (t.t) {
        case 'num': {
          let v = t.v;
          if (this.peek() && this.peek().t === 'dms') { // 1°30°15° → degrees
            this.i++;
            let k = 1;
            while (k < 3 && this.peek() && this.peek().t === 'num' && this.peek(1) && this.peek(1).t === 'dms') {
              v = add(v, div(this.peek().v, vInt(k === 1 ? 60 : 3600)));
              this.i += 2; k++;
            }
            const f = c.angle === 'rad' ? V(Math.PI / 180, null, true) : c.angle === 'gra' ? V(10 / 9, Rat(10n, 9n), false) : vInt(1);
            v = mul(v, f);
            v.dec = true;
          }
          return v;
        }
        case 'const':
          if (t.s === 'π') return V(Math.PI, null, true);
          if (t.s === 'e') return V(Math.E, null, true);
          if (t.s === 'Ans') return c.ans || ZERO();
          return vRat(Rat(BigInt(Math.floor(c.random() * 1000)), 1000n), true); // Ran#
        case 'var': return c.vars[t.s] || ZERO();
        case 'lp': { const v = this.expr(); this.close(); return v; }
        case 'fn': {
          const args = [this.expr()];
          while (this.peek() && this.peek().t === 'comma') { this.i++; args.push(this.expr()); }
          this.close();
          return FUNCS[t.s](args, c);
        }
        default: throw SYNTAX();
      }
    }
  }

  // Evaluate an editor token array. ctx: { angle, vars, ans, random }.
  // Returns { val, extra } where extra holds Pol/Rec's second result.
  function evaluate(tokens, ctx) {
    ctx = Object.assign({ angle: 'deg', vars: {}, ans: null, random: Math.random }, ctx);
    ctx.vars = ctx.vars || {};
    ctx.extra = null;
    if (!tokens.length) throw SYNTAX();
    const p = new Parser(lex(tokens), ctx);
    const val = p.expr();
    if (p.i < p.it.length) throw SYNTAX();
    return { val: checkRange(val), extra: ctx.extra };
  }

  // Plain text (keyboard / form fields) → editor tokens. Unknown text → null.
  const WORDS = ['sinh⁻¹(', 'cosh⁻¹(', 'tanh⁻¹(', 'sin⁻¹(', 'cos⁻¹(', 'tan⁻¹(', 'asinh(', 'acosh(', 'atanh(', 'asin(', 'acos(', 'atan(',
    'sinh(', 'cosh(', 'tanh(', 'sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', 'cbrt(', 'abs(', 'pi', 'Ans',
    'Abs(', 'GCD(', 'LCM(', 'Intg(', 'Int(', 'Pol(', 'Rec(', 'RanInt(', 'Ran#'];
  const WORD_MAP = { 'asinh(': 'sinh⁻¹(', 'acosh(': 'cosh⁻¹(', 'atanh(': 'tanh⁻¹(', 'asin(': 'sin⁻¹(', 'acos(': 'cos⁻¹(', 'atan(': 'tan⁻¹(',
    'sqrt(': '√(', 'cbrt(': '³√(', 'abs(': 'Abs(', 'pi': 'π' };
  function textToTokens(str) {
    const out = [];
    const s = str.replace(/\s+/g, '');
    for (let i = 0; i < s.length;) {
      const rest = s.slice(i);
      const w = WORDS.find(x => rest.startsWith(x));
      if (w) { out.push(WORD_MAP[w] || w); i += w.length; continue; }
      const ch = s[i];
      if (ch === '*') out.push('×');
      else if (ch === '/') out.push('÷');
      else if (ch === '−' || ch === '–') out.push('-');
      else if ('0123456789.+-×÷^()πe,°┘'.includes(ch)) out.push(ch);
      else if (ch === 'E' && /\d/.test(s[i - 1] || '')) out.push('ᴇ');
      else if (ch === 'P' && /[\d)]/.test(s[i - 1] || '')) out.push('P');
      else if (ch === 'C' && /[\d)]/.test(s[i - 1] || '')) out.push('C');
      else if ('ABCDEFMXY'.includes(ch)) out.push(ch);
      else if (ch === '√') out.push('√(');
      else if (ch === '²' || ch === '³' || ch === '!' || ch === '%') out.push(ch);
      else return null;
      i++;
    }
    return out;
  }

  // ── Formatting ──────────────────────────────────────────────────────────
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = s => String(s).replace(/[0-9]/g, c => SUP[+c]).replace('-', '⁻');
  function stripZeros(s) { return s.includes('.') ? s.replace(/\.?0+$/, '') : s; }
  function sciString(f, sig) { // sig = significant digits
    const [m, e] = f.toExponential(Math.max(0, sig - 1)).split('e');
    return stripZeros(m) + '×10' + sup(parseInt(e, 10));
  }
  // st: { fmt:'norm1'|'norm2'|'fix'|'sci', digits, comma }
  function formatDecimal(f, st) {
    st = st || {};
    let s;
    const abs = Math.abs(f);
    const fmt = st.fmt || 'norm1';
    if (f === 0) s = fmt === 'fix' ? (0).toFixed(st.digits || 0) : fmt === 'sci' ? '0' : '0';
    else if (fmt === 'fix') {
      s = f.toFixed(Math.min(9, st.digits || 0));
      if (parseFloat(s) === 0) s = s.replace('-', '');
      if (abs >= 1e10) s = sciString(f, 10);
    } else if (fmt === 'sci') {
      s = (st.digits ? f.toExponential(st.digits - 1) : f.toExponential(9));
      const [m, e] = s.split('e');
      s = (st.digits ? m : stripZeros(m)) + '×10' + sup(parseInt(e, 10));
    } else {
      const lo = fmt === 'norm2' ? 1e-9 : 1e-2;
      if (abs < lo || abs >= 1e10) s = sciString(f, 10);
      else if (abs < 1e-5) s = stripZeros(Number(f.toPrecision(10)).toFixed(Math.min(20, 9 - Math.floor(Math.log10(abs)))));
      else s = stripZeros(f.toPrecision(10));
    }
    return st.comma ? s.replace('.', ',') : s;
  }
  const fitsFraction = r => r.n < 10n ** 10n && r.n > -(10n ** 10n) && r.d < 10n ** 10n;
  // Can this value be shown as a fraction at all?
  function canFraction(v) { return !!(v.r && v.r.d !== 1n && fitsFraction(v.r)); }
  // Fraction parts for display: { neg, whole, n, d } (whole = '' unless mixed)
  function fractionParts(v, mixed) {
    const r = v.r, neg = r.n < 0n, n = neg ? -r.n : r.n;
    if (mixed && n > r.d) return { neg, whole: String(n / r.d), n: String(n % r.d), d: String(r.d) };
    return { neg, whole: '', n: String(n), d: String(r.d) };
  }

  // DMS (degrees ° minutes ′ seconds ″)
  function formatDMS(f) {
    const neg = f < 0; f = Math.abs(f);
    let d = Math.floor(f + 1e-12);
    let mFull = (f - d) * 60, m = Math.floor(mFull + 1e-9);
    let s = Math.round(((mFull - m) * 60) * 100) / 100;
    if (s >= 60) { s -= 60; m++; }
    if (m >= 60) { m -= 60; d++; }
    return (neg ? '-' : '') + d + '°' + m + '′' + stripZeros(s.toFixed(2)) + '″';
  }

  // Nearest simple fraction (for equation roots) or null
  function approxFraction(f, maxDen = 1000, tol = 1e-9) {
    if (!isFinite(f)) return null;
    let h1 = 1, h0 = 0, k1 = 0, k0 = 1, x = Math.abs(f);
    for (let i = 0; i < 40; i++) {
      const a = Math.floor(x), h2 = a * h1 + h0, k2 = a * k1 + k0;
      if (k2 > maxDen) return null;
      h0 = h1; h1 = h2; k0 = k1; k1 = k2;
      if (Math.abs(Math.abs(f) - h1 / k1) < tol * Math.max(1, Math.abs(f))) {
        return k1 === 1 ? null : { n: (f < 0 ? -h1 : h1), d: k1 };
      }
      const frac = x - a; if (frac < 1e-12) return null; x = 1 / frac;
    }
    return null;
  }

  // ── Statistics ──────────────────────────────────────────────────────────
  function median(sorted) {
    const n = sorted.length; if (!n) return NaN;
    return n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  }
  // xs, fs: arrays of numbers (fs optional, default 1)
  function stat1(xs, fs) {
    const n0 = xs.length; if (!n0) throw MATH();
    fs = fs || xs.map(() => 1);
    let n = 0, sx = 0, sx2 = 0;
    for (let i = 0; i < n0; i++) { n += fs[i]; sx += fs[i] * xs[i]; sx2 += fs[i] * xs[i] * xs[i]; }
    if (n <= 0) throw MATH();
    const mean = sx / n;
    let ss = 0; for (let i = 0; i < n0; i++) ss += fs[i] * (xs[i] - mean) ** 2;
    const sorted = [];
    xs.map((x, i) => [x, fs[i]]).sort((a, b) => a[0] - b[0]).forEach(([x, f]) => { for (let k = 0; k < f && sorted.length < 200000; k++) sorted.push(x); });
    const h = Math.floor(sorted.length / 2);
    const q1 = sorted.length === 1 ? sorted[0] : median(sorted.slice(0, h));
    const q3 = sorted.length === 1 ? sorted[0] : median(sorted.slice(sorted.length - h));
    return {
      n, sumX: sx, sumX2: sx2, mean, sigma: Math.sqrt(ss / n), s: n > 1 ? Math.sqrt(ss / (n - 1)) : NaN,
      min: sorted[0], q1, median: median(sorted), q3, max: sorted[sorted.length - 1],
    };
  }
  function solveLinearSystem(M, b) { // Gaussian elimination with partial pivoting
    const n = b.length, A = M.map((row, i) => row.concat(b[i]));
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
      if (Math.abs(A[p][c]) < 1e-14) throw MATH();
      [A[c], A[p]] = [A[p], A[c]];
      for (let r = 0; r < n; r++) if (r !== c) { const k = A[r][c] / A[c][c]; for (let j = c; j <= n; j++) A[r][j] -= k * A[c][j]; }
    }
    return A.map((row, i) => row[n] / row[i]);
  }
  // type: 'linear' (A+Bx) | 'quad' (A+Bx+Cx²) | 'exp' (A·B^x) | 'power' (A·x^B) | 'log' (A+B·ln x)
  function regression(xs, ys, type) {
    if (xs.length !== ys.length || xs.length < 2) throw MATH();
    let X = xs.slice(), Y = ys.slice();
    if (type === 'exp') { if (Y.some(y => y <= 0)) throw MATH(); Y = Y.map(Math.log); }
    if (type === 'power') { if (Y.some(y => y <= 0) || X.some(x => x <= 0)) throw MATH(); Y = Y.map(Math.log); X = X.map(Math.log); }
    if (type === 'log') { if (X.some(x => x <= 0)) throw MATH(); X = X.map(Math.log); }
    const n = X.length;
    const sx = X.reduce((a, b) => a + b, 0), sy = Y.reduce((a, b) => a + b, 0);
    const sxx = X.reduce((a, x) => a + x * x, 0), syy = Y.reduce((a, y) => a + y * y, 0);
    const sxy = X.reduce((a, x, i) => a + x * Y[i], 0);
    const den = n * sxx - sx * sx;
    if (Math.abs(den) < 1e-14) throw MATH();
    let b = (n * sxy - sx * sy) / den, a = (sy - b * sx) / n;
    const rden = Math.sqrt(den * (n * syy - sy * sy));
    const r = rden ? (n * sxy - sx * sy) / rden : NaN;
    if (type === 'quad') {
      const s3 = X.reduce((q, x) => q + x ** 3, 0), s4 = X.reduce((q, x) => q + x ** 4, 0);
      const sx2y = X.reduce((q, x, i) => q + x * x * Y[i], 0);
      const [A, B, C] = solveLinearSystem([[n, sx, sxx], [sx, sxx, s3], [sxx, s3, s4]], [sy, sxy, sx2y]);
      return { type, a: A, b: B, c: C };
    }
    if (type === 'exp') return { type, a: Math.exp(a), b: Math.exp(b), r };
    if (type === 'power') return { type, a: Math.exp(a), b, r };
    return { type, a, b, r };
  }
  function regressionEstimateY(m, x) {
    switch (m.type) {
      case 'linear': return m.a + m.b * x;
      case 'quad': return m.a + m.b * x + m.c * x * x;
      case 'exp': return m.a * Math.pow(m.b, x);
      case 'power': return m.a * Math.pow(x, m.b);
      case 'log': return m.a + m.b * Math.log(x);
    }
  }
  function regressionEstimateX(m, y) { // list of solutions
    switch (m.type) {
      case 'linear': return m.b === 0 ? [] : [(y - m.a) / m.b];
      case 'quad': {
        const D = m.b * m.b - 4 * m.c * (m.a - y);
        if (D < 0 || m.c === 0) return [];
        return [(-m.b + Math.sqrt(D)) / (2 * m.c), (-m.b - Math.sqrt(D)) / (2 * m.c)];
      }
      case 'exp': return y > 0 ? [Math.log(y / m.a) / Math.log(m.b)] : [];
      case 'power': return y > 0 ? [Math.pow(y / m.a, 1 / m.b)] : [];
      case 'log': return [Math.exp((y - m.a) / m.b)];
    }
  }

  // ── Equation solvers ────────────────────────────────────────────────────
  // Simultaneous equations by Cramer's rule, on exact Values. rows: [[a,b,c]] or [[a,b,c,d]]
  function det2(a, b, c, d) { return sub(mul(a, d), mul(b, c)); }
  function det3(m) {
    return add(sub(mul(m[0][0], det2(m[1][1], m[1][2], m[2][1], m[2][2])),
      mul(m[0][1], det2(m[1][0], m[1][2], m[2][0], m[2][2]))),
    mul(m[0][2], det2(m[1][0], m[1][1], m[2][0], m[2][1])));
  }
  function solveSimul(rows) {
    const n = rows.length;
    if (n === 2) {
      const [[a1, b1, c1], [a2, b2, c2]] = rows;
      const D = det2(a1, b1, a2, b2);
      if (isZero(D)) throw MATH();
      return [div(det2(c1, b1, c2, b2), D), div(det2(a1, c1, a2, c2), D)];
    }
    const M = rows.map(r => r.slice(0, 3));
    const D = det3(M);
    if (isZero(D)) throw MATH();
    const out = [];
    for (let k = 0; k < 3; k++) out.push(div(det3(M.map((row, i) => row.map((v, j) => j === k ? rows[i][3] : v))), D));
    return out;
  }
  // Quadratic: returns { disc: Value, roots: [{re: Value, im: Value}] }
  function solveQuadratic(a, b, c) {
    if (isZero(a)) throw MATH();
    const disc = sub(mul(b, b), mul(vInt(4), mul(a, c)));
    const twoA = mul(vInt(2), a);
    if (disc.f >= 0) {
      const sq = FUNCS['√('](  [disc], {});
      return { disc, roots: [{ re: div(add(neg(b), sq), twoA), im: ZERO() }, { re: div(sub(neg(b), sq), twoA), im: ZERO() }] };
    }
    const sq = FUNCS['√('](  [neg(disc)], {});
    const re = div(neg(b), twoA), im = div(sq, twoA);
    const imAbs = im.f < 0 ? neg(im) : im;
    return { disc, roots: [{ re, im: imAbs }, { re, im: neg(imAbs) }] };
  }
  // Cubic with real coefficients → three roots {re, im} (floats)
  function solveCubic(a, b, c, d) {
    if (a === 0) throw MATH();
    const B = b / a, C = c / a, D = d / a;
    const p = C - B * B / 3, q = 2 * B ** 3 / 27 - B * C / 3 + D, sh = -B / 3;
    const disc = (q / 2) ** 2 + (p / 3) ** 3;
    const roots = [];
    if (disc > 1e-14 * Math.max(1, Math.abs(q), Math.abs(p))) {
      const sq = Math.sqrt(disc), u = Math.cbrt(-q / 2 + sq), v = Math.cbrt(-q / 2 - sq);
      const t = u + v, re = -t / 2 + sh, im = Math.sqrt(3) / 2 * (u - v);
      roots.push({ re: t + sh, im: 0 }, { re, im: Math.abs(im) }, { re, im: -Math.abs(im) });
    } else if (Math.abs(p) < 1e-14) {
      const t = Math.cbrt(-q);
      roots.push({ re: t + sh, im: 0 }, { re: t + sh, im: 0 }, { re: t + sh, im: 0 });
    } else {
      const r = 2 * Math.sqrt(-p / 3);
      const th = Math.acos(Math.max(-1, Math.min(1, (3 * q) / (2 * p) * Math.sqrt(-3 / p)))) / 3;
      for (let k = 0; k < 3; k++) roots.push({ re: r * Math.cos(th - 2 * Math.PI * k / 3) + sh, im: 0 });
    }
    return roots.map(r => ({ re: clean(r.re), im: clean(r.im) })).sort((x, y) => (y.im === 0) - (x.im === 0) || x.re - y.re);
  }

  // ── Table of values ─────────────────────────────────────────────────────
  // rows of { x, y } (y is a Value, or null on error) for f(X), start..end by step. Max 30 rows.
  function table(tokens, start, end, step, ctx) {
    if (step === 0 || (end - start) / step < 0) throw MATH();
    const n = Math.floor((end - start) / step + 1e-9) + 1;
    if (n > 30) throw new CalcError('Range ERROR');
    const rows = [];
    for (let i = 0; i < n; i++) {
      const x = clean(start + i * step);
      const c = Object.assign({}, ctx, { vars: Object.assign({}, ctx && ctx.vars, { X: vFloat(x, false) }) });
      try { rows.push({ x, y: evaluate(tokens, c).val }); } catch (e) { rows.push({ x, y: null }); }
    }
    return rows;
  }

  return {
    CalcError, evaluate, textToTokens, lex, FUNCS,
    V, vInt, vFloat, vRat, Rat, add, sub, mul, div, pow, neg, isZero, isInt,
    formatDecimal, formatDMS, canFraction, fractionParts, approxFraction, sup, clean,
    stat1, regression, regressionEstimateX, regressionEstimateY,
    solveSimul, solveQuadratic, solveCubic, table,
  };
});
