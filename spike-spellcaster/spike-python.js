// ═══════════════════════════════════════════════════════════════════════════
// Spike Spellcaster — Python Interpreter (LEGO SPIKE Prime subset)
// Indentation-aware tokeniser → recursive-descent parser → async tree-walker.
//
// Designed for the SPIKE Prime programming subset: imports, def, if/elif/else,
// for/while, arithmetic, f-strings, lists, and calls into host-provided
// "modules" (the simulated hub, motors and sensors). Host API methods may be
// async — the interpreter awaits them so motor moves can animate frame-by-frame.
//
// Public API:
//   SpikePython.run(source, {
//     modules,   // { 'spike': {...exports}, 'spike.control': {...}, ... }
//     builtins,  // extra globals merged over the defaults (print, range, …)
//     onOutput,  // (text) => void   — receives print() output
//     shouldStop // () => boolean    — return true to abort (Stop button)
//   }) => Promise<void>
// ═══════════════════════════════════════════════════════════════════════════
(function (global) {
'use strict';

// ─── Errors ──────────────────────────────────────────────────────────────────
class PyError extends Error {
  constructor(msg, line) {
    super(line != null ? `${msg} (line ${line})` : msg);
    this.pyLine = line;
  }
}
// Control-flow signals (not real errors)
class BreakSignal {}
class ContinueSignal {}
class ReturnSignal { constructor(v) { this.value = v; } }
class StopSignal extends Error { constructor() { super('Program stopped'); } }

// ─── Tokeniser ───────────────────────────────────────────────────────────────
const KEYWORDS = new Set([
  'if','elif','else','while','for','in','def','return','break','continue',
  'pass','and','or','not','is','True','False','None','import','from','as','global','lambda'
]);

const THREE_CHAR = ['**=','//='];
const TWO_CHAR   = ['**','//','==','!=','<=','>=','+=','-=','*=','/=','%='];

function tokenise(src) {
  // Normalise line endings + a few unicode operators that sneak in from copy-paste
  src = src.replace(/\r\n?/g, '\n')
           .replace(/[–—−]/g, '-')
           .replace(/×/g, '*').replace(/÷/g, '/')
           .replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  const tokens = [];
  const indents = [0];
  let i = 0, line = 1;
  let atLineStart = true;
  let bracketDepth = 0;

  const push = (type, value) => tokens.push({ type, value, line });

  while (i < src.length) {
    // ── Handle indentation at the start of a logical line ──
    if (atLineStart && bracketDepth === 0) {
      let indent = 0, j = i;
      while (j < src.length && (src[j] === ' ' || src[j] === '\t')) {
        indent += src[j] === '\t' ? 8 - (indent % 8) : 1; j++;
      }
      // Blank line or comment-only line → skip, no indent tokens
      if (j >= src.length || src[j] === '\n' || src[j] === '#') {
        if (src[j] === '#') { while (j < src.length && src[j] !== '\n') j++; }
        if (src[j] === '\n') { line++; j++; i = j; continue; }
        i = j; continue;
      }
      i = j;
      const cur = indents[indents.length - 1];
      if (indent > cur) { indents.push(indent); push('INDENT'); }
      else if (indent < cur) {
        while (indents.length > 1 && indents[indents.length - 1] > indent) {
          indents.pop(); push('DEDENT');
        }
        if (indents[indents.length - 1] !== indent)
          throw new PyError('inconsistent indentation', line);
      }
      atLineStart = false;
      continue;
    }

    const c = src[i];

    // Newline
    if (c === '\n') {
      line++; i++;
      if (bracketDepth === 0 && tokens.length && tokens[tokens.length - 1].type !== 'NEWLINE'
          && tokens[tokens.length - 1].type !== 'INDENT') {
        push('NEWLINE');
      }
      atLineStart = true;
      continue;
    }
    // Whitespace (inside a line)
    if (c === ' ' || c === '\t') { i++; continue; }
    // Line continuation
    if (c === '\\' && src[i + 1] === '\n') { i += 2; line++; continue; }
    // Comment
    if (c === '#') { while (i < src.length && src[i] !== '\n') i++; continue; }

    // f-strings:  f"..."  f'...'
    if ((c === 'f' || c === 'F') && (src[i + 1] === '"' || src[i + 1] === "'")) {
      const quote = src[i + 1];
      const triple = src.slice(i + 1, i + 4) === quote + quote + quote;
      i += triple ? 4 : 2;
      let raw = '';
      while (i < src.length) {
        if (triple && src.slice(i, i + 3) === quote + quote + quote) { i += 3; break; }
        if (!triple && src[i] === quote) { i++; break; }
        if (src[i] === '\n') line++;
        raw += src[i++];
      }
      push('FSTRING', raw);
      continue;
    }
    // Regular strings
    if (c === '"' || c === "'") {
      const quote = c;
      const triple = src.slice(i, i + 3) === quote + quote + quote;
      i += triple ? 3 : 1;
      let str = '';
      while (i < src.length) {
        if (triple && src.slice(i, i + 3) === quote + quote + quote) { i += 3; break; }
        if (!triple && src[i] === quote) { i++; break; }
        if (src[i] === '\\') {
          const n = src[i + 1];
          str += n === 'n' ? '\n' : n === 't' ? '\t' : n === '\\' ? '\\'
               : n === quote ? quote : n === 'r' ? '\r' : n === '0' ? '\0' : n;
          i += 2; continue;
        }
        if (src[i] === '\n') line++;
        str += src[i++];
      }
      push('STRING', str);
      continue;
    }
    // Numbers
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1]))) {
      let num = '';
      while (i < src.length && /[0-9._]/.test(src[i])) { if (src[i] !== '_') num += src[i]; i++; }
      // exponent
      if (src[i] === 'e' || src[i] === 'E') {
        num += src[i++]; if (src[i] === '+' || src[i] === '-') num += src[i++];
        while (i < src.length && /[0-9]/.test(src[i])) num += src[i++];
      }
      push('NUMBER', parseFloat(num));
      continue;
    }
    // Names / keywords
    if (/[A-Za-z_]/.test(c)) {
      let name = '';
      while (i < src.length && /[A-Za-z0-9_]/.test(src[i])) name += src[i++];
      push(KEYWORDS.has(name) ? name : 'NAME', name);
      continue;
    }
    // Brackets (track depth so newlines inside are ignored)
    if (c === '(' || c === '[' || c === '{') { bracketDepth++; push('OP', c); i++; continue; }
    if (c === ')' || c === ']' || c === '}') { bracketDepth = Math.max(0, bracketDepth - 1); push('OP', c); i++; continue; }

    // Multi-char operators
    const three = src.slice(i, i + 3);
    if (THREE_CHAR.includes(three)) { push('OP', three); i += 3; continue; }
    const two = src.slice(i, i + 2);
    if (TWO_CHAR.includes(two)) { push('OP', two); i += 2; continue; }
    if ('+-*/%<>=.,:'.includes(c)) { push('OP', c); i++; continue; }

    throw new PyError(`unexpected character '${c}'`, line);
  }

  if (bracketDepth === 0 && tokens.length && tokens[tokens.length - 1].type !== 'NEWLINE')
    push('NEWLINE');
  while (indents.length > 1) { indents.pop(); push('DEDENT'); }
  push('EOF');
  return tokens;
}

