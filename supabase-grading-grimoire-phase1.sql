-- ============================================================
-- THE MAGIC LAB — Grading Grimoire phase 1: written tasks, hand-in, marking
-- Spec: docs/marking-platform-spec.md (§2, §3, §5, §7). Run AFTER
-- supabase-co-teachers.sql and supabase-grading-grimoire-phase0.sql.
-- HOW TO RUN: Supabase SQL editor → paste → Run. Safe to re-run.
--
--  • assignments gets kind = 'written' plus due/close times, scoring and totals.
--  • submissions: one per (assignment, learner); the learner writes only through
--    start_submission / save_draft / submit_submission.
--  • submission_versions: an unchangeable copy of each hand-in.
--  • submission_marks: score + overall comment, in their own table so learners
--    can read them only after release (RLS works per row, not per column).
--  • annotations, rubric_scores: the teacher's marking, readable by the learner
--    after release.
--  • storage bucket submission-files: images in learners' work, private.
-- No policy here reads a table whose policy reads this one back (that loops).
-- ============================================================


-- ── 1. Assignments: written tasks ───────────────────────────
alter table public.assignments add column if not exists kind text not null default 'lessons';
alter table public.assignments drop constraint if exists assignments_kind_check;
alter table public.assignments add constraint assignments_kind_check check (kind in ('lessons', 'written'));
alter table public.assignments add column if not exists due_at timestamptz;
alter table public.assignments add column if not exists close_at timestamptz;
alter table public.assignments add column if not exists allow_resubmit boolean not null default false;
alter table public.assignments add column if not exists max_attempts smallint not null default 1;
alter table public.assignments add column if not exists brief jsonb;
alter table public.assignments add column if not exists template jsonb;
alter table public.assignments add column if not exists scoring text;
alter table public.assignments add column if not exists total_marks numeric(7,2);
alter table public.assignments add column if not exists rubric_version_id uuid references public.rubric_versions(id) on delete restrict;
alter table public.assignments add column if not exists term smallint;
alter table public.assignments add column if not exists task_type text;
alter table public.assignments add column if not exists word_limit int;

alter table public.assignments drop constraint if exists assignments_written_fields_check;
alter table public.assignments add constraint assignments_written_fields_check check (
      (max_attempts between 1 and 10)
  and (brief is null or (jsonb_typeof(brief) = 'object' and pg_column_size(brief) < 300000))
  and (template is null or (jsonb_typeof(template) = 'object' and pg_column_size(template) < 300000))
  and (scoring is null or scoring in ('ticks', 'rubric', 'ticks_rubric', 'direct'))
  and (total_marks is null or total_marks > 0)
  and (term is null or term between 1 and 4)
  and (task_type is null or task_type in ('Test', 'Exam', 'Practical', 'Project', 'Assignment', 'Oral', 'Other'))
  and (word_limit is null or word_limit between 1 and 20000));
alter table public.assignments drop constraint if exists assignments_written_check;
alter table public.assignments add constraint assignments_written_check check (
  kind <> 'written' or (scoring is not null and total_marks is not null and due_at is not null
                        and (close_at is null or close_at >= due_at)
                        and (scoring not in ('rubric', 'ticks_rubric') or rubric_version_id is not null)));

create table if not exists public.assignment_questions (
  id            uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  number        text not null check (number ~ '^[0-9A-Za-z.()]{1,12}$'),
  label         text check (char_length(label) <= 200),
  max_marks     numeric(6,2) not null check (max_marks >= 0),
  position      smallint not null default 0,
  unique (assignment_id, number)
);
create index if not exists assignment_questions_aid_idx on public.assignment_questions (assignment_id, position);

create table if not exists public.assignment_extensions (
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id    uuid not null references public.profiles(id) on delete cascade,
  due_at        timestamptz not null,
  close_at      timestamptz,
  note          text check (char_length(note) <= 300),
  primary key (assignment_id, student_id)
);


-- ── 2. Helpers ──────────────────────────────────────────────
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

alter table public.assignment_questions enable row level security;
alter table public.assignment_extensions enable row level security;
revoke all on public.assignment_questions, public.assignment_extensions from anon;
grant select, insert, update, delete on public.assignment_questions, public.assignment_extensions to authenticated;

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

