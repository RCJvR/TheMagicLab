-- ============================================================
-- THE MAGIC LAB — Grading Grimoire phase 0: class roster, rubrics, markbook core
-- Spec: docs/marking-platform-spec.md (§1, §4, §6). Run AFTER supabase-co-teachers.sql.
-- HOW TO RUN: Supabase SQL editor → paste → Run. Safe to re-run.
--
--  • class_roster: one row per learner per class. student_id is null for a
--    learner who has no account yet (name only). Every markbook mark points at
--    a roster row. A trigger keeps it in step with class_members; joining a
--    class can never fail because of it.
--  • rubrics + rubric_versions: the Rubric Builder's rubrics, saved to the
--    teacher's account. A version is never changed after it is saved.
--  • mb_settings, mb_tasks, mb_marks, mark_audit: the markbook tables, used by
--    the browser-data import and the markbook (phase 2).
-- ============================================================


-- ── 1. Class roster ─────────────────────────────────────────
create table if not exists public.class_roster (
  id            uuid primary key default gen_random_uuid(),
  class_id      uuid not null references public.classes(id) on delete cascade,
  student_id    uuid references public.profiles(id) on delete set null,   -- null = name-only learner
  display_name  text not null check (char_length(display_name) between 1 and 80),
  admission_no  text check (admission_no is null or admission_no ~ '^[A-Za-z0-9/_-]{1,20}$'),
  sort_key      text check (char_length(sort_key) <= 80),
  active        boolean not null default true,                             -- left the class: marks kept, row hidden
  import_ref    text check (char_length(import_ref) <= 80),               -- local id from the browser import
  created_at    timestamptz not null default now(),
  unique (class_id, student_id)
);
create unique index if not exists class_roster_class_name_uq on public.class_roster (class_id, lower(display_name));
create index if not exists class_roster_student_idx on public.class_roster (student_id);

alter table public.class_roster enable row level security;
revoke all on public.class_roster from anon;
grant select, insert, update, delete on public.class_roster to authenticated;

drop policy if exists class_roster_teacher_all on public.class_roster;
create policy class_roster_teacher_all on public.class_roster for all to authenticated
  using (public.is_class_teacher(class_id)) with check (public.is_class_teacher(class_id));
drop policy if exists class_roster_learner_own on public.class_roster;
create policy class_roster_learner_own on public.class_roster for select to authenticated
  using (student_id = (select auth.uid()));

-- A name that is free in the class: "Thandi M", then "Thandi M (2)", "Thandi M (3)" …
create or replace function public.roster_free_name(p_class uuid, p_name text)
returns text language plpgsql stable security definer set search_path = public as $$
declare base text := left(coalesce(nullif(trim(p_name), ''), 'Learner'), 72); n int := 1; cand text := base;
begin
  while exists (select 1 from class_roster where class_id = p_class and lower(display_name) = lower(cand)) loop
    n := n + 1; cand := base || ' (' || n || ')';
  end loop;
  return cand;
end $$;
revoke execute on function public.roster_free_name(uuid, text) from public, anon;

-- Joining a class adds a roster row (or re-activates the old one). A name-only row
-- with the same name is NOT linked automatically, because two learners can share a
-- name; the teacher links it with one click (phase 2 UI).
create or replace function public.roster_on_member_join()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  begin
    insert into class_roster (class_id, student_id, display_name)
    select new.class_id, new.student_id, roster_free_name(new.class_id, p.display_name)
    from profiles p where p.id = new.student_id
    on conflict (class_id, student_id) do update set active = true;
  exception when others then
    -- never block a learner from joining; the teacher can add the row later
    raise warning 'class_roster insert skipped for % in %: %', new.student_id, new.class_id, sqlerrm;
  end;
  return new;
end $$;
revoke execute on function public.roster_on_member_join() from public, anon;
drop trigger if exists trg_roster_on_member_join on public.class_members;
create trigger trg_roster_on_member_join after insert on public.class_members
  for each row execute function public.roster_on_member_join();

create or replace function public.roster_on_member_leave()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update class_roster set active = false where class_id = old.class_id and student_id = old.student_id;
  return old;
