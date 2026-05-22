// ═══════════════════════════════════════════════════════════════════════════
// Code Conjurer — Java Interpreter (IEB/CAPS Gr 10-12 subset)
// Recursive-descent parser → AST → tree-walking interpreter
// ═══════════════════════════════════════════════════════════════════════════

// ─── TOKENISER ───────────────────────────────────────────────────────────────
const TT = {
  NUM:'NUM', STR:'STR', CHAR:'CHAR', BOOL:'BOOL', NULL:'NULL', IDENT:'IDENT',
  PLUS:'+', MINUS:'-', STAR:'*', SLASH:'/', PERCENT:'%',
  EQ:'=', PLUSEQ:'+=', MINUSEQ:'-=', STAREQ:'*=', SLASHEQ:'/=', PERCENTEQ:'%=',
  EQEQ:'==', NEQ:'!=', LT:'<', GT:'>', LTE:'<=', GTE:'>=',
  AND:'&&', OR:'||', NOT:'!',
  PLUSPLUS:'++', MINUSMINUS:'--',
  LPAREN:'(', RPAREN:')', LBRACE:'{', RBRACE:'}', LBRACKET:'[', RBRACKET:']',
  SEMI:';', COMMA:',', DOT:'.', COLON:':', QUESTION:'?',
  KW:'KW', EOF:'EOF'
};

const KEYWORDS = new Set([
  'int','double','long','float','boolean','char','String','void',
  'if','else','for','while','do','switch','case','break','continue','return','default',
  'new','this','null','true','false',
  'class','public','private','protected','static','final',
  'try','catch','finally','throw','throws',
  'import','package','instanceof'
]);

function tokenise(src) {
  // Normalise common Unicode math operators to ASCII equivalents
  // These can appear when code is copied from lesson explanations or docs
  src = src
    .replace(/≤/g, '<=')   // ≤ → <=
    .replace(/≥/g, '>=')   // ≥ → >=
    .replace(/≠/g, '!=')   // ≠ → !=
    .replace(/−/g, '-')    // − → -
    .replace(/×/g, '*')    // × → *
    .replace(/÷/g, '/')    // ÷ → /
    .replace(/–/g, '-')    // – → -
    .replace(/—/g, '-');   // — → -
  const tokens = [];
  let i = 0, line = 1;
  while (i < src.length) {
    // whitespace
    if (/\s/.test(src[i])) { if (src[i] === '\n') line++; i++; continue; }
    // block comment
    if (src[i] === '/' && src[i+1] === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i+1] === '/')) {
        if (src[i] === '\n') line++;
        i++;
      }
      i += 2; continue;
    }
    // line comment
    if (src[i] === '/' && src[i+1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    // string literal
    if (src[i] === '"') {
      let s = ''; i++;
      while (i < src.length && src[i] !== '"') {
        if (src[i] === '\\') { i++;
          const esc = {n:'\n',t:'\t',r:'\r','"':'"','\\':'\\','0':'\0'};
          s += esc[src[i]] || src[i];
        } else s += src[i];
        i++;
      }
      i++; tokens.push({ type: TT.STR, val: s, line }); continue;
    }
    // char literal
    if (src[i] === "'") {
      i++;
      let c = src[i]; i++;
      if (c === '\\') { const esc = {n:'\n',t:'\t',r:'\r',"'":'\'','\\':'\\'}; c = esc[src[i]] || src[i]; i++; }
      i++; // closing '
      tokens.push({ type: TT.CHAR, val: c, line }); continue;
    }
    // number
    if (/\d/.test(src[i]) || (src[i] === '.' && /\d/.test(src[i+1]))) {
      let n = '';
      while (i < src.length && /[\d.]/.test(src[i])) n += src[i++];
      if (src[i] === 'L' || src[i] === 'l' || src[i] === 'f' || src[i] === 'F' || src[i] === 'd' || src[i] === 'D') i++;
      tokens.push({ type: TT.NUM, val: n.includes('.') ? parseFloat(n) : parseInt(n, 10), line }); continue;
    }
    // identifier / keyword
    if (/[A-Za-z_$]/.test(src[i])) {
      let id = '';
      while (i < src.length && /[\w$]/.test(src[i])) id += src[i++];
      const type = KEYWORDS.has(id) ? TT.KW : TT.IDENT;
      let val = id;
      if (id === 'true') { tokens.push({ type: TT.BOOL, val: true, line }); continue; }
      if (id === 'false') { tokens.push({ type: TT.BOOL, val: false, line }); continue; }
      if (id === 'null') { tokens.push({ type: TT.NULL, val: null, line }); continue; }
      tokens.push({ type, val: id, line }); continue;
    }
    // two/three char operators
    const two = src.slice(i, i+2);
    const threeCharOps = {};
    const twoCharOps = {'++':TT.PLUSPLUS,'--':TT.MINUSMINUS,'+=':TT.PLUSEQ,'-=':TT.MINUSEQ,
      '*=':TT.STAREQ,'/=':TT.SLASHEQ,'%=':TT.PERCENTEQ,'==':TT.EQEQ,'!=':TT.NEQ,
      '<=':TT.LTE,'>=':TT.GTE,'&&':TT.AND,'||':TT.OR};
    if (twoCharOps[two]) { tokens.push({ type: twoCharOps[two], val: two, line }); i += 2; continue; }
    // single char
    const oneCharOps = {'+':TT.PLUS,'-':TT.MINUS,'*':TT.STAR,'/':TT.SLASH,'%':TT.PERCENT,
      '=':TT.EQ,'<':TT.LT,'>':TT.GT,'!':TT.NOT,'(':TT.LPAREN,')':TT.RPAREN,
      '{':TT.LBRACE,'}':TT.RBRACE,'[':TT.LBRACKET,']':TT.RBRACKET,
      ';':TT.SEMI,',':TT.COMMA,'.':TT.DOT,':':TT.COLON,'?':TT.QUESTION};
    if (oneCharOps[src[i]]) { tokens.push({ type: oneCharOps[src[i]], val: src[i], line }); i++; continue; }
    throw { message: `Unknown character '${src[i]}'`, line };
  }
  tokens.push({ type: TT.EOF, line });
  return tokens;
}

