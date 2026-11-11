Student Records System

Course: IT 3119
Name: Angel Cordero
Section: BSIT 3 - B (WM)

Project Description

The Student Records System is a web-based application designed to help authorized class operators manage student information efficiently.

The system provides a simple interface for adding, viewing, editing, deleting, and searching student records. It also allows operators to select existing courses and generate student-count reports.

The application uses Supabase PostgreSQL as its database and authentication service, Vite for frontend development, GitHub for source code management, and Vercel for deployment.

Features
Operator registration and sign-in.
Secure access for approved operators.
View student records.
Add new student records.
Edit existing student information.
Delete student records with confirmation.
Search students by name or student number.
Select existing courses.
Display related department information.
Generate student counts by course.
Automatic updated_at timestamp using a PostgreSQL trigger.
Database access protection through Row Level Security (RLS).
Technologies Used
Technology	Purpose
HTML	Website structure
CSS	Website styling
JavaScript	Application functionality
Vite	Frontend development and build tool
Supabase	Database and authentication
PostgreSQL	Relational database
GitHub	Source code repository
Vercel	Website hosting and deployment
Node.js and npm	Development environment and package management
Database Structure

The system uses three existing application tables:

department – Stores department information.
courses – Stores course codes, course names, and department references.
students – Stores student numbers, names, year levels, email addresses, and course references.
Database Relationships
One department can have many courses.
One course can have many students.
Each course references one department at most.
Each student references one course at most.

The database uses primary keys, foreign keys, UNIQUE constraints, and NOT NULL constraints to maintain data integrity.

Database Functions and Triggers
Course Count Function

The PostgreSQL function count_students_by_course calculates the total number of students assigned to a selected course.

Updated Timestamp Trigger

The trigger trg_students_updated_at automatically updates the updated_at column whenever a student record is modified.

Security

The system uses Supabase Authentication and Row Level Security (RLS).

Only approved operators can access and manage the shared student records. Anonymous visitors and unapproved accounts are not allowed to access the application data.

Newly registered users require instructor or authorized operator approval before receiving records access.

Project Links

Live Website: https://it3119-student-management-6olbqk4zv-nuggetslover2005.vercel.app/

GitHub Repository: (https://github.com/nuggetslover2005/it3119-student-management)

Installation and Local Setup
Install Node.js LTS.
Download or clone this repository.
Open the project folder in Visual Studio Code.
Open the terminal.
Install the project dependencies:
bash
npm install

Create a .env.local file in the project root.
Enter the Supabase public client settings:
env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-public-client-key

Configure the Supabase database by following documentation/setup-guide.md.
Start the development server:
bash
npm run dev

Open the local URL displayed in the terminal.

To create a production build, run:

bash
npm run build

Project Documentation

Additional project documentation is available in the following locations:

PROJECT_PLAN.md – Project overview and development plan.
database/ – SQL scripts for database creation, sample records, queries, views, functions, triggers, and RLS policies.
documentation/ERD.png – Entity Relationship Diagram.
documentation/test-results.md – System testing documentation.
documentation/user-guide.md – Instructions for using the website.
documentation/setup-guide.md – Installation and deployment instructions.
Project Limitations
Only approved operators can access student records.
All approved operators share the same records.
There are no separate administrator and student roles.
Students cannot access or manage their own records.
Department and course information are maintained through the Supabase dashboard.
Registration requires email confirmation and approval for records access.
The application is intended for classroom demonstration using fictional student information.
Conclusion

The Student Records System demonstrates the use of relational database management, authentication, database functions, triggers, frontend development, and cloud deployment.

The project provides a simple online solution for managing fictional student records while maintaining database integrity and restricting unauthorized access.