end $$;
revoke execute on function public.roster_on_member_leave() from public, anon;
drop trigger if exists trg_roster_on_member_leave on public.class_members;
create trigger trg_roster_on_member_leave after delete on public.class_members
  for each row execute function public.roster_on_member_leave();

-- Backfill: every current member gets a row. Duplicate names in a class get (2), (3)…
insert into public.class_roster (class_id, student_id, display_name)
select class_id, student_id,
       case when rn = 1 then base else left(base, 72) || ' (' || rn || ')' end
from (
  select m.class_id, m.student_id,
         left(coalesce(nullif(trim(p.display_name), ''), 'Learner'), 80) as base,
         row_number() over (partition by m.class_id, lower(coalesce(nullif(trim(p.display_name), ''), 'Learner'))
                            order by m.student_id) as rn
  from public.class_members m join public.profiles p on p.id = m.student_id
  where not exists (select 1 from public.class_roster r where r.class_id = m.class_id and r.student_id = m.student_id)
) x
on conflict do nothing;


-- ── 2. Rubrics ──────────────────────────────────────────────
create table if not exists public.rubrics (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 200),
  subject     text check (char_length(subject) <= 60),
  grade       smallint check (grade between 1 and 12),
  type        text not null check (type in ('analytic_points', 'analytic_range', 'holistic',
                                            'single_point', 'checklist', 'marking_grid')),
  current_version int not null default 0,
  import_ref  text check (char_length(import_ref) <= 80),
  archived    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists rubrics_owner_idx on public.rubrics (owner_id, updated_at desc);

create table if not exists public.rubric_versions (
  id          uuid primary key default gen_random_uuid(),
  rubric_id   uuid not null references public.rubrics(id) on delete cascade,
  version     int not null check (version >= 1),
  definition  jsonb not null check (
                jsonb_typeof(definition) = 'object'
                and definition ? 'type' and definition ? 'criteria'
                and jsonb_typeof(definition -> 'criteria') = 'array'
                and jsonb_array_length(definition -> 'criteria') between 1 and 60
                and pg_column_size(definition) < 200000),
  max_score   numeric(7,2) not null check (max_score > 0),
  created_at  timestamptz not null default now(),
  unique (rubric_id, version)
);

alter table public.rubrics enable row level security;
alter table public.rubric_versions enable row level security;
revoke all on public.rubrics, public.rubric_versions from anon;
grant select, insert, update, delete on public.rubrics to authenticated;
revoke update, delete on public.rubric_versions from authenticated;
grant select, insert on public.rubric_versions to authenticated;   -- versions are never changed

drop policy if exists rubrics_owner_all on public.rubrics;
create policy rubrics_owner_all on public.rubrics for all to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
drop policy if exists rubric_versions_owner_read on public.rubric_versions;
create policy rubric_versions_owner_read on public.rubric_versions for select to authenticated
  using (exists (select 1 from public.rubrics r where r.id = rubric_id and r.owner_id = (select auth.uid())));
drop policy if exists rubric_versions_owner_insert on public.rubric_versions;
create policy rubric_versions_owner_insert on public.rubric_versions for insert to authenticated
  with check (exists (select 1 from public.rubrics r where r.id = rubric_id and r.owner_id = (select auth.uid())));

