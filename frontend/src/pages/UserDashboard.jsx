import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { jobService } from '../services/jobService'
import { Briefcase, Heart, FileText, Clock } from 'lucide-react'

const UserDashboard = () => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [applicationsData, savedJobsData] = await Promise.all([
        jobService.getMyApplications(),
        jobService.getSavedJobs()
      ])
      setApplications(applicationsData)
      setSavedJobs(savedJobsData)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-gray-600">Here's your job search overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Applications</p>
              <p className="text-2xl font-semibold text-gray-900">{applications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Saved Jobs</p>
              <p className="text-2xl font-semibold text-gray-900">{savedJobs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {applications.filter(app => app.status === 'PENDING').length}
              </p>
            </div>
          </div>
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
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start applying to jobs to see them here.
              </p>
              <div className="mt-6">
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {application.job.title}
                    </h3>
                    <p className="text-sm text-gray-500">{application.job.company}</p>
                    <p className="text-xs text-gray-400">
                      Applied on {new Date(application.appliedAt).toLocaleDateString()}
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
                    <Link
                      to={`/jobs/${application.job.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/jobs"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Briefcase className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Browse Jobs</h3>
                <p className="text-sm text-gray-500">Find new opportunities</p>
              </div>
            </Link>
            <Link
              to="/saved-jobs"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Heart className="h-8 w-8 text-red-600 mr-4" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Saved Jobs</h3>
                <p className="text-sm text-gray-500">Review saved positions</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard