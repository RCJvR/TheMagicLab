-- ============================================================
-- THE MAGIC LAB — Time Turner period schedule schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Depends on the existing profiles table.
--
-- The school's period times (up to 6 periods/day) are a fact about the
-- school, not a personal preference, so — like the assessment calendar —
-- a teacher sets them once and every student's planner reads the same
-- schedule. Two day types cover a normal day and an early-finish Friday;
-- both still run all 6 periods, just at different times.
-- ============================================================

create table if not exists period_schedule (
  id         uuid primary key default gen_random_uuid(),
  day_type   text not null check (day_type in ('regular', 'friday')),
  period     int not null check (period between 1 and 6),
  start_time time not null,
  end_time   time not null,
  updated_by uuid references profiles(id) on delete set null,
  updated_at timestamptz not null default now(),
  unique (day_type, period)
);

alter table period_schedule enable row level security;

create policy "Signed-in users read period schedule" on period_schedule
  for select using (auth.uid() is not null);

create policy "Teachers manage period schedule" on period_schedule
  for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'teacher'))
  with check (exists (select 1 from profiles where id = auth.uid() and role = 'teacher'));
