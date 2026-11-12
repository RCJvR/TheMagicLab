-- ============================================================
-- THE MAGIC LAB — Grading Grimoire phase 2: private drafts, comment bank
-- Run AFTER the phase 1 and PDF files. Safe to re-run.
--
--  • Drafts stay private: teachers can still see a submission's status, but no
--    longer the learner's unsubmitted draft_doc. Column privileges hide that one
--    column; the learner reads their own draft through get_my_draft() (and
--    start_submission(), which already returns it).
--  • comment_bank: each teacher's reusable comments and their own stamp set.
-- ============================================================

-- ── 1. Private drafts ───────────────────────────────────────
revoke select on public.submissions from authenticated;
grant select (id, assignment_id, student_id, status, doc_schema, draft_version, draft_saved_at, attempt, released_at, created_at)
  on public.submissions to authenticated;

create or replace function public.get_my_draft(p_submission uuid)
returns table (draft_doc jsonb, draft_version int, status text)
language sql stable security definer set search_path = public as $$
  select s.draft_doc, s.draft_version, s.status from submissions s
  where s.id = p_submission and s.student_id = (select auth.uid());
$$;
revoke execute on function public.get_my_draft(uuid) from public, anon;
grant execute on function public.get_my_draft(uuid) to authenticated;


-- ── 2. Comment bank and stamps ──────────────────────────────
create table if not exists public.comment_bank (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  kind        text not null default 'comment' check (kind in ('comment', 'stamp')),
  body        text not null check (char_length(body) between 1 and 1000),
  marks       numeric(5,2) check (marks is null or marks between -100 and 100),
  tags        text[] not null default '{}' check (cardinality(tags) <= 10),
  position    smallint,
  uses        int not null default 0 check (uses >= 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists comment_bank_owner_idx on public.comment_bank (owner_id, kind, uses desc);
-- one copy of the same text per teacher and kind
create unique index if not exists comment_bank_owner_body_uq on public.comment_bank (owner_id, kind, lower(body));

alter table public.comment_bank enable row level security;
revoke all on public.comment_bank from anon;
grant select, insert, update, delete on public.comment_bank to authenticated;
drop policy if exists comment_bank_owner on public.comment_bank;
create policy comment_bank_owner on public.comment_bank for all to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
