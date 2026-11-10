-- ============================================================
-- THE MAGIC LAB — teacher verification chat
-- Lets the admin message someone who asked for a teacher account, to ask
-- for proof, and lets that person reply while their request is pending.
--
-- Security notes
--  • One row per message, always about one applicant (user_id).
--  • An applicant can only read their own conversation (RLS select) and can
--    only write through verify_send(), which refuses unless their
--    teacher_request is 'pending'. Nobody can insert, update or delete
--    directly: there are no write policies and no write grants.
--  • The admin functions use the same hardcoded admin id as
--    admin_list_teacher_requests (supabase-profile-role-guard.sql).
--  • Nothing is reachable by anon.
-- ============================================================

create table if not exists public.verify_messages (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  sender_id   uuid not null references public.profiles(id) on delete cascade,
  body        text not null check (char_length(body) between 1 and 2000),
  created_at  timestamptz not null default now(),
  read_at     timestamptz
);
create index if not exists idx_verify_messages_user on public.verify_messages(user_id, created_at);
alter table public.verify_messages enable row level security;

drop policy if exists verify_messages_own_select on public.verify_messages;
create policy verify_messages_own_select on public.verify_messages for select to authenticated
  using (user_id = (select auth.uid()));
revoke all on public.verify_messages from anon, authenticated;
grant select on public.verify_messages to authenticated;

-- Applicant: send a message (only while the request is pending)
create or replace function public.verify_send(p_body text)
returns void language plpgsql security definer set search_path = public as $$
declare b text := trim(coalesce(p_body, ''));
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if not exists (select 1 from profiles where id = auth.uid() and teacher_request = 'pending') then
    raise exception 'There is no pending teacher request on this account';
  end if;
  if char_length(b) = 0 or char_length(b) > 2000 then raise exception 'A message must be 1 to 2000 characters'; end if;
  if (select count(*) from verify_messages where user_id = auth.uid() and sender_id = auth.uid()) >= 40 then
    raise exception 'Message limit reached. Please wait for a reply.';
  end if;
  insert into verify_messages (user_id, sender_id, body) values (auth.uid(), auth.uid(), b);
end $$;

-- Applicant: mark the admin's messages as read
create or replace function public.verify_mark_read()
returns void language sql security definer set search_path = public as $$
  update verify_messages set read_at = now()
  where user_id = (select auth.uid()) and sender_id <> (select auth.uid()) and read_at is null;
$$;

-- Admin: one row per applicant who has a conversation
create or replace function public.admin_verify_summary()
returns table (r_user uuid, r_last timestamptz, r_from_applicant_unread bigint, r_last_from_applicant boolean)
language plpgsql security definer stable set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then raise exception 'not authorized'; end if;
  return query
    select m.user_id, max(m.created_at),
           count(*) filter (where m.sender_id = m.user_id and m.read_at is null),
           (array_agg(m.sender_id = m.user_id order by m.created_at desc))[1]
    from verify_messages m group by m.user_id;
end $$;

-- Admin: read a conversation (marks the applicant's messages as read)
create or replace function public.admin_verify_thread(p_user uuid)
returns setof public.verify_messages language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then raise exception 'not authorized'; end if;
  update verify_messages set read_at = now() where user_id = p_user and sender_id = user_id and read_at is null;
  return query select * from verify_messages where user_id = p_user order by created_at;
end $$;

-- Admin: send a message to an applicant
create or replace function public.admin_verify_send(p_user uuid, p_body text)
returns void language plpgsql security definer set search_path = public as $$
declare b text := trim(coalesce(p_body, ''));
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then raise exception 'not authorized'; end if;
  if not exists (select 1 from profiles where id = p_user) then raise exception 'No such user'; end if;
  if char_length(b) = 0 or char_length(b) > 2000 then raise exception 'A message must be 1 to 2000 characters'; end if;
  insert into verify_messages (user_id, sender_id, body) values (p_user, auth.uid(), b);
end $$;

revoke execute on function public.verify_send(text), public.verify_mark_read(),
  public.admin_verify_summary(), public.admin_verify_thread(uuid), public.admin_verify_send(uuid, text) from public, anon;
grant execute on function public.verify_send(text), public.verify_mark_read(),
  public.admin_verify_summary(), public.admin_verify_thread(uuid), public.admin_verify_send(uuid, text) to authenticated;
