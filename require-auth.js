// ============================================================
// THE MAGIC LAB — require-auth.js
// Gate for pages that must not be visible to signed-out visitors, and
// (unless opted out) must not be visible once a user's free trial has
// expired and they're neither CDV-verified nor on a paid package.
// Include AFTER auth.js. Pairs with the inline
//   <script>document.documentElement.style.visibility='hidden';</script>
// placed at the very top of <head> on every gated page, so gated
// content never flashes on screen before the auth check resolves —
// this script is the only thing that makes it visible again.
//
// Pages that must stay reachable even to a signed-in user whose trial
// has lapsed (account.html, payment-success.html, payment-cancelled.html
// — they need to see why they're locked out and finish/manage
// checkout) set `window.MLSkipPaywall = true` in an inline <script>
// before this file loads. They still require sign-in either way.
//
// A handful of sample lessons set `window.MLPublicPreview = true` instead.
// Those are open to everyone, signed in or not: the gate reveals the page
// and gets out of the way. auth.js still loads on them, so the nav knows
// who you are and the sign-up prompt at the foot of the lesson works —
// this flag only says "do not send this visitor away".
//
// Lessons set `window.MLLessonPreview = true` (written by
// scripts/seo-build.py). Anyone without full access — a signed-out
// visitor, a search engine, a member whose trial has lapsed — sees the
// lesson's header and its first section, then a panel inviting them to
// sign up (or to upgrade). The rest is marked .ml-paywalled, which is
// also what the page's structured data names as the members-only part,
// the way Google asks paywalled content to be labelled.
// ============================================================

