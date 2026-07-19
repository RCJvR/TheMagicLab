// ============================================================
// THE MAGIC LAB — payfast-create-checkout
//
// Called by the browser (with the signed-in user's access token) when
// they click "Upgrade to Pro". Starts a monthly PayFast subscription:
// records a pending row in `payments`, builds the signed field set for
// a PayFast redirect, and hands it back for the frontend to submit.
//
// This function must be deployed WITH JWT verification on (the
// default) — only signed-in users may call it. Deploy with:
//   supabase functions deploy payfast-create-checkout
// ============================================================

import { createClient } from "npm:@supabase/supabase-js@2";
import { PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, payfastProcessUrl, payfastSignature, type OrderedField } from "../_shared/payfast.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://themagiclab.co.za";

const PRO_PRICE = "45.00";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": SITE_URL,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return json({ error: "Not authenticated" }, 401);

  // Validate the caller's JWT against Supabase Auth — never trust it blindly.
  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: { user }, error: userErr } = await userClient.auth.getUser();
  if (userErr || !user || !user.email) return json({ error: "Not authenticated" }, 401);

  const { data: profile } = await userClient
    .from("profiles")
    .select("display_name, email, package")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.package === "pro" || profile?.package === "school") {
    return json({ error: "You already have full access." }, 400);
  }

  const mPaymentId = `pro-${user.id}-${Date.now()}`;
  const fullName = (profile?.display_name || user.email.split("@")[0]).trim();
  const [nameFirst, ...rest] = fullName.split(/\s+/);
  const nameLast = rest.join(" ") || nameFirst;

  // Insert with the service-role client — this table has no
  // user-facing INSERT policy by design (see supabase-payfast-schema.sql).
  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { error: insertErr } = await admin.from("payments").insert({
    user_id: user.id,
    m_payment_id: mPaymentId,
    package: "pro",
    amount: PRO_PRICE,
    status: "pending",
  });
  if (insertErr) {
    console.error("payments insert failed", insertErr);
    return json({ error: "Could not start checkout" }, 500);
  }

  // Field order here is arbitrary but MUST match the order used to
  // compute the signature below and the order rendered into the HTML
  // form on the frontend — see payment.js.
  const fields: OrderedField[] = [
    ["merchant_id", PAYFAST_MERCHANT_ID],
    ["merchant_key", PAYFAST_MERCHANT_KEY],
    ["return_url", `${SITE_URL}/payment-success.html`],
    ["cancel_url", `${SITE_URL}/payment-cancelled.html`],
    ["notify_url", `${SUPABASE_URL}/functions/v1/payfast-notify`],
    ["name_first", nameFirst],
    ["name_last", nameLast],
    ["email_address", profile?.email || user.email],
    ["m_payment_id", mPaymentId],
    ["amount", PRO_PRICE],
    ["item_name", "The Magic Lab - Pro (Monthly)"],
    ["item_description", "Monthly subscription to The Magic Lab Pro tier"],
    ["subscription_type", "1"],
    ["recurring_amount", PRO_PRICE],
    ["frequency", "3"], // 3 = monthly
    ["cycles", "0"],    // 0 = indefinite, until cancelled
  ];

  const signature = payfastSignature(fields);
  const orderedWithSignature = [...fields, ["signature", signature] as OrderedField];

  return json({
    action: payfastProcessUrl(),
    fields: orderedWithSignature, // array of [key, value] pairs — preserve this order when rendering the form
  });
});