// ─── PARSER ──────────────────────────────────────────────────────────────────
function parse(tokens) {
  let pos = 0;
  const peek   = (off=0) => tokens[pos + off];
  const check  = (t, v) => peek().type === t && (v === undefined || peek().val === v);
  const at     = (t, v) => { const ok = check(t,v); if (ok) pos++; return ok; };
  const expect = (t, v) => {
    if (!check(t,v)) throw { message: `Expected ${v||t} but got '${peek().val}'`, line: peek().line };
    return tokens[pos++];
  };

  // type names
  const isType = () => {
    const v = peek().val;
    return (peek().type === TT.KW && ['int','double','long','float','boolean','char','void','String'].includes(v))
        || (peek().type === TT.IDENT);
  };
  // look-ahead: is this a var declaration?
  const isVarDecl = () => {
    if (!isType()) return false;
    let j = 1;
    // skip array brackets []
    while (peek(j).type === TT.LBRACKET && peek(j+1).type === TT.RBRACKET) j += 2;
    return peek(j).type === TT.IDENT;
  };

  function parseType() {
    const base = tokens[pos++].val;
    let arr = 0;
    while (check(TT.LBRACKET) && peek(1).type === TT.RBRACKET) { pos += 2; arr++; }
    return arr ? { base, arr } : base;
  }

  // ── Statements ──────────────────────────────────────────────────────────
  function parseBlock() {
    expect(TT.LBRACE);
    const stmts = [];
    while (!check(TT.RBRACE) && !check(TT.EOF)) stmts.push(parseStatement());
    expect(TT.RBRACE);
    return { kind: 'Block', stmts };
  }

  function parseStatement() {
    const t = peek();
    // labelled / case / default handled in switch
    if (t.type === TT.LBRACE) return parseBlock();
    if (t.type === TT.KW) {
      if (t.val === 'if')       return parseIf();
      if (t.val === 'for')      return parseFor();
      if (t.val === 'while')    return parseWhile();
      if (t.val === 'do')       return parseDo();
      if (t.val === 'return')   return parseReturn();
      if (t.val === 'break')    { pos++; expect(TT.SEMI); return { kind: 'Break' }; }
      if (t.val === 'continue') { pos++; expect(TT.SEMI); return { kind: 'Continue' }; }
      if (t.val === 'switch')   return parseSwitch();
      if (t.val === 'try')      return parseTry();
      if (t.val === 'throw')    return parseThrow();
    }
    // variable declaration
    if (isVarDecl()) return parseVarDecl();
    // expression statement
    const expr = parseExpr();
    expect(TT.SEMI);
    return { kind: 'ExprStmt', expr };
  }

  function parseIf() {
    expect(TT.KW, 'if'); expect(TT.LPAREN);
    const cond = parseExpr();
    expect(TT.RPAREN);
    const then = parseStatement();
    let els = null;
    if (at(TT.KW, 'else')) els = parseStatement();
    return { kind: 'If', cond, then, els };
  }

  function parseFor() {
    expect(TT.KW, 'for'); expect(TT.LPAREN);
    // enhanced for: for(Type var : array)
    let saved = pos;
    try {
      if (isVarDecl()) {
        const type = parseType();
        const name = expect(TT.IDENT).val;
        if (at(TT.COLON)) {
          const iter = parseExpr();
          expect(TT.RPAREN);
          const body = parseStatement();
          return { kind: 'ForEach', type, name, iter, body };
        }
        pos = saved;
      }
    } catch(e) { pos = saved; }

    // standard for
    let init = null;
    if (!check(TT.SEMI)) {
      if (isVarDecl()) init = parseVarDecl(true);
      else { init = parseExpr(); expect(TT.SEMI); }
    } else expect(TT.SEMI);
    const cond = check(TT.SEMI) ? null : parseExpr();
    expect(TT.SEMI);
    const update = check(TT.RPAREN) ? null : parseExpr();
    expect(TT.RPAREN);
    const body = parseStatement();
    return { kind: 'For', init, cond, update, body };
  }

  function parseWhile() {
    expect(TT.KW, 'while'); expect(TT.LPAREN);
    const cond = parseExpr(); expect(TT.RPAREN);
    const body = parseStatement();
    return { kind: 'While', cond, body };
  }

  function parseDo() {
    expect(TT.KW, 'do');
    const body = parseStatement();
    expect(TT.KW, 'while'); expect(TT.LPAREN);
    const cond = parseExpr(); expect(TT.RPAREN); expect(TT.SEMI);
    return { kind: 'DoWhile', cond, body };
  }

  function parseReturn() {
    expect(TT.KW, 'return');
    const val = check(TT.SEMI) ? null : parseExpr();
    expect(TT.SEMI);
    return { kind: 'Return', val };
  }

  function parseSwitch() {
    expect(TT.KW, 'switch'); expect(TT.LPAREN);
    const expr = parseExpr(); expect(TT.RPAREN); expect(TT.LBRACE);
    const cases = [];
    while (!check(TT.RBRACE)) {
      if (at(TT.KW, 'case')) {
        const val = parseExpr(); expect(TT.COLON);
        const stmts = [];
        while (!check(TT.KW, 'case') && !check(TT.KW, 'default') && !check(TT.RBRACE))
          stmts.push(parseStatement());
        cases.push({ val, stmts });
      } else if (at(TT.KW, 'default')) {
        expect(TT.COLON);
        const stmts = [];
        while (!check(TT.KW, 'case') && !check(TT.RBRACE))
          stmts.push(parseStatement());
        cases.push({ val: null, stmts, isDefault: true });
      } else break;
    }
    expect(TT.RBRACE);
    return { kind: 'Switch', expr, cases };
  }

  function parseTry() {
    expect(TT.KW, 'try');
    const body = parseBlock();
    const catches = [];
    while (check(TT.KW, 'catch')) {
      pos++;
      expect(TT.LPAREN);
      const exType = tokens[pos++].val;
      const exName = expect(TT.IDENT).val;
      expect(TT.RPAREN);
      const catchBody = parseBlock();
      catches.push({ exType, exName, body: catchBody });
    }
    let fin = null;
    if (at(TT.KW, 'finally')) fin = parseBlock();
    return { kind: 'Try', body, catches, fin };
  }

  function parseThrow() {
    expect(TT.KW, 'throw');
    const expr = parseExpr(); expect(TT.SEMI);
    return { kind: 'Throw', expr };
  }

  function parseVarDecl(noSemi=false) {
    const type = parseType();
    const decls = [];
    do {
      const name = expect(TT.IDENT).val;
      // array dimension after name: int arr[] (alternative syntax)
      let arrExtra = 0;
      while (check(TT.LBRACKET) && peek(1).type === TT.RBRACKET) { pos += 2; arrExtra++; }
      let init = null;
      if (at(TT.EQ)) init = parseExpr();
      decls.push({ name, init, arrExtra });
    } while (at(TT.COMMA));
    if (!noSemi) expect(TT.SEMI);
    return { kind: 'VarDecl', type, decls };
  }

  // ── Expressions (precedence climbing) ────────────────────────────────────
  function parseExpr()   { return parseTernary(); }
  function parseTernary() {
    let e = parseAssign();
    if (at(TT.QUESTION)) {
      const then = parseExpr(); expect(TT.COLON); const els = parseExpr();
      return { kind: 'Ternary', cond: e, then, els };
    }
    return e;
  }
  function parseAssign() {
    const e = parseOr();
    const ops = [TT.EQ, TT.PLUSEQ, TT.MINUSEQ, TT.STAREQ, TT.SLASHEQ, TT.PERCENTEQ];
    if (ops.includes(peek().type)) { const op = tokens[pos++].type; const r = parseAssign(); return { kind: 'Assign', op, left: e, right: r }; }
    return e;
  }
  function parseOr()  { let e = parseAnd(); while (at(TT.OR))  e = { kind:'BinOp', op:'||', left:e, right:parseAnd()  }; return e; }
  function parseAnd() { let e = parseEq();  while (at(TT.AND)) e = { kind:'BinOp', op:'&&', left:e, right:parseEq()  }; return e; }
  function parseEq()  {
    let e = parseRel();
    while (check(TT.EQEQ) || check(TT.NEQ)) { const op = tokens[pos++].type; e = { kind:'BinOp', op, left:e, right:parseRel() }; }
    return e;
  }
  function parseRel() {
    let e = parseAdd();
    while ([TT.LT,TT.GT,TT.LTE,TT.GTE].includes(peek().type)) {
      // Don't consume > if it's part of >> (shift — not in scope)
      const op = tokens[pos++].type;
      e = { kind:'BinOp', op, left:e, right:parseAdd() };
    }
    return e;
  }
  function parseAdd() {
    let e = parseMul();
    while (check(TT.PLUS) || check(TT.MINUS)) { const op = tokens[pos++].type; e = { kind:'BinOp', op, left:e, right:parseMul() }; }
    return e;
  }
  function parseMul() {
    let e = parseCast();
    while (check(TT.STAR) || check(TT.SLASH) || check(TT.PERCENT)) { const op = tokens[pos++].type; e = { kind:'BinOp', op, left:e, right:parseCast() }; }
    return e;
  }
  // explicit cast: (int) expr
  function parseCast() {
    if (check(TT.LPAREN)) {
      const castTypes = ['int','double','long','float','char','boolean','String'];
      if (castTypes.includes(peek(1).val) && peek(2).type === TT.RPAREN) {
        pos++; const type = tokens[pos++].val; pos++;
        return { kind:'Cast', type, expr: parseUnary() };
      }
    }
    return parseUnary();
  }
  function parseUnary() {
    if (at(TT.NOT))    return { kind:'Unary', op:'!',     expr: parseUnary() };
    if (at(TT.MINUS))  return { kind:'Unary', op:'-',     expr: parseUnary() };
    if (at(TT.PLUSPLUS))   return { kind:'PreInc', op:'++', expr: parsePostfix() };
    if (at(TT.MINUSMINUS)) return { kind:'PreInc', op:'--', expr: parsePostfix() };
    return parsePostfix();
  }
  function parsePostfix() {
    let e = parsePrimary();
    while (true) {
      if (at(TT.DOT)) {
        const member = expect(TT.IDENT).val;
        if (check(TT.LPAREN)) e = { kind:'MethodCall', obj:e, method:member, args:parseArgs() };
        else e = { kind:'Field', obj:e, field:member };
      } else if (check(TT.LBRACKET)) {
        pos++; const idx = parseExpr(); expect(TT.RBRACKET);
        e = { kind:'Index', obj:e, idx };
      } else if (at(TT.PLUSPLUS))   { e = { kind:'PostInc', op:'++', expr:e }; }
      else if (at(TT.MINUSMINUS))   { e = { kind:'PostInc', op:'--', expr:e }; }
      else break;
    }
    return e;
  }
  function parseArgs() {
    expect(TT.LPAREN); const args = [];
    if (!check(TT.RPAREN)) { do { args.push(parseExpr()); } while (at(TT.COMMA)); }
    expect(TT.RPAREN); return args;
  }
  function parsePrimary() {
    const t = peek();
    if (t.type === TT.NUM)  { pos++; return { kind:'Literal', val:t.val, jtype:'number' }; }
    if (t.type === TT.STR)  { pos++; return { kind:'Literal', val:t.val, jtype:'String' }; }
    if (t.type === TT.CHAR) { pos++; return { kind:'Literal', val:t.val, jtype:'char' }; }
    if (t.type === TT.BOOL) { pos++; return { kind:'Literal', val:t.val, jtype:'boolean' }; }
    if (t.type === TT.NULL) { pos++; return { kind:'Literal', val:null,  jtype:'null' }; }
    if (t.type === TT.LPAREN) {
      pos++; const e = parseExpr(); expect(TT.RPAREN);
      return { kind:'Paren', expr:e };
    }
    if (t.type === TT.KW && t.val === 'new') {
      pos++;
      const typeName = tokens[pos++].val;
      // array: new int[size] or new int[r][c]
      if (check(TT.LBRACKET)) {
        const dims = [];
        while (at(TT.LBRACKET)) {
          dims.push(check(TT.RBRACKET) ? null : parseExpr());
          expect(TT.RBRACKET);
          // optional extra [] for type signature only
        }
        // initialiser: new int[]{1,2,3}
        let init = null;
        if (check(TT.LBRACE)) { pos++; init = []; if (!check(TT.RBRACE)) do init.push(parseExpr()); while (at(TT.COMMA)); expect(TT.RBRACE); }
        return { kind:'NewArray', typeName, dims, init };
      }
      // object: new ClassName(args)
      const args = parseArgs();
      return { kind:'NewObj', typeName, args };
    }
    if (t.type === TT.KW && t.val === 'this') { pos++; return { kind:'This' }; }
    if (t.type === TT.IDENT) {
      pos++;
      if (check(TT.LPAREN)) return { kind:'Call', name:t.val, args:parseArgs() };
      return { kind:'Var', name:t.val };
    }
    // Static class refs: System.out.println etc handled via IDENT chain
    if (t.type === TT.KW && ['int','double','String','boolean','char','long'].includes(t.val)) {
      // Could be a class method call like Integer.parseInt — parse as Var
      pos++; return { kind:'Var', name:t.val };
    }
    throw { message:`Unexpected token '${t.val}'`, line: t.line };
  }

  // ── Top-level: class definition ──────────────────────────────────────────
  function parseClass() {
    // skip modifiers
    while (check(TT.KW) && ['public','private','protected','final'].includes(peek().val)) pos++;
    expect(TT.KW, 'class');
    const name = tokens[pos++].val;
    // skip extends/implements
    while (!check(TT.LBRACE)) pos++;
    expect(TT.LBRACE);
    const fields = [], methods = [], constructors = [];
    while (!check(TT.RBRACE) && !check(TT.EOF)) {
      // skip modifiers
      const mods = [];
      while (check(TT.KW) && ['public','private','protected','static','final'].includes(peek().val))
        mods.push(tokens[pos++].val);
      // constructor: ClassName(
      if (peek().type === TT.IDENT && peek().val === name && peek(1).type === TT.LPAREN) {
        pos++; // name
        const params = parseParams();
        const body = parseBlock();
        constructors.push({ params, body, mods });
        continue;
      }
      // method or field
      if (isType()) {
        const type = parseType();
        const mname = tokens[pos++].val;
        if (check(TT.LPAREN)) {
          const params = parseParams();
          if (check(TT.LBRACE)) {
            const body = parseBlock();
            methods.push({ name: mname, type, params, body, mods });
          } else {
            expect(TT.SEMI); // abstract — ignore
          }
          continue;
        }
        // field
        const decls = [{ name: mname, init: at(TT.EQ) ? parseExpr() : null }];
        while (at(TT.COMMA)) decls.push({ name: tokens[pos++].val, init: at(TT.EQ) ? parseExpr() : null });
        expect(TT.SEMI);
        fields.push({ type, decls, mods });
        continue;
      }
      pos++; // skip unknown
    }
    expect(TT.RBRACE);
    return { name, fields, methods, constructors };
  }

  function parseParams() {
    expect(TT.LPAREN); const params = [];
    if (!check(TT.RPAREN)) {
      do {
        const type = parseType(); const name = expect(TT.IDENT).val;
        params.push({ type, name });
      } while (at(TT.COMMA));
    }
    expect(TT.RPAREN); return params;
  }

  // ── Parse entire file ────────────────────────────────────────────────────
  // skip package/import
  while (check(TT.KW) && (peek().val === 'package' || peek().val === 'import')) {
    while (!check(TT.SEMI)) pos++;
    pos++;
  }
  const classes = [];
  while (!check(TT.EOF)) {
    classes.push(parseClass());
  }
  return classes;
}

