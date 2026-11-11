-- IT 3119 Final Project
-- Trigger: Automatically Update Student Timestamp

-- Add updated_at column if it does not exist

alter table public.students
add column if not exists updated_at timestamptz not null default now();

-- Create trigger function

create or replace function public.set_student_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
    new.updated_at := clock_timestamp();
    return new;
end;
$$;

revoke execute on function public.set_student_updated_at()
from public, anon, authenticated;

-- Remove the previous trigger if it exists

drop trigger if exists trg_students_updated_at
on public.students;

-- Create the automatic update trigger

create trigger trg_students_updated_at
before update on public.students
for each row
execute function public.set_student_updated_at();

-- Verify trigger creation

select
    trigger_name,
    event_manipulation,
    action_timing
from information_schema.triggers
where event_object_schema = 'public'
  and event_object_table = 'students'
  and trigger_name = 'trg_students_updated_at';