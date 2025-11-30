import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Tabs, Tab } from 'react-bootstrap';
import { applicationAPI, savedJobAPI } from '../api';
import { useAuth } from '../contexts/AuthContext';

function ApplicantDashboard() {
  const { user, isCandidate } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    if (!user || !isCandidate) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, isCandidate, navigate]);

  const fetchData = async () => {
    try {
      const [appsRes, savedRes] = await Promise.all([
        applicationAPI.getByUser(user.id),
        savedJobAPI.getByUser(user.id)
      ]);
      setApplications(appsRes.data);
      setSavedJobs(savedRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'Pending': 'bg-warning text-dark',
      'Under Review': 'bg-info text-white',
      'Shortlisted': 'bg-success',
      'Interview Scheduled': 'bg-primary',
      'Rejected': 'bg-danger',
      'Hired': 'bg-success'
    };
    return classes[status] || 'bg-secondary';
  };

  const handleRemoveSavedJob = async (savedJobId) => {
    try {
      await savedJobAPI.remove(savedJobId);
      setSavedJobs(savedJobs.filter(sj => sj.id !== savedJobId));
    } catch (error) {
      console.error('Error removing saved job:', error);
    }
  };

  if (loading) {
    return (
      <Container fluid className="container-smash my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container fluid className="container-smash my-4">
      <Row className="align-items-center mb-4">
        <Col>
          <div>
            <h2 className="fw-bold mb-1">Welcome back, {user.name}!</h2>
            <p className="text-muted mb-0">Track your job applications and saved jobs</p>
          </div>
        </Col>
        <Col xs="auto">
          <Link to="/profile">
            <Button className="btn btn-glass">Edit Profile</Button>
          </Link>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">📝</div>
              <div>
                <h3 className="fw-bold mb-0">{applications.length}</h3>
                <p className="mb-0">Total Applications</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">💙</div>
              <div>
                <h3 className="fw-bold mb-0">{savedJobs.length}</h3>
                <p className="mb-0">Saved Jobs</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="glass p-4">
            <div className="d-flex align-items-center">
              <div style={{fontSize: '2.5rem'}} className="me-3">✅</div>
              <div>
                <h3 className="fw-bold mb-0">
                  {applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length}
                </h3>
                <p className="mb-0">Active Processes</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs 
        activeKey={activeTab} 
        onSelect={(k) => setActiveTab(k)} 
        className="mb-4"
      >
        <Tab eventKey="applications" title="My Applications">
          {applications.length === 0 ? (
            <div className="glass p-5 text-center">
              <div style={{fontSize: '4rem'}} className="mb-3">📭</div>
              <h4 className="fw-bold mb-2">No applications yet</h4>
              <p className="text-muted mb-3">Start applying to jobs to see them here</p>
              <Link to="/jobs">
                <Button className="btn btn-primary">Browse Jobs</Button>
              </Link>
            </div>
          ) : (
            <Row className="g-3">
              {applications.map((app) => (
                <Col key={app.id} xs={12}>
                  <div className="glass p-4">
                    <Row>
                      <Col md={8}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h5 className="fw-bold mb-1">{app.job?.title}</h5>
                            <p className="mb-0" style={{opacity: 0.7}}>{app.job?.company}</p>
                          </div>
                          <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="badge bg-light text-dark me-2">📍 {app.job?.location}</span>
                          <span className="badge bg-light text-dark">💼 {app.job?.jobType}</span>
                        </div>
                        <small className="text-muted">
                          Applied on {new Date(app.appliedAt).toLocaleDateString()}
                        </small>
                      </Col>
                      <Col md={4} className="text-md-end">
                        <div className="fw-bold mb-2" style={{color: '#4078FF'}}>
                          {app.job?.salary}
                        </div>
                        <Link to={`/jobs/${app.job?.id}`}>
                          <Button size="sm" className="btn btn-glass">View Job</Button>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Tab>
        <Tab eventKey="saved" title="Saved Jobs">
          {savedJobs.length === 0 ? (
            <div className="glass p-5 text-center">
              <div style={{fontSize: '4rem'}} className="mb-3">💙</div>
              <h4 className="fw-bold mb-2">No saved jobs</h4>
              <p className="text-muted mb-3">Save jobs you're interested in to view them later</p>
              <Link to="/jobs">
                <Button className="btn btn-primary">Browse Jobs</Button>
              </Link>
            </div>
          ) : (
            <Row className="g-3">
              {savedJobs.map((savedJob) => (
                <Col key={savedJob.id} xs={12}>
                  <div className="glass p-4">
                    <Row>
                      <Col md={9}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h5 className="fw-bold mb-1">{savedJob.job?.title}</h5>
                            <p className="mb-0" style={{opacity: 0.7}}>{savedJob.job?.company}</p>
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="badge bg-light text-dark me-2">📍 {savedJob.job?.location}</span>
                          <span className="badge bg-light text-dark">💼 {savedJob.job?.jobType}</span>
                        </div>
                        <small className="text-muted">
                          Saved on {new Date(savedJob.savedAt).toLocaleDateString()}
                        </small>
                      </Col>
                      <Col md={3} className="text-md-end">
                        <div className="fw-bold mb-2" style={{color: '#4078FF'}}>
                          {savedJob.job?.salary}
                        </div>
                        <div className="d-flex gap-2 justify-content-md-end">
                          <Link to={`/jobs/${savedJob.job?.id}`}>
                            <Button size="sm" className="btn btn-glass">View</Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleRemoveSavedJob(savedJob.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ApplicantDashboard;
