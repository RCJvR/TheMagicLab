-- ════════════════════════════════════════════════════════════════════
-- THE MAGIC LAB — Skills Seer (teacher readiness), schema v1
--
-- Who can see what:
--   * a teacher reads and writes only their own self-assessment, and can
--     ask to opt out (a request only: they cannot approve it themselves);
--   * a curriculum lead sees teachers ONLY at the schools assigned to them
--     for that subject (lead_scopes), and decides those teachers' opt-outs;
--   * an account with the 'manage_leads' permission (or the platform
--     admin) adds schools, links teachers to schools and assigns leads.
-- Leads never read the tables directly: everything they see comes through
-- the security-definer functions below, which apply the scope check.
--
-- Safe to re-run. Changes nothing in existing tables.
-- ════════════════════════════════════════════════════════════════════

-- ── tables ─────────────────────────────────────────────────────────
create table if not exists public.schools (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  region      text,
  curriculum  text not null default 'CAPS' check (curriculum in ('CAPS', 'IEB')),
  created_at  timestamptz not null default now()
);

create table if not exists public.school_teachers (
  school_id   uuid not null references public.schools(id) on delete cascade,
  teacher_id  uuid not null references public.profiles(id) on delete cascade,
  subjects    text[] not null default '{cat}',
  added_at    timestamptz not null default now(),
  primary key (school_id, teacher_id)
);

create table if not exists public.lead_scopes (
  lead_id     uuid not null references public.profiles(id) on delete cascade,
  subject     text not null check (subject in ('cat')),
  school_id   uuid not null references public.schools(id) on delete cascade,
  granted_by  uuid references public.profiles(id),
  granted_at  timestamptz not null default now(),
  primary key (lead_id, subject, school_id)
);

create table if not exists public.platform_permissions (
  user_id     uuid not null references public.profiles(id) on delete cascade,
  permission  text not null check (permission in ('manage_leads')),
  granted_at  timestamptz not null default now(),
  primary key (user_id, permission)
);

create table if not exists public.skill_assessments (
  teacher_id     uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  subject        text not null check (subject in ('cat')),
  skill_id       text not null check (skill_id ~ '^[a-z]+-[a-z-]+$' and length(skill_id) <= 40),
  confidence     smallint not null check (confidence between 1 and 4),
  check_correct  boolean,
  updated_at     timestamptz not null default now(),
  primary key (teacher_id, subject, skill_id)
);

create table if not exists public.skill_optouts (
  teacher_id    uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  subject       text not null check (subject in ('cat')),
  reason        text check (length(reason) <= 1000),
  status        text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  requested_at  timestamptz not null default now(),
  decided_by    uuid references public.profiles(id),
  decided_at    timestamptz,
  primary key (teacher_id, subject)
);

-- ── row-level security ─────────────────────────────────────────────
alter table public.schools              enable row level security;
alter table public.school_teachers      enable row level security;
alter table public.lead_scopes          enable row level security;
alter table public.platform_permissions enable row level security;
alter table public.skill_assessments    enable row level security;
alter table public.skill_optouts        enable row level security;

-- school names are not sensitive: any signed-in user may list them
drop policy if exists schools_read on public.schools;
create policy schools_read on public.schools for select to authenticated using (true);

-- a teacher sees their own school links; a lead sees their own scopes
drop policy if exists school_teachers_own on public.school_teachers;
create policy school_teachers_own on public.school_teachers for select to authenticated using (teacher_id = auth.uid());
drop policy if exists lead_scopes_own on public.lead_scopes;
create policy lead_scopes_own on public.lead_scopes for select to authenticated using (lead_id = auth.uid());
drop policy if exists permissions_own on public.platform_permissions;
create policy permissions_own on public.platform_permissions for select to authenticated using (user_id = auth.uid());

