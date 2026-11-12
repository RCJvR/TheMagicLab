-- ============================================================
-- THE MAGIC LAB — Accommodations register (accommodations.html)
-- Run once in the Supabase SQL editor. Safe to re-run.
--
-- What it stores: per learner, the grade, class, name, whether the
-- accommodations were internally granted, a list of
-- accommodations (extra time, reader, ...) and one general comment.
-- Plus a class list per grade, so names can be picked instead of typed.
--
-- ACCESS MODEL — no logins for teachers:
--
-- The site admin (signed in as the hard-coded admin account, the same
-- UUID as the other admin_* functions) creates a "device link" per
-- teacher in accommodations.html. Each link carries a long random key
-- (32 random bytes). The page keeps the key in that browser, so after the
-- link is opened once the teacher just opens accommodations.html on that
-- device. Only a SHA-256 hash of each key is stored here, never the key.
--
--   editor  — the accommodations teacher: add, change and remove learners,
--             accommodations, comments and class lists.
--   viewer  — teachers who teach the learners or pack test packs: read and
--             print only.
--
-- The tables have RLS switched on and NO policies, so nothing can read or
-- write them directly through the API. Every read and write goes through
-- the functions below, which first check the key (or the admin account).
-- These functions are deliberately executable by anon (no login): the key
-- is what protects them. Revoking a link stops it straight away.
-- ============================================================

begin;

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.acc_devices (
  id         uuid primary key default gen_random_uuid(),
  label      text not null check (char_length(label) between 1 and 80),
  role       text not null check (role in ('editor', 'viewer')),
  key_hash   text not null unique,
  created_at timestamptz not null default now(),
  last_seen  timestamptz,
  revoked_at timestamptz
);

create table if not exists public.acc_learners (
  id             uuid primary key default gen_random_uuid(),
  grade          text not null check (char_length(grade) between 1 and 4),
  name           text not null check (char_length(name) between 1 and 120),
  class_name     text not null default '' check (char_length(class_name) <= 12),
  internal       boolean not null default false,   -- "Internally granted"
  accommodations text[] not null default '{}',
  comment        text not null default '' check (char_length(comment) <= 2000),
  updated_at     timestamptz not null default now(),
  updated_by     text
);
create index if not exists acc_learners_grade_idx on public.acc_learners (grade, name);

create table if not exists public.acc_class_list (
  grade text primary key check (char_length(grade) between 1 and 4),
  names text[] not null default '{}'
);

alter table public.acc_devices    enable row level security;
alter table public.acc_learners   enable row level security;
alter table public.acc_class_list enable row level security;
revoke all on public.acc_devices, public.acc_learners, public.acc_class_list from anon, authenticated;

-- ── Internal: who is calling? Returns 'admin', 'editor', 'viewer' or null ──
create or replace function public._acc_role(p_key text, out role text, out label text)
language plpgsql security definer set search_path = public, extensions as $$
declare d public.acc_devices;
begin
  if auth.uid() = '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    role := 'admin'; label := 'Admin'; return;
  end if;
  if p_key is null or char_length(p_key) < 32 then return; end if;
  select * into d from public.acc_devices
   where key_hash = encode(extensions.digest(p_key, 'sha256'), 'hex') and revoked_at is null;
  if d.id is null then return; end if;
  update public.acc_devices set last_seen = now()
   where id = d.id and (last_seen is null or last_seen < now() - interval '10 minutes');
  role := d.role; label := d.label;
end $$;
revoke execute on function public._acc_role(text) from public, anon, authenticated;

create or replace function public._acc_require(p_key text, p_edit boolean) returns text
language plpgsql security definer set search_path = public as $$
declare r record;
begin
  select * into r from public._acc_role(p_key);
  if r.role is null then raise exception 'acc: no access' using errcode = '42501'; end if;
  if p_edit and r.role = 'viewer' then raise exception 'acc: view only' using errcode = '42501'; end if;
  return r.label;
end $$;
revoke execute on function public._acc_require(text, boolean) from public, anon, authenticated;

-- ── Page calls ──────────────────────────────────────────────

-- Who am I? { role, label } or { role: null } for an unknown/revoked key.
create or replace function public.acc_whoami(p_key text) returns json
language plpgsql security definer set search_path = public as $$
declare r record;
begin
  select * into r from public._acc_role(p_key);
  return json_build_object('role', r.role, 'label', r.label);
end $$;

-- Everything the page needs: learners and class lists.
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
    'class_lists', coalesce((select json_object_agg(grade, names) from public.acc_class_list), '{}'::json));
end $$;

-- Add (p_id null) or update a learner. Returns the saved row.
create or replace function public.acc_save_learner(p_key text, p_id uuid, p_grade text, p_name text,
                                                   p_class text, p_internal boolean,
                                                   p_accommodations text[], p_comment text) returns json
