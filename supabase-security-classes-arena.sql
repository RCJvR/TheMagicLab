-- Security fixes, 2026-10: classes and the Arena quiz game.
-- Found in a review of every access rule; each was reproduced on the live
-- database before fixing and re-tested afterwards.

-- ── 1. Joining a class needs its invite code ─────────────────────────────
-- Before: signed-out visitors could list every class with its invite code,
-- and any signed-in user could add themselves to any class by its id. Now a
-- learner joins only through this function, with the right code, and only
-- sees classes they belong to.
create or replace function public.join_class_by_code(p_code text)
returns table (id uuid, name text)
language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_name text;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  select c.id, c.name into v_id, v_name from classes c
   where c.invite_code = upper(trim(p_code)) and c.active = true;
  if v_id is null then raise exception 'Invalid invite code'; end if;
  insert into class_members (class_id, student_id) values (v_id, auth.uid())
    on conflict do nothing;
  return query select v_id, v_name;
end $$;
revoke execute on function public.join_class_by_code(text) from public, anon;
grant execute on function public.join_class_by_code(text) to authenticated;

alter policy class_members_student_insert on public.class_members with check (false);
alter policy class_members_student_insert on public.class_members rename to class_members_insert_via_join_function;

alter policy classes_public_read on public.classes to authenticated
  using (exists (select 1 from public.class_members m
                 where m.class_id = classes.id and m.student_id = (select auth.uid())));
alter policy classes_public_read on public.classes rename to classes_member_read;

-- ── 2. Only teachers can create classes ──────────────────────────────────
-- Before: any learner could create a class and act as its teacher.
alter policy "Teachers manage own classes" on public.classes
  using ((select auth.uid()) = teacher_id)
  with check ((select auth.uid()) = teacher_id
              and exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'teacher'));
alter policy classes_teacher_own on public.classes
  using ((select auth.uid()) = teacher_id)
  with check ((select auth.uid()) = teacher_id
              and exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'teacher'));

-- ── 3. Arena: fair joining and server-timed answers ──────────────────────
-- Before: a player could join any game, at any stage, with any starting
-- score, and claim an instant answer time for maximum speed points.
-- Now: players join only a game still in its lobby, for a class they are
-- in, and start at 0.
alter policy "Students join sessions" on public.game_participants
  with check (
    student_id = (select auth.uid()) and score = 0
    and exists (select 1 from public.game_sessions s
                where s.id = game_participants.session_id and s.status = 'lobby'
                  and (s.class_id is null or exists (select 1 from public.class_members m
                        where m.class_id = s.class_id and m.student_id = (select auth.uid()))))
  );

-- The server stamps when each question opens ...
create or replace function public._game_question_clock()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.status = 'question' and (tg_op = 'INSERT' or old.status is distinct from 'question'
                                  or old.current_index is distinct from new.current_index) then
    new.question_started_at := now();
  end if;
  return new;
end $$;
create trigger game_sessions_question_clock before insert or update on public.game_sessions
  for each row execute function public._game_question_clock();

-- ... and times answers itself. p_response_ms is kept so older pages still
-- call it, but is ignored. Only the question currently open can be answered.
create or replace function public.submit_game_answer(p_session_id uuid, p_question_index integer, p_option_index integer, p_response_ms integer)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_participant_id uuid; v_correct_index int; v_seconds int; v_status text; v_index int; v_started timestamptz;
  v_ms int; v_is_correct boolean; v_points int; v_speed_frac numeric; v_inserted int;
begin
  select id into v_participant_id from game_participants
   where session_id = p_session_id and student_id = auth.uid();
  if v_participant_id is null then return jsonb_build_object('error', 'not a participant of this session'); end if;

  select status, current_index, question_started_at, question_seconds
    into v_status, v_index, v_started, v_seconds
    from game_sessions where id = p_session_id;
  if v_status is distinct from 'question' or v_index is distinct from p_question_index or v_started is null then
    return jsonb_build_object('error', 'this question is not open');
  end if;

  select correct_option_index into v_correct_index from game_answer_keys
   where session_id = p_session_id and question_index = p_question_index;
  if v_correct_index is null then return jsonb_build_object('error', 'question not found'); end if;

  v_ms := greatest(0, round(extract(epoch from (now() - v_started)) * 1000))::int;
  v_is_correct := (p_option_index = v_correct_index);
  if v_is_correct then
    v_speed_frac := greatest(0, least(1, 1 - (v_ms::numeric / greatest(1, v_seconds * 1000))));
    v_points := 500 + round(500 * v_speed_frac);
  else
    v_points := 0;
  end if;

  insert into game_answers (session_id, participant_id, question_index, option_index, is_correct, points_awarded, response_ms)
  values (p_session_id, v_participant_id, p_question_index, p_option_index, v_is_correct, v_points, v_ms)
  on conflict (participant_id, question_index) do nothing;
  get diagnostics v_inserted = row_count;

  if v_inserted > 0 then
    update game_participants set score = score + v_points where id = v_participant_id;
  else
    -- Already answered: don't award points twice; report what happened the first time.
    select is_correct, points_awarded into v_is_correct, v_points
      from game_answers where participant_id = v_participant_id and question_index = p_question_index;
  end if;

  return jsonb_build_object('correct', v_is_correct, 'points', v_points, 'correctOptionIndex', v_correct_index);
end $$;
