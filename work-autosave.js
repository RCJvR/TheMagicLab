// ============================================================
// THE MAGIC LAB — work-autosave.js
// Generic "autosave last work state and restore it on page load"
// engine, factored out of the pattern first built for Model Mage.
// Each tool supplies how to read/write its own state; this module
// handles the localStorage plumbing, debouncing, and the dismissible
// restore toast. No login required — this is per-browser, like the
// tool's own Save-to-file feature, just automatic.
// ============================================================

window.WorkAutosave = {
  // opts:
  //   key         — short tool id, e.g. 'java-genie'. Storage key becomes
  //                 'magiclab-<key>-autosave'.
  //   debounceMs  — default 800, matches Model Mage.
  //   getState()  — returns a JSON-serializable object describing the
  //                 current work, or null/undefined to skip a save.
  //   hasContent(data) — given a parsed autosave payload, return true if
  //                 it represents real work worth restoring (not just an
  //                 untouched blank canvas).
  //   restore(data)    — apply a validated payload back into the tool's
  //                 live state (set editor value, rebuild workspace, ...).
  //   discard()   — reset the tool back to its normal blank/default state,
  //                 called when the learner clicks "Start fresh".
  //   toastLabel  — text shown next to the restore toast's icon.
  init(opts) {
    const STORAGE_KEY = 'magiclab-' + opts.key + '-autosave';
    const debounceMs  = opts.debounceMs ?? 800;
    let timer = null;

    function doSave() {
      try {
        const state = opts.getState();
        if (state == null) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.assign({ savedAt: Date.now() }, state)));
      } catch (e) { /* storage full or blocked — autosave is best-effort */ }
    }

    function scheduleAutosave() {
      clearTimeout(timer);
      timer = setTimeout(doSave, debounceMs);
    }

    window.addEventListener('beforeunload', doSave);

    function tryRestore() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (!opts.hasContent(data)) return false;
        opts.restore(data);
        return true;
      } catch (e) { return false; }
    }

    function discardAndFresh() {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      opts.discard?.();
      document.getElementById('wa-restore-toast')?.remove();
    }

    function showToast() {
      document.getElementById('wa-restore-toast')?.remove();
      const t = document.createElement('div');
      t.id = 'wa-restore-toast';
      t.style.cssText =
        'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9000;' +
        'display:flex;align-items:center;gap:12px;padding:10px 16px;border-radius:12px;' +
        'background:#141a33;border:1px solid rgba(124,109,250,0.40);color:#e4e8f8;' +
        'font-family:system-ui,sans-serif;font-size:13px;box-shadow:0 12px 40px rgba(0,0,0,0.5);';
      t.innerHTML = '↩︎ ' + (opts.toastLabel || 'Restored your last work') +
        '<button id="wa-restore-fresh" style="padding:5px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.18);' +
        'background:rgba(255,255,255,0.07);color:#e4e8f8;font-size:12px;font-weight:600;cursor:pointer;">Start fresh</button>' +
        '<button id="wa-restore-close" style="background:none;border:none;color:rgba(228,232,248,0.5);cursor:pointer;font-size:14px;padding:0 2px;">✕</button>';
      document.body.appendChild(t);
      document.getElementById('wa-restore-fresh').addEventListener('click', discardAndFresh);
      document.getElementById('wa-restore-close').addEventListener('click', () => t.remove());
      setTimeout(() => t.remove(), 12000);
    }

    return { scheduleAutosave, tryRestore, showToast, discardAndFresh };
  }
};
