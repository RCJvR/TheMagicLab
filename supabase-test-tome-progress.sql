-- ============================================================
-- THE MAGIC LAB — Test Tome progress over time
--  1. A class result remembers the learner's account when they were logged in
--     (learner_id). Teachers see it through the same rules as before: only
--     results from sessions they made or that were shared with them.
--  2. A logged-in learner's test history is kept in their account
--     (tome_attempts), with their revisits and revision plan in
--     tome_learner_state, so progress follows them to other devices.
--  Learners see only their own rows. Nothing here is readable by anon.
-- Run after supabase-test-tome-results.sql and supabase-test-tome-sharing.sql.
-- ============================================================

alter table public.tome_results add column if not exists learner_id uuid references public.profiles(id) on delete set null;
create index if not exists idx_tome_results_learner on public.tome_results(learner_id);

-- Same checks as before; the only change is learner_id = the logged-in learner (null for anonymous learners).
create or replace function public.submit_tome_result(
  p_code text, p_name text, p_quiz_id text, p_version text, p_lang text,
  p_score int, p_total int, p_per jsonb, p_answers jsonb)
returns uuid
language plpgsql security definer set search_path = public as $$
declare s tome_sessions; new_id uuid;
begin
  select * into s from tome_sessions where join_code = upper(trim(p_code)) and is_open;
  if not found then raise exception 'This class code is not open'; end if;
  if char_length(trim(coalesce(p_name, ''))) not between 1 and 60 then raise exception 'Name needed'; end if;
  if p_quiz_id not like s.quiz_set || '-%' then raise exception 'Wrong test for this code'; end if;
  if jsonb_typeof(p_per) <> 'object' or octet_length(p_per::text) > 8000
     or octet_length(p_answers::text) > 20000 then raise exception 'Result too large'; end if;
  if (select count(*) from tome_results where session_id = s.id) >= 400 then raise exception 'This session is full'; end if;
  insert into tome_results (session_id, learner_name, quiz_id, version, lang, score, total, per, answers, learner_id)
  values (s.id, trim(p_name), p_quiz_id, left(p_version, 4), case when p_lang in ('en', 'af') then p_lang end,
          p_score, p_total, p_per, p_answers, (select auth.uid()))
  returning id into new_id;
  return new_id;
end $$;
revoke execute on function public.submit_tome_result(text, text, text, text, text, int, int, jsonb, jsonb) from public;
grant execute on function public.submit_tome_result(text, text, text, text, text, int, int, jsonb, jsonb) to anon, authenticated;

-- A learner's test history, one row per submitted test, kept across devices.
-- client_id is the id the browser gives each record, so re-sending is safe.
create table if not exists public.tome_attempts (
  user_id   uuid not null references public.profiles(id) on delete cascade,
  client_id text not null check (char_length(client_id) between 1 and 80),
  test_id   text not null check (char_length(test_id) <= 80),
  version   text check (char_length(version) <= 4),
  grade     int,
  taken_at  timestamptz not null,
  score     int not null check (score >= 0),
  total     int not null check (total between 1 and 200),
  title     jsonb not null,
  topics    jsonb,
  names     jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, client_id),
  check (score <= total)
);
alter table public.tome_attempts enable row level security;
drop policy if exists tome_attempts_own on public.tome_attempts;
create policy tome_attempts_own on public.tome_attempts for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
revoke all on public.tome_attempts from anon;
grant select, insert, update, delete on public.tome_attempts to authenticated;

-- A learner's revisits and revision plan: one row each, as JSON the browser owns.
create table if not exists public.tome_learner_state (
  user_id    uuid primary key references public.profiles(id) on delete cascade,
  revisit    jsonb not null default '{}'::jsonb check (octet_length(revisit::text) < 2000000),
  plan       jsonb not null default '{}'::jsonb check (octet_length(plan::text) < 200000),
  updated_at timestamptz not null default now()
);
alter table public.tome_learner_state enable row level security;
drop policy if exists tome_learner_state_own on public.tome_learner_state;
create policy tome_learner_state_own on public.tome_learner_state for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
revoke all on public.tome_learner_state from anon;
grant select, insert, update, delete on public.tome_learner_state to authenticated;
