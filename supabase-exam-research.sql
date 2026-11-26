-- ============================================================
-- THE MAGIC LAB — Exam Sanctum research layer (2026-11-26)
-- What the doctoral research protocol (Section 12) needs on top of Exam Sanctum.
-- Run AFTER supabase-exam-sanctum.sql. Supabase SQL editor → paste → Run.
-- Safe to re-run.
--
--  • exam_wordbank          approved English ↔ Afrikaans terms, used to translate and to mark
--  • exam_marks (+columns)  four-part AI feedback, teacher's feedback edit, override reason
--  • exam_ai_log            every AI call: model, prompt / memo / wordbank versions, tokens, cost, time
--  • exam_parity            blind hand marks (teacher and second marker) for the parity sample
--  • exam_sittings (+cols)  feedback condition (full / marks only), parity sample
--  • exam_feedback_groups   class → group A (full feedback Terms 1–2) or B (Terms 3–4)
--  • exam_research_consent  consent, assent and the random research code per learner
--  • exam_feedback_views    when a learner opened their feedback, a question, a practice link
--  • exam_corrections       the learner's corrected answer after feedback
--
-- Security: staff tables are staff-only (is_exam_staff()). Learners reach their own
-- results, views and corrections only through the security-definer functions below.
-- The research export returns research codes only, never names, and only for learners
-- whose parent consent AND learner assent are both recorded as given.
-- ============================================================


