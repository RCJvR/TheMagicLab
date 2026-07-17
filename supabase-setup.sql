-- ============================================================
-- THE MAGIC LAB — Supabase setup
-- Everything needed for the Assignments and Live Game features.
--
-- HOW TO RUN: Supabase Dashboard → your project → SQL Editor →
-- New query → paste this whole file → Run. Safe to re-run — every
-- statement is idempotent (create-if-not-exists / create-or-replace).
--
-- Assumes these tables already exist in your project (created earlier,
-- not part of this file): profiles, classes, class_members,
-- tool_progress, progress_events, daily_activity, user_badges,
-- teacher_training_progress.
--
-- This file is the concatenation of assignments-schema.sql and
-- game-schema.sql from the repo, in that order. If you edit the
-- schema going forward, edit those two files and regenerate this one
-- (or just run them separately) — don't hand-edit this file only.
-- ============================================================


-- ══════════════════════════════════════════════════════════════════════
-- PART 1 — ASSIGNMENTS
-- ══════════════════════════════════════════════════════════════════════

-- ============================================================
-- THE MAGIC LAB — Assignments feature schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Depends on the existing profiles / classes / class_members tables.
-- ============================================================

create table if not exists assignments (
  id           uuid primary key default gen_random_uuid(),
  class_id     uuid not null references classes(id) on delete cascade,
  teacher_id   uuid not null references profiles(id) on delete cascade,
  tool         text not null,
  title        text not null,
  instructions text,
  due_date     date,
  created_at   timestamptz not null default now()
);

-- One row per lesson topic included in an assignment. An assignment with no
-- rows here is "tool-wide" — see the completion rules in assignments.js.
create table if not exists assignment_topics (
  assignment_id uuid not null references assignments(id) on delete cascade,
  topic         text not null,
  primary key (assignment_id, topic)
);

create index if not exists idx_assignments_class     on assignments(class_id);
create index if not exists idx_assignments_teacher    on assignments(teacher_id);
create index if not exists idx_assignment_topics_aid  on assignment_topics(assignment_id);

alter table assignments enable row level security;
alter table assignment_topics enable row level security;

-- Teachers have full control over assignments in classes they own.
create policy "Teachers manage own assignments" on assignments
  for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

-- Students can read assignments for classes they belong to.
create policy "Students read class assignments" on assignments
  for select
  using (
    exists (
      select 1 from class_members
      where class_members.class_id  = assignments.class_id
      and   class_members.student_id = auth.uid()
    )
  );

-- assignment_topics visibility mirrors the parent assignment.
create policy "Teachers manage own assignment topics" on assignment_topics
  for all
  using (
    exists (
      select 1 from assignments
      where assignments.id = assignment_topics.assignment_id
      and   assignments.teacher_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from assignments
      where assignments.id = assignment_topics.assignment_id
      and   assignments.teacher_id = auth.uid()
    )
  );

create policy "Students read topics of visible assignments" on assignment_topics
  for select
  using (
    exists (
      select 1 from assignments
      join class_members on class_members.class_id = assignments.class_id
      where assignments.id = assignment_topics.assignment_id
      and   class_members.student_id = auth.uid()
    )
  );


-- ══════════════════════════════════════════════════════════════════════
-- PART 2 — LIVE GAME (Kahoot-style)
-- ══════════════════════════════════════════════════════════════════════

-- ============================================================
-- THE MAGIC LAB — Live Game (Kahoot-style) feature schema
-- Run this once in the Supabase SQL editor, after assignments-schema.sql.
-- Depends on the existing profiles / classes tables.
-- ============================================================

-- Public-safe session state. `questions_public` NEVER contains a correct-
-- answer flag — only {q, opts:[text,...]} — so it's safe for any logged-in
-- user to read directly (needed so a player can look up a session by join
-- code before they've joined it, and so both host and player screens can
-- poll status/current_index without a round trip through a function).
create table if not exists game_sessions (
  id                  uuid primary key default gen_random_uuid(),
  host_teacher_id     uuid not null references profiles(id) on delete cascade,
  class_id            uuid references classes(id) on delete set null,
  tool                text not null,
  title               text not null,
  join_code           text not null unique,
  status              text not null default 'lobby' check (status in ('lobby','question','reveal','ended')),
  questions_public    jsonb not null,
  question_count      int not null,
  current_index       int not null default 0,
  question_started_at timestamptz,
  question_seconds    int not null default 20,
  created_at          timestamptz not null default now()
);

-- Correct answers live ONLY here, in a table with no student-facing SELECT
-- policy at all — see submit_game_answer() below, which is the sole way a
-- player's client ever learns whether an answer was right.
create table if not exists game_answer_keys (
  session_id            uuid not null references game_sessions(id) on delete cascade,
  question_index        int not null,
  correct_option_index  int not null,
  primary key (session_id, question_index)
);

create table if not exists game_participants (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references game_sessions(id) on delete cascade,
  student_id   uuid references profiles(id) on delete cascade,
  display_name text not null,
  score        int not null default 0,
  joined_at    timestamptz not null default now(),
  unique (session_id, student_id)
);

-- One row per participant per question, written only by submit_game_answer().
create table if not exists game_answers (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid not null references game_sessions(id) on delete cascade,
  participant_id  uuid not null references game_participants(id) on delete cascade,
  question_index  int not null,
  option_index    int not null,
  is_correct      boolean not null,
  points_awarded  int not null default 0,
  response_ms     int not null,
  answered_at     timestamptz not null default now(),
  unique (participant_id, question_index)
);

