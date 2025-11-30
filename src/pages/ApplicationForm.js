import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { jobAPI, applicationAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function ApplicationForm() {
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    education: user?.education || '',
    experience: user?.experience || '',
    skills: user?.skills || '',
    resumeUrl: user?.resumeUrl || '',
    coverLetter: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchJob();
  }, [jobId, user]);

  const fetchJob = async () => {
    try {
      const response = await jobAPI.getById(jobId);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validateForm = () => {

      // Full Name
      if (!formData.fullName.trim()) {
        return "Full name is required";
      }

      // Email Format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        return "Please enter a valid email address";
      }

      // Phone
      const phone = formData.phone.trim();
      if (!phone) return "Phone number is required";

      // Allows +91, digits, spaces, parentheses
      const phoneRegex = /^[+]?[\d\s()-]{7,15}$/;
      if (!phoneRegex.test(phone)) {
        return "Please enter a valid phone number";
      }

      // Resume URL (optional — validate only if given)
      if (formData.resumeUrl.trim()) {
        try {
          new URL(formData.resumeUrl.trim());
        } catch (err) {
          return "Please enter a valid resume URL";
        }
      }

      return null; // no errors
    };

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await applicationAPI.submit({
        ...formData,
        jobId: parseInt(jobId),
        applicantId: user.id
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <Container fluid className="container-smash my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (success) {
    return (
      <Container fluid className="container-smash my-5">
        <div className="glass p-5 text-center">
          <div style={{ fontSize: '4rem' }} className="mb-3">🎉</div>
          <h2 className="fw-bold mb-3">Application Submitted!</h2>
          <p className="mb-4">Your application has been successfully submitted. The employer will review it soon.</p>
          <Button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Go to Dashboard
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="container-smash my-4">
      <h2 className="fw-bold mb-4">Apply for {job.title}</h2>

      <Row>
        <Col lg={8}>
          <div className="glass p-4">
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <h4 className="fw-bold mb-3">Personal Information</h4>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      className="form-glass"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="form-glass"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Phone *</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  className="form-glass"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <hr className="my-4" style={{ opacity: 0.2 }} />

              <h4 className="fw-bold mb-3">Professional Details</h4>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Education</Form.Label>
                <Form.Control
                  as="textarea"
                  name="education"
                  className="form-glass"
                  rows={3}
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Your educational qualifications"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Work Experience</Form.Label>
                <Form.Control
                  as="textarea"
                  name="experience"
                  className="form-glass"
                  rows={4}
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Your work experience"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Skills</Form.Label>
                <Form.Control
                  as="textarea"
                  name="skills"
                  className="form-glass"
                  rows={2}
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Your relevant skills"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Resume URL</Form.Label>
                <Form.Control
                  type="url"
                  name="resumeUrl"
                  className="form-glass"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/resume.pdf"
                />
                <small className="text-muted">Upload your resume to a cloud storage and paste the link here</small>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Cover Letter</Form.Label>
                <Form.Control
                  as="textarea"
                  name="coverLetter"
                  className="form-glass"
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                />
              </Form.Group>

              <Button
                type="submit"
                className="px-5"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #4078FF 0%, #3461E0 100%)',
                  border: 'none',
                  padding: '12px 40px',
                  borderRadius: '12px'
                }}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </Form>
          </div>
        </Col>

        <Col lg={4}>
          <div className="glass p-4" style={{ position: 'sticky', top: '100px' }}>
            <h5 className="fw-bold mb-3">Job Summary</h5>
            <h6 className="fw-bold">{job.title}</h6>
            <p className="mb-2">{job.company}</p>
            <div className="mb-3">
              <span className="badge bg-light text-dark me-1">📍 {job.location}</span>
              <span className="badge bg-light text-dark">💼 {job.jobType}</span>
            </div>
            <div className="mb-2">
              <strong className="d-block mb-1">Salary</strong>
              <span>{job.salary}</span>
            </div>
            {job.deadline && (
              <div>
                <strong className="d-block mb-1">Deadline</strong>
                <span>{new Date(job.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ApplicationForm;
