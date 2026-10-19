-- Lesson quiz results per learner, tool and grade: Science Sage, Tech Tower and Computer Codex
-- (computer-codex added 2026-10; Coding & Robotics is stored as grade 8, lesson ids are <track>/<slug>).
-- `data` is the record lesson-results.js keeps in the browser:
--   { l: { "strand/file": { r: [recent 0/1], q: { qIndex: 0|1 }, d: finished-ms, t: last-ms } }, u: last-change ms }
-- Learners read and write their own rows; class teachers can read their learners' rows.

create table if not exists public.lesson_results (
  user_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  tool       text not null check (tool in ('science-sage', 'tech-tower', 'computer-codex')),
  grade      smallint not null check (grade between 1 and 12),
  data       jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object' and pg_column_size(data) < 200000),
  updated_at timestamptz not null default now(),
  primary key (user_id, tool, grade)
);

-- No policy for anon, so signed-out visitors can neither read nor write rows.
alter table public.lesson_results enable row level security;

drop policy if exists lesson_results_own_read on public.lesson_results;
create policy lesson_results_own_read on public.lesson_results
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists lesson_results_own_insert on public.lesson_results;
create policy lesson_results_own_insert on public.lesson_results
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists lesson_results_own_update on public.lesson_results;
create policy lesson_results_own_update on public.lesson_results
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists lesson_results_teacher_read on public.lesson_results;
create policy lesson_results_teacher_read on public.lesson_results
  for select to authenticated using (public.teacher_has_student(user_id));

-- 2026-10: Computer Codex joins (for databases created before it was in the check above).
alter table public.lesson_results drop constraint if exists lesson_results_tool_check;
alter table public.lesson_results add constraint lesson_results_tool_check
  check (tool in ('science-sage', 'tech-tower', 'computer-codex'));
