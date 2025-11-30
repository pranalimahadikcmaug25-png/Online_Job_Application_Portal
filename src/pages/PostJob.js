import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { jobAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function PostJob() {
  const { user, isEmployer } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    company: user?.companyName || '',
    location: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    jobType: 'Full-time',
    industry: '',
    experienceLevel: 'Mid Level',
    deadline: '',
    isFeatured: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Job title is required');
      return;
    }

    if (!formData.company.trim()) {
      setError('Company name is required');
      return;
    }

    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }

    if (!formData.description.trim() || formData.description.length < 50) {
      setError('Please provide a detailed job description (at least 50 characters)');
      return;
    }

    // Salary validation
    if (formData.salaryMin && formData.salaryMax) {
      const min = parseInt(formData.salaryMin);
      const max = parseInt(formData.salaryMax);
      if (min > max) {
        setError('Minimum salary cannot be greater than maximum salary');
        return;
      }
    }

    // Deadline validation
    if (formData.deadline) {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setError('Deadline cannot be in the past');
        return;
      }
    }

    setLoading(true);

    try {
      await jobAPI.create({
        ...formData,
        createdBy: user.id,
        salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : null,
        salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : null
      });
      navigate('/employer/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  if (!user || !isEmployer) {
    return (
      <Container fluid className="container-smash my-5">
        <div className="glass p-5 text-center">
          <h3>Access Denied</h3>
          <p>Only employers can post jobs.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="container-smash my-4">
      <h2 className="fw-bold mb-4">Post a New Job</h2>

      <div className="glass p-4">
        {error && (
          <Alert variant="danger" className="mb-4">{error}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <h5 className="fw-bold mb-3">Job Details</h5>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Job Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  className="form-glass"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Senior Full Stack Developer"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Company Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  className="form-glass"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Location *</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      className="form-glass"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Bangalore, Karnataka"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Industry</Form.Label>
                    <Form.Control
                      type="text"
                      name="industry"
                      className="form-glass"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g., Information Technology"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Job Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  className="form-glass"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  name="requirements"
                  className="form-glass"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="List the qualifications and skills required (one per line)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Responsibilities</Form.Label>
                <Form.Control
                  as="textarea"
                  name="responsibilities"
                  className="form-glass"
                  rows={4}
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="List key responsibilities (one per line)"
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <h5 className="fw-bold mb-3">Additional Info</h5>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Job Type *</Form.Label>
                <Form.Select
                  name="jobType"
                  className="form-glass"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Experience Level *</Form.Label>
                <Form.Select
                  name="experienceLevel"
                  className="form-glass"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Executive">Executive</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Salary Range</Form.Label>
                <Form.Control
                  type="text"
                  name="salary"
                  className="form-glass mb-2"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g., ₹8-12 LPA"
                />
                <Row className="g-2">
                  <Col xs={6}>
                    <Form.Control
                      type="number"
                      name="salaryMin"
                      className="form-glass"
                      value={formData.salaryMin}
                      onChange={handleChange}
                      placeholder="Min (₹)"
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Control
                      type="number"
                      name="salaryMax"
                      className="form-glass"
                      value={formData.salaryMax}
                      onChange={handleChange}
                      placeholder="Max (₹)"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Application Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="deadline"
                  className="form-glass"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  name="isFeatured"
                  id="featured"
                  label="Mark as Featured Job"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 mb-2"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px'
                }}
              >
                {loading ? 'Posting...' : 'Post Job'}
              </Button>

              <Button
                type="button"
                className="btn btn-glass w-100"
                onClick={() => navigate('/employer/dashboard')}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}

export default PostJob;
