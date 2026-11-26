-- ============================================================
-- THE MAGIC LAB — Exam Sanctum: handwritten paper scripts (2026-11-26)
-- A paper written by hand is photographed, transcribed by AI into the digital
-- paper's answer format, checked by the teacher against the photos, then marked
-- by exam-mark like any online script. The teacher's original hand marks can be
-- entered as the "teacher" parity marks.
-- Run AFTER supabase-exam-sanctum.sql and supabase-exam-research.sql. Safe to re-run.
--
--  • exam_attempts (+columns)  source online / paper; AI transcription; who checked it, when
--  • storage bucket exam-scans  private photos: <attempt id>/<page>.jpg, staff only
--  • exam_add_paper_script()    staff: a paper script for a learner on the class list,
--                               or a new name-only entry ("Script 07") for anonymous pilots
--  • exam_monitor / exam_release match paper scripts on the class-list row
--
-- Security: paper scripts have no learner account (student_id may be null), so the
-- learner functions, which all match student_id = auth.uid(), never see them.
-- Photos are readable and writable by exam staff only. exam-mark refuses a paper
-- script until a teacher has checked its transcription.
-- ============================================================

-- ── 1. Attempts: paper scripts ──────────────────────────────
alter table public.exam_attempts alter column student_id drop not null;
alter table public.exam_attempts add column if not exists source text not null default 'online'
  check (source in ('online', 'paper'));
alter table public.exam_attempts drop constraint if exists exam_attempts_online_student;
alter table public.exam_attempts add constraint exam_attempts_online_student
  check (source = 'paper' or student_id is not null);
alter table public.exam_attempts add column if not exists pages smallint not null default 0 check (pages between 0 and 20);
alter table public.exam_attempts add column if not exists transcript jsonb
  check (transcript is null or pg_column_size(transcript) < 400000);   -- the AI's reading: { items: {id: {raw, answer, unsure, unreadable}}, model, at, … }
alter table public.exam_attempts add column if not exists transcript_checked_at timestamptz;
alter table public.exam_attempts add column if not exists transcript_checked_by uuid references public.profiles(id) on delete set null;
create unique index if not exists exam_attempts_paper_roster_uq on public.exam_attempts (sitting_id, roster_id) where source = 'paper';

-- staff may write the checked answers of a paper script (online scripts stay server-only)
drop policy if exists exam_attempts_staff_paper on public.exam_attempts;
create policy exam_attempts_staff_paper on public.exam_attempts for update to authenticated
  using (public.is_exam_staff() and source = 'paper') with check (public.is_exam_staff() and source = 'paper');
-- only these columns: marks, status and the AI's transcript stay server-side (the table had a default full grant)
revoke update on public.exam_attempts from authenticated;
grant update (answers, transcript_checked_at, transcript_checked_by, pages) on public.exam_attempts to authenticated;


-- the audit log records transcription calls too
alter table public.exam_ai_log drop constraint if exists exam_ai_log_kind_check;
alter table public.exam_ai_log add constraint exam_ai_log_kind_check check (kind in ('mark', 'remark', 'stability', 'transcribe'));


