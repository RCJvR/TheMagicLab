-- ============================================================
-- THE MAGIC LAB — Friends + Lesson Invites schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Depends on the existing profiles / classes / class_members /
-- progress_events / user_badges tables. Safe to re-run.
--
-- Friend requests are restricted to classmates (two users who share a
-- row in class_members for the same class). Once friends, either side
-- can invite the other to complete a specific lesson together — this is
-- deliberately async: both learners complete the lesson on their own
-- time, and a trigger on progress_events detects when both sides have
-- done it and awards a shared "duo" badge. There is no student-to-student
-- chat — see help-schema.sql for the separate student-to-teacher chat.
-- ============================================================

-- ══════════════════════════════════════════════════════════════════════
-- PART 1 — FRIENDSHIPS
-- ══════════════════════════════════════════════════════════════════════

-- Each learner's personal, persistent code for sharing with a friend
-- so they can add each other — see send_friend_request_by_code() below.
alter table profiles add column if not exists friend_code text unique;

create table if not exists friendships (
  id            uuid primary key default gen_random_uuid(),
  requester_id  uuid not null references profiles(id) on delete cascade,
  addressee_id  uuid not null references profiles(id) on delete cascade,
  status        text not null default 'pending' check (status in ('pending','accepted')),
  created_at    timestamptz not null default now(),
  responded_at  timestamptz,
  check (requester_id <> addressee_id)
);

-- At most one active (pending or accepted) request per pair, in either
-- direction. Declining/unfriending deletes the row (see RLS below), so
-- this only ever guards against duplicate concurrent requests.
create unique index if not exists ux_friendship_pair
  on friendships (least(requester_id, addressee_id), greatest(requester_id, addressee_id));

create index if not exists idx_friendships_requester on friendships(requester_id);
create index if not exists idx_friendships_addressee on friendships(addressee_id);

alter table friendships enable row level security;

-- Two users are classmates if they share any class_members row for the
-- same class. Security-definer so it can read class_members rows that
-- belong to someone other than the caller.
create or replace function same_class(uid1 uuid, uid2 uuid)
returns boolean
language sql security definer stable
as $$
  select exists (
    select 1 from class_members cm1
    join class_members cm2 on cm1.class_id = cm2.class_id
    where cm1.student_id = uid1 and cm2.student_id = uid2
  );
$$;

-- Two users are friends once a friendship row between them is accepted.
create or replace function are_friends(uid1 uuid, uid2 uuid)
returns boolean
language sql security definer stable
as $$
  select exists (
    select 1 from friendships
    where status = 'accepted'
    and ((requester_id = uid1 and addressee_id = uid2)
      or (requester_id = uid2 and addressee_id = uid1))
  );
$$;

drop policy if exists "Users send requests to classmates" on friendships;
create policy "Users send requests to classmates" on friendships
  for insert
  with check (
    requester_id = auth.uid()
    and same_class(requester_id, addressee_id)
  );

drop policy if exists "Users read own friendships" on friendships;
create policy "Users read own friendships" on friendships
  for select
  using (requester_id = auth.uid() or addressee_id = auth.uid());

-- Only the addressee can accept. Declining is a delete, not a status
-- change (see the delete policy below) — there is no "declined" state.
drop policy if exists "Addressee accepts request" on friendships;
create policy "Addressee accepts request" on friendships
  for update
  using (addressee_id = auth.uid() and status = 'pending')
  with check (addressee_id = auth.uid() and status = 'accepted');

-- Either side can remove a friendship — covers cancelling a pending
-- request, declining one, and unfriending an accepted one.
drop policy if exists "Either side removes a friendship" on friendships;
create policy "Either side removes a friendship" on friendships
  for delete
  using (requester_id = auth.uid() or addressee_id = auth.uid());

drop function if exists get_my_classmates();

-- Returns the caller's own friend code, generating a unique one on first
-- call. Security-definer only so the generation loop can check
-- collisions across every profile, not because the caller can't see
-- their own row — profiles are self-readable already.
create or replace function get_or_create_my_friend_code()
returns text
language plpgsql security definer
as $$
declare
  v_code text;
begin
  select friend_code into v_code from profiles where id = auth.uid();
  if v_code is not null then
    return v_code;
  end if;

  loop
    v_code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    exit when not exists (select 1 from profiles where friend_code = v_code);
  end loop;

  update profiles set friend_code = v_code where id = auth.uid();
  return v_code;
end;
$$;

-- Looks up a learner by the friend code they shared, and sends a friend
-- request if the two share a class. Returns jsonb — either
-- {"success": true} or {"error": "<message>"} — rather than raising, so
-- the client can show a specific, friendly reason (wrong code, not
-- classmates, already friends, etc.) instead of a generic failure.
-- Security-definer so it can look up the code across every profile.
create or replace function send_friend_request_by_code(p_code text)
returns jsonb
language plpgsql security definer
as $$
declare
  v_target_id uuid;
  v_code      text := upper(trim(p_code));
