-- Security hardening (2026-10-16): fixes from the Supabase security advisor.
--
-- 1. No SECURITY DEFINER function is executable by `anon` any more.
--    Functions get EXECUTE from PUBLIC by default, so every revoke below
--    removes PUBLIC as well as the named role.
-- 2. Trigger / event-trigger functions are executable by nobody but the
--    owner. Postgres checks EXECUTE when a trigger is created, not when it
--    fires, so the triggers keep working.
-- 3. increment_xp / update_streak only act on the caller's own row.
-- 4. Every public function gets a fixed search_path.
-- 5. tool_progress runs with the caller's permissions (RLS on
--    progress_events) instead of the view owner's.
--
-- The admin_* functions keep their existing check (auth.uid() must be the
-- site admin's account). profiles.role is writable by the user themselves
-- (profiles_own_update, and handle_new_user copies it from sign-up
-- metadata), so a role = 'admin' check would let anyone make themselves admin.

begin;

-- ── Trigger and event-trigger functions: nobody calls these directly ──
revoke execute on function public.handle_new_user()                    from public, anon, authenticated;
revoke execute on function public.handle_lesson_complete_for_invites() from public, anon, authenticated;
revoke execute on function public.touch_help_thread()                  from public, anon, authenticated;
revoke execute on function public.touch_updated_at()                   from public, anon, authenticated;
revoke execute on function public._payments_set_updated_at()           from public, anon, authenticated;
revoke execute on function public._profile_privileged_columns_guard()  from public, anon, authenticated;
revoke execute on function public.rls_auto_enable()                    from public, anon, authenticated;

-- Only called from handle_lesson_complete_for_invites (runs as owner).
revoke execute on function public.award_duo_badges(uuid)               from public, anon, authenticated;

-- ── Admin functions (admin.html, signed in): keep authenticated ──
revoke execute on function public.admin_list_cdv(public.cdv_status_enum)             from public, anon;
revoke execute on function public.admin_set_cdv_status(uuid, public.cdv_status_enum) from public, anon;
revoke execute on function public.admin_list_trials()                                from public, anon;

-- ── Signed-in RPCs called by the site: keep authenticated, drop anon ──
revoke execute on function public.get_my_teachers()                               from public, anon;
revoke execute on function public.get_or_create_help_thread(uuid)                 from public, anon;
revoke execute on function public.get_or_create_help_thread_as_teacher(uuid, uuid) from public, anon;
revoke execute on function public.get_teacher_help_threads()                      from public, anon;
revoke execute on function public.get_teacher_class_roster(uuid)                  from public, anon;
revoke execute on function public.mark_help_thread_read(uuid)                     from public, anon;
revoke execute on function public.mark_help_thread_resolved(uuid, boolean)        from public, anon;
revoke execute on function public.get_or_create_my_friend_code()                  from public, anon;
revoke execute on function public.send_friend_request_by_code(text)               from public, anon;
revoke execute on function public.get_my_friends()                                from public, anon;
revoke execute on function public.get_my_pending_friend_requests()                from public, anon;
revoke execute on function public.get_my_lesson_invites()                         from public, anon;
revoke execute on function public.submit_game_answer(uuid, integer, integer, integer) from public, anon;
revoke execute on function public.increment_xp(uuid, integer)                     from public, anon;
revoke execute on function public.update_streak(uuid)                             from public, anon;

-- ── RLS helper functions: policies need authenticated; anon is dropped ──
-- The policies that call them are re-scoped to `authenticated` so an
-- anonymous query never evaluates them (anon has no auth.uid(), so those
-- policies could never match for anon anyway).
revoke execute on function public.is_class_teacher(uuid)          from public, anon;
revoke execute on function public.teacher_has_student(uuid)       from public, anon;
revoke execute on function public.same_class(uuid, uuid)          from public, anon;
revoke execute on function public.are_friends(uuid, uuid)         from public, anon;
revoke execute on function public.is_game_participant(uuid, uuid) from public, anon;

alter policy "Teachers read their students' planner summaries" on public.planner_summaries      to authenticated;
alter policy "Class teacher manages course drawing releases"   on public.course_drawing_releases to authenticated;
alter policy "Users send requests to classmates"               on public.friendships             to authenticated;
alter policy "profiles_teacher_read"                           on public.profiles                to authenticated;
alter policy "class_members_teacher_read"                      on public.class_members           to authenticated;
alter policy "class_members_teacher_delete"                    on public.class_members           to authenticated;
alter policy "Participants read the lobby they're in"          on public.game_participants       to authenticated;
alter policy "Friends send lesson invites"                     on public.lesson_invites          to authenticated;

-- ── increment_xp / update_streak: caller's own row only ──
create or replace function public.increment_xp(user_id uuid, amount integer)
 returns profiles
 language plpgsql
 security definer
 set search_path = public
as $function$
declare
  updated profiles;
begin
  if user_id is distinct from auth.uid() then
    raise exception 'not authorized';
  end if;

  update profiles
  set    xp = xp + amount
  where  id = user_id
  returning * into updated;
  return updated;
end;
$function$;

create or replace function public.update_streak(user_id uuid)
 returns void
 language plpgsql
 security definer
 set search_path = public
as $function$
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

  -- Get current profile state
  select * into p from profiles where id = user_id;

  -- Did they have activity yesterday?
  select exists(
    select 1 from daily_activity da
    where  da.user_id = update_streak.user_id
    and    da.date    = yesterday
  ) into had_yesterday;

  -- Already counted today?
  if p.streak_last_date = today then
    return; -- already updated today, nothing to do
  end if;

  if had_yesterday or p.streak_last_date = yesterday then
    -- Continuing a streak
    new_streak := p.streak_current + 1;
  else
    -- Streak broken — reset to 1
    new_streak := 1;
  end if;

  update profiles set
    streak_current   = new_streak,
    streak_longest   = greatest(streak_longest, new_streak),
    streak_last_date = today
  where id = user_id;
end;
$function$;

-- ── Fixed search_path on every flagged function ──
-- (increment_xp and update_streak are set above; admin_* already have it;
-- rls_auto_enable keeps its pg_catalog path.)
alter function public._payments_set_updated_at()                          set search_path = public;
alter function public._profile_privileged_columns_guard()                 set search_path = public;
alter function public.are_friends(uuid, uuid)                             set search_path = public;
alter function public.award_duo_badges(uuid)                              set search_path = public;
alter function public.generate_game_code()                                set search_path = public;
alter function public.generate_invite_code()                              set search_path = public;
alter function public.get_my_friends()                                    set search_path = public;
alter function public.get_my_lesson_invites()                             set search_path = public;
alter function public.get_my_pending_friend_requests()                    set search_path = public;
alter function public.get_my_teachers()                                   set search_path = public;
alter function public.get_or_create_help_thread(uuid)                     set search_path = public;
alter function public.get_or_create_help_thread_as_teacher(uuid, uuid)    set search_path = public;
alter function public.get_or_create_my_friend_code()                      set search_path = public;
alter function public.get_teacher_class_roster(uuid)                      set search_path = public;
alter function public.get_teacher_help_threads()                          set search_path = public;
alter function public.handle_lesson_complete_for_invites()                set search_path = public;
alter function public.handle_new_user()                                   set search_path = public;
alter function public.is_class_teacher(uuid)                              set search_path = public;
alter function public.is_game_participant(uuid, uuid)                     set search_path = public;
alter function public.mark_help_thread_read(uuid)                         set search_path = public;
alter function public.mark_help_thread_resolved(uuid, boolean)            set search_path = public;
alter function public.same_class(uuid, uuid)                              set search_path = public;
alter function public.send_friend_request_by_code(text)                   set search_path = public;
alter function public.submit_game_answer(uuid, integer, integer, integer) set search_path = public;
alter function public.teacher_has_student(uuid)                          set search_path = public;
alter function public.touch_help_thread()                                 set search_path = public;
alter function public.touch_updated_at()                                  set search_path = public;

-- ── tool_progress: respect RLS on progress_events ──
-- Students see their own rows, teachers their students' rows
-- (progress_events_teacher_read), anon nothing.
alter view public.tool_progress set (security_invoker = true);
revoke all on public.tool_progress from anon;

commit;