-- ── 2. Photos ───────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('exam-scans', 'exam-scans', false, 6291456, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Exam staff read scans" on storage.objects;
create policy "Exam staff read scans" on storage.objects for select to authenticated
  using (bucket_id = 'exam-scans' and public.is_exam_staff());
drop policy if exists "Exam staff upload scans" on storage.objects;
create policy "Exam staff upload scans" on storage.objects for insert to authenticated
  with check (bucket_id = 'exam-scans' and public.is_exam_staff());
drop policy if exists "Exam staff replace scans" on storage.objects;
create policy "Exam staff replace scans" on storage.objects for update to authenticated
  using (bucket_id = 'exam-scans' and public.is_exam_staff()) with check (bucket_id = 'exam-scans' and public.is_exam_staff());
drop policy if exists "Exam staff delete scans" on storage.objects;
create policy "Exam staff delete scans" on storage.objects for delete to authenticated
  using (bucket_id = 'exam-scans' and public.is_exam_staff());


-- ── 3. Create a paper script ────────────────────────────────
-- p_roster: a learner on the sitting's class list, or null to add a name-only entry
-- (p_label, default "Script NN") so a pilot can stay anonymous.
create or replace function public.exam_add_paper_script(p_sitting uuid, p_roster uuid default null, p_label text default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare s exam_sittings; v_roster uuid; v_name text; a exam_attempts; n int;
begin
  if not is_exam_staff() then raise exception 'Not allowed.'; end if;
  select * into s from exam_sittings where id = p_sitting;
  if not found then raise exception 'Sitting not found.'; end if;
  if p_roster is not null then
    select id, display_name into v_roster, v_name from class_roster where id = p_roster and class_id = s.class_id;
    if v_roster is null then raise exception 'That learner is not on this class list.'; end if;
  else
    select count(*) + 1 into n from class_roster where class_id = s.class_id and display_name ~ '^Script [0-9]+$';
    v_name := coalesce(nullif(btrim(left(p_label, 80)), ''), 'Script ' || lpad(n::text, 2, '0'));
    insert into class_roster (class_id, display_name, sort_key) values (s.class_id, v_name, 'zz ' || v_name)
    on conflict do nothing returning id into v_roster;
    if v_roster is null then raise exception 'There is already a learner called % in this class.', v_name; end if;
  end if;
  insert into exam_attempts (sitting_id, student_id, roster_id, deadline, status, submitted_at, submit_kind, source)
  select s.id, r.student_id, r.id, now(), 'submitted', now(), 'teacher', 'paper' from class_roster r where r.id = v_roster
  on conflict do nothing returning * into a;
  if a.id is null then raise exception '% already has a script for this paper.', v_name; end if;
  insert into exam_events (attempt_id, kind, detail) values (a.id, 'start', 'paper script');
  return jsonb_build_object('attempt_id', a.id, 'roster_id', v_roster, 'name', v_name);
end $$;


-- ── 4. Monitor and release see paper scripts (matched on the class-list row) ──
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
      'source', a.source, 'pages', a.pages, 'checked', a.transcript_checked_at is not null,
      'answered', (select count(*) from jsonb_object_keys(coalesce(a.answers, '{}'::jsonb))),
      'flags', (select count(*) from exam_events e where e.attempt_id = a.id and e.kind in ('fs_exit', 'hidden', 'blur', 'paste')),
      'last_event', (select e.kind || ' ' || to_char(e.at at time zone 'Africa/Johannesburg', 'HH24:MI:SS')
                     from exam_events e where e.attempt_id = a.id order by e.at desc limit 1)
    ) order by coalesce(r.sort_key, r.display_name))
    from class_roster r
    left join lateral (select * from exam_attempts a0 where a0.sitting_id = s.id
                         and (a0.roster_id = r.id or (a0.source = 'online' and a0.student_id = r.student_id))
                       order by (a0.source = 'online') desc limit 1) a on true
    left join exam_time_extra x on x.roster_id = r.id
    where r.class_id = s.class_id and r.active), '[]'::jsonb));
end $$;

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

  insert into mb_marks (task_id, roster_id, mark, status, released)
  select v_task, r.id,
         (select coalesce(sum(exam_final_score(m)), 0) from exam_marks m where m.attempt_id = a.id),
         case when a.id is null then 'absent' end, true
  from class_roster r
  left join lateral (select * from exam_attempts a0 where a0.sitting_id = s.id
                       and (a0.roster_id = r.id or (a0.source = 'online' and a0.student_id = r.student_id))
                     order by (a0.source = 'online') desc limit 1) a on true
  where r.class_id = s.class_id and r.active
  on conflict (task_id, roster_id) do update set mark = excluded.mark, status = excluded.status, released = true,
    updated_by = auth.uid(), updated_at = now();
  get diagnostics n = row_count;

  update exam_sittings set released_at = now(), mb_task_id = v_task, is_open = false where id = s.id;
  return jsonb_build_object('task_id', v_task, 'marks', n);
end $$;


-- ── 5. Who may call what ────────────────────────────────────
revoke execute on function public.exam_add_paper_script(uuid, uuid, text) from public, anon;
grant execute on function public.exam_add_paper_script(uuid, uuid, text) to authenticated;
