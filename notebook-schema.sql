-- ============================================================
-- THE MAGIC LAB — notebook-schema.sql
-- Study Spellbook: each learner's private notebook (docs/notebook-spec.md).
-- Run once in the Supabase SQL editor. Safe to re-run.
--
-- Notes are owner-only: nobody else (teachers and admins included) can read
-- them through the API. Writing needs the Pro or School plan (see below). Ids are made on the device (crypto.randomUUID) so a
-- learner can create dividers and pages offline and upload them later.
-- ============================================================

create table if not exists public.notebook_dividers (
  id          uuid primary key,
  owner       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name        text not null default 'Untitled' check (char_length(name) <= 80),
  colour      text not null default '#6ea8ff' check (colour ~ '^#[0-9a-fA-F]{6}$'),
  sort        double precision not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create table if not exists public.notebook_pages (
  id           uuid primary key,
  owner        uuid not null default auth.uid() references auth.users(id) on delete cascade,
  divider_id   uuid not null references public.notebook_dividers(id) on delete cascade,
  title        text not null default 'Untitled page' check (char_length(title) <= 160),
  kind         text not null default 'page' check (kind in ('page', 'whiteboard')),
  background   text not null default 'blank' check (background in ('blank', 'lined', 'grid', 'dotted')),
  sort         double precision not null default 0,
  lesson_ref   text check (char_length(lesson_ref) <= 200),
  lesson_url   text check (char_length(lesson_url) <= 500),
  lesson_title text check (char_length(lesson_title) <= 200),
  doc          jsonb not null default '{"type":"doc","content":[]}'::jsonb
               check (octet_length(doc::text) <= 2000000),          -- ~2 MB per page
  text_index   text not null default '' check (char_length(text_index) <= 200000),
  version      integer not null default 1,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz
);

create index if not exists notebook_dividers_owner_updated on public.notebook_dividers (owner, updated_at);
create index if not exists notebook_pages_owner_updated    on public.notebook_pages (owner, updated_at);
create index if not exists notebook_pages_divider          on public.notebook_pages (divider_id);

-- updated_at is always the server's clock, so "changed since my last sync" is reliable.
create or replace function public.notebook_touch() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  new.owner := old.owner;              -- a row can never change hands
  return new;
end $$;

drop trigger if exists notebook_dividers_touch on public.notebook_dividers;
create trigger notebook_dividers_touch before update on public.notebook_dividers
  for each row execute function public.notebook_touch();
drop trigger if exists notebook_pages_touch on public.notebook_pages;
create trigger notebook_pages_touch before update on public.notebook_pages
  for each row execute function public.notebook_touch();

-- ── Pro only ────────────────────────────────────────────────
-- Writing notes needs a paid plan (profiles.package 'pro' or 'school'; the
-- package column is guarded by supabase-profile-role-guard.sql, so learners
-- can't set it themselves). Reading is NOT gated: if a plan lapses, the
-- learner can still open, read and print everything they wrote.
create or replace function public.notebook_can_write() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.package in ('pro', 'school')
  );
$$;
revoke all on function public.notebook_can_write() from public, anon;
grant execute on function public.notebook_can_write() to authenticated;

-- ── Row-level security: owner only; writes need Pro ─────────
alter table public.notebook_dividers enable row level security;
alter table public.notebook_pages    enable row level security;

drop policy if exists notebook_dividers_owner  on public.notebook_dividers;
drop policy if exists notebook_dividers_read   on public.notebook_dividers;
drop policy if exists notebook_dividers_insert on public.notebook_dividers;
drop policy if exists notebook_dividers_update on public.notebook_dividers;
drop policy if exists notebook_dividers_delete on public.notebook_dividers;
create policy notebook_dividers_read on public.notebook_dividers
  for select to authenticated using (owner = auth.uid());
create policy notebook_dividers_insert on public.notebook_dividers
  for insert to authenticated with check (owner = auth.uid() and public.notebook_can_write());
create policy notebook_dividers_update on public.notebook_dividers
  for update to authenticated using (owner = auth.uid() and public.notebook_can_write())
  with check (owner = auth.uid());
create policy notebook_dividers_delete on public.notebook_dividers
  for delete to authenticated using (owner = auth.uid() and public.notebook_can_write());

drop policy if exists notebook_pages_owner  on public.notebook_pages;
drop policy if exists notebook_pages_read   on public.notebook_pages;
drop policy if exists notebook_pages_insert on public.notebook_pages;
drop policy if exists notebook_pages_update on public.notebook_pages;
drop policy if exists notebook_pages_delete on public.notebook_pages;
create policy notebook_pages_read on public.notebook_pages
  for select to authenticated using (owner = auth.uid());
create policy notebook_pages_insert on public.notebook_pages
  for insert to authenticated with check (
    owner = auth.uid() and public.notebook_can_write()
    and exists (select 1 from public.notebook_dividers d where d.id = divider_id and d.owner = auth.uid()));
create policy notebook_pages_update on public.notebook_pages
  for update to authenticated using (owner = auth.uid() and public.notebook_can_write())
  with check (
    owner = auth.uid()
    and exists (select 1 from public.notebook_dividers d where d.id = divider_id and d.owner = auth.uid()));
create policy notebook_pages_delete on public.notebook_pages
  for delete to authenticated using (owner = auth.uid() and public.notebook_can_write());

revoke all on public.notebook_dividers, public.notebook_pages from anon;
grant select, insert, update, delete on public.notebook_dividers, public.notebook_pages to authenticated;

-- ── Save one page, only if nobody saved a newer copy first ──
-- p_base is the version the device last had from the server (0 = new page).
-- Returns {"ok":true,"version":n} or {"ok":false,"conflict":true,"server":<row>}
-- so the device can keep both copies instead of losing either.
create or replace function public.notebook_save_page(p jsonb, p_base integer)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  cur public.notebook_pages;
  v   integer;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if not public.notebook_can_write() then
    return jsonb_build_object('ok', false, 'pro_required', true);
  end if;

  select * into cur from public.notebook_pages where id = (p->>'id')::uuid for update;

  if not found then
    insert into public.notebook_pages (id, divider_id, title, kind, background, sort,
        lesson_ref, lesson_url, lesson_title, doc, text_index, deleted_at, version)
    values ((p->>'id')::uuid, (p->>'divider_id')::uuid, coalesce(p->>'title', 'Untitled page'),
        coalesce(p->>'kind', 'page'), coalesce(p->>'background', 'blank'), coalesce((p->>'sort')::float8, 0),
        p->>'lesson_ref', p->>'lesson_url', p->>'lesson_title',
        coalesce(p->'doc', '{"type":"doc","content":[]}'::jsonb), coalesce(p->>'text_index', ''),
        (p->>'deleted_at')::timestamptz, 1)
    returning version into v;
    return jsonb_build_object('ok', true, 'version', v);
  end if;

  if cur.version <> p_base then
    return jsonb_build_object('ok', false, 'conflict', true, 'server', to_jsonb(cur));
  end if;

  update public.notebook_pages set
      divider_id   = (p->>'divider_id')::uuid,
      title        = coalesce(p->>'title', title),
      kind         = coalesce(p->>'kind', kind),
      background   = coalesce(p->>'background', background),
      sort         = coalesce((p->>'sort')::float8, sort),
      lesson_ref   = p->>'lesson_ref',
      lesson_url   = p->>'lesson_url',
      lesson_title = p->>'lesson_title',
      doc          = coalesce(p->'doc', doc),
      text_index   = coalesce(p->>'text_index', text_index),
      deleted_at   = (p->>'deleted_at')::timestamptz,
      version      = version + 1
    where id = cur.id
    returning version into v;
  return jsonb_build_object('ok', true, 'version', v);
end $$;

revoke all on function public.notebook_save_page(jsonb, integer) from public, anon;
grant execute on function public.notebook_save_page(jsonb, integer) to authenticated;

-- ── Empty the bin: pages and dividers deleted more than 30 days ago ──
-- Schedule daily with pg_cron if it's enabled:
--   select cron.schedule('notebook-bin', '17 2 * * *', 'select public.notebook_purge_bin()');
create or replace function public.notebook_purge_bin() returns void
language sql security definer set search_path = public as $$
  delete from public.notebook_pages    where deleted_at < now() - interval '30 days';
  delete from public.notebook_dividers where deleted_at < now() - interval '30 days';
$$;
revoke all on function public.notebook_purge_bin() from public, anon, authenticated;
