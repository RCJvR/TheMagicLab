-- Revoking an approved teacher sends the account back to 'pending' (still a
-- student until approved again) so the admin can message them in the
-- verification chat. Adds 'pending' to the statuses admin_set_teacher_request
-- accepts; everything else is unchanged.
create or replace function public.admin_set_teacher_request(target_user_id uuid, new_status text)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if auth.uid() is distinct from '31a201b0-f426-455a-973a-b1862001b748'::uuid then
    raise exception 'not authorized';
  end if;
  if new_status not in ('approved', 'rejected', 'pending') then
    raise exception 'invalid status';
  end if;

  perform set_config('magiclab.admin_override', 'on', true);
  update profiles
     set teacher_request = new_status,
         role = case when new_status = 'approved' then 'teacher' else 'student' end
   where id = target_user_id;
end;
$function$;
