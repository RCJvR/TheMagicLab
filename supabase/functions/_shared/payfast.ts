// ============================================================
// THE MAGIC LAB — PayFast shared helpers (Edge Functions only)
//
// Signature algorithm verified against PayFast's own reference
// implementation (Payfast/payfast-common, pfValidSignature): fields
// are signed in the exact order they're transmitted — NOT alphabetical
// order — using PHP's urlencode() escaping, with the passphrase (if
// any) appended last before the MD5 hash. As long as a caller signs
// and submits the same ordered field list, this is self-consistent
// with what PayFast recomputes on their end.
// ============================================================

import md5 from "npm:blueimp-md5@2.19.0";

export const PAYFAST_MODE = Deno.env.get("PAYFAST_MODE") ?? "sandbox";
export const PAYFAST_HOST = PAYFAST_MODE === "live" ? "www.payfast.co.za" : "sandbox.payfast.co.za";

// PayFast's own published sandbox test credentials — safe to ship as
// defaults. Override with real secrets (`supabase secrets set
// PAYFAST_MERCHANT_ID=... PAYFAST_MERCHANT_KEY=... PAYFAST_PASSPHRASE=...
// PAYFAST_MODE=live`) before going live.
export const PAYFAST_MERCHANT_ID = Deno.env.get("PAYFAST_MERCHANT_ID") ?? "10000100";
export const PAYFAST_MERCHANT_KEY = Deno.env.get("PAYFAST_MERCHANT_KEY") ?? "46f0cd694581a";
// The shared sandbox account's passphrase is jt7NOE43FZPn (published in
// PayFast's own docs). Subscriptions ALWAYS require passphrase-signed
// requests, so an empty default breaks sandbox checkout with
// "Generated signature does not match submitted signature". In live
// mode there is no safe default — the secret must be set explicitly.
export const PAYFAST_PASSPHRASE = Deno.env.get("PAYFAST_PASSPHRASE") ??
  (PAYFAST_MODE === "live" ? "" : "jt7NOE43FZPn");

// Valid PayFast source hosts, per their own ITN security-check reference
// code. Used for a best-effort source-host check on the notify webhook.
export const PAYFAST_VALID_HOSTS = [
  "www.payfast.co.za",
  "sandbox.payfast.co.za",
  "w1w.payfast.co.za",
  "w2w.payfast.co.za",
];

// Percent-encode exactly the way PHP's urlencode() does: spaces become
// '+', and PHP additionally escapes ! ' ( ) * that encodeURIComponent
// leaves untouched. PayFast's server is PHP and recomputes signatures
// with urlencode(), so any deviation here produces a silent mismatch.
export function phpUrlEncode(value: string): string {
  return encodeURIComponent(value)
    .replace(/[!'()*~]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase())
    .replace(/%20/g, "+");
}

export type OrderedField = [string, string];

export function payfastSignature(orderedFields: OrderedField[], passphrase: string = PAYFAST_PASSPHRASE): string {
  const parts = orderedFields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([k, v]) => `${k}=${phpUrlEncode(String(v).trim())}`);
  let str = parts.join("&");
  // Empty passphrases must be omitted entirely, not signed as ''.
  if (passphrase && passphrase.trim() !== "") {
    str += `&passphrase=${phpUrlEncode(passphrase.trim())}`;
  }
  return md5(str);
}

export function payfastProcessUrl(): string {
  return `https://${PAYFAST_HOST}/eng/process`;
}

export function payfastValidateUrl(): string {
  return `https://${PAYFAST_HOST}/eng/query/validate`;
}
