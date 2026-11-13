-- ============================================================
-- THE MAGIC LAB — Exam and test cover pages (covers.html)
-- Run after supabase-accommodations.sql. Safe to re-run.
--
-- Stores, per term, what the cover tool needs:
--   acc_roster    every learner: student number, name, grade, guardian class
--   acc_groups    every subject key class (Learners Per Key export) and its members
--   acc_sessions  exam sessions read from the invigilation timetable, with the
--                 classes / keys writing each paper, their venues and times
-- and links each accommodations-register learner to a student number.
--
-- Access is the same as the register: device links (viewer or editor) and the
-- admin account. The tables have RLS on and no policies; everything goes
-- through the functions below. Teachers' devices receive class sizes, student
-- numbers and the register learners' accommodations — never the names of the
-- other learners. Only the admin import writes these tables.
-- ============================================================

begin;

create table if not exists public.acc_roster (
  sno   text primary key,
  first text not null,
  last  text not null,
  grade text not null,
  cls   text not null
);
create table if not exists public.acc_groups (
  id      text primary key,
  grade   text not null,
  subject text not null,
  codes   text[] not null default '{}',
  key     text not null,
  kclass  text not null,
  staff   text not null default '',
  members text[] not null default '{}'
);
create table if not exists public.acc_sessions (
  id           text primary key,
  exam_date    date not null,
  session      text not null check (session in ('AM', 'PM')),
  grade        text not null,
  code         text not null,
  paper        text not null default '',
  subject      text not null default '',
  duration     numeric,
  start_time   text not null default '',
  end_time     text not null default '',
  time_guessed boolean not null default false,
  units        jsonb not null default '[]'
);
alter table public.acc_learners add column if not exists sno text;

create table if not exists public.acc_covers_meta (
  id          boolean primary key default true check (id),
  imported_at timestamptz,
  sources     jsonb not null default '{}'
);
insert into public.acc_covers_meta (id) values (true) on conflict (id) do nothing;

alter table public.acc_roster      enable row level security;
alter table public.acc_groups      enable row level security;
alter table public.acc_sessions    enable row level security;
alter table public.acc_covers_meta enable row level security;
revoke all on public.acc_roster, public.acc_groups, public.acc_sessions, public.acc_covers_meta from anon, authenticated;

-- Everything the cover tool needs, for any valid link (viewer or editor) or the admin.
create or replace function public.acc_covers_data(p_key text) returns json
language plpgsql security definer set search_path = public as $$
begin
  perform public._acc_require(p_key, false);
  return json_build_object(
    'meta', (select row_to_json(m) from public.acc_covers_meta m where id),
    -- learners: student number -> guardian class (no names)
    'classes', coalesce((select json_object_agg(sno, cls) from public.acc_roster), '{}'::json),
    'groups', coalesce((select json_agg(json_build_object('id', id, 'grade', grade, 'subject', subject, 'codes', codes,
                 'key', key, 'kclass', kclass, 'staff', staff, 'members', members) order by grade, subject, key, kclass)
               from public.acc_groups), '[]'::json),
    'sessions', coalesce((select json_agg(json_build_object('id', id, 'date', exam_date, 'session', session, 'grade', grade,
                 'code', code, 'paper', paper, 'subject', subject, 'duration', duration, 'start', start_time, 'end', end_time,
                 'timeGuessed', time_guessed, 'units', units) order by exam_date, session, grade::int, code)
               from public.acc_sessions), '[]'::json),
    'learners', coalesce((select json_agg(json_build_object('id', id, 'sno', sno, 'grade', grade, 'name', name,
                 'class_name', class_name, 'internal', internal, 'accommodations', accommodations, 'comment', comment)
                 order by grade, name) from public.acc_learners), '[]'::json));
end $$;

-- Admin: replace the term's data in one go (from the importer in covers.html).
create or replace function public.acc_admin_covers_import(p_roster jsonb, p_groups jsonb, p_sessions jsonb, p_sources jsonb)
returns json language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  if p_roster is not null then
    delete from public.acc_roster;
    insert into public.acc_roster (sno, first, last, grade, cls)
    select r->>'sno', r->>'first', r->>'last', r->>'grade', r->>'cls' from jsonb_array_elements(p_roster) r
    on conflict (sno) do nothing;
  end if;
  if p_groups is not null then
    delete from public.acc_groups;
    insert into public.acc_groups (id, grade, subject, codes, key, kclass, staff, members)
    select g->>'id', g->>'grade', g->>'subject',
           array(select jsonb_array_elements_text(g->'codes')), g->>'key', g->>'kclass', coalesce(g->>'staff', ''),
           array(select jsonb_array_elements_text(g->'members'))
      from jsonb_array_elements(p_groups) g
    on conflict (id) do nothing;
  end if;
  if p_sessions is not null then
    delete from public.acc_sessions;
    insert into public.acc_sessions (id, exam_date, session, grade, code, paper, subject, duration, start_time, end_time, time_guessed, units)
    select s->>'id', (s->>'date')::date, s->>'session', s->>'grade', s->>'code', coalesce(s->>'paper', ''), coalesce(s->>'subject', ''),
           nullif(s->>'duration', '')::numeric, coalesce(s->>'start', ''), coalesce(s->>'end', ''), coalesce((s->>'timeGuessed')::boolean, false),
           coalesce(s->'units', '[]'::jsonb)
      from jsonb_array_elements(p_sessions) s
    on conflict (id) do nothing;
  end if;
  update public.acc_covers_meta set imported_at = now(), sources = coalesce(p_sources, '{}'::jsonb) where id;
  return json_build_object('roster', (select count(*) from public.acc_roster), 'groups', (select count(*) from public.acc_groups),
                           'sessions', (select count(*) from public.acc_sessions));
end $$;

-- Admin: the full learner list, for matching register learners to student numbers.
create or replace function public.acc_admin_roster() returns json
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  return coalesce((select json_agg(json_build_object('sno', sno, 'first', first, 'last', last, 'grade', grade, 'cls', cls)
                   order by grade, cls, last, first) from public.acc_roster), '[]'::json);
end $$;

-- Admin: link register learners to student numbers: [{ "id": uuid, "sno": text|null }]
create or replace function public.acc_admin_link_learners(p_links jsonb) returns int
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  update public.acc_learners l set sno = nullif(x->>'sno', '')
    from jsonb_array_elements(p_links) x where l.id = (x->>'id')::uuid;
  get diagnostics n = row_count;
  return n;
end $$;

revoke execute on function public.acc_covers_data(text) from public;
grant  execute on function public.acc_covers_data(text) to anon, authenticated;
revoke execute on function public.acc_admin_covers_import(jsonb, jsonb, jsonb, jsonb) from public, anon;
revoke execute on function public.acc_admin_roster()                                   from public, anon;
revoke execute on function public.acc_admin_link_learners(jsonb)                      from public, anon;
grant  execute on function public.acc_admin_covers_import(jsonb, jsonb, jsonb, jsonb) to authenticated;
grant  execute on function public.acc_admin_roster()                                   to authenticated;
grant  execute on function public.acc_admin_link_learners(jsonb)                      to authenticated;

commit;