language plpgsql security definer set search_path = public as $$
declare who text; rec public.acc_learners; clean text[];
begin
  who := public._acc_require(p_key, true);
  p_name := btrim(coalesce(p_name, ''));
  if p_name = '' then raise exception 'acc: name required'; end if;
  -- trimmed, without blanks or repeats, in the order the teacher chose them
  select coalesce(array_agg(x order by first), '{}') into clean from (
    select left(btrim(a), 80) x, min(i) first
      from unnest(coalesce(p_accommodations, '{}')) with ordinality as t(a, i)
     where btrim(a) <> '' group by 1) s;
  p_class := upper(left(btrim(coalesce(p_class, '')), 12));
  if cardinality(clean) > 30 then raise exception 'acc: too many accommodations'; end if;
  if p_id is null then
    insert into public.acc_learners (grade, name, class_name, internal, accommodations, comment, updated_by)
    values (p_grade, left(p_name, 120), p_class, coalesce(p_internal, false), clean, left(coalesce(p_comment, ''), 2000), who)
    returning * into rec;
  else
    update public.acc_learners
       set grade = p_grade, name = left(p_name, 120), class_name = p_class, internal = coalesce(p_internal, false),
           accommodations = clean,
           comment = left(coalesce(p_comment, ''), 2000), updated_at = now(), updated_by = who
     where id = p_id returning * into rec;
    if rec.id is null then raise exception 'acc: learner not found'; end if;
  end if;
  return row_to_json(rec);
end $$;

create or replace function public.acc_delete_learner(p_key text, p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public._acc_require(p_key, true);
  delete from public.acc_learners where id = p_id;
end $$;

-- Replace one grade's class list.
create or replace function public.acc_set_class_list(p_key text, p_grade text, p_names text[]) returns void
language plpgsql security definer set search_path = public as $$
declare clean text[];
begin
  perform public._acc_require(p_key, true);
  select coalesce(array_agg(distinct left(btrim(n), 120)) filter (where btrim(n) <> ''), '{}')
    into clean from unnest(coalesce(p_names, '{}')) n;
  if cardinality(clean) > 600 then raise exception 'acc: class list too long'; end if;
  insert into public.acc_class_list (grade, names) values (p_grade, clean)
  on conflict (grade) do update set names = excluded.names;
end $$;

-- ── Admin: device links (signed-in admin only) ──────────────

create or replace function public.acc_admin_devices() returns json
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  return coalesce((select json_agg(json_build_object('id', id, 'label', label, 'role', role,
     'created_at', created_at, 'last_seen', last_seen, 'revoked_at', revoked_at) order by revoked_at nulls first, created_at desc)
     from public.acc_devices), '[]'::json);
end $$;

-- Creates a device link and returns its key ONCE. Only the hash is kept.
create or replace function public.acc_admin_create_device(p_label text, p_role text) returns json
language plpgsql security definer set search_path = public, extensions as $$
declare k text; d public.acc_devices;
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  k := translate(encode(extensions.gen_random_bytes(32), 'base64'), '+/=', '-_');
  insert into public.acc_devices (label, role, key_hash)
  values (left(btrim(p_label), 80), p_role, encode(extensions.digest(k, 'sha256'), 'hex'))
  returning * into d;
  return json_build_object('id', d.id, 'key', k);
end $$;

create or replace function public.acc_admin_revoke_device(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  update public.acc_devices set revoked_at = now() where id = p_id and revoked_at is null;
end $$;

-- Grants: page calls work without a login (the key protects them).
revoke execute on function public.acc_whoami(text)                                        from public;
revoke execute on function public.acc_list(text)                                          from public;
revoke execute on function public.acc_save_learner(text, uuid, text, text, text, boolean, text[], text) from public;
revoke execute on function public.acc_delete_learner(text, uuid)                          from public;
revoke execute on function public.acc_set_class_list(text, text, text[])                  from public;
grant  execute on function public.acc_whoami(text)                                        to anon, authenticated;
grant  execute on function public.acc_list(text)                                          to anon, authenticated;
grant  execute on function public.acc_save_learner(text, uuid, text, text, text, boolean, text[], text) to anon, authenticated;
grant  execute on function public.acc_delete_learner(text, uuid)                          to anon, authenticated;
grant  execute on function public.acc_set_class_list(text, text, text[])                  to anon, authenticated;

revoke execute on function public.acc_admin_devices()                  from public, anon;
revoke execute on function public.acc_admin_create_device(text, text)  from public, anon;
revoke execute on function public.acc_admin_revoke_device(uuid)        from public, anon;
grant  execute on function public.acc_admin_devices()                  to authenticated;
grant  execute on function public.acc_admin_create_device(text, text)  to authenticated;
grant  execute on function public.acc_admin_revoke_device(uuid)        to authenticated;

commit;
