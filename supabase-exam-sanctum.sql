-- ============================================================
-- THE MAGIC LAB — Exam Sanctum (working title): papers written online
-- under exam conditions, marked by the server and by AI, reviewed and
-- released by the teacher.
-- Plan: ~/.claude/plans (approved 2026-11-21). Run AFTER
-- supabase-grading-grimoire-phase0.sql (roster, markbook) and
-- supabase-co-teachers.sql. HOW TO RUN: Supabase SQL editor → paste → Run.
-- Safe to re-run.
--
-- Who may use it: only teachers listed in exam_staff (added by hand, below).
--
--  • exam_papers   full paper (with memo) for staff; a memo-free copy
--                  ("learner") that is the only part learners ever receive.
--  • exam_sittings one class writing one paper: join code, time, lockdown.
--  • exam_attempts one learner's script: answers saved by the server, the
--                  server's own deadline, status, marking state.
--  • exam_events   leaving fullscreen, switching away, pasting, unlocks …
--  • exam_marks    per question item: server mark, AI mark, teacher mark.
--  • exam_time_extra  standing extra time per learner (minutes per hour).
--
-- Security notes
--  • Learners have NO direct access to any of these tables. Everything a
--    learner does goes through the exam_* learner functions below, which
--    check the class, the code, the time and the owner. The memo never
--    leaves the database for a learner; marks only after release.
--  • Time is the database's time (now()), never the browser's.
--  • Staff tables are readable and writable by staff only (is_exam_staff()).
--  • The edge function exam-mark writes AI marks with the service role.
-- ============================================================


-- ── 0. Staff list ───────────────────────────────────────────
create table if not exists public.exam_staff (
  teacher_id uuid primary key references public.profiles(id) on delete cascade,
  added_at   timestamptz not null default now()
);
alter table public.exam_staff enable row level security;
revoke all on public.exam_staff from anon, authenticated;
grant select on public.exam_staff to authenticated;
drop policy if exists exam_staff_self on public.exam_staff;
create policy exam_staff_self on public.exam_staff for select to authenticated
  using (teacher_id = (select auth.uid()));

create or replace function public.is_exam_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from exam_staff s join profiles p on p.id = s.teacher_id
                 where s.teacher_id = (select auth.uid()) and p.role in ('teacher', 'admin'));
$$;
revoke execute on function public.is_exam_staff() from public, anon;
grant execute on function public.is_exam_staff() to authenticated;

-- Add staff by email (run by hand, once per teacher):
--   insert into public.exam_staff (teacher_id)
--   select id from auth.users where lower(email) = lower('teacher@example.com')
--   on conflict do nothing;


