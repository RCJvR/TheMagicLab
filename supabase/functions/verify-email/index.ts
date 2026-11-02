// ============================================================
// THE MAGIC LAB — verify-email
//
// Two jobs, both over Titan's SMTP from the admin mailbox:
//  1. The admin's "Also email them" on a teacher-verification message:
//     sends it to the applicant's address. Admin only.
//  2. { action: "notify-admin" }: an applicant with a pending request has just
//     replied in the chat, so tell the admin by email. Allowed for that
//     applicant only, and only once per 10 minutes, so it cannot be used to
//     send mail anywhere else or to flood the inbox.
//
// Secrets (Supabase > Edge Functions > Secrets):
//   TITAN_SMTP_USER   the mailbox, e.g. ruhan@themagiclab.co.za
//   TITAN_SMTP_PASS   that mailbox's password
// Deploy WITH JWT verification on:
//   supabase functions deploy verify-email
// ============================================================

import { createClient } from "npm:@supabase/supabase-js@2";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://themagiclab.co.za";
const SMTP_USER = Deno.env.get("TITAN_SMTP_USER") ?? "ruhan@themagiclab.co.za";
const SMTP_PASS = Deno.env.get("TITAN_SMTP_PASS");
const ADMIN_ID = "31a201b0-f426-455a-973a-b1862001b748"; // same admin as supabase-profile-role-guard.sql

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": SITE_URL,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
}
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return json({ error: "Not authenticated" }, 401);
  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: authHeader } } });
  const { data: { user }, error: userErr } = await userClient.auth.getUser();
  if (userErr || !user) return json({ error: "Not authenticated" }, 401);
  if (!SMTP_PASS) return json({ error: "TITAN_SMTP_PASS is not set" }, 500);

  let payload: { user_id?: string; body?: string; action?: string };
  try { payload = await req.json(); } catch { return json({ error: "Bad request" }, 400); }

  if (user.id !== ADMIN_ID) {
    if (payload.action !== "notify-admin") return json({ error: "Not authorized" }, 403);
    const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: me } = await db.from("profiles").select("email, display_name, teacher_request").eq("id", user.id).maybeSingle();
    if (me?.teacher_request !== "pending") return json({ sent: false });
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: recent } = await db.from("verify_messages").select("body, created_at").eq("user_id", user.id).eq("sender_id", user.id)
      .gte("created_at", since).order("created_at", { ascending: false });
    if (!recent || recent.length !== 1) return json({ sent: false }); // none, or already notified for this burst
    const who = `${me.display_name ?? "An applicant"} <${me.email}>`;
    const mail = new SMTPClient({ connection: { hostname: "smtp.titan.email", port: 465, tls: true, auth: { username: SMTP_USER, password: SMTP_PASS } } });
    try {
      await mail.send({ from: `The Magic Lab <${SMTP_USER}>`, to: SMTP_USER, subject: `Teacher request reply from ${me.display_name ?? me.email}`,
        content: `${who} replied:\n\n${recent[0].body}\n\nOpen the Teacher Requests tab to answer:\n${SITE_URL}/admin.html` });
    } catch (e) {
      return json({ error: "The email could not be sent: " + (e as Error).message }, 502);
    } finally {
      try { await mail.close(); } catch { /* ignore */ }
    }
    return json({ sent: true });
  }
  const body = String(payload.body ?? "").trim();
  if (!payload.user_id || !body || body.length > 2000) return json({ error: "Bad request" }, 400);

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: p } = await admin.from("profiles").select("email, display_name").eq("id", payload.user_id).maybeSingle();
  if (!p?.email) return json({ error: "No email address for that user" }, 404);

  const link = `${SITE_URL}/dashboard-teacher.html`;
  const text = `Hi ${p.display_name ?? ""},\n\n${body}\n\nTo reply, sign in and open your teacher dashboard:\n${link}\n\nThe Magic Lab`;
  const html = `<p>Hi ${esc(p.display_name ?? "")},</p><p style="white-space:pre-wrap">${esc(body)}</p>` +
    `<p>To reply, <a href="${link}">sign in and open your teacher dashboard</a>.</p><p>The Magic Lab</p>`;

  const client = new SMTPClient({
    connection: { hostname: "smtp.titan.email", port: 465, tls: true, auth: { username: SMTP_USER, password: SMTP_PASS } },
  });
  try {
    await client.send({ from: `The Magic Lab <${SMTP_USER}>`, to: p.email, replyTo: SMTP_USER, subject: "Your Magic Lab teacher account", content: text, html });
  } catch (e) {
    return json({ error: "The email could not be sent: " + (e as Error).message }, 502);
  } finally {
    try { await client.close(); } catch { /* ignore */ }
  }
  return json({ sent: true });
});
