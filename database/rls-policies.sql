-- IT 3119 Final Project
-- Row Level Security Policies
-- Authorized Class Operators Only

do $$
declare
    allowed_ids text := $ids$
    'REPLACE-WITH-OPERATOR-A-UUID'::uuid,
    'REPLACE-WITH-OPERATOR-B-UUID'::uuid
    $ids$;

    t text;

begin
    foreach t in array array[
        'department',
        'courses',
        'students'
    ]
    loop

        execute format(
            'alter table public.%I enable row level security',
            t
        );

        execute format(
            'revoke all on table public.%I from anon, authenticated',
            t
        );

        execute format(
            'grant select on table public.%I to authenticated',
            t
        );

        execute format(
            'drop policy if exists class_operator_access on public.%I',
            t
        );

        execute format(
            'create policy class_operator_access on public.%I
            for all to authenticated
            using ((select auth.uid()) in (%s))
            with check ((select auth.uid()) in (%s))',
            t,
            allowed_ids,
            allowed_ids
        );

    end loop;
end;
$$;

-- Allow authenticated users to use the public schema

grant usage on schema public to authenticated;

-- Allow approved operators to manage student records

grant insert, update, delete
on table public.students
to authenticated;

-- Allow access to the student ID sequence

grant usage, select
on sequence public.students_student_id_seq
to authenticated;

-- Secure the student directory view

revoke all on public.student_directory
from anon, authenticated;

grant select on public.student_directory
to authenticated;