-- self-assessment: own rows only, and only approved teachers can write
drop policy if exists assessments_own_read on public.skill_assessments;
create policy assessments_own_read on public.skill_assessments for select to authenticated using (teacher_id = auth.uid());
drop policy if exists assessments_own_write on public.skill_assessments;
create policy assessments_own_write on public.skill_assessments for insert to authenticated
  with check (teacher_id = auth.uid() and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher', 'admin')));
drop policy if exists assessments_own_update on public.skill_assessments;
create policy assessments_own_update on public.skill_assessments for update to authenticated
  using (teacher_id = auth.uid()) with check (teacher_id = auth.uid());

-- opt-out: a teacher can file or change a PENDING request, never decide it
drop policy if exists optouts_own_read on public.skill_optouts;
create policy optouts_own_read on public.skill_optouts for select to authenticated using (teacher_id = auth.uid());
drop policy if exists optouts_own_insert on public.skill_optouts;
create policy optouts_own_insert on public.skill_optouts for insert to authenticated
  with check (teacher_id = auth.uid() and status = 'pending' and decided_by is null);
drop policy if exists optouts_own_update on public.skill_optouts;
create policy optouts_own_update on public.skill_optouts for update to authenticated
  using (teacher_id = auth.uid() and status = 'pending')
  with check (teacher_id = auth.uid() and status = 'pending' and decided_by is null);

grant select on public.schools, public.school_teachers, public.lead_scopes, public.platform_permissions to authenticated;
grant select, insert, update on public.skill_assessments, public.skill_optouts to authenticated;

-- ── helpers ────────────────────────────────────────────────────────
-- the platform admin (same hardcoded account as the other admin functions)
-- or anyone granted 'manage_leads'
create or replace function public.ss_can_manage()
returns boolean language sql stable security definer set search_path = public as $$
  select auth.uid() = '31a201b0-f426-455a-973a-b1862001b748'::uuid
      or exists (select 1 from platform_permissions where user_id = auth.uid() and permission = 'manage_leads');
$$;

-- ── what a lead sees: their scoped schools, teachers and assessments ──
create or replace function public.skills_seer_lead_overview(p_subject text)
returns table (school_id uuid, school_name text, region text, curriculum text,
               teacher_id uuid, teacher_name text, opt_out text, opt_reason text,
               skill_id text, confidence smallint, check_correct boolean, updated_at timestamptz)
language sql stable security definer set search_path = public as $$
  select s.id, s.name, s.region, s.curriculum,
         st.teacher_id, coalesce(nullif(p.display_name, ''), p.email),
         o.status, o.reason,
         a.skill_id, a.confidence, a.check_correct, a.updated_at
  from lead_scopes ls
  join schools s            on s.id = ls.school_id
  left join school_teachers st on st.school_id = s.id and p_subject = any(st.subjects)
  left join profiles p      on p.id = st.teacher_id
  left join skill_optouts o on o.teacher_id = st.teacher_id and o.subject = p_subject and o.status <> 'declined'
  left join skill_assessments a on a.teacher_id = st.teacher_id and a.subject = p_subject
                               and coalesce(o.status, '') <> 'approved'
  where ls.lead_id = auth.uid() and ls.subject = p_subject;
$$;

-- a lead approves or declines an opt-out for a teacher at one of their schools
create or replace function public.skills_seer_decide_optout(p_teacher uuid, p_subject text, p_approve boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not exists (
    select 1 from lead_scopes ls join school_teachers st on st.school_id = ls.school_id
    where ls.lead_id = auth.uid() and ls.subject = p_subject and st.teacher_id = p_teacher
  ) then raise exception 'not authorized'; end if;
  update skill_optouts
     set status = case when p_approve then 'approved' else 'declined' end,
         decided_by = auth.uid(), decided_at = now()
   where teacher_id = p_teacher and subject = p_subject;
end;
$$;

-- ── administration (manage_leads) ──────────────────────────────────
create or replace function public.skills_seer_add_school(p_name text, p_region text, p_curriculum text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v uuid;
begin
  if not ss_can_manage() then raise exception 'not authorized'; end if;
  insert into schools (name, region, curriculum) values (trim(p_name), p_region, p_curriculum)
  on conflict (name) do update set region = excluded.region, curriculum = excluded.curriculum
  returning id into v;
  return v;
end;
$$;

create or replace function public.skills_seer_link_teacher(p_teacher_email text, p_school uuid, p_subject text default 'cat')
returns void language plpgsql security definer set search_path = public as $$
declare v uuid;
begin
  if not ss_can_manage() then raise exception 'not authorized'; end if;
  select id into v from profiles where lower(email) = lower(trim(p_teacher_email)) and role in ('teacher', 'admin');
  if v is null then raise exception 'no approved teacher with that email'; end if;
  insert into school_teachers (school_id, teacher_id, subjects) values (p_school, v, array[p_subject])
  on conflict (school_id, teacher_id) do update
    set subjects = (select array_agg(distinct x) from unnest(school_teachers.subjects || excluded.subjects) x);
end;
$$;

create or replace function public.skills_seer_assign_lead(p_lead_email text, p_school uuid, p_subject text default 'cat', p_assign boolean default true)
returns void language plpgsql security definer set search_path = public as $$
declare v uuid;
begin
  if not ss_can_manage() then raise exception 'not authorized'; end if;
  select id into v from profiles where lower(email) = lower(trim(p_lead_email));
  if v is null then raise exception 'no account with that email'; end if;
  if p_assign then
    insert into lead_scopes (lead_id, subject, school_id, granted_by) values (v, p_subject, p_school, auth.uid())
    on conflict do nothing;
  else
    delete from lead_scopes where lead_id = v and subject = p_subject and school_id = p_school;
  end if;
end;
$$;

-- functions: signed-in users only (each checks its own permission inside)
revoke execute on function public.ss_can_manage()                                   from public, anon;
revoke execute on function public.skills_seer_lead_overview(text)                   from public, anon;
revoke execute on function public.skills_seer_decide_optout(uuid, text, boolean)    from public, anon;
revoke execute on function public.skills_seer_add_school(text, text, text)          from public, anon;
revoke execute on function public.skills_seer_link_teacher(text, uuid, text)        from public, anon;
revoke execute on function public.skills_seer_assign_lead(text, uuid, text, boolean) from public, anon;
grant execute on function public.ss_can_manage(), public.skills_seer_lead_overview(text),
  public.skills_seer_decide_optout(uuid, text, boolean), public.skills_seer_add_school(text, text, text),
  public.skills_seer_link_teacher(text, uuid, text), public.skills_seer_assign_lead(text, uuid, text, boolean) to authenticated;

-- ── the first manage_leads account (requested by the platform owner) ──
insert into public.platform_permissions (user_id, permission)
select id, 'manage_leads' from public.profiles where lower(email) = 'ruhanjvr@gmail.com'
on conflict do nothing;