-- ── 1. Papers ───────────────────────────────────────────────
create table if not exists public.exam_papers (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 160),
  grade       smallint check (grade is null or grade between 1 and 12),
  subject     text check (char_length(subject) <= 80),
  minutes     smallint not null check (minutes between 5 and 300),
  total       numeric(7,2) not null check (total > 0),
  source      jsonb not null check (pg_column_size(source) < 2000000),   -- the paper as imported (Test Tome format, with memo)
  learner     jsonb not null check (pg_column_size(learner) < 2000000),  -- flattened items, memo removed
  memo        jsonb not null check (pg_column_size(memo) < 2000000),     -- per item id: answers, memo points, marks
  blueprint   jsonb,                                                      -- objective %, marks per topic, skills
  status      text not null default 'draft' check (status in ('draft', 'ready', 'archived')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.exam_papers enable row level security;
revoke all on public.exam_papers from anon;
grant select, insert, update, delete on public.exam_papers to authenticated;
drop policy if exists exam_papers_staff on public.exam_papers;
create policy exam_papers_staff on public.exam_papers for all to authenticated
  using (public.is_exam_staff()) with check (public.is_exam_staff());


-- ── 2. Sittings ─────────────────────────────────────────────
create table if not exists public.exam_sittings (
  id            uuid primary key default gen_random_uuid(),
  paper_id      uuid not null references public.exam_papers(id) on delete restrict,
  class_id      uuid not null references public.classes(id) on delete cascade,
  class_name    text check (char_length(class_name) <= 80),   -- copied at creation: the other staff member may not see the class
  created_by    uuid default auth.uid() references public.profiles(id) on delete set null,
  title         text not null check (char_length(title) between 1 and 160),
  join_code     text not null unique check (join_code ~ '^[A-Z2-9]{6}$'),
  minutes       smallint not null check (minutes between 5 and 300),
  opens_at      timestamptz,                    -- null = as soon as it is open
  last_start_at timestamptz,                    -- no new starts after this (null = any time while open)
  is_open       boolean not null default false, -- the teacher opens it in class
  lockdown      text not null default 'monitored' check (lockdown in ('monitored', 'seb', 'takeatest')),
  lock_on_exit  boolean not null default true,  -- leaving the page locks it until the teacher unlocks
  shuffle       boolean not null default true,  -- shuffle MCQ options per learner
  seb_config_key text check (seb_config_key is null or seb_config_key ~ '^[0-9a-f]{64}$'),  -- phase 3
  term          smallint check (term is null or term between 1 and 4),
  released_at   timestamptz,
  mb_task_id    uuid references public.mb_tasks(id) on delete set null,
  created_at    timestamptz not null default now()
);
create index if not exists exam_sittings_class_idx on public.exam_sittings (class_id, created_at desc);
alter table public.exam_sittings enable row level security;
revoke all on public.exam_sittings from anon;
grant select, update, delete on public.exam_sittings to authenticated;   -- insert through exam_create_sitting()
drop policy if exists exam_sittings_staff on public.exam_sittings;
create policy exam_sittings_staff on public.exam_sittings for all to authenticated
  using (public.is_exam_staff()) with check (public.is_exam_staff());


-- ── 3. Extra time (standing accommodation per learner) ──────
create table if not exists public.exam_time_extra (
  roster_id       uuid primary key references public.class_roster(id) on delete cascade,
  minutes_per_hour smallint not null check (minutes_per_hour between 1 and 60),
  note            text check (char_length(note) <= 200),
  updated_at      timestamptz not null default now()
);
alter table public.exam_time_extra enable row level security;
revoke all on public.exam_time_extra from anon;
grant select, insert, update, delete on public.exam_time_extra to authenticated;
drop policy if exists exam_time_extra_staff on public.exam_time_extra;
create policy exam_time_extra_staff on public.exam_time_extra for all to authenticated
  using (public.is_exam_staff()) with check (public.is_exam_staff());


-- ── 4. Attempts (one per learner per sitting) ───────────────
create table if not exists public.exam_attempts (
  id            uuid primary key default gen_random_uuid(),
  sitting_id    uuid not null references public.exam_sittings(id) on delete cascade,
  student_id    uuid not null references public.profiles(id) on delete cascade,
  roster_id     uuid references public.class_roster(id) on delete set null,
  started_at    timestamptz not null default now(),
  deadline      timestamptz not null,
  answers       jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object' and pg_column_size(answers) < 400000),
  saves         integer not null default 0,
  last_saved_at timestamptz,
  status        text not null default 'writing' check (status in ('writing', 'locked', 'submitted')),
  submitted_at  timestamptz,
  submit_kind   text check (submit_kind in ('learner', 'time', 'teacher')),
  client_info   text check (char_length(client_info) <= 300),
  -- marking (written by exam-mark / the review page)
  mark_status   text not null default 'none' check (mark_status in ('none', 'marking', 'done', 'error')),
  mark_error    text check (char_length(mark_error) <= 300),
  ai_summary    text check (char_length(ai_summary) <= 2000),
  ai_model      text check (char_length(ai_model) <= 80),
  input_tokens  integer,
  output_tokens integer,
  marked_at     timestamptz,
  unique (sitting_id, student_id)
);
create index if not exists exam_attempts_sitting_idx on public.exam_attempts (sitting_id);
alter table public.exam_attempts enable row level security;
revoke all on public.exam_attempts from anon;
grant select on public.exam_attempts to authenticated;     -- changes only through functions
drop policy if exists exam_attempts_staff_read on public.exam_attempts;
create policy exam_attempts_staff_read on public.exam_attempts for select to authenticated
  using (public.is_exam_staff());

create table if not exists public.exam_events (
  id          bigint generated always as identity primary key,
  attempt_id  uuid not null references public.exam_attempts(id) on delete cascade,
  kind        text not null check (kind in ('start', 'resume', 'fs_exit', 'hidden', 'blur', 'paste', 'offline', 'online',
                                            'lock', 'unlock', 'time_added', 'submit', 'force_submit', 'reopen', 'seb_fail')),
  detail      text check (char_length(detail) <= 200),
  client_at   timestamptz,
  at          timestamptz not null default now()
);
create index if not exists exam_events_attempt_idx on public.exam_events (attempt_id, at);
alter table public.exam_events enable row level security;
revoke all on public.exam_events from anon;
grant select on public.exam_events to authenticated;
drop policy if exists exam_events_staff_read on public.exam_events;
create policy exam_events_staff_read on public.exam_events for select to authenticated
  using (public.is_exam_staff());


-- ── 5. Marks per item ───────────────────────────────────────
create table if not exists public.exam_marks (
  attempt_id     uuid not null references public.exam_attempts(id) on delete cascade,
  item_id        text not null check (item_id ~ '^[0-9]{1,3}(\.[0-9]{1,3}){1,3}$'),
  max            numeric(6,2) not null check (max >= 0),
  auto_score     numeric(6,2) check (auto_score is null or auto_score >= 0),       -- objective items, server-marked
  ai_met         smallint[],                                                       -- memo point indices
  ai_score       numeric(6,2) check (ai_score is null or ai_score >= 0),
  ai_confidence  text check (ai_confidence in ('high', 'medium', 'low')),
  ai_alt         boolean not null default false,                                   -- maybe a correct answer the memo misses
  ai_feedback    text check (char_length(ai_feedback) <= 1200),
  teacher_met    smallint[],
  teacher_score  numeric(6,2) check (teacher_score is null or teacher_score >= 0),
  teacher_note   text check (char_length(teacher_note) <= 600),
  reviewed       boolean not null default false,                                   -- the teacher looked at it (agreed or changed)
  reviewed_by    uuid references public.profiles(id) on delete set null,
  updated_at     timestamptz not null default now(),
  primary key (attempt_id, item_id)
);
alter table public.exam_marks enable row level security;
revoke all on public.exam_marks from anon;
grant select, update on public.exam_marks to authenticated;
drop policy if exists exam_marks_staff on public.exam_marks;
create policy exam_marks_staff on public.exam_marks for all to authenticated
  using (public.is_exam_staff()) with check (public.is_exam_staff());

-- the mark that counts: teacher's, else AI's, else the server's
create or replace function public.exam_final_score(m public.exam_marks)
returns numeric language sql immutable set search_path = public as $$
  select least(m.max, coalesce(m.teacher_score, m.ai_score, m.auto_score, 0));
$$;

-- The markbook learns a new task source.
alter table public.mb_tasks drop constraint if exists mb_tasks_source_check;
alter table public.mb_tasks add constraint mb_tasks_source_check
  check (source in ('assignment', 'manual', 'tome', 'practice', 'drawing', 'exam'));


-- ── 6. Helpers ──────────────────────────────────────────────
create or replace function public.exam_new_code()
returns text language plpgsql volatile set search_path = public as $$
declare abc text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; c text; i int;
begin
  loop
    c := '';
    for i in 1..6 loop c := c || substr(abc, 1 + floor(random() * length(abc))::int, 1); end loop;
    exit when not exists (select 1 from exam_sittings where join_code = c);
  end loop;
  return c;
end $$;

-- Is the attempt past its deadline plus the grace for a last save?
create or replace function public.exam_timed_out(a public.exam_attempts)
returns boolean language sql stable set search_path = public as $$
  select a.status <> 'submitted' and now() > a.deadline + interval '90 seconds';
$$;

-- Close attempts whose time has run out (called lazily by the functions below).
create or replace function public.exam_close_expired(p_sitting uuid)
returns void language sql volatile security definer set search_path = public as $$
  update exam_attempts set status = 'submitted', submitted_at = deadline, submit_kind = 'time'
  where sitting_id = p_sitting and status <> 'submitted' and now() > deadline + interval '90 seconds';
$$;

revoke execute on function public.exam_new_code(), public.exam_close_expired(uuid),
  public.exam_timed_out(public.exam_attempts), public.exam_final_score(public.exam_marks) from public, anon, authenticated;
grant execute on function public.exam_final_score(public.exam_marks) to authenticated;


-- ── 7. Learner functions ────────────────────────────────────
-- Join with the code (or come back after a refresh / a different PC).
create or replace function public.exam_join(p_code text, p_client text default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  s exam_sittings; p exam_papers; a exam_attempts;
  v_roster uuid; v_extra int; v_mins numeric;
begin
  if uid is null then raise exception 'Sign in first.'; end if;
  select * into s from exam_sittings where join_code = upper(regexp_replace(coalesce(p_code, ''), '\s', '', 'g'));
  if not found then raise exception 'That code is not right. Check it with your teacher.'; end if;
  select id into v_roster from class_roster where class_id = s.class_id and student_id = uid and active;
  if v_roster is null then raise exception 'You are not in the class for this paper. Ask your teacher to add you.'; end if;

  perform exam_close_expired(s.id);
  select * into a from exam_attempts where sitting_id = s.id and student_id = uid;

  if not found then
    if not s.is_open then raise exception 'This paper is not open yet. Wait for your teacher.'; end if;
    if s.opens_at is not null and now() < s.opens_at then raise exception 'This paper opens at %.', to_char(s.opens_at at time zone 'Africa/Johannesburg', 'HH24:MI'); end if;
    if s.last_start_at is not null and now() > s.last_start_at then raise exception 'It is too late to start this paper. Speak to your teacher.'; end if;
    select minutes_per_hour into v_extra from exam_time_extra where roster_id = v_roster;
    v_mins := s.minutes + coalesce(v_extra, 0) * s.minutes / 60.0;
    insert into exam_attempts (sitting_id, student_id, roster_id, deadline, client_info)
    values (s.id, uid, v_roster, now() + make_interval(secs => round(v_mins * 60)), left(p_client, 300))
    returning * into a;
    insert into exam_events (attempt_id, kind, detail) values (a.id, 'start', left(p_client, 200));
  elsif a.status <> 'submitted' then
    insert into exam_events (attempt_id, kind, detail) values (a.id, 'resume', left(p_client, 200));
  end if;

  select * into p from exam_papers where id = s.paper_id;
  return jsonb_build_object(
    'attempt_id', a.id, 'sitting_id', s.id, 'title', s.title, 'minutes', s.minutes,
    'status', a.status, 'deadline', a.deadline, 'server_now', now(),
    'lock_on_exit', s.lock_on_exit, 'shuffle', s.shuffle, 'lockdown', s.lockdown,
    'answers', a.answers,
    'paper', case when a.status = 'submitted' then null else p.learner end,
    'total', p.total
  );
end $$;

-- Autosave. Replaces the answers (the browser always sends them all) and
-- records events. Refused once the time (plus 90 s grace) is over.
create or replace function public.exam_save(p_attempt uuid, p_answers jsonb, p_events jsonb default '[]'::jsonb, p_submit boolean default false)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  a exam_attempts; s exam_sittings; e jsonb; v_kind text; v_lock boolean := false; v_tools jsonb;
begin
  select * into a from exam_attempts where id = p_attempt and student_id = uid for update;
  if not found then raise exception 'Not your paper.'; end if;
  select * into s from exam_sittings where id = a.sitting_id;
  -- the paper's on-screen tools, so an open exam picks up changes the teacher makes
  select jsonb_build_object('sheets', coalesce(learner->'sheets', '[]'::jsonb), 'calculator', coalesce(learner->'calculator', 'false'::jsonb))
    into v_tools from exam_papers where id = s.paper_id;

  -- events first, so even a late save leaves a trace
  if jsonb_typeof(p_events) = 'array' then
    for e in select * from jsonb_array_elements(p_events) limit 50 loop
      v_kind := e->>'kind';
      if v_kind in ('fs_exit', 'hidden', 'blur', 'paste', 'offline', 'online', 'seb_fail') then
        insert into exam_events (attempt_id, kind, detail, client_at)
        values (a.id, v_kind, left(e->>'detail', 200),
                case when (e->>'at') ~ '^\d{4}-\d\d-\d\dT' then (e->>'at')::timestamptz end);
        if s.lock_on_exit and v_kind in ('fs_exit', 'hidden', 'blur') then v_lock := true; end if;
      end if;
    end loop;
  end if;

  if a.status = 'submitted' then
    return jsonb_build_object('status', 'submitted', 'deadline', a.deadline, 'server_now', now(), 'saved', false, 'tools', v_tools);
  end if;
  if exam_timed_out(a) then
    update exam_attempts set status = 'submitted', submitted_at = deadline, submit_kind = 'time' where id = a.id;
    return jsonb_build_object('status', 'submitted', 'deadline', a.deadline, 'server_now', now(), 'saved', false, 'tools', v_tools);
  end if;
  if jsonb_typeof(p_answers) <> 'object' or pg_column_size(p_answers) >= 400000 then raise exception 'Answers too large.'; end if;

  update exam_attempts set
    answers = p_answers, saves = saves + 1, last_saved_at = now(),
    status = case when p_submit then 'submitted' when v_lock then 'locked' else status end,
    submitted_at = case when p_submit then now() else submitted_at end,
    submit_kind = case when p_submit then (case when now() > deadline then 'time' else 'learner' end) else submit_kind end
  where id = a.id returning * into a;
  if v_lock and not p_submit then insert into exam_events (attempt_id, kind) values (a.id, 'lock'); end if;
  if p_submit then insert into exam_events (attempt_id, kind) values (a.id, 'submit'); end if;
  return jsonb_build_object('status', a.status, 'deadline', a.deadline, 'server_now', now(), 'saved', true, 'tools', v_tools);
end $$;

-- Is my locked paper unlocked yet? Have the paper's tools changed? (polled; cheap, no answers)
create or replace function public.exam_status(p_attempt uuid)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare a exam_attempts; v_tools jsonb;
begin
  select * into a from exam_attempts where id = p_attempt and student_id = auth.uid();
  if not found then raise exception 'Not your paper.'; end if;
  select jsonb_build_object('sheets', coalesce(p.learner->'sheets', '[]'::jsonb), 'calculator', coalesce(p.learner->'calculator', 'false'::jsonb))
    into v_tools from exam_sittings st join exam_papers p on p.id = st.paper_id where st.id = a.sitting_id;
  return jsonb_build_object('status', case when exam_timed_out(a) then 'submitted' else a.status end,
                            'deadline', a.deadline, 'server_now', now(), 'tools', v_tools);
end $$;

-- My released results: each item's mark and feedback, and the paper total.
create or replace function public.exam_my_results()
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'sitting_id', s.id, 'title', s.title, 'released_at', s.released_at, 'total', p.total,
    'score', (select coalesce(sum(exam_final_score(m)), 0) from exam_marks m where m.attempt_id = a.id),
    'summary', a.ai_summary,
    'items', (select coalesce(jsonb_agg(jsonb_build_object('id', m.item_id, 'max', m.max, 'score', exam_final_score(m),
                                                           'feedback', coalesce(m.teacher_note, m.ai_feedback))
                                        order by m.item_id), '[]'::jsonb)
              from exam_marks m where m.attempt_id = a.id)
  ) order by s.released_at desc), '[]'::jsonb)
  from exam_attempts a join exam_sittings s on s.id = a.sitting_id join exam_papers p on p.id = s.paper_id
  where a.student_id = auth.uid() and s.released_at is not null;
