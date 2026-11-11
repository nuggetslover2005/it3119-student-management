import { supabase } from './supabase.js';

// Render Students Page
export async function renderStudents() {
    const app = document.querySelector('#app');

    app.innerHTML = `
        <div class="app-container">
            <aside class="sidebar">
                <h2>ISUFST</h2>
                <p class="subtitle">Student Management</p>

                <nav>
                    <a href="#" id="dashboard-link">Dashboard</a>
                    <a href="#" class="active">Students</a>
                    <a href="#" id="courses-link">Courses</a>
                    <a href="#" id="departments-link">Departments</a>
                </nav>

                <div class="sidebar-footer">
                    IT 3119 Final Project
                </div>
            </aside>

            <main class="main-content">
                <header class="topbar">
                    <div>
                        <h1>Students</h1>
                        <p>Manage your student records.</p>
                    </div>

                    <button id="add-student-btn">+ Add Student</button>
                </header>

                <section class="welcome-card">
                    <input
                        type="text"
                        id="search-student"
                        placeholder="Search by name or student number..."
                    >
                </section>

                <section class="welcome-card">
                    <div id="student-table">Loading students...</div>
                </section>
            </main>
        </div>
    `;

    // Navigation
    document.querySelector('#dashboard-link').onclick = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    document.querySelector('#courses-link').onclick = (e) => {
        e.preventDefault();
        import('./courses.js').then(m => m.renderCourses());
    };

    document.querySelector('#departments-link').onclick = (e) => {
        e.preventDefault();
        import('./departments.js').then(m => m.renderDepartments());
    };

    // Search Students
    document.querySelector('#search-student').oninput = (e) => {
        loadStudents(e.target.value);
    };

    // Add Student
    document.querySelector('#add-student-btn').onclick = addStudent;

    await loadStudents();
}


// Load Students
async function loadStudents(search = '') {
    const table = document.querySelector('#student-table');

    const { data, error } = await supabase
        .from('students')
        .select(`
            student_id,
            student_no,
            first_name,
            last_name,
            year_level,
            email,
            course_id,
            courses (
                course_code,
                course_name
            )
        `)
        .order('student_id', { ascending: true });

    if (error) {
        table.textContent = 'Error loading students: ' + error.message;
        return;
    }

    const filtered = data.filter(student =>
        `${student.student_no} ${student.first_name} ${student.last_name} ${student.email}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (!filtered.length) {
        table.innerHTML = '<p>No student records found.</p>';
        return;
    }

    table.innerHTML = `
        <table class="student-table">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Student No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Year</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                ${filtered.map(student => `
                    <tr>
                        <td>${student.student_id}</td>
                        <td>${escapeHTML(student.student_no)}</td>
                        <td>${escapeHTML(student.first_name)}</td>
                        <td>${escapeHTML(student.last_name)}</td>
                        <td>${student.year_level}</td>
                        <td>${escapeHTML(student.email)}</td>
                        <td>${escapeHTML(student.courses?.course_code || 'Not assigned')}</td>

                        <td>
                            <button data-edit="${student.student_id}">
                                Edit
                            </button>

                            <button data-delete="${student.student_id}">
                                Delete
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Edit Student Buttons
    table.querySelectorAll('[data-edit]').forEach(button => {
        button.onclick = () => editStudent(button.dataset.edit);
    });

    // Delete Student Buttons
    table.querySelectorAll('[data-delete]').forEach(button => {
        button.onclick = () => deleteStudent(button.dataset.delete);
    });
}


// Get Courses
async function getCourses() {
    const { data, error } = await supabase
        .from('courses')
        .select('course_id, course_code, course_name')
        .order('course_id', { ascending: true });

    if (error) {
        alert('Unable to load courses: ' + error.message);
        return null;
    }

    return data;
}


// Add Student
async function addStudent() {
    const courses = await getCourses();

    if (!courses) return;

    if (!courses.length) {
        alert('Please add a course first.');
        return;
    }

    const student_no = prompt('Enter Student Number:');
    if (!student_no?.trim()) return;

    const first_name = prompt('Enter First Name:');
    if (!first_name?.trim()) return;

    const last_name = prompt('Enter Last Name:');
    if (!last_name?.trim()) return;

    const year_level = prompt('Enter Year Level (1-4):');

    if (!['1', '2', '3', '4'].includes(year_level)) {
        alert('Please enter a valid year level.');
        return;
    }

    const email = prompt('Enter Email Address:');
    if (!email?.trim()) return;

    const courseOptions = courses.map(course =>
        `${course.course_id}: ${course.course_code} - ${course.course_name}`
    ).join('\n');

    const selectedCourse = prompt(
        'Enter the Course ID from the list:\n\n' + courseOptions
    );

    if (selectedCourse === null) return;

    const course = courses.find(
        c => String(c.course_id) === selectedCourse.trim()
    );

    if (!course) {
        alert('Invalid Course ID.');
        return;
    }

    const { error } = await supabase
        .from('students')
        .insert([{
            student_no: student_no.trim(),
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            year_level: Number(year_level),
            email: email.trim(),
            course_id: course.course_id
        }]);

    if (error) {
        alert('Unable to add student: ' + error.message);
        return;
    }

    alert('Student added successfully!');
    await loadStudents();
}


// Edit Student
async function editStudent(id) {
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('student_id', id)
        .single();

    if (error) {
        alert(error.message);
        return;
    }

    const courses = await getCourses();

    if (!courses) return;

    const first_name = prompt('First Name:', data.first_name);
    if (first_name === null) return;

    if (!first_name.trim()) {
        alert('First name cannot be empty.');
        return;
    }

    const last_name = prompt('Last Name:', data.last_name);
    if (last_name === null) return;

    if (!last_name.trim()) {
        alert('Last name cannot be empty.');
        return;
    }

    const email = prompt('Email:', data.email);
    if (email === null) return;

    if (!email.trim()) {
        alert('Email cannot be empty.');
        return;
    }

    const year_level = prompt('Year Level (1-4):', data.year_level);

    if (!['1', '2', '3', '4'].includes(year_level)) {
        alert('Invalid year level.');
        return;
    }

    const courseOptions = courses.map(course =>
        `${course.course_id}: ${course.course_code} - ${course.course_name}`
    ).join('\n');

    const selectedCourse = prompt(
        'Enter the new Course ID:\n\n' + courseOptions,
        String(data.course_id || '')
    );

    if (selectedCourse === null) return;

    const course = courses.find(
        c => String(c.course_id) === selectedCourse.trim()
    );

    if (!course) {
        alert('Invalid Course ID.');
        return;
    }

    const { error: updateError } = await supabase
        .from('students')
        .update({
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            year_level: Number(year_level),
            course_id: course.course_id
        })
        .eq('student_id', id);

    if (updateError) {
        alert('Update failed: ' + updateError.message);
        return;
    }

    alert('Student updated successfully!');
    await loadStudents();
}


// Delete Student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }

    const { error } = await supabase
        .from('students')
        .delete()
        .eq('student_id', id);

    if (error) {
        alert('Delete failed: ' + error.message);
        return;
    }

    alert('Student deleted successfully!');
    await loadStudents();
}


// Escape HTML
function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char]);
}
