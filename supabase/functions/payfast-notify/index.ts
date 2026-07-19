// ============================================================
// THE MAGIC LAB — payfast-notify
//
// PayFast's server posts here (the `notify_url`) after every payment
// event on a subscription — not just the first one. This is the ONLY
// source of truth for granting/revoking `profiles.package`; the
// browser return_url page never grants access itself, it just polls
// until this function has done its job.
//
// Security model (per PayFast's own documented ITN checks):
//   1. Recompute the signature from the received fields and compare —
//      logged, not solely relied on (see note below).
//   2. Mandatory server-to-server "validate" round trip back to
//      PayFast — this is the authoritative check. Even if step 1 had a
//      subtle encoding bug, this call independently confirms with
//      PayFast's own server that the data is genuine and unaltered.
//   3. merchant_id must match ours.
//   4. amount_gross must match the amount we recorded at checkout.
//   5. Best-effort source-host check (logged, not hard-enforced — see
//      note below).
//   6. Idempotent by pf_payment_id / m_payment_id so retried ITNs
//      (PayFast retries on non-200) never double-apply.
//
// MUST be deployed WITHOUT JWT verification — PayFast is not a signed-in
// Supabase user:
//   supabase functions deploy payfast-notify --no-verify-jwt
// ============================================================

import { createClient } from "npm:@supabase/supabase-js@2";
import {
  PAYFAST_MERCHANT_ID,
  PAYFAST_VALID_HOSTS,
  payfastSignature,
  payfastValidateUrl,
  type OrderedField,
} from "../_shared/payfast.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const rawBody = await req.text();
  const params = new URLSearchParams(rawBody); // preserves field order as received

  const receivedSignature = params.get("signature") ?? "";
  const orderedFields: OrderedField[] = [];
  for (const [k, v] of params) {
    if (k === "signature") continue;
    orderedFields.push([k, v]);
  }

  // Step 1 — local signature check. Logged for visibility; the
  // decisive check is the validate() round trip in step 2, so a false
  // negative here (e.g. from an encoding edge case) can't lock out a
  // genuine payment.
  const localSignature = payfastSignature(orderedFields);
  if (localSignature !== receivedSignature) {
    console.warn("payfast-notify: local signature mismatch", { localSignature, receivedSignature });
  }

  // Step 2 — mandatory server-to-server confirmation. This is what
  // actually proves the request came from PayFast and wasn't tampered
  // with; nothing below runs on trust in step 1 alone.
  let validated = false;
  try {
    const resp = await fetch(payfastValidateUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: rawBody,
    });
    const text = (await resp.text()).trim();
    validated = text.toUpperCase() === "VALID";
    if (!validated) console.error("payfast-notify: validate() returned", text);
  } catch (e) {
    console.error("payfast-notify: validate() request failed", e);
  }
  if (!validated) return new Response("invalid", { status: 400 });

  // Step 3 — merchant_id must be ours.
  if (params.get("merchant_id") !== PAYFAST_MERCHANT_ID) {
    console.error("payfast-notify: merchant_id mismatch", params.get("merchant_id"));
    return new Response("invalid merchant", { status: 400 });
  }

  // Step 5 (best-effort, logged only) — confirm the request's source
  // resolves to one of PayFast's published hosts. Not hard-enforced:
  // forwarded-IP headers through serverless proxies are not reliable
  // enough to safely reject on, and step 2 already proves authenticity.
  try {
    const forwardedFor = req.headers.get("x-forwarded-for") ?? "";
    const sourceIp = forwardedFor.split(",")[0].trim();
    if (sourceIp) {
      const validIps = new Set<string>();
      for (const host of PAYFAST_VALID_HOSTS) {
        try {
          const records = await Deno.resolveDns(host, "A");
          records.forEach((ip) => validIps.add(ip));
        } catch { /* DNS lookup failure — skip this host */ }
      }
      if (!validIps.has(sourceIp)) {
        console.warn("payfast-notify: source IP not in PayFast's published ranges", sourceIp);
      }
    }
  } catch (e) {
    console.warn("payfast-notify: source-host check skipped", e);
  }

  const mPaymentId = params.get("m_payment_id") ?? "";
  const pfPaymentId = params.get("pf_payment_id") ?? "";
  const paymentStatus = (params.get("payment_status") ?? "").toUpperCase();
  const amountGross = parseFloat(params.get("amount_gross") ?? "0");
  const token = params.get("token") ?? null;

  if (!mPaymentId) return new Response("missing m_payment_id", { status: 400 });

  const { data: payment, error: fetchErr } = await admin
    .from("payments")
    .select("*")
    .eq("m_payment_id", mPaymentId)
    .maybeSingle();

  if (fetchErr || !payment) {
    console.error("payfast-notify: unknown m_payment_id", mPaymentId, fetchErr);
    return new Response("unknown payment", { status: 400 });
  }

  // Step 4 — amount must match what we recorded at checkout time.
  if (Math.abs(amountGross - Number(payment.amount)) > 0.01) {
    console.error("payfast-notify: amount mismatch", { expected: payment.amount, got: amountGross });
    return new Response("amount mismatch", { status: 400 });
  }

  // Idempotency — a retried or duplicate ITN for an already-settled
  // payment is a no-op, not a re-apply.
  if (payment.status === "complete" && payment.pf_payment_id === pfPaymentId) {
    return new Response("OK", { status: 200 });
  }

  let newStatus: "complete" | "cancelled" | "failed" | "pending" = "pending";
  if (paymentStatus === "COMPLETE") newStatus = "complete";
  else if (paymentStatus === "CANCELLED") newStatus = "cancelled";
  else if (paymentStatus === "FAILED") newStatus = "failed";

  await admin
    .from("payments")
    .update({ pf_payment_id: pfPaymentId, token, status: newStatus })
    .eq("m_payment_id", mPaymentId);

  if (newStatus === "complete") {
    await admin.from("profiles").update({ package: payment.package }).eq("id", payment.user_id);
  } else if (newStatus === "cancelled") {
    // Subscription cancelled — drop back to the free tier.
    await admin.from("profiles").update({ package: "free" }).eq("id", payment.user_id);
  }

  return new Response("OK", { status: 200 });
});
