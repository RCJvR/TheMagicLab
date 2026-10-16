-- ============================================================
-- THE MAGIC LAB — lock down role / XP / streak columns, teacher approval
-- Run after supabase-security-hardening.sql. Safe to re-run.
--
-- THE HOLE THIS CLOSES:
-- profiles_own_update lets a signed-in user update every column of their
-- own row, and _profile_privileged_columns_guard only protected package,
-- trial_ends_at and cdv_status. So anyone could, straight from the
-- browser console:
--   supabase.from('profiles').update({ role: 'teacher', xp: 999999 })
-- and handle_new_user copied role out of the sign-up metadata, so anyone
-- could also *sign up* as 'teacher' (or 'admin') by passing it in.
-- The teacher role matters: it opens the teacher dashboard and the
-- "Teachers manage ..." RLS policies on period_schedule and assessments.
--
-- WHAT CHANGES:
-- 1. The guard trigger now also freezes role, xp, streak_current,
--    streak_longest, streak_last_date and the new teacher_request column
--    for ordinary (non-privileged) inserts and updates.
-- 2. increment_xp and update_streak set the same transaction-local
--    magiclab.admin_override flag that admin_set_cdv_status uses, after
--    their own auth.uid() check, so they keep working. increment_xp also
--    now refuses amounts outside 1..100 (the biggest real award is
--    tool_complete = 100 in xp.js).
-- 3. Teacher sign-up becomes a request. Every new account is created as
--    a 'student'. Picking "Teacher" in the sign-up modal sets
--    teacher_request = 'pending'; the admin approves or rejects it on
--    admin.html, and only approval sets role = 'teacher'.
--    Existing teachers are backfilled as 'approved' (so they show on
--    admin.html's Approved list, where access can be revoked).
-- ============================================================

-- ── 1. teacher_request column ──────────────────────────────
alter table public.profiles
  add column if not exists teacher_request text not null default 'none';

do $$
begin
  if not exists (select 1 from pg_constraint
                 where conname = 'profiles_teacher_request_check'
                   and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles
      add constraint profiles_teacher_request_check
      check (teacher_request in ('none', 'pending', 'approved', 'rejected'));
  end if;
end $$;

update public.profiles
   set teacher_request = 'approved'
 where role = 'teacher' and teacher_request = 'none';

-- ── 2. guard trigger ───────────────────────────────────────
create or replace function public._profile_privileged_columns_guard() returns trigger
language plpgsql
set search_path = public
as $$
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
      -- a client-side insert asking for 'teacher' becomes a request
      new.teacher_request := case when new.role = 'teacher' then 'pending' else 'none' end;
      new.role             := 'student';
      new.xp               := 0;
      new.streak_current   := 0;
      new.streak_longest   := 0;
      new.streak_last_date := null;
    end if;
    return new;
  end if;

  -- TG_OP = 'UPDATE'
  if not is_privileged then
    new.package          := old.package;
    new.trial_ends_at    := old.trial_ends_at;
    new.role             := old.role;
    new.teacher_request  := old.teacher_request;
    new.xp               := old.xp;
    new.streak_current   := old.streak_current;
    new.streak_longest   := old.streak_longest;
    new.streak_last_date := old.streak_last_date;

    if old.cdv_status = 'none' and is_cdv_school and new.school is distinct from old.school then
      new.cdv_status := 'pending';
    else
      new.cdv_status := old.cdv_status;
    end if;
  end if;

  return new;
end;
$$;

-- ── 3. new-user trigger: never trust metadata for role ─────
create or replace function public.handle_new_user() returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role, teacher_request)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'student',
    case when new.raw_user_meta_data->>'role' = 'teacher' then 'pending' else 'none' end
  );
  return new;
end;
$$;

-- ── 4. XP / streak RPCs: set the override after the uid check ─
create or replace function public.increment_xp(user_id uuid, amount integer)
returns profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  updated profiles;
begin
  if user_id is distinct from auth.uid() then
    raise exception 'not authorized';
  end if;
  if amount is null or amount < 1 or amount > 100 then
    raise exception 'invalid xp amount';
  end if;

  perform set_config('magiclab.admin_override', 'on', true);
  update profiles
  set    xp = xp + amount
  where  id = user_id
  returning * into updated;
  return updated;
end;
$$;

create or replace function public.update_streak(user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  today         date := current_date;
  yesterday     date := current_date - 1;
  had_yesterday boolean;
  new_streak    integer;
  p             profiles;
begin
  if user_id is distinct from auth.uid() then
    raise exception 'not authorized';
  end if;

  select * into p from profiles where id = user_id;

  select exists(
    select 1 from daily_activity da
    where  da.user_id = update_streak.user_id
    and    da.date    = yesterday
  ) into had_yesterday;

  if p.streak_last_date = today then
    return;
  end if;

  if had_yesterday or p.streak_last_date = yesterday then
    new_streak := p.streak_current + 1;
  else
    new_streak := 1;
  end if;

  perform set_config('magiclab.admin_override', 'on', true);
  update profiles set
    streak_current   = new_streak,
    streak_longest   = greatest(streak_longest, new_streak),
    streak_last_date = today
  where id = user_id;
end;
$$;

-- ── 5. admin: list + decide teacher requests ───────────────
-- Same hardcoded-admin check as admin_list_cdv / admin_set_cdv_status.
create or replace function public.admin_list_teacher_requests(status_filter text default 'pending')
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
    where teacher_request = status_filter
    order by created_at desc;
end;
$$;

-- 'approved' makes the account a teacher; 'rejected' makes (or keeps) it
-- a student, which is also how an approved teacher's access is revoked.
create or replace function public.admin_set_teacher_request(target_user_id uuid, new_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'not authorized';
  end if;
  if new_status not in ('approved', 'rejected') then
    raise exception 'invalid status';
  end if;

  perform set_config('magiclab.admin_override', 'on', true);
  update profiles
     set teacher_request = new_status,
         role = case when new_status = 'approved' then 'teacher' else 'student' end
   where id = target_user_id;
end;
$$;

-- ── 6. grants (match supabase-security-hardening.sql) ──────
revoke execute on function public.increment_xp(uuid, integer)                from public, anon;
revoke execute on function public.update_streak(uuid)                        from public, anon;
revoke execute on function public.admin_list_teacher_requests(text)          from public, anon;
revoke execute on function public.admin_set_teacher_request(uuid, text)      from public, anon;
revoke execute on function public.handle_new_user()                          from public, anon, authenticated;
grant  execute on function public.increment_xp(uuid, integer)                to authenticated;
grant  execute on function public.update_streak(uuid)                        to authenticated;
grant  execute on function public.admin_list_teacher_requests(text)          to authenticated;
grant  execute on function public.admin_set_teacher_request(uuid, text)      to authenticated;
