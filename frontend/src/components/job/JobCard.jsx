import { Link } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Heart } from 'lucide-react'
import { useState } from 'react'
import { jobService } from '../../services/jobService'
import { useAuth } from '../../context/AuthContext'

const JobCard = ({ job, onSaveToggle }) => {
  const { user } = useAuth()
  const [saved, setSaved] = useState(job.saved || false)
  const [saving, setSaving] = useState(false)

  const handleSaveToggle = async (e) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      if (saved) {
        await jobService.unsaveJob(job.id)
        setSaved(false)
      } else {
        await jobService.saveJob(job.id)
        setSaved(true)
      }
      onSaveToggle?.(job.id, !saved)
    } catch (error) {
      console.error('Error toggling save:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
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
          {user && (
            <button
              onClick={handleSaveToggle}
              disabled={saving}
              className={`p-2 rounded-md ${
                saved 
                  ? 'text-red-600 hover:text-red-800' 
                  : 'text-gray-400 hover:text-gray-600'
              } disabled:opacity-50`}
            >
              <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
            </button>
          )}
          <Link
            to={`/jobs/${job.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default JobCard