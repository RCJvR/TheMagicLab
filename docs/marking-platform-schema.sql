-- ============================================================
-- THE MAGIC LAB — Grading Grimoire (submission + marking platform)
-- DRAFT FOR REVIEW. NOT RUN ON ANY DATABASE YET. Do not paste into the
-- SQL editor until the spec (docs/marking-platform-spec.md) is approved;
-- it will then be split into a root-level *-schema.sql per phase.
--
-- Depends on: profiles, classes (id, teacher_id, name, grade, subject),
-- class_members (class_id, student_id), assignments (+ student_ids),
-- public.is_class_teacher(uuid), public.teacher_has_student(uuid).
-- House style: idempotent (if not exists / or replace / drop policy if
-- exists), (select auth.uid()) in policies, size checks on text, no anon
-- access, security definer functions with search_path = public and
-- execute revoked from public/anon.
--
-- Sections
--   0. Co-teachers                      (phase 0, before anything else)
--   1. Class roster                     (phase 0)
--   2. Rubrics                          (phase 0)
--   3. Assignments: new columns         (phase 1)
--   4. Submissions, versions, annotations, rubric scores (phase 1)
--   5. Comment bank                     (phase 2)
--   6. Markbook                         (phase 0 tables, phase 2 UI)
--   7. Audit log                        (phase 1)
--   8. Helper functions + RPCs          (phase 1)
--   9. Storage bucket                   (phase 1)
-- ============================================================


-- ══════════════════════════════════════════════════════════════════════
-- 0. CO-TEACHERS (decided 2026-11-12, spec §6.7)
-- classes.teacher_id stays the class OWNER. class_teachers holds extra
-- teachers, who can do everything in the class except delete it, rename it,
-- or manage the teacher list. Because almost every teacher policy goes through
-- is_class_teacher() / teacher_has_student(), widening those two functions
-- gives co-teachers access everywhere at once. Live definitions read on
-- 2026-11-12 (both: classes.teacher_id = auth.uid() only).
-- ══════════════════════════════════════════════════════════════════════
create table if not exists public.class_teachers (
  class_id    uuid not null references public.classes(id) on delete cascade,
  teacher_id  uuid not null references public.profiles(id) on delete cascade,
  added_by    uuid references public.profiles(id) on delete set null,
  added_at    timestamptz not null default now(),
  primary key (class_id, teacher_id)
);
create index if not exists class_teachers_teacher_idx on public.class_teachers (teacher_id);

-- Owner invites a colleague with a one-time code (like the class join code), so
-- no teacher can look up whether an email address has an account.
create table if not exists public.class_teacher_invites (
  code        text primary key check (code ~ '^[A-HJ-NP-Z2-9]{8}$'),
  class_id    uuid not null references public.classes(id) on delete cascade,
  created_by  uuid not null references public.profiles(id) on delete cascade,
  expires_at  timestamptz not null default now() + interval '7 days',
  used_by     uuid references public.profiles(id) on delete set null,
  used_at     timestamptz
);

alter table public.class_teachers enable row level security;
alter table public.class_teacher_invites enable row level security;
revoke all on public.class_teachers, public.class_teacher_invites from anon;
revoke insert, update on public.class_teachers from authenticated;     -- only via accept_co_teacher_invite()
grant select, delete on public.class_teachers to authenticated;
grant select, delete on public.class_teacher_invites to authenticated;  -- created via create_co_teacher_invite()

create or replace function public.is_class_owner(p_class_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from classes where id = p_class_id and teacher_id = (select auth.uid()));
$$;

-- Widened: owner OR co-teacher. Same signature and argument name as the live function.
create or replace function public.is_class_teacher(p_class_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from classes where id = p_class_id and teacher_id = (select auth.uid()))
      or exists (select 1 from class_teachers where class_id = p_class_id and teacher_id = (select auth.uid()));
$$;

create or replace function public.teacher_has_student(p_student_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from class_members cm join classes c on c.id = cm.class_id
    where cm.student_id = p_student_id
      and (c.teacher_id = (select auth.uid())
           or exists (select 1 from class_teachers t where t.class_id = c.id and t.teacher_id = (select auth.uid()))));
$$;
revoke execute on function public.is_class_owner(uuid), public.is_class_teacher(uuid), public.teacher_has_student(uuid) from public, anon;
grant execute on function public.is_class_owner(uuid), public.is_class_teacher(uuid), public.teacher_has_student(uuid) to authenticated;

drop policy if exists class_teachers_read on public.class_teachers;
create policy class_teachers_read on public.class_teachers for select to authenticated
  using (public.is_class_teacher(class_id));
drop policy if exists class_teachers_remove on public.class_teachers;
create policy class_teachers_remove on public.class_teachers for delete to authenticated
  using (public.is_class_owner(class_id) or teacher_id = (select auth.uid()));   -- owner removes, or a co-teacher leaves
drop policy if exists class_teacher_invites_owner on public.class_teacher_invites;
create policy class_teacher_invites_owner on public.class_teacher_invites for select to authenticated
  using (public.is_class_owner(class_id));
drop policy if exists class_teacher_invites_owner_delete on public.class_teacher_invites;
create policy class_teacher_invites_owner_delete on public.class_teacher_invites for delete to authenticated
  using (public.is_class_owner(class_id));

create or replace function public.create_co_teacher_invite(p_class uuid)
returns text language plpgsql security definer set search_path = public as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  c text;
begin
  if not is_class_owner(p_class) then raise exception 'Only the class owner can invite'; end if;
  if (select count(*) from class_teachers where class_id = p_class) >= 5 then raise exception 'A class can have at most 5 co-teachers'; end if;
  loop
    c := (select string_agg(substr(alphabet, 1 + floor(random() * 32)::int, 1), '') from generate_series(1, 8));
    exit when not exists (select 1 from class_teacher_invites where code = c);
  end loop;
  insert into class_teacher_invites (code, class_id, created_by) values (c, p_class, auth.uid());
  return c;