// ─── INTERPRETER ─────────────────────────────────────────────────────────────
class JavaInterpreter {
  constructor(outputFn, inputFn) {
    this.output = outputFn;   // (str) => void
    this.inputFn = inputFn;   // (prompt) => Promise<string>
    this.classes = {};        // class name → AST node
    this.stepCount = 0;
    this.maxSteps = 100000;
  }

  async run(src) {
    const tokens = tokenise(src);
    const classes = parse(tokens);
    for (const cls of classes) this.classes[cls.name] = cls;
    // find main
    const mainClass = classes[0];
    if (!mainClass) throw { message: 'No class found.' };
    const mainMethod = mainClass.methods.find(m => m.name === 'main' && m.mods.includes('static'));
    if (!mainMethod) throw { message: 'No public static void main(String[] args) found.' };
    const env = new Env(null);
    env.set('args', []);
    await this.execBlock(mainMethod.body, env, mainClass.name);
  }

  step() { if (++this.stepCount > this.maxSteps) throw { message: `Infinite loop? Exceeded ${this.maxSteps} steps.` }; }

  async execBlock(block, env, className) {
    for (const stmt of block.stmts) {
      const r = await this.execStmt(stmt, env, className);
      if (r !== undefined) return r;
    }
  }

  async execStmt(node, env, className) {
    this.step();
    switch (node.kind) {
      case 'Block':    return this.execBlock(node, env, className);
      case 'VarDecl':  return this.execVarDecl(node, env, className);
      case 'ExprStmt': await this.evalExpr(node.expr, env, className); return;
      case 'If':       return this.execIf(node, env, className);
      case 'For':      return this.execFor(node, env, className);
      case 'ForEach':  return this.execForEach(node, env, className);
      case 'While':    return this.execWhile(node, env, className);
      case 'DoWhile':  return this.execDoWhile(node, env, className);
      case 'Return':   return { ret: node.val ? await this.evalExpr(node.val, env, className) : undefined };
      case 'Break':    return { brk: true };
      case 'Continue': return { cont: true };
      case 'Switch':   return this.execSwitch(node, env, className);
      case 'Try':      return this.execTry(node, env, className);
      case 'Throw':    { const v = await this.evalExpr(node.expr, env, className); throw { message: String(v?._str?.() ?? v), isJava: true }; }
    }
  }

