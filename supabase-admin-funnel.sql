-- ============================================================
-- THE MAGIC LAB — admin_trial_funnel()
-- Backs the "Funnel" tab on admin.html: how trial learners move from
-- sign-up to paying, activity groups per access type, monthly cohorts,
-- and two follow-up lists (warm lapsed learners, trials about to end
-- unused). Read-only: this function never writes anything.
-- HOW TO RUN: Supabase SQL editor → paste → Run. Safe to re-run.
--
-- Definitions
--  • A learner is "active" on a day when something of theirs was saved
--    that day: progress events, lesson results, notebook pages, written
--    task drafts, Test Tome results, their streak date, or a sign-in.
--    Sessions persist, so browsing without saving is not seen: treat
--    activity as a floor.
--  • Returning = active in the last 30 days and on 2+ different days.
--    New / one visit = active in the last 30 days on one day only.
--    Inactive = nothing in 30 days, or never.
--  • The funnel covers learners who went through a trial: role student,
--    not CDV-verified and not on the school package.
--  • "Opened a tool" ignores the generic 'platform' events.
--
-- SECURITY: same shape as admin_list_trials(). SECURITY DEFINER reads
-- past RLS, so the hardcoded admin auth.uid() check is the boundary.
-- ============================================================

create or replace function public.admin_trial_funnel()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare result jsonb;
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'not authorized';
  end if;

  with days as (
    select user_id, (created_at at time zone 'Africa/Johannesburg')::date as d from progress_events
    union select user_id, (updated_at at time zone 'Africa/Johannesburg')::date from lesson_results
    union select owner, (updated_at at time zone 'Africa/Johannesburg')::date from notebook_pages
    union select student_id, (coalesce(draft_saved_at, created_at) at time zone 'Africa/Johannesburg')::date from submissions
    union select learner_id, (created_at at time zone 'Africa/Johannesburg')::date from tome_results where learner_id is not null
    union select id, streak_last_date from profiles where streak_last_date is not null
    union select id, (last_sign_in_at at time zone 'Africa/Johannesburg')::date from auth.users where last_sign_in_at is not null
  ),
  tools as (
    select user_id, tool from progress_events where tool is not null and tool <> 'platform'
    union select user_id, tool from lesson_results where tool is not null and tool <> 'platform'
  ),
  paid as (
    select distinct user_id from payments where status = 'complete'
  ),
  u as (
    select p.id, p.display_name, p.email, p.grade, p.school, p.created_at, p.trial_ends_at,
      case when p.package::text = 'school' then 'School package'
           when p.package::text = 'pro' then 'Pro (paid)'
           when p.cdv_status::text = 'verified' then 'CDV verified'
           when p.trial_ends_at is null then 'No trial date'
           when p.trial_ends_at > now() then 'In trial'
           else 'Trial ended' end as access,
      (p.package::text is distinct from 'school' and p.cdv_status::text is distinct from 'verified') as in_funnel,
      (p.package::text = 'pro' or exists (select 1 from paid where paid.user_id = p.id)) as is_paid,
      exists (select 1 from payments py where py.user_id = p.id) as started_checkout,
      (select max(d) from days where days.user_id = p.id) as last_day,
      (select count(distinct d) from days where days.user_id = p.id) as active_days,
      (select string_agg(distinct tool, ', ') from tools where tools.user_id = p.id) as tool_list
    from profiles p
    where p.role = 'student'
  ),
  s as (
    select *,
      case when last_day >= current_date - 30 and active_days >= 2 then 'returning'
           when last_day >= current_date - 30 then 'new'
           else 'inactive' end as seg
    from u
  ),
  f as (select * from s where in_funnel)
  select jsonb_build_object(
    'generated_at', now(),
    -- each step is a subset of the one before
    'funnel', jsonb_build_array(
      jsonb_build_object('step', 'Signed up', 'n', (select count(*) from f)),
      jsonb_build_object('step', 'Opened a tool', 'n', (select count(*) from f where tool_list is not null or is_paid)),
      jsonb_build_object('step', 'Opened a tool and came back another day', 'n', (select count(*) from f where (tool_list is not null and active_days >= 2) or is_paid)),
      jsonb_build_object('step', 'Paid', 'n', (select count(*) from f where is_paid))
    ),
    'facts', jsonb_build_object(
      'in_trial', (select count(*) from f where access = 'In trial'),
      'trial_ended', (select count(*) from f where access = 'Trial ended'),
      'checkout_started', (select count(*) from f where started_checkout),
      'never_opened_tool', (select count(*) from f where tool_list is null and not is_paid)
    ),
    'segments', (select coalesce(jsonb_agg(x order by x->>'access'), '[]'::jsonb) from (
      select jsonb_build_object('access', access, 'total', count(*),
        'returning', count(*) filter (where seg = 'returning'),
        'new', count(*) filter (where seg = 'new'),
        'inactive', count(*) filter (where seg = 'inactive'),
        'active7', count(*) filter (where last_day >= current_date - 7)) as x
      from s group by access) q),
    'cohorts', (select coalesce(jsonb_agg(x order by x->>'month'), '[]'::jsonb) from (
      select jsonb_build_object('month', to_char(date_trunc('month', created_at at time zone 'Africa/Johannesburg'), 'YYYY-MM'),
        'signups', count(*),
        'opened_tool', count(*) filter (where tool_list is not null),
        'returned', count(*) filter (where active_days >= 2),
        'paid', count(*) filter (where is_paid)) as x
      from f group by date_trunc('month', created_at at time zone 'Africa/Johannesburg')) q),
    'warm', (select coalesce(jsonb_agg(x order by x->>'last_day' desc), '[]'::jsonb) from (
      select jsonb_build_object('name', display_name, 'email', email, 'grade', grade, 'school', school,
        'trial_ended', trial_ends_at, 'last_day', last_day, 'active_days', active_days, 'tools', tool_list) as x
      from f where access = 'Trial ended' and active_days >= 2 and last_day >= current_date - 45
      order by last_day desc limit 100) q),
    'expiring', (select coalesce(jsonb_agg(x order by x->>'trial_ends'), '[]'::jsonb) from (
      select jsonb_build_object('name', display_name, 'email', email, 'grade', grade, 'school', school,
        'trial_ends', trial_ends_at, 'active_days', active_days, 'tools', tool_list) as x
      from f where access = 'In trial' and trial_ends_at <= now() + interval '7 days' and active_days <= 1
      limit 100) q)
  ) into result;

  return result;
end;
$function$;

revoke execute on function public.admin_trial_funnel() from public, anon;
grant execute on function public.admin_trial_funnel() to authenticated;
