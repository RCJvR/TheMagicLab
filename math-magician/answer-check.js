// ═══════════════════════════════════════════════════════════════
// Math Magician — typed-answer checking, shared by the five grade pages.
//
// A typed answer is right when it matches the stored answer or one of
// its altAnswers after both are put in the same form:
//   · spaces, case and the kind of minus sign (− – -) do not matter;
//   · a decimal comma and a decimal point are the same (22,98 = 22.98),
//     and a list may be separated by commas or semicolons (19,23);
//   · numbers are compared by value, to the precision of the stored
//     answer (58 = 058, 10 = 10.0, 1,5 × 10⁹ = 1.5 × 10^9);
//   · a leading "x =" is optional, and so is a unit or R in front;
//   · lists joined by "or"/"and" may come in any order.
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', 'ˣ': 'x', 'ⁿ': 'n' };
  const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
  const VULGAR = { '½': '1/2', '⅓': '1/3', '⅔': '2/3', '¼': '1/4', '¾': '3/4', '⅕': '1/5', '⅖': '2/5', '⅗': '3/5', '⅘': '4/5', '⅙': '1/6', '⅚': '5/6', '⅛': '1/8', '⅜': '3/8', '⅝': '5/8', '⅞': '7/8' };
  const UNIT = /(?:%|°|degrees?|grade|rand|units?|cm²|cm³|mm²|mm³|m²|m³|km²|cm\^2|cm\^3|m\^2|m\^3|mm|cm|km|m|ml|kl|l|kg|g|s|h|min|km\/h|m\/s)$/;

  // One string → its plain written form (no spaces, ASCII signs).
  function plain(s) {
    s = String(s == null ? '' : s).normalize('NFC').toLowerCase().trim();
    s = s.replace(/[−–—‒]/g, '-').replace(/[‘’′]/g, "'");
    // superscripts → ^n (a run of them is one exponent), subscripts → digits
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ˣⁿ]+/g, m => '^' + [...m].map(c => SUP[c]).join(''));
    s = s.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, c => SUB[c]).replace(/log_/g, 'log');
    s = s.replace(/\bpi\b/g, 'π').replace(/sqrt/g, '√');
    s = s.replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, c => ' ' + VULGAR[c]).trim();  // 9⅓ → 9 1/3
    s = s.replace(/(\d)\s+(\d+)\s*\/\s*(\d+)/g, '$1&$2/$3');          // mixed number 1 7/12
    s = s.replace(/(\d)\s+(?=\d{3}\b)/g, '$1');                       // 1 250 → 1250
    s = s.replace(/\s+(?:or|and|of|en)\s+/g, '|');                    // 0 or 2 → 0|2
    s = s.replace(/\s+/g, '');
    s = s.replace(/(\d)[×*·](?=\d)/g, '$1x').replace(/[×*·]/g, '');   // 1,5×10 → 1,5x10 ; 2*x → 2x
    s = s.replace(/√\(([a-z0-9]+)\)/g, '√$1').replace(/\^\(([a-z0-9-]+)\)/g, '^$1');
    s = s.replace(/^\(([^()]*)\)$/, (m, inner) => /[;,]/.test(inner) ? m : inner); // (5) → 5, keep (a;b)
    return s;
  }

  // A number written in any of the usual ways, or NaN.
  function num(s, comma) {
    s = s.replace(/^r(?=-?\d)/, '');                                  // R420
    s = s.replace(UNIT, '');
    if (comma) s = s.replace(/^(-?\d+),(\d+)/, '$1.$2');
    let m;
    if ((m = s.match(/^(-?\d*\.?\d+)x10\^(-?\d+)$/))) return parseFloat(m[1]) * Math.pow(10, +m[2]);
    if (/^-?\d*\.?\d+(?:e-?\d+)?$/.test(s)) return parseFloat(s);
    return NaN;
  }
  const places = s => { const m = s.replace(UNIT, '').match(/[.,](\d+)(?:x10|e|$)/); return m ? m[1].length : 0; };

  // The ways a written answer can be read: as a list split on ; , or/and.
  function readings(s) {
    const p = plain(s);
    const out = [];
    const coords = p.match(/^\((.*)\)$/);
    const body = coords ? coords[1] : p;
    const joined = body.includes('|');
    const add = (parts, comma) => out.push({ parts: parts.map(x => x.replace(/^[a-z]=/, '')).filter(Boolean), comma, ordered: !joined, coords: !!coords });
    const words = body.split('|');
    if (body.includes(';')) add(words.flatMap(w => w.split(';')), true);   // ; separates, so , is a decimal comma
    else {
      add(words, true);                                                   // 22,98 one number
      if (body.includes(',')) add(words.flatMap(w => w.split(',')), false); // 19,23 two numbers
    }
    return out;
  }

  // prec: decimal places of the main answer, so that a rounder alternative
  // (16.8 for 16.80) does not widen what counts as right.
  function samePart(u, c, cComma, prec) {
    if (u === c) return true;
    const a = num(u, true), b = num(c, cComma);
    if (!isFinite(a) || !isFinite(b)) return false;
    const dp = prec == null ? places(c) : Math.max(prec, places(c));
    const tol = b !== 0 && Math.abs(b) < 1e-3 ? Math.abs(b) * 1e-3 : 0.5 * Math.pow(10, -dp) + 1e-9;
    return Math.abs(a - b) <= tol;
  }

  function sameReading(u, c, prec) {
    if (u.parts.length !== c.parts.length || !u.parts.length) return false;
    if (c.parts.length > 1) prec = null;
    if (c.ordered || c.coords) return c.parts.every((p, i) => samePart(u.parts[i], p, c.comma, prec));
    const left = u.parts.slice();
    return c.parts.every(p => { const i = left.findIndex(x => samePart(x, p, c.comma, prec)); return i >= 0 && left.splice(i, 1); });
  }

  function matches(user, q) {
    if (String(user).trim() === '') return false;
    const stored = [q.answer].concat(q.altAnswers || []);
    const us = readings(user);
    const main = plain(q.answer), prec = isFinite(num(main, true)) ? places(main) : null;
    return stored.some(s => {
      if (plain(s) === plain(user)) return true;
      const cs = readings(s);
      return us.some(u => cs.some(c => sameReading(u, c, prec)));
    });
  }

  window.MMAnswer = { matches, plain };
})();
