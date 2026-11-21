/* Exam Sanctum — formula and information sheets learners can open in an overlay during a paper.
 *
 * The teacher picks which sheets (and whether the calculator) a paper offers, on the
 * Exam papers page; the choice is stored in the paper's learner copy (learner.sheets,
 * learner.calculator). Sheets give syntax, names and formulas only: no worked answers.
 * Every sheet has English and Afrikaans text; the paper's language picks one.
 *
 * To add a sheet: add an entry below with a short id, both titles and both bodies.
 */
const t = rows => '<table>' + rows.map((r, i) => '<tr>' + r.map(c => (i === 0 ? `<th>${c}</th>` : `<td>${c}</td>`)).join('') + '</tr>').join('') + '</table>';
const e = s => s.replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const SHEETS = {
  html: {
    title: 'HTML tags', titleAf: 'HTML-etikette',
    body: t([['Category', 'Tag', 'Function'],
      ['Page structure', e('<!DOCTYPE html>'), 'First line: the page uses HTML 5'],
      ['', e('<html> </html>'), 'Root element: holds the whole page'],
      ['', e('<head> </head>'), 'Page information that is not displayed'],
      ['', e('<title> </title>'), 'Text in the browser tab'],
      ['', e('<body> </body>'), 'All the visible content'],
      ['', e('<!-- comment -->'), 'A note in the code; not displayed'],
      ['Headings and text', e('<h1>') + ' to ' + e('<h6>'), 'Headings, largest (h1) to smallest (h6)'],
      ['', e('<p> </p>'), 'Paragraph'],
      ['', e('<br/>'), 'Line break'],
      ['', e('<hr/>'), 'Horizontal line'],
      ['', e('<b> </b>') + ' · ' + e('<i> </i>') + ' · ' + e('<u> </u>'), 'Bold · italic · underlined'],
      ['', e('<font> </font>'), 'Size and colour of text'],
      ['Images and links', e('<img>'), 'Displays an image'],
      ['', e('<a> </a>'), 'Hyperlink'],
      ['Lists', e('<ul> </ul>') + ' · ' + e('<ol> </ol>'), 'Unordered (bullets) · ordered (numbers)'],
      ['', e('<li> </li>'), 'An item in a list'],
      ['Tables', e('<table> </table>'), 'The whole table'],
      ['', e('<tr> </tr>'), 'A row'],
      ['', e('<td> </td>'), 'A cell in a row'],
      ['Style', e('<link>') + ' · ' + e('<style> </style>'), 'External style sheet · internal style'],
    ]) + '<p><b>Attributes</b> go inside the opening tag: <code>name="value"</code>, e.g. href, src, alt, width, height, border, align, target.</p>',
    bodyAf: t([['Kategorie', 'Etiket', 'Funksie'],
      ['Bladsystruktuur', e('<!DOCTYPE html>'), 'Eerste reël: die bladsy gebruik HTML 5'],
      ['', e('<html> </html>'), 'Kern element: bevat die hele bladsy'],
      ['', e('<head> </head>'), 'Bladsyinligting wat nie vertoon word nie'],
      ['', e('<title> </title>'), 'Teks in die blaaiertab'],
      ['', e('<body> </body>'), 'Al die sigbare inhoud'],
      ['', e('<!-- comment -->'), '’n Nota in die kode; word nie vertoon nie'],
      ['Opskrifte en teks', e('<h1>') + ' tot ' + e('<h6>'), 'Opskrifte, grootste (h1) tot kleinste (h6)'],
      ['', e('<p> </p>'), 'Paragraaf'],
      ['', e('<br/>'), 'Reëlbreuk'],
      ['', e('<hr/>'), 'Horisontale lyn'],
      ['', e('<b> </b>') + ' · ' + e('<i> </i>') + ' · ' + e('<u> </u>'), 'Vet · skuins · onderstreep'],
      ['', e('<font> </font>'), 'Grootte en kleur van teks'],
      ['Beelde en skakels', e('<img>'), 'Vertoon ’n beeld'],
      ['', e('<a> </a>'), 'Skakel (hyperlink)'],
      ['Lyste', e('<ul> </ul>') + ' · ' + e('<ol> </ol>'), 'Ongenommer (kolpunte) · genommer'],
      ['', e('<li> </li>'), '’n Item in ’n lys'],
      ['Tabelle', e('<table> </table>'), 'Die hele tabel'],
      ['', e('<tr> </tr>'), '’n Ry'],
      ['', e('<td> </td>'), '’n Sel in ’n ry'],
      ['Styl', e('<link>') + ' · ' + e('<style> </style>'), 'Eksterne stylblad · interne styl'],
    ]) + '<p><b>Attribute</b> staan binne die openingsetiket: <code>naam="waarde"</code>, bv. href, src, alt, width, height, border, align, target.</p>'
  },

  css: {
    title: 'CSS', titleAf: 'CSS',
    body: '<p><b>A rule:</b> <code>selector { property: value; }</code></p>' +
      t([['Where the CSS goes', 'How'],
        ['Inline', '<code>' + e('<p style="color: red;">') + '</code>'],
        ['Internal', '<code>' + e('<style> … </style>') + '</code> in the head'],
        ['External', '<code>' + e('<link rel="stylesheet" href="style.css">') + '</code> in the head']]) +
      t([['Property', 'Example value'],
        ['color', 'red · #FF0000 · rgb(255, 0, 0)'], ['background-color', 'yellow'], ['font-family', 'Arial'], ['font-size', '16px'],
        ['font-weight', 'bold'], ['text-align', 'left · center · right'], ['border', '1px solid black'],
        ['width · height', '200px · 50%'], ['margin · padding', '10px']]),
    bodyAf: '<p><b>’n Reël:</b> <code>selector { property: value; }</code></p>' +
      t([['Waar die CSS staan', 'Hoe'],
        ['Inlyn', '<code>' + e('<p style="color: red;">') + '</code>'],
        ['Intern', '<code>' + e('<style> … </style>') + '</code> in die head'],
        ['Ekstern', '<code>' + e('<link rel="stylesheet" href="style.css">') + '</code> in die head']]) +
      t([['Eienskap (property)', 'Voorbeeldwaarde'],
        ['color', 'red · #FF0000 · rgb(255, 0, 0)'], ['background-color', 'yellow'], ['font-family', 'Arial'], ['font-size', '16px'],
        ['font-weight', 'bold'], ['text-align', 'left · center · right'], ['border', '1px solid black'],
        ['width · height', '200px · 50%'], ['margin · padding', '10px']])
  },

  excel: {
    title: 'Excel functions', titleAf: 'Excel-funksies',
    body: '<p>A formula starts with <code>=</code>. Operators: <code>+  −  *  /  ^</code>. A range: <code>B2:B6</code>. An absolute reference: <code>$B$8</code> (press F4).</p>' +
      t([['Function', 'Form'],
        ['SUM', '=SUM(range)'], ['AVERAGE', '=AVERAGE(range)'], ['MIN · MAX', '=MIN(range) · =MAX(range)'],
        ['COUNT', '=COUNT(range)'], ['COUNTA', '=COUNTA(range)'], ['COUNTBLANK', '=COUNTBLANK(range)'],
        ['COUNTIF', '=COUNTIF(range, criteria)'], ['SUMIF', '=SUMIF(range, criteria, sum_range)'],
        ['ROUND', '=ROUND(number, digits)'], ['IF', '=IF(test, value_if_true, value_if_false)']]) +
      '<p>Criteria in quotes, e.g. <code>">25"</code> or <code>"Muffins"</code>. Some computers use <code>;</code> instead of <code>,</code> between arguments.</p>',
    bodyAf: '<p>’n Formule begin met <code>=</code>. Bewerkings: <code>+  −  *  /  ^</code>. ’n Reeks: <code>B2:B6</code>. ’n Absolute verwysing: <code>$B$8</code> (druk F4).</p>' +
      t([['Funksie', 'Vorm'],
        ['SUM', '=SUM(reeks)'], ['AVERAGE', '=AVERAGE(reeks)'], ['MIN · MAX', '=MIN(reeks) · =MAX(reeks)'],
        ['COUNT', '=COUNT(reeks)'], ['COUNTA', '=COUNTA(reeks)'], ['COUNTBLANK', '=COUNTBLANK(reeks)'],
        ['COUNTIF', '=COUNTIF(reeks, kriteria)'], ['SUMIF', '=SUMIF(reeks, kriteria, somreeks)'],
        ['ROUND', '=ROUND(getal, syfers)'], ['IF', '=IF(toets, waarde_as_waar, waarde_as_onwaar)']]) +
      '<p>Kriteria tussen aanhalingstekens, bv. <code>">25"</code> of <code>"Muffins"</code>. Sommige rekenaars gebruik <code>;</code> in plaas van <code>,</code> tussen argumente.</p>'
  },

  ohm: {
    title: 'Ohm’s law', titleAf: 'Ohm se wet',
    body: '<p class="xm-big">V = I × R</p>' +
      t([['Quantity', 'Symbol', 'Unit'], ['Voltage (potential difference)', 'V', 'volt (V)'], ['Current', 'I', 'ampere (A)'], ['Resistance', 'R', 'ohm (Ω)']]) +
      '<p>1 mA = 0.001 A · 1 kΩ = 1 000 Ω</p><p>Write the formula, the substitution and the answer with its unit.</p>',
    bodyAf: '<p class="xm-big">V = I × R</p>' +
      t([['Grootheid', 'Simbool', 'Eenheid'], ['Spanning (potensiaalverskil)', 'V', 'volt (V)'], ['Stroom', 'I', 'ampère (A)'], ['Weerstand', 'R', 'ohm (Ω)']]) +
      '<p>1 mA = 0,001 A · 1 kΩ = 1 000 Ω</p><p>Skryf die formule, die substitusie en die antwoord met die eenheid neer.</p>'
  },
};

export const SHEET_IDS = Object.keys(SHEETS);
export function sheetTitle(id, lang) { const s = SHEETS[id]; return s ? (lang === 'af' ? s.titleAf : s.title) : id; }
export function sheetBody(id, lang) { const s = SHEETS[id]; return s ? (lang === 'af' ? s.bodyAf : s.body) : ''; }
