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
  for select to authenticated using (owner = (select auth.uid()));
create policy notebook_dividers_insert on public.notebook_dividers
  for insert to authenticated with check (owner = (select auth.uid()) and public.notebook_can_write());
create policy notebook_dividers_update on public.notebook_dividers
  for update to authenticated using (owner = (select auth.uid()) and public.notebook_can_write())
  with check (owner = (select auth.uid()));
create policy notebook_dividers_delete on public.notebook_dividers
  for delete to authenticated using (owner = (select auth.uid()) and public.notebook_can_write());

drop policy if exists notebook_pages_owner  on public.notebook_pages;
drop policy if exists notebook_pages_read   on public.notebook_pages;
drop policy if exists notebook_pages_insert on public.notebook_pages;
drop policy if exists notebook_pages_update on public.notebook_pages;
drop policy if exists notebook_pages_delete on public.notebook_pages;
create policy notebook_pages_read on public.notebook_pages
  for select to authenticated using (owner = (select auth.uid()));
create policy notebook_pages_insert on public.notebook_pages
  for insert to authenticated with check (
    owner = (select auth.uid()) and public.notebook_can_write()
    and exists (select 1 from public.notebook_dividers d where d.id = divider_id and d.owner = (select auth.uid())));
create policy notebook_pages_update on public.notebook_pages
  for update to authenticated using (owner = (select auth.uid()) and public.notebook_can_write())
  with check (
    owner = (select auth.uid())
    and exists (select 1 from public.notebook_dividers d where d.id = divider_id and d.owner = (select auth.uid())));
create policy notebook_pages_delete on public.notebook_pages
  for delete to authenticated using (owner = (select auth.uid()) and public.notebook_can_write());

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

-- ============================================================
-- Sharing a page with a teacher (added 2026-11-20)
-- A learner chooses to share one page with one of their classes. Every
-- teacher of that class (owner or co-teacher) can then READ that page —
-- always the current version — and comment on it; the learner can reply,
-- and can stop sharing at any time. Nothing else in the notebook is visible.
-- ============================================================

create table if not exists public.notebook_shares (
  id          uuid primary key default gen_random_uuid(),
  page_id     uuid not null references public.notebook_pages(id) on delete cascade,
  owner       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  class_id    uuid not null references public.classes(id) on delete cascade,
  created_at  timestamptz not null default now(),
  seen_at     timestamptz,                       -- when a teacher last opened it
  unique (page_id, class_id)
);
create index if not exists notebook_shares_class on public.notebook_shares (class_id);
create index if not exists notebook_shares_owner on public.notebook_shares (owner);

create table if not exists public.notebook_share_comments (
  id          uuid primary key default gen_random_uuid(),
  share_id    uuid not null references public.notebook_shares(id) on delete cascade,
  author      uuid not null default auth.uid() references auth.users(id) on delete cascade,
  body        text not null check (char_length(btrim(body)) between 1 and 2000),
  created_at  timestamptz not null default now()
);
create index if not exists notebook_share_comments_share on public.notebook_share_comments (share_id, created_at);
create index if not exists notebook_share_comments_author on public.notebook_share_comments (author);

-- Is the signed-in learner in this class?
create or replace function public.notebook_in_class(p_class uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.class_members where class_id = p_class and student_id = auth.uid());
$$;
revoke all on function public.notebook_in_class(uuid) from public, anon;
grant execute on function public.notebook_in_class(uuid) to authenticated;

-- These two read the other table with the policies switched off. Without them
-- the shares policy reads pages and the pages policy reads shares, which
-- Postgres rejects as infinite recursion.
create or replace function public.notebook_owns_page(p_page uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.notebook_pages where id = p_page and owner = auth.uid() and deleted_at is null);
$$;
revoke all on function public.notebook_owns_page(uuid) from public, anon;
grant execute on function public.notebook_owns_page(uuid) to authenticated;

create or replace function public.notebook_page_shared_with_me(p_page uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.notebook_shares s where s.page_id = p_page and public.is_class_teacher(s.class_id));
$$;
revoke all on function public.notebook_page_shared_with_me(uuid) from public, anon;
grant execute on function public.notebook_page_shared_with_me(uuid) to authenticated;

alter table public.notebook_shares         enable row level security;
alter table public.notebook_share_comments enable row level security;

drop policy if exists notebook_shares_read   on public.notebook_shares;
drop policy if exists notebook_shares_insert on public.notebook_shares;
drop policy if exists notebook_shares_delete on public.notebook_shares;
create policy notebook_shares_read on public.notebook_shares
  for select to authenticated using (owner = (select auth.uid()) or public.is_class_teacher(class_id));
create policy notebook_shares_insert on public.notebook_shares
  for insert to authenticated with check (
    owner = (select auth.uid()) and public.notebook_in_class(class_id) and public.notebook_owns_page(page_id));
create policy notebook_shares_delete on public.notebook_shares
  for delete to authenticated using (owner = (select auth.uid()));

drop policy if exists notebook_share_comments_read   on public.notebook_share_comments;
drop policy if exists notebook_share_comments_insert on public.notebook_share_comments;
drop policy if exists notebook_share_comments_delete on public.notebook_share_comments;
create policy notebook_share_comments_read on public.notebook_share_comments
  for select to authenticated using (exists (
    select 1 from public.notebook_shares s where s.id = share_id and (s.owner = (select auth.uid()) or public.is_class_teacher(s.class_id))));
create policy notebook_share_comments_insert on public.notebook_share_comments
  for insert to authenticated with check (author = (select auth.uid()) and exists (
    select 1 from public.notebook_shares s where s.id = share_id and (s.owner = (select auth.uid()) or public.is_class_teacher(s.class_id))));
create policy notebook_share_comments_delete on public.notebook_share_comments
  for delete to authenticated using (author = (select auth.uid()));

-- Teachers can read a page while it is shared with one of their classes.
drop policy if exists notebook_pages_shared_read on public.notebook_pages;
create policy notebook_pages_shared_read on public.notebook_pages
  for select to authenticated using (deleted_at is null and public.notebook_page_shared_with_me(id));

revoke all on public.notebook_shares, public.notebook_share_comments from anon;
grant select, insert, delete on public.notebook_shares to authenticated;
grant select, insert, delete on public.notebook_share_comments to authenticated;

-- The learner's classes, for the "Share with my teacher" menu.
create or replace function public.notebook_my_classes()
returns table (class_id uuid, name text, grade integer)
language sql stable security definer set search_path = public as $$
  select c.id, c.name, c.grade from public.class_members m join public.classes c on c.id = m.class_id
  where m.student_id = auth.uid() and coalesce(c.active, true) order by c.name;
$$;
revoke all on function public.notebook_my_classes() from public, anon;
grant execute on function public.notebook_my_classes() to authenticated;

-- Everything shared with the signed-in teacher's classes, newest activity first.
-- "unseen" = never opened, or the page or a learner reply changed since.
create or replace function public.notebook_shared_with_me()
returns table (share_id uuid, page_id uuid, class_id uuid, class_name text, learner_name text,
               page_title text, lesson_title text, shared_at timestamptz, page_updated_at timestamptz,
               seen_at timestamptz, comment_count bigint, unseen boolean)
language sql stable security definer set search_path = public as $$
  select s.id, p.id, c.id, c.name,
         coalesce(nullif(pr.display_name, ''), split_part(pr.email, '@', 1), 'Learner'),
         p.title, p.lesson_title, s.created_at, p.updated_at, s.seen_at,
         (select count(*) from public.notebook_share_comments k where k.share_id = s.id),
         s.seen_at is null or p.updated_at > s.seen_at
           or exists (select 1 from public.notebook_share_comments k where k.share_id = s.id and k.author = s.owner and k.created_at > s.seen_at)
  from public.notebook_shares s
  join public.notebook_pages p on p.id = s.page_id and p.deleted_at is null
  join public.classes c on c.id = s.class_id
  left join public.profiles pr on pr.id = s.owner
  where public.is_class_teacher(s.class_id)
  order by greatest(p.updated_at, s.created_at) desc;
$$;
revoke all on function public.notebook_shared_with_me() from public, anon;
grant execute on function public.notebook_shared_with_me() to authenticated;

-- A teacher opened a shared page.
create or replace function public.notebook_mark_share_seen(p_share uuid) returns void
language sql security definer set search_path = public as $$
  update public.notebook_shares set seen_at = now() where id = p_share and public.is_class_teacher(class_id);
$$;
revoke all on function public.notebook_mark_share_seen(uuid) from public, anon;
grant execute on function public.notebook_mark_share_seen(uuid) to authenticated;
