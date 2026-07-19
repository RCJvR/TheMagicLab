// ============================================================
// THE MAGIC LAB — require-auth.js
// Gate for pages that must not be visible to signed-out visitors.
// Include AFTER auth.js. Pairs with the inline
//   <script>document.documentElement.style.visibility='hidden';</script>
// placed at the very top of <head> on every gated page, so gated
// content never flashes on screen before the auth check resolves —
// this script is the only thing that makes it visible again.
// ============================================================

(function () {
  function reveal() {
    document.documentElement.style.visibility = '';
  }

  function redirectToSignIn() {
    const next = encodeURIComponent(location.pathname + location.search);
    location.replace('/index.html?auth=required&next=' + next);
  }

  function onAuthResolved(profile) {
    if (profile) reveal();
    else redirectToSignIn();
  }

  document.addEventListener('magiclab:auth:ready', (e) => onAuthResolved(e.detail.profile));

  // Signed out while already on a gated page (e.g. clicked "Sign out"
  // in another tab) — kick them out immediately rather than leaving
  // stale content on screen.
  document.addEventListener('magiclab:auth:change', (e) => {
    if (!e.detail.profile) redirectToSignIn();
  });

  // Safety net: if auth.js fails to load (CDN hiccup, offline, etc.)
  // the 'ready' event never fires and the page would stay hidden
  // forever. Fall back to a hard check after a few seconds.
  setTimeout(() => {
    if (window.MagicLabAuth?.isLoggedIn()) reveal();
    else redirectToSignIn();
  }, 6000);
})();