-- ── 1. Wordbank ─────────────────────────────────────────────
create table if not exists public.exam_wordbank (
  id          uuid primary key default gen_random_uuid(),
  en          text not null check (char_length(en) between 1 and 120),
  af          text not null check (char_length(af) between 1 and 120),
  def_en      text check (char_length(def_en) <= 600),
  def_af      text check (char_length(def_af) <= 600),
  topic       text check (char_length(topic) <= 80),
  grade       smallint check (grade is null or grade between 1 and 12),
  accept_en   text[] not null default '{}',   -- other spellings / synonyms that still earn the mark
  accept_af   text[] not null default '{}',
  source      text check (char_length(source) <= 200),
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_by  uuid default auth.uid() references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create unique index if not exists exam_wordbank_en_uq on public.exam_wordbank (lower(en), coalesce(grade, 0));
alter table public.exam_wordbank enable row level security;
revoke all on public.exam_wordbank from anon;
grant select, insert, update, delete on public.exam_wordbank to authenticated;
drop policy if exists exam_wordbank_staff on public.exam_wordbank;
create policy exam_wordbank_staff on public.exam_wordbank for all to authenticated
  using (public.is_exam_staff()) with check (public.is_exam_staff());


-- ── 2. Richer marks ─────────────────────────────────────────
alter table public.exam_marks add column if not exists ai_fb jsonb
  check (ai_fb is null or (jsonb_typeof(ai_fb) = 'object' and pg_column_size(ai_fb) < 6000));      -- {well, missing, next}
alter table public.exam_marks add column if not exists teacher_fb jsonb
  check (teacher_fb is null or (jsonb_typeof(teacher_fb) = 'object' and pg_column_size(teacher_fb) < 6000));
alter table public.exam_marks add column if not exists override_reason text
  check (override_reason is null or override_reason in ('memo_gap', 'too_lenient', 'too_strict', 'misread', 'language', 'partial', 'other'));


-- ── 3. AI audit log ─────────────────────────────────────────
create table if not exists public.exam_ai_log (
  id             bigserial primary key,
  attempt_id     uuid references public.exam_attempts(id) on delete cascade,
  sitting_id     uuid references public.exam_sittings(id) on delete cascade,
  kind           text not null check (kind in ('mark', 'remark', 'stability')),
  requested_by   uuid references public.profiles(id) on delete set null,
  model          text check (char_length(model) <= 80),
  prompt_version text check (char_length(prompt_version) <= 40),
  memo_hash      text check (char_length(memo_hash) <= 64),
  wordbank_hash  text check (char_length(wordbank_hash) <= 64),
  wordbank_terms integer,
  items          text[],
  input_tokens   integer,
  cache_read     integer,
  cache_write    integer,
  output_tokens  integer,
  cost_usd       numeric(10,5),
  ms             integer,
  ok             boolean not null,
  error          text check (char_length(error) <= 300),
  result         jsonb check (result is null or pg_column_size(result) < 200000),   -- per item: met, score, confidence (stability runs)
  created_at     timestamptz not null default now()
);
create index if not exists exam_ai_log_sitting_idx on public.exam_ai_log (sitting_id, created_at);
create index if not exists exam_ai_log_attempt_idx on public.exam_ai_log (attempt_id, created_at);
alter table public.exam_ai_log enable row level security;
revoke all on public.exam_ai_log from anon;
grant select on public.exam_ai_log to authenticated;
drop policy if exists exam_ai_log_staff on public.exam_ai_log;
create policy exam_ai_log_staff on public.exam_ai_log for select to authenticated using (public.is_exam_staff());


-- ── 4. Sittings: feedback condition and parity sample ───────
alter table public.exam_sittings add column if not exists feedback_mode text not null default 'full'
  check (feedback_mode in ('full', 'marks'));
alter table public.exam_sittings add column if not exists parity_sample uuid[];   -- attempt ids, stratified by mark

create table if not exists public.exam_feedback_groups (
  class_id   uuid primary key references public.classes(id) on delete cascade,
  grp        text not null check (grp in ('A', 'B')),
  updated_by uuid default auth.uid() references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);
alter table public.exam_feedback_groups enable row level security;
revoke all on public.exam_feedback_groups from anon;
grant select, insert, update, delete on public.exam_feedback_groups to authenticated;
drop policy if exists exam_feedback_groups_staff on public.exam_feedback_groups;
create policy exam_feedback_groups_staff on public.exam_feedback_groups for all to authenticated
  using (public.is_exam_staff()) with check (public.is_exam_staff());

-- Switching replications: group A gets full feedback in Terms 1–2, group B in Terms 3–4.
-- A class with no group, or a sitting with no term, gets full feedback.
create or replace function public.exam_feedback_mode_for(p_class uuid, p_term int)
returns text language sql stable security definer set search_path = public as $$
  select case
    when p_term is null then 'full'
    when g.grp = 'A' and p_term in (3, 4) then 'marks'
    when g.grp = 'B' and p_term in (1, 2) then 'marks'
    else 'full' end
  from (select 1) x left join exam_feedback_groups g on g.class_id = p_class;
$$;

create or replace function public.exam_sitting_set_mode()
returns trigger language plpgsql set search_path = public as $$
begin
  new.feedback_mode := exam_feedback_mode_for(new.class_id, new.term);
  return new;
end $$;
drop trigger if exists exam_sittings_mode on public.exam_sittings;
create trigger exam_sittings_mode before insert on public.exam_sittings
  for each row execute function public.exam_sitting_set_mode();


-- ── 5. Parity: blind hand marks ─────────────────────────────
create table if not exists public.exam_parity (
  attempt_id  uuid not null references public.exam_attempts(id) on delete cascade,
  item_id     text not null check (item_id ~ '^[0-9]{1,3}(\.[0-9]{1,3}){1,3}$'),
  role        text not null check (role in ('teacher', 'second')),
  marker_id   uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  score       numeric(6,2) not null check (score >= 0),
  met         smallint[],
  note        text check (char_length(note) <= 400),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (attempt_id, item_id, role)
);
alter table public.exam_parity enable row level security;
revoke all on public.exam_parity from anon;
grant select, insert, update, delete on public.exam_parity to authenticated;
drop policy if exists exam_parity_staff on public.exam_parity;
create policy exam_parity_staff on public.exam_parity for all to authenticated
  using (public.is_exam_staff()) with check (public.is_exam_staff() and marker_id = auth.uid());


-- ── 6. Consent and research codes ───────────────────────────
create or replace function public.exam_new_research_code()
returns text language plpgsql volatile set search_path = public as $$
declare c text; ab text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
begin
  loop
    c := 'R' || (select string_agg(substr(ab, 1 + floor(random() * length(ab))::int, 1), '') from generate_series(1, 6));
    exit when not exists (select 1 from exam_research_consent where research_code = c);
  end loop;
  return c;
end $$;

create table if not exists public.exam_research_consent (
  roster_id     uuid primary key references public.class_roster(id) on delete cascade,
  consent       text not null default 'unknown' check (consent in ('unknown', 'given', 'refused', 'withdrawn')),
  assent        text not null default 'unknown' check (assent in ('unknown', 'given', 'refused', 'withdrawn')),
  research_code text not null unique check (research_code ~ '^R[A-Z2-9]{6}$'),
  note          text check (char_length(note) <= 200),
  recorded_by   uuid default auth.uid() references public.profiles(id) on delete set null,
  updated_at    timestamptz not null default now()
);
alter table public.exam_research_consent alter column research_code set default public.exam_new_research_code();
alter table public.exam_research_consent enable row level security;
revoke all on public.exam_research_consent from anon;
grant select, insert, update on public.exam_research_consent to authenticated;
drop policy if exists exam_research_consent_staff on public.exam_research_consent;
create policy exam_research_consent_staff on public.exam_research_consent for all to authenticated
  using (public.is_exam_staff()) with check (public.is_exam_staff());


-- ── 7. Feedback views and corrections (learner side) ────────
create table if not exists public.exam_feedback_views (
  id         bigserial primary key,
  attempt_id uuid not null references public.exam_attempts(id) on delete cascade,
  item_id    text check (item_id is null or item_id ~ '^[0-9]{1,3}(\.[0-9]{1,3}){1,3}$'),
  kind       text not null check (kind in ('open', 'item', 'practice')),
  at         timestamptz not null default now()
);
create index if not exists exam_feedback_views_attempt_idx on public.exam_feedback_views (attempt_id, at);
alter table public.exam_feedback_views enable row level security;
revoke all on public.exam_feedback_views from anon;
grant select on public.exam_feedback_views to authenticated;
drop policy if exists exam_feedback_views_staff on public.exam_feedback_views;
create policy exam_feedback_views_staff on public.exam_feedback_views for select to authenticated using (public.is_exam_staff());

create table if not exists public.exam_corrections (
  attempt_id uuid not null references public.exam_attempts(id) on delete cascade,
  item_id    text not null check (item_id ~ '^[0-9]{1,3}(\.[0-9]{1,3}){1,3}$'),
  body       text not null check (char_length(body) between 1 and 3000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (attempt_id, item_id)
);
alter table public.exam_corrections enable row level security;
revoke all on public.exam_corrections from anon;
grant select on public.exam_corrections to authenticated;
drop policy if exists exam_corrections_staff on public.exam_corrections;
create policy exam_corrections_staff on public.exam_corrections for select to authenticated using (public.is_exam_staff());

-- A learner's own attempt in a released sitting, or an error.
create or replace function public.exam_my_released_attempt(p_sitting uuid)
returns uuid language plpgsql stable security definer set search_path = public as $$
declare v uuid;
begin
  select a.id into v from exam_attempts a join exam_sittings s on s.id = a.sitting_id
  where a.sitting_id = p_sitting and a.student_id = auth.uid() and s.released_at is not null;
  if v is null then raise exception 'No released results for this paper.'; end if;
  return v;
end $$;

create or replace function public.exam_log_view(p_sitting uuid, p_kind text, p_item text default null)
returns void language plpgsql volatile security definer set search_path = public as $$
declare v uuid := exam_my_released_attempt(p_sitting);
begin
  if p_kind not in ('open', 'item', 'practice') then raise exception 'Unknown view.'; end if;
  if (select count(*) from exam_feedback_views where attempt_id = v) >= 1000 then return; end if;
  insert into exam_feedback_views (attempt_id, item_id, kind)
  values (v, case when p_item ~ '^[0-9]{1,3}(\.[0-9]{1,3}){1,3}$' then p_item end, p_kind);
end $$;

create or replace function public.exam_save_correction(p_sitting uuid, p_item text, p_body text)
returns void language plpgsql volatile security definer set search_path = public as $$
declare v uuid := exam_my_released_attempt(p_sitting);
begin
  if not exists (select 1 from exam_marks where attempt_id = v and item_id = p_item) then raise exception 'Unknown question.'; end if;
  if (select feedback_mode from exam_sittings where id = p_sitting) <> 'full' then raise exception 'Corrections are not part of this paper.'; end if;
  if coalesce(btrim(p_body), '') = '' then
    delete from exam_corrections where attempt_id = v and item_id = p_item; return;
  end if;
  insert into exam_corrections (attempt_id, item_id, body) values (v, p_item, left(p_body, 3000))
  on conflict (attempt_id, item_id) do update set body = excluded.body, updated_at = now();
end $$;

-- My released results. Full feedback: four-part feedback, practice link and my correction
-- per question. Marks-only condition: the marks per question and the total, nothing more.
create or replace function public.exam_my_results()
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'sitting_id', s.id, 'title', s.title, 'released_at', s.released_at, 'total', p.total,
    'mode', s.feedback_mode, 'lang', coalesce(p.learner->>'lang', 'en'),
    'score', (select coalesce(sum(exam_final_score(m)), 0) from exam_marks m where m.attempt_id = a.id),
    'summary', case when s.feedback_mode = 'full' then a.ai_summary end,
    'items', (select coalesce(jsonb_agg(jsonb_build_object(
                'id', m.item_id, 'num', coalesce(p.memo->m.item_id->>'num', m.item_id), 'max', m.max, 'score', exam_final_score(m),
                'feedback', case when s.feedback_mode = 'full' then coalesce(m.teacher_note, m.ai_feedback) end,
                'fb', case when s.feedback_mode = 'full' then coalesce(m.teacher_fb, m.ai_fb) end,
                'practice', case when s.feedback_mode = 'full' then p.memo->m.item_id->>'practice' end,
                'correction', (select c.body from exam_corrections c where c.attempt_id = a.id and c.item_id = m.item_id))
              order by m.item_id), '[]'::jsonb)
              from exam_marks m where m.attempt_id = a.id)
  ) order by s.released_at desc), '[]'::jsonb)
  from exam_attempts a join exam_sittings s on s.id = a.sitting_id join exam_papers p on p.id = s.paper_id
  where a.student_id = auth.uid() and s.released_at is not null;