// ─── Parser ──────────────────────────────────────────────────────────────────
function parse(tokens) {
  let pos = 0;
  const peek = (o = 0) => tokens[pos + o];
  const at = (type, value) => {
    const t = tokens[pos];
    return t.type === type && (value === undefined || t.value === value);
  };
  const atOp = (v) => at('OP', v);
  const next = () => tokens[pos++];
  const expect = (type, value) => {
    const t = tokens[pos];
    if (t.type !== type || (value !== undefined && t.value !== value))
      throw new PyError(`expected ${value || type} but found '${t.value ?? t.type}'`, t.line);
    return tokens[pos++];
  };
  const skipNewlines = () => { while (at('NEWLINE')) next(); };

  // program → statements until EOF
  function parseProgram() {
    const body = [];
    skipNewlines();
    while (!at('EOF')) { body.push(parseStatement()); skipNewlines(); }
    return { type: 'Program', body };
  }

  function parseBlock() {
    expect('OP', ':');
    skipNewlines();
    if (at('INDENT')) {
      next();
      const body = [];
      skipNewlines();
      while (!at('DEDENT') && !at('EOF')) { body.push(parseStatement()); skipNewlines(); }
      if (at('DEDENT')) next();
      return body;
    }
    // one-liner:  if x: do_thing()
    return [parseSimpleStatement()];
  }

  function parseStatement() {
    if (at('if'))    return parseIf();
    if (at('while')) return parseWhile();
    if (at('for'))   return parseFor();
    if (at('def'))   return parseDef();
    return parseSimpleStatement();
  }

  function parseSimpleStatement() {
    const ln = peek().line;
    let stmt;
    if (at('return')) {
      next();
      const value = (at('NEWLINE') || at('EOF') || at('DEDENT')) ? null : parseExprList();
      stmt = { type: 'Return', value, line: ln };
    } else if (at('break'))    { next(); stmt = { type: 'Break', line: ln }; }
    else if (at('continue'))   { next(); stmt = { type: 'Continue', line: ln }; }
    else if (at('pass'))       { next(); stmt = { type: 'Pass', line: ln }; }
    else if (at('global'))     {
      next(); const names = [expect('NAME').value];
      while (atOp(',')) { next(); names.push(expect('NAME').value); }
      stmt = { type: 'Global', names, line: ln };
    }
    else if (at('import'))     { stmt = parseImport(ln); }
    else if (at('from'))       { stmt = parseFromImport(ln); }
    else                       { stmt = parseExprOrAssign(ln); }
    if (at('NEWLINE')) next();
    return stmt;
  }

  function parseImport(ln) {
    next(); // import
    const dotted = () => {
      let name = expect('NAME').value;
      while (atOp('.')) { next(); name += '.' + expect('NAME').value; }
      return name;
    };
    const imports = [];
    do {
      const module = dotted();
      let alias = null;
      if (at('as')) { next(); alias = expect('NAME').value; }
      imports.push({ module, alias });
    } while (atOp(',') && next());
    if (imports.length === 1) return { type: 'Import', module: imports[0].module, alias: imports[0].alias, line: ln };
    return { type: 'ImportMulti', imports, line: ln };
  }

  function parseFromImport(ln) {
    next(); // from
    let module = expect('NAME').value;
    while (atOp('.')) { next(); module += '.' + expect('NAME').value; }
    expect('import');
    const names = [];
    if (atOp('*')) { next(); names.push({ name: '*', alias: null }); }
    else {
      const one = () => {
        const name = expect('NAME').value;
        let alias = null;
        if (at('as')) { next(); alias = expect('NAME').value; }
        names.push({ name, alias });
      };
      one();
      while (atOp(',')) { next(); if (at('NEWLINE') || at('EOF')) break; one(); }
    }
    return { type: 'FromImport', module, names, line: ln };
  }

  // expr, or a bare comma list → Tuple (for  a, b = ...  and  return a, b)
  function parseExprList() {
    const first = parseExpr();
    if (!atOp(',')) return first;
    const elts = [first];
    while (atOp(',')) {
      next();
      if (at('NEWLINE') || at('EOF') || atOp('=') || atOp(':')) break;
      elts.push(parseExpr());
    }
    return { type: 'Tuple', elts };
  }

  function parseExprOrAssign(ln) {
    const target = parseExprList();
    // augmented assignment
    if (at('OP') && ['+=','-=','*=','/=','%=','**=','//='].includes(peek().value)) {
      const op = next().value.slice(0, -1);
      const value = parseExprList();
      return { type: 'AugAssign', target, op, value, line: ln };
    }
    if (atOp('=')) {
      const targets = [target];
      let value;
      next();
      value = parseExprList();
      while (atOp('=')) { next(); targets.push(value); value = parseExprList(); }
      return { type: 'Assign', targets, value, line: ln };
    }
    return { type: 'ExprStmt', expr: target, line: ln };
  }

  function parseIf() {
    const ln = next().line; // if
    const test = parseExpr();
    const body = parseBlock();
    let orelse = [];
    skipNewlines();
    if (at('elif')) { orelse = [parseElif()]; }
    else if (at('else')) { next(); orelse = parseBlock(); }
    return { type: 'If', test, body, orelse, line: ln };
  }
  function parseElif() {
    const ln = next().line; // elif
    const test = parseExpr();
    const body = parseBlock();
    let orelse = [];
    skipNewlines();
    if (at('elif')) { orelse = [parseElif()]; }
    else if (at('else')) { next(); orelse = parseBlock(); }
    return { type: 'If', test, body, orelse, line: ln };
  }

  function parseWhile() {
    const ln = next().line;
    const test = parseExpr();
    const body = parseBlock();
    return { type: 'While', test, body, line: ln };
  }

  function parseFor() {
    const ln = next().line;
    const targets = [expect('NAME').value];
    while (atOp(',')) { next(); targets.push(expect('NAME').value); }
    expect('in');
    const iter = parseExpr();
    const body = parseBlock();
    return { type: 'For', targets, iter, body, line: ln };
  }

  function parseDef() {
    const ln = next().line;
    const name = expect('NAME').value;
    expect('OP', '(');
    const params = [];
    while (!atOp(')')) {
      const pname = expect('NAME').value;
      let def = null;
      if (atOp('=')) { next(); def = parseExpr(); }
      params.push({ name: pname, default: def });
      if (atOp(',')) next(); else break;
    }
    expect('OP', ')');
    const body = parseBlock();
    return { type: 'FunctionDef', name, params, body, line: ln };
  }

  // ── Expressions ──
  function parseExpr() {
    if (at('lambda')) return parseLambda();
    return parseTernary();
  }

  function parseLambda() {
    const ln = next().line; // lambda
    const params = [];
    while (!atOp(':')) {
      const pname = expect('NAME').value;
      let def = null;
      if (atOp('=')) { next(); def = parseExpr(); }
      params.push({ name: pname, default: def });
      if (atOp(',')) next(); else break;
    }
    expect('OP', ':');
    const body = parseExpr();
    return { type: 'Lambda', params, body, line: ln };
  }

  function parseTernary() {
    let expr = parseOr();
    if (at('if')) {
      next();
      const cond = parseOr();
      expect('else');
      const orelse = parseTernary();
      return { type: 'Ternary', body: expr, test: cond, orelse };
    }
    return expr;
  }

  function parseOr() {
    let left = parseAnd();
    while (at('or')) { const ln = next().line; const right = parseAnd(); left = { type: 'BoolOp', op: 'or', left, right, line: ln }; }
    return left;
  }
  function parseAnd() {
    let left = parseNot();
    while (at('and')) { const ln = next().line; const right = parseNot(); left = { type: 'BoolOp', op: 'and', left, right, line: ln }; }
    return left;
  }
  function parseNot() {
    if (at('not')) { const ln = next().line; return { type: 'UnaryOp', op: 'not', operand: parseNot(), line: ln }; }
    return parseComparison();
  }
  function parseComparison() {
    let left = parseArith();
    const ops = [];
    const comps = [];
    while (true) {
      let op = null;
      if (at('OP') && ['==','!=','<','>','<=','>='].includes(peek().value)) op = next().value;
      else if (at('in')) { next(); op = 'in'; }
      else if (at('not') && peek(1).type === 'in') { next(); next(); op = 'not in'; }
      else if (at('is')) { next(); if (at('not')) { next(); op = 'is not'; } else op = 'is'; }
      else break;
      ops.push(op); comps.push(parseArith());
    }
    if (!ops.length) return left;
    return { type: 'Compare', left, ops, comparators: comps };
  }
  function parseArith() {
    let left = parseTerm();
    while (at('OP') && ['+','-'].includes(peek().value)) {
      const op = next().value; const right = parseTerm();
      left = { type: 'BinOp', op, left, right };
    }
    return left;
  }
  function parseTerm() {
    let left = parseFactor();
    while (at('OP') && ['*','/','//','%'].includes(peek().value)) {
      const op = next().value; const right = parseFactor();
      left = { type: 'BinOp', op, left, right };
    }
    return left;
  }
  function parseFactor() {
    if (at('OP') && ['+','-'].includes(peek().value)) {
      const op = next().value; return { type: 'UnaryOp', op, operand: parseFactor() };
    }
    return parsePower();
  }
  function parsePower() {
    const base = parseUnaryPostfix();
    if (atOp('**')) { next(); const exp = parseFactor(); return { type: 'BinOp', op: '**', left: base, right: exp }; }
    return base;
  }

  function parseUnaryPostfix() {
    let node = parseAtom();
    while (true) {
      if (atOp('(')) {
        next();
        const args = [];
        const kwargs = [];
        while (!atOp(')')) {
          if (at('NAME') && peek(1).type === 'OP' && peek(1).value === '=') {
            const key = next().value; next(); kwargs.push({ key, value: parseExpr() });
          } else {
            args.push(parseExpr());
          }
          if (atOp(',')) next(); else break;
        }
        expect('OP', ')');
        node = { type: 'Call', func: node, args, kwargs };
      } else if (atOp('[')) {
        next();
        // slice a[start:stop]
        let start = null, stop = null, isSlice = false;
        if (!atOp(':')) start = parseExpr();
        if (atOp(':')) { isSlice = true; next(); if (!atOp(']')) stop = parseExpr(); }
        expect('OP', ']');
        node = isSlice ? { type: 'Slice', obj: node, start, stop }
                       : { type: 'Subscript', obj: node, index: start };
      } else if (atOp('.')) {
        next();
        const attr = expect('NAME').value;
        node = { type: 'Attribute', obj: node, attr };
      } else break;
    }
    return node;
  }

  function parseAtom() {
    const t = peek();
    if (at('NUMBER'))  { next(); return { type: 'Num', value: t.value }; }
    if (at('STRING'))  { next(); return { type: 'Str', value: t.value }; }
    if (at('FSTRING')) { next(); return parseFString(t.value); }
    if (at('True'))    { next(); return { type: 'Const', value: true }; }
    if (at('False'))   { next(); return { type: 'Const', value: false }; }
    if (at('None'))    { next(); return { type: 'Const', value: null }; }
    if (at('NAME'))    { next(); return { type: 'Name', id: t.value, line: t.line }; }
    if (atOp('(')) {
      next();
      if (atOp(')')) { next(); return { type: 'Tuple', elts: [] }; }
      const first = parseExpr();
      if (atOp(',')) {
        const elts = [first];
        while (atOp(',')) { next(); if (atOp(')')) break; elts.push(parseExpr()); }
        expect('OP', ')');
        return { type: 'Tuple', elts };
      }
      expect('OP', ')');
      return first;
    }
    if (atOp('[')) {
      next();
      const elts = [];
      while (!atOp(']')) { elts.push(parseExpr()); if (atOp(',')) next(); else break; }
      expect('OP', ']');
      return { type: 'List', elts };
    }
    if (atOp('{')) {
      next();
      const keys = [], values = [];
      let isDict = true;
      if (!atOp('}')) {
        const first = parseExpr();
        if (atOp(':')) { next(); keys.push(first); values.push(parseExpr()); }
        else { isDict = false; keys.push(first); }
        while (atOp(',')) {
          next(); if (atOp('}')) break;
          const k = parseExpr();
          if (isDict) { expect('OP', ':'); keys.push(k); values.push(parseExpr()); }
          else keys.push(k);
        }
      }
      expect('OP', '}');
      return isDict ? { type: 'Dict', keys, values } : { type: 'Set', elts: keys };
    }
    throw new PyError(`unexpected token '${t.value ?? t.type}'`, t.line);
  }

  // f-string: split raw into literal chunks + {expr} chunks
  function parseFString(raw) {
    const parts = [];
    let i = 0, buf = '';
    while (i < raw.length) {
      const c = raw[i];
      if (c === '{' && raw[i + 1] === '{') { buf += '{'; i += 2; continue; }
      if (c === '}' && raw[i + 1] === '}') { buf += '}'; i += 2; continue; }
      if (c === '{') {
        if (buf) { parts.push({ lit: buf }); buf = ''; }
        i++;
        let depth = 1, exprSrc = '';
        while (i < raw.length && depth > 0) {
          if (raw[i] === '{') depth++;
          else if (raw[i] === '}') { depth--; if (depth === 0) break; }
          exprSrc += raw[i++];
        }
        i++; // closing }
        // strip a trailing format spec / conversion (e.g. :.2f) — ignored, we just str() it
        const colon = splitFormatSpec(exprSrc);
        const subTokens = tokenise(colon.expr);
        const subAst = parseExprStandalone(subTokens);
        parts.push({ expr: subAst });
      } else { buf += c; i++; }
    }
    if (buf) parts.push({ lit: buf });
    return { type: 'FString', parts };
  }

  return parseProgram();
}

