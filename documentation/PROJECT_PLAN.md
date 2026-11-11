STUDENT RECORDS SYSTEM
PROJECT PLAN

Course: IT 3119
Name: Angel Cordero
Section: BSIT 3 - B (WM)
Project Title: Student Records System

1. Project Overview

The Student Records System is a web-based application developed to provide a simple and organized way of managing student information.

The system allows authorized class operators to add, view, edit, delete, and search student records. It also provides course selection and student-count reporting functionality.

The application uses Supabase PostgreSQL as its database, Supabase Authentication for user authentication, Vite for frontend development, GitHub for source code management, and Vercel for online deployment.

2. Problem Statement

Managing student information manually can become difficult when records increase. Searching for specific students, updating information, and maintaining organized records may require additional time and effort.

This project aims to provide a simple web-based system that allows authorized operators to manage student records efficiently while maintaining proper database relationships and access restrictions.

3. Project Objectives

The main objectives of the Student Records System are:

To develop a simple web-based student records management system.
To implement secure operator authentication.
To allow authorized operators to add, view, edit, and delete student records.
To provide a search function for finding student information.
To connect students with their corresponding courses and departments.
To generate student-count reports for selected courses.
To implement PostgreSQL functions and triggers.
To maintain database integrity using primary keys, foreign keys, and constraints.
To restrict unauthorized database access using Row Level Security.
To deploy the application online using Vercel.
4. Target Users

The system is designed for authorized class operators who are permitted to manage shared student records.

Two approved operators can access the same student information.

Newly registered users must receive authorization before accessing the records.

The system does not provide student self-service or separate administrator and student roles.

5. Project Scope and Features

The project includes the following features:

Authentication
Operator registration.
Email and password sign-in.
Operator sign-out.
Approval-based database access.
Student Record Management
Add student records.
View student records.
Edit student information.
Delete student records.
Search by student name or student number.
Course Management
Display available courses.
Select a course when adding or editing a student.
Display the related department information.
Reporting
Count students assigned to a selected course.
Compare function results with manual SQL queries.
Database Features
Primary key constraints.
Foreign key relationships.
UNIQUE constraints.
NOT NULL constraints.
PostgreSQL function for counting students.
Automatic updated_at trigger.
Row Level Security policies.
6. Database Design

The application uses three existing tables:

Department Table

Stores department information.

Main columns:

department_id
created_at
department_name
Courses Table

Stores course information and its relationship with departments.

Main columns:

course_id
created_at
course_code
course_name
department_id
Students Table

Stores student information and its relationship with courses.

Main columns:

student_id
created_at
updated_at
student_no
first_name
last_name
year_level
email
course_id
Database Relationships
Department to Courses: One-to-Many.
Courses to Students: One-to-Many.

The department_id column in courses references department.department_id.

The course_id column in students references courses.course_id.

7. Tools and Technologies
Tool	Purpose
Visual Studio Code	Code editor
HTML	Page structure
CSS	Page design
JavaScript	Application logic
Node.js	JavaScript runtime
npm	Package management
Vite	Frontend development
Supabase	Database and authentication
PostgreSQL	Database management
GitHub	Source code hosting
Vercel	Online deployment
8. Project Development Plan

The project follows these development stages:

Stage 1: Database Preparation

Verify the existing department, courses, and students tables.
Verify primary keys and foreign key relationships.
Insert fictional demonstration records.
Test database constraints.

Stage 2: Database Functions and Triggers

Create the course-count function.
Test the function using an existing course.
Add the updated_at column.
Create the automatic timestamp trigger.
Verify that the trigger works.

Stage 3: Authentication and Security

Create operator accounts.
Configure email authentication.
Enable Row Level Security.
Create policies for approved operators.
Test unauthorized access restrictions.

Stage 4: Website Development

Create the Vite project.
Connect the Supabase client.
Develop the sign-in and registration interface.
Implement student CRUD operations.
Add search functionality.
Add course selection and student-count reporting.
Apply CSS styling.

Stage 5: Testing and Deployment

Test the website locally.
Verify database operations.
Build the production version.
Upload the source code to GitHub.
Connect the repository to Vercel.
Configure environment variables.
Deploy and test the live website.

Stage 6: Documentation and Final Demonstration

Prepare the ERD.
Complete the test results documentation.
Create the user guide.
Create the setup guide.
Complete the README.
Demonstrate the live application and database features.
9. Testing Plan

The following areas will be tested:

Required-field validation.
Duplicate student number and email rejection.
Foreign key constraints.
Department and course relationships.
Course-count function.
Automatic updated_at trigger.
Operator sign-in and sign-out.
Adding, viewing, editing, and deleting student records.
Student search.
Course-count reporting.
Unauthorized access restrictions.
Live website functionality.
Data persistence after refreshing the website.

Actual test results will be recorded in documentation/test-results.md.

10. Security and Data Protection

The system uses Supabase Authentication to manage operator accounts.

Row Level Security restricts access to the application tables. Only approved operator accounts are allowed to view and modify the shared student records.

The system uses fictional student records for classroom demonstrations.

Private passwords, database credentials, and secret API keys must not be published or uploaded to the GitHub repository.

11. Expected Project Output

The expected output is a working Student Records System accessible through a Vercel production URL.

The completed application should allow approved operators to sign in, manage student records, search for students, select courses, and generate student-count reports.

The project will also include the database SQL scripts, ERD, testing documentation, user guide, setup guide, and README.

12. Project Limitations
Only approved operators can access application records.
Approved operators share the same student records.
There are no separate administrator and student roles.
Students cannot manage their own records.
Department and course maintenance is performed through Supabase Table Editor.
The project is designed for classroom demonstration and uses fictional student data.
13. Conclusion

The Student Records System aims to demonstrate the practical application of database management, authentication, database functions, triggers, frontend development, and online deployment.

Through this project, the developers apply the concepts learned in IT 3119 to create a functional web-based system that provides basic student record management with proper database relationships and security controls.