create index if not exists idx_game_sessions_join_code   on game_sessions(join_code);
create index if not exists idx_game_participants_session on game_participants(session_id);
create index if not exists idx_game_answers_session_q     on game_answers(session_id, question_index);

alter table game_sessions     enable row level security;
alter table game_answer_keys  enable row level security;
alter table game_participants enable row level security;
alter table game_answers      enable row level security;

-- ── game_sessions ────────────────────────────────────────────────────────
-- Host has full control over sessions they created.
create policy "Host manages own sessions" on game_sessions
  for all
  using (host_teacher_id = auth.uid())
  with check (host_teacher_id = auth.uid());

-- Any logged-in user can read a session — needed to look a session up by
-- join code before becoming a participant, and for both host/player screens
-- to poll status. Safe: questions_public never carries correct-answer data.
create policy "Logged-in users can read sessions" on game_sessions
  for select
  using (auth.uid() is not null);

-- ── game_answer_keys ─────────────────────────────────────────────────────
-- Host-only. No participant policy exists on this table at all — students
-- get correctness exclusively via submit_game_answer()'s return value.
create policy "Host manages own answer keys" on game_answer_keys
  for all
  using (exists (
    select 1 from game_sessions
    where game_sessions.id = game_answer_keys.session_id
    and   game_sessions.host_teacher_id = auth.uid()
  ))
  with check (exists (
    select 1 from game_sessions
    where game_sessions.id = game_answer_keys.session_id
    and   game_sessions.host_teacher_id = auth.uid()
  ));

-- ── game_participants ────────────────────────────────────────────────────
-- A logged-in student can join (insert their own row).
create policy "Students join sessions" on game_participants
  for insert
  with check (student_id = auth.uid());

-- The host can see everyone in their own session.
create policy "Host reads own session participants" on game_participants
  for select
  using (exists (
    select 1 from game_sessions
    where game_sessions.id = game_participants.session_id
    and   game_sessions.host_teacher_id = auth.uid()
  ));

-- A participant can see the rest of the lobby/leaderboard for any session
-- they've joined (name + score only — this is the intended public
-- leaderboard, same as Kahoot showing everyone's rank).
create policy "Participants read the lobby they're in" on game_participants
  for select
  using (exists (
    select 1 from game_participants gp2
    where gp2.session_id = game_participants.session_id
    and   gp2.student_id = auth.uid()
  ));

-- ── game_answers ─────────────────────────────────────────────────────────
-- Host-only read access (for the live "N of M answered" count and the
-- per-option bar chart on the reveal screen). No insert policy — all writes
-- go through submit_game_answer() below.
create policy "Host reads own session answers" on game_answers
  for select
  using (exists (
    select 1 from game_sessions
    where game_sessions.id = game_answers.session_id
    and   game_sessions.host_teacher_id = auth.uid()
  ));

-- ── RPCs ─────────────────────────────────────────────────────────────────

create or replace function generate_game_code() returns text
language plpgsql as $$
declare
  code text;
  already_used boolean;
begin
  loop
    code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    select exists(select 1 from game_sessions where join_code = code) into already_used;
    exit when not already_used;
  end loop;
  return code;
end;
$$;

-- The only path by which a student's client learns an answer's correctness.
-- Scoring: 500 base points for a correct answer, plus up to 500 more for
-- speed — linear from question_seconds (0 bonus) down to 0ms (full bonus).
-- Runs as the function owner (security definer) specifically so it can read
-- game_answer_keys, which the calling student has no SELECT grant on.
create or replace function submit_game_answer(
  p_session_id     uuid,
  p_question_index int,
  p_option_index   int,
  p_response_ms    int
) returns jsonb
language plpgsql security definer as $$
declare
  v_participant_id uuid;
  v_correct_index  int;
  v_seconds        int;
  v_is_correct     boolean;
  v_points         int;
  v_speed_frac     numeric;
  v_inserted       int;
begin
  select id into v_participant_id from game_participants
    where session_id = p_session_id and student_id = auth.uid();
  if v_participant_id is null then
    return jsonb_build_object('error', 'not a participant of this session');
  end if;

  select correct_option_index into v_correct_index from game_answer_keys
    where session_id = p_session_id and question_index = p_question_index;
  if v_correct_index is null then
    return jsonb_build_object('error', 'question not found');
  end if;

  select question_seconds into v_seconds from game_sessions where id = p_session_id;

  v_is_correct := (p_option_index = v_correct_index);
  if v_is_correct then
    v_speed_frac := greatest(0, least(1, 1 - (p_response_ms::numeric / greatest(1, v_seconds * 1000))));
    v_points := 500 + round(500 * v_speed_frac);
  else
    v_points := 0;
  end if;

  insert into game_answers (session_id, participant_id, question_index, option_index, is_correct, points_awarded, response_ms)
  values (p_session_id, v_participant_id, p_question_index, p_option_index, v_is_correct, v_points, p_response_ms)
  on conflict (participant_id, question_index) do nothing;
  get diagnostics v_inserted = row_count;

  if v_inserted > 0 then
    update game_participants set score = score + v_points where id = v_participant_id;
  else
    -- Already answered this question — don't award points twice, but still
    -- tell the client what actually happened the first time.
    select is_correct, points_awarded into v_is_correct, v_points from game_answers
      where participant_id = v_participant_id and question_index = p_question_index;
  end if;

  return jsonb_build_object('correct', v_is_correct, 'points', v_points, 'correctOptionIndex', v_correct_index);
end;
$$;