-- Save a rubric as a new version in one step (creates the rubric the first time).
-- Returns the rubric id. The browser works out max_score; the shape is checked above.
create or replace function public.save_rubric(p_rubric uuid, p_title text, p_type text, p_definition jsonb,
                                              p_max_score numeric, p_import_ref text default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare rid uuid := p_rubric; v int;
begin
  if not exists (select 1 from profiles where id = auth.uid() and role in ('teacher', 'admin')) then
    raise exception 'Only teachers can save rubrics';
  end if;
  if rid is null and p_import_ref is not null then
    select id into rid from rubrics where owner_id = auth.uid() and import_ref = p_import_ref;
  end if;
  if rid is null then
    insert into rubrics (owner_id, title, type, import_ref) values (auth.uid(), left(p_title, 200), p_type, p_import_ref)
    returning id into rid;
  elsif not exists (select 1 from rubrics where id = rid and owner_id = auth.uid()) then
    raise exception 'Not your rubric';
  end if;
  select current_version + 1 into v from rubrics where id = rid for update;
  insert into rubric_versions (rubric_id, version, definition, max_score) values (rid, v, p_definition, p_max_score);
  update rubrics set title = left(p_title, 200), type = p_type, current_version = v, updated_at = now() where id = rid;
  return rid;
end $$;
revoke execute on function public.save_rubric(uuid, text, text, jsonb, numeric, text) from public, anon;
grant execute on function public.save_rubric(uuid, text, text, jsonb, numeric, text) to authenticated;


-- ── 3. Markbook core ────────────────────────────────────────
create table if not exists public.mb_settings (
  class_id        uuid primary key references public.classes(id) on delete cascade,
  term_weights    numeric(5,2)[] check (term_weights is null or cardinality(term_weights) = 4),
  missing_as_zero boolean not null default false,
  export_map      jsonb check (export_map is null or (jsonb_typeof(export_map) = 'object' and pg_column_size(export_map) < 50000)),
  updated_at      timestamptz not null default now()
);

create table if not exists public.mb_tasks (
  id             uuid primary key default gen_random_uuid(),
  class_id       uuid not null references public.classes(id) on delete cascade,
  source         text not null check (source in ('assignment', 'manual', 'tome', 'practice', 'drawing')),
  assignment_id  uuid unique references public.assignments(id) on delete set null,
  source_ref     text check (char_length(source_ref) <= 120),
  title          text not null check (char_length(title) between 1 and 120),
  task_type      text not null default 'Other'
                   check (task_type in ('Test', 'Exam', 'Practical', 'Project', 'Assignment', 'Oral', 'Practice', 'Other')),
  term           smallint check (term is null or term between 1 and 4),
  task_date      date,
  total          numeric(7,2) not null check (total > 0),
  weight         numeric(5,2) not null default 0 check (weight between 0 and 100),   -- % of the year mark
  counts_to_year boolean not null default true,
  rubric_version_id uuid references public.rubric_versions(id) on delete restrict,
  position       smallint,
  import_ref     text check (char_length(import_ref) <= 80),
  created_at     timestamptz not null default now()
);
create index if not exists mb_tasks_class_idx on public.mb_tasks (class_id, term, task_date);
create unique index if not exists mb_tasks_import_uq on public.mb_tasks (class_id, import_ref) where import_ref is not null;

create table if not exists public.mb_marks (
  id          uuid primary key default gen_random_uuid(),
  task_id     uuid not null references public.mb_tasks(id) on delete cascade,
  roster_id   uuid not null references public.class_roster(id) on delete cascade,
  mark        numeric(7,2) check (mark is null or mark >= 0),
  status      text check (status is null or status in ('missing', 'absent', 'excused', 'exempt')),
  comment     text check (char_length(comment) <= 1000),
  released    boolean not null default false,
  updated_by  uuid default auth.uid() references public.profiles(id) on delete set null,
  updated_at  timestamptz not null default now(),
  unique (task_id, roster_id)
);
create index if not exists mb_marks_roster_idx on public.mb_marks (roster_id);

alter table public.mb_settings enable row level security;
alter table public.mb_tasks enable row level security;
alter table public.mb_marks enable row level security;
revoke all on public.mb_settings, public.mb_tasks, public.mb_marks from anon;
grant select, insert, update, delete on public.mb_settings, public.mb_tasks, public.mb_marks to authenticated;

drop policy if exists mb_settings_teacher on public.mb_settings;
create policy mb_settings_teacher on public.mb_settings for all to authenticated
  using (public.is_class_teacher(class_id)) with check (public.is_class_teacher(class_id));
drop policy if exists mb_tasks_teacher on public.mb_tasks;
create policy mb_tasks_teacher on public.mb_tasks for all to authenticated
  using (public.is_class_teacher(class_id)) with check (public.is_class_teacher(class_id));
-- mb_marks and mb_tasks policies must not read each other's tables directly
-- (that loops: "infinite recursion detected in policy"), so two small
-- security definer lookups do it. Found by the live permission test 2026-11-12.
create or replace function public.mb_task_class(p_task uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select class_id from mb_tasks where id = p_task;
$$;
create or replace function public.mb_task_released_to_me(p_task uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from mb_marks m join class_roster r on r.id = m.roster_id
                 where m.task_id = p_task and m.released and r.student_id = (select auth.uid()));
$$;
revoke execute on function public.mb_task_class(uuid), public.mb_task_released_to_me(uuid) from public, anon, authenticated;
grant execute on function public.mb_task_class(uuid), public.mb_task_released_to_me(uuid) to authenticated;

drop policy if exists mb_marks_teacher on public.mb_marks;
create policy mb_marks_teacher on public.mb_marks for all to authenticated
  using (public.is_class_teacher(public.mb_task_class(task_id)))
  with check (public.is_class_teacher(public.mb_task_class(task_id))
              and exists (select 1 from public.class_roster r
                          where r.id = roster_id and r.class_id = public.mb_task_class(task_id)));
drop policy if exists mb_marks_learner_released on public.mb_marks;
create policy mb_marks_learner_released on public.mb_marks for select to authenticated
  using (released and exists (select 1 from public.class_roster r where r.id = roster_id and r.student_id = (select auth.uid())));
drop policy if exists mb_tasks_learner_released on public.mb_tasks;
create policy mb_tasks_learner_released on public.mb_tasks for select to authenticated
  using (public.mb_task_released_to_me(id));


-- ── 4. Audit log of mark changes (append-only, written by trigger) ──
create table if not exists public.mark_audit (
  id          bigint generated always as identity primary key,
  class_id    uuid not null references public.classes(id) on delete cascade,
  actor_id    uuid references public.profiles(id) on delete set null,
  entity      text not null check (entity in ('submission', 'mb_mark')),
  entity_id   uuid not null,
  field       text not null check (field in ('score', 'released_at', 'status', 'mark')),
  old_value   text check (char_length(old_value) <= 60),
  new_value   text check (char_length(new_value) <= 60),
  at          timestamptz not null default now()
);
create index if not exists mark_audit_entity_idx on public.mark_audit (entity, entity_id, at);
alter table public.mark_audit enable row level security;
revoke all on public.mark_audit from anon, authenticated;
grant select on public.mark_audit to authenticated;
drop policy if exists mark_audit_teacher_read on public.mark_audit;
create policy mark_audit_teacher_read on public.mark_audit for select to authenticated
  using (public.is_class_teacher(class_id));

create or replace function public.audit_mb_marks()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_class uuid;
begin
  select class_id into v_class from mb_tasks where id = new.task_id;
  if tg_op = 'INSERT' then
    if new.mark is not null then
      insert into mark_audit (class_id, actor_id, entity, entity_id, field, old_value, new_value)
      values (v_class, auth.uid(), 'mb_mark', new.id, 'mark', null, new.mark::text);
    end if;
    return new;
  end if;
  if new.mark is distinct from old.mark then
    insert into mark_audit (class_id, actor_id, entity, entity_id, field, old_value, new_value)
    values (v_class, auth.uid(), 'mb_mark', new.id, 'mark', old.mark::text, new.mark::text);
  end if;
  if new.status is distinct from old.status then
    insert into mark_audit (class_id, actor_id, entity, entity_id, field, old_value, new_value)
    values (v_class, auth.uid(), 'mb_mark', new.id, 'status', old.status, new.status);
  end if;
  return new;
end $$;
revoke execute on function public.audit_mb_marks() from public, anon;
drop trigger if exists trg_audit_mb_marks on public.mb_marks;
create trigger trg_audit_mb_marks after insert or update on public.mb_marks
  for each row execute function public.audit_mb_marks();

-- ── 5. Internal functions are not callable from the API ──
-- (Supabase grants EXECUTE to authenticated by default; triggers do not need it.)
revoke execute on function public.roster_free_name(uuid, text), public.roster_on_member_join(),
  public.roster_on_member_leave(), public.audit_mb_marks() from authenticated;
