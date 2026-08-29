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
// ============================================================

(function () {
  function reveal() {
    document.documentElement.style.visibility = '';
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
