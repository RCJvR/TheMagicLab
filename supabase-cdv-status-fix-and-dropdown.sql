-- ============================================================
-- THE MAGIC LAB — fix CDV verification + give cdv_status a dropdown
-- Run this once in the Supabase SQL editor, after
-- supabase-trial-cdv-schema.sql. Safe to re-run.
--
-- PART 1 — bug fix: Table Editor edits to cdv_status were being
-- silently reverted.
--
-- _profile_privileged_columns_guard (from supabase-trial-cdv-schema.sql)
-- was meant to let YOU change cdv_status to 'verified' via the Supabase
-- dashboard's Table Editor/SQL Editor — that's stated directly in that
-- file's own header comment. But its check was:
--     is_service := coalesce(auth.role(), '') = 'service_role'
-- auth.role() reads a session variable that ONLY PostgREST sets, from
-- the request's JWT. The Table Editor and SQL Editor talk to Postgres
-- directly, with no PostgREST/JWT in the picture at all — so
-- auth.role() there is SQL NULL, coalesce(...) collapses that to '',
-- and the check fails. The trigger then falls into its "not privileged"
-- branch and does `new.cdv_status := old.cdv_status`, silently
-- discarding whatever you just typed in — which is exactly the
-- "I don't seem to be able to change the status" symptom.
--
-- The fix flips which side of the NULL the benefit of the doubt goes
-- to. The only channel that actually needs locking out here is a
-- regular signed-in user hitting their own row through the public
-- PostgREST API — and that always arrives with role = 'authenticated'
-- (or 'anon' if somehow unauthenticated). Anyone with Postgres access
-- via the dashboard (Table Editor, SQL Editor) or the service-role key
-- already has full run of the database regardless of this trigger, so
-- there's no security given up by trusting that channel — only a bug
-- fixed.
--
-- PART 2 — cdv_status becomes a native Postgres enum, so the Supabase
-- Table Editor renders it as a dropdown/combo box instead of a free-text
-- cell (the same treatment `package` could get too, if you want it —
-- ask and I'll add it).
-- ============================================================

-- --- Part 2 first: convert cdv_status to an enum type -------------

do $$ begin
  create type cdv_status_enum as enum ('none', 'pending', 'verified', 'rejected');
exception when duplicate_object then null;
end $$;

alter table profiles
  alter column cdv_status drop default;

alter table profiles drop constraint if exists profiles_cdv_status_check;

alter table profiles
  alter column cdv_status type cdv_status_enum using cdv_status::cdv_status_enum,
  alter column cdv_status set default 'none'::cdv_status_enum;

-- --- Part 1: corrected trigger function ----------------------------

create or replace function _profile_privileged_columns_guard() returns trigger
language plpgsql as $$
declare
  -- Trusted here means "not a regular signed-in app user coming
  -- through the public PostgREST API." Those requests always set
  -- auth.role() to 'authenticated' (or 'anon'). Anything else —
  -- including a NULL role, which is what the Table Editor, SQL
  -- Editor, and direct service-role-key calls all present as —
  -- already has full database access via other means, so treating it
  -- as trusted here fixes the dashboard-edit bug without opening any
  -- new hole for ordinary users.
  is_privileged boolean := coalesce(auth.role(), 'service_role') <> 'authenticated'
                           and coalesce(auth.role(), 'service_role') <> 'anon';
  is_cdv_school boolean;
begin
  is_cdv_school := new.school is not null and (
    (lower(new.school) like '%curro%' and lower(new.school) like '%durbanville%')
    or lower(trim(new.school)) = 'cdv'
  );

  if TG_OP = 'INSERT' then
    if not is_privileged then
      new.package      := coalesce(new.package, 'free');
      if new.package <> 'free' then new.package := 'free'; end if;
      new.trial_ends_at := coalesce(new.trial_ends_at, now() + interval '30 days');
      new.cdv_status    := case when is_cdv_school then 'pending' else 'none' end;
    end if;
    return new;
  end if;

  -- TG_OP = 'UPDATE'
  if not is_privileged then
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

-- Trigger itself is unchanged (same name, same timing) — recreating
-- the function body above is enough, but re-running this is harmless.
drop trigger if exists trg_profile_privileged_columns_guard on profiles;
create trigger trg_profile_privileged_columns_guard
  before insert or update on profiles
  for each row execute function _profile_privileged_columns_guard();