  async execVarDecl(node, env, className) {
    for (const d of node.decls) {
      const val = d.init ? await this.evalExpr(d.init, env, className) : this.defaultVal(node.type);
      env.set(d.name, val);
    }
  }

  defaultVal(type) {
    const t = typeof type === 'object' ? type.base : type;
    if (t === 'int' || t === 'double' || t === 'long' || t === 'float') return 0;
    if (t === 'boolean') return false;
    if (t === 'char') return '\0';
    return null;
  }

  async execIf(node, env, className) {
    const cond = await this.evalExpr(node.cond, env, className);
    if (cond) return this.execStmt(node.then, new Env(env), className);
    if (node.els) return this.execStmt(node.els, new Env(env), className);
  }

  async execFor(node, env, className) {
    const scope = new Env(env);
    if (node.init) await this.execStmt(node.init, scope, className);
    while (true) {
      this.step();
      if (node.cond && !await this.evalExpr(node.cond, scope, className)) break;
      const r = await this.execStmt(node.body, new Env(scope), className);
      if (r?.brk) break;
      if (r?.ret) return r;
      if (node.update) await this.evalExpr(node.update, scope, className);
    }
  }

  async execForEach(node, env, className) {
    const iter = await this.evalExpr(node.iter, env, className);
    const arr = Array.isArray(iter) ? iter : (typeof iter === 'string' ? iter.split('') : []);
    for (const item of arr) {
      this.step();
      const scope = new Env(env);
      scope.set(node.name, item);
      const r = await this.execStmt(node.body, scope, className);
      if (r?.brk) break;
      if (r?.ret) return r;
    }
  }

