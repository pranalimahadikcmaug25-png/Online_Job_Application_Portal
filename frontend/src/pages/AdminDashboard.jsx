import { useState, useEffect } from 'react'
import { Users, Briefcase, Building, TrendingUp } from 'lucide-react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalEmployers: 0,
    totalApplications: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminStats()
  }, [])

  const fetchAdminStats = async () => {
    try {
      // This endpoint would need to be implemented in the backend
      // const data = await adminService.getStats()
      // setStats(data)
      
      // Mock data for now
      setStats({
        totalUsers: 150,
        totalJobs: 45,
        totalEmployers: 12,
        totalApplications: 320
      })
    } catch (error) {
      console.error('Error fetching admin stats:', error)
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
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">System overview and management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Employers</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalEmployers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Briefcase className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Jobs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Applications</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">User Management</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">View All Users</span>
                  <span className="text-sm text-gray-500">{stats.totalUsers} users</span>
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Pending Approvals</span>
                  <span className="text-sm text-gray-500">3 pending</span>
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">User Reports</span>
                  <span className="text-sm text-gray-500">2 reports</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Job Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Job Management</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">All Job Postings</span>
                  <span className="text-sm text-gray-500">{stats.totalJobs} jobs</span>
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Pending Review</span>
                  <span className="text-sm text-gray-500">5 pending</span>
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Flagged Jobs</span>
                  <span className="text-sm text-gray-500">1 flagged</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Analytics */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">System Analytics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">85%</p>
              <p className="text-sm text-gray-500">User Engagement</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">92%</p>
              <p className="text-sm text-gray-500">Job Fill Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">7.2</p>
              <p className="text-sm text-gray-500">Avg Applications/Job</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard