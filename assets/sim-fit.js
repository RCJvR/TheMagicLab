/* The Magic Lab — make simulations use the screen.
 *
 * Simulation canvases were designed around a ~900 px wide, ~350 px tall box,
 * and most draw with a height fixed in their own code. Stretching the canvas
 * with CSS would distort them, so instead the canvas's container is scaled
 * uniformly with CSS zoom: the simulation keeps its designed proportions and
 * simply gets bigger on laptops and monitors.
 *
 *   scale = how much wider the space is than the space the simulation was
 *           designed in (measured, not assumed),
 *           limited so the canvas stays within ~72% of the window height,
 *           capped at 1.5, and not applied below ~1.08 (tablets, phones).
 *
 * Under zoom the browser reports mouse positions and canvas rectangles in
 * screen pixels, while the simulations work in their own (unzoomed) pixels.
 * So for canvases inside a scaled container this script:
 *   - re-dispatches mouse/pointer events with positions mapped back, and
 *   - reports the canvas rectangle at its unzoomed size,
 * which keeps clicks and drags landing where the learner points.
 * devicePixelRatio is raised by the same factor so drawings stay sharp.
 *
 * Opt a page out with <html data-ml-no-fit>.
 */
(function () {
  'use strict';
  if (document.documentElement.hasAttribute('data-ml-no-fit')) return;
  var MAX_Z = 1.5, MIN_Z = 1.08, MAX_H_SHARE = 0.72;
  var PANEL = '#tab-explore, #tab-simulate, #panel-explore';
  var Z = 1;
  var realDpr = window.devicePixelRatio || 1;

  // Let the explore layouts grow; the zoom below makes the simulation fill it.
  var css = document.createElement('style');
  css.id = 'ml-sim-fit';
  css.textContent = ['.sim-outer', '.explore-layout', '.explore-wrap', '.explore-top', '.explore-cols', '.skel-card', '.diet-card', '.explore-wrap > *']
    .map(function (s) { return PANEL.split(',').map(function (p) { return p.trim() + ' ' + s; }).join(','); }).join(',') +
    '{max-width:1320px !important}';
  (document.head || document.documentElement).appendChild(css);

  function wraps() {
    var panel = document.querySelector(PANEL), out = [];
    if (!panel) return out;
    panel.querySelectorAll('canvas').forEach(function (c) {
      if (c.closest('.mlx-sim')) return;   // Explore-kit sims size themselves
      var w = c.parentElement;
      if (w && w !== panel && out.indexOf(w) < 0) out.push(w);
    });
    return out;
  }
  // The canvas's designed display height. Before a simulation has sized its
  // canvas (panel still hidden) offsetHeight is the raw bitmap height, so the
  // declared CSS height or height attribute is used then.
  function canvasHeight(c, hidden) {
    var css = parseFloat(c.style.height), attr = parseFloat(c.getAttribute('height'));
    if (css) return css;
    if (hidden) return attr || c.offsetHeight;
    return c.offsetHeight || attr;
  }
  function designHeight(ws, hidden) {
    var h = 0;
    ws.forEach(function (w) { w.querySelectorAll('canvas').forEach(function (c) { h = Math.max(h, canvasHeight(c, hidden) || 0); }); });
    return h || 380;
  }
  // Scale = (room the canvas gets once the caps are lifted) / (room it had as
  // designed), so a simulation is only enlarged by the extra space it really
  // gains and its own drawing width never shrinks. Measured with the panel
  // shown invisibly if it is hidden, before the simulation measures itself.
  function compute() {
    var panel = document.querySelector(PANEL), ws = wraps();
    if (!panel || !ws.length) return;
    var hidden = !panel.offsetParent, prevD = panel.style.display, prevV = panel.style.visibility;
    if (hidden) { panel.style.setProperty('display', 'block', 'important'); panel.style.visibility = 'hidden'; }
    ws.forEach(function (w) { w.style.zoom = ''; });
    css.disabled = true;
    var orig = ws.map(function (w) { return w.clientWidth; });
    css.disabled = false;
    var now = ws.map(function (w) { return w.clientWidth; });
    // The scale comes from the main (largest) simulation canvas; smaller or
    // hidden side canvases must not hold it back.
    var main = -1, area = 0;
    ws.forEach(function (w, i) {
      if (!orig[i]) return;
      var a = 0;
      w.querySelectorAll('canvas').forEach(function (c) { a = Math.max(a, (c.offsetWidth || 0) * (canvasHeight(c, hidden) || 0)); });
      if (a > area) { area = a; main = i; }
    });
    var zw = main >= 0 ? now[main] / orig[main] : 1;
    var h = designHeight(main >= 0 ? [ws[main]] : ws, hidden);
    if (hidden) { panel.style.display = prevD; panel.style.visibility = prevV; }
    var z = Math.min(zw, (window.innerHeight * MAX_H_SHARE) / h, MAX_Z);
    Z = z >= MIN_Z ? Math.floor(z * 100) / 100 : 1;
    // Enlarge only the canvases that gained at least that much room, so none
    // ends up with a narrower drawing area than it was designed for.
    ws.forEach(function (w, i) {
      var fits = orig[i] > 0 && now[i] / orig[i] >= Z * 0.98;
      if (Z > 1 && fits) { w.style.zoom = Z; w.setAttribute('data-ml-zoom', Z); }
      else { w.style.zoom = ''; w.removeAttribute('data-ml-zoom'); }
    });
  }

  // Sharper canvases: simulations size their bitmaps from devicePixelRatio.
  try {
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, get: function () { return realDpr * Z; } });
  } catch (e) {}

  // Canvas rectangles at the simulation's own (unzoomed) scale.
  var origRect = Element.prototype.getBoundingClientRect;
  function zoomedCanvas(el) { return Z > 1 && el && el.tagName === 'CANVAS' && el.closest && el.closest('[data-ml-zoom]'); }
  Element.prototype.getBoundingClientRect = function () {
    var r = origRect.call(this);
    if (!zoomedCanvas(this)) return r;
    return new DOMRect(r.left, r.top, r.width / Z, r.height / Z);
  };

  // Mouse and pointer positions mapped back into the canvas's own pixels.
  ['mousedown', 'mousemove', 'mouseup', 'click', 'dblclick', 'contextmenu', 'pointerdown', 'pointermove', 'pointerup', 'wheel']
    .forEach(function (type) {
      document.addEventListener(type, function (e) {
        if (!e.isTrusted || !zoomedCanvas(e.target)) return;
        var t = e.target, r = origRect.call(t);
        var init = {
          bubbles: true, cancelable: true, composed: true, view: window, detail: e.detail,
          clientX: r.left + (e.clientX - r.left) / Z, clientY: r.top + (e.clientY - r.top) / Z,
          screenX: e.screenX, screenY: e.screenY, button: e.button, buttons: e.buttons,
          ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, altKey: e.altKey, metaKey: e.metaKey, relatedTarget: e.relatedTarget
        };
        var ne;
        if (window.PointerEvent && e instanceof PointerEvent) {
          init.pointerId = e.pointerId; init.pointerType = e.pointerType; init.isPrimary = e.isPrimary;
          init.pressure = e.pressure; init.width = e.width; init.height = e.height;
          ne = new PointerEvent(type, init);
        } else if (e instanceof WheelEvent) {
          init.deltaX = e.deltaX; init.deltaY = e.deltaY; init.deltaMode = e.deltaMode;
          ne = new WheelEvent(type, init);
        } else ne = new MouseEvent(type, init);
        e.stopImmediatePropagation();
        if (!t.dispatchEvent(ne)) e.preventDefault();
      }, true);
    });

  function refit() {
    var before = Z;
    compute();
    // let simulations re-measure their canvases at the new scale
    if (Z !== before) window.dispatchEvent(new Event('resize'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', compute);
  else compute();
  // Opening the simulation tab: measure and scale before the page's own tab
  // handler runs (capture phase), so the simulation sizes itself correctly.
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.tab-btn, [onclick*="switchTab"], [onclick*="showTab"]');
    if (b && /explore|simulat/i.test(b.getAttribute('onclick') || '')) compute();
  }, true);
  var rt; window.addEventListener('resize', function (e) {
    if (!e.isTrusted) return;
    clearTimeout(rt); rt = setTimeout(refit, 150);
  });
  window.MagicLabSimFit = { scale: function () { return Z; }, refit: refit };
})();