$$;


-- ── 8. Staff functions ──────────────────────────────────────
create or replace function public.exam_create_sitting(p_paper uuid, p_class uuid, p_title text, p_minutes int,
  p_opens timestamptz default null, p_last_start timestamptz default null, p_lockdown text default 'monitored',
  p_lock_on_exit boolean default true, p_term int default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare s exam_sittings; p exam_papers;
begin
  if not is_exam_staff() then raise exception 'Not allowed.'; end if;
  if not is_class_teacher(p_class) then raise exception 'You do not teach that class.'; end if;
  select * into p from exam_papers where id = p_paper;
  if not found then raise exception 'Paper not found.'; end if;
  insert into exam_sittings (paper_id, class_id, class_name, title, join_code, minutes, opens_at, last_start_at, lockdown, lock_on_exit, term)
  values (p_paper, p_class, (select left(name, 80) from classes where id = p_class), coalesce(nullif(trim(p_title), ''), p.title), exam_new_code(),
          coalesce(p_minutes, p.minutes), p_opens, p_last_start, coalesce(p_lockdown, 'monitored'), coalesce(p_lock_on_exit, true), p_term)
  returning * into s;
  return jsonb_build_object('id', s.id, 'join_code', s.join_code);
end $$;

-- The live monitor: every learner in the class, with their attempt.
create or replace function public.exam_monitor(p_sitting uuid)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare s exam_sittings;
begin
  if not is_exam_staff() then raise exception 'Not allowed.'; end if;
  select * into s from exam_sittings where id = p_sitting;
  if not found then raise exception 'Sitting not found.'; end if;
  perform exam_close_expired(p_sitting);
  return jsonb_build_object('server_now', now(), 'is_open', s.is_open, 'learners', coalesce((
    select jsonb_agg(jsonb_build_object(
      'roster_id', r.id, 'name', r.display_name, 'has_account', r.student_id is not null,
      'extra', x.minutes_per_hour,
      'attempt_id', a.id, 'status', a.status, 'started_at', a.started_at, 'deadline', a.deadline,
      'last_saved_at', a.last_saved_at, 'submitted_at', a.submitted_at, 'submit_kind', a.submit_kind,
      'answered', (select count(*) from jsonb_object_keys(coalesce(a.answers, '{}'::jsonb))),
      'flags', (select count(*) from exam_events e where e.attempt_id = a.id and e.kind in ('fs_exit', 'hidden', 'blur', 'paste')),
      'last_event', (select e.kind || ' ' || to_char(e.at at time zone 'Africa/Johannesburg', 'HH24:MI:SS')
                     from exam_events e where e.attempt_id = a.id order by e.at desc limit 1)
    ) order by coalesce(r.sort_key, r.display_name))
    from class_roster r
    left join exam_attempts a on a.sitting_id = s.id and a.student_id = r.student_id
    left join exam_time_extra x on x.roster_id = r.id
    where r.class_id = s.class_id and r.active), '[]'::jsonb));
end $$;

create or replace function public.exam_teacher_action(p_attempt uuid, p_action text, p_minutes int default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare a exam_attempts;
begin
  if not is_exam_staff() then raise exception 'Not allowed.'; end if;
  select * into a from exam_attempts where id = p_attempt for update;
  if not found then raise exception 'Attempt not found.'; end if;
  if p_action = 'unlock' then
    if a.status = 'locked' then
      update exam_attempts set status = 'writing' where id = a.id;
      insert into exam_events (attempt_id, kind) values (a.id, 'unlock');
    end if;
  elsif p_action = 'add_time' then
    if coalesce(p_minutes, 0) not between 1 and 120 then raise exception 'Add 1 to 120 minutes.'; end if;
    update exam_attempts set deadline = greatest(deadline, now()) + make_interval(mins => p_minutes) where id = a.id;
    insert into exam_events (attempt_id, kind, detail) values (a.id, 'time_added', p_minutes || ' min');
  elsif p_action = 'submit' then
    if a.status <> 'submitted' then
      update exam_attempts set status = 'submitted', submitted_at = now(), submit_kind = 'teacher' where id = a.id;
      insert into exam_events (attempt_id, kind) values (a.id, 'force_submit');
    end if;
  elsif p_action = 'reopen' then
    if coalesce(p_minutes, 0) not between 1 and 300 then raise exception 'Give 1 to 300 minutes.'; end if;
    update exam_attempts set status = 'writing', submitted_at = null, submit_kind = null,
      deadline = now() + make_interval(mins => p_minutes), mark_status = 'none' where id = a.id;
    insert into exam_events (attempt_id, kind, detail) values (a.id, 'reopen', p_minutes || ' min');
  else
    raise exception 'Unknown action.';
  end if;
  return (select to_jsonb(x) - 'answers' from exam_attempts x where x.id = a.id);
end $$;

-- Release: marks go to the markbook (one task for the class) and learners can see them.
create or replace function public.exam_release(p_sitting uuid, p_task_type text default 'Test', p_term int default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare s exam_sittings; p exam_papers; v_task uuid; n int;
begin
  if not is_exam_staff() then raise exception 'Not allowed.'; end if;
  select * into s from exam_sittings where id = p_sitting for update;
  if not found then raise exception 'Sitting not found.'; end if;
  perform exam_close_expired(p_sitting);
  if exists (select 1 from exam_attempts where sitting_id = s.id and status <> 'submitted') then
    raise exception 'Some learners are still writing. Submit or wait for them first.';
  end if;
  if exists (select 1 from exam_attempts where sitting_id = s.id and mark_status <> 'done') then
    raise exception 'Some scripts are not marked yet.';
  end if;
  select * into p from exam_papers where id = s.paper_id;

  v_task := s.mb_task_id;
  if v_task is null then
    insert into mb_tasks (class_id, source, source_ref, title, task_type, term, task_date, total)
    values (s.class_id, 'exam', s.id::text, left(s.title, 120),
            case when p_task_type in ('Test', 'Exam', 'Practical', 'Project', 'Assignment', 'Oral', 'Practice', 'Other') then p_task_type else 'Test' end,
            coalesce(p_term, s.term), (now() at time zone 'Africa/Johannesburg')::date, p.total)
    returning id into v_task;
  end if;

  -- a mark for every learner who wrote; "absent" for the rest of the class
  insert into mb_marks (task_id, roster_id, mark, status, released)
  select v_task, r.id,
         (select coalesce(sum(exam_final_score(m)), 0) from exam_marks m where m.attempt_id = a.id),
         case when a.id is null then 'absent' end, true
  from class_roster r
  left join exam_attempts a on a.sitting_id = s.id and a.student_id = r.student_id
  where r.class_id = s.class_id and r.active
  on conflict (task_id, roster_id) do update set mark = excluded.mark, status = excluded.status, released = true,
    updated_by = auth.uid(), updated_at = now();
  get diagnostics n = row_count;

  update exam_sittings set released_at = now(), mb_task_id = v_task, is_open = false where id = s.id;
  return jsonb_build_object('task_id', v_task, 'marks', n);
end $$;

-- Take a release back (learners stop seeing the marks; markbook marks are hidden again).
create or replace function public.exam_unrelease(p_sitting uuid)
returns void language plpgsql volatile security definer set search_path = public as $$
declare s exam_sittings;
begin
  if not is_exam_staff() then raise exception 'Not allowed.'; end if;
  select * into s from exam_sittings where id = p_sitting for update;
  update mb_marks set released = false where task_id = s.mb_task_id;
  update exam_sittings set released_at = null where id = s.id;
end $$;


-- ── 9. Who may call what ────────────────────────────────────
-- The security advisor flags these SECURITY DEFINER functions as callable by
-- authenticated users. That is intended: each one checks the caller itself
-- (is_exam_staff(), or the learner's own attempt / class roster).
-- Live since 2026-11-21; rolled-back permission test 36/36.
revoke execute on function
  public.exam_join(text, text), public.exam_save(uuid, jsonb, jsonb, boolean), public.exam_status(uuid), public.exam_my_results(),
  public.exam_create_sitting(uuid, uuid, text, int, timestamptz, timestamptz, text, boolean, int),
  public.exam_monitor(uuid), public.exam_teacher_action(uuid, text, int), public.exam_release(uuid, text, int), public.exam_unrelease(uuid)
from public, anon;
grant execute on function
  public.exam_join(text, text), public.exam_save(uuid, jsonb, jsonb, boolean), public.exam_status(uuid), public.exam_my_results(),
  public.exam_create_sitting(uuid, uuid, text, int, timestamptz, timestamptz, text, boolean, int),
  public.exam_monitor(uuid), public.exam_teacher_action(uuid, text, int), public.exam_release(uuid, text, int), public.exam_unrelease(uuid)
to authenticated;
