import api from './api'

export const jobService = {
  getAllJobs: async (params = {}) => {
    const response = await api.get('/jobs', { params })
    return response.data
  },

  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`)
    return response.data
  },

  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData)
    return response.data
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData)
    return response.data
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`)
    return response.data
  },

  applyForJob: async (jobId, applicationData) => {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData)
    return response.data
  },

  getMyApplications: async () => {
    const response = await api.get('/applications/my')
    return response.data
  },

  saveJob: async (jobId) => {
    const response = await api.post(`/jobs/${jobId}/save`)
    return response.data
  },

  unsaveJob: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}/save`)
    return response.data
  },

  getSavedJobs: async () => {
    const response = await api.get('/jobs/saved')
    return response.data
  },

  // Employer specific methods
  getEmployerJobs: async () => {
    const response = await api.get('/employer/jobs')
    return response.data
  },

  getJobApplications: async (jobId = null) => {
    const url = jobId ? `/jobs/${jobId}/applications` : '/employer/applications'
    const response = await api.get(url)
    return response.data
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}/status`, { status })
    return response.data
  }
}