  async execWhile(node, env, className) {
    while (await this.evalExpr(node.cond, env, className)) {
      this.step();
      const r = await this.execStmt(node.body, new Env(env), className);
      if (r?.brk) break;
      if (r?.ret) return r;
    }
  }

  async execDoWhile(node, env, className) {
    do {
      this.step();
      const r = await this.execStmt(node.body, new Env(env), className);
      if (r?.brk) break;
      if (r?.ret) return r;
    } while (await this.evalExpr(node.cond, env, className));
  }

  async execSwitch(node, env, className) {
    const val = await this.evalExpr(node.expr, env, className);
    let falling = false;
    for (const c of node.cases) {
      if (falling || c.isDefault || (await this.evalExpr(c.val, env, className)) === val) {
        falling = true;
        for (const stmt of c.stmts) {
          const r = await this.execStmt(stmt, env, className);
          if (r?.brk) return;
          if (r?.ret) return r;
        }
      }
    }
  }

  async execTry(node, env, className) {
    try {
      const r = await this.execBlock(node.body, new Env(env), className);
      if (r) return r;
    } catch(e) {
      let caught = false;
      for (const c of node.catches) {
        const scope = new Env(env);
        scope.set(c.exName, e.message || String(e));
        const r = await this.execBlock(c.body, scope, className);
        caught = true;
        if (r) return r;
        break;
      }
      if (!caught && !node.fin) throw e;
    } finally {
      if (node.fin) await this.execBlock(node.fin, new Env(env), className);
    }
  }

  // ── Expression evaluator ─────────────────────────────────────────────────
  async evalExpr(node, env, className) {
    this.step();
    switch (node.kind) {
      case 'Literal': return node.val;
      case 'Paren':   return this.evalExpr(node.expr, env, className);
      case 'Var':     return env.get(node.name) ?? this.staticGet(node.name, className);
      case 'This':    return env.get('this');

      case 'BinOp':   return this.evalBinOp(node, env, className);
      case 'Unary':   return this.evalUnary(node, env, className);
      case 'Cast':    return this.evalCast(node, env, className);
      case 'Ternary': {
        const c = await this.evalExpr(node.cond, env, className);
        return c ? this.evalExpr(node.then, env, className) : this.evalExpr(node.els, env, className);
      }

      case 'Assign':  return this.evalAssign(node, env, className);
      case 'PreInc':  return this.evalPreInc(node, env, className);
      case 'PostInc': return this.evalPostInc(node, env, className);

      case 'Field':   return this.evalField(node, env, className);
      case 'Index':   return this.evalIndex(node, env, className);
      case 'MethodCall': return this.evalMethodCall(node, env, className);
      case 'Call':    return this.evalCall(node.name, node.args, env, className);
      case 'NewArray': return this.evalNewArray(node, env, className);
      case 'NewObj':  return this.evalNewObj(node, env, className);
    }
    throw { message: `Unknown AST node: ${node.kind}` };
  }

  async evalBinOp(node, env, className) {
    // short-circuit
    if (node.op === '&&') { return (await this.evalExpr(node.left,env,className)) && (await this.evalExpr(node.right,env,className)); }
    if (node.op === '||') { return (await this.evalExpr(node.left,env,className)) || (await this.evalExpr(node.right,env,className)); }
    const l = await this.evalExpr(node.left, env, className);
    const r = await this.evalExpr(node.right, env, className);
    switch (node.op) {
      case TT.PLUS:  return (typeof l === 'string' || typeof r === 'string') ? String(this.jStr(l)) + String(this.jStr(r)) : l + r;
      case TT.MINUS: return l - r;
      case TT.STAR:  return l * r;
      case TT.SLASH: { if (r === 0) throw { message: 'ArithmeticException: / by zero' }; return Number.isInteger(l) && Number.isInteger(r) ? Math.trunc(l/r) : l/r; }
      case TT.PERCENT: return l % r;
      case TT.EQEQ: return l === r;
      case TT.NEQ:  return l !== r;
      case TT.LT:   return l < r;
      case TT.GT:   return l > r;
      case TT.LTE:  return l <= r;
      case TT.GTE:  return l >= r;
    }
  }

  async evalUnary(node, env, className) {
    const v = await this.evalExpr(node.expr, env, className);
    if (node.op === '!') return !v;
    if (node.op === '-') return -v;
  }

  async evalCast(node, env, className) {
    const v = await this.evalExpr(node.expr, env, className);
    if (node.type === 'int' || node.type === 'long') return Math.trunc(Number(v));
    if (node.type === 'double' || node.type === 'float') return Number(v);
    if (node.type === 'char') return typeof v === 'number' ? String.fromCharCode(v) : String(v)[0] || '';
    if (node.type === 'String') return this.jStr(v);
    if (node.type === 'boolean') return Boolean(v);
    return v;
  }

  async evalAssign(node, env, className) {
    const rval = await this.evalExpr(node.right, env, className);
    // compound
    let val = rval;
    if (node.op !== TT.EQ) {
      const lval = await this.evalExpr(node.left, env, className);
      if (node.op === TT.PLUSEQ) val = (typeof lval === 'string' || typeof rval === 'string') ? this.jStr(lval)+this.jStr(rval) : lval+rval;
      else if (node.op === TT.MINUSEQ) val = lval - rval;
      else if (node.op === TT.STAREQ)  val = lval * rval;
      else if (node.op === TT.SLASHEQ) val = Number.isInteger(lval)&&Number.isInteger(rval)?Math.trunc(lval/rval):lval/rval;
      else if (node.op === TT.PERCENTEQ) val = lval % rval;
    }
    this.setLValue(node.left, val, env, className);
    return val;
  }

  async setLValue(node, val, env, className) {
    if (node.kind === 'Var') { env.set(node.name, val); return; }
    if (node.kind === 'Index') {
      const arr = await this.evalExpr(node.obj, env, className);
      const idx = await this.evalExpr(node.idx, env, className);
      if (Array.isArray(arr[idx])) arr[idx] = val; // 2D
      else arr[idx] = val;
      return;
    }
    if (node.kind === 'Field') {
      const obj = await this.evalExpr(node.obj, env, className);
      if (obj && typeof obj === 'object') obj._fields[node.field] = val;
      return;
    }
  }

  async evalPreInc(node, env, className) {
    let v = await this.evalExpr(node.expr, env, className);
    v = node.op === '++' ? v+1 : v-1;
    this.setLValue(node.expr, v, env, className);
    return v;
  }

  async evalPostInc(node, env, className) {
    const v = await this.evalExpr(node.expr, env, className);
    this.setLValue(node.expr, node.op === '++' ? v+1 : v-1, env, className);
    return v;
  }

  async evalField(node, env, className) {
    const obj = await this.evalExpr(node.obj, env, className);
    // array.length
    if (Array.isArray(obj) && node.field === 'length') return obj.length;
    if (typeof obj === 'string' && node.field === 'length') return obj.length;  // shouldn't happen — use method
    // Java object field
    if (obj && typeof obj === 'object' && obj._fields) return obj._fields[node.field];
    // static: System.out → pseudo-object
    if (obj === 'System' && node.field === 'out') return '__sysout__';
    if (obj === '__sysout__') return '__sysout__'; // System.out.println chain
    return null;
  }

  async evalIndex(node, env, className) {
    const obj = await this.evalExpr(node.obj, env, className);
    const idx = await this.evalExpr(node.idx, env, className);
    if (typeof obj === 'string') return obj[idx];
    return obj?.[idx];
  }

  async evalMethodCall(node, env, className) {
    const obj = await this.evalExpr(node.obj, env, className);
    const args = [];
    for (const a of node.args) args.push(await this.evalExpr(a, env, className));
    // System.out.print / println / printf
    if (obj === '__sysout__') {
      if (node.method === 'println') { this.output(args.length ? this.jStr(args[0]) : ''); return; }
      if (node.method === 'print')   { this.output(this.jStr(args[0] ?? ''), false); return; }
      if (node.method === 'printf')  { this.output(this.printf(args)); return false; }
      return;
    }
    // String methods
    if (typeof obj === 'string') return this.stringMethod(obj, node.method, args);
    // array — no methods except via Arrays class
    // Java object method
    if (obj?._class) return this.callMethod(obj._class, node.method, args, obj, className);
    // Scanner
    if (obj?._scanner) return this.scannerMethod(obj, node.method);
    return null;
  }

  async evalCall(name, argNodes, env, className) {
    const args = [];
    for (const a of argNodes) args.push(await this.evalExpr(a, env, className));
    // static method in same class
    return this.callStaticMethod(name, args, env, className);
  }

  async callStaticMethod(name, args, env, className) {
    // Built-in static methods
    // Math.*
    if (name === 'Math') return 'Math'; // shouldn't reach
    // Integer / Double
    if (name === 'Integer') return 'Integer';
    if (name === 'Double')  return 'Double';
    if (name === 'Character') return 'Character';
    if (name === 'String') return 'String';

    // user-defined static method in current class
    const cls = this.classes[className];
    if (cls) {
      const method = cls.methods.find(m => m.name === name && m.mods.includes('static'));
      if (method) {
        const scope = new Env(null);
        method.params.forEach((p,i) => scope.set(p.name, args[i] ?? this.defaultVal(p.type)));
        const r = await this.execBlock(method.body, scope, className);
        return r?.ret;
      }
    }
    throw { message: `Unknown method: ${name}` };
  }

