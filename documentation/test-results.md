# Student Records System – Test Results

**Course:** IT 3119  
**Project:** Student Records System  
**Author/Group:** REPLACE WITH YOUR NAME  
**Section:** REPLACE WITH YOUR SECTION  
**Deployment Platform:** Vercel  
**Database:** Supabase PostgreSQL  

## 1. Database Constraint Tests

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Required field validation | NULL first_name is rejected | | |
| Duplicate student number | Duplicate is rejected | | |
| Invalid course ID | Foreign-key violation | | |

## 2. Database Function Tests

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Count students by course | Returns correct student count | | |
| Compare function and manual count | Both counts match | | |
| Invalid course input | Course not found error | | |

## 3. Database Trigger Tests

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Initial updated_at | Timestamp exists | | |
| Update student record | Timestamp changes automatically | | |
| Trigger inspection | BEFORE UPDATE trigger exists | | |

## 4. Website Functionality Tests

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Operator sign in | Authorized operator can sign in | | |
| View student records | Student list is displayed | | |
| Add student | New record is saved | | |
| Edit student | Changes are saved | | |
| Delete student | Selected record is deleted | | |
| Search student | Matching records are displayed | | |
| Course selection | Existing courses are displayed | | |
| Course report | Correct student count is displayed | | |
| Sign out | Application panel is hidden | | |

## 5. Security and RLS Tests

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Operator A | Can access shared records | | |
| Operator B | Can access shared records | | |
| Anonymous visitor | Cannot retrieve student records | | |
| Unapproved Operator C | Cannot access student records | | |
| Unapproved student insertion | Database rejects insertion | | |

## 6. Deployment Tests

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Vercel deployment | Deployment status is Ready | | |
| Live website access | Website opens successfully | | |
| Supabase connection | Live website retrieves records | | |
| Data persistence | Records remain after refresh | | |

## 7. Conclusion

The Student Records System was developed using Vite, Supabase PostgreSQL, Supabase Authentication, GitHub, and Vercel.

The system provides authorized operators with the ability to sign in, view, add, edit, search, and delete student records. It also provides course-based student counting and automatic update timestamps through a PostgreSQL function and trigger.

The application uses Row Level Security to restrict access to approved operators.

Final test status: TO BE COMPLETED AFTER TESTING.