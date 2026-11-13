-- ============================================================
-- THE MAGIC LAB — Accommodations register: "Updated on"
-- Run after supabase-accommodations.sql. Safe to re-run.
--
-- Records when the register last changed: a learner added, changed or
-- removed (from the page, or straight in the database). acc_list returns
-- it as "updated_at", shown on the page and in the PDF so teachers can see
-- whether they have the latest version.
-- ============================================================

begin;

create table if not exists public.acc_meta (
  id          boolean primary key default true check (id),   -- exactly one row
  last_change timestamptz not null default now()
);
alter table public.acc_meta enable row level security;
revoke all on public.acc_meta from anon, authenticated;
insert into public.acc_meta (id, last_change)
select true, coalesce((select max(updated_at) from public.acc_learners), now())
on conflict (id) do nothing;

create or replace function public._acc_touch() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.acc_meta set last_change = now() where id;
  return null;
end $$;
revoke execute on function public._acc_touch() from public, anon, authenticated;

drop trigger if exists acc_learners_touch on public.acc_learners;
create trigger acc_learners_touch after insert or update or delete on public.acc_learners
  for each statement execute function public._acc_touch();

-- acc_list: same as before, plus "updated_at" for the whole register.
create or replace function public.acc_list(p_key text) returns json
language plpgsql security definer set search_path = public as $$
begin
  perform public._acc_require(p_key, false);
  return json_build_object(
    'learners', coalesce((select json_agg(json_build_object(
        'id', id, 'grade', grade, 'name', name, 'class_name', class_name, 'internal', internal,
        'accommodations', accommodations,
        'comment', comment, 'updated_at', updated_at, 'updated_by', updated_by)
        order by grade, lower(name)) from public.acc_learners), '[]'::json),
    'class_lists', coalesce((select json_object_agg(grade, names) from public.acc_class_list), '{}'::json),
    'updated_at', (select last_change from public.acc_meta where id));
end $$;

commit;
