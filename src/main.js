import './style.css'
import { renderCourses } from './courses.js'
import { renderStudents } from './students.js'
import { renderDepartments } from './departments.js'
import { supabase } from './supabase.js'

document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <aside class="sidebar">
      <h2>ISUFST</h2>
      <p class="subtitle">Student Management</p>

      <nav>
        <a href="#" class="active">Dashboard</a>
        <a href="#" id="students-link">Students</a>
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
          <h1>Dashboard</h1>
          <p>Welcome to the Student Management System.</p>
        </div>
        <span class="admin-badge">Administrator</span>
      </header>

      <section class="stats">
        <div class="stat-card">
          <span>Total Students</span>
          <h2 id="total-students">Loading...</h2>
        </div>

        <div class="stat-card">
          <span>Total Courses</span>
          <h2 id="total-courses">Loading...</h2>
        </div>

        <div class="stat-card">
          <span>Total Departments</span>
          <h2 id="total-departments">Loading...</h2>
        </div>
      </section>

      <section class="welcome-card">
        <h2>Welcome to your Student Management System!</h2>
        <p>
          Manage student records, courses, and academic departments
          in one convenient place.
        </p>
      </section>
    </main>
  </div>
`

async function loadDashboardStats() {
  const tables = [
    { table: 'students', element: '#total-students' },
    { table: 'courses', element: '#total-courses' },
    { table: 'departments', element: '#total-departments' }
  ]

  for (const item of tables) {
    const { count, error } = await supabase
      .from(item.table)
      .select('*', { count: 'exact', head: true })

    const display = document.querySelector(item.element)

    if (error) {
      console.error(`Error loading ${item.table}:`, error.message)
      display.textContent = 'Error'
    } else {
      display.textContent = count ?? 0
    }
  }
}

document.querySelector('#students-link').onclick = e => {
  e.preventDefault()
  renderStudents()
}

document.querySelector('#courses-link').onclick = e => {
  e.preventDefault()
  renderCourses()
}

document.querySelector('#departments-link').onclick = e => {
  e.preventDefault()
  renderDepartments()
}

loadDashboardStats()