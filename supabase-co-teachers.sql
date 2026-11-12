-- ============================================================
-- THE MAGIC LAB — Co-teachers (Grading Grimoire phase 0, spec §6.7)
-- A class keeps one OWNER (classes.teacher_id). The owner can add up to five
-- co-teachers with a one-time invite code. A co-teacher can do everything in
-- the class (see learners and results, set assignments, mark, remove a learner)
-- except manage the teacher list; the class row itself stays owner-only to
-- change. Help-chat threads stay between a learner and the class owner.
--
-- HOW TO RUN: Supabase SQL editor → paste → Run. Safe to re-run.
-- Live definitions this replaces were read from the database on 2026-11-12:
--   is_class_teacher / teacher_has_student checked classes.teacher_id only;
--   progress_events_teacher_read and "Class teacher manages their class
--   timetable" joined classes.teacher_id directly.
-- ============================================================

-- ── Tables ──────────────────────────────────────────────────
create table if not exists public.class_teachers (
  class_id    uuid not null references public.classes(id) on delete cascade,
  teacher_id  uuid not null references public.profiles(id) on delete cascade,
  added_by    uuid references public.profiles(id) on delete set null,
  added_at    timestamptz not null default now(),
  primary key (class_id, teacher_id)
);
create index if not exists class_teachers_teacher_idx on public.class_teachers (teacher_id);

create table if not exists public.class_teacher_invites (
  code        text primary key check (code ~ '^[A-HJ-NP-Z2-9]{8}$'),
  class_id    uuid not null references public.classes(id) on delete cascade,
  created_by  uuid not null references public.profiles(id) on delete cascade,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null default now() + interval '7 days',
  used_by     uuid references public.profiles(id) on delete set null,
  used_at     timestamptz
);
create index if not exists class_teacher_invites_class_idx on public.class_teacher_invites (class_id);

alter table public.class_teachers enable row level security;
alter table public.class_teacher_invites enable row level security;
revoke all on public.class_teachers, public.class_teacher_invites from anon;
revoke all on public.class_teachers, public.class_teacher_invites from authenticated;
grant select, delete on public.class_teachers to authenticated;          -- adding only via accept_co_teacher_invite()
grant select, delete on public.class_teacher_invites to authenticated;   -- creating only via create_co_teacher_invite()

-- ── Helpers ─────────────────────────────────────────────────
create or replace function public.is_class_owner(p_class_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from classes where id = p_class_id and teacher_id = (select auth.uid()));
$$;

-- Widened to owner OR co-teacher. Same names and argument names as before, so
-- every policy and function that already uses them is unchanged.
create or replace function public.is_class_teacher(p_class_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from classes where id = p_class_id and teacher_id = (select auth.uid()))
      or exists (select 1 from class_teachers where class_id = p_class_id and teacher_id = (select auth.uid()));
$$;

create or replace function public.teacher_has_student(p_student_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from class_members cm join classes c on c.id = cm.class_id
    where cm.student_id = p_student_id
      and (c.teacher_id = (select auth.uid())
           or exists (select 1 from class_teachers t where t.class_id = c.id and t.teacher_id = (select auth.uid()))));
$$;

revoke execute on function public.is_class_owner(uuid), public.is_class_teacher(uuid), public.teacher_has_student(uuid) from public, anon;
grant execute on function public.is_class_owner(uuid), public.is_class_teacher(uuid), public.teacher_has_student(uuid) to authenticated;

-- ── Policies on the new tables ──────────────────────────────
drop policy if exists class_teachers_read on public.class_teachers;
create policy class_teachers_read on public.class_teachers for select to authenticated
  using (teacher_id = (select auth.uid()) or public.is_class_teacher(class_id));
drop policy if exists class_teachers_remove on public.class_teachers;
create policy class_teachers_remove on public.class_teachers for delete to authenticated
  using (public.is_class_owner(class_id) or teacher_id = (select auth.uid()));   -- owner removes, or a co-teacher leaves

drop policy if exists class_teacher_invites_owner_read on public.class_teacher_invites;
create policy class_teacher_invites_owner_read on public.class_teacher_invites for select to authenticated
  using (public.is_class_owner(class_id));
drop policy if exists class_teacher_invites_owner_delete on public.class_teacher_invites;
create policy class_teacher_invites_owner_delete on public.class_teacher_invites for delete to authenticated
  using (public.is_class_owner(class_id));