end $$;

create or replace function public.accept_co_teacher_invite(p_code text)
returns uuid language plpgsql security definer set search_path = public as $$
declare inv class_teacher_invites;
begin
  if not exists (select 1 from profiles where id = auth.uid() and role = 'teacher') then
    raise exception 'Only teacher accounts can co-teach';
  end if;
  select * into inv from class_teacher_invites
   where code = upper(trim(p_code)) and used_by is null and expires_at > now() for update;
  if inv.code is null then raise exception 'That code is not valid or has expired'; end if;
  if exists (select 1 from classes where id = inv.class_id and teacher_id = auth.uid()) then
    raise exception 'You already own this class';
  end if;
  insert into class_teachers (class_id, teacher_id, added_by) values (inv.class_id, auth.uid(), inv.created_by)
  on conflict do nothing;
  update class_teacher_invites set used_by = auth.uid(), used_at = now() where code = inv.code;
  return inv.class_id;
end $$;
revoke execute on function public.create_co_teacher_invite(uuid), public.accept_co_teacher_invite(text) from public, anon;
grant execute on function public.create_co_teacher_invite(uuid), public.accept_co_teacher_invite(text) to authenticated;

-- Existing policies that test classes.teacher_id directly instead of the helpers
-- (found by a pg_policy scan on 2026-11-12). Each must change too:
--   classes "Teachers manage own classes" / classes_teacher_own  → keep for the owner (update, delete),
--     and add a read policy for co-teachers:
drop policy if exists classes_co_teacher_read on public.classes;
create policy classes_co_teacher_read on public.classes for select to authenticated
  using (exists (select 1 from public.class_teachers t where t.class_id = classes.id and t.teacher_id = (select auth.uid())));
--   assignments "Teachers manage own assignments" (teacher_id = auth.uid()) → any teacher of the class:
alter policy "Teachers manage own assignments" on public.assignments
  using (public.is_class_teacher(class_id))
  with check (public.is_class_teacher(class_id));
--   (teacher_id keeps meaning "who created it"; the client sets it to the signed-in teacher on insert.)
--   progress_events "progress_events_teacher_read" and class_timetables
--   "Class teacher manages their class timetable" join classes.teacher_id directly: rewrite each
--   to use public.teacher_has_student(user_id) / public.is_class_teacher(class_id). Their full
--   current text must be read from pg_policy when this section is turned into a migration.
-- Client code: every query of the form classes … .eq('teacher_id', me) (teacher dashboard class
-- list, assignment creation, Arena, Test Tome sharing) must also list classes from class_teachers.


-- ══════════════════════════════════════════════════════════════════════
-- 1. CLASS ROSTER — one row per learner per class; account optional
-- ══════════════════════════════════════════════════════════════════════
create table if not exists public.class_roster (
  id            uuid primary key default gen_random_uuid(),
  class_id      uuid not null references public.classes(id) on delete cascade,
  student_id    uuid references public.profiles(id) on delete set null,  -- null = name-only learner
  display_name  text not null check (char_length(display_name) between 1 and 80),
  admission_no  text check (admission_no is null or admission_no ~ '^[A-Za-z0-9/_-]{1,20}$'),
  sort_key      text check (char_length(sort_key) <= 80),                -- e.g. surname for ordering
  active        boolean not null default true,                            -- left the class: keep marks, hide
  import_ref    text check (char_length(import_ref) <= 80),              -- local id from the browser import
  created_at    timestamptz not null default now(),
  unique (class_id, student_id)
);
create unique index if not exists class_roster_class_name_uq
  on public.class_roster (class_id, lower(display_name));
create index if not exists class_roster_student_idx on public.class_roster (student_id);

alter table public.class_roster enable row level security;
revoke all on public.class_roster from anon;
grant select, insert, update, delete on public.class_roster to authenticated;

drop policy if exists class_roster_teacher_all on public.class_roster;
create policy class_roster_teacher_all on public.class_roster for all to authenticated
  using (public.is_class_teacher(class_id)) with check (public.is_class_teacher(class_id));
drop policy if exists class_roster_learner_own on public.class_roster;
create policy class_roster_learner_own on public.class_roster for select to authenticated
  using (student_id = (select auth.uid()));

-- When a learner joins a class, give them a roster row. If a name-only row with
-- the same name exists it is NOT linked automatically (two learners can share a
-- name); the marking UI offers the teacher a one-click link instead.
create or replace function public.roster_on_member_join()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into class_roster (class_id, student_id, display_name)
  select new.class_id, new.student_id,
         coalesce(nullif(trim(p.display_name), ''), 'Learner')
           || case when exists (select 1 from class_roster r
                                where r.class_id = new.class_id
                                  and lower(r.display_name) = lower(coalesce(nullif(trim(p.display_name), ''), 'Learner')))
                   then ' (' || left(new.student_id::text, 4) || ')' else '' end
  from profiles p where p.id = new.student_id
  on conflict (class_id, student_id) do update set active = true;
  return new;
end $$;
revoke execute on function public.roster_on_member_join() from public, anon;
drop trigger if exists trg_roster_on_member_join on public.class_members;
create trigger trg_roster_on_member_join after insert on public.class_members
  for each row execute function public.roster_on_member_join();

-- Leaving a class keeps the roster row (and its marks) but marks it inactive.
create or replace function public.roster_on_member_leave()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update class_roster set active = false where class_id = old.class_id and student_id = old.student_id;
  return old;
end $$;
revoke execute on function public.roster_on_member_leave() from public, anon;
drop trigger if exists trg_roster_on_member_leave on public.class_members;
create trigger trg_roster_on_member_leave after delete on public.class_members
  for each row execute function public.roster_on_member_leave();

-- One-time backfill (run once after creating the table):
-- insert into public.class_roster (class_id, student_id, display_name)
-- select m.class_id, m.student_id, coalesce(nullif(trim(p.display_name), ''), 'Learner') || ' (' || left(m.student_id::text, 4) || ')'
-- from public.class_members m join public.profiles p on p.id = m.student_id
-- on conflict do nothing;
-- (Suffix only added in the backfill to dodge name clashes; teachers can rename.)


