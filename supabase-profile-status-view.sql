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
-- This view adds one plain-English `account_status` label per user,
-- using the exact same priority order as hasFullAccess() in auth.js:
--   1. package = 'pro'              → 'Pro'      (paying)
--   2. package = 'school'           → 'School'   (paying)
--   3. cdv_status = 'verified'      → 'CDV'      (free, verified)
--   4. trial_ends_at is in the future (or null)  → 'Trial'
--   5. otherwise                    → 'Expired'  (no access)
--
-- It's a VIEW, not a stored column, because step 4 depends on now() —
-- Postgres generated columns must be immutable, so this couldn't be
-- baked into `profiles` directly and stay accurate. A view recomputes
-- on every query, so 'Trial' flips to 'Expired' automatically the
-- moment trial_ends_at passes, with nothing to keep in sync.
--
-- Shows up in Supabase Studio's Table Editor sidebar (under Views)
-- exactly like a table — sortable and filterable on account_status,
-- read-only (writes still go through `profiles` itself).
-- ============================================================

create or replace view profiles_status as
select
  p.*,
  case
    when p.package = 'pro'                                    then 'Pro'
    when p.package = 'school'                                 then 'School'
    when p.cdv_status = 'verified'                             then 'CDV'
    when p.trial_ends_at is null or p.trial_ends_at > now()    then 'Trial'
    else 'Expired'
  end as account_status
from profiles p;
