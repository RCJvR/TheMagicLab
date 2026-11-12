-- ============================================================
-- THE MAGIC LAB — Accommodations register: Microsoft sign-in
-- Run after supabase-accommodations.sql. Safe to re-run.
--
-- Adds a list of people (school email + edit/view) who may open the
-- register by signing in with their school Microsoft account. Device
-- links keep working alongside it.
--
-- A person counts as signed in with Microsoft only when their Supabase
-- account has a Microsoft ("azure") identity whose email matches the list.
-- An email/password account using the same address does NOT count, so
-- nobody can get in by signing up with a teacher's address.
--
-- Microsoft sign-in itself is switched on in the Supabase dashboard
-- (Authentication > Sign In / Providers > Azure). See the steps in
-- accommodations-microsoft-setup.md.
-- ============================================================

begin;

create table if not exists public.acc_people (
  email    text primary key check (email = lower(email) and email like '%_@_%'),
  label    text not null default '' check (char_length(label) <= 80),
  role     text not null check (role in ('editor', 'viewer')),
  added_at timestamptz not null default now(),
  last_seen timestamptz
);
alter table public.acc_people enable row level security;
revoke all on public.acc_people from anon, authenticated;

-- Who is calling? admin account, then a listed Microsoft account, then a device key.
create or replace function public._acc_role(p_key text, out role text, out label text)
language plpgsql security definer set search_path = public, extensions as $$
declare d public.acc_devices; p public.acc_people;
begin
  if auth.uid() = '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    role := 'admin'; label := 'Admin'; return;
  end if;

  if auth.uid() is not null then
    select pe.* into p
      from auth.identities i
      join public.acc_people pe on pe.email = lower(coalesce(i.identity_data->>'email', ''))
     where i.user_id = auth.uid() and i.provider = 'azure'
     limit 1;
    if p.email is not null then
      update public.acc_people set last_seen = now()
       where email = p.email and (last_seen is null or last_seen < now() - interval '10 minutes');
      role := p.role; label := coalesce(nullif(p.label, ''), p.email); return;
    end if;
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

-- Admin: the people list
create or replace function public.acc_admin_people() returns json
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  return coalesce((select json_agg(json_build_object('email', email, 'label', label, 'role', role,
     'added_at', added_at, 'last_seen', last_seen) order by lower(label), email) from public.acc_people), '[]'::json);
end $$;

create or replace function public.acc_admin_set_person(p_email text, p_label text, p_role text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  insert into public.acc_people (email, label, role)
  values (lower(btrim(p_email)), left(btrim(coalesce(p_label, '')), 80), p_role)
  on conflict (email) do update set label = excluded.label, role = excluded.role;
end $$;

create or replace function public.acc_admin_remove_person(p_email text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'acc: admin only' using errcode = '42501'; end if;
  delete from public.acc_people where email = lower(btrim(p_email));
end $$;

revoke execute on function public.acc_admin_people()                         from public, anon;
revoke execute on function public.acc_admin_set_person(text, text, text)     from public, anon;
revoke execute on function public.acc_admin_remove_person(text)              from public, anon;
grant  execute on function public.acc_admin_people()                         to authenticated;
grant  execute on function public.acc_admin_set_person(text, text, text)     to authenticated;
grant  execute on function public.acc_admin_remove_person(text)              to authenticated;

commit;
