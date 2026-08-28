-- ============================================================
-- THE MAGIC LAB — lesson plan coverage tracking
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New
-- query), after lesson-planner-schema.sql. Safe to re-run.
--
-- Adds two columns to `lesson_plan_notes` so teachers can log when a
-- topic was actually taught and whether it was covered:
--   dates_taught — free text (e.g. "12 Feb, 14 Feb, 19 Feb"). Free
--     text rather than a single date because an ATP topic often spans
--     several lessons/weeks.
--   covered — boolean, ticked via a checkbox in the Lesson Plan form.
--     Defaults to false so a freshly-planned topic prints as an empty
--     tick box on the "Print / Save as PDF" output until a teacher
--     marks it done.
-- ============================================================

alter table lesson_plan_notes add column if not exists dates_taught text;
alter table lesson_plan_notes add column if not exists covered boolean not null default false;
