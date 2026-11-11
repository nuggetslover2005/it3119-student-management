STUDENT RECORDS SYSTEM
SETUP GUIDE

Project: Student Records System
Course: IT 3119
Name: Angel Cordero
Section: BSIT 3 - B (WM)

1. Introduction

This setup guide explains how to install, configure, and run the Student Records System on a new computer or development environment.

The project uses the following technologies:

Visual Studio Code – Source code editor.
Node.js and npm – JavaScript runtime and package manager.
Vite – Frontend development and build tool.
Supabase – PostgreSQL database and authentication service.
GitHub – Source code repository.
Vercel – Website hosting and deployment platform.
2. System Requirements

Before starting, make sure the following tools are available:

A computer running Windows, macOS, or Linux.
Visual Studio Code.
Node.js LTS and npm.
A GitHub account.
A Supabase account.
A Vercel account.
An internet connection.
3. Install the Required Tools
Download and install Visual Studio Code from https://code.visualstudio.com/.
Download and install Node.js from https://nodejs.org/.
Open Visual Studio Code.
Open Terminal → New Terminal.
Check the installed versions by entering:
bash
node -v
npm -v


Both commands should display version numbers.

4. Create or Open the Project Folder
Create a folder named student-records-system.
Open Visual Studio Code.
Select File → Open Folder.
Choose the project folder.
Open a new terminal inside Visual Studio Code.
5. Set Up the Supabase Project
Visit https://supabase.com/dashboard.
Sign in to your Supabase account.
Open your existing project or create a new project.
Open the SQL Editor.
Run the database scripts in the following order:
database/schema.sql
database/seed.sql
database/views.sql
database/functions.sql
database/triggers.sql
Create the required authentication accounts under Authentication → Users.
Copy the User UID of each approved operator.
Open database/rls-policies.sql.
Replace the sample UUID values with the actual approved operator UIDs.
Run the updated RLS policy script in SQL Editor.

Important: If the database tables already exist, do not run schema.sql again. Inspect the existing tables instead. The schema script is intended for a fresh project.

The database/queries.sql file contains additional SQL queries for testing and reporting. It can be run after the database and sample records are prepared.

6. Configure Supabase Authentication and Security
Open Supabase → Authentication.
Enable email/password authentication.
Configure email confirmation according to the project requirements.
Create the approved operator accounts.
Verify that the authorized user IDs are included in the RLS policy script.
Make sure Row Level Security is enabled on the department, courses, and students tables.
Verify that anonymous users and unapproved accounts cannot access application records.

Only approved operators should have permission to manage student records.

7. Install the Website Dependencies

Open the project folder in Visual Studio Code.

Open Terminal → New Terminal and run:

bash
npm install


Install the Supabase JavaScript library if it is not already included in package.json:

bash
npm install @supabase/supabase-js

8. Configure Environment Variables
Create a file named .env.local in the project root.
Open Supabase → Project Settings → API or Connect.
Copy the Project URL and publishable key.
Enter the following configuration:
env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-public-client-key

Replace the example values with the actual public client settings from your Supabase project.
Save the file.

Security Reminder: Never place database passwords, service-role keys, or secret API keys in frontend environment variables. Never upload .env.local to GitHub.

9. Run the Website Locally
Open the project folder in Visual Studio Code.
Open the terminal.
Run:
bash
npm run dev

Open the local URL displayed in the terminal, usually:

http://localhost:5173/

Sign in using an approved operator account.
Verify that the student records and course choices load correctly.
10. Test the Website

Perform the following tests before deployment:

Sign in using an approved operator.
View existing student records.
Add a fictional student.
Search for the student.
Edit the student's information.
Verify the updated_at timestamp.
Delete the test student.
Generate a course student count.
Sign out.
Verify that unauthorized users cannot access records.

Record the actual results in documentation/test-results.md.

11. Build the Project

After successfully testing the website locally, stop the development server using Ctrl+C.

Run:

bash
npm run build


Vite should create a dist folder containing the production build.

Fix any errors before proceeding.

12. Upload the Project to GitHub
Visit https://github.com/.
Sign in to your GitHub account.
Create a new repository.
Open the repository.
Upload the project source files and folders.

Include:

index.html
src/
database/
documentation/
package.json
package-lock.json
.gitignore
.env.example
README.md
PROJECT_PLAN.md

Do not upload:

node_modules/
dist/
.env.local
Passwords or secret API keys.

Commit the uploaded files to the repository.

13. Deploy the Project Using Vercel
Visit https://vercel.com/.
Sign in using your GitHub account.
Select Add New → Project.
Import the Student Records System GitHub repository.
Choose Vite as the Framework Preset.
Set the Root Directory to the repository root.
Set the Build Command to:
bash
npm run build

Set the Output Directory to:
text
dist

Add the following environment variables:

VITE_SUPABASE_URL

VITE_SUPABASE_PUBLISHABLE_KEY

Enter the actual values from your Supabase project.
Click Deploy.
Wait until the deployment status becomes Ready.
Click Visit to open the deployed website.
14. Configure the Production Authentication URL
Open Supabase → Authentication → URL Configuration.
Set the Site URL to the production Vercel URL.
Add the production URL to the allowed Redirect URLs.
Keep the local development URL if you still need local testing.
Save the settings.
15. Verify the Deployed Website

Open the production Vercel URL. 

Perform the following checks:

The website loads successfully.
An approved operator can sign in.
Student records are displayed.
New student records can be added.
Existing student records can be edited.
Students can be searched.
Student records can be deleted.
Course counts display correctly.
Changes remain after refreshing the browser.
Unauthorized users cannot access protected records.
16. Updating the Website

Whenever changes are made to the source code:

Open the project in Visual Studio Code.
Modify the necessary source files.
Save the changes.
Run npm run build.
Upload the updated files to the same GitHub repository.
Commit the changes.
Open Vercel and check the latest deployment.
Wait until the new deployment status becomes Ready.
Refresh the production website to verify the changes.

Vercel automatically deploys new commits from the connected production branch when automatic deployments are enabled.

17. Conclusion

This setup guide provides the necessary instructions for installing, configuring, running, and deploying the Student Records System.

By following the procedures in the correct order, another developer can recreate the application using the documented database scripts, source code, environment settings, authentication configuration, GitHub repository, and Vercel deployment.

Always use fictional student information and protect all private credentials when configuring and maintaining the system.