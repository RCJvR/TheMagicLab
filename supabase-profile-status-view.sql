-- ============================================================
-- THE MAGIC LAB — profile status view (Trial / Pro / School / CDV)
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New
-- query), after supabase-trial-cdv-schema.sql. Safe to re-run.
--
-- Browsing the raw `profiles` table doesn't make it obvious at a
-- glance who's actually paying vs. on a trial vs. verified for free
-- via Curro Durbanville — you'd have to remember to cross-reference
-- `package`, `cdv_status` and `trial_ends_at` yourself every time.
--
-- This view adds two columns per user:
--
--   account_status — one plain-English label, using the exact same
--   priority order as hasFullAccess() in auth.js:
--     1. package = 'pro'              → 'Pro'      (paying)
--     2. package = 'school'           → 'School'   (paying)
--     3. cdv_status = 'verified'      → 'CDV'      (free, verified)
--     4. trial_ends_at in the future (or null)     → 'Trial'
--     5. otherwise                    → 'Expired'  (no access)
--
--   trial_days_left — whole days remaining on the free trial. NULL for
--   anyone a trial doesn't apply to (paying or CDV-verified), and
--   negative once lapsed, so -3 reads as "ended 3 days ago". Sort the
--   column ascending in the Table Editor to see who runs out first.
--
-- It's a VIEW, not stored columns, because both depend on now() —
-- Postgres generated columns must be immutable, so this couldn't be
-- baked into `profiles` directly and stay accurate. A view recomputes
-- on every query, so the countdown ticks down on its own and 'Trial'
-- flips to 'Expired' automatically, with nothing to keep in sync.
--
-- Shows up in Supabase Studio's Table Editor sidebar (under Views)
-- exactly like a table — sortable and filterable, read-only (writes
-- still go through `profiles` itself).
--
-- SECURITY — two things matter here, and the original version of this
-- file got both wrong:
--
--   1. `security_invoker = true`. Without it a view runs with its
--      OWNER's privileges, which bypasses row-level security on the
--      underlying table entirely. `profiles` has RLS precisely so one
--      learner can't read another's row — a definer-rights view over
--      it hands out exactly what RLS was there to prevent.
--
--   2. The grants. Supabase gives `anon` and `authenticated` blanket
--      privileges on new objects in `public`, and `anon` is the key
--      embedded in the site's own JavaScript — i.e. public. Combined
--      with (1), every learner's name, email, school and grade was
--      readable by anyone at /rest/v1/profiles_status. This view is an
--      admin reporting tool that no app code reads, so the fix is to
--      take those grants away rather than to rely on RLS alone.
--
-- Note this is a DROP + CREATE, not CREATE OR REPLACE: replacing a
-- view can only append columns, and `profiles` has gained columns
-- since this view was first written, so `p.*` no longer lines up.
-- ============================================================

drop view if exists public.profiles_status;

create view public.profiles_status
with (security_invoker = true) as
select
  p.*,
  case
    when p.package = 'pro'                                  then 'Pro'
    when p.package = 'school'                               then 'School'
    when p.cdv_status::text = 'verified'                    then 'CDV'
    when p.trial_ends_at is null or p.trial_ends_at > now() then 'Trial'
    else 'Expired'
  end as account_status,
  case
    when p.package in ('pro', 'school')   then null
    when p.cdv_status::text = 'verified'  then null
    when p.trial_ends_at is null          then null
    else ceil(extract(epoch from (p.trial_ends_at - now())) / 86400)::int
  end as trial_days_left
from profiles p;

revoke all on public.profiles_status from anon, authenticated;
grant select on public.profiles_status to service_role;
