-- ============================================================
-- THE MAGIC LAB — broaden CDV auto-flagging to any Durbanville school
-- Run this once in the Supabase SQL editor, after
-- supabase-admin-cdv-functions.sql. Safe to re-run.
--
-- Previously a typed `school` only auto-flagged cdv_status = 'pending'
-- if it contained BOTH "curro" and "durbanville" (or was exactly
-- "cdv"). Loosened to match any mention of "Durbanville" at all —
-- so "Durbanville Preparatory", "D.F. Malan High School, Durbanville",
-- etc. now flag too, not just the literal Curro Durbanville campus.
-- The exact-"cdv" branch is unchanged.
--
-- Note this does widen who lands in your Pending queue beyond Curro
-- Durbanville specifically — you're still the only one who can move a
-- row to 'verified' (admin_set_cdv_status), so this only changes who
-- shows up for you to look at, not who gets auto-approved.
--
-- PART 1 — the trigger itself (governs future inserts/updates).
-- PART 2 — one-time backfill for accounts that already exist: the
-- trigger only fires on insert/update, so an existing profile whose
-- school already mentions Durbanville (but wasn't Curro Durbanville)
-- would otherwise sit at cdv_status = 'none' forever unless the user
-- happens to edit their school field again.
-- ============================================================

-- --- Part 1: broadened trigger function -----------------------------

create or replace function _profile_privileged_columns_guard() returns trigger
language plpgsql as $$
declare
  is_privileged boolean := (coalesce(auth.role(), 'service_role') <> 'authenticated'
                           and coalesce(auth.role(), 'service_role') <> 'anon')
                           or coalesce(current_setting('magiclab.admin_override', true), '') = 'on';
  is_cdv_school boolean;
begin
  is_cdv_school := new.school is not null and (
    lower(new.school) like '%durbanville%'
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

drop trigger if exists trg_profile_privileged_columns_guard on profiles;
create trigger trg_profile_privileged_columns_guard
  before insert or update on profiles
  for each row execute function _profile_privileged_columns_guard();

-- --- Part 2: backfill existing accounts -----------------------------
-- Only touches rows still at 'none' whose school already mentions
-- Durbanville — never overrides an existing pending/verified/rejected
-- decision, and never touches rows the trigger wouldn't itself flag.

update profiles
set cdv_status = 'pending'
where cdv_status = 'none'
  and school is not null
  and lower(school) like '%durbanville%';
