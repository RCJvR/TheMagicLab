-- Drawing Druid: "Send to my teacher" from Check my drawing.
-- A learner sends the photo of their drawing (with the red overlay as they lined it up), their
-- checklist ticks and a note to a class they belong to; the class teacher adds a mark and a comment,
-- which the learner sees under the drawing.

create table if not exists public.drawing_submissions (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  class_id        uuid not null references public.classes(id) on delete cascade,
  drawing_id      text not null check (char_length(drawing_id) <= 120),
  drawing_title   text not null check (char_length(drawing_title) <= 200),
  chapter         text check (char_length(chapter) <= 80),
  photo_path      text not null check (char_length(photo_path) <= 200),
  checklist       jsonb not null default '[]'::jsonb,
  note            text check (char_length(note) <= 500),
  teacher_comment text check (char_length(teacher_comment) <= 1000),
  mark            text check (char_length(mark) <= 20),
  reviewed_at     timestamptz,
  created_at      timestamptz not null default now()
);
create index if not exists drawing_submissions_class_idx on public.drawing_submissions (class_id, created_at desc);
create index if not exists drawing_submissions_student_idx on public.drawing_submissions (student_id, drawing_id, created_at desc);

alter table public.drawing_submissions enable row level security;
revoke all on public.drawing_submissions from anon;
revoke update on public.drawing_submissions from authenticated;
grant select, insert, delete on public.drawing_submissions to authenticated;
-- teachers may only change the review: mark, comment, reviewed_at
grant update (teacher_comment, mark, reviewed_at) on public.drawing_submissions to authenticated;

create policy "Learner sends to own class" on public.drawing_submissions for insert to authenticated
  with check (
    student_id = auth.uid()
    and exists (select 1 from public.class_members m where m.class_id = drawing_submissions.class_id and m.student_id = auth.uid())
    and photo_path like auth.uid()::text || '/%'
  );
create policy "Learner reads own" on public.drawing_submissions for select to authenticated using (student_id = auth.uid());
create policy "Learner deletes own" on public.drawing_submissions for delete to authenticated using (student_id = auth.uid());
create policy "Class teacher reads" on public.drawing_submissions for select to authenticated using (public.is_class_teacher(class_id));
create policy "Class teacher reviews" on public.drawing_submissions for update to authenticated
  using (public.is_class_teacher(class_id)) with check (public.is_class_teacher(class_id));

-- private bucket: JPEG only, 1 MB each, one folder per learner
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('drawing-checks', 'drawing-checks', false, 1048576, array['image/jpeg'])
on conflict (id) do nothing;

create policy "Learner uploads own drawing photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'drawing-checks' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Learner reads own drawing photos" on storage.objects for select to authenticated
  using (bucket_id = 'drawing-checks' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Learner deletes own drawing photos" on storage.objects for delete to authenticated
  using (bucket_id = 'drawing-checks' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Class teacher reads drawing photos" on storage.objects for select to authenticated
  using (bucket_id = 'drawing-checks' and exists (
    select 1 from public.drawing_submissions s where s.photo_path = storage.objects.name and public.is_class_teacher(s.class_id)));
