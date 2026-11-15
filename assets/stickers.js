/* Magic Lab stickers: illustrated replacements for emoji in Grade 4 lessons.
 *
 * Images live in /assets/stickers/<name>.webp (256px) and <name>@2x.webp (512px).
 * Lessons keep their emoji in the data (so text still reads sensibly if this
 * file fails to load) and pass them through these helpers when rendering:
 *
 *   MLSticker.img(e)            -> <img> for an emoji or a sticker name, else e unchanged
 *   MLSticker.text(html)        -> html with every known emoji swapped for an inline sticker
 *   MLSticker.svg(x, y, e, sz)  -> SVG <image> centred on x,y, or '' if e has no sticker
 *   MLSticker.use({ '🌳': 'thorn-tree' })  -> per-page overrides when an emoji means
 *                                  something different in that lesson
 *
 * A value that is already a sticker name (lowercase-with-dashes) is used as is,
 * for the rare case where one page uses the same emoji for two different things.
 */
(function () {
  var BASE = '/assets/stickers/';
  var MAP = {
    '🐕': 'dog', '🌳': 'tree', '🚗': 'car', '🤖': 'robot', '🔥': 'fire', '🍄': 'mushroom',
    '🪨': 'rock', '🍂': 'dry-leaf', '💧': 'water', '🌻': 'sunflower', '🪑': 'wooden-chair',
    '🧴': 'plastic-bottle', '🪶': 'feather', '☁': 'cloud', '🐜': 'ant', '👕': 'cotton-tshirt',
    '🦴': 'bone', '🐟': 'fish', '🚲': 'bicycle', '🏞': 'river', '🍞': 'bread-mould',
    '🦁': 'lion', '🦓': 'zebra', '🦅': 'fish-eagle', '🐦': 'sparrow', '🦈': 'shark',
    '🐊': 'crocodile', '🦇': 'bat', '🐧': 'penguin', '🐢': 'tortoise', '🐄': 'cow',
    '🪴': 'aloe', '🌽': 'mealie', '🌸': 'protea', '🦵': 'legs', '🪽': 'wing', '🧥': 'fur',
    '🛡': 'scales', '🥩': 'sharp-teeth', '🦷': 'flat-teeth', '🌰': 'beak', '🎯': 'eyes-front',
    '👀': 'eyes-side', '🌾': 'grass', '🐸': 'frog', '🦉': 'owl', '🦒': 'giraffe', '🦛': 'hippo',
    '🐒': 'samango-monkey', '🦎': 'chameleon', '🦜': 'turaco', '🐬': 'dolphin', '🦭': 'seal',
    '🦏': 'rhino', '🐙': 'octopus', '🐘': 'elephant', '🦌': 'bushbuck', '🐾': 'paw-prints',
    '🦟': 'mosquito', '🫧': 'frog-spawn', '🌿': 'reeds', '🐭': 'mouse', '🥚': 'nest-eggs',
    '🍃': 'thick-leaves', '🪺': 'woven-nest', '🐌': 'snail', '🐚': 'snail-shell',
    '🐝': 'paper-wasp', '🏠': 'kennel', '🐴': 'horse', '🏚': 'stable', '🪵': 'kraal',
    '🔲': 'bird-cage', '🐔': 'chicken', '🛖': 'hen-house', '🐇': 'rabbit'
  };
  var NAME_RE = /^[a-z][a-z0-9-]*$/;
  var css = '.ml-stk{display:inline-block;width:1.3em;height:1.3em;object-fit:contain;vertical-align:middle;' +
    'filter:drop-shadow(0 1px 2px rgba(0,0,0,.35));user-select:none;-webkit-user-drag:none}' +
    '.ml-stk-i{width:1.55em;height:1.55em;vertical-align:-.45em;margin-right:.15em}';

  function injectCss() {
    if (document.getElementById('ml-stk-css')) return;
    var s = document.createElement('style'); s.id = 'ml-stk-css'; s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }
  function key(e) { return String(e || '').replace(/️/g, '').trim(); }
  function nameFor(e) {
    var k = key(e);
    if (NAME_RE.test(k)) return k;
    return MAP[k] || null;
  }
  function tag(name, cls) {
    return '<img class="' + cls + '" src="' + BASE + name + '.webp" srcset="' + BASE + name + '.webp 1x, ' +
      BASE + name + '@2x.webp 2x" alt="" aria-hidden="true" decoding="async" draggable="false">';
  }

  var api = {
    use: function (overrides) { for (var k in overrides) MAP[key(k)] = overrides[k]; return api; },
    name: nameFor,
    img: function (e) { var n = nameFor(e); return n ? tag(n, 'ml-stk') : (e || ''); },
    text: function (html) {
      var keys = Object.keys(MAP).sort(function (a, b) { return b.length - a.length; });
      var re = new RegExp('(' + keys.map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')️?', 'gu');
      return String(html).replace(re, function (m, k) { return tag(MAP[k], 'ml-stk ml-stk-i'); });
    },
    svg: function (x, y, e, size) {
      var n = nameFor(e); if (!n) return '';
      var s = Math.round((size || 34) * 1.25);
      return '<image href="' + BASE + n + '@2x.webp" x="' + (x - s / 2) + '" y="' + (y - s / 2) + '" width="' + s +
        '" height="' + s + '" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))"/>';
    }
  };
  injectCss();
  window.MLSticker = api;
})();