begin
  if v_code = '' then
    return jsonb_build_object('error', 'Enter a friend code.');
  end if;

  select id into v_target_id from profiles where friend_code = v_code;
  if v_target_id is null then
    return jsonb_build_object('error', 'No learner found with that code.');
  end if;

  if v_target_id = auth.uid() then
    return jsonb_build_object('error', 'That''s your own code.');
  end if;

  if not same_class(auth.uid(), v_target_id) then
    return jsonb_build_object('error', 'You can only add friends from a class you share with them.');
  end if;

  if are_friends(auth.uid(), v_target_id) then
    return jsonb_build_object('error', 'You''re already friends.');
  end if;

  if exists (
    select 1 from friendships
    where (requester_id = auth.uid() and addressee_id = v_target_id)
       or (requester_id = v_target_id and addressee_id = auth.uid())
  ) then
    return jsonb_build_object('error', 'A friend request is already pending with this learner.');
  end if;

  insert into friendships (requester_id, addressee_id) values (auth.uid(), v_target_id);
  return jsonb_build_object('success', true);
exception
  -- The pending-request check above and this insert aren't atomic: two
  -- concurrent requests for the same pair (e.g. both users click "add" on
  -- each other within milliseconds) can both pass the check and race to
  -- insert, so the second hits ux_friendship_pair. Catch that here and
  -- return the same friendly message the pre-check gives, instead of
  -- letting the raw unique-violation reach the client.
  when unique_violation then
    return jsonb_build_object('error', 'A friend request is already pending with this learner.');
end;
$$;

-- The caller's accepted friends, with each friend's display name
-- resolved server-side. A plain client-side embedded select
-- (friendships -> profiles) silently comes back with a null profile —
-- and the UI falls back to a generic "Classmate" label — because
-- profiles RLS doesn't grant one student blanket read access to an
-- arbitrary other student's row; it's only readable through specific
-- paths like the teacher-student relationship. Security-definer sidesteps
-- that, same as get_or_create_my_friend_code and the class-code lookup
-- above. The WHERE clause is what keeps this safe to run as the function
-- owner — it still only ever returns the caller's own friendships.
create or replace function get_my_friends()
returns table (
  friendship_id uuid,
  friend_id     uuid,
  display_name  text
)
language sql security definer stable
as $$
  select
    f.id,
    case when f.requester_id = auth.uid() then f.addressee_id else f.requester_id end,
    p.display_name
  from friendships f
  join profiles p
    on p.id = case when f.requester_id = auth.uid() then f.addressee_id else f.requester_id end
  where f.status = 'accepted'
    and (f.requester_id = auth.uid() or f.addressee_id = auth.uid());
$$;

-- Incoming pending friend requests, with the requester's name resolved
-- the same way as get_my_friends above.
create or replace function get_my_pending_friend_requests()
returns table (
  friendship_id uuid,
  requester_id  uuid,
  display_name  text,
  created_at    timestamptz
)
language sql security definer stable
as $$
  select f.id, f.requester_id, p.display_name, f.created_at
  from friendships f
  join profiles p on p.id = f.requester_id
  where f.status = 'pending' and f.addressee_id = auth.uid();
$$;


-- ══════════════════════════════════════════════════════════════════════
-- PART 2 — LESSON INVITES (async co-op) + DUO BADGES
-- ══════════════════════════════════════════════════════════════════════

create table if not exists lesson_invites (
  id            uuid primary key default gen_random_uuid(),
  inviter_id    uuid not null references profiles(id) on delete cascade,
  invitee_id    uuid not null references profiles(id) on delete cascade,
  tool          text not null,
  topic         text not null,
  status        text not null default 'pending' check (status in ('pending','accepted','completed')),
  created_at    timestamptz not null default now(),
  responded_at  timestamptz,
  completed_at  timestamptz,
  check (inviter_id <> invitee_id)
);

-- `tool` must be one of the real product slugs (kept in sync with the
-- TOOLS map in progress.js) — otherwise handle_lesson_complete_for_invites
-- below can never match a completion against it, and the invite is stuck
-- "pending" forever with no way for either side to know why. This is a
-- coarse DB-level backstop; sendLessonInvite() in social.js does the
-- finer-grained check against the actual lesson catalog before insert.
alter table lesson_invites drop constraint if exists chk_lesson_invites_known_tool;
alter table lesson_invites add constraint chk_lesson_invites_known_tool
  check (tool in (
    'java-genie','web-wizard','code-conjurer','math-magician','computer-codex',
    'ai-oracle','drawing-druid','science-sage','tech-tower','spike-spellcaster',
    'robot-realm','model-mage'
  ));

create index if not exists idx_lesson_invites_inviter on lesson_invites(inviter_id);
create index if not exists idx_lesson_invites_invitee on lesson_invites(invitee_id);
create index if not exists idx_lesson_invites_lookup   on lesson_invites(tool, topic, status);

alter table lesson_invites enable row level security;

