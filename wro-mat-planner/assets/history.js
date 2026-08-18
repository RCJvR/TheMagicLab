// WRO 2026 Game Mat Planner — shared undo/redo history
// A single global stack that tools.js and program.js both push snapshots
// onto, so Ctrl+Z / Ctrl+Y undo whichever module the user last edited
// (drawing a measurement, editing the route, or placing the robot) rather
// than each module tracking its own separate history.
// Exposes: window.WRO_HISTORY

window.WRO_HISTORY = (function() {
  'use strict';

  const undoStack = [];
  const redoStack = [];
  const MAX_ENTRIES = 100;
  let restoring = false; // guards against a restore() call re-triggering snapshot()

  // entry: { label, data, restore }
  // restore(data) must apply `data` and return a snapshot of what the state
  // was immediately before, so that snapshot can be pushed onto the other
  // stack (making the action itself redo/undo-able in turn).
  function snapshot(entry) {
    if (restoring) return;
    undoStack.push(entry);
    if (undoStack.length > MAX_ENTRIES) undoStack.shift();
    redoStack.length = 0;
  }

  function undo() {
    if (!undoStack.length) return;
    const entry = undoStack.pop();
    restoring = true;
    try {
      const inverse = entry.restore(entry.data);
      redoStack.push({ label: entry.label, data: inverse, restore: entry.restore });
    } finally {
      restoring = false;
    }
  }

  function redo() {
    if (!redoStack.length) return;
    const entry = redoStack.pop();
    restoring = true;
    try {
      const inverse = entry.restore(entry.data);
      undoStack.push({ label: entry.label, data: inverse, restore: entry.restore });
    } finally {
      restoring = false;
    }
  }

  document.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const k = e.key.toLowerCase();
    if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
    else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); redo(); }
  });

  return { snapshot, undo, redo };
})();
