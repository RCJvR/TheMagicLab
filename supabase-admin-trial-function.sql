-- ============================================================
-- THE MAGIC LAB — admin_list_trials()
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New
-- query), after supabase-trial-cdv-schema.sql. Safe to re-run.
--
-- Backs the "Trials" tab on admin.html: one row per account with a
-- plain-English status and a countdown of whole days left on the free
-- trial. Read-only — this function never writes anything.
--
--   trial_days_left is NULL for anyone a trial doesn't apply to
--   (paying or CDV-verified), and negative once lapsed, so -3 means
--   the trial ended 3 days ago. Rows come back soonest-to-expire
--   first, with the not-applicable accounts sorted to the end.
--
-- SECURITY: same shape as admin_list_cdv / admin_set_cdv_status.
-- SECURITY DEFINER is what lets it read every profile row past RLS,
-- so the hardcoded auth.uid() check below is the real boundary — the
-- admin_list_trials() call fails for every other account no matter
-- what admin.html does or doesn't check on the client side. EXECUTE is
-- also revoked from anon so it can't be called without signing in at
-- all; signed-in non-admins get 'not authorized' from the guard.
-- ============================================================

create or replace function public.admin_list_trials()
returns table (
  id              uuid,
  display_name    text,
  email           text,
  role            text,
  grade           integer,
  school          text,
  package         text,
  cdv_status      text,
  account_status  text,
  trial_ends_at   timestamptz,
  trial_days_left integer
)
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'not authorized';
  end if;

  return query
    select
      p.id,
      p.display_name,
      p.email,
      p.role,
      p.grade,
      p.school,
      p.package,
      p.cdv_status::text,
      case
        when p.package = 'pro'                                  then 'Pro'
        when p.package = 'school'                               then 'School'
        when p.cdv_status::text = 'verified'                    then 'CDV'
        when p.trial_ends_at is null or p.trial_ends_at > now() then 'Trial'
        else 'Expired'
      end,
      p.trial_ends_at,
      case
        when p.package in ('pro', 'school')   then null
        when p.cdv_status::text = 'verified'  then null
        when p.trial_ends_at is null          then null
        else ceil(extract(epoch from (p.trial_ends_at - now())) / 86400)::int
      end
    from profiles p
    order by
      case
        when p.package in ('pro', 'school') or p.cdv_status::text = 'verified' then 1
        else 0
      end,
      p.trial_ends_at asc nulls last,
      lower(coalesce(p.display_name, p.email));
end;
$function$;

revoke all on function public.admin_list_trials() from public, anon;
grant execute on function public.admin_list_trials() to authenticated;
