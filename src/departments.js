import { supabase } from './supabase.js'

export async function renderDepartments() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <div class="app-container">
      <aside class="sidebar">
        <h2>ISUFST</h2>
        <p class="subtitle">Student Management</p>
        <nav>
          <a href="#" id="dashboard-link">Dashboard</a>
          <a href="#" id="students-link">Students</a>
          <a href="#" id="courses-link">Courses</a>
          <a href="#" class="active">Departments</a>
        </nav>
        <div class="sidebar-footer">IT 3119 Final Project</div>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div>
            <h1>Departments</h1>
            <p>Manage academic departments.</p>
          </div>
          <button id="add-department-btn">+ Add Department</button>
        </header>

        <section class="welcome-card">
          <input
            id="search-department"
            type="text"
            placeholder="Search department..."
          >
        </section>

        <section class="welcome-card">
          <div id="department-table">Loading departments...</div>
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

  document.querySelector('#courses-link').onclick = e => {
    e.preventDefault()
    import('./courses.js').then(m => m.renderCourses())
  }

  document.querySelector('#search-department').oninput = e =>
    loadDepartments(e.target.value)

  document.querySelector('#add-department-btn').onclick = addDepartment

  await loadDepartments()
}

async function loadDepartments(search = '') {
  const table = document.querySelector('#department-table')

  const { data: departments, error } = await supabase
    .from('departments')
    .select('department_id, department_name')
    .order('department_id')

  if (error) {
    table.textContent = 'Error loading departments: ' + error.message
    return
  }

  // Load courses separately to avoid relationship ambiguity
  const { data: courses, error: courseError } = await supabase
    .from('courses')
    .select('course_id, department_id')

  if (courseError) {
    table.textContent = 'Error loading courses: ' + courseError.message
    return
  }

  const filtered = departments.filter(dept =>
    (dept.department_name || '')
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  if (!filtered.length) {
    table.innerHTML = '<p>No department records found.</p>'
    return
  }

  table.innerHTML = `
    <table class="student-table">
      <thead>
        <tr>
          <th>Department ID</th>
          <th>Department Name</th>
          <th>Total Courses</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(dept => {
          const totalCourses = courses.filter(
            course => course.department_id === dept.department_id
          ).length

          return `
            <tr>
              <td>${dept.department_id}</td>
              <td>${escapeHTML(dept.department_name || '')}</td>
              <td>${totalCourses}</td>
              <td>
                <button data-edit="${dept.department_id}">Edit</button>
                <button data-delete="${dept.department_id}">Delete</button>
              </td>
            </tr>
          `
        }).join('')}
      </tbody>
    </table>
  `

  table.querySelectorAll('[data-edit]').forEach(button => {
    button.onclick = () => editDepartment(button.dataset.edit)
  })

  table.querySelectorAll('[data-delete]').forEach(button => {
    button.onclick = () => deleteDepartment(button.dataset.delete)
  })
}

async function addDepartment() {
  const department_name = prompt('Enter Department Name:')

  if (!department_name?.trim()) return

  const { error } = await supabase
    .from('departments')
    .insert([{
      department_name: department_name.trim()
    }])

  if (error) {
    alert('Unable to add department: ' + error.message)
    return
  }

  alert('Department added successfully!')
  await loadDepartments()
}

async function editDepartment(id) {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('department_id', id)
    .single()

  if (error) {
    alert(error.message)
    return
  }

  const department_name = prompt(
    'Department Name:',
    data.department_name || ''
  )

  if (department_name === null) return

  if (!department_name.trim()) {
    alert('Department name cannot be empty.')
    return
  }

  const { error: updateError } = await supabase
    .from('departments')
    .update({
      department_name: department_name.trim()
    })
    .eq('department_id', id)

  if (updateError) {
    alert('Update failed: ' + updateError.message)
    return
  }

  alert('Department updated successfully!')
  await loadDepartments()
}

async function deleteDepartment(id) {
  const { count, error: checkError } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('department_id', id)

  if (checkError) {
    alert('Unable to check department usage: ' + checkError.message)
    return
  }

  if (count > 0) {
    alert('Cannot delete this department because it is assigned to one or more courses.')
    return
  }

  if (!confirm('Are you sure you want to delete this department?')) return

  const { error } = await supabase
    .from('departments')
    .delete()
    .eq('department_id', id)

  if (error) {
    alert('Delete failed: ' + error.message)
    return
  }

  alert('Department deleted successfully!')
  await loadDepartments()
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