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

-- ── 2026-10: fixed topic ids, learner subsets, and a tighter teacher rule ──
-- ref: a fixed id for each assigned topic or lesson, the same in English and
--   Afrikaans: mm:<grade>:<topic id> (Math Magician), ss:<grade>:<strand/file>
--   (Science Sage), tt:<grade>:<strand/file> (Tech Tower). Older rows have none
--   and are matched by name as before.
-- student_ids: when set, only these learners of the class get the assignment.
alter table public.assignment_topics add column if not exists ref text
  check (ref is null or ref ~ '^(mm|ss|tt):[0-9]{1,2}:[a-z0-9/_-]{1,120}$');
alter table public.assignments add column if not exists student_ids uuid[]
  check (student_ids is null or cardinality(student_ids) between 1 and 200);

alter policy "Students read class assignments" on public.assignments
  using (
    (student_ids is null or (select auth.uid()) = any (student_ids))
    and exists (
      select 1 from public.class_members
      where class_members.class_id = assignments.class_id
        and class_members.student_id = (select auth.uid())
    )
  );

alter policy "Students read topics of visible assignments" on public.assignment_topics
  using (
    exists (
      select 1 from public.assignments
      join public.class_members on class_members.class_id = assignments.class_id
      where assignments.id = assignment_topics.assignment_id
        and class_members.student_id = (select auth.uid())
        and (assignments.student_ids is null or (select auth.uid()) = any (assignments.student_ids))
    )
  );

-- A teacher may only create or move an assignment into a class they teach
-- (before, any signed-in user could create one in any class by naming
-- themselves as its teacher).
alter policy "Teachers manage own assignments" on public.assignments
  using (teacher_id = (select auth.uid()))
  with check (teacher_id = (select auth.uid()) and public.is_class_teacher(class_id));
