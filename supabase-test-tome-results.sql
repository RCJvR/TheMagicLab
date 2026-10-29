-- ============================================================
-- THE MAGIC LAB — Test Tome class results
-- A teacher starts a results session (a short join code). Learners, who
-- may have no account (open workshop tests), type the code and their name;
-- when they submit a test, submit_tome_result() saves their marks for that
-- teacher only. Results stay until the teacher deletes the session.
--
-- Security notes
--  • Learners never read anything back: there is no SELECT for anon.
--  • tome_session_info() and submit_tome_result() are the only functions
--    anon may execute. They accept a result only for an OPEN session, check
--    every field's size, and cap each session at 400 results. This is a
--    deliberate exception to "no SECURITY DEFINER function is
--    anon-executable" (see supabase-security-hardening.sql).
--  • Marks are worked out in the learner's browser, so a determined learner
--    could send a false mark. Fine for practice tests; not for formal marks.
-- ============================================================

create table if not exists public.tome_sessions (
  id          uuid primary key default gen_random_uuid(),
  teacher_id  uuid not null references public.profiles(id) on delete cascade,
  quiz_set    text not null check (quiz_set ~ '^[a-z0-9-]{1,40}$'),
  title       text not null check (char_length(title) between 1 and 120),
  join_code   text not null unique,
  is_open     boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.tome_results (
  id            uuid primary key default gen_random_uuid(),
  session_id    uuid not null references public.tome_sessions(id) on delete cascade,
  learner_name  text not null check (char_length(learner_name) between 1 and 60),
  quiz_id       text not null check (char_length(quiz_id) <= 80),
  version       text check (char_length(version) <= 4),
  lang          text check (lang in ('en', 'af')),
  score         int  not null check (score >= 0),
  total         int  not null check (total between 1 and 200),
  per           jsonb not null,   -- marks per question id, e.g. {"0.1": 1, "2.3": 2}
  answers       jsonb not null,   -- the learner's answers, for "most common wrong answer"
  created_at    timestamptz not null default now(),
  check (score <= total)
);
create index if not exists idx_tome_results_session on public.tome_results(session_id);
create index if not exists idx_tome_sessions_teacher on public.tome_sessions(teacher_id);

alter table public.tome_sessions enable row level security;
alter table public.tome_results  enable row level security;

-- Teachers see and manage only their own sessions and those sessions' results.
drop policy if exists tome_sessions_owner_select on public.tome_sessions;
drop policy if exists tome_sessions_owner_update on public.tome_sessions;
drop policy if exists tome_sessions_owner_delete on public.tome_sessions;
create policy tome_sessions_owner_select on public.tome_sessions for select to authenticated
  using (teacher_id = (select auth.uid()));
create policy tome_sessions_owner_update on public.tome_sessions for update to authenticated
  using (teacher_id = (select auth.uid())) with check (teacher_id = (select auth.uid()));
create policy tome_sessions_owner_delete on public.tome_sessions for delete to authenticated
  using (teacher_id = (select auth.uid()));

drop policy if exists tome_results_owner_select on public.tome_results;
drop policy if exists tome_results_owner_delete on public.tome_results;
create policy tome_results_owner_select on public.tome_results for select to authenticated
  using (exists (select 1 from public.tome_sessions s where s.id = session_id and s.teacher_id = (select auth.uid())));
create policy tome_results_owner_delete on public.tome_results for delete to authenticated
  using (exists (select 1 from public.tome_sessions s where s.id = session_id and s.teacher_id = (select auth.uid())));

revoke all on public.tome_sessions from anon;
revoke all on public.tome_results  from anon;
grant select, update, delete on public.tome_sessions to authenticated;
grant select, delete         on public.tome_results  to authenticated;

-- A teacher starts a session; the code avoids look-alike characters (0/O, 1/I).
create or replace function public.create_tome_session(p_set text, p_title text)
returns public.tome_sessions
language plpgsql security definer set search_path = public as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code text; new_row public.tome_sessions;
begin
  if auth.uid() is null or not exists (select 1 from profiles where id = auth.uid() and role = 'teacher') then
    raise exception 'Only teachers can start a results session';
  end if;
  loop
    code := '';
    for i in 1..6 loop code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1); end loop;
    exit when not exists (select 1 from tome_sessions where join_code = code);
  end loop;
  insert into tome_sessions (teacher_id, quiz_set, title, join_code)
  values (auth.uid(), p_set, left(trim(p_title), 120), code)
  returning * into new_row;
  return new_row;
end $$;
revoke execute on function public.create_tome_session(text, text) from public, anon;
grant execute on function public.create_tome_session(text, text) to authenticated;

-- A learner checks a code before writing: the session's title and test set, if open.
create or replace function public.tome_session_info(p_code text)
returns table (title text, quiz_set text)
language sql security definer stable set search_path = public as $$
  select s.title, s.quiz_set from tome_sessions s
  where s.join_code = upper(trim(p_code)) and s.is_open;
$$;
revoke execute on function public.tome_session_info(text) from public;
grant execute on function public.tome_session_info(text) to anon, authenticated;

-- A learner's result, sent when they submit a test with a code.
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
  insert into tome_results (session_id, learner_name, quiz_id, version, lang, score, total, per, answers)
  values (s.id, trim(p_name), p_quiz_id, left(p_version, 4), case when p_lang in ('en', 'af') then p_lang end,
          p_score, p_total, p_per, p_answers)
  returning id into new_id;
  return new_id;
end $$;
revoke execute on function public.submit_tome_result(text, text, text, text, text, int, int, jsonb, jsonb) from public;
grant execute on function public.submit_tome_result(text, text, text, text, text, int, int, jsonb, jsonb) to anon, authenticated;
