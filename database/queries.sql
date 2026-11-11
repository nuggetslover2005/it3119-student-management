-- IT 3119 Final Project
-- Student Records System Queries

-- 1. Display all students with course and department information

select
    s.student_id,
    s.student_no,
    s.first_name,
    s.last_name,
    s.year_level,
    s.email,
    c.course_code,
    c.course_name,
    d.department_name
from public.students s
left join public.courses c
    on c.course_id = s.course_id
left join public.department d
    on d.department_id = c.department_id
order by s.last_name, s.first_name;

-- 2. Search students by first name, last name, or student number

select
    student_no,
    first_name,
    last_name
from public.students
where first_name ilike '%ana%'
   or last_name ilike '%ana%'
   or student_no ilike '%ana%';

-- 3. Count students per course

select
    c.course_code,
    c.course_name,
    count(s.student_id) as total_students
from public.courses c
left join public.students s
    on s.course_id = c.course_id
group by c.course_id, c.course_code, c.course_name
order by c.course_code;

-- 4. Examine the query execution plan

explain
select *
from public.students
where student_no = 'DEMO-001';

-- 5. Display total student records

select count(*) as total_students
from public.students;