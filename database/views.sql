-- IT 3119 Final Project
-- Student Directory View

create or replace view public.student_directory
with (security_invoker = true) as

select
    s.student_id,
    s.student_no,
    s.first_name,
    s.last_name,
    s.year_level,
    s.email,
    c.course_code,
    d.department_name
from public.students s
left join public.courses c
    on c.course_id = s.course_id
left join public.department d
    on d.department_id = c.department_id;

-- Test the student directory view

select *
from public.student_directory
order by last_name;