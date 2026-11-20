/* ============================================================
   THE MAGIC LAB — Teacher Dashboard › Notebooks tab
   (assets/teacher-notebook-shares.js)

   - "Your notebook": the teacher's own Study Spellbook (Pro/School plans).
   - "Shared with you": pages learners chose to share with one of your
     classes (notebook_shares; see notebook-schema.sql). Opening one goes
     to notebook-view.html, a read-only view with comments.
   The tab button shows how many shared pages are new or changed since you
   last opened them. Spec: docs/notebook-spec.md.
   ============================================================ */
(function () {
  'use strict';
  if (window.MLNotebookShares) return;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sb = () => window.MagicLabAuth && window.MagicLabAuth._supabase && window.MagicLabAuth._supabase();
  const ago = iso => {
    const s = (Date.now() - Date.parse(iso)) / 1000;
    if (s < 60) return 'just now';
    if (s < 3600) return Math.round(s / 60) + ' min ago';
    if (s < 86400) return Math.round(s / 3600) + ' h ago';
    if (s < 7 * 86400) return Math.round(s / 86400) + ' d ago';
    return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  };

  async function fetchShares() {
    const c = sb(); if (!c) return null;
    const { data, error } = await c.rpc('notebook_shared_with_me');
    if (error) { console.warn('[notebook shares]', error); return null; }
    return data || [];
  }

  function setBadge(rows) {
    const b = document.getElementById('nb-tab-badge');
    if (!b) return;
    const n = (rows || []).filter(r => r.unseen).length;
    b.textContent = n;
    b.style.display = n ? '' : 'none';
    b.title = n ? n + ' new or changed' : '';
  }

  function ownNotebookCard() {
    const p = window.MagicLabAuth && window.MagicLabAuth.getProfile && window.MagicLabAuth.getProfile();
    const pro = ['pro', 'school'].includes(p && p.package);
    return `<div class="nbs-own">
      <div>
        <div class="nbs-own-title"><i data-lucide="notebook-pen" aria-hidden="true"></i>Your notebook</div>
        <p>${pro
          ? 'Your own Study Spellbook: lesson notes, planning, anything. It also opens beside any lesson from the Notebook button.'
          : 'Study Spellbook is part of the Pro and School plans.'}</p>
      </div>
      ${pro ? '<a class="btn-primary nbs-btn" href="notebook.html">Open my notebook</a>' : '<a class="btn-primary nbs-btn" href="pricing.html">See plans</a>'}
    </div>`;
  }

  async function load() {
    const panel = document.getElementById('nb-shares-body');
    if (!panel) return;
    panel.innerHTML = ownNotebookCard() + '<p class="nbs-muted">Loading shared pages…</p>';
    window.lucide && window.lucide.createIcons();
    const rows = await fetchShares();
    setBadge(rows);
    let html = ownNotebookCard();
    html += '<div class="section-hdr">Shared with you</div>';
    if (rows == null) {
      html += '<p class="nbs-muted">Shared pages couldn’t load. Please refresh the page.</p>';
    } else if (!rows.length) {
      html += `<p class="nbs-muted">No learner has shared a notebook page with your classes yet. Learners can choose
        <strong>Share with my teacher</strong> on any page of their notebook; it then appears here, and you can read it and comment.
        Notebooks are otherwise private.</p>`;
    } else {
      const byClass = new Map();
      rows.forEach(r => { if (!byClass.has(r.class_id)) byClass.set(r.class_id, { name: r.class_name, items: [] }); byClass.get(r.class_id).items.push(r); });
      [...byClass.values()].sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
        const fresh = c.items.filter(r => r.unseen).length;
        html += `<div class="nbs-class"><h3>${esc(c.name)}<span>${c.items.length} page${c.items.length === 1 ? '' : 's'}${fresh ? ` · <b>${fresh} new</b>` : ''}</span></h3>`;
        html += c.items.map(r => `
          <a class="nbs-row${r.unseen ? ' nbs-new' : ''}" href="notebook-view.html?share=${encodeURIComponent(r.share_id)}">
            <div class="nbs-row-main">
              <div class="nbs-row-title">${esc(r.page_title || 'Untitled page')}</div>
              <div class="nbs-row-meta">
                <span>${esc(r.learner_name)}</span>
                ${r.lesson_title ? `<span>Lesson: ${esc(r.lesson_title)}</span>` : ''}
                ${Number(r.comment_count) ? `<span>${r.comment_count} comment${Number(r.comment_count) === 1 ? '' : 's'}</span>` : ''}
              </div>
            </div>
            ${r.unseen ? `<span class="nbs-pill">${r.seen_at ? 'Updated' : 'New'}</span>` : ''}
            <span class="nbs-when">${esc(ago(r.page_updated_at))}</span>
          </a>`).join('');
        html += '</div>';
      });
    }
    panel.innerHTML = html;
    window.lucide && window.lucide.createIcons();
  }

  // Badge on first load, without waiting for the tab to be opened.
  function boot() {
    const go = () => fetchShares().then(setBadge);
    if (window.MagicLabAuth) go();
    else document.addEventListener('magiclab:auth:ready', go, { once: true });
  }

  window.MLNotebookShares = { load };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
