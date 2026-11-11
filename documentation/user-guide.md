STUDENT RECORDS SYSTEM
USER GUIDE

Project: Student Records System
Course: IT 3119
Name: Angel Cordero
Section: BSIT 3 - B (WM)

1. Introduction

The Student Records System is a web-based application designed to help authorized class operators manage fictional student information efficiently.

The system allows authorized users to sign in, view student records, add new students, edit existing information, search for records, delete student entries, and generate student counts by course.

The application uses Supabase for database storage and authentication, while the website is developed using Vite and deployed through Vercel.

2. Accessing the System
Open a web browser such as Google Chrome or Microsoft Edge.
Enter the official Vercel website URL provided by the project developer.
Wait for the Student Records System page to load.
The sign-in form will appear.

Note: Only authorized operators can access the student records.

3. Signing In
Open the Student Records System website.
Enter your registered email address.
Enter your password.
Click the Sign in button.
If your account is authorized, the student records section will appear.

If you cannot sign in, verify your email address and password. Make sure your account has been approved for records access.

4. Registering an Account
Open the website.
Enter an email address that you control.
Enter a password containing at least eight characters.
Click Register.
Check your email inbox for the confirmation message.
Confirm your email address.
Sign in using your registered credentials.
Contact the instructor or authorized project operator to request records access.

Note: Creating an account does not automatically grant access to student records. The account must be approved through the database access policy.

5. Viewing Student Records

After successfully signing in:

Locate the Student List section.
View the available student records.
Each record displays the student number, first name, last name, year level, email, course, department, and updated timestamp.
Use the Refresh list button to reload the records.

The website retrieves student information from the Supabase database.

6. Adding a Student
Locate the Add or Edit a Student section.
Enter the student's student number.
Enter the student's first name.
Enter the student's last name.
Enter the year level from 1 to 4.
Enter the student's email address.
Select an existing course from the Course dropdown list.
Click Save student.
Check the confirmation message and student list.

The new student record will be stored in the Supabase database.

Important: Use fictional student information for classroom demonstrations. Student numbers and email addresses must be unique.

7. Searching for a Student
Locate the Search name or student number field.
Enter the student's first name, last name, or student number.
The student list will automatically display matching records.
If there are no matching records, the system displays "No matching records."

The search function makes it easier to find specific student information.

8. Editing Student Information
Find the student record you want to modify.
Click the Edit button beside the selected record.
The existing information will appear in the student form.
Change the information that needs updating.
Click Save student.
Check the student list to confirm that the changes were saved.

The database trigger automatically updates the updated_at timestamp whenever a student record is modified.

9. Deleting a Student
Locate the student record you want to remove.
Click the Delete button beside the selected record.
A confirmation message will appear.
Review the selected student number.
Confirm the deletion if you want to proceed.
The selected record will be removed from the database.

Warning: Deleted records cannot be restored through the website. Make sure you select the correct student before confirming.

10. Viewing the Course Student Count Report
Locate the Course dropdown list in the student form.
Select the course you want to check.
Go to the Course Report section.
Click the Count students button.
The system will display the total number of students assigned to the selected course.

The report uses the PostgreSQL function count_students_by_course in Supabase.

11. Signing Out
Locate the Sign out button.
Click Sign out.
The student records section will disappear.
The sign-in form will become visible again.

Always sign out after using the system, especially when accessing it on a shared computer.

12. Managing Departments and Courses

Departments and courses are maintained directly through the Supabase dashboard.

Authorized database maintainers can:

Add new departments.
Add new courses.
Assign courses to existing departments.
Update department and course information.

The website reads these tables to display the available courses and department names. It does not provide department or course editing functionality.

13. Important Reminders
Use authorized accounts only.
Use fictional student records for demonstrations.
Do not share passwords or private authentication information.
Do not attempt to access records without permission.
Report errors to the instructor or project administrator.
Always sign out after using the system.
14. Conclusion

The Student Records System provides a simple and convenient way for authorized class operators to manage student records online.

By following this user guide, operators can perform the main system functions, including authentication, student record management, searching, and course reporting.