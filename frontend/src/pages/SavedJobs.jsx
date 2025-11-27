import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jobService } from '../services/jobService'
import { MapPin, Clock, DollarSign, Heart } from 'lucide-react'

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSavedJobs()
  }, [])

  const fetchSavedJobs = async () => {
    try {
      const data = await jobService.getSavedJobs()
      setSavedJobs(data)
    } catch (error) {
      console.error('Error fetching saved jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnsaveJob = async (jobId) => {
    try {
      await jobService.unsaveJob(jobId)
      setSavedJobs(savedJobs.filter(job => job.id !== jobId))
    } catch (error) {
      console.error('Error unsaving job:', error)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading saved jobs...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="mt-2 text-gray-600">Jobs you've saved for later</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No saved jobs</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start by saving some jobs you're interested in.
          </p>
          <div className="mt-6">
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link to={`/jobs/${job.id}`} className="hover:text-blue-600">
                      {job.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                    {job.salary && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => handleUnsaveJob(job.id)}
                    className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-800"
                  >
                    <Heart className="h-4 w-4 mr-1 fill-current" />
                    Remove
                  </button>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedJobs