-- ============================================================
-- THE MAGIC LAB — trial reporting queries
-- Paste any one of these into the Supabase SQL editor
-- (Project > SQL Editor > New query) and hit Run. All are
-- read-only — none of them change any data.
--
-- Access rules mirror hasFullAccess() in auth.js, in priority order:
--   package 'pro'/'school'  → paying
--   cdv_status 'verified'   → free, Curro Durbanville verified
--   trial_ends_at > now()   → on trial
--   otherwise               → expired, no access
-- ============================================================


-- ── 1. How many users are in each state right now ───────────
-- The one-line overview. Run this first.
select
  case
    when package = 'pro'                              then 'Pro (paying)'
    when package = 'school'                           then 'School (paying)'
    when cdv_status::text = 'verified'                then 'CDV (free, verified)'
    when trial_ends_at is null                        then 'Trial (no end date)'
    when trial_ends_at > now()                        then 'Trial (active)'
    else 'Expired'
  end as account_status,
  count(*) as users
from profiles
group by 1
order by users desc;


-- ── 2. Whose trial expires in the next 7 days ───────────────
-- The "who do I need to talk to this week" list.
-- Change `7` to any number of days.
select
  coalesce(display_name, '—')                                   as name,
  email,
  coalesce(school, '—')                                         as school,
  trial_ends_at::date                                           as trial_ends,
  ceil(extract(epoch from (trial_ends_at - now())) / 86400)::int as days_left
from profiles
where package not in ('pro', 'school')
  and cdv_status::text <> 'verified'
  and trial_ends_at is not null
  and trial_ends_at between now() and now() + interval '7 days'
order by trial_ends_at asc;


-- ── 3. Everyone on a trial, soonest to expire first ─────────
-- Negative days_left means the trial already lapsed.
select
  coalesce(display_name, '—')                                   as name,
  email,
  coalesce(school, '—')                                         as school,
  trial_ends_at::date                                           as trial_ends,
  ceil(extract(epoch from (trial_ends_at - now())) / 86400)::int as days_left,
  case when trial_ends_at > now() then 'Active' else 'EXPIRED' end as state
from profiles
where package not in ('pro', 'school')
  and cdv_status::text <> 'verified'
order by trial_ends_at asc nulls first;


-- ── 4. Already locked out (trial lapsed, never subscribed) ──
-- These users currently get bounced to pricing.html.
select
  coalesce(display_name, '—') as name,
  email,
  coalesce(school, '—')       as school,
  trial_ends_at::date         as expired_on,
  ceil(extract(epoch from (now() - trial_ends_at)) / 86400)::int as days_expired
from profiles
where package not in ('pro', 'school')
  and cdv_status::text <> 'verified'
  and trial_ends_at is not null
  and trial_ends_at <= now()
order by trial_ends_at desc;


-- ── 5. Curro learners who are NOT verified ──────────────────
-- The CDV auto-flag trigger only reads the `school` text field, so
-- anyone who left School blank at signup stays on a plain trial even
-- with an obvious @curro.co.za address. This finds those gaps so
-- they can be verified before they get locked out.
select
  coalesce(display_name, '—') as name,
  email,
  coalesce(school, '—')       as school,
  cdv_status::text            as cdv_status,
  trial_ends_at::date         as trial_ends,
  ceil(extract(epoch from (trial_ends_at - now())) / 86400)::int as days_left
from profiles
where package not in ('pro', 'school')
  and cdv_status::text <> 'verified'
  and (email ilike '%@curro.co.za' or email ilike 'cdv%')
order by trial_ends_at asc, email;
