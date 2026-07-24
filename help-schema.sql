-- ============================================================
-- THE MAGIC LAB — Student → Teacher help chat schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Depends on the existing profiles / classes / class_members tables.
-- Safe to re-run.
--
-- One thread per (student, class) — a student asks their class's teacher
-- for help, the teacher replies. There is no student-to-student chat;
-- see social-schema.sql for friends and lesson invites.
-- ============================================================

create table if not exists help_threads (
  id               uuid primary key default gen_random_uuid(),
  student_id       uuid not null references profiles(id) on delete cascade,
  teacher_id       uuid not null references profiles(id) on delete cascade,
  class_id         uuid not null references classes(id) on delete cascade,
  created_at       timestamptz not null default now(),
  last_message_at  timestamptz not null default now(),
  unique (student_id, class_id)
);

create table if not exists help_messages (
  id          uuid primary key default gen_random_uuid(),
  thread_id   uuid not null references help_threads(id) on delete cascade,
  sender_id   uuid not null references profiles(id) on delete cascade,
  body        text not null,
  created_at  timestamptz not null default now(),
  read_at     timestamptz
);

create index if not exists idx_help_threads_teacher  on help_threads(teacher_id);
create index if not exists idx_help_threads_student  on help_threads(student_id);
create index if not exists idx_help_messages_thread  on help_messages(thread_id, created_at);

alter table help_threads  enable row level security;
alter table help_messages enable row level security;

-- No client-facing insert policy on help_threads — threads are only ever
-- created through get_or_create_help_thread() below, which validates
-- class membership itself and runs as the function owner.
drop policy if exists "Student reads own threads" on help_threads;
create policy "Student reads own threads" on help_threads
  for select
  using (student_id = auth.uid());

drop policy if exists "Teacher reads own threads" on help_threads;
create policy "Teacher reads own threads" on help_threads
  for select
  using (teacher_id = auth.uid());

drop policy if exists "Participants read thread messages" on help_messages;
create policy "Participants read thread messages" on help_messages
  for select
  using (
    exists (
      select 1 from help_threads
      where help_threads.id = help_messages.thread_id
      and (help_threads.student_id = auth.uid() or help_threads.teacher_id = auth.uid())
    )
  );

drop policy if exists "Participants send thread messages" on help_messages;
create policy "Participants send thread messages" on help_messages
  for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from help_threads
      where help_threads.id = help_messages.thread_id
      and (help_threads.student_id = auth.uid() or help_threads.teacher_id = auth.uid())
    )
  );
-- No update/delete policies — messages are immutable; "read" state is
-- set only via mark_help_thread_read() below.

-- Keeps help_threads.last_message_at current for sorting the teacher's
-- inbox, without needing an UPDATE policy on help_threads for either side.
create or replace function touch_help_thread()
returns trigger
language plpgsql security definer
as $$
begin
  update help_threads set last_message_at = NEW.created_at where id = NEW.thread_id;
  return NEW;
end;
$$;

drop trigger if exists trg_touch_help_thread on help_messages;
create trigger trg_touch_help_thread
  after insert on help_messages
  for each row execute function touch_help_thread();

-- Student-facing: every class the caller belongs to, with that class's
-- teacher — lets the "ask for help" widget pick who the message goes to
-- without needing direct SELECT on other people's profiles.
create or replace function get_my_teachers()
returns table (
  class_id     uuid,
  class_name   text,
  teacher_id   uuid,
  teacher_name text
)
language sql security definer stable
as $$
  select c.id, c.name, c.teacher_id, p.display_name
  from class_members cm
  join classes c  on c.id = cm.class_id
  join profiles p on p.id = c.teacher_id
  where cm.student_id = auth.uid();
$$;

-- Student-facing: find or create the (student, class) thread. Validates
-- class membership itself since there is no insert policy on help_threads.
create or replace function get_or_create_help_thread(p_class_id uuid)
returns uuid
language plpgsql security definer
as $$
declare
  v_teacher_id uuid;
  v_thread_id  uuid;
begin
  if not exists (
    select 1 from class_members
    where class_id = p_class_id and student_id = auth.uid()
  ) then
    raise exception 'not a member of this class';
  end if;

  select teacher_id into v_teacher_id from classes where id = p_class_id;
  if v_teacher_id is null then
    raise exception 'class not found';
  end if;

  select id into v_thread_id from help_threads
    where student_id = auth.uid() and class_id = p_class_id;

  if v_thread_id is null then
    insert into help_threads (student_id, teacher_id, class_id)
    values (auth.uid(), v_teacher_id, p_class_id)
    returning id into v_thread_id;
  end if;

  return v_thread_id;
end;
$$;

-- Teacher-facing inbox: every thread across the teacher's classes, with
-- the student's name and an unread count (messages from the student not
-- yet marked read). Security-definer so it can read student profile names.
create or replace function get_teacher_help_threads()
returns table (
  thread_id        uuid,
  class_id         uuid,
  class_name       text,
  student_id       uuid,
  student_name     text,
  last_message_at  timestamptz,
  unread_count     bigint
)
language sql security definer stable
as $$
  select
    t.id, t.class_id, c.name, t.student_id, p.display_name, t.last_message_at,
    (select count(*) from help_messages m
       where m.thread_id = t.id and m.sender_id = t.student_id and m.read_at is null)
  from help_threads t
  join classes c  on c.id = t.class_id
  join profiles p on p.id = t.student_id
  where t.teacher_id = auth.uid()
  order by t.last_message_at desc;
$$;

-- Marks every message in a thread not sent by the caller as read. Callable
-- by either participant when they open the thread.
create or replace function mark_help_thread_read(p_thread_id uuid)
returns void
language plpgsql security definer
as $$
begin
  if not exists (
    select 1 from help_threads
    where id = p_thread_id and (student_id = auth.uid() or teacher_id = auth.uid())
  ) then
    return;
  end if;

  update help_messages set read_at = now()
    where thread_id = p_thread_id and sender_id <> auth.uid() and read_at is null;
end;
$$;