  async callMethod(className, methodName, args, thisObj, callerClass) {
    const cls = this.classes[className];
    if (!cls) throw { message: `Unknown class: ${className}` };
    const method = cls.methods.find(m => m.name === methodName);
    if (!method) throw { message: `${className} has no method ${methodName}` };
    const scope = new Env(null);
    scope.set('this', thisObj);
    method.params.forEach((p,i) => scope.set(p.name, args[i] ?? this.defaultVal(p.type)));
    // copy fields into scope for 'this' access
    const r = await this.execBlock(method.body, scope, className);
    return r?.ret;
  }

  async evalNewArray(node, env, className) {
    const dims = [];
    for (const d of node.dims) dims.push(d ? await this.evalExpr(d, env, className) : 0);
    if (node.init) {
      const arr = [];
      for (const item of node.init) arr.push(await this.evalExpr(item, env, className));
      return arr;
    }
    if (dims.length === 1) return new Array(dims[0]).fill(this.defaultVal(node.typeName));
    if (dims.length === 2) return Array.from({ length: dims[0] }, () => new Array(dims[1]).fill(this.defaultVal(node.typeName)));
    return [];
  }

  async evalNewObj(node, env, className) {
    const cls = this.classes[node.typeName];
    // Scanner
    if (node.typeName === 'Scanner') return { _scanner: true, _buffer: [] };
    // Random
    if (node.typeName === 'Random') return { _random: true };
    if (!cls) throw { message: `Unknown class: ${node.typeName}` };
    // create object with default fields
    const obj = { _class: node.typeName, _fields: {} };
    for (const f of cls.fields) {
      for (const d of f.decls) obj._fields[d.name] = this.defaultVal(f.type);
    }
    // find matching constructor
    const ctor = cls.constructors.find(c => c.params.length === node.args.length) || cls.constructors[0];
    if (ctor) {
      const args = [];
      for (const a of node.args) args.push(await this.evalExpr(a, env, className));
      const scope = new Env(null);
      scope.set('this', obj);
      ctor.params.forEach((p,i) => scope.set(p.name, args[i] ?? this.defaultVal(p.type)));
      await this.execBlock(ctor.body, scope, node.typeName);
      // write back fields
      for (const key of Object.keys(obj._fields)) {
        if (scope.has(key)) obj._fields[key] = scope.get(key);
      }
    }
    // make field access proxy
    return new Proxy(obj, {
      get(target, prop) {
        if (prop.startsWith('_')) return target[prop];
        if (prop in target) return target[prop];
        return target._fields[prop];
      },
      set(target, prop, val) {
        if (prop.startsWith('_')) { target[prop] = val; return true; }
        target._fields[prop] = val; return true;
      }
    });
  }

  staticGet(name, className) {
    if (name === 'System')    return 'System';
    if (name === 'Math')      return 'Math';
    if (name === 'Integer')   return 'Integer';
    if (name === 'Double')    return 'Double';
    if (name === 'Character') return 'Character';
    if (name === 'String')    return 'String';
    return undefined;
  }

  // ── Built-in method dispatch ─────────────────────────────────────────────
  async evalMethodCallOnStatic(className, methodName, args, env, callerClass) {
    // Already handled in evalMethodCall via obj chain
  }

  stringMethod(str, method, args) {
    switch(method) {
      case 'length':       return str.length;
      case 'charAt':       return str[args[0]] || '';
      case 'substring':    return args.length === 1 ? str.slice(args[0]) : str.slice(args[0], args[1]);
      case 'indexOf':      return str.indexOf(args[0], args[1]);
      case 'lastIndexOf':  return str.lastIndexOf(args[0]);
      case 'toUpperCase':  return str.toUpperCase();
      case 'toLowerCase':  return str.toLowerCase();
      case 'trim':         return str.trim();
      case 'replace':      return str.replaceAll(String(args[0]), String(args[1]));
      case 'contains':     return str.includes(String(args[0]));
      case 'startsWith':   return str.startsWith(String(args[0]));
      case 'endsWith':     return str.endsWith(String(args[0]));
      case 'equals':       return str === String(args[0]);
      case 'equalsIgnoreCase': return str.toLowerCase() === String(args[0]).toLowerCase();
      case 'split':        return str.split(new RegExp(String(args[0])));
      case 'toCharArray':  return str.split('');
      case 'isEmpty':      return str.length === 0;
      case 'compareTo':    return str < args[0] ? -1 : str > args[0] ? 1 : 0;
      case 'concat':       return str + String(args[0]);
      case 'valueOf':      return this.jStr(args[0]);
      default: return null;
    }
  }

  async scannerMethod(sc, method) {
    if (['nextLine','next','nextInt','nextDouble'].includes(method)) {
      const raw = await this.inputFn('Input:');
      if (method === 'nextInt')    return parseInt(raw, 10) || 0;
      if (method === 'nextDouble') return parseFloat(raw) || 0;
      return String(raw);
    }
    return null;
  }

  // Math, Integer, Double, Character — dispatched via evalMethodCall on pseudo-objects
  // We handle them when obj === 'Math' etc via Field + MethodCall chain
  // Actually we handle them in evalMethodCall when obj is a string like 'Math'

  printf(args) {
    if (!args.length) return '';
    let fmt = String(args[0]); let i = 1;
    return fmt.replace(/%(-?\d*\.?\d*)?([dfsoxXeE%n])/g, (m, flags, spec) => {
      if (spec === '%') return '%';
      if (spec === 'n') return '\n';
      const v = args[i++];
      if (spec === 'd') return String(Math.trunc(Number(v)));
      if (spec === 'f') { const dec = flags?.includes('.') ? parseInt(flags.split('.')[1]) : 6; return Number(v).toFixed(dec); }
      if (spec === 's') return this.jStr(v);
      if (spec === 'x') return Math.trunc(Number(v)).toString(16);
      if (spec === 'X') return Math.trunc(Number(v)).toString(16).toUpperCase();
      return String(v);
    });
  }

