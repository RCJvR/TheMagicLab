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
