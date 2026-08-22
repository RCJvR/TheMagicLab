-- ============================================================
-- THE MAGIC LAB — trial period + Curro Durbanville verification
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New
-- query), after supabase-payfast-schema.sql. Safe to re-run.
--
-- Adds two columns to `profiles`:
--   trial_ends_at — when this user's free trial expires. Set to
--     now() + 30 days on signup by default. Existing users (rows that
--     predate this migration) are backfilled to now() + 30 days too,
--     so nobody currently using the site free is locked out the
--     instant this is deployed — they get a fresh 30-day runway to
--     either get CDV-verified or subscribe.
--   cdv_status — 'none' | 'pending' | 'verified' | 'rejected'.
--     A trigger auto-flags 'pending' whenever a user's `school` text
--     looks like Curro Durbanville (case-insensitive, either word
--     order, or the literal "CDV"). Only a human (you, via the
--     Supabase dashboard's Table Editor) can move it to 'verified' —
--     nothing in the app code ever sets 'verified' itself.
--
-- Effective access (computed client-side in auth.js — see
-- hasFullAccess()): package is 'pro'/'school', OR cdv_status is
-- 'verified', OR now() < trial_ends_at. Anyone outside all three gets
-- redirected to pricing.html by require-auth.js.
--
-- SECURITY: a `before insert or update` trigger on `profiles` locks
-- `package`, `trial_ends_at`, and `cdv_status` against being set by an
-- ordinary signed-in user's own REST/SDK calls — those columns can
-- only be changed by server-side code using the service-role key
-- (the payfast-notify Edge Function, or you directly in the SQL
-- editor/Table Editor). The one exception is the school-name match
-- above, which is allowed to flip cdv_status from 'none' to 'pending'
-- (and only that one transition) as a side effect of a normal
-- profile-edit call, since that's the whole point of the feature.
-- Without this trigger, a user could just PATCH their own profile row
-- directly (bypassing every button and page in the app) and grant
-- themselves 'pro' or 'verified' for free.
-- ============================================================

alter table profiles add column if not exists trial_ends_at timestamptz;
alter table profiles add column if not exists cdv_status text not null default 'none'
  check (cdv_status in ('none', 'pending', 'verified', 'rejected'));

-- Backfill: existing users (trial_ends_at still null) get a fresh
-- 30-day trial starting now, per the "start the clock now" decision.
update profiles set trial_ends_at = now() + interval '30 days' where trial_ends_at is null;

create or replace function _profile_privileged_columns_guard() returns trigger
language plpgsql as $$
declare
  is_service   boolean := auth.role() = 'service_role';
  is_cdv_school boolean;
begin
  is_cdv_school := new.school is not null and (
    (lower(new.school) like '%curro%' and lower(new.school) like '%durbanville%')
    or lower(trim(new.school)) = 'cdv'
  );

  if TG_OP = 'INSERT' then
    if not is_service then
      new.package      := coalesce(new.package, 'free');
      if new.package <> 'free' then new.package := 'free'; end if;
      new.trial_ends_at := coalesce(new.trial_ends_at, now() + interval '30 days');
      new.cdv_status    := case when is_cdv_school then 'pending' else 'none' end;
    end if;
    return new;
  end if;

  -- TG_OP = 'UPDATE'
  if not is_service then
    new.package       := old.package;
    new.trial_ends_at := old.trial_ends_at;

    if old.cdv_status = 'none' and is_cdv_school and new.school is distinct from old.school then
      new.cdv_status := 'pending';
    else
      new.cdv_status := old.cdv_status;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_profile_privileged_columns_guard on profiles;
create trigger trg_profile_privileged_columns_guard
  before insert or update on profiles
  for each row execute function _profile_privileged_columns_guard();