-- ══════════════════════════════════════════════════════════════════════
-- 2. RUBRICS — header + immutable versions (definition JSON, spec §4.3)
-- ══════════════════════════════════════════════════════════════════════
create table if not exists public.rubrics (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 200),
  subject     text check (char_length(subject) <= 60),
  grade       smallint check (grade between 1 and 12),
  type        text not null check (type in ('analytic_points', 'analytic_range', 'holistic',
                                            'single_point', 'checklist', 'marking_grid')),
  current_version int not null default 0,
  import_ref  text check (char_length(import_ref) <= 80),
  archived    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists rubrics_owner_idx on public.rubrics (owner_id, updated_at desc);

create table if not exists public.rubric_versions (
  id          uuid primary key default gen_random_uuid(),
  rubric_id   uuid not null references public.rubrics(id) on delete cascade,
  version     int not null check (version >= 1),
  definition  jsonb not null check (
                jsonb_typeof(definition) = 'object'
                and definition ? 'type' and definition ? 'criteria'
                and jsonb_typeof(definition -> 'criteria') = 'array'
                and jsonb_array_length(definition -> 'criteria') between 1 and 60
                and pg_column_size(definition) < 200000),
  max_score   numeric(7,2) not null check (max_score > 0),   -- worked out by the client, checked on save
  created_at  timestamptz not null default now(),
  unique (rubric_id, version)
);

alter table public.rubrics enable row level security;
alter table public.rubric_versions enable row level security;
revoke all on public.rubrics, public.rubric_versions from anon;
grant select, insert, update, delete on public.rubrics to authenticated;
grant select, insert on public.rubric_versions to authenticated;   -- versions are immutable

drop policy if exists rubrics_owner_all on public.rubrics;
create policy rubrics_owner_all on public.rubrics for all to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

drop policy if exists rubric_versions_owner_read on public.rubric_versions;
create policy rubric_versions_owner_read on public.rubric_versions for select to authenticated
  using (exists (select 1 from public.rubrics r where r.id = rubric_id and r.owner_id = (select auth.uid())));
drop policy if exists rubric_versions_owner_insert on public.rubric_versions;
create policy rubric_versions_owner_insert on public.rubric_versions for insert to authenticated
  with check (exists (select 1 from public.rubrics r where r.id = rubric_id and r.owner_id = (select auth.uid())));
-- Learner + class-teacher read of an assignment's rubric: policy added in §3 (needs assignments columns).


-- ══════════════════════════════════════════════════════════════════════
-- 3. ASSIGNMENTS — written tasks alongside lesson assignments (spec §5)
-- ══════════════════════════════════════════════════════════════════════
alter table public.assignments add column if not exists kind text not null default 'lessons'
  check (kind in ('lessons', 'written'));
alter table public.assignments add column if not exists due_at timestamptz;
alter table public.assignments add column if not exists close_at timestamptz;
alter table public.assignments add column if not exists allow_resubmit boolean not null default false;
alter table public.assignments add column if not exists max_attempts smallint not null default 1
  check (max_attempts between 1 and 10);
alter table public.assignments add column if not exists brief jsonb
  check (brief is null or (jsonb_typeof(brief) = 'object' and pg_column_size(brief) < 300000));
alter table public.assignments add column if not exists template jsonb
  check (template is null or (jsonb_typeof(template) = 'object' and pg_column_size(template) < 300000));
alter table public.assignments add column if not exists scoring text
  check (scoring is null or scoring in ('ticks', 'rubric', 'ticks_rubric', 'direct'));
alter table public.assignments add column if not exists total_marks numeric(7,2)
  check (total_marks is null or total_marks > 0);
alter table public.assignments add column if not exists rubric_version_id uuid
  references public.rubric_versions(id) on delete restrict;
alter table public.assignments add column if not exists term smallint check (term is null or term between 1 and 4);
alter table public.assignments add column if not exists task_type text
  check (task_type is null or task_type in ('Test', 'Exam', 'Practical', 'Project', 'Assignment', 'Oral', 'Other'));
alter table public.assignments add column if not exists word_limit int check (word_limit is null or word_limit between 1 and 20000);

-- A written task needs a scoring rule and a total; close_at cannot be before due_at.
alter table public.assignments drop constraint if exists assignments_written_check;
alter table public.assignments add constraint assignments_written_check check (
  kind <> 'written' or (scoring is not null and total_marks is not null and due_at is not null
                        and (close_at is null or close_at >= due_at)
                        and (scoring not in ('rubric', 'ticks_rubric') or rubric_version_id is not null)));

-- Numbered questions with max marks, for tick totals (spec §3.5).
create table if not exists public.assignment_questions (
  id            uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  number        text not null check (number ~ '^[0-9A-Za-z.()]{1,12}$'),   -- "1.1", "2.3(a)"
  label         text check (char_length(label) <= 200),
  max_marks     numeric(6,2) not null check (max_marks >= 0),
  position      smallint not null,
  unique (assignment_id, number)
);

-- Per-learner extensions.
create table if not exists public.assignment_extensions (
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id    uuid not null references public.profiles(id) on delete cascade,
  due_at        timestamptz not null,
  close_at      timestamptz,
  note          text check (char_length(note) <= 300),
  primary key (assignment_id, student_id)
);

alter table public.assignment_questions enable row level security;
alter table public.assignment_extensions enable row level security;
revoke all on public.assignment_questions, public.assignment_extensions from anon;
grant select, insert, update, delete on public.assignment_questions, public.assignment_extensions to authenticated;


-- ══════════════════════════════════════════════════════════════════════
-- 8a. HELPERS (defined before the policies that use them)
-- ══════════════════════════════════════════════════════════════════════
create or replace function public.can_mark_assignment(p_assignment uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from assignments a where a.id = p_assignment and is_class_teacher(a.class_id));
$$;

