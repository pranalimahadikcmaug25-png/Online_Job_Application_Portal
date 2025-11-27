import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jobService } from '../services/jobService'

const ApplyJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    coverLetter: '',
    resume: null
  })

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      const data = await jobService.getJobById(id)
      setJob(data)
    } catch (error) {
      console.error('Error fetching job details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const applicationData = new FormData()
      applicationData.append('coverLetter', formData.coverLetter)
      if (formData.resume) {
        applicationData.append('resume', formData.resume)
      }

      await jobService.applyForJob(id, applicationData)
      navigate('/dashboard', { 
        state: { message: 'Application submitted successfully!' }
      })
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    })
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (!job) {
    return <div className="text-center py-12">Job not found.</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
        <p className="text-gray-600 mb-6">at {job.company}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={8}
              required
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
              Resume (PDF)
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Upload your resume in PDF format (optional)
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/jobs/${id}`)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyJob