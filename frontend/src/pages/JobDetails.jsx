import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { jobService } from '../services/jobService'
import { useAuth } from '../context/AuthContext'
import { MapPin, Clock, DollarSign, Building, Heart } from 'lucide-react'

const JobDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      const data = await jobService.getJobById(id)
      setJob(data)
      // Check if job is saved (you might want to add this to the API response)
    } catch (error) {
      console.error('Error fetching job details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveJob = async () => {
    try {
      if (saved) {
        await jobService.unsaveJob(id)
        setSaved(false)
      } else {
        await jobService.saveJob(id)
        setSaved(true)
      }
    } catch (error) {
      console.error('Error saving job:', error)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading job details...</div>
  }

  if (!job) {
    return <div className="text-center py-12">Job not found.</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <Building className="h-5 w-5 mr-2" />
              <span className="text-lg">{job.company}</span>
            </div>
            
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
          
          <div className="flex space-x-3">
            {user && (
              <button
                onClick={handleSaveJob}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  saved 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-4 w-4 mr-2 ${saved ? 'fill-current' : ''}`} />
                {saved ? 'Saved' : 'Save Job'}
              </button>
            )}
            
            {user && user.role === 'USER' && (
              <Link
                to={`/jobs/${job.id}/apply`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
              >
                Apply Now
              </Link>
            )}
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
          <div className="text-gray-700 whitespace-pre-line">
            {job.description}
          </div>
          
          {job.requirements && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Requirements</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {job.requirements}
              </div>
            </>
          )}
          
          {job.benefits && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Benefits</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {job.benefits}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About {job.company}</h2>
        <p className="text-gray-700">
          {job.companyDescription || 'No company description available.'}
        </p>
      </div>
    </div>
  )
}

export default JobDetails