drop policy if exists "Friends send lesson invites" on lesson_invites;
create policy "Friends send lesson invites" on lesson_invites
  for insert
  with check (inviter_id = auth.uid() and are_friends(inviter_id, invitee_id));

drop policy if exists "Participants read own invites" on lesson_invites;
create policy "Participants read own invites" on lesson_invites
  for select
  using (inviter_id = auth.uid() or invitee_id = auth.uid());

-- Only the invitee can accept (declining is a delete, same pattern as
-- friendships). The trigger below moves accepted -> completed itself,
-- running as the function owner, so it isn't blocked by this policy.
drop policy if exists "Invitee accepts invite" on lesson_invites;
create policy "Invitee accepts invite" on lesson_invites
  for update
  using (invitee_id = auth.uid() and status = 'pending')
  with check (invitee_id = auth.uid() and status = 'accepted');

drop policy if exists "Participants remove an invite" on lesson_invites;
create policy "Participants remove an invite" on lesson_invites
  for delete
  using (inviter_id = auth.uid() or invitee_id = auth.uid());

-- Every user_badges insert below needs this to be idempotent — a badge
-- can only be earned once. Defensive: harmless if an equivalent
-- constraint already exists under a different name.
create unique index if not exists ux_user_badges_user_badge on user_badges(user_id, badge_id);

-- Tiered duo badges, awarded once a user's completed-invite count crosses
-- each threshold. Kept in sync with the duo_1/duo_5/duo_15 entries added
-- to the BADGES array in xp.js — those exist purely for icon/name/desc
-- display, since (unlike every other badge) these are earned here, not
-- by the client-side checker in xp.js, because they depend on a second
-- user's progress that the caller has no RLS grant to read directly.
create or replace function award_duo_badges(p_user_id uuid)
returns void
language plpgsql security definer
as $$
declare
  duo_count int;
begin
  select count(*) into duo_count from lesson_invites
    where status = 'completed' and (inviter_id = p_user_id or invitee_id = p_user_id);

  insert into user_badges (user_id, badge_id)
  select p_user_id, b.badge_id
  from (values ('duo_1', 1), ('duo_5', 5), ('duo_15', 15)) as b(badge_id, threshold)
  where duo_count >= b.threshold
  on conflict (user_id, badge_id) do nothing;
end;
$$;

-- Fires on every progress_events insert; only does work on lesson_complete
-- rows with a topic. For each accepted invite touching the same
-- (tool, topic) that the completing user is a party to, checks whether
-- the other party already has a matching lesson_complete event. If so,
-- marks the invite completed and awards duo badges to both. Matches
-- assignments.js's own completion check: case/whitespace-insensitive
-- topic comparison.
create or replace function handle_lesson_complete_for_invites()
returns trigger
language plpgsql security definer
as $$
declare
  inv record;
  other_id uuid;
  other_done boolean;
begin
  if NEW.event_type <> 'lesson_complete' or NEW.topic is null then
    return NEW;
  end if;

  for inv in
    select * from lesson_invites
    where status = 'accepted'
      and tool = NEW.tool
      and lower(trim(topic)) = lower(trim(NEW.topic))
      and (inviter_id = NEW.user_id or invitee_id = NEW.user_id)
  loop
    other_id := case when inv.inviter_id = NEW.user_id then inv.invitee_id else inv.inviter_id end;

    select exists (
      select 1 from progress_events
      where user_id = other_id and tool = inv.tool
        and event_type = 'lesson_complete'
        and lower(trim(topic)) = lower(trim(inv.topic))
    ) into other_done;

    if other_done then
      update lesson_invites set status = 'completed', completed_at = now() where id = inv.id;
      perform award_duo_badges(inv.inviter_id);
      perform award_duo_badges(inv.invitee_id);
    end if;
  end loop;

  return NEW;
end;
$$;

drop trigger if exists trg_lesson_complete_duo on progress_events;
create trigger trg_lesson_complete_duo
  after insert on progress_events
  for each row execute function handle_lesson_complete_for_invites();

-- Every lesson invite involving the caller, with both participants'
-- names resolved server-side — same reasoning as get_my_friends above,
-- since a client-side embedded select on lesson_invites -> profiles hits
-- the same profiles-RLS gap for the other participant's row.
create or replace function get_my_lesson_invites()
returns table (
  id            uuid,
  tool          text,
  topic         text,
  status        text,
  created_at    timestamptz,
  completed_at  timestamptz,
  inviter_id    uuid,
  invitee_id    uuid,
  inviter_name  text,
  invitee_name  text
)
language sql security definer stable
as $$
  select li.id, li.tool, li.topic, li.status, li.created_at, li.completed_at,
         li.inviter_id, li.invitee_id, pi.display_name, pe.display_name
  from lesson_invites li
  join profiles pi on pi.id = li.inviter_id
  join profiles pe on pe.id = li.invitee_id
  where li.inviter_id = auth.uid() or li.invitee_id = auth.uid()
  order by li.created_at desc;
$$;
