-- ============================================================
-- THE MAGIC LAB — admin CDV verification functions
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New
-- query), after supabase-cdv-status-fix-and-dropdown.sql. Safe to re-run.
--
-- Lets admin.html show the list of learners/teachers whose typed-in
-- school looks like Curro Durbanville (cdv_status = 'pending') and
-- approve/reject them with a button click, instead of you hand-editing
-- rows in the Supabase Table Editor every time.
--
-- SECURITY MODEL — read this before running:
--
-- There is no new "is_admin" column or role anywhere. Instead, your
-- Supabase Auth user ID (a UUID, not your email — emails can be
-- changed, this can't) is hardcoded directly into the two functions
-- below. Any signed-in user can technically *call* these functions
-- (that's what `grant execute ... to authenticated` means), but each
-- function's very first line checks `auth.uid()` against that
-- hardcoded UUID and raises an exception for literally everyone else.
-- There's no column, no flag, no client-side check that could be
-- tampered with — the only way to pass this check is to be signed in
-- as that exact account, and that check happens inside the database
-- itself, not in admin.html's JavaScript (which only hides the UI for
-- a nicer experience — it enforces nothing).
--
-- Your admin UUID, from `select id from auth.users where email =
-- 'ruhan@themagiclab.co.za'`:
--   31a201b0-f426-455a-973a-b1862001b748
--
-- If you ever need to change who the admin is (new email, lost
-- access, etc.), find the new account's UUID the same way and replace
-- every occurrence of that UUID below, then re-run this whole file.
--
-- WHY THE UPDATE NEEDS A SMALL TRIGGER CHANGE:
-- The existing `_profile_privileged_columns_guard` trigger (from
-- supabase-cdv-status-fix-and-dropdown.sql) silently reverts
-- cdv_status changes made by an ordinary signed-in user hitting the
-- public API — which is exactly the channel these admin functions use
-- (they're called via supabase.rpc(), same as any other client call,
-- even though the *function body* is privileged). Without a change,
-- the trigger would treat your approve/reject click the same as it
-- treats a regular user trying to grant themselves access, and
-- silently discard it. The fix adds one more way a request can count
-- as "privileged": a transaction-local flag
-- (`magiclab.admin_override`) that ONLY these two functions can ever
-- set, and only after their own auth.uid() check has already passed.
-- It's automatically cleared at the end of each call (`set_config`'s
-- third argument `true` = transaction-local) — there's no way for it
-- to leak into or affect any other request.
-- ============================================================

create or replace function _profile_privileged_columns_guard() returns trigger
language plpgsql as $$
declare
  is_privileged boolean := (coalesce(auth.role(), 'service_role') <> 'authenticated'
                           and coalesce(auth.role(), 'service_role') <> 'anon')
                           or coalesce(current_setting('magiclab.admin_override', true), '') = 'on';
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

drop trigger if exists trg_profile_privileged_columns_guard on profiles;
create trigger trg_profile_privileged_columns_guard
  before insert or update on profiles
  for each row execute function _profile_privileged_columns_guard();

-- ── admin_list_cdv(status_filter) ──────────────────────────────────
-- Returns full profile rows matching the given cdv_status (default
-- 'pending', i.e. the review queue). Blocked for everyone except the
-- hardcoded admin UUID.
create or replace function admin_list_cdv(status_filter cdv_status_enum default 'pending')
returns setof profiles
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'not authorized';
  end if;

  return query
    select * from profiles
    where cdv_status = status_filter
    order by school nulls last, display_name nulls last;
end;
$$;

revoke all on function admin_list_cdv(cdv_status_enum) from public;
grant execute on function admin_list_cdv(cdv_status_enum) to authenticated;

-- ── admin_set_cdv_status(target_user_id, new_status) ───────────────
-- Sets one user's cdv_status to 'verified' or 'rejected' (or back to
-- 'pending'/'none' if you ever need to undo something). Blocked for
-- everyone except the hardcoded admin UUID.
create or replace function admin_set_cdv_status(target_user_id uuid, new_status cdv_status_enum)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'not authorized';
  end if;

  perform set_config('magiclab.admin_override', 'on', true);
  update profiles set cdv_status = new_status where id = target_user_id;
end;
$$;

revoke all on function admin_set_cdv_status(uuid, cdv_status_enum) from public;
grant execute on function admin_set_cdv_status(uuid, cdv_status_enum) to authenticated;
