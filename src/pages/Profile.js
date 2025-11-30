import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { authAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    skills: '',
    education: '',
    experience: '',
    resumeUrl: '',
    companyName: '',
    companyWebsite: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      bio: user.bio || '',
      skills: user.skills || '',
      education: user.education || '',
      experience: user.experience || '',
      resumeUrl: user.resumeUrl || '',
      companyName: user.companyName || '',
      companyWebsite: user.companyWebsite || ''
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await authAPI.updateProfile(user.id, formData);
      updateUser(response.data.user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Container fluid className="container-smash my-4">
      <h2 className="fw-bold mb-4">My Profile</h2>

      <Row>
        <Col md={4} className="mb-4">
          <div className="glass p-4 text-center">
            <div style={{fontSize: '5rem'}} className="mb-3">👤</div>
            <h5 className="fw-bold mb-1">{user.name}</h5>
            <p className="mb-2">{user.email}</p>
            <span className="badge bg-primary">{user.role}</span>
          </div>
        </Col>

        <Col md={8}>
          <div className="glass p-4">
            {success && (
              <Alert variant="success" className="mb-4">
                Profile updated successfully!
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <h5 className="fw-bold mb-3">Basic Information</h5>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      className="form-glass"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      className="form-glass"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {user.role === 'candidate' && (
                <>
                  <hr className="my-4" style={{opacity: 0.2}} />
                  <h5 className="fw-bold mb-3">Professional Details</h5>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="bio"
                      className="form-glass"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
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
                      placeholder="e.g., JavaScript, React, Node.js, Python"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Education</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="education"
                      className="form-glass"
                      rows={3}
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="Your educational background..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Experience</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="experience"
                      className="form-glass"
                      rows={4}
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Your work experience..."
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
                    <small className="text-muted">Upload your resume to a cloud storage and paste the link</small>
                  </Form.Group>
                </>
              )}

              {user.role === 'employer' && (
                <>
                  <hr className="my-4" style={{opacity: 0.2}} />
                  <h5 className="fw-bold mb-3">Company Information</h5>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="companyName"
                      className="form-glass"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Company Website</Form.Label>
                    <Form.Control
                      type="url"
                      name="companyWebsite"
                      className="form-glass"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                    />
                  </Form.Group>
                </>
              )}

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
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