create or replace function public.is_assignment_learner(p_assignment uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from assignments a
    join class_members m on m.class_id = a.class_id and m.student_id = (select auth.uid())
    where a.id = p_assignment
      and (a.student_ids is null or (select auth.uid()) = any (a.student_ids)));
$$;
revoke execute on function public.can_mark_assignment(uuid), public.is_assignment_learner(uuid) from public, anon;
grant execute on function public.can_mark_assignment(uuid), public.is_assignment_learner(uuid) to authenticated;

drop policy if exists assignment_questions_teacher on public.assignment_questions;
create policy assignment_questions_teacher on public.assignment_questions for all to authenticated
  using (public.can_mark_assignment(assignment_id)) with check (public.can_mark_assignment(assignment_id));
drop policy if exists assignment_questions_learner on public.assignment_questions;
create policy assignment_questions_learner on public.assignment_questions for select to authenticated
  using (public.is_assignment_learner(assignment_id));

drop policy if exists assignment_extensions_teacher on public.assignment_extensions;
create policy assignment_extensions_teacher on public.assignment_extensions for all to authenticated
  using (public.can_mark_assignment(assignment_id)) with check (public.can_mark_assignment(assignment_id));
drop policy if exists assignment_extensions_learner on public.assignment_extensions;
create policy assignment_extensions_learner on public.assignment_extensions for select to authenticated
  using (student_id = (select auth.uid()));

-- Learners and class teachers may read the rubric version an assignment uses.
drop policy if exists rubric_versions_assignment_read on public.rubric_versions;
create policy rubric_versions_assignment_read on public.rubric_versions for select to authenticated
  using (exists (select 1 from public.assignments a
                 where a.rubric_version_id = rubric_versions.id
                   and (public.is_assignment_learner(a.id) or public.can_mark_assignment(a.id))));


-- ══════════════════════════════════════════════════════════════════════
-- 4. SUBMISSIONS
-- ══════════════════════════════════════════════════════════════════════
create table if not exists public.submissions (
  id              uuid primary key default gen_random_uuid(),
  assignment_id   uuid not null references public.assignments(id) on delete cascade,
  student_id      uuid not null references public.profiles(id) on delete cascade,
  status          text not null default 'draft'
                    check (status in ('draft', 'submitted', 'marking', 'returned', 'reopened')),
  -- learner's working copy (written only by save_draft)
  draft_doc       jsonb not null default '{"type":"doc","content":[]}'::jsonb
                    check (jsonb_typeof(draft_doc) = 'object' and pg_column_size(draft_doc) < 1048576),
  doc_schema      smallint not null default 1,
  draft_version   int not null default 0,
  draft_saved_at  timestamptz,
  attempt         smallint not null default 0,          -- number of submitted versions
  released_at     timestamptz,                           -- set only by release_marks()
  created_at      timestamptz not null default now(),
  unique (assignment_id, student_id)
);
create index if not exists submissions_assignment_idx on public.submissions (assignment_id, status);
create index if not exists submissions_student_idx on public.submissions (student_id);

create table if not exists public.submission_versions (
  id             uuid primary key default gen_random_uuid(),
  submission_id  uuid not null references public.submissions(id) on delete cascade,
  attempt        smallint not null check (attempt >= 1),
  doc            jsonb not null check (jsonb_typeof(doc) = 'object' and pg_column_size(doc) < 1048576),
  doc_schema     smallint not null,
  doc_text       text not null default '' check (char_length(doc_text) <= 200000),
  word_count     int not null default 0,
  image_paths    text[] not null default '{}' check (cardinality(image_paths) <= 30),
  submitted_at   timestamptz not null default now(),
  is_late        boolean not null default false,
  unique (submission_id, attempt)
);
-- Marking columns live in their own table so that RLS can hide them until release
-- (RLS works per row, not per column; a learner may read their submissions row any time).
create table if not exists public.submission_marks (
  submission_id   uuid primary key references public.submissions(id) on delete cascade,
  score           numeric(7,2) check (score is null or score >= 0),
  score_max       numeric(7,2) check (score_max is null or score_max > 0),
  question_overrides jsonb check (question_overrides is null or jsonb_typeof(question_overrides) = 'object'),
  overall_comment text check (char_length(overall_comment) <= 4000),
  marked_version  uuid references public.submission_versions(id) on delete set null,  -- version the score belongs to
  marked_by       uuid default auth.uid() references public.profiles(id) on delete set null,
  marked_at       timestamptz not null default now()
);

