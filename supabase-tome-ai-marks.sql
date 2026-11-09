-- THE MAGIC LAB — Test Tome AI marking: one paper per learner per day
--
-- The tome-ai-mark edge function inserts a row (service role) before it
-- calls the Claude API, and deletes it again if the call fails, so the
-- primary key is the daily limit. It also counts today's rows to enforce
-- the site-wide daily cap that protects the API budget.
-- Learners can read their own rows (to see whether today's paper is used);
-- nobody but the service role can write.

create table if not exists public.tome_ai_marks (
  user_id    uuid not null references auth.users(id) on delete cascade,
  day        date not null default ((now() at time zone 'Africa/Johannesburg')::date),
  quiz_id    text not null,
  created_at timestamptz not null default now(),
  input_tokens  integer,
  output_tokens integer,
  primary key (user_id, day)
);

create index if not exists tome_ai_marks_day on public.tome_ai_marks (day);

alter table public.tome_ai_marks enable row level security;

drop policy if exists "own ai marks" on public.tome_ai_marks;
create policy "own ai marks" on public.tome_ai_marks
  for select to authenticated using (user_id = (select auth.uid()));

revoke all on public.tome_ai_marks from anon;
revoke insert, update, delete on public.tome_ai_marks from authenticated;
grant select on public.tome_ai_marks to authenticated;