-- Learners and teachers of the class may read the rubric version an assignment uses.
create or replace function public.can_read_rubric_version(p_version uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from assignments a where a.rubric_version_id = p_version
                 and (is_assignment_learner(a.id) or is_class_teacher(a.class_id)));
$$;
revoke execute on function public.can_read_rubric_version(uuid) from public, anon;
grant execute on function public.can_read_rubric_version(uuid) to authenticated;
drop policy if exists rubric_versions_assignment_read on public.rubric_versions;
create policy rubric_versions_assignment_read on public.rubric_versions for select to authenticated
  using (public.can_read_rubric_version(id));


-- ── 3. Submissions ──────────────────────────────────────────
create table if not exists public.submissions (
  id              uuid primary key default gen_random_uuid(),
  assignment_id   uuid not null references public.assignments(id) on delete cascade,
  student_id      uuid not null references public.profiles(id) on delete cascade,
  status          text not null default 'draft'
                    check (status in ('draft', 'submitted', 'marking', 'returned', 'reopened')),
  draft_doc       jsonb not null default '{"type":"doc","content":[]}'::jsonb
                    check (jsonb_typeof(draft_doc) = 'object' and pg_column_size(draft_doc) < 1048576),
  doc_schema      smallint not null default 1,
  draft_version   int not null default 0,
  draft_saved_at  timestamptz,
  attempt         smallint not null default 0,
  released_at     timestamptz,
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
create index if not exists submission_versions_sub_idx on public.submission_versions (submission_id, attempt);

create table if not exists public.submission_marks (
  submission_id      uuid primary key references public.submissions(id) on delete cascade,
  score              numeric(7,2) check (score is null or score >= 0),
  score_max          numeric(7,2) check (score_max is null or score_max > 0),
  question_overrides jsonb check (question_overrides is null or jsonb_typeof(question_overrides) = 'object'),
  question_totals    jsonb check (question_totals is null or jsonb_typeof(question_totals) = 'object'),
  overall_comment    text check (char_length(overall_comment) <= 4000),
  marked_version     uuid references public.submission_versions(id) on delete set null,
  marked_by          uuid default auth.uid() references public.profiles(id) on delete set null,
  marked_at          timestamptz not null default now()
);

create table if not exists public.annotations (
  id          uuid primary key default gen_random_uuid(),
  version_id  uuid not null references public.submission_versions(id) on delete cascade,
  author_id   uuid default auth.uid() references public.profiles(id) on delete set null,
  layer       text not null default 'marker' check (layer in ('marker', 'moderator')),
  type        text not null check (type in ('tick', 'cross', 'comment', 'stamp', 'highlight', 'pen')),
  anchor      jsonb not null check (jsonb_typeof(anchor) = 'object'
                and anchor ->> 'kind' in ('point', 'box', 'range', 'region') and pg_column_size(anchor) < 20000),
  marks       numeric(5,2) check (marks is null or marks between -100 and 100),
  question_id uuid references public.assignment_questions(id) on delete set null,
  body        text check (char_length(body) <= 2000),
  stamp       text check (char_length(stamp) <= 40),
  colour      text check (colour is null or colour in ('yellow', 'green', 'blue')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists annotations_version_idx on public.annotations (version_id);

create table if not exists public.rubric_scores (
  id                 uuid primary key default gen_random_uuid(),
  rubric_version_id  uuid not null references public.rubric_versions(id) on delete restrict,
  submission_id      uuid references public.submissions(id) on delete cascade,
  mb_mark_id         uuid references public.mb_marks(id) on delete cascade,
  criterion_id       text not null check (criterion_id ~ '^[A-Za-z0-9_-]{1,24}$'),
  level_id           text check (level_id is null or level_id ~ '^[A-Za-z0-9_-]{1,24}$'),
  mark               numeric(6,2) check (mark is null or mark >= 0),
  note               text check (char_length(note) <= 1000),
  updated_at         timestamptz not null default now(),
  check ((submission_id is null) <> (mb_mark_id is null))
);
create unique index if not exists rubric_scores_sub_uq on public.rubric_scores (submission_id, criterion_id) where submission_id is not null;
create unique index if not exists rubric_scores_mb_uq  on public.rubric_scores (mb_mark_id, criterion_id) where mb_mark_id is not null;

-- Submission lookups that bypass RLS, so policies on other tables never read
-- submissions through its own policies.
create or replace function public.submission_owner(p_submission uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select student_id from submissions where id = p_submission;
$$;
create or replace function public.can_mark_submission(p_submission uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from submissions s join assignments a on a.id = s.assignment_id
                 where s.id = p_submission and is_class_teacher(a.class_id));
$$;
create or replace function public.submission_released_to_me(p_submission uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from submissions where id = p_submission
                 and student_id = (select auth.uid()) and released_at is not null);
$$;
create or replace function public.version_submission(p_version uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select submission_id from submission_versions where id = p_version;
$$;

revoke execute on function public.can_mark_assignment(uuid), public.is_assignment_learner(uuid),
  public.submission_owner(uuid), public.can_mark_submission(uuid), public.submission_released_to_me(uuid),
  public.version_submission(uuid) from public, anon;
grant execute on function public.can_mark_assignment(uuid), public.is_assignment_learner(uuid),
  public.submission_owner(uuid), public.can_mark_submission(uuid), public.submission_released_to_me(uuid),
  public.version_submission(uuid) to authenticated;

alter table public.submissions enable row level security;
alter table public.submission_versions enable row level security;
alter table public.submission_marks enable row level security;
alter table public.annotations enable row level security;
alter table public.rubric_scores enable row level security;
revoke all on public.submissions, public.submission_versions, public.submission_marks,
              public.annotations, public.rubric_scores from anon;
revoke all on public.submissions, public.submission_versions from authenticated;
grant select on public.submissions, public.submission_versions to authenticated;
grant update (status) on public.submissions to authenticated;   -- teacher: 'submitted' → 'marking' only
grant select, insert, update, delete on public.submission_marks, public.annotations, public.rubric_scores to authenticated;

drop policy if exists submissions_learner_read on public.submissions;
create policy submissions_learner_read on public.submissions for select to authenticated
  using (student_id = (select auth.uid()));
drop policy if exists submissions_teacher_read on public.submissions;
create policy submissions_teacher_read on public.submissions for select to authenticated
  using (public.can_mark_assignment(assignment_id));
drop policy if exists submissions_teacher_mark on public.submissions;
create policy submissions_teacher_mark on public.submissions for update to authenticated
  using (public.can_mark_assignment(assignment_id) and status in ('submitted', 'marking'))
  with check (public.can_mark_assignment(assignment_id) and status = 'marking');

drop policy if exists versions_learner_read on public.submission_versions;
create policy versions_learner_read on public.submission_versions for select to authenticated
  using (public.submission_owner(submission_id) = (select auth.uid()));
drop policy if exists versions_teacher_read on public.submission_versions;
create policy versions_teacher_read on public.submission_versions for select to authenticated
  using (public.can_mark_submission(submission_id));

drop policy if exists submission_marks_teacher on public.submission_marks;
create policy submission_marks_teacher on public.submission_marks for all to authenticated
  using (public.can_mark_submission(submission_id)) with check (public.can_mark_submission(submission_id));
drop policy if exists submission_marks_learner_released on public.submission_marks;
create policy submission_marks_learner_released on public.submission_marks for select to authenticated
  using (public.submission_released_to_me(submission_id));

drop policy if exists annotations_teacher_all on public.annotations;
create policy annotations_teacher_all on public.annotations for all to authenticated
  using (public.can_mark_submission(public.version_submission(version_id)))
  with check (public.can_mark_submission(public.version_submission(version_id)));
drop policy if exists annotations_learner_released on public.annotations;
create policy annotations_learner_released on public.annotations for select to authenticated
  using (layer = 'marker' and public.submission_released_to_me(public.version_submission(version_id)));

drop policy if exists rubric_scores_teacher_sub on public.rubric_scores;
create policy rubric_scores_teacher_sub on public.rubric_scores for all to authenticated
  using (submission_id is not null and public.can_mark_submission(submission_id))
  with check (submission_id is not null and public.can_mark_submission(submission_id));
drop policy if exists rubric_scores_learner_released on public.rubric_scores;
create policy rubric_scores_learner_released on public.rubric_scores for select to authenticated
  using (submission_id is not null and public.submission_released_to_me(submission_id));
drop policy if exists rubric_scores_teacher_mb on public.rubric_scores;
create policy rubric_scores_teacher_mb on public.rubric_scores for all to authenticated
  using (mb_mark_id is not null and exists (select 1 from public.mb_marks m where m.id = mb_mark_id
                                            and public.is_class_teacher(public.mb_task_class(m.task_id))))
  with check (mb_mark_id is not null and exists (select 1 from public.mb_marks m where m.id = mb_mark_id
                                                 and public.is_class_teacher(public.mb_task_class(m.task_id))));


-- ── 4. Audit of scores and releases ─────────────────────────
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
    values (v_class, auth.uid(), 'submission', new.id, 'released_at', left(old.released_at::text, 60), left(new.released_at::text, 60));
  end if;
  return new;
end $$;
drop trigger if exists trg_audit_submission_release on public.submissions;
create trigger trg_audit_submission_release after update on public.submissions
  for each row execute function public.audit_submission_release();
revoke execute on function public.audit_submission_score(), public.audit_submission_release() from public, anon, authenticated;


-- ── 5. RPCs: the only way learners write; release and reopen ──
create or replace function public.start_submission(p_assignment uuid)
returns public.submissions
language plpgsql security definer set search_path = public as $$
declare a assignments; s submissions;
begin
  if not is_assignment_learner(p_assignment) then raise exception 'This task is not set for you'; end if;
  select * into a from assignments where id = p_assignment;
  if a.kind <> 'written' then raise exception 'Not a written task'; end if;
  insert into submissions (assignment_id, student_id, draft_doc)
  values (p_assignment, auth.uid(), coalesce(a.template, '{"type":"doc","content":[]}'::jsonb))
  on conflict (assignment_id, student_id) do nothing;
  select * into s from submissions where assignment_id = p_assignment and student_id = auth.uid();
  return s;
end $$;

-- Autosave with optimistic concurrency: returns the new draft_version, raises 'stale'
-- when another tab or device saved first.
create or replace function public.save_draft(p_submission uuid, p_doc jsonb, p_expected_version int)
returns int
language plpgsql security definer set search_path = public as $$
declare v int;
begin
  if p_doc is null or jsonb_typeof(p_doc) <> 'object' or pg_column_size(p_doc) >= 1048576 then
    raise exception 'Document too large';
  end if;
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

create or replace function public.submit_submission(p_submission uuid, p_doc_text text, p_word_count int, p_image_paths text[])
returns public.submission_versions
language plpgsql security definer set search_path = public as $$
declare s submissions; a assignments; ext assignment_extensions; due timestamptz; closes timestamptz; ver submission_versions;
begin
  select * into s from submissions where id = p_submission and student_id = auth.uid() for update;
  if s.id is null then raise exception 'Not found'; end if;
  if s.status not in ('draft', 'reopened') then raise exception 'Already handed in'; end if;
  select * into a from assignments where id = s.assignment_id;
  if not is_assignment_learner(a.id) then raise exception 'This task is not set for you'; end if;
  if s.attempt >= a.max_attempts and s.status <> 'reopened' then raise exception 'No hand-ins left for this task'; end if;
  select * into ext from assignment_extensions where assignment_id = a.id and student_id = auth.uid();
  due    := coalesce(ext.due_at, a.due_at);
  closes := coalesce(ext.close_at, a.close_at);
  if closes is not null and now() > closes then raise exception 'This task has closed'; end if;
  if exists (select 1 from unnest(coalesce(p_image_paths, '{}')) p
             where p not like auth.uid()::text || '/' || s.id::text || '/%') then
    raise exception 'Bad image path';
  end if;
  insert into submission_versions (submission_id, attempt, doc, doc_schema, doc_text, word_count, image_paths, is_late)
  values (s.id, s.attempt + 1, s.draft_doc, s.doc_schema, left(coalesce(p_doc_text, ''), 200000),
          greatest(coalesce(p_word_count, 0), 0), coalesce(p_image_paths, '{}'), due is not null and now() > due)
  returning * into ver;
  update submissions set status = 'submitted', attempt = s.attempt + 1, released_at = null where id = s.id;
  return ver;
end $$;

-- Learner asks to hand in again when the task allows it and marks are not released.
create or replace function public.resubmit_submission(p_submission uuid)
returns void language plpgsql security definer set search_path = public as $$
declare s submissions; a assignments;
begin
  select * into s from submissions where id = p_submission and student_id = auth.uid() for update;
  select * into a from assignments where id = s.assignment_id;
  if s.id is null or not a.allow_resubmit or s.attempt >= a.max_attempts
     or s.status not in ('submitted', 'marking') or s.released_at is not null then
    raise exception 'This task cannot be handed in again';
  end if;
  update submissions set status = 'draft' where id = s.id;
end $$;

-- Teacher reopens one learner's work (keeps every version; hides released marks again).
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
  insert into mb_tasks (class_id, source, assignment_id, title, task_type, term, task_date, total, weight, counts_to_year)
  values (a.class_id, 'assignment', a.id, left(a.title, 120), coalesce(a.task_type, 'Assignment'), a.term,
          (a.due_at at time zone 'Africa/Johannesburg')::date, a.total_marks, 0, true)
  on conflict (assignment_id) do nothing;
  select id into t_id from mb_tasks where assignment_id = a.id;

  update submissions s set status = 'returned', released_at = now()
   where s.assignment_id = p_assignment
     and s.status in ('submitted', 'marking', 'returned')
     and exists (select 1 from submission_marks k where k.submission_id = s.id and k.score is not null)
     and (p_submissions is null or s.id = any (p_submissions));
  get diagnostics n = row_count;

  insert into mb_marks (task_id, roster_id, mark, released)
  select t_id, r.id, least(k.score * a.total_marks / coalesce(k.score_max, a.total_marks), 99999), true
  from submissions s
  join submission_marks k on k.submission_id = s.id and k.score is not null
  join class_roster r on r.class_id = a.class_id and r.student_id = s.student_id
  where s.assignment_id = p_assignment and s.released_at is not null
    and (p_submissions is null or s.id = any (p_submissions))
  on conflict (task_id, roster_id) do update set mark = excluded.mark, released = true, updated_at = now();
  return n;
end $$;

revoke execute on function public.start_submission(uuid), public.save_draft(uuid, jsonb, int),
  public.submit_submission(uuid, text, int, text[]), public.resubmit_submission(uuid),
  public.reopen_submission(uuid), public.release_marks(uuid, uuid[]) from public, anon;
grant execute on function public.start_submission(uuid), public.save_draft(uuid, jsonb, int),
  public.submit_submission(uuid, text, int, text[]), public.resubmit_submission(uuid),
  public.reopen_submission(uuid), public.release_marks(uuid, uuid[]) to authenticated;


-- ── 6. Storage: images in learners' work ────────────────────
-- Path: <student_id>/<submission_id>/<random>.webp — private, 2 MB, images only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('submission-files', 'submission-files', false, 2097152, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

create or replace function public.can_upload_submission_file(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from submissions s
                 where s.id::text = (storage.foldername(p_name))[2]
                   and s.student_id::text = (storage.foldername(p_name))[1]
                   and s.student_id = (select auth.uid())
                   and s.status in ('draft', 'reopened'));
$$;
create or replace function public.can_read_submission_file(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select (storage.foldername(p_name))[1] = (select auth.uid())::text
      or exists (select 1 from submissions s join assignments a on a.id = s.assignment_id
                 where s.id::text = (storage.foldername(p_name))[2]
                   and s.student_id::text = (storage.foldername(p_name))[1]
                   and is_class_teacher(a.class_id));
$$;
create or replace function public.is_submitted_file(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from submission_versions v where p_name = any (v.image_paths));
$$;
revoke execute on function public.can_upload_submission_file(text), public.can_read_submission_file(text),
  public.is_submitted_file(text) from public, anon;
grant execute on function public.can_upload_submission_file(text), public.can_read_submission_file(text),
  public.is_submitted_file(text) to authenticated;

drop policy if exists "Learner uploads to own draft" on storage.objects;
create policy "Learner uploads to own draft" on storage.objects for insert to authenticated
  with check (bucket_id = 'submission-files' and public.can_upload_submission_file(name));
drop policy if exists "Read submission files" on storage.objects;
create policy "Read submission files" on storage.objects for select to authenticated
  using (bucket_id = 'submission-files' and public.can_read_submission_file(name));
drop policy if exists "Learner deletes own draft files" on storage.objects;
create policy "Learner deletes own draft files" on storage.objects for delete to authenticated
  using (bucket_id = 'submission-files'
         and (storage.foldername(name))[1] = (select auth.uid())::text
         and not public.is_submitted_file(name));
