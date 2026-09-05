-- ============================================================
-- THE MAGIC LAB — Time Turner cross-device sync schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Depends on the existing profiles table.
--
-- The personal planner used to be localStorage-only (see time-turner.js's
-- header comment history) — nothing followed a student between browsers
-- or devices. This table is the full private schedule (entries, the
-- plan name shown when printing, and dismissed suggestions), synced
-- from whichever device a student last used it on.
--
-- Deliberately a SEPARATE table from planner_summaries (the weekly
-- category totals a teacher can read for their own students) — this
-- one is the actual detailed schedule, and stays student-only. No
-- teacher policy at all, on purpose.
-- ============================================================

create table if not exists planner_entries (
  student_id            uuid primary key references profiles(id) on delete cascade,
  plan_name             text,
  entries               jsonb not null default '[]'::jsonb,
  dismissed_suggestions jsonb not null default '[]'::jsonb,
  updated_at            timestamptz not null default now()
);

alter table planner_entries enable row level security;

create policy "Students manage their own planner entries" on planner_entries
  for all
  using (student_id = auth.uid())
  with check (student_id = auth.uid());
