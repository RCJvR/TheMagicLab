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

  document.addEventListener('magiclab:auth:ready', (e) => onAuthResolved(e.detail.profile));

  // Signed out (or trial-expired) while already on a gated page (e.g.
  // clicked "Sign out" in another tab) — kick them out immediately
  // rather than leaving stale content on screen.
  document.addEventListener('magiclab:auth:change', (e) => {
    if (!e.detail.profile) { redirectToSignIn(); return; }
    if (!window.MLSkipPaywall && !window.MagicLabAuth.hasFullAccess()) redirectToPricing();
  });

  // Safety net: if auth.js fails to load (CDN hiccup, offline, etc.)
  // the 'ready' event never fires and the page would stay hidden
  // forever. Fall back to a hard check after a few seconds.
  setTimeout(() => {
    if (!window.MagicLabAuth?.isLoggedIn()) { redirectToSignIn(); return; }
    if (!window.MLSkipPaywall && !window.MagicLabAuth.hasFullAccess()) { redirectToPricing(); return; }
    reveal();
  }, 6000);
})();
