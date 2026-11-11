import './style.css'
import { renderCourses } from './courses.js'
import { renderStudents } from './students.js'
import { renderDepartments } from './departments.js'
import { supabase } from './supabase.js'

const app = document.querySelector('#app')

// LOGIN SCREEN
function renderLogin() {
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">ISUFST</div>
        <h1>Welcome Back!</h1>
        <p class="login-subtitle">
          Student Management System
        </p>

        <form id="login-form">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />

          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />

          <p id="login-error" class="login-error"></p>

          <button type="submit" id="login-button">
            Log In
          </button>
        </form>

        <p class="login-footer">
          IT 3119 Final Project
        </p>
      </div>
    </div>
  `

  const form = document.querySelector('#login-form')
  const button = document.querySelector('#login-button')
  const errorMessage = document.querySelector('#login-error')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    button.disabled = true
    button.textContent = 'Logging in...'
    errorMessage.textContent = ''

    const email = document.querySelector('#email').value.trim()
    const password = document.querySelector('#password').value

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      errorMessage.textContent = error.message
      button.disabled = false
      button.textContent = 'Log In'
      return
    }

    renderDashboard()
  })
}

// DASHBOARD
function renderDashboard() {
  app.innerHTML = `
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

          <div class="admin-actions">
            <span class="admin-badge">Administrator</span>
            <button id="logout-button" class="logout-button">
              Log Out
            </button>
          </div>
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

  loadDashboardStats()

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

  document.querySelector('#logout-button').onclick = async () => {
    const button = document.querySelector('#logout-button')
    button.disabled = true

    const { error } = await supabase.auth.signOut()

    if (error) {
      alert('Logout failed: ' + error.message)
      button.disabled = false
    } else {
      renderLogin()
    }
  }
}

// DASHBOARD STATISTICS
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

    if (!display) return

    if (error) {
      console.error(`Error loading ${item.table}:`, error.message)
      display.textContent = 'Error'
    } else {
      display.textContent = count ?? 0
    }
  }
}

// CHECK EXISTING LOGIN SESSION
async function initializeApp() {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Session error:', error.message)
    renderLogin()
    return
  }

  if (data.session) {
    renderDashboard()
  } else {
    renderLogin()
  }
}

// HANDLE SESSION EXPIRATION OR LOGOUT
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    renderLogin()
  }
})

initializeApp()