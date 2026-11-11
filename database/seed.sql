-- IT 3119 Final Project
-- Demonstration Records

insert into public.department (department_name)
values ('Demo Computing Department')
on conflict (department_name) do nothing;

insert into public.courses
    (course_code, course_name, department_id)
select
    'DEMO-BSIT',
    'Demo Information Technology',
    department_id
from public.department
where department_name = 'Demo Computing Department'
on conflict (course_code) do nothing;

insert into public.students
    (student_no, first_name, last_name, year_level, email, course_id)
select
    'DEMO-001',
    'Ana',
    'Sample',
    3,
    'ana.sample@example.com',
    course_id
from public.courses
where course_code = 'DEMO-BSIT'
on conflict (student_no) do nothing;

-- Verify inserted records and relationships

select
    s.student_id,
    s.student_no,
    s.first_name,
    s.last_name,
    c.course_code,
    c.course_name,
    d.department_name
from public.students s
left join public.courses c
    on c.course_id = s.course_id
left join public.department d
    on d.department_id = c.department_id
where s.student_no = 'DEMO-001';