$$;


-- ── 8. Research export (codes only, consenting learners only) ─
-- One row per learner per question, for every sitting the caller can see.
create or replace function public.exam_research_export(p_sittings uuid[])
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  if not is_exam_staff() then raise exception 'Not allowed.'; end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'code', c.research_code, 'grade', p.grade, 'group', g.grp, 'term', s.term,
      'sitting', s.id, 'paper', p.id, 'paper_title', p.title, 'lang', coalesce(p.learner->>'lang', 'en'),
      'condition', s.feedback_mode,
      'item', m.item_id, 'num', p.memo->m.item_id->>'num', 'type', p.memo->m.item_id->>'type',
      'topic', p.memo->m.item_id->>'topic', 'skill', p.memo->m.item_id->>'skill', 'bloom', p.memo->m.item_id->>'bloom',
      'max', m.max, 'auto', m.auto_score, 'ai', m.ai_score, 'ai_conf', m.ai_confidence, 'ai_alt', m.ai_alt,
      'teacher', m.teacher_score, 'final', exam_final_score(m), 'reviewed', m.reviewed, 'override', m.override_reason,
      'parity_t', (select x.score from exam_parity x where x.attempt_id = a.id and x.item_id = m.item_id and x.role = 'teacher'),
      'parity_s', (select x.score from exam_parity x where x.attempt_id = a.id and x.item_id = m.item_id and x.role = 'second'),
      'submitted', a.submitted_at, 'released', s.released_at,
      'views', (select count(*) from exam_feedback_views v where v.attempt_id = a.id and (v.item_id = m.item_id or v.item_id is null and v.kind = 'open')),
      'corrected', exists (select 1 from exam_corrections k where k.attempt_id = a.id and k.item_id = m.item_id))
      order by s.created_at, c.research_code, m.item_id)
    from exam_sittings s
    join exam_papers p on p.id = s.paper_id
    join exam_attempts a on a.sitting_id = s.id
    join class_roster r on r.id = a.roster_id
    join exam_research_consent c on c.roster_id = r.id and c.consent = 'given' and c.assent = 'given'
    left join exam_feedback_groups g on g.class_id = s.class_id
    join exam_marks m on m.attempt_id = a.id
    where s.id = any(p_sittings)), '[]'::jsonb);
end $$;


-- ── 9. Who may call what ────────────────────────────────────
revoke execute on function
  public.exam_feedback_mode_for(uuid, int), public.exam_my_released_attempt(uuid),
  public.exam_log_view(uuid, text, text), public.exam_save_correction(uuid, text, text),
  public.exam_my_results(), public.exam_research_export(uuid[]), public.exam_new_research_code()
from public, anon;
grant execute on function
  public.exam_feedback_mode_for(uuid, int), public.exam_log_view(uuid, text, text),
  public.exam_save_correction(uuid, text, text), public.exam_my_results(), public.exam_research_export(uuid[]),
  public.exam_new_research_code()   -- the column default runs as the staff member inserting the row
to authenticated;
-- internal helper: only the functions above call it
revoke execute on function public.exam_my_released_attempt(uuid) from authenticated;
-- Rolled-back test 2026-11-26 passed: consent gate on the export (0 rows before consent, all
-- items after), parity only under one's own marker id, learner refused on wordbank/export/helper,
-- learner reads no staff tables, views and corrections reach the export, marks-only hides feedback
-- and refuses corrections, group B → marks only in Term 1 and full in Term 3.
