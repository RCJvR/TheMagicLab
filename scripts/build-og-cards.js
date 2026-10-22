// Social cards: the 1200 × 630 preview image a link shows when it's shared
// (WhatsApp, Facebook, LinkedIn, Teams …). One per tool, plus Afrikaans
// versions for the tools that have Afrikaans lessons, and the site default.
//
//   node scripts/build-og-cards.js     (needs puppeteer-core and Chrome,
//                                       and the site served on localhost:8770)
//
// Writes assets/og-card.png and assets/og/<tool>[-af].png. scripts/seo-build.py
// decides which card each page uses (OG_CARDS there).
const puppeteer = require('puppeteer-core');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SERVER = process.env.OG_SERVER || 'http://localhost:8770/';
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// the catalogue's own order and colours (assets/magic-lab.css --t-*)
const HUES = ['#9b6bff','#7a7dff','#5b93ff','#35a6f0','#1fb8dc','#17c4c0','#1fc98e','#4acf6b','#9ed43c','#e8c63a','#eda13c','#ee7544','#ed5c86'];
const TOOLS = [
  { id:'code-conjurer', name:'Code Conjurer', icon:'wand-2', hue:0, grades:'Gr 10–12 · IT', line:'Advanced Java for IT learners: classes, arrays, algorithms, exception handling and full OOP.' },
  { id:'ai-oracle', name:'AI Oracle', icon:'sparkles', hue:1, grades:'Gr 8–12', line:'Understand how AI really works, learn to prompt well, and use AI ethically for school.' },
  { id:'java-genie', name:'Java Genie', icon:'code-2', hue:2, grades:'Gr 8–9', line:'Learn Java visually with turtle graphics, loops and interactive tutorials.' },
  { id:'computer-codex', name:'Computer Codex', icon:'book-open', hue:3, grades:'Gr 8–12 · CAPS & IEB', line:'Theory for Coding & Robotics, CAT and IT: 160 lessons, Grades 8 to 12.' },
  { id:'web-wizard', name:'Web Wizard', icon:'globe', hue:4, grades:'Gr 8–9', line:'Build websites in HTML and CSS with a live preview. No server, no setup.' },
  { id:'model-mage', name:'Model Mage', icon:'hexagon', hue:5, grades:'Gr 8–12', line:'CAD for 3D printing, and a circuit simulator with a microcontroller you can program.' },
  { id:'drawing-druid', name:'Drawing Druid', icon:'compass', hue:6, grades:'Gr 10–12 · EGD', line:'Engineering Graphics & Design, step by step: constructions, projections, perspective and more.' },
  { id:'science-sage', name:'Science Sage', icon:'microscope', hue:7, grades:'Gr 7–12 · CAPS & IEB', line:'Natural, Life and Physical Sciences with simulations, practice questions and a workbook.' },
  { id:'science-sage-af', name:'Science Sage', icon:'microscope', hue:7, grades:'Gr 7–12 · KABV & IEB', line:'Natuur-, Lewens- en Fisiese Wetenskappe met simulasies, oefenvrae en ’n werkboek.', af:true },
  { id:'math-magician', name:'Math Magician', icon:'calculator', hue:8, grades:'Gr 8–12 · CAPS', line:'Interactive mathematics: algebra, geometry, trigonometry and statistics, with worked examples.' },
  { id:'spike-spellcaster', name:'Spike Spellcaster', icon:'bot', hue:9, grades:'Gr 4–9 · WRO', line:'Code a LEGO® SPIKE Prime in Python or blocks, in the simulator or on the real robot.' },
  { id:'tech-tower', name:'The Tech Tower', icon:'wrench', hue:10, grades:'Gr 8–9 · CAPS', line:'CAPS Technology, hands-on: structures, gears, hydraulics, circuits and logic gates.' },
  { id:'tech-tower-af', name:'The Tech Tower', icon:'wrench', hue:10, grades:'Gr 8–9 · KABV', line:'KABV-Tegnologie, prakties: strukture, ratte, hidroulika, stroombane en logiese hekke.', af:true },
  { id:'robot-realm', name:'Robot Realm', icon:'cpu', hue:11, grades:'Gr 8–12', line:'Program and simulate robots: motors, sensors, obstacles and line following.' },
  { id:'time-turner', name:'Time Turner', icon:'hourglass', hue:12, grades:'Planning', line:'A weekly planner that fits school, homework, activities and rest into one real week.' },
];

