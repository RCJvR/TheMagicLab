// ============================================================
// THE MAGIC LAB — payment.js
// PayFast checkout helper. Include AFTER auth.js on any page with an
// upgrade button.
//
// Usage:
//   const result = await window.MagicLabPayments.upgrade();
//   if (result.error) { ...show result.error... }
//   // on success the browser is already being redirected to PayFast
// ============================================================

(function () {
  async function upgrade() {
    const auth = window.MagicLabAuth;
    if (!auth?.isLoggedIn()) {
      window.MagicLabModal?.open('signin');
      return { error: 'Please sign in first.' };
    }

    const client = auth._supabase();
    const { data: { session } } = await client.auth.getSession();
    if (!session) return { error: 'Please sign in first.' };

    // Reuse the already-configured client's own URL/key rather than
    // duplicating those constants here — keeps this file in sync with
    // auth.js automatically instead of risking drift between copies.
    const supabaseUrl = client.supabaseUrl;
    const supabaseKey = client.supabaseKey;

    let resp;
    try {
      resp = await fetch(`${supabaseUrl}/functions/v1/payfast-create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': supabaseKey,
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      return { error: 'Could not reach checkout — check your connection and try again.' };
    }

    const body = await resp.json().catch(() => null);
    if (!resp.ok || !body?.fields) {
      return { error: body?.error || 'Could not start checkout. Please try again.' };
    }

    _submitToPayFast(body.action, body.fields);
    return { ok: true };
  }

  // `fields` is an array of [key, value] pairs in the exact order the
  // server signed them when computing `signature` — that order must be
  // preserved in the submitted form, since PayFast recomputes the
  // signature from the fields as received.
  function _submitToPayFast(action, fields) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    form.style.display = 'none';
    fields.forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  }

  window.MagicLabPayments = { upgrade };
})();
