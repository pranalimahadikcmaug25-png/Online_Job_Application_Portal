import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import EmployerDashboard from './pages/EmployerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import JobListing from './pages/JobListing'
import JobDetails from './pages/JobDetails'
import ApplyJob from './pages/ApplyJob'
import SavedJobs from './pages/SavedJobs'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="jobs" element={<JobListing />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="jobs/:id/apply" element={
              <ProtectedRoute>
                <ApplyJob />
              </ProtectedRoute>
            } />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="employer/dashboard" element={
              <ProtectedRoute roles={['EMPLOYER']}>
                <EmployerDashboard />
              </ProtectedRoute>
            } />
            <Route path="admin/dashboard" element={
              <ProtectedRoute roles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="saved-jobs" element={
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App