-- ============================================================
-- THE MAGIC LAB — Test Tome: share a results session with another teacher
-- Run after supabase-test-tome-results.sql.
--
-- The teacher who started a session can share it, by email, with up to 10
-- other teachers. A teacher it is shared with sees the session and its
-- results in their own Class results, read-only: they cannot close, reopen
-- or delete it, and cannot share it on. The owner can stop sharing at any
-- time, and a shared teacher can remove it from their own list.
--
-- Security notes
--  • Nothing here is reachable by anon. Every function is revoked from
--    public and anon, and granted to authenticated only.
--  • The two helper functions are SECURITY DEFINER so the row policies can
--    look at the shares table without the policies calling each other
--    (which would be infinite recursion). They only return true or false.
--  • Sharing only reaches an existing TEACHER account, and the owner must
--    type its exact email. Update and delete on sessions and delete on
--    results stay owner-only.
-- ============================================================

create table if not exists public.tome_session_shares (
  session_id  uuid not null references public.tome_sessions(id) on delete cascade,
  teacher_id  uuid not null references public.profiles(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (session_id, teacher_id)
);
create index if not exists idx_tome_shares_teacher on public.tome_session_shares(teacher_id);
alter table public.tome_session_shares enable row level security;

-- Is this session shared with me? Can I view it (mine, or shared with me)?
create or replace function public.tome_is_shared_with_me(p_session uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from tome_session_shares where session_id = p_session and teacher_id = (select auth.uid()));
$$;
create or replace function public.tome_can_view(p_session uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from tome_sessions where id = p_session and teacher_id = (select auth.uid()))
      or exists (select 1 from tome_session_shares where session_id = p_session and teacher_id = (select auth.uid()));
$$;
revoke execute on function public.tome_is_shared_with_me(uuid) from public, anon;
revoke execute on function public.tome_can_view(uuid) from public, anon;
grant execute on function public.tome_is_shared_with_me(uuid) to authenticated;
grant execute on function public.tome_can_view(uuid) to authenticated;

-- Viewing: the owner, or a teacher it is shared with
drop policy if exists tome_sessions_owner_select on public.tome_sessions;
drop policy if exists tome_sessions_select on public.tome_sessions;
create policy tome_sessions_select on public.tome_sessions for select to authenticated
  using (teacher_id = (select auth.uid()) or public.tome_is_shared_with_me(id));

drop policy if exists tome_results_owner_select on public.tome_results;
drop policy if exists tome_results_select on public.tome_results;
create policy tome_results_select on public.tome_results for select to authenticated
  using (public.tome_can_view(session_id));

-- The share rows: the owner and the shared teacher can see and delete them
-- (the owner to stop sharing, the teacher to leave). There is no insert
-- policy: a share is only made by share_tome_session().
drop policy if exists tome_shares_select on public.tome_session_shares;
drop policy if exists tome_shares_delete on public.tome_session_shares;
create policy tome_shares_select on public.tome_session_shares for select to authenticated
  using (teacher_id = (select auth.uid())
         or exists (select 1 from public.tome_sessions s where s.id = session_id and s.teacher_id = (select auth.uid())));
create policy tome_shares_delete on public.tome_session_shares for delete to authenticated
  using (teacher_id = (select auth.uid())
         or exists (select 1 from public.tome_sessions s where s.id = session_id and s.teacher_id = (select auth.uid())));
revoke all on public.tome_session_shares from anon, authenticated;
grant select, delete on public.tome_session_shares to authenticated;

-- Share a session with a teacher, by the email on their account.
create or replace function public.share_tome_session(p_session uuid, p_email text)
returns table (r_teacher uuid, r_name text, r_email text)
language plpgsql security definer set search_path = public as $$
declare t profiles;
begin
  if auth.uid() is null or not exists (select 1 from tome_sessions where id = p_session and teacher_id = auth.uid()) then
    raise exception 'Only the teacher who started this session can share it';
  end if;
  select * into t from profiles where lower(profiles.email) = lower(trim(coalesce(p_email, ''))) and profiles.role = 'teacher';
  if not found then raise exception 'No teacher account was found for that email'; end if;
  if t.id = auth.uid() then raise exception 'That is your own account'; end if;
  if (select count(*) from tome_session_shares where session_id = p_session) >= 10 then
    raise exception 'A session can be shared with up to 10 teachers';
  end if;
  insert into tome_session_shares (session_id, teacher_id) values (p_session, t.id) on conflict do nothing;
  return query select t.id, coalesce(t.display_name, t.email), t.email;
end $$;
revoke execute on function public.share_tome_session(uuid, text) from public, anon;
grant execute on function public.share_tome_session(uuid, text) to authenticated;

-- Who a session is shared with (for its owner).
create or replace function public.tome_session_shares_of(p_session uuid)
returns table (r_teacher uuid, r_name text, r_email text)
language sql security definer stable set search_path = public as $$
  select h.teacher_id, coalesce(p.display_name, p.email), p.email
  from tome_session_shares h join profiles p on p.id = h.teacher_id
  where h.session_id = p_session
    and exists (select 1 from tome_sessions s where s.id = p_session and s.teacher_id = (select auth.uid()))
  order by h.created_at;
$$;
revoke execute on function public.tome_session_shares_of(uuid) from public, anon;
grant execute on function public.tome_session_shares_of(uuid) to authenticated;

-- The owners of the sessions shared with me, for "Shared with you by ...".
create or replace function public.tome_session_owners()
returns table (r_session uuid, r_name text)
language sql security definer stable set search_path = public as $$
  select s.id, coalesce(p.display_name, p.email)
  from tome_session_shares h
  join tome_sessions s on s.id = h.session_id
  join profiles p on p.id = s.teacher_id
  where h.teacher_id = (select auth.uid());
$$;
revoke execute on function public.tome_session_owners() from public, anon;
grant execute on function public.tome_session_owners() to authenticated;
