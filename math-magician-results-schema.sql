-- Math Magician: each learner's practice results, one row per grade.
-- `data` is the same compact record practice-results.js keeps in the browser:
--   { t: { topicId: [recent 0/1 results] }, q: { "topicId:qIndex": 0|1 }, l: { K|R|C|P: [correct, total] }, u: last-change ms }
-- Learners read and write their own rows; class teachers can read their learners' rows.

create table if not exists public.mm_results (
  user_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  grade      smallint not null check (grade between 8 and 12),
  data       jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object' and pg_column_size(data) < 200000),
  updated_at timestamptz not null default now(),
  primary key (user_id, grade)
);

-- No policy for anon, so signed-out visitors can neither read nor write rows.
alter table public.mm_results enable row level security;

drop policy if exists mm_results_own_read on public.mm_results;
create policy mm_results_own_read on public.mm_results
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists mm_results_own_insert on public.mm_results;
create policy mm_results_own_insert on public.mm_results
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists mm_results_own_update on public.mm_results;
create policy mm_results_own_update on public.mm_results
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists mm_results_teacher_read on public.mm_results;
create policy mm_results_teacher_read on public.mm_results
  for select to authenticated using (public.teacher_has_student(user_id));