(function () {
  function reveal() {
    document.documentElement.style.visibility = '';
  }

  // A public sample lesson: show it to everyone and skip every redirect
  // below. Revealed immediately rather than waiting on auth, so a
  // signed-out visitor never stares at a blank page while the session
  // check makes its round trips.
  if (window.MLPublicPreview) {
    reveal();
    return;
  }

  if (window.MLLessonPreview) {
    lessonPreview();
    return;
  }

  function lessonPreview() {
    const af = (document.documentElement.lang || '').startsWith('af');
    let marked = false, wall = null;

    // Which elements are members-only. Lessons with a written lesson tab
    // keep its first section (everything before the second heading);
    // interactive lessons keep only their header.
    function markPaywalled() {
      if (marked) return null;
      marked = true;
      const body = document.querySelector('#tab-lesson .lesson-body');
      if (body) {
        const kids = [...body.children];
        let h2s = 0, cut = -1;
        kids.forEach((k, i) => { if (k.tagName === 'H2' && ++h2s === 2 && cut < 0) cut = i; });
        if (cut < 0) cut = Math.max(1, Math.ceil(kids.length / 2));
        kids.slice(cut).forEach(k => k.classList.add('ml-paywalled'));
        document.querySelectorAll('.tabs, .tab-panel:not(#tab-lesson)').forEach(e => e.classList.add('ml-paywalled'));
        return kids[cut - 1] || body;
      }
      const header = document.querySelector('.lesson-header');
      if (!header) return null;
      for (let node = header; node && node !== document.body; node = node.parentElement) {
        for (let n = node.nextElementSibling; n; n = n.nextElementSibling) {
          if (/^(SCRIPT|STYLE|NAV|FOOTER|NOSCRIPT|LINK)$/.test(n.tagName) || n.id === 'ml-main' || n.classList.contains('ml-skip')) continue;
          n.classList.add('ml-paywalled');
        }
      }
      return header;
    }

    function injectStyles() {
      if (document.getElementById('ml-paywall-css')) return;
      const st = document.createElement('style');
      st.id = 'ml-paywall-css';
      st.textContent = `
        .ml-locked .ml-paywalled{display:none!important}
        .ml-locked .ml-toc{display:none!important}
        .ml-wall{max-width:640px;margin:36px auto 72px;padding:28px 26px;text-align:center;
          border:1px solid rgba(255,255,255,.14);border-radius:16px;background:rgba(255,255,255,.035);
          font-family:inherit}
        .ml-wall .w-eyebrow{margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.11em;
          text-transform:uppercase;color:rgba(226,232,240,.55)}
        .ml-wall .w-title{margin:0 0 10px;font-size:23px;font-weight:800;letter-spacing:-.02em;
          color:#e3e8ef;line-height:1.2}
        .ml-wall .w-body{margin:0 auto 20px;max-width:48ch;font-size:14.5px;line-height:1.65;
          color:rgba(226,232,240,.75)}
        .ml-wall .w-btn{display:inline-block;padding:12px 22px;border-radius:10px;background:#f5f7fa;
          color:#08090b;font-weight:700;font-size:14.5px;text-decoration:none}
        .ml-wall .w-alt{display:block;margin-top:14px;font-size:13px;color:rgba(226,232,240,.6)}
        .ml-wall ul{list-style:none;margin:0 auto 22px;padding:0;max-width:40ch;text-align:left;
          font-size:14px;line-height:1.9;color:rgba(226,232,240,.78)}
        .ml-wall li::before{content:"✓  ";color:#4ade80;font-weight:800}`;
      document.head.appendChild(st);
    }

    function wallHtml(kind) {
      const next = encodeURIComponent(location.pathname + location.search);
      if (kind === 'upgrade') {
        return af
          ? `<p class="w-eyebrow">Jou proeftydperk is verby</p><p class="w-title">Kry weer volle toegang.</p>
             <p class="w-body">Kies ’n plan om die res van hierdie les, die simulasies en die oefenvrae oop te maak.</p>
             <a class="w-btn" href="/pricing.html?trial=expired">Sien die planne</a>`
          : `<p class="w-eyebrow">Your free trial has ended</p><p class="w-title">Pick up where you left off.</p>
             <p class="w-body">Choose a plan to open the rest of this lesson, the simulations and the practice questions.</p>
             <a class="w-btn" href="/pricing.html?trial=expired">See plans</a>`;
      }
      return af
        ? `<p class="w-eyebrow">Hou aan lees</p><p class="w-title">Die res van hierdie les is vir lede.</p>
           <ul><li>Die volledige les, in Engels en Afrikaans</li><li>Interaktiewe simulasies</li><li>Oefenvrae en ’n werkboek</li></ul>
           <a class="w-btn" href="/index.html?auth=required&next=${next}" data-ml-wall="signup">Skep ’n gratis rekening</a>
           <a class="w-alt" href="/index.html?auth=required&next=${next}" data-ml-wall="signin">Het jy reeds ’n rekening? Teken in</a>`
        : `<p class="w-eyebrow">Keep going</p><p class="w-title">The rest of this lesson is for members.</p>
           <ul><li>The full lesson, in English and Afrikaans</li><li>Interactive simulations</li><li>Practice questions and a workbook</li></ul>
           <a class="w-btn" href="/index.html?auth=required&next=${next}" data-ml-wall="signup">Create a free account</a>
           <a class="w-alt" href="/index.html?auth=required&next=${next}" data-ml-wall="signin">Already have an account? Sign in</a>`;
    }

    function lock(kind) {
      injectStyles();
      const anchor = markPaywalled();
      document.documentElement.classList.add('ml-locked');
      if (!wall) {
        wall = document.createElement('aside');
        wall.className = 'ml-wall';
        // the sign-in modal when the page has it, the homepage's sign-in otherwise
        wall.addEventListener('click', (e) => {
          const a = e.target.closest('[data-ml-wall]');
          if (a && window.MagicLabModal) { e.preventDefault(); window.MagicLabModal.open(a.dataset.mlWall); }
        });
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(wall, anchor.nextSibling);
        else document.body.appendChild(wall);
      }
      wall.innerHTML = wallHtml(kind);
      reveal();
    }

    function unlock() {
      document.documentElement.classList.remove('ml-locked');
      if (wall) { wall.remove(); wall = null; }
      reveal();
    }

    function onAuth(profile) {
      if (!profile) lock('signup');
      else if (!window.MagicLabAuth.hasFullAccess()) lock('upgrade');
      else unlock();
    }

    // No stored session (a first visit, a search engine): show the preview
    // straight away rather than a blank page while auth makes its round
    // trips. With a session, wait for auth so members never see the panel.
    let hasSession = false;
    try { hasSession = Object.keys(localStorage).some(k => /^sb-.+-auth-token$/.test(k)); } catch (e) {}
    if (!hasSession) lock('signup');

    let resolved = false;
    document.addEventListener('magiclab:auth:ready', (e) => { resolved = true; onAuth(e.detail.profile); });
    document.addEventListener('magiclab:auth:change', (e) => onAuth(e.detail.profile));
    (function poll(waited) {
      if (resolved) return;
      if (window.MagicLabAuth && window.MagicLabAuth.getProfile && waited >= 1500) { onAuth(window.MagicLabAuth.getProfile()); return; }
      if (waited >= 20000) { lock('signup'); return; }
      setTimeout(() => poll(waited + 500), 500);
    })(0);
  }

  function redirectToSignIn() {
    const next = encodeURIComponent(location.pathname + location.search);
    location.replace('/index.html?auth=required&next=' + next);
  }

  function redirectToPricing() {
    location.replace('/pricing.html?trial=expired');
  }

  function onAuthResolved(profile) {
    if (!profile) { redirectToSignIn(); return; }
    if (!window.MLSkipPaywall && !window.MagicLabAuth.hasFullAccess()) { redirectToPricing(); return; }
    reveal();
  }

  let resolved = false;
  document.addEventListener('magiclab:auth:ready', (e) => { resolved = true; onAuthResolved(e.detail.profile); });

  // Signed out (or trial-expired) while already on a gated page (e.g.
  // clicked "Sign out" in another tab) — kick them out immediately
  // rather than leaving stale content on screen.
  document.addEventListener('magiclab:auth:change', (e) => {
    if (!e.detail.profile) { redirectToSignIn(); return; }
    if (!window.MLSkipPaywall && !window.MagicLabAuth.hasFullAccess()) redirectToPricing();
  });

  // Safety net: if auth.js fails to load entirely (CDN hiccup, offline,
  // etc.) the 'ready' event never fires and the page would stay hidden
  // forever. auth.js's own init chain — load the Supabase script from its
  // CDN, restore the session, fetch the profile row — is several network
  // round trips, which can genuinely take longer than a few seconds on a
  // slow/cold mobile connection (first visit, nothing cached yet). Treating
  // "hasn't finished initializing" the same as "not logged in" was bouncing
  // real signed-in users to the sign-in page on exactly that kind of load —
  // so poll instead of assuming failure at a fixed short timeout, and only
  // give up once window.MagicLabAuth genuinely never shows up.
  (function pollFallback(waited) {
    if (resolved) return;
    if (window.MagicLabAuth) { onAuthResolved(window.MagicLabAuth.getProfile()); return; }
    if (waited >= 20000) { redirectToSignIn(); return; }
    setTimeout(() => pollFallback(waited + 500), 500);
  })(0);
})();