  jStr(v) {
    if (v === null || v === undefined) return 'null';
    if (typeof v === 'boolean') return v ? 'true' : 'false';
    if (Array.isArray(v)) return '[' + v.map(x => this.jStr(x)).join(', ') + ']';
    if (v?._class) {
      // call toString if exists
      const cls = this.classes[v._class];
      const ts = cls?.methods.find(m => m.name === 'toString');
      if (ts) {
        // synchronous-ish toString — evaluate synchronously if possible
        return `${v._class}@obj`; // fallback
      }
      const fields = Object.entries(v._fields || {}).map(([k,fv]) => `${k}=${this.jStr(fv)}`).join(', ');
      return `${v._class}(${fields})`;
    }
    return String(v);
  }
}

// ── Additional method dispatch for Math/Integer/Double/Character chains ───────
// These arrive as MethodCall with obj evaluating to 'Math', 'Integer', etc.
// Patch evalMethodCall to handle string-named pseudo-objects:
const _origEvalMC = JavaInterpreter.prototype.evalMethodCall;
JavaInterpreter.prototype.evalMethodCall = async function(node, env, className) {
  const obj = await this.evalExpr(node.obj, env, className);
  const args = [];
  for (const a of node.args) args.push(await this.evalExpr(a, env, className));

  if (obj === 'Math') {
    switch(node.method) {
      case 'abs':    return Math.abs(args[0]);
      case 'pow':    return Math.pow(args[0], args[1]);
      case 'sqrt':   return Math.sqrt(args[0]);
      case 'floor':  return Math.floor(args[0]);
      case 'ceil':   return Math.ceil(args[0]);
      case 'round':  return Math.round(args[0]);
      case 'max':    return Math.max(args[0], args[1]);
      case 'min':    return Math.min(args[0], args[1]);
      case 'random': return Math.random();
      case 'log':    return Math.log(args[0]);
      case 'sin':    return Math.sin(args[0]);
      case 'cos':    return Math.cos(args[0]);
      case 'tan':    return Math.tan(args[0]);
      case 'PI':     return Math.PI;
    }
  }
  if (obj === 'Integer') {
    switch(node.method) {
      case 'parseInt':    return parseInt(String(args[0]), args[1] || 10) || 0;
      case 'toString':    return String(Math.trunc(Number(args[0])));
      case 'valueOf':     return Math.trunc(Number(args[0]));
      case 'MAX_VALUE':   return 2147483647;
      case 'MIN_VALUE':   return -2147483648;
      case 'toBinaryString': return Math.trunc(Number(args[0])).toString(2);
      case 'toHexString': return Math.trunc(Number(args[0])).toString(16);
    }
  }
  if (obj === 'Double') {
    switch(node.method) {
      case 'parseDouble': return parseFloat(String(args[0])) || 0;
      case 'toString':    return String(Number(args[0]));
      case 'valueOf':     return Number(args[0]);
      case 'isNaN':       return isNaN(args[0]);
    }
  }
  if (obj === 'Character') {
    switch(node.method) {
      case 'isLetter':     return /[a-zA-Z]/.test(String(args[0]));
      case 'isDigit':      return /[0-9]/.test(String(args[0]));
      case 'isUpperCase':  return /[A-Z]/.test(String(args[0]));
      case 'isLowerCase':  return /[a-z]/.test(String(args[0]));
      case 'toUpperCase':  return String(args[0]).toUpperCase();
      case 'toLowerCase':  return String(args[0]).toLowerCase();
      case 'isWhitespace': return /\s/.test(String(args[0]));
    }
  }
  if (obj === 'String') {
    if (node.method === 'valueOf') return this.jStr(args[0]);
    if (node.method === 'format') return this.printf(args);
  }
  if (obj?._random) {
    if (node.method === 'nextInt')    return Math.floor(Math.random() * (args[0] || 100));
    if (node.method === 'nextDouble') return Math.random();
  }
  // Field on Math (Math.PI, Math.E)
  if (obj === 'Math' && !node.args) {
    if (node.method === 'PI') return Math.PI;
    if (node.method === 'E')  return Math.E;
  }

  // delegate to original
  const orig_obj_ref = obj;
  if (obj === '__sysout__') {
    if (node.method === 'println') { this.output(args.length ? this.jStr(args[0]) : ''); return; }
    if (node.method === 'print')   { this.output(this.jStr(args[0] ?? ''), false); return; }
    if (node.method === 'printf')  { this.output(this.printf(args), false); return; }
    return;
  }
  if (typeof obj === 'string' && obj !== 'System' && obj !== 'Math' && obj !== 'Integer' && obj !== 'Double' && obj !== 'Character' && obj !== 'String') {
    return this.stringMethod(obj, node.method, args);
  }
  if (typeof obj === 'string') return null;
  if (Array.isArray(obj)) return null;
  if (obj?._class) return this.callMethod(obj._class, node.method, args, obj, className);
  if (obj?._scanner) return this.scannerMethod(obj, node.method);
  return null;
};

// ── Environment (scope chain) ─────────────────────────────────────────────────
class Env {
  constructor(parent) { this.parent = parent; this.vars = {}; }
  get(name) {
    if (name in this.vars) return this.vars[name];
    if (this.parent) return this.parent.get(name);
    return undefined;
  }
  set(name, val) {
    // walk up to find existing binding; if not found, create here
    let e = this;
    while (e) { if (name in e.vars) { e.vars[name] = val; return; } e = e.parent; }
    this.vars[name] = val;
  }
  setLocal(name, val) { this.vars[name] = val; }
  has(name) { return name in this.vars || (this.parent?.has(name) ?? false); }
}

// Export for use in HTML
if (typeof module !== 'undefined') module.exports = { JavaInterpreter, Env };
