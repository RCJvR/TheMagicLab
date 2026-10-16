-- ============================================================
-- THE MAGIC LAB — server-side XP limits
--
-- Before: public.increment_xp(user_id, amount) let a signed-in user add
-- 1–100 XP to their own profile per call, as often as they liked, so a
-- loop in the browser console could farm unlimited XP.
--
-- After: the browser no longer says how much XP to give. It calls
-- public.award_xp(event_key, tool, topic, reason) and the server:
--   * looks up the amount in public.xp_rates (same numbers as XP_RATES
--     in xp.js),
--   * enforces a per-event daily limit (South African day),
--   * gives tool_complete once per tool, and only for real tool slugs,
--   * enforces an overall daily cap of 500 XP (busiest real day so far
--     was 255 XP),
--   * records the award in public.xp_awards (clients cannot write to
--     it) and writes the 'xp_earned' activity-feed row itself.
-- increment_xp is dropped.
--
-- Run once in the Supabase SQL editor. Needs supabase-profile-role-guard.sql
-- (the admin_override guard on profiles.xp) to be in place already.
-- ============================================================

begin;

-- ── Rates ────────────────────────────────────────────────────
create table if not exists public.xp_rates (
  event_key  text primary key,
  amount     integer not null check (amount between 1 and 100),
  daily_max  integer not null check (daily_max >= 1),  -- awards per user per SA day
  once_per_tool boolean not null default false          -- lifetime, per tool
);

insert into public.xp_rates (event_key, amount, daily_max, once_per_tool) values
  ('lesson_complete',     10, 40,  false),
  ('quiz_correct_first',   5, 150, false),
  ('quiz_correct_retry',   2, 150, false),
  ('quiz_perfect_bonus',  15, 20,  false),
  ('unit_complete',       25, 6,   false),
  ('tool_complete',      100, 12,  true),
  ('code_run',             3, 50,  false),
  ('daily_first_lesson',   5, 1,   false)
on conflict (event_key) do update
  set amount = excluded.amount,
      daily_max = excluded.daily_max,
      once_per_tool = excluded.once_per_tool;

alter table public.xp_rates enable row level security;
revoke all on public.xp_rates from anon, authenticated;
grant select on public.xp_rates to authenticated;
drop policy if exists xp_rates_read on public.xp_rates;
create policy xp_rates_read on public.xp_rates for select to authenticated using (true);

-- ── Ledger ───────────────────────────────────────────────────
create table if not exists public.xp_awards (
  id         bigserial primary key,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  event_key  text not null references public.xp_rates(event_key),
  tool       text not null,
  topic      text,
  amount     integer not null check (amount between 1 and 100),
  sa_day     date not null default (now() at time zone 'Africa/Johannesburg')::date,
  created_at timestamptz not null default now()
);

create index if not exists xp_awards_user_day_idx on public.xp_awards (user_id, sa_day);
create unique index if not exists xp_awards_tool_complete_once
  on public.xp_awards (user_id, tool) where event_key = 'tool_complete';

alter table public.xp_awards enable row level security;
revoke all on public.xp_awards from anon, authenticated;
grant select on public.xp_awards to authenticated;
drop policy if exists xp_awards_read_own on public.xp_awards;
create policy xp_awards_read_own on public.xp_awards for select to authenticated
  using (user_id = auth.uid());

-- ── award_xp ─────────────────────────────────────────────────
-- Returns { awarded, xp }. awarded = 0 when a limit was hit; that is not
-- an error, so normal pages carry on quietly.
create or replace function public.award_xp(
  event_key text,
  tool      text default 'platform',
  topic     text default null,
  reason    text default null
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  uid        uuid := auth.uid();
  r          xp_rates;
  v_tool     text := coalesce(nullif(left(award_xp.tool, 40), ''), 'platform');
  v_topic    text := left(award_xp.topic, 200);
  v_reason   text := left(coalesce(award_xp.reason, award_xp.event_key), 200);
  today      date := (now() at time zone 'Africa/Johannesburg')::date;
  daily_cap  constant integer := 500;
  used_today integer;
  count_today integer;
  grant_amt  integer;
  new_xp     integer;
begin
  if uid is null then
    raise exception 'not authorized';
  end if;

  select * into r from xp_rates where xp_rates.event_key = award_xp.event_key;
  if not found then
    raise exception 'unknown xp event';
  end if;

  -- Serialise this user's awards so parallel calls can't race the caps.
  perform 1 from profiles where id = uid for update;
  if not found then
    raise exception 'no profile';
  end if;

  if r.once_per_tool then
    if v_tool not in ('java-genie','web-wizard','code-conjurer','math-magician',
                      'computer-codex','ai-oracle','drawing-druid','science-sage',
                      'tech-tower','spike-spellcaster','robot-realm','model-mage') then
      return jsonb_build_object('awarded', 0, 'xp', (select xp from profiles where id = uid));
    end if;
    if exists (select 1 from xp_awards a
               where a.user_id = uid and a.event_key = r.event_key and a.tool = v_tool) then
      return jsonb_build_object('awarded', 0, 'xp', (select xp from profiles where id = uid));
    end if;
  end if;

  select count(*) filter (where a.event_key = r.event_key),
         coalesce(sum(a.amount), 0)
    into count_today, used_today
    from xp_awards a
   where a.user_id = uid and a.sa_day = today;

  grant_amt := least(r.amount, daily_cap - used_today);
  if count_today >= r.daily_max or grant_amt < 1 then
    return jsonb_build_object('awarded', 0, 'xp', (select xp from profiles where id = uid));
  end if;

  insert into xp_awards (user_id, event_key, tool, topic, amount, sa_day)
  values (uid, r.event_key, v_tool, v_topic, grant_amt, today);

  perform set_config('magiclab.admin_override', 'on', true);
  update profiles set xp = coalesce(xp, 0) + grant_amt
   where id = uid
  returning xp into new_xp;
  -- Switch the override off again so it can't cover anything else later
  -- in the same transaction.
  perform set_config('magiclab.admin_override', 'off', true);

  -- Activity feed row (was written by the browser before).
  insert into progress_events (user_id, tool, event_type, topic, score, metadata)
  values (uid, v_tool, 'xp_earned', v_reason, grant_amt,
          jsonb_build_object('xp', grant_amt, 'reason', v_reason, 'event', r.event_key));

  return jsonb_build_object('awarded', grant_amt, 'xp', new_xp);
end;
$function$;

revoke all on function public.award_xp(text, text, text, text) from public, anon;
grant execute on function public.award_xp(text, text, text, text) to authenticated;

-- ── Retire the old open-ended RPC ────────────────────────────
drop function if exists public.increment_xp(uuid, integer);

commit;
