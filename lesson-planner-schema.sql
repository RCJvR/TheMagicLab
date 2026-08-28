-- ============================================================
-- THE MAGIC LAB — Lesson Planning feature schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Depends on the existing profiles / classes tables.
--
-- Two tables:
--  - teacher_cycle_config: one row per (teacher, class, subject) describing
--    which cycle-day numbers a subject meets on, so the planner can map
--    ATP weeks onto the teacher's actual timetable.
--  - lesson_plan_notes: one row per (teacher, subject, term, topic) holding
--    the teacher's own lesson-plan text for that ATP topic block.
--
-- `subject_key` matches the ATP_DATA key in dashboard-teacher.html, e.g.
-- 'mathematics-gr10-caps'. `topic_index` is that subject's topic's index
-- in its ATP_DATA topics array (stable, since ATP_DATA is static content).
-- ============================================================

create table if not exists teacher_cycle_config (
  id                  uuid primary key default gen_random_uuid(),
  teacher_id          uuid not null references profiles(id) on delete cascade,
  class_id            uuid not null references classes(id) on delete cascade,
  subject_key         text not null,
  cycle_length        int  not null default 5,
  cycle_days          int[] not null default '{}',
  periods_per_meeting int  not null default 1,
  updated_at          timestamptz not null default now(),
  unique (teacher_id, class_id, subject_key)
);

create table if not exists lesson_plan_notes (
  id              uuid primary key default gen_random_uuid(),
  teacher_id      uuid not null references profiles(id) on delete cascade,
  class_id        uuid references classes(id) on delete cascade,
  subject_key     text not null,
  topic_index     int  not null,
  objective       text,
  activity        text,
  assessment      text,
  differentiation text,
  updated_at      timestamptz not null default now(),
  unique (teacher_id, subject_key, topic_index, class_id)
);

create index if not exists idx_cycle_config_teacher on teacher_cycle_config(teacher_id);
create index if not exists idx_lesson_notes_teacher  on lesson_plan_notes(teacher_id);

alter table teacher_cycle_config enable row level security;
alter table lesson_plan_notes    enable row level security;

create policy "Teachers manage own cycle config" on teacher_cycle_config
  for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

create policy "Teachers manage own lesson plan notes" on lesson_plan_notes
  for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());