const logo = fs.readFileSync(path.join(ROOT, 'assets/logo-prism.svg'), 'utf8');
const css = `
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#08090b;color:#f2f5f9;font-family:'Cabinet Grotesk',sans-serif;
  padding:66px 80px 0;position:relative;overflow:hidden}
.top{display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:14px;font-size:26px;font-weight:800;letter-spacing:-.02em;color:#c9d1dc}
.brand svg{width:48px;height:48px;border-radius:12px}
.url{font-size:22px;color:#7c8696;font-weight:700}
.tool{display:flex;align-items:center;gap:30px;margin-top:92px}
.ico{width:112px;height:112px;border-radius:26px;display:grid;place-items:center;flex-shrink:0;border:2px solid}
.ico svg{width:58px;height:58px;stroke-width:1.8}
h1{font-size:92px;line-height:1;font-weight:900;letter-spacing:-.045em}
p{margin-top:34px;font-size:31px;line-height:1.38;color:#b4bcc9;font-weight:500;max-width:960px}
.grades{position:absolute;left:80px;bottom:62px;font-size:24px;font-weight:800;letter-spacing:.01em}
.bands{position:absolute;left:0;right:0;bottom:0;height:26px;display:flex;align-items:flex-end}
.bands i{flex:1;height:7px}
.bands i.me{height:26px}`;

function page(t) {
  const hue = t ? HUES[t.hue] : null;
  const bands = HUES.map((h, i) => `<i class="${t && i === t.hue ? 'me' : ''}" style="background:${h}"></i>`).join('');
  const body = t ? `
    <div class="tool"><div class="ico" style="background:${hue}24;border-color:${hue}66;color:${hue}"><i data-lucide="${t.icon}"></i></div><h1>${t.name}</h1></div>
    <p>${t.line}</p>
    <div class="grades" style="color:${hue}">${t.grades}</div>`
  : `<h1 style="margin-top:84px;font-size:76px;max-width:900px;line-height:1.02">Interactive STEM lessons for South African classrooms.</h1>
     <p style="margin-top:28px;font-size:28px">Sciences, Mathematics, Technology, EGD, coding and robotics. CAPS and IEB aligned, Grades 4–12, in English and Afrikaans.</p>`;
  return `<!doctype html><html lang="${t && t.af ? 'af' : 'en'}"><head><meta charset="utf-8">
    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap">
    <script src="${SERVER}assets/vendor/lucide-1.56.0.min.js"></script><style>${css}</style></head><body>
    <div class="top"><div class="brand">${logo}<span>The Magic Lab</span></div><div class="url">themagiclab.co.za</div></div>
    ${body}<div class="bands">${bands}</div>
    <script>lucide.createIcons()</script></body></html>`;
}

(async () => {
  fs.mkdirSync(path.join(ROOT, 'assets/og'), { recursive: true });
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 1200, height: 630 });
  for (const t of [null, ...TOOLS]) {
    // the font comes from a CDN; give a slow response a second chance
    for (let attempt = 1; ; attempt++) {
      try {
        await p.goto(SERVER + 'robots.txt');
        await p.setContent(page(t), { waitUntil: 'networkidle0', timeout: 60000 });
        break;
      } catch (e) { if (attempt === 3) throw e; }
    }
    await p.evaluate(() => document.fonts.ready);
    const out = t ? `assets/og/${t.id}.png` : 'assets/og-card.png';
    await p.screenshot({ path: path.join(ROOT, out) });
    console.log(out);
  }
  await b.close();
})();