create table if not exists public.annotations (
  id          uuid primary key default gen_random_uuid(),
  version_id  uuid not null references public.submission_versions(id) on delete cascade,
  author_id   uuid not null default auth.uid() references public.profiles(id) on delete set null,
  layer       text not null default 'marker' check (layer in ('marker', 'moderator')),
  type        text not null check (type in ('tick', 'cross', 'comment', 'stamp', 'highlight', 'pen')),
  anchor      jsonb not null check (
                jsonb_typeof(anchor) = 'object'
                and anchor ->> 'kind' in ('point', 'box', 'range', 'region')
                and pg_column_size(anchor) < 20000),
  marks       numeric(5,2) check (marks is null or marks between -100 and 100),
  question_id uuid references public.assignment_questions(id) on delete set null,  -- resolved by the client, spec §3.5
  body        text check (char_length(body) <= 2000),
  stamp       text check (char_length(stamp) <= 40),
  colour      text check (colour is null or colour in ('yellow', 'green', 'blue')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists annotations_version_idx on public.annotations (version_id);

-- A rubric score belongs to a submission OR to a markbook mark (rubric marking without a submission).
create table if not exists public.rubric_scores (
  id                 uuid primary key default gen_random_uuid(),
  rubric_version_id  uuid not null references public.rubric_versions(id) on delete restrict,
  submission_id      uuid references public.submissions(id) on delete cascade,
  mb_mark_id         uuid,                               -- FK added in §6
  criterion_id       text not null check (criterion_id ~ '^[A-Za-z0-9_-]{1,24}$'),
  level_id           text check (level_id is null or level_id ~ '^[A-Za-z0-9_-]{1,24}$'),
  mark               numeric(6,2) check (mark is null or mark >= 0),
  note               text check (char_length(note) <= 1000),
  updated_at         timestamptz not null default now(),
  check ((submission_id is null) <> (mb_mark_id is null))
);
create unique index if not exists rubric_scores_sub_uq on public.rubric_scores (submission_id, criterion_id) where submission_id is not null;
create unique index if not exists rubric_scores_mb_uq  on public.rubric_scores (mb_mark_id, criterion_id) where mb_mark_id is not null;

alter table public.submissions enable row level security;
alter table public.submission_versions enable row level security;
alter table public.submission_marks enable row level security;
alter table public.annotations enable row level security;
alter table public.rubric_scores enable row level security;
revoke all on public.submissions, public.submission_versions, public.submission_marks,
              public.annotations, public.rubric_scores from anon;
revoke insert, update, delete on public.submissions, public.submission_versions from authenticated;
grant select on public.submissions, public.submission_versions to authenticated;
-- Teachers may only move a script to 'marking' (opened) directly; learners have no update path
-- except the RPCs; release and reopen go through release_marks() / reopen_submission().
grant update (status) on public.submissions to authenticated;
grant select, insert, update, delete on public.submission_marks, public.annotations, public.rubric_scores to authenticated;

drop policy if exists submissions_learner_read on public.submissions;
create policy submissions_learner_read on public.submissions for select to authenticated
  using (student_id = (select auth.uid()));
drop policy if exists submissions_teacher_read on public.submissions;
create policy submissions_teacher_read on public.submissions for select to authenticated
  using (public.can_mark_assignment(assignment_id));
drop policy if exists submissions_teacher_mark on public.submissions;
create policy submissions_teacher_mark on public.submissions for update to authenticated
  using (public.can_mark_assignment(assignment_id))
  with check (public.can_mark_assignment(assignment_id) and status = 'marking');

drop policy if exists submission_marks_teacher on public.submission_marks;
create policy submission_marks_teacher on public.submission_marks for all to authenticated
  using (exists (select 1 from public.submissions s where s.id = submission_id and public.can_mark_assignment(s.assignment_id)))
  with check (exists (select 1 from public.submissions s where s.id = submission_id and public.can_mark_assignment(s.assignment_id)));
drop policy if exists submission_marks_learner_released on public.submission_marks;
create policy submission_marks_learner_released on public.submission_marks for select to authenticated
  using (exists (select 1 from public.submissions s
                 where s.id = submission_id and s.student_id = (select auth.uid()) and s.released_at is not null));

drop policy if exists versions_learner_read on public.submission_versions;
create policy versions_learner_read on public.submission_versions for select to authenticated
  using (exists (select 1 from public.submissions s where s.id = submission_id and s.student_id = (select auth.uid())));
drop policy if exists versions_teacher_read on public.submission_versions;
create policy versions_teacher_read on public.submission_versions for select to authenticated
  using (exists (select 1 from public.submissions s where s.id = submission_id and public.can_mark_assignment(s.assignment_id)));

drop policy if exists annotations_teacher_all on public.annotations;
create policy annotations_teacher_all on public.annotations for all to authenticated
  using (exists (select 1 from public.submission_versions v join public.submissions s on s.id = v.submission_id
                 where v.id = version_id and public.can_mark_assignment(s.assignment_id)))
  with check (author_id = (select auth.uid())
              and exists (select 1 from public.submission_versions v join public.submissions s on s.id = v.submission_id
                          where v.id = version_id and public.can_mark_assignment(s.assignment_id)));
drop policy if exists annotations_learner_released on public.annotations;
create policy annotations_learner_released on public.annotations for select to authenticated
  using (layer = 'marker' and exists (
    select 1 from public.submission_versions v join public.submissions s on s.id = v.submission_id
    where v.id = version_id and s.student_id = (select auth.uid()) and s.released_at is not null));

drop policy if exists rubric_scores_teacher_sub on public.rubric_scores;
create policy rubric_scores_teacher_sub on public.rubric_scores for all to authenticated
  using (submission_id is not null and exists (select 1 from public.submissions s where s.id = submission_id and public.can_mark_assignment(s.assignment_id)))
  with check (submission_id is not null and exists (select 1 from public.submissions s where s.id = submission_id and public.can_mark_assignment(s.assignment_id)));
drop policy if exists rubric_scores_learner_released on public.rubric_scores;
create policy rubric_scores_learner_released on public.rubric_scores for select to authenticated
  using (submission_id is not null and exists (select 1 from public.submissions s
         where s.id = submission_id and s.student_id = (select auth.uid()) and s.released_at is not null));


-- ══════════════════════════════════════════════════════════════════════
-- 5. COMMENT BANK (+ stamp set)
-- ══════════════════════════════════════════════════════════════════════
create table if not exists public.comment_bank (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  kind        text not null default 'comment' check (kind in ('comment', 'stamp')),
  body        text not null check (char_length(body) between 1 and 1000),
  marks       numeric(5,2),
  tags        text[] not null default '{}' check (cardinality(tags) <= 10),
  assignment_id uuid references public.assignments(id) on delete set null,   -- pinned to a task
  position    smallint,                                                      -- stamp slot 1–9
  uses        int not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists comment_bank_owner_idx on public.comment_bank (owner_id, uses desc);
alter table public.comment_bank enable row level security;
revoke all on public.comment_bank from anon;
grant select, insert, update, delete on public.comment_bank to authenticated;
drop policy if exists comment_bank_owner on public.comment_bank;
create policy comment_bank_owner on public.comment_bank for all to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));


-- ══════════════════════════════════════════════════════════════════════
-- 6. MARKBOOK
-- ══════════════════════════════════════════════════════════════════════
create table if not exists public.mb_settings (
  class_id     uuid primary key references public.classes(id) on delete cascade,
  term_weights numeric(5,2)[] check (term_weights is null or cardinality(term_weights) = 4),
  missing_as_zero boolean not null default false,
  export_map   jsonb check (export_map is null or (jsonb_typeof(export_map) = 'object' and pg_column_size(export_map) < 50000)),
  updated_at   timestamptz not null default now()
);

create table if not exists public.mb_tasks (
  id             uuid primary key default gen_random_uuid(),
  class_id       uuid not null references public.classes(id) on delete cascade,
  source         text not null check (source in ('assignment', 'manual', 'tome', 'practice', 'drawing')),
  assignment_id  uuid unique references public.assignments(id) on delete set null,
  source_ref     text check (char_length(source_ref) <= 120),     -- e.g. tome session id, "mm:9:algebra@2026-11-30"
  title          text not null check (char_length(title) between 1 and 120),
  task_type      text not null default 'Other'
                   check (task_type in ('Test', 'Exam', 'Practical', 'Project', 'Assignment', 'Oral', 'Practice', 'Other')),
  term           smallint check (term is null or term between 1 and 4),
  task_date      date,
  total          numeric(7,2) not null check (total > 0),
  weight         numeric(5,2) not null default 0 check (weight between 0 and 100),   -- % of the year mark
  counts_to_year boolean not null default true,
  rubric_version_id uuid references public.rubric_versions(id) on delete restrict,
  position       smallint,
  import_ref     text check (char_length(import_ref) <= 80),
  created_at     timestamptz not null default now()
);
create index if not exists mb_tasks_class_idx on public.mb_tasks (class_id, term, task_date);

create table if not exists public.mb_marks (
  id          uuid primary key default gen_random_uuid(),
  task_id     uuid not null references public.mb_tasks(id) on delete cascade,
  roster_id   uuid not null references public.class_roster(id) on delete cascade,
  mark        numeric(7,2) check (mark is null or mark >= 0),
  status      text check (status is null or status in ('missing', 'absent', 'excused', 'exempt')),
  comment     text check (char_length(comment) <= 1000),
  released    boolean not null default false,          -- visible to the learner ("My marks", phase 2)
  updated_by  uuid default auth.uid() references public.profiles(id) on delete set null,
  updated_at  timestamptz not null default now(),
  unique (task_id, roster_id)
);
create index if not exists mb_marks_roster_idx on public.mb_marks (roster_id);

alter table public.rubric_scores drop constraint if exists rubric_scores_mb_mark_fk;
alter table public.rubric_scores add constraint rubric_scores_mb_mark_fk
  foreign key (mb_mark_id) references public.mb_marks(id) on delete cascade;

alter table public.mb_settings enable row level security;
alter table public.mb_tasks enable row level security;
alter table public.mb_marks enable row level security;
revoke all on public.mb_settings, public.mb_tasks, public.mb_marks from anon;
grant select, insert, update, delete on public.mb_settings, public.mb_tasks, public.mb_marks to authenticated;

drop policy if exists mb_settings_teacher on public.mb_settings;
create policy mb_settings_teacher on public.mb_settings for all to authenticated
  using (public.is_class_teacher(class_id)) with check (public.is_class_teacher(class_id));
drop policy if exists mb_tasks_teacher on public.mb_tasks;
create policy mb_tasks_teacher on public.mb_tasks for all to authenticated
  using (public.is_class_teacher(class_id)) with check (public.is_class_teacher(class_id));
drop policy if exists mb_marks_teacher on public.mb_marks;
create policy mb_marks_teacher on public.mb_marks for all to authenticated
  using (exists (select 1 from public.mb_tasks t where t.id = task_id and public.is_class_teacher(t.class_id)))
  with check (exists (select 1 from public.mb_tasks t join public.class_roster r on r.id = roster_id
                      where t.id = task_id and r.class_id = t.class_id and public.is_class_teacher(t.class_id)));
drop policy if exists mb_marks_learner_released on public.mb_marks;
create policy mb_marks_learner_released on public.mb_marks for select to authenticated
  using (released and exists (select 1 from public.class_roster r where r.id = roster_id and r.student_id = (select auth.uid())));
drop policy if exists mb_tasks_learner_released on public.mb_tasks;
create policy mb_tasks_learner_released on public.mb_tasks for select to authenticated
  using (exists (select 1 from public.mb_marks m join public.class_roster r on r.id = m.roster_id
                 where m.task_id = mb_tasks.id and m.released and r.student_id = (select auth.uid())));

drop policy if exists rubric_scores_teacher_mb on public.rubric_scores;
create policy rubric_scores_teacher_mb on public.rubric_scores for all to authenticated
  using (mb_mark_id is not null and exists (select 1 from public.mb_marks m join public.mb_tasks t on t.id = m.task_id
                                            where m.id = mb_mark_id and public.is_class_teacher(t.class_id)))
  with check (mb_mark_id is not null and exists (select 1 from public.mb_marks m join public.mb_tasks t on t.id = m.task_id
                                                 where m.id = mb_mark_id and public.is_class_teacher(t.class_id)));


-- ══════════════════════════════════════════════════════════════════════
-- 7. AUDIT LOG — append-only, written by triggers
-- ══════════════════════════════════════════════════════════════════════
create table if not exists public.mark_audit (
  id          bigint generated always as identity primary key,
  class_id    uuid not null references public.classes(id) on delete cascade,
  actor_id    uuid references public.profiles(id) on delete set null,
  entity      text not null check (entity in ('submission', 'mb_mark')),
  entity_id   uuid not null,
  field       text not null check (field in ('score', 'released_at', 'status', 'mark')),
  old_value   text check (char_length(old_value) <= 60),
  new_value   text check (char_length(new_value) <= 60),
  at          timestamptz not null default now()
);
create index if not exists mark_audit_entity_idx on public.mark_audit (entity, entity_id, at);
alter table public.mark_audit enable row level security;
revoke all on public.mark_audit from anon, authenticated;
grant select on public.mark_audit to authenticated;
drop policy if exists mark_audit_teacher_read on public.mark_audit;
create policy mark_audit_teacher_read on public.mark_audit for select to authenticated
  using (public.is_class_teacher(class_id));

create or replace function public.audit_submission_score()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_class uuid;
begin
  select a.class_id into v_class from submissions s join assignments a on a.id = s.assignment_id
   where s.id = new.submission_id;
  if tg_op = 'INSERT' or new.score is distinct from old.score then
    insert into mark_audit (class_id, actor_id, entity, entity_id, field, old_value, new_value)
    values (v_class, auth.uid(), 'submission', new.submission_id, 'score',
            case when tg_op = 'UPDATE' then old.score::text end, new.score::text);
  end if;
  return new;
end $$;
revoke execute on function public.audit_submission_score() from public, anon;
drop trigger if exists trg_audit_submission_score on public.submission_marks;
create trigger trg_audit_submission_score after insert or update on public.submission_marks
  for each row execute function public.audit_submission_score();

create or replace function public.audit_submission_release()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_class uuid;
begin
  if new.released_at is distinct from old.released_at then
    select class_id into v_class from assignments where id = new.assignment_id;
    insert into mark_audit (class_id, actor_id, entity, entity_id, field, old_value, new_value)
    values (v_class, auth.uid(), 'submission', new.id, 'released_at', old.released_at::text, new.released_at::text);
  end if;
  return new;
end $$;
revoke execute on function public.audit_submission_release() from public, anon;
drop trigger if exists trg_audit_submission_release on public.submissions;
create trigger trg_audit_submission_release after update on public.submissions
  for each row execute function public.audit_submission_release();

create or replace function public.audit_mb_marks()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_class uuid;
begin
  select class_id into v_class from mb_tasks where id = coalesce(new.task_id, old.task_id);
  if tg_op = 'INSERT' or new.mark is distinct from old.mark then
    insert into mark_audit (class_id, actor_id, entity, entity_id, field, old_value, new_value)
    values (v_class, auth.uid(), 'mb_mark', new.id, 'mark', case when tg_op = 'UPDATE' then old.mark::text end, new.mark::text);
  end if;
  if tg_op = 'UPDATE' and new.status is distinct from old.status then
    insert into mark_audit (class_id, actor_id, entity, entity_id, field, old_value, new_value)
    values (v_class, auth.uid(), 'mb_mark', new.id, 'status', old.status, new.status);
  end if;
  return new;
end $$;
revoke execute on function public.audit_mb_marks() from public, anon;
drop trigger if exists trg_audit_mb_marks on public.mb_marks;
create trigger trg_audit_mb_marks after insert or update on public.mb_marks
  for each row execute function public.audit_mb_marks();


-- ══════════════════════════════════════════════════════════════════════
-- 8b. RPCs — the only way learners write submissions; release/reopen for teachers
-- ══════════════════════════════════════════════════════════════════════

-- Learner opens a written task: returns their submission, creating it (with the template) if needed.
create or replace function public.start_submission(p_assignment uuid)
returns public.submissions
language plpgsql security definer set search_path = public as $$
declare a assignments; s submissions;
begin
  if not is_assignment_learner(p_assignment) then raise exception 'Not your assignment'; end if;
  select * into a from assignments where id = p_assignment;
  if a.kind <> 'written' then raise exception 'Not a written task'; end if;
  insert into submissions (assignment_id, student_id, draft_doc)
  values (p_assignment, auth.uid(), coalesce(a.template, '{"type":"doc","content":[]}'::jsonb))
  on conflict (assignment_id, student_id) do nothing;
  select * into s from submissions where assignment_id = p_assignment and student_id = auth.uid();
  return s;
end $$;

-- Autosave with optimistic concurrency. Returns the new draft_version.
-- Raises 'stale' when another tab/device saved first; the client then shows the conflict prompt.
create or replace function public.save_draft(p_submission uuid, p_doc jsonb, p_expected_version int)
returns int
language plpgsql security definer set search_path = public as $$
declare v int;
begin
  if jsonb_typeof(p_doc) <> 'object' or pg_column_size(p_doc) >= 1048576 then raise exception 'Document too large'; end if;
  update submissions
     set draft_doc = p_doc, draft_version = draft_version + 1, draft_saved_at = now()
   where id = p_submission and student_id = auth.uid()
     and status in ('draft', 'reopened') and draft_version = p_expected_version
  returning draft_version into v;
  if v is null then
    if exists (select 1 from submissions where id = p_submission and student_id = auth.uid()
               and status in ('draft', 'reopened')) then
      raise exception 'stale';
    end if;
    raise exception 'This work is handed in and locked';
  end if;
  return v;
end $$;

-- Hand in: freeze the draft as a new immutable version. Lateness uses the server clock.
create or replace function public.submit_submission(p_submission uuid, p_doc_text text, p_word_count int, p_image_paths text[])
returns public.submission_versions
language plpgsql security definer set search_path = public as $$
declare s submissions; a assignments; ext assignment_extensions; due timestamptz; closes timestamptz; ver submission_versions;
begin
  select * into s from submissions where id = p_submission and student_id = auth.uid() for update;
  if s.id is null then raise exception 'Not found'; end if;
  if s.status not in ('draft', 'reopened') then raise exception 'Already handed in'; end if;
  select * into a from assignments where id = s.assignment_id;
  if not is_assignment_learner(a.id) then raise exception 'Not your assignment'; end if;
  if s.attempt >= a.max_attempts and s.status <> 'reopened' then raise exception 'No attempts left'; end if;
  select * into ext from assignment_extensions where assignment_id = a.id and student_id = auth.uid();
  due    := coalesce(ext.due_at, a.due_at);
  closes := coalesce(ext.close_at, a.close_at);
  if closes is not null and now() > closes then raise exception 'This task has closed'; end if;
  -- every image path must sit in the learner's own folder for this submission
  if exists (select 1 from unnest(coalesce(p_image_paths, '{}')) p
             where p not like auth.uid()::text || '/' || s.id::text || '/%') then
    raise exception 'Bad image path';
  end if;
  insert into submission_versions (submission_id, attempt, doc, doc_schema, doc_text, word_count, image_paths, is_late)
  values (s.id, s.attempt + 1, s.draft_doc, s.doc_schema, left(coalesce(p_doc_text, ''), 200000),
          greatest(coalesce(p_word_count, 0), 0), coalesce(p_image_paths, '{}'), due is not null and now() > due)
  returning * into ver;
  update submissions set status = 'submitted', attempt = s.attempt + 1 where id = s.id;
  return ver;
end $$;

-- Teacher reopens one learner's work for resubmission (keeps every version).
create or replace function public.reopen_submission(p_submission uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  update submissions s set status = 'reopened', released_at = null
   where s.id = p_submission and can_mark_assignment(s.assignment_id);
  if not found then raise exception 'Not allowed'; end if;
end $$;

-- Teacher releases marks (all marked work, or a list) and copies scores into the markbook.
create or replace function public.release_marks(p_assignment uuid, p_submissions uuid[] default null)
returns int language plpgsql security definer set search_path = public as $$
declare a assignments; t_id uuid; n int;
begin
  if not can_mark_assignment(p_assignment) then raise exception 'Not allowed'; end if;
  select * into a from assignments where id = p_assignment;
  -- the assignment's markbook task (created on first release if the client has not made it)
  insert into mb_tasks (class_id, source, assignment_id, title, task_type, term, task_date, total, weight, counts_to_year)
  values (a.class_id, 'assignment', a.id, left(a.title, 120), coalesce(a.task_type, 'Assignment'), a.term,
          (a.due_at at time zone 'Africa/Johannesburg')::date, a.total_marks, 0, true)
  on conflict (assignment_id) do nothing;
  select id into t_id from mb_tasks where assignment_id = a.id;

  update submissions s set status = 'returned', released_at = now()
   where s.assignment_id = p_assignment
     and exists (select 1 from submission_marks k where k.submission_id = s.id and k.score is not null)
     and (p_submissions is null or s.id = any (p_submissions));
  get diagnostics n = row_count;

  insert into mb_marks (task_id, roster_id, mark, released)
  select t_id, r.id, k.score * a.total_marks / coalesce(k.score_max, a.total_marks), true
  from submissions s
  join submission_marks k on k.submission_id = s.id and k.score is not null
  join class_roster r on r.class_id = a.class_id and r.student_id = s.student_id
  where s.assignment_id = p_assignment and s.released_at is not null
    and (p_submissions is null or s.id = any (p_submissions))
  on conflict (task_id, roster_id) do update set mark = excluded.mark, released = true, updated_at = now();
  return n;
end $$;

revoke execute on function public.start_submission(uuid), public.save_draft(uuid, jsonb, int),
  public.submit_submission(uuid, text, int, text[]), public.reopen_submission(uuid),
  public.release_marks(uuid, uuid[]) from public, anon;
grant execute on function public.start_submission(uuid), public.save_draft(uuid, jsonb, int),
  public.submit_submission(uuid, text, int, text[]), public.reopen_submission(uuid),
  public.release_marks(uuid, uuid[]) to authenticated;


-- ══════════════════════════════════════════════════════════════════════
-- 9. STORAGE — private bucket for images in learner work (spec §2.4)
-- Path: <student_id>/<submission_id>/<random>.webp
-- ══════════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('submission-files', 'submission-files', false, 2097152, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

drop policy if exists "Learner uploads to own draft" on storage.objects;
create policy "Learner uploads to own draft" on storage.objects for insert to authenticated
  with check (bucket_id = 'submission-files'
              and (storage.foldername(name))[1] = (select auth.uid())::text
              and exists (select 1 from public.submissions s
                          where s.id::text = (storage.foldername(name))[2]
                            and s.student_id = (select auth.uid())
                            and s.status in ('draft', 'reopened')));
drop policy if exists "Learner reads own submission files" on storage.objects;
create policy "Learner reads own submission files" on storage.objects for select to authenticated
  using (bucket_id = 'submission-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "Learner deletes own draft files" on storage.objects;
create policy "Learner deletes own draft files" on storage.objects for delete to authenticated
  using (bucket_id = 'submission-files'
         and (storage.foldername(name))[1] = (select auth.uid())::text
         -- files referenced by a submitted version are evidence and stay
         and not exists (select 1 from public.submission_versions v where storage.objects.name = any (v.image_paths)));
drop policy if exists "Class teacher reads submission files" on storage.objects;
create policy "Class teacher reads submission files" on storage.objects for select to authenticated
  using (bucket_id = 'submission-files' and exists (
    select 1 from public.submissions s
    where s.id::text = (storage.foldername(name))[2]
      and s.student_id::text = (storage.foldername(name))[1]
      and public.can_mark_assignment(s.assignment_id)));


-- ══════════════════════════════════════════════════════════════════════
-- REVIEW NOTES
-- • Scores and the overall comment sit in submission_marks so learners only see them after
--   release; the learner client must read submission_marks, never assume columns on submissions.
-- • Two teachers marking one script: submission_marks.marked_by/marked_at let the client warn
--   "Being marked by X" and refuse a save older than the stored marked_at (spec §6.7).
-- • roster_on_member_join assumes profiles.display_name; check the column name in production.
-- • Teacher-side 'marking' status: the client sets it when the teacher first opens a script.
-- • Retention clean-up (18 months after year end) and orphan-image clean-up are scheduled
--   Edge Functions, not in this file.
-- • Test plan: learner A, learner B (same class), learner C (other class), teacher of the
--   class, teacher of another class, anon — each RPC and table checked for allow/deny.
-- ══════════════════════════════════════════════════════════════════════
