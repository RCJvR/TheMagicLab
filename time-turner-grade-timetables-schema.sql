-- ============================================================
-- THE MAGIC LAB — Time Turner shared grade timetable schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Depends on the existing profiles table.
--
-- The whole-grade 10-day, 6-period timetable a teacher uploads once so
-- every student in that grade can import it into their own Time Turner
-- plan instead of adding all 60 periods by hand. grid is keyed by cycle
-- day ("1".."10") -> an array of 6 subject names (period 1..6; an empty
-- string means a free period or break that day).
--
-- Same access pattern as `assessments`: any signed-in user can read it
-- (a fact about the school), any teacher can write it, one row per
-- grade (re-uploading replaces that grade's grid outright). Grade 10-12
-- electives mean this can only represent the compulsory/core periods
-- for those grades — the upload UI says so; a student who imports it
-- adds their own elective periods on top afterward.
-- ============================================================

create table if not exists grade_timetables (
  grade      int primary key check (grade between 8 and 12),
  grid       jsonb not null default '{}'::jsonb,
  updated_by uuid references profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table grade_timetables enable row level security;

create policy "Signed-in users read grade timetables" on grade_timetables
  for select using (auth.uid() is not null);

create policy "Teachers manage grade timetables" on grade_timetables
  for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'teacher'))
  with check (exists (select 1 from profiles where id = auth.uid() and role = 'teacher'));
