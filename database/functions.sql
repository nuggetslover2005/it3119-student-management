-- IT 3119 Final Project
-- Function: Count Students by Course

create or replace function public.count_students_by_course(
    p_course_id bigint
)
returns bigint
language plpgsql
stable
security invoker
set search_path = ''
as $$
begin
    if p_course_id is null or not exists (
        select 1
        from public.courses c
        where c.course_id = p_course_id
    ) then
        raise exception 'Course not found';
    end if;

    return (
        select count(*)
        from public.students s
        where s.course_id = p_course_id
    );
end;
$$;

revoke execute on function public.count_students_by_course(bigint)
from public, anon, authenticated;

grant execute on function public.count_students_by_course(bigint)
to authenticated;

-- Test the function using the demonstration course

select
    c.course_code,
    public.count_students_by_course(c.course_id) as total_students
from public.courses c
where c.course_code = 'DEMO-BSIT';