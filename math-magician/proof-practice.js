/* Math Magician — geometry proofs, built and marked in the browser.
 *
 * A proof question looks like
 *   { type: 'proof', text, answer: 'proof',
 *     steps: [{ s: statement, r: reasonKey, d: [indexes of steps it needs] }],
 *     extra: [false statements that do not belong],
 *     reasons: [reason keys offered in the menu], topic }
 * The learner taps statements into order and picks a reason for each. A step
 * is right when every step it depends on comes before it and its reason is
 * right; any valid order is accepted. Planted false statements must be left out.
 *
 * A grade page calls MMProof.mount(el, q, lang, onDone) and onDone(ok) when
 * the learner checks the proof. MMProof.reason(key, lang) gives reason text. */
(function () {
  // Standard reason abbreviations (CAPS / IEB style), English and Afrikaans.
  const R = {
    given: ['Given', 'Gegee'], constr: ['Construction', 'Konstruksie'], common: ['Common', 'Gemeen'],
    above: ['From the statements above', 'Uit bostaande'],
    vertopp: ['Vert opp ∠s', 'Regoorst ∠e'], strline: ['∠s on a str line', '∠e op \'n reguit lyn'],
    alt: ['Alt ∠s, ∥ lines', 'Verw ∠e, ∥ lyne'], corr: ['Corr ∠s, ∥ lines', 'Ooreenk ∠e, ∥ lyne'],
    coint: ['Co-int ∠s, ∥ lines', 'Ko-binne ∠e, ∥ lyne'], altconv: ['Alt ∠s equal', 'Verw ∠e gelyk'],
    sumtri: ['Sum of ∠s of △', 'Som van ∠e van △'], extri: ['Ext ∠ of △', 'Buite-∠ van △'],
    isos: ['∠s opp equal sides', '∠e teenoor gelyke sye'],
    SSS: ['SSS', 'SSS'], SAS: ['SAS', 'SHS'], AAS: ['AAS', 'HHS'], RHS: ['RHS', 'RSS'], congr: ['≡ △s', '≡ △e'],
    oppsides: ['Opp sides of ∥m', 'Teenoorst sye van ∥m'], diagbis: ['Diags of ∥m bisect', 'Hoekl van ∥m halveer'],
    diagconv: ['Diags bisect each other', 'Hoekl halveer mekaar'], bothpar: ['Both pairs of opp sides ∥', 'Albei pare teenoorst sye ∥'],
    midpt: ['Midpt theorem', 'Middelpuntstelling'],
    centre: ['∠ at centre = 2 × ∠ at circ', 'Midpts-∠ = 2 × omtreks-∠'], radii: ['Radii', 'Radiusse'],
    sameseg: ['∠s in the same seg', '∠e in dieselfde segm'], cyclic: ['Opp ∠s of cyclic quad', 'Teenoorst ∠e van koordevh'],
    tanrad: ['Tan ⊥ radius', 'Raakl ⊥ radius'], tanchord: ['Tan-chord theorem', 'Raaklyn-koordstelling'],
    semic: ['∠ in semi-circle', '∠ in halwe sirkel'],
    prop: ['Line ∥ one side of △', 'Lyn ∥ een sy van △'], equi: ['∠∠∠ (equiangular △s)', '∠∠∠ (gelykhoekige △e)'],
    sim: ['Sides of ||| △s in prop', 'Sye van ||| △e in verh']
  };
  const TXT = {
    en: { how: 'Tap the statements in a logical order, then choose a reason for each line. Leave out any statement that does not belong.',
          yours: 'Your proof', pool: 'Statements', empty: 'Tap a statement below to start your proof.', reason: 'Reason…',
          remove: 'Remove', check: 'Check my proof', missing: 'Still missing from your proof:', extra: 'This statement does not belong in the proof.',
          order: 'This needs an earlier step that is not above it.', wrongReason: 'Check this reason.', allLeft: 'Every statement is placed.' },
    af: { how: 'Tik die bewerings in \'n logiese volgorde en kies dan \'n rede vir elke reël. Laat enige bewering uit wat nie hoort nie.',
          yours: 'Jou bewys', pool: 'Bewerings', empty: 'Tik \'n bewering hieronder om jou bewys te begin.', reason: 'Rede…',
          remove: 'Verwyder', check: 'Kontroleer my bewys', missing: 'Steeds uit jou bewys:', extra: 'Hierdie bewering hoort nie in die bewys nie.',
          order: 'Dit het \'n vroeëre stap nodig wat nie hierbo is nie.', wrongReason: 'Kontroleer hierdie rede.', allLeft: 'Elke bewering is geplaas.' }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reason = (k, lang) => (R[k] || [k, k])[lang === 'af' ? 1 : 0];
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function mount(el, q, lang, onDone) {
    const L = TXT[lang] || TXT.en;
    // Cards: real steps keep their index; planted statements get index -1.
    const cards = shuffle(q.steps.map((st, i) => ({ id: 'p' + i, step: i, text: st.s }))
      .concat((q.extra || []).map((t, i) => ({ id: 'x' + i, step: -1, text: t }))));
    const menu = q.reasons.slice().sort((a, b) => reason(a, lang).localeCompare(reason(b, lang)));
    const placed = [];          // [{ card, reason }]
    let done = false;

    function render() {
      const left = cards.filter(c => !placed.some(p => p.card === c));
      el.innerHTML = `
        <p class="pf-how">${L.how}</p>
        <div class="pf-label">${L.yours}</div>
        <ol class="pf-lines">${placed.length ? placed.map((p, i) => `
          <li class="pf-line" data-i="${i}">
            <span class="pf-stmt">${esc(p.card.text)}</span>
            <span class="pf-row">
              <select class="pf-reason" data-i="${i}" aria-label="${L.reason}"${done ? ' disabled' : ''}>
                <option value="">${L.reason}</option>
                ${menu.map(k => `<option value="${k}"${p.reason === k ? ' selected' : ''}>${esc(reason(k, lang))}</option>`).join('')}
              </select>
              ${done ? '' : `<button type="button" class="pf-del" data-i="${i}" aria-label="${L.remove}">✕</button>`}
            </span>
            <span class="pf-note" hidden></span>
          </li>`).join('') : `<li class="pf-empty">${L.empty}</li>`}</ol>
        ${done ? '' : `<div class="pf-label">${L.pool}</div>
        <div class="pf-pool">${left.length ? left.map(c => `<button type="button" class="pf-card" data-id="${c.id}">${esc(c.text)}</button>`).join('') : `<span class="pf-allin">${L.allLeft}</span>`}</div>
        <button type="button" class="submit-btn pf-check"${placed.length ? '' : ' disabled'}>${L.check}</button>`}
        <div class="pf-missing" hidden></div>`;
      el.querySelectorAll('.pf-card').forEach(b => b.addEventListener('click', () => {
        placed.push({ card: cards.find(c => c.id === b.dataset.id), reason: '' });
        render();
      }));
      el.querySelectorAll('.pf-del').forEach(b => b.addEventListener('click', () => { placed.splice(+b.dataset.i, 1); render(); }));
      el.querySelectorAll('.pf-reason').forEach(s => s.addEventListener('change', () => { placed[+s.dataset.i].reason = s.value; }));
      const chk = el.querySelector('.pf-check');
      if (chk) chk.addEventListener('click', check);
    }

    function check() {
      done = true;
      const before = new Set();
      let ok = true;
      const marks = placed.map(p => {
        let note = '', good = true;
        if (p.card.step < 0) { note = L.extra; good = false; }
        else {
          const st = q.steps[p.card.step];
          if ((st.d || []).some(d => !before.has(d))) { note = L.order; good = false; }
          else if (p.reason !== st.r) { note = L.wrongReason; good = false; }
          before.add(p.card.step);
        }
        if (!good) ok = false;
        return { good, note };
      });
      const missing = q.steps.map((st, i) => i).filter(i => !placed.some(p => p.card.step === i));
      if (missing.length) ok = false;
      render();
      el.querySelectorAll('.pf-line').forEach((li, i) => {
        li.classList.add(marks[i].good ? 'ok' : 'no');
        const n = li.querySelector('.pf-note');
        if (marks[i].note) { n.hidden = false; n.textContent = marks[i].note; }
      });
      if (missing.length) {
        const m = el.querySelector('.pf-missing');
        m.hidden = false;
        m.innerHTML = `${L.missing}<ul>${missing.map(i => `<li>${esc(q.steps[i].s)}</li>`).join('')}</ul>`;
      }
      onDone(ok);
    }
    render();
  }

  window.MMProof = { mount, reason };
})();
