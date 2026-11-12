-- ============================================================
-- THE MAGIC LAB — Grading Grimoire: PDF and photo hand-ins
-- Run AFTER supabase-grading-grimoire-phase1.sql. Safe to re-run.
--
--  • assignments.submission_mode: 'online' (write in the editor, default),
--    'upload' (hand in a PDF, or phone photos joined into one PDF), or 'either'.
--  • submission_versions.file_path / page_count: a handed-in PDF, frozen like typed work.
--  • annotations: a 'page' anchor ({ page, fx, fy } as fractions of the page, so marks
--    stay put at any zoom) and a 'qstart' mark ("Question 1.2 starts here").
--  • submit_upload(): the learner's only way to hand in a file.
--  • storage: PDFs up to 15 MB in the same private bucket.
-- ============================================================

alter table public.assignments add column if not exists submission_mode text not null default 'online';
alter table public.assignments drop constraint if exists assignments_submission_mode_check;
alter table public.assignments add constraint assignments_submission_mode_check check (submission_mode in ('online', 'upload', 'either'));

alter table public.submission_versions add column if not exists file_path text;
alter table public.submission_versions add column if not exists page_count smallint;
alter table public.submission_versions drop constraint if exists submission_versions_file_check;
alter table public.submission_versions add constraint submission_versions_file_check check (
  (file_path is null or char_length(file_path) <= 200) and (page_count is null or page_count between 1 and 60));

alter table public.annotations drop constraint if exists annotations_type_check;
alter table public.annotations add constraint annotations_type_check
  check (type in ('tick', 'cross', 'comment', 'stamp', 'highlight', 'pen', 'qstart'));
alter table public.annotations drop constraint if exists annotations_anchor_check;
alter table public.annotations add constraint annotations_anchor_check check (jsonb_typeof(anchor) = 'object'
  and anchor ->> 'kind' in ('point', 'box', 'range', 'region', 'page') and pg_column_size(anchor) < 20000);

-- Hand in an uploaded PDF. The file must already be in the learner's folder for this submission.
create or replace function public.submit_upload(p_submission uuid, p_file_path text, p_page_count int)
returns public.submission_versions
language plpgsql security definer set search_path = public as $$
declare s submissions; a assignments; ext assignment_extensions; due timestamptz; closes timestamptz; ver submission_versions;
begin
  select * into s from submissions where id = p_submission and student_id = auth.uid() for update;
  if s.id is null then raise exception 'Not found'; end if;
  if s.status not in ('draft', 'reopened') then raise exception 'Already handed in'; end if;
  select * into a from assignments where id = s.assignment_id;
  if a.submission_mode = 'online' then raise exception 'This task is written online, not uploaded'; end if;
  if not is_assignment_learner(a.id) then raise exception 'This task is not set for you'; end if;
  if s.attempt >= a.max_attempts and s.status <> 'reopened' then raise exception 'No hand-ins left for this task'; end if;
  if p_file_path is null or p_file_path not like auth.uid()::text || '/' || s.id::text || '/%.pdf' then raise exception 'Bad file path'; end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'submission-files' and o.name = p_file_path) then
    raise exception 'The file has not finished uploading';
  end if;
  if p_page_count is null or p_page_count not between 1 and 60 then raise exception 'A hand-in can have 1 to 60 pages'; end if;
  select * into ext from assignment_extensions where assignment_id = a.id and student_id = auth.uid();
  due    := coalesce(ext.due_at, a.due_at);
  closes := coalesce(ext.close_at, a.close_at);
  if closes is not null and now() > closes then raise exception 'This task has closed'; end if;
  insert into submission_versions (submission_id, attempt, doc, doc_schema, doc_text, word_count, image_paths, file_path, page_count, is_late)
  values (s.id, s.attempt + 1, '{"type":"upload"}'::jsonb, s.doc_schema, '', 0, '{}', p_file_path, p_page_count,
          due is not null and now() > due)
  returning * into ver;
  update submissions set status = 'submitted', attempt = s.attempt + 1, released_at = null where id = s.id;
  return ver;
end $$;
revoke execute on function public.submit_upload(uuid, text, int) from public, anon;
grant execute on function public.submit_upload(uuid, text, int) to authenticated;

-- Handed-in PDFs are evidence: the learner cannot delete them afterwards.
create or replace function public.is_submitted_file(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from submission_versions v where p_name = any (v.image_paths) or v.file_path = p_name);
$$;

update storage.buckets set file_size_limit = 15728640,
  allowed_mime_types = array['image/webp', 'image/jpeg', 'image/png', 'application/pdf']
where id = 'submission-files';