// helper: split "value:.2f" → { expr:'value' } (format spec dropped)
function splitFormatSpec(s) {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(' || c === '[' || c === '{') depth++;
    else if (c === ')' || c === ']' || c === '}') depth--;
    else if ((c === ':' || c === '!') && depth === 0) return { expr: s.slice(0, i) };
  }
  return { expr: s };
}

// parse a standalone expression token stream (used by f-strings)
function parseExprStandalone(tokens) {
  // Strip leading INDENT/NEWLINE noise, wrap as a single expression statement
  const prog = parse(tokens);
  const stmt = prog.body.find(s => s.type === 'ExprStmt');
  if (!stmt) throw new PyError('invalid f-string expression');
  return stmt.expr;
}

// ─── Runtime values ──────────────────────────────────────────────────────────
// Python function object
class PyFunction {
  constructor(node, closure, interp) { this.node = node; this.closure = closure; this.interp = interp; }
}
// range object → iterable
function makeRange(start, stop, step) {
  if (stop === undefined) { stop = start; start = 0; }
  if (step === undefined) step = 1;
  const arr = [];
  if (step > 0) for (let i = start; i < stop; i += step) arr.push(i);
  else if (step < 0) for (let i = start; i > stop; i += step) arr.push(i);
  return arr;
}

// ─── Interpreter ─────────────────────────────────────────────────────────────
class Interpreter {
  constructor(opts) {
    this.opts = opts || {};
    this.onOutput = this.opts.onOutput || (() => {});
    this.shouldStop = this.opts.shouldStop || (() => false);
    this.modules = this.opts.modules || {};
    this.globals = Object.create(null);
    this.ops = 0;
    this.installBuiltins();
    if (this.opts.builtins) Object.assign(this.globals, this.opts.builtins);
  }

  installBuiltins() {
    const g = this.globals;
    const self = this;
    g['print'] = (...args) => { self.onOutput(args.map(pyStr).join(' ')); return null; };
    g['range'] = (...a) => makeRange(...a);
    g['len']   = (x) => {
      if (typeof x === 'string' || Array.isArray(x)) return x.length;
      if (x instanceof Map) return x.size;
      throw new PyError('object has no len()');
    };
    g['str']   = (x) => x === undefined ? '' : pyStr(x);
    g['int']   = (x) => { const n = typeof x === 'string' ? parseInt(x, 10) : Math.trunc(Number(x)); if (Number.isNaN(n)) throw new PyError(`invalid int(): ${pyStr(x)}`); return n; };
    g['float'] = (x) => { const n = Number(x); if (Number.isNaN(n)) throw new PyError(`invalid float(): ${pyStr(x)}`); return n; };
    g['bool']  = (x) => truthy(x);
    g['abs']   = (x) => Math.abs(x);
    g['min']   = (...a) => Math.min(...(a.length === 1 && Array.isArray(a[0]) ? a[0] : a));
    g['max']   = (...a) => Math.max(...(a.length === 1 && Array.isArray(a[0]) ? a[0] : a));
    g['round'] = (x, n) => { const f = Math.pow(10, n || 0); return Math.round(x * f) / f; };
    g['sum']   = (a, start) => a.reduce((s, v) => s + v, start || 0);
    g['sorted']= (a) => [...a].sort((x, y) => (x > y ? 1 : x < y ? -1 : 0));
    g['reversed'] = (a) => [...a].reverse();
    g['list']  = (a) => a === undefined ? [] : Array.from(a);
    g['abs']   = (x) => Math.abs(x);
    g['pow']   = (x, y) => Math.pow(x, y);
  }

  async run(source) {
    const ast = parse(tokenise(source));
    await this.execBlock(ast.body, this.globals, this.globals);
  }

  // ── scopes ──
  lookup(name, local, globalScope) {
    if (name in local) return local[name];
    if (local !== globalScope && name in globalScope) return globalScope[name];
    if (name in this.globals) return this.globals[name];
    throw new PyError(`name '${name}' is not defined`);
  }

  async tick(line) {
    // Cooperative abort + a soft cap against runaway loops
    if (this.shouldStop()) throw new StopSignal();
    if ((++this.ops & 0x3fff) === 0) await new Promise(r => setTimeout(r, 0));
  }

  async execBlock(stmts, local, globalScope) {
    for (const s of stmts) await this.execStmt(s, local, globalScope);
  }

  async execStmt(node, local, globalScope) {
    await this.tick(node.line);
    switch (node.type) {
      case 'ExprStmt': await this.eval(node.expr, local, globalScope); return;
      case 'Pass': return;
      case 'Break': throw new BreakSignal();
      case 'Continue': throw new ContinueSignal();
      case 'Return': throw new ReturnSignal(node.value ? await this.eval(node.value, local, globalScope) : null);
      case 'Global':
        local.__globals__ = local.__globals__ || new Set();
        node.names.forEach(n => local.__globals__.add(n));
        return;

      case 'Assign': {
        const val = await this.eval(node.value, local, globalScope);
        for (const tgt of node.targets) await this.assign(tgt, val, local, globalScope);
        return;
      }
      case 'AugAssign': {
        const cur = await this.eval(node.target, local, globalScope);
        const rhs = await this.eval(node.value, local, globalScope);
        await this.assign(node.target, binOp(node.op, cur, rhs), local, globalScope);
        return;
      }

      case 'If': {
        if (truthy(await this.eval(node.test, local, globalScope)))
          await this.execBlock(node.body, local, globalScope);
        else await this.execBlock(node.orelse, local, globalScope);
        return;
      }
      case 'While': {
        while (truthy(await this.eval(node.test, local, globalScope))) {
          try { await this.execBlock(node.body, local, globalScope); }
          catch (e) { if (e instanceof BreakSignal) break; if (e instanceof ContinueSignal) continue; throw e; }
        }
        return;
      }
      case 'For': {
        const iterable = await this.eval(node.iter, local, globalScope);
        const items = toIterable(iterable);
        for (const item of items) {
          await this.tick(node.line);
          if (node.targets.length === 1) await this.assignName(node.targets[0], item, local, globalScope);
          else {
            const vals = toIterable(item);
            node.targets.forEach((t, i) => this.assignName(t, vals[i], local, globalScope));
          }
          try { await this.execBlock(node.body, local, globalScope); }
          catch (e) { if (e instanceof BreakSignal) break; if (e instanceof ContinueSignal) continue; throw e; }
        }
        return;
      }

      case 'FunctionDef': {
        const fn = new PyFunction(node, local, this);
        this.bindLocal(node.name, fn, local, globalScope);
        return;
      }

      case 'Import': {
        const mod = this.modules[node.module];
        if (!mod) throw new PyError(`No module named '${node.module}'`, node.line);
        this.bindLocal(node.alias || node.module.split('.')[0], mod, local, globalScope);
        return;
      }
      case 'ImportMulti': {
        for (const imp of node.imports) {
          const mod = this.modules[imp.module];
          if (!mod) throw new PyError(`No module named '${imp.module}'`, node.line);
          this.bindLocal(imp.alias || imp.module.split('.')[0], mod, local, globalScope);
        }
        return;
      }
      case 'FromImport': {
        const mod = this.modules[node.module];
        if (!mod) throw new PyError(`No module named '${node.module}'`, node.line);
        if (node.names[0] && node.names[0].name === '*') {
          for (const k of Object.keys(mod)) this.bindLocal(k, mod[k], local, globalScope);
        } else {
          for (const { name, alias } of node.names) {
            if (!(name in mod)) throw new PyError(`cannot import '${name}' from '${node.module}'`, node.line);
            this.bindLocal(alias || name, mod[name], local, globalScope);
          }
        }
        return;
      }
    }
    throw new PyError(`cannot execute ${node.type}`, node.line);
  }

  bindLocal(name, val, local, globalScope) {
    if (local.__globals__ && local.__globals__.has(name)) globalScope[name] = val;
    else local[name] = val;
  }
  assignName(name, val, local, globalScope) { this.bindLocal(name, val, local, globalScope); }

  async assign(target, val, local, globalScope) {
    if (target.type === 'Name') { this.bindLocal(target.id, val, local, globalScope); return; }
    if (target.type === 'Tuple' || target.type === 'List') {
      const vals = toIterable(val);
      for (let i = 0; i < target.elts.length; i++) await this.assign(target.elts[i], vals[i], local, globalScope);
      return;
    }
    if (target.type === 'Subscript') {
      const obj = await this.eval(target.obj, local, globalScope);
      const idx = await this.eval(target.index, local, globalScope);
      if (Array.isArray(obj)) obj[idx < 0 ? obj.length + idx : idx] = val;
      else if (obj instanceof Map) obj.set(idx, val);
      else throw new PyError('object does not support item assignment');
      return;
    }
    if (target.type === 'Attribute') {
      const obj = await this.eval(target.obj, local, globalScope);
      obj[target.attr] = val; return;
    }
    throw new PyError('cannot assign to this target');
  }

  // ── expressions ──
  async eval(node, local, globalScope) {
    switch (node.type) {
      case 'Num': case 'Str': case 'Const': return node.value;
      case 'Name': return this.lookup(node.id, local, globalScope);
      case 'List': { const a = []; for (const e of node.elts) a.push(await this.eval(e, local, globalScope)); return a; }
      case 'Tuple': { const a = []; for (const e of node.elts) a.push(await this.eval(e, local, globalScope)); return a; }
      case 'Set': { const a = []; for (const e of node.elts) a.push(await this.eval(e, local, globalScope)); return a; }
      case 'Dict': {
        const m = new Map();
        for (let i = 0; i < node.keys.length; i++)
          m.set(await this.eval(node.keys[i], local, globalScope), await this.eval(node.values[i], local, globalScope));
        return m;
      }
      case 'FString': {
        let out = '';
        for (const p of node.parts) out += 'lit' in p ? p.lit : pyStr(await this.eval(p.expr, local, globalScope));
        return out;
      }
      case 'UnaryOp': {
        const v = await this.eval(node.operand, local, globalScope);
        if (node.op === 'not') return !truthy(v);
        if (node.op === '-') return -v;
        return +v;
      }
      case 'BinOp': return binOp(node.op, await this.eval(node.left, local, globalScope), await this.eval(node.right, local, globalScope));
      case 'BoolOp': {
        const l = await this.eval(node.left, local, globalScope);
        if (node.op === 'and') return truthy(l) ? await this.eval(node.right, local, globalScope) : l;
        return truthy(l) ? l : await this.eval(node.right, local, globalScope);
      }
      case 'Compare': {
        let left = await this.eval(node.left, local, globalScope);
        for (let i = 0; i < node.ops.length; i++) {
          const right = await this.eval(node.comparators[i], local, globalScope);
          if (!compare(node.ops[i], left, right)) return false;
          left = right;
        }
        return true;
      }
      case 'Ternary': return truthy(await this.eval(node.test, local, globalScope))
        ? await this.eval(node.body, local, globalScope)
        : await this.eval(node.orelse, local, globalScope);
      case 'Lambda': {
        const fnNode = { name: '<lambda>', params: node.params, body: [{ type: 'Return', value: node.body, line: node.line }] };
        return new PyFunction(fnNode, local, this);
      }
      case 'Attribute': {
        const obj = await this.eval(node.obj, local, globalScope);
        return this.getAttr(obj, node.attr);
      }
      case 'Subscript': {
        const obj = await this.eval(node.obj, local, globalScope);
        let idx = await this.eval(node.index, local, globalScope);
        if (obj instanceof Map) return obj.has(idx) ? obj.get(idx) : (() => { throw new PyError(`KeyError: ${pyStr(idx)}`); })();
        if (typeof idx === 'number' && idx < 0) idx = obj.length + idx;
        return obj[idx];
      }
      case 'Slice': {
        const obj = await this.eval(node.obj, local, globalScope);
        const s = node.start ? await this.eval(node.start, local, globalScope) : undefined;
        const e = node.stop ? await this.eval(node.stop, local, globalScope) : undefined;
        return obj.slice(s, e);
      }
      case 'Call': return this.evalCall(node, local, globalScope);
    }
    throw new PyError(`cannot evaluate ${node.type}`);
  }

  getAttr(obj, attr) {
    if (obj == null) throw new PyError(`'None' object has no attribute '${attr}'`);
    // string / list methods
    if (typeof obj === 'string') { const m = strMethods[attr]; if (m) return m.bind(null, obj); }
    if (Array.isArray(obj)) { const m = listMethods[attr]; if (m) return m.bind(null, obj); }
    if (obj instanceof Map) { const m = dictMethods[attr]; if (m) return m.bind(null, obj); }
    const v = obj[attr];
    if (v === undefined && !(attr in obj)) throw new PyError(`object has no attribute '${attr}'`);
    return typeof v === 'function' ? v.bind(obj) : v;
  }

  async evalCall(node, local, globalScope) {
    // Evaluate args
    const args = [];
    for (const a of node.args) args.push(await this.eval(a, local, globalScope));
    const kwargs = {};
    for (const kw of node.kwargs) kwargs[kw.key] = await this.eval(kw.value, local, globalScope);
    const hasKw = node.kwargs.length > 0;

    const callee = await this.eval(node.func, local, globalScope);

    if (callee instanceof PyFunction) return this.callPyFunction(callee, args, kwargs);

    if (typeof callee === 'function') {
      // Host / builtin function. Wrap any Python function/lambda args so host code
      // (e.g. wait_until) can invoke them as ordinary async JS callbacks.
      const wrap = (v) => v instanceof PyFunction ? ((...a) => this.callPyFunction(v, a, {})) : v;
      const jsArgs = args.map(wrap);
      for (const k in kwargs) kwargs[k] = wrap(kwargs[k]);
      // Pass kwargs object as a trailing arg if present.
      const finalArgs = hasKw ? [...jsArgs, kwargs] : jsArgs;
      let res;
      try { res = callee(...finalArgs); }
      catch (e) { if (e instanceof PyError || e instanceof StopSignal) throw e; throw new PyError(e.message, node.line); }
      return (res && typeof res.then === 'function') ? await res : res;
    }
    throw new PyError(`'${pyTypeName(callee)}' object is not callable`, node.line);
  }

  async callPyFunction(fn, args, kwargs) {
    const local = Object.create(null);
    const params = fn.node.params;
    for (let i = 0; i < params.length; i++) {
      const p = params[i];
      if (i < args.length) local[p.name] = args[i];
      else if (kwargs && p.name in kwargs) local[p.name] = kwargs[p.name];
      else if (p.default != null) local[p.name] = await this.eval(p.default, fn.closure, this.globals);
      else throw new PyError(`${fn.node.name}() missing argument '${p.name}'`);
    }
    try { await this.execBlock(fn.node.body, local, this.globals); }
    catch (e) { if (e instanceof ReturnSignal) return e.value; throw e; }
    return null;
  }
}

// ─── Operators / helpers ─────────────────────────────────────────────────────
function binOp(op, a, b) {
  switch (op) {
    case '+':
      if (Array.isArray(a) && Array.isArray(b)) return a.concat(b);
      return a + b;
    case '-': return a - b;
    case '*':
      if (typeof a === 'string' && typeof b === 'number') return a.repeat(Math.max(0, b));
      if (typeof b === 'string' && typeof a === 'number') return b.repeat(Math.max(0, a));
      if (Array.isArray(a) && typeof b === 'number') { let r = []; for (let i = 0; i < b; i++) r = r.concat(a); return r; }
      return a * b;
    case '/': return a / b;
    case '//': return Math.floor(a / b);
    case '%':
      if (typeof a === 'string') return pyFormat(a, b);
      return ((a % b) + b) % b;
    case '**': return Math.pow(a, b);
  }
  throw new PyError(`unsupported operator ${op}`);
}

function compare(op, a, b) {
  switch (op) {
    case '==': return pyEq(a, b);
    case '!=': return !pyEq(a, b);
    case '<': return a < b;
    case '>': return a > b;
    case '<=': return a <= b;
    case '>=': return a >= b;
    case 'in': return contains(b, a);
    case 'not in': return !contains(b, a);
    case 'is': return a === b || (a == null && b == null);
    case 'is not': return !(a === b || (a == null && b == null));
  }
  throw new PyError(`unsupported comparison ${op}`);
}

function pyEq(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((v, i) => pyEq(v, b[i]));
  return a === b;
}
function contains(container, item) {
  if (typeof container === 'string') return container.includes(item);
  if (Array.isArray(container)) return container.some(v => pyEq(v, item));
  if (container instanceof Map) return container.has(item);
  return false;
}
function truthy(v) {
  if (v == null || v === false) return false;
  if (v === 0 || v === '') return false;
  if (Array.isArray(v)) return v.length > 0;
  if (v instanceof Map) return v.size > 0;
  return true;
}
function toIterable(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') return v.split('');
  if (v instanceof Map) return [...v.keys()];
  if (v && typeof v[Symbol.iterator] === 'function') return [...v];
  throw new PyError(`'${pyTypeName(v)}' object is not iterable`);
}
function pyTypeName(v) {
  if (v == null) return 'NoneType';
  if (typeof v === 'number') return Number.isInteger(v) ? 'int' : 'float';
  if (typeof v === 'string') return 'str';
  if (typeof v === 'boolean') return 'bool';
  if (Array.isArray(v)) return 'list';
  return 'object';
}
function pyStr(v) {
  if (v === null || v === undefined) return 'None';
  if (v === true) return 'True';
  if (v === false) return 'False';
  if (typeof v === 'number') {
    if (Number.isInteger(v)) return String(v);
    return String(v);
  }
  if (Array.isArray(v)) return '[' + v.map(pyRepr).join(', ') + ']';
  if (v instanceof Map) return '{' + [...v.entries()].map(([k, val]) => `${pyRepr(k)}: ${pyRepr(val)}`).join(', ') + '}';
  if (typeof v === 'string') return v;
  return String(v);
}
function pyRepr(v) { return typeof v === 'string' ? `'${v}'` : pyStr(v); }

// printf-style %  (basic)
function pyFormat(fmt, args) {
  const list = Array.isArray(args) ? args : [args];
  let i = 0;
  return fmt.replace(/%[sdif%]/g, (m) => {
    if (m === '%%') return '%';
    const v = list[i++];
    if (m === '%d' || m === '%i') return String(Math.trunc(v));
    if (m === '%f') return Number(v).toFixed(6);
    return pyStr(v);
  });
}

// ─── str / list / dict methods ───────────────────────────────────────────────
const strMethods = {
  upper: (s) => s.toUpperCase(),
  lower: (s) => s.toLowerCase(),
  strip: (s, ch) => ch ? s.replace(new RegExp(`^[${ch}]+|[${ch}]+$`, 'g'), '') : s.trim(),
  lstrip: (s) => s.replace(/^\s+/, ''),
  rstrip: (s) => s.replace(/\s+$/, ''),
  split: (s, sep) => sep === undefined ? s.trim().split(/\s+/) : s.split(sep),
  replace: (s, a, b) => s.split(a).join(b),
  startswith: (s, p) => s.startsWith(p),
  endswith: (s, p) => s.endsWith(p),
  find: (s, p) => s.indexOf(p),
  count: (s, p) => p === '' ? s.length + 1 : s.split(p).length - 1,
  join: (s, arr) => arr.map(pyStr).join(s),
  format: (s, ...args) => { let i = 0; return s.replace(/\{\}/g, () => pyStr(args[i++])); },
  title: (s) => s.replace(/\w\S*/g, t => t[0].toUpperCase() + t.slice(1).toLowerCase()),
  capitalize: (s) => s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s,
  isdigit: (s) => /^[0-9]+$/.test(s),
  isalpha: (s) => /^[A-Za-z]+$/.test(s),
  zfill: (s, n) => s.padStart(n, '0'),
};
const listMethods = {
  append: (a, v) => { a.push(v); return null; },
  pop: (a, i) => i === undefined ? a.pop() : a.splice(i < 0 ? a.length + i : i, 1)[0],
  insert: (a, i, v) => { a.splice(i, 0, v); return null; },
  remove: (a, v) => { const idx = a.findIndex(x => pyEq(x, v)); if (idx >= 0) a.splice(idx, 1); return null; },
  index: (a, v) => a.findIndex(x => pyEq(x, v)),
  count: (a, v) => a.filter(x => pyEq(x, v)).length,
  clear: (a) => { a.length = 0; return null; },
  reverse: (a) => { a.reverse(); return null; },
  sort: (a) => { a.sort((x, y) => (x > y ? 1 : x < y ? -1 : 0)); return null; },
  extend: (a, b) => { for (const v of toIterable(b)) a.push(v); return null; },
  copy: (a) => [...a],
};
const dictMethods = {
  get: (m, k, d) => m.has(k) ? m.get(k) : (d === undefined ? null : d),
  keys: (m) => [...m.keys()],
  values: (m) => [...m.values()],
  items: (m) => [...m.entries()].map(([k, v]) => [k, v]),
  pop: (m, k, d) => { if (m.has(k)) { const v = m.get(k); m.delete(k); return v; } return d; },
  update: (m, o) => { if (o instanceof Map) for (const [k, v] of o) m.set(k, v); return null; },
};

// ─── Public entry point ──────────────────────────────────────────────────────
async function run(source, opts) {
  const interp = new Interpreter(opts);
  try {
    await interp.run(source);
  } catch (e) {
    if (e instanceof StopSignal) return { stopped: true };
    if (e instanceof PyError) throw e;
    if (e instanceof ReturnSignal) return {}; // top-level return — ignore
    throw new PyError(e.message);
  }
  return {};
}

const SpikePython = { run, tokenise, parse, PyError, pyStr, makeRange };

if (typeof module !== 'undefined' && module.exports) module.exports = SpikePython;
global.SpikePython = SpikePython;

})(typeof globalThis !== 'undefined' ? globalThis : this);
