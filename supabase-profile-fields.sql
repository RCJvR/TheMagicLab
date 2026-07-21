-- ============================================================
-- THE MAGIC LAB — profile fields (school / province / subjects)
-- Run this once in the Supabase SQL editor. Safe to re-run.
--
-- Adds three optional columns to the existing `profiles` table:
--   school   — free text, either role
--   province — one of South Africa's 9 provinces, either role
--   subjects — free text, teachers only (e.g. "Mathematics, Physical Sciences")
-- ============================================================

alter table profiles add column if not exists school text;
alter table profiles add column if not exists province text;
alter table profiles add column if not exists subjects text;
