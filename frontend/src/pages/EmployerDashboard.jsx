import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jobService } from '../services/jobService'
import { Briefcase, Users, Eye, Plus } from 'lucide-react'

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployerData()
  }, [])

  const fetchEmployerData = async () => {
    try {
      // These endpoints would need to be implemented in the backend
      const [jobsData, applicationsData] = await Promise.all([
        jobService.getEmployerJobs(), // You'll need to add this method
        jobService.getJobApplications() // You'll need to add this method
      ])
      setJobs(jobsData)
      setApplications(applicationsData)
    } catch (error) {
      console.error('Error fetching employer data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your job postings and applications</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Jobs</p>
              <p className="text-2xl font-semibold text-gray-900">{jobs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-2xl font-semibold text-gray-900">{applications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900">
                {applications.filter(app => app.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Job Postings</h2>
        </div>
        <div className="p-6">
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No job postings yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Create your first job posting to start receiving applications.
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Post Your First Job
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                    <p className="text-xs text-gray-400">
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {job.applicationCount || 0}
                      </p>
                      <p className="text-xs text-gray-500">Applications</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View Applications
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
        </div>
        <div className="p-6">
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Applications will appear here once candidates start applying.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {application.applicant.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Applied for {application.job.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      application.status === 'PENDING' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : application.status === 'ACCEPTED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployerDashboard