// Drawing Druid — "work in progress" notice. Self-contained (inline styles, no external
// dependencies) so it renders identically regardless of which page includes it. Shown once per
// browser tab session (sessionStorage), dismissible.
(function () {
  'use strict';
  var KEY = 'drawingDruidWipNoticeDismissed';
  if (sessionStorage.getItem(KEY) === '1') return;

  function inject() {
    var overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'ddWipTitle');
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:99999', 'display:flex', 'align-items:center', 'justify-content:center',
      'background:rgba(5,6,10,0.72)', 'backdrop-filter:blur(3px)', 'padding:20px', 'box-sizing:border-box',
      'font-family:"Cabinet Grotesk",system-ui,sans-serif',
    ].join(';');

    var card = document.createElement('div');
    card.style.cssText = [
      'max-width:440px', 'width:100%', 'background:#12141c', 'border:1px solid rgba(234,179,8,0.35)',
      'border-radius:18px', 'padding:26px 26px 22px', 'box-shadow:0 20px 60px rgba(0,0,0,0.5)',
      'color:#e8eaf2',
    ].join(';');

    var badge = document.createElement('div');
    badge.textContent = '🚧 WORK IN PROGRESS';
    badge.style.cssText = [
      'display:inline-block', 'font-size:10.5px', 'font-weight:700', 'letter-spacing:.08em',
      'color:#fde047', 'background:rgba(234,179,8,0.12)', 'border:1px solid rgba(234,179,8,0.3)',
      'border-radius:99px', 'padding:5px 12px', 'margin-bottom:14px',
    ].join(';');

    var title = document.createElement('h2');
    title.id = 'ddWipTitle';
    title.textContent = 'Drawing Druid is still being built';
    title.style.cssText = 'font-size:19px;font-weight:800;margin:0 0 10px;line-height:1.3;color:#fff;';

    var body = document.createElement('p');
    body.innerHTML = 'This tool is actively under development. Some constructions, dimensions or ' +
      'wording may contain errors and <strong style="color:#fde047">should not yet be relied on as ' +
      'a finished, checked reference</strong> — always verify against your own textbook, teacher, or ' +
      'the official CAPS/SAGS documentation before using anything here to study or submit work.';
    body.style.cssText = 'font-size:13.5px;line-height:1.7;color:rgba(214,218,235,0.85);margin:0 0 20px;';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'I understand, continue';
    btn.style.cssText = [
      'width:100%', 'font-family:inherit', 'font-size:13.5px', 'font-weight:700', 'padding:12px 18px',
      'border-radius:10px', 'border:1px solid rgba(234,179,8,0.4)', 'background:rgba(234,179,8,0.14)',
      'color:#fde047', 'cursor:pointer', 'transition:background 150ms',
    ].join(';');
    btn.onmouseenter = function () { btn.style.background = 'rgba(234,179,8,0.22)'; };
    btn.onmouseleave = function () { btn.style.background = 'rgba(234,179,8,0.14)'; };
    btn.onclick = function () {
      sessionStorage.setItem(KEY, '1');
      overlay.remove();
    };

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(btn);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    btn.focus();
  }

  if (document.body) inject();
  else document.addEventListener('DOMContentLoaded', inject);
})();