-- ── Existing policies that tested classes.teacher_id directly ──
-- classes: the two owner policies stay as they are (owner alone may change the
-- class). Co-teachers get read access.
drop policy if exists classes_co_teacher_read on public.classes;
create policy classes_co_teacher_read on public.classes for select to authenticated
  using (exists (select 1 from public.class_teachers t
                 where t.class_id = classes.id and t.teacher_id = (select auth.uid())));

-- assignments: any teacher of the class manages its assignments.
alter policy "Teachers manage own assignments" on public.assignments
  using (public.is_class_teacher(class_id))
  with check (public.is_class_teacher(class_id));

-- progress_events: same meaning as before (own rows, or a learner you teach).
alter policy progress_events_teacher_read on public.progress_events
  using ((select auth.uid()) = user_id or public.teacher_has_student(user_id));

-- class timetables: any teacher of the class.
alter policy "Class teacher manages their class timetable" on public.class_timetables
  using (public.is_class_teacher(class_id))
  with check (public.is_class_teacher(class_id));

-- ── RPCs ────────────────────────────────────────────────────
-- Owner creates a single-use code, valid 7 days. Codes avoid 0/O and 1/I.
create or replace function public.create_co_teacher_invite(p_class uuid)
returns text language plpgsql security definer set search_path = public as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  c text;
begin
  if not is_class_owner(p_class) then raise exception 'Only the class owner can invite a co-teacher'; end if;
  if (select count(*) from class_teachers where class_id = p_class) >= 5 then
    raise exception 'A class can have at most 5 co-teachers';
  end if;
  -- at most 10 unused codes per class at a time
  delete from class_teacher_invites where class_id = p_class and (expires_at < now() or used_by is not null);
  if (select count(*) from class_teacher_invites where class_id = p_class) >= 10 then
    raise exception 'Too many open invites for this class; delete some first';
  end if;
  loop
    c := (select string_agg(substr(alphabet, 1 + floor(random() * 32)::int, 1), '') from generate_series(1, 8));
    exit when not exists (select 1 from class_teacher_invites where code = c);
  end loop;
  insert into class_teacher_invites (code, class_id, created_by) values (c, p_class, auth.uid());
  return c;
end $$;

-- A teacher types the code; returns the class id.
create or replace function public.accept_co_teacher_invite(p_code text)
returns uuid language plpgsql security definer set search_path = public as $$
declare inv class_teacher_invites;
begin
  if not exists (select 1 from profiles where id = auth.uid() and role = 'teacher') then
    raise exception 'Only teacher accounts can co-teach a class';
  end if;
  select * into inv from class_teacher_invites
   where code = upper(regexp_replace(coalesce(p_code, ''), '\s', '', 'g'))
     and used_by is null and expires_at > now()
   for update;
  if inv.code is null then raise exception 'That code is not valid or has expired'; end if;
  if exists (select 1 from classes where id = inv.class_id and teacher_id = auth.uid()) then
    raise exception 'You already own this class';
  end if;
  if (select count(*) from class_teachers where class_id = inv.class_id) >= 5 then
    raise exception 'This class already has 5 co-teachers';
  end if;
  insert into class_teachers (class_id, teacher_id, added_by) values (inv.class_id, auth.uid(), inv.created_by)
  on conflict do nothing;
  update class_teacher_invites set used_by = auth.uid(), used_at = now() where code = inv.code;
  return inv.class_id;
end $$;

-- The teachers of a class with their names, for that class's teachers only.
-- (Teachers cannot read each other's profiles directly.)
create or replace function public.get_class_teachers(p_class uuid)
returns table (teacher_id uuid, display_name text, is_owner boolean, added_at timestamptz)
language sql stable security definer set search_path = public as $$
  select c.teacher_id, p.display_name, true, c.created_at
  from classes c join profiles p on p.id = c.teacher_id
  where c.id = p_class and is_class_teacher(p_class)
  union all
  select t.teacher_id, p.display_name, false, t.added_at
  from class_teachers t join profiles p on p.id = t.teacher_id
  where t.class_id = p_class and is_class_teacher(p_class)
  order by 3 desc, 4;
$$;

revoke execute on function public.create_co_teacher_invite(uuid), public.accept_co_teacher_invite(text),
  public.get_class_teachers(uuid) from public, anon;
grant execute on function public.create_co_teacher_invite(uuid), public.accept_co_teacher_invite(text),
  public.get_class_teachers(uuid) to authenticated;
