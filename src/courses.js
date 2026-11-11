import { supabase } from './supabase.js'

export async function renderCourses() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <div class="app-container">
      <aside class="sidebar">
        <h2>ISUFST</h2>
        <p class="subtitle">Student Management</p>

        <nav>
          <a href="#" id="dashboard-link">Dashboard</a>
          <a href="#" id="students-link">Students</a>
          <a href="#" class="active">Courses</a>
          <a href="#" id="departments-link">Departments</a>
        </nav>

        <div class="sidebar-footer">IT 3119 Final Project</div>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div>
            <h1>Courses</h1>
            <p>Manage academic courses.</p>
          </div>
          <button id="add-course-btn">+ Add Course</button>
        </header>

        <section class="welcome-card">
          <input
            id="search-course"
            type="text"
            placeholder="Search by course code or name..."
          >
        </section>

        <section class="welcome-card">
          <div id="course-table">Loading courses...</div>
        </section>
      </main>
    </div>
  `

  document.querySelector('#dashboard-link').onclick = e => {
    e.preventDefault()
    window.location.href = '/'
  }

  document.querySelector('#students-link').onclick = e => {
    e.preventDefault()
    import('./students.js').then(m => m.renderStudents())
  }

  document.querySelector('#departments-link').onclick = e => {
    e.preventDefault()
    import('./departments.js').then(m => m.renderDepartments())
  }

  document.querySelector('#search-course').oninput = e => {
    loadCourses(e.target.value)
  }

  document.querySelector('#add-course-btn').onclick = addCourse

  await loadCourses()
}

async function getDepartments() {
  const { data: courses, error } = await supabase
  .from('courses')
  .select('*')
  .order('course_id', { ascending: true })

  if (error) {
    alert('Unable to load departments: ' + error.message)
    return null
  }

  return data
}

async function loadCourses(search = '') {
  const table = document.querySelector('#course-table')

  if (!table) return

  const { data, error } = await supabase
    .from('courses')
    .select(`
      course_id,
      course_code,
      course_name,
      department_id,
      departments!courses_department_id_fkey (
        department_name
      )
    `)
    .order('course_id')

  if (error) {
    console.error('Course loading error:', error)
    table.textContent = 'Error loading courses: ' + error.message
    return
  }

  const filtered = data.filter(course =>
    `${course.course_code || ''} ${course.course_name || ''} ${course.departments?.department_name || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  if (!filtered.length) {
    table.innerHTML = '<p>No course records found.</p>'
    return
  }

  table.innerHTML = `
    <table class="student-table">
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        ${filtered.map(course => `
          <tr>
            <td>${escapeHTML(course.course_code || '')}</td>
            <td>${escapeHTML(course.course_name || '')}</td>
            <td>
              ${escapeHTML(
                course.departments?.department_name || 'Not assigned'
              )}
            </td>
            <td>
              <button data-edit="${course.course_id}">Edit</button>
              <button data-delete="${course.course_id}">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `

  table.querySelectorAll('[data-edit]').forEach(button => {
    button.onclick = () => editCourse(button.dataset.edit)
  })

  table.querySelectorAll('[data-delete]').forEach(button => {
    button.onclick = () => deleteCourse(button.dataset.delete)
  })
}

async function addCourse() {
  const departments = await getDepartments()

  if (!departments) return

  if (!departments.length) {
    alert('Please add a department first.')
    return
  }

  const course_code = prompt('Enter Course Code:')
  if (!course_code?.trim()) return

  const course_name = prompt('Enter Course Name:')
  if (!course_name?.trim()) return

  const options = departments.map(dept =>
    `${dept.department_id}: ${dept.department_name}`
  ).join('\n')

  const selected = prompt(
    'Select Department ID:\n\n' + options
  )

  if (selected === null) return

  const department = departments.find(
    dept => String(dept.department_id) === selected.trim()
  )

  if (!department) {
    alert('Invalid department ID.')
    return
  }

  const { error } = await supabase
    .from('courses')
    .insert([{
      course_code: course_code.trim(),
      course_name: course_name.trim(),
      department_id: department.department_id
    }])

  if (error) {
    alert('Unable to add course: ' + error.message)
    return
  }

  alert('Course added successfully!')
  await loadCourses(
    document.querySelector('#search-course')?.value || ''
  )
}

async function editCourse(id) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('course_id', id)
    .single()

  if (error) {
    alert('Unable to load course: ' + error.message)
    return
  }

  const departments = await getDepartments()

  if (!departments) return

  if (!departments.length) {
    alert('No departments available.')
    return
  }

  const course_code = prompt(
    'Course Code:',
    data.course_code || ''
  )

  if (course_code === null) return

  if (!course_code.trim()) {
    alert('Course code cannot be empty.')
    return
  }

  const course_name = prompt(
    'Course Name:',
    data.course_name || ''
  )

  if (course_name === null) return

  if (!course_name.trim()) {
    alert('Course name cannot be empty.')
    return
  }

  const options = departments.map(dept =>
    `${dept.department_id}: ${dept.department_name}`
  ).join('\n')

  const selected = prompt(
    'Select Department ID:\n\n' + options,
    String(data.department_id || '')
  )

  if (selected === null) return

  const department = departments.find(
    dept => String(dept.department_id) === selected.trim()
  )

  if (!department) {
    alert('Invalid department ID.')
    return
  }

  const { error: updateError } = await supabase
    .from('courses')
    .update({
      course_code: course_code.trim(),
      course_name: course_name.trim(),
      department_id: department.department_id
    })
    .eq('course_id', id)

  if (updateError) {
    alert('Update failed: ' + updateError.message)
    return
  }

  alert('Course updated successfully!')

  await loadCourses(
    document.querySelector('#search-course')?.value || ''
  )
}

async function deleteCourse(id) {
  if (!confirm('Are you sure you want to delete this course?')) {
    return
  }

  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('course_id', id)

  if (error) {
    alert('Delete failed: ' + error.message)
    return
  }

  alert('Course deleted successfully!')

  await loadCourses(
    document.querySelector('#search-course')?.value || ''
  )
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char])
}
